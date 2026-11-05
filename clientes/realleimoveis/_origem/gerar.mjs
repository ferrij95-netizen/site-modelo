// Realle Soluções Imobiliárias Integradas (Belo Horizonte/MG, desde 2009, CRECI 3883). Gera public/{a,b}/ e a página de escolha.
// node clientes/realleimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs realleimoveis http://www.realleimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 do __NEXT_DATA__ das páginas /imovel/<código> do site atual (plataforma Arbo/Superlógica).
// 40 dos 515 anunciados: os da home, todos com valor de locação e uma amostra do resto; até 5 fotos de cada (ver LEIA-ME).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Realle Imóveis', url: 'https://realleimoveis.overtus.com.br/', antigo: 'http://www.realleimoveis.com.br/',
  wa: '5531953475326', waFone: '(31) 95347-5326', fixo: '(31) 3418-2099',
  email: 'atendimento@realleimoveis.com.br', financeiro: 'financeiro@realleimoveis.com.br',
  end: 'Rua Flor das Pedras, 687', bairro: 'Jardim Alvorada, Belo Horizonte - MG', creci: '3883',
  horario: 'Segunda a sexta, das 9h às 17h. Sábado, das 8h às 12h.',
  insta: 'https://www.instagram.com/somosrealle/', instaLoc: 'https://www.instagram.com/somosrealle_locacao/', face: 'https://www.facebook.com/somosrealle/',
  curto: 'Imobiliária em Belo Horizonte desde 2009: compra, venda e locação de casas, apartamentos, terrenos e fazendas em BH, Lagoa Santa, Contagem e interior de Minas, com suporte técnico e jurídico.',
};
const historia = [
  'Em 2009 nasce a Realle. O sonho de seu fundador era criar uma imobiliária diferente das demais, uma empresa que tivesse como missão ser além de uma simples intermediadora na venda de imóveis, com foco nas pessoas, voltada para soluções imobiliárias de forma integrada, com suporte técnico e jurídico em todas as fases do processo.',
  'Assim, com o objetivo de ofertar essas soluções, a empresa se ergueu com uma cultura organizacional focada na qualidade da prestação de serviços.',
];
// pilares e serviços: textos do material institucional da Realle ("Em 2009 nasce a Realle")
const pilares = [
  ['usuarios', 'Foco nas pessoas', 'Colocamos pessoas em primeiro lugar e construímos relacionamentos de confiança.'],
  ['escudo', 'Suporte técnico e jurídico', 'Acompanhamento completo em todas as fases do processo, com segurança e transparência.'],
  ['estrela', 'Qualidade que nos move', 'Nossa cultura organizacional é focada na excelência da prestação de serviços.'],
];
const servicos = [['chave', 'Locação'], ['casa', 'Vendas'], ['livro', 'Assessoria completa'], ['medidor', 'Avaliações judiciais']];
const selos = ['Experiência e resultados', 'Negociação estratégica', 'Segurança em cada etapa', 'Melhores oportunidades'];

