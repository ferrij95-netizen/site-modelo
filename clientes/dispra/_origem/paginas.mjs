// Páginas do site. As duas versões usam o mesmo conteúdo; a home e alguns blocos mudam de formato por versão.
import { site, banners, empresa, pni, especies, promocoes, eventos, artigo, indicadores, estados } from './conteudo.mjs';
import { esc, num, img, alvo, linkDe, banco, ico, topo, rodape, formContato, formCadastro, documento } from './comum.mjs';

const TEMA = { a: '#7a1414', b: '#06589C' };

// Cabeçalho das páginas internas.
const cabeca = (v, titulo, sub, foto) => `<section class="cabeca${foto ? ' com-foto' : ''}">
  ${foto ? `<div class="cabeca-foto">${img(foto, '', 'loading="eager"')}</div>` : ''}
  <div class="in"><nav class="trilha" aria-label="Você está em"><a href="/${v}/">Home</a><span>/</span>${esc(titulo)}</nav>
  <h1>${esc(titulo)}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
</section>`;

// Faixa de chamada para o televendas, usada no fim das páginas.
const chamada = (v, L) => `<section class="chamada"><div class="in">
  ${img('telemarketing', 'Atendente do televendas da Dispra', 'width="175" height="134" class="chamada-foto"')}
  <div><span class="eyebrow">Ligue grátis de todo o Sul do país</span><h2>Faça seu pedido pelo <b>${site.gratis}</b></h2><p>Ou contate um dos nossos representantes mais próximos de você. Televendas das 7h às 19h.</p></div>
  <div class="chamada-acoes"><a class="btn btn-prim" href="tel:${site.gratisHref}">${ico('fone')} Ligar agora</a><a class="btn btn-sec" href="${L('atendimento')}">Ver representantes</a></div>
</div></section>`;

// Etapas do atendimento: do pedido ao campo (texto do site atual, em formato visual).
const etapas = [
  ['fone', 'Televendas', 'Compra, dúvidas e reclamações das 7h às 19h, 12 horas por dia.'],
  ['pessoa', 'Representante', 'Equipe de vendas treinada em SC, PR e RS, perto de você.'],
  ['caminhao', 'Frota própria', 'Entrega rápida e confiável em todo o Sul do país.'],
  ['campo', 'Assistência no campo', 'Veterinários e zootecnistas orientando nutrição, reprodução e prevenção.'],
];
const blocoEtapas = () => `<ol class="etapas">${etapas.map(([i, t, d], k) => `<li><span class="etapa-n">${num(k)}</span>${ico(i, 'ico etapa-i')}<h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>`;

// Mapa esquemático: Joaçaba no centro, com as três capitais do Sul.
const mapaSul = () => `<figure class="mapa-sul" aria-label="Joaçaba no centro dos três estados do Sul">
  <svg viewBox="0 0 400 360" role="img">
    <path class="uf" d="M120 30 L300 20 L340 70 L330 110 L250 120 L150 118 L110 80 Z"/>
    <path class="uf" d="M110 122 L250 124 L332 116 L350 160 L320 190 L200 196 L120 180 Z"/>
    <path class="uf" d="M120 184 L200 200 L320 194 L300 250 L240 330 L170 340 L80 280 L60 220 Z"/>
    <g class="rota"><line x1="200" y1="150" x2="300" y2="70"/><line x1="200" y1="150" x2="318" y2="168"/><line x1="200" y1="150" x2="250" y2="285"/></g>
    <g class="cap"><circle cx="300" cy="70" r="6"/><text x="292" y="52">Curitiba</text></g>
    <g class="cap"><circle cx="318" cy="168" r="6"/><text x="252" y="196">Florianópolis</text></g>
    <g class="cap"><circle cx="250" cy="285" r="6"/><text x="184" y="312">Porto Alegre</text></g>
    <g class="sede"><circle cx="200" cy="150" r="22"/><circle cx="200" cy="150" r="9"/><text x="120" y="140">Joaçaba</text></g>
    <text class="uf-n" x="190" y="78">PR</text><text class="uf-n" x="140" y="166">SC</text><text class="uf-n" x="140" y="250">RS</text>
  </svg>
  <figcaption>Joaçaba fica a uma distância quase equivalente das capitais dos três estados do Sul.</figcaption>
