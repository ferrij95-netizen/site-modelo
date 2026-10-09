// Versão A, "Campo": fiel ao site atual. Grafite e amarelo da marca, títulos em Barlow (a fonte do site atual),
// abertura em tela cheia com o título amarelo em caixa alta, Quem somos em fundo areia com os blocos amarelos,
// soluções em cartões com foto e páginas de solução com foto à esquerda e painel escuro à direita, como hoje.
import { site, solucoes, numeros, historia, missao, visao, valores, clientes, departamentos, blog, menu, paginas, ui, tr } from './conteudo.mjs';
import { documento, link, img, logo, seta, mais, icTel, icMail, icMapa, icWa, icPlay, icCheck, icDoc, icUser, icLinkedin, icSelo, icTrofeu, icPatente, icGlobo, icSol, redes, idiomas, waLink, slugs, esc } from './comum.mjs';

const V = 'a';
const n2 = i => String(i + 1).padStart(2, '0');

export function versaoA(l) {
  const t = x => tr(x, l);
  const L = s => link(V, l, s);

  const header = slug => `<header class="topo">
  <div class="topo-barra"><div class="in barra-in">
    <a href="tel:${site.telPrincipalHref}">${icTel}${site.telPrincipal}</a>
    <a href="mailto:${site.email}">${icMail}${site.email}</a>
    ${redes()}
    ${idiomas(V, l, slug)}
  </div></div>
  <div class="in topo-in">
    <a class="topo-marca" href="${L('index')}" aria-label="Grupo Toniolo, ${t(ui.inicio)}">${logo('claro')}</a>
    <nav class="topo-nav" id="menu" aria-label="Menu">
      ${menu.map(s => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${t(paginas[s][0])}</a>`).join('\n      ')}
      <a href="${L('carreira')}"${slug === 'carreira' ? ' aria-current="page"' : ''}>${t(ui.formTrabalhe)}</a>
      <a class="nav-catalogo" href="${site.catalogo}" target="_blank" rel="noopener">${t(ui.catalogo)}</a>
      <div class="nav-idioma">${idiomas(V, l, slug)}</div>
    </nav>
    <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>${t(ui.menu)}</button>
  </div>
</header>`;

  const footer = slug => `<footer class="rodape">
  <div class="in rodape-in">
    <div class="rodape-marca">${logo('claro')}<p>${t(ui.pioneira)}. ${t(ui.sede)}, ${site.fundacao}.</p>${redes()}</div>
    <nav aria-label="${t(ui.links)}"><h4>${t(ui.links)}</h4>${['index', 'quem-somos', 'blog', 'transparencia', 'contato', 'carreira'].map(s => `<a href="${L(s)}">${s === 'carreira' ? t(ui.formTrabalhe) : t(paginas[s][0])}</a>`).join('')}</nav>
    <nav aria-label="${t(ui.solucoes)}"><h4>${t(ui.solucoes)}</h4>${solucoes.map(s => `<a href="${L('solucoes/' + s.id)}">${t(s.nome)}</a>`).join('')}</nav>
    <div class="rodape-contato"><h4>${t(ui.contato)}</h4><a href="tel:${site.telPrincipalHref}">${icTel}${site.telPrincipal}</a><a href="mailto:${site.email}">${icMail}${site.email}</a>${idiomas(V, l, slug)}</div>
  </div>
  <div class="in rodape-base"><span>© 2026 Grupo Toniolo. ${t(ui.direitos)}</span><a href="/">${t(ui.verVersoes)}</a></div>
