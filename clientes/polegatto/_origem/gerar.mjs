// Polegatto Máquinas (São José do Rio Preto/SP): prensas hidráulicas motorizadas NR-12 de 15 a 400 t, equipamentos para oficina, brunidoras, unidades hidráulicas e projetos especiais.
// node clientes/polegatto/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs polegatto https://polegatto.com.br/)
// Textos, fichas técnicas e fotos do site atual (WordPress + WooCommerce, 2020), em _origem/conteudo.json. Logo redesenhado em vetor.
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'conteudo.json'), 'utf8').replaceAll('Trifasico', 'Trifásico'));

const E = {
  nome: 'Polegatto Máquinas', url: 'https://polegatto.overtus.com.br/', antigo: 'https://polegatto.com.br/',
  fone: '(17) 3218-5798', cel: '(17) 98102-0060', wa: '5517991371124', waTxt: '(17) 99137-1124', email: 'contato@polegatto.com.br',
  end: 'Rua Roque Martins da Costa Júnior, 280', bairro: 'Parque Industrial Campo Verde', cidade: 'São José do Rio Preto – SP', cep: '15076-120', horario: 'Seg. a sex., 7h às 17h',
  face: 'https://www.facebook.com/polegattoprensashidraulicas/', insta: 'https://www.instagram.com/polegatto_equipamentos',
  mapa: 'https://www.google.com/maps?q=Rua+Roque+Martins+da+Costa+J%C3%BAnior,+280,+S%C3%A3o+Jos%C3%A9+do+Rio+Preto+-+SP&output=embed',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&family=Inter:wght@400;500;600;700&display=swap';
const IMG = '/assets/img/';
const PROD = D.prod;
const CAT = [
  { id: 'prensas', t: 'Prensas motorizadas', d: 'Prensas hidráulicas elétricas de 15 a 400 toneladas, em conformidade com a NR-12.' },
  { id: 'oficina', t: 'Equipamentos para oficina', d: 'Pino e bucha do rodante, soldagem por arco submerso e brunimento de cilindros.' },
  { id: 'brunidoras', t: 'Brunidoras', d: 'Brunimento de cilindros e camisas hidráulicas.' },
  { id: 'hidraulica', t: 'Unidades hidráulicas', d: 'Sistemas hidráulicos sob consulta, dimensionados para cada aplicação.' },
];
const C = {
  sobre: [
    'A Polegatto Indústria e Comércio de Máquinas consolidou-se no mercado através de parcerias duradouras, tendo como cartão de visita a qualidade dos seus produtos e serviços bem prestados.',
    'A empresa possui vasto know-how na construção de equipamentos hidráulicos como prensas hidráulicas, prensas para virar pino e bucha, cilindros hidráulicos sob medida, macacos hidráulicos, máquinas para soldagem contínua por arco submerso e muitos outros equipamentos e máquinas hidráulicas.',
    'A dedicação em atender às expectativas dos clientes conferiu à Polegatto capacidade para desenvolver projetos e equipamentos para os mais diversos setores industriais, atendendo às diretrizes da ABNT e a normas regulamentadoras como NR-12, NR-13 e NR-10.',
  ],
  mvv: [
    ['Missão', 'Fabricar máquinas e equipamentos hidráulicos aos setores industriais e comerciais com a mais alta tecnologia e qualidade, oferecendo aos clientes soluções completas com foco no atendimento de suas expectativas e visando sempre o preparo técnico e a agilidade nos prazos de entrega.'],
    ['Visão', 'Manter a Polegatto Máquinas entre as três melhores empresas de fabricação de equipamentos hidráulicos do Brasil.'],
    ['Valores', 'Atingir os objetivos da empresa de forma ilibada, trabalhando com relacionamentos pautados nos princípios da confiança, da transparência e da ética profissional.'],
  ],
  projetos: 'Apoiada em sólidos conceitos de engenharia e com auxílio de softwares de última geração, a Polegatto Máquinas desenvolve projetos sob medida que, além de otimizar processos, também visam a flexibilidade do equipamento quanto ao seu uso em outros setores da empresa.',
};
const DEPO = [
  'Sua atuação tem sido de forma idônea e cumpridora dos compromissos assumidos em suas propostas, perante esta Organização Militar.',
  'Adquirimos 2 prensas hidráulicas elétricas da Polegatto Máquinas. O produto é de qualidade e as entregas correram conforme o prazo combinado.',
  'Equipamento versátil e desenvolvido com sólidos conceitos de engenharia, que também visa conferir segurança e flexibilidade na operação.',
];
const SELOS = [
  { t: 'NR-12', d: 'Todos os modelos com sistema de segurança do operador.', i: 'escudo' },
  { t: '1 ano de garantia', d: 'Em todas as prensas motorizadas.', i: 'check' },
  { t: 'Cartão BNDES', d: 'Até 12x no cartão ou 48x no Cartão BNDES.', i: 'calendario' },
  { t: 'Projeto com ART', d: 'Engenharia própria, projetos certificados com ART.', i: 'engrenagem' },
];

const NAV = [
  { slug: 'index', nome: 'Home' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'projetos-especiais', nome: 'Projetos especiais' },
  { slug: 'sobre', nome: 'Sobre' }, { slug: 'contato', nome: 'Contato' },
];
const fig = (src, alt, cls = '', w = 0, h = 0) => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}"${w ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async">`;
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="Polegatto" width="180" height="58">`;
const pPor = s => PROD.find(p => p.slug === s);

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('relogio')} ${E.horario}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    <a class="btn topo-cta" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a Polegatto.')}" target="_blank" rel="noopener">${icWa()} Orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}
function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Orçamento pelo WhatsApp</p><h2>Precisa de uma prensa ou de um projeto sob medida?</h2><p>Informe a capacidade, a aplicação e as dimensões da peça. A engenharia da Polegatto responde com a melhor opção.</p></div>
  <div class="cta-bts"><a class="btn" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a Polegatto.')}" target="_blank" rel="noopener">${icWa()} ${E.waTxt}</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">${ic('mail')} Formulário</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>Polegatto Indústria e Comércio de Máquinas. Prensas hidráulicas e máquinas para soldagem ao arco submerso.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  <div><h3>Produtos</h3><ul>${CAT.map(c => `<li><a href="${link(v, 'produtos')}#${c.id}">${c.t}</a></li>`).join('')}<li><a href="${link(v, 'projetos-especiais')}">Projetos especiais</a></li></ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'sobre')}">Sobre a Polegatto</a></li><li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</p><p><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.cel)}">${E.cel}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">WhatsApp ${E.waTxt}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Polegatto Máquinas. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}
