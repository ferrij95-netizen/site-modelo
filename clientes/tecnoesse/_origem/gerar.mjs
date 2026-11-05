// Tecnoesse Indústria Avícola e Suinícola (Jataí/GO): galpões "chave na mão" e equipamentos para aviários desde 1998.
// node clientes/tecnoesse/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tecnoesse https://tecnoesse.com.br/)
// Textos, fichas dos 15 produtos, representantes, manuais, linhas de crédito e notícias: do site atual (WordPress/Elementor).
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const PROD = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const REPS = JSON.parse(fs.readFileSync(path.join(aqui, 'representantes.json'), 'utf8'));

const E = {
  nome: 'Tecnoesse', url: 'https://tecnoesse.overtus.com.br/', antigo: 'https://tecnoesse.com.br/',
  fone: '(64) 3632-8000', cel1: '(64) 98112-2400', cel2: '(64) 99975-8916', wa: '5564981122400', email: 'pedidos@tecnoesse.com.br',
  end: 'Via Secundária s/n, Quadra 03, Lote 27/38', bairro: 'Distrito Agroindustrial', cidade: 'Jataí – GO', cep: '75800-970',
  horario: 'Segunda a sexta, das 7h45 às 17h25',
  insta: 'https://www.instagram.com/tecnoesse/', face: 'https://www.facebook.com/tecnoesse', yt: 'https://www.youtube.com/@TecnoesseOficial',
  mapa: 'https://www.google.com/maps?q=-17.92348,-51.687272&z=15&output=embed', rota: 'https://www.google.com/maps/dir//-17.92348,-51.687272',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Teko:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';
const msgWa = o => `Olá! Vim pelo site da Tecnoesse e gostaria de ${o}.`;

const CATS = [
  { id: 'galpoes', nome: 'Galpões e armazenagem', curto: 'Galpões', d: 'Galpões "chave na mão", silos metálicos e linha primária de transporte de ração.', i: 'casa' },
  { id: 'alimentacao', nome: 'Alimentação', curto: 'Alimentação', d: 'Comedouros automáticos e manuais com regulagem coletiva e borda anti-desperdício.', i: 'pacote' },
  { id: 'agua', nome: 'Água', curto: 'Água', d: 'Bebedouros nipple de média e alta vazão em sistema fechado.', i: 'gota' },
  { id: 'clima', nome: 'Climatização e ventilação', curto: 'Climatização', d: 'Exaustores, ventiladores, nebulizadores, painel evaporativo, inlets e tunnel door.', i: 'floco' },
];
const porCat = id => PROD.filter(p => p.cat === id);
const catDe = p => CATS.find(c => c.id === p.cat);
const ordem = ['galpoes-para-aves', 'silo-metalico-para-racao', 'linha-primaria', 'comedouro-tecnoplus-automatico', 'comedouro-tecnoplus-manual', 'comedouro-automatico-cip-2000', 'comedouro-manual-infantil', 'bebedouro-nipple', 'exaustor', 'ventiladores', 'nebulizador-alta-pressao', 'nebulizador-media-pressao', 'cooling', 'inlet-metalico', 'tunnel-door'];
PROD.sort((a, b) => ordem.indexOf(a.slug) - ordem.indexOf(b.slug));
const resumo = p => (p.intro[0] || p.secoes[0]?.itens.slice(0, 2).join('; ') || '').replace(/\.$/, '');

const NUM = [
  { n: '1998', t: 'em Jataí, Goiás' }, { n: '48.000 m²', t: 'de área total, 11.000 m² de parque fabril' },
  { n: `${REPS.length}`, t: 'representantes em 14 estados' }, { n: 'Itália', t: 'empresa irmã Sperotto S.p.A.' },
];
const CHAVE = [
  { t: 'Projeto', d: 'Dimensionamento do galpão e dos equipamentos para a sua granja e o seu alojamento.' },
  { t: 'Obra civil', d: 'Pilares, muretas em concreto armado vibrado, tesouras galvanizadas e cobertura.' },
  { t: 'Equipamentos', d: 'Comedouros, bebedouros, silos e climatização fabricados em Jataí.' },
  { t: 'Instalação', d: 'Montagem no local e entrega técnica com a equipe Tecnoesse.' },
  { t: 'Pós-venda', d: 'Assistência técnica pela rede de representantes em todo o país.' },
];
const SOBRE = [
  'Desde 1998, a Tecnoesse é uma das empresas mais conhecidas e estimadas do Brasil no fornecimento de plantas <b>"turn key" (chave na mão)</b> para aves de corte.',
  'Projetamos, produzimos e testamos a última geração de equipamentos para avicultura e suinocultura, com base em mais de 20 anos de experiência em contato direto com nossos clientes.',
  'Oferecemos apenas produtos tecnologicamente avançados e altamente confiáveis, caracterizados por materiais de alta qualidade e atenção aos detalhes, para fornecer aos nossos clientes ferramentas que otimizem seus lucros.',
  'De nossa sede em Jataí, no estado de Goiás, fornecemos nossos produtos para todos os países do mundo.',
];
const PORQUE = [
  { t: 'Área total', d: '48.000 m², sendo 11.000 m² de parque fabril.', i: 'fabrica' },
  { t: 'Vários estados', d: 'Presença em vários estados graças a uma rede de representantes consolidada.', i: 'pin' },
  { t: 'Internacional', d: 'Empresa irmã na Itália, Sperotto S.p.A., para todo o mercado avícola mundial.', i: 'estrela' },
  { t: 'Maquinário de ponta', d: 'Área de produção com máquinas modernas e instalações de alta tecnologia.', i: 'engrenagem' },
  { t: 'Serviços de qualidade', d: 'Atendimento em todas as fases do fornecimento, do projeto à instalação no local e ao pós-venda.', i: 'escudo' },
  { t: 'Anos de experiência', d: 'Habilidades técnicas altamente especializadas e experiência nacional considerável.', i: 'usuarios' },
];
const MVV = [
  { t: 'Missão', d: 'Criar e desenvolver soluções completas para a indústria de avicultura e suinocultura, com foco na satisfação e rentabilidade do cliente com garantia dos serviços prestados.' },
  { t: 'Visão', d: 'Tornar-se referência sul-americana no sistema "turn key" (chave na mão) de fornecimento de equipamentos e galpões para a avicultura e suinocultura, mantendo o compromisso com a qualidade e satisfação do cliente.' },
  { t: 'Valores', d: 'Além do compromisso com resultado, honestidade, transparência, pontualidade, credibilidade e ética, que são valores essenciais, o trabalho em equipe, a preferência do cliente e o respeito ao meio ambiente.' },
];
const CREDITO = [
  { t: 'FCO Rural – Investimento Agropecuário', d: 'Crédito destinado a investimentos fixos e semifixos na região Centro-Oeste. Financia materiais e equipamentos para armazenagem, barragens, obras civis, máquinas, implementos, energia, irrigação, entre outras atividades.', u: 'https://www.bb.com.br/pbb/pagina-inicial/agronegocios/agronegocio---produtos-e-servicos/credito/investir-em-sua-atividade/fco-rural-investimento#/' },
  { t: 'Pronamp Investimento', d: 'Crédito destinado ao médio produtor rural. Financia bens novos, como máquinas, equipamentos, caminhões e embarcações, estruturas de armazenagem e outros serviços necessários ao empreendimento.', u: 'https://www.bb.com.br/pbb/pagina-inicial/agronegocios/agronegocio---produtos-e-servicos/credito/investir-em-sua-atividade/pronamp-investimento#/' },
  { t: 'Programa Mais Alimentos', d: 'Com o Investimento Agropecuário Tradicional você financia bens e serviços cujo desfrute se estende por vários períodos de produção, ainda que o plano de investimento contenha recursos para custeio.', u: 'https://www.bb.com.br/pbb/pagina-inicial/agronegocios/agronegocio---produtos-e-servicos/credito/investir-em-sua-atividade/investimento-agropecuario-tradicional#/' },
  { t: 'Inovagro', d: 'Investe em inovação tecnológica na propriedade rural para aumentar a produtividade, a adoção de boas práticas de gestão e agropecuária e a inserção competitiva dos produtores rurais nos diferentes mercados.', u: 'https://www.bb.com.br/pbb/pagina-inicial/agronegocios/agronegocio---produtos-e-servicos/credito/investir-em-sua-atividade/inovagro#/' },
];
const MANUAIS = [
  { t: 'Silo Ø2,85 m 6 pernas', p: 'silo-metalico-para-racao', u: 'https://tecnoesse.com.br/manual/silo-o2-85m-6-pernas-manual-de-montagem/' },
  { t: 'Inlet metálico', p: 'inlet-metalico', u: 'https://tecnoesse.com.br/manual/inlet-metalico-manual-de-montagem/' },
  { t: 'Tunnel door', p: 'tunnel-door', u: 'https://tecnoesse.com.br/manual/manual-de-montagem-tunnel-door/' },
  { t: 'Conjunto painel evaporativo (cooling)', p: 'cooling', u: 'https://tecnoesse.com.br/manual/cooling-conjunto-painel-evaporativo/' },
];
const NOTICIAS = [
  { slug: 'segundo-dia-siavs-2024', data: '07/08/2024', t: 'Tecnoesse e o segundo dia no SIAVS 2024', capa: 'n-siavs-estande.webp',
    txt: ['A Tecnoesse participa desse grande evento internacional da agroindústria para dividir sua tecnologia mundial, por meio de seus lançamentos e sistemas inovadores, ampliando o seu portfólio tecnológico para contribuir ainda mais com os avicultores e suinocultores.', 'Esta é a maior feira dos setores do Brasil, e o nosso estande já é um sucesso de público, com presença forte de lideranças empresariais e políticas.', 'Participe desta oportunidade e venha até o estande 138. O SIAVS acontece até o dia 8 de agosto, no Distrito Anhembi, em São Paulo.'], fotos: [] },
  { slug: 'siavs-2024', data: '03/08/2024', t: 'SIAVS 2024 começa no dia 6 de agosto e a Tecnoesse estará presente', capa: 'n-siavs.webp',
    txt: ['Entre os dias 6 e 8 de agosto, o Distrito Anhembi, em São Paulo, sediará a edição de 2024 do Salão Internacional de Proteína Animal (SIAVS). O evento é organizado pela Associação Brasileira de Proteína Animal (ABPA) e reunirá mais de 100 marcas brasileiras, entre empresas e cooperativas produtoras e exportadoras de aves, suínos, bovinos, ovos e peixes.', 'A equipe Tecnoesse está pronta para apresentar a você, visitante, grandes novidades em estruturas para aviários e suinocultura. Siga nossas redes sociais e acompanhe a cobertura ao vivo.', '<b>Data:</b> 6 a 8 de agosto de 2024 · <b>Local:</b> Distrito Anhembi, Av. Olavo Fontoura, 1209, São Paulo · <b>Horário:</b> 11h às 19h (dias 6 e 7) e 11h às 17h (dia 8).'], fotos: [] },
  { slug: 'tecnoesse-no-nordeste', data: '23/04/2024', t: 'A Tecnoesse crava sua bandeira em território nordestino', capa: 'n-nordeste-4.webp',
    txt: ['De 15 a 18 de abril de 2024, a Tecnoesse promoveu um evento no Agreste Pernambucano.', 'Estiveram presentes a gerência, a supervisão comercial e técnica da Tecnoesse, com apresentações às empresas do segmento como Natto, Mauricea e Vitória.', 'Na oportunidade, também foi feita a entrega técnica de 2 aviários que serão integrados à Vitória.'], fotos: ['n-nordeste-1.webp', 'n-nordeste-2.webp', 'n-nordeste-3.webp', 'n-nordeste-4.webp'] },
  { slug: 'show-rural-coopavel-2024', data: '18/02/2024', t: 'Show Rural Coopavel 2024', capa: 'n-showrural-1.webp',
    txt: ['A edição de 5 a 9 de fevereiro de 2024 do Show Rural Coopavel foi um sucesso.', 'Estiveram no estande Tecnoesse diretores, gerentes e técnicos das principais agroindústrias do Brasil e do exterior, além da visita em massa do público-alvo, os produtores rurais. Durante o evento foi possível consolidar e prospectar negociações.', 'Confira um pouco do que foi a Tecnoesse e seu time comercial, liderado por Murilo Cantu.'], fotos: ['n-showrural-1.webp', 'n-showrural-2.webp', 'n-showrural-3.webp', 'n-showrural-4.webp', 'n-showrural-5.webp', 'n-showrural-6.webp'] },
];

const NAV = [
  { slug: 'index', nome: 'Inicial' }, { slug: 'a-tecnoesse', nome: 'A Tecnoesse' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'representantes', nome: 'Representantes' },
  { slug: 'linhas-de-credito', nome: 'Linhas de crédito' }, { slug: 'noticias', nome: 'Notícias' }, { slug: 'manuais', nome: 'Manuais' }, { slug: 'contato', nome: 'Contato' },
];
const titulos = { index: 'Tecnoesse · Galpões e equipamentos para avicultura e suinocultura', 'a-tecnoesse': 'A Tecnoesse · Tecnologia italiana, coração brasileiro', produtos: 'Produtos · Tecnoesse', representantes: 'Representantes · Tecnoesse', 'linhas-de-credito': 'Linhas de crédito · Tecnoesse', noticias: 'Notícias · Tecnoesse', manuais: 'Manuais de montagem · Tecnoesse', contato: 'Contato · Tecnoesse' };
const desc = {
  index: 'Tecnoesse, Jataí/GO desde 1998: galpões para aves "chave na mão", silos, comedouros, bebedouros, exaustores e climatização para aviários. Tecnologia italiana, coração brasileiro.',
  'a-tecnoesse': 'Desde 1998 em Jataí (GO), a Tecnoesse fornece plantas "turn key" para aves de corte. 48.000 m² de área e empresa irmã na Itália, Sperotto S.p.A.',
  produtos: 'Galpões para aves, silos metálicos, linha primária, comedouros Tecnoplus e CIP 2000, bebedouro nipple, exaustores, ventiladores, nebulizadores, cooling, inlets e tunnel door.',
  representantes: `Rede de ${REPS.length} representantes Tecnoesse em 14 estados para vendas e assistência técnica.`,
  'linhas-de-credito': 'Financie seu aviário: FCO Rural, Pronamp Investimento, Programa Mais Alimentos e Inovagro.',
  noticias: 'Notícias da Tecnoesse: SIAVS 2024, Show Rural Coopavel e entregas técnicas.',
  manuais: 'Manuais de montagem Tecnoesse: silo, inlet metálico, tunnel door e painel evaporativo.',
  contato: 'Fale com a Tecnoesse: (64) 3632-8000, pedidos@tecnoesse.com.br. Distrito Agroindustrial, Jataí – GO.',
};
for (const p of PROD) { titulos[`produtos/${p.slug}`] = `${p.nome} · Tecnoesse`; desc[`produtos/${p.slug}`] = `${p.nome} Tecnoesse: ${resumo(p)}.`.slice(0, 300); }
for (const n of NOTICIAS) { titulos[`noticias/${n.slug}`] = `${n.t} · Tecnoesse`; desc[`noticias/${n.slug}`] = n.txt[0].slice(0, 280); }

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = `<img class="logo" src="${IMG}logo.webp" alt="Tecnoesse: tecnologia italiana, coração brasileiro" width="700" height="284">`;
const btnWa = (txt, o, cls = 'btn') => `<a class="${cls} btn-wa" href="${waHref(E.wa, msgWa(o))}" target="_blank" rel="noopener">${icWa()} ${txt}</a>`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span class="faixa-it">${E.horario}</span>
    <span class="faixa-dir"><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${icWa()} ${E.cel1}</a><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    ${btnWa('Orçamento', 'um orçamento', 'btn topo-cta')}
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Sua granja, chave na mão</p><h2>Vamos projetar o seu aviário?</h2><p>Fale com a equipe comercial Tecnoesse e receba o aconselhamento técnico para galpões e equipamentos.</p></div>
  <div class="cta-bts">${btnWa('Falar no WhatsApp', 'falar com a equipe comercial')}<a class="btn btn-linha" href="${link(v, 'contato')}#form">${ic('mail')} Enviar mensagem</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca"><span class="rodape-logo">${logo}</span><p>Tecnoesse Indústria e Comércio Ltda. Galpões e equipamentos para avicultura e suinocultura desde 1998.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
  <div><h3>Produtos</h3><ul>${CATS.map(c => `<li><a href="${link(v, 'produtos')}#${c.id}">${c.nome}</a></li>`).join('')}<li><a href="${link(v, 'manuais')}">Manuais de montagem</a></li></ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'a-tecnoesse')}">A Tecnoesse</a></li><li><a href="${link(v, 'representantes')}">Representantes</a></li><li><a href="${link(v, 'linhas-de-credito')}">Linhas de crédito</a></li><li><a href="${link(v, 'noticias')}">Notícias</a></li><li><a href="${link(v, 'contato')}#form">Seja um representante</a></li><li><a href="${link(v, 'contato')}#form">Trabalhe conosco</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</p><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel1}</a> · <a href="${waHref('5564999758916')}" target="_blank" rel="noopener">${E.cel2}</a><br><a href="mailto:${E.email}">${E.email}</a></p><p class="rodape-hora">${E.horario}</p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Tecnoesse. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
