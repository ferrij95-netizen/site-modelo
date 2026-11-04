// MJ Implementos Rodoviários (São Sebastião do Caí/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/mjimplementos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mjimplementos http://mjimplementos.com.br/)
// Textos, linhas de implementos, serviços e peças: do site atual (HTML de 2011). Fotos: as do próprio site (galerias em 640px) e os recortes da animação Flash da home.
// Logo: o site só tem o logo dentro do Flash; foi redesenhado em SVG (anel laranja + "MJ" com serifa), ver LEIA-ME.
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'MJ Implementos Rodoviários', url: 'https://mjimplementos.overtus.com.br/', antigo: 'http://mjimplementos.com.br/',
  fones: ['(51) 3635-0371', '(51) 3635-0347', '(51) 3635-0516'], email: 'contato@mjimplementos.com.br',
  rua: 'Rodovia RS-122, km 14, nº 14005', cidade: 'São Sebastião do Caí - RS',
  curto: 'Caçambas basculantes, carrocerias, 3º eixo, 2º eixo direcional, serviços e peças para implementos rodoviários. Desde 1995 na RS-122, em São Sebastião do Caí.',
};
const historia = [
  'A M.J. Implementos Rodoviários foi fundada pela família Flores em janeiro de 1995, com o objetivo de fazer a manutenção de carrocerias silo graneleiro que transportam ração para as empresas da região, já que não havia outra empresa trabalhando com esse tipo de serviço. Com o passar do tempo, a empresa ampliou o negócio, oferecendo outros produtos e serviços e aumentando a base de clientes.',
  'Em 2002, a empresa transferiu-se para sua nova e ampla instalação junto à rodovia RS-122, com 6.400 m² de pátio e 4.200 m² de área construída, para atender melhor seus clientes. Hoje a MJ tem uma linha bem mais diversificada de produtos e serviços.',
  'A MJ é uma empresa moderna e equipada no segmento da região, com clientes em muitos outros estados. Busca permanentemente integrar-se com seus aliados, prestando assessoria e acompanhamento personalizado a todos com quem trabalha, e tem especial interesse em consolidar parcerias com clientes e fornecedores.',
];
const missao = 'Criar soluções alternativas para atender as necessidades do cliente no transporte rodoviário. Serviços e venda de peças, com qualidade e agilidade, oferecendo solução para os problemas com movimentação de cargas.';
const numeros = [['1995', 'fundada pela família Flores'], ['6.400 m²', 'de pátio na RS-122'], ['4.200 m²', 'de área construída'], ['3', 'marcas com assistência autorizada']];
const fotos = (pref, ids) => ids.map(i => `${pref}-${i}`);
const linhas = [
  { id: 'cacambas', t: 'Caçambas basculantes', d: 'Linha completa de caçambas basculantes, da Mônaco às caçambas para coleta seletiva e cavaqueira.', capa: 'cacamba-monaco-01', recorte: 'recorte-cacamba',
    modelos: [
      { t: 'Mônaco', d: 'Opções com chassi e sem chassi superior, com sistema de mancal de giro traseiro. Construída em chapa estampada A36 e chassi de aço estrutural COR 420.', f: ['cacamba-00', ...fotos('cacamba-monaco', ['01', '02', '03', '04', '05', '06']), 'cacamba-08', 'cacamba-13', 'cacamba-14'] },
      { t: 'Quadrada', f: fotos('cacamba-quadrada', ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']) },
      { t: 'Standard', f: fotos('cacamba-standard', ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']) },
      { t: 'Tracky', f: fotos('cacamba-tracky', ['00', '01']) },
      { t: 'Para transporte de vísceras', f: fotos('cacamba-viceras', ['00', '01', '02']) },
      { t: 'Para coleta seletiva', f: fotos('cacamba-seletiva', ['00', '01', '02', '03']) },
      { t: 'Cavaqueira', f: fotos('cacamba-cavaqueira', ['00', '01', '02']) },
    ] },
  { id: 'segundo-eixo', t: '2º eixo direcional', d: 'Adaptação de 2º eixo direcional em veículos Volkswagen, Volvo, Mercedes-Benz, Iveco e Ford Cargo, com suspensor pneumático.', capa: '2eixo-01', recorte: 'recorte-chassi-mb', modelos: [{ f: fotos('2eixo', ['01', '02', '03', '04', '05']) }] },
  { id: 'terceiro-eixo', t: '3º eixo', d: 'Adaptação de 3º eixo para linha leve e pesada, em caminhões Volkswagen, Ford Cargo, Agrale e Mercedes-Benz.', capa: '3eixo-01', recorte: 'recorte-chassi-vermelho', modelos: [{ f: fotos('3eixo', ['00', '01', '02', '03', '04', '05']) }] },
  { id: 'carrocerias', t: 'Carrocerias metálicas', d: 'Carroceria metálica para transporte de gás, com plataforma elevatória, para linha leve e pesada, e carrocerias abertas.', capa: 'gas-02', recorte: 'recorte-carroceria-hr',
    modelos: [
      { t: 'Carroceria de gás', d: 'Fabricação de carroceria metálica para transporte de gás com plataforma elevatória, para veículos de linha pesada e leve.', f: fotos('gas', ['00', '01', '02', '03', '04', '05']) },
      { t: 'Carroceria aberta', f: fotos('gas', ['06', '07', '08', '09', '10']) },
    ] },
  { id: 'prancha', t: 'Prancha sobre chassi', d: 'Prancha montada sobre o chassi do caminhão, com rampas para embarque de máquinas e veículos.', capa: 'prancha-01', modelos: [{ f: fotos('prancha', ['00', '01', '02']) }] },
  { id: 'roll-on-roll-off', t: 'Roll on roll off', d: 'Sistema roll on roll off com caixa de carga removível.', capa: 'roll-01', modelos: [{ f: fotos('roll', ['01', '02', '03']) }] },
];
const servicos = [
  'Assistência técnica autorizada Triel-HT, Silpa e Linshalm',
  'Alongamento e encurtamento de chassi, entre-eixo e traseira',
  'Instalação de 3º eixo em veículos leves, semipesados e pesados',
  'Adaptação de 2º eixo direcional',
  'Venda e reforma de basculantes',
  'Fabricação e reforma de carrocerias gradeadas',
  'Instalação de elevadores para carrocerias gradeadas',
  'Retirada e colocação de carrocerias de diversos modelos',
  'Mecânica de implementos rodoviários',
  'Jato e pintura em geral',
  'Posto de molas para caminhões médios e pesados (embuchamento e arqueamento)',
  'Conserto e instalação da parte pneumática, freios e outros comandos',
  'Instalação e manutenção de equipamentos hidráulicos',
];
const pecas = [
  ['Acessórios', ['Barrica de água', 'Buzina a ar', 'Catraca para amarrar carga', 'Corrente para pino do fueiro e joaninha', 'Engate da corrente', 'Grampo trava tombador', 'Para-lama plástico', 'Pino do fueiro', 'Saboneteira a vácuo', 'Suporte de botijão de gás', 'Suporte de extintor', 'Suporte de para-lama', 'Suporte e tampa para barrica de água']],
  ['Freios', ['Componentes para freio']],
  ['Cardan', ['Cardan e componentes']],
  ['Faixas refletivas', ['Faixas refletivas']],
  ['Bombas hidráulicas e tomadas de força', ['Bombas e tomadas de força']],
  ['Peças para suspensão', ['Balanças e pinos', 'Kit suspensão semirreboque bucha cônica', 'Kit suspensão semirreboque modelo 2000', 'Molas e grampos', 'Suporte de mola e componentes', 'Suspensão para 3º eixo']],
  ['Suspensor pneumático', ['Suspensor pneumático 3º eixo com anel de alumínio', 'Suspensor pneumático 3º eixo de encaixe']],
  ['Escapamentos', ['Cano de descarga', 'Ponteiras cromadas', 'Silencioso', 'Tubo de descarga curvo 90°']],
  ['Sinalização', ['Sinaleiras e componentes']],
  ['Engate automático', ['Engate automático']],
  ['Pino rei', ['Pino rei']],
  ['Reservatório de ar', ['Reservatório de ar']],
  ['Componentes para tanque', ['Suporte para tanque', 'Tampa da boia', 'Tampa para tanque', 'Tanque de combustível']],
  ['Caixa de ferramentas', ['Caixa de ferramentas']],
  ['Válvulas', ['Válvulas']],
];
const parceiros = [['Linshalm', 'http://www.linshalm.com.br/'], ['Silpa', 'http://www.silpa.com.br/'], ['Triel-HT', '']];
const altLinha = Object.fromEntries(linhas.map(l => [l.id, l.t]));
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'implementos', nome: 'Implementos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'pecas', nome: 'Peças' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pátio', b: 'Oficina' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=Source+Sans+3:wght@400;600;700&family=Oswald:wght@500;600;700&display=swap';
const img = (n, a = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#d9381e', b: '#111111' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Caçambas, 3º eixo e carrocerias` : `${titulo} | MJ Implementos`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const logo = claro => `<svg class="logo-svg" viewBox="0 0 232 64" role="img" aria-label="MJ Implementos Rodoviários"><path d="M58 8C30 4 6 14 4 30c-2 17 22 28 52 28" fill="none" stroke="#e8501e" stroke-width="6" stroke-linecap="round"/><text x="14" y="44" font-family="'Zilla Slab',Georgia,serif" font-weight="700" font-size="36" fill="${claro ? '#fff' : '#2f2f2f'}" letter-spacing="1">MJ</text><text x="76" y="30" font-family="'Source Sans 3',system-ui,sans-serif" font-weight="700" font-size="15" fill="${claro ? '#fff' : '#2f2f2f'}">Implementos</text><text x="76" y="48" font-family="'Source Sans 3',system-ui,sans-serif" font-weight="600" font-size="15" fill="${claro ? '#ff8a5c' : '#d9381e'}">Rodoviários</text></svg>`;

const formulario = () => `<form class="form" data-email="${E.email}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Empresa / cidade<input name="empresa" autocomplete="organization"></label><label>Assunto<select name="assunto"><option>Caçamba basculante</option><option>3º eixo / 2º eixo direcional</option><option>Carroceria</option><option>Serviço / manutenção</option><option>Peças</option><option>Outro</option></select></label></div>
  <label>Veículo (marca, modelo, ano)<input name="veiculo" placeholder="Ex.: VW Constellation 24.280, 2015"></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">Abre seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}</div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.cidade}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da MJ Implementos" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('MJ Implementos Rodoviários, RS-122, São Sebastião do Caí RS')}&z=14&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="MJ Implementos Rodoviários, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a>
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
    <div class="rod-marca">${logo(true)}<p>Implementos rodoviários, serviços e peças desde 1995. Assistência técnica autorizada Triel-HT, Silpa e Linshalm.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('<br>')}</span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} MJ Implementos Rodoviários. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const numerosLista = () => `<ul class="numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const linhaCards = v => `<ul class="linhas">${linhas.map(l => `<li class="sobe"><a href="${link(v, 'implementos')}#${l.id}"><figure>${img(l.capa, l.t)}</figure><div><h3>${l.t}</h3><p>${l.d}</p><span class="link-seta">Ver fotos ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const listaServ = (n = servicos.length) => `<ol class="servicos">${servicos.slice(0, n).map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>`;
const cta = () => `<section class="cta"><div class="in cta-in"><div><h2>Precisa de caçamba, 3º eixo ou manutenção?</h2><p>Ligue para a MJ ou mande os dados do seu caminhão por e-mail.</p></div><p class="bts"><a class="btn btn-claro" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')}E-mail</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', historia[0]) + topo(v, 'empresa') + cab('Empresa', 'Desde 1995 cuidando de quem transporta', 'sede-aerea') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><div class="antes-depois"><figure>${img('sede-antiga', 'Foto aérea das antigas instalações da MJ')}<figcaption>Antigas instalações</figcaption></figure><figure>${img('sede-aerea', 'Foto aérea das instalações atuais da MJ na RS-122')}<figcaption>Instalações atuais, na RS-122</figcaption></figure></div></section>
<section class="num-sec">${numerosLista()}</section>
<section class="missao"><p class="k">Nossa missão</p><blockquote>${missao}</blockquote></section>
<section class="parceiros"><header class="tit"><p class="k">Parceiros</p><h2>Assistência técnica autorizada</h2><p>Grandes parceiros com que a MJ conta no ramo de implementos rodoviários.</p></header><ul>${parceiros.map(p => `<li>${p[1] ? `<a href="${p[1]}" ${ext}>${p[0]} ${ic('ext')}</a>` : `<span>${p[0]}</span>`}</li>`).join('')}</ul></section></div>
` + cta() + rodape(v);
  pag.implementos = head(v, 'implementos', 'Implementos', 'Caçambas basculantes, 2º eixo direcional, 3º eixo, carrocerias metálicas, prancha sobre chassi e roll on roll off.') + topo(v, 'implementos') + cab('Implementos', 'Implementos fabricados e instalados pela MJ', 'cacamba-quadrada-08') + `
<div class="in"><nav class="ancoras" aria-label="Linhas de implementos">${linhas.map(l => `<a href="#${l.id}">${l.t}</a>`).join('')}</nav>
${linhas.map(l => `<section class="linha" id="${l.id}"><header><h2>${l.t}</h2><p>${l.d}</p></header>${l.modelos.map(m => `<div class="modelo">${m.t ? `<h3>${m.t}</h3>` : ''}${m.d ? `<p>${m.d}</p>` : ''}<ul class="galeria">${m.f.map(f => `<li><a href="/assets/img/${f}.webp" data-foto="${esc(l.t + (m.t ? ' ' + m.t : ''))}">${img(f, l.t + (m.t ? ' ' + m.t : ''))}</a></li>`).join('')}</ul></div>`).join('')}</section>`).join('')}</div>
` + cta() + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Assistência técnica autorizada, instalação de 3º eixo, alongamento de chassi, reforma de basculantes, posto de molas, jato e pintura.') + topo(v, 'servicos') + cab('Serviços', 'Oficina completa para implementos rodoviários', '3eixo-03') + `
<div class="in"><section class="serv-pag">${listaServ()}<aside class="serv-lado"><figure>${img('sede-rodovia', 'Sede da MJ junto à RS-122')}</figure><p>São 4.200 m² de área construída e 6.400 m² de pátio junto à RS-122, em São Sebastião do Caí.</p></aside></section></div>
` + cta() + rodape(v);
  pag.pecas = head(v, 'pecas', 'Peças', 'Peças para implementos rodoviários: suspensão, suspensor pneumático, freios, cardan, escapamentos, pino rei, engate automático e acessórios.') + topo(v, 'pecas') + cab('Peças', 'Linha diversificada de peças para implementos', 'gas-08') + `
<div class="in"><section class="pecas-pag"><p class="lead">A MJ produz e vende uma linha bem diversificada de peças para atender às necessidades de seus clientes. Consulte disponibilidade pelo telefone ou e-mail.</p><div class="pecas-grade">${pecas.map(p => `<article class="sobe"><h3>${p[0]}</h3><ul>${p[1].map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div></section></div>
` + cta() + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `MJ Implementos: ${E.fones.join(', ')}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + cab('Contato', 'Comentários, sugestões e orçamentos', 'sede-rodovia') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Implementos rodoviários · desde 1995</p><h1>Caçambas, 3º eixo e carrocerias feitos para rodar.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'implementos')}">Ver implementos</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p></div><figure class="hero-a-foto">${img('cacamba-quadrada-02', 'Caçamba basculante azul em frente à MJ', ' loading="eager" fetchpriority="high"')}</figure></div><div class="in">${numerosLista()}</div></section>
<section class="in linhas-a"><header class="tit"><p class="k">Implementos</p><h2>Seis linhas, fabricadas e instaladas na MJ</h2></header>${linhaCards(v)}</section>
<section class="serv-a"><div class="in serv-a-in"><div><p class="k">Serviços</p><h2>Oficina completa para o seu implemento</h2><p>Assistência técnica autorizada Triel-HT, Silpa e Linshalm, posto de molas, jato e pintura, pneumática, freios e hidráulica.</p><a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></div>${listaServ(6)}</div></section>
<section class="in sede-a"><figure>${img('sede-aerea', 'Foto aérea da MJ na RS-122')}</figure><div><p class="k">Empresa</p><h2>Família Flores, desde 1995</h2><p>${historia[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></section>
` + cta() + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">MJ Implementos Rodoviários · RS-122</p><h1>Do chassi <span>à caçamba.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a><a class="btn btn-linha" href="${link(v, 'implementos')}">Implementos</a></p></div><figure>${img('recorte-cacamba', 'Caminhão com caçamba basculante MJ', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="faixa-b"><div class="in">${numerosLista()}</div></section>
<section class="in linhas-b"><header class="tit"><p class="k">Implementos</p><h2>O que sai da MJ</h2></header><ol class="linhas-lista">${linhas.map((l, i) => `<li class="sobe"><a href="${link(v, 'implementos')}#${l.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${l.t}</h3><p>${l.d}</p></div><figure>${img(l.capa, l.t)}</figure></a></li>`).join('')}</ol></section>
<section class="recortes-b"><div class="in"><header class="tit"><p class="k">Na oficina</p><h2>Chassi alongado, eixo instalado, implemento montado</h2></header><ul>${['recorte-chassi-mb', 'recorte-chassi-vermelho', 'recorte-carroceria-hr', 'recorte-cacamba-cargo'].map(r => `<li class="sobe">${img(r, 'Caminhão preparado pela MJ')}</li>`).join('')}</ul></div></section>
<section class="in serv-b"><div><p class="k">Serviços</p><h2>13 serviços sob o mesmo teto</h2><a class="link-seta" href="${link(v, 'servicos')}">Ver todos ${ic('seta')}</a></div>${listaServ(7)}</section>
` + cta() + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'MJ Implementos Rodoviários', artigo: 'da', url: E.url, lang: 'pt', cor: '#d9381e', fundo: '#161616', claro: '#f5f3f0',
  fonteTitulo: '"Zilla Slab",Georgia,serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o laranja-vermelho do logo e as fotos reais dos caminhões no pátio da MJ, organizadas por linha de implemento.', pontos: ['Seis linhas de implementos com galeria', '13 serviços e catálogo de peças', 'Desde 1995 na RS-122'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, com os caminhões recortados da animação antiga e títulos condensados. Mais cara de oficina pesada.', pontos: ['"Do chassi à caçamba."', 'Implementos numerados com foto', 'Chassis e eixos em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
