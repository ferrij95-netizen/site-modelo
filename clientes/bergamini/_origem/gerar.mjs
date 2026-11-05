// Bergamini Industrial (Concórdia/SC): fábricas de ração completas e equipamentos (moegas, transportadores, moinhos, misturadores, balanças, ensaque).
// node clientes/bergamini/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs bergamini http://www.bergaminiindustrial.com.br/)
// Textos e fotos do site atual (CMS o2.ag, © 2020): 17 equipamentos e 20 fábricas montadas em _origem/conteudo.json. Logo redesenhado em vetor.
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'conteudo.json'), 'utf8'));

const E = {
  nome: 'Bergamini Industrial', url: 'https://bergamini.overtus.com.br/', antigo: 'http://www.bergaminiindustrial.com.br/',
  fone: '(49) 3442-4216', cel: '(49) 99969-0380', wa: '5549999690380', email: 'contato@bergaminiindustrial.com.br',
  end: 'Parque de Exposições', cidade: 'Concórdia – SC',
  mapa: 'https://www.google.com/maps?q=Parque+de+Exposi%C3%A7%C3%B5es,+Conc%C3%B3rdia+-+SC&output=embed',
  mapaLink: 'https://www.google.com/maps/search/?api=1&query=Parque+de+Exposi%C3%A7%C3%B5es+Conc%C3%B3rdia+SC',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const EQ = Object.fromEntries(D.equip.map(e => [e.slug, e]));
// equipamentos sem texto no site atual
EQ['filtro-air-jet'].blocos = [{ t: 'p', x: 'Filtro Air Jet da Bergamini Industrial para a captação de pó nos pontos de transporte, moagem e mistura da fábrica de ração, mantendo o ambiente de produção limpo e seguro.' }];
EQ['estruturas-metalicas'].blocos = [{ t: 'p', x: 'Estruturas metálicas projetadas, fabricadas e montadas pela Bergamini Industrial para cada etapa da fábrica de ração: armazenagem, moagem, pesagem, microdosagem e expedição.' }, { t: 'p', x: 'A fabricação e montagem modular permite adaptar a estrutura ao layout de cada planta e ao regime de trabalho da cadeia produtiva.' }];
const resumo = e => { const p = e.blocos.find(b => b.t === 'p'); const s = p ? p.x : ''; const m = s.match(/^(.{40,220}?[.!])\s/); return m ? m[1] : s; };

const CAT = [
  { id: 'fabricas', t: 'Fábricas completas', d: 'Plantas de 5 a 100 t/h, manuais ou totalmente automatizadas.', itens: ['fabricas-de-racao', 'estruturas-metalicas'] },
  { id: 'recepcao', t: 'Recepção e armazenagem', d: 'Entrada e armazenamento seguro dos insumos.', itens: ['moegas', 'fundo-vibratorio'] },
  { id: 'transporte', t: 'Transporte e elevação', d: 'Movimentação contínua de grãos, farelos e ração.', itens: ['transportador-redler', 'transportadores-calha', 'transportador-dosador', 'elevador-de-canecas', 'monta-carga'] },
  { id: 'moagem', t: 'Moagem, peneiramento e mistura', d: 'Granulometria e homogeneidade da ração.', itens: ['moinho-de-martelos', 'peneira-homogenizadora', 'misturador-de-pas-eixo-simples', 'misturador-de-pas-eixo-duplo', 'torre-de-mistura'] },
  { id: 'pesagem', t: 'Pesagem, ensaque e filtragem', d: 'Dosagem exata, expedição e controle de pó.', itens: ['balancas', 'torre-de-ensaque-ensacadeira', 'filtro-air-jet'] },
];
const FLUXO = [
  { t: 'Recepção', e: 'moegas' }, { t: 'Transporte', e: 'transportador-redler' }, { t: 'Moagem', e: 'moinho-de-martelos' },
  { t: 'Dosagem', e: 'balancas' }, { t: 'Mistura', e: 'misturador-de-pas-eixo-duplo' }, { t: 'Ensaque', e: 'torre-de-ensaque-ensacadeira' },
];
const FAB = D.fab;
const FAB_DESTAQUE = ['mais-frango', 'irmaos-mugnol', 'bom-frango', 'frango-belo', 'mauro-gobbi', 'coolacer', 'gaio', 'suinocultura-acadroli'];
const fabPor = s => FAB.find(f => f.slug === s);
const C = {
  sobre: [
    'Os equipamentos e instalações entregues pela Bergamini Industrial são ferramentas que entregam qualidade e tecnologia de quem possui mais de 30 anos de experiência e credibilidade no setor de processamento e armazenagem de ração.',
    'A empresa conta em seu quadro com mais de 30 colaboradores empenhados em garantir que a necessidade de cada cliente seja atendida, entregando máquinas e equipamentos que possuam alto desempenho, durabilidade e qualidade.',
    'A Bergamini Industrial desenvolve tecnologia, implementa soluções, qualifica negócios e destaca a competitividade de produtores. Fábricas de ração e sistemas de armazenamento têm marca, qualidade e nome próprio: Bergamini Industrial.',
  ],
  equip: 'Os equipamentos projetados pela Bergamini Industrial são construídos pensando em três pontos principais: eficiência, matéria-prima e adequação perfeita às demandas do projeto. A excelência do projeto garante o melhor desempenho e a robustez do conjunto com o melhor custo-benefício.',
  fab: 'A Bergamini Industrial garante a instalação e inicialização de fábricas que atendem às necessidades dos mais exigentes criadores, bem como a fabricação e entrega de equipamentos customizados que se destacam por seu desempenho e durabilidade.',
};
const NUM = [['640', 'clientes atendidos'], ['89', 'fábricas montadas'], ['30+', 'anos de experiência'], ['5 a 100', 'toneladas por hora por planta']];
const PILARES = [
  { t: 'Mão de obra qualificada', d: 'Garantimos a montagem e a instalação de nossos equipamentos seguindo os padrões de qualidade.', i: 'usuarios' },
  { t: 'Tecnologia', d: 'Equipamentos de alto desempenho, com soluções desenvolvidas em conjunto com o cliente.', i: 'engrenagem' },
  { t: 'Partida da fábrica', d: 'A Bergamini garante a instalação e a inicialização das fábricas que entrega.', i: 'fabrica' },
];
const ETAPAS = [
  { t: 'Projeto com o cliente', d: 'Identificamos as reais necessidades da produção e dimensionamos a planta.' },
  { t: 'Fabricação', d: 'Equipamentos e estruturas fabricados na Bergamini, em Concórdia.' },
  { t: 'Montagem modular', d: 'Montagem adaptada ao regime de trabalho de cada cadeia produtiva.' },
  { t: 'Instalação e partida', d: 'Instalação, inicialização e entrega da fábrica operando.' },
];

const NAV = [
  { slug: 'index', nome: 'Home' }, { slug: 'fabricas', nome: 'Fábricas' }, { slug: 'equipamentos', nome: 'Equipamentos' },
  { slug: 'sobre-nos', nome: 'Sobre nós' }, { slug: 'trabalhe-conosco', nome: 'Trabalhe conosco' }, { slug: 'contato', nome: 'Contato' },
];
const fig = (src, alt, cls = '', w = 0, h = 0) => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}"${w ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async">`;
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="Bergamini Industrial" width="120" height="70">`;
const capa = f => f.fotos[0][0];

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.end} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    <a class="btn topo-cta" href="${link(v, 'contato')}#form">Orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}
function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Faça seu orçamento</p><h2>Vamos projetar a sua fábrica de ração?</h2><p>Conte a capacidade que você precisa e o tipo de ração. A Bergamini dimensiona a planta e os equipamentos com você.</p></div>
  <div class="cta-bts"><a class="btn" href="${link(v, 'contato')}#form">${ic('mail')} Pedir orçamento</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a Bergamini Industrial.')}" target="_blank" rel="noopener">${icWa()} WhatsApp</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>Fábricas de ração e sistemas de armazenamento com marca, qualidade e nome próprio. Concórdia, Santa Catarina.</p></div>
  <div><h3>Equipamentos</h3><ul>${CAT.map(c => `<li><a href="${link(v, 'equipamentos')}#${c.id}">${c.t}</a></li>`).join('')}</ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'fabricas')}">Fábricas montadas</a></li><li><a href="${link(v, 'sobre-nos')}">Sobre nós</a></li><li><a href="${link(v, 'trabalhe-conosco')}">Trabalhe conosco</a></li><li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.cidade}</p><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel)}">${E.cel}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Bergamini Industrial. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}