</footer>`;

  const trilha = itens => `<nav class="trilha" aria-label="${t(ui.voceEsta)}"><a href="${L('index')}">${t(ui.inicio)}</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
  const cabeca = (titulo, lead, itens, foto) => `<section class="cabeca"><div class="cabeca-fundo">${img(foto, '', 'loading="eager"')}</div><div class="in cabeca-in">
    ${trilha(itens)}<h1>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}
  </div></section>`;

  const cta = () => `<section class="cta"><div class="in cta-in">
    <div><h2>${t(ui.orcamentoTitulo)}</h2><p>${t(ui.orcamentoTexto)}</p></div>
    <div class="cta-acoes"><a class="btn btn-escuro" href="tel:${site.telPrincipalHref}">${icTel}${site.telPrincipal}</a><a class="btn btn-contorno-escuro" href="${waLink(l)}" target="_blank" rel="noopener">${icWa}${t(ui.whatsapp)}</a></div>
  </div></section>`;

  const video = () => `<a class="video" href="https://www.youtube.com/watch?v=${site.video}" data-video="${site.video}" aria-label="${t(ui.assistirVideo)}">
    <span class="video-bloco b1" aria-hidden="true"></span><span class="video-bloco b2" aria-hidden="true"></span><span class="video-sombra" aria-hidden="true"></span>
    ${img('video-quadro', t(ui.assistirVideo))}
  </a>`;

  const cartoes = () => `<div class="cartoes">${solucoes.map((s, i) => `<a class="cartao" href="${L('solucoes/' + s.id)}">
    <div class="cartao-img">${img(s.foto, t(s.nome))}</div>
    <div class="cartao-txt"><span class="cartao-n">${n2(i)}</span><h3>${t(s.nome)}</h3><p>${t(s.resumo)}</p><span class="cartao-ir">${t(ui.plus)} ${mais}</span></div>
  </a>`).join('')}</div>`;

  const logos = () => `<ul class="logos">${clientes.map(([f, n]) => `<li><img src="/assets/clientes/${f}.png" alt="${esc(n)}" width="188" height="96" loading="lazy"></li>`).join('')}</ul>`;

  const faixaNumeros = () => `<section class="numeros" aria-label="${t(ui.emNumeros)}"><div class="in numeros-in">${numeros.map(([n, d]) => `<div><b>${n}</b><span>${t(d)}</span></div>`).join('')}</div></section>`;

  const deps = () => `<div class="deps">${departamentos.map(([n, tels, mail]) => `<div class="dep"><h3>${t(n)}</h3>${tels.map(x => `<a href="tel:+55${x.replace(/\D/g, '')}">${icTel}${x}</a>`).join('')}<a href="mailto:${mail}">${icMail}${mail}</a></div>`).join('')}</div>`;

  const form = () => `<form class="form" action="mailto:${site.email}" method="post" enctype="text/plain">
    <h3>${t(ui.enviePor)}</h3>
    <label><span>${t(ui.formNome)}</span><input name="nome" required autocomplete="name"></label>
    <label><span>${t(ui.formEmpresa)}</span><input name="empresa" autocomplete="organization"></label>
    <label><span>${t(ui.formEmail)}</span><input type="email" name="email" required autocomplete="email"></label>
    <label><span>${t(ui.formTel)}</span><input type="tel" name="telefone" autocomplete="tel"></label>
    <label class="cheio"><span>${t(ui.formAssunto)}</span><select name="assunto"><option>${t(ui.formOrcamento)}</option><option>${t(ui.formTrabalhe)}</option><option>${t(ui.formOutro)}</option></select></label>
    <label class="cheio"><span>${t(ui.formMsg)}</span><textarea name="mensagem" rows="4"></textarea></label>
    <button class="btn btn-amarelo cheio" type="submit">${t(ui.formEnviar)} ${seta}</button>
  </form>`;

  const pag = {};

  pag.index = () => `${header('index')}
<main>
<section class="abertura">
  <div class="abertura-fundo">${img('abertura', '', 'loading="eager" fetchpriority="high"')}</div>
  <div class="in abertura-in">
    <h1>${t(ui.heroTitulo)}</h1>
    <p>${t(ui.heroSub)}</p>
    <div class="abertura-acoes"><a class="btn btn-contorno" href="${L('solucoes')}">${t(ui.saibaMais)}</a><a class="btn btn-amarelo" href="${L('contato')}">${t(ui.falarComercial)} ${seta}</a></div>
  </div>
</section>
${faixaNumeros()}
<section class="sobre"><div class="in sobre-in">
  <div class="sobre-txt">
    <span class="eyebrow-cinza">${t(ui.quemSomos)}</span>
    <h2 class="titulo-escada"><span>${l === 'pt' ? 'O Grupo' : l === 'es' ? 'El Grupo' : 'Grupo'}</span><span>Toniolo</span></h2>
    ${historia.slice(0, 2).map(p => `<p>${t(p)}</p>`).join('')}
    <a class="btn btn-escuro" href="${L('quem-somos')}">${t(ui.saibaMais)} ${seta}</a>
  </div>
  ${video()}
</div></section>
<section class="clientes"><div class="in">
  <div class="cab-secao"><h2>${t(ui.clientes)}</h2><p>${t(ui.clientesSub)}</p></div>
  ${logos()}
</div></section>
<section class="solucoes" id="solucoes"><div class="in">
  <div class="cab-secao claro"><h2>${t(ui.solucoes)}</h2><p>${t(ui.solucoesSub)}</p></div>
  ${cartoes()}
</div></section>
<section class="carreira"><div class="in carreira-in">
  <div class="carreira-txt"><h2>${t(ui.carreira)}</h2><p>${t(ui.carreiraTexto)}</p><a class="btn btn-escuro" href="${site.linkedin}" target="_blank" rel="noopener">${icLinkedin}${t(ui.vagasLinkedin)}</a></div>
  <div class="carreira-blocos">
    <a href="${L('carreira')}"><span>${icUser}</span><b>${t(ui.junteSe)}</b>${seta}</a>
    <a href="${site.curriculo}" target="_blank" rel="noopener"><span>${icDoc}</span><b>${t(ui.cadastreCurriculo)}</b>${seta}</a>
    <a href="${site.manual}" target="_blank" rel="noopener"><span>${icSelo}</span><b>${t(ui.manual)}</b>${seta}</a>
  </div>
</div></section>
<section class="contato-home"><div class="in contato-in">
  <div><div class="cab-secao"><h2>${t(ui.contato)}</h2><p>${t(ui.contatoSub)}</p></div>${deps()}</div>
  ${form()}
</div></section>
</main>
${footer('index')}`;

  pag['quem-somos'] = () => `${header('quem-somos')}
<main>
${cabeca(t(ui.oGrupo), t(ui.pioneira) + '.', [[null, t(ui.quemSomos)]], 'anfibia-reservatorio')}
<section class="sobre"><div class="in sobre-in">
  <div class="sobre-txt">
    <span class="eyebrow-cinza">${t(ui.quemSomos)}</span>
    <h2 class="titulo-escada"><span>${l === 'pt' ? 'O Grupo' : l === 'es' ? 'El Grupo' : 'Grupo'}</span><span>Toniolo</span></h2>
    ${historia.map(p => `<p>${t(p)}</p>`).join('')}
  </div>
  ${video()}
</div></section>
${faixaNumeros()}
<section class="mvv"><div class="in mvv-in">
  <div class="mvv-bloco"><span class="mvv-n">01</span><h2>${t(ui.missao)}</h2><p>${t(missao)}</p></div>
  <div class="mvv-bloco"><span class="mvv-n">02</span><h2>${t(ui.visao)}</h2><p>${t(visao)}</p></div>
  <div class="mvv-valores"><span class="mvv-n">03</span><h2>${t(ui.valores)}</h2><ul>${valores.map(x => `<li>${t(x)}</li>`).join('')}</ul></div>
</div></section>
<section class="selos"><div class="in selos-in">
  <div class="selo"><span>${icSelo}</span><h3>${t(ui.iso)}</h3><p>${t(ui.isoTexto)}</p></div>
  <div class="selo"><span>${icPatente}</span><h3>${t(ui.patente)}</h3><p>${t(ui.patenteTexto)}</p></div>
  <figure class="selo-premio">${img('premio-anglo', t(ui.premioTexto))}<figcaption><span>${icTrofeu}</span><div><h3>${t(ui.premio)}</h3><p>${t(ui.premioTexto)}</p></div></figcaption></figure>
</div></section>
<section class="atuacao"><div class="in atuacao-in">
  <div><h2>${t(ui.atuacao)}</h2><p>${t(ui.atuacaoTexto)}</p><a class="btn btn-amarelo" href="${L('solucoes')}">${t(ui.verSolucoes)} ${seta}</a></div>
  <div class="atuacao-mapa">${img('mapa', t(ui.atuacao))}</div>
</div></section>
<section class="clientes"><div class="in"><div class="cab-secao"><h2>${t(ui.clientes)}</h2><p>${t(ui.clientesSub)}</p></div>${logos()}</div></section>
${cta()}
</main>
${footer('quem-somos')}`;

  pag.solucoes = () => `${header('solucoes')}
<main>
${cabeca(t(ui.solucoes), t(ui.solucoesSub), [[null, t(ui.solucoes)]], 'lanca-longa')}
<section class="zigue"><div class="in">${solucoes.map((s, i) => `<article class="zz">
  <a class="zz-img" href="${L('solucoes/' + s.id)}" tabindex="-1">${img(s.foto, t(s.nome))}</a>
  <div class="zz-txt"><span class="zz-n">${n2(i)}</span>${icSol[i]}<h2><a href="${L('solucoes/' + s.id)}">${t(s.nome)}</a></h2><p>${t(s.texto[0])}</p><a class="link-seta" href="${L('solucoes/' + s.id)}">${t(ui.saibaMais)} ${seta}</a></div>
