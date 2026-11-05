// Viviane Imobiliária (Pampulha, Belo Horizonte/MG, CRECI 19245). Gera public/{a,b}/ e a página de escolha.
// node clientes/vivianeimobiliaria/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs vivianeimobiliaria http://vivianeimobiliaria.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de venda.php (21 páginas), aluguel.php e imovel.php?id= do site atual.
// 39 de 189 anúncios: os 2 de aluguel, os 6 destaques da home e os mais recentes com 5+ fotos (até 5 fotos cada).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Viviane Imobiliária', url: 'https://vivianeimobiliaria.overtus.com.br/', antigo: 'http://vivianeimobiliaria.com.br/',
  wa: '5531993736862', cel: '(31) 99373-6862', fone: '(31) 3495-8389', creci: 'CRECI 19245',
  end: 'Av. Portugal, 870', bairro: 'Pampulha, Belo Horizonte - MG', cep: '31550-000', mapa: 'Avenida Portugal 870 Pampulha Belo Horizonte MG',
  face: 'https://www.facebook.com/Viviane-Imobili%C3%A1ria-696539503741513/',
  curto: 'Imobiliária na Pampulha: casas, coberturas, apartamentos e lotes à venda em Belo Horizonte e região metropolitana.',
};
// textos do site atual (home e rodapé)
const sobre = [
  'Oferece a melhor seleção de imóveis localizados em BH e Região.',
  'Terrenos, casas, casas em condomínio, apartamentos, flats, salas comerciais, você encontra aqui.',
  'Confiabilidade, segurança e rapidez na prestação dos serviços de Compra e Venda de Imóveis e Administração de Condomínios.',
];
const horarios = [['Vendas', 'Segunda a sexta, 8h00 às 17h30', 'Sábado, 8h00 às 12h00'], ['Consultoria jurídica', 'Segunda a sexta, 8h às 17h30']];
const cidades = ['Belo Horizonte', 'Nova Lima', 'Santa Luzia', 'Sete Lagoas'];

