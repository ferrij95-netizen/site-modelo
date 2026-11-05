// GWM Imóveis (Uberaba, Curitiba/PR, CRECI 8028J). Gera public/{a,b}/ e a página de escolha.
// node clientes/gwmimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs gwmimoveis http://gwmimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 do objeto "var imovel" de cada página /imovel/<cód> do site atual (plataforma Imoalert):
// todos os 40 publicados (15 da própria GWM, 25 da venda online da Caixa), até 5 fotos de cada.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'GWM Imóveis', url: 'https://gwmimoveis.overtus.com.br/', antigo: 'http://gwmimoveis.com.br/',
  wa: '5541996451916', waTxt: '(41) 99645-1916', fones: ['(41) 3376-0874', '(41) 3376-4118'], creci: 'CRECI 8028J',
  emails: [['Atendimento', 'atendimento.gwm@gmail.com'], ['Locação', 'aluguel@gwmimoveis.com.br'], ['Contato', 'contato@gwmimoveis.com.br'], ['Diretoria', 'diretoria@gwmimoveis.com.br']],
  end: 'Rua Dr. Euzébio de Oliveira, 142', bairro: 'Uberaba, Curitiba - PR', cep: '81570-140',
  horario: ['Segunda a sexta', '9h às 12h e 13h30 às 17h'],
  insta: 'https://www.instagram.com/imoveismba/', caixa: 'http://venda-imoveis.caixa.gov.br/sistema/busca-imovel.asp?sltTipoBusca=imoveis',
  curto: 'Imobiliária em Curitiba: casas, sobrados, apartamentos, terrenos e chácaras à venda, e imóveis da Caixa com desconto na região metropolitana.',
};
// Regras que aparecem em todos os anúncios da Caixa no site atual (texto da própria Caixa)
const regrasCaixa = [
  ['Formas de pagamento', 'Recursos próprios. Muitos imóveis permitem usar o FGTS; consulte condições e enquadramento.'],
  ['Condomínio', 'Por conta do comprador até 10% do valor de avaliação do imóvel. A Caixa paga o que passar desse limite.'],
  ['Tributos', 'Por conta do comprador quando o débito for menor que 10% do valor de avaliação. Acima disso, a Caixa paga integralmente.'],
  ['Dados e fotos', 'Os dados vêm do site da Caixa e podem mudar a qualquer momento. As fotos podem não mostrar o estado atual do imóvel.'],
];

