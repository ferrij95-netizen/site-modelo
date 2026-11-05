// Poison Motors Mecânica Avançada (Ipiranga, São Paulo). Gera public/{a,b}/ e a página de escolha.
// node clientes/poisonmotors/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs poisonmotors http://www.poisonmotors.com.br/)
// Textos tirados do site atual (poisonmotors.com.br: página inicial e páginas de cada serviço).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Poison Motors', url: 'https://poisonmotors.overtus.com.br/', antigo: 'http://www.poisonmotors.com.br/',
  fone: '(11) 5573-4757', wa: '551155734757',
  rua: 'Rua Manifesto, 490', bairro: 'Ipiranga', cidade: 'São Paulo/SP',
};
const tel = telHref(E.fone);
const wa = waHref(E.wa, 'Olá, Poison Motors! Vim pelo site.');
const ext = 'target="_blank" rel="noopener"';
const mapsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Poison Motors, Rua Manifesto, 490, Ipiranga, São Paulo SP');
const mapaFrame = `<iframe class="mapa" title="Mapa da Poison Motors na Rua Manifesto, 490" loading="lazy" src="https://maps.google.com/maps?q=-23.577726,-46.602737&z=16&output=embed"></iframe>`;

// Os quatro itens do quadro de apresentação do site atual
const destaques = [
  ['Serviços de mecânica em geral', 'Nacionais e importados'],
  ['Ar-condicionado automotivo', 'Convencional, digital e dual-zone'],
  ['Preparação de motor turbo', 'Turbo e aspirado'],
  ['Instalação de injeção', 'Fueltech, Pandoo, HIS, Injepro, entre outras'],
];
const injecoes = ['Fueltech', 'Pandoo', 'HIS', 'Injepro'];