// ---------- imóveis ----------
const CAPA = { TE0186: 2, AP1880: 1, AP1892: 3, AP1900: 1, FA0001: 1, TE0175: 1, CA0716: 4 }; // capas que no site são panfletos com texto
const GRUPO = t => /Apartamento|Cobertura/.test(t) ? 'apartamentos' : /Casa/.test(t) ? 'casas' : /Loja|Sala/.test(t) ? 'comerciais' : 'terras';
const NOMEGRUPO = { apartamentos: 'Apartamentos e coberturas', casas: 'Casas', comerciais: 'Lojas e salas', terras: 'Terrenos, chácaras e fazendas' };
const TIPO = { 'Cobertura / Penthouse': 'Cobertura', Pousada: 'Pousada' };
const BAIRRO = { 'RESIDENCIAL NÁUTICO': 'Residencial Náutico', 'Residencial Green Vllage': 'Residencial Green Village' };
const reais = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const tiraEmoji = s => s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/[ \t]+\n/g, '\n').replace(/[ \t]{2,}/g, ' ');
const n0 = x => (x && +x > 0 ? +x : 0);
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const tipo = TIPO[x.tipo] || x.tipo;
  const fotos = [...x.img];
  if (CAPA[x.cod]) fotos.unshift(...fotos.splice(CAPA[x.cod], 1));
  const venda = n0(x.venda), aluguel = n0(x.aluguel);
  const area = n0(x.area_util) || n0(x.area_total);
  return {
    cod: x.cod, slug: `imovel/${x.cod.toLowerCase()}`, tipo, grupo: GRUPO(x.tipo),
    bairro: BAIRRO[x.bairro] || x.bairro, cidade: x.cidade, cond_nome: x.nome_cond,
    venda, aluguel, cond: n0(x.cond), iptu: n0(x.iptu),
    area, areaTotal: n0(x.area_total), quartos: n0(x.quartos), suites: n0(x.suites), banh: n0(x.banheiros), vagas: n0(x.vagas),
    desc: tiraEmoji(x.obs).trim().split(/\n\s*\n+/).map(p => p.trim()).filter(Boolean),
    amen: [...new Set(x.comodidades.map(c => c.trim().replace(/\s+/g, ' ')))].slice(0, 24), fotos,
  };
});
const vendas = imoveis.filter(i => i.venda);
const aluguel = imoveis.filter(i => i.aluguel);
const cidades = Object.entries(imoveis.reduce((m, i) => (m[i.cidade] = (m[i.cidade] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]);
const TOTAL = 515; // anunciados no site em 05/11/2026

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'empresa', nome: 'A Realle' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Fechadura', b: 'Gerais' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,700;1,6..96,500&family=Manrope:wght@400;500;600;700&display=swap',
};
const cores = { a: '#1056c0', b: '#0b1530' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Realle Imóveis | Comprar e alugar em Belo Horizonte e região' : `${titulo} | Realle Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Realle Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="720" height="201" alt="Realle Soluções Imobiliárias Integradas"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const m2 = n => `${(+n).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`;
const resumo = i => [i.area && m2(i.area), i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const negocio = i => i.venda && i.aluguel ? 'Venda ou locação' : i.venda ? 'À venda' : 'Para alugar';
const precoTxt = (i, neg) => neg === 'aluguel' ? `${reais(i.aluguel)}<small>/mês</small>` : reais(i.venda);
const precoPrincipal = i => i.venda ? reais(i.venda) : `${reais(i.aluguel)}<small>/mês</small>`;
const titulo = i => `${i.tipo} em ${i.bairro}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} em ${i.bairro}, ${i.cidade}) que vi no site da Realle.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Realle e tenho interesse em um imóvel.')}" target="_blank" rel="noopener">${icWa()}<span>${E.waFone}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Soluções imobiliárias integradas em Belo Horizonte e região desde 2009.</p><p class="creci">CRECI ${E.creci}</p></div>
    <div><h3>Sede</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('relogio')}<span>${E.horario}</span></li></ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waFone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">@somosrealle</a></li><li>${ic('insta')}<a href="${E.instaLoc}" target="_blank" rel="noopener">@somosrealle_locacao</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'servicos')}#anuncie">Anuncie seu imóvel</a></li><li><a href="${link(v, 'empresa')}">A Realle</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Realle Soluções Imobiliárias Integradas. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão (lista) e filtro por grupo (CSS :has, sem JS)
const cartao = (v, i, neg) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${titulo(i)}, ${i.cidade}`)}<span class="card-tipo">${negocio(i)}</span></figure>
  <div class="card-txt"><p class="card-local">${esc(i.cidade)} · cód. ${i.cod}</p><h3>${esc(titulo(i))}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${neg ? precoTxt(i, neg) : precoPrincipal(i)}</b></p></div></a></li>`;
const filtro = (v, lista, nome, neg) => {
  const grupos = [['todos', 'Todos'], ...Object.entries(NOMEGRUPO)].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i, neg)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const t = titulo(i);
  const dados = [['Área', i.area && m2(i.area)], ['Área total', i.areaTotal && i.areaTotal !== i.area && m2(i.areaTotal)], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${t} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${t}, ${i.cidade}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const volta = i.venda ? 'comprar' : 'alugar';
  return head(v, i.slug, t, `${t}, ${i.cidade} - MG. ${resumo(i).join(', ')}. ${i.venda ? `Venda ${reais(i.venda)}` : ''}${i.venda && i.aluguel ? '; ' : ''}${i.aluguel ? `aluguel ${reais(i.aluguel)}/mês` : ''}. Cód. ${i.cod}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.venda ? 'Imóveis à venda' : 'Imóveis para alugar'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${negocio(i)} · cód. ${i.cod}</p>
      <h1>${esc(t)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.bairro)}, ${esc(i.cidade)} - MG${i.cond_nome ? ` · ${esc(i.cond_nome)}` : ''}</p>
      <p class="preco-m"><b>${precoPrincipal(i)}</b><a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2><div class="desc">${i.desc.map(p => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('')}</div>
      ${i.amen.length ? `<h2>Características</h2><ul class="lista-check amen">${i.amen.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      ${i.venda ? `<p class="pb-rot">Valor de venda</p><p class="pb-valor">${reais(i.venda)}</p>` : ''}
      ${i.aluguel ? `<p class="pb-rot">${i.venda ? 'Ou aluguel' : 'Aluguel'}</p><p class="pb-valor${i.venda ? ' pb-dois' : ''}">${reais(i.aluguel)}<small>/mês</small></p>` : ''}
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${reais(i.cond)}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${reais(i.iptu)}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent(`Imóvel cód. ${i.cod}`)}">${ic('mail')}Pedir informações por e-mail</a>
      <p class="pb-nota">Valores informados pela Realle; confirme na visita. CRECI ${E.creci}.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Realle.') => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Assessoria ou avaliação</option><option>Outro assunto</option></select></label><label>Cidade ou bairro<input name="local" placeholder="BH, Lagoa Santa, Contagem..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da sede da Realle" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Flor das Pedras 687 Jardim Alvorada Belo Horizonte MG')}&z=15&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Atendimento comercial (WhatsApp)</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waFone}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fixo)}">${E.fixo}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a><a href="mailto:${E.financeiro}">${E.financeiro}</a></div></li>
  <li>${ic('pin')}<div><strong>Sede</strong><span>${E.end}<br>${E.bairro}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
</ul>`;
const pilaresLista = () => `<ul class="pilares">${pilares.map((x, n) => `<li class="sobe">${ic(x[0])}<span class="pil-n">0${n + 1}</span><h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul>`;
const destaques = ['CA0752', 'AP1900', 'PH0053', 'CA0800', 'AP1748', 'CH0017', 'TE0186', 'CA0716'];
const porCod = c => imoveis.find(i => i.cod === c);

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Casas, apartamentos, terrenos e fazendas à venda em BH, Lagoa Santa, Contagem e Minas Gerais.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis para comprar em BH e em Minas', `Uma seleção de ${vendas.length} dos ${TOTAL} imóveis que a Realle anuncia hoje. Pergunte pelo que você procura.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v', 'venda')}</div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', 'Coberturas, casas, lojas e salas para alugar em Belo Horizonte e região.') + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar', 'Coberturas, casas, lojas e salas. A locação tem atendimento próprio no Instagram @somosrealle_locacao.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a', 'aluguel')}</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Locação, vendas, assessoria completa e avaliações judiciais, com suporte técnico e jurídico em todas as fases.') + topo(v, 'servicos') + cab('Serviços', 'Soluções imobiliárias integradas', 'Mais que intermediar: suporte técnico e jurídico em todas as fases do processo.') + `
<div class="in">
<section class="serv-sec"><ul class="servicos">${servicos.map(s => `<li class="sobe">${ic(s[0])}<h2>${s[1]}</h2></li>`).join('')}</ul></section>
<section class="pil-sec"><header class="tit"><p class="k">Como trabalhamos</p><h2>Três pilares desde 2009</h2></header>${pilaresLista()}</section>
<section class="selos-sec"><ul class="selos">${selos.map(s => `<li>${ic('check')}${s}</li>`).join('')}</ul></section>
<section class="anuncie" id="anuncie"><div><p class="k">Anuncie</p><h2>Quer vender ou alugar seu imóvel?</h2><p>O anúncio é gratuito. Conte onde ele fica e a equipe da Realle entra em contato.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Realle.')}</section>
</div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Realle', historia[0]) + topo(v, 'empresa') + cab('A Realle', 'Em 2009 nasce a Realle', 'Mais que imóveis: conectamos pessoas a novas possibilidades.') + `
<div class="in"><section class="inst">${historia.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
<section class="inst-num"><ul class="numeros"><li><b>2009</b><span>ano de fundação</span></li><li><b>${TOTAL}</b><span>imóveis anunciados</span></li><li><b>${E.creci}</b><span>CRECI</span></li></ul></section>
<section><header class="tit"><p class="k">Pilares</p><h2>O que nos move</h2></header>${pilaresLista()}</section>
<section class="sede"><div><p class="k">Sede</p><h2>Jardim Alvorada, Belo Horizonte</h2><p>${E.end}<br>${E.bairro}</p><p>${E.horario}</p></div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Realle: WhatsApp ${E.waFone}, ${E.email}. Rua Flor das Pedras, 687, Jardim Alvorada, BH.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Realle', 'Escreva pelo formulário, chame no WhatsApp ou venha à sede no Jardim Alvorada.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const fechadura = `<svg class="fech" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3243b"/><stop offset="1" stop-color="#1056c0"/></linearGradient></defs><path fill="url(#gr)" fill-rule="evenodd" d="M50 2a48 48 0 1 0 .01 0zM50 24a12 12 0 0 0-6 22.4L38 97h24l-6-50.6A12 12 0 0 0 50 24z"/></svg>`;

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div>${fechadura}</section>`;
  const capa = porCod('CA0656').fotos[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Belo Horizonte · desde 2009</p><h1>Para você <em>morar bem</em>.</h1><p class="lead">Compre ou alugue com agilidade, segurança e sem burocracia.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>Casas, apês, terrenos</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>Coberturas, casas, lojas</b>${ic('seta')}</a></div>
    <p class="anuncie-link"><a href="${link(v, 'servicos')}#anuncie">Anuncie seu imóvel gratuitamente</a></p></div>
  <figure class="hero-a-foto"><div class="buraco">${foto(capa, 'Casa com piscina no Portal do Sol, em Contagem', ' loading="eager" fetchpriority="high"')}</div><figcaption>Portal do Sol, Contagem · cód. CA0656</figcaption></figure>
</div></section>
<section class="cidades-a"><div class="in"><p class="k">Onde estão os imóveis</p><ul>${cidades.map(([c, n]) => `<li>${esc(c)} <small>${n}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Exclusividades e oportunidades</p><h2>Imóveis em destaque</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos à venda ${ic('seta')}</a></header><ul class="cards">${destaques.map(c => cartao(v, porCod(c))).join('')}</ul></section>
<section class="serv-a"><div class="in serv-a-in"><div><p class="k">Soluções integradas</p><h2>Mais que intermediar a venda</h2><p>${historia[0].replace(/^Em 2009 nasce a Realle\. /, '')}</p><a class="btn" href="${link(v, 'servicos')}">Conheça os serviços</a></div><ul class="servicos">${servicos.map(s => `<li>${ic(s[0])}<h3>${s[1]}</h3></li>`).join('')}</ul></div></section>
<section class="in pil-a"><header class="tit"><p class="k">Desde 2009</p><h2>Realizar o seu sonho é o nosso compromisso</h2></header>${pilaresLista()}</section>
<section class="in grupos-a"><header class="tit tit-linha"><div><p class="k">Por tipo</p><h2>O que você procura?</h2></div></header><ul class="grupos">${Object.entries(NOMEGRUPO).map(([g, nome]) => { const l = imoveis.filter(i => i.grupo === g); const f = porCod({ apartamentos: 'AP1748', casas: 'CA0752', comerciais: 'LO0113', terras: 'TE0191' }[g]).fotos[0]; return `<li><a href="${link(v, l.every(i => !i.venda) ? 'alugar' : 'comprar')}">${f ? foto(f, nome) : ''}<span>${nome}<small>${l.length} na seleção</small></span></a></li>`; }).join('')}</ul></section>
<section class="contato-a"><div class="in contato-a-in"><div><p class="k">Fale com a Realle</p><h2>Conte o que você procura</h2>${contatoLista()}</div>${formulario()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porCod('TE0192').fotos[0];
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${foto(i.fotos[0], titulo(i))}</span><span class="ln-end"><b>${esc(titulo(i))}</b><small>${esc(i.cidade)} · cód. ${i.cod}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${precoPrincipal(i)}</span>${ic('seta')}</a></li>`;
  const excl = ['FA0001', 'TE0175'].map(porCod);
  const regioes = [['Belo Horizonte', i => i.cidade === 'Belo Horizonte'], ['Região metropolitana de BH', i => /Lagoa Santa|Contagem|Vespasiano|Esmeraldas|Nova Lima|Sabará/.test(i.cidade)], ['Interior de Minas', i => !/Belo Horizonte|Lagoa Santa|Contagem|Vespasiano|Esmeraldas|Nova Lima|Sabará/.test(i.cidade)]];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Vista aérea de lago e loteamento em Guapé, Minas Gerais', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Realle · Belo Horizonte · desde 2009</p><h1>Mais que imóveis. <em>Conectamos pessoas a novas possibilidades.</em></h1><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Para alugar</a></p></div><p class="hero-b-leg in">Residencial Laguna, Guapé - MG · cód. TE0192</p></section>
<section class="faixa-b"><div class="in"><ul>${selos.map(s => `<li>${s}</li>`).join('')}</ul></div></section>
<section class="excl-b"><div class="in"><header class="tit"><p class="k">Exclusividade Realle</p><h2>Terras para investir</h2></header><div class="excl">${excl.map(i => `<a class="excl-card" href="${link(v, i.slug)}">${foto(i.fotos[0], titulo(i))}<span class="fita">Exclusividade</span><span class="excl-txt"><small>${esc(i.cidade)} - MG · ${resumo(i)[0] || ''}</small><b>${esc(i.tipo)} em ${esc(i.cidade)}</b><i>${reais(i.venda)}</i></span></a>`).join('')}</div></div></section>
${regioes.map(([nome, f], n) => { const l = imoveis.filter(f).filter(i => !['FA0001', 'TE0175'].includes(i.cod)); return `<section class="in reg-b"><header class="tit tit-linha"><div><p class="k">0${n + 1} · ${l.length} imóveis</p><h2>${nome}</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos ${ic('seta')}</a></header><ol class="linhas">${l.slice(0, 6).map(linha).join('')}</ol></section>`; }).join('')}
<section class="anos-b"><div class="in anos-b-in"><p class="anos">17</p><div><p class="k">anos realizando sonhos e construindo histórias</p><h2>Em 2009 nasce a Realle</h2><p>${historia[0].replace(/^Em 2009 nasce a Realle\. /, '')}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></div></section>
<section class="in pil-b"><header class="tit"><p class="k">Serviços</p><h2>Locação, vendas, assessoria completa e avaliações judiciais</h2></header>${pilaresLista()}<p class="bts"><a class="btn" href="${link(v, 'servicos')}#anuncie">Anunciar meu imóvel</a></p></section>
<section class="contato-b"><div class="in contato-a-in"><div><p class="k">Contato</p><h2>Fale com a Realle</h2>${contatoLista()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Realle Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#1056c0', fundo: '#0b1530', claro: '#eef3fb',
  fonteTitulo: 'Sora,system-ui,sans-serif', fonteTexto: '"Hanken Grotesk",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, com a fechadura do logo emoldurando a foto de abertura e o degradê vermelho e azul da marca.', pontos: [`${imoveis.length} imóveis reais com fotos, valores e ficha completa`, 'Filtro por casas, apartamentos, lojas e terras', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, em azul-marinho e dourado como os panfletos da Realle, com as exclusividades em destaque e os imóveis por região.', pontos: ['Fazenda em Sabará e terreno em Congonhas em destaque', 'Imóveis de BH, região metropolitana e interior', '17 anos de história contados na home'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