<a class="wa-flutua" href="${waHref(E.wa, msgWa('um orçamento'))}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#01643b' }) + topo(v, slug.split('/')[0]) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => s ? ` / <a href="${link(v, s)}">${n}</a>` : ` / ${esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;
const galeria = (fotos, alt) => `<div class="galeria">${fotos.map(f => `<a href="${IMG}${f}" data-foto>${fig(f, alt)}</a>`).join('')}</div>`;

// ---------- blocos ----------
const cartaoProd = v => (p, i = 0) => `<li class="sobe" style="--i:${i % 4}"><a class="prod" href="${link(v, `produtos/${p.slug}`)}"><span class="prod-foto">${fig(`p-${p.slug}.webp`, p.nome)}</span><span class="prod-cat">${catDe(p).curto}</span><strong>${p.nome}</strong><span class="link-seta">Ver ficha ${ic('seta')}</span></a></li>`;
const gradeCats = v => CATS.map(c => `<section class="cat-bloco" id="${c.id}"><header class="cat-cab sobe">${ic(c.i)}<div><h2>${c.nome}</h2><p>${c.d}</p></div><span class="cat-n">${porCat(c.id).length} ${porCat(c.id).length > 1 ? 'produtos' : 'produto'}</span></header><ul class="prods">${porCat(c.id).map(cartaoProd(v)).join('')}</ul></section>`).join('');
const chave = `<ol class="chave">${CHAVE.map((c, i) => `<li class="sobe" style="--i:${i}"><span class="chave-n">0${i + 1}</span><h3>${c.t}</h3><p>${c.d}</p></li>`).join('')}</ol>`;
const numeros = `<ul class="numeros">${NUM.map(n => `<li><b>${n.n}</b><span>${n.t}</span></li>`).join('')}</ul>`;
const porque = `<ul class="porque">${PORQUE.map((p, i) => `<li class="sobe" style="--i:${i % 3}">${ic(p.i)}<h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ul>`;
const estados = [...new Set(REPS.map(r => r.estado))];
const listaReps = `<div class="reps">${estados.map(e => `<section class="rep-uf sobe" id="uf-${e.normalize('NFD').replace(/[^\w]+/g, '-').toLowerCase()}"><h3>${e}<span>${REPS.filter(r => r.estado === e).length}</span></h3><ul>${REPS.filter(r => r.estado === e).map(r => `<li><b>${esc(r.nome)}</b><span class="rep-reg">${esc(r.regiao)}</span>${r.fone ? `<span class="rep-fones">${r.fone.split('|').map(f => f.trim()).filter(Boolean).map(f => `<a href="${telHref(f)}">${ic('tel')} ${f}</a>`).join('')}</span>` : ''}</li>`).join('')}</ul></section>`).join('')}</div>`;
const ufsChips = v => `<ul class="ufs">${estados.map(e => `<li><a href="${link(v, 'representantes')}#uf-${e.normalize('NFD').replace(/[^\w]+/g, '-').toLowerCase()}">${e}</a></li>`).join('')}</ul>`;
const cartaoNoticia = v => n => `<li class="sobe"><a class="not" href="${link(v, `noticias/${n.slug}`)}"><span class="not-foto">${fig(n.capa, n.t)}</span><time>${n.data}</time><h3>${n.t}</h3><span class="link-seta">Ler notícia ${ic('seta')}</span></a></li>`;
const formulario = `<form class="form" id="form" data-wa="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Cidade / estado<input name="cidade" autocomplete="address-level2"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Orçamento de galpão ou equipamentos</option><option>Assistência técnica</option><option>Seja um representante</option><option>Seja um fornecedor</option><option>Trabalhe conosco</option><option>Outro assunto</option></select></label>
  <label>Mensagem*<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn btn-wa" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da equipe comercial. Se preferir, escreva para <a href="mailto:${E.email}">${E.email}</a>.</p>
