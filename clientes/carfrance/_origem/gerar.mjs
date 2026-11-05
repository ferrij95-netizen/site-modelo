// Automotive Car France (Esplanada, Belo Horizonte/MG). Gera public/{a,b}/ e a página de escolha.
// node clientes/carfrance/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs carfrance https://carfrance.com.br/)
// Textos, serviços, peças, dicas, telefones e fotos tirados do site atual (© 2016, Aúnica Web). Logo: img/logo.png do site, só a parte do nome (sem os logos das montadoras).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Automotive Car France', url: 'https://carfrance.overtus.com.br/', antigo: 'https://carfrance.com.br/',
  fone: '(31) 3468-7687', cel: '(31) 99958-7755', wa: '5531999587755',
  email: 'contato@carfrance.com.br',
  rua: 'Rua Boninas, 270', bairro: 'Esplanada · Belo Horizonte - MG',
  mapa: 'Rua Boninas, 270, Esplanada, Belo Horizonte - MG',
  curto: 'Oficina especializada em Peugeot e Citroën no bairro Esplanada, em Belo Horizonte, desde 2004: mecânica em geral, injeção eletrônica, suspensão, freios, revisões e peças originais.',
};
const quem = [
  'A Automotive Car France foi inaugurada em 2004 com o propósito de atender às marcas francesas Citroën e Peugeot, oferecendo mão de obra qualificada aos proprietários das marcas.',
  'É uma oficina especializada em revisões completas, freios, suspensão, injeção eletrônica e serviços de mecânica em geral, além da venda de peças.',
  'Nossos profissionais foram treinados nas próprias fábricas, o que garante mais confiabilidade para os clientes.',
  'Ao final de cada serviço, os carros são testados pela oficina antes de serem devolvidos aos proprietários, garantindo a eficiência e a qualidade do trabalho realizado.',
];
const servicos = [
  { id: 'mecanica', t: 'Mecânica em geral', d: ['Todos os tipos de serviços mecânicos em seu Peugeot ou Citroën: motor, câmbio, suspensão, injeção, arrefecimento e freios, de acordo com os parâmetros estabelecidos pelo fabricante.'], f: 'serv-mecanica', i: 'engrenagem' },
  { id: 'injecao', t: 'Injeção eletrônica', d: ['Rastreamento, diagnóstico e configuração de todo o sistema de ignição e injeção eletrônica.', 'Limpeza e teste de bicos injetores por ultrassom.'], f: 'serv-injecao', i: 'painel' },
  { id: 'suspensao', t: 'Suspensão', d: ['Verificamos e solucionamos defeitos na suspensão do seu veículo.', 'Reparos em eixos e troca de amortecedores, braços de suspensão, buchas e rolamentos.'], f: 'serv-suspensao', i: 'volante' },
  { id: 'freios', t: 'Freios', d: ['Troca de pastilhas, lonas, discos e fluido de freio, sempre com garantia de segurança e qualidade das peças utilizadas.'], f: 'serv-freios', i: 'disco' },
  { id: 'revisao', t: 'Revisões periódicas', d: ['Revisões periódicas ou de viagem feitas de acordo com o manual do fabricante, na quilometragem e no tempo de manutenção previstos: troca de óleo, filtros e correias e verificação dos demais itens.', 'Sempre com orçamento prévio autorizado pelo cliente.'], f: 'serv-revisao', i: 'oleo' },
];
const pecas = [
  ['bobina-ignicao', 'Bobina de ignição'], ['bandeja', 'Bandeja'], ['caixa-direcao', 'Caixa de direção mecânica'], ['pastilhas-freio', 'Pastilhas de freio'],
  ['kit-embreagem', 'Kit embreagem'], ['coifa-tulipa', 'Coifa da tulipa'], ['bomba-agua', 'Bomba d’água'], ['bobina-ignicao-2', 'Bobina de ignição'],
  ['amortecedor', 'Amortecedor dianteiro'], ['filtro-oleo', 'Filtro de óleo'], ['terminal-direcao', 'Terminal de direção'], ['correia-alternador', 'Correia do alternador'],
];
const dicas = [
  { id: 'oleo', t: 'Não ultrapasse a vida útil do óleo', p: 'Passada a quilometragem limite ou vencida a vida útil, o óleo perde a capacidade de lubrificar e, com o tempo, provoca um desgaste maior, que diminui a vida do motor.' },
  { id: 'arrefecimento', t: 'Verifique o sistema de arrefecimento', p: 'Confira mangueiras, água e aditivo do radiador a cada 30 mil km rodados. O aditivo na água do radiador é muito importante para garantir a refrigeração do motor.' },
  { id: 'revisoes', t: 'Faça revisões regulares', p: 'Revise o carro com seu mecânico de confiança a cada seis meses ou 10 mil km rodados, para garantir que esteja tudo em pleno funcionamento.' },
  { id: 'pneus', t: 'Cuidado com os pneus', p: 'Evite estacionar sobre manchas de óleo ou de combustível e lavar os pneus com produtos que contenham solventes. Eles ressecam a borracha e facilitam o aparecimento de furos.' },
  { id: 'reserva', t: 'Evite andar com o tanque na reserva', p: 'A bomba de combustível fica dentro do tanque e usa o próprio combustível para se resfriar. Com o tanque quase vazio, ela pode superaquecer.' },
  { id: 'filtros', t: 'Troque os filtros de ar, óleo e combustível', p: 'Gastos, os filtros perdem a capacidade de filtrar. As impurezas passam a atingir o motor e o funcionamento fica comprometido.' },
  { id: 'postos', t: 'Abasteça em postos de confiança', p: 'Use sempre combustível de qualidade. A gasolina aditivada traz detergentes que ajudam a limpar o sistema de injeção, e a Premium é recomendada para motores mais potentes.' },
  { id: 'som', t: 'Tire a frente removível do som', p: 'A frente do aparelho de som consome energia em standby, até 800 mA, o que descarregaria uma bateria comum em algumas horas. Tirar a peça também evita chamar a atenção de ladrões.' },
];
const galeria = [
  ['box-placa', 'Boxes da Car France, com a placa da oficina ao fundo'], ['elevadores', 'Peugeot no elevador e carros em serviço'], ['capo-aberto', 'Peugeot 307 de capô aberto na oficina'],
  ['boxes', 'Carros Peugeot e Citroën nos boxes'], ['elevador-lateral', 'Carros suspensos nos elevadores'], ['galpao', 'Galpão da oficina com os elevadores'],
];
const alt = Object.fromEntries(galeria);
Object.assign(alt, {
  fachada: 'Fachada da Car France na Rua Boninas, com o muro azul e a placa da oficina',
  'serv-mecanica': 'Mecânico apertando o cabeçote do motor', 'serv-injecao': 'Diagnóstico da injeção eletrônica com notebook', 'serv-suspensao': 'Mecânico revisando a suspensão por baixo do carro',
  'serv-freios': 'Disco de freio e amortecedor', 'serv-revisao': 'Mecânico com checklist de revisão ao lado do motor', 'peugeot-308': 'Peugeot 308 na estrada', 'citroen-ds': 'Citroën DS4 de frente',
});
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'pecas', nome: 'Peças' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Muro', b: 'Ficha' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800;900&family=Source+Sans+3:wght@400;600;700&family=Familjen+Grotesk:wght@500;600;700&family=DM+Mono:wght@400;500&family=Public+Sans:wght@400;500;600;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#000f6b', b: '#000f6b' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Automotive Car France | Oficina Peugeot e Citroën em BH' : `${titulo} | Automotive Car France`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const wa = (msg = 'Olá! Vim pelo site da Car France.') => waHref(E.wa, msg);
const pagto = '5% de desconto à vista ou 3x no cartão';

