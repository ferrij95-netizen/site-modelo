// Transportadora Pérola Ltda. (Curitiba/PR, desde 1960). Gera public/{a,b}/ e a página de escolha.
// node clientes/transportadoraperola/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs transportadoraperola http://transportadoraperola.com.br/)
// Conteúdo do site atual (PHP + sistema SSW): filiais, telefones, campos da cotação, rastreamento SSW. Única foto real: a sede, recortada do banner.
// Logo redesenhado em SVG a partir do banner (o original só existe pequeno, dentro da imagem do topo).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Transportadora Pérola', url: 'https://transportadoraperola.overtus.com.br/', antigo: 'http://transportadoraperola.com.br/',
  wa: '5541991782255', fwa: '(41) 99178-2255', fone: '(41) 3333-6455', email: 'contato@transportadoraperola.com.br',
  curto: 'Transporte rodoviário de cargas desde 1960, com matriz em Curitiba e filiais em Maringá e Londrina.',
};
const filiais = [
  { c: 'Curitiba', uf: 'PR', tag: 'Matriz', end: 'R. Jackson Figueiredo, 119, Parolin', cep: '81030-050', fone: '(41) 3333-6455', wa: ['5541991782255', '(41) 99178-2255'], q: 'Rua Jackson Figueiredo 119 Parolin Curitiba PR' },
  { c: 'Maringá', uf: 'PR', tag: 'Filial', end: 'Rua Pioneiro Bonifácio Rosa, 680, Zona 22', cep: '87062-400', fone: '(44) 3224-3233', wa: ['5544997641300', '(44) 99764-1300'], q: 'Rua Pioneiro Bonifácio Rosa 680 Maringá PR' },
  { c: 'Londrina', uf: 'PR', tag: 'Filial', end: 'Rua das Indústrias, 435, Cidadela', cep: '86072-100', fone: '', wa: ['5543998380125', '(43) 99838-0125'], q: 'Rua das Indústrias 435 Londrina PR' },
];
const ssw = {
  rastreio: 'http://www.ssw.inf.br/ssw_resultSSW.asp',
  coleta: 'http://ssw.inf.br/coleta.asp?sigla_emp=PRL&sc=N',
  areas: 'http://ssw.inf.br/areas.asp?sc=N&sigla_emp=PRL',
};
const servicos = [
  { t: 'Rastreamento', d: 'Acompanhe sua carga pelo número da nota fiscal e o CNPJ do remetente.', i: 'pin', href: v => `${link(v, 'servicos')}#rastreamento` },
  { t: 'Coletas', d: 'Solicite a coleta da sua mercadoria pelo sistema on-line.', i: 'caminhao', href: () => ssw.coleta, ext: true },
  { t: 'Área de atuação', d: 'Consulte as cidades atendidas, endereços, telefones e prazos de entrega.', i: 'pacote', href: () => ssw.areas, ext: true },
  { t: 'Cotação de frete', d: 'Informe origem, destino e as medidas da mercadoria e receba a cotação.', i: 'calendario', href: v => link(v, 'cotacao') },
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Rastreio e coletas' }, { slug: 'filiais', nome: 'Filiais' }, { slug: 'cotacao', nome: 'Cotação' }, { slug: 'contato', nome: 'Fale conosco' }];
export const nomesVersao = { a: 'Rota', b: 'Pérola Negra' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Chivo:ital,wght@0,700;0,800;0,900;1,800;1,900&family=Work+Sans:wght@400;500;600&family=Teko:wght@500;600;700&display=swap';
const img = (n, a = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Transportadora Pérola.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#c8102e', b: '#111111' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Transportadora Pérola | Transporte de cargas desde 1960' : `${titulo} | Transportadora Pérola`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (claro = false) => `<svg class="tp" viewBox="0 0 110 26" aria-hidden="true"><g fill="${claro ? '#fff' : '#111'}"><rect x="2" y="3" width="38" height="2"/><rect x="8" y="8" width="32" height="2"/><rect x="14" y="13" width="26" height="2"/><rect x="20" y="18" width="20" height="2"/><rect x="30" y="0" width="34" height="6"/><rect x="40" y="0" width="14" height="26"/><rect x="62" y="0" width="46" height="12"/></g><circle cx="76" cy="14" r="10" fill="#c8102e"/><rect x="62" y="11" width="28" height="2" fill="${claro ? '#fff' : '#111'}"/></svg>`;
const logo = claro => `<span class="logo">${marca(claro)}<span class="logo-txt"><b>Transportadora</b><b>Pérola</b></span></span>`;

const rastreio = () => `<form class="form rastreio" action="${ssw.rastreio}" method="post" target="_blank">
  <label>Notas fiscais<textarea name="NR" rows="2" required placeholder="Uma ou mais notas, separadas por espaço"></textarea></label>
  <label>CNPJ do remetente<input name="cnpj" inputmode="numeric" maxlength="14" required placeholder="Somente números"></label>
  <input type="hidden" name="urlori" value="http://www.transportadoraperola.com.br">
  <button class="btn" type="submit">${ic('pin')}Rastrear carga</button>
  <p class="form-nota">Consulta feita no sistema SSW, em nova aba.</p>
</form>`;
const cotacaoForm = () => `<form class="form" data-wa>
  <fieldset><legend>Solicitante</legend>
  <div class="form-duas"><label>Nome comercial<input name="empresa" required autocomplete="organization"></label><label>CNPJ<input name="cnpj" inputmode="numeric"></label></div>
  <div class="form-duas"><label>Contato<input name="contato" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label></fieldset>
  <fieldset><legend>Rota</legend>
  <div class="form-duas"><label>Cidade de origem<input name="origem" required></label><label>Cidade de entrega<input name="destino" required></label></div></fieldset>
  <fieldset><legend>Mercadoria</legend>
  <div class="form-duas"><label>Descrição<input name="mercadoria" required></label><label>Espécie<select name="especie"><option>Caixa</option><option>Fardo</option><option>Saco</option><option>Outra</option></select></label></div>
  <div class="form-duas"><label>Peso (kg)<input name="peso" inputmode="decimal"></label><label>Valor declarado (R$)<input name="valor" inputmode="decimal"></label></div>
  <div class="form-tres"><label>Comprimento (cm)<input name="comprimento" inputmode="decimal"></label><label>Largura (cm)<input name="largura" inputmode="decimal"></label><label>Altura (cm)<input name="altura" inputmode="decimal"></label></div>
  <label>Observações<textarea name="observacoes" rows="3"></textarea></label></fieldset>
  <button class="btn" type="submit">${icWa()}Enviar cotação pelo WhatsApp</button>
</form>`;
const contatoForm = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Área de destino<select name="area"><option>Geral</option><option>Cotação de frete</option><option>Financeiro</option><option>Operacional</option><option>Filial Maringá</option><option>Filial Londrina</option></select></label></div>
  <label>Assunto<input name="assunto"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const filialCards = (mapa = false) => `<div class="filiais">${filiais.map(f => `<article class="sobe"><p class="f-tag">${f.tag}</p><h3>${f.c} <small>${f.uf}</small></h3><p class="f-end">${ic('pin')}<span>${f.end}<br>CEP ${f.cep}</span></p>${f.fone ? `<p class="f-end">${ic('tel')}<a href="${telHref(f.fone)}">${f.fone}</a></p>` : ''}<p class="f-end">${icWa()}<a href="${waHref(f.wa[0], 'Olá! Vim pelo site da Transportadora Pérola.')}" ${ext}>${f.wa[1]}</a></p>${mapa ? `<iframe class="mapa" title="Mapa ${f.c}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(f.q)}&z=15&output=embed"></iframe>` : ''}</article>`).join('')}</div>`;
const servCards = v => `<ul class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${s.href(v)}"${s.ext ? ` ${ext}` : ''}><span class="n">0${i + 1}</span>${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p><span class="link-seta">${s.ext ? 'Abrir sistema' : 'Acessar'} ${ic('seta')}</span></a></li>`).join('')}</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Transportadora Pérola, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a>
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
    <div class="rod-marca">${logo(true)}<p>Transportadora Pérola Ltda. Transporte rodoviário de cargas desde 1960.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Curitiba</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${filiais[0].end}<br>Curitiba - PR, ${filiais[0].cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Transportadora Pérola Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Precisa enviar uma carga?</h2><p>Peça sua cotação ou fale com a filial mais perto de você.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'cotacao')}">Pedir cotação</a><a class="btn btn-linha" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Rastreio e coletas', 'Rastreamento de cargas, solicitação de coleta e consulta de área de atuação da Transportadora Pérola.') + topo(v, 'servicos') + cab('Rastreio e coletas', 'Sua carga acompanhada do embarque à entrega') + `
