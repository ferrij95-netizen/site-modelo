// Tramontini Máquinas (Venâncio Aires/RS, desde 1984). Gera public/{a,b}/ e a página de escolha.
// node clientes/tramontini/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tramontini https://tramontini.com.br/)
// Textos, produtos e fichas técnicas: do site atual (WordPress, via wp-json). Fotos: as do próprio site (produtos, banners, notícias).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const P = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const E = {
  nome: 'Tramontini Máquinas', url: 'https://tramontini.overtus.com.br/', antigo: 'https://tramontini.com.br/',
  fone: '(51) 3738-3100', email: 'contato@tramontini.com.br',
  wa: '5551983222468', fwa: '(51) 98322-2468',
  rua: 'RSC 453, km 2,37', bairro: 'Distrito Industrial', cidade: 'Venâncio Aires - RS',
  horario: 'Segunda a sexta, 8h às 11h45 e 13h às 17h30', pecasAte: 'Venda de peças até as 17h',
  face: 'https://www.facebook.com/tramontinimaquinas', insta: 'https://www.instagram.com/tramontinimaquinas', yt: 'https://www.youtube.com/user/tratorestramontini',
  catalogo: 'https://tramontini.com.br/catalogo-de-pecas/',
  curto: 'Empresa 100% brasileira que produz e distribui tratores, microtratores, motores, motobombas, geradores, reversores náuticos e linha de jardinagem, com mais de 60 revendas no país.',
};
const posVenda = [
  { t: 'Pós-vendas', n: '5554981400066', f: '(54) 98140-0066' },
  { t: 'Venda de peças: AM, RS e RN', n: '5551999000814', f: '(51) 99900-0814' },
  { t: 'Venda de peças: demais regiões', n: '5551981834494', f: '(51) 98183-4494' },
];
const linhas = [
  { id: 'tratores', t: 'Tratores Antonio Carraro', c: 'Tratores', f: 'p-trator-tgf-7800-s', i: 'trator', d: 'Tratores especiais isodiamétricos, compactos e com baixo centro de gravidade, para regiões montanhosas e de difícil acesso.' },
  { id: 'microtratores', t: 'Microtratores', c: 'Microtratores', f: 'p-microtrator-gn18-master', i: 'trator', d: 'Microtratores de 18 cv e implementos para hortas, plantações de médio porte e camas de aviário.' },
  { id: 'nautica', t: 'Náutica', c: 'Náutica', f: 'p-reversor-hidraulico-linha-pesada-rt790', i: 'engrenagem', d: 'Reversores mecânicos e hidráulicos para motores de 25 a 1.380 cv, com reduções de 1:1 a 9:1.' },
  { id: 'motores', t: 'Motores', c: 'Motores', f: 'p-motor-diesel-trd-10-2', i: 'medidor', d: 'Motores estacionários a diesel e a gasolina, em ampla faixa de potências.' },
  { id: 'motobombas', t: 'Motobombas', c: 'Motobombas', f: 'p-motobomba-a-gasolina-tmbg-80-30', i: 'gota', d: 'Bombeamento com alto rendimento e baixo consumo, a gasolina ou diesel.' },
  { id: 'geradores', t: 'Grupos geradores', c: 'Geradores', f: 'p-gerador-gt15-grupo-geradores', i: 'chama', d: 'Geradores a diesel para residências, propriedades rurais e pequenos comércios, e painéis de distribuição.' },
  { id: 'jardinagem', t: 'Jardinagem', c: 'Jardinagem', f: 'p-cortador-de-grama-cgt-3-5-3hp', i: 'sol', d: 'Cortadores de grama e ferramenta multifuncional a combustão para jardins, parques e condomínios.' },
  { id: 'eletrica', t: 'Linha Elétrica', c: 'Elétrica', f: null, i: 'painel', d: 'Interruptores, tomadas, módulos, filtros de linha e extensões para todo o Sul do Brasil.' },
];
const subEletrica = ['Filtros e Extensões', 'Linha Box', 'Eletrônicos', 'Linha Pinos', 'Retangular', 'Linha Slim', 'Linha Stylus', 'Linha Vivaz'];
const doMesmo = l => P.filter(p => p.l === l);
const nautOrdem = ['Reversores mecânicos', 'Reversores hidráulicos: linha pesada', 'Reversores hidráulicos: linha compacta'];
const nautGrupo = p => /Mecânico/.test(p.n) ? 0 : /Compacto/.test(p.n) ? 2 : 1;
const num = s => +(s.match(/RT\s?(\d+)/) || [0, 0])[1];

