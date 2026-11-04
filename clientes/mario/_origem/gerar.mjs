// Metalúrgica Mário (Cachoeirinha/RS), usinagem de peças industriais, automotivas e agrícolas. Gera public/{a,b}/ e a página de escolha.
// node clientes/mario/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mario https://metalurgicamario.com.br/)
// Site atual (Mobirise, uma página só) tem pouco texto e quase nenhuma foto própria: as fotos de produto dão 404.
// Fotos próprias: fabrica e fresamento-faiscas (banner). As demais são CC0 (rawpixel via Openverse), listadas no LEIA-ME.
// A empresa não divulga WhatsApp: o formulário abre o e-mail (form data-email no site.js).
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Metalúrgica Mário', url: 'https://mario.overtus.com.br/', antigo: 'https://metalurgicamario.com.br/',
  fone1: '(51) 3470-1221', fone2: '(51) 3470-5597', email: 'mm.mario@metalurgicamario.com.br',
  rua: 'Av. Fernando Ferrari, 1840', bairro: 'Vila Regina', cidade: 'Cachoeirinha - RS', cep: '94935-800',
  linkedin: 'https://www.linkedin.com/company/metal-rgica-m-rio-usimit/',
  curto: 'Usinagem de peças para equipamentos industriais, automotivos e agrícolas, com produção organizada em Kanban. Em Cachoeirinha desde 1986.',
};
const historia = [
  'A Metalúrgica Mário iniciou suas atividades em 9 de junho de 1986. Nestes anos de esforço, sedimentou na sua cultura o conceito de qualidade e produtividade, que é hoje o nosso orgulho.',
  'Especializada em usinagem de peças para equipamentos industriais, automotivos e agrícolas, a empresa adota o sistema Kanban nas suas operações.',
  'Em 2008 a Metalúrgica Mário criou a Usimit, para atender o aumento da demanda na prestação de serviços de usinagem.',
  'Atenta às exigências do mercado e dos clientes, certificou o seu Sistema de Gestão da Qualidade na norma internacional ISO 9001.',
];
const segmentos = [
  { ic: 'fabrica', t: 'Industrial', d: 'Peças usinadas para máquinas e equipamentos industriais.' },
  { ic: 'carro', t: 'Automotivo', d: 'Componentes usinados para a cadeia automotiva.' },
  { ic: 'trator', t: 'Agrícola', d: 'Peças para implementos e máquinas agrícolas.' },
];
const equipamentos = [
  { foto: 'torno-operadora', t: 'Torno e fresa', d: 'Torneamento e fresamento de peças em série e sob encomenda.' },
  { foto: 'fresamento', t: 'Centro de usinagem', d: 'Usinagem em centro de usinagem para peças com várias operações em uma só fixação.' },
  { foto: 'esmerilhamento', t: 'Retífica', d: 'Acabamento por retífica para medidas e superfícies de precisão.' },
];
const marcos = [['1986', 'Início das atividades, em 9 de junho'], ['Kanban', 'Produção puxada pela demanda do cliente'], ['2008', 'Criação da Usimit, para serviços de usinagem'], ['ISO 9001', 'Sistema de Gestão da Qualidade certificado']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'usinagem', nome: 'Usinagem e equipamentos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Oficina Azul', b: 'Série' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@500;700;900&family=Red+Hat+Text:wght@400;500;700&family=Sofia+Sans+Condensed:wght@600;700;800&family=Sofia+Sans:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const mail = (assunto = 'Pedido de orçamento pelo site') => `mailto:${E.email}?subject=${encodeURIComponent(assunto)}`;
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#ffffff', b: '#0c1a33' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Usinagem de peças em Cachoeirinha desde 1986` : `${titulo} | Metalúrgica Mário`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Segmento<select name="segmento">${segmentos.map(s => `<option>${s.t}</option>`).join('')}</select></label></div>
  <label>Peça e quantidade<textarea name="mensagem" rows="4" placeholder="Descreva a peça, o material, a quantidade e a frequência de entrega. Se tiver desenho, anexe no e-mail."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}. Prefere ligar? ${E.fone1}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('linkedin')}<div><strong>LinkedIn</strong><a href="${E.linkedin}" ${ext}>Metalúrgica Mário / Usimit</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Metalúrgica Mário" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Av. Fernando Ferrari, 1840, Vila Regina, Cachoeirinha RS, 94935-800')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Metalúrgica Mário, página inicial">${img(v === 'a' ? 'logo-horizontal' : 'logo-horizontal-branco', 'Metalúrgica Mário', ' loading="eager" width="270" height="68"')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a>
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
    <div class="rod-marca">${img('logo-horizontal-branco', 'Metalúrgica Mário')}<p>Usinagem de peças industriais, automotivas e agrícolas desde 1986.</p><p class="redes"><a href="${E.linkedin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Metalúrgica Mário. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Quem somos', historia[0]) + topo(v, 'empresa') + cab('Quem somos', 'Desde 9 de junho de 1986.', 'fabrica') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure class="logo-grande">${img('logo', 'Logo da Metalúrgica Mário')}</figure></section>
<section class="marcos">${marcos.map(m => `<div class="sobe"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</section>
<section class="segs"><h2>Para quem fazemos</h2><div>${segmentos.map(s => `<article class="sobe">${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section></div>
` + rodape(v);
  pag.usinagem = head(v, 'usinagem', 'Usinagem e equipamentos', 'Torno e fresa, centro de usinagem e retífica para peças industriais, automotivas e agrícolas, com produção em Kanban.') + topo(v, 'usinagem') + cab('Usinagem e equipamentos', 'Torno, fresa, centro de usinagem e retífica.', 'fresamento-faiscas') + `
<div class="in"><section class="equips">${equipamentos.map(e => `<article class="equip sobe"><figure>${img(e.foto, e.t)}</figure><div><h2>${e.t}</h2><p>${e.d}</p></div></article>`).join('')}</section>
<section class="kanban"><div><h2>Produção em Kanban</h2><p>${historia[1]} O Kanban organiza a produção pela necessidade do cliente: as peças são feitas no ritmo do consumo, com estoque controlado e entregas regulares.</p></div><div><h2>Usimit</h2><p>${historia[2]}</p></div></section>
<section class="cta-faixa"><h2>Quer saber mais?</h2><p>Mande o desenho e a quantidade para o nosso e-mail ou ligue.</p><p class="bts"><a class="btn" href="${mail()}">${ic('mail')}Enviar e-mail</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Metalúrgica Mário: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Ficou com alguma dúvida? Entre em contato.', 'cavacos') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('fresamento-faiscas', 'Fresamento de peça metálica', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Cachoeirinha/RS · desde 1986</p><h1>Usinagem de peças para a indústria, o automóvel e o campo.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'usinagem')}">Equipamentos</a></p></div></section>
<section class="in segs-a"><div class="cards">${segmentos.map(s => `<article class="card sobe">${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div></section>
<section class="in sobre-a"><figure>${img('fabrica', 'Fábrica da Metalúrgica Mário')}</figure><div><p class="k">Quem somos</p><h2>Qualidade e produtividade como cultura, há 40 anos</h2><p>${historia[0]}</p><p>${historia[2]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div></section>
<section class="equip-a"><div class="in"><header class="tit"><p class="k">Equipamentos</p><h2>Torno, fresa, centro de usinagem e retífica</h2></header><div class="equip-grade">${equipamentos.map(e => `<a class="sobe" href="${link(v, 'usinagem')}"><figure>${img(e.foto, e.t)}</figure><h3>${e.t}</h3><p>${e.d}</p></a>`).join('')}</div></div></section>
<section class="in marcos-a">${marcos.map(m => `<div class="sobe"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</section>
<section class="cta-a"><div class="in"><div><h2>Quero saber mais informações</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a class="btn btn-linha" href="${mail()}">${ic('mail')}E-mail</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Usinagem em série · Kanban · ISO 9001</p><h1>Peças usinadas no ritmo da sua linha.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="link-seta" href="${link(v, 'usinagem')}">Como trabalhamos ${ic('seta')}</a></p></div><div class="hero-b-fotos">${img('torno-universal', 'Torno em operação', ' loading="eager" fetchpriority="high"')}${img('fresa-cavacos', 'Fresa e cavacos', ' loading="eager"')}</div></div></section>
<section class="marcos-b"><div class="in">${marcos.map(m => `<div class="sobe"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</div></section>
<section class="in segs-b"><header class="tit-b"><p class="k">Segmentos</p><h2>Industrial, automotivo e agrícola</h2></header><ol>${segmentos.map((s, i) => `<li class="sobe"><span class="num">0${i + 1}</span>${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol></section>
<section class="kanban-b"><div class="in kanban-in"><div><p class="k">Kanban</p><h2>Produção puxada pelo consumo do cliente</h2><p>A Metalúrgica Mário adota o sistema Kanban nas suas operações: as peças são produzidas no ritmo do consumo, com estoque controlado e entregas regulares.</p></div><ol class="quadro"><li><b>Pedido</b><span>O cliente sinaliza o consumo</span></li><li><b>Produção</b><span>Torno, fresa, centro e retífica</span></li><li><b>Entrega</b><span>Lote no prazo combinado</span></li></ol></div></section>
<section class="in equip-b"><header class="tit-b"><p class="k">Equipamentos</p><h2>Do torno à retífica</h2></header><div class="equip-grade">${equipamentos.map(e => `<article class="sobe"><figure>${img(e.foto, e.t)}</figure><h3>${e.t}</h3><p>${e.d}</p></article>`).join('')}</div></section>
<section class="in sobre-b"><figure>${img('fabrica', 'Fábrica da Metalúrgica Mário')}</figure><div><p class="k">Desde 1986</p><h2>Metalúrgica Mário e Usimit</h2><p>${historia[0]}</p><p>${historia[2]}</p><a class="link-seta" href="${link(v, 'empresa')}">Quem somos ${ic('seta')}</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Metalúrgica Mário', artigo: 'da', url: E.url, lang: 'pt', cor: '#0c346c', fundo: '#0c1a33', claro: '#f1f4f9',
  fonteTitulo: "'Red Hat Display',system-ui,sans-serif", fonteTexto: "'Red Hat Text',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, com o azul do logo: usinagem em destaque na abertura, os três segmentos atendidos e os equipamentos em cartões.', pontos: ['Industrial, automotivo e agrícola', 'Torno, fresa, centro de usinagem e retífica', 'Contato direto por telefone e e-mail'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Azul-marinho escuro e técnico, com o Kanban como argumento: peças no ritmo da linha do cliente.', pontos: ['"Peças usinadas no ritmo da sua linha"', 'Kanban explicado em três passos', 'Marcos: 1986, Usimit em 2008, ISO 9001'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