</article>`).join('')}</div></section>
${cta()}
</main>
${footer('solucoes')}`;

  const paginaSolucao = (s, i) => {
    const outras = solucoes.filter(o => o.id !== s.id);
    const lista = s.etapas ? `<section class="trilho-sec"><div class="in">
      <h2 class="titulo-faixa">${t(ui.etapas)}</h2>
      <ol class="trilho" style="--n:${s.etapas.length}">${s.etapas.map((e, k) => `<li><span class="trilho-n">${n2(k)}</span><p>${t(e)}</p></li>`).join('')}</ol>
    </div></section>` : `<section class="ganhos-sec"><div class="in">
      <h2 class="titulo-faixa">${t(s.ganhosTitulo || ui.ganhos)}</h2>
      <ul class="ganhos">${s.ganhos.map(g => `<li>${icCheck}<span>${t(g)}</span></li>`).join('')}</ul>
    </div></section>`;
    return `${header('solucoes/' + s.id)}
<main>
<section class="sol-faixa"><div class="in">${trilha([['solucoes', t(ui.solucoes)], [null, t(s.nome)]])}<p class="sol-rotulo">${t(ui.solucoes)} | ${t(s.nome)}</p></div></section>
<section class="sol"><div class="sol-foto">${img(s.foto, t(s.nome), 'loading="eager"')}</div>
  <div class="sol-painel"><div class="sol-painel-in">
    <span class="sol-ic">${icSol[i]}</span>
    <h1>${t(s.nome)}</h1>
    ${s.texto.map(p => `<p>${t(p)}</p>`).join('')}
    <div class="sol-acoes"><a class="btn btn-amarelo" href="${L('contato')}">${t(ui.falarComercial)} ${seta}</a><a class="btn btn-contorno" href="${waLink(l)}" target="_blank" rel="noopener">${icWa}${t(ui.whatsapp)}</a></div>
  </div></div>
</section>
${lista}
<section class="outras"><div class="in">
  <div class="cab-secao"><h2>${t(ui.outrasSolucoes)}</h2></div>
  <div class="outras-lista">${outras.map(o => `<a href="${L('solucoes/' + o.id)}">${img(o.foto, '')}<span>${t(o.nome)}</span>${seta}</a>`).join('')}</div>
</div></section>
${cta()}
</main>
${footer('solucoes/' + s.id)}`;
  };
  solucoes.forEach((s, i) => { pag['solucoes/' + s.id] = () => paginaSolucao(s, i); });

  pag.carreira = () => `${header('carreira')}
<main>
${cabeca(t(ui.formTrabalhe), t(ui.carreiraTexto), [[null, t(ui.formTrabalhe)]], 'sabre')}
<section class="carreira carreira-pag"><div class="in carreira-in">
  <div class="carreira-txt"><h2>${t(ui.junteSe)}</h2><p>${t(historia[0])}</p><a class="btn btn-escuro" href="${site.linkedin}" target="_blank" rel="noopener">${icLinkedin}${t(ui.vagasLinkedin)}</a></div>
  <div class="carreira-blocos">
    <a href="${site.curriculo}" target="_blank" rel="noopener"><span>${icDoc}</span><b>${t(ui.cadastreCurriculo)}</b>${seta}</a>
    <a href="${site.manual}" target="_blank" rel="noopener"><span>${icSelo}</span><b>${t(ui.manual)}</b>${seta}</a>
    <a href="mailto:rh@grupotoniolo.com"><span>${icMail}</span><b>rh@grupotoniolo.com</b>${seta}</a>
  </div>
</div></section>
<section class="valores-faixa"><div class="in"><h2 class="titulo-faixa claro">${t(ui.valores)}</h2><ul>${valores.map(x => `<li>${t(x)}</li>`).join('')}</ul></div></section>
</main>
${footer('carreira')}`;

  pag.blog = () => `${header('blog')}
<main>
${cabeca(t(paginas.blog[0]), t(ui.blogSub), [[null, 'Blog']], 'desassoreamento')}
<section class="blog"><div class="in"><div class="blog-grade">${blog.map(([slug, foto, data, tit], i) => `<a class="post${i === 0 ? ' post-dest' : ''}" href="https://grupotoniolo.com/${slug}/" target="_blank" rel="noopener">
  <div class="post-img">${img(foto, t(tit))}</div><div class="post-txt"><time>${data}</time><h2>${t(tit)}</h2><span class="link-seta">${t(ui.lerArtigo)} ${seta}</span></div>
