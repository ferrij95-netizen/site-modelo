// OTA Indústria e Comércio de Máquinas Agrícolas (Sertãozinho/SP): distribuidores de torta de filtro, aplicadores de calcário e gesso, espargidores, calderaria e peças desde 1975.
// node clientes/ota/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs ota https://otaequipamentos.com.br/)
// Textos, fotos e catálogo de peças (PDF): do site atual (WordPress, 2022). Sem WhatsApp no site: formulário abre o e-mail ota@.
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'OTA Equipamentos', url: 'https://ota.overtus.com.br/', antigo: 'https://otaequipamentos.com.br/',
  fone: '(16) 3942-2777', fone2: '(16) 3942-2858', email: 'ota@otaequipamentos.com.br',
  end: 'Av. Marginal Sérgio Cancian, 5413', cidade: 'Sertãozinho – SP',
  catalogo: 'https://otaequipamentos.com.br/wp-content/uploads/2022/05/Catalogo-OTA-1.pdf',
  face: 'https://www.facebook.com/OTA-Equipamentos-101260112518753', insta: 'https://www.instagram.com/otaequipamentos1/', linkedin: 'https://www.linkedin.com/company/otaequipamentos/',
  mapa: 'https://www.google.com/maps?q=Av.+Marginal+S%C3%A9rgio+Cancian,+5413,+Sert%C3%A3ozinho+-+SP&output=embed',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const EQUIP = [
  { id: 'distribuidor-torta', nome: 'Distribuidor de torta de filtro', foto: 'distribuidor-torta.webp', cor: 'Referência nacional na lavoura sucroalcooleira',
    txt: 'Equipamento de grande capacidade montado sobre chassi de caminhão para distribuir a torta de filtro no canavial, devolvendo matéria orgânica e nutrientes ao solo.' },
  { id: 'aplicador-calcario', nome: 'Aplicador de calcário e gesso agrícola', foto: 'aplicador-calcario.webp', cor: 'Acoplado sobre chassi',
    txt: 'Aplicador de calcário e gesso agrícola acoplado sobre chassi para correção e recuperação do solo em cana, grãos e pastagem.' },
  { id: 'espargidor-cimento', nome: 'Espargidor de cimento', foto: 'espargidor-cimento.webp', cor: 'Sobre chassi',
    txt: 'Equipamento sobre chassi para espalhar cimento a granel de forma uniforme, construído com a mesma estrutura dos implementos agrícolas OTA.' },
];
const SETORES = [
  { t: 'Setor canavieiro', d: 'Distribuição de torta de filtro e correção do solo nas principais unidades produtoras de açúcar e álcool.', i: 'trator' },
  { t: 'Grãos', d: 'Calcário e gesso agrícola para soja, milho e outras culturas.', i: 'gota' },
  { t: 'Pastagem', d: 'Recuperação do solo em áreas de pastagem para o setor agropecuário.', i: 'sol' },
];
const PROCESSO = [
  { t: 'Projeto sob medida', d: 'Equipamento customizado para a operação e o chassi do cliente.' },
  { t: 'Calderaria', d: 'Corte, dobra e solda em aço na fábrica de Sertãozinho.' },
  { t: 'Montagem sobre chassi', d: 'Caçamba, esteira, transmissão e hidráulica montadas no caminhão.' },
  { t: 'Pintura e entrega', d: 'Na cor da usina ou da empresa, pronto para a safra.' },
  { t: 'Assistência e reforma', d: 'Assistência técnica e reforma dos equipamentos que produzimos.' },
];
// catálogo de peças (PDF do site atual)
const PECAS = [
  { t: 'Conjunto do eixo de transmissão da esteira', c: 'CET-5001', itens: [['Mancal', 'MP 211'], ['Engrenagem 10 Z', 'E10Z2-5002'], ['Eixo de transmissão', 'ET-5003'], ['Engrenagem 51 Z', 'ED51Z-5004'], ['Luva de acoplamento', 'LAC-5005']] },
  { t: 'Conjunto motores de tração das esteiras', c: '', itens: [['Engrenagem 13 Z', 'ED13Z-5006'], ['Motor', 'METG0475'], ['Base', 'B-5007'], ['Parafuso esticador', 'PE-5008']] },
  { t: 'Reservatório de óleo', c: 'RO-4000', itens: [['Filtro retorno', 'FR-4001'], ['Sapatas de fixação', 'SF-4002'], ['Respiro', 'RE-4003'], ['Boca de enchimento', 'BE-4004'], ['Mola', 'ML-4005']] },
  { t: 'Conjunto eixo de transmissão da esteira dianteiro', c: 'CETD-5003', itens: [['Mancal quadrado esticador da esteira', 'ME-4006'], ['Engrenagem 10 Z', 'E10Z11/2-5003'], ['Eixo guia de transmissão liso', 'EGT-4008']] },
  { t: 'Esteira', c: 'JET-12320 · JET-13380', itens: [['Corrente', 'CE-12320 · CE-13380'], ['Talisca', 'TE-1001'], ['Corrente de tração do motor hidráulico da esteira', 'CDP1-1702']] },
  { t: 'Conjunto da caixa de redução 2/1', c: 'CRV-1021', itens: [['Bomba hidráulica', 'BHZ-1029'], ['Eixo do acoplamento da bomba', 'CRV-1027'], ['Conjunto engrenagem helicoidal', 'CRV-1028'], ['Pinhão 19 Z', 'CRV-1019'], ['Cubo do eixo intermediário', 'CRV-1023'], ['Flange acoplar cardan', 'CRV-1024'], ['Tampa cega pinhão', 'CRV-1025'], ['Tampa do eixo intermediário', 'CRV-1026'], ['Cardan', 'CA-1030']] },
];
const C = {
  quem: [
    'Estabelecida desde <b>1975 em Sertãozinho (SP)</b>, maior polo de desenvolvimento de tecnologia para a agroindústria sucroalcooleira, a OTA Indústria e Comércio de Máquinas Agrícolas atua na produção e customização de equipamentos agrícolas, na produção de peças de reposição e em acessórios para lavoura.',
    'Acompanhamos de forma contínua os avanços tecnológicos, inovando nossos equipamentos e prestando plena assistência técnica em reformas dos equipamentos por nós produzidos.',
    'Suprimos um mercado com equipamentos de grande capacidade na área de preparação do solo para plantio, no setor canavieiro, na agricultura de grãos (soja, milho e outros) e nas áreas de pastagem. Somos <b>referência nacional em equipamentos para a lavoura sucroalcooleira</b>, com os distribuidores de torta de filtro e os aplicadores de calcário e gesso agrícola acoplados sobre chassi.',
    'Nossa filosofia é proporcionar aos clientes, entre eles as principais unidades produtoras de açúcar e álcool, as principais cooperativas agrícolas e destacadas empresas agropecuárias, maior e mais eficiente economia na recuperação do solo.',
  ],
  infra: [
    'Somos uma empresa de origem brasileira que, desde 1975, desenvolve soluções em equipamentos, implementos e acessórios agrícolas para diversos setores do agronegócio.',
    'Ao longo dessa história, montamos uma infraestrutura completa, usada com competência técnica para prestar serviços e fabricar produtos de qualidade na preparação do solo para plantio, no setor canavieiro, na agricultura de grãos e nas áreas de pastagem, com os mais altos padrões éticos, técnicos, de produtividade, de governança e de eficiência.',
    'Nossa inspiração é um futuro inclusivo, diverso e sustentável, com soluções de engenharia e de infraestrutura que melhoram a vida das pessoas e protegem o planeta.',
  ],
  pecas: 'Oferecemos uma linha de peças fabricadas para equipamentos, máquinas e implementos agrícolas, confeccionadas com matérias-primas de elevada resistência, como aço, ferro e alumínio, que suportam altas temperaturas, choques, umidade e agentes químicos, com extensa durabilidade.',
};