</form>`;

// ---------- páginas internas ----------
const paginaSobre = v => cabecalhoPg(v, [['A Tecnoesse']], 'Tecnologia italiana, coração brasileiro', 'Desde 1998 fornecendo plantas "chave na mão" para aves de corte, a partir de Jataí, Goiás.', 'fabrica.webp') + `
<section class="sec sobre-sec"><div class="in sobre-in">
  <div class="sobe sobre-txt">${SOBRE.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="sobe sobre-foto">${fig('silos.webp', 'Silos Tecnoesse instalados em granja')}<figcaption><b>Desde 1998</b>Jataí – GO</figcaption></figure>
</div></section>
<section class="sec porque-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Por que escolher a Tecnoesse</p><h2>Números da Tecnoesse</h2></div>${porque}</div></section>
<section class="sec mvv-sec"><div class="in"><ul class="mvv">${MVV.map(m => `<li class="sobe"><h2>${m.t}</h2><p>${m.d}</p></li>`).join('')}</ul></div></section>
<section class="sec equipe-sec"><div class="in equipe-in">
  <figure class="sobe">${fig('equipe.webp', 'Equipe técnica e comercial da Tecnoesse em entrega técnica')}</figure>
  <div class="sobe"><p class="sobre">Nossa equipe</p><h2>Presente da obra à entrega técnica</h2><p>A gerência, a supervisão comercial e a equipe técnica acompanham cada projeto, das apresentações às agroindústrias à entrega técnica dos aviários.</p><a class="link-seta" href="${link(v, 'noticias')}">Acompanhe nas notícias ${ic('seta')}</a></div>
</div></section>`;

const paginaProdutos = v => cabecalhoPg(v, [['Produtos']], 'Nossos produtos', 'Galpões e equipamentos Tecnoesse para avicultura: do armazenamento da ração à climatização do aviário.', 'hero-galpoes.webp') + `
<section class="sec prods-sec"><div class="in">
  <nav class="cats-nav sobe" aria-label="Categorias">${CATS.map(c => `<a href="#${c.id}">${ic(c.i)} ${c.nome}</a>`).join('')}</nav>
  ${gradeCats(v)}
</div></section>`;

const tabela = t => `<div class="tab-wrap"><table class="tab"><caption>${t.t}</caption><thead><tr>${t.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${t.linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>${t.nota ? `<p class="tab-nota">${t.nota}</p>` : ''}</div>`;
const paginaProduto = (v, p) => {
  const c = catDe(p); const irmaos = porCat(p.cat).filter(x => x !== p);
  const man = MANUAIS.find(m => m.p === p.slug);
  return `<section class="pd-topo"><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, 'produtos')}#${c.id}">${c.nome}</a> / ${esc(p.nome)}</p>
</div></section>
<section class="sec pd"><div class="in pd-in">
  <figure class="pd-foto sobe"><a href="${IMG}p-${p.slug}.webp" data-foto>${fig(`p-${p.slug}.webp`, p.nome)}</a></figure>
  <div class="pd-txt sobe">
    <p class="sobre">${c.nome}</p><h1>${p.nome}</h1>
    ${p.intro.map(x => `<p class="pd-lead">${x}</p>`).join('')}
    ${p.secoes.filter(s => s.itens.length).map(s => `<h2>${s.t}</h2><ul class="checks">${s.itens.map(i => `<li>${ic('check')} <span>${i}</span></li>`).join('')}</ul>`).join('')}
    ${p.tabela ? tabela(p.tabela) : ''}
    ${p.nota ? `<p class="pd-nota">${p.nota}</p>` : ''}
    <div class="hero-bts">${btnWa('Pedir orçamento', `um orçamento de ${p.nome.toLowerCase()}`)}${man ? `<a class="btn btn-linha" href="${man.u}" target="_blank" rel="noopener">${ic('livro')} Manual de montagem</a>` : ''}</div>
  </div>
</div></section>
${irmaos.length ? `<section class="sec pd-outros"><div class="in"><div class="sec-tit sobe"><p class="sobre">${c.nome}</p><h2>Outros produtos da linha</h2></div><ul class="prods">${irmaos.map(cartaoProd(v)).join('')}</ul></div></section>` : ''}`;
};

const paginaReps = v => cabecalhoPg(v, [['Representantes']], 'Nossos representantes', 'A qualidade Tecnoesse mais próxima de você. Os representantes vendem e encaminham a assistência técnica na sua região.', 'aviario-entrega.webp') + `
<section class="sec reps-sec"><div class="in">
  <div class="reps-cab sobe"><p>${REPS.length} representantes em ${estados.length} regiões. Escolha o estado:</p>${ufsChips(v)}</div>
  ${listaReps}
  <div class="reps-cta sobe"><div><h2>Não encontrou um representante na sua região?</h2><p>Fale direto com a fábrica em Jataí ou candidate-se a representante Tecnoesse.</p></div><div class="hero-bts">${btnWa('Falar com a fábrica', 'falar sobre representantes na minha região')}<a class="btn btn-linha" href="${link(v, 'contato')}#form">Seja um representante</a></div></div>
</div></section>`;

const paginaCredito = v => cabecalhoPg(v, [['Linhas de crédito']], 'Linhas de crédito', 'Programas de financiamento para investir no seu aviário com galpões e equipamentos Tecnoesse.', 'galpao-aereo.webp') + `
<section class="sec cred-sec"><div class="in">
  <ul class="creds">${CREDITO.map((c, i) => `<li class="sobe" style="--i:${i}"><span class="cred-n">0${i + 1}</span><h2>${c.t}</h2><p>${c.d}</p><a class="link-seta" href="${c.u}" target="_blank" rel="noopener">Saiba mais ${ic('ext')}</a></li>`).join('')}</ul>
  <p class="cred-nota sobe">Condições, taxas e prazos são definidos pelo banco. A equipe Tecnoesse ajuda a montar o orçamento do projeto para a proposta de financiamento. ${btnWa('Pedir orçamento para financiamento', 'um orçamento para financiamento', 'link-seta')}</p>
</div></section>`;

const paginaNoticias = v => cabecalhoPg(v, [['Notícias']], 'Notícias', 'Feiras, entregas técnicas e novidades da Tecnoesse.', 'estande.webp') + `
<section class="sec nots-sec"><div class="in"><ul class="nots">${NOTICIAS.map(cartaoNoticia(v)).join('')}</ul></div></section>`;
const paginaNoticia = (v, n) => cabecalhoPg(v, [['Notícias', 'noticias'], [n.data]], n.t, null, null) + `
<section class="sec not-sec"><div class="in not-in">
  <article class="sobe"><time>${n.data}</time>${fig(n.capa, n.t, 'not-capa')}${n.txt.map(p => `<p>${p}</p>`).join('')}${n.fotos.length ? galeria(n.fotos.filter(f => f !== n.capa), n.t) : ''}</article>
  <aside class="not-lado sobe"><h3>Outras notícias</h3><ul>${NOTICIAS.filter(x => x !== n).map(x => `<li><a href="${link(v, `noticias/${x.slug}`)}"><time>${x.data}</time>${x.t}</a></li>`).join('')}</ul></aside>
</div></section>`;

const paginaManuais = v => cabecalhoPg(v, [['Manuais']], 'Manuais de montagem', 'Instruções de montagem dos equipamentos Tecnoesse.', null) + `
<section class="sec man-sec"><div class="in"><ul class="mans">${MANUAIS.map(m => `<li class="sobe"><span class="man-foto">${fig(`p-${m.p}.webp`, m.t)}</span><div><p class="sobre">Manual de montagem</p><h2>${m.t}</h2><div class="man-links"><a class="btn" href="${m.u}" target="_blank" rel="noopener">${ic('livro')} Abrir manual</a><a class="link-seta" href="${link(v, `produtos/${m.p}`)}">Ficha do produto ${ic('seta')}</a></div></div></li>`).join('')}</ul>
<p class="cred-nota sobe">Precisa de ajuda na montagem? A assistência técnica é feita pelos <a href="${link(v, 'representantes')}">representantes</a> da sua região.</p></div></section>`;

const paginaContato = v => cabecalhoPg(v, [['Contato']], 'Contato', 'Tire suas dúvidas, peça orçamento ou assistência técnica.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Envie sua mensagem</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefones</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel1}</a> (WhatsApp)<br><a href="${waHref('5564999758916')}" target="_blank" rel="noopener">${E.cel2}</a> (WhatsApp)</div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.bairro}, ${E.cidade}<br>CEP ${E.cep}</span></div></li>
    <li>${ic('relogio')}<div><b>Funcionamento</b><span>${E.horario}</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da Tecnoesse em Jataí" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

const internas = v => {
  const o = { 'a-tecnoesse': pagina(v, 'a-tecnoesse', paginaSobre(v)), produtos: pagina(v, 'produtos', paginaProdutos(v)), representantes: pagina(v, 'representantes', paginaReps(v)), 'linhas-de-credito': pagina(v, 'linhas-de-credito', paginaCredito(v)), noticias: pagina(v, 'noticias', paginaNoticias(v)), manuais: pagina(v, 'manuais', paginaManuais(v)), contato: pagina(v, 'contato', paginaContato(v)) };
  for (const p of PROD) o[`produtos/${p.slug}`] = pagina(v, `produtos/${p.slug}`, paginaProduto(v, p));
  for (const n of NOTICIAS) o[`noticias/${n.slug}`] = pagina(v, `noticias/${n.slug}`, paginaNoticia(v, n));
  return o;
};

// ---------- A "Granja": clara, galpões na abertura, produtos por categoria ----------
function versaoA() {
  const v = 'a';
  const destaques = ['galpoes-para-aves', 'silo-metalico-para-racao', 'comedouro-tecnoplus-automatico', 'bebedouro-nipple', 'exaustor', 'cooling', 'nebulizador-alta-pressao', 'tunnel-door'].map(s => PROD.find(p => p.slug === s));
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Desde 1998 · Jataí – GO</p>
    <h1>Galpões e equipamentos para aviários, chave na mão</h1>
    <p class="lead">Obra civil e equipamentos de um só fornecedor: silos, comedouros, bebedouros, exaustores e climatização com tecnologia italiana e fábrica em Goiás.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a>${btnWa('Falar com o comercial', 'falar com a equipe comercial', 'btn btn-linha')}</div>
  </div>
  <figure class="hero-foto">${fig('hero-galpoes.webp', 'Galpões para aves construídos pela Tecnoesse')}<span class="hero-faixa" aria-hidden="true"></span><figcaption><b>Tecnologia italiana</b>coração brasileiro</figcaption></figure>
</div></section>
<section class="numeros-sec"><div class="in">${numeros}</div></section>

<section class="sec cats-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Qualidade e precedência</p><h2>Tudo o que o aviário precisa</h2></div>
  <ul class="cats">${CATS.map((c, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, 'produtos')}#${c.id}">${ic(c.i)}<h3>${c.nome}</h3><p>${c.d}</p><span class="link-seta">${porCat(c.id).length} ${porCat(c.id).length > 1 ? 'produtos' : 'produto'} ${ic('seta')}</span></a></li>`).join('')}</ul>
