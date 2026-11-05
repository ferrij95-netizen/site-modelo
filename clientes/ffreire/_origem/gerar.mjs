// F. Freire Corretor de Imóveis (Guará, Brasília/DF). Gera public/{a,b}/ e a página de escolha.
// node clientes/ffreire/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs ffreire https://www.ffreiire.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 das páginas ?l=imoveis&toDo=view&item=<id> do site atual (plataforma OKE).
// 40 dos 60 anunciados: os 12 de aluguel + 28 de venda (primeiro os destaques da home, depois a lista de venda). Até 5 fotos de cada.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'F. Freire Corretor de Imóveis', url: 'https://ffreire.overtus.com.br/', antigo: 'https://www.ffreiire.com.br/',
  email: 'ffreireimoveis@gmail.com', fixo: '(61) 3964-9993', cel: '(61) 99923-9993', wa: '5561999239993',
  end: 'EQ 31/33, Ed. Consei, sala 610', bairro: 'Guará, Brasília - DF', cep: '71065-315', mapaQ: 'EQ 31/33 Edifício Consei Guará Brasília DF',
  horario: [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 12h']],
  cliente: 'http://okeimoveis.com.br/webclient/?ccu=2027',
  curto: 'Compra, venda e aluguel de casas, apartamentos, lotes e salas comerciais no Guará e em todo o Distrito Federal. Escritório no Ed. Consei, Guará.',
};

// ---------- imóveis ----------
const SIGLAS = /\b(df|go|qe|qi|qs|qr|qnj|eptg|cef|fgts|iptu|jk|carf|c\.a\.r\.f|ap|apto|sha|smas|sbs|ed|eq|br|ch|qto|qtos|m2)\b/gi;
const MAIUSC = new Set(['df', 'go', 'qe', 'qi', 'qs', 'qr', 'qnj', 'eptg', 'cef', 'fgts', 'iptu', 'jk', 'carf', 'c.a.r.f', 'sha', 'smas', 'sbs', 'eq', 'br']);
const gritado = s => { const l = s.replace(/[^A-Za-zÀ-ú]/g, ''); return l.length > 3 && l.replace(/[^A-ZÀ-Ý]/g, '').length / l.length > 0.45; };
const frase = s => s.toLowerCase().replace(/(^|[.!?:;]\s+|\n\s*[-•]?\s*)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase())
  .replace(SIGLAS, m => MAIUSC.has(m.toLowerCase()) ? m.toUpperCase() : m).replace(/\bm2\b/g, 'm²');