const NAV = [
  { slug: 'index', nome: 'Home' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'infraestrutura', nome: 'Infraestrutura' }, { slug: 'equipamentos', nome: 'Equipamentos' },
  { slug: 'calderaria', nome: 'Calderaria' }, { slug: 'pecas', nome: 'Peças' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'OTA Equipamentos, Sertãozinho/SP desde 1975: distribuidores de torta de filtro, aplicadores de calcário e gesso agrícola sobre chassi, calderaria e peças.',
  'quem-somos': 'Desde 1975 em Sertãozinho (SP), produção e customização de equipamentos agrícolas, peças de reposição e assistência técnica.',
  infraestrutura: 'Infraestrutura completa de fabricação de equipamentos e implementos agrícolas em Sertãozinho – SP.',
  equipamentos: 'Distribuidor de torta de filtro, aplicador de calcário e gesso agrícola e espargidor de cimento sobre chassi.',
  calderaria: 'Calderaria em aço para equipamentos, máquinas e implementos agrícolas.',
  pecas: 'Catálogo de peças OTA: esteiras, correntes, taliscas, eixos de transmissão, reservatório de óleo e caixa de redução.',
  contato: 'Fale com a OTA: (16) 3942-2777 / (16) 3942-2858, ota@otaequipamentos.com.br. Av. Marginal Sérgio Cancian, 5413, Sertãozinho – SP.',
};
const titulos = { index: 'OTA Equipamentos · Máquinas agrícolas desde 1975', 'quem-somos': 'Quem somos · OTA', infraestrutura: 'Infraestrutura · OTA', equipamentos: 'Equipamentos · OTA', calderaria: 'Calderaria · OTA', pecas: 'Peças · OTA', contato: 'Contato · OTA' };

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="OTA Equipamentos" width="176" height="99">`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.end} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}<span class="marca-txt">Indústria e Comércio de<br>Máquinas Agrícolas</span></a>
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
  <div><p class="sobre">Fale com a fábrica</p><h2>Precisa de um equipamento, uma reforma ou peças?</h2><p>Envie o modelo do seu equipamento ou o código da peça e a OTA retorna com o orçamento.</p></div>
  <div class="cta-bts"><a class="btn" href="${link(v, 'contato')}#form">${ic('mail')} Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>OTA Indústria e Comércio de Máquinas Agrícolas Ltda. Equipamentos para preparação do solo desde 1975.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
  <div><h3>Produtos e serviços</h3><ul><li><a href="${link(v, 'equipamentos')}">Equipamentos</a></li><li><a href="${link(v, 'calderaria')}">Calderaria</a></li><li><a href="${link(v, 'pecas')}">Peças</a></li><li><a href="${E.catalogo}" target="_blank" rel="noopener">Catálogo (PDF)</a></li></ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'quem-somos')}">Quem somos</a></li><li><a href="${link(v, 'infraestrutura')}">Infraestrutura</a></li><li><a href="${link(v, 'contato')}">Contato e localização</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.cidade}</p><p><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} OTA Equipamentos. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#079551' }) + topo(v, slug) + corpo + rodape(v);
const cabecalhoPg = (v, nome, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / ${esc(nome)}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;
const galeria = (fotos, alt) => `<div class="galeria">${fotos.map(f => `<a href="${IMG}${f}" data-foto>${fig(f, alt)}</a>`).join('')}</div>`;

// ---------- blocos ----------
const equipCards = v => `<ul class="equips">${EQUIP.map((e, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, 'equipamentos')}#${e.id}">${fig(e.foto, e.nome)}<div><p class="equip-tag">${e.cor}</p><h3>${e.nome}</h3><span class="link-seta">Ver equipamento ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const processo = `<ol class="proc">${PROCESSO.map((p, i) => `<li class="sobe" style="--i:${i}"><span class="proc-n">${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;
const setores = `<ul class="setores">${SETORES.map(s => `<li class="sobe">${ic(s.i)}<h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ul>`;
const cores = `<div class="cores">${['equip-vermelho.webp', 'equip-laranja.webp', 'equip-amarelo.webp', 'equip-azul.webp', 'equip-verde-lateral.webp'].map(f => `<a href="${IMG}${f}" data-foto>${fig(f, 'Equipamento OTA entregue na cor do cliente')}</a>`).join('')}</div>`;
const tabelaPecas = `<div class="pecas-grade">${PECAS.map(p => `<section class="peca sobe"><header><h3>${p.t}</h3>${p.c ? `<code>${p.c}</code>` : ''}</header><table><thead><tr><th>Peça</th><th>Código</th></tr></thead><tbody>${p.itens.map(([n, c]) => `<tr><td>${n}</td><td><code>${c}</code></td></tr>`).join('')}</tbody></table></section>`).join('')}</div>`;
const formulario = `<form class="form" id="form" data-email="${E.email}" data-assunto="Orçamento pelo site">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa ou usina<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Equipamento novo</option><option>Reforma de equipamento</option><option>Peças de reposição</option><option>Calderaria</option><option>Outro assunto</option></select></label><label>Código da peça ou modelo<input name="codigo" placeholder="Ex.: CRV-1021"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-nota">A mensagem abre no seu e-mail endereçada a ${E.email}.</p>
</form>`;

// ---------- páginas internas ----------
const paginaQuem = v => cabecalhoPg(v, 'Quem somos', 'Desde 1975 em Sertãozinho', 'No maior polo de tecnologia para a agroindústria sucroalcooleira do país.', 'fachada-larga.webp') + `
<section class="sec quem"><div class="in quem-in">
  <div class="sobe quem-txt">${C.quem.map(p => `<p>${p}</p>`).join('')}</div>
  <figure class="sobe quem-foto">${fig('fachada.webp', 'Sede da OTA em Sertãozinho')}<figcaption><b>1975</b> fundação em Sertãozinho – SP</figcaption></figure>
</div></section>
<section class="sec setores-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Onde atuamos</p><h2>Preparação do solo para plantio</h2></div>${setores}</div></section>
<section class="sec proc-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Como trabalhamos</p><h2>Da chapa de aço à assistência na safra</h2></div>${processo}</div></section>`;

const paginaInfra = v => cabecalhoPg(v, 'Infraestrutura', 'Infraestrutura completa', 'Fábrica, calderaria e montagem no mesmo endereço em Sertãozinho.', 'infra-1.webp') + `
<section class="sec infra"><div class="in infra-in">
  <div class="sobe">${C.infra.map((p, i) => `<p${i === 0 ? ' class="infra-lead"' : ''}>${p}</p>`).join('')}</div>
  ${galeria(['infra-1.webp', 'infra-2.webp', 'infra-3.webp', 'infra-4.webp', 'infra-5.webp'], 'Infraestrutura da OTA')}
</div></section>
<section class="sec local"><div class="in local-in">
  <div class="sobe"><p class="sobre">Localização</p><h2>Sertãozinho – SP</h2><p>${E.end}<br>${E.cidade}</p><a class="link-seta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${E.end}, Sertãozinho - SP`)}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a></div>
  <div class="mapa sobe"><iframe src="${E.mapa}" title="Mapa da OTA em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;