</div></section>

<section class="sec destaques-sec"><div class="in">
  <div class="sec-tit sec-tit-linha sobe"><div><p class="sobre">Nossos produtos</p><h2>Equipamentos em destaque</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Todos os ${PROD.length} produtos ${ic('seta')}</a></div>
  <ul class="prods">${destaques.map(cartaoProd(v)).join('')}</ul>
</div></section>

<section class="sec chave-sec"><div class="in chave-in">
  <div class="sobe chave-tit"><p class="sobre">O que nós fazemos</p><h2>Do projeto ao pós-venda, um só fornecedor</h2><p>Ajudamos os produtores a transformar a propriedade em um verdadeiro agronegócio, com obra civil e equipamentos entregues prontos para alojar.</p>${fig('silos-granja.webp', 'Silos Tecnoesse em granja')}</div>
  ${chave}
</div></section>

<section class="sec sobre-home"><div class="in sobre-home-in">
  <figure class="sobe">${fig('silos.webp', 'Silos metálicos Tecnoesse')}</figure>
  <div class="sobe"><p class="sobre">A Tecnoesse</p><h2>Tecnologia italiana, coração brasileiro</h2><p>${SOBRE[0]}</p><p>${SOBRE[3]}</p><a class="link-seta" href="${link(v, 'a-tecnoesse')}">Conheça a empresa ${ic('seta')}</a></div>
