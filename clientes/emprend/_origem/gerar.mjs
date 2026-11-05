// Emprend Imóveis (Asa Norte, Brasília/DF, desde 2011). Gera public/{a,b}/ e a página de escolha.
// node clientes/emprend/_origem/gerar.mjs   (prints: /tmp/w/tools/finaliza.sh emprend http://emprend.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 do site atual (os 15 anunciados: 7 à venda e 8 para alugar), com as fotos de cada anúncio.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const WA = '5561991738014';
const E = {
  nome: 'Emprend Imóveis', url: 'https://emprend.overtus.com.br/', antigo: 'http://emprend.com.br/',
  recepcao: '(61) 3297-9210', vendas: '(61) 99173-8014', email: 'contato@emprend.com.br',
  end: 'SHN, Quadra 1, Entrada "A", salas 1401 e 1402', predio: 'Ed. Le Quartier, Asa Norte', cidade: 'Brasília - DF', cep: '70701-010',
  mapa: 'SHN Quadra 1 Edifício Le Quartier Asa Norte Brasília DF',
  insta: 'https://www.instagram.com/emprend_imoveis/', face: 'https://www.facebook.com/emprendimoveis/',
  area: 'https://www.portalunsoft.com.br/area-do-cliente/emprend',
  curto: 'Imobiliária na Asa Norte, em Brasília, desde 2011: venda, locação e aquisição de imóveis residenciais e comerciais no Distrito Federal.',
};
// Textos do site atual (página Sobre)
const sobre1 = 'Transformamos expectativas em realizações concretas.';
const sobre2 = 'Desde 2011, atuamos no Distrito Federal com excelência, segurança e agilidade na intermediação de vendas, locações e aquisições de imóveis.';
const sobre3 = 'Nosso atendimento é premium e totalmente personalizado, focado em entender as particularidades de cada cliente e oferecer soluções inteligentes em todas as etapas do processo imobiliário.';
const sobre4 = 'Mais do que imóveis, entregamos tempo, tranquilidade e resultados.';
// Página Documentos do site atual: fichas em PDF (links para o site atual)
const fichas = [
  ['Locador', 'quem vai anunciar o imóvel', [['Pessoa física', 'https://www.emprend.com.br/download/Ficha_captacao_PF_2025.pdf'], ['Pessoa jurídica', 'https://www.emprend.com.br/download/Ficha_captacao_PJ_2025.pdf']]],
  ['Locatário', 'quem vai alugar', [['Pessoa física', 'https://www.emprend.com.br/download/Ficha_PF_Locatario_2025.pdf'], ['Pessoa jurídica', 'https://www.emprend.com.br/download/Ficha_PJ_Locatario_2025_OK.pdf']]],
];