const formulario = () => `<form class="form" data-wa="Olá! Quero um orçamento na Car France.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Peugeot 208 2016"></label><label>Assunto<select name="assunto">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Peças</option><option>Outro assunto</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp com a mensagem pronta para ${E.cel}.</p>
</form>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa da Automotive Car France" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp / celular</strong><a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
</ul>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-faixa"><div class="in"><span>Assistência técnica especializada Peugeot / Citroën</span><span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></span></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Automotive Car France, página inicial"><img src="/assets/logo.webp" alt="Automotive Car France, assistência técnica especializada Peugeot / Citroën" width="1200" height="216"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    ${v === 'b' ? `<a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}Orçamento</a>` : ''}
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Automotive Car France" width="1200" height="216" loading="lazy"><p>Peugeot e Citroën na Rua Boninas, no Esplanada, desde 2004.</p><p class="rod-pag">${pagto} <small>(consulte condições)</small></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Automotive Car France. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const galeriaGrade = (lista = galeria) => `<div class="galeria">${lista.map(([n, a]) => `<a href="/assets/img/${n}.webp" data-foto="${esc(a)}">${img(n, a)}</a>`).join('')}</div>`;
const pecasGrade = (lista = pecas) => `<ul class="pecas">${lista.map(([n, t], i) => `<li class="sobe"><figure>${img('peca-' + n, t)}</figure><span class="ref">${String(i + 1).padStart(2, '0')}</span><b>${t}</b></li>`).join('')}</ul>`;
const dicaHtml = (d, i) => `<article class="dica sobe" id="${d.id}"><span class="dica-n">${String(i + 1).padStart(2, '0')}</span><h3>${d.t}</h3><p>${d.p}</p></article>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Seu Peugeot ou Citroën precisa de revisão?</h2><p>Ligue ou chame no WhatsApp. O orçamento é passado antes de qualquer serviço.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.oficina = head(v, 'oficina', 'A oficina', quem[0]) + topo(v, 'oficina') + cab('A oficina', 'Desde 2004 só com carros franceses', 'galpao') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></p></div><figure>${img('fachada')}<figcaption>A entrada da oficina na Rua Boninas, 270, no Esplanada.</figcaption></figure></section>
<section class="gal-sec"><header class="tit"><p class="k">Fotos</p><h2>Por dentro da oficina</h2></header>${galeriaGrade()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Mecânica em geral, injeção eletrônica, limpeza de bicos por ultrassom, suspensão, freios e revisões periódicas para Peugeot e Citroën em Belo Horizonte.') + topo(v, 'servicos') + cab('Serviços', 'Do motor aos freios, com o padrão do fabricante', 'elevadores') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2>${s.d.map(p => `<p>${p}</p>`).join('')}<a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.t.toLowerCase()} na Car France.`)}" target="_blank" rel="noopener">Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="aviso"><p>${ic('check')}<span>Ao final de cada serviço, o carro é testado pela oficina antes de voltar para você.</span></p><p>${ic('check')}<span>Orçamento prévio, autorizado pelo cliente.</span></p></section></div>
` + cta(v) + rodape(v);
  pag.pecas = head(v, 'pecas', 'Peças', 'Peças originais Peugeot e Citroën com preços acessíveis na Automotive Car France, em Belo Horizonte.') + topo(v, 'pecas') + cab('Peças', 'A peça que você precisa para o seu Peugeot ou Citroën', 'capo-aberto') + `
<div class="in"><section class="pecas-pag"><div class="pecas-txt"><p class="lead">Trabalhamos apenas com peças originais das marcas, para garantir a qualidade total no funcionamento do seu veículo.</p><p>Peças originais para Peugeot e Citroën com preços acessíveis. Confira algumas delas e pergunte pela que você procura.</p><a class="btn" href="${wa('Olá! Estou procurando uma peça para o meu carro.')}" target="_blank" rel="noopener">${icWa()}Perguntar por uma peça</a></div>${pecasGrade()}</section></div>
` + cta(v) + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Dicas da Car France para preservar o seu carro: óleo, arrefecimento, revisões, pneus, filtros e combustível.') + topo(v, 'dicas') + cab('Dicas', 'Para o seu carro durar mais', 'boxes') + `
<div class="in"><section class="dicas-pag"><p class="lead">Algumas dicas da Car France para ajudar a preservar melhor o seu veículo.</p><div class="dicas">${dicas.map(dicaHtml).join('')}</div></section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Automotive Car France: ${E.fone}, WhatsApp ${E.cel}, ${E.email}. ${E.rua}, Esplanada, Belo Horizonte.`) + topo(v, 'contato') + cab('Contato', 'Rua Boninas, 270, no Esplanada', 'box-placa') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça um orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame()}<p class="pag-nota">${pagto} (consulte condições).</p></div></section></div>
` + rodape(v);
}

