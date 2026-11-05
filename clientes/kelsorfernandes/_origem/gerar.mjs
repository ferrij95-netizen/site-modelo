// Kelsor Fernandes Imóveis (Pituba, Salvador/BA, CRECI-J 790). Gera public/{a,b}/ e a página de escolha.
// node clientes/kelsorfernandes/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs kelsorfernandes http://www.kelsorfernandes.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 da API do próprio site (kfisite.azurewebsites.net/cms/api/Imovel, só os ATIVO=true)
// + fotos da página /Imovel/Detalhes/<id> (as 5 primeiras de cada). São todos os 13 imóveis ativos do site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Kelsor Fernandes Imóveis', url: 'https://kelsorfernandes.overtus.com.br/', antigo: 'http://www.kelsorfernandes.com.br/',
  fone: '(71) 3330-1511', email: 'kfi@kelsorfernandes.com.br', creci: 'CRECI-J 790',
  end: 'Rua Mato Grosso, 372', bairro: 'Pituba, Salvador - BA', mapa: 'Rua Mato Grosso 372 Pituba Salvador BA',
  horario: [['Segunda a sexta', '8h30 às 18h'], ['Sábado', '8h30 às 12h']],
  curto: 'Administração, aluguel e venda de imóveis em Salvador. Apartamentos, salas e lojas na Barra, Graça, Canela, Imbuí, Itaigara e outros bairros.',
  boleto: 'http://www.kelsorfernandes.com.br/Boleto',
};

