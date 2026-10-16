// Páginas das duas versões. A "Fundição": fiel ao catálogo e ao site atual (azul-marinho, fundo de caminhões,
// cabeçalho azul em cada peça). B "Engenharia": busca por código em primeiro plano, fundo claro com degradês azuis.
import { site, setores, linhas, produtos, linha, daLinha, numeros } from './conteudo.mjs';
import { esc, linkDe, ext, ico, pista, doc, cartao, filtro, selos, zap } from './comum.mjs';

const novidades = produtos.filter(p => p.novo);
const amostra = ['MB008', 'SC069', 'VO538', 'FO161', 'CAR068.480', 'MB004'].map(c => produtos.find(p => p.cod === c)).filter(Boolean);

const fotoLinha = (l, vert = false) => l.foto
  ? `<img src="/assets/img/marca-${l.foto}${vert ? '-v' : ''}.webp" alt="Caminhão ${l.nome}" loading="lazy" decoding="async">`
  : `<span class="mosaico">${daLinha(l.id).filter((_, i) => i % 7 === 0).slice(0, 4).map(p => `<img src="/assets/p/${p.slug}.webp" alt="" loading="lazy">`).join('')}</span>`;

const setorCards = (cls = '') => `<div class="setores ${cls}">${setores.map(s => `<article class="setor" id="${s.id}">
  <h3>${s.nome}</h3><p>${s.txt}</p>
  <ul>${s.canais.map(([t, txt, href]) => `<li><a href="${href}" ${href.startsWith('http') ? ext : ''}>${ico(t)}${txt}</a></li>`).join('')}</ul>
</article>`).join('')}</div>`;

const etapas = [
  ['Projeto e modelo', 'Cada peça parte do desenho da peça original da montadora, com o mesmo encaixe e furação.', 'doc'],
  ['Moldagem', 'O modelo forma o molde onde o metal vai ganhar o formato da peça.', 'engrenagem'],
  ['Fusão', 'Ferro nodular, ferro cinzento ou aço são fundidos no forno, na liga certa para cada peça.', 'fogo'],
  ['Vazamento', 'O metal líquido é vazado no molde e solidifica com o formato final.', 'peso'],
  ['Acabamento', 'Desmoldagem, rebarbação e usinagem dos pontos de encaixe quando a peça pede.', 'check'],
  ['Inspeção e expedição', 'A peça é conferida, recebe o código Gramola fundido no corpo e segue para o Brasil e o Mercosul.', 'caminhao'],
];

const materiais = [
  ['Ferro fundido nodular', 'Para peças que trabalham sob carga e impacto, como suportes de mola, algemas e braços tensores.'],
  ['Ferro fundido cinzento', 'Para peças de apoio, calços e sapatas, com boa usinabilidade e estabilidade.'],
  ['Aço', 'Produção de até 50 toneladas por mês para peças que pedem o material, identificadas no catálogo.'],
];

