// Bel Imóveis (Bel Negócios Imobiliários, Menino Deus, Porto Alegre/RS, desde 1974, CRECI 908). Gera public/{a,b}/ e a página de escolha.
// node clientes/belimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs belimoveis https://www.belimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de imoveis/venda.php, imoveis/locacao.php e imoveis/detalhes.php do site atual (os 4 que o site mostra).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Bel Imóveis', url: 'https://belimoveis.overtus.com.br/', antigo: 'https://www.belimoveis.com.br/',
  wa: '5551996631270', waTxt: '(51) 99663-1270', fones: ['(51) 3223-9799', '(51) 3223-7159'],
  email: 'imabiliariabel@hotmail.com',
  end: 'Rua General Caldwell, 972, conj. 202', bairro: 'Menino Deus, Porto Alegre - RS',
  mapa: 'Rua General Caldwell 972 Menino Deus Porto Alegre RS',
  horario: ['Segunda a sexta', '9h às 12h e 13h às 17h'],
  curto: 'Imobiliária no Menino Deus, em Porto Alegre, desde 1974: venda, locação, avaliação e administração de imóveis.',
};
// Textos do site atual (Empresa, Administração, Serviços)
const empresa = [
  'Fundada em fevereiro de 1974, com o CRECI nº 908, a Bel Imóveis iniciou suas atividades com sua matriz no Menino Deus, onde até hoje direciona seus trabalhos de locação e venda.',
  'Nossa meta, ao longo de toda essa trajetória, sempre priorizou o atendimento personalizado, com pessoas capacitadas para atender nossos clientes e amigos.',
];
const servicos = [
  ['chave', 'Locação e venda de imóveis', 'Apartamentos, salas, lojas e casas em Porto Alegre.'],
  ['medidor', 'Avaliação de imóveis', 'Para locação e para venda.'],
  ['livro', 'Departamento jurídico', 'Apoio jurídico para proprietários e inquilinos.'],
  ['engrenagem', 'Manutenção predial', 'Cuidado com o imóvel durante a administração.'],
];

const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(i => ({ ...i, slug: `imovel/${i.neg === 'venda' ? 'v' : 'a'}${i.cod}` }));
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const titulo = i => `${i.tipo}${i.quartos ? ` de ${i.quartos} dormitório${i.quartos > 1 ? 's' : ''}` : ''}`;
const negTxt = i => (i.neg === 'venda' ? 'à venda' : 'para alugar');

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'administracao', nome: 'Administração' }, { slug: 'empresa', nome: 'A Bel' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Caldwell', b: 'Guaíba' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700;800&family=Mulish:wght@400;500;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Young+Serif&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
};
const cores = { a: '#7a1220', b: '#1e0a0d' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Bel Imóveis | Venda e locação de imóveis em Porto Alegre' : `${t} | Bel Imóveis`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const img = (n, w, h, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n}.webp" width="${w}" height="${h}" alt="${esc(alt)}"${extra}>`;
const FOTO = { 'ap195-capa': [225, 500], 'ap195-1': [225, 500], 'ap195-2': [225, 500], 'ap195-3': [225, 500], 'ap195-4': [225, 500] };
const fotoIm = (n, alt, extra) => img(n, FOTO[n][0], FOTO[n][1], alt, extra);
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Bel Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="714" height="418" alt="Bel Imóveis · Venda e locação · CRECI 908"></${tag}>`;
const semFoto = () => `<div class="sem-foto"><img src="/assets/img/predio.webp" width="618" height="249" alt=""><span>Fotos sob consulta</span></div>`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${titulo(i)} ${negTxt(i)}, ${i.end}, ${i.bairro}) que vi no site da Bel Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Bel Imóveis.')}" target="_blank" rel="noopener">${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Confiança e agilidade em Porto Alegre desde 1974.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('relogio')}<span>${E.horario[0]}<br>${E.horario[1]}</span></li></ul></div>
    <div><h3>Fale com a Bel</h3><ul class="rod-dados">${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}<li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'imoveis')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'administracao')}">Administração</a></li><li><a href="${link(v, 'contato')}">Anunciar meu imóvel</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Bel Negócios Imobiliários · CRECI 908</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.neg}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? fotoIm(i.fotos[0], `${titulo(i)} no ${i.bairro}`) : semFoto()}<span class="card-tipo">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · cód. ${i.cod}</p><h3>${titulo(i)}</h3><p class="card-end">${i.end}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês + taxas</small>' : '<small>+ taxas</small>'}</p></div></a></li>`;
const filtro = v => `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${[['todos', 'Todos', imoveis.length], ['venda', 'Comprar', vendas.length], ['aluguel', 'Alugar', aluguel.length]].map((g, n) => `<label><input type="radio" name="f" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[2]}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul></div>`;

function ficha(v, i) {
  const t = `${titulo(i)} ${negTxt(i)} no ${i.bairro}`;
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f}.webp" data-foto="${esc(`${t} (foto ${n + 1})`)}">${fotoIm(f, `${t}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto()}</div>`;
  const dados = [['Tipo', i.tipo], ['Dormitórios', i.quartos || ''], ['Bairro', i.bairro], ['Região', i.zona]].filter(d => d[1]);
  return head(v, i.slug, `${titulo(i)}, ${i.end}`, `${t}: ${i.end}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco} + taxas.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis</a></p>
  <div class="ficha-grade">
    ${fotos}
    <div class="ficha-txt">
      <p class="k">${i.neg === 'venda' ? 'À venda' : 'Para alugar'} · cód. ${i.cod}</p>
      <h1>${titulo(i)}</h1>
      <p class="ficha-local">${ic('pin')}${i.end}, ${i.bairro}</p>
      <p class="ficha-preco"><b>${i.preco}</b><small>${i.neg === 'aluguel' ? '/mês + taxas' : '+ taxas'}</small></p>
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>
      ${i.desc ? `<p class="ficha-desc">${esc(i.desc)}</p>` : '<p class="ficha-desc">Peça mais informações e fotos pelo WhatsApp ou pelo telefone.</p>'}
      <p class="bts"><a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p>
    </div>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Bel Imóveis.') => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Avaliação de imóvel</option><option>Administração do meu imóvel</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Bel Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.bairro}</span></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')}</span></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario[0]}, ${E.horario[1]}</span></div></li>
