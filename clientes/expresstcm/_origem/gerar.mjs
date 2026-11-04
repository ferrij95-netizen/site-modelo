// Express TCM Transporte de Cargas (Fortaleza/CE, desde 1997). Gera public/{a,b}/ e a página de escolha.
// node clientes/expresstcm/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs expresstcm http://www.expresstcm.com.br/)
// Textos das páginas Empresa, Serviços, Seguro, Clientes, Licenças e Contato do site atual. O logo só existe numa montagem de 242px:
// foi recomposto em SVG (EXPRESS / TCM em itálico azul / arco laranja / Transporte de Cargas).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const WA = '558133381825';
const RASTREIO = 'https://ssw.inf.br/2/rastreamento_dest?pwd=2&';
const E = {
  nome: 'Express TCM', url: 'https://expresstcm.overtus.com.br/', antigo: 'http://www.expresstcm.com.br/',
  fone: '(85) 3211-6900', email: 'atendimento@expresstcm.com.br',
  curto: 'Transporte rodoviário de cargas fracionadas e fechadas de São Paulo para todo o Nordeste, com matriz em Fortaleza e frota rastreada por satélite 24 horas.',
};
const historia = [
  'Em 1997 o Sr. Raimundo Nonato da Cruz, então comerciante, observou a grande necessidade de uma empresa no segmento de transporte rodoviário com o compromisso de atender a demanda crescente da região Nordeste, mantendo o caráter de uma empresa que prima pelo cliente e não se perde na impessoalidade.',
  'Naquele mesmo ano nascia em Fortaleza a Express TCM Ltda., registrada em maio de 1997 na Junta Comercial do Estado do Ceará, com o desafio de tornar seus clientes da indústria e do comércio cada vez mais competitivos.',
  'A Express TCM mantém o foco nos clientes que trazem seus insumos e manufaturados dos parques industriais de São Paulo e Recife. Todos esses anos de trabalho vêm fortalecendo nosso conceito e aprimorando o serviço, para atender com qualidade os clientes antigos e os que estão chegando.',
];
const estados = [['CE', 'Ceará'], ['PE', 'Pernambuco'], ['PB', 'Paraíba'], ['BA', 'Bahia'], ['RN', 'Rio Grande do Norte'], ['SE', 'Sergipe'], ['AL', 'Alagoas'], ['MA', 'Maranhão'], ['PI', 'Piauí']];
const unidades = [
  { id: 'fortaleza', t: 'Matriz', c: 'Fortaleza', uf: 'CE', end: 'Av. Francisco Sá, 6100, Barra do Ceará, Fortaleza/CE', tel: ['(85) 3211-6900', '(85) 99673-9596', '(85) 98439-0693'], mail: ['atendimento@expresstcm.com.br'], q: 'Av. Francisco Sá 6100 Barra do Ceará Fortaleza CE' },
  { id: 'guarulhos', t: 'Filial', c: 'Guarulhos', uf: 'SP', end: 'Rua Roberto Venturole, 777, Cidade Aracília, Guarulhos/SP', tel: ['(11) 2488-5499', '(11) 98407-6150'], mail: ['gerencia.sp@expresstcm.com.br'], q: 'Rua Roberto Venturole 777 Guarulhos SP' },
  { id: 'recife', t: 'Filial', c: 'Recife', uf: 'PE', end: 'Rodovia BR-101 Sul, 1532, Km 81,7, Galpão C, Prazeres, Jaboatão dos Guararapes/PE', tel: ['(81) 3338-5440', '(81) 3338-1825', '(81) 99937-1055', '(81) 99879-2524', '(81) 99979-3453'], wa: true, mail: ['comercial.rec@expresstcm.com.br', 'comercial1.rec@expresstcm.com.br', 'comercial2.rec@expresstcm.com.br'], q: 'BR-101 Sul 1532 Prazeres Jaboatão dos Guararapes PE' },
  { id: 'salvador', t: 'Filial', c: 'Salvador', uf: 'BA', end: 'Rua Antonio dos Santos Gouveia, 284, Porto Seco Pirajá, Salvador/BA', tel: ['(71) 3239-3628', '(71) 3239-4895'], mail: ['comercial.sav@expresstcm.com.br'], q: 'Rua Antonio dos Santos Gouveia 284 Porto Seco Pirajá Salvador BA' },
  { id: 'joao-pessoa', t: 'Filial', c: 'João Pessoa', uf: 'PB', end: 'Rodovia BR-101, Km 88, Galpão 8, Distrito Industrial, João Pessoa/PB', tel: ['(83) 3234-2815', '(83) 98115-8441'], mail: ['comercial.jpa@expresstcm.com.br'], q: 'BR-101 Km 88 Distrito Industrial João Pessoa PB' },
  { id: 'natal', t: 'Filial', c: 'Natal', uf: 'RN', end: 'Rua Câmara Cascudo, 665, Parque de Exposição, Parnamirim/RN', tel: ['(84) 2136-9821'], mail: ['comercial.nat@expresstcm.com.br'], q: 'Rua Câmara Cascudo 665 Parnamirim RN' },
];
const seguranca = ['Rastreamento da frota via satélite (Autotrac)', 'Monitoramento 24 horas, de segunda a segunda', 'Equipe interna de gerenciamento de riscos', 'Análise de grau de risco das rotas', 'Informação em tempo real', 'Controle de ciclos operacionais', 'Dispositivos de segurança', 'Treinamento e formação'];
const clientes = [
  ['Alimentos', ['Cia. Indl. de Alimentos Trading Company']],
  ['Autopeças', ['Truckão Auto Peças', 'Dufort Dist. de Produtos Automotivos', 'IFC Ind. e Com. de Condutores Elétricos']],
  ['Destilados', ['Ypióca Agroindustrial', 'Colonial Ind. de Bebidas']],
  ['Eletroeletrônicos', ['Globex Utilidades (Ponto Frio)']],
  ['Indústria têxtil', ['Maranguape Ind. e Com. Têxtil']],
  ['Insumos farmacêuticos', ['Fresenius Kabi Brasil']],
  ['Usinados', ['Aço Bom Preço Coml.']],
  ['Polietileno', ['Premix Multi Olefinas Comercial']],
  ['Produtos químicos', ['Arinos Química', 'Metalgráfica Cearense']],
  ['Hospitalares e farmacêuticos', ['Ind. Farmacêutica Rioquímica']],
];
const responsaveis = [['Matriz Fortaleza', 'Cíntia Pires de Matos Trajano', 'CRF 4443', '(85) 3211-6900'], ['Filial Pernambuco', 'Maria Letícia Brito', 'CRQ 01401158', '(81) 3338-1825'], ['Filial São Paulo', 'Dulcinéia Lopes da Silva', 'CRF 63195', '(11) 2488-5499']];
const alt = {
  rodovia: 'Carretas de contêiner seguindo pela rodovia', 'caminhao-noite': 'Caminhão baú em rodovia ao anoitecer', 'carga-paletizada': 'Carga paletizada em armazém',
  docas: 'Docas de recebimento de carga', galpao: 'Galpão com portas de carga', 'frota-tcm': 'Caminhão baú com a marca Express TCM', 'empilhadeira-tcm': 'Empilhadeira no armazém da Express TCM', 'cavalo-vermelho': 'Cavalo mecânico vermelho com carreta graneleira',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'servicos', nome: 'Rotas e serviços' }, { slug: 'seguranca', nome: 'Segurança' }, { slug: 'unidades', nome: 'Unidades' }, { slug: 'contato', nome: 'Cotação' }];