const pagina = (v, slug, ativo, titulo, descricao, corpo) => cabeca({ E, v, slug, titulo, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#008c45' }) + topo(v, ativo) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo${foto ? '' : ' pg-sem'}">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => ` / ${s ? `<a href="${link(v, s)}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const eqCard = (v, e, i = 0) => `<li class="sobe" style="--i:${i % 6}"><a href="${link(v, `equipamentos/${e.slug}`)}"><span class="eq-foto">${fig(e.fotos[0][0], e.nome, '', e.fotos[0][1], e.fotos[0][2])}</span><span class="eq-nome">${e.nome}</span></a></li>`;
const catalogo = v => CAT.map(c => `<section class="cat" id="${c.id}"><div class="cat-tit sobe"><h2>${c.t}</h2><p>${c.d}</p></div><ul class="eqs">${c.itens.map((s, i) => eqCard(v, EQ[s], i)).join('')}</ul></section>`).join('');
const fabCard = (v, f, i = 0, cls = '') => `<li class="sobe${cls}" style="--i:${i % 6}"><a href="${link(v, `fabricas/${f.slug}`)}">${fig(capa(f), `Fábrica de ração ${f.nome} montada pela Bergamini`)}<span class="fab-nome">${f.nome}${f.fotos.length > 1 ? `<small>${f.fotos.length} fotos</small>` : ''}</span></a></li>`;
const numeros = `<ul class="numeros">${NUM.map(([n, t]) => `<li><b>${n}</b><span>${t}</span></li>`).join('')}</ul>`;
const pilares = `<ul class="pilares">${PILARES.map((p, i) => `<li class="sobe" style="--i:${i}">${ic(p.i)}<h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ul>`;
const etapas = `<ol class="etapas">${ETAPAS.map((p, i) => `<li class="sobe" style="--i:${i}"><span class="et-n">0${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;
const clientes = `<ul class="clientes">${D.clientes.map(c => `<li>${fig(c[0], 'Cliente da Bergamini Industrial')}</li>`).join('')}</ul>`;
const fluxo = v => `<ol class="fluxo">${FLUXO.map((f, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, `equipamentos/${f.e}`)}"><span class="fl-n">${i + 1}</span>${fig(EQ[f.e].fotos[0][0], EQ[f.e].nome)}<b>${f.t}</b><small>${EQ[f.e].nome}</small></a></li>`).join('')}</ol>`;
const formulario = `<form class="form" id="form" data-wa="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Interesse<select name="interesse"><option>Fábrica de ração completa</option>${D.equip.filter(e => e.slug !== 'fabricas-de-racao').map(e => `<option>${e.nome}</option>`).join('')}<option>Outro assunto</option></select></label><label>Cidade e estado<input name="cidade" autocomplete="address-level2"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Ex.: capacidade desejada em t/h, tipo de ração, se a planta será manual ou automatizada."></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Bergamini. Se preferir, escreva para ${E.email}.</p>
</form>`;

// ---------- páginas internas ----------
function internas(v) {
  const P = {};
  P.fabricas = pagina(v, 'fabricas', 'fabricas', 'Fábricas montadas · Bergamini Industrial', 'Fábricas de ração montadas pela equipe da Bergamini Industrial para avicultura, suinocultura, nutrição animal e cooperativas.',
    cabecalhoPg(v, [['Fábricas']], 'Fábricas montadas por nossa equipe', C.fab, capa(fabPor('irmaos-mugnol'))) + `
<section class="sec"><div class="in"><ul class="fabs">${FAB.map((f, i) => fabCard(v, f, i)).join('')}</ul></div></section>
<section class="sec etapas-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Como entregamos</p><h2>Do projeto à fábrica produzindo</h2></div>${etapas}</div></section>`);
  FAB.forEach((f, i) => {
    const prox = FAB[(i + 1) % FAB.length];
    P[`fabricas/${f.slug}`] = pagina(v, `fabricas/${f.slug}`, 'fabricas', `${f.nome} · Fábricas · Bergamini Industrial`, `Fábrica de ração ${f.nome}, montada pela Bergamini Industrial.`,
      cabecalhoPg(v, [['Fábricas', 'fabricas'], [f.nome]], f.nome, 'Fábrica montada pela equipe da Bergamini Industrial.', capa(f)) + `
<section class="sec"><div class="in fab-pg">
  <div class="sobe fab-txt"><p>${C.fab}</p><ul class="checks">${['Projeto desenvolvido com o cliente', 'Equipamentos fabricados pela Bergamini', 'Montagem, instalação e inicialização'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul><a class="btn" href="${link(v, 'contato')}#form">Quero uma fábrica assim ${ic('seta')}</a></div>
  <div class="galeria g-${Math.min(f.fotos.length, 4)}">${f.fotos.map(([s, w, h]) => `<a href="${IMG}${s}" data-foto>${fig(s, `Fábrica ${f.nome}`, '', w, h)}</a>`).join('')}</div>
</div></section>
<section class="sec prox-sec"><div class="in prox"><a href="${link(v, 'fabricas')}" class="link-seta">${ic('seta')} Todas as fábricas</a><a href="${link(v, `fabricas/${prox.slug}`)}" class="prox-a"><small>Próxima</small>${prox.nome} ${ic('seta')}</a></div></section>`);
  });
  P.equipamentos = pagina(v, 'equipamentos', 'equipamentos', 'Equipamentos · Bergamini Industrial', 'Moegas, transportadores redler, dosadores e calha, elevadores de canecas, moinhos de martelos, misturadores, balanças, torres de ensaque e fábricas de ração completas.',
    cabecalhoPg(v, [['Equipamentos']], 'Equipamentos para fábricas de ração', C.equip, capa(fabPor('frango-belo'))) + `
<section class="sec cats-sec"><div class="in">
  <nav class="cat-nav" aria-label="Categorias">${CAT.map(c => `<a href="#${c.id}">${c.t}</a>`).join('')}</nav>
  ${catalogo(v)}
</div></section>`);
  for (const e of D.equip) {
    const c = CAT.find(c => c.itens.includes(e.slug));
    const outros = c.itens.filter(s => s !== e.slug).map(s => EQ[s]);
    let corpo = '', lista = false;
    for (const b of e.blocos) {
      if (b.t === 'li') { if (!lista) { corpo += '<ul class="eq-lista">'; lista = true; } corpo += `<li>${b.b ? `<b>${esc(b.b)}</b> ` : ''}${esc(b.x)}</li>`; continue; }
      if (lista) { corpo += '</ul>'; lista = false; }
      corpo += b.t === 'h' ? `<h3>${esc(b.x)}</h3>` : `<p>${esc(b.x)}</p>`;
    }
    if (lista) corpo += '</ul>';
    P[`equipamentos/${e.slug}`] = pagina(v, `equipamentos/${e.slug}`, 'equipamentos', `${e.nome} · Bergamini Industrial`, resumo(e).slice(0, 160),
      `<section class="eq-topo"><div class="in eq-topo-in">
  <div class="eq-galeria sobe"><a class="eq-principal" href="${IMG}${e.fotos[0][0]}" data-foto>${fig(e.fotos[0][0], e.nome, '', e.fotos[0][1], e.fotos[0][2])}</a>${e.fotos.length > 1 ? `<div class="eq-mini">${e.fotos.slice(1).map(([s]) => `<a href="${IMG}${s}" data-foto>${fig(s, e.nome)}</a>`).join('')}</div>` : ''}</div>
  <div class="eq-cab sobe"><p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'equipamentos')}">Equipamentos</a> / <a href="${link(v, 'equipamentos')}#${c.id}">${c.t}</a></p><h1>${e.nome}</h1><p class="eq-resumo">${esc(resumo(e))}</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#form">Pedir orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, `Olá, gostaria de informações sobre: ${e.nome}.`)}" target="_blank" rel="noopener">${icWa()} WhatsApp</a></div></div>
</div></section>
<section class="sec eq-corpo"><div class="in eq-corpo-in"><div class="eq-txt sobe">${corpo}</div>
  ${outros.length ? `<aside class="eq-outros sobe"><h2>${c.t}</h2><ul>${outros.map(o => `<li><a href="${link(v, `equipamentos/${o.slug}`)}">${fig(o.fotos[0][0], o.nome)}<span>${o.nome}</span></a></li>`).join('')}</ul></aside>` : ''}
</div></section>`);
  }
  P['sobre-nos'] = pagina(v, 'sobre-nos', 'sobre-nos', 'Sobre nós · Bergamini Industrial', 'Mais de 30 anos em processamento e armazenagem de ração, com mais de 30 colaboradores em Concórdia (SC).',
    cabecalhoPg(v, [['Sobre nós']], 'Bergamini Industrial', 'Mais de 30 anos de experiência no setor de processamento e armazenagem de ração.', 'vista-aerea.webp') + `
<section class="sec sobre-sec"><div class="in sobre-in">
  <div class="sobe sobre-txt">${C.sobre.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="sobe sobre-foto">${fig('empresa-aerea.webp', 'Sede da Bergamini Industrial em Concórdia vista do alto')}<figcaption><b>Concórdia – SC</b>polo da agroindústria de aves e suínos</figcaption></figure>
</div></section>
<section class="numeros-sec"><div class="in">${numeros}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Tecnologia para produzir sempre mais e melhor</p><h2>O que garantimos em cada entrega</h2></div>${pilares}</div></section>
<section class="sec etapas-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Como trabalhamos</p><h2>Soluções desenvolvidas em conjunto com o cliente</h2></div>${etapas}</div></section>`);
  P['trabalhe-conosco'] = pagina(v, 'trabalhe-conosco', 'trabalhe-conosco', 'Trabalhe conosco · Bergamini Industrial', 'Faça parte do time da Bergamini Industrial em Concórdia (SC).',
    cabecalhoPg(v, [['Trabalhe conosco']], 'Trabalhe conosco', 'Tem interesse em fazer parte do nosso time? Envie seu currículo.', null) + `
<section class="sec"><div class="in vagas-in">
  <figure class="sobe vagas-foto">${fig(fabPor('gaio').fotos[3][0], 'Montagem de equipamentos Bergamini')}</figure>
  <div class="sobe"><p class="sobre">Banco de currículos</p><h2>Montagem, fabricação e projetos</h2><p>A Bergamini Industrial conta com mais de 30 colaboradores na fabricação, montagem e instalação de fábricas de ração. Envie seu currículo informando a cidade, o estado e a área de interesse.</p>
  <ul class="checks">${['Montagem e instalação de equipamentos', 'Caldeiraria, solda e fabricação', 'Projetos e desenho técnico', 'Administrativo e comercial'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>
  <a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Currículo - Trabalhe conosco')}">${ic('mail')} Enviar currículo por e-mail</a></div>
</div></section>`);
  P.contato = pagina(v, 'contato', 'contato', 'Contato · Bergamini Industrial', `Fale com a Bergamini Industrial: ${E.fone}, ${E.cel}, ${E.email}. ${E.end}, ${E.cidade}.`,
    cabecalhoPg(v, [['Contato']], 'Contato', 'Dúvidas ou orçamento? Fale com a Bergamini pelo formulário, telefone ou e-mail.', null) + `
<section class="sec"><div class="in cont-in">
  <div class="sobe"><h2>Faça seu orçamento</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefones</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.cel)}">${E.cel}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.cidade}</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da Bergamini Industrial em Concórdia" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`);
  return P;
}

const T_HOME = 'Bergamini Industrial · Fábricas de ração e equipamentos';
const D_HOME = 'Bergamini Industrial, Concórdia/SC: fábricas de ração completas de 5 a 100 t/h, moegas, transportadores, moinhos, misturadores, balanças e torres de ensaque. 89 fábricas montadas.';

// ---------- A "Planta": clara, foto da fábrica ao lado do título ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Concórdia – SC · mais de 30 anos</p>
    <h1>Fábricas de ração completas, do projeto à partida</h1>
    <p class="lead">A Bergamini Industrial projeta, fabrica e monta fábricas de ração e equipamentos de processamento e armazenagem, com qualidade e tecnologia em cada entrega.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'fabricas')}">Ver fábricas montadas ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'equipamentos')}">Equipamentos</a></div>
  </div>
  <figure class="hero-foto">${fig(capa(fabPor('mais-frango')), 'Fábrica de ração Mais Frango montada pela Bergamini')}<figcaption><b>89 fábricas</b>montadas pela nossa equipe</figcaption></figure>
</div></section>
<section class="numeros-sec"><div class="in">${numeros}</div></section>

<section class="sec cats-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Equipamentos</p><h2>Linha completa para plantas produtoras de ração</h2><p>${C.equip}</p></div>
  <ul class="cats">${CAT.map((c, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, 'equipamentos')}#${c.id}"><span class="cats-fotos">${c.itens.slice(0, 3).map(s => fig(EQ[s].fotos[0][0], EQ[s].nome)).join('')}</span><h3>${c.t}</h3><p>${c.d}</p><span class="link-seta">${c.itens.length} equipamento${c.itens.length > 1 ? 's' : ''} ${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>

<section class="sec fabs-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Veja o que criamos</p><h2>Fábricas montadas por nossa equipe</h2></div>
  <ul class="fabs">${FAB_DESTAQUE.map((s, i) => fabCard(v, fabPor(s), i)).join('')}</ul>
  <p class="centro"><a class="btn btn-linha" href="${link(v, 'fabricas')}">Ver as ${FAB.length} fábricas ${ic('seta')}</a></p>
</div></section>

<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Tecnologia para produzir sempre mais e melhor</p><h2>Por que a Bergamini</h2></div>${pilares}</div></section>

<section class="sec etapas-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Como entregamos</p><h2>Do projeto à fábrica produzindo</h2></div>${etapas}</div></section>

<section class="sec clientes-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Desenvolvendo soluções</p><h2>Clientes que confiam na Bergamini</h2></div>${clientes}</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

// ---------- B "Linha de produção": foto aérea em tela cheia, fluxo da ração ----------
function versaoB() {
  const v = 'b';
  const mug = fabPor('irmaos-mugnol');
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}${mug.fotos[1][0]})"></div><div class="in hero-in">
  <p class="sobre">Bergamini Industrial · Concórdia – SC</p>
  <h1>Tecnologia para produzir sempre mais e melhor</h1>
  <p class="lead">Fábricas de ração de 5 a 100 toneladas por hora, manuais ou totalmente automatizadas, com equipamentos fabricados e montados pela Bergamini.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#form">Faça seu orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'fabricas')}">Fábricas montadas</a></div>
  ${numeros}
</div></section>

<section class="sec fluxo-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Da moega ao saco de ração</p><h2>Equipamentos para cada etapa da fábrica</h2><p>${C.equip}</p></div>
  ${fluxo(v)}
  <p class="centro"><a class="btn" href="${link(v, 'equipamentos')}">Ver os ${D.equip.length} equipamentos ${ic('seta')}</a></p>
</div></section>

<section class="sec mosaico-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Veja o que criamos</p><h2>${FAB.length} fábricas montadas por nossa equipe</h2></div>
  <ul class="mosaico">${FAB_DESTAQUE.slice(0, 5).map((s, i) => fabCard(v, fabPor(s), i, i === 0 ? ' m-grande' : '')).join('')}</ul>
  <p class="centro"><a class="link-seta" href="${link(v, 'fabricas')}">Todas as fábricas ${ic('seta')}</a></p>
</div></section>

<section class="sec sobre-home"><div class="in sobre-home-in">
  <figure class="sobe">${fig('empresa-aerea.webp', 'Sede da Bergamini Industrial em Concórdia')}</figure>
  <div class="sobe"><p class="sobre">Sobre nós</p><h2>Marca, qualidade e nome próprio</h2><p>${C.sobre[0]}</p>${pilares}<a class="link-seta" href="${link(v, 'sobre-nos')}">Conheça a Bergamini ${ic('seta')}</a></div>
</div></section>

<section class="sec clientes-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Desenvolvendo soluções</p><h2>Quem já produz com a Bergamini</h2></div>${clientes}</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Bergamini Industrial', artigo: 'da', url: E.url, lang: 'pt', cor: '#008c45', fundo: '#0d2a1c', claro: '#f2f6f3',
  fonteTitulo: "'Hanken Grotesk',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Planta', paginas: Object.keys(A).length, texto: 'Clara, com a fábrica Mais Frango na abertura, os números da empresa, os equipamentos por etapa e as fábricas montadas.', pontos: [`${D.equip.length} equipamentos com página própria`, `${FAB.length} fábricas com galeria de fotos`, 'Logo redesenhado em vetor'] },
    { letra: 'b', nome: 'Linha de produção', paginas: Object.keys(B).length, texto: 'Foto aérea em tela cheia e o caminho da ração, da moega ao ensaque, com os equipamentos de cada etapa.', pontos: ['Mesmos textos e fotos do site atual', 'Formulário que abre o WhatsApp', 'Clientes em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
