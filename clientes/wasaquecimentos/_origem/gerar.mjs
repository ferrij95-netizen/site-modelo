// W.A.S. Aquecimentos (Sorocaba/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/wasaquecimentos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs wasaquecimentos https://wasaquecimentos.com.br/)
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
const E = {
  nome: 'W.A.S. Aquecimentos', url: 'https://wasaquecimentos.overtus.com.br/', antigo: 'https://wasaquecimentos.com.br/',
  slogan: 'Conforto, Sustentabilidade e Qualidade',
  sobre: 'Empresa familiar, com mais de 50 anos de experiência no segmento de aquecedores, tanto para piscina como para residência e indústria, com mais de 700 equipamentos instalados no mercado.',
  wa: '5515996749726', fones: ['(15) 3500-9781', '(15) 99674-9726', '(15) 99712-3366'],
  emails: ['contato@wasaquecimentos.com.br', 'washington.almeidaf@gmail.com'],
  rua: 'R. Sylvio Rosa Santos, 85', bairro: 'Alto do Trujillo', cep: '18060-530', cidade: 'Sorocaba/SP',
  cnpj: '39.834.017/0001-80', youtube: 'https://www.youtube.com/channel/UCsGuzIq2SaDoNS5EVt5vCcQ',
  mapa: 'https://www.google.com/maps/search/?api=1&query=R.+Sylvio+Rosa+Santos,+85,+Sorocaba+SP',
};
const servicos = [
  { slug: 'placa-solar', icone: 'painel', nome: 'Placa Solar', texto: 'Instalação e manutenção de placas solares com o melhor custo-benefício para você.', foto: 'placa-telhado-1', mais: ['Coletores solares para banho e piscina', 'Dimensionamento conforme o consumo da casa', 'Manutenção e limpeza de placas já instaladas'] },
  { slug: 'aquecedores', icone: 'chuveiro', nome: 'Aquecedores', texto: 'Aquecedores de piscinas e chuveiros. Economize na conta de luz.', foto: 'coletor-tubos', mais: ['Aquecimento de água para chuveiros e torneiras', 'Reservatórios térmicos (boilers)', 'Troca e conserto de aquecedores'] },
  { slug: 'residencial-industrial', icone: 'fabrica', nome: 'Residencial e Industrial', texto: 'Possuímos estrutura completa para atender a sua necessidade.', foto: 'boilers-industrial', mais: ['Casas, condomínios, hotéis e clínicas', 'Centrais de água quente para empresas', 'Projetos sob medida para cada volume de água'] },
  { slug: 'piscinas', icone: 'piscina', nome: 'Piscinas', texto: 'Instalação de aquecedores, manutenção em casa de máquinas e similares.', foto: 'piscina-aquecida', mais: ['Aquecimento solar de piscinas', 'Manutenção em casa de máquinas', 'Controle de temperatura da água'] },
];
const galeria = [
  ['placa-telhado-1', 'Placa solar'], ['placa-telhado-2', 'Placa solar'], ['placa-telhado-3', 'Placa solar'], ['placa-telhado-4', 'Placa solar'],
  ['casa-placa-solar', 'Casa com placa solar'], ['placa-telhado-5', 'Placa solar'], ['piscina-deck', 'Aquecedor de piscina'], ['termometro-piscina', 'Piscina aquecida'],
  ['piscina-casa-placas', 'Piscina aquecida com placas no telhado'], ['piscina-aquecida', 'Piscina aquecida'], ['coletor-tubos', 'Coletores solares'], ['boilers-industrial', 'Reservatórios térmicos'],
];
const parceiros = [['notredame', 'NotreDame Intermédica'], ['coxinhas-premium', 'Coxinhas Premium'], ['clara-ibiuna', 'Clara Ibiúna Resort'], ['reviver', 'Hotel Fazenda Reviver']];
const nav = [
  { slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'solucoes', nome: 'Soluções' },
  { slug: 'obras', nome: 'Galeria' }, { slug: 'contato', nome: 'Contato' },
];
export const nomesVersao = { a: 'Brasão', b: 'Calor do Sol' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Roboto:wght@500;700;900&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site e gostaria de um orçamento.') => waHref(E.wa, m);

function head(v, slug, titulo, descricao) {
  return cabeca({ E, v, slug, titulo: `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#0f0f0f' : '#c67f2a' });
}
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const marca = (v, cls = '') => `<a class="marca ${cls}" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/brasao.webp" alt="" width="640" height="583"><span>W.A.S. <b>Aquecimentos</b></span></a>`;
const fonesLista = () => E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('');

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <div class="topo-dir">
      <p class="topo-redes"><a href="${E.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a><a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a><a class="topo-mail" href="mailto:${E.emails[0]}">${E.emails[0]}</a></p>
      <p class="topo-fones">${fonesLista()}</p>
    </div>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu" aria-label="Principal"><ul class="in">${menuItens(v, nav, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-orc" href="${wa()}" target="_blank" rel="noopener">${icWa()}Orçamento</a>
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
    <div class="rod-marca"><img src="/assets/brasao.webp" alt="" width="640" height="583" loading="lazy"><strong>${E.nome}</strong><span>${E.slogan}</span></div>
    <ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro} · CEP ${E.cep}<br>${E.cidade}</span></li>
      <li>${ic('mail')}<span>${E.emails.map(m => `<a href="mailto:${m}">${m}</a>`).join('<br>')}</span></li>
      <li>${ic('tel')}<span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join('<br>')}</span></li>
      <li>${ic('fabrica')}<span>CNPJ ${E.cnpj}</span></li>
    </ul>
    <div class="rod-regiao">
      <img src="/assets/img/regiao-sorocaba.webp" alt="Mapa da região de Sorocaba" width="600" height="502" loading="lazy">
      <p><strong>Atendimento em Sorocaba e região</strong><a href="${E.youtube}" target="_blank" rel="noopener">${ic('yt')} Nosso canal no YouTube</a></p>
    </div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}. Todos os direitos reservados.</span><nav aria-label="Rodapé"><ul>${menuItens(v, nav, '')}</ul></nav><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const formulario = (cls = '') => `<form class="form ${cls}" data-wa="Olá! Vim pelo site da W.A.S. e quero falar sobre aquecimento.">
  <label>Nome completo *<input name="nome" required autocomplete="name"></label>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Telefone *<input name="telefone" required inputmode="tel" autocomplete="tel" placeholder="(15) 00000-0000"></label></div>
  <label>O que você precisa?<select name="assunto"><option>Aquecimento solar (placas)</option><option>Aquecedor de piscina</option><option>Aquecedor para chuveiros</option><option>Projeto residencial ou industrial</option><option>Manutenção</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre pronta no WhatsApp da W.A.S. Se preferir, ligue: ${E.fones[0]}.</p>
</form>`;

const contatoBloco = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}<br>CEP ${E.cep} · ${E.cidade}</span><a href="${E.mapa}" target="_blank" rel="noopener">Abrir no mapa ${ic('ext')}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')}</span></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">(15) 99674-9726</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><span>${E.emails.map(m => `<a href="mailto:${m}">${m}</a>`).join('<br>')}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa: W.A.S. Aquecimentos em Sorocaba" loading="lazy" src="https://maps.google.com/maps?q=R.%20Sylvio%20Rosa%20Santos%2C%2085%2C%20Sorocaba%20SP&z=15&output=embed"></iframe>`;
const galeriaGrade = (cls, lista = galeria) => `<div class="${cls}">${lista.map(([f, t]) => `<a href="/assets/img/${f}.webp" data-foto="${esc(t)}">${img(f, t)}<span>${esc(t)}</span></a>`).join('')}</div>`;
const parceirosFaixa = cls => `<ul class="${cls}">${parceiros.map(([f, n]) => `<li><img src="/assets/clientes/${f}.webp" alt="${esc(n)}" loading="lazy"></li>`).join('')}</ul>`;

