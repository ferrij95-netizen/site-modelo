// Leo Motors (SIA Sul, Brasília/DF). Gera public/{a,b}/ e a página de escolha.
// node clientes/leomotors/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs leomotors https://leomotors.com.br/)
// Textos, serviços, peças, endereço e fotos tirados do site atual (WordPress, © 2015). Logo: logo_site.png redesenhado em vetor (logo.svg).
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Leo Motors', url: 'https://leomotors.overtus.com.br/', antigo: 'https://leomotors.com.br/',
  fone: '(61) 3233-3889',
  rua: 'Estacionamento do Makro Atacadista', bairro: 'SIA Sul, Quadra 07, nº 100 · Brasília - DF',
  mapa: 'Makro Atacadista, SIA Sul Quadra 7, Brasília - DF',
  curto: 'Centro automotivo no estacionamento do Makro, no SIA, em Brasília. Mecânica de nacionais e importados desde 1998: diagnóstico por scanner, freios, suspensão, alinhamento, ar-condicionado, troca de óleo e polimento de para-brisa.',
};
const quem = [
  'Desde 1998, a Leo Motors atua no mercado automobilístico, oferecendo aos seus clientes qualidade, segurança e satisfação nos serviços prestados. Priorizamos sempre a transparência e o atendimento personalizado.',
  'Inovação, tecnologia e atualização também fazem parte da política da empresa. Nossa loja é equipada com aparelhos modernos e equipe experiente e capacitada, e trabalhamos com produtos e peças de fabricantes conceituados.',
];
const loja = [
  'Situada dentro do estacionamento do Makro Atacadista, no SIA, nossa loja foi preparada e equipada para oferecer um ambiente agradável, confortável e seguro, diferente dos demais centros automotivos de Brasília.',
  'Aqui você transforma a manutenção do carro num momento produtivo: tira dúvidas sobre os serviços com a equipe, espera numa sala confortável ou aproveita para fazer compras no Makro enquanto o carro fica pronto.',
];
const servicos = [
  { id: 'mecanica', t: 'Mecânica geral', i: 'chave', d: 'Mecânica e manutenção de automóveis nacionais e importados, com equipe de mecânicos qualificados.', l: ['Diagnóstico por computador (scanner) para todas as marcas e modelos', 'Carros nacionais e importados'] },
  { id: 'regulagem', t: 'Regulagem de motores', i: 'medidor', d: 'Verificação periódica do sistema de ignição e da injeção eletrônica, para garantir menos consumo, menos emissão de poluentes e o torque certo.', l: ['Sensores e atuadores da injeção', 'Sistema de ignição', 'Leitura da unidade de comando'] },
  { id: 'oleo', t: 'Troca de óleo e filtros', i: 'oleo', f: 'troca-oleo', d: 'A vida do motor depende do óleo. Um motor a 5.000 rpm faz circular, em um minuto, mais de 7 vezes o volume de óleo do cárter. Óleo de baixa qualidade oxida e forma borra, que entope os canais de lubrificação.', l: ['Óleo e filtros de marcas conceituadas', 'Indicação do óleo certo para o seu motor'] },
  { id: 'freios', t: 'Sistema de freios', i: 'disco', d: 'Item de segurança que pede atenção constante. Cuidamos das peças de atrito e da parte hidráulica.', l: ['Discos, tambores, pastilhas e lonas', 'Cilindro mestre, servo, cilindro de roda e pinça'] },
  { id: 'suspensao', t: 'Suspensão', i: 'carro', d: 'É a suspensão que absorve os buracos e irregularidades do piso e mantém o carro estável.', l: ['Molas e amortecedores', 'Buchas, batentes, articulações e balanças'] },
  { id: 'alinhamento', t: 'Alinhamento', i: 'volante', f: 'alinhamento-rampa', d: 'Corrigimos convergência e divergência e verificamos caster e camber, seguindo a especificação de cada fabricante.', l: ['A cada 10.000 km ou na troca de pneus', 'Quando o carro puxa para um lado ao soltar o volante ou frear'] },
  { id: 'balanceamento', t: 'Balanceamento', i: 'disco', d: 'Carro desbalanceado trepida, gasta os pneus de forma irregular e perde parte da estabilidade.', l: ['A cada troca de pneus', 'Quando o volante ou o carro vibra'] },
  { id: 'escapamento', t: 'Escapamento', i: 'chama', d: 'Furos e amassados mudam o fluxo dos gases e tiram rendimento do motor. E retirar o catalisador não melhora o desempenho: ele está previsto no projeto.', l: ['Coletor, intermediário, silencioso e ponteira', 'Escapamentos e catalisadores'] },
  { id: 'ar', t: 'Ar-condicionado automotivo', i: 'floco', d: 'Instalação, manutenção e limpeza, com estoque de peças e aparelhos de várias marcas. Filtro sujo causa mau cheiro e faz mal à respiração.', l: ['Carros de passeio, caminhões, ônibus e máquinas', 'Nacionais e importados'] },
  { id: 'polimento', t: 'Polimento de para-brisa', i: 'sol', f: 'polimento-mini', d: 'Tira os riscos e devolve a transparência ao vidro sem trocar o para-brisa original, com a marca do fabricante.', l: ['Até 90% de melhora na transparência', 'Economia de até 70% em relação à troca', 'De 1h30 a 3h, conforme os riscos', 'Também vidros laterais e traseiros'] },
];
const pecas = ['Óleo', 'Filtros', 'Correias', 'Amortecedores', 'Discos de freio', 'Pastilhas', 'Baterias', 'Escapamentos', 'Aditivos e fluidos', 'Descarbonizante limpa-bicos', 'Buchas e batentes', 'Articulações', 'Balanças', 'Velas de ignição', 'Coifas'];
const marcas = ['Mobil', 'Shell', 'Repsol', 'ACDelco', 'Fram', 'Bosch', 'Dayco', 'Monroe', 'Cofap', 'Axios', 'Fremax', 'Varga', 'Cobreq', 'Fras-le', 'SYL', 'TRW', 'Heliar', 'Prestolite', 'Mastra', 'Fink', '3M', 'Motormax', 'NGK', 'Spicer'];
const alt = {
  fachada: 'Boxes da Leo Motors sob a cobertura de estrutura laranja, no estacionamento do Makro',
  'polimento-civic': 'Funcionário da Leo Motors polindo o vidro traseiro de um Civic',
  'polimento-detalhe': 'Politriz sobre o vidro, com o carro protegido por capa azul',
  'polimento-mini': 'Polimento do para-brisa de um Mini vermelho',
  'polimento-mini-2': 'Funcionário polindo o para-brisa do Mini',
  'alinhamento-rampa': 'Carro na rampa de alinhamento da Leo Motors',
  'alinhamento-box': 'Box de alinhamento com piso branco e faixas vermelhas',
  'troca-oleo': 'Mecânico da Leo Motors drenando o óleo de um carro no elevador',
};
const galeria = ['fachada', 'alinhamento-rampa', 'troca-oleo', 'alinhamento-box', 'polimento-civic', 'polimento-mini-2'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'loja', nome: 'A loja' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'pecas', nome: 'Peças' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pit stop', b: 'Box escuro' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&family=Onest:wght@400;500;600;700&family=Krona+One&family=Hanken+Grotesk:wght@400;500;600;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#bd2822', b: '#161514' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Leo Motors | Centro automotivo no Makro do SIA, Brasília' : `${titulo} | Leo Motors`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ligar = (cls = 'btn') => `<a class="${cls}" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa da Leo Motors no Makro do SIA" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Leo Motors, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.svg" alt="Leo Motors" width="454" height="120"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    ${ligar('btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/logo-claro.svg" alt="Leo Motors" width="454" height="120" loading="lazy"><p>Nacionais e importados, desde 1998. Qualidade e transparência ao seu alcance.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale com a loja</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Leo Motors. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const servBloco = (v, s, i) => `<article class="serv-bloco sobe" id="${s.id}">${s.f ? `<figure>${img(s.f)}</figure>` : `<div class="serv-ic">${ic(s.i)}</div>`}<div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p><ul class="lista-check">${s.l.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`;
const servIndice = v => `<ol class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="servs-n">${String(i + 1).padStart(2, '0')}</span>${ic(s.i)}<b>${s.t}</b></a></li>`).join('')}</ol>`;
const galeriaGrade = (lista = galeria) => `<div class="galeria">${lista.map(n => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt[n])}">${img(n)}</a>`).join('')}</div>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
  <li>${ic('carro')}<div><strong>Como chegar</strong><span>Entre no estacionamento do Makro Atacadista do SIA e siga até a loja.</span></div></li>
