// Rodolfo Imóveis (Brasília/DF, desde 1993). Gera public/{a,b}/ e a página de escolha.
// node clientes/rodolfoimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rodolfoimoveis http://www.rodolfoimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 04/11/2026 de novo/localizar.php + novo/galeria.php + aluguel_det.php / venda_det.php do site atual
// (todos os 33 de aluguel e 9 de venda que o site mostrava; até 5 fotos de cada). Marca: logo_rod.png vetorizado (marca.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Rodolfo Imóveis', url: 'https://rodolfoimoveis.overtus.com.br/', antigo: 'http://www.rodolfoimoveis.com.br/',
  email: 'aluguel@rodolfoimoveis.com.br', ouvidoria: 'ouvidoria@rodolfoimoveis.com.br',
  waAluguel: '5511966235351', // número do botão "Whatsapp" de cada imóvel de aluguel no site atual
  waVenda: '5561998727187', // Joyce Santos, CRECI-DF 30936 (texto dos imóveis à venda)
  curto: 'Imobiliária no Distrito Federal desde 1993: apartamentos, salas e lojas para alugar e comprar no Plano Piloto, Águas Claras, Guará e região.',
};
const lojas = [
  { t: 'Asa Norte', fone: '(61) 3322-0680', end: 'SCN Qd. 01 Bl. E, Loja 80', bairro: 'Asa Norte, Brasília - DF', cep: '70711-903', q: 'SCN Quadra 1 Bloco E Brasília DF' },
  { t: 'Águas Claras', fone: '(61) 99520-1668', end: 'Av. Flamboyant, Lt. 24, Loja 25', bairro: 'Águas Claras, Brasília - DF', cep: '71917-000', q: 'Avenida Flamboyant lote 24 Águas Claras DF' },
];
const institucional = [
  'A Rodolfo Imóveis é uma empresa que atua no mercado imobiliário no Distrito Federal desde 1993, com grande variedade de opções de imóveis para locação e vendas. A empresa figura na lista das maiores imobiliárias da região.',
  'Visamos prestar o melhor e mais rápido serviço aos nossos clientes, tanto proprietários de imóveis quanto aos clientes que procuram imóveis para locação. Conte conosco.',
];
// Lista "por que a Rodolfo" do código do site atual (bloco comentado, ver LEIA-ME)
const vantagens = [
  ['escudo', 'Mais segurança nas negociações', 'Mais de 30 anos de experiência no mercado imobiliário.'],
  ['usuarios', 'Análise cadastral personalizada', 'Passa pelo crivo do proprietário da imobiliária, o que mantém baixo o índice de inadimplência.'],
  ['livro', 'Contrato e documentação', 'Contrato conforme a legislação vigente e análise criteriosa de toda a documentação para o fechamento da locação.'],
  ['check', 'Vistoria com laudo', 'Laudo descritivo de entrada e saída do locatário e transparência sobre a situação física e jurídica do imóvel.'],
  ['ext', 'Divulgação do seu imóvel', 'No site da Rodolfo Imóveis e nos sites parceiros DF Imóveis e W Imóveis.'],
  ['chave', 'Visitas acompanhadas', 'Nos imóveis mobiliados, quando necessário.'],
  ['painel', 'Área do proprietário', 'Acompanhe a situação do imóvel, os repasses, o extrato do aluguel, o informe de imposto de renda e o IPTU.'],
  ['estrela', 'Assessoria jurídica', 'Especializada em direito imobiliário, sem custo durante a fase de conhecimento do processo, e intermediação de conflitos entre as partes.'],
];
const venda = [
  'Assessoria completa na compra e venda, com consultoria jurídica.',
  'Assistência nos trâmites cartorários e na documentação do imóvel ou pessoal.',
  'Consultoria financeira sobre onde comprar e investir melhor o seu dinheiro.',
];