// ---------- imóveis ----------
// 773: título original "Linda com entrada independente" (falta a palavra; ver LEIA-ME)
const TIPO = { 776: 'Casa', 773: 'Casa', 775: 'Área privativa' }; // títulos que o leitor automático classificou mal
const GRUPO = t => /Casa/.test(t) ? 'casas' : /Cobertura|Apartamento|privativa|Prédio/.test(t) ? 'aptos' : 'outros';
const frase = s => {
  const t = s.replace(/\s+/g, ' ').trim();
  const caps = t.replace(/[^A-Za-zÀ-ú]/g, '');
  const base = caps && caps === caps.toUpperCase() ? t.toLowerCase() : t;
  return base.replace(/(^|[.!?]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(/\bm2\b/gi, 'm²').replace(/\bdce\b/gi, 'DCE');
};
const BAIRROS = ['Santa Mônica', 'Santa Amélia', 'Santa Branca', 'Santa Rosa', 'Céu Azul', 'Copacabana', 'Pampulha', 'Itapoã', 'Lagoinha', 'Venda Nova', 'Canaã', 'Garças', 'São Luiz', 'Piratininga', 'Confisco', 'Braunas', 'Trevo', 'Jardim Atlântico', 'São João Batista', 'Jardim Leblon'];
const sem = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const titulo = s => {
  let t = frase(s.replace(/\bSta\.?\s/gi, 'Santa ').replace(/!+/g, '').replace(/\s+/g, ' ').trim()).normalize('NFC');
  for (const b of BAIRROS) { const k = sem(t).indexOf(sem(b)); if (k >= 0) t = t.slice(0, k) + b + t.slice(k + b.length); }
  return t.replace(/(\d)\s*m2\b\.?/i, '$1 m²').replace(/\bPredio\b/, 'Prédio');
};
const area = s => (s && !/^0?m²$|^om²$/.test(s.replace(/\s/g, '')) && !/^0m/.test(s)) ? s.replace(/Mm²/, 'm²').replace(/\s*mtsm²/, ' m²') : '';
const n = s => +String(s || '').replace(/\D/g, '') || 0;
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const tipo = TIPO[x.id] || x.tipo;
  const neg = x.aluguel ? 'aluguel' : 'venda';
  const cod = x.cod.toUpperCase();
  return {
    id: x.id, neg, cod, slug: `imovel/${cod.toLowerCase()}-${x.id}`, tipo, grupo: GRUPO(tipo),
    nome: x.id === '773' ? 'Casa com entrada independente' : titulo(x.titulo), bairro: x.bairro, local: x.bairro || (x.id === '757' ? 'Condomínio Vale do Sol' : 'BH e região'),
    preco: x.preco, iptu: n(x.iptu) > 100 ? x.iptu : '', cond: n(x.cond) > 100 ? x.cond : '',
    total: area(x.area_total), constr: area(x.area_constr), quartos: n(x.quartos), vagas: n(x.vagas), banhos: n(x.banhos),
    desc: frase(x.desc).replace(/\s*•\s*/g, ' · '), fotos: x.img,
  };
});
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const destaques = ['41', '42', '635', '701', '652', '636'].map(id => imoveis.find(i => i.id === id));
const bairros = [...new Set(imoveis.map(i => i.bairro).filter(Boolean))].sort((a, b) => imoveis.filter(i => i.bairro === b).length - imoveis.filter(i => i.bairro === a).length);
const TOTAL_SITE = 189;

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'imobiliaria', nome: 'A imobiliária' }, { slug: 'consultoria', nome: 'Consultoria jurídica' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pampulha', b: 'Noite de BH' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Roboto+Condensed:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;500;700&family=Manrope:wght@400;500;700&display=swap',
};
const cores = { a: '#b8860b', b: '#141210' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Viviane Imobiliária | Imóveis na Pampulha e em BH' : `${t} | Viviane Imobiliária`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const logo = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Viviane Imobiliária, página inicial"` : ''}><img src="/assets/logo.webp" width="713" height="248" alt="Viviane Imobiliária, ${E.creci}"></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${f[0]}" width="${f[1]}" height="${f[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (q, s, p) => `${q} ${q === 1 ? s : p}`;
const resumo = i => [i.total || i.constr, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.nome}) que vi no site da Viviane Imobiliária.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${logo(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Viviane Imobiliária.')}" target="_blank" rel="noopener">${icWa()}<span>${E.cel}</span></a>
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
    <div class="rod-marca">${logo(v, 'div')}<p>${sobre[0]}</p></div>
    <div><h3>Onde estamos</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa, 'Olá! Vim pelo site da Viviane Imobiliária.')}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('face')}<a href="${E.face}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
    <div><h3>Horários</h3><ul>${horarios.map(h => `<li><b>${h[0]}</b><br>${h.slice(1).join('<br>')}</li>`).join('')}</ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Viviane Imobiliária · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.nome}, foto da fachada ou da sala`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${ic('pin')}${i.local}</p><h3>${esc(i.nome)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<span>cód. ${i.cod}</span></p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['casas', 'Casas'], ['aptos', 'Apartamentos e coberturas'], ['outros', 'Lotes e comerciais']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  ${grupos.length > 2 ? `<fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, k) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${k ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>` : ''}
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const dados = [['Área total', i.total], ['Área construída', i.constr], ['Quartos', i.quartos], ['Banheiros', i.banhos], ['Vagas', i.vagas]].filter(d => d[1]);
  const pag = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, `${i.nome} (cód. ${i.cod})`, `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.local}, Belo Horizonte. ${resumo(i).join(', ')}. ${i.preco}.`) + topo(v, pag) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, pag)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  <div class="galeria">${i.fotos.map((f, k) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.nome} (foto ${k + 1})`)}" class="g${k}">${foto(f, `${i.nome}, foto ${k + 1}`, k ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} · cód. ${i.cod}</p>
      <h1>${esc(i.nome)}</h1>
      <p class="ficha-local">${ic('pin')}${i.local}${i.bairro ? ', Belo Horizonte' : ''} - MG</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2><p class="desc">${esc(i.desc)}</p>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores informados pela imobiliária; confirme na visita. ${E.creci}.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const motivos = ['Agendar uma visita', 'Comprar um imóvel', 'Alugar um imóvel', 'Proposta para administração de condomínio', 'Enviar currículo', 'Outros assuntos'];
