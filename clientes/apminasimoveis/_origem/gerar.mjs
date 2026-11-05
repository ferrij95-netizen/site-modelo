// AP Minas Imóveis (Castelo, Belo Horizonte/MG). Gera public/{a,b}/ e a página de escolha.
// node clientes/apminasimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs apminasimoveis http://www.apminasimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de vendas.asp, locacao.asp e detalhes.asp do site atual
// (os 15 de aluguel e os 25 mais novos dos 359 à venda; até 5 fotos de cada). Marca: símbolo do logo vetorizado (marca.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'AP Minas Imóveis', url: 'https://apminasimoveis.overtus.com.br/', antigo: 'http://www.apminasimoveis.com.br/',
  fone: '(31) 3476-7666', cel: '(31) 99105-4313', wa: '5531991054313', email: 'apminas@apminasimoveis.com.br',
  end: 'Rua Castelo de Lisboa, 1073', cidade: 'Castelo, Belo Horizonte - MG',
  slogan: 'O imóvel que você procura está aqui!',
  sub: 'Encontre os melhores apartamentos, casas e imóveis comerciais.',
  curto: 'Imobiliária no bairro Castelo, em Belo Horizonte: apartamentos, coberturas, casas e imóveis comerciais para comprar e alugar no Castelo, Ouro Preto, Paquetá e região da Pampulha.',
  mapa: 'Rua Castelo de Lisboa, 1073, Belo Horizonte, MG',
};
// horário do rodapé do site atual ("09 as 18:00 hs / 09 as 12:00 hr"); os dias são suposição nossa
const horario = [['Segunda a sexta', '9h às 18h'], ['Sábado', '9h às 12h']];

// ---------- carteira completa no site atual (05/11/2026), contada em vendas.asp e locacao.asp ----------
const TOTAL_VENDA = 359, TOTAL_ALUGA = 15;
const CARTEIRA_BAIRROS = [['Castelo', 135], ['Ouro Preto', 54], ['Paquetá', 46], ['Manacás', 14], ['Santa Terezinha', 12], ['Bandeirantes', 9], ['Cabral, Contagem', 8]];
const CARTEIRA_TIPOS = [['Apartamentos', 154], ['Casas', 81], ['Coberturas', 59], ['Áreas privativas', 40], ['Lotes', 19]];

