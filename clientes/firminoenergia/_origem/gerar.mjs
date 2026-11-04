// Firmino Energia Solar (Firmino Engenharia, Campo Grande/MS). Gera public/{a,b}/ e a página de escolha.
// node clientes/firminoenergia/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs firminoenergia http://firminoenergia.com.br/)
// Textos, números, projetos, depoimentos e contas de luz: do site atual (WordPress). Fotos: drone e obra do próprio cliente (wp-json/wp/v2/media).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Firmino Energia Solar', url: 'https://firminoenergia.overtus.com.br/', antigo: 'http://firminoenergia.com.br/',
  wa: '5567993469540', fwa: '(67) 99346-9540', fone: '(67) 3211-2159', email: 'contato@firminoenergia.com.br', insta: 'firminoengenharia', face: 'firminoenergiasolar',
  rua: 'Av. das Bandeiras, 2827', bairro: 'Piratininga', cidade: 'Campo Grande - MS', cep: '79081-310',
  resp: 'Vanderley Firmino Madia', crea: 'Eng. Eletricista CREA 12394-D/MS',
  curto: 'Projeto e instalação de energia solar para casas, empresas e propriedades rurais em Campo Grande e no Mato Grosso do Sul, desde 2014.',
};
const quem = [
  'A Firmino Engenharia foi criada em 2014, em Campo Grande/MS, com o foco em trazer energia limpa e sustentável, a fim de reduzir os danos ambientais da geração de energia e trazer economia aos seus clientes.',
  'Com a instalação de sistemas de energia solar com tecnologia de ponta, os projetos são desenvolvidos por engenheiros e técnicos treinados, personalizados para o consumo da sua empresa ou residência, com mais comodidade e economia.',
];
const numeros = [['+950', 'sistemas instalados'], ['18 mil', 'placas solares'], ['74', 'cidades atendidas'], ['2014', 'desde']];
const projetos = [
  { id: 'projeto-03', t: 'Comércio', kwh: '6.500 kWh/mês', eco: 'R$ 90.000', fotos: ['p3-comercial', 'p3-comercial-2'] },
  { id: 'projeto-04', t: 'Residência com piscina', kwh: '2.200 kWh/mês', eco: 'R$ 30.000', fotos: ['p4-residencia', 'p4-residencia-2', 'p4-residencia-3', 'p4-residencia-4'] },
  { id: 'projeto-02', t: 'Propriedade rural', kwh: '1.200 kWh/mês', eco: 'R$ 16.000', fotos: ['p2-chacara', 'p2-chacara-2', 'p2-chacara-3'] },
  { id: 'projeto-01', t: 'Residência', kwh: '350 kWh/mês', eco: 'R$ 4.500', fotos: ['p1-telhado', 'p1-telhado-2', 'p1-inversor'] },
];
const contas = [
  { onde: 'Miranda/MS', antes: ['05/2018', '2.685 kWh', 'R$ 2.191,74'], depois: ['07/2018', '158 kWh', 'R$ 159,35'] },
  { onde: 'Campo Grande/MS', antes: ['dez/2017', '865 kWh', 'R$ 676,68'], depois: ['mar/2018', '431 kWh', 'R$ 90,18'] },
];
const depo = [
  ['Fernando Rosa Ferreira Junior', 'Empresa de total confiança, não é à toa que está no mercado há mais de 10 anos. Hoje foi realizada a instalação com os técnicos da empresa, trabalho bem feito e de acordo com as normas de segurança.'],
  ['Luiz Andrade', 'Gostei muito da instalação, da equipe, do vendedor Almeida e do pós-venda feito pelo próprio engenheiro Firmino, inclusive me entregando toda a documentação gerada.'],
  ['Paty Garcia', 'Excelente, bom suporte, tanto com o vendedor Rafael quanto no pós-venda com o Sr. Firmino! Equipe de instalação atenciosa e profissional, equipamento de primeira. Recomendo.'],
  ['Kris Lucca', 'Empresa idônea, excelente atendimento e prestação de serviços!'],
  ['Ivan Fernandes', 'Equipe qualificada para executar o projeto de energia fotovoltaica.'],
  ['Rafael Pires', 'Empresa séria e responsável! Eu indico.'],
];
const passos = [
  ['Mande sua conta de luz', 'Pelo WhatsApp ou pelo formulário, com o consumo e a cidade.', 'calendario'],
  ['Projeto personalizado', 'Engenheiros dimensionam o sistema para o consumo da casa ou da empresa.', 'painel'],
  ['Instalação', 'Equipe técnica treinada, de acordo com as normas de segurança.', 'chave'],
  ['Pós-venda com o engenheiro', 'Acompanhamento e entrega da documentação do sistema.', 'escudo'],
];
const alt = {
  'p3-comercial': 'Usina solar no telhado de comércio, vista de drone', 'p3-comercial-2': 'Telhado comercial com placas solares',
  'p4-residencia': 'Residência com piscina e placas solares, vista de drone', 'p4-residencia-2': 'Placas solares em residência com piscina', 'p4-residencia-3': 'Condomínio com placas solares', 'p4-residencia-4': 'Placas solares em casa de condomínio',
  'p2-chacara': 'Sistema solar em solo em propriedade rural', 'p2-chacara-2': 'Placas solares em solo ao lado da casa', 'p2-chacara-3': 'Propriedade rural vista de drone',
  'p1-telhado': 'Placas solares em telhado de cerâmica', 'p1-telhado-2': 'Placas solares em residência', 'p1-inversor': 'Inversor solar instalado na parede',
  'telhado-ceramico': 'Telhado cerâmico com placas solares', 'residencia-alto': 'Residência com placas solares vista de cima', piscina: 'Placas solares ao lado de piscina', galpao: 'Galpão com placas solares',
  'placas-detalhe': 'Detalhe das placas solares', 'quadro-inversores': 'Quadro com inversores', limpeza: 'Limpeza de placas solares', sede: 'Fachada da Firmino Energia Solar', 'casa-telhado': 'Casa com placas solares no telhado',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'projetos', nome: 'Projetos' }, { slug: 'economia', nome: 'Economia' }, { slug: 'contato', nome: 'Orçamento' }];
