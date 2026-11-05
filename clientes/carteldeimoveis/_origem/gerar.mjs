// Cartel de Imóveis (Lapa, São Paulo/SP, CRECI 10.253). Gera public/{a,b}/ e a página de escolha.
// node clientes/carteldeimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs carteldeimoveis http://www.carteldeimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das páginas /Imovel/<ref>/ do site atual (37 de 384 anúncios: os da home
// com fotos e os mais recentes com 3 fotos ou mais; até 5 fotos de cada, com a marca d'água que a Cartel já põe).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Cartel de Imóveis', url: 'https://carteldeimoveis.overtus.com.br/', antigo: 'http://www.carteldeimoveis.com.br/',
  fone: '(11) 3832-0306', cel: '(11) 94017-6465', wa: '5511940176465', email: 'cartel@carteldeimoveis.com.br', creci: '10.253',
  end: 'Rua Brg. Gavião Peixoto, 868', bairro: 'Lapa, São Paulo - SP', cep: '05078-000', horario: 'Segunda a sexta, das 9h às 18h',
  mapa: 'Rua Brigadeiro Gavião Peixoto 868 Lapa São Paulo',
  curto: 'Imobiliária na Lapa, Zona Oeste de São Paulo: casas, sobrados, apartamentos e pontos comerciais para comprar e alugar.',
};
// Textos da página "Empresa" do site atual
const lema = 'Só quem tem princípios pode apresentar soluções que resultem em excelência de serviços.';
const principios = [
  ['Solidez', 'Empresa bem capitalizada, criteriosa política de trabalho e rigoroso controle de gastos. Essa é a filosofia acumulada em 20 anos na administração de bens de terceiros e na intermediação da compra e venda de imóveis.'],
  ['Transparência', 'Essa é a base de todos os princípios e deve reger toda a relação entre os clientes e a Cartel de Imóveis, em todas as ocasiões.'],
  ['Satisfação máxima do cliente', 'A qualidade em serviços prestados ao cliente é a essência do nosso negócio. Esse conceito se traduz em negociações claras e de fácil entendimento, sempre à luz da ética profissional, apoiada em seleto grupo de corretores, demonstradores e a supervisão de renomados juristas da área imobiliária.'],
  ['Valorização da cidadania', 'Respeito às leis e regulamentos, preservação do meio ambiente, cooperar com o desenvolvimento e bem-estar da comunidade, são os princípios da Cartel de Imóveis, a maior e mais completa empresa de negócios imobiliários da região do Alto da Lapa.'],
];
const bancos = [
  ['Bradesco', 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm#box1-comprar'],
  ['Itaú', 'https://www.itau.com.br/creditos-financiamentos/imoveis/simulador/'],
  ['Santander', 'https://www.santander.com.br/creditos-e-financiamentos/para-sua-casa/credito-imobiliario'],
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso'],
  ['Banco do Brasil', 'https://www.bb.com.br/pbb/pagina-inicial/voce/produtos-e-servicos/emprestimo#/'],
];
const TOTAL_SITE = 384; // anúncios no site atual (venda + locação, sem repetir) em 05/11/2026

// ---------- imóveis ----------
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const venda = /venda/.test(x.neg), loc = /locação/.test(x.neg);
  const k = x.kv;
  return {
    ...x, venda, loc, slug: `imovel/${x.cod}`,
    pVenda: k.Venda || '', pLoc: k['Locação'] || '', cond: k['Condomínio'] || '', iptu: k.IPTU || '',
    dorm: +k['Dormitórios'] || 0, suites: +k['Suítes'] || 0, banh: +k.Banheiros || 0, vagas: +k.Vagas || 0, salas: +k['Salas comerciais'] || 0,
    util: (k['Área Útil'] || '').replace(',00', ''), total: (k['Área Total'] || '').replace(',00', ''),
  };
});
const aVenda = imoveis.filter(i => i.venda).sort((a, b) => b.cod - a.cod);
const aLoc = imoveis.filter(i => i.loc).sort((a, b) => b.cod - a.cod);
const bairros = Object.entries(imoveis.reduce((m, i) => (m[i.bairro] = (m[i.bairro] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]);
const porCod = c => imoveis.find(i => i.cod === String(c));

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa', b: 'Ficha' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,500;0,700;1,600;1,700&family=Public+Sans:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=League+Gothic&family=Work+Sans:wght@400;500;600;700&display=swap',
};
const cores = { a: '#e3171e', b: '#111111' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Cartel de Imóveis | Imobiliária na Lapa, São Paulo' : `${titulo} | Cartel de Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Cartel de Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="1050" height="192" alt="Cartel de Imóveis"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const pl = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.util ? `${i.util}` : i.total ? `${i.total}` : '', i.dorm && pl(i.dorm, 'dorm.', 'dorms.'), i.suites && pl(i.suites, 'suíte', 'suítes'), i.salas && pl(i.salas, 'sala', 'salas'), i.vagas && pl(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const negTxt = i => i.venda && i.loc ? 'Venda e locação' : i.venda ? 'Venda' : 'Locação';
const precoLinha = (i, modo) => modo === 'loc' || (!modo && !i.venda) ? `<b>${i.pLoc}</b><small>/mês</small>` : `<b>${i.pVenda}</b>`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel ref. ${i.cod} (${i.tipo} em ${i.bairro}) que vi no site da Cartel de Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fone)}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>${lema}</p><p class="rod-creci">CRECI ${E.creci}</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('relogio')}<span>${E.horario}</span></li></ul></div>
    <div><h3>Fale com a Cartel</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${link(v, 'empresa')}">A empresa</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Cartel de Imóveis. Valores e disponibilidade sujeitos a alteração sem aviso.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão (lista) e filtro por tipo, só CSS