</ul>`;
const marcasLista = () => `<ul class="marcas">${marcas.map(m => `<li>${m}</li>`).join('')}</ul>`;
const pecasLista = () => `<ul class="pecas">${pecas.map(p => `<li>${p}</li>`).join('')}</ul>`;
const polNums = () => `<dl class="nums"><div><dt>até 90%</dt><dd>de melhora na transparência do vidro</dd></div><div><dt>até 70%</dt><dd>de economia em relação à troca</dd></div><div><dt>1h30 a 3h</dt><dd>de serviço, conforme os riscos</dd></div></dl>`;
const cta = () => `<section class="cta"><div class="in cta-in"><div><h2>Barulho, luz acesa no painel ou revisão atrasada?</h2><p>Ligue e marque o horário. A loja fica no estacionamento do Makro do SIA.</p></div><p class="bts">${ligar('btn btn-claro')}<a class="btn btn-linha" href="https://maps.google.com/?q=${encodeURIComponent(E.mapa)}" target="_blank" rel="noopener">${ic('pin')}Ver no mapa</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.loja = head(v, 'loja', 'A loja', loja[0]) + topo(v, 'loja') + cab('A loja', 'No estacionamento do Makro, no SIA', 'fachada') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}${loja.map(p => `<p>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></p></div><figure>${img('alinhamento-box')}<figcaption>Box de alinhamento da loja.</figcaption></figure></section>
<section class="gal-sec"><header class="tit"><p class="k">Fotos</p><h2>Por dentro da Leo Motors</h2></header>${galeriaGrade()}</section></div>
` + cta() + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Mecânica geral, regulagem de motores, troca de óleo, freios, suspensão, alinhamento, balanceamento, escapamento, ar-condicionado e polimento de para-brisa no SIA, em Brasília.') + topo(v, 'servicos') + cab('Serviços', 'Dez serviços num só lugar, para nacionais e importados', 'polimento-civic') + `
<div class="in"><nav class="serv-atalhos" aria-label="Serviços">${servicos.map(s => `<a href="#${s.id}">${s.t}</a>`).join('')}</nav><section class="serv-pag">${servicos.map((s, i) => servBloco(v, s, i)).join('')}</section></div>
` + cta() + rodape(v);
  pag.pecas = head(v, 'pecas', 'Peças e acessórios', 'A Leo Motors trabalha com peças conceituadas no mercado: óleo, filtros, correias, amortecedores, freios, baterias, escapamentos, velas e mais.') + topo(v, 'pecas') + cab('Peças e acessórios', 'Peças de fabricantes conceituados', 'troca-oleo') + `
<div class="in"><section class="pecas-pag"><div><h2>O que a gente usa no seu carro</h2><p>A Leo Motors trabalha com peças conceituadas no mercado automobilístico:</p>${pecasLista()}</div><aside><h2>Marcas</h2><p>Algumas das marcas que passam pela loja:</p>${marcasLista()}</aside></section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Leo Motors: ${E.fone}. ${E.rua}, SIA Sul, Quadra 07, nº 100, Brasília - DF.`) + topo(v, 'contato') + cab('Contato', 'Ligue e marque o seu horário', 'alinhamento-rampa') + `
<div class="in"><section class="contato-pag"><div><h2>Fale com a Leo Motors</h2>${contatoLista()}<p class="bts">${ligar()}</p></div>${mapaFrame()}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Centro automotivo · SIA · Brasília</p><h1>Deixe o carro na oficina e aproveite o Makro.</h1><p>${loja[0]}</p><p class="bts">${ligar()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div><figure class="hero-a-foto">${img('fachada', alt.fachada, ' loading="eager" fetchpriority="high"')}<figcaption>${ic('pin')}Estacionamento do Makro · SIA Sul, Qd. 07</figcaption></figure></div>
<ul class="in selos-a"><li><b>1998</b><span>no mercado desde</span></li><li><b>Scanner</b><span>para todas as marcas</span></li><li><b>10</b><span>serviços na mesma loja</span></li><li><b>Nacionais</b><span>e importados</span></li></ul></section>
<section class="in servs-a"><div class="servs-a-cab"><header class="tit"><p class="k">Serviços</p><h2>Do óleo ao para-brisa</h2></header><a class="link-seta" href="${link(v, 'servicos')}">Detalhes de cada serviço ${ic('seta')}</a></div>${servIndice(v)}</section>
<section class="pol-a"><div class="in pol-a-in"><div class="pol-a-fotos"><figure>${img('polimento-mini')}</figure><figure>${img('polimento-detalhe')}</figure></div><div><p class="k">Polimento de para-brisa</p><h2>Vidro riscado não precisa ser trocado</h2><p>${servicos[9].d}</p>${polNums()}<a class="link-seta" href="${link(v, 'servicos')}#polimento">Como funciona ${ic('seta')}</a></div></div></section>
<section class="in quem-a"><figure>${img('troca-oleo')}</figure><div><p class="k">Desde 1998</p><h2>Transparência e atendimento personalizado</h2><p>${quem[0]}</p><p>${quem[1]}</p><a class="link-seta" href="${link(v, 'loja')}">Conheça a loja ${ic('seta')}</a></div></section>
<section class="marcas-a"><div class="in"><p class="k">Peças de fabricantes conceituados</p>${marcasLista()}</div></section>
<section class="in local-a"><div><p class="k">Onde estamos</p><h2>Dentro do estacionamento do Makro Atacadista</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta() + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('polimento-mini', alt['polimento-mini'], ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Leo Motors · SIA · Brasília</p><h1>Nacionais e importados desde 1998.</h1><p>Qualidade e transparência ao seu alcance, numa loja no estacionamento do Makro.</p><p class="bts">${ligar()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div></section>
<section class="faixa-b"><div class="in"><span>${ic('medidor')}Diagnóstico por scanner</span><span>${ic('escudo')}Peças de marcas conceituadas</span><span>${ic('pin')}Makro do SIA</span></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Tudo o que o carro pede, num box só</h2></header><div class="servs-b-grade">${servicos.map((s, i) => `<a class="sv sobe" href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${ic(s.i)}<b>${s.t}</b><span class="sv-d">${s.d.split('. ')[0].replace(/\.$/, '')}.</span></a>`).join('')}</div></section>
<section class="qa-b"><div class="in qa-b-in"><figure>${img('alinhamento-rampa')}</figure><div><p class="k">Pergunta de oficina</p><h2>Quando alinhar e balancear?</h2><dl><dt>Alinhamento</dt><dd>A cada 10.000 km, na troca de pneus ou quando o carro puxa para um lado ao soltar o volante ou frear. Desalinhado, ele perde aderência na frenagem, gasta pneu e consome mais.</dd><dt>Balanceamento</dt><dd>A cada troca de pneus e sempre que o volante trepidar. Sem ele, os pneus gastam de forma irregular e o carro perde estabilidade.</dd></dl><a class="link-seta" href="${link(v, 'servicos')}#alinhamento">Ver os serviços ${ic('seta')}</a></div></div></section>
<section class="in pol-b"><div><p class="k">Polimento de para-brisa</p><h2>O para-brisa original, de volta à transparência</h2><p>${servicos[9].d}</p>${polNums()}</div>${galeriaGrade(['polimento-civic', 'polimento-mini-2', 'polimento-detalhe'])}</section>
<section class="in local-b"><div class="local-b-txt"><p class="k">Endereço</p><h2>SIA Sul, Quadra 07, nº 100</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta() + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Leo Motors', artigo: 'da', url: E.url, lang: 'pt', cor: '#bd2822', fundo: '#161514', claro: '#f3f0ec',
  fonteTitulo: '"Unbounded",system-ui,sans-serif', fonteTexto: '"Onest",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com a loja no estacionamento do Makro na abertura e o polimento de para-brisa em destaque.', pontos: ['"Deixe o carro e aproveite o Makro"', '10 serviços com detalhes', 'Marcas de peças em texto'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, de box, com o polimento do Mini em tela cheia e as dúvidas de alinhamento respondidas.', pontos: ['"Nacionais e importados desde 1998"', 'Serviços em grade de box', 'Fotos reais da loja'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
