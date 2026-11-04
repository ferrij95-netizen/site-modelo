// Ricardi Equipamentos (Rondonópolis/MT). Gera public/{a,b}/ e a página de escolha.
// node clientes/ricardi/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs ricardi https://www.ricardiequipamentos.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8')).map(p => ({ ...p, textos: p.textos.filter(t => !t.startsWith('©')).map(t => t.replace(/ /g, ' ').replace(/\s+/g, ' ').trim()) }));
const E = {
  nome: 'Ricardi Equipamentos', url: 'https://ricardi.overtus.com.br/', antigo: 'https://www.ricardiequipamentos.com.br/',
  wa: '5566999849123', fones: ['(66) 3421-1637', '(66) 3421-1749'], cel: '(66) 99984-9123', email: 'vendas@ricardiequipamentos.com.br',
  rua: 'Av. Espírito Santo, nº 1666', bairro: 'Cidade Salmen', cidade: 'Rondonópolis - MT', cep: '78705-158',
  facebook: 'https://www.facebook.com/RicardiEquipamentos/', instagram: 'https://www.instagram.com/ricardi_equipamentos/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Av.+Esp%C3%ADrito+Santo,+1666,+Rondon%C3%B3polis+MT',
  slogan: 'Solução em Equipamentos Agrícolas',
  curto: 'Tendo como principal característica a inovação, somos uma empresa especializada em fabricação de equipamentos industriais e agrícolas.',
  prod: 'Com fabricação e manufatura próprias, nossos equipamentos contam com estrutura reforçada e matéria-prima de qualidade para garantir durabilidade aos nossos clientes. Além de equipamentos agrícolas, também oferecemos serviços diversos.',
  sobre: ['Atuando há mais de trinta anos no município de Rondonópolis, a Ricardi Equipamentos é uma empresa inovadora, especializada em fabricação e manufatura de equipamentos industriais e agrícolas. Nossos produtos podem ser fabricados em tamanhos e modelos variados e ainda ser personalizados.',
    'Com o passar do tempo, a Ricardi ampliou seus atendimentos em nível nacional. Nossa carteira de clientes hoje se diversificou para grupos multinacionais, sementeiras, exportadores, fazendas e grupos agropecuários situados em todo o Brasil.',
    'Possuindo como características principais a idoneidade e a responsabilidade, oferecemos aos nossos clientes produtos e serviços de qualidade e com garantia.'],
  missao: 'Oferecer equipamentos agrícolas, industriais e serviços inovadores, garantindo soluções viáveis com durabilidade, segurança e responsabilidade aos nossos clientes.',
  visao: 'Ser uma empresa reconhecida nacionalmente pela busca incessante de soluções para o trabalho agrícola, utilizando tecnologia e inovação na criação e no desenvolvimento de equipamentos e serviços.',
  valores: ['Inovação', 'Segurança', 'Idoneidade e transparência', 'Ética profissional', 'Empreendedorismo em gestão', 'Respeito ao cliente', 'Responsabilidade ambiental'],
};
const linhas = [
  { id: 'agricola', nome: 'Agrícola', icone: 'trator', texto: 'Reboques, carretas, caçambas e tanques de fabricação própria.' },
  { id: 'seguranca', nome: 'Segurança no campo', icone: 'escudo', texto: 'Área de vivência móvel conforme as NRs 18, 24 e 31.' },
  { id: 'ambiente', nome: 'Meio ambiente', icone: 'gota', texto: 'Ecopontos, coleta seletiva, tampas e pedestais para tambores.' },
  { id: 'servicos', nome: 'Serviços', icone: 'chave', texto: 'Hidrojateamento e limpeza de pastos e terrenos.' },
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'Sobre nós' }, { slug: 'produtos', nome: 'Produtos e Serviços' }, { slug: 'usados', nome: 'Revenda Usados' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Selo Verde', b: 'Pátio de Fábrica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Ricardi Equipamentos e quero um orçamento.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#18582c' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lP = (v, p) => `/${v}/produtos/${p.slug}/`;
const resumo = p => { const t = p.textos[0]; const i = t.indexOf(',', 60); return (i > 0 && i < 170 ? t.slice(0, i) : t.slice(0, 150).replace(/\s\S*$/, '')) + '.'; };

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <img class="selo30" src="/assets/selo-30-anos.webp" alt="30 anos" width="400" height="400">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo-selo.webp" alt="Ricardi Equipamentos" width="289" height="124"></a>
    <p class="slogan">${E.slogan}</p>
    <a class="topo-wa" href="${wa()}" target="_blank" rel="noopener">${icWa()}<span><small>WhatsApp</small>${E.cel}</span></a>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><ul class="in">${menuItens(v, nav, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo-selo.webp" alt="Ricardi Equipamentos" width="289" height="124"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}Orçamento</a>
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
    <div class="rod-marca"><img src="/assets/logo-selo.webp" alt="Ricardi Equipamentos" width="289" height="124" loading="lazy"><p>${E.slogan}. Fabricação própria em Rondonópolis há mais de 30 anos.</p><p class="rod-redes"><a href="${E.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a></p></div>
    <div><h3>Produtos e serviços</h3><ul>${linhas.map(l => `<li><a href="${link(v, 'produtos')}#${l.id}">${l.nome}</a></li>`).join('')}<li><a href="${link(v, 'usados')}">Revenda de usados</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')}</span></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const formulario = (assunto = '') => `<form class="form" data-wa="Olá! Vim pelo site da Ricardi Equipamentos.">
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-duas"><label>Telefone *<input name="telefone" required inputmode="tel" autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Assunto<select name="assunto">${produtos.map(p => `<option${p.nome === assunto ? ' selected' : ''}>${p.nome}</option>`).join('')}<option${assunto === 'Usados' ? ' selected' : ''}>Revenda de usados</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Capacidade, quantidade, cidade de entrega..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Ricardi Equipamentos em Rondonópolis" loading="lazy" src="https://maps.google.com/maps?q=Av.%20Esp%C3%ADrito%20Santo%2C%201666%2C%20Rondon%C3%B3polis&z=15&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span><a href="${E.mapa}" target="_blank" rel="noopener">Como chegar ${ic('ext')}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}</div></li>
  <li>${icWa()}<div><strong>Celular e WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const marcas = `<div class="marcas"><p>Revendedor autorizado</p><img src="/assets/marca-branco.webp" alt="Branco" loading="lazy"><img src="/assets/marca-andrade.webp" alt="Bombas Andrade, Indústria Mecânica Andrade" loading="lazy"></div>`;
const usadosTexto = 'Além da fabricação, a Ricardi faz a revenda de equipamentos agrícolas usados. Os itens mudam com frequência: fale com a equipe para saber o que está disponível no pátio.';

function paginaProduto(v, p, cls) {
  const outros = produtos.filter(o => o.linha === p.linha && o !== p);
  const l = linhas.find(x => x.id === p.linha);
  return head(v, `produtos/${p.slug}`, p.nome, p.textos[0].slice(0, 155)) + topo(v, 'produtos') + `
<nav class="trilha-nav in" aria-label="Caminho"><a href="${link(v, 'produtos')}">Produtos e Serviços</a> / <a href="${link(v, 'produtos')}#${l.id}">${l.nome}</a> / <span>${p.nome}</span></nav>
<section class="prod ${cls} in">
  <div class="prod-fotos">${p.fotos.map((f, i) => `<a href="/assets/img/${f}.webp" data-foto="${esc(p.nome)}"${i ? '' : ' class="prod-principal"'}>${img(f, p.nome, i ? '' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="prod-txt"><p class="k">${l.nome}</p><h1>${p.nome}</h1>${p.textos.map(t => `<p>${t}</p>`).join('')}<div class="bts"><a class="btn" href="${wa(`Olá! Quero um orçamento de ${p.nome}.`)}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></div><p class="prod-nota">Fabricação própria: capacidades, medidas e pintura sob medida.</p></div>
</section>
${outros.length ? `<section class="outros in"><h2>Outros em ${l.nome.toLowerCase()}</h2><ul>${outros.map(o => `<li><a href="${lP(v, o)}">${img(o.fotos[0], o.nome)}<span>${o.nome}</span></a></li>`).join('')}</ul></section>` : ''}
` + rodape(v);
}

// ---------- Versão A: Selo Verde (fiel: selo dos 30 anos, logo, slogan, menu verde com item ativo marrom, coluna de notícias amarela vira destaques) ----------
function A() {
  const v = 'a';
  const pag = {};
  const faixa = (t, sub = '') => `<section class="faixa-a"><div class="in"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  const grade = lista => `<ul class="prod-a">${lista.map(p => `<li><a href="${lP(v, p)}">${img(p.fotos[0], p.nome)}<strong>${p.nome}</strong><span>${resumo(p)}</span><em>Leia mais</em></a></li>`).join('')}</ul>`;
  pag.index = head(v, 'index', E.slogan, E.curto) + topo(v, 'index') + `
<section class="hero-a" data-carrossel="6000" aria-label="Equipamentos Ricardi">
  ${['comboio-1', 'tanque-reboque-1', 'area-de-vivencia-1', 'julieta-1'].map((f, i) => `<figure class="slide${i ? '' : ' ativo'}">${img(f, 'Equipamento Ricardi', i ? '' : ' loading="eager" fetchpriority="high"')}</figure>`).join('')}
  <div class="hero-a-cx"><div class="in"><div class="hero-a-txt"><p class="k">Rondonópolis · MT · há mais de 30 anos</p><h1>Equipamentos agrícolas e industriais de fabricação própria</h1><a class="btn" href="${link(v, 'produtos')}">Ver produtos e serviços</a></div></div></div>
  <div class="pontos"></div>
</section>
<section class="in duas-a">
  <div class="col-principal">
    <h2>Sobre nós</h2><p>${E.curto}</p><p>${E.sobre[1]}</p><a class="btn btn-marrom" href="${link(v, 'sobre')}">Leia mais</a>
    <hr>
    <h2>Produtos e Serviços</h2><p>${E.prod}</p>
    <ul class="linhas-a">${linhas.map(l => `<li><a href="${link(v, 'produtos')}#${l.id}">${ic(l.icone)}<strong>${l.nome}</strong><span>${l.texto}</span></a></li>`).join('')}</ul>
  </div>
  <aside class="col-lado">
    <h2>Destaques</h2>
    ${['comboio', 'area-de-vivencia', 'ecoponto'].map(s => { const p = produtos.find(x => x.slug === s); return `<article><a href="${lP(v, p)}">${img(p.fotos[0], p.nome)}</a><h3>${p.nome}</h3><p>${resumo(p)}</p><a class="btn btn-marrom" href="${lP(v, p)}">Leia mais</a></article>`; }).join('')}
    ${marcas}
  </aside>
</section>
<section class="faixa-prod"><div class="in"><h2>Linha agrícola</h2>${grade(produtos.filter(p => p.linha === 'agricola').slice(0, 6))}<p class="centro"><a class="btn" href="${link(v, 'produtos')}">Todos os produtos</a></p></div></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre a Ricardi', E.sobre[0]) + topo(v, 'sobre') + faixa('Sobre a Ricardi', E.slogan) + `
<section class="in duas-a sobre-a">
  <div class="col-principal"><h2>Empresa</h2>${E.sobre.map(t => `<p>${t}</p>`).join('')}
    <div class="mv-a"><div><h3>Missão</h3><p>${E.missao}</p></div><div><h3>Visão</h3><p>${E.visao}</p></div></div>
  </div>
  <aside class="col-lado"><img class="selo-grande" src="/assets/selo-30-anos.webp" alt="Ricardi 30 anos" loading="lazy"><h2>Valores</h2><ul class="valores-a">${E.valores.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></aside>
</section>
` + rodape(v);

  pag.produtos = head(v, 'produtos', 'Produtos e Serviços', E.prod) + topo(v, 'produtos') + faixa('Produtos e Serviços', E.prod) + linhas.map(l => `
<section class="linha-sec in" id="${l.id}"><h2>${ic(l.icone)}${l.nome}</h2>${grade(produtos.filter(p => p.linha === l.id))}</section>`).join('') + rodape(v);
  for (const p of produtos) pag[`produtos/${p.slug}`] = paginaProduto(v, p, 'prod-a');

  pag.usados = head(v, 'usados', 'Revenda de usados', usadosTexto) + topo(v, 'usados') + faixa('Revenda de Usados', 'Agrícola') + `
<section class="in duas-a"><div class="col-principal"><h2>Equipamentos usados</h2><p>${usadosTexto}</p>${formulario('Usados')}</div><aside class="col-lado">${img('colheita', 'Colheita de soja')}${marcas}</aside></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a Ricardi: ${E.fones[0]}, ${E.cel}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + faixa('Contato', 'Será um prazer atendê-lo. Deixe sua dúvida.') + `
<section class="in duas-a"><div class="col-principal"><h2>Fale com a gente</h2>${formulario()}</div><aside class="col-lado">${contatoLista()}</aside></section>
<section class="in mapa-sec">${mapaFrame}</section>
` + rodape(v);
  return pag;
}

// ---------- Versão B: Pátio de Fábrica (moderna: fotos grandes dos equipamentos, linhas em blocos, ficha técnica) ----------
function B() {
  const v = 'b';
  const pag = {};
  const sub = (k, h, p, foto) => `<section class="sub-b"${foto ? ` style="--f:url(/assets/img/${foto}.webp)"` : ''}><div class="in"><p class="k">${k}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div></section>`;
  const numeros = `<section class="num-b"><div class="in"><p><b>+30</b>anos em Rondonópolis</p><p><b>${produtos.filter(p => p.linha !== 'servicos').length}</b>equipamentos de fabricação própria</p><p><b>Brasil</b>clientes em todo o país</p><p><b>NR 31</b>área de vivência dentro das normas</p></div></section>`;
  pag.index = head(v, 'index', E.slogan, E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-foto">${img('comboio-1', 'Tanque comboio Ricardi', ' loading="eager" fetchpriority="high"')}</div>
  <div class="in hero-b-in"><p class="k">${E.slogan}</p><h1>Feito em Rondonópolis para aguentar o campo.</h1><p>${E.prod}</p><div class="bts"><a class="btn" href="${link(v, 'produtos')}">Ver equipamentos</a><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a></div></div>
</section>
${numeros}
<section class="linhas-b in">
  <header class="tit-b"><p class="k">Produtos e serviços</p><h2>Quatro frentes, uma fábrica</h2></header>
  <div class="linhas-b-grade">${linhas.map(l => { const ps = produtos.filter(p => p.linha === l.id); return `<article class="lb sobe lb-${l.id}"><a class="lb-foto" href="${link(v, 'produtos')}#${l.id}">${img({ agricola: 'tanque-reboque-1', seguranca: 'area-de-vivencia-1', ambiente: 'ecoponto-1', servicos: 'hidrojateamento-1' }[l.id], l.nome)}</a><div><h3>${ic(l.icone)}${l.nome}</h3><p>${l.texto}</p><ul>${ps.map(p => `<li><a href="${lP(v, p)}">${p.nome}</a></li>`).join('')}</ul></div></article>`; }).join('')}</div>
</section>
<section class="destaque-b"><div class="in destaque-b-in">
  <div class="destaque-b-fotos">${img('area-de-vivencia-1', 'Área de vivência móvel')}${img('area-de-vivencia-2', 'Área de vivência móvel por dentro')}</div>
  <div><p class="k">Segurança no campo</p><h2>Área de Vivência Móvel</h2><p>${produtos.find(p => p.slug === 'area-de-vivencia').textos[0]}</p><p>${produtos.find(p => p.slug === 'area-de-vivencia').textos[1]}</p><a class="btn" href="${lP(v, produtos.find(p => p.slug === 'area-de-vivencia'))}">Ver detalhes</a></div>
</div></section>
<section class="sobre-b in"><div><p class="k">Sobre nós</p><h2>Mais de trinta anos fabricando com estrutura reforçada</h2><p>${E.sobre[0]}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a Ricardi ${ic('seta')}</a></div>${marcas}</section>
<section class="cta-b"><div class="in cta-b-in"><h2>Precisa de um equipamento sob medida?</h2><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></div></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre a Ricardi', E.sobre[0]) + topo(v, 'sobre') + sub('Sobre nós', 'Inovação, idoneidade e responsabilidade desde Rondonópolis', '', 'colheita') + `
<section class="sobre-b2 in"><div>${E.sobre.map(t => `<p>${t}</p>`).join('')}</div><img src="/assets/selo-30-anos.webp" alt="Ricardi 30 anos" loading="lazy"></section>
${numeros}
<section class="mvv-b in"><div><h2>Missão</h2><p>${E.missao}</p></div><div><h2>Visão</h2><p>${E.visao}</p></div><div><h2>Valores</h2><ul>${E.valores.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
` + rodape(v);

  pag.produtos = head(v, 'produtos', 'Produtos e Serviços', E.prod) + topo(v, 'produtos') + sub('Produtos e serviços', 'Equipamentos de fabricação própria', E.prod, 'tanque-reboque-1') + `
<nav class="abas-b in" aria-label="Linhas">${linhas.map(l => `<a href="#${l.id}">${ic(l.icone)}${l.nome}</a>`).join('')}</nav>
${linhas.map(l => `<section class="cat-b in" id="${l.id}"><header><h2>${l.nome}</h2><p>${l.texto}</p></header><ul class="prod-b">${produtos.filter(p => p.linha === l.id).map(p => `<li class="sobe"><a href="${lP(v, p)}"><figure>${img(p.fotos[0], p.nome)}</figure><strong>${p.nome}</strong><span>${resumo(p)}</span></a></li>`).join('')}</ul></section>`).join('')}
` + rodape(v);
  for (const p of produtos) pag[`produtos/${p.slug}`] = paginaProduto(v, p, 'prod-b');

  pag.usados = head(v, 'usados', 'Revenda de usados', usadosTexto) + topo(v, 'usados') + sub('Revenda de usados', 'Equipamentos agrícolas usados', usadosTexto, 'colheita') + `
<section class="contato-b in"><div class="contato-b-form"><h2>Consultar disponibilidade</h2>${formulario('Usados')}</div><div>${contatoLista()}</div></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a Ricardi: ${E.fones[0]}, ${E.cel}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + sub('Contato', 'Será um prazer atendê-lo', 'Envie sua dúvida ou pedido de orçamento. Respondemos pelo WhatsApp.') + `
<section class="contato-b in"><div class="contato-b-form"><h2>Pedido de orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#2f9a4f', fundo: '#0f2e19', claro: '#f3f6ef',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + produtos.length, texto: 'Fiel ao site atual: o selo dos 30 anos, o logo verde com o slogan, o menu verde com o item ativo em marrom e a coluna de destaques ao lado, agora com uma página para cada equipamento.', pontos: [`${produtos.length} equipamentos e serviços, cada um com fotos e texto`, 'Revendedor autorizado Branco e Andrade', 'Pedidos de orçamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + produtos.length, texto: 'Mais moderna: foto grande do tanque comboio na abertura, números da empresa, as quatro linhas em blocos e a área de vivência em destaque.', pontos: ['+30 anos e fabricação própria logo no início', 'Linhas Agrícola, Segurança, Meio ambiente e Serviços', 'Fichas de produto com galeria de fotos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