// As 12 páginas de serviço do menu do site atual. Sem itens = a página não abriu ou não tem lista.
const servicos = [
  { id: 'preparacao', ic: 'chama', t: 'Preparação turbo e aspirado', d: 'Serviços de preparação de motores para ganho de potência.', itens: ['Troca de turbina', 'Chip de potência', 'Instalação de injeção programável (Fueltech, Pandoo, Injepro, entre outras)', 'Instalação de intercooler', 'Troca do downpipe', 'Instalação de intake', 'Instalação de bomba de combustível de competição', 'Instalação de embreagem de cerâmica', 'Instalação de embreagem multidisco', 'Retrabalho de bicos injetores (por eletroerosão)', 'Troca das engrenagens do câmbio por forjadas', 'Dimensionamento do sistema de freio', 'Swap de motor'] },
  { id: 'retifica', ic: 'engrenagem', t: 'Retífica de motor', d: 'Realizamos as montagens com Plastigage.', itens: ['Retífica de cabeçote', 'Retífica de cilindro', 'Retífica de virabrequim', 'Mandrilhamento de mancal', 'Retífica de volante do motor', 'Balanceamento dinâmico do virabrequim', 'Nitretação do virabrequim'] },
  { id: 'emissoes', ic: 'gota', t: 'Análise de emissões', d: '', itens: [] },
  { id: 'cambio', ic: 'engrenagem', t: 'Câmbio', d: 'Manuais, automáticos e automatizados.', itens: ['Manutenção em câmbio i-Motion (VW)', 'Manutenção em câmbio Dualogic (Fiat)', 'Manutenção em câmbio GSR (Fiat)', 'Reprogramação e aprendizado de câmbio i-Motion e Dualogic', 'Troca do fluido CS Speed de câmbio automatizado', 'Troca do óleo de câmbio automático', 'Troca do óleo de câmbio manual', 'Troca do óleo do diferencial', 'Manutenção em componentes internos de câmbio manual', 'Manutenção em componentes internos de câmbio automatizado', 'Troca de embreagem', 'Troca do fluido de embreagem', 'Troca do cabo de embreagem'] },
  { id: 'suspensao', ic: 'carro', t: 'Suspensão', d: 'Diagnóstico preciso dos problemas de suspensão do seu carro.', itens: [] },
  { id: 'freios', ic: 'disco', t: 'Freios', d: 'Dos serviços de rotina ao redimensionamento do sistema para carros com potência aumentada.', itens: ['Redimensionamento do sistema de freio (para carros com potência aumentada)', 'Montagem de pastilha de cerâmica', 'Troca de disco e de pastilha de freio', 'Passe dos discos de freio', 'Troca do fluido e dos flexíveis de freio', 'Manutenção em freio eletrônico', 'Troca de pastilha traseira de freio eletrônico (com equipamento apropriado)', 'Troca do cabo e regulagem do freio de mão', 'Troca da sapata de freio', 'Troca do cilindro mestre'] },
  { id: 'direcao', ic: 'volante', t: 'Direção', d: 'Elétrica, eletro-hidráulica e mecânica.', itens: ['Recondicionamento de caixa de direção elétrica', 'Recondicionamento de caixa de direção eletro-hidráulica', 'Recondicionamento de caixa de direção mecânica', 'Troca de componentes da direção', 'Troca do fluido de direção hidráulica e eletro-hidráulica', 'Alinhamento', 'Balanceamento', 'Rodízio de pneus'] },
  { id: 'injecao', ic: 'medidor', t: 'Injeção eletrônica', d: 'Temos inúmeros equipamentos para um diagnóstico preciso do sistema de injeção eletrônica.', itens: ['Scanner', 'Simuladores de sensores', 'Equipamento para teste de vazamento de cilindro', 'Osciloscópio', 'Analisador de bateria'] },
  { id: 'injecao-direta', ic: 'medidor', t: 'Injeção direta', d: 'Análise em veículos de passeio com injeção direta, com equipamentos apropriados para uma análise precisa.', itens: [] },
  { id: 'carburacao', ic: 'chave', t: 'Carburação', d: '', itens: [] },
  { id: 'eletrica', ic: 'sol', t: 'Elétrica', d: 'Elétrica automotiva completa.', itens: ['Alternador convencional e alternador pilotado (inteligente)', 'Bateria convencional e bateria AGM', 'Sistema start/stop', 'Módulos', 'Reparo em chicote elétrico', 'Vidro elétrico, fusíveis e iluminação', 'Lâmpadas (trabalhamos só com Philips, GE e Osram)', 'Sistema ABS', 'Sistemas de direção elétrica e eletro-hidráulica', 'Bomba de combustível', 'Injeção direta', 'Câmbio automatizado i-Motion, Dualogic e GSR', 'Instalação de injeção programável (Fueltech, Pandoo, Injepro, entre outras)'] },
  { id: 'ar', ic: 'floco', t: 'Ar-condicionado', d: 'Convencional, digital e dual-zone.', itens: [] },
];
const S = Object.fromEntries(servicos.map(s => [s.id, s]));

const fotos = {
  chevelle: ['O Chevelle preto e vermelho com o logo da Poison, do topo do site atual', 1120, 268],
  elevador: ['Braços do elevador da oficina (foto ilustrativa)', 1024, 768],
  diagnostico: ['Conector de diagnóstico sob o painel (foto ilustrativa)', 1024, 736],
};
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n][0])}" width="${fotos[n][1]}" height="${fotos[n][2]}" loading="lazy" decoding="async"${extra}>`;
const creditos = 'Fotos ilustrativas: “the lift”, frankieleon (CC BY 2.0); “Engine diagnostic connector”, endolith (CC BY 2.0).';

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'preparacao', nome: 'Preparação' }, { slug: 'diagnostico', nome: 'Diagnóstico' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Bloco e pistão', b: 'Mapa de injeção' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Audiowide&family=Geist:wght@400;500;600;700&family=Ubuntu+Sans:wght@400;500;600;700&family=Martian+Mono:wght@400;500&display=swap';
const cor = { a: '#c8101a', b: '#0f0f10' };
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Mecânica avançada no Ipiranga, São Paulo` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Poison Motors, página inicial"><img src="/assets/${logo}.webp" alt="Poison Motors" width="944" height="362"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Poison Motors" width="944" height="362" loading="lazy"><p>Mecânica avançada para nacionais e importados. Trabalhos de primeira linha com garantia.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>WhatsApp ${E.fone}</a></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Poison Motors Mecânica Avançada de Veículos.</span><span>${creditos}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a Poison Motors no WhatsApp">${icWa()}</a>
${v === 'b' ? '<script>(function(){function abre(){var d=location.hash&&document.getElementById(location.hash.slice(1));if(d&&d.tagName==="DETAILS"){d.open=true;d.scrollIntoView();}}abre();addEventListener("hashchange",abre);})();</script>' : ''}
</body>
</html>
`;
}

