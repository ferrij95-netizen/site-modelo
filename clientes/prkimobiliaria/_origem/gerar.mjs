// PRK Imobiliária (Tarumã, Curitiba/PR, CRECI J 5920). Gera public/{a,b}/ e a página de escolha.
// node clientes/prkimobiliaria/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs prkimobiliaria http://prkimobiliaria.com.br/)
// Imóveis próprios: imoveis.json, tirado em 05/11/2026 de imoveis.php?v=1 / v=2 + imovel.php?id=..&tipo=0 (9 de aluguel e 7 à venda, todos; até 5 fotos).
// Lançamentos: lancamentos.json, os 320 itens "tipo=1" da lista de venda (vêm do Órulo), agrupados em 79 empreendimentos, sem fotos.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'PRK Imobiliária', url: 'https://prkimobiliaria.overtus.com.br/', antigo: 'http://prkimobiliaria.com.br/',
  wa: '5541992800636', fone: '(41) 99280-0636', email: 'contato@prkimobiliaria.com.br', creci: 'CRECI J 5920',
  end: 'Rua Guilherme Tragante, 386, Sala 01', bairro: 'Tarumã, Curitiba - PR', cep: '82800-090', mapa: 'Rua Guilherme Tragante 386 Tarumã Curitiba PR',
  credpago: 'https://credpago.com/simulador/?id=a81a0dbba8bb71cf10d74dbb46a97848927268f2',
  curto: 'Compra, venda e locação de imóveis em Curitiba, com consultoria imobiliária e financeira: avaliação, Built to Suit, Sale Leaseback e carteira de imóveis para renda.',
};
const empresa = [
  'Há mais de 25 anos no mercado imobiliário, o grupo PRK atende as necessidades no segmento de compra, venda e locação de imóveis.',
  'O grupo PRK conta com experiência de 30 anos no mercado financeiro levando soluções para quem busca investir o seu capital e obter bons rendimentos.',
];
// Textos de solucoes.php (só ajustes de pontuação)
const solucoes = [
  { id: 'built-to-suit', curto: 'Imóvel construído ou reformado sob medida para a sua empresa, em locação de longo prazo.', t: 'Built to Suit', ic: 'fabrica', p: ['Built to suit, ou "construir sob encomenda" (Lei 12.744/2012, locação nos contratos de construção ajustada), é usado por empresas que precisam de um imóvel específico para a sua atividade e não querem alocar capital fora do seu core business.', 'Para isso, fazem um contrato de locação, normalmente de longo prazo, com investidores dispostos a aplicar recursos na construção ou reforma do imóvel para atender essa demanda, recebendo o aluguel a um preço determinado.'] },
  { id: 'compra-e-venda', curto: 'Da análise da documentação à proposta e ao contrato de venda.', t: 'Compra e venda de imóveis', ic: 'casa', p: ['A PRK Imobiliária procura levar a melhor solução imobiliária conforme a demanda apresentada pelo cliente.', 'A negociação é acompanhada até a assinatura do contrato, com todos os trâmites legais: análise da documentação do imóvel, gerenciamento da transação imobiliária, elaboração da proposta e do contrato de venda.'] },
  { id: 'sale-leaseback', curto: 'Venda do imóvel com locação ao antigo proprietário: gera caixa para a empresa.', t: 'Sale Leaseback', ic: 'chave', p: ['Sale Leaseback é a venda do imóvel com a locação do mesmo ao antigo proprietário. A operação tem pelo menos 3 vantagens imediatas:'], lista: ['Financeira: gera caixa para a empresa fazer investimentos.', 'Desmobilização de ativos: a empresa pode alocar capital no seu core business, o principal objetivo do negócio.', 'Tributária: reduz o ativo imobilizado no balanço, assumindo uma despesa operacional que gera ganhos fiscais.'] },
  { id: 'avaliacoes', curto: 'Parecer técnico (PTAM) conforme a ABNT NBR 14653 e vistorias de locação.', t: 'Avaliações', ic: 'medidor', p: ['Na compra e venda de imóveis prestamos consultoria de "Parecer Opinativo de Comercialização Imobiliária" e também "Parecer Técnico de Avaliação Mercadológica" (PTAM), pelos métodos da Renda, Evolutivo, Involutivo e Comparativo, conforme a norma ABNT NBR 14653.', 'Na locação, as vistorias são feitas em duas partes: a primeira quando o imóvel é captado, para registrar as reais condições do imóvel, e a segunda na desocupação, na presença do inquilino, comparando o estado do imóvel com a vistoria inicial conforme as cláusulas do contrato.'] },
  { id: 'administracao', curto: 'Carteira de imóveis para renda, com menos custo e mais rentabilidade.', t: 'Administração e locação', ic: 'painel', p: ['A PRK representa seus interesses na administração e na construção de carteira imobiliária, com uma consultoria completa que busca a redução de custos e a melhor rentabilidade de acordo com o perfil de cada investidor, e ajusta o melhor imóvel à demanda do locatário.'] },
];
// Lista da página Empresa do site atual
const consultoria = {
  imob: ['Built to Suit', 'Aquisição de casa própria', 'Aquisição de imóvel comercial', 'Locação de imóveis em geral', 'Consórcio imobiliário'],
  fin: ['Formação de carteira para renda de aluguel', 'Sale Leaseback'],
};
const bancos = [
  ['Itaú', 'https://ww3.itau.com.br/imobline/pre/simuladores_new/index.aspx?IDENT_bkl=pre&IMOB_tipobkl='],
  ['Santander', 'http://www.santander.com.br/portal/wps/script/templates/GCMRequest.do?page=5516'],
  ['Banco do Brasil', 'http://www.bb.com.br/portalbb/home24,116,2117,1,1,1,1.bb?codigoMenu=172&codigoRet=184&bread=5'],
  ['Bradesco', 'http://www.bradescoimoveis.com.br/'],
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso'],
];

