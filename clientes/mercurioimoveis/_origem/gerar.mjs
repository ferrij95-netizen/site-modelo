// Mercúrio Imóveis (Ipiranga, São Paulo/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/mercurioimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mercurioimoveis http://mercurioimoveis.com.br/)
// Imóveis: os 3 publicados no site atual em 05/11/2026 (2 em /imovel/ e 1 em /rental/, ver LEIA-ME). Fotos: as da própria
// imobiliária, cortadas para tirar a marca d'água de data do celular. Logo: arquivo do site, fundo cinza removido.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mercúrio Imóveis', url: 'https://mercurioimoveis.overtus.com.br/', antigo: 'http://mercurioimoveis.com.br/',
  wa: '5511947704936', fone: '(11) 2914-8945', cel: '(11) 94770-4936', email: 'mercurioimobiliaria@gmail.com',
  end: 'Rua Labatut, 495', bairro: 'Ipiranga, São Paulo - SP', cep: '04214-000', q: 'Rua Labatut 495 Ipiranga São Paulo SP',
  curto: 'Imobiliária no Ipiranga, em São Paulo, há mais de 30 anos: venda e locação de imóveis de terceiros e administração de bens, com departamento jurídico próprio.',
};
// Textos do site atual (página Sobre, abas Quem somos / Apoio jurídico / Credibilidade / Sempre evoluindo)
const sobre = [
  ['casa', 'Quem somos', 'A Mercúrio Imóveis, com sede própria, possui vasta experiência no ramo imobiliário, onde atua há mais de 30 anos prestando serviços em venda e locação de imóveis de terceiros e administração de bens.'],
  ['livro', 'Apoio jurídico', 'Além disso, oferecemos consultoria através de nosso Departamento Jurídico, orientando da melhor maneira todos os clientes em suas tomadas de decisões.'],
  ['escudo', 'Credibilidade', 'A credibilidade, o profissionalismo, a seriedade e o atendimento diferenciado vêm contribuindo, ao longo desses anos, para que nossa empresa se destaque cada vez mais no segmento imobiliário.'],
  ['estrela', 'Sempre evoluindo', 'Para isso, nossa equipe se empenha para que a prestação de serviços oferecida por nós seja aperfeiçoada constantemente, tendo como principal referência a satisfação e o reconhecimento de nossos clientes.'],
];
const servicos = [
  ['chave', 'Locação', 'Imóveis de terceiros para alugar: apartamentos, casas, salas e salões. Aceitamos depósito caução, fiador ou seguro fiança, conforme o imóvel.'],
  ['casa', 'Venda', 'Intermediação na venda de imóveis de terceiros, do anúncio à negociação.'],
  ['painel', 'Administração de bens', 'Administração do seu imóvel alugado, com o apoio de quem atua há mais de 30 anos no bairro.'],
  ['livro', 'Departamento jurídico', 'Consultoria do nosso departamento jurídico para orientar proprietários e inquilinos nas decisões.'],
];
const numeros = [['30+', 'anos no ramo imobiliário'], ['1.000', 'imóveis alugados'], ['500', 'imóveis vendidos'], ['2.000', 'clientes atendidos']];
const leis = [
  ['Lei do Inquilinato', 'Lei nº 8.245, de 18 de outubro de 1991', 'Dispõe sobre as locações dos imóveis urbanos e os procedimentos a elas pertinentes.', 'https://www.planalto.gov.br/ccivil_03/leis/l8245.htm'],
  ['Lei do Condomínio', 'Código Civil, Lei nº 10.406, de 10 de janeiro de 2002', 'Os artigos 1.331 a 1.358 tratam do condomínio edilício: direitos e deveres dos condôminos, convenção, assembleia e síndico.', 'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm'],
];

