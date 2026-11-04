// Metalúrgica R-MaC (São Leopoldo/RS), usinagem de alta performance e pintura eletrostática. Gera public/{a,b}/ e a página de escolha.
// node clientes/rmac/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rmac https://www.metalurgicarmac.com.br/)
// Textos, equipamentos, clientes, contatos e fotos: do site atual (Wix). O site não tem WhatsApp: os formulários abrem o e-mail.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'Metalúrgica R-MaC', url: 'https://rmac.overtus.com.br/', antigo: 'https://www.metalurgicarmac.com.br/',
  fone: '(51) 3591-0099', diretoria: 'diretoria@metalurgicarmac.com.br', emprego: 'emprego@metalurgicarmac.com.br',
  financeiro: 'financeiro@metalurgicarmac.com.br', nfe: 'nfe@metalurgicarmac.com.br',
  rua: 'Rua Cristopher Levalley, nº 461', compl: 'Condomínio Industrial, Prédio 531', bairro: 'São Borja', cidade: 'São Leopoldo/RS', cep: '93037-730',
  face: 'https://www.facebook.com/metalurgicarmac', insta: 'https://www.instagram.com/metalurgicarmac/',
  duns: '900659212',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';
const MAPA = `https://maps.google.com/maps?q=${encodeURIComponent('Rua Cristopher Levalley, 461, São Leopoldo - RS, 93037-730')}&z=15&output=embed`;

