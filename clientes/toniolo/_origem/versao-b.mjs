// Versão B, "Engenharia": mais clara e técnica, com os títulos em Poppins (a fonte do logo "GRUPO TONIOLO").
// Abertura dividida com mosaico de fotos reais das obras, números em linha, clientes em faixa rolante,
// soluções em lista numerada com foto e páginas de solução com menu lateral e etapas em linha do tempo.
import { site, solucoes, numeros, historia, missao, visao, valores, clientes, departamentos, blog, menu, paginas, ui, tr } from './conteudo.mjs';
import { documento, link, img, logo, seta, icTel, icMail, icWa, icCheck, icDoc, icUser, icLinkedin, icSelo, icTrofeu, icPatente, icGlobo, icSol, redes, idiomas, waLink, slugs, esc } from './comum.mjs';

const V = 'b';
const n2 = i => String(i + 1).padStart(2, '0');

export function versaoB(l) {
  const t = x => tr(x, l);
  const L = s => link(V, l, s);
  const desde = { pt: 'Desde 1980 · Colombo/PR', en: 'Since 1980 · Colombo, Brazil', es: 'Desde 1980 · Colombo, Brasil' }[l];
  // Última palavra do título da abertura em amarelo ("soluções").
  const heroTitulo = () => { const p = t(ui.heroTitulo).split(' '); const u = p.pop(); return `${p.join(' ')} <em>${u}</em>`; };

  const header = slug => `<header class="topo">
  <div class="topo-barra"><div class="in barra-in">
    <span class="barra-desde">${t(ui.pioneira)}</span>
    <a href="tel:${site.telPrincipalHref}">${icTel}${site.telPrincipal}</a>
    <a href="mailto:${site.email}">${icMail}${site.email}</a>
    ${idiomas(V, l, slug)}
  </div></div>
  <div class="in topo-in">
    <a class="topo-marca" href="${L('index')}" aria-label="Grupo Toniolo, ${t(ui.inicio)}">${logo('escuro')}</a>
    <nav class="topo-nav" id="menu" aria-label="Menu">
      ${menu.filter(s => s !== 'transparencia').map(s => `<a href="${L(s)}"${slug.split('/')[0] === s ? ' aria-current="page"' : ''}>${t(paginas[s][0])}</a>`).join('\n      ')}
      <a href="${L('carreira')}"${slug === 'carreira' ? ' aria-current="page"' : ''}>${t(ui.formTrabalhe)}</a>
      <a href="${L('transparencia')}" class="nav-transp"${slug === 'transparencia' ? ' aria-current="page"' : ''}>${t(paginas.transparencia[0])}</a>
      <div class="nav-idioma">${idiomas(V, l, slug)}</div>
    </nav>
    <a class="btn btn-amarelo topo-cta" href="${site.catalogo}" target="_blank" rel="noopener">${icDoc}${t(ui.catalogo)}</a>
    <button class="topo-menu" type="button" aria-expanded="false" aria-controls="menu" data-menu><span></span>${t(ui.menu)}</button>
  </div>
</header>`;

  const footer = slug => `<footer class="rodape">
  <div class="in rodape-topo">
    <div><h2>${t(ui.orcamentoTitulo)}</h2><p>${t(ui.orcamentoTexto)}</p></div>
    <div class="rodape-acoes"><a class="btn btn-amarelo" href="tel:${site.telPrincipalHref}">${icTel}${site.telPrincipal}</a><a class="btn btn-contorno" href="${waLink(l)}" target="_blank" rel="noopener">${icWa}${t(ui.whatsapp)}</a></div>
  </div>
  <div class="in rodape-in">
    <div class="rodape-marca">${logo('claro')}<p>${t(ui.sede)}, ${site.fundacao}.</p>${redes()}</div>
    <nav aria-label="${t(ui.links)}"><h4>${t(ui.links)}</h4>${['index', 'quem-somos', 'blog', 'transparencia', 'contato', 'carreira'].map(s => `<a href="${L(s)}">${s === 'carreira' ? t(ui.formTrabalhe) : t(paginas[s][0])}</a>`).join('')}</nav>
    <nav class="rodape-sol" aria-label="${t(ui.solucoes)}"><h4>${t(ui.solucoes)}</h4>${solucoes.map(s => `<a href="${L('solucoes/' + s.id)}">${t(s.nome)}</a>`).join('')}</nav>
    <div class="rodape-contato"><h4>${t(ui.contato)}</h4><a href="mailto:${site.email}">${site.email}</a><a href="mailto:comercial@grupotoniolo.com">comercial@grupotoniolo.com</a>${idiomas(V, l, slug)}</div>
  </div>
  <div class="in rodape-base"><span>© 2026 Grupo Toniolo. ${t(ui.direitos)}</span><a href="/">${t(ui.verVersoes)}</a></div>
</footer>`;

  const trilha = itens => `<nav class="trilha" aria-label="${t(ui.voceEsta)}"><a href="${L('index')}">${t(ui.inicio)}</a>${itens.map(([h, n]) => h ? `<a href="${L(h)}">${n}</a>` : `<span>${n}</span>`).join('')}</nav>`;
  const cabeca = (titulo, lead, itens, foto) => `<section class="cabeca"><div class="in cabeca-in">
    <div class="cabeca-txt">${trilha(itens)}<h1>${titulo}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div>
    <div class="cabeca-foto">${img(foto, '', 'loading="eager"')}</div>
  </div></section>`;

  const video = () => `<a class="video" href="https://www.youtube.com/watch?v=${site.video}" data-video="${site.video}" aria-label="${t(ui.assistirVideo)}">${img('video-quadro', t(ui.assistirVideo))}<span class="video-rot">${t(ui.assistirVideo)}</span></a>`;

  const numerosLinha = () => `<section class="numeros" aria-label="${t(ui.emNumeros)}"><div class="in numeros-in">${numeros.map(([n, d]) => `<div><b>${n}</b><span>${t(d)}</span></div>`).join('')}</div></section>`;

  const faixaLogos = () => {
    const meio = Math.ceil(clientes.length / 2);
    const fila = (lista, rev) => `<div class="faixa${rev ? ' rev' : ''}"><ul>${[...lista, ...lista].map(([f, n], i) => `<li${i >= lista.length ? ' aria-hidden="true"' : ''}><img src="/assets/clientes/${f}.png" alt="${i >= lista.length ? '' : esc(n)}" width="188" height="96" loading="lazy"></li>`).join('')}</ul></div>`;
    return `${fila(clientes.slice(0, meio))}${fila(clientes.slice(meio), true)}`;
  };

  const listaSol = () => `<ol class="lista-sol">${solucoes.map((s, i) => `<li><a href="${L('solucoes/' + s.id)}">
    <span class="ls-n">${n2(i)}</span><span class="ls-foto">${img(s.foto, '')}</span>
    <span class="ls-txt"><b>${t(s.nome)}</b><span>${t(s.resumo)}</span></span><span class="ls-ir">${seta}</span>
  </a></li>`).join('')}</ol>`;

  const deps = () => `<div class="deps">${departamentos.map(([n, tels, mail]) => `<div class="dep"><h3>${t(n)}</h3><div>${tels.map(x => `<a href="tel:+55${x.replace(/\D/g, '')}">${x}</a>`).join('')}<a href="mailto:${mail}">${mail}</a></div></div>`).join('')}</div>`;

  const form = () => `<form class="form" action="mailto:${site.email}" method="post" enctype="text/plain">
    <h3>${t(ui.enviePor)}</h3>
    <label><span>${t(ui.formNome)}</span><input name="nome" required autocomplete="name"></label>
    <label><span>${t(ui.formEmpresa)}</span><input name="empresa" autocomplete="organization"></label>
    <label><span>${t(ui.formEmail)}</span><input type="email" name="email" required autocomplete="email"></label>
    <label><span>${t(ui.formTel)}</span><input type="tel" name="telefone" autocomplete="tel"></label>
    <label class="cheio"><span>${t(ui.formAssunto)}</span><select name="assunto"><option>${t(ui.formOrcamento)}</option><option>${t(ui.formTrabalhe)}</option><option>${t(ui.formOutro)}</option></select></label>
    <label class="cheio"><span>${t(ui.formMsg)}</span><textarea name="mensagem" rows="4"></textarea></label>
    <button class="btn btn-escuro cheio" type="submit">${t(ui.formEnviar)} ${seta}</button>
  </form>`;

  const selos = () => `<ul class="selos">
    <li>${icSelo}<div><b>${t(ui.iso)}</b><span>${t(ui.isoTexto)}</span></div></li>
    <li>${icPatente}<div><b>${t(ui.patente)}</b><span>${t(ui.patenteTexto)}</span></div></li>
    <li>${icTrofeu}<div><b>${t(ui.premio)}</b><span>${t(ui.premioTexto)}</span></div></li>
  </ul>`;

  const pag = {};

  pag.index = () => `${header('index')}
<main>
<section class="abertura"><div class="abertura-in">
  <div class="abertura-txt">
    <span class="rotulo">${desde}</span>
    <h1>${heroTitulo()}</h1>
    <p>${t(ui.heroSub)}</p>
    <div class="abertura-acoes"><a class="btn btn-amarelo" href="${L('solucoes')}">${t(ui.verSolucoes)} ${seta}</a><a class="btn btn-contorno" href="${L('contato')}">${t(ui.falarComercial)}</a></div>
  </div>
  <div class="mosaico">
    <figure class="m1">${img('sol-precisao', t(solucoes[4].nome), 'loading="eager" fetchpriority="high"')}<figcaption>${t(solucoes[4].nome)}</figcaption></figure>
    <figure class="m2">${img('sol-manejo', t(solucoes[0].nome), 'loading="eager"')}<figcaption>${t(solucoes[0].nome)}</figcaption></figure>
    <figure class="m3">${img('sol-remocao', t(solucoes[8].nome), 'loading="eager"')}<figcaption>${t(solucoes[8].nome)}</figcaption></figure>
    <span class="m-bloco" aria-hidden="true"></span>
  </div>
</div></section>
${numerosLinha()}
<section class="sobre"><div class="in sobre-in">
  ${video()}
  <div class="sobre-txt">
    <span class="rotulo">${t(ui.quemSomos)}</span>
    <h2>${t(ui.oGrupo)}</h2>
    ${historia.slice(0, 2).map(p => `<p>${t(p)}</p>`).join('')}
    ${selos()}
    <a class="link-seta" href="${L('quem-somos')}">${t(ui.saibaMais)} ${seta}</a>
  </div>
</div></section>
<section class="clientes"><div class="in cab-secao"><span class="rotulo">${t(ui.clientes)}</span><h2>${t(ui.clientesSub)}</h2></div>${faixaLogos()}</section>
<section class="solucoes" id="solucoes"><div class="in sol-in">
  <div class="sol-cab"><span class="rotulo">${t(ui.solucoes)}</span><h2>${t(ui.solucoesSub)}</h2><a class="btn btn-amarelo" href="${L('solucoes')}">${t(ui.todas)} ${seta}</a></div>
  ${listaSol()}
</div></section>
<section class="carreira"><div class="in carreira-in">
  <div class="carreira-bloco"><span class="rotulo">${t(ui.carreira)}</span><h2>${t(ui.junteSe)}</h2><p>${t(ui.carreiraTexto)}</p></div>
  <div class="carreira-links">
    <a href="${site.linkedin}" target="_blank" rel="noopener">${icLinkedin}<b>${t(ui.vagasLinkedin)}</b>${seta}</a>
    <a href="${site.curriculo}" target="_blank" rel="noopener">${icDoc}<b>${t(ui.cadastreCurriculo)}</b>${seta}</a>
    <a href="${site.manual}" target="_blank" rel="noopener">${icSelo}<b>${t(ui.manual)}</b>${seta}</a>
  </div>
</div></section>
<section class="contato"><div class="in contato-in">
  <div class="contato-txt"><span class="rotulo">${t(ui.contato)}</span><h2>${t(ui.contatoSub)}</h2>${deps()}</div>
  ${form()}
</div></section>
</main>
${footer('index')}`;

  pag['quem-somos'] = () => `${header('quem-somos')}
<main>
${cabeca(t(ui.oGrupo), t(ui.pioneira) + '.', [[null, t(ui.quemSomos)]], 'sol-macrofitas')}
<section class="sobre"><div class="in sobre-in">
  ${video()}
  <div class="sobre-txt">${historia.map(p => `<p>${t(p)}</p>`).join('')}</div>
</div></section>
${numerosLinha()}
<section class="mvv"><div class="in">
  <div class="mvv-grade">
    <div class="mvv-item"><span class="mvv-ic">${icGlobo}</span><h2>${t(ui.missao)}</h2><p>${t(missao)}</p></div>
    <div class="mvv-item"><span class="mvv-ic">${icSol[4]}</span><h2>${t(ui.visao)}</h2><p>${t(visao)}</p></div>
  </div>
  <h2 class="mvv-tit">${t(ui.valores)}</h2>
  <ol class="valores">${valores.map((x, i) => `<li><span>${n2(i)}</span>${t(x)}</li>`).join('')}</ol>
</div></section>
<section class="premio"><div class="in premio-in">
  <figure>${img('premio-anglo', t(ui.premioTexto))}</figure>
  <div><span class="rotulo">${t(ui.premio)}</span><h2>${t(ui.premioTexto)}</h2>${selos()}</div>
</div></section>
<section class="atuacao"><div class="in atuacao-in">
  <div class="atuacao-mapa">${img('mapa', t(ui.atuacao))}</div>
  <div><span class="rotulo">${t(ui.atuacao)}</span><h2>${t(ui.atuacaoTexto)}</h2><a class="btn btn-escuro" href="${L('solucoes')}">${t(ui.verSolucoes)} ${seta}</a></div>
</div></section>
<section class="clientes"><div class="in cab-secao"><span class="rotulo">${t(ui.clientes)}</span><h2>${t(ui.clientesSub)}</h2></div>${faixaLogos()}</section>
</main>
${footer('quem-somos')}`;

  pag.solucoes = () => `${header('solucoes')}
<main>
${cabeca(t(ui.solucoes), t(ui.solucoesSub), [[null, t(ui.solucoes)]], 'sol-succao')}
<section class="mosaico-sol"><div class="in"><div class="tiles">${solucoes.map((s, i) => `<a class="tile tile-${i + 1}" href="${L('solucoes/' + s.id)}">
  ${img(s.foto, t(s.nome))}<span class="tile-n">${n2(i)}</span>
  <span class="tile-txt">${icSol[i]}<b>${t(s.nome)}</b><span>${t(s.resumo)}</span></span>
</a>`).join('')}</div></div></section>
</main>
${footer('solucoes')}`;

  const paginaSolucao = (s, i) => `${header('solucoes/' + s.id)}
<main>
${cabeca(t(s.nome), t(s.resumo), [['solucoes', t(ui.solucoes)], [null, t(s.nome)]], s.foto)}
<section class="sol-pag"><div class="in sol-pag-in">
  <aside class="lado"><span class="rotulo">${t(ui.solucoes)}</span><nav>${solucoes.map((o, k) => `<a href="${L('solucoes/' + o.id)}"${o.id === s.id ? ' aria-current="page"' : ''}><span>${n2(k)}</span>${t(o.nome)}</a>`).join('')}</nav>
    <div class="lado-cta"><b>${t(ui.orcamentoTitulo)}</b><a class="btn btn-amarelo" href="${waLink(l)}" target="_blank" rel="noopener">${icWa}${t(ui.whatsapp)}</a><a href="tel:${site.telPrincipalHref}">${site.telPrincipal}</a></div>
  </aside>
  <div class="sol-corpo">
    <div class="sol-texto">${s.texto.map((p, k) => k === 0 ? `<p class="destaque">${t(p)}</p>` : `<p>${t(p)}</p>`).join('')}</div>
    ${s.etapas ? `<h2>${t(ui.etapas)}</h2><ol class="linha-tempo">${s.etapas.map((e, k) => `<li><span>${n2(k)}</span><p>${t(e)}</p></li>`).join('')}</ol>`
      : `<h2>${t(s.ganhosTitulo || ui.ganhos)}</h2><ul class="ganhos">${s.ganhos.map(g => `<li>${icCheck}<span>${t(g)}</span></li>`).join('')}</ul>`}
    <figure class="sol-foto">${img(s.foto2, t(s.nome))}</figure>
  </div>
</div></section>
</main>
${footer('solucoes/' + s.id)}`;
  solucoes.forEach((s, i) => { pag['solucoes/' + s.id] = () => paginaSolucao(s, i); });

  pag.carreira = () => `${header('carreira')}
<main>
${cabeca(t(ui.formTrabalhe), t(ui.carreiraTexto), [[null, t(ui.formTrabalhe)]], 'sol-sabre')}
<section class="carreira"><div class="in carreira-in">
  <div class="carreira-bloco"><span class="rotulo">${t(ui.carreira)}</span><h2>${t(ui.junteSe)}</h2><p>${t(historia[0])}</p></div>
  <div class="carreira-links">
    <a href="${site.linkedin}" target="_blank" rel="noopener">${icLinkedin}<b>${t(ui.vagasLinkedin)}</b>${seta}</a>
    <a href="${site.curriculo}" target="_blank" rel="noopener">${icDoc}<b>${t(ui.cadastreCurriculo)}</b>${seta}</a>
    <a href="${site.manual}" target="_blank" rel="noopener">${icSelo}<b>${t(ui.manual)}</b>${seta}</a>
    <a href="mailto:rh@grupotoniolo.com">${icMail}<b>rh@grupotoniolo.com</b>${seta}</a>
  </div>
</div></section>
<section class="mvv"><div class="in"><h2 class="mvv-tit">${t(ui.valores)}</h2><ol class="valores">${valores.map((x, i) => `<li><span>${n2(i)}</span>${t(x)}</li>`).join('')}</ol></div></section>
</main>
${footer('carreira')}`;

  pag.blog = () => `${header('blog')}
<main>
${cabeca('Blog', t(ui.blogSub), [[null, 'Blog']], 'desassoreamento')}
<section class="blog"><div class="in"><ol class="posts">${blog.map(([slug, foto, data, tit]) => `<li><a href="https://grupotoniolo.com/${slug}/" target="_blank" rel="noopener">
  <span class="post-img">${img(foto, t(tit))}</span><span class="post-txt"><time>${data}</time><b>${t(tit)}</b></span><span class="post-ir">${t(ui.lerArtigo)} ${seta}</span>
</a></li>`).join('')}</ol>
<p class="blog-todos"><a class="btn btn-escuro" href="https://grupotoniolo.com/blog/" target="_blank" rel="noopener">${t(ui.blogTodos)} ${seta}</a></p></div></section>
</main>
${footer('blog')}`;

  pag.transparencia = () => `${header('transparencia')}
<main>
${cabeca(t(ui.transpTitulo), t(ui.transpTexto[0]), [[null, t(paginas.transparencia[0])]], 'sol-estabilidade')}
<section class="transp"><div class="in transp-in">
  <p>${t(ui.transpTexto[1])}</p>
  <div class="docs">
    <a href="https://grupotoniolo.com/relatorio-de-transparencia-salarial/" target="_blank" rel="noopener">${icDoc}<b>${t(ui.relatorio)}</b><span>${t(ui.abrirDocumento)} ${seta}</span></a>
    <a href="https://grupotoniolo.com/compromisso-com-a-igualdade-salarial-e-com-a-valorizacao-das-pessoas/" target="_blank" rel="noopener">${icUser}<b>${t(ui.compromisso)}</b><span>${t(ui.abrirDocumento)} ${seta}</span></a>
  </div>
</div></section>
</main>
${footer('transparencia')}`;

  pag.contato = () => `${header('contato')}
<main>
${cabeca(t(ui.contato), t(ui.contatoSub), [[null, t(ui.contato)]], 'sol-desaguamento')}
<section class="contato"><div class="in contato-in">
  <div class="contato-txt"><span class="rotulo">${t(ui.departamentos)}</span><h2>${t(ui.sede)}</h2>${deps()}<div class="contato-redes">${redes()}</div></div>
  ${form()}
</div></section>
<section class="atuacao"><div class="in atuacao-in">
  <div class="atuacao-mapa">${img('mapa', t(ui.atuacao))}</div>
  <div><span class="rotulo">${t(ui.atuacao)}</span><h2>${t(ui.atuacaoTexto)}</h2></div>
</div></section>
</main>
${footer('contato')}`;

  const out = {};
  for (const s of slugs) out[s] = documento({ v: V, l, slug: s, corpo: pag[s](), tema: '#eac107' });
  return out;
}