const quem = [
  'A Tramontini Máquinas é uma empresa 100% brasileira, com parque industrial instalado em Venâncio Aires, no Rio Grande do Sul, dedicada à produção e distribuição de diversos equipamentos que auxiliam nos trabalhos diários.',
  'Comercializa produtos por meio de mais de 60 revendas e serviços de pós-venda, presentes em todo o país e em expansão em todas as regiões e mercados.',
  'A Tramontini iniciou suas atividades em 1984 na cidade de Encantado/RS, produzindo carretas agrícolas motorizadas. Com o passar dos anos a empresa passou a produzir motores, motobombas, geradores, microtratores e outros produtos. Em 2007, passou a fabricar tratores, com forte investimento na qualidade dos produtos, o que levou a empresa a ser reconhecida em várias premiações.',
];
const engenharia = [
  'Cada novo projeto é cuidadosamente pensado, desenvolvido e testado pelo departamento de engenharia, para que ofereça excelente desempenho nas atividades de campo e tenha a melhor relação custo-benefício na sua categoria. Antes de chegar às mãos do consumidor, os produtos Tramontini são submetidos a um campo de provas. A linha de produção também é testada, conforme procedimento padrão, com ensaios sob carga.',
  'Para atender a todas as revendas pelo Brasil, mantém um amplo estoque de peças de reposição. Isso garante aos distribuidores condições para prestar um eficiente atendimento de pós-venda. Conta ainda com profissionais treinados na fábrica, com cursos técnicos sobre os produtos e noções de metrologia e mecânica.',
];
const marca = [
  'Há mais de um século a família Tramontini está ligada à fabricação de utensílios e máquinas. Iniciou sua trajetória com a fabricação de utensílios para auxiliar no trabalho do dia a dia no campo. Anos depois, passou a trabalhar com motores, iniciando assim a história do fundador da Tramontini Máquinas, Sr. Derci Tramontini.',
  'Aos 13 anos, Derci iniciou suas atividades no ramo da mecânica numa revenda Ford em Encantado/RS. Posteriormente deu início à fabricação de carretas agrícolas.',
];
const linhaTempo = [
  ['1984', 'Derci Tramontini e os filhos iniciam a Tramontini Máquinas em Encantado/RS, produzindo carretas agrícolas motorizadas.'],
  ['1995', 'Para ampliar o parque fabril, a empresa se muda para Venâncio Aires/RS, onde permanece até hoje.'],
  ['2007', 'Começa a fabricar tratores, linha desenvolvida para a pequena agricultura familiar e culturas específicas.'],
  ['2009', 'Remodelação da identidade institucional, com a nova marca usada junto da primeira.'],
  ['2024', 'Tramontini completa 40 anos e lança o Kit Turbo da linha 5800 e a Cabine Plataformada do TN 5800 na Expobento.'],
  ['2025', 'Recebe da Antonio Carraro o certificado de Maior Crescimento em Vendas de 2024.'],
];
const valores = ['Inovação', 'Transparência', 'Respeito', 'Desenvolvimento sustentável', 'Eficiência'];
const missao = 'Fornecer soluções e inovações para os mercados de atuação, comercializando produtos adequados para cada segmento, atendendo as necessidades dos clientes e promovendo uma concorrência justa e leal, respeitando o meio ambiente e contribuindo com o desenvolvimento social.';
const visao = 'Ser uma marca reconhecida como referência na qualidade, pós-vendas e atendimento ao cliente.';
const ambiente = 'Com um olhar para o meio ambiente, a Tramontini busca minimizar os danos gerados com o descarte industrial a partir de diversas ações, como o tratamento de água e a realização de eventos de conscientização. As causas sociais e a comunidade também fazem parte do dia a dia da empresa, que acredita nas pessoas e valoriza o seu trabalho, além de possuir forte parceria com cooperativas agrícolas.';
const numeros = [['1984', 'ano de fundação'], ['60+', 'revendas no Brasil'], ['47 mil m²', 'de parque industrial'], ['16 mil m²', 'de área construída']];
const carraro = [
  'Em sua linha de tratores a Tramontini conta com os modelos da marca italiana Antonio Carraro. São tratores especiais utilizados especialmente para regiões montanhosas e de difícil acesso.',
  'Com um conceito desenvolvido para dar maior segurança ao operador, apresentam alta performance. As máquinas são isodiamétricas, compactas, possuem baixo centro de gravidade, bloqueio do diferencial e raio de giro reduzido. A introdução desta tecnologia foi um sucesso na Serra Gaúcha e o mesmo já ocorre em Minas Gerais, na região produtora de café.',
];
const pecasPorque = [
  ['Desempenho e durabilidade', 'Promovem melhor desempenho e durabilidade dos seus produtos.'],
  ['Processo produtivo', 'Rigoroso processo produtivo, de testes e armazenagem.'],
  ['Qualidade', 'Peças com alto padrão de qualidade, assim como nossos produtos.'],
  ['Economia', 'Economia a longo prazo, devido à durabilidade das peças originais Tramontini.'],
];
const noticias = [
  { f: 'certificado-carraro', d: '5 nov. 2025', t: 'Tramontini é reconhecida pela Antonio Carraro por destaque em vendas no Brasil', r: 'A Tramontini recebeu o certificado de Maior Crescimento em Vendas de 2024, resultado de quase 10 anos de parceria na importação, distribuição e suporte técnico dos tratores Antonio Carraro no Brasil.' },
  { f: 'cooxupe', d: '22 out. 2025', t: 'Tramontini e Antonio Carraro visitam a Cooxupé, em Minas Gerais', r: 'A maior cooperativa de café do mundo começou a vender os tratores Tramontini Antonio Carraro em março e, em poucos meses, a marca já é a segunda mais vendida pela cooperativa.' },
  { f: 'boa-esperanca', d: '31 out. 2025', t: 'Parceria com cooperativa de café especial em Boa Esperança/MG', r: 'Comitiva da Tramontini, da Antonio Carraro e da revenda Agro Oliveira visitou a Cooperativa dos Produtores de Café Especial de Boa Esperança.' },
  { f: 'expobento', d: '22 jul. 2024', t: 'Lançamentos na Expobento 2024, em Bento Gonçalves', r: 'No estande da Tramontini Antonio Carraro foram lançados o Kit Turbo para a linha 5800 e a Cabine Plataformada para o TN 5800.' },
];
const alt = {
  fabrica: 'Vista aérea da fábrica da Tramontini em Venâncio Aires, com tratores vermelhos no pátio',
  fachada: 'Fachada da sede da Tramontini Máquinas',
  'microtrator-campo': 'Agricultor trabalhando a terra com microtrator Tramontini GN18 ao entardecer',
};
for (const n of noticias) alt[n.f] = n.t;
for (const p of P) alt['p-' + p.s] = p.n;

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'tratores', nome: 'Tratores' }, { slug: 'produtos', nome: 'Linhas' }, { slug: 'pos-venda', nome: 'Pós-venda' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Campo', b: 'Oficina' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,500;0,700;0,800;1,700;1,800;1,900&family=Source+Sans+3:wght@400;600;700&family=Archivo:wdth,wght@100,700;100,800;125,800;125,900&family=Public+Sans:wght@400;500;600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Tramontini e gostaria de mais informações.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#c4161c', b: '#141517' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Tratores, motores e equipamentos desde 1984` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lista = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" required autocomplete="email"></label><label>Cidade/UF<input name="cidade" autocomplete="address-level2" placeholder="Venâncio Aires/RS"></label></div>
  <label>Assunto<select name="assunto"><option>Tenho interesse em produtos</option><option>Quero ser um revendedor</option><option>Peças e assistência técnica</option><option>Dúvidas, sugestões ou reclamações</option><option>Quero trabalhar com vocês</option></select></label>
  <label>Produto<input name="produto" placeholder="Ex.: TGF 7800 S, GN18, RT 380L"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp comercial</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('pin')}<div><strong>Fábrica</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span><span>${E.pecasAte}</span></div></li>
</ul>`;
const redes = `<p class="redes"><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Tramontini" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Tramontini Máquinas, RSC 453, Venâncio Aires RS')}&z=14&output=embed"></iframe>`;
const pvLista = () => `<ul class="pv-lista">${posVenda.map(p => `<li><span>${p.t}</span><a class="btn btn-linha" href="${waHref(p.n, 'Olá! Vim pelo site da Tramontini.')}" ${ext}>${icWa()}${p.f}</a></li>`).join('')}</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.cidade}</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a class="ft-rev" href="${link(v, 'pos-venda')}#revendedor">Seja um revendedor</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Tramontini" width="198" height="37"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}WhatsApp</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Tramontini" width="198" height="37" loading="lazy"><p>Empresa 100% brasileira, desde 1984. Fábrica em Venâncio Aires/RS e mais de 60 revendas no país.</p>${redes}</div>
    <div><h3>Linhas</h3><ul>${linhas.map(l => `<li><a href="${l.id === 'tratores' ? link(v, 'tratores') : link(v, 'produtos') + '#' + l.id}">${l.t}</a></li>`).join('')}</ul></div>
    <div><h3>Empresa</h3><ul>${nav.filter(n => !['index', 'tratores', 'produtos'].includes(n.slug)).map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${link(v, 'pos-venda')}#revendedor">Seja um revendedor</a></li><li><a href="${E.catalogo}" ${ext}>Catálogo de peças</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('relogio')}<span>${E.horario}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Tramontini Máquinas Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const linhaHref = (v, l) => l.id === 'tratores' ? link(v, 'tratores') : `${link(v, 'produtos')}#${l.id}`;
const fotoLinha = l => l.f ? img(l.f, l.t) : `<span class="tile-ic">${ic(l.i)}</span>`;
const spec = e => e.map(x => /^[A-ZÁÉÍÓÚÇÃÕ0-9 /–-]+$/.test(x) && x.length < 50 && !/\d:\d/.test(x) ? `<li class="sub">${x}</li>` : `<li>${x}</li>`).join('');
const cartao = (p, msg) => `<li class="prod sobe" id="${p.s}"><a class="prod-foto" href="/assets/img/p-${p.s}.webp" data-foto="${esc(p.n)}">${img('p-' + p.s)}</a><div class="prod-txt"><h3>${p.n}</h3>${p.e.length ? `<details><summary>Ficha técnica</summary><ul class="ficha-l">${spec(p.e)}</ul></details>` : ''}<a class="link-seta" href="${wa(msg || `Olá! Quero saber mais sobre: ${p.n}.`)}" ${ext}>Consultar ${ic('seta')}</a></div></li>`;
const grade = arr => `<ul class="prods">${arr.map(p => cartao(p)).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Procurando a revenda Tramontini mais próxima?</h2><p>Atendemos todo o Brasil. Fale com a fábrica pelo ${E.fone} ou pelo WhatsApp comercial.</p></div><p class="bts"><a class="btn btn-claro" href="${wa('Olá! Quero saber qual é a revenda Tramontini mais próxima de mim.')}" ${ext}>${icWa()}Encontrar revenda</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p></div></section>`;
const noticiasHtml = (lim = 4) => `<ul class="noticias">${noticias.slice(0, lim).map(n => `<li class="sobe"><figure>${img(n.f)}</figure><div><time>${n.d}</time><h3>${n.t}</h3><p>${n.r}</p></div></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', quem[0]) + topo(v, 'empresa') + cab('Empresa', 'Há 40 anos, iniciamos uma história de energia', 'fabrica') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}${engenharia.map(p => `<p>${p}</p>`).join('')}</div><aside class="ficha"><figure>${img('fachada')}</figure><dl><div><dt>Fundação</dt><dd>1984, em Encantado/RS</dd></div><div><dt>Fábrica</dt><dd>Venâncio Aires/RS, desde 1995</dd></div><div><dt>Área</dt><dd>47.000 m², sendo 16.000 m² construídos, e mais 84.000 m² para futuras construções</dd></div><div><dt>Revendas</dt><dd>Mais de 60 em todo o país</dd></div></dl></aside></section>
<section class="tempo" id="historia"><header class="tit"><p class="k">A marca Tramontini</p><h2>Mais de um século de família ligada a máquinas</h2>${marca.map(p => `<p>${p}</p>`).join('')}</header><ol class="tempo-l">${linhaTempo.map(t => `<li class="sobe"><b>${t[0]}</b><p>${t[1]}</p></li>`).join('')}</ol></section>
<section class="mvv" id="missao"><article><h3>Missão</h3><p>${missao}</p></article><article><h3>Visão</h3><p>${visao}</p></article><article><h3>Valores</h3>${lista(valores)}</article></section>
<section class="logo-ev"><div><p class="k">A evolução da logomarca</p><h2>O “M” da montagem, o “O” da roda e o “T” da família</h2><p>A primeira marca, de 1984, ainda está em vigor. Em sua concepção traz os conceitos de montadora: a letra “M” com barras simboliza montagem, a letra “O” lembra o design de uma roda e a letra “T” representa a religiosidade da família. Em 2009 a empresa remodelou a identidade institucional e passou a usar também a marca atual.</p></div><div><h3>Meio ambiente e ações sociais</h3><p>${ambiente}</p></div></section>
<section class="news-pag" id="noticias"><header class="tit"><p class="k">Notícias</p><h2>O que acontece na Tramontini</h2></header>${noticiasHtml(4)}</section></div>
` + cta(v) + rodape(v);

  const trat = doMesmo('tratores'), compl = doMesmo('complementos'), carreg = doMesmo('carregadeiras');
  pag.tratores = head(v, 'tratores', 'Tratores Antonio Carraro', carraro[0]) + topo(v, 'tratores') + cab('Tratores Tramontini Antonio Carraro', 'Tratores especiais para terrenos de montanha', 'p-trator-tgf-7800-s') + `
<div class="in"><section class="carraro"><div>${carraro.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><ul class="carraro-pts">${[['Isodiamétricos', 'rodas do mesmo tamanho na frente e atrás'], ['Baixo centro de gravidade', 'mais segurança em terrenos inclinados'], ['Raio de giro reduzido', 'para pomares, vinhedos e cafezais'], ['Motores Yanmar', 'de baixo consumo']].map(x => `<li><b>${x[0]}</b><span>${x[1]}</span></li>`).join('')}</ul></section>
<section class="bloco" id="modelos"><header class="tit"><p class="k">Modelos</p><h2>Linha de tratores</h2></header>${grade(trat)}</section>
<section class="bloco" id="complementos"><header class="tit"><p class="k">Complementos</p><h2>Pulverizadores e desfolhadora</h2></header>${grade(compl)}</section>
<section class="bloco" id="carregadeiras"><header class="tit"><p class="k">Carregadeiras multifuncionais</p><h2>Nova X30</h2></header>${grade(carreg)}</section></div>
` + cta(v) + rodape(v);

  const naut = doMesmo('nautica').sort((a, b) => nautGrupo(a) - nautGrupo(b) || num(a.n) - num(b.n));
  pag.produtos = head(v, 'produtos', 'Linhas de produtos', 'Microtratores, motores, motobombas, grupos geradores, reversores náuticos, jardinagem e linha elétrica Tramontini.') + topo(v, 'produtos') + cab('Linhas de produtos', 'Equipamentos que auxiliam nos trabalhos diários', 'microtrator-campo') + `
<div class="in"><nav class="ancoras" aria-label="Linhas">${linhas.map(l => `<a href="${linhaHref(v, l)}">${l.c}</a>`).join('')}</nav>
${linhas.filter(l => !['tratores', 'eletrica'].includes(l.id)).map(l => `<section class="bloco" id="${l.id}"><header class="tit tit-linha"><div><p class="k">${l.c}</p><h2>${l.t}</h2></div><p class="tit-lado">${l.d}</p></header>${l.id === 'nautica' ? nautOrdem.map((g, i) => `<h3 class="grupo">${g}</h3>${grade(naut.filter(p => nautGrupo(p) === i))}`).join('') : grade(l.id === 'microtratores' ? [...doMesmo('microtratores'), ...doMesmo('jardinagem').filter(p => /GN18/.test(p.n))] : l.id === 'jardinagem' ? doMesmo('jardinagem').filter(p => !/GN18/.test(p.n)) : doMesmo(l.id))}</section>`).join('')}
<section class="bloco eletrica" id="eletrica"><div><p class="k">Elétrica</p><h2>A marca da energia</h2><p>A Linha Elétrica continua crescendo e a Tramontini apresenta para todo o Sul do Brasil uma ampla variedade de produtos para o setor de energia elétrica: interruptores, tomadas, módulos, placas, filtros de linha e extensões.</p><a class="btn" href="${wa('Olá! Quero conhecer a Linha Elétrica Tramontini.')}" ${ext}>${icWa()}Pedir catálogo</a></div><ul class="sub-el">${subEletrica.map(s => `<li>${ic('painel')}${s}</li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);

  pag['pos-venda'] = head(v, 'pos-venda', 'Pós-venda e peças', 'Peças de reposição originais Tramontini, pós-vendas e venda de peças por WhatsApp, catálogo de peças e programa de revendedores.') + topo(v, 'pos-venda') + cab('Pós-venda', 'Peças originais e assistência em todo o país', 'fachada') + `
<div class="in"><section class="pv"><div><p class="lead">A Tramontini oferece um amplo estoque de peças de reposição para que seus equipamentos continuem funcionando com força total. As peças são produzidas com alto padrão de qualidade e armazenadas, embaladas e enviadas com atenção para garantir o melhor estado de conservação de cada item.</p><p>Realizar manutenção nos seus equipamentos é essencial para prevenir problemas e evitar paradas indesejadas no trabalho. Verifique o manual de cada produto para saber a periodicidade adequada de manutenção.</p><p class="bts"><a class="btn" href="${E.catalogo}" ${ext}>${ic('livro')}Catálogos de peças</a></p></div><aside class="pv-caixa"><h2>Fale direto com o setor</h2>${pvLista()}<p class="nota">${E.pecasAte}.</p></aside></section>
<section class="porque"><header class="tit"><p class="k">Por que usar peças originais?</p><h2>Peças Tramontini, feitas para as máquinas Tramontini</h2></header><ul class="porque-l">${pecasPorque.map((p, i) => `<li class="sobe"><span class="n">0${i + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ul></section>
<section class="assist"><div><p class="k">Assistência técnica</p><h2>Assistência e serviço especializado</h2><p>A Tramontini oferece assistência técnica e serviço especializado para qualquer eventualidade com seus produtos. Os distribuidores contam com profissionais treinados na fábrica, com cursos técnicos sobre os produtos e noções de metrologia e mecânica.</p></div></section>
<section class="revendedor" id="revendedor"><div><p class="k">Seja um revendedor</p><h2>É com parcerias de sucesso que nos desenvolvemos cada vez mais</h2><p>Torne-se um revendedor autorizado Tramontini e tenha a oportunidade de trabalhar também com outras empresas representadas por nós, como Antonio Carraro e Neomach.</p></div><p class="bts"><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Quero ser um revendedor')}">${ic('mail')}Quero ser revendedor</a></p></section></div>
` + cta(v) + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Tramontini Máquinas: ${E.fone}, ${E.email}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Fale conosco', 'Atendimento para todo o Brasil', 'fachada') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no seu e-mail, para ${E.email}.</p>${formulario()}</div><div>${contatoLista()}${redes}${mapaFrame}</div></section>
<section class="pv-faixa"><h2>Peças e pós-vendas pelo WhatsApp</h2>${pvLista()}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="${foto.startsWith('p-') ? 'recorte' : ''}">${img(foto, alt[foto], ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Venâncio Aires/RS · desde 1984</p><h1>A marca <em>da energia.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'produtos')}">Ver as linhas</a><a class="btn btn-linha" href="${wa()}" ${ext}>${icWa()}Falar com a fábrica</a></p></div><figure class="hero-a-foto">${img('fabrica', alt.fabrica, ' loading="eager" fetchpriority="high" width="1100" height="1129"')}<figcaption>Fábrica Tramontini em Venâncio Aires: 47 mil m² de parque industrial.</figcaption></figure></div>
<ul class="in numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></section>
<section class="in linhas-a"><header class="tit tit-linha"><div><p class="k">Nossas linhas</p><h2>Do trator de montanha ao reversor de barco</h2></div></header><ul class="linhas">${linhas.map(l => `<li class="sobe"><a href="${linhaHref(v, l)}"><figure>${fotoLinha(l)}</figure><h3>${l.t}</h3><p>${l.d}</p><span class="link-seta">Ver linha ${ic('seta')}</span></a></li>`).join('')}</ul></section>
<section class="carraro-a"><div class="in carraro-a-in"><figure>${img('p-trator-tgf-7800-s', 'Trator TGF 7800 S Antonio Carraro')}</figure><div><p class="k">Tramontini Antonio Carraro</p><h2>Tratores especiais para a Serra Gaúcha e o café de Minas</h2><p>${carraro[1]}</p><ul class="mini">${doMesmo('tratores').map(t => `<li><a href="${link(v, 'tratores')}#${t.s}">${t.n.replace('Trator ', '')}</a></li>`).join('')}</ul><a class="btn" href="${link(v, 'tratores')}">Conhecer os tratores</a></div></div></section>
<section class="in news-a"><header class="tit tit-linha"><div><p class="k">Notícias</p><h2>Novidades da Tramontini</h2></div><a class="link-seta" href="${link(v, 'empresa')}#noticias">Todas as notícias ${ic('seta')}</a></header>${noticiasHtml(3)}</section>
<section class="in pv-a"><div><p class="k">Pós-venda</p><h2>Peças originais e assistência em todo o Brasil</h2><p>Amplo estoque de peças de reposição e atendimento por WhatsApp para pós-vendas e venda de peças.</p><a class="link-seta" href="${link(v, 'pos-venda')}">Pós-venda e peças ${ic('seta')}</a></div>${pvLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="${foto.startsWith('p-') ? 'recorte' : ''}">${img(foto, alt[foto], ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Tramontini · 40 anos</p><h1>Máquinas para quem trabalha <span>no campo e na água.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'tratores')}">${ic('trator')}Tratores Antonio Carraro</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Todas as linhas</a></p></div><figure class="hero-b-foto"><span class="oval" aria-hidden="true"></span>${img('p-trator-tgf-7800-s', 'Trator TGF 7800 S Antonio Carraro', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="numeros-b"><ul class="in">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></section>
<section class="in linhas-b"><header class="tit"><p class="k">Linhas de produtos</p><h2>Oito linhas, uma fábrica</h2></header><ol class="linhas-l">${linhas.map((l, i) => `<li class="sobe"><a href="${linhaHref(v, l)}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${l.t}</h3><p>${l.d}</p></div><figure>${fotoLinha(l)}</figure>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="fab-b"><div class="in fab-b-in"><figure>${img('fabrica', alt.fabrica, ' width="1100" height="1129"')}</figure><div><p class="k">A empresa</p><h2>De Encantado para o Brasil</h2><p>${quem[2]}</p><p>${engenharia[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Tramontini ${ic('seta')}</a></div></div></section>
<section class="in news-b"><header class="tit tit-linha"><div><p class="k">Notícias</p><h2>Na estrada com a Antonio Carraro</h2></div><a class="link-seta" href="${link(v, 'empresa')}#noticias">Mais notícias ${ic('seta')}</a></header>${noticiasHtml(3)}</section>
<section class="in pv-b"><div><p class="k">Pós-venda e peças</p><h2>Fale direto com o setor certo</h2></div>${pvLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Tramontini Máquinas', artigo: 'da', url: E.url, lang: 'pt', cor: '#c4161c', fundo: '#141517', claro: '#f5f3ef',
  fonteTitulo: 'Saira,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o vermelho do logo e a fábrica de Venâncio Aires logo na abertura. As oito linhas viram uma vitrine com as fotos reais dos produtos.', pontos: ['Fichas técnicas de 55 produtos', 'Tratores Antonio Carraro com página própria', 'WhatsApp de pós-vendas e peças por região'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Grafite e vermelho, com o oval da marca atrás do trator e as linhas numeradas como num catálogo de fábrica.', pontos: ['"Máquinas para quem trabalha no campo e na água."', 'Números da fábrica em destaque', 'Notícias da parceria com a Antonio Carraro'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
