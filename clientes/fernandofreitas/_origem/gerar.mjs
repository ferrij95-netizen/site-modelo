// Imobiliária Fernando Freitas (Fortaleza/CE, desde 1996, CRECI 0967-J). Gera public/{a,b}/ e a página de escolha.
// node clientes/fernandofreitas/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs fernandofreitas http://fernandofreitas.com/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das listas /venda e /aluguel e de /detalhe-imovel/<cód> do site atual (plataforma Imoview):
// a 1ª página de cada lista (20 de 29 à venda, 20 de 54 para alugar; 171 e 175 ficaram de fora por repetirem 173). Até 5 fotos de cada.
// Marca: logo-footer.png do site (3648 px) recolorida com as cores do logo do topo (preto, amarelo e cinza).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Imobiliária Fernando Freitas', url: 'https://fernandofreitas.overtus.com.br/', antigo: 'http://fernandofreitas.com/',
  fone: '(85) 3491-1444', cel: '(85) 98863-1444', wa: '5585988631444', email: 'contato@fernandofreitas.com', creci: 'CRECI 0967-J',
  end: 'Rua Mons. Bruno, 1153, salas 1701 a 1706', end2: 'Scopa Platinum Corporate, Aldeota', cidade: 'Fortaleza - CE',
  mapa: 'Rua Monsenhor Bruno 1153 Aldeota Fortaleza CE',
  cliente: 'https://www.portalunsoft.com.br/area-do-cliente/fernandofreitas',
  face: 'https://www.facebook.com/imobfernandofreitas/', insta: 'https://www.instagram.com/imobiliariafernandofreitas',
  curto: 'Imobiliária em Fortaleza desde 1996: venda, aluguel e administração de imóveis na capital, em Caucaia e no litoral.',
};
// Texto do "Quem somos" do site atual
const historia = [
  'No mercado imobiliário desde 1996, a Imobiliária Fernando Freitas consolidou-se em Fortaleza como uma empresa moderna, transparente e idônea, que prioriza um excelente atendimento aos seus clientes e amigos.',
  'O seu fundador, Dr. Fernando Freitas (in memoriam), advogado com especializações em Direito Imobiliário e Direito do Consumidor, entre outras, fez eminente carreira no Banco do Brasil S/A, onde se aposentou, e depois dedicou-se com todo o entusiasmo a um sonho antigo: administrar imóveis.',
  'E assim o realizou, orgulhosamente, junto com seus dois filhos, Paulo e Fernando, e sua equipe de colaboradores, sempre com o pensamento voltado para o triângulo: clientes, parceiros e amigos.',
];
const missao = 'Estimular o progresso, atender e corresponder às necessidades do mercado imobiliário cearense, oferecendo produtos e serviços de alta qualidade, com eficiência e cortesia.';
const triangulo = [['Clientes', 'Quem compra, vende ou aluga com a gente.'], ['Parceiros', 'Proprietários, corretores e quem trabalha junto.'], ['Amigos', 'O site atual fala em atender "clientes e amigos".']];

