// Bianca Peçanha, Corretora de Imóveis (Bangu, Rio de Janeiro/RJ, CRECI-RJ 073.616). Gera public/{a,b}/ e a página de escolha.
// node clientes/biancapecanha/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs biancapecanha https://biancapecanha.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das páginas de venda e aluguel do site atual (WordPress/Divi): todos os 24 anúncios
// publicados, com até 5 fotos de cada (texto do anúncio + galeria logo abaixo dele). Ver LEIA-ME.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Bianca Peçanha Corretora de Imóveis', url: 'https://biancapecanha.overtus.com.br/', antigo: 'https://biancapecanha.com.br/',
  wa: '5521965084441', wa2: '5521999875828', fone: '(21) 96508-4441', fone2: '(21) 99987-5828',
  creci: 'CRECI-RJ 073.616', insta: 'https://www.instagram.com/biancapecanhac/', arroba: '@biancapecanhac',
  end: 'Rua Sul América, 1679, sala 102', bairro: 'Bangu, Rio de Janeiro - RJ', horario: 'das 9h às 17h',
  mapa: 'Rua Sul América 1679 Bangu Rio de Janeiro RJ',
  curto: 'Corretora de imóveis em Bangu, na Zona Oeste do Rio: venda, aluguel e administração de imóveis, despachante e contabilidade no mesmo lugar.',
};
const vizinhos = ['Bangu', 'Realengo', 'Padre Miguel', 'Magalhães Bastos', 'Marechal Hermes', 'Bento Ribeiro', 'Santíssimo', 'Jabour', 'Campo Grande'];
const sobre = [
  'Bem-vindo(a) ao nosso site. Aqui você encontra diversos serviços relacionados a imóveis, como venda, aluguel, administração, serviço de despachante e contabilidade.',
  'Trabalhamos há alguns anos nesta área, sempre prestando serviço de qualidade para nossos clientes. Estamos localizados no bairro de Bangu e atuamos tanto neste bairro como em bairros vizinhos como Realengo, Padre Miguel, Magalhães Bastos, Marechal Hermes, Bento Ribeiro, Santíssimo, Jabour, Campo Grande e outros.',
];
const servicos = [
  { id: 'administracao', ic: 'chave', t: 'Administração de imóveis', p: ['Entregue seu imóvel para quem já atua há vários anos neste setor, sempre agindo com competência e muita ética. Temos vários clientes satisfeitos que podem confirmar estas afirmações.', 'Se deseja entregar seu imóvel para quem pode administrá-lo com os resultados que você espera, entre em contato.'] },
  { id: 'despachante', ic: 'livro', t: 'Despachante de imóveis', p: ['A documentação de imóveis envolve uma burocracia complexa e trabalhosa. Contratar um profissional que faça o serviço de despachante pode ser uma ótima solução para quem não tem tempo ou não tem familiaridade com o tema.', 'Contrate nosso serviço de despachante e ganhe tempo para outras atividades.'] },
  { id: 'contabilidade', ic: 'painel', t: 'Contabilidade e Imposto de Renda', p: ['Receber aluguel, assim como outros rendimentos, exige lançamentos que implicam impostos e cumprimento de normas que, se ignorados, podem trazer problemas para empresas e pessoas físicas.', 'Fazemos seu Imposto de Renda, pessoa física ou jurídica. Entre em contato e coloque a situação em dia.'] },
];

