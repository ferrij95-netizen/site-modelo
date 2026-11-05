// Wajota Imobiliária (Wajota Incorporações Imobiliárias, Tucuruvi, Zona Norte de São Paulo). Gera public/{a,b}/ e a página de escolha.
// node clientes/wajota/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs wajota https://www.wajota.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de detalhes.asp?codigo=… do site atual (40 dos 108 anúncios: 16 de 36 para alugar
// e 24 de 72 à venda; até 5 fotos de cada). Marca: símbolo de img/logo.png vetorizado (marca.svg); nome composto em Michroma.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Wajota Imobiliária', url: 'https://wajota.overtus.com.br/', antigo: 'https://www.wajota.com.br/',
  wa: '5511981634685', zap: '(11) 98163-4685', fone: '(11) 2203-0733',
  email: 'wajota@wajota.com.br', email2: 'wajota@terra.com.br', creci: 'CRECI 002935-J',
  end: 'Av. Nova Cantareira, 1697', bairro: 'Tucuruvi, São Paulo - SP', cep: '02331-003',
  curto: 'Imobiliária no Tucuruvi, Zona Norte de São Paulo: locação, venda e administração de imóveis e administração de condomínios.',
};
const institucional = [
  'Com uma estrutura moderna e informatizada, desfrutando de uma posição de destaque no mercado, a Wajota é composta por setores especializados, com funcionários regularmente treinados para o melhor exercício de suas funções.',
  'Nosso objetivo é dar o melhor e mais completo atendimento nos processos de compra e venda de imóveis, proporcionando também uma assessoria séria, personalizada e eficiente na administração de condomínio. Consulte-nos, teremos enorme prazer em ajudar.',
];
const divisoes = [
  ['casa', 'Divisão de Locação', 'Casas, apartamentos, salas e salões para alugar na Zona Norte, com locação por seguro fiança ou fiador.'],
  ['livro', 'Administração e Venda de Imóveis', 'Anúncio, visitas e acompanhamento da compra e venda do seu imóvel.'],
  ['usuarios', 'Administração de Condomínios', 'Assessoria séria, personalizada e eficiente para síndicos e condôminos.'],
];
const CAIXA = 'https://habitacao.caixa.gov.br/siopiweb-web/simulaOperacaoInternet.do?method=inicializarCasoUso';
const mapaQ = 'Avenida Nova Cantareira 1697 Tucuruvi São Paulo';