const formulario = (msg, opts = motivos) => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${opts ? `<label>Motivo do contato<select name="motivo">${opts.map(o => `<option>${o}</option>`).join('')}</select></label>` : ''}
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa: ${E.end}, ${E.bairro}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=15&output=embed"></iframe>`;
const contatoLista = `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e vendas</strong><a href="${waHref(E.wa, 'Olá! Vim pelo site da Viviane Imobiliária.')}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Atendimento</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}, ${E.bairro}<br>CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horários</strong><span>${horarios[0][1]}<br>${horarios[0][2]}</span></div></li>
</ul>`;
const servicos = [
  ['casa', 'Compra e venda', 'Casas, coberturas, apartamentos, lotes e salas em BH e na região metropolitana.'],
  ['chave', 'Aluguel', 'Imóveis para alugar, com atendimento direto no escritório da Pampulha.'],
  ['usuarios', 'Administração de condomínios', 'Peça uma proposta para a administração do seu condomínio.'],
  ['escudo', 'Consultoria jurídica', 'Advocacia especializada para quem vai comprar, vender ou alugar.'],
];
const servLista = () => `<ul class="servs">${servicos.map(s => `<li class="sobe">${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Casas, coberturas e apartamentos à venda na Pampulha e em BH.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda em BH e região', `Uma seleção de ${vendas.length} imóveis da nossa carteira, com fotos, valores e ficha. Procura outro bairro ou faixa de preço? Chame no WhatsApp.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}</div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', 'Imóveis para alugar com a Viviane Imobiliária em Belo Horizonte.') + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar', 'Os imóveis de locação disponíveis agora. Para ver outras opções, fale com o escritório.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}
<section class="aviso-alug"><div><h2>Procurando outro imóvel para alugar?</h2><p>Diga o bairro, o tipo e o valor que você procura e a equipe avisa quando entrar algo do seu jeito.</p></div>${formulario('Olá! Procuro um imóvel para alugar.', null)}</section></div>
` + rodape(v);
  pag.imobiliaria = head(v, 'imobiliaria', 'A imobiliária', `${sobre[0]} ${sobre[2]}`) + topo(v, 'imobiliaria') + cab('A imobiliária', 'Viviane Imobiliária, na Pampulha', 'Compra, venda e aluguel de imóveis e administração de condomínios em Belo Horizonte e região.') + `
