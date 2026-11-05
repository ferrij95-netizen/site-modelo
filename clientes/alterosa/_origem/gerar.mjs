// Alterosa Imobiliária (Brotas, Salvador/BA, desde 1996). Gera public/{a,b}/ e a página de escolha.
// node clientes/alterosa/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs alterosa http://www.alterosaimobiliaria.com.br/)
// Imóveis em imoveis.json, tirados das páginas de cada imóvel do site atual (plataforma Imobia), fotos em assets/img/imoveis/<cód>-<n>.webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const IM = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8'));
const E = {
  nome: 'Alterosa Imobiliária', url: 'https://alterosa.overtus.com.br/', antigo: 'http://www.alterosaimobiliaria.com.br/',
  wa: '5571999997237', waTxt: '(71) 99999-7237',
  fones: ['(71) 3356-5111', '(71) 99999-7237'],
  email: 'atendimento@alterosaimobiliaria.com.br',
  end: 'Rua Waldemar Falcão, 32', bairro: 'Brotas, Salvador/BA',
  curto: 'Imobiliária em Brotas, Salvador, desde 1996: administração de aluguéis e venda de imóveis. CRECI/BA J-952.',
};
const missao = 'Ofertar soluções eficientes aos que necessitam de segurança e agilidade em negócios imobiliários, através de serviços baseados na alta qualidade de atendimento, ética e competência da nossa equipe, buscando atender de forma plena as expectativas dos nossos clientes e colaboradores.';
const quem = [
  'Atuando no mercado imobiliário de Salvador desde 1996, a Alterosa Imobiliária foi concebida com o objetivo de prestar serviços de qualidade nas áreas de administração de aluguéis e vendas de imóveis.',
  'Especializada na gestão de aluguéis, conquistou uma sólida carteira de clientes, graças à satisfação com a excelência dos serviços prestados, qualidade total em atendimento, conduta ética e profissionalismo da nossa equipe.',
  'Dirigida pelo corretor de imóveis Manoel Pachêco Pereira, CRECI 6829 BA, economista com especialização em Marketing e em Gestão Estratégica de Negócios, nossa empresa é devidamente registrada em todos os órgãos regulamentadores e no CRECI (Conselho Regional dos Corretores de Imóveis), através da inscrição J-952.',
  'A experiência acumulada e a constante modernização contribuíram para a criação de uma metodologia de trabalho que nos permite ofertar aos clientes os mais altos graus de segurança em negócios imobiliários, reduzindo significativamente os riscos inerentes aos contratos de locação.',
];
const pilares = [
  { t: 'Gestão de aluguéis', d: 'Nossa especialidade desde 1996: uma carteira sólida de proprietários que confiam a locação à Alterosa.', i: 'chave' },
  { t: 'Venda de imóveis', d: 'Apartamentos, casas e imóveis comerciais em Brotas e em outros bairros de Salvador.', i: 'casa' },
  { t: 'Contratos mais seguros', d: 'Uma metodologia de trabalho que reduz os riscos inerentes aos contratos de locação.', i: 'escudo' },
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
  { slug: 'financiamento', nome: 'Financiamento' }, { slug: 'anuncie', nome: 'Anuncie' }, { slug: 'contato', nome: 'Fale conosco' },
];
export const nomesVersao = { a: 'Telhado', b: 'Carteira' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Spectral:wght@500;700;800&family=Albert+Sans:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Antonio:wght@500;700&family=Rubik:wght@400;500;600&display=swap',
};
const cores = { a: '#2a3391', b: '#1c2366' };