<div class="in"><section class="serv-pag" id="rastreamento"><div class="rast-caixa"><h2>Rastreamento pelo remetente</h2><p>Informe a nota fiscal e o CNPJ de quem enviou.</p>${rastreio()}</div><div class="serv-lado"><h2>Outros serviços on-line</h2><ul class="serv-links"><li><a href="${ssw.coleta}" ${ext}>${ic('caminhao')}<span><b>Solicitar coleta</b>Peça a coleta da sua mercadoria</span>${ic('ext')}</a></li><li><a href="${ssw.areas}" ${ext}>${ic('pin')}<span><b>Área de atuação</b>Cidades atendidas, endereços, telefones e prazos</span>${ic('ext')}</a></li><li><a href="${link(v, 'cotacao')}">${ic('calendario')}<span><b>Cotação de frete</b>Origem, destino e medidas da mercadoria</span>${ic('seta')}</a></li></ul><p class="nota">Rastreamento pelo destinatário ou pagador e a área restrita usam senha: peça a sua pelo telefone ${E.fone}.</p></div></section></div>
` + cta(v) + rodape(v);
  pag.filiais = head(v, 'filiais', 'Filiais', 'Matriz em Curitiba e filiais em Maringá e Londrina: endereços, telefones e WhatsApp.') + topo(v, 'filiais') + cab('Filiais', 'Curitiba, Maringá e Londrina') + `