// ----------------------------------------------------------------- HOME
function home(v) {
  const L = linkDe(v);
  if (v === 'a') return `
<section class="hero">
  <img class="hero-bg" src="/assets/img/hero.webp" alt="" fetchpriority="high">
  ${pista('hero-pista')}
  <div class="wrap hero-in">
    <div class="hero-txt">
      <p class="eyebrow">Gramola Fundição · Limeira, SP</p>
      <h1>Qualidade e tradição <span>fundida em cada peça</span></h1>
      <p class="lead">Peças para suspensão de ônibus e caminhões Mercedes-Benz, Scania, Volvo, Volkswagen, Ford, Iveco, implementos e veículos especiais. Desde 1992.</p>
      <div class="acoes"><a class="btn" href="${L('catalogo')}">Ver catálogo de peças ${ico('seta')}</a><a class="btn btn-linha" href="${L('contato')}#orcamento">Pedir orçamento</a></div>
    </div>
    <form class="hero-busca" action="${L('catalogo')}" role="search">
      <span class="hb-t">${ico('busca')} Encontre sua peça</span>
      <label class="sr" for="hq">Código ou veículo</label>
      <input id="hq" name="q" type="search" placeholder="Ex.: MB001, 321.322.0001 ou Atego">
      <button class="btn" type="submit">Buscar</button>
      <span class="hb-dica">${produtos.length} peças com foto, aplicação e código original</span>
    </form>
  </div>
</section>

<section class="numeros"><div class="wrap">${numeros.map(([n, t]) => `<div><strong>${n}</strong><span>${t}</span></div>`).join('')}</div></section>

<section class="sec linhas-sec">
  <div class="wrap">
    <div class="sec-cab"><p class="eyebrow">Catálogo por montadora</p><h2>Escolha a linha do seu veículo</h2><p>As mesmas seções do catálogo impresso, agora com busca e página para cada peça.</p></div>
    <div class="linhas-grade">${linhas.map(l => `<a class="lt${l.foto ? '' : ' lt-pecas'}" href="${L(l.id)}">${fotoLinha(l)}<span class="lt-txt"><strong>${l.nome}</strong><small>${daLinha(l.id).length} peças${l.sub ? ' · ' + l.sub : ''}</small></span>${ico('seta', 'lt-seta')}</a>`).join('')}</div>
  </div>
</section>

<section class="sec sobre-sec">
  <div class="wrap sobre-grade">
    <figure class="sobre-foto"><img src="/assets/img/fabrica-quadro.webp" alt="Vista aérea da Gramola Fundição em Limeira" loading="lazy"><figcaption>Fábrica da Gramola em Limeira (SP)</figcaption></figure>
    <div>
      <p class="eyebrow">A Gramola</p>
      <h2>Líder em peças fundidas para suspensão desde 1992</h2>
      <p>Com um processo de produção inovador e equipamentos modernos para garantir elevado índice de qualidade, nossos produtos são distribuídos por todo o território nacional e mais 5 países do Mercosul.</p>
      <p>Hoje a capacidade de produção chega a 200 toneladas por mês em ferro fundido nodular e cinzento e 50 toneladas por mês em aço, o que permite estender o trabalho também ao fornecimento para terceiros.</p>
      <ul class="lista-check">${['Peças para Mercedes-Benz, Scania, Ford, Chevrolet, Volkswagen, Volvo, Dodge, FNM, Jeep, Mitsubishi, Iveco e Toyota', 'Código original de referência em cada peça do catálogo', 'Atendimento próximo, a nossa prioridade desde o início'].map(t => `<li>${ico('check')}${t}</li>`).join('')}</ul>
      <a class="btn" href="${L('empresa')}">Conheça a Gramola ${ico('seta')}</a>
    </div>
  </div>
</section>

<section class="sec novos-sec">
  <div class="wrap">
    <div class="sec-cab sec-cab-linha"><div><p class="eyebrow">Novidades no catálogo</p><h2>Últimas peças lançadas</h2></div><a class="link" href="${L('catalogo')}?novos=1">Ver todas as ${novidades.length} novidades ${ico('seta')}</a></div>
    <div class="trilho" data-trilho>${novidades.slice(0, 10).map(p => cartao(p, v)).join('')}</div>
  </div>
</section>

<section class="sec cat-sec">
  <div class="wrap cat-grade">
    <div class="cat-capa"><img src="/assets/img/capa-catalogo.webp" alt="Capa do catálogo Gramola" loading="lazy"></div>
    <div>
      <p class="eyebrow">Catálogo Gramola</p>
      <h2>Navegue pelas inovações: QR Codes, tags e muito mais</h2>
      <div class="inov">
        <div>${ico('qr')}<h3>QR Code</h3><p>Escaneie o código no catálogo impresso e abra a página da peça neste site, com foto e aplicação.</p></div>
        <div>${ico('tag')}<h3>Tags especiais</h3><p><span class="selo selo-novo">Novo</span> últimas adições ao catálogo. <span class="selo selo-exp">Exportação</span> peças no padrão de exportação.</p></div>
        <div>${ico('caminhao')}<h3>Marcas de renome</h3><p>Também peças para Chevrolet, Toyota, Jeep, FNM, Mitsubishi e Agrale, independentemente da marca do seu caminhão.</p></div>
      </div>
      <a class="btn" href="${site.catalogoPdf}" ${ext}>${ico('baixar')} Baixar catálogo em PDF</a>
    </div>
  </div>
</section>

<section class="sec contato-sec">
  <div class="wrap">
    <div class="sec-cab"><p class="eyebrow">Fale com a Gramola</p><h2>Atendimento direto com cada setor</h2></div>
    ${setorCards()}
  </div>
</section>`;

  // B
  return `
<section class="hero-b">
  <div class="wrap hero-b-in">
    <div class="hb-txt">
      <p class="eyebrow">Fundição de peças para suspensão · desde 1992</p>
      <h1>A peça certa para a suspensão do seu caminhão, pelo código</h1>
      <p class="lead">Digite o código Gramola, o código original da montadora ou o modelo do veículo. São ${produtos.length} peças fundidas em ferro nodular, cinzento e aço.</p>
      <form class="busca-b" action="${L('catalogo')}" role="search">
        <label class="sr" for="hq">Buscar peça</label>${ico('busca')}
        <input id="hq" name="q" type="search" placeholder="Ex.: 352.322.0201, VO538 ou FH12">
        <button class="btn" type="submit">Buscar</button>
      </form>
      <div class="hb-marcas">${linhas.map(l => `<a href="${L(l.id)}">${l.nome}</a>`).join('')}</div>
    </div>
    <div class="hb-mosaico">${amostra.map((p, i) => `<a class="hm hm-${i}" href="${L('peca/' + p.slug)}"><img src="/assets/p/${p.slug}.webp" alt="${esc(p.nome)}"><span>${esc(p.cod)}</span></a>`).join('')}</div>
  </div>
</section>

<section class="sec cruz">
  <div class="wrap">
    <div class="sec-cab"><p class="eyebrow">Como achar a sua peça</p><h2>Do código da montadora ao código Gramola</h2></div>
    <ol class="passos">
      <li><span class="pn">1</span><h3>Tenha em mãos o código</h3><p>O número da peça original (ex.: 321.322.0001) ou o modelo do veículo (ex.: LP 321/1111).</p></li>
      <li><span class="pn">2</span><h3>Busque no catálogo</h3><p>Cada peça mostra foto, aplicação, código original substituído e observações de furação e medidas.</p></li>
      <li><span class="pn">3</span><h3>Peça o orçamento</h3><p>O botão de WhatsApp já leva o código da peça para o comercial responder mais rápido.</p></li>
    </ol>
  </div>
</section>

<section class="sec linhas-b">
  <div class="wrap">
    <div class="sec-cab sec-cab-linha"><div><p class="eyebrow">Linhas</p><h2>Peças por montadora e aplicação</h2></div><a class="link" href="${L('catalogo')}">Catálogo completo ${ico('seta')}</a></div>
    <div class="lb-lista">${linhas.map((l, i) => `<a class="lb" href="${L(l.id)}"><span class="lb-n">${String(i + 1).padStart(2, '0')}</span><span class="lb-foto">${fotoLinha(l)}</span><span class="lb-txt"><strong>${l.nome}</strong><small>${l.sub || 'Suportes, algemas, sapatas, guias e calços de mola'}</small></span><span class="lb-q">${daLinha(l.id).length}<small>peças</small></span>${ico('seta', 'lb-seta')}</a>`).join('')}</div>
  </div>
</section>

<section class="sec cap-b">
  <div class="wrap cap-grade">
    <div>
      <p class="eyebrow">Capacidade da fundição</p>
      <h2>Produção própria em ferro e aço, também para terceiros</h2>
      <p>Processo de produção inovador e equipamentos modernos para garantir elevado índice de qualidade. A capacidade permite que a Gramola atenda também pedidos fora da sua linha de peças.</p>
      <a class="btn btn-claro" href="${L('fundicao')}">Ver a fundição ${ico('seta')}</a>
    </div>
    <div class="medidores">
      <div class="med"><div class="med-cab"><strong>200 t/mês</strong><span>Ferro fundido nodular e cinzento</span></div><span class="barra"><i style="width:100%"></i></span></div>
      <div class="med"><div class="med-cab"><strong>50 t/mês</strong><span>Aço</span></div><span class="barra"><i style="width:25%"></i></span></div>
      <div class="med-n"><div><strong>1992</strong><span>fundação</span></div><div><strong>${produtos.length}</strong><span>peças no catálogo</span></div><div><strong>Brasil + 5</strong><span>países do Mercosul</span></div></div>
    </div>
  </div>
</section>

<section class="fab-b">
  <img src="/assets/img/fabrica.webp" alt="Vista aérea da fábrica da Gramola em Limeira" loading="lazy">
  <div class="wrap"><blockquote>“Nossa equipe conta com excelente atendimento aos nossos clientes, e isso tem sido sempre nossa prioridade.”<cite>Gramola Fundição, Limeira (SP)</cite></blockquote></div>
</section>

<section class="sec novos-b">
  <div class="wrap">
    <div class="sec-cab sec-cab-linha"><div><p class="eyebrow">Lançamentos</p><h2>Novas peças no catálogo</h2></div><a class="link" href="${L('catalogo')}?novos=1">Ver as ${novidades.length} novidades ${ico('seta')}</a></div>
    <div class="grade-p">${novidades.slice(0, 8).map(p => cartao(p, v)).join('')}</div>
  </div>
</section>

<section class="sec contato-b">
  <div class="wrap cb-grade">
    <div><p class="eyebrow">Atendimento</p><h2>Fale direto com o setor certo</h2><p>Comercial, financeiro, compras e RH com telefone, WhatsApp e e-mail próprios.</p>
      <a class="btn btn-claro" href="${zap('Olá! Vim pelo site da Gramola e gostaria de um orçamento.')}" ${ext}>${ico('whats')} WhatsApp comercial</a></div>
    ${setorCards('setores-b')}
  </div>
</section>`;
}