// ---------- imóveis próprios ----------
// título curto e bairro escritos a partir do título em caixa alta de cada anúncio
const META = {
  175: ['Apartamento 1 quarto no Ed. Loft One', 'Prado Velho', 'Curitiba'],
  208: ['Studio mobiliado no Ed. Vision', 'Prado Velho', 'Curitiba'],
  249: ['Apartamento 1 quarto mobiliado', 'Prado Velho', 'Curitiba'],
  346: ['Studio mobiliado perto da PUC', 'Prado Velho', 'Curitiba'],
  371: ['Apartamento 1 quarto mobiliado no Ed. New Life', 'Centro', 'Curitiba'],
  416: ['Apartamento 1 quarto mobiliado perto da PUC', 'Rebouças', 'Curitiba'],
  417: ['Apartamento 1 quarto mobiliado', 'Cristo Rei', 'Curitiba'],
  418: ['Studio mobiliado', 'Batel', 'Curitiba'],
  425: ['Apartamento 2 quartos mobiliado com vaga', 'Jardim Botânico', 'Curitiba'],
  374: ['Apartamento 2 quartos reformado', 'Centro', 'Curitiba'],
  400: ['Casa térrea 4 quartos no Jardim La Fiori', 'Uvaranas', 'Ponta Grossa'],
  422: ['Casa colonial em terreno de 689 m²', 'Tarumã', 'Curitiba'],
  423: ['Apartamento 3 quartos mobiliado', 'Cristo Rei', 'Curitiba'],
  424: ['Terreno de 391 m² em ZR4', 'Portão', 'Curitiba'],
  426: ['Sobrado triplex 3 quartos', 'Tarumã', 'Curitiba'],
  427: ['Sobrado 3 quartos', 'Tarumã', 'Curitiba'],
};
const GRUPO = { Apartamento: 'apartamentos', Casa: 'casas', Terreno: 'terrenos' };
const preco = p => p.replace(/R\$ (\d)(\d{3})\.000,00/, 'R$ $1.$2.000,00'); // "R$ 1650.000,00" no site atual
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const [titulo, bairro, cidade] = META[x.ref];
  const paras = x.desc.flatMap(p => p.split(/\n+/)).map(s => s.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim()).filter(s => s && s !== '-');
  const area = (x.info['Área Total'] || '').replace(' m²', '');
  return {
    ...x, cod: x.ref, slug: `imovel/${x.neg === 'venda' ? 'v' : 'a'}${x.ref}`, titulo, bairro, cidade, grupo: GRUPO[x.tipo] || 'apartamentos',
    preco: preco(x.preco), area, quartos: +x.info.Quartos || 0, banh: +x.info.Banheiros || 0, gar: +x.info['Vagas na Garagem'] || 0, paras,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const LANC = JSON.parse(fs.readFileSync(path.join(aqui, 'lancamentos.json'), 'utf8'));
const unidades = LANC.reduce((s, l) => s + l.n, 0);
const reais = n => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const m2 = n => n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'lancamentos', nome: 'Lançamentos' }, { slug: 'solucoes', nome: 'Soluções' }, { slug: 'empresa', nome: 'A PRK' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Perspectiva', b: 'Patrimônio' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap',
};
const cores = { a: '#592121', b: '#1f1414' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'PRK Imobiliária | Compra, venda e locação em Curitiba' : `${titulo} | PRK Imobiliária`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-p" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="PRK Imobiliária, página inicial"` : ''}>${marcaSvg}<span>PRK <i>Imobiliária</i></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel ref. ${i.cod} (${i.titulo}, ${i.bairro}) que vi no site da PRK Imobiliária.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${waHref(E.wa, 'Olá! Vim pelo site da PRK Imobiliária.')}" target="_blank" rel="noopener">${icWa()}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>Compra, venda e locação de imóveis, com consultoria imobiliária e financeira. ${E.creci}.</p></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'lancamentos')}">Lançamentos (${LANC.length})</a></li><li><a href="${link(v, 'solucoes')}#vender">Vender meu imóvel</a></li></ul></div>
    <div><h3>Consultoria</h3><ul>${solucoes.map(s => `<li><a href="${link(v, 'solucoes')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados"><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} PRK Imobiliária · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.titulo}, ${i.bairro}`)}<span class="card-tipo">${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro}, ${i.cidade} · ref. ${i.cod}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['casas', 'Casas'], ['terrenos', 'Terrenos']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  ${grupos.length > 2 ? `<fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>` : ''}
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};
// parágrafos da descrição: "Localização - ...", "Anúncio - ..." viram rótulo + texto; linhas "- item" viram lista
function descricao(i) {
  let h = '', lista = [];
  const fecha = () => { if (lista.length) { h += `<ul class="lista-check desc-lista">${lista.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`; lista = []; } };
  for (const p of i.paras) {
    if (/^-\s*/.test(p) || (i.cod === '422' && p.length < 48 && !/[.!]$/.test(p) && !/:$/.test(p))) { lista.push(p.replace(/^-\s*/, '')); continue; }
    fecha();
    const m = p.match(/^(Localização|Anúncio|Estrutura do prédio|Estrutura do Prédio|Estrutura|Prédio|Construção)\s*[-:]\s*(.*)$/);
    if (m) h += `<p><b class="rot">${m[1].replace('Estrutura do Prédio', 'Estrutura do prédio')}</b> ${esc(m[2])}</p>`;
    else if (/:$/.test(p)) h += `<p><b class="rot">${esc(p.replace(/:$/, ''))}</b></p>`;
    else h += `<p>${esc(p)}</p>`;
  }
  fecha();
  return h;
}