const pagina = (v, slug, ativo, titulo, descricao, corpo) => cabeca({ E, v, slug, titulo, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#2e5c0b' }) + topo(v, ativo) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => ` / ${s ? `<a href="${link(v, s)}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const card = (v, p, i = 0) => `<li class="sobe" style="--i:${i % 6}"><a href="${link(v, `produtos/${p.slug}`)}"><span class="pd-foto">${fig(p.fotos[0][0], p.nome, '', p.fotos[0][1], p.fotos[0][2])}${p.tag ? `<span class="pd-tag">${p.tag}</span>` : ''}</span><span class="pd-nome">${p.nome}</span></a></li>`;
const catalogo = v => CAT.map(c => `<section class="cat" id="${c.id}"><div class="cat-tit sobe"><h2>${c.t}</h2><p>${c.d}</p></div><ul class="pds">${PROD.filter(p => p.cat === c.id).map((p, i) => card(v, p, i)).join('')}</ul></section>`).join('');
const selos = `<ul class="selos">${SELOS.map((s, i) => `<li class="sobe" style="--i:${i}">${ic(s.i)}<div><b>${s.t}</b><span>${s.d}</span></div></li>`).join('')}</ul>`;
const depo = `<ul class="depo">${DEPO.map((d, i) => `<li class="sobe" style="--i:${i}"><blockquote>“${d}”</blockquote></li>`).join('')}</ul>`;
const clientes = `<ul class="clientes">${D.clientes.map(c => `<li>${fig(c[0], `Cliente: ${c[1]}`)}</li>`).join('')}</ul>`;
const projetos = `<ul class="projs">${D.projetos.map((p, i) => `<li class="sobe" style="--i:${i % 4}"><a href="${IMG}${p.foto[0]}" data-foto>${fig(p.foto[0], p.t)}</a><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ul>`;
const tabelaPrensas = v => {
  const ps = PROD.filter(p => p.specs.length);
  const chaves = ['Capacidade (Ton)', 'Curso do cilindro (mm)', 'Altura de trabalho (mm)', 'Largura de trabalho (mm)', 'Motor', 'Peso (Kg)'];
  return `<div class="tab-rola"><table class="tab"><thead><tr><th>Modelo</th>${chaves.map(k => `<th>${k.replace(' (Ton)', ' (t)').replace(' (Kg)', ' (kg)')}</th>`).join('')}</tr></thead><tbody>${ps.map(p => { const m = Object.fromEntries(p.specs); return `<tr><td><a href="${link(v, `produtos/${p.slug}`)}">${p.nome}</a></td>${chaves.map(k => `<td>${esc(m[k] || '–')}</td>`).join('')}</tr>`; }).join('')}</tbody></table></div>`;
};
const formulario = `<form class="form" id="form" data-wa="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Equipamento<select name="equipamento">${PROD.map(p => `<option>${p.nome}</option>`).join('')}<option>Projeto especial</option><option>Outro assunto</option></select></label>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Capacidade, aplicação, dimensões da peça e cidade de entrega."></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Polegatto. Atendimento de segunda a sexta, das 7h às 17h.</p>
</form>`;

function internas(v) {
  const P = {};
  P.produtos = pagina(v, 'produtos', 'produtos', 'Produtos · Polegatto', 'Prensas hidráulicas motorizadas de 15 a 400 toneladas, prensa para pino e bucha, posicionador de solda arco submerso, brunidoras e unidades hidráulicas.',
    cabecalhoPg(v, [['Produtos']], 'Produtos', 'Prensas hidráulicas, máquinas para soldagem, brunidoras e unidades hidráulicas, fabricadas 100% na Polegatto.', 'fabrica.webp') + `
<section class="sec cats-sec"><div class="in"><nav class="cat-nav" aria-label="Categorias">${CAT.map(c => `<a href="#${c.id}">${c.t}</a>`).join('')}<a href="${link(v, 'projetos-especiais')}">Projetos especiais</a></nav>${catalogo(v)}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Comparativo</p><h2>Prensas com ficha técnica</h2></div>${tabelaPrensas(v)}</div></section>`);
  for (const p of PROD) {
    const c = CAT.find(c => c.id === p.cat);
    const outros = PROD.filter(o => o.cat === p.cat && o.slug !== p.slug);
    const extra = p.extra.map(x => /^[A-ZÁÉÍÓÚÇÃÕ ]{8,}$/.test(x) ? `<h3>${esc(x.charAt(0) + x.slice(1).toLowerCase())}</h3>` : `<p>${esc(x)}</p>`).join('');
    const resumo = p.intro[0] || `${p.nome} fabricada pela Polegatto Máquinas. Mais opções sob consulta.`;
    P[`produtos/${p.slug}`] = pagina(v, `produtos/${p.slug}`, 'produtos', `${p.nome} · Polegatto`, resumo.slice(0, 160),
      `<section class="pr-topo"><div class="in pr-topo-in">
  <div class="pr-galeria sobe"><a class="pr-principal" href="${IMG}${p.fotos[0][0]}" data-foto>${fig(p.fotos[0][0], p.nome, '', p.fotos[0][1], p.fotos[0][2])}</a>${p.fotos.length > 1 ? `<div class="pr-mini">${p.fotos.slice(1).map(([s]) => `<a href="${IMG}${s}" data-foto>${fig(s, p.nome)}</a>`).join('')}</div>` : ''}</div>
  <div class="pr-cab sobe"><p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, 'produtos')}#${c.id}">${c.t}</a></p>
    ${p.tag ? `<span class="pr-tag">${p.tag}</span>` : ''}<h1>${p.nome}</h1>${p.intro.map(x => `<p class="pr-resumo">${esc(x)}</p>`).join('') || `<p class="pr-resumo">Mais opções sob consulta. Entre em contato: soluções personalizadas para o seu projeto.</p>`}
    <ul class="pr-selos"><li>${ic('escudo')} NR-12</li><li>${ic('check')} Fabricação 100% Polegatto</li><li>${ic('engrenagem')} Mais opções sob consulta</li></ul>
    <div class="hero-bts"><a class="btn" href="${waHref(E.wa, `Olá, gostaria de um orçamento: ${p.nome}.`)}" target="_blank" rel="noopener">${icWa()} Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">Formulário</a></div></div>