// ---------------- Versão A: Brasão (fiel ao site atual) ----------------
function A() {
  const v = 'a';
  const titulo = (icone, h, p = '') => `<header class="sec-tit">${ic(icone, 'sec-ic')}<h2>${h}</h2>${p ? `<p>${p}</p>` : ''}</header>`;
  const tiles = `<ul class="tiles">${servicos.map(s => `<li><a href="${link(v, 'solucoes')}#${s.slug}"><span class="tile-ic">${ic(s.icone)}</span><strong>${s.nome}</strong><span class="tile-txt">${s.texto}</span></a></li>`).join('')}</ul>`;
  const faixa = t => `<div class="faixa-slogan"><p class="in">${t}</p></div>`;
  const pag = {};
  pag.index = head(v, 'index', 'Aquecedores e placas solares em Sorocaba', E.sobre) + topo(v, 'index') + `
${faixa(E.slogan)}
<section class="carrossel" data-carrossel="5500" aria-label="Fotos de instalações">
  ${['piscina-casa-placas', 'placa-telhado-3', 'piscina-aquecida', 'casa-placa-solar', 'boilers-industrial'].map((f, i) => `<figure class="slide${i ? '' : ' ativo'}">${img(f, galeria.find(g => g[0] === f)?.[1] || 'Instalação W.A.S.', i ? '' : ' loading="eager" fetchpriority="high"')}</figure>`).join('')}
  <button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próxima">${ic('seta')}</button>
  <div class="pontos"></div>
</section>
<section class="sec quem in">
  ${titulo('casa', 'Quem Somos', E.sobre)}
  <div class="numeros"><p><b>+50</b><span>anos de experiência</span></p><p><b>+700</b><span>equipamentos instalados</span></p><p><b>3</b><span>frentes: piscina, residência e indústria</span></p></div>
  ${tiles}
</section>
<section class="sec duas in">
  <div class="gal">${titulo('sol', 'Galeria')}${galeriaGrade('gal-grade', galeria.slice(0, 8))}<a class="link-seta" href="${link(v, 'obras')}">Ver todas as fotos ${ic('seta')}</a></div>
  <div class="parc">${titulo('usuarios', 'Clientes Parceiros')}${parceirosFaixa('parc-lista')}</div>
</section>
<section class="sec contato-home">
  <div class="in duas">
    <div>${titulo('mail', 'Contato', 'Deixe sua mensagem que em breve entraremos em contato.')}${formulario()}</div>
    <div>${titulo('pin', 'Localização', 'Confira nossa localização no mapa.')}${mapaFrame}${contatoBloco()}</div>
  </div>
</section>
` + rodape(v);

  pag.empresa = head(v, 'empresa', 'Quem somos', E.sobre) + topo(v, 'empresa') + `
${faixa('Quem Somos')}
<section class="sec in empresa-a">
  <div class="emp-texto">
    <img class="emp-brasao" src="/assets/brasao.webp" alt="Brasão da W.A.S. Aquecimentos" width="640" height="583">
    <h1>Uma empresa familiar que aquece casas, piscinas e indústrias há mais de 50 anos</h1>
    <p>${E.sobre}</p>
    <p>Atendemos Sorocaba e região com instalação, manutenção e troca de aquecedores e placas solares. Cada projeto é pensado para o volume de água e o uso de cada cliente, para entregar conforto com economia na conta de luz.</p>
    <ul class="valores"><li>${ic('sol')}<strong>Conforto</strong><span>Água quente quando você precisa, no banho e na piscina.</span></li><li>${ic('gota')}<strong>Sustentabilidade</strong><span>Energia do sol no lugar da energia elétrica.</span></li><li>${ic('escudo')}<strong>Qualidade</strong><span>Mais de 700 equipamentos instalados no mercado.</span></li></ul>
  </div>
  <figure class="emp-foto">${img('piscina-casa-placas', 'Piscina aquecida com placas solares no telhado')}<figcaption>Piscina aquecida com placas solares instaladas pela W.A.S.</figcaption></figure>
</section>
<section class="sec cinza"><div class="in">${titulo('usuarios', 'Clientes Parceiros', 'Empresas, hotéis e resorts que confiam na W.A.S.')}${parceirosFaixa('parc-lista parc-linha')}</div></section>
` + rodape(v);

  pag.solucoes = head(v, 'solucoes', 'Soluções em aquecimento', 'Placas solares, aquecedores de piscina e chuveiro, projetos residenciais e industriais em Sorocaba e região.') + topo(v, 'solucoes') + `
${faixa('Soluções')}
<section class="sec in">${tiles}</section>
${servicos.map((s, i) => `<section id="${s.slug}" class="sol-a${i % 2 ? ' inv' : ''}"><div class="in sol-a-grade">
  <figure>${img(s.foto, s.nome)}</figure>
  <div><span class="tile-ic">${ic(s.icone)}</span><h2>${s.nome}</h2><p>${s.texto}</p><ul class="lista-check">${s.mais.map(m => `<li>${ic('check')}${m}</li>`).join('')}</ul><a class="btn" href="${wa(`Olá! Quero um orçamento de ${s.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a></div>
</div></section>`).join('')}
` + rodape(v);

  pag.obras = head(v, 'obras', 'Galeria de instalações', 'Fotos de placas solares, piscinas aquecidas e reservatórios instalados pela W.A.S. Aquecimentos.') + topo(v, 'obras') + `
${faixa('Galeria')}
<section class="sec in">${titulo('sol', 'Instalações W.A.S.', 'Clique em uma foto para ver maior.')}${galeriaGrade('gal-grade gal-toda')}</section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a W.A.S. Aquecimentos: ${E.fones.join(', ')}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + `
${faixa('Contato')}
<section class="sec in duas">
  <div>${titulo('mail', 'Fale com a gente', 'Deixe sua mensagem que em breve entraremos em contato.')}${formulario()}</div>
  <div>${titulo('pin', 'Localização')}${mapaFrame}${contatoBloco()}</div>
</section>
` + rodape(v);
  return pag;
}

// ---------------- Versão B: Calor do Sol (mais moderna) ----------------
function B() {
  const v = 'b';
  const pag = {};
  const etapas = [
    { ic: 'sol', t: 'O sol aquece as placas', d: 'Os coletores no telhado captam o calor do sol durante o dia.' },
    { ic: 'gota', t: 'A água circula', d: 'A água passa pelos coletores, esquenta e volta para o reservatório.' },
    { ic: 'fabrica', t: 'Fica guardada quente', d: 'O reservatório térmico (boiler) mantém a água aquecida para a noite.' },
    { ic: 'chuveiro', t: 'Chega ao banho e à piscina', d: 'Chuveiros, torneiras e piscina recebem água quente gastando menos luz.' },
  ];
  const como = `<section class="como">
  <div class="in">
    <header class="b-tit"><p class="sobre-t">Como funciona</p><h2>Do telhado ao chuveiro, sem pesar na conta de luz</h2></header>
    <ol class="como-trilho">${etapas.map((e, i) => `<li class="sobe"><span class="como-n">0${i + 1}</span><span class="como-ic">${ic(e.ic)}</span><strong>${e.t}</strong><p>${e.d}</p></li>`).join('')}</ol>
  </div>
</section>`;
  const cta = `<section class="cta-b"><div class="in cta-b-in"><div><h2>Quer água quente gastando menos?</h2><p>Atendemos Sorocaba e região. Conte o que você precisa e receba um orçamento.</p></div><div class="cta-b-bt"><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a></div></div></section>`;
  const subtopo = (k, h, p, foto) => `<section class="sub-b"><div class="in sub-b-in"><div><p class="sobre-t">${k}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div>${foto ? `<figure>${img(foto, h)}</figure>` : ''}</div></section>`;

  pag.index = head(v, 'index', 'Aquecimento solar, piscinas e aquecedores em Sorocaba', E.sobre) + topo(v, 'index') + `
<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="sobre-t">${E.slogan}</p>
      <h1>Água quente com a energia do sol, para sua casa, piscina e empresa</h1>
      <p>${E.sobre}</p>
      <div class="hero-b-bt"><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'solucoes')}">Ver soluções ${ic('seta')}</a></div>
    </div>
    <figure class="hero-b-foto">${img('piscina-casa-placas', 'Piscina aquecida com placas solares no telhado', ' loading="eager" fetchpriority="high"')}<figcaption><b>+700</b> equipamentos instalados</figcaption></figure>
  </div>