// ---------- imóveis ----------
const BAIRRO = { 'AGUAS CLARAS': 'Águas Claras', 'AGUAS CLARAS NORTE': 'Águas Claras Norte', 'ASA NORTE': 'Asa Norte', 'ASA SUL': 'Asa Sul', GUARA: 'Guará', 'LUCIO COSTA ( GUARA I )': 'Lúcio Costa (Guará I)', OCTOGONAL: 'Octogonal', 'SAMAMBAIA NORTE': 'Samambaia Norte', SUDOESTE: 'Sudoeste', 'VICENTE PIRES': 'Vicente Pires', 'JARDINS MANGUEIRAL': 'Jardins Mangueiral' };
const TIPO = { APARTAMENTO: 'Apartamento', 'APARTAMENTO MOBILIADO': 'Apartamento mobiliado', 'APARTAMENTO DUPLEX': 'Apartamento duplex', 'SALA COMERCIAL': 'Sala comercial', LOJA: 'Loja', 'CASA CONDOMINIO': 'Casa em condomínio', KITINETE: 'Kitinete' };
const GRUPO = t => /CASA/.test(t) ? 'casas' : /LOJA|SALA/.test(t) ? 'comerciais' : 'apartamentos';
const frase = s => s.toLowerCase().replace(/\s+([,.])/g, '$1').replace(/(^|[.!?]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase())
  .replace(/\b(dce|df|iptu|tv|ss)\b/gi, m => m.toUpperCase()).replace(/m²|m2\b/g, 'm²');
const num = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.'));
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const [cod, ...resto] = x.cab.split(' - ');
  const [cidade, bairro] = (x.local || '').split(' / ').map(s => s.trim());
  let tipo = x.tipo || (x.id === '775' ? 'LOJA' : 'APARTAMENTO'); // 1962 e 775 vêm sem etiqueta no site (ver LEIA-ME)
  const desc = x.desc.replace(/,?\s*JOYCE SANTOS.*$/i, '').trim();
  const a = x.attr;
  return {
    neg: x.tipo_neg, cod: cod.trim(), slug: `imovel/${x.tipo_neg === 'venda' ? 'v' : 'a'}${cod.trim()}`,
    end: resto.join(' - ').replace(/\s+,/g, ',').replace(/\s+/g, ' ').trim(),
    bairro: BAIRRO[bairro] || bairro, cidade: cidade === 'BRASILIA' ? 'Brasília' : (BAIRRO[cidade] || cidade),
    tipo: TIPO[tipo] || tipo, grupo: GRUPO(tipo),
    preco: x.kv.Aluguel || x.kv.Valor, cond: num(x.kv['Condomínio']) > 1 ? x.kv['Condomínio'] : '', iptu: num(x.kv.IPTU) > 1 ? x.kv.IPTU : '',
    quartos: +a.Quartos || 0, suites: +a.Suites || 0, banh: +a.Banheiros || 0, gar: +a.Garagem || 0, dce: +a.DCE || 0,
    andar: +a.Andar || 0, area: a['Área útil'], reaj: a.Reajuste, indice: a['Índice'], prazo: +a.Prazo || 0,
    amen: x.amen, desc: frase(desc), fotos: x.img,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const bairros = [...new Set(imoveis.map(i => i.bairro))];

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'proprietarios', nome: 'Proprietários' }, { slug: 'imobiliaria', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Superquadra', b: 'Eixo' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Karla:wght@400;500;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,200;0,300;0,500;0,700;1,300&family=Libre+Franklin:wght@400;500;600&display=swap',
};
const cores = { a: '#04a14f', b: '#0c1a13' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Rodolfo Imóveis | Aluguel e venda de imóveis em Brasília' : `${titulo} | Rodolfo Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-r" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Rodolfo Imóveis, página inicial"` : ''}>${marcaSvg}<span>Rodolfo Imóveis</span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const semFoto = i => `<div class="sem-foto">${marcaSvg}<span>Fotos sob consulta</span></div>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area.replace(/,00$/, '')} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(i.neg === 'venda' ? E.waVenda : E.waAluguel, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.end}, ${i.bairro}) que vi no site da Rodolfo Imóveis.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(lojas[0].fone)}">${ic('tel')}<span>${lojas[0].fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>Aluguel, venda e administração de imóveis no Distrito Federal desde 1993.</p></div>
    ${lojas.map(l => `<div><h3>Loja ${l.t}</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(l.fone)}">${l.fone}</a></li><li>${ic('pin')}<span>${l.end}<br>${l.bairro}<br>CEP ${l.cep}</span></li></ul></div>`).join('')}
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'proprietarios')}">Anuncie seu imóvel</a></li><li><a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Rodolfo Imóveis. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

