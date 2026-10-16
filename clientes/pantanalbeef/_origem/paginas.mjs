// Páginas das duas versões. A "Origem": fiel ao site atual (branco, mosaico de fotos, bege e cobre, títulos espaçados).
// B "Catálogo": a identidade dos catálogos impressos (papel, abas vermelhas, faixas listradas, rótulos das linhas).
import { empresa, numeros, abates, estados, uf, paises, totalPaises, linhas, ordemLinhas, produtos, textos, parceiros } from './dados.mjs';
import { pagina, im, esc, porLinha, contagem, tabela, filtrosCatalogo, busca, formContato, nomeCurto, detalhe } from './comum.mjs';

const PDF_COMPLETO = 'https://www.pantanalbeef.ind.br/_files/ugd/a64a40_a18af981178c41659e059475de2def4b.pdf';
const PDF_MACIATTA = 'https://www.pantanalbeef.ind.br/_files/ugd/a64a40_5c5f65116ff1493c84cd854e4896b49d.pdf';

const P = v => s => `/${v}/${s ? s + '/' : ''}`;
const ps = arr => arr.map(t => `<p>${esc(t)}</p>`).join('');
const seta = '<svg class="seta" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Etapas "do pasto à mesa", montadas com os textos de Pecuária, Indústria, Distribuição e Comercial.
const etapas = [
  { t: 'Originação', d: 'Compradores profissionais selecionam Nelore e Angus dos melhores criadores de Mato Grosso.', f: 'gado-nelore', s: 'pecuaria' },
  { t: 'Transporte', d: 'Frota própria e motoristas treinados no bem-estar animal, da fazenda ao frigorífico.', f: 'caminhao-gado', s: 'pecuaria' },
  { t: 'Abate e desossa', d: '840 abates e 1.700 peças desossadas por dia, sob Inspeção Federal (SIF).', f: 'desossa', s: 'industria' },
  { t: 'Câmaras frias', d: '180 toneladas de resfriados e 297 toneladas de congelados armazenados.', f: 'camara-carcacas', s: 'industria' },
  { t: 'Distribuição', d: 'Carretas rastreadas com temperatura controlada online para 14 estados e o DF.', f: 'caminhao-estrada', s: 'distribuicao' },
  { t: 'Exportação', d: `Mercados exigentes em ${totalPaises} países e novas habilitações em andamento.`, f: 'navio', s: 'comercial' },
];

const destaques = ['maciatta-picanha', 'maciatta-bife-ancho', 'maciatta-prime-rib', 'maciatta-t-bone', 'maciatta-short-rib', 'maciatta-costela-parrilla'].map(s => produtos.find(p => p.slug === s));

function logoLinha(l, cor = 'claro') {
  const L = linhas[l];
  if (l === 'pantanal') return `<span class="logo-linha logo-pantanal">${im(cor === 'claro' ? 'p-branco.png' : 'p-preto', '')}<b>Pantanal</b></span>`;
  if (!L.logo) return `<span class="logo-linha logo-texto">${L.nome}</span>`;
  return `<span class="logo-linha logo-${l}">${im(L.logo, 'Linha ' + L.nome)}</span>`;
}

// ---------- catálogo (as duas versões) ----------
function itemCatalogo(v, p) {
  const L = P(v);
  const foto = p.embalado || p.foto;
  const fotoTag = foto ? im(foto, p.nome) : `<span class="sem-foto">${im('p-preto', '')}<small>Foto em produção</small></span>`;
  const meta = `data-linha="${p.linha}" data-cons="${p.armazenamento || ''}" data-busca="${esc(busca(p))}"`;
  if (v === 'a') {
    return `<li class="item" ${meta}><a href="${L('catalogo/' + p.slug)}">
      <span class="item-foto">${fotoTag}</span>
      <span class="item-txt"><small>${linhas[p.linha].nome}</small><strong>${esc(nomeCurto(p))}</strong>${detalhe(p) ? `<em>${esc(detalhe(p))}</em>` : ''}
      <span class="item-meta">${p.codigo ? `<span>Cód. ${esc(p.codigo)}</span>` : ''}${p.armazenamento ? `<span class="cons cons-${p.armazenamento.toLowerCase()}">${p.armazenamento}</span>` : ''}</span></span>
    </a></li>`;
  }
  return `<li class="item" ${meta}><a href="${L('catalogo/' + p.slug)}">
    <span class="item-aba">${esc(nomeCurto(p))}</span>
    <span class="item-foto">${fotoTag}</span>
    <span class="item-ficha"><span><b>Código</b> ${esc(p.codigo || 'Consultar')}</span>${p.armazenamento ? `<span><b>${p.armazenamento}</b> ${esc(p.temperatura)}</span>` : ''}${detalhe(p) ? `<span>${esc(detalhe(p))}</span>` : ''}</span>
  </a></li>`;
}

function blocoLinha(v, l) {
  const L = linhas[l];
  return `<section class="grupo" data-grupo="${l}" id="linha-${l}">
    <header class="grupo-topo">
      <div class="grupo-capa">${im(L.capa, '')}<span class="grupo-logo">${logoLinha(l)}</span></div>
      <div class="grupo-txt"><p class="kicker">${L.rotulo} · ${contagem[l]} ${contagem[l] > 1 ? 'itens' : 'item'}</p><h2>${l === 'miudos' || l === 'carcaca' || l === 'subprodutos' ? L.nome : 'Linha ' + L.nome}</h2><p>${esc(L.texto)}</p></div>
    </header>
    <ul class="itens">${porLinha(l).map(p => itemCatalogo(v, p)).join('')}</ul>
  </section>`;
}