// ---------- imóveis ----------
const GRUPO = { Casa: 'casas', Apartamento: 'apartamentos', Kitnet: 'kitnets', Loja: 'comerciais', Sala: 'comerciais', Terreno: 'terrenos' };
const NOMEG = { casas: 'Casas', apartamentos: 'Apartamentos', kitnets: 'Kitnets', comerciais: 'Lojas e salas', terrenos: 'Terrenos' };
const reais = n => 'R$ ' + n.toLocaleString('pt-BR');
const curto = n => n >= 1000000 ? `R$ ${(n / 1e6).toLocaleString('pt-BR')} mi` : n >= 10000 ? `R$ ${Math.round(n / 1000).toLocaleString('pt-BR')} mil` : reais(n);
const corta = /api\.whatsapp|^agende|^entre em contato|^maiores informa|^para maiores|^não perca|^📞|R\$|^\d?[\d.]+,00|^aluguel|^valor|^preço|^iptu|^somente|^aceita|^caução|^despesas|^\(?\s*0?2 meses|^2 meses|^fale diretamente|^(chegou a oportunidade|excelente oportunidade|ótima oportunidade)/i;
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const linhas = x.texto.map(l => l.replace(/\s+,/g, ',').replace(/\s{2,}/g, ' ').replace(/Goumert/g, 'gourmet').replace(/Aréa|Area de/g, m => m === 'Aréa' ? 'Área' : 'Área de')).filter(l => !corta.test(l));
  return { ...x, slug: `imovel/${x.id}`, grupo: GRUPO[x.tipo], linhas, local: x.bairro || 'Zona Oeste do Rio' };
});
const venda = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const BAIRROS = ['Realengo', 'Padre Miguel', 'Bangu', 'Jardim Bangu', 'Santíssimo', 'Campo Grande']; // de leste para oeste
const contaBairro = b => imoveis.filter(i => i.bairro === b).length;

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'servicos', nome: 'Administração e serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Zona Oeste', b: 'Preço na frente' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Dosis:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Source+Sans+3:wght@400;600&display=swap',
};
const cores = { a: '#08b1d5', b: '#23272b' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Bianca Peçanha Corretora de Imóveis | Venda e aluguel em Bangu, Zona Oeste do Rio' : `${titulo} | Bianca Peçanha Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Bianca Peçanha Corretora de Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="771" height="318" alt="Bianca Peçanha Corretora de Imóveis"></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/imoveis/${f.f}" width="${f.w}" height="${f.h}" alt="${esc(alt)}"${extra}>`;
const semFoto = () => `<div class="sem-foto"><img src="/assets/favicon.png" width="128" height="128" alt=""><span>Fotos sob consulta</span></div>`;
const nomeNeg = i => i.neg === 'venda' ? 'à venda' : 'para alugar';
const precoTxt = i => i.neg === 'venda' ? reais(i.preco) : `${reais(i.preco)}<small>/mês</small>`;
const resumo = i => [i.area, i.quartos && `${i.quartos} ${i.quartos === 1 ? 'quarto' : 'quartos'}`, i.vagas && `${i.vagas} vaga`].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá, Bianca! Tenho interesse no imóvel ${nomeNeg(i)}: ${i.titulo} (${i.rua}${i.bairro ? `, ${i.bairro}` : ''}), cód. ${i.id.toUpperCase()}, que vi no site.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa)}" target="_blank" rel="noopener">${icWa()}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Venda, aluguel e administração de imóveis em Bangu e na Zona Oeste do Rio.</p><p class="rod-creci">${E.creci}</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('relogio')}<span>Atendimento ${E.horario}</span></li></ul></div>
    <div><h3>WhatsApp</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa2)}" target="_blank" rel="noopener">${E.fone2}</a></li><li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">${E.arroba}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda (${venda.length})</a></li><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'servicos')}">Administração</a></li><li><a href="${link(v, 'servicos')}#despachante">Despachante e contabilidade</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Bianca Peçanha Corretora de Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá, Bianca! Vim pelo site.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? foto(i.fotos[0], `${i.titulo}, ${i.local}`) : semFoto()}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${ic('pin')}${i.local}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || esc(i.rua)}</p>
  <p class="card-preco"><b>${precoTxt(i)}</b></p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const gs = ['todos', ...Object.keys(NOMEG).filter(g => lista.some(i => i.grupo === g))];
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${gs.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g}"${n ? '' : ' checked'}><span>${g === 'todos' ? 'Todos' : NOMEG[g]} <small>${g === 'todos' ? lista.length : lista.filter(i => i.grupo === g).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