</figure>`;

function home(v) {
  const L = linkDe(v);
  const slides = banners.map((b, k) => `<article class="slide${k === 0 ? ' ativo' : ''}" data-slide aria-roledescription="slide" aria-label="${k + 1} de ${banners.length}">
      <div class="slide-foto">${img(b.img, '', k === 0 ? 'loading="eager" fetchpriority="high"' : '')}${b.banco ? banco : ''}</div>
      <div class="in slide-txt"><span class="eyebrow">Dispra Distribuidora</span><h2 class="slide-t">${b.t}</h2><p>${b.s}</p>
        <div class="acoes"><a class="btn btn-prim" href="${L(b.link)}">${b.cta} ${ico('seta')}</a><a class="btn btn-claro" href="tel:${site.gratisHref}">${ico('fone')} ${site.gratis}</a></div></div>
    </article>`).join('');

  const atalhos = [
    ['fabrica', 'Conheça nossa indústria', 'A fábrica PNI Nutrição Animal, certificada BPF e HACCP.', 'nutricao', 'fabrica-pni'],
    ['fone', 'Faça seu pedido', `Ligue grátis de todo o Sul: ${site.gratis}.`, 'atendimento', 'telemarketing'],
    ['caminhao', 'Entrega rápida e confiável', 'Frota própria e eficiência em todo o Sul do país.', 'atendimento', 'caminhao-mapa'],
    ['frasco', 'As melhores marcas', 'Medicamentos veterinários dos laboratórios parceiros.', 'produtos', 'laboratorio'],
  ];

  const corpo = `${topo({ versao: v, slug: 'index' })}
<main>
  <section class="hero" data-carrossel aria-label="Destaques">
    <h1 class="sr">Dispra Distribuidora: produtos veterinários e nutrição animal no Sul do Brasil</h1>
    ${slides}
    <div class="in hero-nav"><div class="pontos">${banners.map((b, k) => `<button type="button" data-ir="${k}"${k === 0 ? ' aria-current="true"' : ''} aria-label="Destaque ${k + 1}: ${esc(b.t)}">${k + 1}</button>`).join('')}</div>
      <div class="setas"><button type="button" data-ant aria-label="Anterior">‹</button><button type="button" data-prox aria-label="Próximo">›</button></div></div>
  </section>

  <section class="atalhos"><div class="in">${atalhos.map(([i, t, d, s, f]) => `<a class="atalho" href="${L(s)}">
      <span class="atalho-foto">${img(f, '')}</span>
      <span class="atalho-txt">${ico(i)}<b>${t}</b><span>${d}</span></span><span class="atalho-seta">${ico('seta')}</span></a>`).join('')}
  </div></section>

  <section class="sobre-home"><div class="in">
    <div class="sobre-txt"><span class="eyebrow">A empresa</span><h2>Líder na distribuição de produtos veterinários e suplementos minerais no Sul do Brasil</h2>
      <p class="lead">${empresa.intro}</p>
      <ul class="valores">${empresa.valores.map(x => `<li>${ico('check')}${x}</li>`).join('')}</ul>
      <a class="btn btn-prim" href="${L('empresa')}">Conheça a Dispra ${ico('seta')}</a></div>
    <div class="sobre-fotos"><figure class="f1">${img('caminhoes', 'Frota própria da Dispra em frente à sede')}</figure><figure class="f2">${img('sede', 'Sede da Dispra em Joaçaba')}</figure>
      <div class="selo-sul"><b>SC · PR · RS</b><span>Atendimento em todo o Sul</span></div></div>
  </div></section>

  <section class="especies"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Para cada rebanho</span><h2>Medicamentos e suplementação para todas as criações</h2>
      <p>Bovinos de corte e leite, suínos, equinos, caprinos, ovinos, aves e pequenos animais.</p></div>
    <div class="esp-grade">${especies.map(([t, f, d], k) => `<a class="esp esp-${k}" href="${L('produtos')}#${f}">${img(f, t)}<span><b>${t}</b><em>${d}</em></span></a>`).join('')}</div>
    <p class="nota-banco">Fotos ilustrativas.</p>
  </div></section>

  <section class="como"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Como atendemos</span><h2>Do pedido ao campo, com a mesma equipe</h2></div>
    ${blocoEtapas()}
  </div></section>

  <section class="pni-home"><div class="in">
    <div class="pni-foto">${img('fabrica-pni', 'Fábrica da PNI Nutrição Animal')}</div>
    <div class="pni-txt">${img('logo-pni', 'PNI Nutrição Animal', 'class="logo-pni" width="200" height="52"')}
      <h2>${pni.frase}</h2><p>${pni.texto[0]}</p><p>${pni.juntas}</p>
      <div class="pni-selos">${img('selos', 'Selos BPF e HACCP Sindirações', 'width="270" height="122"')}<span>Empresa certificada<br><b>Feed &amp; Food Safety</b></span></div>
      <a class="btn btn-prim" href="${L('nutricao')}">Conheça a nutrição PNI ${ico('seta')}</a></div>
  </div></section>

  <section class="eventos-home"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Dispra no Campo</span><h2>A Dispra está presente nos maiores eventos agropecuários do país</h2></div>
    <ul class="ev-lista">${eventos.map(([n, l]) => `<li>${ico('campo')}<b>${n}</b><span>${l}</span></li>`).join('')}</ul>
    <a class="link-seta" href="${L('dispra-no-campo')}">Ver a Dispra no Campo ${ico('seta')}</a>
  </div></section>

  <section class="utilidades"><div class="in">
    <div class="util-card util-ind"><span class="eyebrow">Indicadores</span><h2>Cotações, indicadores financeiros e previsão do tempo</h2>
      <ul>${indicadores.slice(0, 4).map(([t, f, u]) => `<li><a href="${u}"${alvo(u)}>${t}<small>${f}</small>${ico('externo')}</a></li>`).join('')}</ul>
      <a class="link-seta" href="${L('indicadores')}">Todos os indicadores ${ico('seta')}</a></div>
    <div class="util-card util-cad"><span class="eyebrow">Cadastre-se</span><h2>Fique informado sobre promoções e lançamentos</h2><p>Preencha com seu nome e e-mail.</p>${formCadastro()}</div>
    <div class="util-card util-art"><span class="eyebrow">Artigo técnico</span><h2>${artigo.titulo}</h2><p>${artigo.resumo}</p><p class="autor">${artigo.autor}</p>
      <a class="link-seta" href="${L('artigos/' + artigo.slug)}">Ler o artigo ${ico('seta')}</a></div>
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'index', corpo, tema: TEMA[v] });
}