// --- limpeza dos textos dos anúncios (assinatura repetida, caixa alta, avisos de preço) ---
const SIGLAS = new Set(['SMDB', 'DCE', 'PCD', 'CLN', 'STN', 'SCRN', 'CFTV', 'PNE', 'LED', 'RH', 'TV', 'WC', 'GO', 'DF', 'SHN']);
const AVISO = /\s*(Os )?valores (anunciados|informados) poder[ãa]o (ser alterados|sofrer altera[çc][õo]es) sem aviso pr[ée]vio\.?|\s*Valores sujeitos a altera[çc][õo]es sem aviso pr[ée]vio\.?/gi;
function limpa(t, cod) {
  let s = t.replace(/\s*EMPREND IMOBILI[AÁ]RIA.*$/i, '').replace(AVISO, '').replace(/\.\s*\./g, '.').replace(/com;/g, 'com:')
    .replace(/(^|\s)0(\d)\b/g, '$1$2').replace(/\bcom com\b/g, 'com').replace(/(\d)m2\b/g, '$1 m²').replace(/(\d)m²/g, '$1 m²')
    .replace(/[A-ZÁÉÍÓÚÂÊÔÃÕÇ]{3,}/g, w => (SIGLAS.has(w) ? w : w.toLowerCase()));
  if (cod === 270) s = s.replace('100 m² de profundidade', '100 m de profundidade');
  if (cod === 230) s = s.replace('800,198 m²', '800,19 m²');
  const frases = s.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9"])/).map(f => f.trim()).filter(Boolean)
    .map(f => f.replace(/^[a-záéíóúâêôãõç]/, c => c.toUpperCase()));
  const par = []; for (let n = 0; n < frases.length; n += 3) par.push(frases.slice(n, n + 3).join(' '));
  return par;
}
const semCent = v => String(v || '').replace(/,00(?= m²|$)/, '');
const CORRIGE = { 257: { banheiros: 2 }, 255: { banheiros: 2 } }; // ficha do site diz 0, o texto diz 2 banheiros
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(i => ({
  ...i, ...(CORRIGE[i.cod] || {}), slug: `imovel/${i.cod}`, preco: semCent(i.preco), area: i.cod === 270 ? '' : semCent(i.area), par: limpa(i.desc, i.cod),
}));
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const comerciais = imoveis.filter(i => i.grupo === 'comercial');
const residenciais = imoveis.filter(i => i.grupo === 'residencial');
const chacaras = imoveis.filter(i => i.grupo === 'chacara');
const por = c => imoveis.find(i => i.cod === c);
const negTxt = i => (i.neg === 'venda' ? 'à venda' : 'para alugar');
const local = i => (i.cidade === 'Brasília' ? i.bairro : `${i.bairro}, ${i.cidade}`);
const sufixo = i => (i.neg === 'aluguel' ? '/mês' : '');
const areaTxt = i => (i.cod === 270 ? '10.000 m² de terreno' : i.area);
const plural = (n, s, p) => `${n} ${n > 1 ? p : s}`;
const dadosCurtos = i => [areaTxt(i), i.quartos && plural(i.quartos, 'quarto', 'quartos'), i.suites && plural(i.suites, 'suíte', 'suítes'), i.vagas && plural(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const msgIm = i => `Olá! Vi no site o imóvel cód. ${i.cod}: ${i.tipo} ${negTxt(i)} em ${local(i)} (${i.preco}${sufixo(i)}). Gostaria de mais informações.`;

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'empresa', nome: 'A Emprend' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Plano Piloto', b: 'Eixo' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&family=Hind:wght@400;500;600&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Lexend:wght@300;400;500;600&display=swap',
};
const cores = { a: '#07517e', b: '#0b2436' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Emprend Imóveis | Venda e locação em Brasília desde 2011' : `${t} | Emprend Imóveis`, descricao: d, fontes: FONTES[v], css: ['base.css', 'comum.css', `${v}.css`], cor: cores[v] });
const fotoIm = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/imoveis/${n}.webp" width="800" height="538" alt="${esc(alt)}"${extra}>`;
const foto = (n, alt, w = 1600, h = 1066, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n}.webp" width="${w}" height="${h}" alt="${esc(alt)}"${extra}>`;
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Emprend Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="654" height="330" alt="Emprend Imóveis"></${tag}>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const zap = (cls = 'btn', txt = 'Chamar no WhatsApp', msg = 'Olá! Vim pelo site da Emprend.') => `<a class="${cls}" href="${waHref(WA, msg)}" target="_blank" rel="noopener">${icWa()}${txt}</a>`;
const ligar = (cls = 'btn btn-linha') => `<a class="${cls}" href="${telHref(E.recepcao)}">${ic('tel')}${E.recepcao}</a>`;
const barras = () => '<span class="barras" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

function topo(v, s) {
  return `<header class="topo">
  <div class="topo-fino"><div class="in"><span>Recepção <a href="${telHref(E.recepcao)}">${E.recepcao}</a></span><span>Venda e locação <a href="${waHref(WA)}" target="_blank" rel="noopener">${E.vendas}</a></span><a class="topo-area" href="${E.area}" target="_blank" rel="noopener">${ic('usuarios')}Área do cliente</a></div></div>
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}<li class="so-cel"><a href="${E.area}" target="_blank" rel="noopener">Área do cliente</a></li></ul></nav>
    ${zap('btn topo-zap', '<span>WhatsApp</span>')}
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Venda e locação de imóveis no Distrito Federal desde 2011.</p><p class="rod-redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram da Emprend">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook da Emprend">${ic('face')}</a></p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${esc(E.end)}<br>${E.predio}<br>${E.cidade}, CEP ${E.cep}</span></li></ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<span>Recepção <a href="${telHref(E.recepcao)}">${E.recepcao}</a></span></li><li>${icWa()}<span>Venda e locação <a href="${waHref(WA)}" target="_blank" rel="noopener">${E.vendas}</a></span></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}#comprar">À venda (${vendas.length})</a></li><li><a href="${link(v, 'imoveis')}#alugar">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${link(v, 'anuncie')}#fichas">Fichas cadastrais</a></li><li><a href="${E.area}" target="_blank" rel="noopener">Área do cliente</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Emprend Imóveis</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(WA, 'Olá! Vim pelo site da Emprend.')}" target="_blank" rel="noopener" aria-label="Falar com a Emprend no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.neg} ${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${fotoIm(i.fotos[0], `${i.tipo} em ${local(i)}`)}<span class="card-neg card-${i.neg}">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span></figure>
  <div class="card-txt"><p class="card-local">${local(i)}</p><h3>${i.tipo}</h3><p class="card-dados">${dadosCurtos(i).join(' · ')}</p>
  <p class="card-preco"><b>${i.preco}</b><small>${sufixo(i)}</small></p></div></a></li>`;
const filtro = v => `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${[['todos', 'Todos', imoveis.length], ['venda', 'Comprar', vendas.length], ['aluguel', 'Alugar', aluguel.length], ['comercial', 'Salas e lojas', comerciais.length], ['residencial', 'Casas e aptos', residenciais.length], ['chacara', 'Chácaras', chacaras.length]].map((g, n) => `<label><input type="radio" name="f" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[2]}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul></div>
<script>(()=>{const m={'#comprar':'venda','#alugar':'aluguel'}[location.hash];if(m){const r=document.querySelector('input[name=f][value='+m+']');if(r)r.checked=true;}})();</script>`;

function ficha(v, i) {
  const t = `${i.tipo} ${negTxt(i)} em ${local(i)}`;
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/imoveis/${f}.webp" data-foto="${esc(`${t} (foto ${n + 1})`)}">${fotoIm(f, `${t}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const dados = [['Tipo', i.tipo], ['Local', local(i)], ['Área', areaTxt(i)], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banheiros], ['Vagas', i.vagas], ['Condomínio', i.cond], ['IPTU', i.iptu]].filter(d => d[1]);
  return head(v, i.slug, `${i.tipo} em ${local(i)}`, `${t}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}${sufixo(i)}. Cód. ${i.cod}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis</a></p>
  <div class="ficha-grade">
    ${fotos}
    <div class="ficha-txt">
      <p class="k">${i.neg === 'venda' ? 'À venda' : 'Para alugar'} · cód. ${i.cod}</p>
      <h1>${i.tipo}</h1>
      <p class="ficha-local">${ic('pin')}${local(i)}</p>
      <p class="ficha-preco"><b>${i.preco}</b><small>${sufixo(i)}</small></p>
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${esc(d[1])}</dd></div>`).join('')}</dl>
      <p class="bts">${zap('btn', 'Agendar visita', msgIm(i))}${ligar()}</p>
    </div>
  </div>
  <section class="ficha-desc">${i.par.map(p => `<p>${esc(p)}</p>`).join('')}<p class="aviso">Valores sujeitos a alteração sem aviso prévio. Confirme condomínio e IPTU com a Emprend.</p></section>
