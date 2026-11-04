// Transportadora Asa de Prata (Recife/PE, desde 1977). Gera public/{a,b}/ e a página de escolha.
// node clientes/asadeprata/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs asadeprata http://www.asadeprata.com.br/)
// Textos, unidades, contatos e serviços: do site atual (HTML estático). Fotos: recortes das imagens do próprio site (são poucas e pequenas).
// Logo: no site atual o logo está "colado" no fundo do topo, com brilho; foi redesenhado em SVG (anel azul + caixas prateadas + "Asa de Prata"), ver LEIA-ME.
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Asa de Prata', url: 'https://asadeprata.overtus.com.br/', antigo: 'http://www.asadeprata.com.br/',
  fone: '(81) 2138-5800', fax: '(81) 2138-5814', email: 'sac@asadeprata.com.br',
  rua: 'Rua Coronel Fabriciano, 131', bairro: 'Imbiribeira', cidade: 'Recife - PE', cep: '51150-070',
  curto: 'Transporte rodoviário de cargas fechadas e fracionadas e logística integrada, com foco no Nordeste. Desde 1977, transportando com segurança.',
};
const historia = [
  'Fundada em 1977, a Asa de Prata surgiu em Recife, Pernambuco, planejada para ser uma empresa de soluções de transporte e distribuição. Naquela época, o cenário econômico era bem diferente: as operações eram menos complexas, pouco se falava em roubos e a logística se resumia ao transporte.',
  'Nesse cenário, a Asa de Prata procurou fazer algo a mais, investindo na segurança das operações, no relacionamento forte com os clientes e no cuidado com os custos, para oferecer serviços regulares a preços mais atrativos.',
  'Ao longo dos anos, a empresa se atualizou para as novas demandas e se manteve fiel às suas premissas: uma carteira seleta de clientes, a segurança dos seus ativos e dos de terceiros e uma gestão administrativa eficiente, com tarifas diferenciadas.',
  'Hoje a empresa colhe os frutos dos investimentos em gestão, com crescimento acima da média nacional, e fortalece seus recursos na busca da melhoria contínua dos serviços.',
];
const pilares = [
  { t: 'Qualidade', p: ['Qualidade faz parte de tudo o que é feito na Asa de Prata: no atendimento, no investimento em tecnologia e recursos que dão eficiência às operações e na administração que mantém a empresa economicamente saudável.', 'A qualidade também é tratada com consultorias e auditorias em todas as áreas. A empresa é certificada com nota máxima no SASSMAQ, selo de qualidade criado pela Abiquim.'] },
  { t: 'Informação', p: ['Fornecer dados precisos sobre as operações, gerenciar os riscos e manter o fluxo de dados com os clientes sempre atualizado: esse é o objetivo do atendimento.', 'O gerenciamento é feito em Recife, que concentra os dados e o monitoramento e atende os clientes com relatórios personalizados e acesso direto pelo site.'] },
  { t: 'Parceria', p: ['Enxergamos o relacionamento contínuo como ferramenta para desenvolver as operações: entender as necessidades de cada negócio, como se fôssemos o próprio gestor, equilibrando o modelo de atendimento com as realidades locais e a legislação.'] },
];
const mvv = [['Missão', 'Atender com respeito e precisão nossos clientes, oferecendo serviços com inteligência e soluções inovadoras que atendam suas necessidades.'], ['Visão', 'Ser reconhecida como o melhor provedor de serviços de transporte e logística a nível nacional.'], ['Valores', 'Confiabilidade, credibilidade, integridade, tecnologia avançada, controle organizacional, respeito aos colaboradores, fornecedores e clientes.']];
const numeros = [['1977', 'fundada em Recife'], ['30', 'pontos de atendimento no Brasil'], ['700', 'colaboradores treinados'], ['24 h', 'de monitoramento da carga']];
const solucoes = [
  { id: 'transporte', t: 'Transporte rodoviário de cargas', f: 'carreta', p: ['Confie o transporte das suas cargas fracionadas à Asa de Prata e garanta a entrega no prazo combinado, com total segurança.', 'Frota moderna e equipe experiente, em contato permanente com unidades e filiais, traçam as melhores estratégias para um transporte ágil para o Nordeste e o Sudeste. Da saída à entrega, todo o percurso é monitorado por rastreamento via satélite.'] },
  { id: 'logistica', t: 'Logística integrada', f: 'armazem', p: ['Otimizar a cadeia produtiva é a nossa principal premissa: soluções para ganho de eficiência da fabricação à entrega final, envolvendo as particularidades do transporte, os reflexos fiscais e a integração de todos os dados.', 'Projetos logísticos personalizados, com centrais de monitoramento em várias cidades e colaboradores treinados periodicamente.'], l: ['Armazenagem', 'Gestão de estoques e pedidos', 'Paletização', 'Controle fiscal', 'Sistema informatizado WMS', 'Troca eletrônica de dados (EDI)', 'Distribuição de cargas'] },
];
const seguranca = ['Veículos com rastreadores Autotrac e Control Loc, monitorados 24 horas', 'Comunicação urbana por rádio e celular', 'Empresas especialistas em gerenciamento de risco na transferência e distribuição', 'Apólice de seguros Mapfre para diversas modalidades de risco', 'Escolta armada'];
const embarques = ['SP', 'RJ', 'RS', 'BA', 'PE', 'CE'];
const cidades = ['São Paulo', 'Rio de Janeiro', 'Salvador', 'Aracaju', 'Maceió', 'Recife', 'João Pessoa', 'Natal', 'Fortaleza', 'Teresina', 'São Luís'];
const unidades = [
  { t: 'Matriz', c: 'Recife - PE', end: `${'Rua Coronel Fabriciano, 131'}, Imbiribeira`, cep: '51150-070', tel: ['(81) 2138-5800'], fax: '(81) 2138-5814', l: ['Armazenagem', 'Gestão de estoques e pedidos', 'Paletização', 'Controle fiscal', 'WMS e troca eletrônica de dados', 'Distribuição'] },
  { t: 'Filial', c: 'São Paulo (Guarulhos) - SP', end: 'Rua Jequitaí, 20, Parque Brasília, Guarulhos', cep: '07221-070', tel: ['(11) 2412-2726', '(11) 2412-3553'], fax: '(11) 2496-0262', l: ['Área total: 8.000 m²', 'Área construída: 4.000 m²', 'Armazém: 3.800 m²'] },
];
const emails = [['SAC', 'sac@asadeprata.com.br'], ['Comercial', 'comercial@asadeprata.com.br'], ['2ª via de boleto', 'cobranca@asadeprata.com.br'], ['Trabalhe conosco', 'rh@asadeprata.com.br'], ['Diretoria: André da Fonte (diretor-presidente)', 'andrefonte@asadeprata.com.br']];
const alt = { 'caminhao-rodovia': 'Carreta da Asa de Prata na rodovia', caminhao: 'Carreta Asa de Prata Logística Integrada', carreta: 'Carreta baú da Asa de Prata', armazem: 'Empilhadeira movimentando carga no armazém', 'selo-sassmaq': 'Selo SASSMAQ empresa aprovada' };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'solucoes', nome: 'Soluções' }, { slug: 'unidades', nome: 'Cobertura e unidades' }, { slug: 'atendimento', nome: 'Cotação e atendimento' }];
export const nomesVersao = { a: 'Rota Nordeste', b: 'Asa' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;1,700;1,800&family=Chakra+Petch:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#13237a', b: '#0a1240' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Transportadora Asa de Prata | Transporte de cargas para o Nordeste' : `${titulo} | Asa de Prata`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const logo = claro => `<svg class="logo-svg" viewBox="0 0 268 64" role="img" aria-label="Asa de Prata"><ellipse cx="30" cy="38" rx="27" ry="11" fill="none" stroke="#3aa6dc" stroke-width="4"/><g fill="#e6ebf2" stroke="#8b98aa" stroke-width="1.4"><rect x="14" y="22" width="14" height="14"/><rect x="29" y="18" width="14" height="14"/><rect x="21" y="7" width="14" height="14"/></g><text x="66" y="40" font-family="'Fira Sans',sans-serif" font-style="italic" font-weight="800" font-size="30" fill="${claro ? '#fff' : '#13237a'}">Asa<tspan font-size="17" font-weight="700" dx="2">de</tspan><tspan dx="2">Prata</tspan></text><text x="68" y="57" font-family="'Fira Sans',sans-serif" font-style="italic" font-weight="600" font-size="10.5" fill="${claro ? '#9fd4f0' : '#4a5a7a'}">Desde 1977, transportando com segurança</text></svg>`;

const ufs = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
const ufSel = n => `<select name="${n}">${ufs.map(u => `<option${u === 'PE' && n === 'uf_destino' ? ' selected' : ''}>${u}</option>`).join('')}</select>`;
const formulario = () => `<form class="form" data-email="comercial@asadeprata.com.br" data-assunto="Cotação pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Origem (cidade)<input name="origem" required></label><label>UF de origem${ufSel('uf_origem')}</label></div>
  <div class="form-duas"><label>Destino (cidade)<input name="destino" required></label><label>UF de destino${ufSel('uf_destino')}</label></div>
  <div class="form-duas"><label>Peso total (kg)<input name="peso" inputmode="decimal"></label><label>Valor da nota fiscal<input name="valor" inputmode="decimal"></label></div>
  <label>Medidas, volumes e observações<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Pedir cotação</button>
  <p class="form-nota">Abre seu programa de e-mail com a cotação pronta para comercial@asadeprata.com.br.</p>
</form>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Asa de Prata, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
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
    <div class="rod-marca">${logo(true)}<p>Transporte rodoviário de cargas e logística integrada. Certificada SASSMAQ.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Matriz Recife</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Transportadora Asa de Prata. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const numerosLista = () => `<ul class="numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const lista = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cidadesLista = () => `<ul class="cidades">${cidades.map(c => `<li>${c}</li>`).join('')}</ul>`;
const unidadesLista = () => `<div class="unidades">${unidades.map(u => `<article class="sobe"><p class="k">${u.t}</p><h3>${u.c}</h3><p class="u-end">${ic('pin')}<span>${u.end}<br>CEP ${u.cep}</span></p><p class="u-end">${ic('tel')}<span>${u.tel.map(t => `<a href="${telHref(t)}">${t}</a>`).join(' · ')}<br><small>Fax ${u.fax}</small></span></p>${lista(u.l)}</article>`).join('')}</div>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Vai mandar carga para o Nordeste?</h2><p>Peça uma cotação: nossa equipe comercial responde o mais breve possível.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'atendimento')}">Pedir cotação</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Quem somos', historia[0]) + topo(v, 'empresa') + cab('Quem somos', 'Desde 1977, transportando com segurança') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><aside class="mvv">${mvv.map(m => `<div><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('')}</aside></section>
<section class="pilares">${pilares.map(p => `<article class="sobe"><h2>${p.t}</h2>${p.p.map(x => `<p>${x}</p>`).join('')}</article>`).join('')}</section>
<section class="selo-sec"><figure>${img('selo-sassmaq')}</figure><div><p class="k">Certificação</p><h2>Nota máxima no SASSMAQ</h2><p>Sistema de Avaliação de Segurança, Saúde, Meio Ambiente e Qualidade, criado pela Abiquim.</p></div></section></div>
` + cta(v) + rodape(v);
  pag.solucoes = head(v, 'solucoes', 'Soluções', 'Transporte rodoviário de cargas fracionadas e fechadas, logística integrada, armazenagem e segurança com monitoramento 24 horas.') + topo(v, 'solucoes') + cab('Soluções', 'Sob medida em transporte rodoviário e logística') + `
