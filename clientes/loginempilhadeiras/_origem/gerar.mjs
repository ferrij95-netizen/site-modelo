// Login Empilhadeiras Ltda. (Tatuapé, São Paulo/SP), fabricante da linha ELOG de acessórios elétricos e eletrônicos para empilhadeiras.
// node clientes/loginempilhadeiras/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs loginempilhadeiras http://loginempilhadeiras.com.br/)
// Textos, produtos e contatos: do site atual (loginempilhadeiras.com.br, WebAcappella). Fotos: as ampliações 612x600 dos próprios produtos.
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Login Empilhadeiras', url: 'https://loginempilhadeiras.overtus.com.br/', antigo: 'http://loginempilhadeiras.com.br/',
  razao: 'Login Empilhadeiras Ltda.',
  wa: '5511949231681', fwa: '(11) 94923-1681', fone: '(11) 2295-3561', fone2: '(11) 2092-3643', email: 'sac@loginempilhadeiras.com.br',
  rua: 'Rua Luís Ferreira, 95', bairro: 'Tatuapé', cidade: 'São Paulo - SP', cep: '03072-020',
  curto: 'Acessórios elétricos e eletrônicos para empilhadeiras: sinalização, limitadores de velocidade, chave senha, indicadores de bateria e peças de tração. Linha ELOG, fabricada no Brasil.',
};
const lema1 = 'Tecnologia em produtos e acessórios para empilhadeiras';
const lema2 = 'Produtos com foco na segurança operacional e na redução de custos.';
const quem = [
  'A Login Empilhadeiras é referência no segmento de logística graças ao seu comprometimento com a transparência com seu cliente.',
  'Durante o processo de desenvolvimento e de criação de nossos produtos, nosso maior interesse é estabelecer e manter um padrão de qualidade, baseado nas descobertas tecnológicas do ramo.',
  'Sempre em busca pelo melhor, pretendemos nos aperfeiçoar constantemente e priorizar a satisfação do cliente, com um atendimento personalizado e diferenciado, visando solucionar com êxito os desafios propostos pelas necessidades de nossos clientes. Contamos com uma equipe capacitada e eficaz, com mais de 20 anos de experiência no ramo.',
  'A larga experiência dos funcionários da Login resulta em qualidade. Além da parceria com grandes distribuidores de peças e fabricantes, nacionais e internacionais, temos em estoque peças e acessórios para pronta entrega.',
];
const elog = 'Os produtos da marca ELOG apresentam a solução para a sua necessidade. Fabricados 100% em território nacional, eles aliam tecnologia com a qualidade padrão já conhecida da Login Empilhadeiras.';
const veic = 'Empilhadeiras, rebocadores, AGV, tratores, off-roads, caminhões, plataformas elevatórias e lavadoras de piso, além de aplicações industriais.';