// ----------------------------------------------------------------- EMPRESA
function empresa(v) {
  const L = linkDe(v);
  return `
<section class="ph ph-foto"><img src="/assets/img/fabrica.webp" alt="" class="ph-bg"><div class="wrap"><p class="eyebrow">A Gramola</p><h1>Desde 1992 fundindo peças para quem roda o Brasil</h1></div></section>
<section class="sec"><div class="wrap texto-grade">
  <div class="texto">
    <p class="lead">No mercado desde 1992, a Gramola Fundição Ltda. é líder na fabricação de peças para suspensão de ônibus e caminhões das marcas Mercedes-Benz, Scania, Ford, Chevrolet, Volkswagen, Volvo, Dodge, F.N.M., Jeep, Mitsubishi, Iveco, Toyota, entre outras.</p>
    <p>Com um processo de produção inovador e equipamentos modernos para garantir elevado índice de qualidade, nossos produtos são distribuídos por todo o território nacional e mais 5 países do Mercosul.</p>
    <p>Hoje, com capacidade de produção de até 200 toneladas por mês em ferro fundido nodular e cinzento e capacidade de produção de aço de até 50 toneladas, nosso trabalho se estende também ao fornecimento para terceiros.</p>
    <p>Nossa equipe conta com excelente atendimento aos nossos clientes, e isso tem sido sempre nossa prioridade. Estamos certos em dizer que esse é um dos fatores que mais colaboram para o nosso sucesso e para o sucesso dos clientes que servimos.</p>
  </div>
  <aside class="ficha">
    <h2>Em números</h2>
    ${numeros.map(([n, t]) => `<div><strong>${n}</strong><span>${t}</span></div>`).join('')}
    <div><strong>${produtos.length}</strong><span>peças no catálogo atual</span></div>
  </aside>
</div></section>
<section class="sec sec-azul"><div class="wrap">
  <div class="sec-cab"><p class="eyebrow">O que nos move</p><h2>Três compromissos em cada peça</h2></div>
  <div class="pilares">
    <article>${ico('escudo')}<h3>Qualidade</h3><p>Processo de produção inovador e equipamentos modernos para garantir elevado índice de qualidade.</p></article>
    <article>${ico('globo')}<h3>Alcance</h3><p>Distribuição em todo o território nacional e em mais 5 países do Mercosul.</p></article>
    <article>${ico('equipe')}<h3>Atendimento</h3><p>Excelente atendimento aos clientes, sempre a nossa prioridade.</p></article>
  </div>
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-cab"><p class="eyebrow">Marcas atendidas</p><h2>Peças para as principais montadoras</h2></div>
  <div class="marcas-lista">${['Mercedes-Benz', 'Scania', 'Volvo', 'Volkswagen', 'Ford', 'Iveco', 'Chevrolet', 'Toyota', 'Jeep', 'Mitsubishi', 'FNM', 'Agrale', 'International', 'Dodge'].map(m => `<span>${m}</span>`).join('')}</div>
  <div class="acoes centro"><a class="btn" href="${L('catalogo')}">Ver catálogo ${ico('seta')}</a><a class="btn btn-linha-esc" href="${L('fundicao')}">Conhecer a fundição</a></div>
</div></section>`;
}