// ---------- imóveis ----------
const titulo = s => s === s.toUpperCase() ? s.toLowerCase().replace(/(^|[\s,.(-])([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(De|Da|Do|Dos|Das|E)\b/g, m => m.toLowerCase()) : s;
const GRUPO = t => /Sala|Ponto|Galpão/.test(t) ? 'comerciais' : /Terreno/.test(t) ? 'terrenos' : /Casa|Duplex/.test(t) ? 'casas' : 'apartamentos';
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => ({
  ...x, slug: `imovel/${x.neg === 'venda' ? 'v' : 'a'}${x.cod}`, grupo: GRUPO(x.tipo),
  // só rua e número: sem apartamento/bloco/sala e sem repetir o bairro
  endereco: x.endereco ? titulo(x.endereco.split(' - ')[0].replace(/\s+(bl|apto)\b.*$/i, '').replace(/,(?=\S)/, ', ').trim()) : '',
  area: x.area.replace(/,00$/, ''),
  desc: x.desc.map(d => d === d.toUpperCase() && d.length > 12 ? titulo(d) : d),
}));
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const bairros = [...new Set(imoveis.map(i => i.bairro))];
const cidades = [...new Set(imoveis.map(i => i.cidade))];
const porCod = c => imoveis.find(i => i.cod === c);

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'imobiliaria', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Planta', b: 'Aldeota' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Gelasio:ital,wght@0,400;0,600;0,700;1,400;1,500&family=Mukta:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Asap+Condensed:wght@500;600;700;800&family=Asap:wght@400;500;600&display=swap',
};
const cores = { a: '#f6f3ec', b: '#1b1b1a' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Imobiliária Fernando Freitas | Imóveis em Fortaleza desde 1996' : `${t} | Imobiliária Fernando Freitas`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Imobiliária Fernando Freitas, página inicial"` : ''}><img src="/assets/${v === 'b' ? 'marca-clara' : 'marca'}.webp" width="260" height="292" alt=""><span><small>Imobiliária</small>Fernando Freitas</span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const qtd = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && qtd(i.quartos, 'quarto', 'quartos'), i.suites && qtd(i.suites, 'suíte', 'suítes'), i.vagas && qtd(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const negTxt = i => i.neg === 'venda' ? 'à venda' : 'para alugar';
const nomeIm = i => `${i.tipo} ${negTxt(i)} ${/^(Centro|Montese|Benfica|Mondubim|Mucuripe)$/.test(i.bairro) ? 'no' : 'em'} ${i.bairro}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} ${negTxt(i)}, ${i.bairro}) que vi no site da Imobiliária Fernando Freitas.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<div class="faixa-topo"><div class="in"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${icWa()}${E.cel}</a><a class="ft-cli" href="${E.cliente}" target="_blank" rel="noopener">${ic('usuarios')}Área do cliente</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}<li class="so-cel"><a href="${E.cliente}" target="_blank" rel="noopener">Área do cliente</a></li></ul></nav>
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
    <div class="rod-marca">${marca('b', 'div')}<p>Venda, aluguel e administração de imóveis em Fortaleza desde 1996. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.end2}<br>${E.cidade}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${E.cliente}" target="_blank" rel="noopener">Área do cliente</a></li></ul></div>
    <div><h3>Redes</h3><ul class="rod-redes"><li><a href="${E.insta}" target="_blank" rel="noopener">${ic('insta')}Instagram</a></li><li><a href="${E.face}" target="_blank" rel="noopener">${ic('face')}Facebook</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Imobiliária Fernando Freitas · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Vim pelo site da Imobiliária Fernando Freitas.')}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.img[0], nomeIm(i))}<span class="card-neg">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · ${i.cidade}</p><h3>${i.tipo}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<span>cód. ${i.cod}</span></p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const g = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas e duplex'], ['comerciais', 'Comerciais'], ['terrenos', 'Terrenos']].filter(x => x[0] === 'todos' || lista.some(i => i.grupo === x[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${g.map((x, n) => `<label><input type="radio" name="f-${nome}" value="${x[0]}"${n ? '' : ' checked'}><span>${x[1]} <small>${x[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === x[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banheiros], ['Vagas', i.vagas], ['Andar', i.andar ? `${i.andar}º` : '']].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.img.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${nomeIm(i)} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${nomeIm(i)}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  return head(v, i.slug, `${nomeIm(i)}, cód. ${i.cod}`, `${nomeIm(i)}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'venda' ? 'comprar' : 'alugar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'venda' ? 'comprar' : 'alugar')}">${ic('seta', 'ic vira')}${i.neg === 'venda' ? 'Imóveis à venda' : 'Imóveis para alugar'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">Cód. ${i.cod} · ${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</p>
      <h1>${nomeIm(i)}</h1>
      <p class="ficha-local">${ic('pin')}${i.endereco ? `${esc(i.endereco)} · ` : ''}${i.bairro}, ${i.cidade} - CE</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2>${i.desc.map(d => `<p>${esc(d)}</p>`).join('')}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'venda' ? 'Valor de venda' : 'Aluguel'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto, opcoes) => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${opcoes ? `<div class="form-duas"><label>Quero<select name="quero">${opcoes.map(o => `<option>${o}</option>`).join('')}</select></label><label>Bairro e cidade do imóvel<input name="local" placeholder="Aldeota, Fortaleza"></label></div>` : ''}
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do escritório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const escritorio = () => `<div class="escritorio"><div><p class="k">Escritório</p><h3>Scopa Platinum Corporate</h3><p>${ic('pin')}<span>${E.end}<br>${E.end2}<br>${E.cidade}</span></p><p>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></p><p>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel} (WhatsApp)</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p></div>${mapa}</div>`;
const servicos = [
  ['chave', 'Venda', 'Apartamentos, casas, salas e terrenos em Fortaleza, Caucaia, Aquiraz e Aratuba.'],
  ['casa', 'Aluguel', 'Imóveis residenciais e comerciais para locação, com visita marcada pelo corretor.'],
  ['painel', 'Administração', 'O sonho do fundador: administrar imóveis. Proprietários e inquilinos acompanham tudo pela área do cliente.'],
];

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda em Fortaleza e região: apartamentos, casas, salas comerciais e terrenos.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', `Apartamentos, casas, salas e terrenos em ${[...new Set(vendas.map(i => i.cidade))].join(', ').replace(/, ([^,]*)$/, ' e $1')}.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="lista-nota">Esta prévia mostra ${vendas.length} dos 29 imóveis à venda no site atual. Procura algo que não está aqui? <a href="${link(v, 'contato')}">Fale com a gente</a>.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Fortaleza e região: apartamentos, casas, pontos e salas comerciais.`) + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar', 'Apartamentos, casas, pontos e salas comerciais. Marque a visita pelo WhatsApp.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}<p class="lista-nota">Esta prévia mostra ${aluguel.length} dos 54 imóveis para alugar no site atual. Procura algo que não está aqui? <a href="${link(v, 'contato')}">Fale com a gente</a>.</p></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel em Fortaleza? Cadastre na Imobiliária Fernando Freitas.') + topo(v, 'anuncie') + cab('Proprietários', 'Quer vender ou alugar seu imóvel?', 'Preencha os dados abaixo que entramos em contato.') + `
<div class="in anuncie-pag"><div class="anuncie-txt"><h2>Como funciona</h2><ol class="passos"><li><b>Você conta onde fica o imóvel</b><span>Pelo formulário, pelo WhatsApp ou no escritório da Aldeota.</span></li><li><b>A imobiliária entra em contato</b><span>Para conhecer o imóvel e combinar a venda ou o aluguel.</span></li><li><b>O imóvel entra na vitrine</b><span>No site, com fotos, valores e visita marcada pelo corretor.</span></li></ol><p class="nota">Já é cliente? Proprietários e inquilinos acessam a <a href="${E.cliente}" target="_blank" rel="noopener">área do cliente</a>.</p></div>
<div class="anuncie-form">${formulario('Olá! Quero anunciar meu imóvel com a Imobiliária Fernando Freitas.', ['Vender meu imóvel', 'Alugar meu imóvel'])}</div></div>
` + rodape(v);
  pag.imobiliaria = head(v, 'imobiliaria', 'A imobiliária', historia[0]) + topo(v, 'imobiliaria') + cab('Quem somos', 'No mercado imobiliário de Fortaleza desde 1996', 'Uma empresa de família, fundada pelo Dr. Fernando Freitas.') + `
<div class="in inst"><div class="inst-txt">${historia.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>
<aside class="missao"><p class="k">Missão</p><p>${missao}</p></aside></div>
<section class="in tri"><header class="tit"><p class="k">O triângulo</p><h2>Clientes, parceiros e amigos</h2></header><ul class="tri-lista">${triangulo.map((t, n) => `<li><span>${n + 1}</span><h3>${t[0]}</h3><p>${t[1]}</p></li>`).join('')}</ul></section>
<section class="in">${escritorio()}</section>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Imobiliária Fernando Freitas: ${E.fone}, WhatsApp ${E.cel}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Imobiliária Fernando Freitas', 'Escreva pelo formulário, chame no WhatsApp ou venha ao escritório na Aldeota.') + `
<div class="in contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario('Olá! Vim pelo site da Imobiliária Fernando Freitas.', ['Comprar um imóvel', 'Alugar um imóvel', 'Anunciar meu imóvel', 'Falar sobre meu contrato'])}</div>
${escritorio()}</div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div><span class="cab-bloco" aria-hidden="true"></span></section>`;
  const capa = porCod('1619').img[0];
  const dest = ['1663', '1659', '1577', '1633', '1609', '1657'].map(porCod);
  const destA = ['1655', '1661', '1280', '370', '1416', '1630'].map(porCod);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Fortaleza · desde 1996 · ${E.creci}</p><h1>Imóveis em Fortaleza com <em>atendimento de família</em>.</h1><p>Venda, aluguel e administração de imóveis na capital, em Caucaia e no litoral, com a imobiliária fundada pelo Dr. Fernando Freitas e tocada pelos filhos, Paulo e Fernando.</p>
    <div class="escolha-a"><a href="${link(v, 'comprar')}"><span>Quero</span><b>comprar</b>${ic('seta')}</a><a href="${link(v, 'alugar')}"><span>Quero</span><b>alugar</b>${ic('seta')}</a><a href="${link(v, 'anuncie')}"><span>Tenho um imóvel</span><b>anunciar</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto"><span class="bl bl-am" aria-hidden="true"></span><span class="bl bl-ci" aria-hidden="true"></span>${foto(capa, 'Condomínio Golf Ville entre coqueiros na praia do Porto das Dunas, Aquiraz', ' loading="eager" fetchpriority="high"')}<figcaption>Golf Ville, Porto das Dunas · cód. 1619</figcaption></figure>
</div></section>
<section class="tipos-a"><div class="in"><ul>${[['apartamentos', 'Apartamentos'], ['casas', 'Casas e duplex'], ['comerciais', 'Salas e pontos'], ['terrenos', 'Terrenos']].map(g => `<li><b>${imoveis.filter(i => i.grupo === g[0]).length}</b><span>${g[1]}</span></li>`).join('')}</ul><p>${cidades.join(' · ')}</p></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os imóveis à venda ${ic('seta')}</a></header><ul class="cards">${dest.map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar ou trabalhar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os imóveis para alugar ${ic('seta')}</a></header><ul class="cards">${destA.map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in"><header class="tit"><p class="k">O que fazemos</p><h2>Comprar, alugar e cuidar do seu imóvel</h2></header><ul class="serv-lista">${servicos.map(s => `<li>${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul></div></section>
<section class="in hist-a"><div class="hist-a-txt"><p class="k">Desde 1996</p><h2>Um sonho antigo do Dr. Fernando Freitas</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'imobiliaria')}">Conheça a imobiliária ${ic('seta')}</a></div><blockquote><p>Clientes, parceiros e amigos.</p><cite>O triângulo que guia a imobiliária</cite></blockquote></section>
<section class="anuncie-a"><div class="in"><div><p class="k">Proprietários</p><h2>Quer vender ou alugar seu imóvel?</h2><p>Conte onde ele fica e a gente entra em contato.</p></div><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></div></section>
<section class="in">${escritorio()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  // as quatro caixas do logo viram quatro fotos
  const caixas = [['1659', 'Prédio residencial na rua General Silva Júnior, Fátima'], ['1595', 'Sala ampla de apartamento em Fátima'], ['1655', 'Fachada de duplex na Cidade dos Funcionários'], ['1633', 'Sala e cozinha americana de apartamento no Icaraí']];
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-local"><b>${i.bairro}</b><small>${i.tipo} · ${i.cidade}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Imobiliária · Aldeota · Fortaleza</p><h1>Desde 1996 abrindo portas em Fortaleza.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div>
  <div class="ff" aria-label="Fotos de imóveis da imobiliária">
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<span class="ff-l l${n}"></span>`).join('')}
    ${caixas.map((c, n) => `<a class="ff-c c${n + 1}" href="${link(v, porCod(c[0]).slug)}">${foto(porCod(c[0]).img[n === 1 ? 1 : 0], c[1], n ? ' loading="lazy" decoding="async"' : ' loading="eager" fetchpriority="high"')}</a>`).join('')}
  </div>
</div></section>
<section class="num-b"><div class="in"><ul><li><b>1996</b><span>no mercado</span></li><li><b>${E.creci.replace('CRECI ', '')}</b><span>CRECI</span></li><li><b>${cidades.length}</b><span>cidades com imóveis na vitrine</span></li><li><b>${bairros.length}</b><span>bairros</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver com fotos ${ic('seta')}</a></header><ol class="linhas">${vendas.slice(0, 8).map(linha).join('')}</ol></section>
<section class="aluga-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Casas, apartamentos e pontos</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${['1619', '1661', '370', '1630'].map(c => cartao(v, porCod(c))).join('')}</ul></div></section>
<section class="in serv-b"><header class="tit"><p class="k">Serviços</p><h2>Venda, aluguel e administração</h2></header><ol class="serv-num">${servicos.map(s => `<li><h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ol></section>
<section class="fam-b"><div class="in fam-b-in"><div><p class="k">A família por trás</p><h2>Fundada pelo Dr. Fernando Freitas, tocada pelos filhos Paulo e Fernando.</h2></div><div><p>${historia[1]}</p><p>${historia[2]}</p><a class="link-seta" href="${link(v, 'imobiliaria')}">Quem somos ${ic('seta')}</a></div></div></section>
<section class="in">${escritorio()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Imobiliária Fernando Freitas', artigo: 'da', url: E.url, lang: 'pt', cor: '#d71920', fundo: '#1b1b1a', claro: '#f6f3ec',
  fonteTitulo: 'Gelasio,Georgia,serif', fonteTexto: 'Mukta,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, com o vermelho, o amarelo e o cinza do logo, e a escolha "comprar, alugar ou anunciar" logo na abertura.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e ficha`, 'Filtro por apartamentos, casas, comerciais e terrenos', 'Visita marcada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura como o rodapé do site atual: as quatro caixas do logo viram quatro fotos de imóveis.', pontos: ['Imóveis à venda listados por código, bairro e valor', 'A história da família em destaque', 'Escritório da Aldeota com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