const NOMES = ['Guará', 'Park Way', 'Park Shopping', 'Leroy Merlin', 'Olympique', 'Mediterranee', 'Studio Ville', 'Brasília', 'Águas Claras', 'Vicente Pires', 'Riacho Fundo', 'Taguatinga', 'Samambaia', 'Paranoá', 'Itapoã', 'Itapoa', 'Cidade Ocidental', 'Santa Maria', 'Anápolis', 'Sport Club', 'Jóquei', 'Joquei', 'Consei', 'Ponte JK', 'Por do Sol', 'Belvedere', 'Águas Lindas', 'Lúcio Costa', 'Caixa', 'Empire Center', 'Setor de Mansões IAPI'];
const ACENTO = [[/\bguara\b/gi, 'Guará'], [/\baguas claras\b/gi, 'Águas Claras'], [/\bchacara\b/g, 'chácara'], [/\bChacara\b/g, 'Chácara']];
const nomes = s => ACENTO.reduce((t, [r, n]) => t.replace(r, n), s).replace(/ (i{1,3})(?=$|[ !,.])/g, (m, r) => ' ' + r.toUpperCase());
const nomes0 = s => NOMES.reduce((t, n) => t.replace(new RegExp(`(^|[^\\p{L}])${n}(?![\\p{L}])`, 'giu'), (m, a) => a + n), s);
const maiuscula = s => s.replace(/^\p{Ll}/u, c => c.toUpperCase());
const limpaTit = s => { s = s.replace(/!{2,}/g, '!').replace(/\s+/g, ' ').trim(); return maiuscula(nomes(nomes0(gritado(s) || /^[A-ZÀ-Ý][A-ZÀ-Ý !]{7,}/.test(s) ? frase(s) : s))); };
const limpaDesc = s => s.split('\n').map(l => gritado(l) ? nomes(nomes0(frase(l))) : l).join('\n').trim();
const num = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.'));
const GRUPO = t => /Terreno|Lote/.test(t) ? 'terrenos' : /Chácara|Fazenda|Sítio/.test(t) ? 'rurais' : /Loja|Sala|Hotel|Galpão|Prédio|Ponto/.test(t) ? 'comerciais' : /Casa|Sobrado/.test(t) ? 'casas' : 'apartamentos';
const TIPO = { 'Terreno / Lote / Condomínio': 'Lote', 'Casa de Condomínio (Sobrado)': 'Sobrado em condomínio', 'Casa de Condomínio (Térrea)': 'Casa em condomínio', Hotel: 'Hotel / motel' };
const dedup = s => s.replace(/\b(\S+(?: \S+)?) \1\b/gi, '$1');
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const [cidade, estado] = x.local.split(' / ').map(s => s.trim());
  const f = x.campos;
  const neg = /Aluguel/.test(x.negocio) ? 'aluguel' : 'venda';
  const preco = (f['Valor de Aluguel'] || f['Valor de Venda'] || f['Valor de Venda/Aluguel'] || '').replace(/^\/\s*/, '');
  const area = f['Área Privativa'] && num(f['Área Privativa']) ? `${f['Área Privativa'].replace(' m²', '').replace('.', ',')} m²` : '';
  const end = dedup(x.mapa.replace(new RegExp(`,\\s*${cidade}\\s*$`), '').replace(/\s+(AP|SALA)$/i, '').replace(/\s+,/g, ',').replace(/\s+/g, ' ').trim());
  const tipo = TIPO[x.tipo] || x.tipo;
  return {
    id: x.id, slug: `imovel/${x.id}`, neg, preco,
    // 1668777360: o anúncio é "Venda/Aluguel"; a página só traz o aluguel, o valor de venda está no cartão da home do site atual
    venda: x.id === '1668777360' ? 'R$ 870.000,00' : '',
    titulo: limpaTit(x.titulo), tipo, grupo: GRUPO(x.tipo), cidade, uf: estado === 'Goiás' ? 'GO' : 'DF', end: end.length > 3 ? (gritado(end) ? nomes(nomes0(frase(end))) : end) : '',
    cond: num(f['Condomínio']) > 1 ? f['Condomínio'] : '',
    quartos: +(f.Quartos || f.Quarto) || 0, vagas: +(f.Garagens || f.Garagem) || 0, area,
    desc: limpaDesc(x.descricao), itens: Object.values(x.caracteristicas || {}).flat(), fotos: x.fotos,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda' || i.venda);
const cidades = Object.entries(imoveis.reduce((m, i) => (m[i.cidade] = (m[i.cidade] || 0) + 1, m), {})).sort((a, b) => b[1] - a[1]);
const porId = id => imoveis.find(i => i.id === id);
const GRUPOS = [['apartamentos', 'Apartamentos'], ['casas', 'Casas e sobrados'], ['terrenos', 'Lotes e terrenos'], ['comerciais', 'Lojas e salas'], ['rurais', 'Chácaras']];

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'anunciar', nome: 'Anuncie seu imóvel' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Telhado', b: 'Classificados' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,500;0,700;0,900;1,700&family=Red+Hat+Text:wght@400;500;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,700;1,6..72,500&family=Instrument+Sans:wght@400;500;600;700&display=swap',
};
const cores = { a: '#055421', b: '#f3efe4' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'F. Freire Corretor de Imóveis | Imóveis no Guará e no DF' : `${titulo} | F. Freire Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="688" height="304" alt="F. Freire Corretor de Imóveis"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const onde = i => `${i.cidade}${i.uf === 'GO' ? ' - GO' : ''}`;
const negTxt = i => i.neg === 'aluguel' ? (i.venda ? 'Aluguel ou venda' : 'Aluguel') : 'Venda';
const mes = i => i.neg === 'aluguel' ? '<small>/mês</small>' : '';
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel "${i.titulo}" (${i.tipo}, ${onde(i)}, ${i.preco}) que vi no site da F. Freire. Ref. ${i.id}`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fixo)}">${ic('tel')}<span>${E.fixo}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Compra, venda e aluguel de imóveis no Guará e em todo o Distrito Federal.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('relogio')}<span>${E.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fixo)}">${E.fixo}</a></li><li>${icWa()}<a href="${waHref(E.wa, 'Olá! Vim pelo site da F. Freire.')}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'anunciar')}">Anuncie seu imóvel</a></li><li><a href="${E.cliente}" target="_blank" rel="noopener">Área do cliente</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} F. Freire Corretor de Imóveis. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão (A) e anúncio classificado (B); filtro por tipo com CSS :has
const cartaoA = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.cidade}`)}<span class="card-neg">${negTxt(i)}</span></figure>
  <div class="card-txt"><p class="card-local">${i.tipo} · ${onde(i)}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${mes(i)}</p></div></a></li>`;
