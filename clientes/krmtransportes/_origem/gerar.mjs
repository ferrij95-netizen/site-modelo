// KRM Transportes (Ponta Grossa/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/krmtransportes/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs krmtransportes http://www.krmtransportes.com.br/)
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'KRM Transportes', url: 'https://krmtransportes.overtus.com.br/', antigo: 'http://www.krmtransportes.com.br/',
  consulta: 'http://www.krmtransportes.com.br/consulta.cgi', social: 'http://www.krmtransportes.com.br/social',
  fone: '(42) 3026-2700', wa: '5542988020914', waTxt: '(42) 98802-0914',
  rua: 'Rua Arno Wolf, 100', bairro: 'Colônia Dona Luiza', cidade: 'Ponta Grossa - PR', cep: '84046-240',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Arno+Wolf,+100,+Ponta+Grossa+PR',
  empresa: ['Com mais de 15 anos cobrindo as principais rotas comerciais do Brasil, a KRM Transportes é uma das mais bem conceituadas empresas de transporte de cargas do país. Além dos profissionais, carregamos também a política da empresa junto aos clientes: profissionalismo, pontualidade e integridade da mercadoria.',
    'Nossas filiais, distribuídas nos estados de Goiás, Mato Grosso, Paraná, São Paulo e Minas Gerais, atuam com informações integradas, que resultam numa logística eficaz de norte a sul do país e também nas rotas do Mercosul.',
    'Além de unir origem e destino nos prazos estabelecidos, a KRM soma o profissionalismo e a seriedade de seus funcionários à proteção do seguro contra roubo, acidente e meio ambiente. Tudo isso para garantir a total integridade da mercadoria e a tranquilidade dos clientes.',
    'A solução de logística da KRM está baseada numa rede informativa que integra as filiais, que coordenam a frota, formada por caminhões próprios e agregados, destinados ao transporte de produtos líquidos.'],
  frota: 'A KRM opera com os veículos mais adequados para cada necessidade, trazendo agilidade e otimização a todos os processos e serviços. A gestão profissional da frota, aliada a uma eficiente coordenação operacional, tem sido fundamental para a redução dos custos de transporte, proporcionando a competitividade necessária no transporte de produtos líquidos.',
};
const unidades = [
  { uf: 'PR', nome: 'Ponta Grossa · Matriz', end: 'Rua Arno Wolf, 100, Colônia Dona Luiza, CEP 84046-240', fone: '(42) 3026-2700', matriz: true },
  { uf: 'PR', nome: 'Ponta Grossa · CAIS', end: 'Rua Dante La Valle, 144', fone: '(42) 3901-1285', resp: 'Sandro Nunes' },
  { uf: 'PR', nome: 'Ponta Grossa · Posto Torre Alta', end: 'BR-376, Km 504', fone: '(42) 3901-1274', resp: 'Gilmar' },
  { uf: 'PR', nome: 'Cambé', end: 'Rod. Celso Garcia Cid, Km 96', fone: '(42) 3251-1474', resp: 'Luiz' },
  { uf: 'GO', nome: 'Rio Verde', end: 'BR-452, Km 01', fone: '(42) 98811-9027', resp: 'Lazinho' },
  { uf: 'GO', nome: 'Itumbiara', end: 'Via Expressa Múcio de Souza Rezende, 4185', fone: '(42) 98824-3306', resp: 'Edson' },
  { uf: 'SP', nome: 'Orlândia', end: 'Av. Sete, 2230', fone: '(42) 98824-3062', resp: 'Rudimar' },
  { uf: 'MG', nome: 'Uberlândia', end: 'Av. José Andraus Gassani, 4950', fone: '(42) 98811-8438', resp: 'Vicente' },
  { uf: 'MT', nome: 'Alto Araguaia', end: 'BR-364, Km 14', fone: '(66) 99986-8205', resp: 'Ronaldo' },
];
const estados = { PR: 'Paraná', GO: 'Goiás', SP: 'São Paulo', MG: 'Minas Gerais', MT: 'Mato Grosso' };
const setores = [
  { nome: 'Elisângela', dep: 'Faturamento', fones: ['(42) 3026-2704'] },
  { nome: 'Romana', dep: 'Cadastro geral, sinistros, multas e seguradoras', fones: ['(42) 3026-2713', '(42) 98824-1741'] },
  { nome: 'Caroline', dep: 'Contas a pagar', fones: ['(42) 3026-2712'] },
  { nome: 'Maria', dep: 'Recursos Humanos', fones: ['(42) 3026-2707'] },
  { nome: 'Fernando', dep: 'Logística e fretes', fones: ['(42) 3026-2702', '(42) 98802-0914'] },
  { nome: 'Sandro Nunes', dep: 'Controle da frota', fones: ['(42) 3901-1285', '(42) 98840-6952'] },
  { nome: 'Eliel', dep: 'Acerto de motoristas', fones: ['(42) 3901-1285', '(42) 98811-8768'] },
];
const destinos = ['Fretes', 'Logística', 'Faturamento', 'Departamento financeiro', 'Departamento de pagamentos', 'Recursos Humanos', 'Postos de combustíveis', 'Cadastro geral, sinistros, multas e seguradoras'];
const nav = [{ slug: 'index', nome: 'Inicial' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'unidades', nome: 'Unidades' }, { slug: 'frota', nome: 'Frota' }, { slug: 'contato', nome: 'Contato' }, { slug: 'social', nome: 'Social' }];
export const nomesVersao = { a: 'Faixa Azul', b: 'Rota Nacional' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da KRM Transportes e quero uma cotação de frete.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Transporte de produtos líquidos` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1c5dff' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const logo = (claro = false) => `<img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" alt="KRM Transportes" width="400" height="180">`;
const menuConsulta = `<li><a href="${E.consulta}" target="_blank" rel="noopener">Consulta</a></li>`;
const menu = (v, slug) => menuItens(v, nav, slug).replace(/(<li><a[^>]*>Contato<\/a><\/li>)/, `${menuConsulta}$1`);
const listras = '<span class="listras" aria-hidden="true"><i></i><i></i></span>';
const fones = f => f.map(x => `<a href="${telHref(x)}">${x}</a>`).join(' · ');

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${logo()}</a>
    <p class="topo-fone">${ic('tel')}<span><small>Matriz Ponta Grossa</small><a href="${telHref(E.fone)}">${E.fone}</a></span></p>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><div class="in menu-in"><ul>${menu(v, slug)}</ul><img class="bandeira" src="/assets/img/bandeira-brasil.webp" alt="Português" width="30" height="21"></div></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${logo()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menu(v, slug)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Cotar frete</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  ${listras}
  <div class="in rod-grade">
    <div class="rod-marca">${logo(true)}<p>Transporte rodoviário de produtos líquidos com frota própria e agregada, filiais em cinco estados e rotas do Mercosul.</p></div>
    <div><h3>Navegue</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.slug === 'social' ? 'Transparência salarial' : n.nome}</a></li>`).join('')}<li><a href="${E.consulta}" target="_blank" rel="noopener">Consulta</a></li></ul></div>
    <div><h3>Matriz</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.waTxt} · Logística</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} KRM Transportes Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Setor<select name="setor" required><option value="">Escolha um destino para a sua mensagem</option>${destinos.map(d => `<option>${d}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="mensagem" rows="5" required placeholder="Origem, destino, produto e volume, se for cotação de frete"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const listaSetores = cls => `<ul class="${cls}">${setores.map(s => `<li><strong>${s.dep}</strong><span>${s.nome}</span><span>${fones(s.fones)}</span></li>`).join('')}</ul>`;
const cardUnidade = u => `<li class="unid${u.matriz ? ' unid-matriz' : ''}"><b class="uf">${u.uf}</b><div><strong>${u.nome}</strong><span>${ic('pin')}${u.end}</span><span>${ic('tel')}<a href="${telHref(u.fone)}">${u.fone}</a>${u.resp ? ` · Sr. ${u.resp}` : ''}</span></div></li>`;
const porEstado = cls => Object.keys(estados).map(uf => `<section class="${cls}" id="${uf.toLowerCase()}"><h2>${estados[uf]}</h2><ul class="unid-lista">${unidades.filter(u => u.uf === uf).map(cardUnidade).join('')}</ul></section>`).join('');
const mapaFrame = `<iframe class="mapa" title="Mapa da matriz da KRM Transportes" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Arno%20Wolf%2C%20100%2C%20Ponta%20Grossa%20PR&z=15&output=embed"></iframe>`;
const social = `<div class="social-txt">
  <p>Em conformidade com a Lei 14.611/2023, que regulamenta a igualdade salarial entre homens e mulheres, apresentamos nosso relatório de transparência.</p>
  <h2>Nosso compromisso com a remuneração justa</h2>
  <p>A política de remuneração é aplicada a todos os colaboradores, com base em estruturas de funções e valores salariais definidos. Nossas bandas salariais são revisadas periodicamente por meio de processos que incluem análises de mercado, assegurando salários competitivos e justos.</p>
  <ul class="lista-check"><li><span><strong>Revisões anuais:</strong> avaliamos anualmente as posições, as competências e o desempenho individual para garantir a equidade.</span></li><li><span><strong>Gestão sustentável:</strong> mantemos uma política salarial alinhada às melhores práticas do mercado, de forma sustentável para o negócio e livre de discriminação.</span></li></ul>
  <h2>Diversidade, equidade e inclusão</h2>
  <p>Acreditamos que a diversidade é um motor de inovação e crescimento. Por isso, nossa estratégia de DEI é um pilar da nossa gestão. Promovemos um ambiente de trabalho seguro e inclusivo, independentemente de gênero, etnia, orientação sexual, religião ou origem.</p>
  <p>Com base em nossas políticas internas e no nosso compromisso com a equidade, afirmamos estar em conformidade com os critérios estabelecidos na legislação de igualdade salarial entre gêneros, reforçando nossa responsabilidade com um ambiente de trabalho justo e igualitário para todos.</p>
  <a class="btn" href="${E.social}" target="_blank" rel="noopener">${ic('ext')}Baixar os relatórios</a>
</div>`;
const pilares = [
  { ic: 'relogio', t: 'Pontualidade', d: 'Origem e destino unidos nos prazos estabelecidos.' },
  { ic: 'escudo', t: 'Seguro completo', d: 'Proteção contra roubo, acidente e meio ambiente.' },
  { ic: 'gota', t: 'Produtos líquidos', d: 'Frota própria e agregada dedicada a cargas líquidas.' },
  { ic: 'pin', t: 'Rede integrada', d: 'Filiais em GO, MT, PR, SP e MG e rotas do Mercosul.' },
];

function A() {
  const v = 'a', pag = {};
  const faixa = (t, sub) => `<section class="faixa-a">${listras}<div class="in"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  pag.index = head(v, 'index', '', E.empresa[0]) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Transporte de cargas líquidas</p><h1>Há mais de 15 anos nas principais rotas do Brasil</h1><p>Profissionalismo, pontualidade e integridade da mercadoria, de Ponta Grossa para o país e o Mercosul.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Cotar um frete</a><a class="btn btn-linha" href="${link(v, 'unidades')}">Nossas unidades</a></p></div>
  <figure class="hero-a-foto">${img('caminhao-tanque', 'Caminhão tanque da KRM Transportes', ' loading="eager" fetchpriority="high"')}</figure>
</div></section>
<section class="pilares-a in">${pilares.map(p => `<div class="sobe">${ic(p.ic)}<h2>${p.t}</h2><p>${p.d}</p></div>`).join('')}</section>
<section class="duas-a in">
  <div class="caixa-a"><h2>Empresa</h2><p>${E.empresa[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a KRM ${ic('seta')}</a></div>
  <div class="caixa-a"><h2>Nossa frota</h2>${img('frota-patio', 'Frota de caminhões tanque da KRM')}<a class="link-seta" href="${link(v, 'frota')}">Ver a frota ${ic('seta')}</a></div>
</section>
<section class="unid-a in"><h2>Unidades em cinco estados</h2><ul class="uf-a">${Object.keys(estados).map(uf => `<li><a href="${link(v, 'unidades')}#${uf.toLowerCase()}"><b>${uf}</b><span>${estados[uf]}</span><small>${unidades.filter(u => u.uf === uf).length} ${unidades.filter(u => u.uf === uf).length > 1 ? 'unidades' : 'unidade'}</small></a></li>`).join('')}</ul></section>
<section class="cta-a"><div class="in cta-a-in"><p><strong>Precisa transportar carga líquida?</strong> Fale com a logística da KRM.</p><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></section>
` + rodape(v);

  pag.empresa = head(v, 'empresa', 'Empresa', E.empresa[0]) + topo(v, 'empresa') + faixa('Empresa', 'Mais de 15 anos cobrindo as principais rotas comerciais do Brasil.') + `
<section class="texto-a in"><div>${E.empresa.map(t => `<p>${t}</p>`).join('')}</div><figure>${img('frota-fila', 'Caminhões da KRM Transportes')}</figure></section>
<section class="pilares-a in">${pilares.map(p => `<div>${ic(p.ic)}<h2>${p.t}</h2><p>${p.d}</p></div>`).join('')}</section>
` + rodape(v);

  pag.unidades = head(v, 'unidades', 'Unidades', 'Matriz em Ponta Grossa/PR e filiais em Cambé, Rio Verde, Itumbiara, Orlândia, Uberlândia e Alto Araguaia.') + topo(v, 'unidades') + faixa('Unidades', 'Filiais com informações integradas, de norte a sul do país.') + `
<div class="in unid-a-pag">${porEstado('estado-a')}</div>
` + rodape(v);

  pag.frota = head(v, 'frota', 'Nossa frota', E.frota) + topo(v, 'frota') + faixa('Nossa frota', 'Caminhões próprios e agregados para produtos líquidos.') + `
<section class="texto-a in"><div><p>${E.frota}</p><ul class="lista-check"><li>Caminhões próprios e agregados</li><li>Tanques para produtos líquidos</li><li>Controle da frota em Ponta Grossa</li><li>Seguro contra roubo, acidente e meio ambiente</li></ul></div><figure>${img('caminhao-tanque', 'Caminhão tanque Volvo da KRM')}</figure></section>
<section class="galeria-a in">${['caminhao-tanque', 'frota-patio', 'frota-fila'].map(n => `<a href="/assets/img/${n}.webp" data-foto>${img(n, 'Frota KRM Transportes')}</a>`).join('')}</section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a KRM Transportes: ${E.fone}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + faixa('Contato', 'Escolha o setor e envie sua mensagem.') + `
<section class="contato-a in"><div><h2>Envie sua mensagem</h2>${formulario()}</div><aside><h2>Telefones por setor</h2>${listaSetores('setores-a')}</aside></section>
<section class="in mapa-a"><p>${ic('pin')}<span><strong>Matriz:</strong> ${E.rua}, ${E.bairro}, ${E.cidade} · CEP ${E.cep} · <a href="${telHref(E.fone)}">${E.fone}</a></span></p>${mapaFrame}</section>
` + rodape(v);

  pag.social = head(v, 'social', 'Transparência salarial', 'Relatório de transparência e igualdade salarial da KRM Transportes (Lei 14.611/2023).') + topo(v, 'social') + faixa('Relatório de transparência e igualdade salarial') + `
<section class="in texto-a texto-a-uma">${social}</section>
` + rodape(v);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const sub = (k, t, d, foto = 'frota-patio') => `<section class="sub-b"><div class="sub-b-foto">${img(foto, '', ' loading="eager"')}</div><div class="in sub-b-in"><p class="k">${k}</p><h1>${t}</h1>${d ? `<p>${d}</p>` : ''}</div>${listras}</section>`;
  const numeros = `<section class="num-b"><div class="in num-b-in"><div><b>+15</b><span>anos nas rotas do Brasil</span></div><div><b>9</b><span>unidades</span></div><div><b>5</b><span>estados e rotas do Mercosul</span></div><div><b>Líquidos</b><span>frota própria e agregada</span></div></div></section>`;
  pag.index = head(v, 'index', '', E.empresa[0]) + topo(v, 'index') + `
<section class="hero-b">
  <div class="hero-b-foto">${img('caminhao-tanque', 'Caminhão tanque Volvo da KRM Transportes', ' loading="eager" fetchpriority="high"')}</div>
  <div class="in hero-b-in"><div class="hero-b-txt">${listras}<p class="k">KRM Transportes · Ponta Grossa/PR</p><h1>Carga líquida no prazo, de norte a sul</h1><p>Frota própria e agregada, filiais em cinco estados e seguro contra roubo, acidente e meio ambiente.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Cotar um frete</a><a class="btn btn-linha" href="${link(v, 'unidades')}">Ver unidades</a></p></div></div>
</section>
${numeros}
<section class="pilares-b in"><header class="tit-b"><p class="k">Por que a KRM</p><h2>Profissionalismo, pontualidade e integridade da mercadoria</h2></header><div class="pilares-b-grade">${pilares.map((p, i) => `<article class="sobe"><span>0${i + 1}</span>${ic(p.ic)}<h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></section>
<section class="rede-b"><div class="in rede-b-in">
  <div><p class="k">Rede integrada</p><h2>Unidades onde a carga passa</h2><p>${E.empresa[1]}</p><a class="btn" href="${link(v, 'unidades')}">Endereços e telefones</a></div>
  <ol class="rota-b">${unidades.filter(u => !u.nome.includes('CAIS') && !u.nome.includes('Torre')).map(u => `<li><b>${u.uf}</b><span>${u.nome.replace(' · Matriz', '')}${u.matriz ? ' <em>Matriz</em>' : ''}</span></li>`).join('')}</ol>
</div></section>
<section class="frota-b in"><div class="frota-b-fotos">${img('frota-patio', 'Frota de caminhões tanque')}${img('frota-fila', 'Caminhões KRM enfileirados')}</div><div><p class="k">Nossa frota</p><h2>O veículo certo para cada carga</h2><p>${E.frota}</p><a class="link-seta" href="${link(v, 'frota')}">Conheça a frota ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Tem uma carga para levar?</h2><p>Fale direto com a logística.</p><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.waTxt}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></section>
` + rodape(v);

  pag.empresa = head(v, 'empresa', 'Empresa', E.empresa[0]) + topo(v, 'empresa') + sub('Empresa', 'Mais de 15 anos nas principais rotas do Brasil', 'Uma das mais bem conceituadas empresas de transporte de cargas do país.', 'frota-fila') + `
<section class="texto-b in"><div>${E.empresa.map(t => `<p>${t}</p>`).join('')}</div><aside class="pilares-b-lista">${pilares.map(p => `<div>${ic(p.ic)}<span><strong>${p.t}</strong>${p.d}</span></div>`).join('')}</aside></section>
${numeros}
` + rodape(v);

  pag.unidades = head(v, 'unidades', 'Unidades', 'Matriz em Ponta Grossa/PR e filiais em Cambé, Rio Verde, Itumbiara, Orlândia, Uberlândia e Alto Araguaia.') + topo(v, 'unidades') + sub('Unidades', 'Nove pontos de apoio em cinco estados', 'Filiais com informações integradas, que coordenam a frota de norte a sul.') + `
<nav class="abas-b in" aria-label="Estados">${Object.keys(estados).map(uf => `<a href="#${uf.toLowerCase()}"><b>${uf}</b>${estados[uf]}</a>`).join('')}</nav>
<div class="in">${porEstado('estado-b')}</div>
` + rodape(v);

  pag.frota = head(v, 'frota', 'Nossa frota', E.frota) + topo(v, 'frota') + sub('Nossa frota', 'Caminhões próprios e agregados para produtos líquidos', '', 'caminhao-tanque') + `
<section class="texto-b in"><div><p>${E.frota}</p></div><ul class="lista-check"><li>Caminhões próprios e agregados</li><li>Tanques para produtos líquidos</li><li>Controle da frota em Ponta Grossa</li><li>Seguro contra roubo, acidente e meio ambiente</li></ul></section>
<section class="galeria-b in">${['caminhao-tanque', 'frota-patio', 'frota-fila'].map(n => `<a href="/assets/img/${n}.webp" data-foto>${img(n, 'Frota KRM Transportes')}</a>`).join('')}</section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a KRM Transportes: ${E.fone}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + sub('Contato', 'Fale com o setor certo', 'Escolha o destino da mensagem e envie pelo WhatsApp, ou ligue direto para o setor.') + `
<section class="contato-b in"><div class="contato-b-form"><h2>Envie sua mensagem</h2>${formulario()}</div><div><h2>Telefones por setor</h2>${listaSetores('setores-b')}</div></section>
<section class="in mapa-b"><p>${ic('pin')}<span><strong>Matriz:</strong> ${E.rua}, ${E.bairro}, ${E.cidade} · CEP ${E.cep}</span></p>${mapaFrame}</section>
` + rodape(v);

  pag.social = head(v, 'social', 'Transparência salarial', 'Relatório de transparência e igualdade salarial da KRM Transportes (Lei 14.611/2023).') + topo(v, 'social') + sub('Social', 'Relatório de transparência e igualdade salarial', 'Lei 14.611/2023.', 'frota-fila') + `
<section class="in texto-b texto-b-uma">${social}</section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#1c5dff', fundo: '#0a1d4d', claro: '#f2f5fb',
  fonteTitulo: 'Saira,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site atual: logo no topo branco, a barra de menu escura com a bandeira e os mesmos itens (Inicial, Empresa, Unidades, Frota, Consulta, Contato, Social), agora com as faixas vermelha e amarela do logo.', pontos: ['As 9 unidades separadas por estado', 'Telefones de cada setor na página de contato', 'Mensagem para o setor certo pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna: o caminhão tanque em tela cheia, números da empresa, a rota das unidades e o azul do logo em destaque.', pontos: ['+15 anos, 9 unidades e 5 estados logo na abertura', 'Rota visual de Ponta Grossa até Alto Araguaia', 'Botão de cotação de frete em todas as páginas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
});