</section>
<section class="numeros-b"><div class="in"><p><b>+50</b><span>anos de experiência da família</span></p><p><b>+700</b><span>equipamentos instalados</span></p><p><b>Sorocaba</b><span>e cidades da região</span></p></div></section>
<section class="sol-b in">
  <header class="b-tit"><p class="sobre-t">Soluções</p><h2>Aquecimento para cada necessidade</h2></header>
  <div class="sol-b-grade">${servicos.map((s, i) => `<a class="sol-b-item sobe${i === 0 ? ' grande' : ''}" href="${link(v, 'solucoes')}#${s.slug}">${img(s.foto, s.nome)}<span class="sol-b-txt">${ic(s.icone)}<strong>${s.nome}</strong><span>${s.texto}</span></span></a>`).join('')}</div>
</section>
${como}
<section class="gal-b in">
  <header class="b-tit linha"><div><p class="sobre-t">Galeria</p><h2>Instalações feitas pela W.A.S.</h2></div><a class="link-seta" href="${link(v, 'obras')}">Ver todas ${ic('seta')}</a></header>
  ${galeriaGrade('mosaico', galeria.slice(0, 8))}
</section>
<section class="parc-b"><div class="in"><p class="sobre-t">Clientes parceiros</p>${parceirosFaixa('parc-b-lista')}</div></section>
${cta}
` + rodape(v);

  pag.empresa = head(v, 'empresa', 'Quem somos', E.sobre) + topo(v, 'empresa') + subtopo('Quem somos', 'Mais de 50 anos aquecendo água em Sorocaba e região', E.sobre, 'casa-placa-solar') + `