const cartao = (v, i, modo) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-ref">Ref. ${i.cod}</span>${i.venda && i.loc ? '<span class="card-ambos">Venda e locação</span>' : ''}</figure>
  <div class="card-txt"><p class="card-local">${esc(i.bairro)} · ${esc(i.cidade)}</p><h3>${esc(i.tipo)}${i.util || i.total ? ` <span>${i.util || i.total}</span>` : ''}</h3><p class="card-res">${resumo(i).slice(1).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco">${precoLinha(i, modo)}</p></div></a></li>`;
const filtro = (v, lista, nome, modo) => {
  const grupos = [['todos', 'Todos'], ['casa', 'Casas e sobrados'], ['apartamento', 'Apartamentos'], ['comercial', 'Comerciais']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i, modo)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.venda && i.loc ? 'para venda e locação' : i.venda ? 'à venda' : 'para alugar'} em ${i.bairro}`;
  const dados = [['Área útil', i.util], ['Área total', i.total], ['Dormitórios', i.dorm], ['Suítes', i.suites], ['Salas', i.salas], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const volta = i.venda ? 'comprar' : 'alugar';
  return head(v, i.slug, `${i.tipo} em ${i.bairro}, ref. ${i.cod}`, `${titulo}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.venda ? `Venda ${i.pVenda}.` : ''} ${i.loc ? `Locação ${i.pLoc}/mês.` : ''}`.trim()) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${volta === 'comprar' ? 'Imóveis à venda' : 'Imóveis para alugar'}</a></p>
  <div class="galeria n${i.fotos.length}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo}, ${i.bairro}, ref. ${i.cod} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${negTxt(i)} · Ref. ${i.cod}</p>
      <h1>${esc(i.tipo)}, ${esc(i.bairro)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.bairro)}, ${esc(i.cidade)} - SP</p>
      <p class="preco-m">${i.venda ? `<b>${i.pVenda}</b>` : ''}${i.loc ? `<b>${i.pLoc}<small>/mês</small></b>` : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      ${i.desc ? `<h2>Descrição</h2><p class="desc">${esc(i.desc)}</p>` : ''}
      ${i.comp.length ? `<h2>Compartimentos</h2><ul class="lista-check amen">${i.comp.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      ${i.venda ? `<p class="pb-rot">Venda</p><p class="pb-valor">${i.pVenda}</p>` : ''}
      ${i.loc ? `<p class="pb-rot">Locação</p><p class="pb-valor">${i.pLoc}<small>/mês</small></p>` : ''}
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores informados pela Cartel de Imóveis, sujeitos a alteração. Confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Cartel de Imóveis.', anuncie = false) => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${anuncie
    ? `<div class="form-duas"><label>Finalidade<select name="finalidade"><option>Vender</option><option>Alugar</option><option>Locação de temporada</option></select></label><label>Tipo do imóvel<select name="tipo"><option>Casa</option><option>Sobrado</option><option>Apartamento</option><option>Terreno</option><option>Comercial (loja, sala, galpão)</option></select></label></div>
  <div class="form-duas"><label>Bairro<input name="bairro" required placeholder="Lapa, Vila Leopoldina..."></label><label>Cidade<input name="cidade" value="São Paulo"></label></div>
  <label>Conte sobre o imóvel<textarea name="mensagem" rows="4" placeholder="Dormitórios, vagas, metragem, valor pretendido..."></textarea></label>`
    : `<div class="form-duas"><label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Outros</option></select></label><label>Bairro de interesse<input name="bairro" placeholder="Lapa, Alto da Lapa..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>`}
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa: ${E.end}, ${E.bairro}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}, ${E.bairro}, CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario}</span></div></li>
</ul>`;
const bancosBloco = () => `<section class="bancos"><div class="in"><header class="tit"><p class="k">Financiamento</p><h2>Simule o financiamento no seu banco</h2><p>Os simuladores oficiais dos bancos, os mesmos indicados no site da Cartel.</p></header><ul>${bancos.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener">${b[0]}${ic('ext')}</a></li>`).join('')}</ul></div></section>`;
const princLista = () => `<ol class="princ">${principios.map((p, n) => `<li class="sobe"><span class="princ-n">${String(n + 1).padStart(2, '0')}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>`;

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Casas, sobrados, apartamentos e imóveis comerciais à venda na Lapa e na Zona Oeste de São Paulo.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', 'Casas, sobrados, apartamentos e imóveis comerciais na Lapa, Alto da Lapa, Vila Leopoldina e arredores.') + `
<div class="in lista-pag">${filtro(v, aVenda, 'v', 'venda')}<p class="lista-nota">Não achou o que procura? A Cartel tem mais imóveis em carteira. <a href="${waHref(E.wa, 'Olá! Estou procurando um imóvel para comprar.')}" target="_blank" rel="noopener">Conte o que você procura pelo WhatsApp</a>.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `Casas, apartamentos, salas, lojas e salões para alugar na Lapa e na Zona Oeste de São Paulo.`) + topo(v, 'alugar') + cab('Locação', 'Imóveis para alugar', 'Casas, apartamentos, salas, lojas e salões comerciais.') + `
<div class="in lista-pag">${filtro(v, aLoc, 'l', 'loc')}<p class="lista-nota">Procura algo específico? <a href="${waHref(E.wa, 'Olá! Estou procurando um imóvel para alugar.')}" target="_blank" rel="noopener">Fale com a Cartel pelo WhatsApp</a>.</p></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Venda ou alugue seu imóvel com a Cartel de Imóveis, na Lapa.') + topo(v, 'anuncie') + cab('Proprietários', 'Venda ou alugue seu imóvel com a Cartel', 'Mande os detalhes do imóvel e a Cartel entra em contato.') + `
<div class="in"><section class="anuncie"><div><h2>Como funciona</h2><ol class="passos"><li><b>Você conta sobre o imóvel</b><span>Pelo formulário, pelo WhatsApp ou no escritório da Rua Brg. Gavião Peixoto.</span></li><li><b>A Cartel avalia e anuncia</b><span>O imóvel entra no site com fotos e ficha completa.</span></li><li><b>Visitas e negociação</b><span>Corretores da Cartel acompanham as visitas e a negociação até o contrato.</span></li></ol><p class="nota">Administração de bens de terceiros e intermediação de compra e venda.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Cartel de Imóveis.', true)}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'Empresa', lema) + topo(v, 'empresa') + cab('Empresa', 'Cartel de Imóveis', lema) + `
<div class="in"><section class="emp">${princLista()}</section>
<section class="emp-end"><div><p class="k">Escritório</p><h2>Na Lapa, perto do Alto da Lapa</h2>${contatoLista()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Cartel de Imóveis: ${E.fone}, WhatsApp ${E.cel}, ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Cartel de Imóveis', `${E.horario}.`) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div><span class="faixas" aria-hidden="true"></span></section>`;
  const capa = porCod(1837).fotos[0];
  const dest = [1487, 1608, 1537, 1603, 1562, 1801, 1778, 1843].map(porCod);
  const locD = [1690, 1779, 1774, 1787, 1756, 1785, 1848, 1783].map(porCod);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária na Lapa · CRECI ${E.creci}</p><h1>Casas e pontos comerciais na <em>Lapa</em> e em toda a Zona Oeste.</h1><p>Venda e locação de casas, sobrados, apartamentos, salas, lojas e galpões, com corretores da região.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span>${ic('seta')}</a><a class="busca-op busca-op3" href="${link(v, 'anuncie')}"><span>Quero anunciar</span>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa, 'Sobrado com gramado amplo no Alto da Lapa, ref. 1837', ' loading="eager" fetchpriority="high"')}<figcaption>Ref. 1837 · Sobrado no Alto da Lapa</figcaption></figure>
