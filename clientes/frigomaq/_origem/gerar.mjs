// Frigomaq Frigo Industrial (Chapecó/SC): máquinas e equipamentos em aço inox para frigoríficos de aves, suínos e bovinos, industrializados, laticínios e pescados.
// node clientes/frigomaq/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs frigomaq http://www.frigomaq.net.br/)
// Catálogo do site atual (PHP de 2013): 81 equipamentos com descrição e fotos em _origem/conteudo.json. Logo redesenhado em vetor.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const D = JSON.parse(fs.readFileSync(path.join(aqui, 'conteudo.json'), 'utf8'));

const E = {
  nome: 'Frigomaq', url: 'https://frigomaq.overtus.com.br/', antigo: 'http://www.frigomaq.net.br/',
  fone: '(49) 3324-5591', fone2: '(49) 3199-1999', email: 'vendas@frigomaq.com.br',
  end: 'Rodovia SC 480, Km 5', bairro: 'Linha Rodeio Chato', cidade: 'Chapecó – SC',
  insta: 'https://www.instagram.com/_frigomaq/', yt: 'https://www.youtube.com/channel/UCcVtIgM7EZ8BRM4Bg0yQaBQ', linkedin: 'https://www.linkedin.com/in/frigomaq-frigo-industrial-4aa9aa18b/',
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1030.5213135503805!2d-52.62633429598528!3d-27.154441613095738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDA5JzE2LjAiUyA1MsKwMzcnMzIuNSJX!5e0!3m2!1spt-BR!2sbr!4v1474985297579',
  rota: 'https://www.google.com/maps/search/?api=1&query=-27.154441,-52.626334',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700&display=swap';
const IMG = '/assets/img/';
const PROD = D.prods;
const pPor = s => PROD.find(p => p.s === s);
const SEG = {
  aves: { t: 'Aves', d: 'Da recepção das gaiolas à embalagem secundária: equipamentos para cada etapa do abate e do processamento de aves.', f: 'corte-automatico-de-frangos' },
  suinos: { t: 'Suínos', d: 'Cortes primários, sangria, transporte, injeção de temperos, trilhamento e processamento de vísceras.', f: 'conjunto-para-cortes-primarios-de-suinos' },
  bovinos: { t: 'Bovinos', d: 'Processamento de vísceras, massageamento, selagem, encolhimento e lavagem de caixas e bacias.', f: 'picadora-e-lavadora-de-visceras' },
  industrializados: { t: 'Industrializados', d: 'Preparação de massas cárneas, sala de temperados e cozimento de embutidos: moedor, cutter, triblender, grades multiformas.', f: 'triblender-conjunto-para-preparacao-de-temperos' },
  laticinios: { t: 'Laticínios', d: 'Tanques, batedeira e misturador de manteiga, queijomat, prensas, moldadeira e filadeira para queijos.', f: 'filadeira-monobloco' },
  pescados: { t: 'Pescados', d: 'Descamação, lavagem, evisceração e transporte de pescados, com equipamentos em aço inox.', f: 'descamador-de-peixes' },
  'fabrica-de-farinhas': { t: 'Fábrica de farinhas', d: 'Digestor para o processamento de subprodutos em fábricas de farinhas.', f: 'digestor' },
  diversos: { t: 'Diversos', d: 'Carros de transporte, trocador de calor e projetos sob medida para indústrias de frutas e químicas.', f: 'carros-wermag' },
};
const SEGS = D.seg.map(([id]) => id);
const lista = id => D.ordem[id].map(([s]) => pPor(s));
const fotoSeg = id => { const p = pPor(SEG[id].f); return p && p.fotos.length ? p : lista(id).find(p => p.fotos.length); };
const ETAPAS = D.etapas.map(t => ({ t, ps: D.ordem.aves.filter(([, e]) => e === t).map(([s]) => pPor(s)) })).filter(e => e.ps.length);
const slugEt = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '-');
const DEST = ['desempilhador-automatico-de-gaiolas', 'corte-automatico-de-frangos', 'chiller-para-resfriamento-de-carcacas-de-frango', 'conjunto-para-cortes-primarios-de-suinos'];
const DEST_TX = {
  'desempilhador-automatico-de-gaiolas': 'Elimina o descarregamento manual de gaiolas, uma das funções de maior risco ergonômico no abate de aves.',
  'corte-automatico-de-frangos': 'Linha de corte automático totalmente nacional, para até 6.000 frangos por hora.',
  'chiller-para-resfriamento-de-carcacas-de-frango': 'Em aço inox 304, com helicoide, sistema de borbulho e acionamento por motorredutores.',
  'conjunto-para-cortes-primarios-de-suinos': 'Atende às NR-10, NR-12, NR-17 e NR-36, com barreiras fotoelétricas e discos para 1.000.000 de cortes entre afiações.',
};
const EMP = [
  'A Frigomaq é uma empresa especializada na fabricação de máquinas e equipamentos para a indústria alimentícia. Sua atuação abrange os segmentos que impulsionam o desenvolvimento nacional: as agroindústrias de aves, suínos, bovinos, peixes, queijos e industrializados.',
  'Fornecemos equipamentos padrões e soluções para o seu layout, e empregamos tecnologia para o aperfeiçoamento contínuo dos equipamentos. Os princípios de atuação da Frigomaq estão definidos em tecnologia atualizada, robustez, padrão de acabamento e acompanhamento ao cliente.',
  'Os equipamentos estão em grandes, médias e pequenas agroindústrias, sem distinção na aplicação desses princípios. O sucesso da Frigomaq vem da valorização do cliente e de suas necessidades, da seriedade de atuação no mercado, do respeito ao fornecedor e da valorização dos colaboradores.',
  'A Frigomaq fornece máquinas e equipamentos para a indústria nacional e atua no mercado externo, atendendo indústrias da América Central e da América do Sul.',
];
const PRINC = [
  { t: 'Tecnologia atualizada', d: 'Aperfeiçoamento contínuo dos equipamentos e soluções para o layout de cada planta.', i: 'engrenagem' },
  { t: 'Robustez', d: 'Construção em aço inox AISI 304, estruturas reforçadas para grandes capacidades de abate.', i: 'escudo' },
  { t: 'Padrão de acabamento', d: 'Equipamentos sanitários, fáceis de higienizar e de manter.', i: 'check' },
  { t: 'Acompanhamento ao cliente', d: 'Do estudo do projeto à instalação na parada de abate.', i: 'usuarios' },
];
const NEWS = [
  { d: '05/12/2013', t: 'Frigomaq finaliza instalação de sistema de desempilhamento automático em duas linhas de abate', f: 'noticia-desempilhador-2', p: [
    'A Frigomaq consolidou o sistema de desempilhamento automático de gaiolas em uma unidade de abate em Chapecó (SC). Após o desenvolvimento, o estudo do projeto e os testes no frigorífico próprio, a primeira unidade foi instalada em 2012. Na parada de abate seguinte, foi concluída a instalação do segundo equipamento, atendendo à demanda do cliente.',
    'O sistema vem ao encontro do desejo de eliminar funções com altos riscos ergonômicos. Uma das funções que exigem mais esforço no abate de aves é o descarregamento manual de gaiolas, com alta incidência de afastamentos, lesões por esforço repetitivo e problemas de coluna. A solução para esses casos passa pela automação dos processos.'] },
  { d: '04/11/2013', t: 'Frigomaq fabrica sala de industrializados', f: 'noticia-industrializados', p: [
    'Em mais de 20 anos de atuação na fabricação de equipamentos para a indústria alimentícia, a Frigomaq se destacou principalmente no segmento de aves. Paralelamente, a empresa também se destaca no segmento de industrializados, com praticamente uma linha completa de equipamentos.',
    'Da preparação de massas cárneas (quebradores de bloco, misturadeiras, moedores, cutters) à sala de temperados (injetora de temperos, triblenders, tumblers) e ao cozimento de embutidos (tanques de cozimento, resfriamento, grades multiformas, carros transportadores, elevadores e tombadores). Consulte a equipe comercial e conheça as vantagens de equipamentos padronizados e robustos, com valores atrativos.'] },
  { d: '17/09/2013', t: 'Frigomaq vende mais um sistema de desempilhamento de gaiolas de frango', f: 'noticia-desempilhador', p: [
    'Após dois anos de desenvolvimento em seu frigorífico próprio (Friaves), a Frigomaq lançou em 2011 o sistema de desempilhamento automático de gaiolas. Em 2013, o grupo BRF instalou em sua unidade de Chapecó (SC) a primeira unidade para capacidades maiores de abate, entre 8.000 e 10.000 aves por hora.',
    'Em seguida, a Frigomaq instalou mais um equipamento na planta da Seara em Lapa (PR), com capacidade entre 11.000 e 11.500 aves por hora, e em setembro foi contratada pela Frango Granjeiro, do Paraná. Equipamento com patente requerida.'] },
  { d: '27/12/2014', t: 'Futuras instalações da Frigomaq', f: 'noticia-instalacoes', p: ['Obras das novas instalações da Frigomaq em Chapecó com 80% de conclusão.'] },
];

