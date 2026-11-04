// Wilaplast (Novo Hamburgo/RS e Russas/CE), injetados termoplásticos para calçados. Gera public/{a,b}/ e a página de escolha.
// node clientes/wilaplast/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs wilaplast https://www.wilaplast.com.br/)
// Textos e fotos do site atual (uma página só). As fotos da fábrica são quadros do vídeo institucional do site (wilabanner.mp4), que também foi reaproveitado comprimido.
// Sem WhatsApp no site atual: o formulário abre o e-mail contato@wilaplast.com.br (form data-email no site.js).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const LOGO = fs.readFileSync(path.join(aqui, 'logo.svg'), 'utf8').replace(/<svg [^>]*viewBox="([^"]+)">/, '<svg class="logo-svg" viewBox="$1" fill="currentColor" role="img" aria-label="Wilaplast">');
const E = {
  nome: 'Wilaplast', razao: 'Wilaplast Indústria de Injetados Ltda', url: 'https://wilaplast.overtus.com.br/', antigo: 'https://www.wilaplast.com.br/',
  fone: '(51) 3587-1200', email: 'contato@wilaplast.com.br',
  rua: 'Rua Miranda, 880', bairro: 'Bairro Liberdade', cidade: 'Novo Hamburgo - RS', cep: '93330-290',
  curto: 'Componentes injetados em termoplástico para calçados: saltos, tacos, solas, anabelas e palmilhas, além de peças técnicas. Desde 1984, com fábricas em Novo Hamburgo (RS) e Russas (CE).',
};
const historia = [
  'A Wilaplast iniciou suas atividades em 9 de outubro de 1984, num pequeno prédio, prestando serviço de mão de obra na área de injetados plásticos.',
  'Em 1991, com a entrada de um novo sócio e para atender uma demanda crescente, passou a industrializar componentes injetados para calçados: saltos, tacos, solas e cepas. A empresa cresceu e formou uma equipe especializada, que age com eficácia e agilidade para garantir a qualidade dos produtos e serviços.',
  'Em dezembro de 2008, Mauro deu continuidade ao trabalho sozinho, mantendo o nome que o mercado já conhecia. A Wilaplast também trabalha com equipes terceirizadas, para atender melhor as exigências de um mercado competitivo e em constante mudança.',
  'Hoje a empresa tem duas unidades: uma em Novo Hamburgo, no Rio Grande do Sul, e outra em Russas, no Ceará.',
];
const missao = 'Fornecer tecnologia em termoinjetados, priorizando a qualidade, com eficiência para as partes interessadas.';
const visao = 'Ser referência no mercado de termoinjetados, entre as três melhores do estado, e ter a marca reconhecida em nível nacional, com aumento da produtividade e crescimento lucrativo.';
const linhas = [
  { id: 'saltos', t: 'Saltos', d: 'Saltos injetados em vários formatos e alturas, do salto fino ao bloco, prontos para revestimento ou acabamento.', fotos: ['salto-2', 'salto-3', 'salto-1', 'salto-4', 'salto-5', 'salto-6'] },
  { id: 'tacos', t: 'Tacos', d: 'Tacos com pino para saltos femininos, em diversas cores e formatos de base.', fotos: ['taco-1', 'taco-2', 'taco-3', 'taco-4', 'taco-5', 'taco-6'] },
  { id: 'solas', t: 'Solas', d: 'Solas e meias-solas injetadas, com texturas e desenhos de piso variados.', fotos: ['sola-1', 'sola-4', 'sola-2', 'sola-3', 'sola-5', 'sola-6'] },
  { id: 'anabelas', t: 'Anabelas', d: 'Bases anabela injetadas, leves e prontas para revestir.', fotos: ['anabela-1', 'anabela-2'] },
  { id: 'palmilhas', t: 'Palmilhas', d: 'Palmilhas de montagem injetadas, com a cambreira do salto.', fotos: ['palmilha-1', 'palmilha-2'] },
  { id: 'outros', t: 'Peças técnicas e outros', d: 'Peças técnicas em termoplástico e outros produtos, como tampos de garrafa.', fotos: ['tampo-1', 'tampo-3', 'tampo-2', 'granulado'] },
];
const fabrica = [['linha', 'Linha de produção'], ['acabamento', 'Acabamento de peças'], ['saltos-pilha', 'Saltos injetados'], ['solas-pilha', 'Solas prontas'], ['prensa', 'Corte na prensa'], ['corte-verde', 'Peças recém-injetadas'], ['almoxarifado', 'Estoque e expedição'], ['embalagem', 'Peças embaladas'], ['aerea-2', 'Vista aérea de uma das unidades']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'fabrica', nome: 'Fábrica' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Mostruário', b: 'Linha de Produção' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:ital,wght@0,600;0,700;1,700;1,800&family=Figtree:wght@400;500;600&family=Bai+Jamjuree:wght@500;600;700&family=Hanken+Grotesk:wght@400;500;600&display=swap';
const cores = { a: '#ffffff', b: '#151714' };
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const mail = (assunto = 'Contato pelo site') => `mailto:${E.email}?subject=${encodeURIComponent(assunto)}`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Injetados para calçados em Novo Hamburgo/RS` : `${titulo} | Wilaplast`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const video = (cls) => `<video class="${cls}" autoplay muted loop playsinline preload="metadata" poster="/assets/img/poster.webp" aria-hidden="true"><source src="/assets/video/fabrica.mp4" type="video/mp4"></video>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Produto<select name="produto">${linhas.map(l => `<option>${l.t}</option>`).join('')}</select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Modelo, quantidade, cor e prazo. Se tiver referência ou amostra, conte aqui."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}. Prefere ligar? ${E.fone}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade} · CEP ${E.cep}</span></div></li>
  <li>${ic('fabrica')}<div><strong>Unidades</strong><span>Novo Hamburgo (RS) e Russas (CE)</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Wilaplast" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Miranda, 880, Novo Hamburgo RS')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Wilaplast, página inicial">${LOGO}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO}<p>Injetados termoplásticos para calçados desde 1984.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Wilaplast. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', historia[0]) + topo(v, 'empresa') + cab('Empresa', 'Desde 1984 fazendo injetados para calçados.', 'acabamento') + `