// ---------- dados ----------
const area = v => `${parseFloat(v).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`;
const rotulo = k => ({ Iptu: 'IPTU', Aluguel: 'Aluguel (opção)' }[k] || k);
const IMV = IM.map(d => {
  const f = d.feats;
  const ar = f['Área Útil'] || f['Área Privativa'] || f['Área Total'];
  return {
    ...d, area: ar ? area(ar) : '', quartos: f['Dormitórios'], banhos: f['Banheiros'], vagas: f['Garagens'],
    aPartir: /a partir/i.test(d.preco), preco: d.preco.replace(/^A partir de\s*/i, ''),
    negLabel: d.negocio === 'venda' ? 'Venda' : 'Aluguel',
  };
});
const venda = IMV.filter(d => d.negocio === 'venda'), aluguel = IMV.filter(d => d.negocio === 'aluguel');
const tipos = [...new Set(IMV.map(d => d.tipo))];
const bairros = [...new Set(IMV.map(d => d.bairro))].sort((a, b) => a.localeCompare(b, 'pt'));
const porCod = c => IMV.find(d => d.cod === c);
const foto = (cod, n = 1) => `/assets/img/imoveis/${cod}-${n}.webp`;
const img = (src, alt = '', extra = '') => `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const linkImv = (v, d) => link(v, `imoveis/${d.cod}`);
const waImv = d => waHref(E.wa, `Olá! Tenho interesse no imóvel Cód. ${d.cod} (${d.tipo}, ${d.bairro}).`);
const qt = q => { const n = q.replace(/\s*\(.*\)/, ''); return `${n} ${n === '1' ? 'quarto' : 'quartos'}`; };
const resumo = d => [d.area && [d.area, 'medidor'], d.quartos && [qt(d.quartos), 'casa'], d.banhos && [`${d.banhos} banh.`, 'chuveiro'], d.vagas && [`${d.vagas} ${d.vagas === '1' ? 'vaga' : 'vagas'}`, 'carro']].filter(Boolean);
const precoHtml = d => `${d.aPartir ? '<small>a partir de</small> ' : ''}${d.preco.replace('/mês', '<small>/mês</small>')}`;

// ---------- peças comuns ----------
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Alterosa Imobiliária | Aluguel e venda de imóveis em Salvador' : `${titulo} | Alterosa Imobiliária`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (v, claro) => `<a class="marca" href="${link(v, 'index')}" aria-label="Alterosa Imobiliária, página inicial"><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" alt="Alterosa Imobiliária, CRECI/BA J-952" width="830" height="506"></a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="topo-fio"><div class="in"><span>${ic('pin')}${E.end} · ${E.bairro}</span><span class="fio-fones">${E.fones.map(f => `<a href="${telHref(f)}">${ic('tel')}${f}</a>`).join('')}</span></div></div>
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s.startsWith('imoveis') ? 'imoveis' : s)}</ul></nav>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Alterosa Imobiliária" width="830" height="506" loading="lazy"><p>${E.curto}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Entre em contato</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li>
      ${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Alterosa Imobiliária · CRECI/BA J-952 · Diretor: Manoel Pachêco Pereira, CRECI 6829 BA</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Gostaria de falar com a Alterosa.')}" target="_blank" rel="noopener" aria-label="Chamar no WhatsApp">${icWa()}</a>
<script src="/assets/imoveis.js" defer></script>
</body>
</html>
`;
}

const filtro = (v, cls = '') => `<form class="filtro ${cls}" action="${link(v, 'imoveis')}" method="get" data-filtro>
  <fieldset class="filtro-neg"><legend class="vh">Negócio</legend>
    <label><input type="radio" name="neg" value="" checked><span>Todos</span></label>
    <label><input type="radio" name="neg" value="aluguel"><span>Alugar</span></label>
    <label><input type="radio" name="neg" value="venda"><span>Comprar</span></label>
  </fieldset>
  <label><span>Tipo</span><select name="tipo"><option value="">Qualquer tipo</option>${tipos.map(t => `<option>${t}</option>`).join('')}</select></label>
  <label><span>Bairro</span><select name="bairro"><option value="">Todos os bairros</option>${bairros.map(b => `<option>${b}</option>`).join('')}</select></label>
  <button class="btn" type="submit">Buscar</button>
</form>`;

const dataAttrs = d => `data-neg="${d.negocio}" data-tipo="${esc(d.tipo)}" data-bairro="${esc(d.bairro)}"`;
// A: cartão com etiqueta em forma de telhado
const cartaoA = (v, d) => `<article class="imv" ${dataAttrs(d)}>
  <a class="imv-foto" href="${linkImv(v, d)}">${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}<span class="imv-neg imv-${d.negocio}">${d.negLabel}</span></a>
  <div class="imv-txt">
    <p class="imv-onde">${ic('pin')}${d.bairro}</p>
    <h3><a href="${linkImv(v, d)}">${esc(d.titulo)}</a></h3>
    <ul class="imv-dados">${resumo(d).map(([t, i]) => `<li>${ic(i)}${t}</li>`).join('')}</ul>
    <p class="imv-rodape"><span class="imv-preco">${precoHtml(d)}</span><span class="imv-cod">Cód. ${d.cod}</span></p>
  </div>
</article>`;
// B: placa de foto grande com informação sobreposta
const cartaoB = (v, d) => `<article class="imv placa" ${dataAttrs(d)}>
  <a href="${linkImv(v, d)}" class="placa-link">
    ${img(foto(d.cod), `${d.tipo} em ${d.bairro}`)}
    <span class="placa-tag imv-${d.negocio}">${d.negLabel} · Cód. ${d.cod}</span>
    <span class="placa-info"><span class="placa-onde">${d.tipo} · ${d.bairro}</span><strong class="placa-tit">${esc(d.titulo)}</strong><span class="placa-pe"><span class="imv-preco">${precoHtml(d)}</span><span class="placa-dados">${resumo(d).map(([t]) => t).join(' · ')}</span></span></span>
  </a>
</article>`;
const cartao = (v, d) => (v === 'a' ? cartaoA : cartaoB)(v, d);
const grade = v => (v === 'a' ? 'grade-imv' : 'placas');

const formContato = (assunto = 'Contato pelo site') => `<form class="form" data-wa="${assunto}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da Alterosa com a sua mensagem pronta.</p>
</form>`;
const formAnuncie = () => `<form class="form" data-wa="Quero anunciar meu imóvel">
  <h3 class="form-tit">Informações básicas</h3>
  <div class="form-duas"><label>Finalidade<select name="finalidade" required><option>Aluguel</option><option>Venda</option></select></label><label>Tipo de imóvel<select name="tipo">${['Apartamento', 'Casa', 'Loja', 'Ponto comercial', 'Sala comercial'].map(t => `<option>${t}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Valor<input name="valor" required inputmode="numeric" placeholder="R$"></label><label>Área do imóvel<input name="area" placeholder="m²"></label></div>
  <div class="form-duas"><label>Dormitórios<input name="dormitorios" inputmode="numeric"></label><label>Banheiros<input name="banheiros" inputmode="numeric"></label></div>
  <h3 class="form-tit">Localização</h3>
  <label>Endereço<input name="endereco" required autocomplete="street-address"></label>
  <div class="form-duas"><label>Bairro<input name="bairro" required></label><label>Cidade<input name="cidade" required value="Salvador/BA"></label></div>
  <label>CEP<input name="cep" inputmode="numeric" autocomplete="postal-code"></label>
  <label>Informações detalhadas<textarea name="detalhes" rows="3"></textarea></label>
  <h3 class="form-tit">Contato</h3>
  <div class="form-duas"><label>Nome completo<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" required autocomplete="email"></label>
  <button class="btn" type="submit">${icWa()}Enviar cadastro pelo WhatsApp</button>
</form>`;
const mapa = `<iframe class="mapa" title="Mapa da Alterosa Imobiliária" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Waldemar Falcão 32 Brotas Salvador BA')}&z=16&output=embed"></iframe>`;

function paginaImovel(v, d) {
  const fotos = Array.from({ length: d.fotos }, (_, i) => i + 1);
  const fichas = Object.entries(d.feats).map(([k, x]) => `<div><dt>${k}</dt><dd>${/Área/.test(k) ? area(x) : x}</dd></div>`).join('');
  const custos = Object.entries(d.extras).map(([k, x]) => `<li><span>${rotulo(k)}</span><strong>${x}</strong></li>`).join('');
  const grupos = Object.entries(d.grupos || {}).filter(([, l]) => l.length).map(([g, l]) => `<div class="ficha-grupo"><h3>${g === 'Imóvel' ? 'No imóvel' : g === 'Localização' ? 'Por perto' : g}</h3><ul>${l.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul></div>`).join('');
  const parecidos = IMV.filter(o => o.cod !== d.cod && o.negocio === d.negocio).sort((a, b) => (b.bairro === d.bairro) - (a.bairro === d.bairro)).slice(0, 3);
  const desc = esc(d.desc.replace(/\n\s*\n(?=\s*-)/g, '\n')).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br>');
  return head(v, `imoveis/${d.cod}`, `${d.tipo} em ${d.bairro}, Cód. ${d.cod}`, `${d.titulo}. ${d.negLabel}: ${d.preco}. ${d.bairro}, Salvador/BA.`) + topo(v, 'imoveis') + `
<section class="in ficha">
  <p class="trilha"><a href="${link(v, 'imoveis')}">Imóveis</a> / <a href="${link(v, 'imoveis')}?neg=${d.negocio}">${d.negocio === 'venda' ? 'Comprar' : 'Alugar'}</a> / Cód. ${d.cod}</p>
  <div class="ficha-galeria">
    <a class="ficha-capa" href="${foto(d.cod)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod), d.titulo, ' loading="eager" fetchpriority="high"')}</a>
    <div class="ficha-miniaturas">${fotos.slice(1).map(n => `<a href="${foto(d.cod, n)}" data-foto="${esc(d.titulo)}">${img(foto(d.cod, n), `${d.tipo} em ${d.bairro}, foto ${n}`)}</a>`).join('')}</div>
  </div>
  <div class="ficha-corpo">
    <div class="ficha-texto">
      <p class="imv-onde"><span class="imv-neg imv-${d.negocio}">${d.negLabel}</span>${d.tipo} · ${d.rua}, ${d.bairro} · Salvador/BA</p>
      <h1>${esc(d.titulo)}</h1>
      <dl class="ficha-dados">${fichas}</dl>
      <h2>Descrição</h2>
      <div class="ficha-desc"><p>${desc}</p></div>
      ${grupos ? `<div class="ficha-grupos">${grupos}</div>` : ''}
    </div>
    <aside class="ficha-lado">
      <p class="ficha-cod">Cód. ${d.cod}</p>
      <p class="ficha-preco">${precoHtml(d)}</p>
      ${custos ? `<ul class="ficha-custos">${custos}</ul>` : ''}
      <a class="btn" href="${waImv(d)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a>
      <a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a>
      <p class="ficha-nota">Os valores publicados estão sujeitos a alterações; confirme com a nossa equipe.</p>
    </aside>
  </div>
</section>
${parecidos.length ? `<section class="in parecidos"><h2>Outros imóveis ${d.negocio === 'venda' ? 'à venda' : 'para alugar'}</h2><div class="${grade(v)}">${parecidos.map(o => cartao(v, o)).join('')}</div></section>` : ''}
` + rodape(v);
}

function paginasComuns(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis para alugar e à venda em Salvador', `${aluguel.length} imóveis para alugar e ${venda.length} à venda em Salvador: apartamentos, casas, lojas e salas comerciais.`) + topo(v, 'imoveis') +
    cab('Imóveis', 'Para alugar e à venda em Salvador') + `
<section class="in busca">
  ${filtro(v, 'filtro-fixo')}
  <p class="busca-total" data-total aria-live="polite">${IMV.length} imóveis</p>
  <div class="${grade(v)}" data-lista>${[...aluguel, ...venda].map(d => cartao(v, d)).join('')}</div>
  <div class="busca-vazio" data-vazio hidden><p>Nenhum imóvel com esses filtros agora. Conte o que você procura que a nossa equipe busca para você.</p><a class="btn" href="${waHref(E.wa, 'Olá! Estou procurando um imóvel e não achei no site.')}" target="_blank" rel="noopener">${icWa()}Pedir pelo WhatsApp</a></div>
</section>
` + rodape(v);
  for (const d of IMV) pag[`imoveis/${d.cod}`] = paginaImovel(v, d);
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'Alterosa Imobiliária: no mercado de Salvador desde 1996, especializada na gestão de aluguéis. CRECI J-952.') + topo(v, 'quem-somos') +
    cab('Quem somos', 'Em Salvador desde 1996') + `
<section class="in quem">
  <div class="quem-txt">${quem.map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${p}</p>`).join('')}</div>
  <aside class="quem-lado">
    <figure class="quem-missao"><p class="k">Nossa missão</p><blockquote>${missao}</blockquote></figure>
    <dl class="quem-dados"><div><dt>Desde</dt><dd>1996</dd></div><div><dt>CRECI</dt><dd>J-952</dd></div><div><dt>Diretor</dt><dd>Manoel Pachêco Pereira<small>CRECI 6829 BA</small></dd></div></dl>
  </aside>
</section>
<section class="in pilares"><header class="tit"><h2>O que fazemos</h2></header><div class="pilares-grade">${pilares.map(s => `<article class="pilar">${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
` + cta(v) + rodape(v);
  pag.financiamento = head(v, 'financiamento', 'Financiamento imobiliário', 'Simule o financiamento do seu imóvel na Caixa, Santander, Banco do Brasil, Bradesco ou Itaú, ou tenha a ajuda da Alterosa.') + topo(v, 'financiamento') +
    cab('Financiamento', 'Financiamento imobiliário') + `
<section class="in financ">
  <div><p class="lead">Escolha um banco para simular ou tenha nossa ajuda para escolher a melhor opção.</p>
  <p>Os simuladores abrem no site de cada banco. Com o resultado em mãos, fale com a Alterosa para comparar as propostas.</p>
  <a class="btn" href="${waHref(E.wa, 'Olá! Quero ajuda com financiamento imobiliário.')}" target="_blank" rel="noopener">${icWa()}Simule conosco</a></div>
  <ul class="bancos">${bancos.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener"><strong>${n}</strong><span>Simular no site do banco ${ic('ext')}</span></a></li>`).join('')}</ul>
</section>
` + rodape(v);
  pag.anuncie = head(v, 'anuncie', 'Anuncie seu imóvel', 'Tem imóvel para alugar ou vender em Salvador? Cadastre aqui e a Alterosa entra em contato.') + topo(v, 'anuncie') +
    cab('Anuncie', 'Você tem imóvel para vender ou alugar?') + `
<section class="in anuncie">
  <div class="anuncie-txt"><p class="lead">Preencha os dados do imóvel e a nossa equipe entra em contato.</p>
  <ul class="lista-check"><li>${ic('check')}Administração de aluguéis desde 1996</li><li>${ic('check')}Venda de imóveis em Salvador</li><li>${ic('check')}Imobiliária registrada no CRECI (J-952)</li></ul>
  <p>Prefere conversar? Ligue para <a href="${telHref(E.fones[0])}">${E.fones[0]}</a> ou passe no escritório em Brotas.</p></div>
  ${formAnuncie()}
</section>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Fale conosco', `Fale com a Alterosa Imobiliária: ${E.end}, ${E.bairro}. ${E.fones.join(', ')}. ${E.email}`) + topo(v, 'contato') +
    cab('Fale conosco', 'Faça uma visita ou envie uma mensagem') + `
<section class="in contato">
  <div class="contato-dados">
    <h2>Faça uma visita</h2>
    <p>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></p>
    ${E.fones.map(f => `<p>${ic('tel')}<a href="${telHref(f)}">${f}</a></p>`).join('')}
    <p>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></p>
    ${mapa}
  </div>
  <div class="contato-form"><h2>Envie uma mensagem</h2>${formContato()}</div>
</section>
` + rodape(v);
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Você tem imóvel para vender ou alugar?</h2><p>Cadastre o imóvel e a Alterosa entra em contato.</p></div><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'contato')}">Falar com a equipe</a></p></div></section>`;