const C = {
  sobre: [
    'A Metalúrgica R-MaC Ltda é uma indústria gaúcha de São Leopoldo, com mais de uma década de história, que produz serviços de usinagem de alta performance.',
    'Dispondo de diversos equipamentos de alta tecnologia e qualidade, dentre os quais destacam-se aquisições como Células Robóticas, Célula de Pintura Eletrostática, Laboratório de Medição e Centros de Usinagem, além de outros importantes equipamentos.',
    'Potencializando desta forma a capacidade fabril da Metalúrgica R-MaC, que segue possuindo cada vez mais destaque no setor metal mecânico.',
  ],
  servicos: [
    'A Metalúrgica R-MaC oferece soluções inovadoras em usinagem de precisão.',
    'Dispondo de um parque fabril sofisticado e em constante evolução, com equipamentos modernos e precisos, que aliados ao alto nível de profissionalismo de nossos colaboradores, proporcionam um produto final de qualidade realmente diferenciada.',
  ],
  missao: 'Oferecer serviços de qualidade com tecnologia de ponta para atender os clientes com confiabilidade e custos adequados ao seu negócio.',
  visao: 'Ser reconhecida pela prestação de serviços de qualidade com alta performance e equipes comprometidas com a qualidade e com a total satisfação dos clientes.',
  valores: ['Pessoas em primeiro lugar', 'Proximidade aos clientes', 'Qualidade superior', 'Comprometimento', 'Responsabilidade', 'Respeito', 'Ética', 'Melhoria contínua'],
  politica: 'Fornecer serviços de usinagem e pintura com qualidade, melhorando continuamente nossos processos e satisfazendo nossos clientes e seus requisitos.',
  objetivos: ['Satisfação do cliente', 'Qualidade no serviço prestado', 'Satisfação dos colaboradores', 'Desenvolvimento da consciência coletiva', 'Lucratividade e competitividade'],
  setores: [['setor-armamento.webp', 'Armamento'], ['setor-automotivo.webp', 'Automotivo'], ['setor-ferramentas.webp', 'Ferramentas'], ['setor-agricola.webp', 'Agrícola']],
  equip: [
    { id: 'robotizada', t: 'Célula robotizada', marca: 'fanuc', foto: 'celula-robotizada.webp', q: '3 centros', d: ['03 centros de usinagem Robodrill (Fanuc)', '01 robô (Fanuc)', '02 quartos eixos (Fanuc)', '02 aduções hidráulicas', '02 medidores presetter de ferramentas', '02 medidores de peças na máquina', '02 medidores óticos contra quebra de ferramentas', 'Esteira automática de carregamento e descarregamento de peças'] },
    { id: 'lg500', t: 'Hartford LG 500', marca: 'hartford', foto: 'hartford-lg500.webp', q: '9 centros', d: ['09 centros de usinagem LG500', '09 quartos eixos', '09 medidores presetter de ferramentas (Renishaw)', 'Touch probe (Renishaw)', '09 medidores óticos contra quebra de ferramentas (Renishaw)', 'Spindle 12.000 rpm'] },
    { id: 'qmc600', t: 'Maximill QMC-600', marca: 'maxmill', foto: 'qmc600.webp', q: '6 centros', d: ['06 centros de usinagem vertical', 'Modelo QMC 600 Maximill', '4º eixo Maximill', '48 m/s de velocidade nos eixos X/Y/Z', 'Troca de ferramentas em 3,4 s', 'Magazine 20 + 1 ferramentas'] },
    { id: 'robodrill', t: 'Robodrill T14iF', marca: 'fanuc', foto: 'robodrill.webp', q: '5 centros', d: ['05 centros de usinagem', '05 quartos eixos', '05 medidores presetter de ferramentas (Renishaw)', 'Touch probe (Renishaw)', '05 medidores óticos contra quebra de ferramentas (Renishaw)', 'Spindle 10.000 rpm'] },
    { id: 't4000', t: 'Doosan T4000', marca: 'doosan', foto: 't4000.webp', q: '2 centros', d: ['02 centros de usinagem T4000 (Doosan)', '02 quartos eixos (Nikken)', '02 aduções hidráulicas', '02 medidores presetter de ferramentas (Renishaw)', '02 medidores de peças touch probe (Renishaw)', '02 medidores óticos contra quebra de ferramentas (Renishaw)', 'Spindle 12.000 rpm'] },
    { id: 't4000l', t: 'Doosan T4000L', marca: 'doosan', foto: 't4000l.webp', q: '2 centros', d: ['02 centros de usinagem T4000 (Doosan)', '02 quartos eixos (Tsudakoma)', '02 aduções hidráulicas', '02 medidores presetter de ferramentas (Renishaw)', '02 medidores de peças touch probe (Renishaw)', '02 medidores óticos contra quebra de ferramentas (Renishaw)', '2 CTs de alta pressão (70 bar)', 'Spindle 24.000 rpm'] },
    { id: 'g350', t: 'Grob G350', marca: 'grob', foto: 'grob-g350.webp', q: '5 eixos', d: ['01 centro de usinagem', '5 eixos com duplo pallet', 'Medidor touch probe (Renishaw)', 'Medidor presetter de ferramentas (Renishaw)', 'Medidores óticos contra quebra de ferramentas (Renishaw)', 'Spindle 16.000 rpm'] },
    { id: 'vmc1270', t: 'Hartford VMC 1270', marca: 'hartford', foto: 'vmc1270.webp', q: '1 centro', d: ['01 centro de usinagem (2013)', 'Mesa X 1270 / Y 635 / Z 635', 'Spindle 8.000 rpm', 'Refrigeração interna 20 bar', 'Fuso e guia linear'] },
    { id: 'kdck28', t: 'Torno CNC KDCK-28', marca: 'miumac', foto: 'kdck28.webp', q: '2023', d: ['Placa hidráulica Ø 8"', 'Passagem do eixo-árvore Ø 65 mm', 'Torre de 12 posições', 'Diâmetro máx. torneável (X) Ø 420 mm', 'Comprimento máx. torneável (Z) 500 mm', 'Comando Fanuc', 'Fabricação 2023'] },
    { id: 'lynx', t: 'Torno CNC Doosan Lynx 2100', marca: 'doosan', foto: 'lynx2100.webp', q: '1 centro', d: ['01 centro de torneamento', 'Placa de 6"', 'Passagem de 2"', '10 ferramentas', 'Volteio 250 × 500 mm', 'Contraponta programável'] },
  ],
  metrologia: [
    { t: 'Zeiss DuraMax', marca: 'zeiss', foto: 'duramax.webp', d: 'Aliando a ampla experiência de nossos colaboradores aos mais modernos sistemas de medição, como o Zeiss DuraMax. Este equipamento de medição 3D é altamente preciso, permitindo um rigoroso controle de qualidade em todos os materiais produzidos.' },
    { t: 'Renishaw Equator 300', marca: 'renishaw', foto: 'equator.webp', d: 'Sistema de medição que permite o controle de processos, com medição de alta repetibilidade. O Equator é termicamente insensível, versátil e reprogramável, complementando o conjunto de ferramentas para garantir a excelência em qualidade.' },
    { t: 'EZset Zoller', marca: 'ezset', foto: 'ezset.webp', d: 'Presetter de ferramentas: aparelho de medição externa de ferramentas, para que a máquina receba a ferramenta já medida.' },
  ],
  galeria: [['grob-g350.webp', 'Centro de usinagem Grob G350'], ['pavilhao.webp', 'Pavilhão da R-MaC em São Leopoldo'], ['celula-robotizada.webp', 'Célula robotizada Fanuc'], ['fachada-placa.webp', 'Recepção da R-MaC'], ['taurus-banner.webp', 'Peças usinadas para a Taurus'], ['fabrica-maquinas.webp', 'Linha de centros de usinagem'], ['equipe.webp', 'Equipe R-MaC'], ['diretoria.webp', 'Diretoria'], ['fabrica-taurus.webp', 'Centros de usinagem'], ['operador.webp', 'Operador no comando CNC'], ['fabrica-corredor.webp', 'Parque fabril'], ['frota.webp', 'Frota própria'], ['hartford-lg500.webp', 'Centros de usinagem Hartford LG 500']],
  clientes: [['taurus', 'Taurus'], ['cbc', 'CBC'], ['stara', 'Stara'], ['soundigital', 'SounDigital'], ['gedore', 'Gedore'], ['stihl', 'Stihl'], ['rexnord', 'Rexnord']],
};
const totalCentros = 'mais de 25'; // 9 LG500 + 6 QMC + 5 Robodrill + 2 T4000 + 2 T4000L + G350 + VMC = 26, sem contar a célula robotizada
const totalTornos = 2;