<div class="in">
<section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('linha', 'Linha de produção da Wilaplast')}<figcaption>Linha de produção (quadro do vídeo institucional).</figcaption></figure></section>
<section class="marcos">${[['1984', 'Início, prestando serviço de mão de obra em injetados plásticos'], ['1991', 'Novo sócio e produção própria de saltos, tacos, solas e cepas'], ['2008', 'Mauro segue à frente da empresa, mantendo o nome'], ['Hoje', 'Unidades em Novo Hamburgo (RS) e Russas (CE)']].map(m => `<div class="sobe"><b>${m[0]}</b><p>${m[1]}</p></div>`).join('')}</section>
<section class="mvv"><div class="sobe"><h2>Missão</h2><p>${missao}</p></div><div class="sobe"><h2>Visão</h2><p>${visao}</p></div></section>
</div>
` + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos', 'Saltos, tacos, solas, anabelas, palmilhas e peças técnicas injetadas em termoplástico.') + topo(v, 'produtos') + cab('Produtos', 'Saltos, tacos, solas, anabelas, palmilhas e peças técnicas.', 'saltos-pilha') + `
<div class="in">
<nav class="filtros" aria-label="Linhas de produto">${linhas.map(l => `<a href="#${l.id}">${l.t}</a>`).join('')}</nav>
${linhas.map(l => `<section class="linha-prod" id="${l.id}"><header><h2>${l.t}</h2><p>${l.d}</p><a class="link-seta" href="${mail('Orçamento: ' + l.t)}">Pedir orçamento ${ic('seta')}</a></header><div class="vitrine">${l.fotos.map((f, i) => `<a class="sobe" href="/assets/img/${f}.webp" data-foto data-legenda="${esc(l.t)}">${img(f, `${l.t}, modelo ${i + 1}`)}</a>`).join('')}</div></section>`).join('\n')}
<section class="cta-faixa"><h2>Procura outro modelo?</h2><p>Fale com a Wilaplast sobre o componente que você precisa.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('mail')}Enviar mensagem</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></section>
</div>
` + rodape(v);
  pag.fabrica = head(v, 'fabrica', 'Fábrica', 'Estrutura da Wilaplast: injeção, corte, acabamento e expedição, com unidades em Novo Hamburgo (RS) e Russas (CE).') + topo(v, 'fabrica') + cab('Fábrica', 'Duas unidades: Novo Hamburgo (RS) e Russas (CE).', 'aerea-1') + `