<div class="in"><section class="fil-pag">${filialCards(true)}</section></div>
` + cta(v) + rodape(v);
  pag.cotacao = head(v, 'cotacao', 'Cotação de frete', 'Peça a cotação de frete: origem, destino, peso, valor declarado e medidas da mercadoria.') + topo(v, 'cotacao') + cab('Cotação', 'Peça a cotação do seu frete') + `
<div class="in"><section class="cot-pag"><div class="contato-form">${cotacaoForm()}</div><aside class="cot-lado"><h2>O que ajuda na cotação</h2><ul class="lista-check"><li>${ic('check')}<span>Cidade de origem e de entrega</span></li><li>${ic('check')}<span>Peso e valor declarado da nota</span></li><li>${ic('check')}<span>Comprimento, largura e altura dos volumes</span></li><li>${ic('check')}<span>Espécie: caixa, fardo, saco ou outra</span></li></ul><p>Prefere falar direto? Ligue ${E.fone} ou chame no WhatsApp ${E.fwa}.</p></aside></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `Fale com a Transportadora Pérola: ${E.fone}, WhatsApp ${E.fwa}, ${E.email}.`) + topo(v, 'contato') + cab('Fale conosco', 'Estamos à disposição') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>A mensagem abre pronta no WhatsApp da matriz.</p>${contatoForm()}</div><div><ul class="contato-lista"><li>${ic('tel')}<div><strong>Curitiba</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li></ul>${filialCards()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><div class="faixas" aria-hidden="true"><i></i><i></i><i></i></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Transporte rodoviário de cargas · Paraná</p><h1>Desde 1960 levando a sua carga <em>no rumo certo.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'cotacao')}">Pedir cotação</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Rastrear carga</a></p></div><div class="hero-a-rast"><h2>${ic('pin')}Rastreie sua carga</h2>${rastreio()}</div></div><div class="faixas" aria-hidden="true"><i></i><i></i><i></i></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços on-line</p><h2>Rastreio, coleta, área de atuação e cotação</h2></header>${servCards(v)}</section>
<section class="sede-a"><div class="in sede-a-in"><figure class="postal">${img('sede-curitiba', 'Sede da Transportadora Pérola em Curitiba')}<figcaption>Nossa sede em Curitiba</figcaption></figure><div><p class="k">Desde 1960</p><h2>Mais de seis décadas no transporte de cargas</h2><p>A Transportadora Pérola Ltda. tem matriz no Parolin, em Curitiba, e filiais em Maringá e Londrina, com coleta, entrega e rastreamento das cargas pelo sistema on-line.</p><a class="link-seta" href="${link(v, 'filiais')}">Ver filiais ${ic('seta')}</a></div></div></section>
<section class="in fil-a"><header class="tit"><p class="k">Filiais</p><h2>Três endereços no Paraná</h2></header>${filialCards()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Transportadora Pérola Ltda.</p><h1><span class="ano">1960</span>Transporte de cargas com endereço certo no Paraná.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'cotacao')}">Pedir cotação</a><a class="btn btn-linha" href="${wa()}" ${ext}>${icWa()}WhatsApp</a></p></div><figure>${img('empilhadeira-caixas', 'Empilhadeira movimentando caixas em armazém', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="rast-b"><div class="in rast-b-in"><div><p class="k">Rastreamento</p><h2>Onde está a sua carga?</h2><p>Nota fiscal e CNPJ do remetente. A consulta abre no sistema SSW.</p></div>${rastreio()}</div></section>
<section class="in servs-b"><header class="tit"><p class="k">On-line</p><h2>Tudo pelo site</h2></header>${servCards(v)}</section>
<section class="in fil-b"><header class="tit"><p class="k">Filiais</p><h2>Curitiba, Maringá e Londrina</h2></header><div class="fil-b-in"><figure>${img('sede-curitiba', 'Sede da Transportadora Pérola em Curitiba')}<figcaption>Sede em Curitiba, no Parolin</figcaption></figure>${filialCards()}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Transportadora Pérola', artigo: 'da', url: E.url, lang: 'pt', cor: '#c8102e', fundo: '#111111', claro: '#f6f4f1',
  fonteTitulo: 'Chivo,system-ui,sans-serif', fonteTexto: '"Work Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vermelho e o preto do logo "TP" e as faixas de velocidade dele. Rastreamento já na abertura.', pontos: ['Rastreie a carga direto na home', 'Coleta, área de atuação e cotação on-line', 'Três filiais com WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Preta e vermelha, com títulos condensados e o ano de fundação, 1960, em destaque.', pontos: ['"Desde 1960" em destaque', 'Rastreamento em faixa própria', 'Cotação com origem, destino e medidas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