// ---------- imóveis ----------
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: n % 1 ? 2 : 0 });
const titulo = s => s.replace(/^Edf\. /, 'Edifício ').replace(/^Cond\. /, 'Condomínio ').replace(/\s+-\s+/, ' · ');
const GRUPO = t => /Casa/.test(t) ? 'casas' : /Loja|Sala/.test(t) ? 'comerciais' : 'apartamentos';
const limpa = s => s.replace(/\s*\(chaves na administradora\)\.?/i, '').replace('arnários', 'armários').replace('depedências', 'dependências').replace(/^OPORTUNIDADE! /, '').trim();
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => ({
  ...x, cod: String(x.id), slug: `imovel/${x.id}`, nome: titulo(x.nome), grupo: GRUPO(x.tipo),
  preco: brl(x.valor), chaves: /chaves na administradora/i.test(x.desc), alugado: /encontra-se alugado/i.test(x.desc),
  oportunidade: /^OPORTUNIDADE!/.test(x.desc), texto: limpa(x.desc),
}));
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const bairros = [...new Set(imoveis.map(i => i.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
const por = cod => imoveis.find(i => i.cod === cod);

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'proprietarios', nome: 'Proprietários' }, { slug: 'imobiliaria', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Recepção', b: 'Chaves' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Public+Sans:wght@400;500;600;700&display=swap',
};
const cores = { a: '#0a93d1', b: '#13202e' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Kelsor Fernandes Imóveis | Aluguel, venda e administração em Salvador' : `${t} | Kelsor Fernandes Imóveis`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Kelsor Fernandes Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="420" height="450" alt="Kelsor Fernandes Imóveis"></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${f[0]}" width="${f[1]}" height="${f[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const mailImovel = i => `mailto:${E.email}?subject=${encodeURIComponent(`Interesse no imóvel cód. ${i.cod} (${i.nome})`)}&body=${encodeURIComponent(`Olá! Tenho interesse no imóvel cód. ${i.cod}, ${i.tipo.toLowerCase()} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro} (${i.end}), que vi no site.\n\nNome:\nTelefone:\nMelhor horário para visita:`)}`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<div class="faixa-topo"><div class="in"><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a class="fx-boleto" href="${E.boleto}" target="_blank" rel="noopener">${ic('livro')}Boleto online</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Administração, aluguel e venda de imóveis em Salvador. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li><li>${ic('relogio')}<span>${E.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'proprietarios')}">Cadastrar seu imóvel</a></li><li><a href="${E.boleto}" target="_blank" rel="noopener">Boleto online</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Kelsor Fernandes Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão de imóvel e filtro por tipo (CSS :has, sem JS)
const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.nome}, ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span>${i.alugado ? '<span class="card-selo">Imóvel alugado</span>' : ''}</figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · cód. ${i.cod}</p><h3>${esc(i.nome)}</h3><p class="card-res">${resumo(i).join(' · ')}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['comerciais', 'Lojas e salas'], ['casas', 'Casas']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const t = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Vagas', i.gar]].filter(d => d[1]);
  const galeria = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.nome} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${t}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  return head(v, i.slug, `${i.nome}, ${i.bairro}`, `${t}: ${i.nome}, ${i.end}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${galeria}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${t} · cód. ${i.cod}</p>
      <h1>${esc(i.nome)}</h1>
      <p class="ficha-local">${ic('pin')}${esc(i.end)}, ${i.bairro}, Salvador - BA</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn" href="${mailImovel(i)}">${ic('mail')}Quero visitar</a></p>
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>
      <h2>Descrição</h2><p>${esc(i.texto)}</p>
      ${i.chaves ? `<p class="nota-chave">${ic('casa')}<span>As chaves ficam na administradora: a visita é marcada com a gente, no escritório da Pituba.</span></p>` : ''}
      ${i.alugado ? `<p class="nota-chave">${ic('casa')}<span>O imóvel está alugado hoje. Fale com a gente para saber do contrato e das visitas.</span></p>` : ''}
      <p class="mais-fotos">O anúncio original tem ${i.qtfotos} fotos; aqui estão ${i.fotos.length}. Peça as outras pelo telefone ou e-mail.</p>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      <a class="btn" href="${mailImovel(i)}">${ic('mail')}Agendar visita por e-mail</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Cód. ${i.cod}. Valores informados pela imobiliária; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Fale conosco') => {
  const ops = ['Fale conosco', 'Quero alugar um imóvel', 'Quero comprar um imóvel', 'Imóvel sob medida', 'Cadastrar meu imóvel', 'Sou locatário ou proprietário'];
  return `<form class="form" data-email="${E.email}" data-assunto="${esc(assunto)} (pelo site)">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto">${ops.map(o => `<option${o === assunto ? ' selected' : ''}>${o}</option>`).join('')}</select></label><label>Bairro de interesse<input name="bairro" placeholder="Barra, Graça, Pituba..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">Abre seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
};
const mapa = () => `<iframe class="mapa" title="Mapa do escritório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const escritorio = () => `<div class="escr"><p class="k">Escritório</p><h3>Pituba</h3><p>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></p><p>${ic('relogio')}<span>${E.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></p><p>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></p><p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p></div>`;
const servicos = [
  ['casa', 'Cadastre seu imóvel', 'Tem um imóvel e quer alugar ou vender? Nós te ajudaremos. Basta enviar as informações que entraremos em contato.', 'proprietarios', 'Cadastrar meu imóvel'],
  ['estrela', 'Imóvel sob medida', 'Diga quais características o imóvel que você procura precisa ter, e tentaremos achá-lo para você.', 'contato', 'Descrever o imóvel'],
  ['livro', 'Boleto online', 'Emita os boletos ainda por vencer digitando o CPF ou o CNPJ registrado no contrato.', null, 'Emitir boleto'],
];
const servLista = v => `<ul class="servs">${servicos.map(s => `<li class="sobe">${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p><a class="link-seta" href="${s[3] ? link(v, s[3]) : E.boleto}"${s[3] ? '' : ' target="_blank" rel="noopener"'}>${s[4]} ${ic('seta')}</a></li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Salvador: apartamentos na Barra, Graça e Imbuí, sala no Canela e loja no Itaigara.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis para alugar em Salvador`, 'As chaves ficam na administradora: ligue ou escreva e marque a visita.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda em Salvador: apartamentos em Brotas, Canela, Chame-Chame, Imbuí e Nazaré, casa no Rio Vermelho e loja na Barroquinha.`) + topo(v, 'comprar') + cab('À venda', `${vendas.length} imóveis à venda`, 'Apartamentos, casa e loja em sete bairros de Salvador.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}</div>
` + rodape(v);
  pag.proprietarios = head(v, 'proprietarios', 'Proprietários', 'Cadastre seu imóvel para alugar ou vender com a Kelsor Fernandes Imóveis. Boleto online para quem já tem contrato.') + topo(v, 'proprietarios') + cab('Proprietários', 'Quer alugar ou vender seu imóvel?', 'Nós te ajudaremos. Envie as informações e entraremos em contato.') + `
<div class="in"><section class="anuncie"><div><p class="k">Cadastre seu imóvel</p><h2>Conte onde ele fica e o que tem</h2><p>Endereço, tamanho, número de quartos e se é para alugar ou vender. Com isso a gente retorna para combinar os próximos passos.</p>${escritorio()}</div>${formulario('Cadastrar meu imóvel')}</section>
<section class="boleto-sec"><div><p class="k">Já tem contrato com a gente?</p><h2>Boleto online</h2><p>O sistema de boletos da Kelsor Fernandes Imóveis permite emitir os boletos ainda por vencer. Para ver a lista dos que você pode imprimir, basta digitar o CPF ou o CNPJ registrado no contrato.</p></div><a class="btn" href="${E.boleto}" target="_blank" rel="noopener">${ic('livro')}Emitir boleto</a></section></div>
` + rodape(v);
  pag.imobiliaria = head(v, 'imobiliaria', 'A imobiliária', 'A Kelsor Fernandes Imóveis faz administração, aluguel e venda de imóveis em Salvador, no escritório da Rua Mato Grosso, Pituba. CRECI-J 790.') + topo(v, 'imobiliaria') + cab('A imobiliária', 'Administração, aluguel e venda de imóveis em Salvador', `Escritório na Pituba · ${E.creci}`) + `
<div class="in"><section class="inst"><figure class="inst-foto">${foto(['escritorio.webp', 1600, 1067], 'Recepção do escritório da Kelsor Fernandes Imóveis, com o logo na parede')}</figure>
<div><p class="lead">A Kelsor Fernandes Imóveis oferece o melhor atendimento e os melhores serviços para garantir que o seu bem seja o investimento dos seus sonhos.</p><p>Venha nos visitar e descubra toda qualidade e segurança. O escritório fica na Rua Mato Grosso, 372, na Pituba, e é de lá que saem as chaves para as visitas.</p>
<ul class="numeros"><li><b>${aluguel.length}</b><span>imóveis para alugar</span></li><li><b>${vendas.length}</b><span>imóveis à venda</span></li><li><b>${bairros.length}</b><span>bairros de Salvador</span></li></ul></div></section>
<section><header class="tit"><p class="k">Serviços</p><h2>O que você resolve com a gente</h2></header>${servLista(v)}</section>
<section class="contato-pag">${escritorio()}${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Kelsor Fernandes Imóveis: ${E.fone}, ${E.email}. Rua Mato Grosso, 372, Pituba, Salvador.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Kelsor Fernandes', 'Diga o que gostou, o que precisa melhorar ou tire dúvidas. Procura um imóvel que não está no site? Descreva no formulário.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${escritorio()}</div></section>
<section>${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Salvador · ${E.creci}</p><h1>Aluguel, venda e administração de imóveis <em>em Salvador.</em></h1><p>Apartamentos, salas e lojas na Barra, Graça, Canela, Imbuí, Itaigara e mais bairros. As chaves ficam com a gente, no escritório da Pituba.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(['escritorio.webp', 1600, 1067], 'Recepção do escritório da Kelsor Fernandes Imóveis na Pituba', ' loading="eager" fetchpriority="high"')}<figcaption>Nosso escritório · Rua Mato Grosso, 372, Pituba</figcaption></figure>
</div></section>
<section class="janelas"><div class="in bairros-a"><p class="k">Bairros com imóveis hoje</p><ul>${bairros.map(b => `<li>${b} <small>${imoveis.filter(i => i.bairro === b).length}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Disponíveis para locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${aluguel.map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${vendas.slice(0, 4).map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Para quem tem imóvel e para quem procura</h2></header>${servLista(v)}</div></section>
<section class="in visita-a">${escritorio()}${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = por('594').fotos[2];
  const etiqueta = i => `<li class="tag"><a href="${link(v, i.slug)}"><span class="tag-furo" aria-hidden="true"></span><span class="tag-cod">${i.cod}</span><span class="tag-txt"><b>${esc(i.nome)}</b><small>${i.tipo} · ${i.bairro}${resumo(i).length ? ` · ${resumo(i).slice(0, 2).join(' · ')}` : ''}</small></span><span class="tag-preco">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</span></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Vista do mar da Barra a partir da varanda do Edifício Ocean Barra', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Kelsor Fernandes Imóveis · Salvador</p><h1>As chaves estão <em>com a gente.</em></h1><p>Administração, aluguel e venda de imóveis em Salvador. Escolha o imóvel, ligue e a visita sai do nosso escritório na Pituba.</p><p class="bts"><a class="btn" href="${link(v, 'alugar')}">Imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'comprar')}">Imóveis à venda</a></p></div></section>
<section class="in quadro-b"><header class="tit tit-linha"><div><p class="k">Quadro de chaves</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos ${ic('seta')}</a></header><ol class="tags">${aluguel.map(etiqueta).join('')}</ol></section>
<section class="in quadro-b"><header class="tit tit-linha"><div><p class="k">Quadro de chaves</p><h2>À venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Com fotos ${ic('seta')}</a></header><ol class="tags">${vendas.map(etiqueta).join('')}</ol></section>
<section class="escr-b"><div class="in escr-b-in"><figure>${foto(['escritorio.webp', 1600, 1067], 'Recepção do escritório da Kelsor Fernandes Imóveis')}</figure><div><p class="k">Venha nos visitar</p><h2>Rua Mato Grosso, 372, Pituba</h2><p>A Kelsor Fernandes Imóveis oferece o melhor atendimento e os melhores serviços para garantir que o seu bem seja o investimento dos seus sonhos.</p>${escritorio()}</div></div></section>
<section class="in serv-b"><header class="tit"><p class="k">Serviços</p><h2>Proprietários, inquilinos e quem procura</h2></header>${servLista(v)}</section>
<div class="skyline" aria-hidden="true"></div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Kelsor Fernandes Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#0a93d1', fundo: '#13202e', claro: '#eef6fb',
  fonteTitulo: '"Hanken Grotesk",system-ui,sans-serif', fonteTexto: '"Hanken Grotesk",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no azul do logo, abrindo com a foto da recepção do escritório e a escolha "alugar ou comprar".', pontos: [`Os ${imoveis.length} imóveis ativos do site, cada um com página, fotos e valor`, 'Filtro por apartamentos, lojas e salas', 'Cadastre seu imóvel, imóvel sob medida e boleto online'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura, com a vista do mar da Barra e os imóveis como etiquetas de chave, porque as chaves ficam na administradora.', pontos: ['Quadro de chaves com código, bairro e valor', 'Escritório da Pituba com foto, horário e mapa', 'Títulos em Playfair, a fonte do site atual'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