<div class="in">
<section class="video-sec"><div class="video-caixa">${video('video')}</div><div><h2>Da injeção à expedição</h2><p>O vídeo institucional mostra a rotina da fábrica: peças saindo da injeção, corte, acabamento, estoque e embalagem.</p>${lista(['Injeção de termoplásticos', 'Corte e acabamento das peças', 'Equipe própria e equipes terceirizadas', 'Estoque e expedição organizados'])}</div></section>
<section class="galeria">${fabrica.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}<span>${f[1]}</span></a>`).join('')}</section>
<section class="unidades">${[['Novo Hamburgo', 'Rio Grande do Sul', `${E.rua}, ${E.bairro} · CEP ${E.cep}`], ['Russas', 'Ceará', 'Unidade fabril no Ceará']].map(u => `<div class="sobe">${ic('fabrica')}<h3>${u[0]}</h3><p class="uf">${u[1]}</p><p>${u[2]}</p></div>`).join('')}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Wilaplast: ${E.rua}, ${E.cidade}. Telefone ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Entre em contato com a Wilaplast.', 'embalagem') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mande sua mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Injetados para calçados · desde 1984</p><h1>Priorizamos a qualidade.</h1><p class="sub">Eficiência e tecnologia em nossos serviços.</p><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p></div>
<div class="hero-a-vitrine">${['salto-2', 'taco-1', 'sola-4', 'salto-3'].map((f, i) => `<figure class="v${i + 1}">${img(f, 'Componente injetado Wilaplast', ' loading="eager"')}</figure>`).join('')}</div></div></section>
<section class="faixa-a"><div class="in">${linhas.map(l => `<a href="${link(v, 'produtos')}#${l.id}">${l.t}</a>`).join('<span aria-hidden="true">/</span>')}</div></section>
<section class="in linhas-a"><header class="tit"><p class="k">Nossos produtos</p><h2>Componentes injetados em termoplástico</h2></header><div class="cards">${linhas.map(l => `<a class="card sobe" href="${link(v, 'produtos')}#${l.id}"><figure>${img(l.fotos[0], l.t)}</figure><div><h3>${l.t}</h3><p>${l.d}</p></div></a>`).join('')}</div></section>
<section class="fab-a"><div class="in fab-in"><div class="fab-video">${video('video')}</div><div><p class="k">Nossa fábrica</p><h2>Mais de 30 anos de empresa</h2><p>${historia[1]}</p><p>${historia[3]}</p><a class="link-seta" href="${link(v, 'fabrica')}">Conheça a fábrica ${ic('seta')}</a></div></div></section>
<section class="in mv-a"><div><h2>Missão</h2><p>${missao}</p></div><div><h2>Visão</h2><p>${visao}</p></div></section>
<section class="cta-a"><div class="in"><div><h2>Entre em contato</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${mail()}">${ic('mail')}${E.email}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${video('hero-video')}<div class="in hero-b-in"><p class="k">Wilaplast · Novo Hamburgo/RS · Russas/CE</p><h1>Saltos, tacos e solas saindo da injeção desde 1984.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos</a><a class="btn btn-linha" href="${link(v, 'contato')}">Pedir orçamento</a></p></div></section>
<section class="num-b"><div class="in">${[['1984', 'início das atividades'], ['2', 'unidades: RS e CE'], ['6', 'linhas de produto'], ['30+', 'anos de empresa']].map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in prod-b"><header class="tit-b"><p class="k">Produtos</p><h2>O que sai da nossa injeção</h2></header><div class="mosaico">${linhas.map((l, i) => `<a class="m${i + 1} sobe" href="${link(v, 'produtos')}#${l.id}">${img(l.fotos[0], l.t)}<span><b>${l.t}</b>${ic('seta')}</span></a>`).join('')}</div></section>
<section class="processo-b"><div class="in"><header class="tit-b"><p class="k">Fábrica</p><h2>Do granulado à caixa</h2></header><ol>${[['granulado', 'Matéria-prima', 'Termoplástico em grânulos'], ['corte-verde', 'Injeção', 'Peças moldadas na injetora'], ['acabamento', 'Acabamento', 'Lixa e corte das peças'], ['embalagem', 'Expedição', 'Peças embaladas e estocadas']].map((p, i) => `<li class="sobe">${img(p[0], p[1])}<span class="num">0${i + 1}</span><h3>${p[1]}</h3><p>${p[2]}</p></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'fabrica')}">Ver a fábrica ${ic('seta')}</a></div></section>
<section class="in sobre-b"><figure>${img('aerea-1', 'Vista aérea de uma das unidades da Wilaplast')}</figure><div><p class="k">Empresa</p><h2>Uma equipe especializada, que age com eficácia e agilidade</h2><p>${historia[0]} ${historia[1].split('. ')[0]}.</p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in"><h2>Precisa de um componente para a sua coleção?</h2><p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('mail')}Enviar mensagem</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Wilaplast', artigo: 'da', url: E.url, lang: 'pt', cor: '#518227', fundo: '#151714', claro: '#f4f6f0',
  fonteTitulo: "'Fira Sans Condensed',system-ui,sans-serif", fonteTexto: 'Figtree,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em forma de mostruário: saltos, tacos e solas em destaque, com o verde da marca e o vídeo da fábrica na página inicial.', pontos: ['"Priorizamos a qualidade" na abertura', 'As seis linhas de produto com fotos', 'Formulário que abre o e-mail pronto'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, com o vídeo da fábrica rodando na abertura e o processo do granulado à expedição contado em quatro passos.', pontos: ['Vídeo institucional na abertura', 'Processo de fabricação em 4 passos', 'Unidades de Novo Hamburgo e Russas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