</div></section>
${p.itens.length || p.specs.length || extra ? `<section class="sec pr-corpo"><div class="in pr-corpo-in">
  ${p.specs.length ? `<div class="sobe"><h2>Dados técnicos</h2><table class="ficha"><tbody>${p.specs.map(([k, x]) => `<tr><th>${esc(k)}</th><td>${esc(x)}</td></tr>`).join('')}</tbody></table></div>` : ''}
  ${p.itens.length ? `<div class="sobe"><h2>${p.specs.length ? 'Construção e segurança' : 'Características'}</h2><ul class="pr-itens">${p.itens.map(x => `<li>${ic('check')} <span>${esc(x)}</span></li>`).join('')}</ul></div>` : ''}
  ${extra ? `<div class="sobe pr-extra">${extra}</div>` : ''}
</div></section>` : ''}
${outros.length ? `<section class="sec outros-sec"><div class="in"><div class="sec-tit sobe"><h2>Outros em ${c.t.toLowerCase()}</h2></div><ul class="pds pds-mini">${outros.slice(0, 5).map((o, i) => card(v, o, i)).join('')}</ul></div></section>` : ''}`);
  }
  P['projetos-especiais'] = pagina(v, 'projetos-especiais', 'projetos-especiais', 'Projetos especiais · Polegatto', 'Máquinas sob medida, automação, equipamentos hidráulicos elétricos, retrofit e adequação à NR-12, com projeto certificado e ART.',
    cabecalhoPg(v, [['Projetos especiais']], 'Projetos especiais', 'Máquinas sob medida, automação, equipamentos hidráulicos elétricos, retrofit e adequação à NR-12. Certificados e com ART.', 'projetos.webp') + `