<section class="emp-b in">
  <div class="emp-b-brasao"><img src="/assets/brasao.webp" alt="Brasão da W.A.S. Aquecimentos" width="640" height="583"></div>
  <div>
    <h2>${E.slogan}</h2>
    <p>Somos uma empresa familiar. A experiência passou de geração em geração e hoje soma mais de 700 equipamentos instalados em casas, piscinas, hotéis e indústrias.</p>
    <dl class="valores-b"><div><dt>${ic('sol')}Conforto</dt><dd>Água quente no banho e na piscina, na hora em que você precisa.</dd></div><div><dt>${ic('gota')}Sustentabilidade</dt><dd>O sol faz o trabalho que antes era da energia elétrica.</dd></div><div><dt>${ic('escudo')}Qualidade</dt><dd>Instalação cuidadosa e manutenção feita por quem entende.</dd></div></dl>
  </div>
</section>
${como}
<section class="parc-b"><div class="in"><p class="sobre-t">Clientes parceiros</p>${parceirosFaixa('parc-b-lista')}</div></section>
` + rodape(v);

  pag.solucoes = head(v, 'solucoes', 'Soluções em aquecimento', 'Placas solares, aquecedores de piscina e chuveiro, projetos residenciais e industriais em Sorocaba e região.') + topo(v, 'solucoes') + subtopo('Soluções', 'Placas solares, aquecedores e piscinas aquecidas', 'Instalação, manutenção e projetos completos, do chuveiro da sua casa à central de água quente da sua empresa.') + `