function pEmpresa(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'empresa' })}
<main>${cabeca(v, 'Empresa', empresa.intro, 'caminhoes')}
  <nav class="sub-nav"><div class="in">${[['missao', 'Missão'], ['comercial', 'Comercial'], ['assistencia', 'Assistência técnica'], ['logistica', 'Logística'], ['parcerias', 'Parcerias']].map(([a, t]) => `<a href="#${a}">${t}</a>`).join('')}</div></nav>
  <section class="bloco missao" id="missao"><div class="in"><span class="eyebrow">Missão</span><blockquote>${empresa.missao}</blockquote></div></section>
  <section class="bloco duas" id="comercial"><div class="in">
    <div><span class="eyebrow">Comercial · Representação</span><h2>Uma referência no Sul do Brasil</h2>${empresa.comercial.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="destaque-hora">${ico('relogio')}<b>7h às 19h</b><span>Televendas 12 horas por dia para compra, dúvidas e reclamações.</span><a class="btn btn-prim" href="tel:${site.gratisHref}">${site.gratis}</a></aside>
  </div></section>
  <section class="bloco duas inv" id="assistencia"><div class="in">
    <figure class="foto-moldura">${img('vaca', 'Gado no campo')}${banco}</figure>
    <div><span class="eyebrow">Assistência técnica</span><h2>Veterinários e zootecnistas no campo</h2>${empresa.assistencia.map(p => `<p>${p}</p>`).join('')}</div>
  </div></section>
  <section class="bloco duas" id="logistica"><div class="in">
    <div><span class="eyebrow">Logística</span><h2>Joaçaba, no centro do Sul</h2><p>${empresa.logistica}</p>
      <ul class="lista-check"><li>${ico('check')}Frota própria</li><li>${ico('check')}Rodovias estaduais e federais</li><li>${ico('check')}Entrega rápida e confiável</li></ul></div>
    ${mapaSul()}
  </div></section>
  <section class="bloco parcerias" id="parcerias"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Parcerias</span><h2>Uma relação de extrema confiança</h2><p>${empresa.parcerias}</p></div>
    <ul class="valores-grandes">${empresa.valores.map((x, k) => `<li><span>${num(k)}</span>${x}</li>`).join('')}</ul>
    <p class="parceiros">Cooperativas · Laticínios · Lojas agropecuárias · Fornecedores de produtos</p>
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'empresa', corpo, tema: TEMA[v] });
}