const paginaEquip = v => cabecalhoPg(v, 'Equipamentos', 'Equipamentos', 'Soluções para o setor canavieiro e agrícola, montadas sobre chassi.', 'distribuidor-torta.webp') + `
${EQUIP.map((e, i) => `<section class="sec eq${i % 2 ? ' eq-alt' : ''}" id="${e.id}"><div class="in eq-in">
  <figure class="sobe"><a href="${IMG}${e.foto}" data-foto>${fig(e.foto, e.nome)}</a></figure>
  <div class="sobe"><p class="sobre">${e.cor}</p><h2>${e.nome}</h2><p>${e.txt}</p><ul class="checks">${['Fabricação e customização própria', 'Montagem sobre o chassi do cliente', 'Assistência técnica e reforma pela fábrica'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul><a class="btn" href="${link(v, 'contato')}#form">Pedir orçamento ${ic('seta')}</a></div>
</div></section>`).join('')}
<section class="sec cores-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Soluções para o setor canavieiro e agrícola</p><h2>Cada equipamento na cor do cliente</h2></div>${cores}</div></section>`;

const paginaCald = v => cabecalhoPg(v, 'Calderaria', 'Calderaria', 'Estruturas em aço feitas para aguentar a safra inteira.', 'calderaria-8.webp') + `
<section class="sec cald"><div class="in cald-in">
  <div class="sobe"><p class="cald-lead">${C.pecas}</p><ul class="checks">${['Corte, dobra e solda em aço', 'Caçambas, chassis auxiliares e estruturas', 'Componentes sob medida para reforma'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul><a class="btn" href="${link(v, 'contato')}#form">Enviar projeto ${ic('seta')}</a></div>
  ${galeria(['calderaria-6.webp', 'calderaria-7.webp', 'calderaria-8.webp', 'calderaria-2.webp', 'calderaria-3.webp', 'calderaria-5.webp', 'calderaria-10.webp', 'calderaria-11.webp'], 'Calderaria OTA')}
</div></section>`;

const paginaPecas = v => cabecalhoPg(v, 'Peças', 'Peças de reposição', 'Peças originais para esteiras, transmissão, hidráulica e caixa de redução.', 'pecas-4.webp') + `
<section class="sec pecas-intro"><div class="in pecas-intro-in">
  <div class="sobe"><p>${C.pecas}</p><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo em PDF</a></div>
  ${galeria(['pecas-1.webp', 'pecas-3.webp', 'pecas-5.webp', 'pecas-9.webp'], 'Peças OTA')}
</div></section>
<section class="sec pecas-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Catálogo de peças</p><h2>Encontre a peça pelo código</h2><p>Informe o código no pedido de orçamento para agilizar o atendimento.</p></div>${tabelaPecas}</div></section>`;

const paginaContato = v => cabecalhoPg(v, 'Contato', 'Contato', 'Fale com a OTA por telefone, e-mail ou pelo formulário.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Peça seu orçamento</h2>${formulario}</div>
  <aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefones</b><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.cidade}</span></div></li>
  </ul></aside>
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da OTA em Sertãozinho" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

const internas = v => ({ 'quem-somos': pagina(v, 'quem-somos', paginaQuem(v)), infraestrutura: pagina(v, 'infraestrutura', paginaInfra(v)), equipamentos: pagina(v, 'equipamentos', paginaEquip(v)), calderaria: pagina(v, 'calderaria', paginaCald(v)), pecas: pagina(v, 'pecas', paginaPecas(v)), contato: pagina(v, 'contato', paginaContato(v)) });

// ---------- A "Chassi": clara, equipamento na abertura ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Sertãozinho – SP · desde 1975</p>
    <h1>Equipamentos agrícolas para recuperar o solo</h1>
    <p class="lead">Distribuidores de torta de filtro, aplicadores de calcário e gesso agrícola e espargidores montados sobre chassi, com peças e reforma pela própria fábrica.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'equipamentos')}">Ver equipamentos ${ic('seta')}</a><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo de peças</a></div>
  </div>
  <figure class="hero-foto">${fig('distribuidor-torta.webp', 'Distribuidor de torta de filtro OTA')}<figcaption><b>Referência nacional</b>em equipamentos para a lavoura sucroalcooleira</figcaption></figure>