export const nomesVersao = { a: 'Sol Aberto', b: 'Usina' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400;0,62..125,600;0,62..125,800;1,62..125,800;1,62..125,900&family=Saira+Condensed:wght@600;700;800&family=Public+Sans:wght@400;500;600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Firmino e quero um orçamento de energia solar.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#f39200', b: '#1b1a19' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Energia solar em Campo Grande - MS` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Cidade<input name="cidade" autocomplete="address-level2" placeholder="Campo Grande"></label><label>Tipo de imóvel<select name="imovel"><option>Casa</option><option>Empresa / comércio</option><option>Propriedade rural</option><option>Indústria</option></select></label></div>
  <div class="form-duas"><label>Valor médio da conta de luz<input name="conta" inputmode="decimal" placeholder="Ex.: R$ 650"></label><label>Consumo médio (se souber)<input name="consumo" placeholder="Ex.: 500 kWh/mês"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Telhado, solo, prazo... Se puder, mande a foto da conta depois."></textarea></label>
  <button class="btn" type="submit">${icWa()}Pedir orçamento pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://instagram.com/${E.insta}" ${ext}>@${E.insta}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Firmino Energia Solar" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Firmino Energia Solar, Av. das Bandeiras, 2827, Campo Grande MS')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Firmino Energia Solar" width="600" height="173"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Firmino Energia Solar" width="600" height="173" loading="lazy"><p>Energia solar em Campo Grande e no Mato Grosso do Sul desde 2014.</p><p class="rod-resp"><b>${E.resp}</b><br>${E.crea}</p><p class="rod-redes"><a href="https://instagram.com/${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="https://www.facebook.com/${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Firmino Energia. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const numerosLista = () => `<ul class="numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const passosLista = () => `<ol class="passos">${passos.map((p, i) => `<li class="sobe"><span class="passo-ic">${ic(p[2])}</span><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>`;
const depoLista = (n = depo.length) => `<ul class="depo">${depo.slice(0, n).map(d => `<li class="sobe"><span class="estrelas" aria-label="5 estrelas">${ic('estrela').repeat(5)}</span><p>${d[1]}</p><b>${d[0]}</b></li>`).join('')}</ul>`;
const contaCard = c => `<article class="conta sobe"><p class="conta-onde">${ic('pin')}${c.onde}</p><div class="conta-par"><div class="antes"><small>Antes · ${c.antes[0]}</small><b>${c.antes[2]}</b><span>${c.antes[1]}</span></div>${ic('seta')}<div class="depois"><small>Depois · ${c.depois[0]}</small><b>${c.depois[2]}</b><span>${c.depois[1]}</span></div></div></article>`;
const projCard = (v, p) => `<a class="proj sobe" href="${link(v, 'projetos')}#${p.id}"><figure>${img(p.fotos[0])}</figure><div><h3>${p.t}</h3><dl><div><dt>Kit para gerar</dt><dd>${p.kwh}</dd></div><div><dt>Economia anual</dt><dd>${p.eco}</dd></div></dl></div></a>`;
const projBloco = p => `<article class="proj-bloco sobe" id="${p.id}"><header><h2>${p.t}</h2><dl><div><dt>Kit para gerar</dt><dd>${p.kwh}</dd></div><div><dt>Economia anual</dt><dd>${p.eco}</dd></div></dl></header><ul class="proj-fotos">${p.fotos.map(f => `<li><a href="/assets/img/${f}.webp" data-foto="${esc(alt[f])}">${img(f)}</a></li>`).join('')}</ul></article>`;
const mais = ['telhado-ceramico', 'residencia-alto', 'piscina', 'galpao', 'casa-telhado', 'placas-detalhe', 'quadro-inversores', 'limpeza'];
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Quanto você pode economizar?</h2><p>Mande sua conta de luz pelo WhatsApp e receba um orçamento personalizado.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Formulário de orçamento</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Quem somos', quem[0]) + topo(v, 'empresa') + cab('Quem somos', 'Energia limpa e economia desde 2014', 'sede') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<div class="resp">${ic('escudo')}<div><b>${E.resp}</b><span>${E.crea}</span><small>Responsável técnico. No pós-venda, é ele quem acompanha o cliente e entrega a documentação.</small></div></div></div><figure>${img('sede')}<figcaption>Nossa sede na Av. das Bandeiras, em Campo Grande.</figcaption></figure></section>
<section class="num-sec"><header class="tit"><p class="k">Nossos números</p><h2>Transformando histórias em números</h2></header>${numerosLista()}</section>
<section class="depo-sec"><header class="tit"><p class="k">Depoimentos</p><h2>O que os clientes dizem</h2><p>Avaliações do Google mostradas no site atual: nota "Excelente" com base em 68 avaliações.</p></header>${depoLista()}</section></div>
` + cta(v) + rodape(v);
  pag.projetos = head(v, 'projetos', 'Projetos executados', 'Projetos de energia solar executados pela Firmino em casas, comércio e propriedades rurais do Mato Grosso do Sul.') + topo(v, 'projetos') + cab('Projetos executados', 'Do telhado da casa à usina do comércio', 'p4-residencia-3') + `
<div class="in"><section class="projs-pag">${projetos.map(projBloco).join('')}</section>
<section class="mais-sec"><header class="tit"><p class="k">Mais instalações</p><h2>Outras obras da Firmino</h2></header><ul class="galeria">${mais.map(f => `<li><a href="/assets/img/${f}.webp" data-foto="${esc(alt[f])}">${img(f)}</a></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);
  pag.economia = head(v, 'economia', 'Economia', 'Contas de luz de clientes da Firmino antes e depois da energia solar, e como funciona o orçamento.') + topo(v, 'economia') + cab('Economia', 'Fique livre da despesa com o consumo de energia elétrica', 'p3-comercial-2') + `
<div class="in"><section class="contas-sec"><header class="tit"><p class="k">Antes e depois</p><h2>Contas reais de clientes</h2><p>Contas de luz da Energisa de clientes da Firmino, antes e depois da instalação do sistema.</p></header><div class="contas">${contas.map(contaCard).join('')}</div></section>
<section class="eco-proj"><header class="tit"><p class="k">Por projeto</p><h2>Economia anual dos projetos executados</h2></header><div class="projs">${projetos.map(p => projCard(v, p)).join('')}</div></section>
<section class="passos-sec"><header class="tit"><p class="k">Como funciona</p><h2>Do orçamento ao pós-venda</h2></header>${passosLista()}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Orçamento', `Orçamento de energia solar: ${E.fwa}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Orçamento', 'Estamos prontos para esclarecer suas dúvidas', 'limpeza') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Faça um orçamento</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('p4-residencia', alt['p4-residencia'], ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Energia solar · Campo Grande · MS</p><h1>Gere sua própria energia.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Quero um orçamento</a><a class="btn btn-linha" href="${link(v, 'projetos')}">Ver projetos</a></p></div></section>
<section class="num-a"><div class="in">${numerosLista()}</div></section>
<section class="in projs-a"><header class="tit tit-linha"><div><p class="k">Projetos executados</p><h2>Quanto cada projeto economiza por ano</h2></div><a class="link-seta" href="${link(v, 'projetos')}">Todos os projetos ${ic('seta')}</a></header><div class="projs">${projetos.map(p => projCard(v, p)).join('')}</div></section>
<section class="contas-a"><div class="in"><header class="tit"><p class="k">Antes e depois</p><h2>A conta de luz de quem já instalou</h2></header><div class="contas">${contas.map(contaCard).join('')}</div></div></section>
<section class="in quem-a"><figure>${img('p2-chacara')}</figure><div><p class="k">Quem somos</p><h2>Engenharia elétrica desde 2014</h2><p>${quem[0]}</p><p>${quem[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Firmino ${ic('seta')}</a></div></section>
<section class="in passos-sec"><header class="tit"><p class="k">Como funciona</p><h2>Do orçamento ao pós-venda</h2></header>${passosLista()}</section>
<section class="depo-a"><div class="in"><header class="tit"><p class="k">Depoimentos</p><h2>Nota "Excelente" com base em 68 avaliações</h2></header>${depoLista(3)}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Firmino Engenharia · desde 2014</p><h1>Sua conta de luz <span>pode cair para perto do mínimo.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}Mandar minha conta</a><a class="btn btn-linha" href="${link(v, 'economia')}">Ver contas reais</a></p></div><div class="hero-b-conta">${contaCard(contas[0])}<figure>${img('p3-comercial', alt['p3-comercial'], ' loading="eager" fetchpriority="high"')}</figure></div></div></section>
<section class="num-b"><div class="in">${numerosLista()}</div></section>
<section class="in projs-b"><header class="tit"><p class="k">Projetos executados</p><h2>Quatro obras, quatro tamanhos</h2></header><div class="projs-tabela">${projetos.map((p, i) => `<a class="pt sobe" href="${link(v, 'projetos')}#${p.id}"><figure>${img(p.fotos[0])}</figure><span class="n">0${i + 1}</span><h3>${p.t}</h3><dl><div><dt>Gera</dt><dd>${p.kwh}</dd></div><div><dt>Economia/ano</dt><dd>${p.eco}</dd></div></dl>${ic('seta')}</a>`).join('')}</div></section>
<section class="passos-b"><div class="in"><header class="tit"><p class="k">Como funciona</p><h2>Quatro passos</h2></header>${passosLista()}</div></section>
<section class="in depo-b"><header class="tit tit-linha"><div><p class="k">Depoimentos</p><h2>Quem instalou, recomenda</h2></div><a class="link-seta" href="${link(v, 'empresa')}">Todos os depoimentos ${ic('seta')}</a></header>${depoLista(3)}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Firmino Energia Solar', artigo: 'da', url: E.url, lang: 'pt', cor: '#f39200', fundo: '#1b1a19', claro: '#fff8ee',
  fonteTitulo: 'Archivo,system-ui,sans-serif', fonteTexto: '"Public Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara e ensolarada, com o laranja do raio do logo e as fotos de drone das obras da Firmino em tela cheia.', pontos: ['"Gere sua própria energia."', 'Economia anual de cada projeto executado', 'Contas de luz reais, antes e depois'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura e direta, abrindo com uma conta real que caiu de R$ 2.191 para R$ 159. Pensada para converter em orçamento.', pontos: ['Conta antes e depois logo na abertura', 'Números: +950 sistemas, 18 mil placas, 74 cidades', 'Orçamento com valor da conta e tipo de imóvel'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