function ficha(v, i) {
  const neg = i.neg === 'aluguel' ? 'para alugar' : 'à venda';
  const dados = [['Área total', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Banheiros', i.banh], ['Vagas', i.neg === 'aluguel' || i.gar ? i.gar : '']].filter(d => d[1] !== '' && d[1] !== undefined && !(d[0] === 'Quartos' && !d[1]) && !(d[0] === 'Banheiros' && !d[1]));
  const leg = n => (i.legendas[n] || '').trim() || `foto ${n + 1}`;
  return head(v, i.slug, `${i.titulo}, ${i.bairro}`, `${i.titulo} ${neg} em ${i.bairro}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, i.neg === 'aluguel' ? 'alugar' : 'comprar') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, i.neg === 'aluguel' ? 'alugar' : 'comprar')}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  <div class="galeria g${i.fotos.length}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo}: ${leg(n)}`)}" class="g-${n}">${foto(f, `${i.titulo}, ${leg(n)}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  ${i.total_fotos > i.fotos.length ? `<p class="mais-fotos">${ic('check')}O anúncio tem ${i.total_fotos} fotos; aqui estão ${i.fotos.length}. Peça as demais pelo WhatsApp.</p>` : ''}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.tipo} ${neg} · ref. ${i.cod}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, ${i.cidade} - PR</p>
      <p class="preco-m"><b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre o imóvel</h2>
      <div class="desc">${descricao(i)}</div>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel com bonificação' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</p>
      ${i.neg === 'aluguel' ? '<p class="pb-nota">Condomínio, IPTU, seguro e FCI estão na descrição do imóvel.</p>' : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent(`Imóvel ref. ${i.cod}`)}">${ic('mail')}Escrever por e-mail</a>
      ${i.neg === 'aluguel' ? `<a class="pb-link" href="${E.credpago}" target="_blank" rel="noopener">${ic('ext')}Simular a locação sem fiador (CredPago)</a>` : `<a class="pb-link" href="${link(v, 'solucoes')}#simuladores">${ic('ext')}Simular o financiamento</a>`}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da PRK Imobiliária.', vender = false) => `<form class="form" data-wa="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  ${vender ? `<div class="form-duas"><label>Tipo do imóvel<select name="tipo"><option>Apartamento</option><option>Casa ou sobrado</option><option>Terreno</option><option>Sala ou loja</option><option>Barracão</option></select></label><label>Bairro e cidade<input name="local" required placeholder="Tarumã, Curitiba"></label></div>
  <label>Quero<select name="quero"><option>Vender</option><option>Alugar</option><option>Avaliar (PTAM)</option></select></label>` : `<label>Assunto<select name="assunto"><option>Quero comprar</option><option>Quero alugar</option><option>Quero vender ou alugar meu imóvel</option><option>Consultoria: Built to Suit ou Sale Leaseback</option><option>Avaliação de imóvel</option></select></label>`}
  <label>Mensagem<textarea name="mensagem" rows="4"${vender ? '' : ' required'}></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da PRK" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=15&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista"><li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.fone}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></div></li><li>${ic('escudo')}<div><strong>Registro</strong><span>${E.creci}</span></div></li></ul>`;
const solBloco = s => `<article class="sol sobe" id="${s.id}">${ic(s.ic)}<div><h2>${s.t}</h2>${s.p.map(p => `<p>${p}</p>`).join('')}${s.lista ? `<ol class="sol-lista">${s.lista.map(t => `<li>${t}</li>`).join('')}</ol>` : ''}</div></article>`;
const lancLinha = l => `<tr><th scope="row">${esc(l.nome)}${l.breve ? ' <small>breve lançamento</small>' : ''}</th><td>${l.tipos.join(', ')}</td><td>${l.amin ? (l.amin === l.amax ? `${m2(l.amin)} m²` : `${m2(l.amin)}–${m2(l.amax)} m²`) : ''}</td><td>${l.pmin ? reais(l.pmin) : 'sob consulta'}</td></tr>`;

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda em Curitiba e Ponta Grossa: casas e sobrados no Tarumã, apartamentos e terreno.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda', `Casas e sobrados no Tarumã, apartamentos no Centro e no Cristo Rei, terreno no Portão e uma casa em Ponta Grossa. Procura imóvel novo? Veja os <a href="${link(v, 'lancamentos')}">${LANC.length} lançamentos</a>.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}
<aside class="faixa-sim"><div><h2>Vai financiar?</h2><p>Simule nos bancos antes da visita.</p></div><ul>${bancos.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener">${b[0]}${ic('ext')}</a></li>`).join('')}</ul></aside></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} apartamentos para alugar em Curitiba, a maioria mobiliados perto da PUC, no Prado Velho, Rebouças, Batel e Jardim Botânico.`) + topo(v, 'alugar') + cab('Para alugar', 'Apartamentos para alugar', 'Quase todos mobiliados, perto da PUC, no Centro, Batel, Cristo Rei e Jardim Botânico. Bons para estudantes e para quem chega a Curitiba.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}
<aside class="faixa-sim"><div><h2>Aluguel sem fiador</h2><p>A PRK trabalha com CredPago. Simule a sua locação antes de escolher.</p></div><p><a class="btn" href="${E.credpago}" target="_blank" rel="noopener">Simular com CredPago ${ic('ext')}</a></p></aside></div>
` + rodape(v);
  pag.lancamentos = head(v, 'lancamentos', 'Lançamentos em Curitiba', `${LANC.length} empreendimentos novos em Curitiba e região, com ${unidades} plantas: tipos, metragens e valores a partir de.`) + topo(v, 'lancamentos') + cab('Lançamentos', `${LANC.length} empreendimentos novos em Curitiba`, `${unidades} plantas de construtoras parceiras, de studios a coberturas. Preço e disponibilidade sujeitos a alteração sem aviso; a PRK confirma tudo antes da visita.`) + `
<div class="in lanc-pag"><div class="tabela-rola"><table class="lanc"><thead><tr><th scope="col">Empreendimento</th><th scope="col">Plantas</th><th scope="col">Área</th><th scope="col">A partir de</th></tr></thead><tbody>${LANC.map(lancLinha).join('')}</tbody></table></div>
<p class="lanc-cta"><a class="btn" href="${waHref(E.wa, 'Olá! Quero saber mais sobre um lançamento que vi no site da PRK.')}" target="_blank" rel="noopener">${icWa()}Pedir o material de um lançamento</a></p></div>
` + rodape(v);
  pag.solucoes = head(v, 'solucoes', 'Soluções imobiliárias', 'Built to Suit, Sale Leaseback, avaliação (PTAM, ABNT NBR 14653), compra e venda, administração e carteira de imóveis para renda.') + topo(v, 'solucoes') + cab('Soluções imobiliárias', 'Consultoria imobiliária e financeira', 'Para empresas que precisam de um imóvel sob medida ou querem transformar imóvel em caixa, e para quem quer investir em imóveis para renda.') + `
<div class="in sol-pag">${solucoes.map(solBloco).join('')}
<section class="sim" id="simuladores"><header class="tit"><p class="k">Simuladores</p><h2>Financiamento e locação</h2></header><div class="sim-grade"><div><h3>Financiamento imobiliário</h3><ul class="bancos">${bancos.map(b => `<li><a href="${b[1]}" target="_blank" rel="noopener">${b[0]}${ic('ext')}</a></li>`).join('')}</ul></div><div><h3>Locação sem fiador</h3><p>Simule com a CredPago, parceira da PRK.</p><a class="btn btn-linha" href="${E.credpago}" target="_blank" rel="noopener">Simulador CredPago ${ic('ext')}</a></div></div></section>
<section class="vender" id="vender"><div><p class="k">Quero vender</p><h2>Nós vendemos o seu imóvel</h2><p>Com compromisso de transparência e confiança, a PRK avalia e negocia o seu imóvel. Conte o que você tem e um corretor entra em contato para fazer a avaliação.</p></div>${formulario('Olá! Quero vender ou alugar meu imóvel com a PRK.', true)}</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A PRK', empresa.join(' ')) + topo(v, 'empresa') + cab('A PRK', 'Imobiliária com experiência no mercado financeiro', 'Escritório no Tarumã, em Curitiba.') + `
<div class="in emp-pag"><section class="emp-duas"><article><p class="k">Mercado imobiliário</p><p class="lead">${empresa[0]}</p></article><article><p class="k">Mercado financeiro</p><p class="lead">${empresa[1]}</p></article></section>
<section class="emp-cons"><div><h2>Consultoria imobiliária</h2><ul class="lista-check">${consultoria.imob.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul></div><div><h2>Consultoria financeira</h2><ul class="lista-check">${consultoria.fin.map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'solucoes')}">Como funciona cada uma ${ic('seta')}</a></div></section>
<section class="emp-esc"><div>${contatoLista()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a PRK Imobiliária: ${E.fone} (WhatsApp), ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a PRK', 'Pelo WhatsApp a resposta é mais rápida. Se preferir, escreva pelo formulário.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapa()}</div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const capaA = imoveis.find(i => i.cod === '422').fotos[1];
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div>${marcaSvg.replace('class="marca-p"', 'class="cab-marca"')}</section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Curitiba · ${E.creci}</p><h1>Comprar, alugar ou investir em imóvel, <em>com quem também entende de dinheiro.</em></h1><p>Mais de 25 anos no mercado imobiliário e 30 no mercado financeiro. Imóveis à venda e para alugar em Curitiba e consultoria para empresas e investidores.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis + ${LANC.length} lançamentos</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} apartamentos</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'solucoes')}#vender"><span>Quero vender</span><b>Avaliação do imóvel</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${foto(capaA, 'Casa em estilo colonial com arcos e jardim no Tarumã, Curitiba', ' loading="eager" fetchpriority="high"')}<figcaption>Casa colonial no Tarumã, ref. 422</figcaption></figure>
</div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Casas, apartamentos e terreno</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${['426', '422', '423', '427'].map(c => cartao(v, imoveis.find(i => i.cod === c))).join('')}</ul></section>
<section class="faixa-a"><div class="in faixa-a-in"><div><p class="k">Para alugar</p><h2>Apartamentos mobiliados perto da PUC, no Centro e no Batel</h2><p>De ${aluguel.map(i => i.preco).sort()[0]} a ${aluguel.map(i => i.preco).sort().at(-1)} por mês, com aluguel sem fiador pela CredPago.</p><a class="btn" href="${link(v, 'alugar')}">Ver os ${aluguel.length} apartamentos</a></div><ul class="mini">${['371', '418', '425', '417'].map(c => aluguel.find(i => i.cod === c)).map(i => `<li><a href="${link(v, i.slug)}">${foto(i.fotos[0], `${i.titulo}, ${i.bairro}`)}<span><b>${i.bairro}</b>${i.preco}/mês</span></a></li>`).join('')}</ul></div></section>
<section class="in sol-a"><header class="tit"><p class="k">Consultoria imobiliária e financeira</p><h2>Para empresas e investidores</h2></header><ul class="sol-cards">${solucoes.map(s => `<li class="sobe"><a href="${link(v, 'solucoes')}#${s.id}">${ic(s.ic)}<h3>${s.t}</h3><p>${s.curto}</p></a></li>`).join('')}</ul></section>
<section class="lanc-a"><div class="in lanc-a-in"><div><p class="k">Lançamentos</p><h2>${LANC.length} empreendimentos novos em Curitiba</h2><p>${unidades} plantas, de studios de ${m2(Math.min(...LANC.filter(l => l.amin).map(l => l.amin)))} m² a coberturas. A PRK apresenta e acompanha a compra.</p><a class="link-seta" href="${link(v, 'lancamentos')}">Ver a lista ${ic('seta')}</a></div><ul class="lanc-nomes">${LANC.slice(0, 18).map(l => `<li>${esc(l.nome)}</li>`).join('')}<li>e mais ${LANC.length - 18}</li></ul></div></section>
<section class="in contato-a"><div><p class="k">Escritório</p><h2>Tarumã, Curitiba</h2>${contatoLista()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

const capaB = imoveis.find(i => i.cod === '426').fotos[0];
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-end"><b>${esc(i.titulo)}</b><small>${i.bairro}, ${i.cidade}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${i.preco}${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">PRK Imobiliária · Curitiba</p><h1>Imóvel é patrimônio. <span>Trate com quem tem 30 anos de mercado financeiro.</span></h1><p>Compra, venda e locação em Curitiba, e consultoria para empresas e investidores: Built to Suit, Sale Leaseback, avaliação técnica e carteira de imóveis para renda.</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'solucoes')}">Consultoria</a></p></div>
  <figure class="hero-b-foto">${foto(capaB, 'Sala de estar do sobrado triplex à venda no Tarumã', ' loading="eager" fetchpriority="high"')}<figcaption><span>ref. 426 · Tarumã</span><b>${imoveis.find(i => i.cod === '426').preco}</b></figcaption></figure>