<div class="in"><section class="intro-sol"><p class="lead">Na Asa de Prata você encontra soluções sob medida em transporte rodoviário de cargas e logística em geral, com frota moderna e uma estrutura operacional totalmente informatizada e monitorada por satélite.</p><p>Com atuação nacional, mas especializada no transporte para o Nordeste e o Sudeste, a empresa traça as melhores rotas para cada cliente, buscando mais vantagens a um preço justo e competitivo.</p></section>
${solucoes.map(s => `<section class="sol sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><h2>${s.t}</h2>${s.p.map(x => `<p>${x}</p>`).join('')}${s.l ? lista(s.l) : ''}</div></section>`).join('')}
<section class="seg" id="seguranca"><header class="tit"><p class="k">Segurança</p><h2>Sua carga monitorada 24 horas</h2><p>Mais que transportar e entregar, a Asa de Prata garante segurança durante todo o trajeto.</p></header>${lista(seguranca)}</section></div>
` + cta(v) + rodape(v);
  pag.unidades = head(v, 'unidades', 'Cobertura e unidades', 'Transporte de cargas fechadas e fracionadas para o Nordeste, a partir de SP, RJ, RS, BA, PE e CE. Matriz em Recife e filial em Guarulhos.') + topo(v, 'unidades') + cab('Cobertura e unidades', 'As melhores rotas para o Nordeste') + `