// ---------- imóveis ----------
const TIPO = { 'Area Privativa': 'Área privativa', Barracao: 'Barracão', Galpao: 'Galpão', 'Lote/Terreno': 'Lote', 'Casa Comercial': 'Casa comercial', 'Casa em Condominio': 'Casa em condomínio', 'Andar Corrido': 'Andar corrido' };
const GRUPO = t => /Apartamento|Cobertura|Privativa|Kitnet/.test(t) ? 'apartamentos' : /Lote/.test(t) ? 'terrenos' : /Loja|Comercial|Galpao|Andar/.test(t) ? 'comerciais' : 'casas';
const BAIRRO = { Paqueta: 'Paquetá', Caicaras: 'Caiçaras', 'Sao Salvador': 'São Salvador', 'Fernao Dias': 'Fernão Dias', Manacas: 'Manacás', 'Alipio de Melo': 'Alípio de Melo', 'Ceu Azul': 'Céu Azul' };
const CIDADE = { 'Guanhaes/MG': 'Guanhães' };
const PREP = { Liberdade: 'na', Floresta: 'na', Mangueiras: 'em' };
const SOB_CONSULTA = ['96511']; // no site atual aparece "R$ 580,00" para 5 casas à venda: valor tratado como erro
const num = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.'));
const real = s => num(s) > 0 ? `R$ ${String(s).replace(/R\$\s*/, '')}` : '';
const NOMES = [['ufmg', 'UFMG'], ['iptu', 'IPTU'], ['etc', 'etc'], ['pampulha', 'Pampulha'], ['dce', 'DCE'], ['fgts', 'FGTS'], ['tv', 'TV'], ['tvs', 'TVs'], ['av\\.', 'Av.'], ['obs\\.', 'Obs.'], ['minas village', 'Minas Village'], ['fazenda da serra', 'Fazenda da Serra'], ['varandas da serra', 'Varandas da Serra'], ['castelo', 'Castelo'], ['paquetá', 'Paquetá'], ['ouro preto', 'Ouro Preto'], ['antonio carlos', 'Antônio Carlos'], ['tancredo neves', 'Tancredo Neves'], ['dos engenheiros', 'dos Engenheiros'], ['pedro ii', 'Pedro II'], ['pedro ll', 'Pedro II'], ['electrolux', 'Electrolux'], ['lg', 'LG'], ['24h', '24h'], ['blindex', 'blindex']];
// texto do anúncio: só ajusta MAIÚSCULAS, espaços e pontuação; as palavras são as do site atual
const caixa = s => {
  const letras = s.replace(/[^A-Za-zÀ-ú]/g, ''), mai = s.replace(/[^A-ZÀ-Ý]/g, '');
  return letras.length > 6 && mai.length / letras.length > .55 ? s.toLowerCase() : s;
};
const frase = s => {
  let t = s.replace(/Ò/g, 'Ó').replace(/Ì/g, 'Í').replace(/ò/g, 'ó').replace(/\s*\/\s*$/, '')
    .split(/(?<=[.;:!?\-–(),])/).map(caixa).join('')
    .replace(/(?<![\wÀ-ú])[A-ZÀ-Ý]{4,}(?![\wÀ-ú])/g, w => /^(UFMG|IPTU|FGTS)$/.test(w) ? w : w.toLowerCase())
    .replace(/\s+([,.;:!?)])/g, '$1').replace(/([,;])(?=[^\s\d])/g, '$1 ').replace(/!{2,}/g, '!').replace(/\.{2,}/g, '.').replace(/\s{2,}/g, ' ').replace(/,\s*,/g, ',')
    .replace(/(\d)\s?m2\b/g, '$1 m²').replace(/\bapto\b/gi, m => m[0] === 'A' ? 'Apto' : 'apto');
  for (const [a, b] of NOMES) t = t.replace(new RegExp(`(?<![\\wÀ-ú])${a}(?![\\wÀ-ú])`, 'gi'), b);
  return t.trim().replace(/(^|[.!?]\s+|:\s+|\s-\s)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase());
};
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const consulta = num(x.preco) === 0 || SOB_CONSULTA.includes(x.id);
  const bairro = BAIRRO[x.bairro] || x.bairro;
  return {
    neg: x.neg, cod: x.id, slug: `imovel/${x.id}`, tipo: TIPO[x.tipo] || x.tipo, grupo: GRUPO(x.tipo),
    bairro, prep: PREP[bairro] || 'no', cidade: CIDADE[x.cidade] || x.cidade, consulta,
    preco: consulta ? 'Sob consulta' : `R$ ${x.preco.replace(/,00$/, '')}`, valor: consulta ? 1e12 : num(x.preco),
    area: num(x.area) ? x.area : '', quartos: +x.quartos || 0, suites: +x.suites || 0, banh: +x.banh || 0, vagas: +x.vagas || 0,
    cond: real(x.cond), iptu: real(x.iptu),
    desc: x.desc.split(/\n|\s\/\s/).map(l => frase(l.trim())).filter(Boolean), fotos: x.img,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel').sort((a, b) => a.valor - b.valor);
const vendas = imoveis.filter(i => i.neg === 'venda').sort((a, b) => a.valor - b.valor);

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Chaveiro', b: 'Índice' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Noto+Sans:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Work+Sans:wght@400;500;600&display=swap',
};
const cores = { a: '#ed3237', b: '#1c1c1e' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'AP Minas Imóveis | Imobiliária no Castelo, Belo Horizonte' : `${titulo} | AP Minas Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', 'comum.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-r" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="AP Minas Imóveis, página inicial"` : ''}>${marcaSvg}<span class="marca-txt"><b>MINAS</b><small>Imóveis</small></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/im/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && plural(i.quartos, 'quarto', 'quartos'), i.suites && plural(i.suites, 'suíte', 'suítes'), i.vagas && plural(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const local = i => i.cidade === 'Belo Horizonte' ? i.bairro : `${i.bairro}, ${i.cidade}`;
const titulo = i => `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} ${i.prep} ${i.bairro}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.bairro}, ${i.preco}) que vi no site da AP Minas Imóveis.`);
const mes = i => i.neg === 'aluguel' && !i.consulta ? '<small>/mês</small>' : '';
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<div class="faixa"><div class="in"><span>${ic('pin')}${E.end}, Castelo · BH</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${icWa()}Vendas ${E.cel}</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
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
    <div class="rod-marca">${marca(v, 'div')}<p>${E.slogan} ${E.sub}</p></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel} (vendas)</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>${horario.map(h => `<li>${ic('relogio')}<span>${h[0]}: ${h[1]}</span></li>`).join('')}</ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'anuncie')}">Anuncie seu imóvel</a></li><li><a href="${link(v, 'contato')}">Fale conosco</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} AP Minas Imóveis. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} ${i.prep} ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${local(i)}</p><h3>${titulo(i)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${mes(i)}<span class="card-cod">cód. ${i.cod}</span></p></div></a></li>`;
