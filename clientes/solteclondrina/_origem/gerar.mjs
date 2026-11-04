// Soltec Energia Solar Londrina. Gera public/{a,b}/ e a página de escolha.
// node clientes/solteclondrina/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs solteclondrina https://solteclondrina.com.br/)
// Textos, contato e fotos: do site atual (Wix, static.wixstatic.com). Todas as fotos são de obras da própria empresa.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Soltec Energia Solar', url: 'https://solteclondrina.overtus.com.br/', antigo: 'https://solteclondrina.com.br/',
  wa: '5543999938486', fwa: '(43) 99993-8486', email: 'solutecsolar@gmail.com', insta: 'solutec_energia_solar', face: 'https://www.facebook.com/Solutec-Energia-Solar-107138148395341/',
  rua: 'Rua Figueira, 1280, loja B', bairro: 'Jardim Santa Rita', cidade: 'Londrina - PR',
  curto: 'Projeto, venda e instalação de energia solar em Londrina e região, com engenheiro eletricista exclusivo. Instalações elétricas desde 2002.',
};
const sobre = [
  'A Soltec Energia Solar Londrina foi criada em 2002 para atender as demandas do setor de energia elétrica e, até hoje, renova suas especializações para atender o mercado com qualidade, ética e preço justo.',
  'Com o passar dos anos, a empresa se especializou em energia solar. Com um engenheiro eletricista exclusivo, oferece venda e instalação do sistema que mais atende a sua necessidade, com custo baixo.',
  'Atendendo Londrina e região com profissionais qualificados, a base de clientes cresceu e hoje inclui grandes empresas, agricultores e condomínios.',
];
const servicos = [
  { t: 'Elaboração de projeto fotovoltaico', d: 'Projeto dimensionado para o consumo da casa, do comércio ou da propriedade rural.', s: 'Homologação junto à concessionária', i: 'painel', f: 'projeto-rural' },
  { t: 'Consulta de eficiência energética', d: 'Avaliação do consumo para indicar o sistema com melhor custo-benefício.', s: 'Ótimo serviço: nós garantimos', i: 'medidor', f: 'telhado-comercial' },
  { t: 'Instalação do sistema fotovoltaico', d: 'Instalação feita pela própria equipe, do telhado ao inversor.', s: 'Mão de obra qualificada', i: 'chave', f: 'instalacao-inversor' },
];
const produtos = [
  { t: 'Inversores solares', p: 'Os inversores solares são os itens mais vendidos no Brasil. Oferecemos os melhores equipamentos com o melhor custo-benefício para o seu projeto, selecionados pela nossa engenharia e prontos para uso desde a compra.', f: 'inversor-growatt' },
  { t: 'Painéis solares', p: 'Painéis solares de alta qualidade e referência mundial, com preço justo. Encontrou um preço melhor em outro lugar? Ligue para nós e faremos o possível para atender você.', f: 'placas-detalhe' },
];
const obras = [
  ['centro-religioso', 'Projeto em centro religioso'], ['projeto-rural', 'Projeto rural'], ['telhado-comercial', 'Projeto comercial'], ['telhado-ceramico', 'Telhado cerâmico residencial'],
  ['telhado-metalico', 'Telhado metálico'], ['telhado-residencial', 'Residência'], ['usina-por-do-sol', 'Sistema ao pôr do sol'], ['placas-reflexo', 'Placas solares'],
  ['equipe-no-telhado', 'Equipe na instalação'], ['tecnico-inversor', 'Inversor instalado'], ['quadro-string-box', 'Quadro de proteção e inversor'], ['inversor-parede', 'Inversor na parede'],
];
const altF = Object.fromEntries(obras);
Object.assign(altF, { 'instalacao-inversor': 'Técnico da Soltec instalando inversor', 'inversor-growatt': 'Inversor solar e quadro de proteção', 'placas-detalhe': 'Painéis solares refletindo o céu', 'placas-ceu': 'Painéis solares sob céu com nuvens' });
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Sobre' }, { slug: 'servicos', nome: 'Serviços e produtos' }, { slug: 'obras', nome: 'Obras' }, { slug: 'contato', nome: 'Orçamento' }];
export const nomesVersao = { a: 'Hexágono', b: 'Telhado' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Figtree:wght@400;500;600;700&display=swap';
const img = (n, a = altF[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site e quero um orçamento de energia solar.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#00a848', b: '#10233a' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Soltec Energia Solar | Londrina' : `${titulo} | Soltec Energia Solar`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Cidade<input name="cidade" placeholder="Londrina"></label><label>Tipo de imóvel<select name="imovel"><option>Residência</option><option>Comércio</option><option>Propriedade rural</option><option>Indústria</option><option>Condomínio</option></select></label></div>
  <div class="form-duas"><label>Valor médio da conta de luz<input name="conta" placeholder="Ex.: R$ 500"></label><label>Precisa de financiamento?<select name="financiamento"><option>Quero saber</option><option>Sim</option><option>Não</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Pedir orçamento pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Figueira, 1280, Jardim Santa Rita, Londrina PR')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Soltec Energia Solar, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Soltec Energia Solar" width="640" height="220"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Soltec Energia Solar" width="640" height="220" loading="lazy"><p>Projeto, venda e instalação de energia solar em Londrina e região. Instalações elétricas desde 2002.</p><p class="rod-redes"><a href="https://www.instagram.com/${E.insta}/" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Soltec Energia Solar Londrina.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servLista = () => `<ul class="servs">${servicos.map((s, i) => `<li class="sobe"><span class="servs-ic">${ic(s.i)}</span><small>0${i + 1}</small><h3>${s.t}</h3><p>${s.d}</p><p class="servs-sel">${ic('check')}${s.s}</p></li>`).join('')}</ul>`;
const prodLista = () => `<div class="prods">${produtos.map(p => `<article class="sobe"><figure>${img(p.f)}</figure><div><h3>${p.t}</h3><p>${p.p}</p></div></article>`).join('')}</div>`;
const galeria = (lista = obras) => `<ul class="galeria">${lista.map(o => `<li><a href="/assets/img/${o[0]}.webp" data-foto="${esc(o[1])}">${img(o[0], o[1])}<span>${o[1]}</span></a></li>`).join('')}</ul>`;
const finan = () => `<section class="finan"><div>${ic('escudo')}<div><h3>Financiamento com agilidade</h3><p>A Soltec auxilia você no financiamento do sistema, com agilidade e segurança, de forma prática.</p></div></div><a class="btn" href="${wa('Olá! Quero saber sobre financiamento de energia solar.')}" ${ext}>${icWa()}Perguntar</a></section>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Quer gerar a sua própria energia?</h2><p>Mande sua conta de luz pelo WhatsApp e receba um orçamento.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Formulário</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Sobre', sobre[0]) + topo(v, 'empresa') + cab('Sobre', 'Instalações elétricas desde 2002, energia solar com engenheiro próprio', 'equipe-no-telhado') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<ul class="lista-check">${['Engenheiro eletricista exclusivo', 'Parceiros dos maiores distribuidores do segmento', 'Residencial, comercial, rural e industrial', 'Auxílio no financiamento'].map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul></div><figure>${img('tecnico-inversor')}</figure></section>${finan()}</div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços e produtos', 'Projeto fotovoltaico, consulta de eficiência energética, instalação, inversores e painéis solares.') + topo(v, 'servicos') + cab('Serviços e produtos', 'Do projeto à homologação, com equipamento de qualidade', 'telhado-metalico') + `
<div class="in"><section class="sec">${servLista()}</section><section class="sec"><header class="tit"><p class="k">Produtos</p><h2>Equipamentos da mais alta qualidade</h2><p>Para todas as demandas: residencial, comercial e industrial. Somos parceiros dos maiores distribuidores do segmento e cuidamos da instalação e dos equipamentos.</p></header>${prodLista()}</section>${finan()}</div>
` + cta(v) + rodape(v);
  pag.obras = head(v, 'obras', 'Obras', 'Sistemas de energia solar instalados pela Soltec em Londrina e região.') + topo(v, 'obras') + cab('Obras', 'Sistemas instalados em Londrina e região', 'centro-religioso') + `
<div class="in"><section class="sec">${galeria()}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Orçamento', `Orçamento de energia solar em Londrina: ${E.fwa}.`) + topo(v, 'contato') + cab('Orçamento', 'Solicite seu orçamento', 'placas-ceu') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça um orçamento</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Energia solar · Londrina e região</p><h1>Energia solar com <span>engenheiro eletricista</span> do projeto à instalação.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'obras')}">Ver obras</a></p></div><div class="hero-a-mosaico"><figure class="m1">${img('telhado-ceramico', altF['telhado-ceramico'], ' loading="eager" fetchpriority="high"')}</figure><figure class="m2">${img('tecnico-inversor', altF['tecnico-inversor'], ' loading="eager"')}</figure><figure class="m3">${img('projeto-rural', altF['projeto-rural'], ' loading="eager"')}</figure></div></div></section>
<section class="in sec"><header class="tit"><p class="k">Nossos serviços</p><h2>Projeto, consulta e instalação</h2></header>${servLista()}</section>
<section class="obras-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Obras</p><h2>Casa, comércio, rural e centro religioso</h2></div><a class="link-seta" href="${link(v, 'obras')}">Todas as obras ${ic('seta')}</a></header>${galeria(obras.slice(0, 4))}</div></section>
<section class="in sec"><header class="tit"><p class="k">Produtos</p><h2>Inversores e painéis com preço justo</h2></header>${prodLista()}${finan()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('usina-por-do-sol', altF['usina-por-do-sol'], ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Soltec · Londrina · desde 2002</p><h1>O sol de Londrina <span>pagando a sua conta.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div></section>
<section class="faixa-b"><div class="in"><ul><li><b>2002</b><span>instalações elétricas desde</span></li><li><b>Engenheiro</b><span>eletricista exclusivo</span></li><li><b>Homologação</b><span>junto à concessionária</span></li><li><b>Financiamento</b><span>com auxílio da Soltec</span></li></ul></div></section>
<section class="in sec"><header class="tit"><p class="k">Serviços</p><h2>Do primeiro cálculo ao inversor ligado</h2></header>${servLista()}</section>
<section class="obras-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Obras</p><h2>Feito pela nossa equipe</h2></div><a class="link-seta" href="${link(v, 'obras')}">Galeria completa ${ic('seta')}</a></header>${galeria(obras.slice(0, 6))}</div></section>
<section class="in sec quem-b"><figure>${img('equipe-no-telhado')}</figure><div><p class="k">Sobre</p><h2>Clientes que cresceram com a gente</h2><p>${sobre[2]}</p><p>${sobre[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Sobre a Soltec ${ic('seta')}</a></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Soltec Energia Solar', artigo: 'da', url: E.url, lang: 'pt', cor: '#00a848', fundo: '#10233a', claro: '#f2f8f4',
  fonteTitulo: 'Lexend,system-ui,sans-serif', fonteTexto: 'Figtree,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o verde, azul e vermelho do hexágono do logo e as fotos das obras da Soltec em mosaico.', pontos: ['Engenheiro eletricista do projeto à instalação', 'Obras reais: casa, comércio, rural e centro religioso', 'Orçamento com auxílio no financiamento'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-noite, abrindo com as placas ao pôr do sol e títulos fortes.', pontos: ['"O sol de Londrina pagando a sua conta."', 'Desde 2002 em instalações elétricas', 'Galeria de obras da equipe'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