</div></section>

<section class="sec reps-home"><div class="in reps-home-in">
  <div class="sobe"><p class="sobre">A qualidade Tecnoesse mais próxima de você</p><h2>${REPS.length} representantes pelo Brasil</h2><p>Vendas e assistência técnica com quem conhece a sua região.</p><a class="btn" href="${link(v, 'representantes')}">Encontrar representante ${ic('seta')}</a></div>
  <div class="sobe">${ufsChips(v)}</div>
</div></section>

<section class="sec nots-home"><div class="in">
  <div class="sec-tit sec-tit-linha sobe"><div><p class="sobre">Notícias</p><h2>Feiras e entregas técnicas</h2></div><a class="link-seta" href="${link(v, 'noticias')}">Todas as notícias ${ic('seta')}</a></div>
  <ul class="nots">${NOTICIAS.slice(1, 4).map(cartaoNoticia(v)).join('')}</ul>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Chave na mão": exaustores em tela cheia, faixa verde e amarela ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}p-exaustor.webp)"></div><div class="in hero-in">
  <p class="sobre">Tecnoesse · tecnologia italiana, coração brasileiro</p>
  <h1>Sua granja pode contar com soluções de alta performance</h1>
  <p class="lead">Galpões "chave na mão" e equipamentos para avicultura e suinocultura, projetados, produzidos e testados em Jataí, Goiás, desde 1998.</p>
  <div class="hero-bts">${btnWa('Pedir orçamento', 'um orçamento')}<a class="btn btn-linha" href="${link(v, 'produtos')}">Nossos produtos</a></div>