// cartão de imóvel (lista) e filtro por tipo (CSS :has, sem JS)
const cartao = (v, i, extra = '') => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? foto(i.fotos[0], `${i.tipo} em ${i.bairro}`) : semFoto(i)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · cód. ${i.cod}</p><h3>${esc(i.end)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>${extra}</div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['comerciais', 'Lojas e salas'], ['casas', 'Casas']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} em ${i.bairro}`;
  const dados = [['Área útil', i.area && `${i.area.replace(/,00$/, '')} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['DCE', i.dce], ['Vagas', i.gar], ['Andar', i.andar || '']].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo}, ${i.end} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto(i)}</div>`;
  return head(v, i.slug, `${i.tipo}, ${i.end}`, `${titulo}: ${i.end}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo} · cód. ${i.cod}</p>
      <h1>${esc(i.end)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, ${i.cidade} - DF</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2><p>${esc(i.desc)}</p>
      ${i.amen.length ? `<h2>No imóvel e no condomínio</h2><ul class="lista-check amen">${i.amen.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      <dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}${i.neg === 'aluguel' && i.prazo ? `<div><dt>Contrato</dt><dd>${i.prazo} meses</dd></div>` : ''}${i.neg === 'aluguel' && i.indice ? `<div><dt>Reajuste</dt><dd>${i.reaj ? `${i.reaj.toLowerCase()}, ` : ''}${i.indice}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(lojas[0].fone)}">${ic('tel')}${lojas[0].fone}</a>
      ${i.neg === 'venda' ? '<p class="pb-nota">Corretora responsável: Joyce Santos, CRECI-DF 30936.</p>' : '<p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>'}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Rodolfo Imóveis.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.waAluguel}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero anunciar meu imóvel</option><option>Sou locatário</option><option>Sou proprietário</option></select></label><label>Bairro de interesse<input name="bairro" placeholder="Asa Norte, Águas Claras..."></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed"></iframe>`;
