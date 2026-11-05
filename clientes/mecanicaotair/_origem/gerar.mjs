// Auto Mecânica Otair (Setor Central, Goiânia/GO). Gera public/{a,b}/ e a página de escolha.
// node clientes/mecanicaotair/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mecanicaotair http://mecanicaotair.com.br/)
// Textos, serviços, dicas, telefones e fotos tirados do site atual (modelo Disy, © 2016). Logo: logo.png do site (fundo já transparente).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Auto Mecânica Otair', url: 'https://mecanicaotair.overtus.com.br/', antigo: 'http://mecanicaotair.com.br/',
  fones: ['(62) 3229-1713', '(62) 3229-0034'], cel: '(62) 99968-5618', wa: '5562999685618',
  email: 'otair@mecanicaotair.com.br',
  rua: 'Rua 20, nº 1.102, esquina com a Av. Paranaíba', bairro: 'Setor Central · Goiânia - GO',
  mapa: 'Rua 20, 1102, Setor Central, Goiânia - GO',
  curto: 'Oficina mecânica no Setor Central de Goiânia: diagnóstico computadorizado, regulagem eletrônica, retífica de motor, suspensão, câmbio, embreagem, alinhamento, balanceamento e borracharia. Guincho para clientes e leva e traz.',
};
const quem = [
  'A Auto Mecânica Otair já está no ramo há mais de 15 anos, com o objetivo de satisfazer nossos clientes, que antes de tudo são nossos parceiros e o foco principal do nosso trabalho.',
  'Buscamos sempre atualizações tecnológicas e treinamentos para capacitar nossa equipe dentro das normas do mercado consumidor atual.',
  'Realizamos os mais diversos serviços para deixar o seu veículo impecável, e contamos com profissionais qualificados e experientes.',
];
const servicos = [
  { id: 'diagnostico', t: 'Diagnóstico computadorizado', d: 'Leitura das centrais eletrônicas do carro com scanner.', f: 'scanner-bosch', i: 'painel' },
  { id: 'regulagem', t: 'Regulagem eletrônica de motor', d: 'Ajuste do motor com equipamento de medição.', f: 'analisador-gases', i: 'medidor' },
  { id: 'retifica', t: 'Retífica de motor', d: 'Retificamos motor.', f: 'motor-aberto', i: 'engrenagem' },
  { id: 'manutencao', t: 'Manutenção, lubrificação e reparação elétrica', d: 'Revisão, lubrificação e reparos na parte elétrica do carro.', f: 'equipe-elevador', i: 'oleo' },
  { id: 'alinhamento', t: 'Alinhamento, balanceamento e limpeza de bico', d: 'Roda balanceada para acabar com a trepidação no volante, e bicos injetores limpos.', f: 'balanceadora', i: 'disco' },
  { id: 'suspensao', t: 'Suspensão em geral, câmbio e embreagem', d: 'Serviços de suspensão, câmbio e embreagem.', f: 'suspensao', i: 'volante' },
  { id: 'borracharia', t: 'Borracharia e serviços elétricos', d: 'Montagem, desmontagem e reparo de pneus.', f: 'desmontadora', i: 'chave' },
  { id: 'acessorios', t: 'Acessórios', d: 'Instalação, manutenção e reparação de acessórios.', f: 'revisao-capo', i: 'carro' },
];
const extras = [
  { t: 'Socorro Auto Especial', d: 'Guinchamos carros de clientes.', i: 'caminhao' },
  { t: 'Leva e traz', d: 'Buscamos e levamos seu veículo em sua casa ou trabalho.', i: 'casa' },
];
const dicas = [
  { id: 'combustivel', t: '10 mandamentos para economizar combustível', p: ['Essas dicas rápidas servem para você economizar combustível:'], l: ['Não estique as marchas: troque numa rotação mais adequada.', 'Aceleração progressiva e controlada. Nada de arrancadas e freadas bruscas.', 'Faça sempre as revisões e manutenções preventivas nos bicos, velas e peças necessárias.', 'Escolha bem o posto onde vai abastecer, para evitar prejuízo com combustível adulterado.', 'Use de preferência gasolina aditivada, ou aditivos, para manter o sistema limpo.', 'Verifique sempre as condições do filtro de ar.', 'Não ultrapasse a velocidade limite do carro.', 'Use o freio motor em declives acentuados.', 'Deixe os pneus na calibragem correta e não carregue peso morto no carro.', 'Use o ar-condicionado sempre que necessário, mas sem exageros.'], ol: true },
  { id: 'embreagem', t: 'Defeito na embreagem', p: ['O ideal é fazer uma revisão na embreagem a cada 10 mil km, para manter a integridade do sistema. Para saber se a embreagem está com problema, observe:'], l: ['O pedal fica mais duro do que o normal e pede mais força para ser pressionado.', 'Dá para ouvir o rangido do cabo da embreagem, com cheiro de lona de freio queimada.', 'As marchas começam a arranhar mesmo com o pedal totalmente pressionado.'], p2: ['Nesse caso, antes de trocar o conjunto completo, vale a pena substituir só o cabo. A maioria dos problemas surge por causa do desgaste dele.'] },
  { id: 'balanceamento', t: 'Balanceamento dos pneus', p: ['É fácil perceber quando o carro está desbalanceado: a roda vibra e passa a trepidação para o volante.', 'Em alguns carros a trepidação aparece em baixa velocidade, em outros acima de 80 km/h, mas é sempre facilmente percebida pelo motorista. Nesse caso, procure uma oficina especializada.'] },
  { id: 'pneus', t: 'Cuidados com os pneus', p: ['A pressão dos pneus deve ser verificada a cada 15 dias e sempre antes de viagens longas. Pressão inadequada prejudica a dirigibilidade do veículo.', 'Faça a inspeção com os pneus frios e calibre seguindo as recomendações do fabricante. O estepe deve ficar com pressão um pouco acima da normal, porque costuma perder ar com o tempo.', 'O excesso de pressão provoca desgaste irregular no centro da banda de rodagem; desgaste nas bordas indica pressão abaixo da adequada. Se houver abrasão em apenas um dos lados, verifique a direção e a suspensão.', 'Pneus com muitas rachaduras ou com deformações nas paredes laterais devem ser substituídos o quanto antes.'] },
  { id: 'arrancadas', t: 'Arrancadas bruscas', p: ['É muito comum no semáforo: o sinal abre e o motorista acelera de uma vez, numa arrancada brusca.', 'A primeira consequência é o consumo excessivo de combustível. Depois, o câmbio e os coxins são forçados ao extremo e podem até quebrar. Juntas homocinéticas e engrenagens também sofrem, e a durabilidade cai. O melhor é evitar.'] },
  { id: 'engatado', t: 'Carro engatado sem necessidade', p: ['Com o semáforo fechado, evite manter o carro engatado: isso desgasta o sistema de embreagem e diminui a vida útil dele.', 'É melhor deixar o carro desengatado, só com o freio de mão puxado. Serve também para você relaxar o braço e as pernas.'] },
  { id: 'pista-molhada', t: 'Frenagem em pista molhada', p: ['Em pista molhada, nunca solte o pedal da embreagem de uma vez depois de reduzir a marcha: isso pode frear as rodas motrizes e fazer o carro derrapar.', 'Reduza sempre com suavidade: engrene a marcha e solte o pedal da embreagem aos poucos.'] },
  { id: 'emergencia', t: 'Procedimentos de emergência', p: ['Quebrar o carro em pleno trânsito é uma situação de estresse, que pode piorar com o tráfego, o clima, o local e a hora do dia. O que fazer:'], l: ['Tire o carro da pista o mais rápido possível.', 'Ligue o pisca-alerta, coloque o carro em ponto morto e o mais perto possível do acostamento.', 'Se não conseguir tirar o carro da estrada, saia pela porta do lado do acostamento.', 'Abra o capô e deixe-o aberto.', 'Amarre um pano colorido na antena ou na maçaneta da porta para sinalizar a emergência.', 'Se tiver celular, ligue para 190 e informe o ocorrido.'], ol: true },
];
const galeria = [
  ['fachada', 'Fachada da Mecânica Otair na Rua 20, Setor Central'], ['galpao', 'Galpão da oficina com os carros em serviço'], ['elevadores-fila', 'Fila de elevadores Hidromar'],
  ['recepcao', 'Sala de espera para clientes'], ['escritorio', 'Escritório e atendimento'], ['galpao-elevadores', 'Elevadores no fundo do galpão'],
  ['bancada-ferramentas', 'Carrinhos de ferramentas ao lado dos carros'], ['boxes', 'Carros nos boxes de serviço'], ['motor-reparo', 'Mecânico trabalhando no motor'],
  ['balanceamento', 'Roda na balanceadora'], ['elevador-caminhonete', 'Caminhonete no elevador'], ['atendimento', 'Atendimento no escritório da oficina'],
];
const alt = Object.fromEntries(galeria);
Object.assign(alt, {
  'mecanico-elevador': 'Mecânico da Otair trabalhando sob um carro no elevador', 'scanner-bosch': 'Scanner de diagnóstico ligado ao carro', 'analisador-gases': 'Tela do equipamento de medição do motor',
  'motor-aberto': 'Motor aberto em reparo', 'equipe-elevador': 'Mecânicos da Otair com carros nos elevadores', balanceadora: 'Mecânico na balanceadora de rodas', suspensao: 'Mecânico revisando a suspensão de um carro no elevador',
  desmontadora: 'Mecânico na máquina de desmontar pneus', 'revisao-capo': 'Carro de capô aberto no elevador', 'diagnostico-bosch': 'Diagnóstico com scanner dentro do carro', 'galpao-entrada': 'Entrada do galpão da oficina', 'galpao-fundo': 'Galpão da oficina', 'galpao-carros': 'Carros em serviço no galpão', 'elevador-baixo': 'Carro suspenso no elevador',
});
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Letreiro', b: 'Box' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Big+Shoulders+Display:wght@700;800;900&family=Instrument+Sans:wght@400;500;600;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#d7101d', b: '#141313' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Auto Mecânica Otair | Oficina mecânica no Setor Central de Goiânia' : `${titulo} | Auto Mecânica Otair`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const wa = (msg = 'Olá! Vim pelo site da Mecânica Otair.') => waHref(E.wa, msg);
const fonesLinks = (sep = ' · ') => E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(sep);