// ---------- imóveis ----------
const tituloCaso = s => s.toLowerCase().replace(/(^|[\s(-])([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(De|Da|Do|Dos|Das|E)\b/g, m => m.toLowerCase());
const BAIRRO = { 'Jaçana': 'Jaçanã', 'Jd.São Paulo': 'Jardim São Paulo', 'Pq. Casa de pedras': 'Parque Casa de Pedra', 'Vila Nova Mazzei': 'Vila Nova Mazzei' };
const bairroBom = b => { const t = /^[^a-zà-ú]*$|^[^A-ZÀ-Ú]*$/.test(b) ? tituloCaso(b) : b; return BAIRRO[t] || t; };
const maiusculo = s => { const l = s.replace(/[^A-Za-zÀ-ú]/g, ''); return l.length > 12 && (l.match(/[A-ZÀ-Ú]/g) || []).length / l.length > .6; };
const frase = s => s.toLowerCase().replace(/(^|[.!?]\s+|\n\s*)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase())
  .replace(/\b(zn|sp|iptu|m2)\b/gi, m => m.toUpperCase().replace('M2', 'm²')).replace(/\bjd\b/gi, 'Jd').replace(/\b(av|r)\.\s/gi, (m) => m[0].toUpperCase() + m.slice(1));
const limpa = s => (maiusculo(s) ? frase(s) : s).replace(/!{2,}/g, '!').replace(/\s+!/g, '!').replace(/[ \t]+/g, ' ');
const linhas = s => limpa(s).split('\n').map(l => l.trim()).filter(l => l && !/entre em contato|agend|^valor\b|telefone|^\(?11\)?\s?9?\d{4}/i.test(l)).map(l => l[0].toUpperCase() + l.slice(1));
const GRUPO = c => /Apartamento/.test(c) ? 'apartamentos' : /Casa|Sobrado|Condomínio/.test(c) ? 'casas' : 'comerciais';
const CAT = { 'Condomínio fechado': 'Casa em condomínio fechado' };
const quando = (n, s, p) => `${n} ${+n === 1 ? s : p}`;
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const area = String(x.area).replace(/m²/i, '').trim();
  const bairro = bairroBom(x.bairro);
  const cat = CAT[x.cat] || x.cat;
  return {
    ...x, bairro, cat, grupo: GRUPO(x.cat), area: area ? `${area} m²` : '',
    slug: `imovel/${x.neg === 'venda' ? 'v' : 'a'}${x.cod}`,
    tit: `${cat} em ${bairro}`,
    cond: /^R\$ 0,00$/.test(x.cond) ? '' : x.cond,
    chamada: limpa(x.carac).replace(/\s*\n+\s*/g, ' ').trim(),
    texto: linhas(x.obs),
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const contaBairro = lista => Object.entries(lista.reduce((m, i) => (m[i.bairro] = (m[i.bairro] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]);
const bairros = contaBairro(imoveis);

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'empresa', nome: 'A Wajota' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Venezianas', b: 'Zona Norte' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Michroma&family=Onest:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Gloock&family=Michroma&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap',
};
const cores = { a: '#1954bc', b: '#0d1733' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Wajota Imobiliária | Imóveis para alugar e comprar na Zona Norte de SP' : `${titulo} | Wajota Imobiliária`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-w" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Wajota Imobiliária, página inicial"` : ''}>${marcaSvg}<span class="marca-nome"><b>WAJOTA</b><small>imobiliária</small></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const resumo = i => [i.area, +i.dorm && quando(i.dorm, 'dormitório', 'dormitórios'), +i.suite && quando(i.suite, 'suíte', 'suítes'), +i.vaga && quando(i.vaga, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tit}, ${i.preco}) que vi no site da Wajota.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const porMes = i => i.neg === 'aluguel' ? '<small>/mês</small>' : '';

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
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
    <div class="rod-marca">${marca(v, 'div')}<p>Locação, venda e administração de imóveis e de condomínios na Zona Norte de São Paulo. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.zap}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${CAIXA}" target="_blank" rel="noopener">Simular financiamento (Caixa)</a></li></ul></div>
    <div><h3>E-mail</h3><ul><li><a href="mailto:${E.email}">${E.email}</a></li><li><a href="mailto:${E.email2}">${E.email2}</a></li><li><a href="${link(v, 'empresa')}">A Wajota</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Wajota Incorporações Imobiliárias · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], i.tit)}<span class="card-tipo">${i.neg === 'aluguel' ? 'Aluga' : 'Vende'}</span></figure>
  <div class="card-txt"><p class="card-local">${esc(i.bairro)} · cód. ${i.cod}</p><h3>${esc(i.cat)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${porMes(i)}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas e sobrados'], ['comerciais', 'Comerciais']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.cat} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área', i.area], ['Dormitórios', +i.dorm || ''], ['Suítes', +i.suite || ''], ['Vagas', +i.vaga || ''], ['Uso', i.uso]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tit} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const pagLista = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, titulo, `${titulo}, cód. ${i.cod}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, pagLista) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, pagLista)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.neg === 'aluguel' ? 'Para alugar' : 'À venda'} · cód. ${i.cod}</p>
      <h1>${esc(i.tit)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.bairro)}, ${esc(i.cidade)} - SP</p>
      <p class="preco-m"><b>${i.preco}</b>${porMes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      ${i.chamada ? `<p class="chamada">${esc(i.chamada)}</p>` : ''}
      ${i.texto.length ? `<h2>Sobre o imóvel</h2><div class="descr">${i.texto.map(l => `<p>${esc(l)}</p>`).join('')}</div>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${porMes(i)}</p>
      ${i.cond ? `<dl><div><dt>Condomínio</dt><dd>${i.cond}</dd></div></dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      ${i.neg === 'venda' ? `<a class="pb-link" href="${CAIXA}" target="_blank" rel="noopener">Simular financiamento na Caixa ${ic('ext')}</a>` : '<p class="pb-nota">Locação com seguro fiança ou fiador. Valores informados pela imobiliária; confirme na visita.</p>'}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formContato = () => `<form class="form" data-wa="Olá! Vim pelo site da Wajota." data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Interesse<select name="interesse"><option>Comprar</option><option>Locação</option><option>Vender</option><option>Condomínios</option><option>Outros</option></select></label><label>Cód. do imóvel<input name="codigo" inputmode="numeric" placeholder="Se for sobre um imóvel"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const formAnuncie = () => `<form class="form" data-wa="Olá! Quero cadastrar meu imóvel na Wajota." data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Disponibilidade<select name="disponibilidade"><option>Vender</option><option>Alugar</option></select></label><label>Tipo<select name="tipo"><option>Apartamento</option><option>Casa</option><option>Sobrado</option><option>Sala</option><option>Salão</option><option>Galpão</option><option>Prédio</option><option>Terreno</option></select></label></div>
  <div class="form-duas"><label>Bairro e cidade<input name="bairro" required placeholder="Tucuruvi, São Paulo"></label><label>Valor pretendido<input name="valor" placeholder="R$"></label></div>
  <div class="form-tres"><label>Dormitórios<input name="dormitorios" inputmode="numeric"></label><label>Vagas<input name="vagas" inputmode="numeric"></label><label>Área (m²)<input name="area" inputmode="numeric"></label></div>
  <label>Características<textarea name="caracteristicas" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar cadastro pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Wajota" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(mapaQ)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Escritório</strong>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.zap}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a><a href="mailto:${E.email2}">${E.email2}</a></div></li>
</ul>`;
const divLista = () => `<ol class="divs">${divisoes.map((d, n) => `<li class="sobe"><span class="div-n">0${n + 1}</span>${ic(d[0])}<h3>${d[1]}</h3><p>${d[2]}</p></li>`).join('')}</ol>`;
const destaque = (lista, n, cods = []) => [...cods.map(c => lista.find(i => i.cod === c)).filter(Boolean), ...lista.filter(i => !cods.includes(i.cod))].slice(0, n);

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar na Zona Norte de São Paulo: apartamentos, casas, salas e salões comerciais.`) + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar na Zona Norte', 'Apartamentos, casas, salas e salões no Tucuruvi, em Santana, no Jaçanã e arredores. Locação com seguro fiança ou fiador.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda na Zona Norte de São Paulo e em Guarulhos.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', 'Apartamentos, casas, sobrados e imóveis comerciais na Zona Norte de São Paulo e em Guarulhos.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="fin-nota">${ic('casa')}<span>Vai financiar? <a href="${CAIXA}" target="_blank" rel="noopener">Simule o financiamento habitacional no site da Caixa</a> e traga a simulação para a visita.</span></p></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Cadastre seu imóvel para vender ou alugar com a Wajota Imobiliária, no Tucuruvi.') + topo(v, 'anuncie') + cab('Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel?', 'Mande os dados do imóvel e a Wajota entra em contato para conhecer, avaliar e anunciar.') + `
<div class="in"><section class="anuncie"><div class="anuncie-txt"><h2>Como funciona</h2><ol class="passos"><li><b>Cadastro.</b> Preencha o que souber: tipo, bairro, tamanho e valor pretendido.</li><li><b>Visita.</b> A equipe combina um horário para conhecer o imóvel.</li><li><b>Anúncio.</b> O imóvel entra no site da Wajota, com fotos e código próprio.</li></ol>${divLista()}</div>${formAnuncie()}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Wajota', institucional[0]) + topo(v, 'empresa') + cab('A Wajota', 'Wajota Incorporações Imobiliárias', `No Tucuruvi, na Av. Nova Cantareira. ${E.creci}.`) + `
<div class="in"><section class="inst">${institucional.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
<section class="inst-div"><header class="tit"><p class="k">Setores especializados</p><h2>Três divisões, um só escritório</h2></header>${divLista()}</section>
<section class="escritorio"><div>${contatoLista()}<p class="bts"><a class="btn" href="${link(v, 'contato')}">Falar com a Wajota</a><a class="btn btn-linha" href="${CAIXA}" target="_blank" rel="noopener">Simular financiamento</a></p></div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Wajota Imobiliária: ${E.fone}, WhatsApp ${E.zap}, ${E.email}. ${E.end}, Tucuruvi.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Wajota', 'Envie sua mensagem, solicitação, dúvida ou sugestão. Se for sobre um imóvel, informe o código.') + `
<div class="in"><section class="contato-pag"><div class="contato-form">${formContato()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

// ---------- versão A: Venezianas ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.cod === '416').fotos[1];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Tucuruvi · Zona Norte de São Paulo</p><h1>Abra a janela para o seu próximo imóvel na Zona Norte.</h1><p>${E.curto}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero</span><b>Alugar</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero</span><b>Comprar</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'anuncie')}"><span>Quero</span><b>Anunciar</b>${ic('seta')}</a></div></div>
  <figure class="janela"><span class="folha folha-e" aria-hidden="true"></span>${foto(capa, 'Varanda com plantas e sala de estar de sobrado à venda na Vila Constança', ' loading="eager" fetchpriority="high"')}<span class="folha folha-d" aria-hidden="true"></span><figcaption>Sobrado na Vila Constança · cód. 416</figcaption></figure>
</div></section>
<section class="faixa-a"><div class="in"><ol class="divs-faixa">${divisoes.map((d, n) => `<li><span>0${n + 1}</span>${d[1]}</li>`).join('')}</ol></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar ou abrir o seu negócio</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos para alugar ${ic('seta')}</a></header><ul class="cards">${destaque(aluguel, 4, ['432', '53', '151', '544']).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos à venda ${ic('seta')}</a></header><ul class="cards">${destaque(vendas, 8, ['550', '904', '892', '880', '849', '308', '596', '423']).map(i => cartao(v, i)).join('')}</ul></section>
<section class="bairros-a"><div class="in"><p class="k">Onde estão os imóveis</p><ul>${bairros.map(([b, n]) => `<li>${esc(b)} <small>${n}</small></li>`).join('')}</ul></div></section>
<section class="anuncio-a"><div class="in anuncio-a-in"><div><p class="k">Proprietário</p><h2>Tem um imóvel para vender ou alugar?</h2><p>Cadastre o imóvel e a Wajota cuida do anúncio, das visitas e da negociação. Também administramos condomínios.</p><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Cadastrar meu imóvel</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero anunciar meu imóvel com a Wajota.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div>${divLista()}</div></section>
<section class="in escritorio"><div><p class="k">Escritório</p><h2>Na Av. Nova Cantareira, no Tucuruvi</h2>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// ---------- versão B: Zona Norte ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const mosaico = [['904', 0], ['880', 0], ['423', 0], ['308', 2]].map(([c, f]) => ({ ...imoveis.find(i => i.cod === c), f }));
  const linha = i => `<li><a href="${link(v, i.slug)}"><figure>${foto(i.fotos[0], i.tit)}</figure><span class="ln-txt"><small>${i.neg === 'aluguel' ? 'Aluga' : 'Vende'} · cód. ${i.cod}</small><b>${esc(i.tit)}</b><span>${resumo(i).join(' · ')}</span></span><span class="ln-preco">${i.preco}${porMes(i)}</span>${ic('seta')}</a></li>`;
  const top = bairros.slice(0, 10);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Wajota Imobiliária · ${E.creci}</p><h1>Do Tucuruvi ao Tremembé, a Zona Norte <em>bairro a bairro.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'alugar')}">Imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'comprar')}">Imóveis à venda</a></p></div>
  <div class="mosaico">${mosaico.map((i, n) => `<a class="m${n}" href="${link(v, i.slug)}">${foto(i.fotos[i.f], i.tit, n ? ' loading="lazy" decoding="async"' : ' loading="eager" fetchpriority="high"')}<span>${esc(i.bairro)}</span></a>`).join('')}</div>
</div></section>
<section class="indice-b"><div class="in indice-b-in"><header><p class="k">Índice de bairros</p><h2>Onde a Wajota tem imóvel agora</h2><p>Os bairros com mais anúncios nesta seleção. O escritório fica no Tucuruvi, perto de quase todos.</p></header><ol class="bairro-idx">${top.map(([b, n]) => `<li><span class="bi-nome">${esc(b)}</span><span class="bi-ponto" aria-hidden="true"></span><span class="bi-n">${n} ${n === 1 ? 'imóvel' : 'imóveis'}</span></li>`).join('')}</ol></div></section>
<section class="in lista-b"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Todos para alugar ${ic('seta')}</a></header><ol class="linhas">${destaque(aluguel, 6, ['432', '53', '219', '151', '544', '927']).map(linha).join('')}</ol></section>
<section class="in lista-b"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ol class="linhas">${destaque(vendas, 6, ['550', '892', '806', '416', '849', '246']).map(linha).join('')}</ol></section>
<section class="divs-b"><div class="in"><header class="tit"><p class="k">Setores especializados</p><h2>Locação, venda e condomínios</h2></header>${divLista()}<p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'empresa')}">Conhecer a Wajota</a></p></div></section>
<section class="end-b"><div class="in end-b-in"><div><p class="k">Escritório</p><p class="end-grande">Av. Nova Cantareira, 1697</p>${contatoLista()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Wajota Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#1954bc', fundo: '#0d1733', claro: '#eef2fb',
  fonteTitulo: 'Michroma,system-ui,sans-serif', fonteTexto: 'Onest,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no azul do logo, com as janelas de venezianas do símbolo emoldurando as fotos e a escolha alugar, comprar ou anunciar na abertura.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e descrição`, 'Filtro por apartamentos, casas e comerciais', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, com um índice dos bairros da Zona Norte e os imóveis listados em linhas: foto, bairro, tamanho e valor.', pontos: ['Bairros com mais imóveis em destaque', 'As três divisões da Wajota numeradas', 'Cadastro do imóvel para vender ou alugar'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
