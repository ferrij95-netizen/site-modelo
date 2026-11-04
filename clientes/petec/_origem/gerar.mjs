// Metalúrgica PETEC (São Leopoldo/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/petec/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs petec https://petecrs.com.br/)
// Textos das páginas do site atual (WordPress); fotos de /wp-json/wp/v2/media. Logo refeito em SVG (o original só existe com 150 px).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const LOGO = `<svg class="logo-svg" viewBox="0 0 150 81" role="img" aria-label="PETEC"><rect width="150" height="81" fill="#ed1b23"/><ellipse cx="75" cy="41" rx="67" ry="33" fill="#fff"/><text x="75" y="52" text-anchor="middle" font-family="'Archivo Black',Arial Black,Arial,sans-serif" font-weight="900" font-size="31" fill="#ed1b23" letter-spacing="1">PETEC</text></svg>`;
const E = {
  nome: 'Metalúrgica PETEC', url: 'https://petec.overtus.com.br/', antigo: 'https://petecrs.com.br/',
  wa: '5551993106960', cel1: '(51) 99310-6960', cel2: '(51) 99221-6057', fixo1: '(51) 3588-6959', fixo2: '(51) 3589-1022', tecnico: '(51) 99222-0574', email: 'petec@petecrs.com.br',
  rua: 'Rua Augusto Helmuth Kuhn, 251 (antiga Rua Quatro)', bairro: 'Distrito Industrial Málaga, Fazenda São Borja', cidade: 'São Leopoldo - RS', cep: '93044-826',
  horario: 'Segunda a sexta, 7h30 às 12h e 13h10 às 17h28',
  curto: 'Matrizes de extrusão e coextrusão, usinagem sob encomenda, máquinas especiais e manutenção industrial. Sede própria em São Leopoldo desde 1998.',
};
const historia = [
  'A Petec foi fundada em 1996, em Bom Princípio/RS, sempre no ramo metalmecânico. Em 1998 mudou para a sede própria em São Leopoldo, na região metropolitana de Porto Alegre, a 25 km do Aeroporto Internacional Salgado Filho, onde está até hoje.',
  'No início, o principal cliente foi a alemã Barmag S/A Máquinas Industriais, destaque no ramo de coextrusão. Em 2006, com o fechamento da fábrica da Barmag no Brasil, a Petec passou a fabricar e dar suporte técnico seguindo o padrão e a qualidade das ferramentas planas e matrizes de coextrusão oferecidas até então pela Barmag.',
];
const missao = 'Oferecer produtos e soluções diferenciadas em matrizes de extrusão e usinagem com perfeição e qualidade, em um processo ágil, adequando-se às necessidades específicas, promovendo o crescimento da empresa, dos clientes e da sociedade de forma sustentável.';
const visao = 'Ser reconhecida como empresa referência no desenvolvimento de soluções para extrusão e usinagem.';
const servicos = [
  { id: 'extrusao', ic: 'engrenagem', foto: '13', t: 'Matrizes de extrusão e coextrusão', d: 'Fabricação e reforma de moldes e matrizes para extrusão e coextrusão, com o projeto adaptado à necessidade do cliente.' },
  { id: 'usinagem', ic: 'fabrica', foto: '07', t: 'Usinagem sob encomenda', d: 'Usinagem 3D, leve e pesada, seriada e especial, com centros de usinagem, tornos CNC e eletroerosão.' },
  { id: 'maquinas', ic: 'chave', foto: '33', t: 'Máquinas especiais', d: 'Projetos especiais que envolvem mecânica, elétrica e usinagem, além de dispositivos.' },
  { id: 'manutencao', ic: 'escudo', foto: '22', t: 'Manutenção industrial', d: 'Melhorias em máquinas e processos que já existem na sua empresa: modificações mecânicas, reparos e peças de reposição.' },
];
const linhaExtrusao = ['Ferramentas de extrusão e coextrusão para 3, 5, 7 e 9 camadas', 'Ferramenta plana tipo flat die para extrusão de ráfia', 'Ferramenta plana tipo flat die e fieira para TNT (melt blown)', 'Ferramenta plana para laminação', 'Ferramenta plana para extrusão de chapa e de perfil', 'Filtros (raquete, gaveta e contínuo)', 'Filtros contínuos troca-tela para extrusora', 'Bomba de engrenagem', 'Anel de ar automático', 'Calandras até Ø 400 mm x 3.000 mm, adaptadas ao projeto', 'Fabricação e reforma de matrizes para embalagem plástica'];
const linhaUsinagem = ['Usinagem 3D, leve e pesada', 'Máquinas e peças especiais', 'Usinagem especial', 'Usinagem seriada', 'Dispositivos'];
const parque = [
  ['1', 'Centro de usinagem vertical tipo portal', 'Leaderway LX2210', 'X 2200 · Y 950 · Z 900'],
  ['1', 'Centro de usinagem vertical', 'Maxmill VMC 1470', 'X 1470 · Y 800 · Z 750 · 4º eixo 12"'],
  ['1', 'Centro de usinagem vertical', 'Hardford LG 1000', 'X 1000 · Y 500 · Z 600 · 4º eixo 8"'],
  ['2', 'Centros de usinagem verticais', 'Hardford LG 1000', 'X 1000 · Y 500 · Z 600'],
  ['1', 'Centro de usinagem vertical', 'Hardford LG 500', 'X 500 · Y 400 · Z 500 · 4º eixo 6"'],
  ['2', 'Tornos CNC horizontais', 'Feeler FTC 350 L', 'volteio 600 · torneável 350 · Z 700'],
  ['1', 'Torno CNC horizontal', 'Synitron LT-52', 'volteio 520 · torneável 300 · Z 550'],
  ['2', 'Fresadoras ferramenteiras', 'Sunlike, digital em 2 eixos', '400 x 400 x 700'],
  ['1', 'Torno mecânico', 'Clever', 'volteio 640 · 5,0 m entre pontos'],
  ['1', 'Torno mecânico', 'Clever', 'volteio 460 · 1,5 m entre pontos'],
  ['1', 'Eletroerosão', 'Engemaq', 'X 600 · Y 250 · Z 200'],
  ['1', 'Eletroerosão a fio', 'ACTSPARK', 'X 350 · Y 250 · Z 250'],
  ['1', 'Tridimensional manual', 'Mitutoyo M574', 'X 400 · Y 600 · Z 300'],
  ['1', 'Retífica plana', '', '600 x 300'],
  ['1', 'Serra fita', '', 'Ø até 240'],
  ['1', 'Afiadora de ferramentas', '', ''],
];
const galeria = ['03', '04', '06', '07', '12', '13', '14', '15', '17', '18', '19', '21', '22', '24', '25', '26', '28', '29', '30', '32', '33'];
const selos = [['sindimetal', 'Sindimetal'], ['valemetalsinos', 'Valemetalsinos'], ['fiergs', 'FIERGS'], ['acis-sl', 'ACIS São Leopoldo'], ['acist-sl', 'ACIST São Leopoldo'], ['metalvalley', 'MetalValley'], ['sebrae', 'SEBRAE']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'produtos', nome: 'Produtos e serviços' }, { slug: 'parque-fabril', nome: 'Parque fabril' }, { slug: 'galeria', nome: 'Galeria' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Matriz', b: 'Ficha Técnica' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700;800&family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const g = (n, alt = 'Peça fabricada pela PETEC', extra = '') => img('galeria/' + n, alt, extra);
const wa = (m = 'Olá! Vim pelo site da PETEC e gostaria de um orçamento.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#16181b', b: '#ffffff' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Matrizes de extrusão e usinagem em São Leopoldo` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const tabelaParque = () => `<div class="tabela-rola"><table class="parque"><thead><tr><th>Qtd.</th><th>Equipamento</th><th>Marca / modelo</th><th>Curso / capacidade (mm)</th></tr></thead><tbody>${parque.map(p => `<tr><td>${p[0]}</td><td>${p[1]}</td><td>${p[2] || '-'}</td><td>${p[3] || '-'}</td></tr>`).join('')}</tbody></table></div><p class="nota-tab">Linha completa de instrumentos de medição até 1.000 mm e ferramentas diversas: machos, brocas, fresas, alargadores, bailarina.</p>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}</select></label></div>
  <label>Descreva a peça ou o problema<textarea name="mensagem" rows="4" placeholder="Material, medidas, quantidade, número de camadas da matriz..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Tem desenho técnico? Envie também para ${E.email}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Celulares e WhatsApp</strong><a href="${wa()}" ${ext}>${E.cel1}</a><a href="${telHref(E.cel2)}">${E.cel2}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones fixos</strong><a href="${telHref(E.fixo1)}">${E.fixo1}</a><a href="${telHref(E.fixo2)}">${E.fixo2}</a></div></li>
  <li>${ic('chave')}<div><strong>Departamento técnico</strong><a href="${telHref(E.tecnico)}">${E.tecnico}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da PETEC" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Helmuth Kuhn, 251, São Borja, São Leopoldo RS')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-barra"><div class="in"><span>${ic('relogio')}${E.horario}</span><a href="${telHref(E.fixo1)}">${ic('tel')}${E.fixo1}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${LOGO}<span>Metalúrgica</span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Orçamento</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-selos"><span>Parceiros</span><ul>${selos.map(s => `<li>${img('selos/' + s[0], s[1])}</li>`).join('')}</ul></div>
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO}<p>Soluções em extrusão e usinagem desde 1996.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.cel1}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fixo1)}">${E.fixo1}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Metalúrgica PETEC Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A empresa', historia[0]) + topo(v, 'empresa') + cab('A empresa', 'Desde 1996 no ramo metalmecânico.', 'fabrica') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p>Contamos com todos os equipamentos e técnicos necessários para produção e controle de qualidade. O compromisso de assegurar a satisfação plena dos clientes faz da PETEC uma empresa séria e sólida, com amplo conhecimento no mercado em que atua.</p></div><figure>${img('homenagem-20-anos', 'Homenagem pelos 20 anos da PETEC')}<figcaption>Homenagem pelos 20 anos da PETEC.</figcaption></figure></section>
<section class="mv"><div class="sobe"><h2>Missão</h2><p>${missao}</p></div><div class="sobe"><h2>Visão</h2><p>${visao}</p></div></section>
<section class="tempo"><h2>Linha do tempo</h2><ol>${[['1996', 'Fundação em Bom Princípio/RS'], ['1998', 'Sede própria em São Leopoldo'], ['2006', 'Assume a fabricação e o suporte das ferramentas no padrão Barmag'], ['2016', '20 anos, marca consolidada no mercado']].map(t => `<li class="sobe"><b>${t[0]}</b><p>${t[1]}</p></li>`).join('')}</ol></section>
<section class="trabalhe"><div><h2>Trabalhe conosco</h2><p>Quer fazer parte da equipe? Envie seu currículo para <a href="mailto:${E.email}?subject=Currículo">${E.email}</a>.</p></div></section></div>
` + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos e serviços', 'Ferramentas de extrusão e coextrusão de 3 a 9 camadas, flat die, filtros troca-tela, bomba de engrenagem, calandras e usinagem sob encomenda.') + topo(v, 'produtos') + cab('Produtos e serviços', 'Matrizes, usinagem, máquinas especiais e manutenção.', '13') + `
<div class="in"><section class="servs">${servicos.map(s => `<article class="serv sobe" id="${s.id}"><figure>${g(s.foto, s.t)}</figure><div>${ic(s.ic)}<h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="linhas"><div class="sobe"><h2>Linha extrusão, coextrusão e laminação</h2>${lista(linhaExtrusao)}</div><div class="sobe"><h2>Linha de usinagem sob encomenda</h2>${lista(linhaUsinagem)}<figure>${g('17', 'Rosca usinada')}</figure></div></section>
<section class="cta-faixa"><h2>Tem um projeto ou uma peça para reformar?</h2><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Falar com a PETEC</a><a class="btn btn-linha" href="${telHref(E.tecnico)}">${ic('tel')}Departamento técnico</a></p></section></div>
` + rodape(v);
  pag['parque-fabril'] = head(v, 'parque-fabril', 'Parque fabril', 'Centros de usinagem verticais, tornos CNC, eletroerosão a fio, tridimensional Mitutoyo e fresadoras ferramenteiras na PETEC.') + topo(v, 'parque-fabril') + cab('Parque fabril', 'Equipamentos próprios para produzir e medir.', 'fabrica') + `
<div class="in"><section class="parque-sec"><p class="intro">A PETEC investe em tecnologia e equipamentos para garantir a qualidade dos serviços. Tudo é produzido e controlado dentro de casa.</p>${tabelaParque()}</section>
<section class="fotos-parque">${['07', '29', '30', '24'].map(n => `<a href="/assets/img/galeria/${n}.webp" data-foto>${g(n)}</a>`).join('')}</section></div>
` + rodape(v);
  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos de matrizes de extrusão, ferramentas planas, roscas e peças usinadas pela PETEC.') + topo(v, 'galeria') + cab('Galeria', 'Peças que saíram da nossa fábrica.', '28') + `
<div class="in"><section class="galeria">${galeria.map(n => `<a class="sobe" href="/assets/img/galeria/${n}.webp" data-foto data-legenda="Peça fabricada pela PETEC">${g(n)}</a>`).join('')}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Metalúrgica PETEC: ${E.rua}, ${E.cidade}. Telefones ${E.fixo1} e ${E.cel1}. ${E.horario}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a METALÚRGICA PETEC.', '15') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${foto.length > 3 ? img(foto, '', ' loading="eager"') : g(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('destaque', 'Matriz de extrusão fabricada pela PETEC', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Metalúrgica · São Leopoldo/RS · desde 1996</p><h1>Soluções em extrusão e usinagem</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos e serviços</a></p></div></section>
<section class="numeros-a"><div class="in"><ul><li><b>1996</b><span>fundação</span></li><li><b>3 a 9</b><span>camadas nas matrizes de coextrusão</span></li><li><b>2.200 mm</b><span>curso X do maior centro de usinagem</span></li><li><b>25 km</b><span>do Aeroporto Salgado Filho</span></li></ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">O que fazemos</p><h2>Quatro frentes, uma fábrica</h2></header><div class="cards">${servicos.map(s => `<a class="card sobe" href="${link(v, 'produtos')}#${s.id}"><figure>${g(s.foto, s.t)}</figure><div>${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></div></a>`).join('')}</div></section>
<section class="barmag-a"><div class="in barmag-in"><figure>${g('22', 'Matriz de coextrusão pronta para entrega')}</figure><div><p class="k">Padrão Barmag</p><h2>Ferramentas planas e matrizes de coextrusão com o padrão de quem ensinou o mercado</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></div></section>
<section class="in galeria-a"><header class="tit"><p class="k">Galeria</p><h2>Qualidade e tecnologia</h2></header><div class="mosaico">${['12', '18', '26', '30', '04', '28'].map((n, i) => `<a class="m${i + 1}" href="/assets/img/galeria/${n}.webp" data-foto>${g(n)}</a>`).join('')}</div><a class="link-seta" href="${link(v, 'galeria')}">Ver todas as fotos ${ic('seta')}</a></section>
<section class="cta-a"><div class="in"><div><h2>Fale com a METALÚRGICA PETEC</h2><p>${E.horario}</p></div><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.cel1}</a><a class="btn btn-linha" href="${telHref(E.fixo1)}">${ic('tel')}${E.fixo1}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${foto.length > 3 ? img(foto, '', ' loading="eager"') : g(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">// Extrusão · Coextrusão · Usinagem</p><h1>Matrizes de 3 a 9 camadas, feitas e reformadas em São Leopoldo.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Enviar projeto</a><a class="link-seta" href="${link(v, 'parque-fabril')}">Ver parque fabril ${ic('seta')}</a></p></div><figure class="hero-b-foto">${g('13', 'Matriz de coextrusão', ' loading="eager" fetchpriority="high"')}<figcaption><span>Ref.</span> Matriz de coextrusão · PETEC</figcaption></figure></div></section>
<section class="in specs-b"><ol>${servicos.map((s, i) => `<li class="sobe"><span class="cod">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p><a class="link-seta" href="${link(v, 'produtos')}#${s.id}">Detalhes ${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="extr-b"><div class="in extr-b-in"><div><p class="k">// Linha extrusão</p><h2>O que sai da nossa bancada</h2>${lista(linhaExtrusao.slice(0, 8))}<a class="btn" href="${link(v, 'produtos')}">Linha completa</a></div><div class="extr-fotos">${['04', '06', '19', '26'].map(n => `<a href="/assets/img/galeria/${n}.webp" data-foto>${g(n)}</a>`).join('')}</div></div></section>
<section class="in parque-b"><header class="tit-b"><p class="k">// Parque fabril</p><h2>Ficha técnica da fábrica</h2></header>${tabelaParque()}</section>
<section class="in historia-b"><figure>${img('fabrica', 'Fábrica da PETEC')}</figure><div><p class="k">// Desde 1996</p><h2>Do padrão Barmag à referência em extrusão</h2><p>${historia[0]}</p><a class="link-seta" href="${link(v, 'empresa')}">A empresa ${ic('seta')}</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'PETEC', artigo: 'da', url: E.url, lang: 'pt', cor: '#ed1b23', fundo: '#16181b', claro: '#f3f4f5',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Archivo,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Grafite e aço com o vermelho do logo: as peças usinadas em destaque, os números da fábrica e a história ligada ao padrão Barmag.', pontos: ['Quatro frentes: matrizes, usinagem, máquinas especiais e manutenção', 'Parque fabril em tabela, com cursos de cada máquina', 'Galeria com 21 fotos de peças reais'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Clara e técnica, como uma ficha de engenharia: fonte mono nos dados, a linha de extrusão logo na abertura e a tabela de máquinas na página inicial.', pontos: ['"Matrizes de 3 a 9 camadas"', 'Ficha técnica da fábrica na home', 'Orçamento com descrição da peça e desenho por e-mail'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