const cats = [
  { s: 'seguranca', t: 'Sinalização e segurança', k: 'Ver e ser visto', d: 'Blue Spot, Red Zone, sinalizadores, alarme de ré, buzina, faróis e lanternas de LED.', i: 'escudo', cor: 'azul' },
  { s: 'controle', t: 'Controle da operação', k: 'Velocidade, acesso e bateria', d: 'Limitadores de velocidade, chave senha eletrônica, indicadores de descarga e horímetro.', i: 'medidor', cor: 'laranja' },
  { s: 'eletrica', t: 'Elétrica e tração', k: 'Peças para veículos elétricos', d: 'Controlador de tração, aceleradores, potenciômetro, conectores, contatores e kits de contatos.', i: 'engrenagem', cor: 'verde' },
];
const P = [
  // seguranca
  { id: 'blue-spot', cat: 'seguranca', t: 'Blue Spot', fotos: ['blue-spot'], chips: ['9 a 64 VDC', 'LED'], resumo: 'Feixe de luz azul no piso que anuncia a aproximação da empilhadeira.', p: [
    'O dispositivo de alarme foi especialmente desenvolvido para armazéns e áreas de grande circulação, já que emite uma forte marcação luminosa no piso, prevenindo possíveis colisões e atropelamentos em cruzamentos e áreas de pouca visibilidade.',
    'O produto, que costuma apresentar alta aceitação entre os usuários quando comparado ao aviso sonoro, atua também em ambientes externos e pisos escuros. O Blue Spot gera uma rápida percepção da aproximação da empilhadeira por meio de um feixe de luz azul.',
    'A tecnologia LED possui alta eficiência e baixo consumo de energia, além de ser resistente a vibrações e possuir elevado tempo de vida útil. Indicado para empilhadeiras, rebocadores, AGV, plataformas elevatórias e lavadoras de piso.'] },
  { id: 'red-zone', cat: 'seguranca', t: 'Red Zone', mod: 'RZ-17', fotos: ['red-zone'], chips: ['9 a 80 VDC', 'LED'], resumo: 'Faixa intensa de luz vermelha que marca a distância segura da empilhadeira.', p: [
    'Dispositivo de alarme e de segurança desenvolvido para armazéns e áreas de grande circulação de pessoas e veículos. Emite forte marcação luminosa na cor vermelha, com o objetivo de advertir e exibir a todos os colaboradores a área de distância segura a se manter das empilhadeiras.',
    'Com esta faixa intensa de luz vermelha, o Red Zone sinaliza de forma mais clara o possível circuito das empilhadeiras. O RZ-17 previne, desta forma, possíveis colisões e acidentes.',
    'A tecnologia LED possui alta eficiência e baixo consumo de energia, além de ser resistente a vibrações e possuir elevado tempo de vida útil.'] },
  { id: 'sinalizadores', cat: 'seguranca', t: 'Sinalizadores visuais', fotos: ['sinalizador-padrao', 'sinalizador-compacto'], legendas: ['Modelo padrão', 'Modelo compacto'], chips: ['10 a 100 VDC', 'Piscante e rotativo'], resumo: 'Dois modelos, compacto e padrão, com LEDs de alta potência.', p: [
    'Os sinalizadores visuais atendem de 10 a 100 VDC e estão disponíveis em dois modelos: compacto e padrão. Por possuírem LEDs de alta potência, são eficientes e têm baixo consumo de energia.',
    'Apropriados para operações em locais agressivos, inclusive em câmara fria. Possuem lentes de alto impacto e proteção contra inversão de polaridade. Duas funções em um único equipamento: piscante e rotativo.'], l: [] },
  { id: 'grade', cat: 'seguranca', t: 'Grade de proteção para sinalizadores', fotos: ['grade-de-protecao'], chips: ['Todos os modelos'], resumo: 'Protege o sinalizador contra impactos.', p: ['Grade de proteção para sinalizadores, disponível para todos os modelos.'] },
  { id: 'alarme', cat: 'seguranca', t: 'Alarme sonoro de ré', fotos: ['alarme-de-re'], chips: ['10 a 110 V', '2 intensidades'], resumo: 'Sirene multitensão com 2 níveis de intensidade sonora.', p: [
    'Sirene multitensão de 10 a 110 volts, com 2 níveis de intensidades sonoras. Indicado para a sinalização sonora de operações pesadas junto a pedestres ou a veículos em movimento.'] },
  { id: 'buzina', cat: 'seguranca', t: 'Buzina', fotos: ['buzina'], chips: ['12, 24, 36 e 48 V'], resumo: 'Buzinas eletromagnéticas de percussão.', p: ['Buzinas eletromagnéticas de percussão, que atendem 12 V, 24 V, 36 V e 48 V.'] },
  { id: 'farol', cat: 'seguranca', t: 'Farol de LED', mod: 'FL-22', fotos: ['farol-de-led'], chips: ['10 a 60 VDC', '> 50.000 h de LED'], resumo: 'Alta luminosidade com baixo consumo, para operações em lugares agressivos.', p: [
    'Farol de LED com alta luminosidade e baixo consumo. Ideal em operações nas quais a boa luminosidade é fator essencial. Apropriado para operações em lugares mais agressivos.'], l: ['Multitensão de 10 a 60 VDC', 'Longa vida útil do LED (mais de 50.000 horas)'] },
  { id: 'lanterna', cat: 'seguranca', t: 'Lanterna de LED', fotos: ['lanterna-tr16', 'lanterna-tr14'], legendas: ['TR-16', 'TR-14'], chips: ['12, 24, 36 e 48 V', 'Câmara fria'], resumo: 'Dois modelos, com lentes de alto impacto.', p: [
    'Disponível em 2 modelos. Atende 12 volts, 24 volts, 36 volts e 48 volts, com LEDs eficientes e baixo consumo de energia.',
    'Apropriadas para operações em locais agressivos, inclusive em câmara fria. Possuem lentes de alto impacto e proteção contra inversão de polaridade.'] },
  // controle
  { id: 'vmax100', cat: 'controle', t: 'Limitador de velocidade', mod: 'VMAX-100', fotos: ['limitador-vmax100'], chips: ['Velocímetro digital', 'Até 20% menos combustível'], resumo: 'Programa a velocidade máxima de operação do veículo.', p: [
    'O VMAX-100 é um instrumento completo para controle da velocidade de operação em veículos industriais. Ideal para locais em que a velocidade é fator de risco, já que permite a programação da velocidade máxima.',
    'Possui velocímetro digital e gera segurança aos operadores, pois obtém o controle efetivo da velocidade. Pode ser complementado com sinal sonoro ou luminoso, o que gera maior eficácia no controle de operação dos veículos.',
    'Além disso, promove a economia de até 20% de consumo de GLP, gasolina ou diesel, e a diminuição significativa do número de acidentes pelo excesso de velocidade. Indicado para empilhadeiras (a combustão, GLP e diesel, e elétricas), rebocadores, tratores e plataformas elevatórias.'] },
  { id: 'vmax200', cat: 'controle', t: 'Limitador de velocidade e anti-reversão', mod: 'VMAX-200', fotos: ['limitador-vmax200', 'coletor-de-dados'], legendas: ['VMAX-200', 'Coletor de dados infravermelho'], chips: ['Anti-reversão', 'Relatório USB / Excel'], resumo: 'Controla velocidade e reversão, com coletor de dados e credenciamento de operadores.', p: [
    'O VMAX-200 é um instrumento completo para controle da velocidade de operação e de reversão em veículos industriais. Com o bloqueador de reversão de transmissão, o operador somente poderá reverter o sentido da empilhadeira quando a velocidade estiver dentro do padrão permitido pela direção da empresa.',
    'Possui coletor de dados infravermelho com conexão USB, para visualizar o relatório em qualquer computador, com opção de exportar os dados para o Excel. Permite também o credenciamento de operadores por controle infravermelho, impedindo a utilização por pessoas não autorizadas, e dá aviso de manutenção preventiva.',
    'Apresenta retorno imediato do investimento, pela redução expressiva no custo de manutenção (pneus, transmissão e câmbio), economia de até 20% de GLP, gasolina ou diesel e diminuição significativa de acidentes por excesso de velocidade.'],
    lt: 'Dados do relatório', l: ['Número do veículo', 'Horímetro atual', 'Horas para a manutenção preventiva', 'Data e hora em que o veículo foi ligado', 'Operador que utilizou o veículo', 'Número de infrações do veículo', 'Tempo em que o veículo ficou parado', 'Data e hora em que o veículo foi desligado'] },
  { id: 'chave-senha', cat: 'controle', t: 'Chave senha eletrônica', mod: 'CS-11', fotos: ['chave-senha'], chips: ['Até 99 operadores', 'Touch screen'], resumo: 'Só opera quem tem senha: até 99 operadores credenciados.', p: [
    'A Chave-Senha CS-11 é o equipamento ideal para fixação homem/máquina. Permite o credenciamento de até 99 operadores, com senhas de 4 dígitos cada.',
    'Possui display touch screen com visualização do histórico de uso do equipamento (últimos operadores e seus tempos de uso). Impede a utilização de veículos, máquinas e equipamentos de linha industrial por pessoas não autorizadas.'] },
  { id: 'indicadores', cat: 'controle', t: 'Indicadores de descarga de bateria', fotos: ['indicador-bargraf', 'indicador-horimetro-lcd', 'indicador-horimetro', 'indicador-descarga'], legendas: ['Bargraf, 10 LEDs', 'LCD com horímetro', 'Com horímetro', 'Indicador de descarga'], chips: ['12 a 80 V', 'Corte do hidráulico em 20%'], resumo: 'Controlam a descarga da bateria tracionária e cortam o hidráulico em 20% de carga.', p: [
    'Instrumento multitensão de 12 a 80 volts que controla a descarga de bateria tracionária, com corte do hidráulico ao se atingir 20% de carga. Possui horímetro digital e chave Dip-Switch para ajuste da curva de descarga. Pode ser utilizado em equipamento com carregador a bordo.',
    'Os indicadores com horímetro são utilizados em veículos elétricos que precisam do controle de descarga de bateria e do acompanhamento das horas trabalhadas.'],
    lt: 'Disponíveis em 2 modelos', l: ['Bargraf: display tricolor de 10 LEDs', 'LCD: display para dupla visualização, analógica (rápida) e digital (precisa)'] },
  { id: 'horimetro', cat: 'controle', t: 'Horímetro digital', fotos: ['horimetro-digital'], chips: ['12 a 80 V', 'Até 99.999,9 h'], resumo: 'Conta as horas trabalhadas, sem reset.', p: [
    'Instrumento multitensão de 12 a 80 volts que controla a quantidade de horas trabalhadas. Possui display digital em LCD de fácil leitura até 99.999,9 horas, com indicação de contagem por sinalização no display.',
    'Contagem acumulativa, não resetável.'] },
  // eletrica
  { id: 'controlador', cat: 'eletrica', t: 'Controlador de tração', mod: 'CT-11', fotos: ['controlador-de-tracao', 'programador-controlador'], legendas: ['Controlador CT-11', 'Programador'], chips: ['Motor campo-série CC', 'Rampas programáveis'], resumo: 'Controlador campo-série para motores de corrente contínua.', p: [
    'O controlador de campo-série CT-11 foi desenvolvido para motores de corrente contínua. Simples e eficiente, possui tecnologia de última geração e um excelente custo-benefício.',
    'Permite o ajuste das rampas de aceleração e reversão, além da velocidade tartaruga, por meio de programação. Possui proteção contra bateria baixa e alta temperatura.',
    'Indicado para empilhadeiras, paleteiras, rebocadores, tratores, AGV, carrinhos de golfe e máquinas de limpeza. Pode ser utilizado em qualquer equipamento que possua motor campo-série de corrente contínua.'] },
  { id: 'aceleradores', cat: 'eletrica', t: 'Aceleradores', fotos: ['acelerador-potenciometrico', 'acelerador-resistivo'], legendas: ['Potenciométrico', 'Resistivo'], chips: ['3 modelos'], resumo: 'Potenciométrico, resistivo e indutivo.', p: ['Três modelos de aceleradores:'], l: ['Potenciométrico (Pot-Box 0-5 kΩ, 5 kΩ-0)', 'Resistivo', 'Indutivo (regulador de potência)'] },
  { id: 'potenciometro', cat: 'eletrica', t: 'Potenciômetro', fotos: ['potenciometro'], chips: ['Honeywell Clarostat'], resumo: 'Haste curta, original Honeywell Clarostat.', p: ['Potenciômetro de haste curta, original Honeywell Clarostat.'] },
  { id: 'conectores', cat: 'eletrica', t: 'Conectores de bateria', fotos: ['conector-anderson', 'conector-rema'], legendas: ['Anderson Power', 'REMA'], chips: ['Anderson e REMA'], resumo: 'Anderson Power e REMA, de 50 A a 350 A.', p: ['Dois modelos de conectores de bateria, além de alça para conectores:'], l: ['Anderson Power: 50 A, 175 A e 350 A', 'REMA: 80 A, 160 A e 320 A', 'Alça para conectores'] },
  { id: 'contatores', cat: 'eletrica', t: 'Contatores', fotos: ['contatores'], chips: ['Várias tensões'], resumo: 'Para veículos elétricos de diversos fabricantes.', p: ['Contatores de várias tensões e capacidades para veículos elétricos de diversos fabricantes.'] },
  { id: 'kits', cat: 'eletrica', t: 'Kits de contatos', fotos: ['kits-de-contatos'], chips: ['Reparo de contatores'], resumo: 'Para reparo de contatores de veículos elétricos.', p: ['Kit de contatos para reparo de contatores de veículos elétricos de diversos fabricantes.'] },
];
const destaque = ['blue-spot', 'red-zone', 'vmax100', 'chave-senha', 'sinalizadores', 'indicadores'];
const porId = Object.fromEntries(P.map(x => [x.id, x]));
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, ...cats.map(c => ({ slug: c.s, nome: c.t })), { slug: 'contato', nome: 'Contato' }];
const navTopo = [{ slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, ...cats.map(c => ({ slug: c.s, nome: c.t.split(' ')[0] === 'Sinalização' ? 'Segurança' : c.t.split(' ')[0] === 'Controle' ? 'Controle' : 'Elétrica' })), { slug: 'contato', nome: 'Contato' }];

export const nomesVersao = { a: 'Catálogo', b: 'Painel' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&family=Sofia+Sans+Condensed:ital,wght@0,600;0,800;1,800&family=Sofia+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap';
const img = (n, a = '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" width="560" height="560" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Login Empilhadeiras e gostaria de um orçamento.') => waHref(E.wa, m);
const waP = x => wa(`Olá! Gostaria de um orçamento de: ${x.t}${x.mod ? ' ' + x.mod : ''}.`);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#b3171b', b: '#121417' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Acessórios para empilhadeiras ELOG` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome de contato<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>DDD e telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Assunto<select name="assunto"><option>Vendas</option><option>Financeiro</option><option>Comercial</option><option>Outros assuntos</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required placeholder="Produto, quantidade, modelo da empilhadeira, tensão da bateria..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fwa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone)}">${E.fone}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Login Empilhadeiras" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Luís Ferreira, 95, Tatuapé, São Paulo SP, 03072-020')}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.bairro}, ${E.cidade}</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Login Empilhadeiras" width="150" height="80"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, navTopo, s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca"><div class="rod-logos"><img src="/assets/logo-claro.webp" alt="Login Empilhadeiras" width="150" height="80" loading="lazy"><img src="/assets/elog-claro.webp" alt="ELOG" width="64" height="51" loading="lazy"></div><p>${E.razao} Acessórios e peças para empilhadeiras. Todos os produtos com um ano de garantia.</p></div>
    <div><h3>Produtos</h3><ul>${cats.map(c => `<li><a href="${link(v, c.s)}">${c.t}</a></li>`).join('')}<li><a href="${link(v, 'produtos')}">Todos os produtos</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fwa}</a></li>
      <li>${ic('tel')}<span><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Login Empilhadeiras. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const lista = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const chips = x => `<ul class="chips">${x.chips.map(c => `<li>${c}</li>`).join('')}</ul>`;
const nomeP = x => `${x.t}${x.mod ? ` <small>${x.mod}</small>` : ''}`;
const prodHref = (v, x) => `${link(v, x.cat)}#${x.id}`;
const card = (v, x) => `<li class="card sobe"><a href="${prodHref(v, x)}"><figure>${img(x.fotos[0], x.t + (x.mod ? ' ' + x.mod : ''))}</figure><div><h3>${nomeP(x)}</h3><p>${x.resumo}</p>${chips(x)}</div></a></li>`;
const cards = (v, ids) => `<ul class="cards">${ids.map(id => card(v, porId[id])).join('')}</ul>`;
const ficha = (v, x) => `<article class="ficha-prod" id="${x.id}">
  <div class="fp-fotos${x.fotos.length > 1 ? ' fp-varias' : ''}">${x.fotos.map((f, i) => `<a href="/assets/img/${f}.webp" data-foto="${esc(x.t + (x.legendas ? ': ' + x.legendas[i] : ''))}"><figure>${img(f, x.t + (x.legendas ? ', ' + x.legendas[i] : ''))}${x.legendas ? `<figcaption>${x.legendas[i]}</figcaption>` : ''}</figure></a>`).join('')}</div>
  <div class="fp-txt"><h2>${nomeP(x)}</h2>${chips(x)}${x.p.map(p => `<p>${p}</p>`).join('')}${x.l && x.l.length ? `${x.lt ? `<h3>${x.lt}</h3>` : ''}${lista(x.l)}` : ''}${['seguranca'].includes(x.cat) && x.p.join(' ').length < 400 && !['grade', 'buzina'].includes(x.id) ? `<p class="veic"><b>Aplicações:</b> ${veic}</p>` : ''}
  <p class="bts"><a class="btn" href="${waP(x)}" ${ext}>${icWa()}Pedir orçamento</a></p></div>
</article>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Precisa de um acessório ou peça para a sua empilhadeira?</h2><p>Fale com a Login pelo WhatsApp ou pelos telefones ${E.fone} e ${E.fone2}. Temos peças e acessórios em estoque para pronta entrega.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" ${ext}>${icWa()}${E.fwa}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p></div></section>`;
const elogBloco = v => `<section class="elog"><div class="in elog-in"><img src="/assets/${v === 'b' ? 'elog-claro' : 'elog'}.webp" alt="ELOG" width="110" height="87" loading="lazy"><div><p class="k">Marca própria</p><h2>Linha ELOG, fabricada 100% no Brasil</h2><p>${elog}</p></div><ul class="elog-nums"><li><b>1 ano</b><span>de garantia em todos os produtos</span></li><li><b>20+ anos</b><span>de experiência da equipe</span></li><li><b>Pronta entrega</b><span>peças e acessórios em estoque</span></li></ul></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A empresa', quem[0]) + topo(v, 'empresa') + cab('A empresa', 'Transparência com o cliente e qualidade no que fabricamos', ['chave-senha', 'blue-spot']) + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><aside class="ficha"><dl><div><dt>Razão social</dt><dd>${E.razao}</dd></div><div><dt>Endereço</dt><dd>${E.rua}, ${E.bairro}, ${E.cidade}</dd></div><div><dt>Marca própria</dt><dd>ELOG, fabricada no Brasil</dd></div><div><dt>Garantia</dt><dd>Um ano em todos os produtos</dd></div></dl></aside></section></div>
${elogBloco(v)}` + cta(v) + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos', 'Catálogo de acessórios e peças para empilhadeiras: sinalização, controle da operação, elétrica e tração.') + topo(v, 'produtos') + cab('Produtos', 'Acessórios e peças para empilhadeiras', ['sinalizador-padrao', 'limitador-vmax100']) + `
<div class="in">${cats.map(c => `<section class="cat-bloco cat-${c.cor}" id="${c.s}"><header class="tit tit-linha"><div><p class="k">${c.k}</p><h2>${c.t}</h2></div><a class="link-seta" href="${link(v, c.s)}">Ver detalhes ${ic('seta')}</a></header>${cards(v, P.filter(x => x.cat === c.s).map(x => x.id))}</section>`).join('')}</div>
` + cta(v) + rodape(v);
  for (const c of cats) {
    const itens = P.filter(x => x.cat === c.s);
    pag[c.s] = head(v, c.s, c.t, `${c.t}: ${c.d}`) + topo(v, c.s) + cab(c.k, c.t, itens.slice(0, 2).map(x => x.fotos[0]), c.cor) + `
<div class="in"><nav class="ancoras" aria-label="Produtos desta linha">${itens.map(x => `<a href="#${x.id}">${x.t}${x.mod ? ' ' + x.mod : ''}</a>`).join('')}</nav>
<div class="fichas">${itens.map(x => ficha(v, x)).join('')}</div>
<nav class="outras" aria-label="Outras linhas">${cats.filter(o => o.s !== c.s).map(o => `<a class="outra cat-${o.cor}" href="${link(v, o.s)}"><span class="k">Outra linha</span><b>${o.t}</b>${ic('seta')}</a>`).join('')}</nav></div>
` + cta(v) + rodape(v);
  }
  pag.contato = head(v, 'contato', 'Fale conosco', `Login Empilhadeiras: ${E.fone}, ${E.fone2}, WhatsApp ${E.fwa}. ${E.rua}, ${E.bairro}, ${E.cidade}.`) + topo(v, 'contato') + cab('Fale conosco', 'Vendas, financeiro e comercial', ['farol-de-led', 'buzina']) + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Envie sua mensagem</h2><p>Preencha e a mensagem abre pronta no WhatsApp da Login.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, fotos, cor = '') => `<section class="cab-a ${cor ? 'cat-' + cor : ''}"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><div class="cab-a-fotos" aria-hidden="true">${fotos.map(f => img(f, '', ' loading="eager"')).join('')}</div></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Login Empilhadeiras · Tatuapé, São Paulo</p><h1>${lema1.replace('para empilhadeiras', '<em>para empilhadeiras</em>')}</h1><p class="lead">${lema2}</p><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver o catálogo</a></p></div>
<div class="hero-a-vitrine"><figure class="v1">${img('blue-spot', 'Blue Spot', ' loading="eager" fetchpriority="high"')}<figcaption>Blue Spot</figcaption></figure><figure class="v2">${img('limitador-vmax100', 'Limitador de velocidade VMAX-100', ' loading="eager"')}<figcaption>VMAX-100</figcaption></figure><figure class="v3">${img('sinalizador-padrao', 'Sinalizador visual padrão', ' loading="eager"')}<figcaption>Sinalizador</figcaption></figure><figure class="v4">${img('chave-senha', 'Chave senha eletrônica CS-11', ' loading="eager"')}<figcaption>CS-11</figcaption></figure></div></div>
<div class="barras" aria-hidden="true"><span></span><span></span><span></span></div></section>
<section class="in linhas-a"><header class="tit tit-linha"><div><p class="k">Três linhas</p><h2>O que a Login fornece</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></header><ul class="linhas">${cats.map(c => `<li class="sobe cat-${c.cor}"><a href="${link(v, c.s)}">${ic(c.i)}<p class="k">${c.k}</p><h3>${c.t}</h3><p>${c.d}</p><span class="link-seta">Ver a linha ${ic('seta')}</span></a></li>`).join('')}</ul></section>
<section class="destaques-a"><div class="in"><header class="tit"><p class="k">Produtos em destaque</p><h2>Mais pedidos para frota de empilhadeiras</h2></header>${cards(v, destaque)}</div></section>
${elogBloco(v)}` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, fotos, cor = '') => `<section class="cab-b ${cor ? 'cat-' + cor : ''}"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><div class="cab-b-foto" aria-hidden="true">${img(fotos[0], '', ' loading="eager"')}</div></div></section>`;
  const vmax = porId.vmax200;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k"><span class="led"></span>Segurança operacional · redução de custos</p><h1>Empilhadeira mais segura, <span>operação mais barata.</span></h1><p>${lema1}. ${lema2}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Falar com a Login</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div>
<div class="hero-b-luz"><figure class="azul">${img('blue-spot', 'Blue Spot', ' loading="eager" fetchpriority="high"')}<figcaption><b>Blue Spot</b><span>9 a 64 VDC</span></figcaption></figure><figure class="verm">${img('red-zone', 'Red Zone RZ-17', ' loading="eager"')}<figcaption><b>Red Zone RZ-17</b><span>9 a 80 VDC</span></figcaption></figure></div></div></section>
<section class="leitura"><div class="in leitura-in"><div><b>99</b><span>operadores com senha na chave CS-11</span></div><div><b>20%</b><span>de carga: corte do hidráulico no indicador de descarga</span></div><div><b>até 20%</b><span>de economia de combustível com limitador VMAX</span></div><div><b>1 ano</b><span>de garantia em todos os produtos</span></div></div></section>
<section class="in linhas-b"><header class="tit"><p class="k">Catálogo</p><h2>Três linhas de produto</h2></header><ol class="linhas-lista">${cats.map((c, i) => `<li class="sobe cat-${c.cor}"><a href="${link(v, c.s)}"><span class="n">0${i + 1}</span><div><h3>${c.t}</h3><p>${c.d}</p></div><ul class="mini">${P.filter(x => x.cat === c.s).slice(0, 3).map(x => `<li>${img(x.fotos[0], x.t)}</li>`).join('')}</ul>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="vmax-b"><div class="in vmax-b-in"><figure>${img('limitador-vmax200', 'Limitador de velocidade e anti-reversão VMAX-200')}</figure><div><p class="k">Em destaque</p><h2>${vmax.t} <small>VMAX-200</small></h2><p>${vmax.p[0]}</p><h3>${vmax.lt}</h3><ul class="dados">${vmax.l.map(x => `<li>${x}</li>`).join('')}</ul><a class="link-seta" href="${prodHref(v, vmax)}">Ficha completa ${ic('seta')}</a></div></div></section>
<section class="in destaques-b"><header class="tit tit-linha"><div><p class="k">Produtos em destaque</p><h2>Para a frota rodar com controle</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></header>${cards(v, ['chave-senha', 'indicadores', 'sinalizadores', 'farol', 'controlador', 'conectores'])}</section>
${elogBloco(v)}` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Login Empilhadeiras', artigo: 'da', url: E.url, lang: 'pt', cor: '#b3171b', fundo: '#121417', claro: '#f5f4f0',
  fonteTitulo: '"Saira Condensed",system-ui,sans-serif', fonteTexto: '"Public Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, com cara de catálogo técnico: o vermelho do logo, as três cores de linha do site atual e os produtos ELOG em vitrine.', pontos: ['Três linhas de produto com fichas completas', 'Orçamento de cada produto direto no WhatsApp', 'Linha ELOG, fabricada no Brasil, em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Escura, como um painel de instrumentos: o Blue Spot e o Red Zone acesos na abertura e os números dos produtos em destaque.', pontos: ['"Empilhadeira mais segura, operação mais barata."', 'Limitador VMAX-200 e seu relatório em destaque', 'Mesmas fichas e catálogo da versão A'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