<div class="in"><section class="inst"><div>${sobre.map((p, k) => `<p${k ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>
<ul class="numeros"><li><b>${TOTAL_SITE}</b><span>imóveis anunciados no site</span></li><li><b>${cidades.length}</b><span>cidades: ${cidades.join(', ')}</span></li><li><b>${E.creci.replace('CRECI ', '')}</b><span>CRECI da imobiliária</span></li></ul></section>
<section><header class="tit"><p class="k">O que fazemos</p><h2>Serviços</h2></header>${servLista()}</section>
<section class="local"><div><header class="tit"><p class="k">Escritório</p><h2>${E.end}, Pampulha</h2></header>${contatoLista}</div>${mapa}</section></div>
` + rodape(v);
  pag.consultoria = head(v, 'consultoria', 'Consultoria jurídica', 'Advocacia especializada em imóveis na Viviane Imobiliária, Pampulha, BH.') + topo(v, 'consultoria') + cab('Consultoria jurídica', 'Advocacia especializada', 'Preencha o formulário que entraremos em contato. Atendimento de segunda a sexta, das 8h às 17h30.') + `
<div class="in"><section class="consult"><div><h2>Antes de assinar, consulte</h2><p>A consultoria jurídica funciona no próprio escritório da imobiliária, na Av. Portugal, e atende quem vai comprar, vender ou alugar.</p><ul class="lista-check"><li>${ic('check')}Atendimento de segunda a sexta, das 8h às 17h30</li><li>${ic('check')}No escritório da Pampulha</li><li>${ic('check')}Contato pelo formulário ou pelo telefone ${E.fone}</li></ul></div>
<div class="form-caixa"><h2>Fale com a consultoria</h2>${formulario('Olá! Gostaria de falar com a consultoria jurídica da Viviane Imobiliária.', null)}</div></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Viviane Imobiliária: WhatsApp ${E.cel}, telefone ${E.fone}, ${E.end}, Pampulha.`) + topo(v, 'contato') + cab('Contato', 'Fale conosco', 'Envie o formulário e um dos nossos corretores entra em contato.') + `
<div class="in"><section class="contato-pag"><div class="form-caixa"><h2>Mensagem</h2>${formulario('Olá! Vim pelo site da Viviane Imobiliária.')}</div><div>${contatoLista}</div></section>
<section class="mapa-sec">${mapa}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.id === '42').fotos[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Pampulha · Belo Horizonte · ${E.creci}</p><h1>Melhores opções de Belo Horizonte <em>e regiões metropolitanas.</em></h1><p>${sobre[1]}</p>
    <div class="escolha-a"><a href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis selecionados</b>${ic('seta')}</a><a href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} disponíveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(['banner3.webp', 1000, 667], 'Lagoa da Pampulha com palmeiras e casas ao fundo', ' loading="eager" fetchpriority="high"')}<figcaption>Lagoa da Pampulha</figcaption>
    <a class="hero-a-card" href="${link(v, destaques[1].slug)}">${foto(capa, destaques[1].nome)}<span><small>Destaque · cód. ${destaques[1].cod}</small><b>${destaques[1].nome}</b>${destaques[1].preco}</span></a></figure>
</div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Destaques</p><h2>Imóveis em destaque na região da Pampulha</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${destaques.map(i => cartao(v, i)).join('')}</ul></section>
<section class="bairros-a"><div class="in"><p class="k">Bairros com imóveis agora</p><ul>${bairros.map(b => `<li>${b}<small>${imoveis.filter(i => i.bairro === b).length}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Recém-chegados</p><h2>Novos na carteira</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${vendas.filter(i => !destaques.includes(i)).slice(0, 6).map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in"><header class="tit"><p class="k">Viviane Imobiliária</p><h2>${sobre[2]}</h2></header>${servLista()}</div></section>
<section class="in local"><div><header class="tit"><p class="k">Escritório</p><h2>Na Av. Portugal, perto da lagoa</h2></header>${contatoLista}</div>${mapa}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const top = destaques[0];
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${foto(i.fotos[0], i.nome)}</span><span class="ln-txt"><small>${i.tipo} · ${i.local}</small><b>${esc(i.nome)}</b><span>${resumo(i).join(' · ')}</span></span><span class="ln-preco">${i.preco}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(['banner1.webp', 1600, 796], 'Vista de Belo Horizonte ao pôr do sol', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Viviane Imobiliária · ${E.creci}</p><h1>Melhores opções de <span>Belo Horizonte</span></h1><p>E regiões metropolitanas: ${cidades.join(', ')}.</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Para alugar</a></p></div></section>
<section class="faixa-b"><div class="in"><ul>${['Casas', 'Casas em condomínio', 'Coberturas', 'Apartamentos', 'Lotes', 'Salas comerciais'].map(t => `<li>${t}</li>`).join('')}</ul></div></section>
<section class="in top-b"><a class="top-b-card" href="${link(v, top.slug)}"><figure>${foto(top.fotos[0], top.nome)}</figure><div><p class="k">Destaque da casa · cód. ${top.cod}</p><h2>${top.nome}</h2><p>${esc(top.desc.slice(0, 230).replace(/[\s,.]+\S*$/, ''))}…</p><p class="top-preco">${top.preco}</p><span class="link-seta">Ver o imóvel ${ic('seta')}</span></div></a></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Carteira</p><h2>Em destaque</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ol class="linhas">${destaques.slice(1).concat(vendas.filter(i => !destaques.includes(i)).slice(0, 5)).map(linha).join('')}</ol></section>
<section class="serv-b"><div class="in"><header class="tit"><p class="k">O que fazemos</p><h2>Confiabilidade, segurança e rapidez</h2></header>${servLista()}</div></section>
<section class="in local"><div><header class="tit"><p class="k">Escritório</p><h2>${E.end} · Pampulha</h2></header>${contatoLista}</div>${mapa}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Viviane Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#b8860b', fundo: '#141210', claro: '#f6f1e6',
  fonteTitulo: 'Archivo,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no dourado do logo, com a Lagoa da Pampulha na abertura e a escolha "comprar ou alugar" logo no topo.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e ficha`, 'Filtro por casas, apartamentos e lotes', 'Visita marcada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura e dourada como o topo do site atual, com BH ao pôr do sol e um imóvel de destaque em tamanho grande.', pontos: ['Lista de imóveis com foto, bairro e valor', 'Consultoria jurídica com página própria', 'Escritório com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