// descrição: linhas curtas viram lista, linhas terminadas em ":" viram subtítulo
function descricao(i) {
  const out = []; let lista = [];
  const fecha = () => { if (lista.length) out.push(`<ul class="itens">${lista.map(l => `<li>${ic('check')}${esc(l)}</li>`).join('')}</ul>`); lista = []; };
  for (const l of i.linhas) {
    if (/:$/.test(l) || /^(características|composição|o imóvel é composto|imóvel composto|condomínio com|a casa é composta|casa composta|apartamento composto de:?$)/i.test(l)) { fecha(); out.push(`<h3>${esc(l.replace(/\s*:$/, ''))}</h3>`); continue; }
    if (l.length < 42 && !/[.!]$/.test(l)) { lista.push(l.replace(/^0(\d)/, '$1')); continue; }
    fecha(); out.push(`<p>${esc(l)}</p>`);
  }
  fecha();
  return out.join('\n');
}

function ficha(v, i) {
  const titulo = `${i.tipo} ${nomeNeg(i)}${i.bairro ? ` em ${i.bairro}` : ''}`;
  const dados = [['Área', i.area], ['Quartos', i.quartos], ['Vagas', i.vagas], ['Bairro', i.bairro], ['Tipo', i.tipo]].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria n${Math.min(i.fotos.length, 5)}">${i.fotos.map((f, n) => `<a href="/assets/img/imoveis/${f.f}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto()}</div>`;
  const volta = i.neg === 'venda' ? 'comprar' : 'alugar';
  return head(v, i.slug, `${i.titulo}, ${i.local}`, `${titulo}: ${i.titulo}. ${resumo(i).join(', ')}${resumo(i).length ? '. ' : ''}${i.neg === 'venda' ? 'Valor' : 'Aluguel'} ${reais(i.preco)}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'venda' ? 'Imóveis à venda' : 'Imóveis para alugar'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo} · cód. ${i.id.toUpperCase()}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.rua)}${i.bairro ? `, ${i.bairro}` : ''}, Rio de Janeiro</p>
      <p class="preco-m"><b>${precoTxt(i)}</b><a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${esc(d[1])}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2>
      <div class="desc">${descricao(i)}</div>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'venda' ? 'Valor de venda' : 'Aluguel'}</p>
      <p class="pb-valor">${precoTxt(i)}</p>
      ${i.obs ? `<p class="pb-obs">${esc(i.obs)}${i.neg === 'aluguel' ? ' · despesas à parte' : ''}</p>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Bianca Peçanha, ${E.creci}. Valores informados no anúncio; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (msg = 'Olá, Bianca! Vim pelo site.') => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero comprar</option><option>Quero alugar</option><option>Quero vender ou alugar meu imóvel</option><option>Administração do meu imóvel</option><option>Despachante</option><option>Contabilidade / Imposto de Renda</option></select></label><label>Bairro<input name="bairro" placeholder="Bangu, Realengo, Campo Grande..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório em Bangu" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=15&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a><a href="${waHref(E.wa2)}" target="_blank" rel="noopener">${E.fone2}</a></div></li>
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.bairro}</span></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">${E.arroba}</a></div></li>
</ul>`;
const servBloco = () => `<div class="servs">${servicos.map(s => `<article class="serv sobe" id="${s.id}">${ic(s.ic)}<h2>${s.t}</h2>${s.p.map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${waHref(E.wa, `Olá, Bianca! Quero saber sobre ${s.t.toLowerCase()}.`)}" target="_blank" rel="noopener">Falar sobre isso ${ic('seta')}</a></article>`).join('')}</div>`;

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${venda.length} imóveis à venda em Bangu, Realengo, Santíssimo e Campo Grande: casas, apartamentos e terrenos.`) + topo(v, 'comprar') + cab('À venda', 'Quer comprar um imóvel em Bangu ou nos bairros vizinhos?', `Veja o que temos neste momento: ${venda.length} imóveis entre casas, apartamentos e terrenos.`) + `
<div class="in lista-pag">${filtro(v, venda, 'v')}</div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Bangu, Realengo e Padre Miguel: casas, apartamentos, kitnets, lojas e sala.`) + topo(v, 'alugar') + cab('Para alugar', 'Alugar em Bangu e nos bairros próximos, na Zona Oeste do Rio', `${aluguel.length} imóveis disponíveis. Caução de 2 meses e despesas à parte, como informado em cada anúncio.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Administração e serviços', 'Administração de imóveis, despachante e contabilidade com Imposto de Renda para pessoa física e jurídica, em Bangu.') + topo(v, 'servicos') + cab('Serviços', 'São diversos serviços para imóveis no mesmo lugar', 'Além de vender e alugar, cuidamos da administração, da papelada e do Imposto de Renda.') + `
<div class="in">${servBloco()}
<section class="anuncie"><div><p class="k">Proprietário</p><h2>Quer vender, alugar ou deixar seu imóvel com a gente?</h2><p>Conte onde ele fica e a Bianca entra em contato.</p></div>${formulario('Olá, Bianca! Tenho um imóvel e quero falar sobre ele.')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Bianca Peçanha: WhatsApp ${E.fone}. ${E.end}, ${E.bairro}. Atendimento ${E.horario}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Bianca', `Escritório na Rua Sul América, em Bangu. Atendimento ${E.horario}.`) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapa()}</div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.id === 'v06').fotos[0];
  const linhaBairros = `<ol class="trilho">${BAIRROS.map(b => `<li${contaBairro(b) ? '' : ' class="vazio"'}><span class="pt"></span><b>${b}</b><small>${contaBairro(b) ? `${contaBairro(b)} ${contaBairro(b) === 1 ? 'imóvel' : 'imóveis'}` : '&nbsp;'}</small></li>`).join('')}</ol>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Corretora de imóveis · Bangu · ${E.creci}</p><h1>A realização do seu sonho é o nosso maior negócio.</h1><p>Casas, apartamentos, kitnets e terrenos para comprar ou alugar em Bangu e na Zona Oeste do Rio, com quem atende no bairro.</p>
    <div class="escolhe"><a href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${venda.length} imóveis</b>${ic('seta')}</a><a href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa, 'Fachada do Residencial Rio Samba, em Campo Grande', ' loading="eager" fetchpriority="high"')}<figcaption>Residencial Rio Samba, Campo Grande · à venda</figcaption></figure>
</div></section>
<section class="bairros-a"><div class="in"><header class="tit"><p class="k">Onde estão os imóveis</p><h2>De Realengo a Campo Grande</h2></header>${linhaBairros}<p class="nota">Também atendemos Magalhães Bastos, Marechal Hermes, Bento Ribeiro, Jabour e outros bairros vizinhos.</p></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${venda.length} ${ic('seta')}</a></header><ul class="cards">${venda.filter(i => i.fotos.length >= 4).slice(0, 6).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar ou trabalhar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${aluguel.filter(i => i.fotos.length >= 4).slice(0, 6).map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in serv-a-in"><div><p class="k">Tudo no mesmo lugar</p><h2>Além de vender e alugar</h2><p>${sobre[0]}</p><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></div><ul class="lista-serv">${servicos.map(s => `<li>${ic(s.ic)}<span><b>${s.t}</b>${s.p[0].split('. ')[0].replace(/\.$/, '')}.</span></li>`).join('')}</ul></div></section>
<section class="in esc-a"><div><p class="k">Escritório</p><h2>Na Rua Sul América, em Bangu</h2><p>${sobre[1]}</p>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const faixas = [
    { t: 'Aluguel até R$ 700', l: aluguel.filter(i => i.preco <= 700) },
    { t: 'Aluguel acima de R$ 700', l: aluguel.filter(i => i.preco > 700) },
    { t: 'Compra até R$ 200 mil', l: venda.filter(i => i.preco <= 200000) },
    { t: 'Compra de R$ 200 a 500 mil', l: venda.filter(i => i.preco > 200000 && i.preco <= 500000) },
    { t: 'Compra acima de R$ 500 mil', l: venda.filter(i => i.preco > 500000) },
  ];
  const mosaico = ['v06', 'a02', 'v02', 'a09', 'v08', 'a07'].map(id => imoveis.find(i => i.id === id));
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-preco">${i.neg === 'venda' ? curto(i.preco) : `${reais(i.preco)}<small>/mês</small>`}</span><span class="ln-txt"><b>${esc(i.titulo)}</b><small>${i.tipo} · ${i.local}${resumo(i).length ? ` · ${resumo(i).join(' · ')}` : ''}</small></span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Bianca Peçanha · Corretora de Imóveis · Bangu</p><h1>Imóveis na Zona Oeste, <span>com o preço logo na frente.</span></h1><p>${venda.length} imóveis à venda a partir de ${curto(Math.min(...venda.map(i => i.preco)))} e ${aluguel.length} para alugar a partir de ${reais(Math.min(...aluguel.map(i => i.preco)))} por mês, em Bangu, Realengo, Padre Miguel, Santíssimo e Campo Grande.</p>
  <p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div>
  <ul class="mosaico">${mosaico.map((i, n) => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.titulo}, ${i.local}`, n < 2 ? ' loading="eager"' : ' loading="lazy" decoding="async"')}<span>${i.neg === 'venda' ? curto(i.preco) : `${reais(i.preco)}/mês`}</span></a></li>`).join('')}</ul>
</div></section>
<section class="in faixas-b"><header class="tit"><p class="k">Pelo seu orçamento</p><h2>Escolha a faixa de preço</h2></header>
${faixas.filter(f => f.l.length).map(f => `<details class="faixa"${f.t.startsWith('Aluguel até') ? ' open' : ''}><summary><span>${f.t}</span><small>${f.l.length} ${f.l.length === 1 ? 'imóvel' : 'imóveis'}</small>${ic('seta')}</summary><ol class="linhas">${f.l.sort((a, b) => a.preco - b.preco).map(linha).join('')}</ol></details>`).join('')}
</section>
<section class="serv-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Serviços</p><h2>São diversos serviços para imóveis no mesmo lugar</h2></div><a class="link-seta" href="${link(v, 'servicos')}">Detalhes ${ic('seta')}</a></header>
<ol class="serv-num">${[['Venda', `${venda.length} imóveis à venda agora`], ['Aluguel', `${aluguel.length} imóveis para alugar agora`], ...servicos.map(s => [s.t, s.p[0].split('. ')[0].replace(/\.$/, '') + '.'])].map((s, n) => `<li><span class="n">0${n + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('')}</ol></div></section>
<section class="in esc-b"><div class="esc-b-txt"><p class="k">Escritório</p><h2>Rua Sul América, 1679, sala 102 · Bangu</h2><p>${sobre[1]}</p><p class="bts"><a class="btn btn-wa" href="${waHref(E.wa, 'Olá, Bianca! Vim pelo site.')}" target="_blank" rel="noopener">${icWa()}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></div><div class="esc-b-mapa">${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Bianca Peçanha Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#08b1d5', fundo: '#23272b', claro: '#eaf7fb',
  fonteTitulo: 'Dosis,system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no azul do logo, com os bairros da Zona Oeste ligados numa linha e a escolha "comprar ou alugar" logo na abertura.', pontos: [`Os ${imoveis.length} anúncios do site, cada um com página, fotos e ficha`, 'Filtro por casas, apartamentos, kitnets, lojas e terrenos', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Grafite com azul, mosaico de fotos reais dos imóveis e a lista organizada por faixa de preço.', pontos: ['Aluguel e compra separados pelo orçamento do cliente', 'Serviços numerados: venda, aluguel, administração, despachante e IR', 'Escritório com mapa e WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
