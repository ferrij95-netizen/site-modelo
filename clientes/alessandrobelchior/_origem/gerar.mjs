// Alessandro Belchior Imóveis (Fortaleza/CE, desde 1989). Gera public/{a,b}/ e a página de escolha.
// node clientes/alessandrobelchior/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs alessandrobelchior https://www.alessandrobelchior.com.br/)
// Textos, contatos e imóveis: do site atual (ASP). imoveis.json = 28 dos destaques da home, com fotos da galeria de cada imóvel.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, waHref, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const IM = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8'));
const E = {
  nome: 'Alessandro Belchior Imóveis', url: 'https://alessandrobelchior.overtus.com.br/', antigo: 'https://www.alessandrobelchior.com.br/',
  wa: '558534664343', tel: '(85) 3466-4343', email: 'abi@alessandrobelchior.com.br',
  razao: 'Alessandro Belchior Administração de Imóveis Ltda.', creci: 'CRECI 720-J', cnpj: '00.558.659/0001-68',
  insta: 'https://www.instagram.com/alessandrobelchiorimoveis', face: 'https://www.facebook.com/alessandrobelchiorimoveis', yt: 'https://www.youtube.com/alessandrobelchiorimoveis',
  agenda: [['Segunda a sexta', '7h30 às 19h30'], ['Sábado', '8h às 17h']],
  curto: 'Imóveis para alugar e comprar em Fortaleza e região metropolitana, com administração de imóveis desde 1989. Três agências: Meireles, Água Fria e Centro.',
};
const agencias = [
  { nome: 'Agência Sede Meireles', rua: 'Av. Desembargador Moreira, 629', bairro: 'Meireles', wa: '5585987321215', fwa: '(85) 98732-1215', mapa: 'Av. Desembargador Moreira, 629, Meireles, Fortaleza CE' },
  { nome: 'Agência Água Fria', rua: 'Av. Washington Soares, 3777, loja 02', bairro: 'Água Fria', wa: '5585987262310', fwa: '(85) 98726-2310', mapa: 'Av. Washington Soares, 3777, Água Fria, Fortaleza CE' },
  { nome: 'Agência Centro', rua: 'R. Pedro Borges, 33, loja 16', bairro: 'Centro', wa: '5585988991723', fwa: '(85) 98899-1723', mapa: 'Rua Pedro Borges, 33, Centro, Fortaleza CE' },
];
const prop = [
  { t: 'Sistema Garantido de Administração', d: 'Você recebe o aluguel do seu imóvel em dia, independente do pagamento ter sido feito pelo locatário.', i: 'escudo' },
  { t: 'Aluguel antecipado', d: 'Para imóveis já administrados e locados: antecipação de até 3 meses de aluguel, sujeita a aprovação e remunerada por taxa extra.', i: 'calendario' },
  { t: 'Controle de contas', d: 'A empresa monitora e cobra todas as obrigações dos locatários relativas ao seu imóvel.', i: 'check' },
  { t: 'Assistência jurídica', d: 'Advogados especializados em direito imobiliário, com atuação exclusiva para as demandas dos clientes. Ações de despejo, cobrança e revisionais sem ônus de honorários para o proprietário.', i: 'livro' },
  { t: 'Planejamento de carteira', d: 'Consultoria para montar ou reposicionar uma carteira de imóveis em locação, de uma sala a centros comerciais e prédios inteiros.', i: 'painel' },
  { t: 'Contratos com vistoria', d: 'Contrato elaborado junto com o relatório de vistoria, para o imóvel voltar nas mesmas condições em que foi alugado. Extrato mensal completo.', i: 'chave' },
];
const garantias = ['Fiador convencional', 'Caução Fácil Automóvel®', 'Caução pecuniária', 'Seguro fiança', 'Caução imóvel'];
const inq = [
  { t: 'Caução Fácil Automóvel®', d: 'Serviço exclusivo da Alessandro Belchior: não tem fiador nem outra garantia? Basta ter um carro. Ele pode ser a garantia do contrato (sujeito a aprovação de cadastro).', i: 'carro' },
  { t: 'Atendimento estendido', d: 'São 12 horas de atendimento direto, sem intervalo, de segunda a sexta (7h30 às 19h30), e plantão aos sábados das 8h às 17h.', i: 'relogio' },
  { t: 'Pagamento fácil', d: 'Pague o aluguel 24 horas por dia pela rede bancária ou na rede de farmácias Pague Menos, sem fila. Recibo on-line na área do cliente.', i: 'disco' },
  { t: 'Suporte ao cliente', d: 'Suporte para resolver defeitos no imóvel ou conflitos na locação durante todo o contrato.', i: 'usuarios' },
];
const sobre = [
  'A Alessandro Belchior está entre as maiores empresas de administração de imóveis do Brasil. Com um serviço eficiente e personalizado, tem em seu portfólio clientes de todos os portes e uma carteira bem diversificada.',
  'A busca de soluções inteligentes em imóveis é o nosso slogan e norte de trabalho. A empresa atende toda a Região Metropolitana de Fortaleza, na venda e na locação, com três agências: Meireles, Água Fria e Centro.',
  'Nos lançamentos, atua da compra do terreno ao desenvolvimento do produto, planejamento e comercialização, até a entrega das unidades. Nos imóveis avulsos, tem em carteira casas, apartamentos, salas, terrenos, lojas, galpões e prédios comerciais.',
];
const ric = 'A Alessandro Belchior é uma das 23 empresas da RIC (Rede Imobiliária Cearense), que reúne as empresas mais atuantes em vendas de Fortaleza: mais de 200 corretores trabalhando no seu imóvel e uma única empresa coordenando e prestando contas ao proprietário.';
const entidades = ['AADIC', 'FIABCI', 'ABAMI', 'Aliança Internacional'];
const social = [
  'A preocupação com o social acompanha a Alessandro Belchior desde a fundação. Os irmãos Alessandro e Germano Belchior, dirigentes da empresa, criaram a campanha "Amigos em Ação", que começou levando alimentos doados por amigos a instituições filantrópicas e se tornou um programa de conscientização social.',
  'Em 1998 a empresa coordenou no Ceará a arrecadação da campanha Natal Sem Fome, criada pelo sociólogo Betinho: mais de 30.000 quilos de alimentos doados a famílias da periferia de Fortaleza.',
  'Para dentro de casa, investe em treinamento contínuo, certificação 5S, plano de saúde e bolsas de estudo de nível superior para os colaboradores, e patrocina atletas e equipes de corrida de Fortaleza desde 2004.',
];

