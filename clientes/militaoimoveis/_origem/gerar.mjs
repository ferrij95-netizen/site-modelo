// Militão Imóveis (Fortaleza/CE, CRECI 1336 J). Gera public/{a,b}/ e a página de escolha.
// node clientes/militaoimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs militaoimoveis https://www.militaoimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 da API do WordPress do site atual (?rest_route=/wp/v2/imóvel): os 21 anúncios publicados,
// todos à venda, com até 5 fotos de cada. Títulos reescritos por nós; descrições são as dos anúncios (só tiramos emojis e caixa alta).
// Marca: telhado do logo vetorizado (marca.svg); nome escrito em Tomorrow, parecido com o letreiro quadrado do logo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Militão Imóveis', url: 'https://militaoimoveis.overtus.com.br/', antigo: 'https://www.militaoimoveis.com.br/',
  creci: 'CRECI 1336 J',
  // os dois botões de WhatsApp do site atual
  waCasas: { num: '5585994171814', fone: '(85) 99417-1814', rot: 'Casas e apartamentos' },
  waLotes: { num: '5585992966846', fone: '(85) 99296-6846', rot: 'Lotes' },
};
const linhas = [E.waCasas, E.waLotes];

// ---------- imóveis ----------
const brl = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const maiusc = s => s.replace(/\b[A-ZÀ-Ú]{2,}(?:\s+[A-ZÀ-Ú]{2,}){1,}\b/g, m => m.toLowerCase()).replace(/\b(?!CRECI|FGTS)[A-ZÀ-Ú]{4,}\b/g, m => m.toLowerCase()).replace(/\bfortaleza\b/g, 'Fortaleza');
const AREA = { 6919: '149', 6936: '' }; // 6919: campo diz 49 m², o texto diz 149 m². 6936: campo 180, texto 108 (ver LEIA-ME)
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const area = (x.id in AREA ? AREA[x.id] : (String(x.area).match(/^[\d.,]+/) || [''])[0]).replace('.', ',');
  const n = Number(x.preco);
  const preco = x.id === 6900 ? 'Valor sob consulta' : x.id === 6853 ? `A partir de ${brl(n)}` : brl(n);
  return {
    ...x, area, num: x.id === 6900 ? 0 : n, preco, slug: `imovel/${x.id}`,
    quartos: +x.quartos || 0, banh: +x.banh || 0, gar: +x.gar || 0,
    regiao: x.cidade === 'Fortaleza' ? 'Fortaleza' : 'Eusébio e Aquiraz',
    wa: x.grupo === 'lotes' ? E.waLotes : E.waCasas,
    desc: x.desc.map(maiusc),
    car: x.car.filter(c => !/^\d|quarto|banheiro|garagem|vaga|sendo/i.test(c)).map(c => c[0].toUpperCase() + c.slice(1)),
  };
});
const fortaleza = imoveis.filter(i => i.regiao === 'Fortaleza');
const rm = imoveis.filter(i => i.regiao !== 'Fortaleza');
const bairros = [...new Set(imoveis.map(i => i.bairro))].filter(b => !/^Perto/.test(b));
const grupos = [['casas', 'Casas', 'casa'], ['apartamentos', 'Apartamentos', 'chave'], ['lotes', 'Lotes', 'pin']].map(g => ({ g: g[0], nome: g[1], ic: g[2], lista: imoveis.filter(i => i.grupo === g[0]) }));
const precos = imoveis.filter(i => i.num && i.id !== 6853).map(i => i.num);
const faixa = `de ${brl(Math.min(...precos))} a ${brl(Math.max(...precos))}`;
const porId = id => imoveis.find(i => i.id === id);

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'bairros', nome: 'Bairros' }, { slug: 'a-imobiliaria', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Cumeeira', b: 'Litoral' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Tomorrow:wght@500;600;700&family=Albert+Sans:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Tomorrow:wght@600&family=Geologica:wght@300;400;600&family=Onest:wght@400;500;600&display=swap',
};
const cores = { a: '#b02010', b: '#1a1818' };
const curto = `Imobiliária em Fortaleza (${E.creci}): casas, apartamentos e lotes à venda em Fortaleza, no Eusébio e no Aquiraz.`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Militão Imóveis | Casas, apartamentos e lotes à venda em Fortaleza' : `${titulo} | Militão Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').trim().replace('<svg ', '<svg class="marca-m" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Militão Imóveis, página inicial"` : ''}>${marcaSvg}<span class="marca-txt"><b>Militão</b><i>Imóveis</i></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const onde = i => i.cidade === i.bairro ? i.cidade : `${i.bairro}, ${i.cidade}`;
const waImovel = i => waHref(i.wa.num, `Olá! Tenho interesse no imóvel "${i.titulo}"${i.cod ? ` (cód. ${i.cod})` : ''} que vi no site da Militão Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.waCasas.num, 'Olá! Vim pelo site da Militão Imóveis.')}" target="_blank" rel="noopener">${icWa()}<span>${E.waCasas.fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>Casas, apartamentos e lotes à venda em Fortaleza e na Região Metropolitana.</p><p class="rod-creci">${E.creci}</p></div>
    <div><h3>WhatsApp</h3><ul class="rod-dados">${linhas.map(l => `<li>${icWa()}<span><small>${l.rot}</small><a href="${waHref(l.num)}" target="_blank" rel="noopener">${l.fone}</a></span></li>`).join('')}</ul></div>
    <div><h3>Imóveis</h3><ul>${grupos.map(g => `<li><a href="${link(v, 'imoveis')}">${g.nome} (${g.lista.length})</a></li>`).join('')}<li><a href="${link(v, 'bairros')}">Por bairro</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Militão Imóveis · ${E.creci} · Fortaleza, CE</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão de imóvel e filtro por tipo (CSS :has, sem JS)
const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo}: ${i.titulo}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${ic('pin')}${onde(i)}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco">${i.preco}</p></div></a></li>`;
const filtro = (v, lista, nome) => `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${[{ g: 'todos', nome: 'Todos', lista }, ...grupos].map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g.g}"${n ? '' : ' checked'}><span>${g.nome} <small>${g.lista.length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;

// descrição do anúncio: frases viram parágrafos, itens curtos viram lista, "Condomínio:" vira subtítulo
function corpo(i) {
  if (!i.desc.length) return `<p>${esc(`${i.tipo} em ${onde(i)}${resumo(i).length ? `, com ${resumo(i).join(', ')}` : ''}${i.banh ? ` e ${quando(i.banh, 'banheiro', 'banheiros')}` : ''}.`)} O anúncio no site atual não tem descrição: peça os detalhes pelo WhatsApp.</p>`;
  let html = '', lista = [];
  const fecha = () => { if (lista.length) html += `<ul class="lista-check desc-lista">${lista.map(l => `<li>${esc(l)}</li>`).join('')}</ul>`; lista = []; };
  for (const l of i.desc) {
    if (/:$/.test(l) && l.length < 40) { fecha(); html += `<h3>${esc(l.slice(0, -1))}</h3>`; }
    else if (l.length < 60 && !/[!?]$/.test(l) || l.length < 34) lista.push(l.replace(/\.$/, ''));
    else { fecha(); html += `<p>${esc(l)}</p>`; }
  }
  fecha();
  return html;
}

function ficha(v, i) {
  const titulo = `${i.tipo} à venda em ${onde(i)}`;
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Banheiros', i.banh], ['Vagas', i.gar], ['Código', i.cod]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${i.titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const nota = i.id === 6853 ? '<p class="pb-nota">Entrada parcelada em até 30 meses, segundo o anúncio. Confirme as condições e a entrega.</p>' : i.id === 6824 ? '<p class="pb-nota">O anúncio cita o Minha Casa Minha Vida, com FGTS na entrada.</p>' : '<p class="pb-nota">Valor informado no anúncio; confirme a disponibilidade.</p>';
  return head(v, i.slug, i.titulo, `${titulo}. ${resumo(i).join(', ')}${resumo(i).length ? '. ' : ''}${i.preco}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${onde(i)} - CE</p>
      <p class="preco-m"><b>${i.preco}</b><a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2>
      <div class="desc">${corpo(i)}</div>
      ${i.car.length && i.desc.length < 4 ? `<h2>Itens</h2><ul class="lista-check amen">${i.car.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">Valor de venda</p>
      <p class="pb-valor">${i.preco}</p>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Falar sobre este imóvel</a>
      <p class="pb-linha">${i.wa.rot}: <a href="${waHref(i.wa.num)}" target="_blank" rel="noopener">${i.wa.fone}</a></p>
      ${nota}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Militão Imóveis.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.waCasas.num}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Procuro<select name="procuro"><option>Casa</option><option>Apartamento</option><option>Lote</option><option>Ainda não sei</option></select></label><label>Bairro ou cidade<input name="bairro" placeholder="Aldeota, Eusébio..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const linhasBloco = () => `<div class="linhas-wa">${linhas.map(l => `<a class="linha-wa sobe" href="${waHref(l.num, `Olá! Vim pelo site da Militão Imóveis e quero falar sobre ${l.rot.toLowerCase()}.`)}" target="_blank" rel="noopener"><span class="lw-rot">${l.rot}</span><b>${l.fone}</b><span class="lw-acao">${icWa()}Chamar no WhatsApp</span></a>`).join('')}</div>`;
const porBairro = v => {
  const nomes = [...new Set(imoveis.map(i => i.bairro))];
  return ['Fortaleza', 'Eusébio e Aquiraz'].map(r => `<section class="regiao"><h2>${r}</h2>${nomes.filter(b => imoveis.find(i => i.bairro === b).regiao === r).map(b => {
    const l = imoveis.filter(i => i.bairro === b);
    return `<article class="bairro sobe" id="${b.toLowerCase().normalize('NFD').replace(/[^\w]+/g, '-')}"><h3>${b}<small>${quando(l.length, 'imóvel', 'imóveis')}</small></h3><ul>${l.map(i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], i.titulo)}<span><b>${esc(i.titulo)}</b><small>${[i.tipo, ...resumo(i).slice(0, 2)].join(' · ')}</small></span><em>${i.preco}</em></a></li>`).join('')}</ul></article>`;
  }).join('')}</section>`).join('');
};

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis à venda', `${imoveis.length} imóveis à venda em Fortaleza, Eusébio e Aquiraz: casas, apartamentos e lotes.`) + topo(v, 'imoveis') + cab('Imóveis à venda', `${imoveis.length} imóveis em Fortaleza, no Eusébio e no Aquiraz`, `Casas, apartamentos e lotes, ${faixa}. Escolha um e chame no WhatsApp para visitar.`) + `
<div class="in lista-pag">${filtro(v, imoveis, 'i')}</div>
` + rodape(v);
  pag.bairros = head(v, 'bairros', 'Imóveis por bairro', `Imóveis à venda por bairro: ${bairros.join(', ')}.`) + topo(v, 'bairros') + cab('Por bairro', 'Onde estão os imóveis', `${bairros.length} bairros e cidades, de Messejana ao Mucuripe e do Eusébio ao Aquiraz.`) + `
<div class="in bairros-pag">${porBairro(v)}</div>
` + rodape(v);
  pag['a-imobiliaria'] = head(v, 'a-imobiliaria', 'A imobiliária', curto) + topo(v, 'a-imobiliaria') + cab('A imobiliária', 'Militão Imóveis', `Imobiliária de Fortaleza, ${E.creci}.`) + `
<div class="in inst">
  <section class="inst-txt"><p class="lead">A Militão Imóveis vende casas, apartamentos e lotes em Fortaleza e na Região Metropolitana, com atendimento direto pelo WhatsApp.</p>
  <p>Hoje são ${imoveis.length} imóveis no site: ${grupos.map(g => `${g.lista.length} ${g.lista.length === 1 ? g.nome.toLowerCase().replace(/s$/, '') : g.nome.toLowerCase()}`).join(', ').replace(/, ([^,]+)$/, ' e $1')}, ${faixa}. Em Fortaleza, ficam em bairros como ${bairros.filter(b => fortaleza.some(i => i.bairro === b)).slice(0, 5).join(', ')}; fora da capital, no Eusébio (Cidade Alpha, River Lake) e no Aquiraz.</p></section>
  <ul class="numeros"><li><b>${imoveis.length}</b><span>imóveis à venda</span></li><li><b>${bairros.length}</b><span>bairros e cidades</span></li><li><b>2</b><span>WhatsApp: casas e apartamentos, lotes</span></li><li><b>1336 J</b><span>registro no CRECI</span></li></ul>
  <section class="como"><header class="tit"><p class="k">Como comprar com a Militão</p><h2>Do anúncio à visita</h2></header>
  <ol class="passos"><li class="sobe"><b>1</b><h3>Escolha o imóvel</h3><p>Veja fotos, valor e detalhes de cada um, ou procure pelo bairro.</p></li><li class="sobe"><b>2</b><h3>Chame no WhatsApp</h3><p>Cada anúncio tem um botão que já manda o nome do imóvel para o corretor.</p></li><li class="sobe"><b>3</b><h3>Agende a visita</h3><p>Combine o melhor horário e tire as dúvidas sobre valor e documentação.</p></li></ol></section>
  <section><header class="tit"><p class="k">Fale com a gente</p><h2>Dois WhatsApp, um para cada assunto</h2></header>${linhasBloco()}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Militão Imóveis pelo WhatsApp: ${E.waCasas.fone} (casas e apartamentos) e ${E.waLotes.fone} (lotes).`) + topo(v, 'contato') + cab('Contato', 'Fale com a Militão Imóveis', 'O atendimento é pelo WhatsApp. Escreva pelo formulário ou chame direto o número certo.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}<p class="form-nota">O formulário abre o WhatsApp de casas e apartamentos com a sua mensagem pronta.</p></div><div>${linhasBloco()}<p class="contato-creci">Militão Imóveis · ${E.creci} · Fortaleza, CE</p></div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porId(7377);
  const destF = [7239, 6900, 7106, 6968, 7053, 6919, 7210, 7317].map(porId);
  const destR = [6884, 6853, 7356, 7342].map(porId);
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">${E.creci} · Fortaleza, CE</p><h1>Casas, apartamentos e lotes em <em>Fortaleza</em>, no Eusébio e no Aquiraz.</h1><p>${imoveis.length} imóveis à venda, ${faixa}. Escolha, chame no WhatsApp e agende a visita.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} imóveis</a><a class="btn btn-linha" href="${waHref(E.waCasas.num, 'Olá! Vim pelo site da Militão Imóveis.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div>
  <a class="hero-a-foto" href="${link(v, capa.slug)}">${foto(capa.fotos[0], 'Fachada de casa duplex moderna com jardim, no Terras 2, Cidade Alpha', ' loading="eager" fetchpriority="high"')}<span class="hero-a-leg"><small>${onde(capa)}</small>${esc(capa.titulo)} · ${capa.preco}</span></a>
</div></section>
<section class="tipos-a"><div class="in"><ul class="tipos">${grupos.map(g => `<li><a href="${link(v, 'imoveis')}" class="tipo sobe">${ic(g.ic)}<b>${g.nome}</b><span>${quando(g.lista.length, 'imóvel', 'imóveis')}</span>${ic('seta')}</a></li>`).join('')}<li><a href="${link(v, 'bairros')}" class="tipo tipo-b sobe">${ic('pin')}<b>Por bairro</b><span>${bairros.length} bairros e cidades</span>${ic('seta')}</a></li></ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Fortaleza</p><h2>Na capital</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Os ${fortaleza.length} de Fortaleza ${ic('seta')}</a></header><ul class="cards">${destF.map(i => cartao(v, i)).join('')}</ul></section>
<section class="rm-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Região Metropolitana</p><h2>Eusébio e Aquiraz</h2><p>Condomínios com lazer, casas planas e lotes perto da CE-040.</p></div><a class="link-seta" href="${link(v, 'bairros')}">Ver por bairro ${ic('seta')}</a></header><ul class="cards cards-4">${destR.map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in wa-a"><div class="wa-a-txt"><p class="k">Atendimento</p><h2>Dois WhatsApp, um para cada assunto</h2><p>Para casas e apartamentos é um número; para lotes, outro. Cada anúncio já chama o número certo.</p></div>${linhasBloco()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const slides = [7377, 6900, 6884].map(porId);
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${foto(i.fotos[0], i.titulo)}</span><span class="ln-tit"><b>${esc(i.titulo)}</b><small>${i.tipo} · ${i.bairro}</small></span><span class="ln-res">${resumo(i).join(' · ')}</span><span class="ln-preco">${i.preco}</span>${ic('seta')}</a></li>`;
  const ordena = l => [...l].sort((a, b) => (b.num || -1) - (a.num || -1));
  pag.index = head(v, 'index', '', curto) + topo(v, 'index') + `
<section class="hero-b" data-carrossel="7000">${slides.map((i, n) => `<figure class="slide${n ? '' : ' ativo'}">${foto(i.fotos[0], i.titulo, n ? ' loading="lazy" decoding="async"' : ' loading="eager" fetchpriority="high"')}<figcaption><a href="${link(v, i.slug)}">${esc(i.titulo)} · ${i.preco}</a></figcaption></figure>`).join('')}
  <div class="in hero-b-in"><p class="k">Militão Imóveis · ${E.creci}</p><h1>Imóveis à venda em Fortaleza <span>e na Região Metropolitana.</span></h1><p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} imóveis</a><a class="btn btn-linha" href="${link(v, 'bairros')}">Procurar por bairro</a></p></div>
  <div class="pontos"></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>${imoveis.length}</b><span>imóveis à venda</span></li><li><b>${grupos[0].lista.length}</b><span>casas</span></li><li><b>${grupos[1].lista.length}</b><span>apartamentos</span></li><li><b>${bairros.length}</b><span>bairros e cidades</span></li></ul></div></section>
<section class="in idx-b"><header class="tit"><p class="k">Índice</p><h2>Todos os imóveis, por região</h2></header>
  <div class="idx-grupo"><h3>Fortaleza <small>${fortaleza.length}</small></h3><ol class="linhas">${ordena(fortaleza).map(linha).join('')}</ol></div>
  <div class="idx-grupo"><h3>Eusébio e Aquiraz <small>${rm.length}</small></h3><ol class="linhas">${ordena(rm).map(linha).join('')}</ol></div>
</section>
<section class="cond-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Com lazer</p><h2>Em condomínio</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver com filtro ${ic('seta')}</a></header><ul class="cards">${[6900, 7106, 6853].map(porId).map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in wa-b"><header class="tit"><p class="k">Atendimento pelo WhatsApp</p><h2>Casas e apartamentos de um lado, lotes do outro</h2></header>${linhasBloco()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waCasas.num);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Militão Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#b02010', fundo: '#1a1818', claro: '#f6f1ec',
  fonteTitulo: 'Tomorrow,system-ui,sans-serif', fonteTexto: 'Albert Sans,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no vermelho e grafite do logo, com a foto de abertura recortada no formato do telhado da marca.', pontos: [`Os ${imoveis.length} imóveis do site com fotos, valor e ficha`, 'Filtro por casas, apartamentos e lotes', 'Fortaleza e Região Metropolitana separadas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Escura, com fotos em tela cheia e um índice de todos os imóveis por região, do mais caro ao mais barato.', pontos: ['Página de imóveis por bairro', 'Cada anúncio chama o WhatsApp certo', 'Imóveis em condomínio em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