const NAV = [
  { slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'servicos', nome: 'Serviços' },
  { slug: 'qualidade', nome: 'Qualidade' }, { slug: 'trabalhe-conosco', nome: 'Trabalhe conosco' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'Metalúrgica R-MaC: usinagem de precisão de alta performance em São Leopoldo/RS. Células robotizadas, centros de usinagem CNC e ISO 9001:2015.',
  empresa: 'Indústria gaúcha de São Leopoldo com mais de uma década de história em usinagem de alta performance. Missão, visão, valores e galeria.',
  servicos: 'Usinagem de precisão em células robotizadas Fanuc, centros Hartford, Doosan, Maximill e Grob 5 eixos. Metrologia Zeiss e Renishaw. Frota própria.',
  qualidade: 'Certificada ISO 9001:2015 pela DQS do Brasil e registrada D-U-N-S. Política e objetivos da qualidade da Metalúrgica R-MaC.',
  'trabalhe-conosco': 'Trabalhe na Metalúrgica R-MaC: envie seu currículo para emprego@metalurgicarmac.com.br.',
  contato: 'Fale com a R-MaC: Rua Cristopher Levalley, 461, São Leopoldo/RS. (51) 3591-0099, diretoria@metalurgicarmac.com.br.',
};
const titulos = { index: 'Metalúrgica R-MaC · Usinagem de precisão', empresa: 'Empresa · R-MaC', servicos: 'Serviços e equipamentos · R-MaC', qualidade: 'Qualidade · R-MaC', 'trabalhe-conosco': 'Trabalhe conosco · R-MaC', contato: 'Contato · R-MaC' };

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = `<img class="logo" src="${IMG}logo.webp" alt="R-MaC Indústria de Usinagem" width="237" height="131">`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('relogio')} Segunda a sexta, 7h30 às 12h e 13h às 17h30</span>
    <span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a href="mailto:${E.diretoria}">${ic('mail')} ${E.diretoria}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV, ativo)}</ul></nav>
    <a class="btn topo-cta" href="${link(v, 'contato')}#orcamento">Faça seu orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="orc"><div class="in orc-in">
  <div><p class="sobre">Faça seu orçamento</p><h2>Envie o desenho. A R-MaC usina.</h2><p>Mande o desenho, o material e a quantidade. A diretoria responde com prazo e valor.</p></div>
  <div class="orc-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Pedir orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo}<p>Usinagem de precisão de alta performance e pintura eletrostática. Indústria gaúcha, certificada ISO 9001:2015.</p>
    <p class="redes"><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a></p></div>
  <div><h3>Endereço</h3><p>${E.rua}<br>${E.compl}<br>${E.bairro} – ${E.cidade}<br>CEP ${E.cep}</p><h3>Horário</h3><p>Segunda a sexta-feira<br>7h30 às 12h00 · 13h00 às 17h30</p></div>
  <div><h3>Atendimento</h3><ul class="rodape-lista">
    <li><a href="${telHref(E.fone)}">${E.fone}</a></li>
    <li><span>Diretoria</span><a href="mailto:${E.diretoria}">${E.diretoria}</a></li>
    <li><span>Currículos</span><a href="mailto:${E.emprego}">${E.emprego}</a></li>
    <li><span>Financeiro</span><a href="mailto:${E.financeiro}">${E.financeiro}</a></li>
    <li><span>Notas fiscais</span><a href="mailto:${E.nfe}">${E.nfe}</a></li>
  </ul></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} R-MaC Metalúrgica. Empresa genuinamente brasileira.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#111111' }) + topo(v, slug) + corpo + rodape(v);

