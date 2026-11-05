// Divino Imóveis Brasília (SEPN 515, Asa Norte). Gera public/{a,b}/ e a página de escolha.
// node clientes/divinoimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs divinoimoveis https://www.divinoimoveis.com/)
// Imóveis em imoveis.json, tirados das páginas de cada imóvel do site atual (plataforma Imobia), fotos em assets/img/imoveis/<cód>-<n>.webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const IM = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8'));
const E = {
  nome: 'Divino Imóveis', url: 'https://divinoimoveis.overtus.com.br/', antigo: 'https://www.divinoimoveis.com/',
  wa: '5561996016111', waTxt: '(61) 99601-6111',
  fones: [{ n: 'Gracielle', f: '(61) 99601-6111' }, { n: 'Divino', f: '(61) 99902-7416' }],
  email: 'divino@divinoimoveis.com', creci: 'CRECI J 24850',
  end: 'SEPN 515, Bloco E, Sala 212', bairro: 'Asa Norte, Brasília/DF',
  curto: 'Imobiliária em Brasília com raiz em 1985: venda e locação de imóveis residenciais e comerciais, chácaras, administração de aluguéis e avaliações judiciais.',
};
const servicos = [
  { t: 'Venda e locação', d: 'Corretores credenciados divulgam o seu imóvel com destaque. Para quem procura, pesquisa por telefone, no escritório ou pelo site.', i: 'chave', s: 'imoveis' },
  { t: 'Administração de aluguéis', d: 'Administramos imóveis para locação com honestidade e cuidado com o patrimônio, intermediando locador e locatário.', i: 'escudo', s: 'anuncie' },
  { t: 'Avaliação judicial e extrajudicial', d: 'Corretores inscritos no CNAI, com 11 anos de experiência em avaliações judiciais.', i: 'livro', s: 'avaliacao' },
];
const bancos = [
  ['Caixa', 'http://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso'],
  ['Santander', 'https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/dados-pessoais'],
  ['Banco do Brasil', 'https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx'],
  ['Bradesco', 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/encontre-seu-credito/simuladores-imoveis.shtm'],
  ['Itaú', 'https://ww3.itau.com.br/imobline/pre/simuladores_new/fichaProposta/index.aspx?IMOB_TipoBKL=&ident_bkl='],
];
const nav = [
  { slug: 'index', nome: 'Início' }, { slug: 'imoveis', nome: 'Imóveis' }, { slug: 'avaliacao', nome: 'Avaliação de imóveis' },
  { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'anuncie', nome: 'Anuncie ou encomende' }, { slug: 'contato', nome: 'Contato' },
];
export const nomesVersao = { a: 'Quadras', b: 'Lago Oeste' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;600;700;800&family=Atkinson+Hyperlegible:wght@400;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Young+Serif&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap',
};
const cores = { a: '#004352', b: '#0c2c35' };

// ---------- dados ----------
const num = v => parseFloat(String(v).replace(',', '.'));
const area = v => { const n = num(v); return `${n.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`; };
const hectare = v => { const n = num(v); return n >= 10000 ? `${(n / 10000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ha` : ''; };
const CIDADE = ['Andar comercial', 'Sala comercial', 'Loja', 'Apartamento', 'Prédio', 'Galpão'];
const IMV = IM.map(d => {
  const f = d.feats;
  const ar = f['Área Terreno'] || f['Área Útil'] || f['Área Total'] || f['Área Privativa'];
  const q = f['Dormitórios'];
  return {
    ...d, area: ar ? area(ar) : '', ha: ar ? hectare(ar) : '', quartos: q, banhos: f['Banheiros'],
    grupo: CIDADE.includes(d.tipo) ? 'cidade' : 'campo', consulte: /consulte/i.test(d.preco),
    preco: /consulte/i.test(d.preco) ? 'Valor sob consulta' : d.preco, negLabel: d.negocio === 'venda' ? 'Venda' : 'Aluguel',
    local: `${d.bairro}${d.cidade !== 'Brasília/DF' ? `, ${d.cidade}` : ''}`,
  };
});
const venda = IMV.filter(d => d.negocio === 'venda'), aluguel = IMV.filter(d => d.negocio === 'aluguel');
const cidade = IMV.filter(d => d.grupo === 'cidade'), campo = IMV.filter(d => d.grupo === 'campo');
const chacaras = IMV.filter(d => d.tipo === 'Chácara');
const tipos = [...new Set(IMV.map(d => d.tipo))].sort((a, b) => a.localeCompare(b, 'pt'));
const bairros = [...new Set(IMV.map(d => d.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
const por = c => IMV.find(d => d.cod === c);
const foto = (cod, n = 1) => `/assets/img/imoveis/${cod}-${n}.webp`;
const img = (src, alt = '', extra = '') => `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const linkImv = (v, d) => link(v, `imoveis/${d.cod}`);
const waImv = d => waHref(E.wa, `Olá! Tenho interesse no imóvel Cód. ${d.cod} (${d.tipo}, ${d.bairro}).`);
const qt = q => { const n = q.replace(/\s*\(.*\)/, ''); return `${n} ${n === '1' ? 'quarto' : 'quartos'}`; };
const resumo = d => [d.area && [d.ha ? `${d.area} · ${d.ha}` : d.area, 'medidor'], d.quartos && [qt(d.quartos), 'casa'], d.banhos && [`${d.banhos} banh.`, 'chuveiro']].filter(Boolean);
const listras = `<span class="listras" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;

// ---------- peças comuns ----------
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Divino Imóveis | Imobiliária em Brasília desde 1985' : `${titulo} | Divino Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (v, claro) => `<a class="marca" href="${link(v, 'index')}" aria-label="Divino Imóveis, página inicial"><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" alt="Divino Imóveis Brasília, CRECI J 24850" width="954" height="360"></a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="topo-fio"><div class="in"><span>${ic('pin')}${E.end}, ${E.bairro}</span><span class="fio-fones">${E.fones.map(f => `<a href="${telHref(f.f)}">${f.n} ${f.f}</a>`).join('')}</span></div></div>
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s.startsWith('imoveis') ? 'imoveis' : s)}</ul></nav>
    <a class="btn btn-topo" href="${waHref(E.wa, 'Olá! Gostaria de falar com um corretor da Divino Imóveis.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Divino Imóveis Brasília" width="954" height="360" loading="lazy"><p>${E.curto}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Escritório</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li>
      ${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f.f)}">${f.n}: ${f.f}</a></li>`).join('')}
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
    <div><h3>Imóveis</h3><ul>
      <li><a href="${link(v, 'imoveis')}?neg=venda">À venda (${venda.length})</a></li>
      <li><a href="${link(v, 'imoveis')}?neg=aluguel">Para alugar (${aluguel.length})</a></li>
      <li><a href="${link(v, 'imoveis')}?tipo=Ch%C3%A1cara">Chácaras (${chacaras.length})</a></li>
      <li><a href="${link(v, 'anuncie')}#procuro">Encomende um imóvel</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Divino Imóveis Brasília · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Gostaria de falar com um corretor da Divino Imóveis.')}" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp">${icWa()}</a>
<script src="/assets/imoveis.js" defer></script>
</body>
</html>
`;
}

const filtro = (v, cls = '') => `<form class="filtro ${cls}" action="${link(v, 'imoveis')}" method="get" data-filtro>
  <fieldset class="filtro-neg"><legend class="vh">Negócio</legend>
    <label><input type="radio" name="neg" value="" checked><span>Todos</span></label>
    <label><input type="radio" name="neg" value="venda"><span>Comprar</span></label>
    <label><input type="radio" name="neg" value="aluguel"><span>Alugar</span></label>
  </fieldset>
  <label><span>Tipo</span><select name="tipo"><option value="">Qualquer tipo</option>${tipos.map(t => `<option>${t}</option>`).join('')}</select></label>
  <label><span>Bairro ou região</span><select name="bairro"><option value="">Todos</option>${bairros.map(b => `<option>${b}</option>`).join('')}</select></label>
  <button class="btn" type="submit">${ic('seta')}Buscar</button>
</form>`;

const dataAttrs = d => `data-neg="${d.negocio}" data-tipo="${esc(d.tipo)}" data-bairro="${esc(d.bairro)}"`;
const cartaoA = (v, d) => `<article class="imv" ${dataAttrs(d)}>
  <a class="imv-foto" href="${linkImv(v, d)}">${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}<span class="imv-neg imv-${d.negocio}">${d.negLabel}</span></a>
  <div class="imv-txt">
    <p class="imv-onde">${d.tipo} · ${esc(d.local)}</p>
    <h3><a href="${linkImv(v, d)}">${esc(d.titulo)}</a></h3>
    <ul class="imv-dados">${resumo(d).map(([t, i]) => `<li>${ic(i)}${t}</li>`).join('')}</ul>
    <p class="imv-rodape"><span class="imv-preco${d.consulte ? ' imv-consulte' : ''}">${d.preco}</span><span class="imv-cod">Cód. ${d.cod}</span></p>
  </div>
</article>`;
const cartaoB = (v, d) => `<article class="imv imv-ficha" ${dataAttrs(d)}>
  <a class="imv-foto" href="${linkImv(v, d)}">${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}</a>
  <div class="imv-txt">
    <p class="imv-onde"><span class="imv-neg imv-${d.negocio}">${d.negLabel}</span>${d.tipo}</p>
    <h3><a href="${linkImv(v, d)}">${esc(d.local)}</a></h3>
    <dl class="imv-num">
      ${d.area ? `<div><dt>Área</dt><dd>${d.ha || d.area}</dd></div>` : ''}
      ${d.quartos ? `<div><dt>Quartos</dt><dd>${d.quartos.replace(/\s*\(.*\)/, '')}</dd></div>` : ''}
      <div><dt>${d.negocio === 'venda' ? 'Venda' : 'Aluguel'}</dt><dd class="${d.consulte ? 'imv-consulte' : ''}">${d.consulte ? 'Consulte' : d.preco}</dd></div>
    </dl>
    <p class="imv-cod">Cód. ${d.cod} · <a href="${linkImv(v, d)}">ver fotos e detalhes</a></p>
  </div>
</article>`;
const cartao = (v, d) => (v === 'a' ? cartaoA : cartaoB)(v, d);
const grade = (v, lista, extra = '') => `<div class="${v === 'a' ? 'grade-imv' : 'lista-imv'}"${extra}>${lista.map(d => cartao(v, d)).join('')}</div>`;

const formContato = (assunto = 'Contato pelo site') => `<form class="form" data-wa="${assunto}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da imobiliária com a sua mensagem pronta.</p>
</form>`;
const tiposForm = ['Apartamento', 'Casa', 'Casa de condomínio', 'Chácara', 'Sala comercial', 'Loja', 'Galpão', 'Prédio', 'Terreno'];
const formAnuncie = () => `<form class="form" data-wa="Quero anunciar meu imóvel">
  <div class="form-duas"><label>Finalidade<select name="finalidade" required><option>Venda</option><option>Locação</option><option>Locação com administração</option></select></label><label>Tipo de imóvel<select name="tipo">${tiposForm.map(t => `<option>${t}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Endereço ou quadra<input name="endereco" required></label><label>Bairro ou região<input name="bairro" required></label></div>
  <div class="form-duas"><label>Área aproximada<input name="area" placeholder="m²"></label><label>Valor pretendido<input name="valor" inputmode="numeric" placeholder="R$"></label></div>
  <label>Conte sobre o imóvel<textarea name="detalhes" rows="3"></textarea></label>
  <div class="form-duas"><label>Seu nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Nossa equipe entra em contato para conhecer, avaliar e fotografar o imóvel.</p>
</form>`;
const formProcuro = () => `<form class="form" data-wa="Procuro um imóvel">
  <div class="form-duas"><label>Quero<select name="quero"><option>Comprar</option><option>Alugar</option></select></label><label>Tipo de imóvel<select name="tipo">${tiposForm.map(t => `<option>${t}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Região de interesse<input name="regiao" required placeholder="Ex.: Asa Norte, Lago Oeste"></label><label>Até quanto quer investir<input name="valor" placeholder="R$"></label></div>
  <label>O que não pode faltar<textarea name="detalhes" rows="3"></textarea></label>
  <div class="form-duas"><label>Seu nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Buscamos no nosso banco de dados e nos parceiros e avisamos quando aparecer.</p>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa do escritório" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('SEPN 515 Bloco E Asa Norte Brasília DF')}&z=16&output=embed"></iframe>`;

function paginaImovel(v, d) {
  const fotos = Array.from({ length: d.fotos }, (_, i) => i + 1);
  const fichas = Object.entries(d.feats).filter(([k]) => !(k === 'Área Privativa' && (d.feats['Área Útil'] === d.feats[k]))).map(([k, x]) => `<div><dt>${k}</dt><dd>${/Área/.test(k) ? area(x) + (hectare(x) ? ` <small>(${hectare(x)})</small>` : '') : esc(x)}</dd></div>`).join('');
  const parecidos = IMV.filter(o => o.cod !== d.cod && o.grupo === d.grupo).slice(0, 3);
  const desc = esc(d.desc).split('\n').map(l => /^[-•]/.test(l) ? `<li>${l.replace(/^[-•]\s*/, '')}</li>` : `<p>${l}</p>`).join('').replace(/<\/li><p>/g, '</li></ul><p>').replace(/<\/p><li>/g, '</p><ul class="lista-check">' + '<li>').replace(/^<li>/, '<ul class="lista-check"><li>').replace(/<\/li>$/, '</li></ul>');
  return head(v, `imoveis/${d.cod}`, `${d.tipo} em ${d.bairro}, Cód. ${d.cod}`, `${d.titulo}. ${d.negLabel}: ${d.preco}. ${d.local}.`) + topo(v, 'imoveis') + `
<section class="in ficha">
  <p class="trilha"><a href="${link(v, 'imoveis')}">Imóveis</a> / <a href="${link(v, 'imoveis')}?neg=${d.negocio}">${d.negLabel}</a> / Cód. ${d.cod}</p>
  <div class="ficha-galeria${d.fotos < 3 ? ' ficha-poucas' : ''}">
    <a class="ficha-capa" href="${foto(d.cod)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod), d.titulo, ' loading="eager" fetchpriority="high"')}</a>
    ${fotos.length > 1 ? `<div class="ficha-miniaturas">${fotos.slice(1).map(n => `<a href="${foto(d.cod, n)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod, n), `${d.tipo} em ${d.bairro}, foto ${n}`)}</a>`).join('')}</div>` : ''}
  </div>
  <div class="ficha-corpo">
    <div class="ficha-texto">
      <p class="imv-onde"><span class="imv-neg imv-${d.negocio}">${d.negLabel}</span>${d.tipo} · ${esc(d.local)}</p>
      <h1>${esc(d.titulo)}</h1>
      ${d.rua ? `<p class="ficha-end">${ic('pin')}${esc(d.rua)}, ${esc(d.bairro)}, ${esc(d.cidade)}</p>` : ''}
      ${fichas ? `<dl class="ficha-dados">${fichas}</dl>` : ''}
      <h2>Descrição</h2>
      <div class="ficha-desc">${desc}</div>
    </div>
    <aside class="ficha-lado">
      <p class="ficha-cod">Cód. ${d.cod}</p>
      <p class="ficha-preco">${d.preco}</p>
      <a class="btn" href="${waImv(d)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a>
      ${E.fones.map(f => `<a class="btn btn-linha" href="${telHref(f.f)}">${ic('tel')}${f.n} ${f.f}</a>`).join('')}
      <p class="ficha-nota">Disponibilidade e preços sujeitos a mudança sem aviso prévio.</p>
    </aside>
  </div>
</section>
${parecidos.length ? `<section class="in parecidos"><h2>${d.grupo === 'cidade' ? 'Outros imóveis comerciais e na cidade' : 'Outras chácaras, casas e lotes'}</h2>${grade(v, parecidos)}</section>` : ''}
` + rodape(v);
}

function paginasComuns(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis à venda e para alugar em Brasília', `${venda.length} imóveis à venda e ${aluguel.length} para alugar no DF e entorno: salas e lojas na Asa Norte, chácaras no Lago Oeste, casas e prédios.`) + topo(v, 'imoveis') +
    cab('Imóveis', 'Imóveis à venda e para alugar no DF') + `
<section class="in busca">
  ${filtro(v, 'filtro-fixo')}
  <p class="busca-total" data-total aria-live="polite">${IMV.length} imóveis</p>
  ${grade(v, IMV, ' data-lista')}
  <div class="busca-vazio" data-vazio hidden><p>Nenhum imóvel com esses filtros agora. Conte o que você procura que a gente busca no nosso banco de dados e nos parceiros.</p><a class="btn" href="${link(v, 'anuncie')}#procuro">Encomendar um imóvel</a></div>
</section>
` + rodape(v);
  for (const d of IMV) pag[`imoveis/${d.cod}`] = paginaImovel(v, d);

  pag.avaliacao = head(v, 'avaliacao', 'Avaliação judicial e extrajudicial de imóveis', 'Avaliação de imóveis em Brasília por corretores inscritos no CNAI, com 11 anos de experiência em avaliações judiciais.') + topo(v, 'avaliacao') +
    cab('Avaliação de imóveis', 'Avaliação judicial e extrajudicial') + `
<section class="in aval">
  <div class="aval-txt">
    <p class="lead">Corretores com inscrição no CNAI (Cadastro Nacional de Avaliadores Imobiliários) e 11 anos de experiência em avaliações judiciais.</p>
    <p>Possuem várias certificações e expertise para resolver as suas demandas judiciais ou extrajudiciais com celeridade e credibilidade.</p>
    <ul class="lista-check">
      <li>${ic('check')}Avaliações para processos judiciais</li>
      <li>${ic('check')}Avaliações extrajudiciais, para compra, venda, partilha ou garantia</li>
      <li>${ic('check')}Imóveis residenciais, comerciais, chácaras e terrenos no DF e entorno</li>
    </ul>
    <p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Preciso de uma avaliação de imóvel.')}" target="_blank" rel="noopener">${icWa()}Pedir uma avaliação</a><a class="btn btn-linha" href="${telHref(E.fones[1].f)}">${ic('tel')}${E.fones[1].f}</a></p>
  </div>
  <figure class="aval-foto">${img(foto('1066', 3), 'Prédio comercial em Sobradinho', ' loading="eager"')}<figcaption>Imóveis de todos os portes, do lote à escola de 4.255 m².</figcaption></figure>
</section>
` + rodape(v);

  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'O Divino ingressou no mercado imobiliário como corretor autônomo em 1985. Hoje a Divino Imóveis vende, aluga, administra e avalia imóveis em Brasília.') + topo(v, 'quem-somos') +
    cab('Quem somos', 'Do corretor autônomo de 1985 à imobiliária de hoje') + `
<section class="in quem">
  <div class="quem-txt">
    <p class="lead">O Divino ingressou no mercado imobiliário como corretor autônomo em 1985.</p>
    <p>Com mais de 30 anos de experiência no mercado imobiliário, hoje conta com uma empresa e expertise para realizar os seus sonhos.</p>
    <p>Mantemos nosso banco de dados sempre atualizado, com ofertas de imóveis residenciais e comerciais, chácaras e terrenos. As consultas podem ser feitas por telefone, pessoalmente ou pelo site.</p>
  </div>
  <dl class="quem-mv">
    <div><dt>Missão</dt><dd>Manter o relacionamento fiel com clientes, atendendo sempre com eficiência, qualidade e segurança, apresentando o melhor imóvel para venda e aluguel, e avaliações imobiliárias na esfera judicial ou extrajudicial.</dd></div>
    <div><dt>Visão</dt><dd>Ser referência em prestação de serviços de imobiliária em Brasília.</dd></div>
  </dl>
</section>
<section class="in servs"><header class="tit"><h2>O que fazemos</h2></header><div class="servs-grade">${servicos.map(s => `<a class="serv" href="${link(v, s.s)}">${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p></a>`).join('')}</div></section>
` + cta(v) + rodape(v);

  pag.anuncie = head(v, 'anuncie', 'Anuncie ou encomende um imóvel', 'Quer vender ou alugar seu imóvel em Brasília? Ou procura um imóvel que não está no site? Conte para a Divino Imóveis.') + topo(v, 'anuncie') +
    cab('Anuncie ou encomende', 'Tem um imóvel? Procura um imóvel?') + `
<section class="in anuncie">
  <div class="anuncie-bloco" id="anuncie">
    <h2>Quero vender ou alugar</h2>
    <p>Trabalhamos as ofertas com destaque e valorização do seu patrimônio. Preencha os dados e nossa equipe entra em contato para conhecer, avaliar e fotografar o seu imóvel.</p>
    ${formAnuncie()}
  </div>
  <div class="anuncie-bloco" id="procuro">
    <h2>Procuro um imóvel</h2>
    <p>Não achou o que precisa? Descreva o imóvel e nossa equipe busca oportunidades no nosso banco de dados e nos parceiros. Assim que encontrarmos, entramos em contato.</p>
    ${formProcuro()}
  </div>
</section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a Divino Imóveis: ${E.end}, ${E.bairro}. ${E.fones.map(f => f.f).join(', ')}. ${E.email}`) + topo(v, 'contato') +
    cab('Contato', 'Venha ao escritório na Asa Norte') + `
<section class="in contato">
  <div class="contato-dados">
    <h2>Escritório</h2>
    <p>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></p>
    ${E.fones.map(f => `<p>${ic('tel')}<a href="${telHref(f.f)}">${f.n}: ${f.f}</a></p>`).join('')}
    <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
    <p>${ic('escudo')}<span>${E.creci}</span></p>
    ${mapa}
  </div>
  <div class="contato-form"><h2>Envie uma mensagem</h2>${formContato()}</div>
</section>
` + rodape(v);
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Você tem imóvel para vender ou alugar?</h2><p>Nossa equipe vai até o imóvel para conhecer, avaliar e fotografar.</p></div><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'anuncie')}#procuro">Encomendar um imóvel</a></p></div></section>`;
const financ = v => `<section class="financ"><div class="in financ-in"><div><h2>Financiamento imobiliário</h2><p>Escolha um banco para simular ou tenha a nossa ajuda para escolher a melhor opção.</p><a class="link-seta" href="${waHref(E.wa, 'Olá! Quero ajuda com financiamento imobiliário.')}" target="_blank" rel="noopener">Simule conosco ${ic('seta')}</a></div><ul class="bancos">${bancos.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}${ic('ext')}</a></li>`).join('')}</ul></div></section>`;

// ---------- Versão A: Quadras (clara, as cinco faixas verdes do logo) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="cab-a"><div class="in">${listras}<p class="k">${k}</p><h1>${t}</h1></div></section>`;
  const fatias = Array.from({ length: 5 }, (_, i) => `<span style="--i:${i}"></span>`).join('');
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt">
      <p class="k">Imobiliária em Brasília · desde 1985</p>
      <h1>Da sala na Asa Norte à chácara no Lago Oeste.</h1>
      <p>Venda, locação, administração e avaliação de imóveis no DF e entorno, com corretores que estão no mercado há mais de 30 anos.</p>
      <p class="bts"><a class="btn" href="${link(v, 'imoveis')}?neg=venda">Quero comprar</a><a class="btn btn-linha" href="${link(v, 'imoveis')}?neg=aluguel">Quero alugar</a></p>
    </div>
    <a class="hero-a-foto" href="${link(v, 'imoveis/1088')}" aria-label="Ver a Chácara Solar Yung, Lago Oeste">
      <span class="fatias" style="--img:url(${foto('1088')})">${fatias}</span>
      <span class="hero-a-leg">Chácara Solar Yung · Lago Oeste · 2 ha</span>
    </a>
  </div>
  <div class="in">${filtro(v, 'filtro-hero')}</div>
</section>
<section class="in duas-frentes">
  <a class="frente" href="${link(v, 'imoveis')}?tipo=Sala%20comercial"><span class="frente-foto">${img(foto('794'), 'Prédio comercial na SEPN 511, Asa Norte')}</span><span class="frente-txt"><small>${cidade.length} imóveis</small><strong>Comerciais e na cidade</strong><span>Salas, lojas e andar corporativo na Asa Norte e Asa Sul, apartamento em Águas Claras, prédios e galpão.</span></span></a>
  <a class="frente" href="${link(v, 'imoveis')}?tipo=Ch%C3%A1cara"><span class="frente-foto">${img(foto('1027'), 'Chácara na Rua 5 do Lago Oeste')}</span><span class="frente-txt"><small>${campo.length} imóveis</small><strong>Chácaras, casas e lotes</strong><span>Chácaras de 1 a 4 hectares no Lago Oeste, Rota do Cavalo e Samambaia, casas em condomínio e lote em Goiás.</span></span></a>
</section>
<section class="in bloco"><header class="tit tit-linha"><div>${listras}<p class="k">Em destaque</p><h2>Imóveis selecionados</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${IMV.length} imóveis ${ic('seta')}</a></header>${grade(v, ['1027', '883', '743', '874', '1035', '842'].map(por))}</section>
<section class="servs-a"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Comprar e alugar é só uma parte</h2></header><div class="servs-grade">${servicos.map((s, i) => `<a class="serv" href="${link(v, s.s)}"><span class="serv-n">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</div></div></section>
<section class="in bairros-a"><header class="tit"><p class="k">Por região</p><h2>Onde estão os imóveis</h2></header><ul>${bairros.map(b => `<li><a href="${link(v, 'imoveis')}?bairro=${encodeURIComponent(b)}">${b}<small>${IMV.filter(d => d.bairro === b).length}</small></a></li>`).join('')}</ul></section>
` + financ(v) + cta(v) + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

// ---------- Versão B: Lago Oeste (escura, foto aérea, fichas com área em hectares) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  const ha = chacaras.reduce((s, d) => s + num(d.feats['Área Terreno'] || d.feats['Área Útil'] || d.feats['Área Total'] || 0), 0);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b" style="--img:url(${foto('1088', 4)})">
  <div class="in hero-b-in">
    <p class="k">Divino Imóveis · Brasília</p>
    <h1>Terra, sala ou lar. Desde 1985 no mercado de Brasília.</h1>
    <p>Chácaras no Lago Oeste e em Sobradinho, salas e lojas na Asa Norte, casas e prédios no DF. Venda, locação, administração e avaliação judicial.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${IMV.length} imóveis</a><a class="btn btn-linha" href="${link(v, 'avaliacao')}">Avaliação de imóveis</a></p>
  </div>
  <p class="in hero-b-leg">Foto: Chácara Solar Yung, Lago Oeste (Cód. 1088)</p>
</section>
<section class="busca-b"><div class="in">${filtro(v)}</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Fora do Plano</p><h2>Chácaras</h2></div><p class="tit-num"><strong>${(ha / 10000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ha</strong><span>somando as chácaras à venda com área informada</span></p></header>${grade(v, chacaras)}</section>
<section class="faixa-b"><div class="in faixa-b-in">
  <div class="faixa-b-foto">${img(foto('743', 3), 'Prédio comercial na SEPN 515, Asa Norte')}</div>
  <div><p class="k">No Plano Piloto</p><h2>O escritório fica no mesmo prédio das salas que alugamos.</h2><p>SEPN 515, Bloco E: salas a partir de 42 m² com ar-condicionado central e lojas térreas de 58 m², prontas para ocupar.</p><a class="link-seta" href="${link(v, 'imoveis')}?bairro=Asa%20Norte">Imóveis na Asa Norte ${ic('seta')}</a></div>
</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Na cidade</p><h2>Comerciais, apartamento e casas</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Todos os imóveis ${ic('seta')}</a></header>${grade(v, IMV.filter(d => d.tipo !== 'Chácara').slice(0, 6))}</section>
<section class="servs-b"><div class="in servs-b-in">${servicos.map((s, i) => `<a class="serv" href="${link(v, s.s)}"><span class="serv-n">${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></a>`).join('')}</div></section>
` + financ(v) + cta(v) + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
fs.copyFileSync(path.join(aqui, 'imoveis.js'), path.join(pub, 'assets/imoveis.js'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Divino Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#00a46b', fundo: '#004352', claro: '#f3f1ea',
  fonteTitulo: '"Kumbh Sans",system-ui,sans-serif', fonteTexto: '"Atkinson Hyperlegible",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + IMV.length, texto: 'Clara, com as cinco faixas verdes do logo recortando a foto de abertura e os imóveis divididos entre cidade e campo.', pontos: ['Busca por compra/aluguel, tipo e região', `${IMV.length} imóveis reais, cada um com página e fotos`, 'Avaliação judicial com página própria'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + IMV.length, texto: 'Escura, abre com a foto aérea de uma chácara do Lago Oeste e mostra as chácaras em fichas com a área em hectares.', pontos: ['"Terra, sala ou lar"', 'Chácaras em destaque, com hectares', 'O escritório no prédio das salas para alugar'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