// A · Muro: clara, com o muro azul da fachada e a faixa branca e vermelha passando pelas seções.
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><figure>${img(foto, '', ' loading="eager"')}</figure><div class="muro"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><figure class="hero-a-foto">${img('box-placa', alt['box-placa'], ' loading="eager" fetchpriority="high"')}</figure><div class="muro"><div class="in hero-a-in"><div><p class="k">Esplanada · Belo Horizonte · desde 2004</p><h1>Oficina especializada em Peugeot e Citroën.</h1></div><div class="hero-a-lado"><p>${quem[1]}</p><p class="bts"><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que a Car France faz no seu carro</h2></header><ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${s.t}</b><span class="d">${s.d[0]}</span></a></li>`).join('')}<li class="servs-a-pecas sobe"><a href="${link(v, 'pecas')}"><span class="n">06</span><b>Peças originais</b><span class="d">Peças Peugeot e Citroën com preços acessíveis.</span>${ic('seta')}</a></li></ol></section>
<section class="fabrica-a"><div class="in fabrica-a-in"><figure>${img('fachada')}</figure><div><p class="k">A oficina</p><h2>Treinados nas próprias fábricas</h2><p>${quem[0]}</p><p>${quem[2]} ${quem[3]}</p><a class="link-seta" href="${link(v, 'oficina')}">Conheça a oficina ${ic('seta')}</a></div></div></section>
<section class="in pecas-a"><div class="pecas-a-cab"><header class="tit"><p class="k">Peças</p><h2>Só peças originais das marcas</h2></header><a class="link-seta" href="${link(v, 'pecas')}">Ver todas ${ic('seta')}</a></div>${pecasGrade(pecas.filter((_, i) => [0, 3, 4, 8, 9, 6].includes(i)))}</section>
<section class="pag-a"><div class="in"><p><b>5%</b> de desconto à vista</p><span>ou</span><p><b>3x</b> no cartão</p><small>Consulte condições</small></div></section>
<section class="in local-a"><div><p class="k">Onde estamos</p><h2>Rua Boninas, 270, Esplanada</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// B · Ficha: papel de ficha técnica, títulos em grotesca, referências em fonte mono e fotos em tira.
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><p class="k"><span>Car France</span> / ${k}</p><h1>${t}</h1></div><figure class="in">${img(foto, '', ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in"><p class="k"><span>Ass. técnica especializada</span> Peugeot / Citroën</p><h1>Carro francês pede<br>quem conhece carro francês.</h1><dl class="hero-b-dados"><div><dt>Desde</dt><dd>2004</dd></div><div><dt>Marcas</dt><dd>Peugeot e Citroën</dd></div><div><dt>Endereço</dt><dd>Rua Boninas, 270 · Esplanada, BH</dd></div><div><dt>Telefone</dt><dd><a href="${telHref(E.fone)}">${E.fone}</a></dd></div></dl></div>
<div class="tira">${['elevadores', 'capo-aberto', 'galpao'].map((n, i) => `<figure>${img(n, alt[n], i ? '' : ' loading="eager" fetchpriority="high"')}<figcaption>${String(i + 1).padStart(2, '0')} · ${alt[n]}</figcaption></figure>`).join('')}</div></section>
<section class="in servs-b"><div class="servs-b-cab"><p class="k">Serviços</p><h2>Ficha de serviços</h2><p>${quem[1]}</p><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a></div><table class="ficha"><tbody>${servicos.map((s, i) => `<tr class="sobe"><th scope="row"><span>S-${String(i + 1).padStart(2, '0')}</span></th><td><a href="${link(v, 'servicos')}#${s.id}"><b>${s.t}</b><span>${s.d[0]}</span></a></td></tr>`).join('')}<tr class="sobe"><th scope="row"><span>P-00</span></th><td><a href="${link(v, 'pecas')}"><b>Peças originais</b><span>Peças Peugeot e Citroën com preços acessíveis.</span></a></td></tr></tbody></table></section>
<section class="selo-b"><div class="in selo-b-in"><blockquote><p>“Ao final de cada serviço, os carros são testados pela oficina antes de serem devolvidos aos proprietários.”</p></blockquote><div><p>${quem[2]}</p><a class="link-seta" href="${link(v, 'oficina')}">Sobre a oficina ${ic('seta')}</a></div></div></section>
<section class="in pecas-b"><div class="pecas-b-cab"><p class="k">Catálogo</p><h2>Algumas das peças que temos</h2><a class="link-seta" href="${link(v, 'pecas')}">Ver as 12 ${ic('seta')}</a></div>${pecasGrade(pecas.slice(0, 8).filter((_, i) => i !== 7))}</section>
<section class="in dicas-b"><div class="dicas-b-cab"><p class="k">Dicas</p><h2>Três cuidados que evitam oficina</h2></div><div class="dicas">${dicas.filter(d => ['oleo', 'reserva', 'filtros'].includes(d.id)).map(dicaHtml).join('')}</div><a class="link-seta" href="${link(v, 'dicas')}">Todas as dicas ${ic('seta')}</a></section>
<section class="in local-b"><div class="local-b-txt"><p class="k">Endereço</p><h2>Rua Boninas, 270 · Esplanada</h2>${contatoLista()}<p class="pag-nota">${pagto} (consulte condições).</p></div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Automotive Car France', artigo: 'da', url: E.url, lang: 'pt', cor: '#d9201a', fundo: '#000f6b', claro: '#f3f5fa',
  fonteTitulo: '"Schibsted Grotesk",system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o muro azul da fachada e a faixa branca e vermelha atravessando o site, como na entrada da oficina.', pontos: ['Fotos reais dos boxes na abertura', '5 serviços e 12 peças originais', '5% à vista ou 3x no cartão'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Em papel de ficha técnica, com os serviços numerados como numa ordem de serviço e as fotos da oficina em tira.', pontos: ['"Carro francês pede quem conhece carro francês"', 'Ficha de serviços S-01 a S-05', 'Catálogo de peças com referência'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