function pNutricao(v) {
  const L = linkDe(v);
  const linhas = [
    ['Bovinos de leite', 'Núcleos e suplementos minerais.', 'gado-leite-real'],
    ['Pecuária de corte', 'As melhores ferramentas para pecuária de corte.', 'gado-corte-real'],
  ];
  const corpo = `${topo({ versao: v, slug: 'nutricao' })}
<main>${cabeca(v, 'Nutrição', pni.frase, 'fabrica-bpf')}
  <section class="bloco duas"><div class="in">
    <div>${img('logo-pni', 'PNI Nutrição Animal', 'class="logo-pni" width="200" height="52"')}<h2>Suplementos minerais e aditivos alimentares</h2>${pni.texto.map(p => `<p>${p}</p>`).join('')}<p class="lead">${pni.juntas}</p></div>
    <figure class="foto-moldura">${img('fabrica-pni', 'Fábrica da PNI Nutrição Animal')}<figcaption>Fábrica da PNI Nutrição Animal.</figcaption></figure>
  </div></section>
  <section class="bloco linhas"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Linhas</span><h2>Soluções para cada sistema de produção</h2></div>
    <div class="linhas-grade">${linhas.map(([t, d, f]) => `<article class="linha">${img(f, t)}<div><h3>${t}</h3><p>${d}</p><a class="link-seta" href="${L('contato')}?assunto=Compra%20de%20produtos">Consultar a linha ${ico('seta')}</a></div></article>`).join('')}</div>
  </div></section>
  <section class="bloco qualidade"><div class="in">
    <div class="q-selos">${img('selos', 'Selos BPF e HACCP Sindirações', 'width="270" height="122"')}</div>
    <div><span class="eyebrow">Qualidade</span><h2>Qualidade e resultado com garantia certificada</h2>
      <ol class="q-passos"><li><b>Matérias-primas nobres</b><span>Seleção rigorosa na entrada.</span></li><li><b>Normas e protocolos</b><span>Respeito a todos os processos produtivos.</span></li><li><b>Controle rígido</b><span>Qualidade conferida em cada produto.</span></li><li><b>Feed &amp; Food Safety</b><span>Empresa certificada BPF e HACCP.</span></li></ol></div>
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'nutricao', corpo, tema: TEMA[v] });
}

function pPromocoes(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'promocoes' })}
<main>${cabeca(v, 'Promoções', 'Preços baixos e melhores condições de compra. Solicite a visita de um representante ou ligue para o nosso televendas.')}
  <section class="bloco"><div class="in promo-grade">${promocoes.map(p => `<article class="promo">
      <div class="promo-foto">${img(p.img, p.nome, `width="${Math.round(p.w / 1.6)}" height="${Math.round(p.h / 1.6)}"`)}</div>
      <div><span class="tag">Promoção</span><h2>${p.nome}</h2><p>${p.txt}</p>
        <div class="acoes"><a class="btn btn-prim" href="tel:${site.gratisHref}">${ico('fone')} ${site.gratis}</a><a class="btn btn-sec" href="${L('contato')}?assunto=Compra%20de%20produtos&amp;produto=${encodeURIComponent(p.nome)}">Pedir pelo site</a></div></div></article>`).join('')}
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'promocoes', corpo, tema: TEMA[v] });
}

function pAtendimento(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'atendimento' })}
<main>${cabeca(v, 'Atendimento', 'Com nossa sede no estado de Santa Catarina, a empresa encontra-se em uma localização estratégica para atender todo o Sul do país.', 'caminhoes')}
  <section class="bloco duas"><div class="in">
    <div><span class="eyebrow">Lista dos representantes</span><h2>Encontre o representante da sua região</h2>
      <p>Selecione o seu estado e a sua cidade para entrar em contato com um de nossos representantes para melhor atendê-lo.</p>
      <form class="busca-rep" data-rep>
        <label><span>Estado</span><select name="uf">${estados.map(([uf, n]) => `<option value="${uf}">${n}</option>`).join('')}</select></label>
        <label><span>Cidade</span><input name="cidade" placeholder="Digite sua cidade" required></label>
        <button class="btn btn-prim" type="submit">${ico('busca')} Falar com o representante</button>
      </form>
      <p class="nota">Enquanto a lista de representantes por cidade é carregada no site novo, o pedido chega ao televendas, que encaminha ao representante da sua região.</p></div>
    ${mapaSul()}
  </div></section>
  <section class="como"><div class="in"><div class="sec-tit"><span class="eyebrow">Como atendemos</span><h2>Possuímos frota própria, garantindo ao cliente uma entrega rápida e confiável</h2></div>${blocoEtapas()}</div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'atendimento', corpo, tema: TEMA[v] });
}

function pCampo(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'dispra-no-campo' })}
<main>${cabeca(v, 'Dispra no Campo', 'Produtos de excelente qualidade e o cuidado com a utilização correta e as boas práticas no campo.', 'gado-leite-real')}
  <section class="bloco tres-temas"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Assistência técnica</span><h2>Orientação de quem está no campo</h2><p>${empresa.assistencia[0]}</p></div>
    <ul class="temas">${[['Nutrição animal', 'campo'], ['Reprodução', 'pessoa'], ['Prevenção a doenças', 'escudo']].map(([t, i]) => `<li>${ico(i)}<b>${t}</b></li>`).join('')}</ul>
  </div></section>
  <section class="bloco duas inv"><div class="in">
    <figure class="foto-moldura">${img('leite-rebanho', 'Rebanho leiteiro no pasto')}${banco}</figure>
    <div><span class="eyebrow">Palestras</span><h2>Informação para uma produção sustentável e lucrativa</h2><p>${empresa.assistencia[1]}</p>
      <a class="btn btn-prim" href="${L('contato')}?assunto=Outros">Agendar uma palestra ${ico('seta')}</a></div>
  </div></section>
  <section class="bloco eventos"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Eventos</span><h2>A Dispra está presente nos maiores eventos agropecuários do país</h2></div>
    <ol class="ev-linha">${eventos.map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join('')}</ol>
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'dispra-no-campo', corpo, tema: TEMA[v] });
}

function pProdutos(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'produtos' })}
<main>${cabeca(v, 'Produtos', 'A Dispra atua com os melhores e mais bem conceituados laboratórios do Brasil. São produtos de qualidade, garantindo produtividade ao produtor.', 'laboratorio')}
  <section class="bloco"><div class="in">
    <form class="busca-prod" data-busca><label><span class="sr">Buscar produto</span><input name="q" placeholder="Buscar produto" required></label><button class="btn btn-prim" type="submit">${ico('busca')} Buscar</button></form>
    <div class="cat-grade">
      <article class="cat">${ico('frasco')}<h2>Medicamentos veterinários</h2><p>As melhores marcas em medicamentos, dos laboratórios parceiros da Dispra.</p><a class="link-seta" href="${L('contato')}?assunto=Novartis">Consultar marcas ${ico('seta')}</a></article>
      <article class="cat">${img('logo-pni', 'PNI Nutrição Animal', 'width="200" height="52"')}<h2>Nutrição animal PNI</h2><p>Núcleos, suplementos minerais e aditivos alimentares da PNI Nutrição Animal.</p><a class="link-seta" href="${L('nutricao')}">Ver a nutrição PNI ${ico('seta')}</a></article>
      <article class="cat">${ico('escudo')}<h2>Promoções</h2><p>NT-51, Raktil e outros produtos com condições especiais de compra.</p><a class="link-seta" href="${L('promocoes')}">Ver promoções ${ico('seta')}</a></article>
    </div>
  </div></section>
  <section class="bloco esp-lista"><div class="in">
    <div class="sec-tit"><span class="eyebrow">Por criação</span><h2>Produtos para cada espécie</h2></div>
    ${especies.map(([t, f, d], k) => `<article class="esp-linha" id="${f}">${img(f, t)}<div><span class="etapa-n">${num(k)}</span><h3>${t}</h3><p>${d}</p></div><a class="btn btn-sec" href="${L('contato')}?assunto=Compra%20de%20produtos&amp;produto=${encodeURIComponent(t)}">Consultar produtos</a></article>`).join('')}
    <p class="nota-banco">Fotos ilustrativas.</p>
  </div></section>
  ${chamada(v, L)}
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'produtos', corpo, tema: TEMA[v] });
}

function pArtigos(v) {
  const L = linkDe(v);
  const corpo = `${topo({ versao: v, slug: 'artigos' })}
<main>${cabeca(v, 'Artigos Técnicos', 'Conteúdo técnico da equipe Dispra sobre nutrição e sanidade animal.')}
  <section class="bloco"><div class="in art-grade">
    <a class="art-card" href="${L('artigos/' + artigo.slug)}"><span class="art-foto">${img('leite', artigo.titulo)}</span><span class="art-txt"><span class="tag">Nutrição de ruminantes</span><b>${artigo.titulo}</b><span>${artigo.resumo}</span><em>${artigo.autor}</em></span></a>
    <div class="art-vazio">${ico('livro')}<b>Novos artigos em breve</b><span>Cadastre-se para receber os próximos artigos técnicos.</span>${formCadastro()}</div>
  </div></section>
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'artigos', corpo, tema: TEMA[v] });
}