<div class="in"><section class="cob"><div><p class="lead">A Asa de Prata tem foco no transporte rodoviário de cargas fechadas e fracionadas para a Região Nordeste, com embarques a partir de:</p><ul class="ufs">${embarques.map(u => `<li>${u}</li>`).join('')}</ul><p>Em Recife e em São Paulo oferece armazenagem e gerenciamento de estoques, como armazém geral ou abrigando filiais de negócios de clientes em suas unidades. A filial de São Paulo opera em terminal às margens da Via Dutra.</p></div><aside><h3>Estrutura em</h3>${cidadesLista()}</aside></section>
<section class="un-sec"><header class="tit"><p class="k">Unidades</p><h2>Matriz e filial com armazém</h2></header>${unidadesLista()}</section></div>
` + cta(v) + rodape(v);
  pag.atendimento = head(v, 'atendimento', 'Cotação e atendimento', `Cotação de frete, coleta, rastreamento e 2ª via de boleto. ${E.fone}.`) + topo(v, 'atendimento') + cab('Cotação e atendimento', 'Agilidade até para lhe atender') + `
<div class="in"><section class="atend"><div class="contato-form"><h2>Cotação</h2><p>Informe seus dados e as especificações da carga. A equipe comercial apresenta o orçamento o mais breve possível.</p>${formulario()}</div><div class="atend-lado"><article><h3>Coleta automática</h3><p>Os veículos da Asa de Prata coletam a carga no endereço do cliente, com programação definida entre cliente, área comercial e operacional.</p></article><article><h3>Coleta avulsa</h3><p>O cliente pede a coleta por telefone ou internet, e a mercadoria é coletada no seu endereço comercial.</p></article><article><h3>Rastreamento e 2ª via</h3><p>Clientes acessam o rastreamento de cargas com e-mail e senha. Para a senha e a 2ª via do boleto, escreva para cobranca@asadeprata.com.br.</p></article><ul class="emails">${emails.map(e => `<li><span>${e[0]}</span><a href="mailto:${e[1]}">${e[1]}</a></li>`).join('')}</ul></div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Agilidade · concorrência · segurança</p><h1>De Nordeste <em>a gente entende.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'atendimento')}">Pedir cotação</a><a class="btn btn-linha" href="${link(v, 'solucoes')}">Soluções</a></p></div><figure>${img('caminhao-rodovia', alt['caminhao-rodovia'], ' loading="eager" fetchpriority="high"')}</figure></div><div class="in">${numerosLista()}</div></section>
<section class="in sol-a"><header class="tit"><p class="k">Nossas soluções</p><h2>Simples, rápido e seguro</h2><p>A Asa de Prata realiza o transporte de cargas com segurança e agilidade, com uma logística que integra todo o seu processo de distribuição.</p></header><div class="sol-cards">${solucoes.map(s => `<a class="sobe" href="${link(v, 'solucoes')}#${s.id}"><figure>${img(s.f)}</figure><div><h3>${s.t}</h3><p>${s.p[0]}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a>`).join('')}<a class="sobe sol-seg" href="${link(v, 'solucoes')}#seguranca"><div>${ic('escudo')}<h3>Segurança 24 horas</h3><p>Rastreadores Autotrac e Control Loc, gerenciamento de risco, seguro Mapfre e escolta armada.</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a></div></section>
<section class="rota-a"><div class="in rota-a-in"><div><p class="k">Área de cobertura</p><h2>Embarques em seis estados, destino Nordeste</h2><ul class="ufs">${embarques.map(u => `<li>${u}</li>`).join('')}</ul><p>Estrutura em ${cidades.length} cidades, de São Paulo a São Luís.</p><a class="link-seta" href="${link(v, 'unidades')}">Cobertura e unidades ${ic('seta')}</a></div>${cidadesLista()}</div></section>
<section class="in selo-a"><figure>${img('selo-sassmaq')}</figure><div><p class="k">Quem somos</p><h2>Desde 1977 em Recife</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><p class="k">Transportadora Asa de Prata · Recife · desde 1977</p><h1>Para o Nordeste, transporte com quem conhece as rotas.</h1><div class="hero-b-baixo"><figure>${img('caminhao', alt.caminhao, ' loading="eager" fetchpriority="high"')}</figure><div><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'atendimento')}">Pedir cotação</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></div></div></section>
<section class="num-b"><div class="in">${numerosLista()}</div></section>
<section class="in tres-b"><article class="sobe"><span class="n">01</span><h3>Transporte de cargas</h3><p>Cargas fechadas e fracionadas para o Nordeste e o Sudeste, com rastreamento via satélite da saída à entrega.</p><a class="link-seta" href="${link(v, 'solucoes')}#transporte">Transporte ${ic('seta')}</a></article><article class="sobe"><span class="n">02</span><h3>Logística</h3><p>Armazenagem, gestão de estoques, paletização, controle fiscal, WMS, EDI e distribuição.</p><a class="link-seta" href="${link(v, 'solucoes')}#logistica">Logística ${ic('seta')}</a></article><article class="sobe"><span class="n">03</span><h3>Segurança</h3><p>Monitoramento 24 horas, gerenciamento de risco, apólice Mapfre e escolta armada.</p><a class="link-seta" href="${link(v, 'solucoes')}#seguranca">Segurança ${ic('seta')}</a></article></section>
<section class="rota-b"><div class="in"><header class="tit"><p class="k">Rotas</p><h2>De ${embarques.join(', ').replace(/, (?=[^,]*$)/, ' e ')} para todo o Nordeste</h2></header>${cidadesLista()}</div></section>
<section class="in mvv-b">${mvv.map(m => `<div class="sobe"><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('')}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Asa de Prata', artigo: 'da', url: E.url, lang: 'pt', cor: '#13237a', fundo: '#0a1240', claro: '#eef4fa',
  fonteTitulo: '"Fira Sans",system-ui,sans-serif', fonteTexto: '"Fira Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no azul-marinho e azul-céu do logo, com o slogan "De Nordeste a gente entende" na abertura.', pontos: ['Transporte, logística e segurança', 'Embarques em 6 estados, destino Nordeste', 'Cotação com origem, destino, peso e valor'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-noite, títulos técnicos em Chakra Petch e números grandes: 1977, 30 pontos, 700 colaboradores.', pontos: ['"Para o Nordeste, transporte com quem conhece as rotas"', 'Três frentes numeradas', 'Missão, visão e valores'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