const formulario = () => `<form class="form" data-wa="Olá! Quero um orçamento na Mecânica Otair.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Gol 2014"></label><label>Serviço<select name="servico"><option>Não sei, preciso de diagnóstico</option>${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Guincho</option><option>Leva e traz</option></select></label></div>
  <label>O que está acontecendo com o carro?<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp com a mensagem pronta para ${E.cel}.</p>
</form>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa da Auto Mecânica Otair" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-faixa"><div class="in"><span>${ic('pin')}${E.rua}</span><span>${ic('tel')}${fonesLinks()}</span></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Auto Mecânica Otair, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Auto Mecânica Otair" width="510" height="181"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}WhatsApp</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Auto Mecânica Otair" width="510" height="181" loading="lazy"><p>Alta qualidade e serviço profissional, na esquina da Rua 20 com a Av. Paranaíba.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale com a oficina</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>${fonesLinks('<br>')}</span></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Auto Mecânica Otair. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const extrasLista = () => `<ul class="extras">${extras.map(x => `<li>${ic(x.i)}<div><b>${x.t}</b><span>${x.d}</span></div></li>`).join('')}</ul>`;
const servLista = v => `<ol class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="servs-n">${String(i + 1).padStart(2, '0')}</span>${ic(s.i)}<b>${s.t}</b></a></li>`).join('')}</ol>`;
const galeriaGrade = (lista = galeria) => `<div class="galeria">${lista.map(([n, a]) => `<a href="/assets/img/${n}.webp" data-foto="${esc(a)}">${img(n, a)}</a>`).join('')}</div>`;
const dicaHtml = (d, i) => `<details class="dica" id="${d.id}"${i ? '' : ' open'}><summary>${ic('livro')}<span>${d.t}</span></summary><div class="dica-txt">${d.p.map(p => `<p>${p}</p>`).join('')}${d.l ? `<${d.ol ? 'ol' : 'ul'} class="dica-lista">${d.l.map(l => `<li>${l}</li>`).join('')}</${d.ol ? 'ol' : 'ul'}>` : ''}${(d.p2 || []).map(p => `<p>${p}</p>`).join('')}</div></details>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong>${fonesLinks('')}</div></li>
  <li>${icWa()}<div><strong>WhatsApp / celular</strong><a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Carro fazendo barulho, puxando ou com luz acesa no painel?</h2><p>Chame no WhatsApp ou ligue. Se ele não anda, a gente guincha.</p></div><p class="bts"><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Diagnóstico computadorizado, regulagem eletrônica, retífica de motor, suspensão, câmbio, embreagem, alinhamento, balanceamento, borracharia, guincho e leva e traz no Setor Central de Goiânia.') + topo(v, 'servicos') + cab('Serviços', 'Do diagnóstico computadorizado à retífica do motor', 'mecanico-elevador') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p><a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.t.toLowerCase()}.`)}" target="_blank" rel="noopener">Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="extras-sec"><header class="tit"><p class="k">Além da oficina</p><h2>A gente busca o carro</h2></header>${extrasLista()}</section></div>
