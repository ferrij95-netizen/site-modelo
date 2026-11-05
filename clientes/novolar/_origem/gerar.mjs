// INL Novolar Imóveis (Zona Norte de São Paulo, desde 1957). Gera public/{a,b}/ e a página de escolha.
// node clientes/novolar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs novolar http://www.novolar.net/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das listas e fichas do site atual (navegador; o servidor bloqueia curl).
// 46 imóveis de uma carteira de ~3.200 (ver LEIA-ME); até 5 fotos de cada, com a marca d'água da própria Novolar.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'INL Novolar', url: 'https://novolar.overtus.com.br/', antigo: 'https://www.novolar.net/',
  email: 'novolar@novolar.net', wa: '5511935027309', creci: 'CRECI 24609-J',
  curto: 'Imobiliária da Zona Norte de São Paulo desde 1957: locação, venda e administração de imóveis residenciais, comerciais e industriais.',
  portal: 'https://sivic.novolar.net/portal/#/login', boletos: 'https://www.novolar.net/boletos',
  insta: 'https://www.instagram.com/inovolar/', face: 'https://www.facebook.com/inovolar', yt: 'https://www.youtube.com/channel/UC25Kg_i_aY3UGIHwuECvhqQ',
  financ: 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm#box1-comprar',
};
const unidades = [
  { t: 'Vila Maria', fone: '(11) 2632-4000', end: 'R. Araritaguaba, 954/986', cep: '02122-011', q: 'Rua Araritaguaba 954 São Paulo' },
  { t: 'Vila Sabrina', fone: '(11) 2949-9070', end: 'Av. Prof. Castro Júnior, 195', cep: '02138-030', q: 'Avenida Professor Castro Júnior 195 São Paulo' },
  { t: 'Jardim São Paulo', fone: '(11) 2977-4000', end: 'Av. Leôncio de Magalhães, 136', cep: '02042-000', q: 'Avenida Leôncio de Magalhães 136 São Paulo' },
];
// Textos de "Quem somos" do site atual
const quem = [
  'Referência no mercado, a Novolar oferece aos seus clientes soluções completas em consultoria imobiliária. Com mais de 60 anos de história, a empresa é reconhecida como uma das maiores e mais admiradas imobiliárias full-service do Brasil. Sua trajetória é marcada pelo alto nível de assessoramento e rigoroso sigilo em suas atividades.',
  'Com capacidade de interpretação clara e objetiva daquilo que o cliente deseja e necessita, somada à idoneidade e competência nos negócios, a Imobiliária Novolar tornou-se uma das melhores administradoras de imóveis, com grande destaque nas locações comerciais e industriais.',
  'Sua missão é atender seus clientes com excelência, transparência e segurança para atingir e superar expectativas, sempre buscando o melhor resultado e negócios bem feitos. Para isso, ela utiliza sua experiência no mercado como base para superar novos desafios, mantendo-se preparada para o futuro do setor.',
  'Através desse perfil, a Novolar optou por ter três sedes e times de especialistas nos principais bairros da Zona Norte de São Paulo, com o objetivo de aprofundar o entendimento da vida e dos diferenciais de cada parte da região.',
  'Sobre nosso serviço full-service: tratamos da locação, venda e administração de imóveis e, para tal, contamos com assessoria jurídica e mercadológica no segmento imobiliário. Tudo para prestar serviços com credibilidade, segurança e eficiência, mantendo o patrimônio de nossos clientes com boa rentabilidade e efetuando negócios com o mínimo risco.',
];
const lema = 'Sempre prestar aos clientes o serviço que prestaríamos a nós mesmos.';
const servicos = [
  ['calendario', 'Locação', 'Residencial, comercial e industrial: casas, apartamentos, lojas, prédios, galpões e terrenos.'],
  ['casa', 'Venda', 'Do anúncio à escritura, com assessoria jurídica e mercadológica.'],
  ['escudo', 'Administração', 'Cuidamos do seu imóvel alugado e do repasse. Extrato do proprietário e 2ª via de boletos pelo portal.'],
];

