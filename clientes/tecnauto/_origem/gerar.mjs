// Mecânica Tecnauto (Caxias do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/tecnauto/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tecnauto https://mecanicatecnauto.com.br/)
// Textos, fotos e logo tirados do app Flutter do site atual (main.dart.js e assets/images).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mecânica Tecnauto', url: 'https://tecnauto.overtus.com.br/', antigo: 'https://mecanicatecnauto.com.br/',
  wa: '555432244577', fone: '(54) 3224-4577', email: 'gilmar@mecanicatecnauto.com.br', insta: 'tecnauto_mecanica', dono: 'Gilmar Alves de Oliveira',
  rua: 'R. Vidal de Negreiros, 237', bairro: 'Santa Catarina', cidade: 'Caxias do Sul - RS', cep: '95032-310',
  curto: 'Há mais de 30 anos, a Tecnauto oferece serviços de qualidade e confiança para os motoristas de Caxias do Sul.',
  historia: 'Uma tradição de confiança por mais de 30 anos. A Mecânica Tecnauto é referência no mercado automotivo de Caxias do Sul, com décadas de trabalho e clientes satisfeitos. Nossos mecânicos estão prontos para resolver qualquer problema do seu veículo, de revisões a reparos complexos.',
  equipamentos: 'Aqui você encontra a oficina com as ferramentas mais atualizadas do mercado. Dos diagnósticos precisos aos reparos especializados, os equipamentos de última geração garantem um resultado melhor e mais rápido para o seu carro.',
  espaco: 'Instalações espaçosas e modernas, planejadas para atender vários veículos ao mesmo tempo com eficiência, organização e segurança. Estacionamento fácil e atendimento rápido.',
};
const mapsQ = encodeURIComponent('Mecânica Tecnauto, R. Vidal de Negreiros, 237, Santa Catarina, Caxias do Sul RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const servicos = [
  { ic: 'check', t: 'Revisão Completa', d: 'Verificação de todos os sistemas importantes do carro, troca de óleo e filtros, alinhamento, balanceamento e muito mais, para manter o veículo em perfeitas condições.' },
  { ic: 'medidor', t: 'Diagnóstico Computadorizado', d: 'Equipamentos de última geração identificam com precisão qualquer problema no sistema eletrônico do veículo, economizando tempo e dinheiro na resolução de falhas.' },
  { ic: 'oleo', t: 'Troca de Óleo e Filtros', d: 'Serviço essencial para prolongar a vida útil do motor. Óleos de alta qualidade e filtros originais para o melhor desempenho e proteção.' },
  { ic: 'disco', t: 'Freios', d: 'Manutenção completa do sistema de freios: pastilhas, discos, fluido de freio e verificação de todo o sistema para a sua segurança.' },
  { ic: 'carro', t: 'Suspensão', d: 'Reparos e manutenção de todo o sistema de suspensão, para mais conforto, estabilidade e segurança ao dirigir.' },
  { ic: 'volante', t: 'Direção Hidráulica e Elétrica', d: 'Diagnóstico e reparo do sistema de direção, com troca de fluido, correias, bombas e componentes específicos para cada tipo de direção.' },
  { ic: 'floco', t: 'Ar Condicionado', d: 'Manutenção, limpeza, recarga de gás e reparo do ar condicionado, para o perfeito funcionamento e conforto térmico no carro.' },
  { ic: 'engrenagem', t: 'Injeção Eletrônica', d: 'Serviços especializados no sistema de injeção eletrônica, para economia de combustível e melhor desempenho do motor.' },
  { ic: 'medidor', t: 'Alinhamento e Balanceamento', d: 'Evita desgaste irregular dos pneus, melhora a dirigibilidade e economiza combustível.' },
  { ic: 'engrenagem', t: 'Troca de Correia Dentada', d: 'Serviço preventivo para evitar danos graves ao motor: troca da correia, dos tensores e verificação do sistema de sincronismo.' },
];
const difs = [
  { ic: 'pacote', t: 'Preço justo', d: 'Orçamentos transparentes e preços competitivos para todos os serviços.' },
  { ic: 'escudo', t: 'Qualidade garantida', d: 'Todos os serviços têm garantia e são feitos com peças de qualidade.' },
  { ic: 'relogio', t: 'Atendimento ágil', d: 'Equipe preparada para fazer o diagnóstico e a manutenção no menor tempo possível.' },
  { ic: 'usuarios', t: 'Mecânicos experientes', d: 'Equipe com anos de experiência e treinamento constante.' },
];
const fotos = [
  ['fachada', 'Fachada da oficina', 'Nossa fachada, bem identificada, na Rua Vidal de Negreiros.'],
  ['fachada-frente', 'Vista frontal', 'Entrada principal da Tecnauto.'],
  ['oficina', 'Visão geral da oficina', 'Amplo espaço para atender vários veículos.'],
  ['oficina-vertical', 'Interior da oficina', 'Ambiente espaçoso e organizado.'],
  ['elevadores', 'Elevadores automotivos', 'Equipamentos de última geração para suspensão e freios.'],
  ['elevadores-vertical', 'Área de serviço', 'Equipamento seguro para todo tipo de veículo.'],
  ['deposito', 'Depósito de peças', 'Estoque organizado de peças e componentes.'],
  ['fachada-vertical', 'Fim de tarde na Tecnauto', 'A oficina vista da rua.'],
];
const avaliacoes = [
  ['Rafael', 'Excelente atendimento! Levei meu carro para uma revisão completa e fiquei impressionado com a rapidez e qualidade do serviço. Os mecânicos são muito profissionais e explicam tudo detalhadamente. Recomendo a todos!'],
  ['Ana Paula', 'Sempre levo meu carro na Tecnauto e nunca me decepcionei. Preço justo, atendimento cordial e serviço de qualidade. O diferencial é a transparência, eles mostram as peças substituídas e explicam o que foi feito.'],
  ['Carlos', 'Atendimento excelente, serviço de qualidade e preço justo. Resolvi um problema no ar condicionado que outras oficinas não conseguiram identificar. Agora meu carro virou cliente fiel da Tecnauto!'],
  ['Márcia', 'Ótima oficina! Como mulher, sempre tive receio de ser enganada em oficinas, mas aqui fui tratada com respeito e tiveram paciência para me explicar cada detalhe do serviço. Saí de lá com a certeza de que meu carro estava em boas mãos.'],
  ['Fernando', 'Fiz a troca dos amortecedores e revisão geral. Serviço rápido, bem feito e com preço justo. O carro está novo! Recomendo a todos que buscam um serviço de confiança.'],
  ['Juliana', 'Meu carro apresentou um problema elétrico complexo e a Tecnauto foi a única oficina que conseguiu resolver. Atendimento nota 10, oficina limpa e organizada. Estou muito satisfeita!'],
  ['Roberto', 'Levei meu carro para uma simples troca de óleo e fiquei impressionado com o profissionalismo e atenção aos detalhes. Identificaram e me alertaram sobre outros problemas que eu nem sabia que existiam. Obrigado pela honestidade!'],
  ['Patrícia', 'Após uma péssima experiência em outra oficina, encontrei a Tecnauto e só tenho elogios a fazer. Profissionais qualificados, ambiente limpo e organizado, e o melhor: cumprem o prazo prometido.'],
];
const passos = [['Agende', 'Chame no WhatsApp ou ligue e diga o que o carro está apresentando.'], ['Diagnóstico', 'O carro passa pela avaliação, com scanner quando precisa, para achar a causa certa.'], ['Orçamento claro', 'Você recebe o orçamento explicado antes de qualquer serviço.'], ['Entrega com garantia', 'Serviço feito com peças de qualidade, e a gente mostra o que foi trocado.']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'estrutura', nome: 'Estrutura' }, { slug: 'avaliacoes', nome: 'Avaliações' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Azul Oficina', b: 'Box 30' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Russo+One&family=Montserrat:wght@400;500;600;700&family=Exo+2:ital,wght@0,600;0,800;1,800;1,900&family=Barlow:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Gostaria de agendar um serviço na Tecnauto.') => waHref(E.wa, m);
const waServ = t => wa(`Olá! Tenho interesse no serviço de ${t}.`);
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#0a3a62', b: '#12161c' };
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica em Caxias do Sul há mais de 30 anos` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const estrelas = () => `<span class="estrelas" aria-label="4,8 de 5 estrelas">${ic('estrela').repeat(5)}</span>`;
const nota = () => `<div class="nota">${estrelas()}<strong>4,8 de 5</strong><span>mais de 100 avaliações no Google</span></div>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Onix 2019"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro / não sei</option></select></label></div>
  <label>O que o carro está apresentando<textarea name="mensagem" rows="3" placeholder="Barulho, luz no painel, revisão de quilometragem..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Agendar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${wa()}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Ver no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Mecânica Tecnauto" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-barra"><div class="in"><span>${ic('pin')}${E.rua}, ${E.bairro}, Caxias do Sul</span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/marca.webp" alt="Tecnauto Mecânica" width="679" height="143"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${ic('calendario')}Agendar</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/marca-claro.webp" alt="Tecnauto Mecânica" width="679" height="143"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn-topo" href="${wa()}" ${ext}>${icWa()}<span>${E.fone}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Tecnauto Mecânica, 30 anos" width="690" height="450" loading="lazy"><p>Oficina mecânica em Caxias do Sul há mais de 30 anos.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('insta')}<a href="https://www.instagram.com/${E.insta}/" ${ext}>@${E.insta}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mecânica Tecnauto. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.oficina = head(v, 'oficina', 'A oficina', E.historia) + topo(v, 'oficina') + cab('A oficina', 'Mais de 30 anos cuidando dos carros de Caxias do Sul', 'fachada') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${E.historia}</p><h2>Equipamentos modernos</h2><p>${E.equipamentos}</p><h2>Amplo espaço</h2><p>${E.espaco}</p></div><figure class="selo-fig"><img src="/assets/logo.webp" alt="Tecnauto Mecânica, 30 anos" width="690" height="450" loading="lazy"></figure></section>