</div></section>
<section class="setores-faixa"><div class="in">${setores}</div></section>

<section class="sec equips-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Equipamentos</p><h2>Soluções para o setor canavieiro e agrícola</h2></div>
  ${equipCards(v)}
</div></section>

<section class="sec proc-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Do projeto à safra</p><h2>Fabricamos, montamos e reformamos</h2></div>
  ${processo}
</div></section>

<section class="sec quem-home"><div class="in quem-home-in">
  <div class="sobe"><p class="sobre">Quem somos</p><h2>No maior polo da agroindústria sucroalcooleira</h2><p>${C.quem[0]}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a OTA ${ic('seta')}</a></div>
  <div class="quem-fotos sobe">${fig('infra-2.webp', 'Fábrica da OTA')}${fig('calderaria-7.webp', 'Montagem de equipamento')}</div>
</div></section>

<section class="sec pecas-home"><div class="in pecas-home-in">
  <div class="sobe"><p class="sobre">Peças e calderaria</p><h2>Peças de reposição com código de catálogo</h2><p>Esteiras, correntes, taliscas, eixos de transmissão, reservatório de óleo e caixa de redução fabricados em aço de alta resistência.</p><div class="hero-bts"><a class="btn" href="${link(v, 'pecas')}">Ver peças ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'calderaria')}">Calderaria</a></div></div>
  ${galeria(['pecas-5.webp', 'pecas-9.webp', 'pecas-3.webp', 'pecas-6.webp'], 'Peças OTA')}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Canavial": pôr do sol em tela cheia, cores dos clientes ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}hero-por-do-sol.webp)"></div><div class="in hero-in">
  <p class="sobre">OTA Equipamentos · desde 1975</p>
  <h1>Força para preparar o solo da safra</h1>
  <p class="lead">Operamos na produção de equipamentos agrícolas com contínuo avanço tecnológico, dando plena assistência técnica e reformas dos equipamentos produzidos.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'equipamentos')}">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">Pedir orçamento</a></div>
