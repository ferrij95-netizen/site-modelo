// Claudia Andrade, corretora de imóveis (CRECI 17031), Salvador/BA. Gera public/{a,b}/ e a página de escolha.
// node clientes/claudiaandrade/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs claudiaandrade http://claudiaandradeimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 do /llms.txt do site atual (plataforma ImobiBrasil): os 21 imóveis publicados.
// Fotos: só 5 imóveis têm fotos no site (até 5 de cada, em webp). Logo: arquivo original do site, fundo branco removido.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Claudia Andrade Imóveis', url: 'https://claudiaandrade.overtus.com.br/', antigo: 'http://claudiaandradeimoveis.com.br/',
  creci: '17031', email: 'claudia_acl@hotmail.com',
  fones: ['(71) 98188-2021', '(71) 99228-7275', '(71) 3460-1748'],
  end: 'Rua Cyridião Durval, Lote 03, Quadra 10', bairro: 'Jardim Brasília / Pernambués, Salvador - BA', cep: '41100-720',
  insta: 'https://www.instagram.com/claudiaandradeimoveis_/', insta1: '@claudiaandradeimoveis_',
  curto: 'Corretora de imóveis em Salvador desde 2012, com imóveis à venda e para alugar em Salvador, Lauro de Freitas e Camaçari.',
};
const sobre = [
  'Iniciei minhas atividades como corretora de imóveis no ano de 2012. Trabalhei 14 anos em uma empresa de assessoria imobiliária e sou administradora de empresas.',
  'Ética profissional e transparência são imprescindíveis no mercado imobiliário.',
  'A busca pela excelência é a maior maneira de crescimento neste mercado. Por isso a corretora Claudia Andrade procura oferecer aos seus clientes um atendimento personalizado, o que resulta em segurança em todos os negócios realizados e em clientes satisfeitos.',
  'Venha, faça parte desta conquista você também!',
];
const bancos = [
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet/simulaOperacaoInternet.do?method=inicializarCasoUso'],
  ['Banco do Brasil', 'https://www42.bb.com.br/portalbb/cim/creditoimobiliario/simular,802,2250,2250.bbx'],
  ['Bradesco', 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/index.shtm'],
  ['Itaú', 'https://ww3.itau.com.br/imobline/pre/simuladores_new/fichaProposta/index.aspx?IMOB_TipoBKL=&ident_bkl=pre'],
  ['Santander', 'https://www.santander.com.br/br/resolva-on-line/simuladores'],
  ['Banrisul', 'http://www.banrisul.com.br/brz/link/brzw01hw.asp?css=bob&secao_id=1083'],
];
const tiposAnuncio = ['Apartamento', 'Casa', 'Casa em condomínio', 'Comercial', 'Flat', 'Kitnet', 'Loja', 'Lote', 'Sala comercial', 'Terreno', 'Outro'];

// ---------- imóveis ----------
const BAIRRO = { 'ILHA DE SÃO JOÃO': 'Ilha de São João' };
const GRUPO = t => /Terreno/.test(t) ? 'terrenos' : /Comercial/.test(t) ? 'comerciais' : /Casa/.test(t) ? 'casas' : 'apartamentos';
const TIPO = { 'Casas 3 e 4 Quartos': 'Casa', 'Casa em Condomínio': 'Casa em condomínio', 'Sala Comercial': 'Sala comercial' };
const limpa = s => s.replace(/1¤/g, '1º').replace(/\s+([,.])/g, '$1').replace(/,([A-Za-zÀ-ú])/g, ', $1').replace(/\s{2,}/g, ' ').trim();
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const bairro = BAIRRO[x.bairro.replace(/\s+/g, ' ')] || x.bairro.replace(/\s+/g, ' ');
  const tipo = TIPO[x.tipo] || x.tipo;
  // terreno 863509 (Barris, 1.826 m²) aparece por "R$ 1.600" no site: valor provavelmente incompleto, ver LEIA-ME
  const preco = x.cod === '863509' ? '' : x.preco;
  const taxas = Object.fromEntries((x.taxas || '').split('|').map(t => t.split(':').map(s => s.trim())).filter(t => t[1]));
  let desc = limpa(x.desc || '');
  if (/^CASA TIPO/.test(desc)) desc = desc.charAt(0) + desc.slice(1).toLowerCase();
  return { ...x, bairro, tipo, preco, grupo: GRUPO(x.tipo), slug: `imovel/${x.cod}`, desc, taxas,
    local: x.cidade ? `${bairro}, ${x.cidade}` : bairro, area: x.area.replace(/,00 m²$/, ' m²'), areaPriv: x.areaPriv.replace(/,00 m²$/, ' m²') };
});
const comFoto = imoveis.filter(i => i.fotos.length);
const vendas = imoveis.filter(i => i.neg === 'venda'), aluguel = imoveis.filter(i => i.neg === 'aluguel');
const cidades = ['Salvador', 'Lauro de Freitas', 'Camaçari'].map(c => [c, imoveis.filter(i => i.cidade === c).length]);
const porBairro = [...new Set(imoveis.map(i => i.bairro))].map(b => [b, imoveis.filter(i => i.bairro === b)]).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'quem-sou', nome: 'Quem sou' }, { slug: 'financiamento', nome: 'Financiamento' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Varanda', b: 'Caderno de bairros' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,500;0,600;1,500;1,600&family=Source+Sans+3:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=Figtree:wght@400;500;600;700&display=swap',
};
const cores = { a: '#7d8236', b: '#2c2e1d' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Claudia Andrade Imóveis | Corretora de imóveis em Salvador' : `${titulo} | Claudia Andrade Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Claudia Andrade Imóveis, página inicial"` : ''}><img src="/assets/logo.webp" width="582" height="115" alt="Claudia Andrade, corretora de imóveis, CRECI 17031"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area || i.areaPriv, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const negTxt = i => i.neg === 'aluguel' ? 'para alugar' : 'à venda';
const precoHtml = i => i.preco ? `<b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}` : '<b class="consulta">Valor sob consulta</b>';
const mailImovel = i => `mailto:${E.email}?subject=${encodeURIComponent(`Imóvel cód. ${i.cod}: ${i.tipo} em ${i.bairro}`)}&body=${encodeURIComponent(`Olá, Claudia! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} ${negTxt(i)} em ${i.local}) que vi no seu site.\n\nMeu nome:\nMeu telefone:`)}`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fones[0])}">${ic('tel')}<span>${E.fones[0]}</span></a>
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
    <div class="rod-marca"><div class="rod-placa">${marca(v, 'div')}</div><p>Corretora de imóveis em Salvador desde 2012. CRECI ${E.creci}.</p></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}<li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">${E.insta1}</a></li></ul></div>
    <div><h3>Endereço</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'imoveis')}#alugar">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${link(v, 'financiamento')}">Simular financiamento</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Claudia Andrade Imóveis. CRECI ${E.creci}.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão: com foto, ou cartão tipográfico (o site não tem fotos de 16 dos 21 imóveis)