</div></section>
<section class="numeros-sec"><div class="in">${numeros}</div></section>

<section class="sec linhas-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Nossos produtos</p><h2>Quatro linhas para o aviário completo</h2></div>
  <div class="linhas">${CATS.map((c, i) => { const ps = porCat(c.id); return `<article class="linha sobe${i % 2 ? ' linha-inv' : ''}"><a class="linha-foto" href="${link(v, `produtos/${ps[0].slug}`)}">${fig(`p-${ps[0].slug}.webp`, ps[0].nome)}</a><div><span class="linha-n">0${i + 1}</span><h3>${c.nome}</h3><p>${c.d}</p><ul class="linha-lista">${ps.map(p => `<li><a href="${link(v, `produtos/${p.slug}`)}">${p.nome} ${ic('seta')}</a></li>`).join('')}</ul></div></article>`; }).join('')}</div>
</div></section>

<section class="sec clima-sec"><div class="in clima-in">
  <div class="sobe"><p class="sobre">Tecnologia para temperatura ideal</p><h2>Alta capacidade de resfriamento, menor custo operacional</h2><p>Exaustores Butterfly com hélice em aço inox, painel evaporativo de celulose, nebulizadores e tunnel door trabalhando juntos na ventilação do galpão.</p><a class="btn" href="${link(v, 'produtos')}#clima">Ver climatização ${ic('seta')}</a></div>
  <div class="clima-fotos sobe">${fig('p-cooling.webp', 'Painel evaporativo Tecnoesse')}${fig('frangos.webp', 'Frangos em aviário')}</div>