</a>`).join('')}</div>
<p class="blog-todos"><a class="btn btn-escuro" href="https://grupotoniolo.com/blog/" target="_blank" rel="noopener">${t(ui.blogTodos)} ${seta}</a></p></div></section>
</main>
${footer('blog')}`;

  pag.transparencia = () => `${header('transparencia')}
<main>
${cabeca(t(ui.transpTitulo), '', [[null, t(paginas.transparencia[0])]], 'descaracterizacao')}
<section class="transp"><div class="in transp-in">
  <div>${ui.transpTexto.map(p => `<p>${t(p)}</p>`).join('')}</div>
  <div class="docs">
    <a href="https://grupotoniolo.com/relatorio-de-transparencia-salarial/" target="_blank" rel="noopener"><span>${icDoc}</span><b>${t(ui.relatorio)}</b><small>${t(ui.abrirDocumento)}</small>${seta}</a>
    <a href="https://grupotoniolo.com/compromisso-com-a-igualdade-salarial-e-com-a-valorizacao-das-pessoas/" target="_blank" rel="noopener"><span>${icUser}</span><b>${t(ui.compromisso)}</b><small>${t(ui.abrirDocumento)}</small>${seta}</a>
  </div>
</div></section>
</main>
${footer('transparencia')}`;

  pag.contato = () => `${header('contato')}
<main>
${cabeca(t(ui.contato), t(ui.contatoSub), [[null, t(ui.contato)]], 'dragagem')}
<section class="contato-home"><div class="in contato-in">
  <div><h2 class="titulo-faixa">${t(ui.departamentos)}</h2>${deps()}
    <div class="contato-wa"><a class="btn btn-escuro" href="${waLink(l)}" target="_blank" rel="noopener">${icWa}${t(ui.whatsapp)} ${site.telPrincipal}</a>${redes()}</div></div>
  ${form()}
</div></section>
<section class="atuacao"><div class="in atuacao-in">
  <div><h2>${t(ui.sede)}</h2><p>${t(ui.atuacaoTexto)}</p></div>
  <div class="atuacao-mapa">${img('mapa', t(ui.atuacao))}</div>
</div></section>
</main>
${footer('contato')}`;

  const out = {};
  for (const s of slugs) out[s] = documento({ v: V, l, slug: s, corpo: pag[s](), tema: '#141414' });
  return out;
}
