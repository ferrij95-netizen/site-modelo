// JN Imóveis: Juvenita Silva e Nilton Batista, corretores de imóveis (Brotas, Salvador/BA). Gera public/{a,b}/ e a página de escolha.
// node clientes/jnimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs jnimoveis http://www.jnimoveis.com.br/)
// Imóveis em imoveis.json, tirados das páginas de cada imóvel do site atual (plataforma Imobia), fotos em assets/img/imoveis/<cód>-<n>.webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const IM = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8'));
const E = {
  nome: 'JN Imóveis', url: 'https://jnimoveis.overtus.com.br/', antigo: 'http://www.jnimoveis.com.br/',
  wa: '557130145165', waTxt: '(71) 3014-5165',
  fones: ['(71) 99979-0407', '(71) 99928-1773', '(71) 98681-5021'],
  email: 'jnimoveis@jnimoveis.com.br',
  end: 'Rua Waldemar Falcão, 227, Loja 12', bairro: 'Brotas, Salvador/BA',
  curto: 'Juvenita Silva e Nilton Batista, corretores de imóveis em Salvador: venda, aluguel com administração e documentação simples. No mercado há 48 anos.',
};
const corretores = [
  { n: 'Nilton Batista', c: '599' },
  { n: 'Juvenita Silva', c: '2761' },
  { n: 'Adriana Barretto (Silva Barretto)', c: '20936' },
];
const servicos = [
  { t: 'Venda', d: 'Apartamentos, casas, salas e terrenos em Salvador, com acompanhamento do primeiro contato até a escritura.', i: 'casa' },
  { t: 'Aluguel com administração', d: 'Anunciamos, escolhemos o inquilino e cuidamos da administração do aluguel para o proprietário.', i: 'chave' },
  { t: 'Documentação simples', d: 'Orientação na papelada da compra, venda e locação, sem complicação para você.', i: 'livro' },
];
const bancos = [
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso'],
  ['Santander', 'https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/dados-pessoais'],
  ['Banco do Brasil', 'https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx'],
  ['Bradesco', 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm'],
  ['Itaú', 'https://ww3.itau.com.br/imobline/pre/simuladores_new/fichaProposta/index.aspx?IMOB_TipoBKL=&ident_bkl='],
];
const nav = [
  { slug: 'index', nome: 'Início' }, { slug: 'imoveis', nome: 'Imóveis' }, { slug: 'quem-somos', nome: 'Quem somos' },
  { slug: 'financiamento', nome: 'Financiamento' }, { slug: 'anuncie', nome: 'Anuncie seu imóvel' }, { slug: 'contato', nome: 'Fale conosco' },
];
export const nomesVersao = { a: 'Esquina', b: 'Balcão' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Karla:wght@400;500;700&display=swap',
};
const cores = { a: '#10203f', b: '#0e1b36' };

// ---------- dados ----------
const MAIUS = /^[^a-zà-ú]*$/;
const nomesProprios = ['Salvador', 'Brotas', 'Pituba', 'Graça', 'Barra', 'Piatã', 'Itapuã', 'Comércio', 'Candeal', 'Trobogy', 'Alphaville', 'Rio Vermelho', 'Caminho das Árvores', 'Horto Florestal', 'Horto Center', 'Jardim Brasília', 'Pernambués', 'Shopping Barra', 'Costa Azul', 'Alpha Class', 'Edifício Status', 'Edificio Status', 'Profissional Center', 'Airbnb', 'Brisas'];
function frase(t) {
  t = t.trim().replace(/\s+/g, ' ');
  if (!MAIUS.test(t)) return t;
  let s = t.toLowerCase().replace(/(^|[-|.!]\s+)(\p{L})/gu, (m, a, l) => a + l.toUpperCase());
  for (const n of nomesProprios) s = s.replace(new RegExp(n.toLowerCase().normalize('NFC'), 'g'), n);
  return s.replace(/m²/gi, 'm²').replace(/\bairbnb\b/gi, 'Airbnb');
}
const area = v => { const n = parseFloat(v); return `${n.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`; };
const IMV = IM.map(d => {
  const f = d.feats;
  const ar = f['Área Útil'] || f['Área Privativa'] || f['Área Total'] || f['Área Terreno'];
  const quartos = f['Dormitórios'];
  return {
    ...d, titulo: frase(d.titulo), area: ar ? area(ar) : '', quartos, banhos: f['Banheiros'], vagas: f['Garagens'],
    precoNum: parseFloat(d.preco.replace(/[^\d,]/g, '').replace(',', '.')), aPartir: /a partir/i.test(d.preco),
    preco: d.preco.replace(/^A partir de\s*/i, ''), negLabel: d.negocio === 'venda' ? 'Venda' : 'Aluguel',
  };
});
const venda = IMV.filter(d => d.negocio === 'venda'), aluguel = IMV.filter(d => d.negocio === 'aluguel');
const tipos = [...new Set(IMV.map(d => d.tipo))];
const bairros = [...new Set(IMV.map(d => d.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
const foto = (cod, n = 1) => `/assets/img/imoveis/${cod}-${n}.webp`;
const img = (src, alt = '', extra = '') => `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const linkImv = (v, d) => link(v, `imoveis/${d.cod}`);
const waImv = d => waHref(E.wa, `Olá! Tenho interesse no imóvel Cód. ${d.cod} (${d.tipo}, ${d.bairro}).`);
const resumo = d => [d.area && [d.area, 'medidor', 'área'], d.quartos && [d.quartos.replace(/\s*\(.*\)/, '') + (d.quartos.startsWith('1 ') || d.quartos === '1' ? ' quarto' : ' quartos'), 'casa', ''], d.banhos && [`${d.banhos} banh.`, 'chuveiro', ''], d.vagas && [`${d.vagas} ${d.vagas === '1' ? 'vaga' : 'vagas'}`, 'carro', '']].filter(Boolean);

// ---------- peças comuns ----------
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'JN Imóveis | Corretores de imóveis em Salvador' : `${titulo} | JN Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (v, claro) => `<a class="marca" href="${link(v, 'index')}" aria-label="JN Imóveis, página inicial"><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" alt="Juvenita Silva e Nilton Batista, corretores de imóveis" width="300" height="101"></a>`;

function topo(v, s) {
  const claro = v === 'b';
  return `<header class="topo">
  <div class="topo-fio"><div class="in"><span>${ic('pin')}${E.end}, ${E.bairro}</span><span class="fio-fones">${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}</span></div></div>
  <div class="in topo-linha">
    ${marca(v, claro)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s.startsWith('imoveis') ? 'imoveis' : s)}</ul></nav>
    <a class="btn btn-topo" href="${waHref(E.wa, 'Olá! Gostaria de falar com um corretor.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Juvenita Silva e Nilton Batista, corretores de imóveis" width="300" height="101" loading="lazy"><p>${E.curto}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Visite o escritório</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li>
      ${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}
      <li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">WhatsApp ${E.waTxt}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
    <div><h3>Corretores</h3><ul class="rod-dados">${corretores.map(c => `<li>${ic('usuarios')}<span>${c.n}<br><small>CRECI ${c.c}</small></span></li>`).join('')}</ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} JN Imóveis · Juvenita Silva e Nilton Batista, Corretores de Imóveis</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Gostaria de falar com um corretor.')}" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp">${icWa()}</a>
<script src="/assets/imoveis.js" defer></script>
</body>
</html>
`;
}

// Filtro (vai para a página de imóveis com ?neg=&tipo=&bairro=)
const filtro = (v, cls = '') => `<form class="filtro ${cls}" action="${link(v, 'imoveis')}" method="get" data-filtro>
  <fieldset class="filtro-neg"><legend class="vh">Negócio</legend>
    <label><input type="radio" name="neg" value="" checked><span>Todos</span></label>
    <label><input type="radio" name="neg" value="venda"><span>Comprar</span></label>
    <label><input type="radio" name="neg" value="aluguel"><span>Alugar</span></label>
  </fieldset>
  <label><span>Tipo</span><select name="tipo"><option value="">Qualquer tipo</option>${tipos.map(t => `<option>${t}</option>`).join('')}</select></label>
  <label><span>Bairro</span><select name="bairro"><option value="">Todos os bairros</option>${bairros.map(b => `<option>${b}</option>`).join('')}</select></label>
  <button class="btn" type="submit">Buscar imóveis</button>
</form>`;

const cartaoA = (v, d) => `<article class="imv" data-neg="${d.negocio}" data-tipo="${esc(d.tipo)}" data-bairro="${esc(d.bairro)}">
  <a class="imv-foto" href="${linkImv(v, d)}">${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}<span class="imv-neg imv-${d.negocio}">${d.negLabel}</span></a>
  <div class="imv-txt">
    <p class="imv-onde">${d.tipo} · ${d.bairro}</p>
    <h3><a href="${linkImv(v, d)}">${esc(d.titulo)}</a></h3>
    <p class="imv-preco">${d.aPartir ? '<small>a partir de</small> ' : ''}${d.preco}</p>
    <ul class="imv-dados">${resumo(d).map(([t, i]) => `<li>${ic(i)}${t}</li>`).join('')}</ul>
    <p class="imv-cod">Cód. ${d.cod}</p>
  </div>
</article>`;
const cartaoB = (v, d) => `<article class="imv imv-linha" data-neg="${d.negocio}" data-tipo="${esc(d.tipo)}" data-bairro="${esc(d.bairro)}">
  <a class="imv-foto" href="${linkImv(v, d)}">${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}</a>
  <div class="imv-txt">
    <p class="imv-onde"><span class="imv-neg imv-${d.negocio}">${d.negLabel}</span>${d.tipo} · ${d.bairro} · Cód. ${d.cod}</p>
    <h3><a href="${linkImv(v, d)}">${esc(d.titulo)}</a></h3>
    <ul class="imv-dados">${resumo(d).map(([t, i]) => `<li>${ic(i)}${t}</li>`).join('')}</ul>
  </div>
  <div class="imv-lado"><p class="imv-preco">${d.aPartir ? '<small>a partir de</small>' : ''}${d.preco}</p><a class="link-seta" href="${linkImv(v, d)}">Ver imóvel ${ic('seta')}</a></div>
</article>`;
const cartao = (v, d) => (v === 'a' ? cartaoA : cartaoB)(v, d);

const formContato = (assunto = 'Contato pelo site') => `<form class="form" data-wa="${assunto}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp do escritório com a sua mensagem pronta.</p>
</form>`;
const formAnuncie = () => `<form class="form" data-wa="Quero anunciar meu imóvel">
  <h3 class="form-tit">Informações básicas</h3>
  <div class="form-duas"><label>Finalidade<select name="finalidade" required><option>Venda</option><option>Aluguel</option></select></label><label>Tipo de imóvel<select name="tipo">${['Apartamento', 'Casa', 'Prédio', 'Sala comercial', 'Terreno'].map(t => `<option>${t}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Valor pretendido<input name="valor" required inputmode="numeric" placeholder="R$"></label><label>Área do imóvel<input name="area" placeholder="m²"></label></div>
  <div class="form-duas"><label>Dormitórios<input name="dormitorios" inputmode="numeric"></label><label>Banheiros<input name="banheiros" inputmode="numeric"></label></div>
  <h3 class="form-tit">Localização</h3>
  <label>Endereço<input name="endereco" required autocomplete="street-address"></label>
  <div class="form-duas"><label>Bairro<input name="bairro" required></label><label>Cidade/UF<input name="cidade" required value="Salvador/BA"></label></div>
  <label>Mais detalhes<textarea name="detalhes" rows="3"></textarea></label>
  <h3 class="form-tit">Seu contato</h3>
  <div class="form-duas"><label>Nome completo<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <button class="btn" type="submit">${icWa()}Enviar cadastro pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do escritório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Waldemar Falcão 227 Brotas Salvador BA')}&z=16&output=embed"></iframe>`;

// Página de um imóvel (igual nas duas versões, muda só o CSS)
function paginaImovel(v, d) {
  const fotos = Array.from({ length: d.fotos }, (_, i) => i + 1);
  const fichas = Object.entries(d.feats).map(([k, x]) => `<div><dt>${k}</dt><dd>${/Área/.test(k) ? area(x) : x}</dd></div>`).join('');
  const parecidos = IMV.filter(o => o.cod !== d.cod && o.negocio === d.negocio && (o.tipo === d.tipo || o.bairro === d.bairro)).slice(0, 3);
  return head(v, `imoveis/${d.cod}`, `${d.tipo} em ${d.bairro}, Cód. ${d.cod}`, `${d.titulo}. ${d.negLabel}: ${d.preco}. ${d.bairro}, Salvador/BA.`) + topo(v, 'imoveis') + `
<section class="in ficha">
  <p class="trilha"><a href="${link(v, 'imoveis')}">Imóveis</a> / <a href="${link(v, 'imoveis')}?neg=${d.negocio}">${d.negLabel}</a> / Cód. ${d.cod}</p>
  <div class="ficha-galeria">
    <a class="ficha-capa" href="${foto(d.cod)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod), d.titulo, ' loading="eager" fetchpriority="high"')}</a>
    <div class="ficha-miniaturas">${fotos.slice(1).map(n => `<a href="${foto(d.cod, n)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod, n), `${d.tipo} em ${d.bairro}, foto ${n}`)}</a>`).join('')}</div>
  </div>
  <div class="ficha-corpo">
    <div class="ficha-texto">
      <p class="imv-onde"><span class="imv-neg imv-${d.negocio}">${d.negLabel}</span>${d.tipo} · ${d.bairro} · Salvador/BA</p>
      <h1>${esc(d.titulo)}</h1>
      <dl class="ficha-dados">${fichas}</dl>
      <h2>Descrição</h2>
      <div class="ficha-desc">${esc(d.desc).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>').replace(/^/, '<p>')}</p></div>
    </div>
    <aside class="ficha-lado">
      <p class="ficha-cod">Cód. ${d.cod}</p>
      <p class="ficha-preco">${d.aPartir ? '<small>a partir de</small>' : ''}${d.preco}</p>
      <a class="btn" href="${waImv(d)}" target="_blank" rel="noopener">${icWa()}Quero saber mais</a>
      <a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a>
      <p class="ficha-nota">Atendimento direto com os corretores Juvenita Silva (CRECI 2761) e Nilton Batista (CRECI 599).</p>
    </aside>
  </div>
</section>
${parecidos.length ? `<section class="in parecidos"><h2>Outros imóveis ${d.negocio === 'venda' ? 'à venda' : 'para alugar'}</h2><div class="${v === 'a' ? 'grade-imv' : 'lista-imv'}">${parecidos.map(o => cartao(v, o)).join('')}</div></section>` : ''}
` + rodape(v);
}

function paginaImoveis(v, cab) {
  return head(v, 'imoveis', 'Imóveis à venda e para alugar em Salvador', `${venda.length} imóveis à venda e ${aluguel.length} para alugar em Salvador: apartamentos, casas, salas comerciais e terrenos.`) + topo(v, 'imoveis') +
    cab('Imóveis', 'Imóveis à venda e para alugar em Salvador') + `
<section class="in busca">
  ${filtro(v, 'filtro-fixo')}
  <p class="busca-total" data-total aria-live="polite">${IMV.length} imóveis</p>
  <div class="${v === 'a' ? 'grade-imv' : 'lista-imv'}" data-lista>${IMV.map(d => cartao(v, d)).join('')}</div>
  <div class="busca-vazio" data-vazio hidden><p>Nenhum imóvel com esses filtros agora. Conte o que você procura que a gente busca para você.</p><a class="btn" href="${waHref(E.wa, 'Olá! Estou procurando um imóvel e não achei no site.')}" target="_blank" rel="noopener">${icWa()}Pedir pelo WhatsApp</a></div>
</section>
` + rodape(v);
}

function paginasComuns(v, pag, cab) {
  pag.imoveis = paginaImoveis(v, cab);
  for (const d of IMV) pag[`imoveis/${d.cod}`] = paginaImovel(v, d);
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'Escritório imobiliário dos corretores Nilton Batista, Juvenita Silva e Adriana Barretto, em Brotas, Salvador. No mercado há 48 anos.') + topo(v, 'quem-somos') +
    cab('Quem somos', 'Um escritório de corretores, há 48 anos no mercado') + `
<section class="in quem">
  <div class="quem-txt">
    <p class="lead">Escritório imobiliário composto pelos corretores Nilton Batista, Juvenita Silva e Adriana Barretto.</p>
    <p>Atuamos no mercado com vasta experiência em vendas, aluguéis com administração e documentação simples. São 48 anos atendendo quem quer comprar, vender ou alugar em Salvador.</p>
    <p>O escritório fica em Brotas, na ${E.end}. Venha tomar um café com a gente ou fale pelo telefone.</p>
  </div>
  <ul class="corretores">${corretores.map(c => `<li><span class="cor-ini" aria-hidden="true">${c.n[0]}</span><strong>${c.n}</strong><small>CRECI ${c.c}</small></li>`).join('')}</ul>
</section>
<section class="in servs"><header class="tit"><h2>O que fazemos</h2></header><div class="servs-grade">${servicos.map(s => `<article class="serv">${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
` + cta(v) + rodape(v);
  pag.financiamento = head(v, 'financiamento', 'Financiamento imobiliário', 'Simule o financiamento do seu imóvel na Caixa, Santander, Banco do Brasil, Bradesco ou Itaú, ou tenha a ajuda dos nossos corretores.') + topo(v, 'financiamento') +
    cab('Financiamento', 'Financiamento imobiliário') + `
<section class="in financ">
  <div><p class="lead">Escolha um banco para simular ou tenha nossa ajuda para escolher a melhor opção.</p>
  <p>Os simuladores abrem no site de cada banco. Com o resultado em mãos, fale com a gente: ajudamos a comparar as propostas e a separar a documentação.</p>
  <a class="btn" href="${waHref(E.wa, 'Olá! Quero ajuda com financiamento imobiliário.')}" target="_blank" rel="noopener">${icWa()}Simule conosco</a></div>
  <ul class="bancos">${bancos.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><strong>${n}</strong><span>Simular no site do banco ${ic('ext')}</span></a></li>`).join('')}</ul>
</section>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Tem imóvel para vender ou alugar em Salvador? Cadastre aqui e um corretor da JN Imóveis entra em contato.') + topo(v, 'anuncie') +
    cab('Anuncie', 'Você tem imóvel para vender ou alugar?') + `
<section class="in anuncie">
  <div class="anuncie-txt"><p class="lead">Preencha os dados do imóvel e um dos nossos corretores entra em contato.</p>
  <ul class="lista-check"><li>${ic('check')}Venda com acompanhamento até a escritura</li><li>${ic('check')}Aluguel com administração</li><li>${ic('check')}Documentação simples</li></ul>
  <p>Prefere conversar? Ligue para <a href="${telHref(E.fones[0])}">${E.fones[0]}</a> ou passe no escritório em Brotas.</p></div>
  ${formAnuncie()}
</section>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `Fale com a JN Imóveis: ${E.end}, ${E.bairro}. ${E.fones.join(', ')}. ${E.email}`) + topo(v, 'contato') +
    cab('Fale conosco', 'Faça uma visita ou mande uma mensagem') + `
<section class="in contato">
  <div class="contato-dados">
    <h2>Faça uma visita</h2>
    <p>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></p>
    ${E.fones.map(f => `<p>${ic('tel')}<a href="${telHref(f)}">${f}</a></p>`).join('')}
    <p>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">WhatsApp ${E.waTxt}</a></p>
    <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
    ${mapa}
  </div>
  <div class="contato-form"><h2>Envie uma mensagem</h2>${formContato()}</div>
</section>
` + rodape(v);
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Você tem imóvel para vender ou alugar?</h2><p>Cadastre em poucos minutos e um corretor entra em contato.</p></div><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'contato')}">Falar com um corretor</a></p></div></section>`;

// ---------- Versão A: Esquina (clara, amarelo do logo em cantoneiras) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  const dest = ['599', '602', '608', '593', '585', '338'].map(c => IMV.find(d => d.cod === c));
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt">
      <p class="k">Corretores de imóveis · Brotas · Salvador</p>
      <h1>Comprar, vender ou alugar em Salvador com quem está no mercado há <span>48 anos</span>.</h1>
      <p>Juvenita Silva e Nilton Batista atendem pessoalmente: venda, aluguel com administração e documentação simples.</p>
    </div>
    <figure class="hero-a-foto">${img(foto('599'), 'Sala reformada de apartamento à venda na Pituba', ' loading="eager" fetchpriority="high"')}<figcaption>Pituba · 4 quartos · 140 m² · Cód. 599</figcaption></figure>
  </div>
  <div class="in">${filtro(v, 'filtro-hero')}</div>
</section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Destaques</p><h2>Imóveis selecionados</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${IMV.length} imóveis ${ic('seta')}</a></header><div class="grade-imv">${dest.map(d => cartao(v, d)).join('')}</div></section>
<section class="faixa-a"><div class="in faixa-a-in">
  <a href="${link(v, 'imoveis')}?neg=venda"><strong>${venda.length}</strong><span>imóveis à venda</span></a>
  <a href="${link(v, 'imoveis')}?neg=aluguel"><strong>${aluguel.length}</strong><span>para alugar</span></a>
  <div><strong>48</strong><span>anos no mercado</span></div>
  <div><strong>3</strong><span>corretores com CRECI</span></div>
</div></section>
<section class="in servs"><header class="tit"><p class="k">Como trabalhamos</p><h2>Do anúncio à chave na mão</h2></header><div class="servs-grade">${servicos.map(s => `<article class="serv">${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
<section class="in bairros-a"><header class="tit"><p class="k">Por bairro</p><h2>Onde estão nossos imóveis</h2></header><ul>${bairros.map(b => `<li><a href="${link(v, 'imoveis')}?bairro=${encodeURIComponent(b)}">${b}<small>${IMV.filter(d => d.bairro === b).length}</small></a></li>`).join('')}</ul></section>
` + cta(v) + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

// ---------- Versão B: Balcão (azul-marinho, faixa amarela, lista de imóveis em linhas) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="k">Juvenita Silva · Nilton Batista</p>
      <h1>48 anos abrindo portas em Salvador.</h1>
      <p>${E.curto}</p>
      <p class="bts"><a class="btn" href="${link(v, 'imoveis')}?neg=venda">Quero comprar</a><a class="btn btn-linha" href="${link(v, 'imoveis')}?neg=aluguel">Quero alugar</a></p>
    </div>
    <div class="hero-b-mosaico">
      <a href="${link(v, 'imoveis/599')}">${img(foto('599'), 'Sala reformada de apartamento na Pituba', ' loading="eager" fetchpriority="high"')}<span>Pituba</span></a>
      <a href="${link(v, 'imoveis/607')}">${img(foto('607', 2), 'Piscina do condomínio em Alphaville I', ' loading="eager"')}<span>Alphaville I</span></a>
      <a href="${link(v, 'imoveis/608')}">${img(foto('608'), 'Orla da Pituba em frente ao Edf. Costa Azul', ' loading="eager"')}<span>Pituba</span></a>
    </div>
  </div>
</section>
<section class="busca-b"><div class="in">${filtro(v)}</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}?neg=venda">Todos os ${venda.length} ${ic('seta')}</a></header><div class="lista-imv">${venda.slice(0, 4).map(d => cartao(v, d)).join('')}</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}?neg=aluguel">Todos os ${aluguel.length} ${ic('seta')}</a></header><div class="lista-imv">${aluguel.slice(0, 3).map(d => cartao(v, d)).join('')}</div></section>
<section class="equipe-b"><div class="in equipe-b-in">
  <div><p class="k">Quem atende você</p><h2>Corretores, não um balcão de anúncios</h2><p>O escritório é dos próprios corretores. Quem atende o telefone é quem vai mostrar o imóvel, cuidar do contrato e da documentação.</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça o escritório ${ic('seta')}</a></div>
  <ul class="corretores">${corretores.map(c => `<li><span class="cor-ini" aria-hidden="true">${c.n[0]}</span><strong>${c.n}</strong><small>CRECI ${c.c}</small></li>`).join('')}</ul>
</div></section>
<section class="in financ-b"><div><p class="k">Financiamento</p><h2>Simule nos principais bancos</h2><p>Escolha um banco para simular ou tenha nossa ajuda para escolher a melhor opção.</p></div><ul class="bancos-mini">${bancos.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n} ${ic('ext')}</a></li>`).join('')}</ul></section>
` + cta(v) + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
fs.copyFileSync(path.join(aqui, 'imoveis.js'), path.join(pub, 'assets/imoveis.js'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'JN Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#ffca03', fundo: '#10203f', claro: '#fbf7ea',
  fonteTitulo: '"Fjalla One",system-ui,sans-serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + IMV.length, texto: 'Clara, com o amarelo do logo em cantoneiras e a busca de imóveis logo na abertura.', pontos: ['Busca por compra/aluguel, tipo e bairro', `${IMV.length} imóveis reais, cada um com página e fotos`, 'Atalhos por bairro'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + IMV.length, texto: 'Azul-marinho com faixa amarela, imóveis em lista como uma vitrine de escritório e os corretores em destaque.', pontos: ['"48 anos abrindo portas em Salvador"', 'Venda e aluguel separados na página inicial', 'Simuladores dos 5 bancos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