// ----------------------------------------------------------------- FUNDIÇÃO
function fundicao(v) {
  const L = linkDe(v);
  return `
<section class="ph"><div class="wrap"><p class="eyebrow">Fundição</p><h1>Ferro nodular, ferro cinzento e aço na mesma fundição</h1><p class="lead">Até 200 toneladas por mês em ferro fundido e 50 toneladas por mês em aço, para a linha Gramola e para terceiros.</p></div></section>
<section class="sec"><div class="wrap">
  <div class="mats">${materiais.map(([t, d], i) => `<article class="mat mat-${i}"><span class="mat-n">${i < 2 ? '200 t/mês' : '50 t/mês'}</span><h2>${t}</h2><p>${d}</p></article>`).join('')}</div>
</div></section>
<section class="sec sec-azul processo"><div class="wrap">
  <div class="sec-cab"><p class="eyebrow">Do molde à peça</p><h2>Como nasce uma peça Gramola</h2></div>
  <ol class="etapas">${etapas.map(([t, d, i], n) => `<li><span class="et-ico">${ico(i)}</span><span class="et-n">${String(n + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
</div></section>
<section class="sec"><div class="wrap terc">
  <div><p class="eyebrow">Fornecimento para terceiros</p><h2>Capacidade disponível para o seu projeto de peça fundida</h2>
  <p>A capacidade de produção permite que o trabalho da Gramola se estenda também ao fornecimento para terceiros. Envie o desenho ou a amostra da peça e o volume previsto.</p>
  <a class="btn" href="${L('contato')}#orcamento">Enviar projeto para orçamento ${ico('seta')}</a></div>
  <figure><img src="/assets/img/fabrica-quadro.webp" alt="Galpões da Gramola Fundição" loading="lazy"></figure>
</div></section>`;
}

// ----------------------------------------------------------------- CATÁLOGO
function catalogo(v) {
  const L = linkDe(v);
  return `
<section class="ph ph-cat"><div class="wrap"><p class="eyebrow">Catálogo de peças</p><h1>${produtos.length} peças para suspensão de ônibus e caminhões</h1><p class="lead">Busque pelo código Gramola, pelo código original da montadora ou pelo veículo. Dados do catálogo Gramola 2024.</p>
<a class="btn btn-linha" href="${site.catalogoPdf}" ${ext}>${ico('baixar')} Catálogo em PDF</a></div></section>
<section class="sec sec-cat"><div class="wrap">
  ${filtro({ v })}
  <div class="grade-p" data-grade>${produtos.map(p => cartao(p, v)).join('\n')}</div>
  <p class="vazio" data-vazio hidden>Nenhuma peça encontrada. Fale com o comercial: <a href="${zap('Olá! Não encontrei uma peça no site da Gramola. Procuro: ')}" ${ext}>WhatsApp ${site.whatsTxt}</a></p>
</div></section>`;
}

function paginaLinha(v, l) {
  const L = linkDe(v);
  const ps = daLinha(l.id);
  return `
<section class="ph ph-linha${l.foto ? '' : ' ph-sem'}">${l.foto ? `<img class="ph-bg" src="/assets/img/marca-${l.foto}.webp" alt="">` : `<span class="ph-pecas">${ps.slice(0, 12).map(p => `<img src="/assets/p/${p.slug}.webp" alt="">`).join('')}</span>`}
<div class="wrap"><nav class="trilha" aria-label="Você está em"><a href="${L('catalogo')}">Catálogo</a> / <span>${l.nome}</span></nav>
<h1>Peças ${l.foto ? 'para ' : ''}${l.nome}</h1><p class="lead">${ps.length} peças${l.sub ? ': ' + l.sub : ' para suspensão: suportes de mola, algemas, sapatas, guias de grampo, calços e mais'}.</p></div></section>
<section class="sec sec-cat"><div class="wrap">
  <div class="outras">${linhas.filter(x => x.id !== l.id).map(x => `<a href="${L(x.id)}">${x.nome}</a>`).join('')}</div>
  ${filtro({ v, linhaId: l.id })}
  <div class="grade-p" data-grade>${ps.map(p => cartao(p, v)).join('\n')}</div>
  <p class="vazio" data-vazio hidden>Nenhuma peça encontrada nesta linha. <a href="${L('catalogo')}">Buscar em todo o catálogo</a></p>
</div></section>`;
}

function paginaPeca(v, p) {
  const L = linkDe(v);
  const l = linha(p.linha);
  const irmas = daLinha(l.id).filter(x => x.cod !== p.cod);
  const i = daLinha(l.id).indexOf(p);
  const viz = [...irmas.slice(Math.max(0, i - 2), i + 2), ...irmas].filter((x, k, a) => a.indexOf(x) === k).slice(0, 4);
  const linhaTab = (t, val) => `<tr><th>${t}</th><td>${esc(val || '-')}</td></tr>`;
  return `
<section class="peca"><div class="wrap">
  <nav class="trilha" aria-label="Você está em"><a href="${L('catalogo')}">Catálogo</a> / <a href="${L(l.id)}">${l.nome}</a> / <span>${esc(p.cod)}</span></nav>
  <div class="peca-grade">
    <figure class="peca-foto">${pista('peca-pista')}<img src="/assets/p/${p.slug}.webp" alt="${esc(p.nome + ' ' + p.cod)}" width="420" height="420">${selos(p) ? `<span class="pc-selos">${selos(p)}</span>` : ''}</figure>
    <div class="peca-info">
      <p class="peca-cod">${esc(p.cod)}</p>
      <h1>${esc(p.nome)}</h1>
      <p class="peca-linha">${l.nome}${p.grupo ? ' · ' + esc(p.grupo) : ''}</p>
      <table class="peca-tab">${linhaTab('Veículo de aplicação', p.aplic)}${linhaTab('Substitui o código original', p.original)}${linhaTab('Observação', p.obs)}${linhaTab('Linha', l.nome + (p.grupo ? ' · ' + p.grupo : ''))}</table>
      <div class="acoes"><a class="btn" href="${zap(`Olá! Gostaria de um orçamento da peça ${p.cod} (${p.nome}).`)}" ${ext}>${ico('whats')} Orçamento pelo WhatsApp</a><a class="btn btn-linha-esc" href="mailto:${site.email}?subject=${encodeURIComponent('Orçamento ' + p.cod)}">${ico('mail')} Por e-mail</a></div>
      <p class="peca-nota">Dados do catálogo Gramola 2024. Confirme a aplicação com o comercial antes do pedido.</p>
    </div>
  </div>
</div></section>
<section class="sec sec-cinza"><div class="wrap">
  <div class="sec-cab sec-cab-linha"><div><h2>Outras peças ${l.foto ? 'para ' : 'de '}${l.nome}</h2></div><a class="link" href="${L(l.id)}">Ver as ${daLinha(l.id).length} ${ico('seta')}</a></div>
  <div class="grade-p grade-4">${viz.map(x => cartao(x, v)).join('')}</div>
</div></section>`;
}

// ----------------------------------------------------------------- CONTATO
function contato(v) {
  return `
<section class="ph"><div class="wrap"><p class="eyebrow">Contato</p><h1>Fale com a Gramola</h1><p class="lead">Atendimento direto com cada setor, por telefone, WhatsApp ou e-mail.</p></div></section>
<section class="sec"><div class="wrap">${setorCards()}</div></section>
<section class="sec sec-cinza"><div class="wrap ct-grade">
  <form class="form" id="orcamento" data-form action="mailto:${site.email}" method="post" enctype="text/plain">
    <h2>Pedir orçamento</h2>
    <p>Informe os códigos das peças (Gramola ou original) e as quantidades. O comercial responde por e-mail ou WhatsApp.</p>
    <div class="campos">
      <label>Nome<input name="nome" required autocomplete="name"></label>
      <label>Empresa<input name="empresa" autocomplete="organization"></label>
      <label>Telefone / WhatsApp<input name="telefone" type="tel" required autocomplete="tel"></label>
      <label>E-mail<input name="email" type="email" autocomplete="email"></label>
      <label>Cidade / UF<input name="cidade"></label>
      <label>Assunto<select name="assunto"><option>Orçamento de peças</option><option>Fornecimento para terceiros</option><option>Revenda / distribuição</option><option>Outro assunto</option></select></label>
      <label class="larga">Peças e quantidades<textarea name="mensagem" rows="5" placeholder="Ex.: MB001 - 20 un. / 352.322.0201 - 10 un."></textarea></label>
    </div>
    <button class="btn" type="submit">Enviar pedido ${ico('seta')}</button>
  </form>
  <div class="onde">
    <h2>Onde estamos</h2>
    <p>${ico('local')}<span>${site.endereco.join('<br>')}</span></p>
    <p>${ico('fone')}<span>${site.fones.map(([t, h]) => `<a href="tel:+55${h}">${t}</a>`).join('<br>')}</span></p>
    <iframe title="Mapa da Gramola" src="${site.mapaEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <a class="link" href="${site.mapa}" ${ext}>Abrir no Google Maps ${ico('seta')}</a>
  </div>
</div></section>`;
}

// -----------------------------------------------------------------
export function gerarVersao(v) {
  const pg = {};
  const d = (slug, titulo, desc, corpo, cls) => { pg[slug] = doc({ v, slug, titulo, desc, corpo, cls }); };
  d('index', 'Início', 'Gramola Fundição, Limeira (SP): peças para suspensão de ônibus e caminhões desde 1992. Catálogo com busca por código original.', home(v), 'pg-home');
  d('empresa', 'A Gramola', 'Desde 1992 a Gramola Fundição fabrica peças para suspensão de ônibus e caminhões, com distribuição no Brasil e Mercosul.', empresa(v));
  d('fundicao', 'Fundição', 'Fundição em ferro nodular, cinzento (200 t/mês) e aço (50 t/mês), também para terceiros.', fundicao(v));
  d('catalogo', 'Catálogo de peças', `Catálogo Gramola com ${produtos.length} peças para suspensão: busca por código Gramola, código original ou veículo.`, catalogo(v), 'pg-cat');
  for (const l of linhas) d(l.id, `Peças ${l.nome}`, `${daLinha(l.id).length} peças Gramola para suspensão ${l.nome}, com aplicação e código original.`, paginaLinha(v, l), 'pg-cat');
  for (const p of produtos) d('peca/' + p.slug, `${p.cod} ${p.nome}`, `${p.cod} · ${p.nome}. Aplicação: ${p.aplic || 'consulte'}. ${p.original ? 'Substitui o código original ' + p.original + '.' : ''}`, paginaPeca(v, p));
  d('contato', 'Contato', 'Contato da Gramola Fundição: comercial, financeiro, compras e RH. Rodovia Eng. João Tosello, km 100, Limeira (SP).', contato(v));
  return pg;
}