const itensServ = s => s.itens.length ? `<ul class="itens">${s.itens.map(i => `<li>${i}</li>`).join('')}</ul>` : '<p class="sem-itens">Consulte pelo WhatsApp.</p>';
const formulario = (v) => `<form class="form" data-wa="Olá, Poison Motors! Vim pelo site e quero um orçamento." data-numero="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone<input name="fone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (marca, modelo e ano)*<input name="carro" required></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label></div>
  <label>O que o carro está apresentando?<textarea name="msg" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da oficina, pronta para enviar.</p>
</form>`;
const dadosContato = () => `<ul class="dados">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;

// ---------------- Versão A: Bloco e pistão (clara, concreto, preto e vermelho) ----------------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, txt) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1>${txt ? `<p class="lead">${txt}</p>` : ''}</div></section>`;
  pag.index = head(v, 'index', '', 'Poison Motors, mecânica avançada no Ipiranga, São Paulo: preparação turbo e aspirado, instalação de injeção programável, retífica, câmbio, freios, direção, elétrica e ar-condicionado. Nacionais e importados.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Ipiranga · São Paulo · nacionais e importados</p><h1>Mecânica <span>avançada.</span></h1>
  <p class="lead">Da revisão do dia a dia à preparação turbo. Trabalhos de primeira linha com garantia, e facilitamos o pagamento.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <ol class="hero-a-lista">${destaques.map((d, i) => `<li><span class="n">0${i + 1}</span><div><b>${d[0]}</b><small>${d[1]}</small></div></li>`).join('')}</ol>
</div></section>
<section class="faixa-a"><div class="in"><p>Instalação de injeção programável</p><ul>${injecoes.map(n => `<li>${n}</li>`).join('')}<li class="mais">entre outras</li></ul></div></section>
<section class="in indice-a"><header class="tit"><p class="k">Serviços</p><h2>Doze frentes, uma oficina</h2><p>Cada serviço tem sua lista no site. Toque em um para ver o que fazemos.</p></header>
<ol class="indice">${servicos.map((s, i) => `<li><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.t}</span>${s.itens.length ? `<span class="q">${s.itens.length} itens</span>` : '<span class="q">consulte</span>'}${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="prep-a"><div class="in prep-a-in"><div><p class="k">Preparação turbo e aspirado</p><h2>Mais potência, com o freio e o câmbio acompanhando</h2><p>${S.preparacao.d} Do chip de potência ao swap de motor, incluindo o dimensionamento do freio e as engrenagens forjadas no câmbio.</p><a class="btn" href="${link(v, 'preparacao')}">Ver a preparação ${ic('seta')}</a></div>
<ul class="prep-lista">${S.preparacao.itens.slice(0, 8).map(i => `<li>${i}</li>`).join('')}</ul></div></section>
<section class="in carro-a"><figure>${img('chevelle')}<figcaption>${fotos.chevelle[0]}</figcaption></figure></section>
<section class="in diag-a"><div class="diag-a-txt"><p class="k">Diagnóstico</p><h2>Equipamento para achar o defeito, não para adivinhar</h2><p>${S.injecao.d}</p><ul class="lista-check">${S.injecao.itens.map(i => `<li>${ic('check')}<span>${i}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'diagnostico')}">Diagnóstico e injeção direta ${ic('seta')}</a></div><figure>${img('diagnostico')}</figure></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Venha nos visitar</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);

  pag.servicos = head(v, 'servicos', 'Serviços', 'Preparação turbo e aspirado, retífica de motor, câmbio i-Motion, Dualogic e GSR, suspensão, freios, direção, injeção eletrônica e direta, carburação, elétrica e ar-condicionado. Poison Motors, Ipiranga.') + topo(v, 'servicos') + cab('Serviços', 'Tudo o que fazemos, item por item', 'As listas abaixo são as das páginas de serviço da Poison Motors. Nacionais e importados.') + `
<div class="in servs-a">${servicos.map((s, i) => `<article class="serv-a" id="${s.id}"><header><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2>${s.d ? `<p>${s.d}</p>` : ''}</header>${itensServ(s)}</article>`).join('')}</div>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Não achou o seu caso?</h2><p>Mande o carro e o sintoma pelo WhatsApp.</p></div><p class="bts">${btnWa()}${btnTel()}</p></div></section>
` + rodape(v);

  pag.preparacao = head(v, 'preparacao', 'Preparação turbo e aspirado', 'Preparação de motores para ganho de potência: turbina, chip, injeção programável Fueltech, Pandoo, HIS e Injepro, intercooler, downpipe, intake, embreagem de cerâmica e multidisco, swap de motor e retífica.') + topo(v, 'preparacao') + cab('Preparação turbo e aspirado', 'Ganho de potência com o carro inteiro junto', S.preparacao.d) + `
<div class="in prep-pag">
<section class="prep-col"><h2>Motor e alimentação</h2><ul class="itens">${S.preparacao.itens.filter((_, i) => [0, 1, 2, 3, 4, 5, 6, 9, 12].includes(i)).map(i => `<li>${i}</li>`).join('')}</ul></section>
<section class="prep-col"><h2>Transmissão e freio</h2><ul class="itens">${S.preparacao.itens.filter((_, i) => [7, 8, 10, 11].includes(i)).map(i => `<li>${i}</li>`).join('')}</ul><p class="obs">No freio, também fazemos o redimensionamento do sistema para carros com potência aumentada.</p></section>
</div>
<section class="faixa-a"><div class="in"><p>Injeção programável</p><ul>${injecoes.map(n => `<li>${n}</li>`).join('')}<li class="mais">entre outras</li></ul></div></section>
<section class="in prep-ret"><div><p class="k">Retífica de motor</p><h2>Montagens com Plastigage</h2><p>Retífica feita para quem vai exigir mais do motor.</p></div><ul class="itens">${S.retifica.itens.map(i => `<li>${i}</li>`).join('')}</ul></section>
<section class="in carro-a"><figure>${img('chevelle')}<figcaption>${fotos.chevelle[0]}</figcaption></figure></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Conte o projeto</h2><p>Carro, motor e o que você quer alcançar.</p></div><p class="bts">${btnWa('Falar sobre preparação')}</p></div></section>
` + rodape(v);

  pag.diagnostico = head(v, 'diagnostico', 'Diagnóstico', 'Diagnóstico de injeção eletrônica com scanner, simuladores de sensores, teste de vazamento de cilindro, osciloscópio e analisador de bateria. Análise de injeção direta, emissões e carburação.') + topo(v, 'diagnostico') + cab('Diagnóstico', 'Injeção eletrônica, injeção direta e elétrica', S.injecao.d) + `
<div class="in diag-pag">
<figure class="diag-foto">${img('diagnostico')}<figcaption>${fotos.diagnostico[0]}</figcaption></figure>
<section><h2>Equipamentos</h2><ul class="itens">${S.injecao.itens.map(i => `<li>${i}</li>`).join('')}<li>entre outros</li></ul></section>
<section><h2>Injeção direta</h2><p>${S['injecao-direta'].d}</p><h2>Análise de emissões e carburação</h2><p>Também atendemos. Consulte pelo WhatsApp.</p></section>
<section class="diag-ele"><h2>Elétrica automotiva</h2><ul class="itens duas">${S.eletrica.itens.map(i => `<li>${i}</li>`).join('')}</ul></section>
</div>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Luz acesa no painel?</h2><p>Traga o carro para um diagnóstico com equipamento.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Poison Motors: ${E.rua}, ${E.bairro}, São Paulo. WhatsApp e telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Venha nos visitar', 'Trabalhos de primeira linha com garantia. Facilitamos o pagamento.') + `
<div class="in contato-pag"><div>${dadosContato()}${mapaFrame}</div><div class="form-box"><h2>Pedir orçamento</h2>${formulario(v)}</div></div>
` + rodape(v);
  return pag;
}

// ---------------- Versão B: Mapa de injeção (escura, grade de calibração, mono) ----------------
const grade = (cls = '') => {
  // grade decorativa de mapa de injeção (sem valores): células com intensidade crescente
  const cel = []; for (let r = 0; r < 6; r++) for (let c = 0; c < 12; c++) { const t = Math.min(1, (c * 0.08 + (5 - r) * 0.1)); cel.push(`<i style="--t:${t.toFixed(2)}"></i>`); }
  return `<div class="grade ${cls}" aria-hidden="true">${cel.join('')}</div>`;
};
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, txt) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1>${txt ? `<p class="lead">${txt}</p>` : ''}</div>${grade('g-cab')}</div></section>`;
  const cod = i => `P-${String(i + 1).padStart(2, '0')}`;
  pag.index = head(v, 'index', '', 'Poison Motors, mecânica avançada no Ipiranga: preparação de motor turbo, instalação de injeção Fueltech, Pandoo, HIS e Injepro, retífica, câmbio automatizado e diagnóstico com osciloscópio. Nacionais e importados.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Rua Manifesto, 490 · Ipiranga · SP</p><h1>Preparação turbo. Injeção programável. <span>Mecânica avançada.</span></h1>
  <p class="lead">Fueltech, Pandoo, HIS, Injepro, entre outras. E, no mesmo lugar, a mecânica em geral do seu carro, nacional ou importado.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  ${grade('g-hero')}
</div>
<figure class="hero-b-carro">${img('chevelle', ' loading="eager"')}</figure>
</section>
<section class="painel-b"><div class="in"><header class="tit-b"><p class="k">// serviços</p><h2>O painel da oficina</h2></header>
<ol class="painel">${servicos.map((s, i) => `<li><a href="${link(v, 'servicos')}#${s.id}"><code>${cod(i)}</code><b>${s.t}</b><small>${s.itens.length ? `${s.itens.length} itens` : 'consulte'}</small></a></li>`).join('')}</ol></div></section>
<section class="in prep-b"><div class="prep-b-txt"><p class="k">// preparação</p><h2>Turbo e aspirado</h2><p>${S.preparacao.d}</p><a class="link-seta" href="${link(v, 'preparacao')}">Lista completa ${ic('seta')}</a></div>
<ol class="prep-b-lista">${S.preparacao.itens.map((t, i) => `<li><code>${String(i + 1).padStart(2, '0')}</code>${t}</li>`).join('')}</ol></section>
<section class="diag-b"><div class="in diag-b-in"><figure>${img('diagnostico')}</figure><div><p class="k">// diagnóstico</p><h2>Scanner, osciloscópio e simuladores de sensores</h2><p>${S.injecao.d}</p><ul class="tags">${S.injecao.itens.map(i => `<li>${i}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'diagnostico')}">Diagnóstico ${ic('seta')}</a></div></div></section>
<section class="in garantia-b"><article><code>01</code><h3>Primeira linha</h3><p>Trabalhos de primeira linha com garantia.</p></article><article><code>02</code><h3>Pagamento</h3><p>Facilitamos o pagamento.</p></article><article><code>03</code><h3>Nacionais e importados</h3><p>Do câmbio Dualogic ao i-Motion, da bateria AGM ao start/stop.</p></article></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Venha nos visitar</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);

  pag.servicos = head(v, 'servicos', 'Serviços', 'Os 12 serviços da Poison Motors: preparação, retífica, emissões, câmbio, suspensão, freios, direção, injeção eletrônica e direta, carburação, elétrica e ar-condicionado.') + topo(v, 'servicos') + cab('// serviços', 'Doze serviços, cada um com sua lista', 'Nacionais e importados. As listas são as das páginas de serviço da Poison Motors.') + `
<div class="in servs-b">${servicos.map((s, i) => `<details class="serv-b" id="${s.id}"${i < 2 ? ' open' : ''}><summary><code>${cod(i)}</code><h2>${s.t}</h2><small>${s.itens.length ? `${s.itens.length} itens` : 'consulte'}</small>${ic('seta')}</summary><div class="serv-b-corpo">${s.d ? `<p>${s.d}</p>` : ''}${itensServ(s)}</div></details>`).join('')}</div>
<section class="cta-b"><div class="in cta-b-in"><h2>Mande o carro e o sintoma</h2><p class="bts">${btnWa()}${btnTel()}</p></div></section>
` + rodape(v);

  pag.preparacao = head(v, 'preparacao', 'Preparação turbo e aspirado', 'Preparação de motores turbo e aspirados: turbina, chip, injeção programável, intercooler, downpipe, intake, bomba de competição, embreagem de cerâmica e multidisco, engrenagens forjadas, swap e retífica.') + topo(v, 'preparacao') + cab('// preparação', 'Turbo e aspirado', S.preparacao.d) + `
<div class="in prep-b-pag">
<ol class="prep-b-lista">${S.preparacao.itens.map((t, i) => `<li><code>${String(i + 1).padStart(2, '0')}</code>${t}</li>`).join('')}</ol>
<aside><h2>Injeção programável</h2><ul class="tags">${injecoes.map(n => `<li>${n}</li>`).join('')}<li>entre outras</li></ul><h2>Retífica de motor</h2><p>${S.retifica.d}</p><ul class="itens">${S.retifica.itens.map(i => `<li>${i}</li>`).join('')}</ul></aside>
</div>
<figure class="in carro-b">${img('chevelle')}<figcaption>${fotos.chevelle[0]}</figcaption></figure>
<section class="cta-b"><div class="in cta-b-in"><h2>Conte o projeto</h2><p>Carro, motor e o que você quer alcançar.</p><p class="bts">${btnWa('Falar sobre preparação')}</p></div></section>
` + rodape(v);

  pag.diagnostico = head(v, 'diagnostico', 'Diagnóstico', 'Diagnóstico de injeção eletrônica e direta com scanner, osciloscópio, simuladores de sensores e teste de vazamento de cilindro. Elétrica automotiva, bateria AGM e start/stop.') + topo(v, 'diagnostico') + cab('// diagnóstico', 'Injeção eletrônica, direta e elétrica', S.injecao.d) + `
<div class="in diag-b-pag">
<section><h2>Equipamentos</h2><ol class="prep-b-lista">${S.injecao.itens.map((t, i) => `<li><code>${String(i + 1).padStart(2, '0')}</code>${t}</li>`).join('')}</ol><h2>Injeção direta</h2><p>${S['injecao-direta'].d}</p><h2>Emissões e carburação</h2><p>Também atendemos. Consulte pelo WhatsApp.</p></section>
<figure>${img('elevador')}<figcaption>${fotos.elevador[0]}</figcaption></figure>
</div>
<section class="in ele-b"><h2>Elétrica automotiva</h2><ul class="tags">${S.eletrica.itens.map(i => `<li>${i}</li>`).join('')}</ul></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Luz acesa no painel?</h2><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Poison Motors: ${E.rua}, ${E.bairro}, São Paulo. WhatsApp e telefone ${E.fone}.`) + topo(v, 'contato') + cab('// contato', 'Venha nos visitar', 'Trabalhos de primeira linha com garantia. Facilitamos o pagamento.') + `
<div class="in contato-pag"><div class="form-box"><h2>Pedir orçamento</h2>${formulario(v)}</div><div>${dadosContato()}${mapaFrame}</div></div>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#c8101a', fundo: '#0f0f10', claro: '#efeeeb',
  fonteTitulo: "'Audiowide',system-ui,sans-serif", fonteTexto: "'Geist',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em cinza-concreto, preto e o vermelho do logo, com títulos em Audiowide, a letra arredondada do "Poison". Abre com "Mecânica avançada." e os quatro serviços do site atual, e mostra os doze serviços como um índice numerado.', pontos: ['Índice dos 12 serviços com a lista de cada um', 'Faixa com Fueltech, Pandoo, HIS e Injepro', 'WhatsApp e endereço sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, em grafite e vermelho, com detalhes em letra de código e uma grade que lembra o mapa de uma injeção programável. Abre com a preparação turbo e mostra os serviços como um painel de P-01 a P-12.', pontos: ['Preparação e injeção programável em primeiro plano', 'Serviços em painel, com listas que abrem', 'O Chevelle do site atual de ponta a ponta'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
});