const NAV = [
  { slug: 'index', nome: 'Home' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' },
  { slug: 'noticias', nome: 'Notícias' }, { slug: 'localizacao', nome: 'Localização' }, { slug: 'contato', nome: 'Contato' },
];
const fig = (f, alt, cls = '') => { const a = Array.isArray(f) ? f : [f]; return `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${a[0]}.webp" alt="${esc(alt)}"${a[1] ? ` width="${a[1]}" height="${a[2]}"` : ''} loading="lazy" decoding="async">`; };
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="Frigomaq Frigo Industrial" width="210" height="34">`;
const orc = (v, p) => `${link(v, 'contato')}${p ? `?equipamento=${encodeURIComponent(p)}` : ''}#form`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.end} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    <a class="btn topo-cta" href="${orc(v)}">Solicitar orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}
function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Equipamentos padrões e soluções para o seu layout</p><h2>Vai ampliar ou montar uma linha de abate ou processamento?</h2><p>Envie a capacidade desejada, o segmento e o layout da planta. A equipe comercial da Frigomaq retorna com a proposta.</p></div>
  <div class="cta-bts"><a class="btn" href="${orc(v)}">${ic('mail')} Solicitar orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>Máquinas e equipamentos em aço inox para a indústria de alimentos: aves, suínos, bovinos, industrializados, laticínios e pescados.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a><a href="${E.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
  <div><h3>Produtos</h3><ul class="rod-duas">${SEGS.map(s => `<li><a href="${link(v, `produtos/${s}`)}">${SEG[s].t}</a></li>`).join('')}</ul></div>
  <div><h3>Frigomaq</h3><ul><li><a href="${link(v, 'empresa')}">Empresa</a></li><li><a href="${link(v, 'noticias')}">Notícias</a></li><li><a href="${link(v, 'localizacao')}">Localização</a></li><li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.bairro}<br>${E.cidade}</p><p><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Frigomaq Frigo Industrial Ltda. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}