export const nomesVersao = { a: 'Rota Nordeste', b: 'Conhecimento' };
const LOGOF = 'Archivo:ital,wdth,wght@1,125,800;1,125,900';
const FONTES = {
  a: `https://fonts.googleapis.com/css2?family=${LOGOF}&family=Archivo:ital,wdth,wght@0,100,600;0,100,700;1,112,800&family=Public+Sans:wght@400;500;600;700&display=swap`,
  b: `https://fonts.googleapis.com/css2?family=${LOGOF}&family=Saira+Condensed:wght@600;700;800&family=Libre+Franklin:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap`,
};
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#1c2b8f', b: '#101a5c' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Express TCM | Transporte de cargas de São Paulo para o Nordeste' : `${titulo} | Express TCM`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

// Logo recomposto: EXPRESS espaçado, TCM em itálico pesado, arco laranja com ponta de seta, "Transporte de Cargas".
function logo(claro = false, w = 176) {
  const az = claro ? '#ffffff' : '#1c2b8f';
  const id = claro ? 'lgc' : 'lg';
  return `<svg class="logo" viewBox="0 0 212 78" width="${w}" height="${Math.round(w * 78 / 212)}" role="img" aria-label="Express TCM Transporte de Cargas">
<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#f6b400"/><stop offset="1" stop-color="#ef6c00"/></linearGradient></defs>
<path d="M30 60 C 8 52, 10 34, 52 24 C 98 13, 168 14, 190 26" fill="none" stroke="url(#${id})" stroke-width="5.5" stroke-linecap="round"/>
<path d="M186 17 L204 29 L184 35 Z" fill="#ef6c00"/>
<text x="106" y="16" text-anchor="middle" font-family="Archivo,sans-serif" font-style="italic" font-weight="800" font-stretch="125%" font-size="11" letter-spacing="6" fill="${az}">EXPRESS</text>
<text x="104" y="58" text-anchor="middle" font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="125%" font-size="44" letter-spacing="-1" fill="${az}">TCM</text>
<text x="106" y="74" text-anchor="middle" font-family="Archivo,sans-serif" font-style="italic" font-weight="800" font-size="9.4" letter-spacing="1.6" fill="${az}">TRANSPORTE DE CARGAS</text>
</svg>`;
}