const lojasBloco = (m = false) => `<div class="lojas">${lojas.map(l => `<article class="loja sobe"><p class="k">Loja</p><h3>${l.t}</h3><p>${ic('pin')}<span>${l.end}<br>${l.bairro}<br>CEP ${l.cep}</span></p><p>${ic('tel')}<a href="${telHref(l.fone)}">${l.fone}</a></p>${m ? mapa(l.q) : ''}</article>`).join('')}</div>`;
const vantLista = () => `<ul class="vants">${vantagens.map(x => `<li class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul>`;
const destaque = (lista, n) => lista.filter(i => i.fotos.length >= 3).slice(0, n);

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar em Brasília: apartamentos, salas comerciais, lojas e casa em condomínio.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis disponíveis para locação`, `Apartamentos, salas e lojas em ${bairros.filter(b => aluguel.some(i => i.bairro === b)).length} bairros do DF. Fale com a loja para visitar.`) + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda em Brasília, com assessoria jurídica e cartorial.`) + topo(v, 'comprar') + cab('À venda', `${vendas.length} imóveis à venda`, 'Assessoria completa na compra, da documentação ao cartório.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<ul class="lista-check venda-lista">${venda.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul></div>
` + rodape(v);
  pag.proprietarios = head(v, 'proprietarios', 'Proprietários', 'Administração de locação com análise cadastral personalizada, vistoria com laudo, assessoria jurídica e área restrita para o proprietário.') + topo(v, 'proprietarios') + cab('Proprietários', 'Coloque seu imóvel para alugar com quem cuida dele há mais de 30 anos', 'Administração completa da locação, do anúncio à vistoria de saída.') + `
<div class="in"><section class="prop-sec">${vantLista()}</section>
<section class="areas"><article><p class="k">Espaço proprietário</p><h2>Siga seu imóvel diariamente</h2><p>Com seu login você vê se o imóvel está para alugar, alugado ou reservado, se o cadastro foi aprovado, quem visitou, quantas visitas, a opinião dos visitantes e os seus últimos repasses.</p><p class="nota">Não recebeu a senha? Peça pelo e-mail <a href="mailto:${E.ouvidoria}">${E.ouvidoria}</a>. Você pode trocar a senha depois do primeiro login.</p><a class="btn" href="${E.antigo}" target="_blank" rel="noopener">Entrar no espaço proprietário</a></article>
<article><p class="k">Espaço locatário</p><h2>Cadastro eletrônico e área do locatário</h2><p>Para alugar um dos nossos imóveis, preencha o cadastro eletrônico. Quem já é locatário acessa a área reservada com a senha recebida da imobiliária.</p><p class="bts"><a class="btn" href="${E.antigo}cadastros/" target="_blank" rel="noopener">Cadastro eletrônico</a><a class="btn btn-linha" href="${E.antigo}" target="_blank" rel="noopener">Área do locatário</a></p></article></section>
<section class="anuncie"><div><p class="k">Anuncie</p><h2>Quer alugar ou vender seu imóvel?</h2><p>Conte onde ele fica e a loja entra em contato.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Rodolfo Imóveis.')}</section></div>
` + rodape(v);
  pag.imobiliaria = head(v, 'imobiliaria', 'A imobiliária', institucional[0]) + topo(v, 'imobiliaria') + cab('A imobiliária', 'No mercado imobiliário do Distrito Federal desde 1993', 'Lojas na Asa Norte e em Águas Claras.') + `
<div class="in"><section class="inst">${institucional.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
<section class="inst-num"><ul class="numeros"><li><b>1993</b><span>no mercado do DF</span></li><li><b>${aluguel.length}</b><span>imóveis para alugar hoje</span></li><li><b>${vendas.length}</b><span>imóveis à venda</span></li><li><b>2</b><span>lojas: Asa Norte e Águas Claras</span></li></ul></section>
<section><header class="tit"><p class="k">Lojas</p><h2>Venha conversar com a gente</h2></header>${lojasBloco(true)}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Rodolfo Imóveis: ${lojas[0].fone} (Asa Norte), ${lojas[1].fone} (Águas Claras), ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Rodolfo Imóveis', 'Escreva pelo formulário ou ligue para a loja mais perto de você.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div><ul class="contato-lista"><li>${ic('mail')}<div><strong>Locação</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('usuarios')}<div><strong>Ouvidoria</strong><a href="mailto:${E.ouvidoria}">${E.ouvidoria}</a></div></li></ul>${lojasBloco()}</div></section>
<section class="mapas">${lojas.map(l => mapa(l.q)).join('')}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = aluguel.find(i => i.cod === '480').fotos[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Brasília · desde 1993</p><h1>Seu próximo endereço no <em>Plano Piloto</em>, em Águas Claras ou no Guará.</h1><p>${E.curto}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capa, 'Bloco residencial com pilotis e gramado em superquadra da Asa Norte', ' loading="eager" fetchpriority="high"')}<figcaption>SQN 415, Asa Norte</figcaption></figure>
</div></section>
<section class="cobogo"><div class="in bairros-a"><p class="k">Onde estão os imóveis</p><ul>${bairros.map(b => `<li>${b} <small>${imoveis.filter(i => i.bairro === b).length}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Disponíveis para locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${destaque(aluguel, 8).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${destaque(vendas, 3).map(i => cartao(v, i)).join('')}</ul></section>
<section class="prop-a"><div class="in prop-a-in"><div><p class="k">Para proprietários</p><h2>Mais de 30 anos administrando locações no DF</h2><p>Análise cadastral feita pelo próprio dono da imobiliária, vistoria com laudo, assessoria jurídica e uma área onde você acompanha seu imóvel e seus repasses.</p><a class="btn" href="${link(v, 'proprietarios')}">Anunciar meu imóvel</a></div><ul class="lista-check">${vantagens.slice(1, 6).map(x => `<li>${ic('check')}<span><b>${x[1]}.</b> ${x[2]}</span></li>`).join('')}</ul></div></section>
<section class="in lojas-a"><header class="tit"><p class="k">Lojas</p><h2>Asa Norte e Águas Claras</h2></header>${lojasBloco()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = aluguel.find(i => i.cod === '604').fotos[0];
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-end"><b>${esc(i.end)}</b><small>${i.tipo} · ${i.bairro}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${i.preco}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Prédio residencial entre palmeiras na SQN 112, Asa Norte', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Rodolfo Imóveis · Brasília · DF</p><h1>Alugar e comprar em Brasília, <span>com quem está aqui desde 1993.</span></h1><p class="bts"><a class="btn" href="${link(v, 'alugar')}">Imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'comprar')}">Imóveis à venda</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1993</b><span>desde</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${vendas.length}</b><span>à venda</span></li><li><b>${bairros.length}</b><span>bairros</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Índice de imóveis</p><h2>Para alugar agora</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos ${ic('seta')}</a></header><ol class="linhas">${aluguel.slice(0, 10).map(linha).join('')}</ol></section>
<section class="venda-b"><div class="in"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Imóveis para comprar</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${destaque(vendas, 4).map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in prop-b"><header class="tit"><p class="k">Proprietários</p><h2>Por que deixar seu imóvel com a Rodolfo</h2></header>${vantLista()}<p class="bts"><a class="btn" href="${link(v, 'proprietarios')}">Anunciar meu imóvel</a></p></section>
<section class="lojas-b"><div class="in"><header class="tit"><p class="k">Lojas</p><h2>Asa Norte e Águas Claras</h2></header>${lojasBloco(true)}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waAluguel);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Rodolfo Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#04a14f', fundo: '#0c1a13', claro: '#eef6f0',
  fonteTitulo: 'Raleway,system-ui,sans-serif', fonteTexto: 'Karla,system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no verde do logo, com um fundo de cobogó e a escolha "alugar ou comprar" logo na abertura.', pontos: [`Os ${imoveis.length} imóveis do site com fotos, valores e ficha completa`, 'Filtro por apartamentos, lojas e salas', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, com foto em tela cheia e os imóveis listados como um índice: código, endereço, tamanho e valor.', pontos: ['Endereços de Brasília em destaque', 'Página para proprietários com o que a imobiliária oferece', 'Duas lojas com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