// versão B: linha de índice (foto pequena, dados em colunas)
const linha = (v, i) => `<li class="card linha" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} ${i.prep} ${i.bairro}`)}</figure>
  <span class="ln-cod">${i.cod}</span><span class="ln-tipo"><b>${i.tipo}</b><small>${local(i)}</small></span>
  <span class="ln-res">${resumo(i).join(' · ') || '—'}</span><span class="ln-preco">${i.preco}${mes(i)}</span>${ic('seta')}</a></li>`;
const GRUPOS = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas'], ['comerciais', 'Comerciais'], ['terrenos', 'Lotes']];
const filtro = (v, lista, nome) => {
  const g = GRUPOS.filter(x => x[0] === 'todos' || lista.some(i => i.grupo === x[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${g.map((x, n) => `<label><input type="radio" name="f-${nome}" value="${x[0]}"${n ? '' : ' checked'}><span>${x[1]} <small>${x[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === x[0]).length}</small></span></label>`).join('')}</fieldset>
  ${v === 'b' ? `<ul class="linhas">${lista.map(i => linha(v, i)).join('')}</ul>` : `<ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul>`}</div>`;
};

function ficha(v, i) {
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/im/${f[0]}" data-foto="${esc(`${titulo(i)} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo(i)}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const volta = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, `${i.tipo} ${i.prep} ${i.bairro}, cód. ${i.cod}`, `${titulo(i)}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'}: ${i.preco}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'} · cód. ${i.cod}</p>
      <h1>${titulo(i)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, ${i.cidade} - MG</p>
      <p class="preco-m"><b>${i.preco}</b>${mes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Tenho interesse</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre este imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${mes(i)}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores e disponibilidade podem mudar; confirme com a AP Minas antes da visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (msg = 'Olá! Vim pelo site da AP Minas Imóveis.') => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto">${['Quero comprar um imóvel', 'Quero alugar um imóvel', 'Quero anunciar meu imóvel', 'Outro assunto'].map(o => `<option>${o}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const formAnuncie = () => `<form class="form" data-wa="Olá! Quero anunciar meu imóvel com a AP Minas Imóveis.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Quero<select name="finalidade"><option>Vender</option><option>Alugar</option><option>Vender ou alugar</option></select></label>
  <label>Tipo de imóvel<select name="tipo">${['Apartamento', 'Cobertura', 'Área privativa', 'Casa', 'Casa em condomínio', 'Lote', 'Loja', 'Galpão', 'Outro'].map(o => `<option>${o}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Bairro<input name="bairro" required></label><label>Cidade<input name="cidade" value="Belo Horizonte"></label></div>
  <label>Conte sobre o imóvel<textarea name="descricao" rows="4" placeholder="Quartos, área, vagas, valor que você imagina..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da AP Minas Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp de vendas</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.cidade}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></div></li>
</ul>`;
const pega = (ids, lista) => ids.map(c => lista.find(i => i.cod === c)).filter(Boolean);
const DEST_VENDA = ['94329', '91407', '97694', '96745', '97703', '90715'];
const DEST_ALUGA = ['96367', '82785', '87484', '76647'];
const passosAnuncie = [
  ['Você conta sobre o imóvel', 'Pelo formulário, pelo WhatsApp ou passando no escritório da Rua Castelo de Lisboa.'],
  ['A gente visita e fotografa', 'Combinamos uma visita para conhecer o imóvel e conversar sobre valor.'],
  ['Seu imóvel entra na carteira', 'Ele passa a aparecer no site junto dos outros imóveis da AP Minas, com fotos e ficha completa.'],
];

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Apartamentos, coberturas, casas e lotes à venda no Castelo, Paquetá e região da Pampulha, em Belo Horizonte.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', `Os ${vendas.length} anúncios mais recentes da AP Minas, do mais em conta ao mais caro. A maioria fica no Castelo e nos bairros vizinhos da Pampulha.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="lista-nota">Estes são ${vendas.length} dos ${TOTAL_VENDA} imóveis à venda da AP Minas. Procura algo específico? <a href="${waHref(E.wa, 'Olá! Estou procurando um imóvel para comprar:')}" target="_blank" rel="noopener">Conte pelo WhatsApp</a> que a equipe busca na carteira completa.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Belo Horizonte: apartamentos, casas em condomínio, kitnet, lojas e galpões.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis para alugar`, 'Apartamentos, casas em condomínio, kitnet perto da UFMG, lojas, galpões e andar corrido. Do aluguel mais em conta ao mais caro.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Quer vender ou alugar seu imóvel no Castelo e região? Mande os dados pelo formulário e a AP Minas Imóveis entra em contato.') + topo(v, 'anuncie') + cab('Anuncie seu imóvel', 'Quer vender ou alugar? Comece por aqui.', 'Mande os dados do seu imóvel e a equipe da AP Minas retorna para combinar uma visita.') + `
<div class="in anuncie-pag">
  <div class="anuncie-form"><h2>Dados do imóvel</h2>${formAnuncie()}</div>
  <div class="anuncie-lado"><ol class="passos">${passosAnuncie.map(p => `<li><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol>
  <p class="anuncie-nota">Prefere falar direto? Ligue ${E.fone} ou chame no WhatsApp <a href="${waHref(E.wa, 'Olá! Quero anunciar meu imóvel.')}" target="_blank" rel="noopener">${E.cel}</a>.</p></div>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a AP Minas Imóveis: ${E.fone}, WhatsApp ${E.cel}, ${E.email}. ${E.end}, Castelo, BH.`) + topo(v, 'contato') + cab('Contato', 'Fale com a AP Minas Imóveis', 'Mande sua mensagem pelo formulário, ligue ou passe no escritório no Castelo.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const maxB = CARTEIRA_BAIRROS[0][1];
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const tira = ['93246', '97105', '92979'].map(c => imoveis.find(i => i.cod === c));
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária no Castelo · Belo Horizonte</p><h1>O imóvel que você procura <em>está aqui.</em></h1><p>${E.sub} Compra, venda e aluguel no Castelo, Ouro Preto, Paquetá e bairros vizinhos da Pampulha.</p></div>
  <nav class="chaveiro" aria-label="O que você procura">
    <a href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${TOTAL_VENDA} imóveis à venda</b>${ic('seta')}</a>
    <a href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${TOTAL_ALUGA} para alugar</b>${ic('seta')}</a>
    <a href="${link(v, 'anuncie')}"><span>Tenho um imóvel</span><b>Anunciar com a AP Minas</b>${ic('seta')}</a>
  </nav>
</div>
<ul class="in tira-a">${tira.map(i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], titulo(i), ' loading="eager"')}<span>${i.tipo} · ${i.bairro}</span></a></li>`).join('')}</ul>
</section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar no Castelo e região</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver imóveis à venda ${ic('seta')}</a></header><ul class="cards">${pega(DEST_VENDA, vendas).map(i => cartao(v, i)).join('')}</ul></section>
<section class="bairros-a"><div class="in bairros-a-in"><div><p class="k">Onde estão os imóveis</p><h2>${CARTEIRA_BAIRROS[0][1]} dos ${TOTAL_VENDA} imóveis à venda ficam no Castelo</h2><p>O escritório fica no bairro, na Rua Castelo de Lisboa. O resto da carteira se espalha pelos vizinhos da Pampulha e por cidades da Grande BH, como Contagem, Lagoa Santa e Vespasiano.</p></div>
  <ol class="barras">${CARTEIRA_BAIRROS.map(b => `<li><span>${b[0]}</span><i style="--p:${(b[1] / maxB * 100).toFixed(1)}%"></i><b>${b[1]}</b></li>`).join('')}</ol></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Disponíveis para locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${pega(DEST_ALUGA, aluguel).map(i => cartao(v, i)).join('')}</ul></section>
<section class="anuncie-a"><div class="in anuncie-a-in"><div><p class="k">Para proprietários</p><h2>Quer vender ou alugar seu imóvel?</h2><p>Mande os dados pelo site ou pelo WhatsApp. A equipe visita, fotografa e coloca seu imóvel na carteira.</p></div><a class="btn btn-claro" href="${link(v, 'anuncie')}">Anunciar meu imóvel ${ic('seta')}</a></div></section>
<section class="in visita-a"><div><p class="k">Escritório</p><h2>${E.end}</h2><p>${E.cidade}</p>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.cod === '91407'), capa2 = imoveis.find(i => i.cod === '82785');
  const recentes = [...imoveis].filter(i => i.neg === 'venda').sort((a, b) => b.cod - a.cod).slice(0, 10);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">AP Minas Imóveis · Castelo · BH</p><h1>Apartamentos, casas e imóveis comerciais na <em>Pampulha.</em></h1><p>${E.slogan} São ${TOTAL_VENDA} imóveis à venda e ${TOTAL_ALUGA} para alugar, a maior parte no Castelo, onde fica o escritório.</p>
  <p class="bts"><a class="btn" href="${link(v, 'comprar')}">Quero comprar</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Quero alugar</a></p></div>
  <div class="hero-b-fotos"><figure class="f1">${foto(capa.fotos[0], titulo(capa), ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${foto(capa2.fotos[0], titulo(capa2), ' loading="eager"')}</figure></div>
</div>
<dl class="in numeros"><div><dt>À venda</dt><dd>${TOTAL_VENDA}</dd></div><div><dt>Para alugar</dt><dd>${TOTAL_ALUGA}</dd></div><div><dt>No Castelo</dt><dd>${CARTEIRA_BAIRROS[0][1]}</dd></div><div><dt>Em Contagem</dt><dd>21</dd></div></dl>
</section>
<section class="in indice-b"><header class="tit tit-linha"><div><p class="k">Índice</p><h2>Anunciados por último</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header>
<div class="cab-linhas" aria-hidden="true"><span></span><span>Cód.</span><span>Imóvel</span><span>Dados</span><span>Valor</span></div>
<ul class="linhas">${recentes.map(i => linha(v, i)).join('')}</ul></section>
<section class="tipos-b"><div class="in"><header class="tit"><p class="k">A carteira</p><h2>O que a AP Minas tem à venda</h2></header>
<ul class="tipos">${CARTEIRA_TIPOS.map(t => `<li><b>${t[1]}</b><span>${t[0]}</span></li>`).join('')}</ul>
<ul class="bairros-b">${CARTEIRA_BAIRROS.map(b => `<li>${b[0]} <small>${b[1]}</small></li>`).join('')}</ul></div></section>
<section class="in aluga-b"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>${aluguel.length} imóveis para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${pega(DEST_ALUGA, aluguel).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in anuncie-b"><div><p class="k">Anuncie</p><h2>Tem um imóvel para vender ou alugar?</h2></div><ol class="passos">${passosAnuncie.map(p => `<li><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">Escritório</p><h2>${E.end}</h2><p>${E.cidade}</p>${contatoLista()}</div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'AP Minas Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#ed3237', fundo: '#1c1c1e', claro: '#f6f3ef',
  fonteTitulo: 'Lexend,system-ui,sans-serif', fonteTexto: '"Noto Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no vermelho e no grafite do logo, com a chave do "P" como motivo e a escolha comprar, alugar ou anunciar logo na abertura.', pontos: [`${imoveis.length} imóveis com fotos, valores e ficha`, 'Quantos imóveis há em cada bairro', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Escura, em grafite e vermelho, com os imóveis listados em índice: código, bairro, dados e valor numa linha só.', pontos: ['Lista densa, boa para comparar', 'Números da carteira na abertura', 'Anuncie em três passos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