const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
F.salao = F.salao.slice(0, 4);
const imoveis = [
  { cod: '2914', slug: 'imovel/salao-bom-pastor', tipo: 'Salão comercial', titulo: 'Salão com ótima localização no Ipiranga', end: 'Rua Bom Pastor, 1968', bairro: 'Ipiranga', preco: 'R$ 1.250', area: 30, banh: 1,
    desc: ['Salão com 30 m² com banheiro.', 'Vários comércios nas proximidades.', 'Aceita-se depósito caução, fiador ou seguro fiança.'], fotos: F.salao,
    alt: ['Fachada do salão com porta de enrolar e placa Aluga', 'Vitrine de vidro do salão vista da calçada', 'Salão vazio com piso cerâmico e porta para os fundos', 'Salão comprido, piso claro e luz ao fundo'] },
  { cod: '2770', slug: 'imovel/sala-lord-cockrane', tipo: 'Sala comercial', titulo: 'Sala comercial perto do metrô Tamanduateí', end: 'Rua Lord Cockrane, 1295', bairro: 'Ipiranga', preco: 'R$ 1.100', area: 30, banh: 1,
    desc: ['Escritório novo com banheiro.', 'Próximo ao metrô Tamanduateí.'], fotos: F.sala,
    alt: ['Fachada do prédio com placa Aluga da Mercúrio', 'Sala com piso porcelanato e porta para o banheiro', 'Sala clara com janela para a rua', 'Janela alta com vista da rua', 'Banheiro com revestimento de mármore'] },
  { cod: 'Sacomã', slug: 'imovel/apto-sacoma', tipo: 'Apartamento', titulo: 'Apartamento perto do metrô Sacomã', end: 'Próximo ao metrô Sacomã', bairro: 'Sacomã', preco: 'R$ 2.500', area: 90, banh: 2, quartos: 2, vagas: 1, andar: 2,
    cond: 'cerca de R$ 1.000', desc: ['Apartamento em excelente localização.', 'Condomínio na faixa de mil reais.'], fotos: F.apto,
    alt: ['Varanda envidraçada com vista para os prédios do Sacomã', 'Sala com piso laminado e cozinha aberta', 'Porta de vidro da sala para a varanda', 'Corredor dos quartos com piso laminado', 'Banheiro com box e gabinete branco'] },
];