const formulario = () => `<form class="form" data-wa="Olá! Quero uma cotação de frete pelo site da Express TCM.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Cidade de origem<input name="origem" required placeholder="Ex.: Guarulhos/SP"></label><label>Cidade de destino<input name="destino" required placeholder="Ex.: Fortaleza/CE"></label></div>
  <div class="form-duas"><label>Tipo de carga<select name="tipo"><option>Fracionada</option><option>Fechada (lotação)</option><option>Ainda não sei</option></select></label><label>Peso e volume<input name="volume" placeholder="kg, m³ ou nº de volumes"></label></div>
  <label>Mercadoria e valor da nota<textarea name="mensagem" rows="3" placeholder="O que vai ser transportado, valor aproximado da NF, prazo"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da filial Recife, (81) 3338-1825, com o pedido pronto.</p>
</form>`;
const mapaFrame = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed"></iframe>`;
const waFlutua = `<a class="wa-flutua" href="${waHref(WA, 'Olá! Vim pelo site da Express TCM.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Express TCM, página inicial">${logo(v === 'b', v === 'b' ? 150 : 164)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}<li class="menu-rast"><a href="${RASTREIO}" target="_blank" rel="noopener">Rastrear carga</a></li></ul></nav>
    <a class="btn btn-topo" href="${RASTREIO}" target="_blank" rel="noopener">${ic('caminhao')}Rastrear carga</a>
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
    <div class="rod-marca">${logo(true, 170)}<p>Pontualidade, marca de nossos serviços. Transporte de cargas de São Paulo para todo o Nordeste desde 1997.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${RASTREIO}" target="_blank" rel="noopener">Rastrear carga</a></li></ul></div>
    <div><h3>Matriz Fortaleza</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waHref(WA)}" target="_blank" rel="noopener">(81) 3338-1825 (Recife)</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${unidades[0].end}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Express TCM Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
${waFlutua}
</body>
</html>
`;
}