// ---------- imóveis ----------
const GRUPO = i => i.tipo === 'Galpão' ? 'galpoes' : i.tipo === 'Terreno' ? 'terrenos' : i.uso === 'Comercial' ? 'comerciais' : 'residenciais';
const GRUPOS = [['todos', 'Todos'], ['residenciais', 'Residenciais'], ['comerciais', 'Comerciais'], ['galpoes', 'Galpões'], ['terrenos', 'Terrenos']];
const TIPO = { Chacara: 'Chácara', 'Conj. Comercial': 'Conjunto comercial', 'Casa Térrea': 'Casa térrea', 'Casa Assobradada': 'Casa assobradada', 'Sobrado em Condomínio': 'Sobrado em condomínio', 'Sala Comercial': 'Sala comercial' };
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => ({
  ...x, tipo: TIPO[x.tipo] || x.tipo, tipoOrig: x.tipo, grupo: GRUPO(x), slug: `imovel/${x.ref.toLowerCase()}`,
  desc: x.desc.map(p => p.replace(/(\d)\. (\d{3})/g, '$1.$2')),
}));
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const porGrupo = (lista, g) => lista.filter(i => i.grupo === g);

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'proprietarios', nome: 'Proprietários' }, { slug: 'empresa', nome: 'A Novolar' }, { slug: 'cliente', nome: 'Área do cliente' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Três sedes', b: 'Desde 1957' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,500;0,700;0,900;1,700&family=Red+Hat+Text:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap',
};
const cores = { a: '#001361', b: '#00103f' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'INL Novolar | Imóveis para alugar e comprar na Zona Norte de São Paulo' : `${titulo} | INL Novolar`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
// marca: o símbolo original (prédios + arco) e o nome composto como no logo do site
const marca = (v, tag = 'a', claro = v === 'b') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="INL Novolar, página inicial"` : ''}><img src="/assets/${claro ? 'marca-claro' : 'marca'}.webp" width="52" height="51" alt=""><span class="marca-txt"><small>INL</small><b>NOVOLAR</b><i>desde 1957</i></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const plural = (n, s, p) => `${n} ${+n === 1 ? s : p}`;
const resumo = i => [i.au && `${i.au} m² úteis`, !i.au && i.at && `${i.at} m² de terreno`, i.dorm && plural(+i.dorm, 'dorm.', 'dorms.'), i.suite && plural(+i.suite, 'suíte', 'suítes'), i.vaga && plural(+i.vaga, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel ref. ${i.ref} (${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}) que vi no site da Novolar.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<div class="faixa-uni"><div class="in">${unidades.map(u => `<a href="${telHref(u.fone)}"><span>${u.t}</span> ${u.fone}</a>`).join('')}<a class="fx-cli" href="${link(v, 'cliente')}">Área do cliente ${ic('seta')}</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Novolar.')}" target="_blank" rel="noopener">${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca">${marca(v, 'div', true)}<p>Locação, venda e administração de imóveis na Zona Norte de São Paulo desde 1957.</p><img class="selo" src="/assets/img/selo-empresa-cidada.webp" width="300" height="145" alt="Selo de Responsabilidade Social Empresa Cidadã, The Rotary Foundation / ABTRF 2024-25" loading="lazy"><p class="redes"><a href="${E.insta}" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" aria-label="YouTube">${ic('yt')}</a></p></div>
    ${unidades.map(u => `<div><h3>Unidade ${u.t}</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(u.fone)}">${u.fone}</a></li><li>${ic('pin')}<span>${u.end}<br>CEP ${u.cep}, São Paulo - SP</span></li></ul></div>`).join('')}
    <div><h3>Atalhos</h3><ul><li><a href="${link(v, 'alugar')}">Imóveis para alugar</a></li><li><a href="${link(v, 'comprar')}">Imóveis à venda</a></li><li><a href="${link(v, 'proprietarios')}">Cadastre seu imóvel</a></li><li><a href="${link(v, 'cliente')}">2ª via de boleto</a></li><li><a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} INL Novolar Imóveis Ltda · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${ic('pin')}${i.bairro}</p><h3>${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<span class="card-ref">ref. ${i.ref}</span></p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const gs = GRUPOS.filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Tipo</legend>${gs.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : porGrupo(lista, g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};
const avisoCarteira = (v, neg) => `<aside class="carteira">${ic('livro')}<p>Esta é uma seleção da carteira da Novolar. ${neg === 'aluguel' ? 'São centenas de imóveis para alugar na Zona Norte e região' : 'São centenas de imóveis à venda'}; diga o que você procura e a equipe envia as opções.</p><a class="btn" href="${waHref(E.wa, `Olá! Procuro um imóvel para ${neg === 'aluguel' ? 'alugar' : 'comprar'}.`)}" target="_blank" rel="noopener">${icWa()}Pedir opções</a></aside>`;

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área útil', i.au && `${i.au} m²`], ['Área total', i.at && `${i.at} m²`], ['Dormitórios', i.dorm], ['Suítes', i.suite], ['Vagas', i.vaga], ['Uso', i.uso]].filter(d => d[1]);
  const fotos = `<div class="galeria n${Math.min(i.fotos.length, 5)}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  return head(v, i.slug, titulo, `${titulo}, ref. ${i.ref}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.uso} · ref. ${i.ref}</p>
      <h1>${titulo}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, São Paulo - SP</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
      ${i.unidade.length ? `<h2>No imóvel</h2><ul class="lista-check amen">${i.unidade.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      ${i.condominio.length ? `<h2>No condomínio</h2><ul class="lista-check amen">${i.condominio.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Locação' : 'Venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      <dl>${i['condomínio'] ? `<div><dt>Condomínio</dt><dd>${i['condomínio']}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}<div><dt>Referência</dt><dd>${i.ref}</dd></div></dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      ${i.neg === 'venda' ? `<a class="btn btn-linha" href="${E.financ}" target="_blank" rel="noopener">Simular financiamento</a>` : `<a class="btn btn-linha" href="${link(v, 'cliente')}#documentos">Documentos para alugar</a>`}
      <p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (msg = 'Olá! Vim pelo site da Novolar.', anunciar = false) => `<form class="form" data-wa="${esc(msg)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${anunciar
    ? `<div class="form-duas"><label>Pretende<select name="pretende"><option>Alugar</option><option>Vender</option><option>Alugar e vender</option></select></label><label>Tipo<select name="tipo"><option>Apartamento</option><option>Casa</option><option>Casa em condomínio</option><option>Conjunto comercial</option><option>Galpão</option><option>Loja</option><option>Prédio</option><option>Terreno</option><option>Outro</option></select></label></div>
  <div class="form-duas"><label>Finalidade<select name="finalidade"><option>Residencial</option><option>Comercial</option></select></label><label>Bairro e cidade<input name="bairro" required></label></div>`
    : `<div class="form-duas"><label>Gostaria de<select name="assunto"><option>Comprar um imóvel</option><option>Alugar um imóvel</option><option>Vender meu imóvel</option><option>Falar com a administração</option></select></label><label>Tipo de uso<select name="uso"><option>Residencial</option><option>Comercial</option></select></label></div>`}
  <label>Mensagem<textarea name="mensagem" rows="4"${anunciar ? '' : ' required'}></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"></iframe>`;
const unidadesBloco = (m = false) => `<div class="unidades">${unidades.map((u, n) => `<article class="uni sobe"><p class="uni-n">0${n + 1}</p><h3>${u.t}</h3><p>${ic('pin')}<span>${u.end}<br>CEP ${u.cep}</span></p><p>${ic('tel')}<a href="${telHref(u.fone)}">${u.fone}</a></p>${m ? mapa(u.q) : `<a class="link-seta" href="https://maps.google.com/?q=${encodeURIComponent(u.q)}" target="_blank" rel="noopener">Ver no mapa ${ic('seta')}</a>`}</article>`).join('')}</div>`;
const servLista = () => `<ul class="servs">${servicos.map(s => `<li class="sobe">${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul>`;
const ref = r => imoveis.find(i => i.ref === r);
const comFotos = (lista, n) => lista.filter(i => i.fotos.length >= 4).slice(0, n);

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', 'Casas, sobrados, apartamentos, galpões, prédios e terrenos para alugar na Zona Norte de São Paulo.') + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar', 'Residenciais, comerciais e industriais. Fotos, valores e a ficha de cada um.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}${avisoCarteira(v, 'aluguel')}</div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', 'Casas, apartamentos, prédios, galpões e terrenos à venda na Zona Norte de São Paulo.') + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', 'Do sobrado em condomínio ao terreno para incorporação. Simule o financiamento direto na ficha.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}${avisoCarteira(v, 'venda')}</div>
` + rodape(v);
  pag.proprietarios = head(v, 'proprietarios', 'Proprietários', 'Deixe seu imóvel nas mãos de quem entende do assunto desde 1957: locação, venda e administração.') + topo(v, 'proprietarios') + cab('Proprietários', 'Deixe o seu imóvel nas mãos de quem entende do assunto desde 1957', 'Venda, locação e administração, com assessoria jurídica e mercadológica.') + `
<div class="in"><section class="prop-sec">${servLista()}</section>
<section class="anuncie"><div><p class="k">Cadastre seu imóvel</p><h2>Quer alugar ou vender?</h2><p>Conte o tipo, a finalidade e onde fica. A unidade mais perto entra em contato.</p><p class="nota">${ic('check')}Destaque nas locações comerciais e industriais: galpões, prédios, lojas e terrenos.</p></div>${formulario('Olá! Quero cadastrar meu imóvel na Novolar.', true)}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Novolar', quem[0]) + topo(v, 'empresa') + cab('Quem somos', 'Mais de 60 anos de Zona Norte', 'Três sedes e times de especialistas em Vila Maria, Vila Sabrina e Jardim São Paulo.') + `
<div class="in"><section class="inst"><div>${quem.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><blockquote class="lema"><p>“${lema}”</p><cite>O lema que pautou a história da Novolar</cite></blockquote></section>
<section class="selo-sec"><img src="/assets/img/selo-empresa-cidada.webp" width="300" height="145" alt="Selo de Responsabilidade Social Empresa Cidadã, The Rotary Foundation / ABTRF 2024-25" loading="lazy"><p>Selo de Responsabilidade Social <b>Empresa Cidadã</b> 2024-25, da Associação Brasileira da The Rotary Foundation.</p></section>
<section><header class="tit"><p class="k">Unidades</p><h2>Três sedes na Zona Norte</h2></header>${unidadesBloco(true)}</section></div>
` + rodape(v);
  pag.cliente = head(v, 'cliente', 'Área do cliente', 'Portal do cliente Novolar, 2ª via de boletos, extrato do proprietário, ficha cadastral e relação de documentos.') + topo(v, 'cliente') + cab('Área do cliente', 'Boletos, extratos e documentos', 'Para locatários e proprietários que já são clientes da Novolar.') + `
<div class="in"><section class="cli-grade">
  <article class="cli-card"><p class="k">Portal</p><h2>Portal do cliente</h2><p>Extrato do proprietário e informações do seu contrato, com o login fornecido pela Novolar.</p><a class="btn" href="${E.portal}" target="_blank" rel="noopener">Entrar no portal</a></article>
  <article class="cli-card"><p class="k">Locatário</p><h2>2ª via de boleto</h2><p>Gere o boleto do aluguel. Se for o primeiro boleto, ligue para (11) 2632-4000.</p><a class="btn" href="${E.boletos}" target="_blank" rel="noopener">Gerar boleto</a></article>
</section>
<section class="tutos"><header class="tit"><p class="k">Tutoriais</p><h2>Passo a passo em vídeo</h2></header><div class="tuto-grade">
  <figure><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/MzzPZz9y6Rk" title="Extrato do proprietário" allowfullscreen></iframe><figcaption>Como consultar o extrato do proprietário</figcaption></figure>
  <figure><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/QDyaYQ1s8Q8" title="Segunda via de boletos" allowfullscreen></iframe><figcaption>Como gerar a 2ª via do boleto</figcaption></figure>
</div><p class="nota">Os vídeos são os do canal da Novolar no YouTube; confira qual é qual.</p></section>
<section id="documentos" class="docs"><header class="tit"><p class="k">Documentos</p><h2>Para alugar com a Novolar</h2></header><ul>
  <li><a href="https://www.novolar.net/upload/collections/document/ficha-cadastral-pessoa-fisica_file.pdf" target="_blank" rel="noopener">${ic('livro')}<span><b>Ficha cadastral pessoa física</b><small>PDF</small></span>${ic('ext')}</a></li>
  <li><a href="https://www.novolar.net/upload/collections/document/relacao-de-documentos_file.pdf" target="_blank" rel="noopener">${ic('livro')}<span><b>Relação de documentos</b><small>PDF</small></span>${ic('ext')}</a></li>
</ul></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Novolar: Vila Maria ${unidades[0].fone}, Vila Sabrina ${unidades[1].fone}, Jardim São Paulo ${unidades[2].fone}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Novolar', 'Mande uma mensagem ou ligue para a unidade mais perto de você.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div><ul class="contato-lista"><li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">(11) 93502-7309</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('usuarios')}<div><strong>Trabalhe conosco</strong><a href="${E.antigo}trabalhe" target="_blank" rel="noopener">Envie seu currículo</a></div></li></ul></div></section>
<section>${unidadesBloco(true)}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = ref('VM218206').fotos[0];
  const tiles = GRUPOS.slice(1).map(g => { const l = porGrupo(imoveis, g[0]); const f = (l.find(i => i.fotos.length > 2) || l[0]).fotos[0]; return `<li><a href="${link(v, l.filter(i => i.neg === 'aluguel').length >= l.length / 2 ? 'alugar' : 'comprar')}">${foto(f, g[1])}<span><b>${g[1]}</b><small>${porGrupo(aluguel, g[0]).length} para alugar · ${porGrupo(vendas, g[0]).length} à venda</small></span></a></li>`; }).join('');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária na Zona Norte de São Paulo · desde 1957</p><h1>Para um novo ciclo, <em>um Novolar.</em></h1><p>${E.curto}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero</span><b>alugar</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero</span><b>comprar</b>${ic('seta')}</a><a class="busca-op op-prop" href="${link(v, 'proprietarios')}"><span>Tenho um imóvel</span><b>anunciar</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa, 'Galpão amplo com cobertura metálica e iluminação natural, à venda pela Novolar', ' loading="eager" fetchpriority="high"')}<figcaption>Galpão à venda, ref. VM218206</figcaption></figure>
</div><svg class="arco" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120 C 380 20, 900 0, 1440 40 L1440 120 Z"/></svg></section>
<section class="in tipos-a"><header class="tit"><p class="k">Busque por tipo</p><h2>Residenciais, comerciais, galpões e terrenos</h2></header><ul class="tiles">${tiles}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar em destaque</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${comFotos(aluguel, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Venda</p><h2>À venda em destaque</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${comFotos(vendas, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="sedes-a"><div class="in"><header class="tit"><p class="k">Três sedes</p><h2>Um time de especialistas em cada parte da Zona Norte</h2><p>Vila Maria, Vila Sabrina e Jardim São Paulo, para conhecer de perto a vida e os diferenciais de cada bairro.</p></header>${unidadesBloco()}</div></section>
<section class="in prop-a"><div><p class="k">Venda · Locação · Administração</p><h2>Deixe o seu imóvel nas mãos de quem entende do assunto desde 1957</h2><p>${quem[4].split('. ')[0]}.</p><a class="btn" href="${link(v, 'proprietarios')}">Cadastrar meu imóvel</a></div>${servLista()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const col = ['VM218208', 'VM217938', 'VM215786'].map(r => ref(r));
  const empresa = imoveis.filter(i => i.grupo === 'galpoes' || i.grupo === 'comerciais');
  const casa = imoveis.filter(i => i.grupo === 'residenciais');
  const linha = i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="ln-txt"><small>${i.tipo} · ${i.neg === 'aluguel' ? 'locação' : 'venda'}</small><b>${i.bairro}</b><em>${resumo(i).slice(0, 2).join(' · ')}</em></span><span class="ln-preco">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</span></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="ano" aria-hidden="true">1957</p><p class="k">INL Novolar · Zona Norte de São Paulo</p><h1>Locação, venda e administração de imóveis <span>há mais de 60 anos.</span></h1><p>Casas, apartamentos, galpões, prédios e terrenos, com destaque nas locações comerciais e industriais.</p><p class="bts"><a class="btn" href="${link(v, 'alugar')}">Imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'comprar')}">Imóveis à venda</a></p></div>
  <div class="hero-b-col">${col.map((i, n) => `<a class="hc${n}" href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`, n ? ' loading="lazy"' : ' loading="eager" fetchpriority="high"')}<span>${i.tipo} · ${i.bairro}</span></a>`).join('')}</div>
</div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1957</b><span>desde</span></li><li><b>3</b><span>sedes na Zona Norte</span></li><li><b>${imoveis.length}</b><span>imóveis nesta seleção</span></li><li><b>Full-service</b><span>locação, venda e administração</span></li></ul></div></section>
<section class="in emp-b"><header class="tit tit-linha"><div><p class="k">Para a sua empresa</p><h2>Galpões, prédios, lojas e terrenos</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ol class="linhas">${empresa.filter(i => i.fotos.length > 2).slice(0, 7).map(linha).join('')}</ol></section>
<section class="casa-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Para morar</p><h2>Casas, sobrados e apartamentos</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${[...comFotos(casa.filter(i => i.neg === 'aluguel'), 2), ...comFotos(casa.filter(i => i.neg === 'venda'), 2)].map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in lema-b"><blockquote class="lema"><p>“${lema}”</p><cite>O lema da Novolar desde 1957</cite></blockquote><div><p>${quem[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Novolar ${ic('seta')}</a></div></section>
<section class="prop-b"><div class="in"><header class="tit"><p class="k">Proprietários</p><h2>Seu imóvel alugado, vendido e bem administrado</h2></header>${servLista()}<p class="bts"><a class="btn" href="${link(v, 'proprietarios')}">Cadastrar meu imóvel</a></p></div></section>
<section class="in sedes-b"><header class="tit"><p class="k">Unidades</p><h2>Vila Maria, Vila Sabrina e Jardim São Paulo</h2></header>${unidadesBloco(true)}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'INL Novolar', artigo: 'da', url: E.url, lang: 'pt', cor: '#001361', fundo: '#00103f', claro: '#fff8d6',
  fonteTitulo: '"Red Hat Display",system-ui,sans-serif', fonteTexto: '"Red Hat Text",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7 + imoveis.length, texto: 'Clara, no azul e amarelo do logo, com o arco amarelo da marca e as três sedes da Zona Norte em destaque.', pontos: [`${imoveis.length} imóveis reais com fotos, valores e ficha completa`, 'Busca por tipo: residenciais, comerciais, galpões e terrenos', 'Área do cliente com boleto, portal e documentos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7 + imoveis.length, texto: 'Azul-marinho, com o ano de fundação em destaque e os imóveis para empresas separados dos imóveis para morar.', pontos: ['Destaque para galpões, prédios e terrenos', 'O lema da Novolar e os 60 anos de história', 'Visita agendada pelo WhatsApp em cada imóvel'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