const nav = [{ slug: 'imoveis', nome: 'Imóveis para alugar' }, { slug: 'servicos', nome: 'Proprietários' }, { slug: 'sobre', nome: 'Sobre nós' }, { slug: 'leis', nome: 'Leis' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Labatut', b: 'Bairro' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Mulish:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600;700&family=Figtree:wght@400;500;600&display=swap',
};
const cores = { a: '#578e61', b: '#1d3a26' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Mercúrio Imóveis | Imobiliária no Ipiranga, São Paulo' : `${titulo} | Mercúrio Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Mercúrio Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="763" height="240" alt="Mercúrio Imóveis"></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${f[0]}" width="${f[1]}" height="${f[2]}" alt="${esc(alt)}"${extra}>`;
const larga = ['varanda-larga.webp', 1200, 744];
const waMsg = (m = 'Olá! Vim pelo site da Mercúrio Imóveis.') => waHref(E.wa, m);
const waImovel = i => waMsg(`Olá! Tenho interesse no imóvel "${i.titulo}" (${i.end}, ${i.preco}/mês) que vi no site da Mercúrio Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const resumo = i => [`${i.area} m²`, i.quartos && `${i.quartos} quartos`, `${i.banh} ${i.banh > 1 ? 'banheiros' : 'banheiro'}`, i.vagas && `${i.vagas} vaga`].filter(Boolean);

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Venda, locação e administração de imóveis no Ipiranga há mais de 30 anos.</p></div>
    <div><h3>Sede própria</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waMsg()}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mercúrio Imóveis. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waMsg()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], i.alt[0])}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · ${/^\d/.test(i.cod) ? `cód. ${i.cod}` : 'aluguel'}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ')}</p>
  <p class="card-preco"><b>${i.preco}</b><small>/mês</small></p></div></a></li>`;

function ficha(v, i) {
  const dados = [['Área', `${i.area} m²`], ['Quartos', i.quartos], ['Banheiros', i.banh], ['Vagas', i.vagas], ['Andar', i.andar && `${i.andar}º`]].filter(d => d[1]);
  return head(v, i.slug, i.titulo, `${i.titulo}: ${i.end}, ${i.bairro}. ${resumo(i).join(', ')}. Aluguel ${i.preco}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Imóveis para alugar</a></p>
  <div class="galeria n${i.fotos.length}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(i.alt[n])}" class="g${n}">${foto(f, i.alt[n], n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.tipo} para alugar${/^\d/.test(i.cod) ? ` · cód. ${i.cod}` : ''}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.end)} · ${i.bairro}, São Paulo - SP</p>
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>
      <h2>Descrição</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">Aluguel</p>
      <p class="pb-valor">${i.preco}<small>/mês</small></p>
      ${i.cond ? `<dl><div><dt>Condomínio</dt><dd>${i.cond}</dd></div></dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Mercúrio Imóveis.') => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero alugar ou vender meu imóvel</option><option>Administração do meu imóvel</option><option>Dúvida jurídica</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da sede da Mercúrio Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.q)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Sede própria</strong><span>${E.end}, ${E.bairro}, CEP ${E.cep}</span></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waMsg()}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const numLista = () => `<ul class="numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const servLista = () => `<ul class="servs">${servicos.map(s => `<li class="sobe">${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis para alugar', `Imóveis para alugar no Ipiranga e no Sacomã com a Mercúrio Imóveis: salão, sala comercial e apartamento.`) + topo(v, 'imoveis') + cab('Locação', 'Imóveis para alugar', `${imoveis.length} imóveis disponíveis agora no Ipiranga e no Sacomã. Procura outra coisa? Conte para a gente o que precisa.`) + `
<div class="in lista-pag"><ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul>
<section class="procura"><div><h2>Não achou o que procura?</h2><p>Diga o tipo de imóvel, a região e o valor. Avisamos quando aparecer.</p></div><a class="btn btn-wa" href="${waMsg('Olá! Estou procurando um imóvel para alugar. Procuro: ')}" target="_blank" rel="noopener">${icWa()}Avisar pelo WhatsApp</a></section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Para proprietários', 'Venda, locação e administração do seu imóvel com o apoio do departamento jurídico da Mercúrio Imóveis.') + topo(v, 'servicos') + cab('Para proprietários', 'Deixe seu imóvel com quem atua no Ipiranga há mais de 30 anos', 'Venda e locação de imóveis de terceiros, administração de bens e consultoria jurídica.') + `
<div class="in">${servLista()}
<section class="anuncie"><div><p class="k">Anuncie</p><h2>Quer alugar ou vender seu imóvel?</h2><p>Conte onde ele fica e retornamos o contato.</p><p class="ou">Ou ligue: <a href="${telHref(E.fone)}">${E.fone}</a></p></div>${formulario('Olá! Quero anunciar meu imóvel com a Mercúrio Imóveis.')}</section></div>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Sobre nós', sobre[0][2]) + topo(v, 'sobre') + cab('Sobre nós', 'Mais de 30 anos de tradição no Ipiranga', 'Sede própria na Rua Labatut, departamento jurídico e atendimento próximo.') + `
<div class="in"><section class="sobre-grade">${sobre.map((s, n) => `<article class="sobe"><span class="sb-n">0${n + 1}</span>${ic(s[0])}<h2>${s[1]}</h2><p>${s[2]}</p></article>`).join('')}</section>
<section class="sobre-num">${numLista()}</section></div>
` + rodape(v);
  pag.leis = head(v, 'leis', 'Leis', 'Lei do Inquilinato (8.245/1991) e regras de condomínio do Código Civil, com link para o texto oficial.') + topo(v, 'leis') + cab('Para consulta', 'As leis que regem a locação e o condomínio', 'Links para o texto oficial, no site do Planalto. Ficou com dúvida? Nosso departamento jurídico orienta.') + `
<div class="in"><ul class="leis">${leis.map(l => `<li class="sobe"><p class="k">${l[0]}</p><h2>${l[1]}</h2><p>${l[2]}</p><a class="link-seta" href="${l[3]}" target="_blank" rel="noopener">Ler o texto oficial ${ic('ext')}</a></li>`).join('')}</ul>
<section class="procura"><div><h2>Dúvida sobre seu contrato?</h2><p>Fale com o departamento jurídico da Mercúrio.</p></div><a class="btn btn-wa" href="${waMsg('Olá! Tenho uma dúvida jurídica sobre locação.')}" target="_blank" rel="noopener">${icWa()}Falar pelo WhatsApp</a></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mercúrio Imóveis: ${E.end}, ${E.bairro}. ${E.fone}, WhatsApp ${E.cel}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Mercúrio Imóveis', 'Escreva pelo formulário, chame no WhatsApp ou venha até a nossa sede.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapa()}</div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária no Ipiranga · São Paulo</p><h1>Mais de 30 anos alugando, vendendo e cuidando de imóveis no Ipiranga.</h1><p>Venda e locação de imóveis de terceiros e administração de bens, com sede própria e departamento jurídico.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Sou proprietário</a></p></div>
  <figure class="arco"><span class="ameias" aria-hidden="true"></span>${foto(larga, 'Varanda envidraçada de apartamento com vista para os prédios do Sacomã', ' loading="eager" fetchpriority="high"')}<figcaption>Apartamento perto do metrô Sacomã</figcaption></figure>
</div></section>
<section class="faixa-a"><div class="in">${numLista()}</div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Disponíveis para alugar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Todos os imóveis ${ic('seta')}</a></header><ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul></section>
<section class="sobre-a"><div class="in sobre-a-in"><div><p class="k">Quem somos</p><h2>Sede própria na Rua Labatut</h2><p>${sobre[0][2]}</p><p>${sobre[1][2]}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a Mercúrio ${ic('seta')}</a></div>
  <ul class="lista-check">${servicos.map(s => `<li>${ic('check')}<span><b>${s[1]}.</b> ${s[2]}</span></li>`).join('')}</ul></div></section>
<section class="in contato-a"><div><p class="k">Ligamos para você</p><h2>Quer falar com nossos corretores?</h2>${contatoLista()}</div>${formulario()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const fachada = F.salao[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Mercúrio Imóveis · desde a Rua Labatut</p><h1>A imobiliária do <span>Ipiranga</span></h1><p>${E.curto}</p>
  <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Imóveis para alugar</a><a class="btn btn-linha" href="${waMsg()}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></p></div>
  <div class="hero-b-fotos">${foto(fachada, imoveis[0].alt[0], ' loading="eager" fetchpriority="high"')}${foto(F.apto[0], imoveis[2].alt[0], ' loading="eager"')}</div>
</div></section>
<section class="num-b"><div class="in">${numLista()}</div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Placa de aluga</p><h2>Imóveis disponíveis</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver todos ${ic('seta')}</a></header>
<ol class="placas">${imoveis.map(i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], i.alt[0])}<div><span class="pl-aluga">Aluga</span><h3>${esc(i.titulo)}</h3><p>${esc(i.end)} · ${resumo(i).join(' · ')}</p></div><b>${i.preco}<small>/mês</small></b></a></li>`).join('')}</ol></section>
<section class="serv-b"><div class="in"><header class="tit"><p class="k">O que fazemos</p><h2>Do aluguel à orientação jurídica</h2></header>${servLista()}</div></section>
<section class="in sobre-b"><blockquote><p>“A credibilidade, o profissionalismo, a seriedade e o atendimento diferenciado vêm contribuindo, ao longo desses anos, para que nossa empresa se destaque cada vez mais no segmento imobiliário.”</p></blockquote><div>${contatoLista()}</div></section>
<section class="mapa-b">${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Mercúrio Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#578e61', fundo: '#1d3a26', claro: '#f4f1e6',
  fonteTitulo: '"Source Serif 4",Georgia,serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, em marfim, verde e amarelo do logo, com a foto dentro do portal do brasão e títulos com serifa.', pontos: ['Imóveis com fotos, valores e ficha completa', 'Visita agendada pelo WhatsApp em cada imóvel', 'Página para proprietários e leis de locação'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Verde-escura, direta, com os imóveis apresentados como placas de "Aluga" e o Ipiranga em destaque.', pontos: ['Fachadas reais dos imóveis na abertura', 'Serviços para proprietários em quatro blocos', 'Mapa da sede na Rua Labatut'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