const pagina = (v, slug, ativo, titulo, descricao, corpo) => cabeca({ E, v, slug, titulo, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#2b2b2b' }) + topo(v, ativo) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto) => `<section class="pg-topo"><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Home</a>${trilha.map(([n, s]) => ` / ${s ? `<a href="${link(v, s)}">${esc(n)}</a>` : esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const resumo = p => (p.desc[0] || '').replace(/\.$/, '');
const card = (v, p, i = 0) => `<li class="sobe" style="--i:${i % 6}"><a href="${link(v, `equipamentos/${p.s}`)}"><span class="pd-foto">${p.fotos.length ? fig(p.fotos[0], p.nome) : `<span class="pd-sem">${logo()}</span>`}</span><span class="pd-txt"><b>${p.nome}</b>${p.desc.length > 1 || (p.desc[0] || '').length > 30 ? `<small>${esc(resumo(p).slice(0, 90))}${resumo(p).length > 90 ? '…' : ''}</small>` : ''}</span></a></li>`;
const segTiles = v => `<ul class="segs">${SEGS.map((s, i) => { const p = fotoSeg(s); return `<li class="sobe" style="--i:${i % 4}"><a href="${link(v, `produtos/${s}`)}">${fig(p.fotos[0], SEG[s].t)}<div><h3>${SEG[s].t}</h3><p>${SEG[s].d}</p><span class="link-seta">${lista(s).length} equipamento${lista(s).length > 1 ? 's' : ''} ${ic('seta')}</span></div></a></li>`; }).join('')}</ul>`;
const fluxo = v => `<ol class="fluxo">${ETAPAS.map((e, i) => `<li class="sobe" style="--i:${i % 6}"><a href="${link(v, 'produtos/aves')}#${slugEt(e.t)}"><span class="fl-n">${String(i + 1).padStart(2, '0')}</span><b>${e.t}</b><small>${e.ps.length} equip.</small></a></li>`).join('')}</ol>`;
const princ = `<ul class="princ">${PRINC.map((s, i) => `<li class="sobe" style="--i:${i}">${ic(s.i)}<div><b>${s.t}</b><span>${s.d}</span></div></li>`).join('')}</ul>`;
const destaques = v => `<ul class="dest">${DEST.map((s, i) => { const p = pPor(s); return `<li class="sobe" style="--i:${i}"><a href="${link(v, `equipamentos/${s}`)}">${fig(p.fotos[0], p.nome)}<div><h3>${p.nome}</h3><p>${DEST_TX[s]}</p><span class="link-seta">Ver equipamento ${ic('seta')}</span></div></a></li>`; }).join('')}</ul>`;
const desc = p => {
  if (!p.desc.length) return '';
  const lst = p.desc.length > 1 && p.desc.every(x => x.length < 260);
  return lst ? `<ul class="pr-itens${p.desc.length > 10 ? ' pr-itens-2' : ''}">${p.desc.map(x => `<li>${ic('check')} <span>${esc(x)}</span></li>`).join('')}</ul>` : p.desc.map(x => `<p>${esc(x)}</p>`).join('');
};
const formulario = `<form class="form" id="form" data-email="${E.email}" data-assunto="Solicitação de orçamento pelo site">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>CPF/CNPJ<input name="cnpj"></label><label>Cidade/Estado<input name="cidade" autocomplete="address-level2"></label></div>
  <label>Equipamento<select name="equipamento" data-param="equipamento"><option>Projeto ou linha completa</option>${[...PROD].sort((a, b) => a.nome.localeCompare(b.nome)).map(p => `<option>${p.nome}</option>`).join('')}<option>Outro assunto</option></select></label>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Segmento, capacidade (aves ou carcaças por hora), layout e prazo."></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail, endereçada a ${E.email}.</p>
</form>
<script>(()=>{const q=new URLSearchParams(location.search).get('equipamento');const s=document.querySelector('[data-param=equipamento]');if(q&&s)s.value=q})()</script>`;

function internas(v) {
  const P = {};
  P.produtos = pagina(v, 'produtos', 'produtos', 'Produtos · Frigomaq', 'Máquinas e equipamentos Frigomaq para aves, suínos, bovinos, industrializados, laticínios, pescados e fábricas de farinhas.',
    cabecalhoPg(v, [['Produtos']], 'Equipamentos por segmento', `${PROD.length} equipamentos em aço inox para frigoríficos e indústrias de alimentos, fabricados em Chapecó (SC).`) + `
<section class="sec"><div class="in">${segTiles(v)}</div></section>
<section class="sec fluxo-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Linha de aves</p><h2>Um equipamento para cada etapa do abate</h2></div>${fluxo(v)}</div></section>`);
  for (const s of SEGS) {
    const ps = lista(s);
    const corpo = s === 'aves'
      ? `<section class="sec seg-sec"><div class="in"><nav class="et-nav" aria-label="Etapas">${ETAPAS.map((e, i) => `<a href="#${slugEt(e.t)}"><i>${String(i + 1).padStart(2, '0')}</i> ${e.t}</a>`).join('')}</nav>${ETAPAS.map((e, i) => `<section class="etapa" id="${slugEt(e.t)}"><div class="et-tit sobe"><span>${String(i + 1).padStart(2, '0')}</span><h2>${e.t}</h2></div><ul class="pds">${e.ps.map((p, k) => card(v, p, k)).join('')}</ul></section>`).join('')}</div></section>`
      : `<section class="sec seg-sec"><div class="in"><ul class="pds">${ps.map((p, k) => card(v, p, k)).join('')}</ul></div></section>`;
    P[`produtos/${s}`] = pagina(v, `produtos/${s}`, 'produtos', `${SEG[s].t} · Frigomaq`, SEG[s].d,
      cabecalhoPg(v, [['Produtos', 'produtos'], [SEG[s].t]], SEG[s].t, SEG[s].d) + `<nav class="seg-nav"><div class="in">${SEGS.map(x => `<a href="${link(v, `produtos/${x}`)}"${x === s ? ' class="ativo" aria-current="page"' : ''}>${SEG[x].t}</a>`).join('')}</div></nav>` + corpo);
  }
  for (const p of PROD) {
    const s0 = p.segs[0][0];
    const outros = lista(s0).filter(o => o.s !== p.s && (s0 !== 'aves' || D.ordem.aves.find(([x]) => x === o.s)[1] === p.segs[0][1])).slice(0, 4);
    const mais = outros.length < 4 ? lista(s0).filter(o => o.s !== p.s && !outros.includes(o)).slice(0, 4 - outros.length) : [];
    const vid = (p.video[0] || '').match(/v=([\w-]{11})/);
    P[`equipamentos/${p.s}`] = pagina(v, `equipamentos/${p.s}`, 'produtos', `${p.nome} · Frigomaq`, `${p.nome} Frigomaq: ${p.desc.slice(0, 2).join('. ')}`.slice(0, 160),
      `<section class="pr-topo"><div class="in pr-topo-in">
  <div class="pr-galeria sobe">${p.fotos.length ? `<a class="pr-principal" href="${IMG}${p.fotos[0][0]}.webp" data-foto>${fig(p.fotos[0], p.nome)}</a>${p.fotos.length > 1 ? `<div class="pr-mini">${p.fotos.slice(1).map(f => `<a href="${IMG}${f[0]}.webp" data-foto>${fig(f, p.nome)}</a>`).join('')}</div>` : ''}` : `<div class="pr-principal pr-sem">${logo()}<p>Foto sob consulta</p></div>`}</div>
  <div class="pr-cab sobe"><p class="trilha"><a href="${link(v, 'index')}">Home</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, `produtos/${s0}`)}">${SEG[s0].t}</a></p>
    <h1>${p.nome}</h1>
    <ul class="pr-segs">${p.segs.map(([sg, et]) => `<li><a href="${link(v, `produtos/${sg}`)}${et ? `#${slugEt(et)}` : ''}">${SEG[sg].t}${et ? ` · ${et}` : ''}</a></li>`).join('')}</ul>
    ${p.desc.length <= 3 ? desc(p) : `<p class="pr-resumo">${esc(p.desc[0])}</p>`}
    <div class="hero-bts"><a class="btn" href="${orc(v, p.nome)}">${ic('mail')} Solicitar orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div></div>
</div></section>
${p.desc.length > 3 || vid ? `<section class="sec pr-corpo"><div class="in">
  ${p.desc.length > 3 ? `<div class="sobe"><h2>Características</h2>${desc({ ...p, desc: p.desc.slice(1) })}</div>` : ''}
  ${vid ? `<div class="pr-video sobe"><h2>Vídeo do equipamento</h2><iframe src="https://www.youtube-nocookie.com/embed/${vid[1]}" title="Vídeo: ${esc(p.nome)}" loading="lazy" allowfullscreen></iframe></div>` : ''}
</div></section>` : ''}
${outros.length + mais.length ? `<section class="sec outros-sec"><div class="in"><div class="sec-tit sobe"><h2>Outros equipamentos para ${SEG[s0].t.toLowerCase()}</h2></div><ul class="pds pds-mini">${[...outros, ...mais].map((o, i) => card(v, o, i)).join('')}</ul></div></section>` : ''}`);
  }
  P.empresa = pagina(v, 'empresa', 'empresa', 'Empresa · Frigomaq', 'A Frigomaq fabrica máquinas e equipamentos para a indústria alimentícia em Chapecó (SC), atendendo agroindústrias do Brasil, da América Central e da América do Sul.',
    cabecalhoPg(v, [['Empresa']], 'Máquinas para a indústria de alimentos', 'Fabricação própria em Chapecó (SC), no coração da agroindústria de aves e suínos.') + `
<section class="sec"><div class="in emp-in">
  <div class="sobe emp-txt">${EMP.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="emp-foto sobe">${fig('planta', 'Linha de processamento com equipamentos Frigomaq em aço inox')}<figcaption>Equipamentos Frigomaq em operação</figcaption></figure>
</div></section>
<section class="sec princ-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Princípios de atuação</p><h2>Como a Frigomaq trabalha</h2></div>${princ}</div></section>
<section class="sec"><div class="in friaves">
  <div class="sobe"><p class="sobre">Testado em casa</p><h2>Desenvolvido no frigorífico do grupo</h2><p>O sistema de desempilhamento automático de gaiolas foi desenvolvido durante dois anos no frigorífico próprio do grupo, a Friaves, antes de ser lançado em 2011. Hoje opera em plantas de 8.000 a 11.500 aves por hora.</p><a class="link-seta" href="${link(v, 'noticias')}">Ler as notícias ${ic('seta')}</a></div>
  ${fig(pPor('desempilhador-automatico-de-gaiolas').fotos[0], 'Sistema de desempilhamento automático de gaiolas Frigomaq', 'sobe')}
</div></section>`);
  P.noticias = pagina(v, 'noticias', 'noticias', 'Notícias · Frigomaq', 'Notícias da Frigomaq: sistema de desempilhamento automático de gaiolas, sala de industrializados e novas instalações.',
    cabecalhoPg(v, [['Notícias']], 'Notícias', 'Instalações, lançamentos e novidades da Frigomaq.') + `
<section class="sec"><div class="in news">${NEWS.map(n => `<article class="nw sobe">${fig(n.f, n.t)}<div><time>${n.d}</time><h2>${n.t}</h2>${n.p.map(p => `<p>${p}</p>`).join('')}</div></article>`).join('')}
<div class="nw-redes sobe"><h2>Acompanhe a Frigomaq</h2><p>Novidades de equipamentos e vagas nas redes sociais.</p><p class="redes-g"><a class="btn btn-linha" href="${E.insta}" target="_blank" rel="noopener">${ic('insta')} Instagram</a><a class="btn btn-linha" href="${E.yt}" target="_blank" rel="noopener">${ic('yt')} YouTube</a><a class="btn btn-linha" href="${E.linkedin}" target="_blank" rel="noopener">${ic('linkedin')} LinkedIn</a></p></div>
</div></section>`);
  P.localizacao = pagina(v, 'localizacao', 'localizacao', 'Localização · Frigomaq', `Frigomaq: ${E.end}, ${E.bairro}, ${E.cidade}.`,
    cabecalhoPg(v, [['Localização']], 'Localização', `${E.end}, ${E.bairro}, ${E.cidade}.`) + `
<section class="sec"><div class="in loc-in">
  <div class="sobe"><h2>Fábrica em Chapecó</h2><p class="loc-end"><b>Frigomaq Frigo Industrial Ltda.</b><br>${E.end}<br>${E.bairro}<br>${E.cidade}</p><p><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p><a class="btn" href="${E.rota}" target="_blank" rel="noopener">${ic('pin')} Traçar rota</a></div>
  <iframe class="mapa sobe" src="${E.mapa}" title="Mapa da Frigomaq em Chapecó" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div></section>`);
  P.contato = pagina(v, 'contato', 'contato', 'Contato · Frigomaq', `Fale com a Frigomaq: ${E.fone}, ${E.fone2}, ${E.email}.`,
    cabecalhoPg(v, [['Contato']], 'Contato', 'Solicite orçamento de equipamentos, linhas completas ou projetos sob medida.') + `
<section class="sec"><div class="in cont-in">
  <div class="sobe"><h2>Fale com a equipe comercial</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefones</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.bairro}<br>${E.cidade}</span></div></li>
  </ul></aside>
</div></section>`);
  return P;
}

const T_HOME = 'Frigomaq · Máquinas e equipamentos para a indústria de alimentos';
const D_HOME = 'Frigomaq, Chapecó/SC: máquinas e equipamentos em aço inox para frigoríficos de aves, suínos e bovinos, industrializados, laticínios e pescados.';

// ---------- A "Inox": clara, máquina em render ao lado do título e os segmentos em grade ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Chapecó – SC · Frigo Industrial</p>
    <h1>Máquinas e equipamentos para a indústria de alimentos</h1>
    <p class="lead">Produzimos máquinas e equipamentos em aço inox conforme as necessidades de cada cliente, para frigoríficos de aves, suínos e bovinos, industrializados, laticínios e pescados.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver equipamentos ${ic('seta')}</a><a class="btn btn-linha" href="${orc(v)}">Solicitar orçamento</a></div>
  </div>
  <figure class="hero-foto">${fig(pPor('corte-automatico-de-frangos').fotos[0], 'Linha de corte automático de frangos Frigomaq')}<figcaption><b>6.000</b>frangos por hora no corte automático</figcaption></figure>
</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Segmentos</p><h2>Do abate à embalagem</h2></div>${segTiles(v)}</div></section>
<section class="sec fluxo-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Linha de aves</p><h2>Um equipamento para cada etapa</h2><p>Da recepção das gaiolas ao transporte a vácuo, a Frigomaq fabrica os equipamentos de toda a linha.</p></div>${fluxo(v)}</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Destaques</p><h2>Automação que reduz esforço e aumenta a capacidade</h2></div>${destaques(v)}</div></section>
<section class="sec princ-sec"><div class="in">${princ}</div></section>
<section class="sec"><div class="in friaves">
  <div class="sobe"><p class="sobre">Testado em casa</p><h2>Equipamentos desenvolvidos no frigorífico do grupo</h2><p>O desempilhador automático de gaiolas passou dois anos em desenvolvimento no frigorífico próprio, a Friaves, e hoje opera em plantas de 8.000 a 11.500 aves por hora em Santa Catarina e no Paraná.</p><a class="link-seta" href="${link(v, 'noticias')}">Ler as notícias ${ic('seta')}</a></div>
  ${fig('noticia-desempilhador', 'Desempilhador automático de gaiolas Frigomaq', 'sobe')}
</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

// ---------- B "Linha": grafite, sala de cortes ao fundo e a linha de aves numerada ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}planta.webp)"></div><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Frigomaq · Frigo Industrial</p>
    <h1>Equipamentos em aço inox para frigoríficos e indústrias de alimentos</h1>
    <p class="lead">Aves, suínos, bovinos, industrializados, laticínios e pescados. Equipamentos padrões e soluções para o layout da sua planta, fabricados em Chapecó (SC).</p>
    <div class="hero-bts"><a class="btn" href="${orc(v)}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver equipamentos</a></div>
  </div>
  <ul class="hero-num"><li><b>${PROD.length}</b><span>equipamentos no catálogo</span></li><li><b>8</b><span>segmentos atendidos</span></li><li><b>11.500</b><span>aves/hora no desempilhador</span></li></ul>
</div></section>
<section class="seg-faixa"><div class="in"><ul>${SEGS.map(s => `<li><a href="${link(v, `produtos/${s}`)}">${SEG[s].t}<small>${lista(s).length}</small></a></li>`).join('')}</ul></div></section>
<section class="sec linha-b"><div class="in linha-in">
  <div class="sec-tit sobe"><p class="sobre">Linha de aves</p><h2>Da gaiola à caixa</h2><p>Equipamentos Frigomaq em cada etapa do abate e processamento de aves. Clique na etapa para ver os equipamentos.</p><a class="btn" href="${link(v, 'produtos/aves')}">Todos os equipamentos para aves ${ic('seta')}</a></div>
  ${fluxo(v)}
</div></section>
<section class="sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Destaques</p><h2>Automação desenvolvida e testada pela Frigomaq</h2></div>${destaques(v)}</div></section>
<section class="sec segs-b"><div class="in"><div class="sec-tit sobe"><p class="sobre">Segmentos</p><h2>Equipamentos para cada indústria</h2></div>${segTiles(v)}</div></section>
<section class="sec princ-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Princípios de atuação</p><h2>Tecnologia, robustez, acabamento e acompanhamento</h2></div>${princ}</div></section>`;
  return { index: pagina(v, 'index', 'index', T_HOME, D_HOME, home), ...internas(v) };
}

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Frigomaq', artigo: 'da', url: E.url, lang: 'pt', cor: '#e3262d', fundo: '#1f2022', claro: '#f1f2f3',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Inox', paginas: Object.keys(A).length, texto: 'Clara, com a linha de corte automático ao lado do título, os segmentos em grade, a linha de aves etapa por etapa e os equipamentos em destaque.', pontos: [`${PROD.length} equipamentos com página própria`, 'Fotos e descrições do catálogo atual', 'Logo redesenhado em vetor'] },
    { letra: 'b', nome: 'Linha', paginas: Object.keys(B).length, texto: 'Grafite, com a sala de cortes ao fundo, os segmentos numa faixa e a linha de aves numerada da gaiola à caixa.', pontos: ['Orçamento direto por e-mail', 'Notícias e localização mantidas', 'Equipamentos organizados por etapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