</div>
` + rodape(v);
}

const formContato = () => `<form class="form" data-wa="Olá! Vim pelo site da Emprend.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Sou cliente da Emprend</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
// Campos do formulário "Anuncie seu imóvel" do site atual
const formAnuncie = () => `<form class="form" data-wa="Olá! Quero anunciar meu imóvel com a Emprend.">
  <label>Quero<select name="finalidade"><option>Vender meu imóvel</option><option>Alugar meu imóvel</option></select></label>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Celular<input name="celular" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Telefone fixo<input name="telefone" type="tel"></label></div>
  <div class="form-duas"><label>Cidade<input name="cidade" value="Brasília"></label><label>Bairro<input name="bairro" required></label></div>
  <label>Endereço, número e complemento<input name="endereco" autocomplete="street-address"></label>
  <label>Conte sobre o imóvel<textarea name="mensagem" rows="4" placeholder="Tipo, metragem, quartos, vagas, valor pretendido"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Emprend no Ed. Le Quartier, Asa Norte" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${esc(E.end)}<br>${E.predio}, ${E.cidade}<br>CEP ${E.cep}</span></div></li>
  <li>${ic('tel')}<div><strong>Recepção</strong><a href="${telHref(E.recepcao)}">${E.recepcao}</a></div></li>
  <li>${icWa()}<div><strong>Venda e locação</strong><a href="${waHref(WA)}" target="_blank" rel="noopener">${E.vendas}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const fichasHtml = () => `<div class="fichas" id="fichas">${fichas.map(f => `<article class="ficha-doc"><h3>${f[0]} <small>${f[1]}</small></h3><ul>${f[2].map(d => `<li><a href="${d[1]}" target="_blank" rel="noopener">${ic('livro')}<span>Ficha cadastral<b>${d[0]}</b></span>${ic('ext')}</a></li>`).join('')}</ul></article>`).join('')}</div>`;
const areaCliente = () => `<div class="area-cli">${ic('usuarios')}<div><h3>Já é cliente da Emprend?</h3><p>Boletos, extratos e documentos de locação ficam na Área do cliente.</p></div><a class="btn btn-linha" href="${E.area}" target="_blank" rel="noopener">Entrar ${ic('ext')}</a></div>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis', `Imóveis à venda e para alugar em Brasília com a Emprend: ${vendas.length} à venda e ${aluguel.length} para alugar, entre salas comerciais, lojas, apartamentos, casas e chácaras.`) + topo(v, 'imoveis') + cab('Imóveis', 'Imóveis em Brasília e entorno', `${vendas.length} à venda e ${aluguel.length} para alugar, a maioria salas e lojas no Plano Piloto. Toque no imóvel para ver as fotos e os valores de condomínio e IPTU.`) + `
<div class="in lista-pag">${filtro(v)}
<aside class="pedido"><div><p class="k">Não achou o que procura?</p><h2>Diga o que você precisa</h2><p>A Emprend intermedeia vendas, locações e aquisições em todo o Distrito Federal.</p></div><p class="bts">${zap()}${ligar()}</p></aside></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel em Brasília? Mande os dados para a Emprend e baixe as fichas cadastrais de locador e locatário.') + topo(v, 'anuncie') + cab('Anuncie seu imóvel', 'Vender ou alugar com a Emprend', 'Mande os dados do imóvel e a equipe de venda e locação entra em contato.') + `
<div class="in anuncie-pag"><section class="contato-pag"><div class="contato-form"><h2>Dados do imóvel</h2>${formAnuncie()}</div>
<div><h2>Fichas cadastrais</h2><p>Para agilizar, baixe a ficha, preencha e envie junto com os documentos.</p>${fichasHtml()}${areaCliente()}</div></section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Emprend', `${sobre2} ${sobre3}`) + topo(v, 'empresa') + cab('A Emprend', sobre1, sobre2) + `
<div class="in"><section class="inst"><div><p class="lead">${sobre3}</p><p class="frase">${sobre4}</p><p class="bts">${zap()}<a class="btn btn-linha" href="${link(v, 'imoveis')}">Ver imóveis</a></p></div>
<div class="inst-fotos">${foto('sobre1', 'Sala de estar com decoração clara')}${foto('sobre3', 'Ambiente interno de imóvel')}</div></section>
<ul class="servs"><li>${ic('casa')}<span>Venda</span></li><li>${ic('chave')}<span>Locação</span></li><li>${ic('pacote')}<span>Aquisição</span></li><li>${ic('usuarios')}<span>Atendimento personalizado</span></li></ul>
<section class="visita"><div>${contatos()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Emprend: recepção ${E.recepcao}, venda e locação ${E.vendas}, ${E.email}. SHN Quadra 1, Ed. Le Quartier, Asa Norte.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Emprend', 'WhatsApp, telefone ou uma visita ao escritório no Setor Hoteleiro Norte.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mande sua mensagem</h2>${formContato()}</div><div>${contatos()}${areaCliente()}</div></section>
<section class="mapa-sec">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${barras()}${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const mini = i => `<li><a href="${link(v, i.slug)}">${fotoIm(i.fotos[0], `${i.tipo} em ${local(i)}`)}<span><b>${i.tipo}</b>${local(i)}<em>${i.preco}${sufixo(i)}</em></span></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${foto('brasilia', 'Vista de Brasília ao entardecer', 1920, 1080, ' loading="eager" fetchpriority="high"')}
<div class="in hero-a-in"><div class="hero-a-txt"><p class="k">${barras()}Brasília · desde 2011</p><h1>${sobre1}</h1><p>${sobre2}</p></div>
<div class="escolha-a"><a href="${link(v, 'imoveis')}#comprar"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a><a href="${link(v, 'imoveis')}#alugar"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a href="${link(v, 'anuncie')}"><span>Tenho um imóvel</span><b>Anunciar</b>${ic('seta')}</a></div></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">${barras()}À venda</p><h2>Do Lago Sul à Asa Norte</h2></div><a class="link-seta" href="${link(v, 'imoveis')}#comprar">Ver todos ${ic('seta')}</a></header><ul class="cards">${[180, 270, 311].map(c => cartao(v, por(c))).join('')}</ul></section>
<section class="com-a"><div class="in com-a-in"><div><p class="k">${barras()}Para empresas</p><h2>Salas e lojas no Plano Piloto</h2><p>Conjuntos com vista para o Parque da Cidade, salas no Via Capital e no Life Center, lojas na Asa Norte e em Luziânia: ${comerciais.length} dos ${imoveis.length} imóveis da Emprend são comerciais.</p><a class="btn" href="${link(v, 'imoveis')}">Ver salas e lojas</a></div>
<ul class="mini">${[54, 34, 114, 294].map(c => mini(por(c))).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">${barras()}Casas e apartamentos</p><h2>Para morar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${[176, 64, 312].map(c => cartao(v, por(c))).join('')}</ul></section>
<section class="sobre-a"><div class="in sobre-a-in"><figure>${foto('sobre2', 'Ambiente interno decorado')}</figure><div><p class="k">${barras()}A Emprend</p><h2>${sobre4}</h2><p>${sobre3}</p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a Emprend ${ic('seta')}</a></div></div></section>
<section class="in docs-a"><div><p class="k">${barras()}Documentos</p><h2>Fichas cadastrais para locação</h2><p>Locador e locatário, pessoa física ou jurídica: baixe a ficha, preencha e envie para a Emprend.</p></div>${fichasHtml()}</section>
<section class="in">${areaCliente()}</section>
<section class="in visita"><div><header class="tit"><p class="k">${barras()}Visite a Emprend</p><h2>Ed. Le Quartier, Asa Norte</h2></header>${contatos()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${fotoIm(i.fotos[0], '')}</span><span class="ln-end"><b>${i.tipo}</b><small>${local(i)}</small></span><span class="ln-m2">${areaTxt(i).replace(' de terreno', '')}</span><span class="ln-neg ln-${i.neg}">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span><span class="ln-preco">${i.preco}<small>${sufixo(i)}</small></span>${ic('seta')}</a></li>`;
  const grupos = [['Salas e lojas', comerciais], ['Casas e apartamentos', residenciais], ['Chácaras', chacaras]];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><figure class="hero-b-foto">${foto('sobre4', 'Sala de estar ampla com janelas', 1600, 1064, ' loading="eager" fetchpriority="high"')}</figure>
<div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Emprend Imóveis · Brasília, DF</p><h1>${sobre4}</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} imóveis</a>${zap('btn btn-linha')}</p></div></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>2011</b><span>no Distrito Federal</span></li><li><b>${vendas.length}</b><span>imóveis à venda</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${comerciais.length}</b><span>salas e lojas</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Carteira</p><h2>Todos os imóveis, por tipo</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver com fotos ${ic('seta')}</a></header>${grupos.map(([g, l]) => `<div class="grupo"><h3>${g} <small>${l.length}</small></h3><ol class="linhas">${l.map(linha).join('')}</ol></div>`).join('')}</section>
<section class="mv-b"><div class="in mv-b-in"><blockquote><p>“${sobre1}”</p><cite>Emprend Imóveis</cite></blockquote><div><p>${sobre3}</p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a Emprend ${ic('seta')}</a></div></div></section>
<section class="in anuncie-b"><div><p class="k">Proprietário</p><h2>Quer vender ou alugar o seu imóvel?</h2><p>Mande os dados pelo formulário ou baixe a ficha cadastral de locador.</p><a class="btn" href="${link(v, 'anuncie')}">Anunciar com a Emprend</a></div>${fichasHtml()}</section>
<section class="visita-b"><div class="in visita"><div>${contatos()}${areaCliente()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, WA);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Emprend Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#07517e', fundo: '#0b2436', claro: '#f4f7f6',
  fonteTitulo: '"Josefin Sans",system-ui,sans-serif', fonteTexto: 'Hind,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no azul e no verde do logo, com o céu de Brasília na abertura e os prédios do logo virando detalhe nos títulos.', pontos: ['Os 15 imóveis do site, com fotos, condomínio e IPTU', 'Salas e lojas do Plano Piloto em destaque', 'Fichas cadastrais e Área do cliente à mão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Escura e mais sóbria, com a carteira inteira numa lista por tipo, com metragem e preço lado a lado.', pontos: ['"Mais do que imóveis, entregamos tempo, tranquilidade e resultados"', 'Salas, casas e chácaras separadas na página inicial', 'Pedido de visita direto no WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