<section class="sec"><div class="in"><p class="lead-tx sobe">${C.projetos}</p>${projetos}</div></section>
<section class="sec selos-sec"><div class="in">${selos}</div></section>`);
  P.sobre = pagina(v, 'sobre', 'sobre', 'Sobre · Polegatto', 'Polegatto Indústria e Comércio de Máquinas: prensas hidráulicas e máquinas para soldagem em São José do Rio Preto (SP), atendendo ABNT, NR-12, NR-13 e NR-10.',
    cabecalhoPg(v, [['Sobre']], 'Prensas hidráulicas e máquinas para soldagem', 'Parcerias duradouras, com a qualidade dos produtos como cartão de visita.', 'sobre.webp') + `
<section class="sec"><div class="in sobre-in">
  <div class="sobe sobre-txt">${C.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <ul class="mvv sobe">${C.mvv.map(([t, d]) => `<li><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul>
</div></section>
<section class="sec depo-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Parcerias de sucesso</p><h2>O que nossos parceiros têm a dizer</h2></div>${depo}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Clientes</p><h2>Empresas que trabalham com a Polegatto</h2></div>${clientes}</div></section>`);
  P.contato = pagina(v, 'contato', 'contato', 'Contato · Polegatto', `Fale com a Polegatto: ${E.fone}, WhatsApp ${E.waTxt}, ${E.email}. ${E.end}, ${E.cidade}.`,
    cabecalhoPg(v, [['Contato']], 'Contato', 'Formulário, WhatsApp ou telefone. O prazo de resposta pelo formulário é de até um dia útil.', null) + `
<section class="sec"><div class="in cont-in">
  <div class="sobe"><h2>Peça seu orçamento</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${icWa()}<div><b>WhatsApp</b><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
    <li>${ic('tel')}<div><b>Telefones</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel)}">${E.cel}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.bairro}<br>${E.cidade} · CEP ${E.cep}</span></div></li>
    <li>${ic('relogio')}<div><b>Horário</b><span>${E.horario}</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da Polegatto em São José do Rio Preto" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
  return P;
}

const T_HOME = 'Polegatto · Prensas hidráulicas NR-12 e máquinas para soldagem';
const D_HOME = 'Polegatto Máquinas, São José do Rio Preto/SP: prensas hidráulicas motorizadas NR-12 de 15 a 400 toneladas, prensa para pino e bucha, solda arco submerso, brunidoras e projetos especiais.';
const DEST = ['prensa-30-toneladas', 'prensa-80-toneladas', 'prensa-ph15-c-estamparia', 'prensa-400-toneladas', 'prensa-pino-e-bucha', 'posicionador-arco-submerso', 'brunidora-de-cilindros', 'unidade-hidraulica'];

// ---------- A "Oficina": clara, prensa em recorte ao lado do título ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">São José do Rio Preto – SP</p>
    <h1>Prensas hidráulicas NR-12 de 15 a 400 toneladas</h1>
    <p class="lead">Prensas motorizadas, prensas para pino e bucha, máquinas para soldagem ao arco submerso, brunidoras e projetos sob medida, fabricados 100% na Polegatto.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a Polegatto.')}" target="_blank" rel="noopener">${icWa()} Orçamento</a></div>
  </div>
  <figure class="hero-foto">${fig(pPor('prensa-80-toneladas').fotos[0][0], 'Prensa hidráulica motorizada NR-12 Polegatto')}<figcaption><b>1 ano</b>de garantia em todos os modelos</figcaption></figure>
</div></section>
<section class="selos-sec"><div class="in">${selos}</div></section>
<section class="sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Conheça nossas soluções</p><h2>Equipamentos fabricados na Polegatto</h2></div>
  <ul class="pds">${DEST.map((s, i) => card(v, pPor(s), i)).join('')}</ul>
  <p class="centro"><a class="btn btn-linha" href="${link(v, 'produtos')}">Todos os ${PROD.length} produtos ${ic('seta')}</a></p>
</div></section>
<section class="sec proj-home"><div class="in proj-home-in">
  <div class="sobe"><p class="sobre">Projetos especiais</p><h2>Máquinas sob medida, retrofit e adequação NR-12</h2><p>${C.projetos}</p><a class="btn" href="${link(v, 'projetos-especiais')}">Ver projetos ${ic('seta')}</a></div>
  <div class="proj-mini sobe">${D.projetos.slice(0, 4).map(p => fig(p.foto[0], p.t)).join('')}</div>
</div></section>
<section class="sec depo-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Parcerias de sucesso</p><h2>O que nossos parceiros têm a dizer</h2></div>${depo}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Clientes</p><h2>Do Exército à Embraer</h2></div>${clientes}</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

// ---------- B "Tonelagem": escura, grade de capacidades e ficha comparativa ----------
function versaoB() {
  const v = 'b';
  const prensas = PROD.filter(p => p.cat === 'prensas');
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}solda.webp)"></div><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Polegatto Máquinas</p>
    <h1>Força hidráulica com segurança NR-12</h1>
    <p class="lead">Fabricação de prensas hidráulicas e máquinas para soldagem ao arco submerso, com engenharia própria e projetos certificados com ART.</p>
    <div class="hero-bts"><a class="btn" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a Polegatto.')}" target="_blank" rel="noopener">${icWa()} Orçamento pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></div>
  </div>
  <figure class="hero-foto-pr">${fig(pPor('prensa-400-toneladas').fotos[1] ? pPor('prensa-400-toneladas').fotos[1][0] : pPor('prensa-400-toneladas').fotos[0][0], 'Prensa hidráulica 400 toneladas Polegatto')}</figure>
</div></section>
<section class="ton-sec"><div class="in"><p class="sobre">Escolha pela capacidade</p><ul class="ton">${prensas.map(p => `<li><a href="${link(v, `produtos/${p.slug}`)}"><b>${p.tag.replace(' t', '')}<small>t</small></b><span>${p.nome.replace(/ \d+ t$/, '')}</span></a></li>`).join('')}</ul></div></section>
<section class="sec"><div class="in">${selos}</div></section>
<section class="sec cats-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Linhas de produto</p><h2>Prensas, oficina, brunidoras e hidráulica</h2></div>
  <ul class="cats">${CAT.map((c, i) => { const ps = PROD.filter(p => p.cat === c.id); return `<li class="sobe" style="--i:${i}"><a href="${link(v, 'produtos')}#${c.id}">${fig(ps[0].fotos[0][0], c.t)}<div><h3>${c.t}</h3><p>${c.d}</p><span class="link-seta">${ps.length} produto${ps.length > 1 ? 's' : ''} ${ic('seta')}</span></div></a></li>`; }).join('')}</ul>
</div></section>
<section class="sec tab-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Ficha comparativa</p><h2>Prensas motorizadas com dados técnicos</h2></div>${tabelaPrensas(v)}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Projetos especiais</p><h2>Feito sob medida para a sua planta</h2><p>${C.projetos}</p></div>${projetos}</div></section>
<section class="sec depo-sec"><div class="in">${depo}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Clientes</p><h2>Quem já trabalha com a Polegatto</h2></div>${clientes}</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Polegatto', artigo: 'da', url: E.url, lang: 'pt', cor: '#2e5c0b', fundo: '#121512', claro: '#f3f5f1',
  fonteTitulo: "'Quicksand',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Oficina', paginas: Object.keys(A).length, texto: 'Clara, com a prensa NR-12 ao lado do título, garantia e Cartão BNDES em destaque, produtos, projetos especiais e clientes.', pontos: [`${PROD.length} produtos com página própria`, 'Fichas técnicas em texto', 'Logo redesenhado em vetor'] },
    { letra: 'b', nome: 'Tonelagem', paginas: Object.keys(B).length, texto: 'Escura, com escolha da prensa pela capacidade (15 a 400 t), ficha comparativa e projetos especiais na página inicial.', pontos: ['Mesmos textos e fotos do site atual', 'Orçamento direto pelo WhatsApp', 'Clientes como Embraer e Itaipu'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
