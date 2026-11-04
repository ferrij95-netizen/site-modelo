// Triplex Empilhadeiras (Triplex Comércio de Peças e Equipamentos de Movimentação Ltda, Curitiba/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/triplex/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs triplex http://triplex.com.br/)
// Textos, linhas de produto e contatos: do site atual (triplex.com.br, HTML estático). Fotos: as do próprio site (pequenas, 280x200 a 1110x300).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Triplex Empilhadeiras', url: 'https://triplex.overtus.com.br/', antigo: 'http://triplex.com.br/',
  razao: 'Triplex Comércio de Peças e Equipamentos de Movimentação Ltda',
  wa: '5541999991400', fwa: '(41) 99999-1400', fone: '(41) 3278-4968', email: 'comercial@triplex.com.br',
  rua: 'Rua Bartolomeu Lourenço de Gusmão, 549', bairro: 'Hauer', cidade: 'Curitiba - PR', cep: '81610-060',
  curto: 'Locação de empilhadeiras em Curitiba e região, assistência técnica, peças multimarcas e baterias tracionárias.',
};
const intro = 'A Triplex atua com locação de empilhadeiras em Curitiba e região, além de assistência técnica e fornecimento de equipamentos de movimentação de materiais com a tecnologia dos principais fabricantes do mundo, desde a reposição de peças até grandes soluções para empresas de diversos setores.';
const quem = [
  'O sucesso dos nossos clientes sempre foi o combustível das grandes conquistas feitas pela Triplex. Fundada em 1º de dezembro de 1996, com planejamento e qualidade, a Triplex Comércio de Peças e Equipamentos de Movimentação Ltda tornou-se um dos principais fornecedores de empilhadeiras elétricas, rebocadores elétricos, baterias tracionárias, carregadores de bateria e outros equipamentos de movimentação de materiais no estado do Paraná.',
  'Oferecendo tecnologia dos principais fabricantes do mundo, com produtos de alta tecnologia e preço competitivo, desde a simples reposição de peças até grandes soluções para médias e grandes empresas de diversos setores.',
  'Contamos com profissionais qualificados em todas as áreas de desenvolvimento, manutenção e serviço, atuando tanto em nossa sede como nas unidades dos clientes, tornando o que é bom ainda melhor e atendendo as necessidades dos clientes Triplex.',
];
const frota = [
  { id: 'patolada', t: 'Empilhadeira elétrica patolada', tag: 'Elétrica' },
  { id: 'retratil', t: 'Empilhadeira elétrica retrátil', tag: 'Elétrica' },
  { id: 'glp', t: 'Empilhadeira a GLP', tag: 'GLP' },
  { id: 'transpaleteira-eletrica', t: 'Transpaleteira elétrica', tag: 'Elétrica' },
];
const servicos = [
  { s: 'locacao', t: 'Locação de equipamentos', d: 'Empilhadeiras e transpaleteiras para Curitiba e região.', f: 'retratil-patio', i: 'empilhadeira' },
  { s: 'assistencia', t: 'Assistência técnica', d: 'Corretiva, preventiva e contratos de manutenção.', f: 'assistencia', i: 'chave' },
  { s: 'assistencia', h: 'pecas', t: 'Venda de peças multimarcas', d: 'Peças Crown, Ameise e diversas marcas, com estoque a pronta entrega.', f: 'pecas', i: 'engrenagem' },
  { s: 'produtos', h: 'baterias', t: 'Baterias tracionárias', d: 'Baterias Fulguris tubulares e estacionárias VRLA.', f: 'bateria-fulguris', i: 'disco' },
  { s: 'produtos', h: 'carrinhos', t: 'Carrinhos manuais', d: 'Carrinhos de transferência de bateria, pórticos e estrados.', f: 'carrinho', i: 'pacote' },
  { s: 'empresa', h: 'representacoes', t: 'Representações', d: 'Newpower (baterias Fulguris) e Powerbras.', f: 'representacoes', i: 'escudo' },
];
const assist = [
  { t: 'Assistência técnica corretiva', l: ['Manutenção e correção de equipamentos', 'Manutenção, correção e fornecimento de peças originais', 'Manutenção, correção e fornecimento de peças multimarcas'] },
  { t: 'Assistência técnica preventiva', l: ['Manutenção e prevenção de equipamentos', 'Manutenção, prevenção e fornecimento de peças originais', 'Manutenção, prevenção e fornecimento de peças multimarcas'] },
  { t: 'Contratos de manutenção', l: ['A Triplex firma contratos de manutenção preventiva e corretiva para equipamentos e peças.', 'Solicite nosso consultor técnico para mais informações.'] },
];
const pecas = ['Peças com garantia da fábrica', 'Peças Crown', 'Peças Ameise', 'Diversas marcas (sob consulta)', 'Preços competitivos', 'Estoque a pronta entrega', 'Atendemos todo o Brasil'];
const fulguris = [
  ['Características', 'As baterias Fulguris TSF são montadas com vasos selados de alta resistência ao impacto.'],
  ['Interligações', 'Interligações entre elementos de chumbo fundido diretamente aos polos, garantindo uma conexão sem riscos de oxidação.'],
  ['Placas positivas', 'Tipo pluritubular, atendendo às exigências de qualidade e alta performance, dentro de padrões internacionais.'],
  ['Placas negativas', 'Tipo Faure, dimensionadas para atender às características das placas positivas pluritubulares.'],
  ['Separadores', 'Microporosos de polietileno, elásticos e de alta porosidade, facilitando a difusão do eletrólito e aumentando a vida útil da bateria.'],
  ['Caixa de ferro', 'Jateada com granalhas de aço e pintura eletrostática no padrão azul ou na cor definida pelo cliente.'],
  ['Dimensões', 'Nas dimensões originais dos fabricantes de empilhadeiras ou em dimensões especiais definidas pelo cliente, para equipamentos modificados ou específicos.'],
  ['Nível de eletrólito', 'Rolhas flip top permitem verificar o nível sem removê-las: só com indicador de nível ou com enchimento automático.'],
  ['Leitura de densidade', 'Leitura de densidade e temperatura pela simples abertura da tampa superior, sem remover a rolha.'],
  ['Assistência e cursos', 'A Fulguris tem departamento de atendimento para instalação, manutenção e laudos técnicos, e realiza cinco cursos anuais de manutenção e operação na fábrica de Guarulhos/SP.'],
];
const vrla = [['Baterias de 2 V', '75 a 4000 Ah', 'Garantia integral de 2 anos + 8 anos pro rata'], ['Baterias de 12 V', '7 a 200 Ah', 'Garantia integral de 1 ano + 4 anos pro rata']];
const carregadores = ['Carregador PSU', 'Carregador retificador para subestações', 'Carregadores inteligentes'];
const carrinhos = [
  ['transferencia-bateria-tracionaria-2', 'Carrinho de transferência de bateria tracionária'], ['transferencia-bateria-tracionaria-5', 'Carrinho de transferência de bateria tracionária'], ['carrinho', 'Carrinho de transferência de bateria tracionária'],
  ['porticos-1', 'Pórtico para bateria tracionária'], ['porticos-2', 'Pórtico para bateria tracionária'],
  ['estrado-1', 'Estrado para bateria tracionária'], ['estrado-2', 'Estrado para bateria tracionária'],
];
const transpaleteira = [
  ['Sistema hidráulico', 'Simples e robusto, com válvula de alívio que protege contra sobrecargas. Bloco hidráulico compacto, fabricado com equipamento CNC de alta precisão e soldagem robotizada.'],
  ['Construção', 'Estrutura de aço robusta. Timão ergonômico para manobras em pequenos espaços, rebaixos nas pontas dos garfos e roletes de entrada para reduzir o impacto nas rodas de carga.'],
  ['Elevação e descida', 'Atinge rapidamente a elevação máxima pelo bombeamento do timão. Válvula de descarga sensível para descida suave, alavanca de três posições e mola de retorno do timão.'],
  ['Rodas e roletes', 'Rodas direcionais duplas e rodas de carga simples ou em tandem, em nylon, montadas sobre rolamentos com blindagem dupla e de fácil substituição.'],
];
const powerbras = ['Conversores CA/CA e CC/CC', 'Fontes chaveadas', 'Fontes digitais e lineares', 'Fontes para telecomunicação', 'Inversores CC/CA', 'Linha compacta de conversores CC/CC', 'Linha compacta de inversores CC/CA', 'No-breaks (UPS)', 'Transformadores'];
const repres = [
  { t: 'Newpower · Baterias Fulguris', p: ['A linha de baterias Fulguris é desenvolvida para equipamentos de tração elétrica, como empilhadeiras, paleteiras e carros elétricos nacionais ou importados.', 'A Newpower Sistemas de Energia S/A adota um padrão de qualidade que busca atender às necessidades dos usuários de baterias, com melhor performance ampère-hora e maior durabilidade e rendimento.'] },
  { t: 'Powerbras', p: ['A Powerbras Indústria Eletrônica Ltda, fundada em 1989 e com sede própria no Rio de Janeiro, desenvolve e fabrica produtos de energia para o mercado nacional e internacional.', 'Retificadores, fontes chaveadas, no-breaks, inversores CC/CA, transformadores e reatores de 1 kVA a 400 kVA, conversores de frequência, quadros de distribuição e baterias estacionárias.'] },
];
const alt = {
  frota: 'Frota de empilhadeiras e transpaleteiras elétricas da Triplex', operacao: 'Empilhadeira movimentando palete de sacaria', pecas: 'Peças de reposição para empilhadeiras',
  'retratil-patio': 'Empilhadeira elétrica retrátil', assistencia: 'Técnico fazendo manutenção em empilhadeira', representacoes: 'Aperto de mãos sobre mesa de negócios',
  carrinho: 'Carrinho de transferência de bateria tracionária', 'bateria-fulguris': 'Bateria tracionária Fulguris TSF com enchimento automático',
  patolada: 'Empilhadeira elétrica patolada', retratil: 'Empilhadeira elétrica retrátil', glp: 'Empilhadeira a GLP', 'transpaleteira-eletrica': 'Transpaleteira elétrica',
};
for (const c of carrinhos) alt[c[0]] ??= c[1];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'locacao', nome: 'Locação' }, { slug: 'assistencia', nome: 'Assistência e peças' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Frota', b: 'Galpão' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,600;0,700;1,700;1,800&family=Barlow:wght@400;500;600&family=Big+Shoulders+Display:wght@700;800;900&family=IBM+Plex+Sans:wght@400;500;600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Triplex e gostaria de um orçamento.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#f33000', b: '#141414' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Locação de empilhadeiras em Curitiba` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone / WhatsApp<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Empresa<input name="empresa" autocomplete="organization"></label><label>Cidade/UF<input name="cidade" autocomplete="address-level2" placeholder="Curitiba/PR"></label></div>
  <label>Assunto<select name="assunto"><option>Locação de empilhadeira</option><option>Assistência técnica</option><option>Peças</option><option>Baterias e carregadores</option><option>Carrinhos e transpaleteiras</option><option>Outro</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required placeholder="Equipamento, capacidade, prazo, modelo da peça..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('tel')}<div><strong>Atendimento geral</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Triplex" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Bartolomeu Lourenço de Gusmão, 549, Hauer, Curitiba PR')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.bairro}, ${E.cidade}</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Triplex" width="208" height="74"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}WhatsApp</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Triplex" width="208" height="74" loading="lazy"><p>${E.razao}. Equipamentos de movimentação de materiais desde 1996.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Triplex. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servHref = (v, x) => link(v, x.s) + (x.h ? `#${x.h}` : '');
const frotaCards = v => `<ul class="frota">${frota.map(f => `<li class="sobe"><figure>${img(f.id)}<span class="tag">${f.tag}</span></figure><h3>${f.t}</h3><a class="link-seta" href="${wa(`Olá! Quero orçar a locação de: ${f.t}.`)}" ${ext}>Consultar disponibilidade ${ic('seta')}</a></li>`).join('')}</ul>`;
const lista = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Precisa de empilhadeira, peça ou manutenção?</h2><p>Fale com a Triplex pelo WhatsApp ou pelo telefone ${E.fone}.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', quem[0]) + topo(v, 'empresa') + cab('Empresa', 'Desde 1996 movimentando a indústria do Paraná', 'frota') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><aside class="ficha"><dl><div><dt>Fundação</dt><dd>1º de dezembro de 1996</dd></div><div><dt>Sede</dt><dd>${E.bairro}, Curitiba/PR</dd></div><div><dt>Atuação</dt><dd>Locação, assistência técnica, peças e baterias</dd></div><div><dt>Representações</dt><dd>Newpower (Fulguris) e Powerbras</dd></div></dl></aside></section>
<section class="repres" id="representacoes"><header class="tit"><p class="k">Representações</p><h2>Marcas que a Triplex representa</h2></header><div class="repres-grade">${repres.map(r => `<article class="sobe"><h3>${r.t}</h3>${r.p.map(p => `<p>${p}</p>`).join('')}</article>`).join('')}</div></section></div>
` + cta(v) + rodape(v);
  pag.locacao = head(v, 'locacao', 'Locação de empilhadeiras', 'Locação de empilhadeiras elétricas, a GLP e transpaleteiras em Curitiba e região.') + topo(v, 'locacao') + cab('Locação', 'Locação de empilhadeiras e transpaleteiras', 'operacao') + `
<div class="in"><section class="loc-pag"><header class="tit"><p class="k">Equipamentos</p><h2>Para locação em Curitiba e região</h2><p class="nota">Consulte os equipamentos disponíveis no ato da locação.</p></header>${frotaCards(v)}</section>
<section class="loc-junto"><div><h2>Junto com a locação</h2><p>A Triplex também faz a assistência técnica, fornece peças e baterias tracionárias, com profissionais atuando na sede e nas unidades dos clientes.</p></div><p class="bts"><a class="btn" href="${link(v, 'assistencia')}">Assistência e peças</a><a class="btn btn-linha" href="${link(v, 'produtos')}#baterias">Baterias</a></p></section></div>
` + cta(v) + rodape(v);
  pag.assistencia = head(v, 'assistencia', 'Assistência técnica e peças', 'Assistência técnica corretiva e preventiva, contratos de manutenção e venda de peças multimarcas para empilhadeiras.') + topo(v, 'assistencia') + cab('Assistência técnica e peças', 'Manutenção corretiva, preventiva e peças multimarcas', 'frota') + `
<div class="in"><section class="assist"><div class="assist-grade">${assist.map((a, i) => `<article class="sobe"><span class="num">0${i + 1}</span><h2>${a.t}</h2>${i < 2 ? lista(a.l) : a.l.map(p => `<p>${p}</p>`).join('')}</article>`).join('')}</div></section>
<section class="pecas" id="pecas"><figure>${img('pecas')}</figure><div><p class="k">Venda de peças multimarcas</p><h2>Peças das principais marcas de empilhadeiras e transpaleteiras</h2>${lista(pecas)}<p class="bts"><a class="btn" href="${wa('Olá! Preciso de uma peça para empilhadeira/transpaleteira.')}" ${ext}>${icWa()}Pedir peça</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}Ligar</a></p></div></section></div>
` + cta(v) + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos', 'Baterias tracionárias Fulguris, baterias VRLA, carregadores, carrinhos manuais, transpaleteiras manuais e linha Powerbras.') + topo(v, 'produtos') + cab('Produtos', 'Baterias, carregadores e equipamentos de movimentação', 'operacao') + `
<div class="in"><nav class="ancoras" aria-label="Linhas de produto"><a href="#baterias">Baterias tracionárias</a><a href="#vrla">Baterias VRLA</a><a href="#carregadores">Carregadores</a><a href="#carrinhos">Carrinhos manuais</a><a href="#transpaleteiras">Transpaleteiras manuais</a><a href="#powerbras">Linha Powerbras</a></nav>
<section class="prod" id="baterias"><div class="prod-cab"><figure>${img('bateria-fulguris')}</figure><div><p class="k">Baterias tracionárias</p><h2>Baterias tubulares Fulguris TSF</h2><p>Desenvolvidas para equipamentos de tração elétrica, como empilhadeiras, paleteiras e carros elétricos nacionais e internacionais, com melhor performance ampère-hora e maior durabilidade e rendimento.</p></div></div><dl class="specs">${fulguris.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl></section>
<section class="prod" id="vrla"><p class="k">Baterias estacionárias</p><h2>Baterias VRLA</h2><p>Seladas, do tipo reguladas por válvula (VRLA).</p><div class="vrla">${vrla.map(x => `<article><h3>${x[0]}</h3><b>${x[1]}</b><p>${x[2]}</p></article>`).join('')}</div></section>
<section class="prod" id="carregadores"><p class="k">Carregadores e retificadores</p><h2>Para baterias tracionárias e subestações</h2>${lista(carregadores)}</section>
<section class="prod" id="carrinhos"><p class="k">Carrinhos manuais</p><h2>Transferência de bateria, pórticos e estrados</h2><ul class="galeria">${carrinhos.map(c => `<li><a href="/assets/img/${c[0]}.webp" data-foto="${esc(c[1])}">${img(c[0], c[1])}</a><span>${c[1].replace(' para bateria tracionária', '').replace(' de bateria tracionária', '')}</span></li>`).join('')}</ul></section>
<section class="prod" id="transpaleteiras"><p class="k">Transpaleteiras manuais</p><h2>Movimentação horizontal em espaços curtos</h2><p>A transpaleteira manual é o equipamento ideal para movimentar cargas a distâncias curtas ou em áreas com restrição severa de espaço. Tem excelente capacidade de carga e é extremamente fácil de operar.</p><dl class="specs">${transpaleteira.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl></section>
<section class="prod" id="powerbras"><p class="k">Linha Powerbras</p><h2>Produtos de energia Powerbras</h2>${lista(powerbras)}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Triplex Empilhadeiras: ${E.fone}, WhatsApp ${E.fwa}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Fale conosco', 'Atendimento para Curitiba e região', 'frota') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><div class="in cab-a-foto">${img(foto, '', ' loading="eager"')}</div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-txt"><p class="k">Desde 1996 · Curitiba e região</p><h1>Locação de empilhadeiras <em>em Curitiba.</em></h1><div class="hero-a-lado"><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'locacao')}">Ver equipamentos</a></p></div></div>
<div class="in hero-a-foto">${img('frota', alt.frota, ' loading="eager" fetchpriority="high" width="1110" height="300"')}<ul class="selos"><li><b>1996</b><span>fundação</span></li><li><b>Elétricas e GLP</b><span>para locação</span></li><li><b>Crown · Ameise</b><span>peças com garantia</span></li></ul></div></section>
<section class="in serv-a"><header class="tit tit-linha"><div><p class="k">Produtos e serviços</p><h2>Da locação à reposição de peças</h2></div><p class="tit-lado">${intro}</p></header><ul class="serv">${servicos.map(x => `<li class="sobe"><a href="${servHref(v, x)}"><figure>${img(x.f)}</figure><div><h3>${x.t}</h3><p>${x.d}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></div></a></li>`).join('')}</ul></section>
<section class="loc-a"><div class="in"><header class="tit tit-linha"><div><p class="k">Locação</p><h2>Equipamentos para locação</h2></div><a class="link-seta" href="${link(v, 'locacao')}">Página de locação ${ic('seta')}</a></header>${frotaCards(v)}</div></section>
<section class="in pecas-a"><figure>${img('operacao', alt.operacao, ' width="1110" height="300"')}</figure><div class="pecas-a-txt"><div><p class="k">Assistência técnica</p><h2>Corretiva, preventiva e por contrato</h2><p>Profissionais qualificados atuando na sede da Triplex e nas unidades dos clientes, com peças originais e multimarcas.</p><a class="link-seta" href="${link(v, 'assistencia')}">Assistência e peças ${ic('seta')}</a></div><div><p class="k">Peças multimarcas</p>${lista(pecas.slice(0, 5))}</div></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('operacao', alt.operacao, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Triplex · desde 1996</p><h1>Empilhadeira parada <span>é carga parada.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Falar com a Triplex</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
<div class="listras" aria-hidden="true"></div>
<section class="in loc-b"><header class="tit tit-linha"><div><p class="k">Locação · Curitiba e região</p><h2>Frota para locação</h2></div><a class="link-seta" href="${link(v, 'locacao')}">Locação ${ic('seta')}</a></header>${frotaCards(v)}</section>
<section class="serv-b"><div class="in"><header class="tit"><p class="k">Produtos e serviços</p><h2>Tudo para a movimentação de materiais</h2></header><ol class="serv-lista">${servicos.map((x, i) => `<li class="sobe"><a href="${servHref(v, x)}"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${x.t}</h3><p>${x.d}</p>${ic('seta')}</a></li>`).join('')}</ol></div></section>
<section class="in quem-b"><div><p class="k">Empresa</p><h2>Um dos principais fornecedores de equipamentos de movimentação do Paraná</h2><p>${quem[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Triplex ${ic('seta')}</a></div><figure>${img('frota', alt.frota, ' width="1110" height="300"')}<figcaption>Equipamentos elétricos na sede da Triplex, no Hauer.</figcaption></figure></section>
<section class="in bat-b"><figure>${img('bateria-fulguris')}</figure><div><p class="k">Baterias tracionárias</p><h2>Fulguris TSF e VRLA</h2><p>Baterias tubulares para empilhadeiras e paleteiras, nas dimensões originais ou especiais, e baterias estacionárias VRLA de 2 V e 12 V.</p><a class="link-seta" href="${link(v, 'produtos')}#baterias">Ver baterias ${ic('seta')}</a></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Triplex Empilhadeiras', artigo: 'da', url: E.url, lang: 'pt', cor: '#f33000', fundo: '#141414', claro: '#f4f3f1',
  fonteTitulo: '"Barlow Semi Condensed",system-ui,sans-serif', fonteTexto: 'Barlow,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara e organizada, com o preto e o vermelho-laranja do logo e a frota real da Triplex logo na abertura.', pontos: ['Equipamentos para locação com pedido direto no WhatsApp', 'Serviços, peças e baterias em uma vitrine', 'Desde 1996 em Curitiba'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura e direta, com cara de galpão: listras de sinalização, títulos condensados e a frota em destaque.', pontos: ['"Empilhadeira parada é carga parada."', 'Lista numerada de serviços', 'Baterias Fulguris e VRLA em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