</div></section>
<section class="bairros-a"><div class="in"><p class="k">Onde estão os imóveis</p><ul>${['Lapa', 'Alto da Lapa', 'Vila Leopoldina', 'Bela Aliança', 'Vila Hamburguesa', 'Vila Romana', 'Parque Continental', 'Água Branca', 'Osasco'].map(b => `<li>${b}</li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Casas e apartamentos para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos à venda ${ic('seta')}</a></header><ul class="cards">${dest.map(i => cartao(v, i, 'venda')).join('')}</ul></section>
<section class="loc-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar, de casa a salão comercial</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos para alugar ${ic('seta')}</a></header><ul class="cards">${locD.map(i => cartao(v, i, 'loc')).join('')}</ul></div></section>
<section class="in princ-a"><header class="tit"><p class="k">A Cartel</p><h2>${lema}</h2></header>${princLista()}<p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'empresa')}">Conhecer a empresa</a></p></section>
${bancosBloco()}
<section class="in end-a"><div><p class="k">Escritório</p><h2>Rua Brg. Gavião Peixoto, 868</h2>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const linha = (i, modo) => `<li><a href="${link(v, i.slug)}"><span class="ln-ref">${i.cod}</span><span class="ln-foto">${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}</span><span class="ln-txt"><b>${esc(i.tipo)} · ${esc(i.bairro)}</b><small>${resumo(i).join(' · ')}</small></span><span class="ln-preco">${precoLinha(i, modo)}</span>${ic('seta')}</a></li>`;
  const grande = porCod(1487);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Cartel de Imóveis · Lapa · São Paulo</p><h1>Comprar, alugar ou anunciar na Zona Oeste.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div>
  <a class="hero-b-ficha" href="${link(v, grande.slug)}">
    ${foto(grande.fotos[0], 'Casa à venda na Lapa, ref. 1487', ' loading="eager" fetchpriority="high"')}
    <span class="hb-ref">Ref. ${grande.cod}</span>
    <dl><div><dt>Imóvel</dt><dd>${grande.tipo}, ${grande.bairro}</dd></div><div><dt>Área útil</dt><dd>${grande.util}</dd></div><div><dt>Dormitórios</dt><dd>${grande.dorm} (${grande.suites} suíte)</dd></div><div><dt>Vagas</dt><dd>${grande.vagas}</dd></div><div><dt>Venda</dt><dd>${grande.pVenda}</dd></div></dl>
  </a>
</div></section>
<section class="faixa-b"><div class="in"><ul><li><b>CRECI ${E.creci}</b><span>imobiliária registrada</span></li><li><b>Lapa</b><span>escritório na Rua Brg. Gavião Peixoto</span></li><li><b>Venda e locação</b><span>residencial e comercial</span></li><li><b>${E.cel}</b><span>WhatsApp</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Ficha por referência</p><h2>À venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ol class="linhas">${aVenda.filter(i => i.cod !== grande.cod).slice(0, 8).map(i => linha(i, 'venda')).join('')}</ol></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Ficha por referência</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Todos para alugar ${ic('seta')}</a></header><ol class="linhas">${aLoc.slice(0, 8).map(i => linha(i, 'loc')).join('')}</ol></section>
<section class="anun-b"><div class="in anun-b-in"><div><p class="k">Proprietários</p><h2>Tem um imóvel para vender ou alugar?</h2><p>A Cartel trabalha com administração de bens de terceiros e intermediação de compra e venda. Mande os detalhes e um corretor entra em contato.</p><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero anunciar meu imóvel com a Cartel.')}" target="_blank" rel="noopener">${icWa()}Pelo WhatsApp</a></p></div>
  <div><p class="k">Bairros com imóveis no site</p><ul class="bairros-b">${bairros.slice(0, 10).map(b => `<li>${b[0]}</li>`).join('')}</ul></div></div></section>
<section class="in princ-b"><header class="tit"><p class="k">Princípios</p><h2>${lema}</h2></header>${princLista()}</section>
${bancosBloco()}
<section class="end-b"><div class="in end-b-in"><div><p class="k">Escritório</p><h2>Rua Brg. Gavião Peixoto, 868 · Lapa</h2>${contatoLista()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Cartel de Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#e3171e', fundo: '#141414', claro: '#f6f3ef',
  fonteTitulo: '"Archivo Narrow",system-ui,sans-serif', fonteTexto: '"Public Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no vermelho e preto do logo, com as faixas do logo marcando as seções e a escolha comprar, alugar ou anunciar logo na abertura.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e ficha completa`, 'Filtro por casas, apartamentos e comerciais', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Preto e branco com vermelho, com os imóveis listados por referência, como uma ficha de corretor: número, foto, metragem e valor.', pontos: ['Um imóvel em destaque com a ficha aberta', 'Princípios da empresa e simuladores dos bancos', 'Escritório na Lapa com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