// ---------- imóveis ----------
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(i => ({ ...i, slug: `imovel/${i.cod}` }));
const proprios = imoveis.filter(i => !i.caixa);
const caixa = imoveis.filter(i => i.caixa).sort((x, y) => parseFloat(y.desconto.replace(',', '.')) - parseFloat(x.desconto.replace(',', '.')));
const cidades = [...new Set(imoveis.map(i => i.cidade))];
const maiorDesc = caixa[0].desconto;
const menorCaixa = caixa.reduce((m, i) => i.valor < m.valor ? i : m);
const brl0 = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'caixa', nome: 'Imóveis da Caixa' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Losango', b: 'Avaliação' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Jost:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Gloock&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap',
};
const cores = { a: '#5a4331', b: '#2a201a' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'GWM Imóveis | Imobiliária em Curitiba e imóveis da Caixa' : `${titulo} | GWM Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="GWM Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="896" height="219" alt="GWM Imóveis"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const m2 = a => a ? `${a.replace(/,00$/, '').replace(/^(\d+)(\d{3})$/, '$1.$2')} m²` : '';
const resumo = i => [i.areaPriv ? m2(i.areaPriv) : m2(i.areaTotal), i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const titulo = i => `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
const onde = i => i.bairro === i.cidade || i.bairro.includes(i.cidade) ? i.bairro : `${i.bairro}, ${i.cidade}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${onde(i)}) que vi no site da GWM Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const selo = i => i.caixa ? `<span class="selo selo-caixa">Caixa · −${i.desconto}</span>` : i.neg === 'aluguel' ? '<span class="selo">Locação</span>' : i.situacao === 'Em construção' ? '<span class="selo">Na planta</span>' : '';

function topo(v, s, claro = v === 'b') {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, claro)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da GWM Imóveis.')}" target="_blank" rel="noopener">${icWa()}<span>${E.waTxt}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Compra, venda e locação de imóveis em Curitiba e região. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('relogio')}<span>${E.horario[0]}<br>${E.horario[1]}</span></li></ul></div>
    <div><h3>Fale com a GWM</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt} (só WhatsApp)</a></li>${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}<li>${ic('mail')}<a href="mailto:${E.emails[0][1]}">${E.emails[0][1]}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}">Da GWM (${proprios.length})</a></li><li><a href="${link(v, 'caixa')}">Da Caixa (${caixa.length})</a></li><li><a href="${E.insta}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} GWM Imóveis Ltda. ${E.creci}.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}${selo(i)}</figure>
  <div class="card-txt"><p class="card-local">${esc(onde(i))} · cód. ${i.cod}</p><h3>${i.tipo}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco">${i.caixa ? `<s>${i.avaliacao.replace(/,00$/, '')}</s>` : ''}<b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['casas', 'Casas e sobrados'], ['apartamentos', 'Apartamentos'], ['terrenos', 'Terrenos e chácaras'], ['comerciais', 'Comerciais']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

// descrição: parágrafos e listas "- " do texto original
function texto(desc) {
  return desc.split(/\n\s*\n/).map(b => {
    const ls = b.split('\n').filter(Boolean);
    if (ls.every(l => /^[-•]/.test(l))) return `<ul class="desc-lista">${ls.map(l => `<li>${esc(l.replace(/^[-•]\s*/, ''))}</li>`).join('')}</ul>`;
    return `<p>${ls.map(esc).join('<br>')}</p>`;
  }).join('');
}

function ficha(v, i) {
  const t = titulo(i);
  const dados = [['Área privativa', m2(i.areaPriv)], ['Área total', m2(i.areaTotal)], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.gar]].filter(d => d[1]);
  const fotos = `<div class="galeria n${Math.min(i.fotos.length, 5)}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo}, ${onde(i)} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${t}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const volta = i.caixa ? 'caixa' : 'imoveis';
  const nota = i.caixa ? `<p class="pb-nota">${esc(i.modalidade)}. A GWM orienta a compra; valores e regras são da Caixa e podem mudar.</p>`
    : i.situacao === 'Alugado' ? '<p class="pb-nota">O imóvel está alugado no momento.</p>'
    : i.situacao === 'Em construção' ? '<p class="pb-nota">Casa na planta, em fase de acabamento.</p>' : '<p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>';
  return head(v, i.slug, `${i.tipo} em ${i.bairro}, ${i.cidade}`, `${t}, ${i.cidade} - PR. ${resumo(i).join(', ')}. ${i.caixa ? `Valor mínimo de venda ${i.preco} (${i.desconto} abaixo da avaliação).` : `Valor ${i.preco}.`}`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.caixa ? 'Imóveis da Caixa' : 'Imóveis da GWM'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${t} · cód. ${i.cod}</p>
      <h1>${i.tipo}${i.nome ? `<small>${esc(i.nome)}</small>` : ''}</h1>
      <p class="ficha-local">${ic('pin')}${i.end ? `${esc(i.end)}, ` : ''}${esc(i.bairro)}, ${i.cidade} - ${i.uf}</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2><div class="desc">${texto(i.desc)}</div>
      ${i.itens.length ? `<h2>No imóvel</h2><ul class="lista-check amen">${i.itens.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      ${i.perto.length ? `<h2>Por perto</h2><ul class="perto">${i.perto.map(p => `<li>${esc(p[0])}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      ${i.caixa ? `<p class="pb-rot">Valor de avaliação</p><p class="pb-aval"><s>${i.avaliacao}</s></p><p class="pb-rot">Valor mínimo de venda</p><p class="pb-valor">${i.preco}</p><p class="pb-desc">${i.desconto} abaixo da avaliação</p>`
        : `<p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p><p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}`}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Falar pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a>
      ${nota}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da GWM Imóveis.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero comprar um imóvel da Caixa</option><option>Quero alugar</option><option>Quero vender ou alugar meu imóvel</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do escritório da GWM Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Doutor Euzébio de Oliveira 142 Uberaba Curitiba PR')}&z=15&output=embed"></iframe>`;
const escritorio = () => `<div class="escritorio"><div><p class="k">Escritório</p><h3>${E.end}</h3><p>${E.bairro} · CEP ${E.cep}</p><p>${ic('relogio')}${E.horario[0]}, ${E.horario[1]}</p><p class="bts"><a class="btn btn-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da GWM Imóveis.')}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p></div>${mapa}</div>`;
const regras = () => `<ul class="regras">${regrasCaixa.map((r, n) => `<li><span class="rg-n">${String(n + 1).padStart(2, '0')}</span><h3>${r[0]}</h3><p>${r[1]}</p></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis da GWM', `${proprios.length} imóveis da GWM: sobrados, apartamentos, casas na praia, terrenos e chácara à venda, e studio para alugar em Curitiba.`) + topo(v, 'imoveis') + cab('Imóveis da GWM', `${proprios.length} imóveis à venda e para alugar`, `Sobrados no Uberaba, apartamentos, casas na planta em Shangri-lá, terrenos e uma chácara em São José dos Pinhais.`) + `
<div class="in lista-pag">${filtro(v, proprios, 'p')}</div>
` + rodape(v);
  pag.caixa = head(v, 'caixa', 'Imóveis da Caixa', `${caixa.length} imóveis da venda online da Caixa em Curitiba e região, com até ${maiorDesc} de desconto sobre a avaliação.`) + topo(v, 'caixa') + cab('Imóveis da Caixa', `${caixa.length} imóveis da Caixa com até ${maiorDesc} abaixo da avaliação`, 'Imóveis retomados que a Caixa vende pela internet. A GWM separa os da região, explica as regras e acompanha a compra.') + `
<div class="in lista-pag">${filtro(v, caixa, 'c')}
<section class="caixa-regras"><header class="tit"><p class="k">Antes de comprar</p><h2>Como funciona a compra de um imóvel da Caixa</h2></header>${regras()}<p class="bts"><a class="btn btn-linha" href="${E.caixa}" target="_blank" rel="noopener">${ic('ext')}Ver todos no site da Caixa</a></p></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a GWM Imóveis: WhatsApp ${E.waTxt}, telefones ${E.fones.join(' e ')}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a GWM Imóveis', 'Atendimento de segunda a sexta. Pelo WhatsApp você fala direto com a equipe.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div><ul class="contato-lista"><li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a><small>Só WhatsApp</small></div></li><li>${ic('tel')}<div><strong>Telefones</strong>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}</div></li>${E.emails.map(e => `<li>${ic('mail')}<div><strong>${e[0]}</strong><a href="mailto:${e[1]}">${e[1]}</a></div></li>`).join('')}</ul></div></section>
<section>${escritorio()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const pega = c => imoveis.find(i => i.cod === c);

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div><span class="losango" aria-hidden="true"></span></section>`;
  const capa = pega('106');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Curitiba · ${E.creci}</p><h1>Sobrados, apartamentos e terrenos em <em>Curitiba e região</em>.</h1><p>${E.curto}</p>
    <div class="portas"><a class="porta" href="${link(v, 'imoveis')}"><span>Imóveis da GWM</span><b>${proprios.length} à venda e para alugar</b>${ic('seta')}</a><a class="porta porta-caixa" href="${link(v, 'caixa')}"><span>Imóveis da Caixa</span><b>${caixa.length} com até ${maiorDesc} de desconto</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa.fotos[0], 'Sobrado em condomínio no bairro Uberaba, Curitiba', ' loading="eager" fetchpriority="high"')}<figcaption>Sobrado em condomínio · Uberaba · ${capa.preco}</figcaption></figure>
</div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Da GWM</p><h2>À venda e para alugar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${proprios.length} ${ic('seta')}</a></header><ul class="cards">${['106', '201', '431', '375', '219', '203'].map(c => cartao(v, pega(c))).join('')}</ul></section>
<section class="caixa-a"><div class="in caixa-a-in">
  <div><p class="k">Imóveis da Caixa</p><h2>Apartamentos a partir de ${brl0(menorCaixa.valor)} na região metropolitana</h2><p>A Caixa vende pela internet imóveis retomados, com valor mínimo bem abaixo da avaliação. A GWM acompanha ${caixa.length} deles em Curitiba, Campo Largo, Fazenda Rio Grande, Almirante Tamandaré, Araucária, Colombo e Piraquara.</p><a class="btn" href="${link(v, 'caixa')}">Ver os imóveis da Caixa</a></div>
  <ol class="descontos">${caixa.slice(0, 5).map(i => `<li><a href="${link(v, i.slug)}"><span class="d-pct">−${i.desconto}</span><span class="d-txt"><b>${i.tipo}</b><small>${esc(onde(i))}</small></span><span class="d-val"><s>${i.avaliacao.replace(/,00$/, '')}</s>${i.preco}</span></a></li>`).join('')}</ol>
</div></section>
<section class="in regras-a"><header class="tit"><p class="k">Compra pela Caixa</p><h2>O que vale para todos os imóveis da Caixa</h2></header>${regras()}</section>
<section class="in esc-a">${escritorio()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = pega('201');
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-pct">−${i.desconto}</span><span class="ln-end"><b>${i.tipo}${i.quartos ? `, ${quando(i.quartos, 'quarto', 'quartos')}` : ''}</b><small>${esc(onde(i))} · cód. ${i.cod}</small></span><span class="ln-aval">${i.avaliacao.replace(/,00$/, '')}</span><span class="ln-preco">${i.preco}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index', true) + `
<section class="hero-b">${foto(capa.fotos[0], 'Chácara com lago e mata nativa em São José dos Pinhais', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">GWM Imóveis · Curitiba · ${E.creci}</p><h1>Avaliação de um lado, <span>preço do outro.</span></h1><p>${proprios.length} imóveis da GWM e ${caixa.length} imóveis da Caixa em Curitiba e região, com a avaliação ao lado do preço.</p><p class="bts"><a class="btn" href="${link(v, 'caixa')}">Imóveis da Caixa</a><a class="btn btn-linha" href="${link(v, 'imoveis')}">Imóveis da GWM</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>${imoveis.length}</b><span>imóveis no site</span></li><li><b>${maiorDesc}</b><span>maior desconto da Caixa</span></li><li><b>${brl0(menorCaixa.valor)}</b><span>menor valor</span></li><li><b>${cidades.length}</b><span>cidades</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Venda online da Caixa</p><h2>Maiores descontos sobre a avaliação</h2></div><a class="link-seta" href="${link(v, 'caixa')}">Ver os ${caixa.length} ${ic('seta')}</a></header>
<div class="linhas-cab" aria-hidden="true"><span>Desconto</span><span>Imóvel</span><span>Avaliação</span><span>Valor mínimo</span></div><ol class="linhas">${caixa.slice(0, 10).map(linha).join('')}</ol></section>
<section class="proprios-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Imóveis da GWM</p><h2>Sobrados, chácara, casas na praia e terrenos</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${proprios.length} ${ic('seta')}</a></header><ul class="cards">${['119', '432', '376', '249'].map(c => cartao(v, pega(c))).join('')}</ul></div></section>
<section class="in regras-b"><header class="tit"><p class="k">Antes de comprar</p><h2>Quatro regras da Caixa que mudam a conta</h2></header>${regras()}</section>
<section class="esc-b"><div class="in">${escritorio()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'GWM Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#b8977a', fundo: '#2a201a', claro: '#f6f0e8',
  fonteTitulo: 'Marcellus,Georgia,serif', fonteTexto: 'Jost,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 3 + imoveis.length, texto: 'Clara, no areia e marrom do logo, com as duas portas de entrada: os imóveis da GWM e os da Caixa.', pontos: [`Os ${imoveis.length} imóveis do site com fotos e ficha completa`, 'Regras da compra pela Caixa explicadas', 'Visita pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 3 + imoveis.length, texto: 'Escura, com a avaliação ao lado do preço: os imóveis da Caixa listados pelo tamanho do desconto.', pontos: [`Até ${maiorDesc} abaixo da avaliação, em destaque`, 'Imóveis próprios em cartões com foto', 'Escritório com mapa e horário'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