</ul>`;
const servLista = () => `<ul class="servs">${servicos.map((s, n) => `<li class="sobe"><span class="sv-n">${String(n + 1).padStart(2, '0')}</span>${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis', `Imóveis à venda e para alugar em Porto Alegre com a Bel Imóveis: ${vendas.length} à venda e ${aluguel.length} para alugar.`) + topo(v, 'imoveis') + cab('Imóveis', 'Imóveis à venda e para alugar', `${vendas.length} à venda e ${aluguel.length} para alugar agora, no Menino Deus, na Cidade Baixa e na Glória. Valores mais taxas.`) + `
<div class="in lista-pag">${filtro(v)}
<aside class="pedido"><div><p class="k">Não achou o que procura?</p><h2>Conte o que você precisa</h2><p>A Bel atende Porto Alegre inteira. Diga o bairro, o tipo de imóvel e o valor, e a equipe procura para você.</p></div><a class="btn btn-wa" href="${waHref(E.wa, 'Olá! Estou procurando um imóvel em Porto Alegre:')}" target="_blank" rel="noopener">${icWa()}Pedir pelo WhatsApp</a></aside></div>
` + rodape(v);
  pag.administracao = head(v, 'administracao', 'Administração', 'Administração de imóveis em Porto Alegre: locação e venda, avaliação, departamento jurídico e manutenção predial.') + topo(v, 'administracao') + cab('Administração', 'Tudo para a administração do seu imóvel', 'Uma equipe competente para auxiliar você em tudo que precisar, da avaliação à manutenção.') + `
<div class="in"><section class="serv-sec">${servLista()}</section>
<section class="anuncie"><div><p class="k">Proprietário</p><h2>Quer vender, alugar ou avaliar seu imóvel?</h2><p>Bel Imóveis: a sua opção para venda, locação e avaliação do seu imóvel. Atendimento personalizado, para dar tranquilidade aos seus clientes.</p></div>${formulario('Olá! Tenho um imóvel e quero falar com a Bel Imóveis.')}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Bel', empresa[0]) + topo(v, 'empresa') + cab('A Bel', 'No Menino Deus desde fevereiro de 1974', 'CRECI 908. Confiança e agilidade.') + `
<div class="in"><section class="inst"><figure class="inst-foto">${img('escritorio-menino-deus', 500, 375, 'Prédio do escritório da Bel Imóveis na Rua General Caldwell, Menino Deus')}<figcaption>Rua General Caldwell, 972 · Menino Deus</figcaption></figure>
<div>${empresa.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}<ul class="numeros"><li><b>1974</b><span>fundação</span></li><li><b>908</b><span>CRECI</span></li><li><b>${new Date().getFullYear() - 1974}</b><span>anos no mercado</span></li></ul></div></section>
<section class="visita"><div>${contatos()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Bel Imóveis: ${E.fones.join(' / ')}, WhatsApp ${E.waTxt}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Bel Imóveis', 'Mande uma mensagem, ligue ou venha ao escritório no Menino Deus.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatos()}</div></section>
<section class="mapa-sec">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><img class="cab-predio" src="/assets/img/predio.webp" width="618" height="249" alt=""><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Menino Deus · Porto Alegre · desde 1974</p><h1>A sua opção para <em>venda, locação e avaliação</em> do seu imóvel.</h1><p>${E.curto} Atendimento personalizado, para dar tranquilidade aos nossos clientes.</p>
    <div class="escolha-a"><a href="${link(v, 'imoveis')}"><span>Quero comprar</span><b>${vendas.length} à venda</b>${ic('seta')}</a><a href="${link(v, 'imoveis')}"><span>Quero alugar</span><b>${aluguel.length} para alugar</b>${ic('seta')}</a><a href="${link(v, 'administracao')}"><span>Tenho um imóvel</span><b>Administração</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${img('parque-moinhos', 964, 723, 'Prédios de Porto Alegre refletidos no lago de um parque', ' loading="eager" fetchpriority="high"')}<img class="hero-predio" src="/assets/img/predio.webp" width="618" height="249" alt=""></figure>
</div></section>
<section class="faixa-a"><div class="in"><ul><li><b>1974</b>fundada em fevereiro</li><li><b>CRECI 908</b>registro da imobiliária</li><li><b>Menino Deus</b>escritório na General Caldwell</li></ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Imóveis</p><h2>Disponíveis agora</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul></section>
<section class="adm-a"><div class="in adm-a-in"><div><p class="k">Administração</p><h2>Aqui você encontra tudo para a administração do seu imóvel</h2><p>Uma equipe competente para auxiliar você em tudo que precisar.</p><a class="btn" href="${link(v, 'administracao')}">Conhecer a administração</a></div>${servLista()}</div></section>
<section class="in visita"><div><header class="tit"><p class="k">Visite a Bel</p><h2>Rua General Caldwell, 972</h2></header>${contatos()}</div><figure class="visita-foto">${img('escritorio-menino-deus', 500, 375, 'Prédio do escritório da Bel Imóveis no Menino Deus')}</figure></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-end"><b>${titulo(i)}</b><small>${i.end} · ${i.bairro}</small></span><span class="ln-neg">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span><span class="ln-preco">${i.preco}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('por-do-sol-guaiba', 964, 639, 'Pôr do sol no Guaíba, em Porto Alegre', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Bel Imóveis · Porto Alegre</p><h1>Confiança e agilidade, <span>desde 1974 no Menino Deus.</span></h1><p>Venda, locação, avaliação e administração de imóveis, com atendimento personalizado.</p><p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver imóveis</a><a class="btn btn-linha" href="${link(v, 'administracao')}">Tenho um imóvel</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1974</b><span>fundação</span></li><li><b>908</b><span>CRECI</span></li><li><b>${vendas.length}</b><span>à venda</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Imóveis</p><h2>Disponíveis agora</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Com fotos e valores ${ic('seta')}</a></header><ol class="linhas">${imoveis.map(linha).join('')}</ol></section>
<section class="serv-b"><div class="in"><header class="tit"><p class="k">Administração</p><h2>Do anúncio à manutenção do prédio</h2></header>${servLista()}<p class="bts"><a class="btn" href="${link(v, 'administracao')}">Falar sobre meu imóvel</a></p></div></section>
<section class="in poa-b"><figure>${img('usina-gasometro', 964, 723, 'Usina do Gasômetro vista do Guaíba')}</figure><div><p class="k">A Bel</p><h2>Matriz no Menino Deus desde fevereiro de 1974</h2><p>${empresa[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a Bel ${ic('seta')}</a></div></section>
<section class="visita-b"><div class="in visita">${contatos()}${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Bel Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#7a1220', fundo: '#1e0a0d', claro: '#f7f1ea',
  fonteTitulo: 'Bitter,Georgia,serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no vinho do logo, com o desenho do prédio da marca e a escolha "comprar, alugar ou tenho um imóvel" logo na abertura.', pontos: ['Os imóveis do site com valor e visita pelo WhatsApp', 'Administração em 4 serviços', 'Escritório com mapa e horário'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Escura, com o pôr do sol do Guaíba em tela cheia e os imóveis listados por código, tipo e valor.', pontos: ['"Confiança e agilidade" em destaque', 'Números da imobiliária: 1974 e CRECI 908', 'Funciona bem no celular'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