function pArtigo(v) {
  const L = linkDe(v);
  const slug = 'artigos/' + artigo.slug;
  const corpo = `${topo({ versao: v, slug })}
<main>${cabeca(v, artigo.titulo, `Por ${artigo.autor}`, 'leite-rebanho')}
  <article class="bloco texto-longo"><div class="in">
    <p class="lead">${artigo.resumo}</p>
    ${artigo.partes.map(([t, p]) => `<h2>${t}</h2><p>${p}</p>`).join('')}
    <a class="link-seta" href="${L('artigos')}">${ico('seta')} Todos os artigos</a>
  </div></article>
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug, corpo, tema: TEMA[v] });
}

function pIndicadores(v) {
  const icos = ['sol', 'dolar', 'grafico', 'grafico', 'grafico'];
  const corpo = `${topo({ versao: v, slug: 'indicadores' })}
<main>${cabeca(v, 'Indicadores', 'Cotações, indicadores financeiros e previsão do tempo para o seu dia no campo.')}
  <section class="bloco"><div class="in ind-grade">${indicadores.map(([t, f, u], k) => `<a class="ind" href="${u}"${alvo(u)}>${ico(icos[k])}<b>${t}</b><span>${f}</span>${ico('externo', 'ico ind-ext')}</a>`).join('')}</div></section>
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'indicadores', corpo, tema: TEMA[v] });
}