` + cta(v) + rodape(v);
  pag.oficina = head(v, 'oficina', 'A oficina', quem[0]) + topo(v, 'oficina') + cab('A oficina', 'Há mais de 15 anos no ramo', 'galpao') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></p></div><figure>${img('fachada')}<figcaption>Rua 20, nº 1.102, na esquina com a Av. Paranaíba.</figcaption></figure></section>
<section class="gal-sec"><header class="tit"><p class="k">Fotos</p><h2>Por dentro da oficina</h2></header>${galeriaGrade()}</section></div>
` + cta(v) + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Dicas da Mecânica Otair para economizar combustível, cuidar dos pneus e da embreagem e agir numa emergência.') + topo(v, 'dicas') + cab('Dicas', 'Dicas para o seu carro durar mais', 'diagnostico-bosch') + `
<div class="in"><section class="dicas-pag"><div class="dicas">${dicas.map(dicaHtml).join('')}</div><aside class="dicas-lado"><h2>Ficou com dúvida?</h2><p>Mande uma mensagem contando o que o carro está fazendo.</p><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></aside></section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Auto Mecânica Otair: ${E.fones.join(', ')}, WhatsApp ${E.cel}. ${E.rua}, Setor Central, Goiânia.`) + topo(v, 'contato') + cab('Contato', 'Rua 20, esquina com a Av. Paranaíba', 'escritorio') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça um orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="cab-a-placa"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="cab-a-foto">${img(foto, '', ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="hero-a-placa"><div class="hero-a-txt"><p class="k">Mecânica Otair · Setor Central · Goiânia</p><h1>Alta qualidade e serviço profissional.</h1><p>${quem[2]}</p><p class="bts"><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div><ul class="placa-fones">${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f.replace('(62) ', '')}</a></li>`).join('')}<li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.cel.replace('(62) ', '')}</a></li></ul></div><figure class="hero-a-foto">${img('fachada', alt.fachada, ' loading="eager" fetchpriority="high"')}</figure></section>
<section class="in servs-a"><div class="servs-a-cab"><header class="tit"><p class="k">Serviços</p><h2>O que a gente faz no seu carro</h2></header><a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></div>${servLista(v)}${extrasLista()}</section>
<section class="foto-a"><div class="in foto-a-in"><figure>${img('mecanico-elevador')}</figure><div><p class="k">A oficina</p><h2>Equipe treinada e equipamento atualizado</h2><p>${quem[1]}</p><p>${quem[0]}</p><a class="link-seta" href="${link(v, 'oficina')}">Conheça a oficina ${ic('seta')}</a></div></div></section>
<section class="in tira-a">${galeriaGrade(galeria.slice(1, 5))}</section>
<section class="in local-a"><div><p class="k">Onde estamos</p><h2>Na esquina da Rua 20 com a Av. Paranaíba</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('mecanico-elevador', alt['mecanico-elevador'], ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Auto Mecânica Otair · Goiânia</p><h1>Do diagnóstico computadorizado <span>à retífica do motor.</span></h1><p>${quem[2]}</p><p class="bts"><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></p></div></section>
<section class="faixa-b"><div class="in">${extrasLista()}</div></section>
<section class="in servs-b"><header class="tit"><p class="k">Ordem de serviço</p><h2>O que entra no box</h2></header>${servLista(v)}</section>
<section class="mosaico-b"><div class="in">${galeriaGrade(galeria.slice(0, 6))}<a class="link-seta" href="${link(v, 'oficina')}">Mais fotos da oficina ${ic('seta')}</a></div></section>
<section class="in dicas-b"><div><p class="k">Dicas da oficina</p><h2>Como saber se a embreagem está pedindo socorro</h2><p>${dicas[1].p[0]}</p><ul class="lista-check">${dicas[1].l.map(l => `<li>${l}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'dicas')}">Outras dicas ${ic('seta')}</a></div><figure>${img('elevador-baixo')}</figure></section>
<section class="in local-b"><div class="local-b-txt"><p class="k">Endereço</p><h2>Setor Central, Rua 20, nº 1.102</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Auto Mecânica Otair', artigo: 'da', url: E.url, lang: 'pt', cor: '#d7101d', fundo: '#141313', claro: '#fbf3ee',
  fonteTitulo: '"Bricolage Grotesque",system-ui,sans-serif', fonteTexto: '"Instrument Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com a placa vermelha da fachada na abertura e os telefones do letreiro logo ao lado.', pontos: ['"Alta qualidade e serviço profissional"', '8 serviços, guincho e leva e traz', 'Orçamento pelo WhatsApp com modelo do carro'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, de oficina, com o mecânico no elevador em tela cheia e os serviços como ordem de serviço.', pontos: ['"Do diagnóstico à retífica do motor"', 'Fotos reais do galpão', '8 dicas da oficina'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
