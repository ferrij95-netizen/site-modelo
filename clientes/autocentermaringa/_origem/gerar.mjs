// Auto Center Maringá (Av. Brasil, 6191, Zona 06, Maringá/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/autocentermaringa/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs autocentermaringa http://www.autocentermaringa.com.br/)
// Textos tirados do site atual (autocentermaringa.com.br, páginas de serviços, dicas e /antigos). Só fotos reais da oficina.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Auto Center Maringá', curto: 'Auto Center Maringá', url: 'https://autocentermaringa.overtus.com.br/', antigo: 'http://www.autocentermaringa.com.br/',
  fone: '(44) 3262-5285', whats: '(44) 99963-6890', waNum: '5544999636890', email: 'paulo@autocentermaringa.com.br',
  rua: 'Av. Brasil, 6191', bairro: 'Zona 06', cidade: 'Maringá/PR', cep: '87015-280',
};
const msgWa = 'Olá! Vim pelo site do Auto Center Maringá e gostaria de agendar um horário.';
const wa = waHref(E.waNum, msgWa);
const tel = telHref(E.fone);
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent('Auto Center Maringá, Av. Brasil, 6191, Zona 06, Maringá PR, 87015-280');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;

const servicos = [
  { id: 'diagnostico', ic: 'painel', t: 'Diagnóstico eletrônico', c: 'Nacionais e importados', d: 'Profissionais em injeção eletrônica e equipamentos de última geração para rastrear injeção, ABS, ESP, EPC, air bag, conforto e demais sistemas. Identificamos defeitos, regulagens e melhorias de consumo e desempenho.', extra: 'Temos aparelho exclusivo para Peugeot e Citroën.' },
  { id: 'cambio-automatico', ic: 'oleo', t: 'Troca de óleo e filtro do câmbio automático', c: 'Troca completa', d: 'Equipamento da mais alta tecnologia para fazer a troca do óleo do câmbio automático, com troca do filtro.' },
  { id: 'alinhamento', ic: 'volante', t: 'Alinhamento 3D e balanceamento computadorizado', c: 'Cambagem e cáster', d: 'Última geração em equipamento de alinhamento: um alinhamento mais preciso e uma leitura de ângulos mais rápida. Balanceamento computadorizado, com mais precisão.', extra: 'Também corrigimos os ângulos de cambagem e cáster, que fora do original causam desgaste irregular dos pneus e perda de estabilidade.' },
  { id: 'cambio', ic: 'engrenagem', t: 'Câmbio', c: 'Todas as marcas', d: 'Reparos em todos os modelos de câmbio, de todas as marcas, nacionais e importados.' },
  { id: 'motor', ic: 'chave', t: 'Motor', c: 'Carros e camionetes', d: 'Todos os tipos de reparo no motor do seu carro ou camionete, inclusive a descarbonização do motor.' },
  { id: 'direcao', ic: 'volante', t: 'Direção', c: 'Mecânica e hidráulica', d: 'Reparamos direções mecânicas e hidráulicas em todos os tipos de veículo.' },
  { id: 'ar-condicionado', ic: 'floco', t: 'Ar-condicionado', c: 'Climatização automotiva', d: 'Para o ar-condicionado funcionar bem, faça a manutenção preventiva no mínimo a cada 6 meses. E ligue o aparelho periodicamente, em qualquer clima: parado, ele perde rendimento do gás e resseca as mangueiras do sistema.' },
  { id: 'air-bag', ic: 'escudo', t: 'Air bag', c: 'Conforme o modelo', d: 'Dependendo do modelo do veículo, fazemos o reparo do air bag. Há modelos que só a concessionária repara.' },
  { id: 'eletrica', ic: 'chama', t: 'Bateria e sistema elétrico', c: 'Teste e troca', d: 'Bateria no fim da vida útil começa a oxidar os polos (o zinabre). Temos equipamento para testar a bateria e, se preciso, substituí-la. Trabalhamos só com baterias originais de reposição.' },
  { id: 'revisao', ic: 'check', t: 'Revisão preventiva', c: 'Freios em dia', d: 'A troca e a sangria do fluido de freio devem ser feitas a cada ano ou 10 mil km, junto com a checagem de pastilhas, discos e lonas. Nunca reutilize fluido.' },
  { id: 'cristalizacao', ic: 'gota', t: 'Cristalização de para-brisa', c: 'Visibilidade', d: 'Melhor visibilidade na chuva e melhor ação das palhetas.' },
];
const rapidos = ['Pastilhas de freio', 'Disco de freio', 'Correia dentada', 'Correias Poly V', 'Palhetas dos limpadores', 'Lâmpadas', 'Revisão de arrefecimento', 'Embreagem', 'Fluido de freio', 'Injeção eletrônica', 'Alinhamento 3D', 'Regulagem de faróis'];
const km = [
  ['A cada 15 dias', 'Calibragem dos pneus', 'Excesso de ar desgasta o centro do pneu; falta de ar, as laterais.'],
  ['A cada 5 mil km', 'Balanceamento, alinhamento e rodízio', 'Deixar de fazer o rodízio desgasta os pneus antes do tempo.'],
  ['A cada 5 mil km', 'Filtro de cabine', 'Novo, ele é branco. Na troca, costuma sair marrom.'],
  ['A cada 10 mil km', 'Filtro de ar', 'Antes, se o carro roda em estrada de terra.'],
  ['10 mil km ou 1 ano', 'Fluido de freio', 'Com o tempo ele absorve umidade, perde eficiência e corrói componentes.'],
  ['10 mil km (álcool/flex) · 20 mil km (gasolina)', 'Limpeza de bicos injetores', ''],
  ['15 mil km (gasolina) · 8 mil km (álcool/flex)', 'Filtro de combustível', 'Obstruído, pode queimar a bomba elétrica de combustível.'],
  ['A cada 30 mil km', 'Limpeza do arrefecimento', 'Radiador e reservatório de expansão.'],
  ['60 a 90 mil km', 'Amortecedores', 'Perto de 90 mil km no asfalto bom; em estrada de terra, dificilmente chegam a 60 mil.'],
];
const dicas = [
  { t: 'Freios: confira a cada 5.000 km', d: 'Discos, pastilhas e fluido devem ser verificados a cada 5.000 km, mas o momento da troca depende de como o carro é dirigido e do piso. Ao trocar as pastilhas, confira os discos: se a pastilha chegou ao fim, o atrito fica metal com metal. Disco se troca sempre em par, para não haver diferença de frenagem entre uma roda e outra.' },
  { t: 'Acendeu uma luz no painel?', d: 'Leve o carro até uma oficina: a central de injeção eletrônica detectou algum defeito e o carro pode parar a qualquer momento.' },
  { t: 'Filtro de óleo saturado gasta o motor', d: 'Ele reduz a quantidade de óleo nas partes móveis, o que causa atrito e desgaste das peças, e faz a bomba de óleo trabalhar com mais esforço.' },
  { t: 'Filtro de ar sujo aumenta o consumo', d: 'Ele impede a passagem do ar para os cilindros. O motor perde potência, o motorista acelera mais, o consumo sobe e a poluição também.' },
  { t: 'Vai comprar um carro usado?', d: 'Leve-o a uma oficina de confiança e peça uma vistoria de carroceria. O valor não é nada perto da dor de cabeça de comprar um carro batido, retocado ou de perda total.' },
  { t: 'Antes de viajar, regule os faróis', d: 'Entre os itens de segurança, a regulagem dos faróis é a mais barata e a menos lembrada. A falta de visibilidade também pode causar um acidente.' },
];
const antigos = [
  { f: 'passat85', f2: 'passat85-motor', t: 'Passat 85 "Iraquiano"', s: 'Restaurado inteiro', itens: ['Funilaria', 'Pintura', 'Mecânica', 'Instalação de acessórios', 'Direção hidráulica', 'Ar-condicionado', 'Freio a disco na traseira', 'Vidros elétricos nas 4 portas', 'Alarme e travas elétricas'] },
  { f: 'passat79', f2: 'passat79-motor', t: 'Passat 79', s: 'Original', itens: ['Instalação de acessórios', 'Direção elétrica', 'Vidros elétricos nas 4 portas', 'Alarme e travas elétricas', 'Rodas e som'] },
];
const fotos = {
  fachada: 'A fachada do Auto Center Maringá na Av. Brasil', salao: 'O salão de serviços, com os elevadores e os carros em atendimento', loja: 'A loja de peças e acessórios no mezanino',
  alinhador: 'Alinhador 3D computadorizado em uso na oficina', alinhamento: 'Carro no elevador de alinhamento com os alvos nas rodas', cambio: 'Equipamento de troca de óleo do câmbio automático ligado a um carro na oficina',
  passat85: 'Passat 85 vermelho com o capô aberto na oficina', 'passat85-motor': 'O motor do Passat 85 depois do trabalho', passat79: 'Passat 79 branco em atendimento', 'passat79-motor': 'O motor do Passat 79',
};
const tam = { fachada: [1170, 625], salao: [1170, 625], loja: [760, 342], alinhador: [1400, 932], alinhamento: [472, 268], cambio: [1040, 584], passat85: [720, 1280], 'passat85-motor': [1280, 720], passat79: [1280, 720], 'passat79-motor': [1280, 720] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-empresa', nome: 'A empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'carros-antigos', nome: 'Carros antigos' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Avenida Brasil', b: 'Resgate 24 horas' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Pathway+Extreme:ital,wght@0,600;0,800;0,900;1,800;1,900&family=Epilogue:wght@400;500;600;700&family=Alumni+Sans:wght@600;700;800;900&family=Radio+Canada:wght@400;500;600;700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const cor = { a: '#c1242a', b: '#b3141b' };
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica na Av. Brasil, Maringá` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Agendar pelo WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e 24 horas</strong><a href="${wa}" ${ext}>${E.whats}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>Segunda a sexta, das 8h às 18h</span><span>Sábado e domingo: fechado</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa do Auto Center Maringá na Av. Brasil, 6191" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-wa="Olá! Vim pelo site do Auto Center Maringá.">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro e ano<input name="carro" placeholder="Ex.: Corolla 2015"></label><label>Serviço<select name="servico"><option>Revisão</option>${servicos.map(s => `<option>${esc(s.t)}</option>`).join('')}<option>Resgate / guincho 24 horas</option><option>Carro antigo</option><option>Frota de empresa</option></select></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp do Auto Center, já preenchida.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<div class="faixa-24"><div class="in"><span>${ic('caminhao')}Resgate 24 horas</span><a href="${wa}" ${ext}>${E.whats}</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Auto Center Maringá, página inicial"><img src="/assets/${logo}.webp" alt="Auto Center Maringá" width="808" height="219"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>Agendar</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Auto Center Maringá" width="808" height="219" loading="lazy"><p>Serviços automotivos na principal avenida de Maringá, para carros nacionais e importados, frotas de empresas e carros antigos.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.whats} · 24h</a></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–18h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Auto Center Maringá. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com o Auto Center Maringá no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const servDetalhe = () => `<div class="serv-det">${servicos.map((s, i) => `<article class="sd sobe" id="${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><p class="sd-c">${s.c}</p><h2>${s.t}</h2><p>${s.d}</p>${s.extra ? `<p class="sd-x">${s.extra}</p>` : ''}</div></article>`).join('')}</div>`;
const listaRapidos = () => `<ul class="rapidos">${rapidos.map(r => `<li>${ic('check')}<span>${r}</span></li>`).join('')}</ul>`;
const tabelaKm = () => `<table class="tab-km"><caption>Quando fazer, segundo as dicas da oficina</caption><thead><tr><th scope="col">Quando</th><th scope="col">O quê</th></tr></thead><tbody>${km.map(k => `<tr><td><b>${k[0]}</b></td><th scope="row">${k[1]}${k[2] ? `<small>${k[2]}</small>` : ''}</th></tr>`).join('')}</tbody></table>`;
const blocoAntigos = () => antigos.map(a => `<article class="ant sobe"><div class="ant-fotos">${foto(a.f, 'af1')}${foto(a.f2, 'af2')}</div><div class="ant-txt"><p class="k">${a.s}</p><h2>${a.t}</h2><p class="ant-l">Serviços executados:</p><ul>${a.itens.map(x => `<li>${x}</li>`).join('')}</ul></div></article>`).join('');

function comum(v, pag, cab) {
  pag['a-empresa'] = head(v, 'a-empresa', 'A empresa', 'Instalações amplas e organizadas na principal avenida de Maringá, equipe com mais de 25 anos de experiência e atendimento a frotas de empresas.') + topo(v, 'a-empresa') + cab('A empresa', 'Uma das maiores oficinas de Maringá, na principal avenida da cidade', 'fachada') + `
<div class="in">
<section class="emp">
  <div class="emp-txt">
    <p class="lead">O Auto Center Maringá é hoje uma das maiores e melhores empresas de serviços automotivos de Maringá.</p>
    <p>As instalações são modernas, amplas e bem organizadas. Tudo foi planejado para oferecer serviços de qualidade, com rapidez e eficiência, desde o atendimento até o serviço no seu carro.</p>
    <p>Na principal avenida de Maringá, contamos com uma equipe de profissionais com anos de experiência. O objetivo é atender bem e fazer os melhores serviços no seu veículo, com a confiança e a qualidade aliadas aos nossos preços especiais.</p>
    <p>De forma ética e profissional, mantemos um relacionamento sólido com fornecedores, amigos, parceiros, representantes e, principalmente, com os clientes.</p>
  </div>
  <aside class="emp-num"><div><b>25+</b><span>anos de experiência dos profissionais</span></div><div><b>24h</b><span>resgate e guincho</span></div><div><b>3D</b><span>alinhamento de última geração</span></div></aside>
</section>
<section class="galeria g-emp">${['salao', 'loja', 'alinhador', 'cambio'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="frotas"><div><p class="k">Empresas</p><h2>Frotas de todos os segmentos</h2><p>Atendemos frotas de empresas dos mais diversos segmentos. Traga a sua empresa para a nossa lista de clientes VIP: antes da revisão ou da manutenção, fale com a equipe.</p></div><p class="bts">${btnWa('Falar sobre a frota')}</p></section>
<section class="ambiente"><div class="tanque-ic">${ic('gota')}</div><div><p class="k">Meio ambiente</p><h2>Resíduos com destino certo</h2><p>O Auto Center Maringá aderiu ao gerenciamento de resíduos sólidos e à reciclagem de resíduos para contribuir com o meio ambiente.</p></div></section>
</div>
` + rodape(v);

  pag.servicos = head(v, 'servicos', 'Serviços', 'Diagnóstico eletrônico, troca de óleo do câmbio automático, alinhamento 3D, câmbio, motor, direção, ar-condicionado, air bag, bateria, revisão preventiva e serviços rápidos. Nacionais e importados.') + topo(v, 'servicos') + cab('Serviços', 'Do diagnóstico eletrônico ao câmbio automático', 'alinhador') + `
<div class="in">
<p class="intro">Está com dúvidas ou problemas no seu carro? Navegue pelos serviços e fale com a equipe. Atendemos carros nacionais e importados e camionetes.</p>
${servDetalhe()}
<section class="rap-pag"><div><p class="k">Na hora</p><h2>Serviços rápidos</h2><p>Itens que a equipe resolve no dia a dia da oficina.</p><p class="bts">${btnWa('Agendar um horário')}</p></div>${listaRapidos()}</section>
<section class="resgate"><div>${ic('caminhao')}</div><div><p class="k">Resgate 24 horas</p><h2>Guincho a qualquer hora</h2><p>Carro parou? Chame o resgate 24 horas pelo WhatsApp ${E.whats}.</p></div><p class="bts">${btnWa('Chamar o resgate')}</p></section>
</div>
` + rodape(v);

  pag['carros-antigos'] = head(v, 'carros-antigos', 'Carros antigos', 'Restauração completa, manutenção e adaptações de carros antigos em Maringá. Passat 85, Passat 79 e Opala 1985 restaurados na oficina.') + topo(v, 'carros-antigos') + cab('Carros antigos', 'Restauração, manutenção e adaptações de carros antigos', 'passat79') + `
<div class="in">
<section class="ant-intro"><p class="intro">Aqui no Auto Center Maringá também fazemos a restauração completa de carros antigos. Faça uma cotação.</p><ul class="ant-tres"><li><b>Restauração</b>Funilaria, pintura e mecânica, do zero</li><li><b>Manutenção</b>Para o antigo rodar com segurança</li><li><b>Adaptações</b>Direção, ar-condicionado, freio a disco, vidros e travas elétricas</li></ul></section>
<div class="ant-lista">${blocoAntigos()}</div>
<section class="opala sobe"><p class="k">Também na oficina</p><h2>Opala 1985, restaurado do zero</h2></section>
<p class="cta-linha">${btnWa('Pedir uma cotação')}${btnTel()}</p>
</div>
` + rodape(v);

  pag.dicas = head(v, 'dicas', 'Dicas', 'Quando calibrar os pneus, trocar filtros e fluido de freio, limpar os bicos e revisar os amortecedores. Dicas da equipe do Auto Center Maringá.') + topo(v, 'dicas') + cab('Dicas', 'Revisão preventiva é a melhor opção para o carro e para o bolso', 'alinhamento') + `
<div class="in">
<section class="dicas-pag"><div class="dicas-lista">${dicas.map((d, i) => `<article class="dica sobe"><span class="n">${i + 1}</span><div><h2>${d.t}</h2><p>${d.d}</p></div></article>`).join('')}</div><aside>${tabelaKm()}<p class="nota-tab">Sempre confira também o manual do proprietário.</p></aside></section>
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Auto Center Maringá: ${E.rua}, ${E.bairro}, Maringá/PR. Telefone ${E.fone}, WhatsApp e 24 horas ${E.whats}. Segunda a sexta, das 8h às 18h.`) + topo(v, 'contato') + cab('Contato', 'Agende seu horário', 'fachada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnWa()}${btnMapa()}</p></div><div class="contato-form"><h2>Mande uma mensagem</h2>${form()}</div></section>
${mapaFrame}
<div class="espaco"></div></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div><div class="listra"></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica na Av. Brasil, 6191, em Maringá: diagnóstico eletrônico, troca de óleo do câmbio automático, alinhamento 3D, câmbio e motor. Resgate 24 horas.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Av. Brasil, 6191 · Maringá</p><h1>Revise seu carro com qualidade, confiança e preço justo</h1><p>Ligue ou mande mensagem e agende seu horário. Profissionais com mais de 25 anos de experiência em carros nacionais e importados.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <figure class="hero-a-foto">${foto('fachada')}</figure>
</div><div class="listra"></div></section>
<section class="info-a"><div class="in"><ul>
  <li>${ic('relogio')}<span><b>Seg. a sex., 8h–18h</b>Sábado e domingo fechado</span></li>
  <li>${ic('caminhao')}<span><b>Resgate 24 horas</b><a href="${wa}" ${ext}>${E.whats}</a></span></li>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, Maringá/PR</span></li>
</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que fazemos pelo seu carro</h2></header>
<ol class="indice">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="it"><b>${s.t}</b><small>${s.c}</small></span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="salao-a">${img('salao')}<div class="in salao-a-in"><div class="salao-a-box"><p class="k">A oficina</p><h2>Instalações amplas, modernas e organizadas</h2><p>Tudo planejado para oferecer serviços de qualidade, com rapidez e eficiência, do atendimento ao serviço no seu carro.</p><a class="link-seta" href="${link(v, 'a-empresa')}">Conheça a empresa ${ic('seta')}</a></div></div></section>
<section class="in duo-a">
  <article class="sobe">${foto('alinhador')}<p class="k">Alinhamento 3D</p><h2>Ângulos lidos com mais rapidez e precisão</h2><p>Alinhador 3D de última geração e balanceamento computadorizado.</p></article>
  <article class="sobe">${foto('cambio')}<p class="k">Câmbio automático</p><h2>Troca completa de óleo e filtro</h2><p>Equipamento da mais alta tecnologia para a troca do óleo do câmbio automático.</p></article>
</section>
<section class="antigos-a"><div class="in antigos-a-in"><div class="antigos-a-fotos">${foto('passat85', 'p1')}${foto('passat79-motor', 'p2')}</div><div><p class="k">Carros antigos</p><h2>Restauração, manutenção e adaptações</h2><p>Passat 85 restaurado inteiro, Passat 79 original, Opala 1985 restaurado do zero. Funilaria, pintura, mecânica e acessórios na mesma oficina.</p><a class="link-seta" href="${link(v, 'carros-antigos')}">Ver os carros ${ic('seta')}</a></div></div></section>
<section class="in frotas-a"><div><p class="k">Frotas</p><h2>Sua empresa na lista de clientes VIP</h2><p>Atendemos frotas de empresas dos mais diversos segmentos. Antes da revisão ou da manutenção, fale com a equipe e deixe a gente surpreender você.</p></div><p class="bts">${btnWa('Falar sobre a frota')}</p></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Conte com profissionais capacitados para cuidar do seu carro</h2><p>${E.rua}, ${E.bairro}. Segunda a sexta, das 8h às 18h.</p></div><p class="bts">${btnWa()}${btnMapa('btn btn-claro')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="cab-b-txt"><div><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', 'Auto Center Maringá, na Av. Brasil, 6191: resgate 24 horas, diagnóstico eletrônico, câmbio automático, alinhamento 3D e restauração de carros antigos.') + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-txt"><div class="hero-b-in">
  <p class="k">Auto Center Maringá · Av. Brasil, 6191</p><h1>Conte com profissionais capacitados para cuidar do seu carro</h1><p>Está com dúvidas ou problemas no carro? Fale agora com a nossa mecânica.</p>
  <p class="bts">${btnWa('Falar no WhatsApp', 'btn btn-amarelo')}${btnTel(E.fone, 'btn btn-claro')}</p>
</div></div><figure class="hero-b-foto">${img('salao', ' loading="eager" fetchpriority="high"')}</figure></section>
<section class="num-b"><div class="in"><ul>
  <li class="sobe"><b>24h</b><span>Resgate e guincho pelo WhatsApp ${E.whats}</span></li>
  <li class="sobe"><b>25+</b><span>anos de experiência dos profissionais</span></li>
  <li class="sobe"><b>3D</b><span>alinhamento e balanceamento computadorizado</span></li>
  <li class="sobe"><b>11</b><span>áreas de serviço, de nacionais a importados</span></li>
</ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Tudo na mesma oficina</h2></header>
<div class="tabela-b">${servicos.map((s, i) => `<a class="linha-b sobe" href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${s.t}</b><small>${s.c}</small>${ic('seta')}</a>`).join('')}</div>
<div class="rap-b"><p class="k">Serviços rápidos</p>${listaRapidos()}</div></section>
<section class="faixa-b"><div class="in faixa-b-in"><figure>${foto('alinhador')}</figure><div><p class="k">Alinhamento 3D</p><h2>Última geração em equipamento de alinhamento</h2><p>O que você ganha com isso? Um alinhamento mais preciso e uma leitura de ângulos mais rápida. E balanceamento computadorizado, com mais precisão.</p></div></div></section>
<section class="in antigos-b"><div class="antigos-b-txt"><p class="k">Carros antigos</p><h2>Do Passat 79 ao Opala 85</h2><p>Restauração completa, manutenção e adaptações: direção hidráulica ou elétrica, ar-condicionado, freio a disco na traseira, vidros e travas elétricas.</p><a class="link-seta" href="${link(v, 'carros-antigos')}">Ver os carros ${ic('seta')}</a></div><div class="antigos-b-fotos">${foto('passat79', 'q1')}${foto('passat85-motor', 'q2')}${foto('passat85', 'q3')}</div></section>
<section class="loja-b"><div class="in loja-b-in"><div><p class="k">Na Av. Brasil</p><h2>Uma das maiores oficinas de Maringá</h2><p>Instalações modernas, amplas e organizadas na principal avenida da cidade. Atendemos também frotas de empresas.</p><a class="link-seta" href="${link(v, 'a-empresa')}">A empresa ${ic('seta')}</a></div>${foto('fachada', 'lf')}</div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Agende seu horário</h2><p>Segunda a sexta, das 8h às 18h. ${E.rua}, ${E.bairro}.</p></div><p class="bts">${btnWa('Agendar pelo WhatsApp', 'btn btn-amarelo')}${btnMapa('btn btn-claro')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waNum);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'do', url: E.url, lang: 'pt', cor: '#c1242a', fundo: '#1c1a19', claro: '#f6f4f1',
  fonteTitulo: "'Pathway Extreme',system-ui,sans-serif", fonteTexto: "'Epilogue',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no vermelho e amarelo da fachada, com títulos em itálico pesado como o letreiro. Abre com a fachada na Av. Brasil e a frase do site atual sobre qualidade, confiança e preço justo.', pontos: ['Índice numerado dos 11 serviços', 'Salão da oficina em foto larga', 'Alinhamento 3D, câmbio automático e carros antigos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Vermelha e preta, com letras altas e condensadas. Abre no salão da oficina, traz o resgate 24 horas e os números grandes, e lista os serviços como uma tabela.', pontos: ['Resgate 24 horas em destaque', 'Números grandes: 24h, 25+, 3D', 'Restauração de Passat e Opala'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