</div></section>

<section class="sec chave-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Turn key</p><h2>Chave na mão: obra civil e equipamentos</h2></div>
  ${chave}
</div></section>

<section class="sec mvv-sec"><div class="in"><ul class="mvv">${MVV.map(m => `<li class="sobe"><h2>${m.t}</h2><p>${m.d}</p></li>`).join('')}</ul></div></section>

<section class="sec reps-home"><div class="in reps-home-in">
  <div class="sobe"><p class="sobre">Rede nacional</p><h2>Representantes em ${estados.length} regiões</h2><p>Fale com o representante mais próximo para vendas e assistência técnica.</p><a class="btn" href="${link(v, 'representantes')}">Ver representantes ${ic('seta')}</a></div>
  <div class="sobe">${ufsChips(v)}</div>
</div></section>

<section class="sec nots-home"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Notícias</p><h2>Tecnoesse nas feiras e nas granjas</h2></div>
  <ul class="nots">${NOTICIAS.slice(1, 4).map(cartaoNoticia(v)).join('')}</ul>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
const A = versaoA(), B = versaoB();
escreverVersao(pub, 'a', A);
escreverVersao(pub, 'b', B);
await escolha(pub, {
  nome: 'Tecnoesse', artigo: 'da', url: E.url, lang: 'pt', cor: '#01643b', fundo: '#0d2a1c', claro: '#f3f5ef',
  fonteTitulo: "'Teko',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Granja', paginas: Object.keys(A).length, texto: 'Clara, com os galpões vistos do alto na abertura, as quatro linhas de produtos e o caminho do projeto ao pós-venda.', pontos: [`${PROD.length} fichas de produto com fotos`, `${REPS.length} representantes por estado`, 'Tabelas de silo e linha primária em texto'] },
    { letra: 'b', nome: 'Chave na mão', paginas: Object.keys(B).length, texto: 'Exaustores em tela cheia, faixa verde e amarela do logo e os produtos organizados em quatro linhas.', pontos: ['Mesmas páginas do site atual', 'Notícias com fotos das feiras', 'Formulário que abre o WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