<section class="dono"><figure>${img('gilmar', E.dono)}</figure><div><p class="k">Proprietário</p><h2>${E.dono}</h2><p>À frente da Tecnauto, o Gilmar acompanha de perto cada carro que entra na oficina e faz questão de explicar o serviço para o cliente. Quer conversar direto com ele?</p><p class="bts"><a class="btn" href="${wa('Olá, Gilmar! Vim pelo site da Tecnauto.')}" ${ext}>${icWa()}Falar com o Gilmar</a></p></div></section>
<section class="difs"><h2>Por que escolher a Tecnauto</h2><ul>${difs.map(d => `<li class="sobe">${ic(d.ic)}<h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Revisão completa, diagnóstico computadorizado, freios, suspensão, direção, ar condicionado, injeção eletrônica, alinhamento e correia dentada em Caxias do Sul.') + topo(v, 'servicos') + cab('Serviços', 'Da troca de óleo ao reparo complexo', 'elevadores') + `
<div class="in"><section class="servs">${servicos.map((s, i) => `<article class="serv sobe" id="s${i + 1}"><div class="serv-ic">${ic(s.ic)}</div><div><h2>${s.t}</h2><p>${s.d}</p><a class="link-seta" href="${waServ(s.t)}" ${ext}>Consultar ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="passos-sec"><h2>Como funciona</h2><ol>${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section></div>
` + rodape(v);
  pag.estrutura = head(v, 'estrutura', 'Estrutura', E.espaco) + topo(v, 'estrutura') + cab('Estrutura', 'Uma oficina ampla, limpa e organizada', 'oficina') + `
<div class="in"><p class="intro">${E.espaco}</p><section class="galeria">${fotos.map(f => `<figure class="sobe"><a href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}</a><figcaption><strong>${f[1]}</strong>${f[2]}</figcaption></figure>`).join('')}</section></div>
` + rodape(v);
  pag.avaliacoes = head(v, 'avaliacoes', 'Avaliações', 'Nota 4,8 de 5 com mais de 100 avaliações no Google. Veja o que os clientes dizem da Mecânica Tecnauto.') + topo(v, 'avaliacoes') + cab('Avaliações', 'O que os clientes dizem', 'fachada-frente') + `
<div class="in"><section class="aval-topo">${nota()}<a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('estrela')}Avaliar a Tecnauto no Google</a></section>
<section class="depos depos-pag">${avaliacoes.map(a => `<blockquote class="depo sobe">${estrelas()}<p>${a[1]}</p><cite>${a[0]}</cite></blockquote>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mecânica Tecnauto: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Agende o seu serviço', 'fachada-vertical') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agendar pelo WhatsApp</h2><p>Preencha e a mensagem já vai pronta para a oficina.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('fachada', 'Fachada da Mecânica Tecnauto', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Oficina mecânica · Caxias do Sul</p><h1>Seu carro em mãos de confiança há mais de 30 anos</h1><p>Revisão, diagnóstico computadorizado, freios, suspensão, ar condicionado e injeção eletrônica, com orçamento transparente e garantia.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${ic('calendario')}Agendar agora</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
<section class="faixa-nota"><div class="in">${nota()}<a href="${link(v, 'avaliacoes')}" class="link-seta">Ler avaliações ${ic('seta')}</a></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Nossos serviços</p><h2>Tudo o que o seu carro precisa, em um lugar só</h2></header><ul>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#s${i + 1}">${ic(s.ic)}<span>${s.t}</span></a></li>`).join('')}</ul></section>
<section class="trinta"><div class="in trinta-in"><img src="/assets/selo30-claro.webp" alt="30 anos" width="690" height="282" loading="lazy"><div><h2>Uma tradição de confiança</h2><p>${E.historia}</p><a class="btn btn-claro" href="${link(v, 'oficina')}">Conheça a oficina</a></div></div></section>
<section class="in difs-a"><ul>${difs.map(d => `<li class="sobe">${ic(d.ic)}<h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul></section>
<section class="in mosaico-a"><header class="tit"><p class="k">Estrutura</p><h2>Equipamentos modernos e amplo espaço</h2></header><div class="mosaico">${['oficina', 'elevadores-vertical', 'deposito', 'elevadores'].map((f, i) => `<a href="/assets/img/${f}.webp" data-foto class="m${i + 1}">${img(f, fotos.find(x => x[0] === f)[1])}</a>`).join('')}</div><a class="link-seta" href="${link(v, 'estrutura')}">Ver todas as fotos ${ic('seta')}</a></section>
<section class="depos-a"><div class="in"><header class="tit"><p class="k">Avaliações de clientes</p><h2>O que os clientes dizem</h2></header><div class="depos">${avaliacoes.slice(0, 3).map(a => `<blockquote class="depo sobe">${estrelas()}<p>${a[1]}</p><cite>${a[0]}</cite></blockquote>`).join('')}</div></div></section>
<section class="in cta-a"><figure>${img('gilmar', E.dono)}</figure><div><h2>Entre em contato agora mesmo</h2><p>Fale direto com o Gilmar, proprietário da Tecnauto. ${E.rua}, ${E.bairro}, Caxias do Sul.</p><p class="bts"><a class="btn btn-wa" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Ver localização</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Mecânica em Caxias do Sul</p><h1><span class="n30">30</span>anos de oficina.<br><em>Nenhum carro igual ao outro.</em></h1><p>Diagnóstico computadorizado, revisão completa e reparos de freio, suspensão, direção, ar condicionado e injeção. Orçamento explicado antes de começar.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>${nota()}</div><figure class="hero-b-foto">${img('fachada-frente', 'Entrada da Mecânica Tecnauto', ' loading="eager" fetchpriority="high"')}<figcaption>${ic('pin')}${E.rua} · ${E.bairro}</figcaption></figure></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que fazemos</h2></header><ol>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#s${i + 1}"><b>${String(i + 1).padStart(2, '0')}</b><span>${s.t}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="diag-b"><div class="in diag-b-in"><figure>${img('diagnostico', 'Scanner de diagnóstico conectado ao carro')}</figure><div><p class="k">Equipamentos modernos</p><h2>Primeiro o diagnóstico. Depois o conserto.</h2><p>${E.equipamentos}</p><ul class="lista-check">${difs.map(d => `<li>${ic('check')}<span><b>${d.t}.</b> ${d.d}</span></li>`).join('')}</ul></div></div></section>
<section class="in passos-b"><header class="tit-b"><p class="k">Como funciona</p><h2>Do agendamento à entrega</h2></header><ol>${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="faixa-fotos-b"><div class="trilho">${['oficina', 'elevadores', 'deposito', 'elevadores-vertical', 'oficina-vertical'].map(f => `<a href="/assets/img/${f}.webp" data-foto>${img(f, fotos.find(x => x[0] === f)[1])}</a>`).join('')}</div></section>
<section class="in depos-b"><header class="tit-b"><p class="k">Avaliações</p><h2>Quem já passou por aqui</h2></header><div class="depos">${avaliacoes.slice(3, 6).map(a => `<blockquote class="depo sobe">${estrelas()}<p>${a[1]}</p><cite>${a[0]}</cite></blockquote>`).join('')}</div></section>
<section class="in cta-b"><div><img src="/assets/selo30-claro.webp" alt="" width="690" height="282" loading="lazy"><h2>Agende a revisão do seu carro</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.fone}</a><a class="btn btn-linha" href="${wa('Olá, Gilmar! Vim pelo site da Tecnauto.')}" ${ext}>Falar com o Gilmar</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#2f6fb5', fundo: '#0a1a2c', claro: '#f3f5f8',
  fonteTitulo: "'Russo One',system-ui,sans-serif", fonteTexto: 'Montserrat,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara e direta, no azul do logo: a fachada da oficina na abertura, a nota 4,8 do Google em destaque, os 10 serviços e o selo de 30 anos.', pontos: ['Agendamento pelo WhatsApp em todas as páginas', 'Página de estrutura com as fotos da oficina', 'Avaliações dos clientes e botão para avaliar no Google'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna e escura, com cara de box de oficina: o "30" grande na abertura, os serviços numerados e o diagnóstico computadorizado como diferencial.', pontos: ['"Primeiro o diagnóstico. Depois o conserto."', 'Como funciona, do agendamento à entrega', 'Faixa de fotos da oficina'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