const cabecalhoPg = (v, sobre, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / ${esc(sobre)}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const numeros = `<ul class="numeros">
  <li><b>25+</b><span>centros de usinagem CNC</span></li>
  <li><b>Robôs</b><span>célula Fanuc com esteira automática</span></li>
  <li><b>5 eixos</b><span>Grob G350 com duplo pallet</span></li>
  <li><b>ISO 9001</b><span>certificada pela DQS do Brasil</span></li>
</ul>`;
const setores = `<ul class="setores">${C.setores.map(([f, n], i) => `<li class="sobe" style="--i:${i}">${fig(f, `Setor ${n}`)}<span>${n}</span></li>`).join('')}</ul>`;
const clientes = `<ul class="logos">${C.clientes.map(([f, n]) => `<li><img src="${IMG}clientes/${f}.webp" alt="${n}" loading="lazy"></li>`).join('')}</ul>`;
const selos = `<div class="selos">
  <div class="selo">${fig('selo-14anos.webp', 'R-MaC 14 anos', 'selo-img')}<p><b>14 anos</b> de usinagem em São Leopoldo</p></div>
  <div class="selo"><span class="selo-iso">ISO<small>9001:2015</small></span><p>Certificada na <b>ISO 9001:2015</b> pela DQS do Brasil</p></div>
  <div class="selo">${fig('duns.webp', 'D-U-N-S Registered', 'selo-img')}<p>Membro <b>D-U-N-S® Registered™</b>, número ${E.duns}</p></div>
</div>`;
const fichaEquip = (e) => `<article class="equip sobe" id="${e.id}">
  <div class="equip-foto">${fig(e.foto, e.t)}<img class="equip-marca" src="${IMG}marcas/${e.marca}.webp" alt="" loading="lazy"></div>
  <div class="equip-txt"><p class="equip-q">${e.q}</p><h3>${e.t}</h3><ul>${e.d.map(x => `<li>${x}</li>`).join('')}</ul></div>
</article>`;
const galeria = (lista) => `<div class="galeria">${lista.map(([f, a]) => `<a href="${IMG}${f}" data-foto="${esc(a)}">${fig(f, a)}</a>`).join('')}</div>`;

const formOrc = `<form class="form" id="orcamento" data-email="${E.diretoria}" data-assunto="Orçamento pelo site">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Nome da empresa*<input name="empresa" required autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Descreva a peça, o material, a quantidade e o prazo."></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar pedido de orçamento</button>
  <p class="form-nota">O pedido abre no seu e-mail endereçado a ${E.diretoria}. Anexe o desenho (PDF, STEP ou DWG) e fotos antes de enviar.</p>
</form>`;
const formVaga = `<form class="form" data-email="${E.emprego}" data-assunto="Currículo pelo site">
  <div class="form-duas"><label>Nome completo*<input name="nome" required autocomplete="name"></label><label>E-mail*<input name="email" type="email" required autocomplete="email"></label></div>
  <div class="form-duas"><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label><label>Vaga que deseja<input name="vaga" placeholder="Ex.: operador de centro de usinagem"></label></div>
  <label>Link para currículo ou LinkedIn<input name="link" type="url" placeholder="https://"></label>
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar candidatura</button>
  <p class="form-nota">A mensagem abre no seu e-mail para ${E.emprego}. Anexe o currículo antes de enviar.</p>
</form>`;

// ---------- páginas internas (comuns) ----------
function paginaEmpresa(v) {
  return cabecalhoPg(v, 'Empresa', 'Sobre a R-MaC', 'Indústria gaúcha de São Leopoldo que produz serviços de usinagem de alta performance.', 'pavilhao.webp') + `
<section class="sec emp"><div class="in emp-in">
  <div class="emp-txt sobe">${C.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="emp-foto sobe">${fig('robo-2.webp', 'Robô Fanuc da célula robotizada')}<img class="emp-selo" src="${IMG}selo-14anos.webp" alt="14 anos" loading="lazy"></figure>
</div></section>
<section class="sec mvv"><div class="in">
  <div class="mvv-grade">
    <div class="mvv-col sobe"><h2>Missão</h2><p>${C.missao}</p></div>
    <div class="mvv-col sobe"><h2>Visão</h2><p>${C.visao}</p></div>
    <div class="mvv-col sobe"><h2>Valores</h2><ul>${C.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
  </div>
</div></section>
<section class="sec atuacao"><div class="in atuacao-in">
  <div class="sobe"><p class="sobre">Atuação</p><h2>De São Leopoldo para clientes no Brasil e no exterior</h2><p>Peças usinadas para os setores de armamento, automotivo, ferramentas e agrícola, com coleta e entrega em frota própria.</p></div>
  <figure class="sobe">${fig('mapa-mundo.webp', 'Mapa de atuação da R-MaC a partir do Brasil')}</figure>
</div></section>
<section class="sec gal"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Galeria</p><h2>Por dentro da R-MaC</h2></div>
  ${galeria(C.galeria)}
</div></section>
<section class="sec brasil"><div class="in brasil-in">${fig('bandeira.webp', 'Bandeira do Brasil')}<h2>Empresa genuinamente brasileira</h2></div></section>`;
}

function paginaServicos(v) {
  return cabecalhoPg(v, 'Serviços', 'Usinagem de precisão', 'Parque fabril sofisticado e em constante evolução. Entre em contato conosco e se surpreenda.', 'fabrica-maquinas.webp') + `
<section class="sec serv"><div class="in serv-in">
  <div class="sobe">${C.servicos.map(p => `<p>${p}</p>`).join('')}<p>Além da usinagem, a R-MaC conta com <b>célula de pintura eletrostática</b> e <b>frota própria</b> para coleta e entrega de materiais.</p></div>
  <figure class="sobe serv-robo">${fig('robo.webp', 'Robô Fanuc')}</figure>
</div></section>
<section class="sec set-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores de atuação</p><h2>Armamento, automotivo, ferramentas e agrícola</h2></div>
  ${setores}
</div></section>
<section class="sec equip-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Equipamentos</p><h2>Mais de 25 centros de usinagem e ${totalTornos} tornos CNC</h2><p>Todos com presetter, touch probe e medidores óticos contra quebra de ferramentas Renishaw, para rodar lotes com repetibilidade.</p></div>
  <nav class="equip-nav" aria-label="Equipamentos">${C.equip.map(e => `<a href="#${e.id}">${e.t}</a>`).join('')}</nav>
  <div class="equip-lista">${C.equip.map(fichaEquip).join('')}</div>
</div></section>
<section class="sec metro-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Laboratório de medição</p><h2>Cada peça medida em 3D</h2></div>
  <div class="metro-grade">${C.metrologia.map(m => `<article class="metro sobe">${fig(m.foto, m.t)}<div><img class="metro-marca" src="${IMG}marcas/${m.marca}.webp" alt="" loading="lazy"><h3>${m.t}</h3><p>${m.d}</p></div></article>`).join('')}</div>
</div></section>
<section class="sec frota"><div class="in frota-in">
  <div class="sobe"><p class="sobre">Frota própria</p><h2>Coleta e entrega com veículos próprios</h2><p>Também dispomos do serviço de coleta e entrega de materiais com veículos próprios. Mais uma facilidade que a Metalúrgica R-MaC oferece a seus clientes.</p></div>
  <figure class="sobe">${fig('frota.webp', 'Veículos da frota própria R-MaC')}</figure>
</div></section>`;
}

function paginaQualidade(v) {
  return cabecalhoPg(v, 'Qualidade', 'Qualidade certificada', 'ISO 9001:2015 pela DQS do Brasil e registro internacional D-U-N-S.', 'equator.webp') + `
<section class="sec qual"><div class="in">${selos}</div></section>
<section class="sec pol"><div class="in pol-in">
  <blockquote class="sobe"><p class="sobre">Política da qualidade</p>“${C.politica}”</blockquote>
  <div class="sobe"><h2>Objetivos da qualidade</h2><ol class="objetivos">${C.objetivos.map(o => `<li>${o}</li>`).join('')}</ol></div>
</div></section>
<section class="sec cert"><div class="in cert-in">
  <figure class="sobe">${fig('certificados.webp', 'Certificados ISO 9001:2015 DQS e IQNet da Metalúrgica R-MaC')}</figure>
  <div class="sobe"><p class="sobre">Certificados</p><h2>DQS e IQNet</h2><p>Certificado do sistema de gestão da qualidade conforme a ISO 9001:2015, emitido pela DQS do Brasil, com reconhecimento internacional IQNet.</p><a class="link-seta" href="${E.antigo}_files/ugd/c6830c_70a47063511b4d499614e4920327adbf.pdf" target="_blank" rel="noopener">Ver certificado (PDF) ${ic('ext')}</a></div>
</div></section>
<section class="sec metro-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Laboratório de medição</p><h2>Zeiss, Renishaw e Zoller no controle</h2></div>
  <div class="metro-grade">${C.metrologia.map(m => `<article class="metro sobe">${fig(m.foto, m.t)}<div><h3>${m.t}</h3><p>${m.d}</p></div></article>`).join('')}</div>
</div></section>`;
}

function paginaVagas(v) {
  return cabecalhoPg(v, 'Trabalhe conosco', 'Trabalhe conosco', 'Pessoas em primeiro lugar. Envie seu currículo e venha usinar com tecnologia de ponta.', 'equipe.webp') + `
<section class="sec vagas"><div class="in vagas-in">
  <div class="sobe"><h2>Envie sua candidatura</h2>${formVaga}</div>
  <figure class="sobe vagas-foto">${fig('equipe.webp', 'Equipe da R-MaC no parque fabril')}<figcaption>Currículos também por e-mail: <a href="mailto:${E.emprego}">${E.emprego}</a></figcaption></figure>
</div></section>`;
}

function paginaContato(v) {
  return cabecalhoPg(v, 'Contato', 'Faça seu orçamento', 'Envie o desenho, o material e a quantidade. A R-MaC responde com prazo e valor.', null) + `
<section class="sec cont"><div class="in cont-in">
  <div class="sobe"><h2>Pedido de orçamento</h2>${formOrc}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.rua}<br>${E.compl}<br>${E.bairro} – ${E.cidade} – CEP ${E.cep}</span></div></li>
    <li>${ic('tel')}<div><b>Tele atendimento</b><span><a href="${telHref(E.fone)}">+55 ${E.fone}</a></span></div></li>
    <li>${ic('mail')}<div><b>Diretoria</b><span><a href="mailto:${E.diretoria}">${E.diretoria}</a></span></div></li>
    <li>${ic('relogio')}<div><b>Horário</b><span>Segunda a sexta-feira<br>7h30 às 12h00 · 13h00 às 17h30</span></div></li>
    <li>${ic('usuarios')}<div><b>Outros setores</b><span>Currículos: <a href="mailto:${E.emprego}">${E.emprego}</a><br>Financeiro: <a href="mailto:${E.financeiro}">${E.financeiro}</a><br>Notas fiscais: <a href="mailto:${E.nfe}">${E.nfe}</a></span></div></li>
  </ul></aside>
</div></section>
<section class="sec onde"><div class="in onde-in">
  <div class="sobe"><p class="sobre">Localização</p><h2>Condomínio industrial em São Leopoldo</h2><p>${E.rua}, ${E.compl}, bairro ${E.bairro}, ${E.cidade}.</p><a class="link-seta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Rua Cristopher Levalley, 461, São Leopoldo RS')}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('ext')}</a></div>
  <div class="mapa sobe"><iframe src="${MAPA}" title="Mapa: ${E.rua}, ${E.cidade}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;
}

const internas = v => ({ empresa: pagina(v, 'empresa', paginaEmpresa(v)), servicos: pagina(v, 'servicos', paginaServicos(v)), qualidade: pagina(v, 'qualidade', paginaQualidade(v)), 'trabalhe-conosco': pagina(v, 'trabalhe-conosco', paginaVagas(v)), contato: pagina(v, 'contato', paginaContato(v)) });

// ---------- A "Alta performance": clara, robô amarelo na abertura ----------
function versaoA() {
  const v = 'a';
  const destaques = C.equip.slice(0, 4);
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Indústria de usinagem · São Leopoldo/RS</p>
    <h1>A sua solução em usinagem de precisão</h1>
    <p class="lead">Células robotizadas, ${totalCentros} centros de usinagem CNC e laboratório de medição 3D para lotes com qualidade realmente diferenciada.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Faça seu orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver equipamentos</a></div>
  </div>
  <div class="hero-robo">${fig('robo.webp', 'Robô Fanuc da célula robotizada R-MaC')}</div>
</div></section>
<section class="faixa-num"><div class="in">${numeros}</div></section>

<section class="sec qual-home"><div class="in">
  <div class="sec-tit centro sobe"><p class="sobre">Qualidade certificada</p><h2>ISO 9001:2015 e registro D-U-N-S</h2></div>
  ${selos}
</div></section>

<section class="sec set-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores de atuação</p><h2>Peças usinadas para quatro setores exigentes</h2></div>
  ${setores}
</div></section>

<section class="sec destaque"><div class="in destaque-in">
  <div class="sobe"><p class="sobre">Parque fabril</p><h2>Automação que roda dia e noite</h2><p>Células robotizadas Fanuc com esteira automática de carregamento, centros Hartford, Doosan e Maximill e um Grob 5 eixos com duplo pallet. Todos com medição Renishaw na máquina.</p>
    <ul class="dest-lista">${destaques.map(e => `<li><b>${e.q}</b><span>${e.t}</span></li>`).join('')}</ul>
    <a class="link-seta" href="${link(v, 'servicos')}">Todos os equipamentos ${ic('seta')}</a></div>
  <figure class="sobe dest-foto">${fig('grob-g350.webp', 'Centro de usinagem Grob G350 5 eixos')}</figure>
</div></section>

<section class="sec sobre-home"><div class="in sobre-in">
  <figure class="sobe">${fig('equipe.webp', 'Equipe da R-MaC')}</figure>
  <div class="sobe"><p class="sobre">Sobre a R-MaC</p><h2>Mais de uma década de usinagem de alta performance</h2><p>${C.sobre[0]}</p><p>${C.sobre[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec cli-sec"><div class="in">
  <div class="sec-tit centro sobe"><p class="sobre">Principais clientes</p><h2>Quem já usina com a R-MaC</h2></div>
  ${clientes}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Chão de fábrica": preto e amarelo, fotos em tela cheia ----------
function versaoB() {
  const v = 'b';
  const slides = [['fabrica-maquinas.webp', 'Linha de centros de usinagem'], ['grob-g350.webp', 'Grob G350'], ['fabrica-taurus.webp', 'Centros de usinagem'], ['celula-robotizada.webp', 'Célula robotizada Fanuc']];
  const home = `
<section class="hero" data-carrossel="6000">
  ${slides.map(([f, a]) => `<figure class="slide"><img src="${IMG}${f}" alt="${esc(a)}"></figure>`).join('')}
  <div class="in hero-in">
    <p class="sobre">R-MaC · Indústria de usinagem</p>
    <h1>A sua solução em usinagem de precisão</h1>
    <p class="lead">Usinagem de alta performance com células robotizadas, ${totalCentros} centros CNC e medição 3D. São Leopoldo/RS.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#orcamento">Faça seu orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
    <div class="pontos"></div>
  </div>
</section>

<section class="sec selos-sec"><div class="in">${selos}</div></section>

<section class="sec maq-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Equipamentos</p><h2>O parque fabril em números</h2></div>
  <ul class="maq-grade">${C.equip.map(e => `<li class="sobe"><a href="${link(v, 'servicos')}#${e.id}">${fig(e.foto, e.t)}<span class="maq-q">${e.q}</span><span class="maq-t">${e.t}</span></a></li>`).join('')}</ul>
</div></section>

<section class="sec set-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores de atuação</p><h2>Armamento, automotivo, ferramentas e agrícola</h2></div>
  ${setores}
</div></section>

<section class="sec metro-home"><div class="in metro-home-in">
  <div class="sobe"><p class="sobre">Laboratório de medição</p><h2>Zeiss DuraMax e Renishaw Equator</h2><p>${C.metrologia[0].d}</p><a class="link-seta" href="${link(v, 'qualidade')}">Qualidade R-MaC ${ic('seta')}</a></div>
  <figure class="sobe">${fig('duramax.webp', 'Zeiss DuraMax')}</figure>
  <figure class="sobe">${fig('equator.webp', 'Renishaw Equator 300')}</figure>
</div></section>

<section class="sec cli-sec"><div class="in">
  <div class="sec-tit centro sobe"><p class="sobre">Principais clientes</p><h2>Confiam na R-MaC</h2></div>
  ${clientes}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'Metalúrgica R-MaC', artigo: 'da', url: E.url, lang: 'pt', cor: '#FCDF11', fundo: '#111111', claro: '#f3f3f1',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Alta performance', paginas: 6, texto: 'Clara, com o preto e o amarelo da marca: o robô Fanuc na abertura, selos de qualidade, setores e o parque fabril em destaque.', pontos: ['Fichas de todos os equipamentos em texto', 'Selos ISO 9001, D-U-N-S e 14 anos', 'Orçamento direto para a diretoria'] },
    { letra: 'b', nome: 'Chão de fábrica', paginas: 6, texto: 'Preta e amarela, com fotos do parque fabril em tela cheia, as máquinas em grade na página inicial e o laboratório de medição em destaque.', pontos: ['Fotos reais da fábrica e da equipe', 'Galeria com ampliação', 'Página de Trabalhe conosco com formulário'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