function paginaCatalogo(v) {
  const L = P(v);
  const corpo = `
<section class="cat-topo">
  <div class="in">
    <p class="kicker">Catálogo de produtos</p>
    <h1>${produtos.length} itens, do corte premium à carcaça</h1>
    <p class="lead">Todos os cortes, miúdos, carcaças e subprodutos do catálogo Pantanal Beef, com código, conservação e caixa padrão. Clique em um item para ver a ficha completa e pedir cotação.</p>
    <p class="cat-pdfs"><a class="bt bt-linha" href="${PDF_COMPLETO}" target="_blank" rel="noopener">Catálogo completo em PDF</a> <a class="bt bt-linha" href="${PDF_MACIATTA}" target="_blank" rel="noopener">Linha Maciatta em PDF</a></p>
  </div>
</section>
<div class="cat-barra" data-barra><div class="in">${filtrosCatalogo()}</div></div>
<div class="in catalogo" data-catalogo>
  ${ordemLinhas.map(l => blocoLinha(v, l)).join('')}
  <p class="vazio" hidden data-vazio>Nenhum item encontrado. Tente outro nome ou <a href="${L('contato')}?assunto=comercial">fale com o comercial</a>.</p>
</div>
<section class="mapa-cortes">
  <div class="in mapa-in">
    <div><p class="kicker">Mapa de cortes</p><h2>Onde fica cada corte no boi</h2><p>O mesmo mapa do catálogo impresso, para conferir de onde sai cada peça da linha antes de montar o pedido.</p><a class="bt bt-cheio" href="${L('contato')}?assunto=comercial">Pedir cotação</a></div>
    <figure>${im('mapa-cortes', 'Mapa de cortes bovinos do catálogo Pantanal Beef: picanha, contrafilé, filé mignon, costela, vazio, alcatra, maminha, patinho, coxão, lagarto, músculo, acém, paleta, cupim, pescoço e granito')}</figure>
  </div>
</section>`;
  return pagina(v, { titulo: 'Catálogo', desc: `Catálogo Pantanal Beef com ${produtos.length} itens: linhas Maciatta, Grill, Beef House e Pantanal, miúdos, carcaças e subprodutos, com código e conservação.`, caminho: 'catalogo' }, 'catalogo', corpo, 'pg-catalogo');
}

function paginaProduto(v, p) {
  const L = P(v);
  const Ln = linhas[p.linha];
  const irmaos = porLinha(p.linha).filter(x => x.slug !== p.slug);
  const i = porLinha(p.linha).findIndex(x => x.slug === p.slug);
  const relacionados = [...irmaos.slice(i), ...irmaos.slice(0, i)].slice(0, 4);
  const fotos = [p.embalado && { f: p.embalado, t: 'Embalada' }, p.foto && { f: p.foto, t: 'Peça' }, p.peca && { f: p.peca, t: 'No corte' }].filter(Boolean);
  const galeria = fotos.length
    ? `<div class="galeria" data-galeria><div class="galeria-palco">${fotos.map((f, k) => `<figure${k ? ' hidden' : ''}>${im(f.f, `${p.nome} Pantanal Beef, ${f.t.toLowerCase()}`)}</figure>`).join('')}</div>${fotos.length > 1 ? `<div class="galeria-tabs" role="tablist">${fotos.map((f, k) => `<button role="tab" aria-selected="${!k}"${k ? '' : ' class="on"'}>${f.t}</button>`).join('')}</div>` : ''}</div>`
    : `<div class="galeria"><div class="galeria-palco"><span class="sem-foto grande">${im('p-preto', '')}<small>Foto deste corte em produção</small></span></div></div>`;
  const pedido = encodeURIComponent(`Cotação: ${p.nome} (Linha ${Ln.nome}, cód. ${p.codigo || 's/ código'})`);
  const corpo = `
<nav class="in migalhas" aria-label="Você está em"><a href="${L('catalogo')}">Catálogo</a><span>/</span><a href="${L('catalogo')}#linha-${p.linha}">${Ln.nome}</a><span>/</span><span aria-current="page">${esc(p.nome)}</span></nav>
<article class="in produto">
  ${galeria}
  <div class="produto-txt">
    <p class="kicker">${['miudos', 'carcaca', 'subprodutos'].includes(p.linha) ? Ln.nome : 'Linha ' + Ln.nome} · ${Ln.rotulo}</p>
    <h1>${esc(nomeCurto(p))}${detalhe(p) ? `<small>${esc(detalhe(p))}</small>` : ''}</h1>
    ${p.descricao ? `<p class="lead">${esc(p.descricao)}</p>` : `<p class="lead">${esc(Ln.texto)}</p>`}
    ${p.armazenamento ? tabela(p) : `<p>Subproduto industrial. Especificação, embalagem e volumes sob consulta com o comercial.</p>`}
    <div class="produto-acoes">
      <a class="bt bt-cheio" href="${L('contato')}?assunto=comercial&produto=${pedido}">Pedir cotação</a>
      <a class="bt bt-linha" href="tel:${empresa.comercial.href}">${empresa.comercial.tel}</a>
    </div>
    <p class="nota">Dados do catálogo Pantanal Beef. Peso e quantidade por caixa são médias de produção.</p>
  </div>
</article>
<section class="relacionados">
  <div class="in">
    <h2>Mais da ${['miudos', 'carcaca', 'subprodutos'].includes(p.linha) ? 'seção ' + Ln.nome : 'Linha ' + Ln.nome}</h2>
    <ul class="itens">${relacionados.map(x => itemCatalogo(v, x)).join('')}</ul>
    <a class="bt bt-linha" href="${L('catalogo')}#linha-${p.linha}">Ver todos (${contagem[p.linha]})</a>
  </div>
</section>`;
  return pagina(v, { titulo: `${p.nome} · ${Ln.nome}`, desc: `${p.nome} da ${['miudos', 'carcaca', 'subprodutos'].includes(p.linha) ? 'seção ' : 'Linha '}${Ln.nome} Pantanal Beef. Código ${p.codigo || 'sob consulta'}${p.armazenamento ? `, ${p.armazenamento.toLowerCase()} de ${p.temperatura}` : ''}.`, caminho: 'catalogo/' + p.slug }, 'catalogo', corpo, 'pg-produto');
}