function pTrabalhe(v) {
  const corpo = `${topo({ versao: v, slug: 'trabalhe-conosco' })}
<main>${cabeca(v, 'Trabalhe conosco', 'Oportunidades de carreira. Junte-se à nossa empresa e venha desenvolver um trabalho sério conosco.', 'sede')}
  <section class="bloco duas"><div class="in">
    <div><span class="eyebrow">Carreira</span><h2>Uma equipe constantemente treinada</h2><p>${empresa.comercial[1]}</p>
      <ul class="lista-check"><li>${ico('check')}Vendas e representação</li><li>${ico('check')}Televendas</li><li>${ico('check')}Assistência técnica no campo</li><li>${ico('check')}Logística</li></ul></div>
    <div class="form-caixa"><h3>Envie seus dados</h3>${formContato('Trabalhe conosco')}</div>
  </div></section>
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'trabalhe-conosco', corpo, tema: TEMA[v] });
}

function pContato(v) {
  const corpo = `${topo({ versao: v, slug: 'contato' })}
<main>${cabeca(v, 'Contato', 'Fale com a Dispra Distribuidora.')}
  <section class="bloco duas contato"><div class="in">
    <div class="form-caixa"><h2>Envie sua mensagem</h2>${formContato()}</div>
    <aside class="contato-dados">
      <a href="tel:${site.gratisHref}">${ico('fone')}<span><small>Ligação gratuita</small><b>${site.gratis}</b></span></a>
      <a href="tel:${site.foneHref}">${ico('fone')}<span><small>Telefone</small><b>${site.fone}</b></span></a>
      <a href="mailto:${site.email}">${ico('email')}<span><small>E-mail</small><b>${site.email}</b></span></a>
      <a href="${site.mapaLink}" target="_blank" rel="noopener">${ico('pin')}<span><small>Endereço</small><b>${site.endereco}</b>${site.cidade} · ${site.cep}</span></a>
      <div class="mapa"><iframe title="Mapa da Dispra em Joaçaba" src="${site.mapa}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
    </aside>
  </div></section>
</main>
${rodape({ versao: v })}`;
  return documento({ versao: v, slug: 'contato', corpo, tema: TEMA[v] });
}

export function gerarVersao(v) {
  return {
    index: home(v),
    empresa: pEmpresa(v),
    nutricao: pNutricao(v),
    promocoes: pPromocoes(v),
    atendimento: pAtendimento(v),
    'dispra-no-campo': pCampo(v),
    produtos: pProdutos(v),
    artigos: pArtigos(v),
    ['artigos/' + artigo.slug]: pArtigo(v),
    indicadores: pIndicadores(v),
    'trabalhe-conosco': pTrabalhe(v),
    contato: pContato(v),
  };
}
