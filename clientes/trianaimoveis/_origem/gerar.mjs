// Triana Imóveis (Coqueiros, Florianópolis/SC, CRECI 4339-J). Gera public/{a,b}/ e a página de escolha.
// node clientes/trianaimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs trianaimoveis https://trianaimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de ResultadoBusca.aspx + ImovelSelecionado.aspx do site atual (sistema ATODA/Agiweb):
// os 16 de locação e 22 dos 127 à venda (destaques da home + os primeiros da lista com 3 fotos ou mais), até 5 fotos de cada.
// Marca: azulejo redesenhado em vetor (marca.svg) a partir do logo.png de 200 px; nome em Cinzel, como as capitulares do logo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Triana Imóveis', url: 'https://trianaimoveis.overtus.com.br/', antigo: 'https://trianaimoveis.com.br/',
  email: 'contato@trianaimoveis.com.br', vendas: 'vendas@trianaimoveis.com.br', lgpd: 'sigilo@trianaimoveis.com.br',
  fone: '(48) 3024-9100', wa1: '5548984114060', wa1t: '(48) 98411-4060', wa2: '5548984124060', wa2t: '(48) 98412-4060',
  creci: 'CRECI 4339-J', end: 'Rua Marquês de Carvalho, 181', bairro: 'Coqueiros, Florianópolis - SC', q: 'Rua Marquês de Carvalho 181 Coqueiros Florianópolis',
  curto: 'Imobiliária em Coqueiros, Florianópolis: apartamentos, casas, terrenos e imóveis comerciais para comprar e alugar na Grande Florianópolis.',
};
// Texto do "Quem Somos" do site atual (é o único parágrafo da página)
const quem = 'Nascemos a partir da necessidade de apoiar os esforços de pequenos e grandes investidores que apostam no mercado imobiliário como um negócio com grande potencial rentável. Estamos aptos a lhe assessorar a encontrar o imóvel ideal.';
const aviso = 'Todos os dados publicados no anúncio pertinentes ao imóvel serão confirmados antes da proposta final de venda ou locação.';
// Simuladores da página Simuladores.aspx do site atual
const bancos = [
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso'],
  ['Banco do Brasil', 'https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx'],
  ['Bradesco', 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm#box1-comprar'],
  ['Itaú', 'https://www.itau.com.br/creditos-financiamentos/imoveis/simulador/'],
  ['Santander', 'https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/?headerandfooter/#/home'],
];

// ---------- imóveis ----------
const GRUPO = t => /Casa|Sítio/.test(t) ? 'casas' : /Loja|Sala|Galpão|Prédio/.test(t) ? 'comerciais' : /Terreno/.test(t) ? 'terrenos' : 'apartamentos';
const nomeG = { apartamentos: 'Apartamentos', casas: 'Casas e sítio', comerciais: 'Comerciais', terrenos: 'Terrenos' };
const area = s => (s || '').replace(/,00m²$/, ' m²').replace(/m²$/, ' m²');
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => ({
  ...x, slug: `imovel/${x.neg === 'venda' ? 'v' : 'a'}${x.cod}`, grupo: GRUPO(x.tipo), area: area(x.area),
}));
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const TOTAL_VENDA = 127, TOTAL_LOC = 16;
const cidades = [...new Set(imoveis.map(i => i.cidade))];
const porCod = (neg, c) => imoveis.find(i => i.neg === neg && i.cod === c);

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'financiamento', nome: 'Financiamento' }, { slug: 'empresa', nome: 'A Triana' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Azulejo', b: 'Coqueiros' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter+Tight:wght@400;500;600&display=swap',
};
const cores = { a: '#8a1b1e', b: '#2b0b0d' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Triana Imóveis | Comprar e alugar imóveis em Florianópolis' : `${titulo} | Triana Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').trim().replace('<svg ', '<svg class="marca-t" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Triana Imóveis, página inicial"` : ''}>${marcaSvg}<span class="marca-n"><b>Triana</b><small>Imóveis</small></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area, i.grupo !== 'comerciais' && i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.grupo !== 'comerciais' && i.suites && quando(i.suites, 'suíte', 'suítes'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const mes = i => i.neg === 'aluguel' ? '<small>/mês</small>' : '';
const waImovel = i => waHref(E.wa1, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} em ${i.bairro}, ${i.cidade}) que vi no site da Triana Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${waHref(E.wa1)}" target="_blank" rel="noopener">${icWa()}<span>${E.wa1t}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>Compra, venda e locação de imóveis na Grande Florianópolis. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<span><a href="${waHref(E.wa1)}" target="_blank" rel="noopener">${E.wa1t}</a><br><a href="${waHref(E.wa2)}" target="_blank" rel="noopener">${E.wa2t}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'financiamento')}">Simular financiamento</a></li><li><a href="${link(v, 'contato')}">Anunciar meu imóvel</a></li></ul></div>
    <div><h3>Privacidade (LGPD)</h3><p class="rod-lgpd">Pedidos sobre dados pessoais: <a href="mailto:${E.lgpd}">${E.lgpd}</a>. Encarregada: Aline Alice Pagani.</p></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Triana Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}, ${i.cidade}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro}, ${i.cidade}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${mes(i)}<span class="card-cod">cód. ${i.cod}</span></p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ...Object.entries(nomeG)].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const neg = i.neg === 'aluguel' ? 'para alugar' : 'à venda';
  const dados = [['Área', i.area], ['Terreno', i.areaTerreno && i.areaTerreno !== i.area.replace(' m²', 'm²') ? area(i.areaTerreno) : ''], ['Quartos', i.grupo !== 'comerciais' && i.quartos], ['Suítes', i.grupo !== 'comerciais' && i.suites], ['Banheiros', i.banh], ['Vagas', i.gar]].filter(d => d[1]);
  const fotos = `<div class="galeria n${i.fotos.length}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${i.tipo} ${neg} em ${i.bairro}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const outro = imoveis.find(o => o.cod === i.cod && o.neg !== i.neg);
  return head(v, i.slug, `${i.tipo} ${neg} em ${i.bairro}`, `${i.titulo}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}. Cód. ${i.cod}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.tipo} ${neg} · cód. ${i.cod}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, ${i.cidade} - SC</p>
      <p class="preco-m"><b>${i.preco}</b>${mes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
      ${i.estrutura.length ? `<h2>No imóvel</h2><ul class="lista-check amen">${i.estrutura.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      <p class="aviso">${aviso}</p>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${mes(i)}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      ${outro ? `<p class="pb-outro">Também ${outro.neg === 'aluguel' ? 'para alugar' : 'à venda'}: <a href="${link(v, outro.slug)}">${outro.preco}${outro.neg === 'aluguel' ? '/mês' : ''}</a></p>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      ${i.neg === 'venda' ? `<a class="pb-fin" href="${link(v, 'financiamento')}">${ic('calendario')}Simular financiamento</a>` : ''}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Triana Imóveis.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa1}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Celular<input name="celular" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Financiamento</option><option>Outro assunto</option></select></label><label>Bairro ou cidade<input name="local" placeholder="Coqueiros, São José, Palhoça..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Triana Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.q)}&z=16&output=embed"></iframe>`;
const bancosLista = () => `<ul class="bancos">${bancos.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener"><span>${b[0]}</span><small>Abrir simulador ${ic('ext')}</small></a></li>`).join('')}</ul>`;
const tipos = lista => Object.entries(nomeG).filter(g => lista.some(i => i.grupo === g[0]));

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Imóveis à venda em Florianópolis, São José, Palhoça, Biguaçu e região. ${vendas.length} em destaque, com fotos e valores.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis para comprar na Grande Florianópolis', `${vendas.length} imóveis em destaque, de um studio em Coqueiros a um sítio em Urubici. A Triana tem ${TOTAL_VENDA} imóveis à venda; peça a lista completa pelo WhatsApp.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="lista-mais">Não achou o que procura? <a href="${waHref(E.wa1, 'Olá! Estou procurando um imóvel para comprar.')}" target="_blank" rel="noopener">Conte o que você quer</a> e a Triana procura para você.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `Os ${aluguel.length} imóveis para alugar da Triana Imóveis: apartamentos, casa, lojas, galpões e terreno comercial em Florianópolis, São José e Palhoça.`) + topo(v, 'alugar') + cab('Locação anual', 'Imóveis para alugar', `Todos os ${aluguel.length} imóveis de locação da Triana hoje: apartamentos, uma casa no Centro, lojas, galpões e um terreno comercial.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.financiamento = head(v, 'financiamento', 'Simular financiamento', 'Simuladores de financiamento imobiliário da Caixa, Banco do Brasil, Bradesco, Itaú e Santander.') + topo(v, 'financiamento') + cab('Financiamento', 'Simule o financiamento antes de visitar', 'Os simuladores dos cinco bancos, num só lugar. Com o resultado em mãos, fale com a Triana para ver os imóveis que cabem na parcela.') + `
<div class="in fin-pag">${bancosLista()}<aside class="fin-nota"><h2>Depois da simulação</h2><p>Mande o valor de entrada e a parcela que você consegue pagar. A Triana separa os imóveis que se encaixam e acompanha a documentação com o banco.</p><a class="btn btn-wa" href="${waHref(E.wa1, 'Olá! Fiz uma simulação de financiamento e quero ver imóveis.')}" target="_blank" rel="noopener">${icWa()}Falar com a Triana</a></aside></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Triana', `${quem} ${E.creci}.`) + topo(v, 'empresa') + cab('A Triana', 'Assessoria para quem compra, vende, aluga e investe', `Escritório em Coqueiros, na parte continental de Florianópolis. ${E.creci}.`) + `
<div class="in"><section class="inst"><p class="lead">${quem}</p><ul class="numeros"><li><b>${TOTAL_VENDA}</b><span>imóveis à venda</span></li><li><b>${TOTAL_LOC}</b><span>para alugar</span></li><li><b>${cidades.length}</b><span>cidades com imóveis em destaque</span></li></ul></section>
<section class="cidades"><header class="tit"><p class="k">Onde atua</p><h2>Da Ilha a Urubici</h2></header><ul>${cidades.map(c => `<li><b>${c}</b><span>${imoveis.filter(i => i.cidade === c).length} em destaque</span></li>`).join('')}</ul></section>
<section class="esc"><div><p class="k">Escritório</p><h2>${E.end}</h2><p>${E.bairro}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Fale conosco</a></p></div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Triana Imóveis: ${E.fone}, WhatsApp ${E.wa1t}, ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Triana', 'Para comprar, alugar ou colocar seu imóvel à venda. A mensagem vai direto para o WhatsApp do escritório.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div><ul class="contato-lista">
<li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
<li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa1)}" target="_blank" rel="noopener">${E.wa1t}</a><a href="${waHref(E.wa2)}" target="_blank" rel="noopener">${E.wa2t}</a></div></li>
<li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a><a href="mailto:${E.vendas}">${E.vendas}</a></div></li>
<li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.bairro}</span></div></li></ul></div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porCod('venda', '77').fotos[0];
  const dest = ['1376', '1418', '71', '1342', '1352', '1475', '1408', '1176'].map(c => porCod('venda', c));
  const destA = ['1322', '1416', '1443', '1253'].map(c => porCod('aluguel', c));
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Coqueiros · Florianópolis</p><h1>Imóveis na Grande Florianópolis, <em>do continente à Ilha.</em></h1><p>${E.curto}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${TOTAL_VENDA} imóveis à venda</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${TOTAL_LOC} imóveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto"><div class="moldura">${foto(capa, 'Casa térrea com arco e telhado colonial no condomínio da Praia Brava', ' loading="eager" fetchpriority="high"')}</div><figcaption>Cód. 77 · Praia Brava, Florianópolis</figcaption></figure>
</div></section>
<section class="faixa-azulejo" aria-hidden="true"></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Destaques para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver imóveis à venda ${ic('seta')}</a></header><ul class="cards">${dest.map(i => cartao(v, i)).join('')}</ul></section>
<section class="tipos-a"><div class="in"><header class="tit"><p class="k">O que você está procurando?</p><h2>Escolha pelo tipo</h2></header><ul class="tipos">${tipos(imoveis).map(([g, n]) => `<li><h3>${n}</h3><p>${vendas.some(i => i.grupo === g) ? `<a href="${link(v, 'comprar')}">para comprar <small>${vendas.filter(i => i.grupo === g).length}</small></a>` : ''}${aluguel.some(i => i.grupo === g) ? `<a href="${link(v, 'alugar')}">para alugar <small>${aluguel.filter(i => i.grupo === g).length}</small></a>` : ''}</p></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Locação anual</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${destA.map(i => cartao(v, i)).join('')}</ul></section>
<section class="fin-a"><div class="in fin-a-in"><div><p class="k">Financiamento</p><h2>Simule nos cinco bancos antes da visita</h2><p>Caixa, Banco do Brasil, Bradesco, Itaú e Santander. Com a parcela em mãos, a Triana mostra só o que cabe no seu bolso.</p><a class="btn" href="${link(v, 'financiamento')}">Ver simuladores</a></div>${bancosLista()}</div></section>
<section class="in esc-a"><div><p class="k">Escritório</p><h2>Em Coqueiros, com a Ponte Hercílio Luz logo ali</h2><p>${E.end}, ${E.bairro}.</p><ul class="contato-lista"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa1)}" target="_blank" rel="noopener">${E.wa1t}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul><p class="bts"><a class="btn" href="${link(v, 'contato')}">Anunciar meu imóvel</a></p></div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porCod('venda', '1342').fotos[0];
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-end"><b>${esc(i.titulo)}</b><small>${i.tipo} · ${i.bairro}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${i.preco}${i.neg === 'aluguel' ? '/mês' : ''}</span>${ic('seta')}</a></li>`;
  const dest = ['1376', '71', '1475', '1408'].map(c => porCod('venda', c));
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Edifício residencial com terraços nos Ingleses, com os morros do norte da Ilha ao fundo', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><div class="hero-b-selo">${marcaSvg}</div><p class="k">Triana Imóveis · ${E.creci}</p><h1>Comprar, vender e alugar na Grande Florianópolis</h1><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>${TOTAL_VENDA}</b><span>à venda</span></li><li><b>${TOTAL_LOC}</b><span>para alugar</span></li><li><b>5</b><span>bancos para simular</span></li><li><b>${cidades.length}</b><span>cidades com imóveis em destaque</span></li></ul></div></section>
<section class="in dest-b"><header class="tit tit-linha"><div><p class="k">Em destaque</p><h2>Casas e apartamentos à venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${dest.map(i => cartao(v, i)).join('')}</ul></section>
<section class="cid-b"><div class="in"><header class="tit"><p class="k">Por cidade</p><h2>Onde estão os imóveis</h2></header>${cidades.map(c => `<details class="cid"${c === 'Florianópolis' ? ' open' : ''}><summary><span class="cid-n">${c}</span><span class="cid-q">${imoveis.filter(i => i.cidade === c).length} imóveis</span>${ic('seta')}</summary><ol class="linhas">${imoveis.filter(i => i.cidade === c).map(linha).join('')}</ol></details>`).join('')}</div></section>
<section class="in quem-b"><blockquote>${quem}</blockquote><p class="bts"><a class="btn" href="${link(v, 'empresa')}">Conheça a Triana</a><a class="btn btn-linha" href="${link(v, 'financiamento')}">Simular financiamento</a></p></section>
<section class="esc-b"><div class="in esc-b-in"><div><p class="k">Escritório</p><h2>${E.end}</h2><p>${E.bairro}</p><ul class="contato-lista"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa1)}" target="_blank" rel="noopener">${E.wa1t}</a></li><li>${icWa()}<a href="${waHref(E.wa2)}" target="_blank" rel="noopener">${E.wa2t}</a></li></ul></div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa1);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Triana Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#8a1b1e', fundo: '#2b0b0d', claro: '#f8f1e4',
  fonteTitulo: '"Cormorant Garamond",Georgia,serif', fonteTexto: '"DM Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no vinho e no dourado do azulejo do logo, com a foto de abertura emoldurada por azulejos e a escolha "comprar ou alugar" logo no começo.', pontos: [`${imoveis.length} imóveis com fotos, valores e ficha completa`, 'Filtro por apartamentos, casas, comerciais e terrenos', 'Simuladores dos cinco bancos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, cor de vinho, com foto em tela cheia e os imóveis organizados por cidade: Florianópolis, São José, Palhoça, Biguaçu e serra.', pontos: ['Lista de imóveis por cidade, com código e valor', 'Visita agendada pelo WhatsApp em cada imóvel', 'Escritório em Coqueiros com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