const cartaoB = (v, i) => `<li class="card anuncio" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <p class="an-tipo">${i.tipo} <span>· ${negTxt(i)}</span></p>
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.cidade}`)}</figure>
  <h3>${esc(i.titulo)}</h3>
  <p class="an-local">${onde(i)}${resumo(i).length ? ` · ${resumo(i).join(' · ')}` : ''}</p>
  <p class="an-preco"><mark>${i.preco}</mark>${mes(i)}</p></a></li>`;
const filtro = (v, lista, nome) => {
  const card = v === 'a' ? cartaoA : cartaoB;
  const gs = [['todos', 'Todos'], ...GRUPOS.filter(g => lista.some(i => i.grupo === g[0]))];
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${gs.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => card(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${onde(i)}`;
  const dados = [['Área privativa', i.area], ['Quartos', i.quartos], ['Vagas', i.vagas], ['Condomínio', i.cond]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const volta = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, i.titulo, `${titulo}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo}</p>
      <h1>${esc(i.titulo)}</h1>
      ${i.end ? `<p class="ficha-local">${ic('pin')}${esc(i.end)}, ${onde(i)}</p>` : ''}
      <p class="preco-m"><b>${i.preco}</b>${mes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2><div class="desc">${esc(i.desc).split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')}</div>
      ${i.itens.length ? `<h2>Características</h2><ul class="lista-check itens">${i.itens.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${mes(i)}</p>
      <dl>${i.venda ? `<div><dt>Venda</dt><dd>${i.venda}</dd></div>` : ''}${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fixo)}">${ic('tel')}${E.fixo}</a>
      <p class="pb-nota">Valores informados pelo anunciante; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da F. Freire.', anuncio = false) => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${anuncio
    ? `<div class="form-duas"><label>Quero<select name="quero"><option>Vender meu imóvel</option><option>Alugar meu imóvel</option></select></label><label>Tipo de imóvel<select name="tipo"><option>Apartamento</option><option>Casa ou sobrado</option><option>Lote ou terreno</option><option>Loja ou sala</option><option>Chácara</option></select></label></div>
  <label>Onde fica<input name="endereco" placeholder="Quadra, bairro, cidade"></label>`
    : `<div class="form-duas"><label>Assunto<select name="assunto"><option>Quero comprar</option><option>Quero alugar</option><option>Quero vender ou alugar meu imóvel</option><option>Outro assunto</option></select></label><label>Região de interesse<input name="regiao" placeholder="Guará, Águas Claras..."></label></div>`}
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do escritório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapaQ)}&z=16&output=embed"></iframe>`;
const escritorio = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}<br>${E.bairro} · CEP ${E.cep}</span></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fixo)}">${E.fixo}</a><a href="${telHref(E.cel)}">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></div></li>
</ul>`;
const consei = porId('1703163019').fotos[0];
const anunciarTxt = [
  ['casa', 'Conte qual é o imóvel', 'Tipo, endereço, tamanho e se você quer vender ou alugar.'],
  ['calendario', 'Combine a visita', 'O corretor vai até o imóvel para conhecer, fotografar e conversar sobre o valor.'],
  ['ext', 'Anúncio no site', 'O imóvel entra no site da F. Freire, com fotos, descrição e valor.'],
];

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda no Guará e no DF: casas, apartamentos, lotes, salas e chácaras.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda no Guará e no DF', `${vendas.length} imóveis selecionados, de kitnets a chácaras. Agende a visita pelo WhatsApp em cada anúncio.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}</div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar no Guará e no DF: apartamentos, casas, lojas e salas comerciais.`) + topo(v, 'alugar') + cab('Para alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para locação: apartamentos, kitnets, casas, lojas e salas.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.anunciar = head(v, 'anunciar', 'Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel no Guará ou no DF? Fale com a F. Freire Corretor de Imóveis.') + topo(v, 'anunciar') + cab('Proprietários', 'Quer vender ou alugar seu imóvel?', 'Mande os dados do imóvel e a F. Freire entra em contato.') + `
<div class="in"><section class="passos"><ol>${anunciarTxt.map((x, n) => `<li class="sobe"><span class="passo-n">${n + 1}</span>${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ol></section>
<section class="anuncie"><div><p class="k">Anuncie</p><h2>Dados do imóvel</h2><p>O formulário abre uma conversa no WhatsApp com tudo preenchido. Se preferir, ligue para ${E.fixo}.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a F. Freire.', true)}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a F. Freire Corretor de Imóveis: ${E.fixo}, ${E.cel}, ${E.email}. ${E.end}, Guará.`) + topo(v, 'contato') + cab('Contato', 'Fale com a F. Freire', 'Escreva pelo formulário, ligue ou passe no escritório no Guará.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${escritorio()}<p class="area-cli">Já é cliente? <a href="${E.cliente}" target="_blank" rel="noopener">Entre na área do cliente ${ic('ext')}</a></p></div></section>
<section class="mapa-sec">${mapa}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = [porId('1668777360').fotos[0], porId('1576').fotos[0], porId('1694623758').fotos[0]];
  const destV = ['1694623758', '1712682731', '1778071939', '1687877784', '1763576241', '1730817170'].map(porId);
  const destA = ['1668777360', '1614798210', '1793194800', '1576'].map(porId);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Corretor de imóveis · Guará · DF</p><h1>Casas, apartamentos, lotes e salas no <em>Guará</em> e em todo o DF.</h1><p>${E.curto}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a></div></div>
  <div class="hero-a-fotos"><figure class="hf1">${foto(capa[0], 'Sala de estar de apartamento mobiliado', ' loading="eager" fetchpriority="high"')}</figure><figure class="hf2">${foto(capa[1], 'Edifício comercial com palmeiras')}</figure><figure class="hf3">${foto(capa[2], 'Casa com jardim em Vicente Pires')}</figure></div>
</div></section>
<section class="tipos-a"><div class="in"><ul>${GRUPOS.map(g => [g, imoveis.filter(i => i.grupo === g[0]).length]).filter(x => x[1]).map(([g, n]) => `<li><b>${n}</b><span>${g[1]}</span></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Imóveis para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${destV.map(i => cartaoA(v, i)).join('')}</ul></section>
<section class="aluga-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar ou montar seu negócio</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards cards-4">${destA.map(i => cartaoA(v, i)).join('')}</ul></div></section>
<section class="in regiao-a"><div><p class="k">Onde estão os imóveis</p><h2>Do Guará para o DF e o Entorno</h2><p>Imóveis em ${cidades.length} cidades, do Guará e de Águas Claras a Vicente Pires, Riacho Fundo, Cidade Ocidental e Anápolis.</p></div><ul class="cidades">${cidades.map(c => `<li><span>${c[0]}</span><b>${c[1]}</b></li>`).join('')}</ul></section>
<section class="escr-a"><div class="in escr-a-in"><figure>${foto(consei, 'Edifício Consei, no Guará, onde fica o escritório')}<figcaption>Ed. Consei, EQ 31/33, Guará</figcaption></figure><div><p class="k">Escritório</p><h2>Atendimento no Ed. Consei, no Guará</h2>${escritorio()}<p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Vim pelo site da F. Freire.')}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${link(v, 'anunciar')}">Anunciar meu imóvel</a></p></div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const tira = ['1712682731', '1692120532', '1730817170', '1695404464'].map(porId);
  const hoje = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-tipo">${i.tipo}</span><span class="ln-tit"><b>${esc(i.titulo)}</b><small>${onde(i)}${resumo(i).length ? ` · ${resumo(i).slice(0, 2).join(' · ')}` : ''}</small></span><span class="ln-preco">${i.preco}${mes(i)}</span></a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="cabeca-b"><div class="in">
  <p class="dateline"><span>Guará · Brasília - DF</span><span>Edição de ${hoje}</span><span>${imoveis.length} imóveis nesta edição</span></p>
  <h1>Compra, venda e aluguel de imóveis, <em>direto do escritório no Guará.</em></h1>
  <div class="cabeca-b-pe"><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Para alugar</a></p></div>
</div></section>
<section class="tira-b"><div class="in"><ul>${tira.map(i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.tipo} em ${i.cidade}`, ' loading="eager"')}<span>${i.tipo} · ${onde(i)} · <b>${i.preco}</b></span></a></li>`).join('')}</ul></div></section>
<section class="in classif-b"><header class="tit tit-linha"><div><p class="k">Classificados</p><h2>À venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${vendas.filter(i => i.neg === 'venda').slice(0, 9).map(i => cartaoB(v, i)).join('')}</ul></section>
<section class="aluga-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Classificados</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos ${ic('seta')}</a></header><ol class="linhas">${aluguel.map(linha).join('')}</ol></div></section>
<section class="in escr-b"><div class="escr-b-txt"><p class="k">Expediente</p><h2>F. Freire Corretor de Imóveis</h2>${escritorio()}</div><figure>${foto(consei, 'Edifício Consei, no Guará, onde fica o escritório')}<figcaption>Ed. Consei, EQ 31/33, Guará</figcaption></figure><div class="escr-b-cta"><h3>Tem um imóvel para vender ou alugar?</h3><p>Mande os dados pelo WhatsApp e combine a visita do corretor.</p><a class="btn" href="${link(v, 'anunciar')}">Anunciar meu imóvel</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'F. Freire Corretor de Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#055421', fundo: '#0e2416', claro: '#f6f1df',
  fonteTitulo: '"Red Hat Display",system-ui,sans-serif', fonteTexto: '"Red Hat Text",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no verde e no dourado do logo, com a escolha "comprar ou alugar" logo na abertura e os imóveis em cartões com foto.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e descrição completa`, 'Filtro por apartamentos, casas, lotes, salas e chácaras', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Em papel creme, como uma página de classificados: manchete em serifa, anúncios em colunas e o preço marcado em dourado.', pontos: ['Os aluguéis listados como índice, com tipo e valor', 'Escritório no Ed. Consei com endereço e horário', 'Página para quem quer anunciar o imóvel'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