const cartao = (v, i) => `<li class="card${i.fotos.length ? '' : ' card-sf'}" data-g="${i.grupo}" data-n="${i.neg}"><a href="${link(v, i.slug)}">
  ${i.fotos.length ? `<figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span></figure>` : `<div class="sf"><span class="card-tipo">${i.tipo}</span><span class="sf-bairro">${esc(i.bairro).replace('/', '/<wbr>')}</span><span class="sf-nota">Fotos sob consulta</span></div>`}
  <div class="card-txt"><p class="card-local">${esc(i.local)} · cód. ${i.cod}</p><h3>${i.tipo} ${negTxt(i)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco">${precoHtml(i)}</p></div></a></li>`;
const filtro = v => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas'], ['comerciais', 'Comerciais'], ['terrenos', 'Terrenos']];
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Negócio</legend>${[['todos', 'Todos', imoveis.length], ['venda', 'Comprar', vendas.length], ['aluguel', 'Alugar', aluguel.length]].map((g, n) => `<label${g[0] === 'aluguel' ? ' id="alugar"' : ''}><input type="radio" name="neg" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[2]}</small></span></label>`).join('')}</fieldset>
  <fieldset class="filtro"><legend>Tipo</legend>${grupos.map((g, n) => `<label><input type="radio" name="tipo" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? imoveis.length : imoveis.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul>
  <p class="filtro-vazio">Não encontrou o que procura? <a href="${link(v, 'contato')}">Conte para a Claudia</a> o tipo de imóvel, o bairro e o valor.</p></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${negTxt(i)} em ${i.bairro}`;
  const dados = [['Área total', i.area], ['Área privativa', i.areaPriv], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas], ['Mobiliado', i.mobiliado]].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : '';
  return head(v, i.slug, titulo, `${titulo}, cód. ${i.cod}. ${resumo(i).join(', ')}${i.preco ? `. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}` : ''}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis</a></p>
  ${fotos}
  <div class="ficha-grade${i.fotos.length ? '' : ' ficha-sf'}">
    <div class="ficha-txt">
      <p class="k">${i.tipo} ${negTxt(i)} · cód. ${i.cod}</p>
      <h1>${esc(i.bairro)}${i.cond ? `<span>${esc(i.cond)}</span>` : ''}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.local)}${i.cidade ? ' - BA' : ''}</p>
      <p class="preco-m">${precoHtml(i)}</p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      ${i.desc ? `<h2>Descrição</h2><p>${esc(i.desc)}</p>` : ''}
      ${i.itens.length ? `<h2>No imóvel</h2><ul class="lista-check">${i.itens.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
      ${i.perto.length ? `<h2>Perto</h2><p class="perto">${i.perto.join(' · ')}</p>` : ''}
      ${i.fotos.length ? '' : '<p class="nota">Este imóvel ainda não tem fotos publicadas. Peça as fotos ou marque uma visita com a Claudia.</p>'}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${precoHtml(i)}</p>
      ${Object.keys(i.taxas).length ? `<dl>${Object.entries(i.taxas).map(([k, t]) => `<div><dt>${k}${k === 'IPTU' ? ' (ano)' : ''}</dt><dd>${t}</dd></div>`).join('')}</dl>` : ''}
      <a class="btn" href="${telHref(E.fones[0])}">${ic('tel')}Ligar para a Claudia</a>
      <a class="btn btn-linha" href="${mailImovel(i)}">${ic('mail')}Pedir informações</a>
      <p class="pb-nota">Corretora Claudia Andrade, CRECI ${E.creci}. Valores informados no anúncio; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto, extra = '') => `<form class="form" data-email="${E.email}" data-assunto="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${extra}
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar mensagem</button>
  <p class="form-nota">O envio abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const formAnuncio = formulario('Quero anunciar meu imóvel', `<div class="form-duas"><label>Tipo do imóvel<select name="tipo">${tiposAnuncio.map(t => `<option>${t}</option>`).join('')}</select></label><label>Para<select name="finalidade"><option>Venda</option><option>Locação</option></select></label></div>
  <div class="form-duas"><label>Bairro e cidade<input name="bairro" placeholder="Pituba, Salvador"></label><label>Valor pretendido<input name="valor" placeholder="R$"></label></div>`);
const mapa = `<iframe class="mapa" title="Mapa: ${E.end}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Cyridião Durval, Pernambués, Salvador BA')}&z=15&output=embed"></iframe>`;
const contatoLista = `<ul class="contato-lista">${E.fones.map((f, n) => `<li>${ic('tel')}<div><strong>${['Celular', 'Celular', 'Fixo'][n]}</strong><a href="${telHref(f)}">${f}</a></div></li>`).join('')}<li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">${E.insta1}</a></div></li><li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></div></li></ul>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis à venda e para alugar', `${imoveis.length} imóveis em Salvador, Lauro de Freitas e Camaçari: ${vendas.length} à venda e ${aluguel.length} para alugar.`) + topo(v, 'imoveis') + cab('Imóveis', `${imoveis.length} imóveis em Salvador e região`, `${vendas.length} à venda e ${aluguel.length} para alugar, em ${cidades.map(c => c[0]).join(', ').replace(/, ([^,]*)$/, ' e $1')}.`) + `
<div class="in lista-pag">${filtro(v)}</div>
` + rodape(v);
  pag['quem-sou'] = head(v, 'quem-sou', 'Quem sou', sobre[0]) + topo(v, 'quem-sou') + cab('Quem sou', 'Claudia Andrade, corretora de imóveis', `CRECI ${E.creci} · Salvador, Bahia`) + `
<div class="in quem"><section class="quem-txt">${sobre.map((p, n) => `<p${n === 0 ? ' class="lead"' : n === 1 ? ' class="frase"' : ''}>${p}</p>`).join('')}</section>
<aside class="quem-num"><ul class="numeros"><li><b>2012</b><span>início como corretora</span></li><li><b>14 anos</b><span>em assessoria imobiliária antes disso</span></li><li><b>${imoveis.length}</b><span>imóveis anunciados hoje</span></li></ul><p class="bts"><a class="btn" href="${link(v, 'contato')}">Falar com a Claudia</a></p></aside></div>
` + rodape(v);
  pag.financiamento = head(v, 'financiamento', 'Financiamento', 'Simule o financiamento do seu imóvel nos sites dos bancos.') + topo(v, 'financiamento') + cab('Financiamento', 'Simule o financiamento do seu imóvel', 'Pensando em você, reunimos os simuladores de alguns bancos.') + `
<div class="in"><ul class="bancos">${bancos.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener"><span>${b[0]}</span><small>Simulador de crédito imobiliário ${ic('ext')}</small></a></li>`).join('')}</ul>
<p class="nota">Os simuladores ficam nos sites dos próprios bancos; as condições mudam conforme o banco e o seu perfil.</p></div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel em Salvador? Informe os dados do imóvel e os seus contatos.') + topo(v, 'anuncie') + cab('Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel?', 'Informe no formulário os dados do imóvel e também seus dados para contato.') + `
<div class="in form-pag"><div class="form-caixa">${formAnuncio}</div><aside>${contatoLista}</aside></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `Fale com a corretora Claudia Andrade: ${E.fones[0]}, ${E.email}.`) + topo(v, 'contato') + cab('Fale conosco', 'Fale com a Claudia', 'Se você tem alguma sugestão, dúvida ou solicitação, use este espaço ou ligue.') + `
<div class="in form-pag"><div class="form-caixa">${formulario('Contato pelo site', '<label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar o meu imóvel</option><option>Outro assunto</option></select></label>')}</div><aside>${contatoLista}</aside></div>
<div class="in">${mapa}</div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const ordemFoto = ['3193996', '2885751', '2475140', '2638945', '3027684'].map(c => imoveis.find(i => i.cod === c));

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const casa = imoveis.find(i => i.cod === '3193996');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Corretora de imóveis · CRECI ${E.creci}</p><h1>Casa, apartamento ou terreno em Salvador, <em>com atendimento da própria corretora.</em></h1><p>${E.curto}</p>
    <div class="atalhos"><a href="${link(v, 'imoveis')}"><b>${vendas.length}</b><span>à venda</span>${ic('seta')}</a><a href="${link(v, 'imoveis')}#alugar"><b>${aluguel.length}</b><span>para alugar</span>${ic('seta')}</a><a href="${link(v, 'anuncie')}"><b>${ic('casa')}</b><span>anunciar o meu</span>${ic('seta')}</a></div></div>
  <a class="hero-a-foto" href="${link(v, casa.slug)}">${foto(casa.fotos[2], 'Quintal com gramado, piscina e área gourmet de casa em condomínio no Vilas do Joanes', ' loading="eager" fetchpriority="high"')}<span class="hero-a-leg"><b>Casa em condomínio · Vilas do Joanes</b>4 suítes, piscina com spa e área gourmet de 63 m²</span></a>
</div></section>
<section class="cidades-a"><div class="in"><ul>${cidades.map(c => `<li><b>${c[1]}</b><span>imóveis em ${c[0]}</span></li>`).join('')}<li><b>${porBairro.length}</b><span>bairros diferentes</span></li></ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Com fotos</p><h2>Imóveis em destaque</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} ${ic('seta')}</a></header><ul class="cards cards-dest">${ordemFoto.map(i => cartao(v, i)).join('')}</ul></section>
<section class="quem-a"><div class="in quem-a-in"><div class="quem-a-marca"><img src="/assets/logo.webp" width="582" height="115" alt="" loading="lazy"></div><div><p class="k">Quem sou</p><h2>Atendimento personalizado, ética e transparência.</h2><p>${sobre[0]}</p><p>${sobre[2]}</p><a class="link-seta" href="${link(v, 'quem-sou')}">Conheça a Claudia ${ic('seta')}</a></div></div></section>
<section class="in bairros-a"><header class="tit"><p class="k">Por bairro</p><h2>Onde estão os imóveis</h2></header><ul class="chips">${porBairro.map(([b, l]) => `<li><a href="${link(v, l.length === 1 ? l[0].slug : 'imoveis')}">${esc(b)} <small>${l.length}</small></a></li>`).join('')}</ul></section>
<section class="fin-a"><div class="in fin-a-in"><div><p class="k">Financiamento</p><h2>Vai financiar? Simule antes de visitar.</h2><p>Simuladores da Caixa, Banco do Brasil, Bradesco, Itaú, Santander e Banrisul num lugar só.</p></div><p class="bts"><a class="btn" href="${link(v, 'financiamento')}">Simular financiamento</a><a class="btn btn-linha" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const ap = imoveis.find(i => i.cod === '2885751');
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-tipo">${i.tipo}<small>${i.neg === 'aluguel' ? 'aluguel' : 'venda'}</small></span><span class="ln-res">${resumo(i).slice(0, 3).join(' · ') || '&nbsp;'}</span><span class="ln-preco">${i.preco || 'sob consulta'}</span>${i.fotos.length ? `<span class="ln-foto" title="Tem fotos">${ic('casa')}</span>` : '<span class="ln-foto"></span>'}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Claudia Andrade · corretora desde 2012</p><h1>Um imóvel em Salvador começa por <em>escolher bem o bairro.</em></h1><p>${E.curto} Atendimento direto com a corretora.</p><p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} imóveis</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p></div>
  <figure class="hero-b-foto">${foto(ap.fotos[0], 'Sala ampla com mesa de jantar em apartamento de 4 quartos na Graça', ' loading="eager" fetchpriority="high"')}<figcaption><a href="${link(v, ap.slug)}">Graça · 4 quartos, 280 m² · ${ap.preco} ${ic('seta')}</a></figcaption></figure>
</div></section>
<section class="caderno"><div class="in"><header class="tit tit-linha"><div><p class="k">Caderno de bairros</p><h2>Todos os imóveis, bairro por bairro</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Com fotos e filtro ${ic('seta')}</a></header>
<div class="bairros-b">${porBairro.map(([b, l]) => `<section class="bairro-b"><h3>${esc(b)}<small>${l[0].cidade || 'Bahia'}</small></h3><ol class="linhas">${l.map(linha).join('')}</ol></section>`).join('')}</div></div></section>
<section class="in dest-b"><header class="tit"><p class="k">Com fotos</p><h2>Para ver de perto</h2></header><ul class="cards">${ordemFoto.slice(0, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="quem-b"><div class="in quem-b-in"><blockquote><p>“${sobre[1]}”</p><footer>Claudia Andrade · CRECI ${E.creci}</footer></blockquote><div><p>${sobre[0]}</p><p class="bts"><a class="btn btn-claro" href="${link(v, 'quem-sou')}">Quem sou</a><a class="btn btn-linha-claro" href="${link(v, 'financiamento')}">Simular financiamento</a></p></div></div></section>
<section class="in anuncie-b"><div><p class="k">Proprietário</p><h2>Quer vender ou alugar o seu imóvel?</h2><p>Conte o tipo, o bairro e o valor pretendido. A Claudia entra em contato com você.</p></div><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Claudia Andrade Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#7d8236', fundo: '#2c2e1d', claro: '#f5f3e8',
  fonteTitulo: '"Fira Sans Extra Condensed",system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no verde-oliva e amarelo do logo, abrindo com a casa no Vilas do Joanes e atalhos para comprar, alugar ou anunciar.', pontos: [`Os ${imoveis.length} imóveis do site, cada um com sua página`, 'Filtro por negócio e por tipo', 'Página de financiamento com os simuladores dos bancos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Editorial, com títulos em serifa e os imóveis organizados como um caderno, bairro por bairro.', pontos: ['Todos os imóveis agrupados por bairro', 'A frase da corretora em destaque', 'Chamada para quem quer anunciar'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