const nav = [
  { slug: 'index', nome: 'Início' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' },
  { slug: 'proprietarios', nome: 'Proprietários' }, { slug: 'inquilinos', nome: 'Inquilinos' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'contato', nome: 'Contato' },
];
export const nomesVersao = { a: 'Beira-Mar', b: 'Agência' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Scada:wght@400;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Public+Sans:wght@400;500;600&display=swap',
};
const cores = { a: '#ff6c3a', b: '#222935' };
const ext = 'target="_blank" rel="noopener"';
const wa = (m = 'Olá! Vim pelo site da Alessandro Belchior Imóveis.') => waHref(E.wa, m);
const img = (n, a = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const titulo = { index: '', alugar: 'Imóveis para alugar', comprar: 'Imóveis à venda', proprietarios: 'Para proprietários', inquilinos: 'Para inquilinos', empresa: 'A empresa', contato: 'Contato' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Alessandro Belchior Imóveis | Aluguel e venda em Fortaleza' : `${t} | Alessandro Belchior Imóveis`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

// ---------- imóveis ----------
const aluguel = IM.filter(i => i.negocio === 'aluguel');
const venda = IM.filter(i => i.negocio === 'venda');
const precoTxt = i => i.preco.replace(',00', '') + (i.negocio === 'aluguel' ? '<small>/mês</small>' : '');
const m2 = n => `${n.toLocaleString('pt-BR')} m²`;
const fichaItens = i => {
  const f = i.ficha, o = [];
  if (f.area) o.push(['area', m2(f.area), 'área privativa']);
  else if (f.total) o.push(['area', m2(f.total), 'área total']);
  if (f.quartos) o.push(['cama', f.quartos, f.quartos > 1 ? 'quartos' : 'quarto']);
  if (f.suites) o.push(['banho', f.suites, f.suites > 1 ? 'suítes' : 'suíte']);
  if (f.vagas) o.push(['carro', f.vagas, f.vagas > 1 ? 'vagas' : 'vaga']);
  return o;
};
const IC2 = {
  area: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  cama: '<path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 14h18M3 18v2M21 18v2M6 9V6h5v3"/>',
  banho: '<path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4zM6 12V5a2 2 0 014 0M7 19l-1 2M17 19l1 2"/>',
  carro: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3z"/><circle cx="7.5" cy="13" r=".8"/><circle cx="16.5" cy="13" r=".8"/>',
  lupa: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
};
const ic2 = n => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC2[n]}</svg>`;
const fichaHtml = i => `<ul class="ficha">${fichaItens(i).map(([n, val, rot]) => `<li>${ic2(n)}<b>${val}</b> <span>${rot}</span></li>`).join('')}</ul>`;
const urlImovel = (v, i) => `/${v}/imovel/${i.slug}/`;
const resumo = (t, n = 120) => (t.length > n ? t.slice(0, t.lastIndexOf(' ', n)) + '…' : t);
const cartao = (v, i) => `<li class="card" data-tipo="${esc(i.tipo)}" data-bairro="${esc(i.bairro)}"><a href="${urlImovel(v, i)}">
  <figure><img src="/assets/img/c-${i.slug}.webp" alt="${esc(`${i.tipo} em ${i.bairro}`)}" loading="lazy" decoding="async"><span class="card-neg">${i.negocio === 'aluguel' ? 'Aluguel' : 'Venda'}</span></figure>
  <div class="card-txt"><p class="card-preco">${precoTxt(i)}</p><h3>${esc(i.tipo)} <span>· ${esc(i.bairro)}</span></h3><p class="card-desc">${esc(resumo(i.desc))}</p>${fichaHtml(i)}<p class="card-cod">Código ${i.cod}</p></div></a></li>`;
const grade = (v, lista) => `<ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul>`;
const opcoes = (lista, campo) => [...new Set(lista.map(i => i[campo]))].sort((a, b) => a.localeCompare(b, 'pt')).map(x => `<option>${esc(x)}</option>`).join('');
const filtro = lista => `<form class="filtro" data-filtro>
  <label>Tipo<select name="tipo"><option value="">Todos</option>${opcoes(lista, 'tipo')}</select></label>
  <label>Bairro<select name="bairro"><option value="">Todos</option>${opcoes(lista, 'bairro')}</select></label>
  <p class="filtro-n" aria-live="polite"><b>${lista.length}</b> imóveis</p>
</form>`;
const scriptFiltro = `<script>(function(){var f=document.querySelector('[data-filtro]');if(!f)return;var q=new URLSearchParams(location.search);['tipo','bairro'].forEach(function(k){var v=q.get(k);if(v){var s=f.elements[k];for(var i=0;i<s.options.length;i++)if(s.options[i].text===v)s.selectedIndex=i}});
function r(){var t=f.elements.tipo.value,b=f.elements.bairro.value,n=0;document.querySelectorAll('.cards .card').forEach(function(c){var ok=(!t||c.dataset.tipo===t)&&(!b||c.dataset.bairro===b);c.hidden=!ok;if(ok)n++});f.querySelector('.filtro-n b').textContent=n;document.querySelector('.sem-res').hidden=n>0}
f.addEventListener('change',r);r()})();</script>`;
const busca = (v, cls = '') => `<form class="busca ${cls}" action="/${v}/alugar/" data-busca>
  <fieldset class="busca-neg"><legend class="sr">Negócio</legend><label><input type="radio" name="neg" value="alugar" checked><span>Quero alugar</span></label><label><input type="radio" name="neg" value="comprar"><span>Quero comprar</span></label></fieldset>
  <label class="busca-campo">Tipo de imóvel<select name="tipo"><option value="">Todos os tipos</option>${opcoes(IM, 'tipo')}</select></label>
  <button class="btn" type="submit">${ic2('lupa')}Buscar</button>
</form>
<script>(function(){var f=document.querySelector('[data-busca]');f.addEventListener('change',function(){f.action='/${v}/'+f.elements.neg.value+'/'})})();</script>`;
const naoAchou = `<aside class="nao-achou"><div><h2>Não encontrou o imóvel certo?</h2><p>Aqui está uma seleção da carteira. Diga o tipo, o bairro e o valor que um corretor manda as opções disponíveis.</p></div><a class="btn" href="${wa('Olá! Procuro um imóvel e não achei no site. Busco:')}" ${ext}>${icWa()}Falar com um corretor</a></aside>`;

// ---------- blocos ----------
const contatoAg = () => `<ul class="agencias">${agencias.map(a => `<li><h3>${a.nome}</h3><p>${ic('pin')}<span>${a.rua}<br>${a.bairro}, Fortaleza - CE</span></p><p>${icWa()}<a href="${waHref(a.wa, 'Olá! Vim pelo site da Alessandro Belchior.')}" ${ext}>${a.fwa}</a></p><p><a class="link-seta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapa)}" ${ext}>Ver no mapa ${ic('seta')}</a></p></li>`).join('')}</ul>`;
const horario = () => `<dl class="horario">${E.agenda.map(([d, h]) => `<div><dt>${d}</dt><dd>${h}</dd></div>`).join('')}</dl>`;
const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero colocar meu imóvel para alugar</option><option>Quero vender meu imóvel</option><option>Sou cliente (boleto, contrato)</option></select></label><label>Bairro de interesse<input name="bairro" placeholder="Ex.: Meireles"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const servs = arr => `<ul class="servs">${arr.map(s => `<li class="sobe"><span class="servs-ic">${ic(s.i)}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ul>`;
const numeros = () => `<ul class="nums"><li><b>1989</b><span>no mercado de Fortaleza</span></li><li><b>3</b><span>agências: Meireles, Água Fria e Centro</span></li><li><b>172</b><span>bairros com imóveis disponíveis</span></li><li><b>21</b><span>tipos de imóveis à disposição</span></li></ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="topo-fina"><div class="in"><span>${E.creci}</span><a href="${telHref(E.tel)}">${ic('tel')}${E.tel}</a><a href="https://www.alessandrobelchior.com.br/login.asp" ${ext}>Área do cliente</a><a href="https://www.alessandrobelchior.com.br/login.asp?blt=1" ${ext}>2ª via do boleto</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Alessandro Belchior Imóveis, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Alessandro Belchior Imóveis" width="1237" height="220"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v, extra = '') {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Alessandro Belchior Imóveis" width="1237" height="220" loading="lazy"><p>Soluções inteligentes em imóveis desde 1989. Aluguel, venda e administração de imóveis em Fortaleza e região metropolitana.</p><p class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>Imóveis</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Agências</h3><ul class="rod-dados">${agencias.map(a => `<li>${ic('pin')}<span><b>${a.bairro}</b><br>${a.rua}</span></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.tel)}">${E.tel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul>${horario()}</div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao} · ${E.creci} · CNPJ ${E.cnpj}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
${extra}</body>
</html>
`;
}

function paginaImovel(v, i) {
  const [capa, ...resto] = i.fotos;
  const msg = `Olá! Tenho interesse no imóvel ${i.cod} (${i.tipo}, ${i.bairro}) que vi no site.`;
  const voltar = i.negocio === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, `imovel/${i.slug}`, `${i.tipo} em ${i.bairro}, ${i.cod}`, resumo(i.desc, 150)) + topo(v, voltar) + `
<div class="in imovel">
  <p class="migalha"><a href="${link(v, voltar)}">${ic('seta')}${voltar === 'alugar' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  <div class="imovel-fotos">
    <a class="if-capa" href="/assets/img/${capa[0]}.webp" data-foto="${esc(`${i.tipo} em ${i.bairro}`)}">${img(capa[0], `${i.tipo} em ${i.bairro}`, ` width="${capa[1]}" height="${capa[2]}" loading="eager" fetchpriority="high"`)}</a>
    ${resto.length ? `<ul>${resto.map((f, k) => `<li><a href="/assets/img/${f[0]}.webp" data-foto="${esc(`${i.tipo} em ${i.bairro}, foto ${k + 2}`)}">${img(f[0], `${i.tipo} em ${i.bairro}, foto ${k + 2}`, ` width="${f[1]}" height="${f[2]}"`)}</a></li>`).join('')}</ul>` : ''}
  </div>
  <div class="imovel-grade">
    <div>
      <p class="k">${i.negocio === 'aluguel' ? 'Para alugar' : 'À venda'} · Código ${i.cod}</p>
      <h1>${esc(i.tipo)} no bairro ${esc(i.bairro)}</h1>
      ${fichaHtml(i)}
      <h2>Sobre o imóvel</h2>
      <p class="imovel-desc">${esc(i.desc)}</p>
    </div>
    <aside class="imovel-lado">
      <p class="imovel-preco">${precoTxt(i)}</p>
      ${i.negocio === 'aluguel' ? '<p class="imovel-obs">Condomínio e IPTU não inclusos, salvo quando informado na descrição.</p>' : ''}
      <a class="btn" href="${wa(msg)}" ${ext}>${icWa()}Quero este imóvel</a>
      <a class="btn btn-linha" href="${telHref(E.tel)}">${ic('tel')}${E.tel}</a>
      ${i.negocio === 'aluguel' ? `<p class="imovel-gar">Garantias aceitas: ${garantias.slice(0, 3).join(', ')}.</p>` : ''}
    </aside>
  </div>
</div>
` + rodape(v);
}

function comum(v, pag, cab) {
  const listaPag = (slug, lst, t, sub) => head(v, slug, t, sub) + topo(v, slug) + cab(t, sub) + `
<div class="in sec">${filtro(lst)}${grade(v, lst)}<p class="sem-res" hidden>Nenhum imóvel com esse filtro nesta seleção. <a href="${wa('Olá! Procuro um imóvel com estas características:')}" ${ext}>Peça ao corretor</a>.</p>${naoAchou}</div>
` + rodape(v, scriptFiltro);
  pag.alugar = listaPag('alugar', aluguel, 'Imóveis para alugar', 'Apartamentos, casas, salas, galpões e terrenos em Fortaleza e região');
  pag.comprar = listaPag('comprar', venda, 'Imóveis à venda', 'Do terreno no litoral ao alto padrão na Beira Mar');
  pag.proprietarios = head(v, 'proprietarios', 'Para proprietários', prop[0].d) + topo(v, 'proprietarios') + cab('Para proprietários', 'Seu aluguel em dia, mesmo quando o inquilino atrasa') + `
<div class="in">
  <section class="sec destaque-sga"><div><p class="k">Sistema Garantido de Administração de Imóveis</p><h2>A gente paga para ver sua satisfação. Literalmente.</h2><p>O SGA é a fórmula que a Alessandro Belchior encontrou para trazer tranquilidade a quem tem imóvel alugado: você recebe o valor do aluguel em dia, independente do pagamento ter sido efetuado pelo locatário.</p><p>A seleção de inquilinos é criteriosa, com fiador ou garantia equivalente, e gerentes de locação experientes acompanham cada passo do atendimento.</p></div><a class="btn" href="${wa('Olá! Quero colocar meu imóvel para alugar com a Alessandro Belchior.')}" ${ext}>${icWa()}Colocar meu imóvel para alugar</a></section>
  <section class="sec">${servs(prop)}</section>
  <section class="sec duas"><div><p class="k">Divulgação</p><h2>Estrutura comercial na medida do que você exige</h2><p>A carteira é divulgada em placas nos imóveis, anúncios, folhetos promocionais e 24 horas no site. Os valores de aluguel são avaliados com critério e acompanhados durante toda a locação.</p></div><div><p class="k">Venda</p><h2>Rede Imobiliária Cearense</h2><p>${ric}</p><a class="link-seta" href="${wa('Olá! Quero vender meu imóvel.')}" ${ext}>Quero vender meu imóvel ${ic('seta')}</a></div></section>
</div>
` + rodape(v);
  pag.inquilinos = head(v, 'inquilinos', 'Para inquilinos', inq[0].d) + topo(v, 'inquilinos') + cab('Para inquilinos', 'Alugar sem fiador, pagar sem fila, ser atendido até 19h30') + `
<div class="in">
  <section class="sec">${servs(inq)}</section>
  <section class="sec duas"><div><p class="k">Garantias múltiplas</p><h2>A garantia que melhor se adequar a você</h2><p>A Alessandro Belchior trabalha com o maior número de garantias do mercado, o que deixa a locação mais rápida para os dois lados.</p>${lista(garantias)}</div><div class="cartao-doc"><h2>Ficha cadastral</h2><p>Locatários e fiadores preenchem a ficha cadastral para a análise. Peça a ficha pelo WhatsApp ou retire em uma das agências.</p><a class="btn" href="${wa('Olá! Quero a ficha cadastral para alugar um imóvel.')}" ${ext}>${icWa()}Pedir a ficha cadastral</a><p class="mini">Já é cliente? Manual do locatário, Lei do Inquilinato e 2ª via do boleto ficam na <a href="https://www.alessandrobelchior.com.br/login.asp" ${ext}>área do cliente</a>.</p></div></section>
</div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A empresa', sobre[0]) + topo(v, 'empresa') + cab('A empresa', 'Soluções inteligentes em imóveis desde 1989') + `
<div class="in">
  <section class="sec texto-pag"><div>${sobre.map((p, k) => `<p${k ? '' : ' class="lead"'}>${p}</p>`).join('')}<p>${ric}</p><p class="ents"><span>Filiada a</span>${entidades.map(x => `<b>${x}</b>`).join('')}</p></div><figure>${img('meireles-comercial', 'Edifício comercial no Meireles, Fortaleza')}</figure></section>
  ${numeros()}
  <section class="sec social"><p class="k">Responsabilidade social</p><h2>Amigos em Ação</h2>${social.map(p => `<p>${p}</p>`).join('')}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Alessandro Belchior Imóveis: ${E.tel}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Três agências em Fortaleza e atendimento pelo WhatsApp') + `
<div class="in">
  <section class="sec contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div><ul class="contato-lista"><li>${ic('tel')}<div><strong>Central</strong><a href="${telHref(E.tel)}">${E.tel}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('relogio')}<div><strong>Horário</strong>${E.agenda.map(([d, h]) => `<span>${d}: ${h}</span>`).join('')}</div></li></ul></div></section>
  <section class="sec"><header class="tit"><p class="k">Agências</p><h2>Venha conversar com a gente</h2></header>${contatoAg()}</section>
</div>
` + rodape(v);
  for (const i of IM) pag[`imovel/${i.slug}`] = paginaImovel(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (t, sub) => `<section class="cab-a"><div class="in"><h1>${t}</h1><p>${sub}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Fortaleza · desde 1989</p><h1>O imóvel certo em Fortaleza, <span>do Centro à Beira Mar.</span></h1><p>${E.curto}</p>${busca(v)}</div>
  <figure class="hero-a-foto">${img('hero-beira-mar', 'Vista da Avenida Beira Mar a partir de um apartamento à venda', ' width="1024" height="768" loading="eager" fetchpriority="high"')}<figcaption><b>Código ABA 6394</b> · Vista de um dos apartamentos à venda na Av. Beira Mar</figcaption></figure>
</div></section>
<section class="in sec"><header class="tit tit-linha"><div><p class="k">Destaques de aluguel</p><h2>Para morar ou montar o seu negócio</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Todos para alugar ${ic('seta')}</a></header>${grade(v, aluguel.slice(0, 6))}</section>
<section class="faixa-a"><div class="in faixa-a-in"><div><p class="k">Para proprietários</p><h2>Seu aluguel em dia, mesmo quando o inquilino atrasa.</h2><p>Com o Sistema Garantido de Administração de Imóveis, você recebe o aluguel em dia, independente do pagamento do locatário. Contrato com vistoria, controle de contas e assistência jurídica.</p><a class="btn btn-claro" href="${link(v, 'proprietarios')}">Como funciona</a></div>${numeros()}</div></section>
<section class="in sec"><header class="tit tit-linha"><div><p class="k">Destaques de venda</p><h2>Casas, apartamentos e terrenos à venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header>${grade(v, venda.slice(0, 6))}</section>
<section class="in sec duas inq-a"><div><p class="k">Para inquilinos</p><h2>Sem fiador? Basta ter um carro.</h2><p>${inq[0].d}</p><a class="link-seta" href="${link(v, 'inquilinos')}">Garantias e facilidades ${ic('seta')}</a></div><div>${lista(['Pague o aluguel na rede de farmácias Pague Menos', 'Atendimento de segunda a sexta das 7h30 às 19h30', 'Plantão aos sábados das 8h às 17h', 'Suporte durante todo o contrato'])}</div></section>
<section class="in sec"><header class="tit"><p class="k">Agências</p><h2>Meireles, Água Fria e Centro</h2></header>${contatoAg()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (t, sub) => `<section class="cab-b"><div class="in"><h1>${t}</h1><p>${sub}</p></div></section>`;
  const tira = ['abae-7631-0', 'aba-7100-0', 'abl-14884-0'].map(n => img(n, '', ' loading="eager"')).join('');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">${E.creci} · desde 1989</p><h1>Alugar, comprar e administrar imóveis em Fortaleza.</h1><p>${E.curto}</p></div>${busca(v, 'busca-b')}</div><div class="hero-b-tira" aria-hidden="true">${tira}</div></section>
<section class="in sec"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Destaques de aluguel</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header>${grade(v, aluguel.slice(0, 6))}</section>
<section class="sga-b"><div class="in sga-b-in"><div><p class="k">Sistema Garantido de Administração</p><h2>A gente paga para ver sua satisfação. Literalmente.</h2><p>Proprietário recebe o aluguel em dia, independente do pagamento do locatário. Seleção criteriosa de inquilinos, contrato com vistoria e departamento jurídico próprio.</p><a class="btn" href="${link(v, 'proprietarios')}">Para proprietários</a></div><ol>${prop.slice(1, 5).map(p => `<li><b>${p.t}</b><span>${p.d}</span></li>`).join('')}</ol></div></section>
<section class="in sec"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Destaques de venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header>${grade(v, venda.slice(0, 6))}</section>
<section class="in">${numeros()}</section>
<section class="in sec ag-b"><header class="tit"><p class="k">Atendimento de segunda a sábado</p><h2>Três agências em Fortaleza</h2></header>${contatoAg()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Alessandro Belchior Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#ff6c3a', fundo: '#222935', claro: '#f7f4ef',
  fonteTitulo: 'Scada,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, com o laranja do site atual, a vista da Beira Mar na abertura e a busca logo no topo.', pontos: ['Busca por aluguel ou compra na primeira tela', `${IM.length} imóveis reais com fotos e ficha`, 'Proprietários, inquilinos e as três agências'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Azul-grafite com o emblema do triângulo, cara de empresa grande e tradicional.', pontos: ['"A gente paga para ver sua satisfação"', 'Sistema Garantido de Administração em destaque', 'Página própria para cada imóvel, com galeria'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