<nav class="ancoras in" aria-label="Soluções">${servicos.map(s => `<a href="#${s.slug}">${ic(s.icone)}${s.nome}</a>`).join('')}</nav>
${servicos.map((s, i) => `<section id="${s.slug}" class="sol-b-linha in${i % 2 ? ' inv' : ''}">
  <figure class="sobe">${img(s.foto, s.nome)}</figure>
  <div class="sobe"><p class="sobre-t">0${i + 1}</p><h2>${s.nome}</h2><p>${s.texto}</p><ul class="lista-check">${s.mais.map(m => `<li>${ic('check')}${m}</li>`).join('')}</ul><a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.nome.toLowerCase()}.`)}" target="_blank" rel="noopener">Pedir orçamento de ${s.nome.toLowerCase()} ${ic('seta')}</a></div>
</section>`).join('')}
${cta}
` + rodape(v);

  pag.obras = head(v, 'obras', 'Galeria de instalações', 'Fotos de placas solares, piscinas aquecidas e reservatórios instalados pela W.A.S. Aquecimentos.') + topo(v, 'obras') + subtopo('Galeria', 'Instalações W.A.S.', 'Placas solares, piscinas aquecidas e reservatórios. Clique para ampliar.') + `
<section class="gal-b in">${galeriaGrade('mosaico mosaico-todo')}</section>
${cta}
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Fale com a W.A.S. Aquecimentos: ${E.fones.join(', ')}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + subtopo('Contato', 'Vamos aquecer sua casa, piscina ou empresa', 'Responda pelo formulário e a mensagem chega pronta no nosso WhatsApp.') + `
<section class="contato-b in">
  <div class="contato-b-form">${formulario()}</div>
  <div>${contatoBloco()}${mapaFrame}</div>
</section>
<section class="regiao-b"><div class="in regiao-b-in"><img src="/assets/img/regiao-sorocaba.webp" alt="Mapa da região de Sorocaba" width="600" height="502" loading="lazy"><div><p class="sobre-t">Onde atendemos</p><h2>Sorocaba e região</h2><p>Atendemos Sorocaba e as cidades vizinhas. Fale com a gente para confirmar a sua cidade.</p></div></div></section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#c67f2a', fundo: '#141210', claro: '#f6f2ec',
  fonteTitulo: 'Roboto,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site atual: topo preto com o brasão e os telefones, a faixa com o slogan, as fotos em destaque e os quadros cor de bronze, agora com páginas próprias e acabamento novo.', pontos: ['Mesma ordem: fotos, quem somos, soluções, galeria, parceiros e contato', 'Contato que chega pronto no WhatsApp', 'Mapa da região de Sorocaba no rodapé'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna: a foto da piscina aquecida na abertura, os números da empresa em destaque e um passo a passo de como o aquecimento solar funciona.', pontos: ['+50 anos e +700 equipamentos logo no início', 'Como funciona: do telhado ao chuveiro', 'Galeria em mosaico com as obras reais'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