</div></section>
<section class="numeros-sec"><div class="in"><ul class="numeros">
  <li><b>1975</b><span>fundação em Sertãozinho – SP</span></li><li><b>3</b><span>linhas de equipamentos sobre chassi</span></li><li><b>${PECAS.reduce((n, p) => n + p.itens.length, 0)}</b><span>peças com código no catálogo</span></li><li><b>3</b><span>setores: cana, grãos e pastagem</span></li>
</ul></div></section>

<section class="sec eq-faixas"><div class="in">
  ${EQUIP.map((e, i) => `<article class="eqf sobe${i % 2 ? ' eqf-inv' : ''}"><a href="${link(v, 'equipamentos')}#${e.id}">${fig(e.foto, e.nome)}</a><div><span class="eqf-n">0${i + 1}</span><p class="sobre">${e.cor}</p><h2>${e.nome}</h2><p>${e.txt}</p><a class="link-seta" href="${link(v, 'equipamentos')}#${e.id}">Detalhes ${ic('seta')}</a></div></article>`).join('')}
</div></section>

<section class="sec cores-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Customização</p><h2>Feito para cada usina, na cor de cada cliente</h2></div>
  ${cores}
</div></section>

<section class="sec proc-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Do projeto à safra</p><h2>Tudo dentro da fábrica</h2></div>
  ${processo}
</div></section>

<section class="sec pecas-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Catálogo de peças</p><h2>Peças de reposição pelo código</h2></div>
  ${tabelaPecas}
  <p class="centro"><a class="btn btn-linha" href="${E.catalogo}" target="_blank" rel="noopener">${ic('livro')} Catálogo completo em PDF</a></p>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'OTA Equipamentos', artigo: 'da', url: E.url, lang: 'pt', cor: '#079551', fundo: '#10261b', claro: '#f2f5f2',
  fonteTitulo: "'Rubik',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Chassi', paginas: 7, texto: 'Clara, com o distribuidor de torta de filtro na abertura, os setores atendidos e o caminho do projeto à safra.', pontos: ['Sem textos de modelo ("lorem ipsum")', 'Peças com código, em texto', 'Logo redesenhado em vetor'] },
    { letra: 'b', nome: 'Canavial', paginas: 7, texto: 'O caminhão OTA ao pôr do sol em tela cheia, os três equipamentos em destaque e os equipamentos entregues na cor de cada cliente.', pontos: ['Catálogo de peças na página inicial', 'Mesmas páginas do site atual', 'Formulário que abre o e-mail'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