// ---------- blocos de conteúdo ----------
const blocoNumeros = (cls = '') => `<section class="numeros ${cls}"><div class="in"><ul>${numeros.map(n => `<li><strong>${n.n}</strong><span>${n.u}</span></li>`).join('')}</ul></div></section>`;

const blocoEtapas = (v, titulo = 'Do pasto à mesa') => `<section class="etapas">
  <div class="in">
    <p class="kicker">Cadeia integrada</p>
    <h2>${titulo}</h2>
    <ol>${etapas.map((e, k) => `<li><a href="${P(v)(e.s)}"><span class="etapa-foto">${im(e.f, '')}</span><span class="etapa-n">${String(k + 1).padStart(2, '0')}</span><strong>${e.t}</strong><span>${e.d}</span></a></li>`).join('')}</ol>
  </div>
</section>`;

const blocoExport = (v) => `<section class="export">
  <div class="in export-in">
    <div class="export-txt">
      <p class="kicker">Exportação</p>
      <h2>Nosso objetivo é chegar cada vez mais longe</h2>
      <p>${esc(textos.exportacao)}</p>
      <a class="bt bt-cheio" href="${P(v)('comercial')}">Comercial e exportação ${seta}</a>
    </div>
    <div class="export-paises">
      ${Object.entries(paises).map(([r, l]) => `<div><h3>${r}</h3><p>${l.join(' · ')}</p></div>`).join('')}
    </div>
  </div>
</section>`;

const blocoFrigomarca = () => `<section class="frigomarca" id="frigomarca">
  <div class="in frigomarca-in">
    <div><p class="kicker">Comunicado aos fornecedores, clientes e colaboradores</p><h2>Agora somos todos Frigomarca</h2></div>
    <div class="frigomarca-txt">${ps(textos.frigomarca)}</div>
  </div>
</section>`;