// ---------- Versão A: Telhado (clara, serifa como a do logo, foto em forma de casa) ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><span class="cab-telhado" aria-hidden="true"></span></section>`;
  const dest = ['50964', '204638', '209742', '190004', '200942', '204843'].map(porCod);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-in">
    <div class="hero-a-txt">
      <p class="k">Imobiliária em Brotas · Salvador · desde 1996</p>
      <h1>Encontre o imóvel dos seus sonhos com quem <em>cuida de aluguéis</em> desde 1996.</h1>
      <p>Administração de aluguéis e venda de imóveis, com atendimento próximo, ética e a segurança de uma imobiliária registrada no CRECI (J-952).</p>
      ${filtro(v, 'filtro-hero')}
    </div>
    <figure class="hero-a-casa"><div class="casa-recorte">${img(foto('50964'), 'Edifício do apartamento à venda no Horto Florestal', ' loading="eager" fetchpriority="high"')}</div><figcaption>Horto Florestal · 4 quartos, 3 suítes · Cód. 50964</figcaption></figure>
  </div>
</section>
<section class="numeros-a"><div class="in numeros-a-in">
  <a href="${link(v, 'imoveis')}?neg=aluguel"><strong>${aluguel.length}</strong><span>imóveis para alugar</span></a>
  <a href="${link(v, 'imoveis')}?neg=venda"><strong>${venda.length}</strong><span>imóveis à venda</span></a>
  <div><strong>1996</strong><span>no mercado desde</span></div>
  <div><strong>J-952</strong><span>registro no CRECI/BA</span></div>