// Elemento-assinatura: a rota de São Paulo subindo o litoral até Fortaleza, com as seis unidades como paradas.
const paradas = [['Guarulhos', 'SP', 'origem'], ['Salvador', 'BA'], ['Recife', 'PE'], ['João Pessoa', 'PB'], ['Natal', 'RN'], ['Fortaleza', 'CE', 'matriz']];
const rota = () => `<ol class="rota">${paradas.map(p => `<li${p[2] ? ` class="r-${p[2]}"` : ''}><span class="r-pt"></span><b>${p[0]}</b><small>${p[1]}${p[2] ? ` · ${p[2]}` : ''}</small></li>`).join('')}</ol>`;
const estadosLista = () => `<ul class="estados">${estados.map(e => `<li><b>${e[0]}</b><span>${e[1]}</span></li>`).join('')}</ul>`;
const segLista = () => `<ul class="lista-check seg-lista">${seguranca.map(s => `<li>${ic('check')}${s}</li>`).join('')}</ul>`;
const clientesLista = () => `<dl class="clientes">${clientes.map(c => `<div><dt>${c[0]}</dt>${c[1].map(n => `<dd>${n}</dd>`).join('')}</div>`).join('')}</dl>`;
const telLinks = u => u.tel.map(t => `<a href="${telHref(t)}">${t}</a>`).join(' · ');
const unidadeCard = (u, mapa) => `<article class="un sobe" id="${u.id}"><p class="un-tag">${u.t} · ${u.uf}</p><h3>${u.c}</h3><p class="un-l">${ic('pin')}<span>${u.end}</span></p><p class="un-l">${ic('tel')}<span>${telLinks(u)}</span></p>${u.wa ? `<p class="un-l">${icWa()}<a href="${waHref(WA)}" target="_blank" rel="noopener">WhatsApp (81) 3338-1825</a></p>` : ''}<p class="un-l">${ic('mail')}<span>${u.mail.map(m => `<a href="mailto:${m}">${m}</a>`).join('<br>')}</span></p>${mapa ? mapaFrame(u.q) : ''}</article>`;
const unidadesLista = (mapa = false) => `<div class="unidades">${unidades.map(u => unidadeCard(u, mapa)).join('')}</div>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Tem carga saindo de São Paulo para o Nordeste?</h2><p>Mande origem, destino, peso e volume. A filial responde com a cotação.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}">Pedir cotação</a><a class="btn btn-linha" href="${waHref(WA, 'Olá! Quero uma cotação de frete.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div></section>`;
const rastreioCaixa = () => `<div class="rast"><p class="rast-k">${ic('caminhao')}Rastreamento</p><p>Acompanhe sua carga pelo número da nota fiscal, no sistema SSW.</p><a class="btn" href="${RASTREIO}" target="_blank" rel="noopener">Rastrear carga ${ic('ext')}</a></div>`;
const consultor = 'Para atender com qualidade e rapidez, mantemos uma equipe de consultores e um setor de relacionamento com o cliente. O consultor vai à sua empresa e apresenta nossos serviços com clareza; depois você tem um canal aberto com a Express TCM por meio desse mesmo consultor, do setor de relacionamento e do site.';
const servicos = [
  { id: 'fracionada', t: 'Carga fracionada', d: 'Volumes de vários clientes no mesmo caminhão, coletados nos parques industriais de São Paulo e entregues nas capitais e no interior do Nordeste.', i: 'pacote', f: 'galpao' },
  { id: 'fechada', t: 'Carga fechada', d: 'O caminhão inteiro para a sua carga, da origem ao destino, com rastreamento por satélite e monitoramento durante toda a viagem.', i: 'caminhao', f: 'caminhao-noite' },
  { id: 'licenciadas', t: 'Cargas que exigem licença', d: 'Licenças junto ao Ministério do Exército, à Polícia Militar e ao IBAMA, e responsáveis técnicos para produtos farmacêuticos e químicos.', i: 'escudo', f: 'docas' },
];

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', historia[1]) + topo(v, 'empresa') + cab('Empresa', 'Uma transportadora cearense nascida para servir o Nordeste', 'rodovia') + `
<div class="in"><section class="texto-pag"><div><p class="lead">A Express TCM Ltda. atua no transporte de cargas fracionadas e fechadas, com estrutura e proposta próprias.</p>${historia.map(p => `<p>${p}</p>`).join('')}</div><aside class="fatos"><dl><div><dt>Fundação</dt><dd>maio de 1997</dd></div><div><dt>Fundador</dt><dd>Raimundo Nonato da Cruz</dd></div><div><dt>Matriz</dt><dd>Fortaleza/CE</dd></div><div><dt>Filiais</dt><dd>Guarulhos, Recife, Salvador, João Pessoa, Natal</dd></div><div><dt>Seguro</dt><dd>Bradesco Seguros</dd></div></dl></aside></section>
<section class="fotos-reais"><figure>${img('frota-tcm')}<figcaption>Caminhão da frota com a marca TCM</figcaption></figure><figure>${img('empilhadeira-tcm')}<figcaption>Movimentação no armazém</figcaption></figure><figure>${img('cavalo-vermelho')}<figcaption>Cavalo mecânico e carreta</figcaption></figure></section>
<section class="cli-sec"><header class="tit"><p class="k">Clientes</p><h2>Indústria e comércio de vários segmentos</h2><p>Algumas empresas a quem prestamos serviço:</p></header>${clientesLista()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Rotas e serviços', 'Cargas fracionadas e fechadas com origem em São Paulo para CE, PE, PB, BA, RN, SE, AL, MA e PI.') + topo(v, 'servicos') + cab('Rotas e serviços', 'Origem São Paulo, destino: todo o Nordeste', 'caminhao-noite') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">0${i + 1}</span><h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="rota-sec"><header class="tit"><p class="k">Nossas rotas</p><h2>Nove estados atendidos a partir de São Paulo</h2></header>${estadosLista()}</section>
<section class="cons-sec"><div><p class="k">Atendimento</p><h2>Um consultor que vai até a sua empresa</h2><p>${consultor}</p></div>${rastreioCaixa()}</section></div>
` + cta(v) + rodape(v);
  pag.seguranca = head(v, 'seguranca', 'Segurança', 'Frota rastreada por satélite Autotrac, monitoramento 24 horas, seguro Bradesco Seguros e gerenciamento de risco Krona Tech.') + topo(v, 'seguranca') + cab('Segurança e monitoramento', 'Sua carga rastreada por satélite, 24 horas por dia', 'rodovia') + `
<div class="in"><section class="seg-pag"><div><p class="lead">A frota da Express TCM conta com rastreamento via satélite por equipamentos Autotrac, garantindo segurança e agilidade nas viagens.</p><p>Os veículos são monitorados pelo nosso Setor de Tráfego, que conta com um programa exclusivo de gerenciamento de riscos e controle de tráfego operacional.</p>${segLista()}</div>
<div class="seg-lado"><div class="selo-seg"><p class="k">Seguro da carga</p><h3>Bradesco Seguros</h3><p>Gerenciamento de risco Krona Tech.</p></div><div class="selo-seg"><p class="k">Frota</p><h3>Caminhões com até 5 anos de uso</h3><p>Manutenção preventiva, preditiva e corretiva, feita internamente ou em oficinas credenciadas pelos fabricantes.</p></div></div></section>
<section class="lic-sec"><header class="tit"><p class="k">Licenças</p><h2>Habilitada para transportar com segurança</h2><p>Licenças de transporte junto ao Ministério do Exército, Polícia Militar e IBAMA, entre outras. Cópias podem ser pedidas aos responsáveis técnicos, ao setor comercial ou ao seu vendedor.</p></header><ul class="resp">${responsaveis.map(r => `<li><p class="k">${r[0]}</p><b>${r[1]}</b><span>Responsável técnica · ${r[2]}</span><a href="${telHref(r[3])}">${ic('tel')}${r[3]}</a></li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);
  pag.unidades = head(v, 'unidades', 'Unidades', 'Matriz em Fortaleza e filiais em Guarulhos, Recife (Jaboatão), Salvador, João Pessoa e Natal (Parnamirim).') + topo(v, 'unidades') + cab('Unidades', 'Matriz em Fortaleza e cinco filiais na rota', 'rodovia') + `
<div class="in"><section class="rota-wrap">${rota()}</section>
<section class="un-sec">${unidadesLista(true)}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Cotação', `Cotação de frete de São Paulo para o Nordeste. ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Cotação de frete', 'Conte origem, destino e carga', 'docas') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Pedido de cotação</h2>${formulario()}</div><div><ul class="contato-lista"><li>${ic('tel')}<div><strong>Matriz Fortaleza</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(WA)}" target="_blank" rel="noopener">(81) 3338-1825</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('relogio')}<div><strong>Atendimento</strong><span>Em tempo real, em horário comercial.</span></div></li></ul>${rastreioCaixa()}</div></section>
<section class="un-sec"><header class="tit"><p class="k">Fale direto com a filial</p><h2>Telefones e e-mails por unidade</h2></header>${unidadesLista()}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><p class="k">${k}</p><h1>${t}</h1></div><figure class="cab-a-foto">${img(foto, '', ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Fortaleza · desde 1997</p><h1>De São Paulo para todo o <em>Nordeste.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir cotação</a><a class="btn btn-linha" href="${RASTREIO}" target="_blank" rel="noopener">${ic('caminhao')}Rastrear carga</a></p></div>
<figure class="hero-a-foto">${img('rodovia', alt.rodovia, ' loading="eager" fetchpriority="high"')}<figcaption>Pontualidade, marca de nossos serviços.</figcaption></figure></div>
<div class="in hero-a-rota"><p class="k">A rota</p>${rota()}</div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Fracionada ou fechada, com o caminhão rastreado</h2></header><ul class="servs">${servicos.map(s => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="servs-ic">${ic(s.i)}</span><h3>${s.t}</h3><p>${s.d}</p></a></li>`).join('')}</ul></section>
<section class="est-a"><div class="in est-a-in"><div><p class="k">Destinos</p><h2>Nove estados, uma origem</h2><p>Coleta nos parques industriais de São Paulo e entrega em todo o Nordeste, com apoio das filiais em Recife, Salvador, João Pessoa e Natal.</p><a class="link-seta" href="${link(v, 'servicos')}">Rotas e serviços ${ic('seta')}</a></div>${estadosLista()}</div></section>
<section class="in seg-a"><figure>${img('caminhao-noite')}</figure><div><p class="k">Segurança</p><h2>Rastreada por satélite, de segunda a segunda</h2><p>Equipamentos Autotrac em toda a frota, Setor de Tráfego próprio e seguro da carga pela Bradesco Seguros, com gerenciamento de risco Krona Tech.</p>${segLista()}<a class="link-seta" href="${link(v, 'seguranca')}">Segurança e licenças ${ic('seta')}</a></div></section>
<section class="in cli-a"><header class="tit"><p class="k">Quem já confia</p><h2>Indústria e comércio de dez segmentos</h2></header>${clientesLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  const ficha = `<dl class="ficha"><div class="f-l"><dt>Remetente</dt><dd>Parques industriais de São Paulo e Recife</dd></div><div><dt>Origem</dt><dd>Guarulhos/SP</dd></div><div><dt>Destino</dt><dd>${estados.map(e => e[0]).join(' · ')}</dd></div><div><dt>Modalidade</dt><dd>Fracionada / fechada</dd></div><div><dt>Rastreio</dt><dd>Satélite, 24 h</dd></div><div><dt>Seguro</dt><dd>Bradesco Seguros</dd></div><div><dt>Desde</dt><dd>05/1997</dd></div></dl>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Express TCM · Transporte de cargas</p><h1>Pontualidade, marca de nossos serviços.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir cotação</a><a class="btn btn-linha" href="${RASTREIO}" target="_blank" rel="noopener">${ic('caminhao')}Rastrear carga</a></p></div>
<div class="hero-b-doc"><figure>${img('caminhao-noite', alt['caminhao-noite'], ' loading="eager" fetchpriority="high"')}</figure><div class="doc"><p class="doc-k"><span>Ficha da operação</span><span>Nº 1997</span></p>${ficha}</div></div></div></section>
<section class="faixa-b"><div class="in"><ul>${unidades.map(u => `<li><b>${u.c}</b><span>${u.uf}</span></li>`).join('')}</ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">01 · Serviços</p><h2>Duas modalidades, a mesma pontualidade</h2></header><div class="servs-b-grade">${servicos.map((s, i) => `<article class="sobe"><figure>${img(s.f)}</figure><p class="n">0${i + 1}</p><h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
<section class="seg-b"><div class="in seg-b-in"><div><p class="k">02 · Segurança</p><h2>Rastreamento Autotrac e Setor de Tráfego próprio</h2><p>Os veículos são rastreados por satélite e monitorados 24 horas, de segunda a segunda, com análise de risco de cada rota. Frota com até 5 anos de uso e manutenção constante.</p><a class="btn btn-claro" href="${link(v, 'seguranca')}">Ver segurança e licenças</a></div>${segLista()}</div></section>
<section class="in rota-b"><header class="tit"><p class="k">03 · Rota</p><h2>Seis unidades entre São Paulo e Fortaleza</h2></header>${rota()}<p><a class="link-seta" href="${link(v, 'unidades')}">Endereços e telefones ${ic('seta')}</a></p></section>
<section class="in cli-b"><header class="tit"><p class="k">04 · Clientes</p><h2>Quem embarca com a TCM</h2></header>${clientesLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, WA);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Express TCM', artigo: 'da', url: E.url, lang: 'pt', cor: '#1c2b8f', fundo: '#101a5c', claro: '#fbf6ec',
  fonteTitulo: 'Archivo,system-ui,sans-serif', fonteTexto: '"Public Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no azul e laranja do logo, com a rota de São Paulo a Fortaleza desenhada logo na abertura.', pontos: ['Rota com as seis unidades', 'Nove estados atendidos', 'Rastreio e cotação pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Azul-marinho e laranja, com uma "ficha da operação" no estilo de conhecimento de transporte.', pontos: ['"Pontualidade, marca de nossos serviços"', 'Satélite Autotrac e seguro Bradesco', 'Licenças e responsáveis técnicos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
