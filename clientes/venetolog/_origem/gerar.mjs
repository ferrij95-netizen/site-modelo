// Vêneto Transportes (Caxias do Sul/RS e mais 6 unidades). Gera public/{a,b}/ e a página de escolha.
// node clientes/venetolog/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs venetolog https://www.venetolog.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Vêneto Transportes', url: 'https://venetolog.overtus.com.br/', antigo: 'https://www.venetolog.com.br/',
  rastreio: 'http://rastreamento.venetolog.com.br/', curriculo: 'http://curriculo.venetolog.com.br/curriculoweb', denuncia: 'http://denuncia.venetolog.com.br/',
  video: 'https://www.youtube.com/watch?v=2RgQGVUJGBI',
  historia: ['A Vêneto Transportes é uma operadora logística que, desde 1987, tem como área de atuação a prestação de serviços em transportes, movimentações e operações logísticas de materiais, com agilidade e segurança. Opera como prestadora de serviços para inúmeras empresas de diversos segmentos de atuação no mercado brasileiro. Possui equipe experiente, buscando continuamente soluções que atendam os requisitos de seus clientes.',
    'Está localizada entre os melhores pontos estratégicos de movimentação de materiais do país, fazendo o transporte nas regiões Sul e Sudeste. Sua frota de caminhões está equipada com toda segurança, oferecendo entregas e coletas com agilidade, distribuição de materiais e operações logísticas.'],
  estrutura: ['A Vêneto possui amplos pavilhões para carga e descarga, com unidades de negócio em São Paulo, Caxias do Sul, Campinas, Porto Alegre (Cachoeirinha), Curitiba, Rio de Janeiro (Duque de Caxias) e São Mateus (ES).',
    'São mais de 200 veículos próprios entre sider, graneleiras e baú de pequeno, médio e grande porte, além de empilhadeiras, guindastes e paleteiras, cumprindo todas as exigências para transferências e distribuição. Conta ainda com agregados devidamente treinados e monitorados em número suficiente para atender qualquer demanda.'],
  qualidade: 'Realizar atividades de movimentação e distribuição de materiais com confiabilidade e rentabilidade, identificando e atendendo os requisitos das partes interessadas, amparado por um Sistema Integrado de Gestão em constante melhoria e uma equipe de empregados capacitada e valorizada.',
};
const politicas = [
  ['Contratação da força de trabalho', 'A Vêneto seleciona, contrata, treina e recicla constantemente sua força de trabalho, visando garantir a base de seu negócio.'],
  ['Disciplina', 'Capacitar e instruir os empregados para cumprir e respeitar leis, regulamentos internos e externos, objetivando o bem-estar comum.'],
  ['Álcool e drogas', 'A Vêneto atua preventivamente, comprometendo-se a orientar, conscientizar e sensibilizar sua equipe de trabalho e agregados, visando uma melhor integração familiar e profissional.'],
  ['Segurança, saúde e meio ambiente', 'Com o objetivo de prevenir acidentes e reduzir riscos quanto à segurança, saúde e meio ambiente, todos os envolvidos no processo recebem treinamentos, palestras e informativos dispostos em murais.'],
  ['Treinamento', 'Capacitar, qualificar e aperfeiçoar a força de trabalho, para exercerem suas funções com eficácia, buscando crescimento e valorização profissional dentro da empresa.'],
  ['Segurança patrimonial', 'A Vêneto busca preservar a segurança e a integridade física de sua força de trabalho e de seus visitantes, do patrimônio da Vêneto e da propriedade do cliente enquanto sob sua guarda, garantindo a continuidade da empresa.'],
];
// unidades: código, cidade, UF, telefone, endereço, CEP, tipo, área total, construída, foto, e-mail de coleta
const unidades = [
  { cod: '010', id: 'sao-paulo', cidade: 'São Paulo', uf: 'SP', fone: '(11) 2131-6400', coleta: 'coleta.sp@venetolog.com.br', sedes: [
    { nome: 'Distribuição (sede principal)', end: 'Alameda 3º Sgt. Alcides Oliveira, 549, Pq. Novo Mundo', cep: '02145-040', total: '18.000', constr: '7.000', foto: 'sao-paulo-distribuicao' },
    { nome: 'Recebimento', end: 'Alameda 2º Sgt. Rubens Leite, 35, Pq. Novo Mundo', cep: '02147-000', total: '5.400', constr: '3.300', foto: 'sao-paulo-recebimento' }] },
  { cod: '020', id: 'caxias-do-sul', cidade: 'Caxias do Sul', uf: 'RS', fone: '(54) 2991-8300', coleta: 'coleta.cxs@venetolog.com.br', sedes: [
    { nome: 'Sede própria', end: 'RS 122, 17.670, Km 79,9, Pioneiro II, C.P. 8046', cep: '', total: '43.000', constr: '17.600', foto: 'caxias-do-sul' }] },
  { cod: '030', id: 'curitiba', cidade: 'Curitiba', uf: 'PR', fone: '(41) 2108-8885', coleta: 'coleta.ctb@venetolog.com.br', sedes: [
    { nome: 'Sede própria', end: 'BR 116, 27.220, Tatuquara', cep: '81690-500', total: '16.000', constr: '4.100', foto: 'curitiba' }] },
  { cod: '040', id: 'duque-de-caxias', cidade: 'Duque de Caxias', uf: 'RJ', fone: '(21) 2157-8888', coleta: 'coleta.rio@venetolog.com.br', sedes: [
    { nome: 'Xerém', end: 'R. Cap. Guynemer, 1261, Xerém', cep: '25250-615', total: '4.200', constr: '1.392', foto: 'duque-de-caxias' }] },
  { cod: '050', id: 'cachoeirinha', cidade: 'Cachoeirinha (Porto Alegre)', uf: 'RS', fone: '(51) 3074-7900', coleta: 'coleta.poa@venetolog.com.br', sedes: [
    { nome: 'Sede própria', end: 'Rua Fritz Beiser, 200', cep: '94935-220', total: '23.830', constr: '4.650', foto: 'cachoeirinha' }] },
  { cod: '060', id: 'campinas', cidade: 'Campinas', uf: 'SP', fone: '(19) 2138-4800', coleta: 'coleta.cam@venetolog.com.br', sedes: [
    { nome: 'Sede própria', end: 'Rua Dario Freire Meireles, 93, Campo dos Amarais', cep: '13082-045', total: '3.000', constr: '2.400', foto: 'campinas' }] },
  { cod: '070', id: 'sao-mateus', cidade: 'São Mateus', uf: 'ES', fone: '(27) 3600-1960', coleta: 'coleta.esp@venetolog.com.br', sedes: [
    { nome: 'Unidade', end: 'Av. Governador Mário Covas, 531, SEAC', cep: '29937-310', total: '', constr: '', foto: 'sao-mateus' }] },
];
const estados = [['RS', 'Rio Grande do Sul', ['020', '050']], ['SP', 'São Paulo', ['010', '060']], ['PR', 'Paraná', ['030']], ['RJ', 'Rio de Janeiro', ['040']], ['ES', 'Espírito Santo', ['070']]];
const licencas = [
  ['AVCB/PPCI: Licença do Corpo de Bombeiros nº 17670', '06/04/2028', '33929-1 - 10118-2 - Veneto Transportes - APPCI 2024.pdf'],
  ['ART: Transporte de produtos e/ou resíduos perigosos', '19/03/2027', 'documento_144_ART_SIMONE_VENETO_CXS_19-03-27.pdf'],
  ['Cartão CNPJ: Vêneto Transportes', '', 'documento_171_Cartão_CNPJ_Filial_Veneto_Caxias.pdf'],
  ['Exército Brasileiro: Certificado de Registro', '01/10/2027', 'Exercito 01-10-27.pdf'],
  ['FEPAM: Relatório de placas licenciadas', '20/03/2027', 'Fepam Vêneto Relatório de Placas.pdf'],
  ['FEPAM: Licença de Operação de fontes móveis de poluição', '20/03/2027', 'Fepam Vêneto 20.03.2027.pdf'],
  ['IBAMA: Autorização ambiental para transporte interestadual de produtos perigosos', '22/01/2027', 'Ibama Caxias do Sul 22.01.2027.pdf'],
  ['IBAMA: Cadastro Técnico Federal, Certificado de Regularidade', '22/01/2027', 'CR_caxias do sul_venc 22.01.27.pdf'],
  ['Licença de Operação (pátio): SEMMA', '29/05/2029', 'LO Nº 4861_2024 – SEMMA_VENETO_CAXIAS 29-05-2029.pdf'],
  ['Polícia Federal: Licença de funcionamento, produtos químicos', '23/03/2027', 'CLF_Caxias_23.03.27.pdf'],
  ['Polícia Federal: Certificado de Registro Cadastral, produtos químicos', '', 'documento_58_Policia_Federal_CRC_Caxiasdosul.pdf'],
  ['Unybrasil: Certificado para atendimento a emergências químicas e ambientais', '06/05/2029', '4 - Certificado para atendimento a Emergências Quimicas.pdf'],
  ['Unybrasil/Vêneto: PAE, Plano de Atendimento Emergencial', '06/05/2027', 'PAE_Nacional_atualizado_29_Veneto_Transportes_Unybrasil_assinado.pdf'],
].map(l => [l[0], l[1], `https://www.venetolog.com.br/_uploads/doc/002/${encodeURIComponent(l[2])}`]);
const servicos = [
  ['caminhao', 'Transporte e transferência', 'Cargas fracionadas e lotação entre as unidades do Sul e do Sudeste.'],
  ['pacote', 'Distribuição', 'Entregas e coletas com agilidade a partir de cada unidade de negócio.'],
  ['fabrica', 'Armazenagem e operações logísticas', 'Pavilhões amplos para carga, descarga, conferência e movimentação.'],
  ['escudo', 'Produtos perigosos', 'Licenças IBAMA, FEPAM, Exército e Polícia Federal, e plano de emergência.'],
];
const nav = [{ slug: 'index', nome: 'Página inicial' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'unidades', nome: 'Unidades' }, { slug: 'qualidade', nome: 'Qualidade' }, { slug: 'documentos', nome: 'Downloads' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Tricolor', b: 'Rodovia' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&family=Barlow+Condensed:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Operadora logística desde 1987` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#d71a2b' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ext = 'target="_blank" rel="noopener"';
const porCod = c => unidades.find(u => u.cod === c);
const formulario = (tipo = '') => `<form class="form" data-mail>
  <label>O que você precisa<select name="assunto">${['Solicitação de coleta', 'Cotação de frete', 'Informações', 'Outro assunto'].map(t => `<option${t === tipo ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
  <label>Unidade<select name="unidade" required><option value="">Selecione a unidade</option>${unidades.map(u => `<option value="${u.coleta}">${u.cod} · ${u.cidade} - ${u.uf}</option>`).join('')}</select></label>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Origem, destino, tipo de carga, peso e volumes"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar para a unidade</button>
  <p class="form-nota">A mensagem abre no seu e-mail, já endereçada à unidade escolhida.</p>
</form>`;
const unidadeCard = (u, v) => u.sedes.map(s => `<article class="unid sobe" id="${u.id}${u.sedes.length > 1 && s !== u.sedes[0] ? '-2' : ''}"><figure>${img('unidade-' + s.foto, `Unidade ${u.cidade}: ${s.nome}`)}<span class="cod">${u.cod}</span></figure><div><h3>${u.cidade} <small>${u.uf}</small></h3><p class="unid-tipo">${s.nome}</p><ul><li>${ic('pin')}<span>${s.end}${s.cep ? `, CEP ${s.cep}` : ''}</span></li><li>${ic('tel')}<a href="${telHref(u.fone)}">${u.fone}</a></li><li>${ic('mail')}<a href="mailto:${u.coleta}">${u.coleta}</a></li></ul>${s.total ? `<p class="areas"><span><b>${s.total} m²</b> área total</span><span><b>${s.constr} m²</b> construídos</span></p>` : ''}</div></article>`).join('');

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Vêneto Transportes" width="334" height="202"></a>
    <div class="topo-dir"><p class="topo-acoes"><a href="${E.rastreio}" ${ext}>${ic('caminhao')}Rastrear carga</a><a href="${link(v, 'contato')}">${ic('pacote')}Solicitar coleta</a></p>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav></div>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="faixa-it" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Vêneto Transportes" width="334" height="202"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn-topo" href="${E.rastreio}" ${ext}>${ic('caminhao')}<span>Rastrear</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  ${v === 'b' ? '<div class="faixa-it" aria-hidden="true"><i></i><i></i><i></i></div>' : ''}
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo.webp" alt="Vêneto Transportes" width="334" height="202" loading="lazy"><p>Operadora logística desde 1987. Transporte, distribuição e operações logísticas no Sul e no Sudeste.</p></div>
    <div><h3>Unidades</h3><ul class="rod-unid">${unidades.map(u => `<li><a href="${link(v, 'unidades')}#${u.id}"><b>${u.cod}</b>${u.cidade} - ${u.uf}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('caminhao')}<a href="${E.rastreio}" ${ext}>Rastreamento de carga</a></li>
      <li>${ic('pacote')}<a href="${link(v, 'contato')}">Solicitação de coleta e cotação</a></li>
      <li>${ic('livro')}<a href="${link(v, 'documentos')}">Licenças e transparência</a></li>
      <li>${ic('usuarios')}<a href="${link(v, 'trabalhe-conosco')}">Trabalhe conosco</a></li>
      <li>${ic('escudo')}<a href="${E.denuncia}" ${ext}>Canal de denúncia</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Vêneto Transportes. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.unidades = head(v, 'unidades', 'Unidades', `Unidades da Vêneto Transportes: ${unidades.map(u => `${u.cidade} - ${u.uf}`).join(', ')}.`) + topo(v, 'unidades') + cab('Localização', 'Onde a Vêneto está', 'galpao-aereo') + `
<div class="in"><section class="atuacao"><div><h2>Área de atuação</h2><p>Confira qual unidade de negócio Vêneto atende a sua região. Cada unidade faz coletas, entregas e distribuição no seu estado e as transferências entre as unidades.</p><ul class="estados">${estados.map(e => `<li><b>${e[0]}</b><span>${e[1]}</span><em>${e[2].map(c => `<a href="#${porCod(c).id}">${c} · ${porCod(c).cidade}</a>`).join('')}</em></li>`).join('')}</ul></div><figure class="mapa-img">${img('mapa', 'Mapa dos estados atendidos: RS, PR, SP, RJ e ES')}</figure></section>
<section class="unids">${unidades.map(u => unidadeCard(u, v)).join('')}</section></div>
` + rodape(v);
  pag.qualidade = head(v, 'qualidade', 'Qualidade e políticas', E.qualidade) + topo(v, 'qualidade') + cab('Qualidade', 'Política de qualidade e políticas gerais', 'equipe-frota') + `
<div class="in"><section class="citacao"><p class="k">Política de qualidade</p><blockquote>“${E.qualidade}”</blockquote></section>
<section class="politicas"><h2>Políticas gerais</h2><ol>${politicas.map(p => `<li class="sobe"><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="fotos-linha">${img('treinamento', 'Treinamento da equipe')}${img('conferencia', 'Conferência de carga no armazém')}${img('armazem', 'Pavilhão de carga e descarga')}</section></div>
` + rodape(v);
  pag.documentos = head(v, 'documentos', 'Downloads: licenças e transparência', 'Licenças, certificados e relatórios de transparência da Vêneto Transportes.') + topo(v, 'documentos') + cab('Downloads', 'Licenças e transparência', 'carga-expedicao') + `
<div class="in docs"><section><h2>Licenças: Caxias do Sul - RS</h2><ul class="doc-lista">${licencas.map(l => `<li><a href="${l[2]}" ${ext}>${ic('livro')}<span>${esc(l[0])}</span>${l[1] ? `<em>Validade ${l[1]}</em>` : '<em>PDF</em>'}</a></li>`).join('')}</ul><p class="nota">As licenças das demais unidades (Curitiba, São Paulo, Duque de Caxias, Cachoeirinha, Campinas, Sumaré e São Mateus) ficam na <a href="https://www.venetolog.com.br/Downloads.php" ${ext}>área de downloads</a>.</p></section>
<aside><h2>RH: Transparência</h2><p>Relatórios de Transparência e Igualdade Salarial de Mulheres e Homens, por semestre, das unidades RS e São Paulo.</p><a class="btn" href="https://www.venetolog.com.br/Downloads_transparencia.php" ${ext}>${ic('ext')}Ver relatórios</a><h2>Canal de denúncia</h2><p>Comunicação segura e confidencial de condutas irregulares.</p><a class="btn btn-linha" href="${E.denuncia}" ${ext}>${ic('escudo')}Acessar o canal</a></aside></div>
` + rodape(v);
  pag['trabalhe-conosco'] = head(v, 'trabalhe-conosco', 'Trabalhe conosco', 'Cadastre seu currículo na Vêneto Transportes.') + topo(v, 'trabalhe-conosco') + cab('Trabalhe conosco', 'Venha fazer parte da Vêneto', 'treinamento') + `
<div class="in"><section class="texto-pag"><div><p>A Vêneto seleciona, contrata, treina e recicla constantemente sua força de trabalho. Motoristas, conferentes, operadores de empilhadeira e equipe administrativa recebem treinamentos, palestras e acompanhamento para crescer dentro da empresa.</p><p>Cadastre seu currículo no nosso sistema ou envie para a unidade mais próxima.</p><p class="bts"><a class="btn" href="${E.curriculo}" ${ext}>${ic('usuarios')}Cadastrar currículo</a></p><ul class="lista-check"><li>${ic('mail')}<span>Rio Grande do Sul: <a href="mailto:curriculos.cxs@venetolog.com.br">curriculos.cxs@venetolog.com.br</a></span></li><li>${ic('mail')}<span>São Paulo: <a href="mailto:curriculos.spo@venetolog.com.br">curriculos.spo@venetolog.com.br</a></span></li></ul></div><figure>${img('equipe-frota', 'Equipe Vêneto em frente à frota')}</figure></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato, coleta e cotação', 'Solicite coleta ou cotação de frete na unidade Vêneto mais próxima.') + topo(v, 'contato') + cab('Contato', 'Coleta, cotação e atendimento', 'frota-doca') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a unidade</h2>${formulario()}</div><div><h2>E-mails de coleta</h2><ul class="coleta-lista">${unidades.map(u => `<li><b>${u.cod}</b><div><strong>${u.cidade} - ${u.uf}</strong><a href="mailto:${u.coleta}">${u.coleta}</a><a href="${telHref(u.fone)}">${u.fone}</a></div></li>`).join('')}</ul><p class="bts"><a class="btn btn-linha" href="${E.rastreio}" ${ext}>${ic('caminhao')}Rastrear carga</a></p></div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<div class="in"><header class="tit-a"><p class="k">${k}</p><h1>${t}</h1></header></div>`;
  const slides = [['frota-doca', 'Frota Vêneto na doca'], ['galpao-aereo', 'Vista aérea de uma unidade Vêneto'], ['equipe-frota', 'Equipe e frota Vêneto'], ['carga-expedicao', 'Expedição de cargas']];
  pag.index = head(v, 'index', '', E.historia[0]) + topo(v, 'index') + `
<div class="in"><section class="hero-a"><div class="hero-a-txt"><h1><span>Vêneto</span> Transportes, <em>o seu suporte</em> <strong>logístico</strong></h1></div><div class="hero-a-fotos" data-carrossel>${slides.map((s, i) => `<div class="slide${i ? '' : ' ativo'}">${img(s[0], s[1], i ? '' : ' loading="eager" fetchpriority="high"')}</div>`).join('')}<p class="selo">O nosso negócio é o compromisso com a sua empresa</p><div class="pontos"></div></div></section>
<section class="destaques">
  <a class="dest" href="${link(v, 'empresa')}"><small>Desde 1987, uma história</small><b>Movimentada com segurança</b><span>Saiba mais</span></a>
  <a class="dest" href="${link(v, 'empresa')}#estrutura"><small>Nossa estrutura</small><b>É de peso</b><span>Saiba mais</span></a>
  <a class="dest" href="${link(v, 'unidades')}"><small>Onde a</small><b>Vêneto está</b><span>Saiba mais</span></a>
  <div class="dest rastreio"><small>Rastrear sua carga</small><p>Acompanhe a sua entrega com CPF/CNPJ e número da nota fiscal.</p><a class="btn" href="${E.rastreio}" ${ext}>${ic('caminhao')}Rastrear</a></div>
</section>
<section class="chamadas"><a href="${link(v, 'contato')}"><div><small>Faça sua cotação</small><b>Pelo site!</b></div>${img('cotacao', 'Atendimento de cotação')}</a><a href="${link(v, 'contato')}"><div><small>Solicitação de</small><b>Coleta</b></div>${img('coleta', 'Equipe de coletas')}</a></section>
<section class="servicos-a"><h2>O que a Vêneto faz</h2><ul>${servicos.map(s => `<li class="sobe">${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul></section>
<section class="unid-faixa"><h2>7 unidades de negócio no Sul e no Sudeste</h2><ul>${unidades.map(u => `<li><a href="${link(v, 'unidades')}#${u.id}"><b>${u.cod}</b>${u.cidade} - ${u.uf}</a></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'Quem somos', E.historia[0]) + topo(v, 'empresa') + cab('Quem somos', 'Uma história movimentada com segurança') + `
<div class="in"><section class="texto-pag"><div><h2>Nossa história</h2>${E.historia.map(p => `<p>${p}</p>`).join('')}</div><figure>${img('caminhao-antigo', 'Um dos primeiros caminhões da Vêneto')}</figure></section>
<section class="texto-pag inverso" id="estrutura"><figure>${img('armazem', 'Pavilhão de carga e descarga')}</figure><div><h2>Nossa estrutura: estrutura de peso</h2>${E.estrutura.map(p => `<p>${p}</p>`).join('')}<ul class="numeros">${[['1987', 'fundação'], ['200+', 'veículos próprios'], ['7', 'unidades de negócio'], ['5', 'estados atendidos']].map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="video-a"><a href="${E.video}" ${ext}>${img('video', 'Vídeo institucional Vêneto Transportes')}<span>${ic('yt')}Vídeo institucional</span></a></section></div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.historia[0]) + topo(v, 'index') + `
<section class="hero-b">${img('video', 'Vista aérea da unidade de Caxias do Sul', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Operadora logística · desde 1987</p><h1>Sua carga no Sul e no Sudeste, com quem roda desde 1987</h1><p>Transporte, distribuição e operações logísticas a partir de 7 unidades próprias, com mais de 200 veículos e equipe treinada.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('pacote')}Solicitar coleta</a><a class="btn btn-linha" href="${E.rastreio}" ${ext}>${ic('caminhao')}Rastrear carga</a></p></div></section>
<section class="painel-b"><div class="in painel-b-in">${[['1987', 'na estrada'], ['200+', 'veículos próprios'], ['7', 'unidades de negócio'], ['5', 'estados atendidos']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in servicos-b"><header class="tit-b"><p class="k">Serviços</p><h2>Do pátio à porta do cliente</h2></header><ul>${servicos.map((s, i) => `<li class="sobe"><span class="n">0${i + 1}</span>${ic(s[0])}<h3>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}</ul></section>
<section class="rota-b"><div class="in"><header class="tit-b"><p class="k">Unidades</p><h2>A rota Vêneto</h2><p>Cada unidade atende o seu estado e se conecta às outras por transferências diárias.</p></header>
<ol class="rota">${unidades.map(u => `<li class="sobe"><a href="${link(v, 'unidades')}#${u.id}"><span class="cod">${u.cod}</span><strong>${u.cidade}</strong><em>${u.uf}</em><small>${u.fone}</small></a></li>`).join('')}</ol></div></section>
<section class="in dupla-b"><a href="${link(v, 'contato')}" class="sobe">${img('frota-doca', 'Frota na doca')}<div><p class="k">Coleta</p><h3>Solicite a coleta na unidade mais próxima</h3><span>${ic('seta')}</span></div></a><a href="${link(v, 'contato')}" class="sobe">${img('carga-expedicao', 'Expedição de carga')}<div><p class="k">Cotação</p><h3>Peça sua cotação de frete pelo site</h3><span>${ic('seta')}</span></div></a></section>
<section class="historia-b"><div class="in historia-b-in"><div><p class="k">Quem somos</p><h2>Uma história movimentada com segurança</h2><p>${E.historia[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div><figure>${img('equipe-frota', 'Equipe Vêneto')}</figure></div></section>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'Quem somos', E.historia[0]) + topo(v, 'empresa') + cab('Quem somos', 'Uma história movimentada com segurança', 'equipe-frota') + `
<div class="in"><section class="texto-pag"><div><h2>Nossa história</h2>${E.historia.map(p => `<p>${p}</p>`).join('')}</div><figure>${img('caminhao-antigo', 'Um dos primeiros caminhões da Vêneto')}</figure></section>
<section class="texto-pag inverso" id="estrutura"><figure>${img('armazem', 'Pavilhão de carga e descarga')}</figure><div><h2>Estrutura de peso</h2>${E.estrutura.map(p => `<p>${p}</p>`).join('')}</div></section>
<section class="video-a"><a href="${E.video}" ${ext}>${img('video', 'Vídeo institucional Vêneto Transportes')}<span>${ic('yt')}Assistir ao vídeo institucional</span></a></section></div>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
fs.writeFileSync(path.join(pub, 'assets/mail.js'), `document.querySelectorAll('form[data-mail]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=new FormData(f),un=f.unidade.selectedOptions[0].textContent;const corpo=['Unidade: '+un,'Nome: '+d.get('nome'),'Empresa: '+(d.get('empresa')||'-'),'Telefone: '+d.get('telefone'),'E-mail: '+(d.get('email')||'-'),'',d.get('mensagem')||''].join('\\n');location.href='mailto:'+d.get('unidade')+'?subject='+encodeURIComponent(d.get('assunto')+' - site Vêneto')+'&body='+encodeURIComponent(corpo)}));\n`);
const comMail = p => Object.fromEntries(Object.entries(p).map(([k, h]) => [k, h.includes('data-mail') ? h.replace('</body>', '<script src="/assets/mail.js" defer></script>\n</body>') : h]));
escreverVersao(pub, 'a', comMail(A()));
escreverVersao(pub, 'b', comMail(B()));
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#d71a2b', fundo: '#16181b', claro: '#f3f3f1',
  fonteTitulo: "'Barlow Condensed','Titillium Web',sans-serif", fonteTexto: 'Barlow,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Fiel ao site atual: vermelho, verde e branco da bandeira do logo, o bloco "o seu suporte logístico" com as fotos da frota, os quadros de história, estrutura e rastreio, e a cotação e a coleta logo na entrada.', pontos: ['As 7 unidades com foto, telefone e área', 'Pedido de coleta direto para o e-mail da unidade', 'Licenças com validade em uma lista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Mais moderna: fundo asfalto, a vista aérea da unidade na abertura, números da operação em painel e as unidades numeradas como uma rota de 010 a 070.', pontos: ['Rastreio e coleta no topo de todas as páginas', 'A rota Vêneto: 7 unidades em 5 estados', 'Política de qualidade e políticas gerais'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