</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Em destaque</p><h2>Selecionamos algumas das melhores opções para você morar ou investir</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver os ${IMV.length} imóveis ${ic('seta')}</a></header><div class="grade-imv">${dest.map(d => cartao(v, d)).join('')}</div></section>
<section class="gestao-a"><div class="in gestao-a-in">
  <div class="gestao-a-txt"><p class="k">Para proprietários</p><h2>Especializada na gestão de aluguéis</h2><p>${quem[1]}</p><p>${quem[3]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a Alterosa ${ic('seta')}</a></div>
  <ul class="pilares-lista">${pilares.map(s => `<li>${ic(s.i)}<div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ul>
</div></section>
<section class="in bairros-a"><header class="tit"><p class="k">Por bairro</p><h2>Onde estão nossos imóveis</h2></header><ul>${bairros.map(b => `<li><a href="${link(v, 'imoveis')}?bairro=${encodeURIComponent(b)}">${b}<small>${IMV.filter(d => d.bairro === b).length}</small></a></li>`).join('')}</ul></section>
` + cta(v) + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

// ---------- Versão B: Carteira (azul do logo, faixa do skyline de Salvador, aluguéis primeiro) ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">
  <div class="in hero-b-in">
    <p class="k">Alterosa Imobiliária · CRECI/BA J-952</p>
    <h1>Aluguel e venda de imóveis em Salvador. <span>Desde 1996.</span></h1>
    <p class="hero-b-sub">Especializada na gestão de aluguéis, com escritório em Brotas e atendimento direto da nossa equipe.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}?neg=aluguel">Quero alugar</a><a class="btn btn-claro" href="${link(v, 'imoveis')}?neg=venda">Quero comprar</a><a class="btn btn-linha" href="${link(v, 'anuncie')}">Tenho um imóvel</a></p>
  </div>
  <div class="hero-b-skyline">${img('/assets/img/salvador.webp', 'Prédios de Salvador vistos do alto, com o mar ao fundo', ' loading="eager" fetchpriority="high"')}</div>
</section>
<section class="busca-b"><div class="in">${filtro(v)}</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Para alugar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}?neg=aluguel">Todos os ${aluguel.length} ${ic('seta')}</a></header><div class="placas">${['209742', '209405', '200942', '201300'].map(c => cartao(v, porCod(c))).join('')}</div></section>
<section class="in bloco"><header class="tit tit-linha"><div><p class="k">Venda</p><h2>Para comprar</h2></div><a class="link-seta" href="${link(v, 'imoveis')}?neg=venda">Todos os ${venda.length} ${ic('seta')}</a></header><div class="placas">${['50964', '204638', '190004', '200927'].map(c => cartao(v, porCod(c))).join('')}</div></section>
<section class="prop-b"><div class="in prop-b-in">
  <div><p class="k">Proprietário</p><h2>Seu imóvel na carteira da Alterosa</h2><p>${quem[1]}</p><p class="bts"><a class="btn" href="${link(v, 'anuncie')}">Anunciar meu imóvel</a></p></div>
  <ol class="prop-passos">${pilares.map((s, i) => `<li><span>0${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="in missao-b"><p class="k">Nossa missão</p><blockquote>${missao}</blockquote><p class="missao-ass">Manoel Pachêco Pereira · diretor · CRECI 6829 BA</p></section>
<section class="in financ-b"><div><p class="k">Financiamento</p><h2>Simule nos principais bancos</h2><p>Escolha um banco para simular ou tenha nossa ajuda para escolher a melhor opção.</p></div><ul class="bancos-mini">${bancos.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n} ${ic('ext')}</a></li>`).join('')}</ul></section>
` + rodape(v);
  paginasComuns(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
fs.copyFileSync(path.join(aqui, 'imoveis.js'), path.join(pub, 'assets/imoveis.js'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Alterosa Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#bf1e2d', fundo: '#2a3391', claro: '#f7f5f0',
  fonteTitulo: '"Spectral",Georgia,serif', fonteTexto: '"Albert Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6 + IMV.length, texto: 'Clara, com a serifa e as cores do logo e a foto de abertura recortada na forma da casa da marca.', pontos: ['Busca por aluguel/compra, tipo e bairro', `${IMV.length} imóveis reais, cada um com página e fotos`, 'Gestão de aluguéis em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6 + IMV.length, texto: 'Azul do logo com a faixa do skyline de Salvador, aluguéis primeiro e imóveis em placas de foto grande.', pontos: ['"Aluguel e venda em Salvador. Desde 1996."', 'Passo a passo para proprietários', 'Simuladores dos 5 bancos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