</div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>25+</b><span>anos no mercado imobiliário</span></li><li><b>30</b><span>anos no mercado financeiro</span></li><li><b>${imoveis.length}</b><span>imóveis próprios na carteira</span></li><li><b>${LANC.length}</b><span>lançamentos parceiros</span></li></ul></div></section>
<section class="in sol-b"><header class="tit"><p class="k">Consultoria</p><h2>O que a PRK resolve para empresas e investidores</h2></header><ol class="sol-num">${solucoes.map(s => `<li class="sobe"><a href="${link(v, 'solucoes')}#${s.id}"><h3>${s.t}</h3><p>${s.curto}</p>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="carteira-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Carteira</p><h2>À venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Com fotos ${ic('seta')}</a></header><ol class="linhas">${vendas.map(linha).join('')}</ol>
<header class="tit tit-linha"><div><p class="k">Carteira</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos ${ic('seta')}</a></header><ol class="linhas">${aluguel.map(linha).join('')}</ol></div></section>
<section class="in lanc-b"><header class="tit tit-linha"><div><p class="k">Lançamentos</p><h2>Na planta e prontos para morar</h2></div><a class="link-seta" href="${link(v, 'lancamentos')}">Os ${LANC.length} empreendimentos ${ic('seta')}</a></header><div class="tabela-rola"><table class="lanc"><thead><tr><th scope="col">Empreendimento</th><th scope="col">Plantas</th><th scope="col">Área</th><th scope="col">A partir de</th></tr></thead><tbody>${LANC.filter(l => l.pmin).slice(0, 8).map(lancLinha).join('')}</tbody></table></div></section>
<section class="vender-b"><div class="in vender-b-in"><div><p class="k">Quero vender</p><h2>Avaliação com parecer técnico</h2><p>PTAM pelos métodos da Renda, Evolutivo, Involutivo e Comparativo, conforme a ABNT NBR 14653. Depois, a PRK negocia a venda.</p></div><a class="btn" href="${link(v, 'solucoes')}#vender">Avaliar meu imóvel</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'PRK Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#d95052', fundo: '#592121', claro: '#f3f3f2',
  fonteTitulo: '"Noto Serif",Georgia,serif', fonteTexto: '"Hanken Grotesk",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + imoveis.length, texto: 'Clara, no vinho e no vermelho do logo, com as faixas em perspectiva do símbolo e a escolha comprar, alugar ou vender na abertura.', pontos: [`Os ${imoveis.length} imóveis próprios com fotos e ficha`, `${LANC.length} lançamentos em uma lista só`, 'Consultoria (Built to Suit, Sale Leaseback, PTAM) explicada'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + imoveis.length, texto: 'Escura, para quem investe: a consultoria vem primeiro e a carteira de imóveis aparece como um índice com referência e valor.', pontos: ['Números da PRK em destaque', 'Carteira à venda e para alugar em lista', 'Pedido de avaliação técnica do imóvel'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