const blocoLinhaPropria = (v) => `<section class="linha-propria" id="linha-propria">
  <div class="in lp-in">
    <div class="lp-txt"><p class="kicker">Linha própria</p><h2>Sua marca, com carne Pantanal</h2><p>${esc(textos.linhaPropria)}</p>
      <ol class="lp-passos"><li>Compra dos animais</li><li>Abate</li><li>Seleção dos cortes</li><li>Embalagens</li><li>Distribuição</li></ol>
      <a class="bt bt-cheio" href="${P(v)('contato')}?assunto=linha-propria">Quero minha linha própria</a></div>
    <div class="lp-parceiros"><p class="kicker">Alguns dos nossos parceiros</p>
      <ul>${parceiros.map(pa => `<li><figure>${im('parceiros/' + pa.fotos[0], `Produto ${pa.nome} feito com o Pantanal Beef`)}</figure><span>${pa.nome}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>`;

// ---------- páginas institucionais ----------
// A: cabeçalho de página igual ao do site atual (foto com título à esquerda, "SOMOS A MARCA DA..." à direita).
// B: aba vermelha com o título, faixa listrada e foto recortada.
function abertura(v, { titulo, somos, foto, kicker }) {
  if (v === 'a') return `<section class="abre">
    <div class="abre-foto">${im(foto, '')}<h1>${titulo}</h1></div>
    <div class="abre-txt"><p class="somos">${somos}</p></div>
  </section>`;
  return `<section class="abre">
    <div class="in abre-in">
      <div class="abre-txt"><p class="aba">${kicker || titulo}</p><h1>${somos}</h1></div>
      <div class="abre-foto">${im(foto, '')}</div>
    </div>
    <div class="listras"></div>
  </section>`;
}

function institucional(v) {
  const corpo = `${abertura(v, { titulo: 'Institucional', somos: 'Produzindo qualidade,<br>alimentando<br>desenvolvimento', foto: 'fabrica-aerea', kicker: 'Quem somos' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><div class="selo-gira">${im('selo-vermelho', 'Frigorífico Pantanal Beef, 1982')}</div><p class="kicker">Desde ${empresa.desde}</p><h2>Frigorífico Pantanal, em Várzea Grande-MT</h2></div>
    <div class="td-txt">${ps(textos.sobre)}</div>
  </div>
</section>
${blocoNumeros()}
<section class="local">
  <div class="in local-in">
    <figure>${im('fabrica-aerea-2', 'Vista aérea da planta do Pantanal Beef em Várzea Grande-MT')}</figure>
    <div><p class="kicker">Localização estratégica</p><h2>No entroncamento das BR 070, 163 e 364</h2><p>A planta fica em Várzea Grande, na Grande Cuiabá, ponto de encontro das rodovias que ligam Mato Grosso ao resto do país. Isso facilita a originação de animais e o escoamento da carne.</p>
    <ul class="brs"><li><b>BR 070</b><span>Goiás e Brasília</span></li><li><b>BR 163</b><span>norte de MT e sul do país</span></li><li><b>BR 364</b><span>Rondônia e São Paulo</span></li></ul></div>
  </div>
</section>
${blocoEtapas(v, 'Como a carne Pantanal é feita')}
${blocoFrigomarca()}`;
  return pagina(v, { titulo: 'Institucional', desc: 'Frigorífico Pantanal, desde 1982 em Várzea Grande-MT: 840 abates por dia, 500 especialistas, selo SIF e exportação. Agora parte do Frigomarca.', caminho: 'institucional' }, 'institucional', corpo);
}

function pecuaria(v) {
  const corpo = `${abertura(v, { titulo: 'Pecuária', somos: 'Garantia<br>de origem<br>e bem-estar<br>animal', foto: 'gado-nelore' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><p class="kicker">Rebanho</p><h2>Nelore e Angus dos melhores criadores de Mato Grosso</h2></div>
    <div class="td-txt"><p>${esc(textos.pecuaria[0])}</p></div>
  </div>
</section>
<section class="faixa-fotos"><div class="in ff-in">
  <figure>${im('gado-pasto', 'Gado Nelore no pasto')}<figcaption>Nelore</figcaption></figure>
  <figure>${im('gado-angus', 'Gado Angus nos currais')}<figcaption>Angus</figcaption></figure>
  <figure>${im('caminhao-gado', 'Caminhão boiadeiro da frota própria')}<figcaption>Frota própria</figcaption></figure>
</div></section>
<section class="cuidados">
  <div class="in">
    <p class="kicker">Da fazenda ao abate</p><h2>Bem-estar animal em cada etapa</h2>
    <ol class="trilha">
      <li><b>Seleção</b><span>Compradores profissionais avaliam precocidade, padrão racial e acabamento.</span></li>
      <li><b>Carregamento</b><span>Os animais são acompanhados desde o carregamento até a chegada ao frigorífico.</span></li>
      <li><b>Transporte</b><span>${esc(textos.pecuaria[1].split('. ').slice(1, 3).join('. '))}.</span></li>
      <li><b>Currais e abate</b><span>${esc(textos.pecuaria[2])}</span></li>
    </ol>
  </div>
</section>
<section class="chamada"><div class="in chamada-in"><div><h2>É pecuarista em Mato Grosso?</h2><p>Fale com a equipe de compra de gado do Pantanal Beef.</p></div><a class="bt bt-cheio" href="${P(v)('contato')}?assunto=pecuarista">Falar com a compra de gado</a></div></section>`;
  return pagina(v, { titulo: 'Pecuária', desc: 'Gado Nelore e Angus dos melhores criadores de Mato Grosso, frota própria e bem-estar animal da fazenda ao abate, sob normas do MAPA e do SIF.', caminho: 'pecuaria' }, 'pecuaria', corpo);
}

function industria(v) {
  const corpo = `${abertura(v, { titulo: 'Indústria', somos: 'Somos<br>a marca da<br>produtividade', foto: 'desossa' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><p class="kicker">Planta de Várzea Grande</p><h2>Modernização contínua e segurança alimentar</h2></div>
    <div class="td-txt">${ps(textos.industria)}</div>
  </div>
</section>
${blocoNumeros('numeros-grandes')}
<section class="mosaico-ind"><div class="in mi-in">
  <figure class="mi-a">${im('camara-carcacas', 'Câmara fria com carcaças')}<figcaption>Câmaras frias</figcaption></figure>
  <figure class="mi-b">${im('desossa', 'Desossa')}<figcaption>Desossa</figcaption></figure>
  <figure class="mi-c">${im('camara', 'Expedição refrigerada')}<figcaption>Expedição</figcaption></figure>
  <figure class="mi-d">${im('etiqueta', 'Leitura de etiqueta na expedição')}<figcaption>Rastreabilidade</figcaption></figure>
</div></section>
<section class="chamada"><div class="in chamada-in"><div><h2>Nosso catálogo completo</h2><p>${produtos.length} itens entre cortes, miúdos, carcaças e subprodutos.</p></div><a class="bt bt-cheio" href="${P(v)('catalogo')}">Abrir o catálogo</a></div></section>`;
  return pagina(v, { titulo: 'Indústria', desc: 'Capacidade de 840 abates e 1.700 peças desossadas por dia, 180 t de resfriados e 297 t de congelados, com mais de 500 especialistas em carne.', caminho: 'industria' }, 'industria', corpo);
}

function distribuicao(v) {
  const corpo = `${abertura(v, { titulo: 'Distribuição', somos: 'Somos<br>a marca da<br>eficiência', foto: 'caminhao-estrada' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><p class="kicker">Logística</p><h2>14 estados e o Distrito Federal</h2></div>
    <div class="td-txt"><p>${esc(textos.distribuicao)}</p><p>Atendemos os estados de ${estados.slice(0, -1).join(', ')} e ${estados.at(-1)}.</p></div>
  </div>
</section>
<section class="estados"><div class="in">
  <p class="kicker">Onde a carne Pantanal chega</p>
  <ul class="ufs">${uf.map((u, k) => `<li title="${estados[k]}"><b>${u}</b><span>${estados[k]}</span></li>`).join('')}</ul>
</div></section>
<section class="faixa-fotos"><div class="in ff-in">
  <figure>${im('caminhao-bau', 'Carreta frigorífica')}<figcaption>Carretas frigoríficas</figcaption></figure>
  <figure>${im('doca', 'Docas de expedição')}<figcaption>Docas de expedição</figcaption></figure>
  <figure>${im('caixas', 'Caixas prontas para expedição')}<figcaption>Expedição em caixas</figcaption></figure>
</div></section>
<section class="chamada"><div class="in chamada-in"><div><h2>Quer ter Pantanal na sua cidade?</h2><p>O comercial monta a rota de entrega para o seu volume.</p></div><a class="bt bt-cheio" href="${P(v)('comercial')}">Falar com o comercial</a></div></section>`;
  return pagina(v, { titulo: 'Distribuição', desc: 'Planta em Várzea Grande-MT no entroncamento das BR 070, 163 e 364, com distribuição para 14 estados e o Distrito Federal.', caminho: 'distribuicao' }, 'distribuicao', corpo);
}

function comercial(v) {
  const e = empresa;
  const corpo = `${abertura(v, { titulo: 'Comercial', somos: 'Somos<br>credibilidade<br>no Brasil<br>e no mundo', foto: 'navio' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><p class="kicker">Mercado interno e exportação</p><h2>Uma das maiores exportadoras de carne bovina de Mato Grosso</h2></div>
    <div class="td-txt">${ps(textos.comercial)}</div>
  </div>
</section>
<section class="equipe"><div class="in">
  <p class="kicker">Departamento comercial</p><h2>Fale direto com quem vende</h2>
  <div class="equipe-grade">
    <div class="equipe-geral"><b>Comercial</b><a href="tel:${e.comercial.href}">${e.comercial.tel}</a><a href="mailto:${e.comercial.email}">${e.comercial.email}</a></div>
    ${e.vendedores.map(p => `<div class="vendedor"><b>${p.nome}</b><a href="tel:${p.href}">${p.tel}</a><a href="mailto:${p.email}">${p.email}</a></div>`).join('')}
  </div>
</div></section>
<section class="mapa-mundo">
  <div class="in"><p class="kicker">${totalPaises} destinos no mapa de exportação</p><h2>Nosso objetivo é chegar cada vez mais longe</h2></div>
  <figure class="in">${im('mapa-exportacao', 'Mapa de exportação Pantanal Beef com os países atendidos nas Américas, África, Oriente Médio, Ásia e Oceania')}</figure>
</section>
${blocoExport(v)}`;
  return pagina(v, { titulo: 'Comercial e exportação', desc: 'Departamento comercial do Pantanal Beef: logística própria, carretas rastreadas e exportação para mercados exigentes nas Américas, África, Oriente Médio, Ásia e Oceania.', caminho: 'comercial' }, 'comercial', corpo);
}

function sustentabilidade(v) {
  const s = textos.sustentabilidade;
  const corpo = `${abertura(v, { titulo: 'Sustentabilidade', somos: 'Compromisso<br>socioambiental<br>do campo à mesa', foto: 'floresta' })}
<section class="texto-duplo">
  <div class="in td-in">
    <div class="td-lado"><p class="kicker">Compromisso e conformidade</p><h2>Monitoramento alinhado às melhores práticas globais</h2></div>
    <div class="td-txt"><p>${esc(s.intro)}</p><p><b>Nossos esforços são respaldados por:</b></p><ul class="lista">${s.respaldo.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>
</section>
<section class="rastreio"><div class="in rastreio-in">
  <div class="rastreio-num"><strong>100%</strong><span>dos fornecedores diretos rastreados</span></div>
  <div><h2>Rastreabilidade e monitoramento: transparência desde a origem</h2><p>${esc(s.rastreio)}</p><ul class="vinculos">${s.vinculos.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p>${esc(s.auditoria)}</p></div>
</div></section>
<section class="abates"><div class="in">
  <p class="kicker">Todos rastreados até os fornecedores diretos</p><h2>Cabeças abatidas por ano</h2>
  <ul class="barras">${abates.map(a => `<li style="--v:${parseInt(a.n) / 245}"><span class="ano">${a.ano}</span><span class="barra"><i></i></span><b>${a.n}</b><small>${a.t}</small></li>`).join('')}</ul>
</div></section>
<section class="plano"><div class="in">
  <p class="kicker">Fornecedores indiretos</p><h2>Desafios e avanços na rastreabilidade</h2><p class="lead">${esc(s.indiretos)}</p>
  <ol class="plano-passos">${s.plano.map((x, k) => `<li><span class="pn">${k + 1}</span><b>${x.t}</b>${x.s ? `<small>${x.s}</small>` : ''}<p>${esc(x.d)}</p>${x.andamento ? '<em>em andamento</em>' : ''}</li>`).join('')}</ol>
  <p class="meta-2025">${esc(s.meta)}</p>
</div></section>
<section class="tecnologia"><div class="in tec-in">
  <figure>${im('muda', 'Muda de árvore nas mãos')}</figure>
  <div><p class="kicker">Tecnologia e inovação</p><h2>Geomonitoramento, blockchain e big data</h2><p>${esc(s.tecnologia)}</p><ul class="lista">${s.usos.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p>${esc(s.preventivo)}</p></div>
</div></section>
<section class="proximos"><div class="in">
  <p class="kicker">Próximos passos</p><h2>Rumo a uma cadeia 100% sustentável</h2><p class="lead">${esc(s.passosIntro)}</p>
  <ol class="passos3">${s.passos.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
  <blockquote><p>${esc(s.fecho)}</p><footer>“${esc(s.frase)}”</footer></blockquote>
</div></section>`;
  return pagina(v, { titulo: 'Sustentabilidade', desc: 'Rastreabilidade de 100% dos fornecedores diretos, geomonitoramento, Visipec, SMGEO e plano para fornecedores indiretos. Pecuária responsável do campo à mesa.', caminho: 'sustentabilidade' }, 'sustentabilidade', corpo);
}

function marcas(v) {
  const L = P(v);
  const corpo = `${abertura(v, { titulo: 'Marcas', somos: 'Somos<br>a marca da<br>confiança', foto: 'bife-faca' })}
<section class="linhas-det">
  ${['maciatta', 'grill', 'beefhouse', 'pantanal'].map((l, k) => {
    const Ln = linhas[l];
    const amostra = porLinha(l).filter(p => p.foto).slice(0, 4);
    return `<article class="linha-det linha-${l}${k % 2 ? ' inv' : ''}" id="${l}">
      <div class="ld-capa">${im(Ln.capa, '')}<span class="ld-logo">${logoLinha(l)}</span></div>
      <div class="ld-txt">
        <p class="kicker">${Ln.rotulo} · ${contagem[l]} itens</p>
        <h2>Linha ${Ln.nome}</h2>
        <p>${esc(Ln.texto)}</p>${Ln.site ? `<p>${esc(Ln.site)}</p>` : ''}
        <ul class="ld-amostra">${amostra.map(p => `<li><a href="${L('catalogo/' + p.slug)}">${im(p.embalado || p.foto, p.nome)}<span>${esc(nomeCurto(p))}</span></a></li>`).join('')}</ul>
        <a class="bt bt-linha" href="${L('catalogo')}#linha-${l}">Ver os ${contagem[l]} itens da linha ${seta}</a>
      </div>
    </article>`;
  }).join('')}
</section>
<section class="outras"><div class="in outras-in">
  ${['miudos', 'carcaca', 'subprodutos'].map(l => `<a href="${L('catalogo')}#linha-${l}" class="outra">${im(linhas[l].capa, '')}<span><b>${linhas[l].nome}</b><small>${contagem[l]} itens · ${linhas[l].rotulo}</small></span></a>`).join('')}
</div></section>
${blocoLinhaPropria(v)}`;
  return pagina(v, { titulo: 'Marcas', desc: 'Linhas Maciatta (cortes premium de novilhas jovens), Grill (assados e grelhados), Beef House (cortes do dia a dia) e Pantanal (congelados), além de linha própria para parceiros.', caminho: 'marcas' }, 'marcas', corpo);
}

function trabalhe(v) {
  const corpo = `${abertura(v, { titulo: 'Trabalhe conosco', somos: 'Venha<br>trabalhar<br>conosco', foto: 'desossa' })}
<section class="form-pg"><div class="in fp-in">
  <div class="fp-lado"><p class="kicker">Mais de 500 especialistas</p><h2>Faça parte do time Pantanal Beef</h2><p>Cadastre seu currículo para os próximos processos seletivos da planta de Várzea Grande-MT: indústria, câmaras frias, logística, administrativo e comercial.</p><p>Dúvidas sobre seus dados: <a href="mailto:${empresa.dpo}">${empresa.dpo}</a></p></div>
  <form class="form" data-form>
    <h2>Cadastro de currículo</h2>
    <label class="campo"><span>Nome</span><input name="nome" required autocomplete="given-name"></label>
    <label class="campo"><span>Sobrenome</span><input name="sobrenome" required autocomplete="family-name"></label>
    <label class="campo"><span>E-mail</span><input type="email" name="email" required autocomplete="email"></label>
    <label class="campo"><span>Telefone</span><input type="tel" name="telefone" required autocomplete="tel"></label>
    <label class="campo"><span>Escolaridade</span><select name="escolaridade"><option>Ensino fundamental</option><option>Ensino médio</option><option>Técnico</option><option>Superior</option><option>Pós-graduação</option></select></label>
    <label class="campo"><span>Link para currículo ou LinkedIn</span><input type="url" name="curriculo" placeholder="https://"></label>
    <label class="campo largo"><span>Experiência profissional</span><textarea name="experiencia" rows="4"></textarea></label>
    <label class="campo largo"><span>Conhecimentos gerais</span><textarea name="conhecimentos" rows="3"></textarea></label>
    <label class="aceite largo"><input type="checkbox" required> <span>${esc(textos.lgpdCurriculo)}</span></label>
    <button class="bt bt-cheio largo" type="submit">Enviar currículo</button>
    <p class="aviso largo" hidden>Prévia do novo site: o envio será ligado ao RH da Pantanal Beef na publicação.</p>
  </form>
</div></section>`;
  return pagina(v, { titulo: 'Trabalhe conosco', desc: 'Cadastre seu currículo no Pantanal Beef, frigorífico com mais de 500 especialistas em Várzea Grande-MT.', caminho: 'trabalhe-conosco' }, 'trabalhe-conosco', corpo);
}

function contato(v) {
  const e = empresa;
  const corpo = `${abertura(v, { titulo: 'Fale conosco', somos: 'Fale<br>com a<br>Pantanal', foto: 'bife-mao' })}
<section class="form-pg"><div class="in fp-in">
  <div class="fp-lado contatos">
    <div><p class="kicker">Comercial</p><a class="grande" href="tel:${e.comercial.href}">${e.comercial.tel}</a><a href="mailto:${e.comercial.email}">${e.comercial.email}</a></div>
    <ul class="vendedores">${e.vendedores.map(p => `<li><b>${p.nome}</b><a href="tel:${p.href}">${p.tel}</a><a href="mailto:${p.email}">${p.email}</a></li>`).join('')}</ul>
    <div><p class="kicker">SAC</p><a class="grande" href="tel:${e.sac.href}">${e.sac.tel}</a><a href="mailto:${e.sac.email}">${e.sac.email}</a></div>
    <div><p class="kicker">Endereço</p><p>${e.endereco.join('<br>')}</p><a class="bt bt-linha" href="${e.mapa}" target="_blank" rel="noopener">Abrir no mapa</a></div>
    <div><p class="kicker">Redes</p>${e.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener">${r.nome} ${r.rotulo}</a>`).join('')}</div>
  </div>
  ${formContato(v)}
</div></section>`;
  return pagina(v, { titulo: 'Fale conosco', desc: 'Comercial (66) 3026-0708, SAC (65) 3028-9550 e endereço do Pantanal Beef em Várzea Grande-MT. Envie sua mensagem ou pedido de cotação.', caminho: 'contato' }, 'contato', corpo);
}

// ---------- home ----------
function homeA() {
  const L = P('a');
  const corpo = `
<section class="hero-a">
  ${im('gado-nelore', '', 'fetchpriority="high" loading="eager"')}
  <div class="in hero-a-in">
    <h1><span>Do Brasil</span><span>para o</span><span>mundo</span></h1>
    <p>Frigorífico Pantanal, desde ${empresa.desde} em Várzea Grande-MT. Carne bovina com selo SIF, da originação do gado à exportação.</p>
    <div class="hero-bts"><a class="bt bt-cheio" href="${L('catalogo')}">Ver o catálogo</a><a class="bt bt-claro" href="${L('comercial')}">Falar com o comercial</a></div>
  </div>
</section>
<section class="mosaico" aria-label="Áreas do Pantanal Beef">
  <div class="mz mz-foto f1">${im('gado-pasto', 'Gado Nelore')}</div>
  <a class="mz mz-cor c-tan" href="${L('pecuaria')}"><span class="mz-t">Pecuária</span><span class="mz-d">Nelore e Angus de Mato Grosso, com frota própria e bem-estar animal.</span><span class="bt-mini">Ver mais</span></a>
  <a class="mz mz-cor c-branco" href="${L('industria')}"><span class="mz-t">Indústria</span><span class="mz-d">840 abates e 1.700 peças desossadas por dia.</span><span class="bt-mini">Ver mais</span></a>
  <div class="mz mz-foto f2">${im('desossa', 'Desossa na indústria')}</div>
  <div class="mz mz-foto f3">${im('doca', 'Docas de expedição')}</div>
  <a class="mz mz-cor c-cobre" href="${L('distribuicao')}"><span class="mz-t">Distribuição</span><span class="mz-d">Entroncamento das BR 070, 163 e 364, para 14 estados e o DF.</span><span class="bt-mini">Ver mais</span></a>
  <a class="mz mz-cor c-cinza" href="${L('comercial')}"><span class="mz-t">Comercial</span><span class="mz-d">Logística própria, carretas rastreadas e exportação para ${totalPaises} países.</span><span class="bt-mini">Ver mais</span></a>
  <div class="mz mz-foto f4">${im('grelhado', 'Bifes grelhados')}</div>
  <a class="mz mz-cor c-areia" href="${L('marcas')}"><span class="mz-t">Marcas</span><span class="mz-d">Maciatta, Grill, Beef House e Pantanal.</span><span class="bt-mini">Ver mais</span></a>
  <div class="mz mz-foto f5">${im('bife-faca', 'Bife de contrafilé')}</div>
</section>
${blocoNumeros()}
<section class="linhas-a">
  <div class="in"><p class="kicker">Marcas</p><h2>Quatro linhas, um padrão Pantanal</h2></div>
  <div class="in linhas-a-grade">
    ${['maciatta', 'grill', 'beefhouse', 'pantanal'].map(l => `<a class="la la-${l}" href="${L('marcas')}#${l}">${im(linhas[l].capa, '')}<span class="la-logo">${logoLinha(l)}</span><span class="la-txt"><small>${linhas[l].rotulo}</small>${esc(linhas[l].texto.replace(/^A Linha \S+( House)? /, '').replace(/^(possui|tem|é) /, m => m[0].toUpperCase() + m.slice(1)))}</span></a>`).join('')}
  </div>
</section>
<section class="destaques"><div class="in">
  <div class="dest-topo"><div><p class="kicker">Linha Maciatta</p><h2>Cortes premium de novilhas jovens</h2></div><a class="bt bt-linha" href="${L('catalogo')}">Catálogo completo · ${produtos.length} itens</a></div>
  <ul class="dest-grade">${destaques.map(p => `<li><a href="${L('catalogo/' + p.slug)}"><span class="dg-foto">${im(p.embalado, p.nome)}</span><strong>${p.nome}</strong><span>${p.armazenamento} · Cód. ${p.codigo}</span></a></li>`).join('')}</ul>
</div></section>
${blocoEtapas('a')}
${blocoExport('a')}
<section class="sust-chamada"><div class="sc-foto">${im('floresta', 'Floresta preservada vista de cima')}</div><div class="sc-txt"><p class="kicker">Sustentabilidade</p><h2>100% dos fornecedores diretos rastreados</h2><p>Geomonitoramento, blockchain e parcerias como Visipec e SMGEO para levar o mesmo controle aos fornecedores indiretos.</p><a class="bt bt-linha" href="${L('sustentabilidade')}">Leia mais ${seta}</a></div></section>
${blocoFrigomarca()}`;
  return pagina('a', { titulo: '', desc: 'Pantanal Beef, Frigorífico Pantanal desde 1982 em Várzea Grande-MT: linhas Maciatta, Grill, Beef House e Pantanal, catálogo completo e exportação.', caminho: '' }, '', corpo, 'pg-home');
}

function homeB() {
  const L = P('b');
  const corpo = `
<section class="hero-b">
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="aba">Frigorífico Pantanal · desde ${empresa.desde}</p>
      <h1>Produzindo qualidade, alimentando desenvolvimento</h1>
      <p>Carne bovina com selo SIF de Várzea Grande-MT para 14 estados, o DF e ${totalPaises} países. ${produtos.length} itens no catálogo, do corte premium à carcaça.</p>
      <div class="hero-bts"><a class="bt bt-cheio" href="${L('catalogo')}">Abrir o catálogo</a><a class="bt bt-linha" href="${L('contato')}?assunto=comercial">Pedir cotação</a></div>
    </div>
    <div class="hero-b-foto">${im('maciatta-capa', 'Cortes Maciatta sobre a mesa: T-bone, prime rib, picanha e bifes', 'fetchpriority="high" loading="eager"')}<div class="selo-gira">${im('selo-branco', 'Frigorífico Pantanal Beef, 1982')}</div></div>
  </div>
  <div class="listras"></div>
</section>
<section class="rotulos"><div class="in">
  <div class="rot-topo"><p class="aba">Linhas Pantanal Beef</p><p>Escolha a linha para ver os cortes no catálogo.</p></div>
  <ul class="rot-grade">
    ${['maciatta', 'grill', 'beefhouse', 'pantanal'].map(l => `<li><a class="rot rot-${l}" href="${L('catalogo')}#linha-${l}"><span class="rot-marca">${im(l === 'beefhouse' ? 'logo' : 'logo-branco.png', 'Pantanal Beef')}</span><span class="rot-linha">${l === 'pantanal' ? `${im('p-branco.png', '')}` : `<small>Linha</small>${logoLinha(l)}`}</span><span class="rot-tipo">${linhas[l].rotulo}</span></a><p>${esc(linhas[l].texto)}</p></li>`).join('')}
  </ul>
</div></section>
<section class="vitrine"><div class="in">
  <div class="vit-topo"><div><p class="aba">Linha Maciatta</p><h2>Cortes premium, embalados a vácuo com rótulo próprio</h2></div><a class="bt bt-linha" href="${L('catalogo')}#linha-maciatta">Ver os ${contagem.maciatta} cortes</a></div>
  <ul class="vit-grade">${destaques.map(p => `<li><a href="${L('catalogo/' + p.slug)}"><span class="vit-aba">${p.nome}</span>${im(p.embalado, p.nome)}<span class="vit-ficha"><b>Código ${p.codigo}</b><span>${p.armazenamento} · ${p.temperatura}</span><span>${p.qtdCaixa} por caixa · ${p.pesoCaixa}</span></span></a></li>`).join('')}</ul>
</div></section>
<section class="mapa-cortes mc-home">
  <div class="in mapa-in">
    <div><p class="aba">Mapa de cortes</p><h2>Do dianteiro ao traseiro, todos os cortes do boi</h2><p>Linhas para o churrasco, para o dia a dia e para a indústria, além de miúdos, carcaças e subprodutos.</p>
    <ul class="mc-lista">${['beefhouse', 'miudos', 'carcaca', 'subprodutos'].map(l => `<li><a href="${L('catalogo')}#linha-${l}"><b>${linhas[l].nome}</b><span>${contagem[l]} itens</span></a></li>`).join('')}</ul></div>
    <figure>${im('mapa-cortes', 'Mapa de cortes bovinos do catálogo Pantanal Beef')}</figure>
  </div>
</section>
${blocoNumeros('numeros-b')}
<section class="mundo-b">
  <div class="in"><div class="mb-topo"><div><p class="aba">Exportação</p><h2>Nosso objetivo é chegar cada vez mais longe</h2></div><p>${esc(textos.exportacao)}</p></div></div>
  <figure class="in">${im('mapa-exportacao', 'Mapa de exportação Pantanal Beef')}</figure>
</section>
${blocoEtapas('b', 'Do pasto à mesa, em seis etapas')}
${blocoLinhaPropria('b')}
<section class="sust-b"><div class="in sb-in">
  <div class="sb-num"><strong>100%</strong><span>dos fornecedores diretos rastreados</span></div>
  <div><p class="aba">Sustentabilidade</p><h2>Pecuária responsável, com ética e qualidade</h2><p>Monitoramento via PRODES/INPE, Ibama, CAR e lista do MTE, auditorias independentes e um plano com metas para os fornecedores indiretos.</p><a class="bt bt-linha" href="${L('sustentabilidade')}">Conhecer o programa ${seta}</a></div>
</div></section>
${blocoFrigomarca()}`;
  return pagina('b', { titulo: '', desc: 'Pantanal Beef: produzindo qualidade, alimentando desenvolvimento. Catálogo com linhas Maciatta, Grill, Beef House e Pantanal, mapa de cortes e exportação.', caminho: '' }, '', corpo, 'pg-home');
}

export function gerarVersao(v) {
  const out = {
    index: v === 'a' ? homeA() : homeB(),
    institucional: institucional(v),
    pecuaria: pecuaria(v),
    industria: industria(v),
    distribuicao: distribuicao(v),
    comercial: comercial(v),
    sustentabilidade: sustentabilidade(v),
    marcas: marcas(v),
    catalogo: paginaCatalogo(v),
    'trabalhe-conosco': trabalhe(v),
    contato: contato(v),
  };
  for (const p of produtos) out['catalogo/' + p.slug] = paginaProduto(v, p);
  return out;
}
