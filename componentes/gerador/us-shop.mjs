// Gerador de sites em inglês (EUA) para oficinas de usinagem / ferramentarias.
// Cada cliente tem clientes/<c>/_origem/conteudo.mjs (export default C) e chama gerarUS(C, dirCliente).
// Duas versões: A "Shop Floor" (foto grande, faixa da marca, lista numerada com fotos) e B "Spec Sheet" (técnica, clara, tabelas e etapas).
// O visual muda por cliente via C.tema (cores, fonte do título, raio, peso de cor) e C.opcoes.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from './kit.mjs';

const tel = t => `tel:+1${String(t).replace(/\D/g, '')}`;
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const para = a => (a || []).map(p => `<p>${p}</p>`).join('');
const seta = ic('seta');

export function gerarUS(C, dir) {
  const pub = path.join(dir, 'public');
  fs.mkdirSync(path.join(pub, 'assets'), { recursive: true });
  const T = { fundo: '#ffffff', claro: '#f3f4f5', tinta: '#16191d', suave: '#5b6168', raio: '4px', ...C.tema };
  const E = { ...C, url: `https://${C.slug}.overtus.com.br/` };
  const nav = [
    { slug: 'index', nome: 'Home' },
    { slug: 'capabilities', nome: 'Capabilities' },
    C.industrias?.length && { slug: 'industries', nome: 'Industries' },
    C.equipamentos?.length && { slug: 'equipment', nome: 'Equipment' },
    C.qualidade && { slug: 'quality', nome: 'Quality' },
    C.galeria?.length && { slug: 'gallery', nome: 'Gallery' },
    { slug: 'about', nome: 'About' },
    { slug: 'contact', nome: 'Contact' },
  ].filter(Boolean);
  const FONTES = `https://fonts.googleapis.com/css2?family=${T.fonteTituloUrl}&family=Inter:wght@400;500;600;700${T.mono ? '&family=JetBrains+Mono:wght@500' : ''}&display=swap`;
  const head = (v, slug, titulo, desc) => cabeca({ E: { nome: C.nome, url: E.url }, v, slug, titulo: slug === 'index' ? `${C.nome} | ${titulo}` : `${titulo} | ${C.nome}`, descricao: desc, fontes: FONTES, css: ['base.css', `${v}.css`], cor: T.cor, lang: 'en' });
  const endereco = `${C.rua}, ${C.cidade}, ${C.estado} ${C.cep}`;
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.nome + ', ' + endereco)}`;
  const mapaEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(C.nome + ', ' + endereco)}&output=embed`;
  const quote = v => link(v, 'contact') + '#quote';
  const logo = (cls = 'logo') => C.logo ? `<img class="${cls}" src="/assets/${C.logo.arq}" alt="${esc(C.nome)}" width="${C.logo.w}" height="${C.logo.h}">` : `<span class="${cls} logo-txt">${esc(C.nome)}</span>`;
  const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Open menu">${ic('menu')}</button>`;
  const menu = (v, ativo) => nav.map(n => `<li><a href="${link(v, n.slug)}"${ativo === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
  const certs = (C.certificacoes || []).map(c => `<span class="cert">${ic('escudo')}${esc(c)}</span>`).join('');

  function topo(v, slug) {
    if (v === 'a') return `<div class="util"><div class="in util-in"><span>${ic('pin')}${esc(C.cidade)}, ${esc(C.estado)}</span><a href="${tel(C.fone)}">${ic('tel')}${C.fone}</a>${C.email ? `<a href="mailto:${C.email}">${ic('mail')}${C.email}</a>` : ''}${C.certificacoes?.length ? `<span class="util-cert">${esc(C.certificacoes[0])}</span>` : ''}</div></div>
<header class="topo"><div class="in topo-in">
  <a class="marca" href="${link(v, 'index')}" aria-label="${esc(C.nome)} home">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Main"><ul>${menu(v, slug)}</ul></nav>
  <a class="btn btn-topo" href="${quote(v)}">Request a Quote</a>
  ${btnMenu}
</div></header>
<main id="conteudo">`;
    return `<header class="topo"><div class="in topo-in">
  <a class="marca" href="${link(v, 'index')}" aria-label="${esc(C.nome)} home">${logo()}</a>
  <nav id="menu" class="menu" aria-label="Main"><ul>${menu(v, slug)}</ul></nav>
  <a class="topo-fone" href="${tel(C.fone)}"><small>Call the shop</small>${C.fone}</a>
  ${btnMenu}
</div></header>
<main id="conteudo">`;
  }

  function rodape(v) {
    return `</main>
<footer class="rodape"><div class="in rod-grade">
  <div class="rod-marca">${logo('logo rod-logo')}<p>${esc(C.resumo)}</p>${C.certificacoes?.length ? `<p class="rod-certs">${C.certificacoes.map(esc).join(' · ')}</p>` : ''}</div>
  <div><h3>Explore</h3><ul>${nav.slice(1).map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Contact</h3><ul class="rod-dados">
    <li>${ic('tel')}<a href="${tel(C.fone)}">${C.fone}</a></li>
    ${C.fax ? `<li>${ic('tel')}<span>Fax ${C.fax}</span></li>` : ''}
    ${C.email ? `<li>${ic('mail')}<a href="mailto:${C.email}">${C.email}</a></li>` : ''}
    <li>${ic('pin')}<a href="${mapa}" target="_blank" rel="noopener">${esc(C.rua)}<br>${esc(C.cidade)}, ${C.estado} ${C.cep}</a></li>
    ${C.horario ? `<li>${ic('relogio')}<span>${esc(C.horario)}</span></li>` : ''}
  </ul></div>
</div>
<div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${esc(C.nome)}</span><span>Website preview by Overtus</span></div></div>
</footer>
</body>
</html>
`;
  }

  const cab = (v, eyebrow, titulo, sub, foto) => v === 'a'
    ? `<section class="cab${foto ? ' cab-foto' : ''}">${foto ? img(foto, '', ' class="cab-img" fetchpriority="high"') : ''}<div class="in"><p class="eyebrow">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}</div></section>`
    : `<section class="cab"><div class="in cab-in"><div><p class="eyebrow mono">${eyebrow}</p><h1>${titulo}</h1>${sub ? `<p class="cab-sub">${sub}</p>` : ''}</div>${foto ? `<figure class="cab-fig">${img(foto, '', ' fetchpriority="high"')}</figure>` : ''}</div></section>`;

  const ctaFaixa = v => `<section class="cta-faixa"><div class="in cta-in">
  <div><h2>${esc(C.ctaTitulo || 'Have a drawing? Send it over.')}</h2><p>${esc(C.ctaTexto || 'Tell us about the part, the material and the quantity. We will get back to you with a quote.')}</p></div>
  <div class="cta-acoes"><a class="btn btn-claro" href="${quote(v)}">Request a Quote ${seta}</a><a class="cta-fone" href="${tel(C.fone)}">${ic('tel')}${C.fone}</a></div>
</div></section>`;

  // ---------- blocos reutilizados ----------
  const servicosLista = (v, lista, comFoto = true) => v === 'a'
    ? `<ol class="servicos">${lista.map((s, i) => `<li class="serv sobe${s.img && comFoto ? '' : ' serv-sem'}">${s.img && comFoto ? `<figure>${img(s.img, s.titulo)}</figure>` : ''}<div class="serv-txt"><span class="serv-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.titulo)}</h3><p>${s.texto}</p>${s.itens ? `<ul class="lista-check">${s.itens.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div></li>`).join('')}</ol>`
    : `<div class="spec-linhas">${lista.map((s, i) => `<div class="spec-linha sobe"><span class="mono spec-n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.titulo)}</h3><div><p>${s.texto}</p>${s.itens ? `<ul class="tags">${s.itens.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>${s.img ? `<figure>${img(s.img, s.titulo)}</figure>` : '<span></span>'}</div>`).join('')}</div>`;

  const etapas = () => C.etapas?.length ? `<section class="etapas-sec"><div class="in">
  <p class="eyebrow mono">How a job moves through the shop</p><h2>${esc(C.etapasTitulo || 'From print to shipped part')}</h2>
  <ol class="etapas">${C.etapas.map((e, i) => `<li class="sobe"><span class="et-n">${i + 1}</span><span class="et-ic">${ic(e.icone || 'engrenagem')}</span><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></li>`).join('')}</ol>
</div></section>` : '';

  const industriasBloco = (v, curto) => {
    const L = curto ? C.industrias.slice(0, 8) : C.industrias;
    return v === 'a'
      ? `<ul class="inds">${L.map(i => `<li class="sobe">${i.img ? img(i.img, i.nome) : ''}<div><h3>${esc(i.nome)}</h3>${!curto && i.texto ? `<p>${i.texto}</p>` : ''}</div></li>`).join('')}</ul>`
      : `<ul class="inds-b">${L.map(i => `<li class="sobe"><h3>${esc(i.nome)}</h3>${!curto && i.texto ? `<p>${i.texto}</p>` : ''}</li>`).join('')}</ul>`;
  };

  const galeriaBloco = (lista) => `<div class="galeria">${lista.map(g => `<a href="/assets/img/${g.img}.webp" data-foto="${esc(g.cap || C.nome)}">${img(g.img, g.cap || C.nome)}</a>`).join('')}</div>`;

  const equipBloco = () => `<div class="equip">${C.equipamentos.map(g => `<section class="equip-grupo sobe"><h3>${esc(g.grupo)}</h3><table><tbody>${g.itens.map(it => { const [a, ...b] = String(it).split('|'); return `<tr><th scope="row">${esc(a.trim())}</th><td>${esc(b.join('|').trim())}</td></tr>`; }).join('')}</tbody></table></section>`).join('')}</div>`;

  // ---------- páginas ----------
  function home(v) {
    const H = C.home;
    const hero = v === 'a'
      ? H.mosaico ? `<section class="hero hero-mos"><div class="in hero-in"><div class="hero-txt"><p class="eyebrow">${esc(H.eyebrow)}</p><h1>${H.titulo}</h1><p class="hero-sub">${H.sub}</p>
  <div class="hero-acoes"><a class="btn" href="${quote(v)}">Request a Quote ${seta}</a><a class="btn btn-linha" href="${link(v, 'capabilities')}">Our Capabilities</a></div></div>
  <div class="mos">${H.mosaico.map((f, i) => img(f, '', i ? '' : ' fetchpriority="high" loading="eager"')).join('')}</div></div>
</section>
${C.numeros?.length ? `<section class="numeros"><div class="in"><ul>${C.numeros.map(n => `<li><strong>${esc(n.n)}</strong><span>${esc(n.l)}</span></li>`).join('')}</ul></div></section>` : ''}`
      : `<section class="hero">${H.fotos?.length > 1 ? `<div class="hero-fotos" data-carrossel="6500">${H.fotos.map((f, i) => `<div class="slide${i ? '' : ' ativo'}">${img(f, '', i ? '' : ' fetchpriority="high" loading="eager"')}</div>`).join('')}</div>` : `<div class="hero-fotos">${img(H.fotos[0], '', ' fetchpriority="high" loading="eager"')}</div>`}
  <div class="in hero-in"><p class="eyebrow">${esc(H.eyebrow)}</p><h1>${H.titulo}</h1><p class="hero-sub">${H.sub}</p>
  <div class="hero-acoes"><a class="btn" href="${quote(v)}">Request a Quote ${seta}</a><a class="btn btn-linha" href="${link(v, 'capabilities')}">Our Capabilities</a></div></div>
</section>
${C.numeros?.length ? `<section class="numeros"><div class="in"><ul>${C.numeros.map(n => `<li><strong>${esc(n.n)}</strong><span>${esc(n.l)}</span></li>`).join('')}</ul></div></section>` : ''}`
      : `<section class="hero"><div class="in hero-in">
  <div class="hero-txt"><p class="eyebrow mono">${esc(H.eyebrow)}</p><h1>${H.titulo}</h1><p class="hero-sub">${H.sub}</p>
  <div class="hero-acoes"><a class="btn" href="${quote(v)}">Request a Quote ${seta}</a><a class="link-seta" href="${link(v, 'capabilities')}">See capabilities ${seta}</a></div>
  ${C.ficha?.length ? `<dl class="ficha">${C.ficha.map(f => `<div><dt class="mono">${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join('')}</dl>` : ''}</div>
  <figure class="hero-fig${H.mosaico ? ' hero-fig-mos' : ''}">${H.mosaico ? H.mosaico.map(f => img(f, '')).join('') : img(H.fotos[H.fotoB ?? 0], '', ' fetchpriority="high" loading="eager"')}${H.legendaB ? `<figcaption class="mono">${esc(H.legendaB)}</figcaption>` : ''}</figure>
</div></section>`;

    const intro = `<section class="intro"><div class="in intro-in">
  <div><p class="eyebrow${v === 'b' ? ' mono' : ''}">${esc(C.introEyebrow || 'Who we are')}</p><h2>${H.introTitulo}</h2></div>
  <div class="intro-txt">${para(H.intro)}<a class="link-seta" href="${link(v, 'about')}">About ${esc(C.curto)} ${seta}</a></div>
</div></section>`;

    const caps = `<section class="sec caps"><div class="in">
  <div class="sec-topo"><div><p class="eyebrow${v === 'b' ? ' mono' : ''}">Capabilities</p><h2>${esc(C.capsTitulo || 'What we make, and how')}</h2></div><a class="link-seta" href="${link(v, 'capabilities')}">All capabilities ${seta}</a></div>
  ${servicosLista(v, C.servicos.slice(0, v === 'a' ? 3 : 5), v === 'a' || true)}
</div></section>`;

    const inds = C.industrias?.length ? `<section class="sec sec-inds"><div class="in">
  <div class="sec-topo"><div><p class="eyebrow${v === 'b' ? ' mono' : ''}">Industries served</p><h2>${esc(C.indsTitulo || 'Parts that go to work in demanding industries')}</h2></div><a class="link-seta" href="${link(v, 'industries')}">Industries ${seta}</a></div>
  ${industriasBloco(v, true)}
</div></section>` : '';

    const qual = C.qualidade ? `<section class="sec sec-qual"><div class="in qual-in">
  ${C.qualidade.img ? `<figure class="qual-fig">${img(C.qualidade.img, 'Quality inspection')}</figure>` : ''}
  <div><p class="eyebrow${v === 'b' ? ' mono' : ''}">Quality</p><h2>${esc(C.qualidade.titulo)}</h2>${para(C.qualidade.texto.slice(0, 1))}<div class="certs">${certs}</div><a class="link-seta" href="${link(v, 'quality')}">Quality system ${seta}</a></div>
</div></section>` : '';

    const gal = C.galeria?.length >= 4 ? `<section class="sec sec-gal"><div class="in"><div class="sec-topo"><div><p class="eyebrow${v === 'b' ? ' mono' : ''}">From the shop floor</p><h2>${esc(C.galTitulo || 'Recent work')}</h2></div><a class="link-seta" href="${link(v, 'gallery')}">Full gallery ${seta}</a></div>${galeriaBloco(C.galeria.slice(0, C.galeria.length >= 8 ? 8 : 4))}</div></section>` : '';

    const corpo = v === 'a' ? [intro, caps, inds, qual, gal] : [caps, etapas(), intro, inds, qual, gal];
    return head(v, 'index', C.seoTitulo, C.seoDesc) + topo(v, 'index') + hero + corpo.join('\n') + ctaFaixa(v) + rodape(v);
  }

  function capabilities(v) {
    const P = C.capsPagina || {};
    return head(v, 'capabilities', 'Capabilities', `Machining and manufacturing capabilities of ${C.nome} in ${C.cidade}, ${C.estado}.`) + topo(v, 'capabilities')
      + cab(v, 'Capabilities', esc(P.titulo || 'Capabilities'), P.sub, P.foto)
      + `<section class="sec"><div class="in">${P.intro ? `<div class="texto-largo">${para(P.intro)}</div>` : ''}${servicosLista(v, C.servicos)}</div></section>`
      + (C.materiais?.length ? `<section class="sec sec-mat"><div class="in"><p class="eyebrow${v === 'b' ? ' mono' : ''}">Materials</p><h2>Materials we machine</h2><ul class="tags tags-g">${C.materiais.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div></section>` : '')
      + etapas() + ctaFaixa(v) + rodape(v);
  }

  function industries(v) {
    return head(v, 'industries', 'Industries', `Industries served by ${C.nome}.`) + topo(v, 'industries')
      + cab(v, 'Industries served', esc(C.indsTitulo || 'Industries we serve'), C.indsSub, C.indsFoto)
      + `<section class="sec"><div class="in">${industriasBloco(v, false)}</div></section>` + ctaFaixa(v) + rodape(v);
  }

  function equipment(v) {
    return head(v, 'equipment', 'Equipment', `Machine list and equipment at ${C.nome}.`) + topo(v, 'equipment')
      + cab(v, 'Equipment', esc(C.equipTitulo || 'Equipment list'), C.equipSub, C.equipFoto)
      + `<section class="sec"><div class="in">${equipBloco()}</div></section>` + ctaFaixa(v) + rodape(v);
  }

  function quality(v) {
    const Q = C.qualidade;
    return head(v, 'quality', 'Quality', `Quality system and certifications at ${C.nome}.`) + topo(v, 'quality')
      + cab(v, 'Quality', esc(Q.titulo), Q.sub, Q.foto)
      + `<section class="sec"><div class="in qual-pg"><div class="texto-largo">${para(Q.texto)}${Q.itens ? `<ul class="lista-check">${Q.itens.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>
  <aside class="qual-lado">${certs ? `<h3>Certifications</h3><div class="certs">${certs}</div>` : ''}${Q.img ? img(Q.img, 'Quality lab') : ''}</aside></div></section>`
      + (Q.galeria?.length ? `<section class="sec sec-gal"><div class="in"><h2>Inspection and measurement</h2>${galeriaBloco(Q.galeria)}</div></section>` : '')
      + ctaFaixa(v) + rodape(v);
  }

  function gallery(v) {
    return head(v, 'gallery', 'Gallery', `Photos of parts and the shop at ${C.nome}.`) + topo(v, 'gallery')
      + cab(v, 'Gallery', esc(C.galTitulo || 'Parts and shop photos'), 'Click any photo to enlarge.')
      + `<section class="sec"><div class="in">${galeriaBloco(C.galeria)}</div></section>` + ctaFaixa(v) + rodape(v);
  }

  function about(v) {
    const A = C.sobre;
    return head(v, 'about', 'About', `History and team of ${C.nome}.`) + topo(v, 'about')
      + cab(v, 'About us', esc(A.titulo), A.sub, A.foto)
      + `<section class="sec"><div class="in sobre-in"><div class="texto-largo">${para(A.texto)}</div>${A.img ? `<figure class="sobre-fig">${img(A.img, C.nome)}${A.legenda ? `<figcaption>${esc(A.legenda)}</figcaption>` : ''}</figure>` : ''}</div></section>`
      + (A.linha?.length ? `<section class="sec sec-linha"><div class="in"><p class="eyebrow${v === 'b' ? ' mono' : ''}">Milestones</p><h2>${esc(A.linhaTitulo || 'Our story')}</h2><ol class="linha">${A.linha.map(l => `<li class="sobe"><span class="ano">${esc(l.ano)}</span><p>${esc(l.t)}</p></li>`).join('')}</ol></div></section>` : '')
      + (A.valores?.length ? `<section class="sec sec-valores"><div class="in"><h2>${esc(A.valoresTitulo || 'What we stand for')}</h2><ul class="valores">${A.valores.map(x => `<li class="sobe"><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p></li>`).join('')}</ul></div></section>` : '')
      + (A.carta ? `<section class="sec sec-carta"><div class="in carta"><p class="eyebrow">${esc(A.carta.titulo)}</p>${para(A.carta.texto)}<p class="carta-ass">${esc(A.carta.assinatura)}</p></div></section>` : '')
      + ctaFaixa(v) + rodape(v);
  }

  function contact(v) {
    return head(v, 'contact', 'Contact and Request a Quote', `Contact ${C.nome} in ${C.cidade}, ${C.estado}. Call ${C.fone} or send your drawing for a quote.`) + topo(v, 'contact')
      + cab(v, 'Contact', 'Request a quote', `Send the part details and we will get back to you. Prefer the phone? Call ${C.fone}.`)
      + `<section class="sec"><div class="in contato-in">
  <form class="form" id="quote" data-wa="Quote request from website" data-email="${C.emailForm || C.email || ''}">
    <div class="form-duas"><label>Name*<input name="name" required autocomplete="name"></label><label>Company<input name="company" autocomplete="organization"></label></div>
    <div class="form-duas"><label>Email*<input name="email" type="email" required autocomplete="email"></label><label>Phone<input name="phone" type="tel" autocomplete="tel"></label></div>
    <div class="form-duas"><label>Material<input name="material" placeholder="e.g. 6061 aluminum, 17-4 SS"></label><label>Quantity<input name="qty" placeholder="e.g. 50 pcs, annual 2,000"></label></div>
    <label>Tell us about the part*<textarea name="msg" rows="5" required placeholder="Tolerances, finish, deadline. Mention that you have a drawing and we will reply with an email for it."></textarea></label>
    <button class="btn" type="submit">Send request ${seta}</button>
    <p class="form-nota">The form opens your email app with the details filled in.</p>
  </form>
  <aside class="contato-lado">
    <h2>${esc(C.nome)}</h2>
    <ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel(C.fone)}">${C.fone}</a></li>
      ${C.fax ? `<li>${ic('tel')}<span>Fax ${C.fax}</span></li>` : ''}
      ${C.email ? `<li>${ic('mail')}<a href="mailto:${C.email}">${C.email}</a></li>` : ''}
      <li>${ic('pin')}<span>${esc(C.rua)}<br>${esc(C.cidade)}, ${C.estado} ${C.cep}</span></li>
      ${C.horario ? `<li>${ic('relogio')}<span>${esc(C.horario)}</span></li>` : ''}
    </ul>
    <iframe class="mapa" src="${mapaEmbed}" loading="lazy" title="Map to ${esc(C.nome)}" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </aside>
</div></section>` + rodape(v);
  }

  const gens = { index: home, capabilities, industries, equipment, quality, gallery, about, contact };
  for (const v of ['a', 'b']) {
    const pags = {};
    for (const n of nav) pags[n.slug] = gens[n.slug](v);
    escreverVersao(pub, v, pags);
    fs.writeFileSync(path.join(pub, 'assets', `${v}.css`), cssVars(T) + (v === 'a' ? CSS_A : CSS_B) + (T.fotosPequenas ? (v === 'a' ? PEQ_A : PEQ_B) : '') + (T.css?.[v] || ''));
  }
  copiarSiteJs(pub, '');
  fs.writeFileSync(path.join(dir, 'site.config.json'), JSON.stringify({
    name: C.nome, legalName: C.nome, tagline: C.resumo, setor: 'metalmecanica', domain: `https://${C.slug}.overtus.com.br`, whatsapp: '',
    phone: C.fone, phoneHref: `+1${String(C.fone).replace(/\D/g, '')}`, email: C.email || '', address: endereco,
    defaultLang: 'en', langs: ['en'], theme: { brand: T.cor, brandDeep: T.corEsc }, pages: nav.map(n => n.slug), hubName: C.nome,
  }, null, 2) + '\n');
  return escolha(pub, {
    lang: 'en', nome: C.nome, url: E.url, cor: T.cor, fundo: T.escuro || '#14171a', claro: T.claro,
    fonteTitulo: T.fonteTitulo, fonteTexto: "'Inter', system-ui, sans-serif", googleFonts: FONTES,
    favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
    antigo: { url: C.antigo, img: '/assets/apresentacao/atual-pc.webp' },
    versoes: ['a', 'b'].map(l => ({ letra: l, nome: C.versoes[l].nome, texto: C.versoes[l].texto, pontos: C.versoes[l].pontos, paginas: nav.length })),
  });
}

const cssVars = T => `:root{--cor:${T.cor};--cor-esc:${T.corEsc};--acento:${T.acento || T.cor};--escuro:${T.escuro || '#14171a'};--fundo:${T.fundo};--claro:${T.claro};--tinta:${T.tinta};--suave:${T.suave};--linha:${T.linha || '#d9dcdf'};--ft:${T.fonteTitulo};--fx:'Inter',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;--raio:${T.raio};--sobre-cor:${T.sobreCor || '#fff'};--hero-h:${T.heroH || '86vh'};--logo-h:${T.logoH || '54px'}}
`;

// ---------------- Versão A: Shop Floor ----------------
const CSS_A = `
body{background:var(--fundo)}
h1,h2,h3{font-family:var(--ft);font-weight:700;letter-spacing:-.01em}
h2{font-size:clamp(1.7rem,3.2vw,2.6rem)}
.eyebrow{font:600 .8rem/1.2 var(--fx);letter-spacing:.14em;text-transform:uppercase;color:var(--cor);margin-bottom:.8em}
.util{background:var(--escuro);color:#e8eaec;font-size:.85rem}
.util-in{display:flex;gap:22px;align-items:center;min-height:38px;flex-wrap:wrap}
.util a,.util span{display:inline-flex;gap:6px;align-items:center;text-decoration:none}
.util .ic{width:15px;height:15px;opacity:.75}
.util-cert{margin-left:auto;font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:.75rem;color:var(--acento)}
.topo{position:sticky;top:0;z-index:40;background:#fff;border-bottom:1px solid var(--linha)}
.topo-in{display:flex;align-items:center;gap:28px;min-height:80px}
.marca .logo{height:var(--logo-h);width:auto}
.logo-txt{font:700 1.4rem var(--ft);color:var(--cor-esc)}
.menu{margin-left:auto}
.menu ul{display:flex;gap:2px}
.menu a{display:block;padding:10px 12px;text-decoration:none;font-weight:500;font-size:.95rem;color:var(--tinta);border-bottom:2px solid transparent}
.menu a:hover,.menu a.ativo{border-color:var(--cor);color:var(--cor-esc)}
.btn-topo{min-height:44px;padding:.55em 1.1em;font-size:.92rem}
.hero{position:relative;min-height:var(--hero-h);display:flex;align-items:flex-end;color:#fff;background:var(--escuro);overflow:hidden}
.hero-fotos{position:absolute;inset:0}
.hero-fotos .slide,.hero-fotos>img{position:absolute;inset:0}
.hero-fotos img{width:100%;height:100%;object-fit:cover}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb,var(--escuro) 92%,transparent) 0%,color-mix(in srgb,var(--escuro) 55%,transparent) 55%,transparent 100%),linear-gradient(0deg,color-mix(in srgb,var(--escuro) 70%,transparent),transparent 45%)}
.hero-in{position:relative;z-index:2;padding:120px 0 90px}
.hero .eyebrow{color:var(--acento)}
.hero h1{font-size:clamp(2.3rem,5.4vw,4.4rem);max-width:15ch;margin-bottom:.35em}
.hero-sub{font-size:clamp(1.05rem,1.6vw,1.25rem);max-width:54ch;color:#dfe3e6}
.hero-acoes{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px}
.hero .btn-linha{color:#fff}
.hero-mos{min-height:auto;align-items:center;background:radial-gradient(120% 90% at 85% 10%,color-mix(in srgb,var(--cor) 38%,var(--escuro)) 0%,var(--escuro) 60%)}
.hero-mos::after{display:none}
.hero-mos .hero-in{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:center;padding:84px 0}
.mos{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.mos img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--raio);box-shadow:0 10px 30px rgba(0,0,0,.35)}
.mos img:nth-child(2){transform:translateY(28px)}.mos img:nth-child(4){transform:translateY(28px)}
.numeros{background:linear-gradient(100deg,var(--cor-esc),var(--cor));color:var(--sobre-cor)}
.numeros ul{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}
.numeros li{padding:30px 22px;border-left:1px solid rgba(255,255,255,.22)}
.numeros li:first-child{border-left:0;padding-left:0}
.numeros strong{display:block;font:700 clamp(2rem,3.4vw,2.8rem)/1 var(--ft)}
.numeros span{font-size:.92rem;opacity:.9}
.intro{padding:96px 0}
.intro-in{display:grid;grid-template-columns:1fr 1.2fr;gap:64px;align-items:start}
.intro h2{font-size:clamp(1.8rem,3.4vw,2.8rem)}
.intro-txt{font-size:1.08rem;color:var(--suave)}
.sec{padding:88px 0}
.sec-topo{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:40px;flex-wrap:wrap}
.sec-topo h2{margin:0;max-width:22ch}
.caps{background:var(--claro)}
.servicos{display:grid;gap:56px}
.serv{display:grid;grid-template-columns:1.05fr 1fr;gap:48px;align-items:center}
.serv:nth-child(even) figure{order:2}
.serv figure img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--raio)}
.serv-sem{grid-template-columns:1fr}
.serv-n{font:700 3.2rem/1 var(--ft);color:var(--cor);opacity:.35;display:block;margin-bottom:6px}
.serv h3{font-size:1.6rem}
.serv p{color:var(--suave)}
.sec-inds{background:var(--escuro);color:#fff}
.sec-inds .eyebrow{color:var(--acento)}
.inds{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,.14)}
.inds li{padding:26px 24px 26px 0;display:flex;flex-direction:column;gap:14px;border-bottom:1px solid rgba(255,255,255,.14)}
.inds li+li{padding-left:24px}
.inds li:nth-child(4n+1){padding-left:0}
.inds li:not(:nth-child(4n+1)){border-left:1px solid rgba(255,255,255,.14)}
.sec-inds .link-seta{color:var(--acento)}
.inds img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:2px}
.inds h3{font-size:1.2rem;margin:0}
.inds p{color:#c7ccd1;font-size:.95rem;margin:.5em 0 0}
main>.sec:not(.sec-inds) .inds,main>.sec:not(.sec-inds) .inds li{border-color:var(--linha)}
main>.sec:not(.sec-inds) .inds{grid-template-columns:repeat(3,1fr)}
main>.sec:not(.sec-inds) .inds li:nth-child(n){padding-left:24px;border-left:1px solid var(--linha)}
main>.sec:not(.sec-inds) .inds li:nth-child(3n+1){padding-left:0;border-left:0}
main>.sec:not(.sec-inds) .inds p{color:var(--suave)}
.qual-in{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.qual-fig img{width:100%;aspect-ratio:5/4;object-fit:cover;border-radius:var(--raio)}
.certs{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 22px}
.cert{display:inline-flex;gap:8px;align-items:center;padding:8px 14px;border:1.5px solid var(--cor);color:var(--cor-esc);font-weight:600;font-size:.88rem;border-radius:999px}
.galeria{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.galeria a{display:block;overflow:hidden;border-radius:var(--raio);background:var(--claro)}
.galeria img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .4s}
.galeria a:hover img{transform:scale(1.05)}
.sec-gal{background:var(--claro)}
.cta-faixa{background:linear-gradient(120deg,var(--cor-esc) 0%,var(--cor) 100%);color:var(--sobre-cor);padding:64px 0}
.cta-in{display:flex;justify-content:space-between;align-items:center;gap:32px;flex-wrap:wrap}
.cta-in h2{margin:0 0 .3em}
.cta-in p{margin:0;opacity:.9;max-width:52ch}
.cta-acoes{display:flex;gap:22px;align-items:center;flex-wrap:wrap}
.btn-claro{background:#fff;color:var(--cor-esc);border-color:#fff}
.btn-claro:hover{background:#f1f1f1;border-color:#f1f1f1}
.cta-fone{display:inline-flex;gap:8px;align-items:center;font:700 1.25rem var(--ft);text-decoration:none}
.cab{background:var(--escuro);color:#fff;padding:84px 0 64px;position:relative;overflow:hidden}
.cab-foto{padding:140px 0 70px}
.cab-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.38}
.cab .in{position:relative}
.cab .eyebrow{color:var(--acento)}
.cab h1{font-size:clamp(2.1rem,4.6vw,3.6rem);max-width:20ch}
.cab-sub{font-size:1.1rem;color:#d6dadd;max-width:60ch;margin:0}
.texto-largo{max-width:74ch;font-size:1.05rem;color:var(--suave);margin-bottom:48px}
.tags{display:flex;flex-wrap:wrap;gap:8px}
.tags li{padding:7px 14px;background:#fff;border:1px solid var(--linha);border-radius:999px;font-size:.92rem}
.sec-mat{background:var(--claro)}
.etapas-sec{padding:88px 0;background:var(--fundo)}
.etapas{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0;margin-top:36px;counter-reset:e}
.etapas li{position:relative;padding:0 22px 0 0}
.etapas li::before{content:"";position:absolute;left:56px;right:0;top:27px;height:2px;background:linear-gradient(90deg,var(--cor),color-mix(in srgb,var(--cor) 20%,transparent))}
.etapas li:last-child::before{display:none}
.et-n{display:none}
.et-ic{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:var(--cor);color:var(--sobre-cor);margin-bottom:18px;position:relative}
.et-ic .ic{width:26px;height:26px}
.etapas h3{font-size:1.15rem}
.etapas p{color:var(--suave);font-size:.95rem}
.equip{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:40px}
.equip h3{font-size:1.25rem;padding-bottom:10px;border-bottom:3px solid var(--cor)}
.equip table{width:100%;border-collapse:collapse;font-size:.95rem}
.equip th,.equip td{text-align:left;padding:10px 8px;border-bottom:1px solid var(--linha);vertical-align:top}
.equip th{font-weight:600;width:45%}
.equip td{color:var(--suave)}
.qual-pg{display:grid;grid-template-columns:1.4fr 1fr;gap:56px}
.qual-lado img{border-radius:var(--raio);margin-top:20px}
.sobre-in{display:grid;grid-template-columns:1.3fr 1fr;gap:56px;align-items:start}
.sobre-fig img{border-radius:var(--raio);width:100%}
.sobre-fig figcaption{font-size:.88rem;color:var(--suave);margin-top:8px}
.sec-linha{background:var(--claro)}
.linha{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;margin-top:30px;border-top:3px solid var(--cor)}
.linha li{padding:22px 22px 0 0;position:relative}
.linha li::before{content:"";position:absolute;top:-9px;left:0;width:15px;height:15px;border-radius:50%;background:var(--cor);border:3px solid var(--claro)}
.ano{font:700 1.8rem var(--ft);color:var(--cor-esc)}
.valores{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:36px;margin-top:24px}
.valores li{border-top:2px solid var(--tinta);padding-top:16px}
.valores p{color:var(--suave)}
.carta{max-width:72ch;font-size:1.08rem}
.carta-ass{font-weight:600}
.sec-carta{background:var(--claro)}
.contato-in{display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:start}
.contato-lado h2{font-size:1.5rem}
.rod-dados li{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px}
.rod-dados .ic{margin-top:.2em;color:var(--cor)}
.rod-dados a{text-decoration:none}
.contato-lado .mapa{margin-top:18px}
.rodape{background:var(--escuro);color:#d9dde0;padding:64px 0 0;font-size:.95rem}
.rod-grade{display:grid;grid-template-columns:1.5fr 1fr 1.2fr;gap:48px}
.rod-logo{height:calc(var(--logo-h) * .9);width:auto;background:#fff;padding:8px 10px;border-radius:4px;margin-bottom:16px}
.rodape h3{font:600 .8rem var(--fx);letter-spacing:.14em;text-transform:uppercase;color:#fff;margin-bottom:16px}
.rodape ul a{text-decoration:none}
.rodape li{margin-bottom:8px}
.rodape .rod-dados .ic{color:var(--acento)}
.rod-certs{font-size:.85rem;color:var(--acento);font-weight:600}
.rod-logo.logo-txt{display:inline-block;color:var(--cor-esc);font-size:1.15rem}
.rod-base{margin-top:48px;border-top:1px solid rgba(255,255,255,.12);padding:18px 0;font-size:.82rem;color:#9aa1a7}
.rod-base .in{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
@media (max-width:1080px){.btn-topo{display:none}.menu a{padding:10px 8px;font-size:.9rem}}
@media (max-width:900px){
  .menu-btn{display:block;margin-left:auto}
  .menu{position:fixed;inset:80px 0 auto;background:#fff;border-bottom:1px solid var(--linha);display:none;margin:0;padding:8px 16px 18px}
  .menu-aberto .menu{display:block}
  .menu ul{flex-direction:column}
  .menu a{padding:13px 4px;border-bottom:1px solid var(--linha)}
  .util-cert{display:none}
  .util-in a:last-of-type{display:none}
  .intro-in,.serv,.qual-in,.qual-pg,.sobre-in,.contato-in,.rod-grade{grid-template-columns:1fr;gap:32px}
  .serv:nth-child(even) figure{order:0}
  .hero-mos .hero-in{grid-template-columns:1fr;gap:36px;padding:56px 0 64px}
  .numeros li{border-left:0;padding:18px 0}
  .etapas li::before{display:none}
  .sec,.intro{padding:64px 0}
  .hero-in{padding:90px 0 56px}
  .topo-in{min-height:68px}
  .menu{top:68px}
  :root{--logo-h:44px}
}
@media (max-width:900px){.inds,main>.sec:not(.sec-inds) .inds{grid-template-columns:1fr 1fr}.inds li:nth-child(n),main>.sec:not(.sec-inds) .inds li:nth-child(n){padding:20px 0;border-left:0}.inds li:nth-child(even),main>.sec:not(.sec-inds) .inds li:nth-child(even){padding-left:16px}.galeria{grid-template-columns:repeat(3,1fr)}}
@media (max-width:520px){.util-in span:first-child{display:none}.equip{grid-template-columns:1fr}.galeria{grid-template-columns:repeat(2,1fr)}.inds,main>.sec:not(.sec-inds) .inds{grid-template-columns:1fr}.inds li:nth-child(n),main>.sec:not(.sec-inds) .inds li:nth-child(n){padding-left:0}}
`;

// ---------------- Versão B: Spec Sheet ----------------
const CSS_B = `
body{background:var(--fundo)}
h1,h2,h3{font-family:var(--ft);font-weight:700;letter-spacing:-.015em}
h2{font-size:clamp(1.7rem,3vw,2.5rem)}
.mono{font-family:var(--mono)!important;letter-spacing:.02em!important}
.eyebrow{font:500 .78rem/1.3 var(--fx);text-transform:uppercase;letter-spacing:.12em;color:var(--cor-esc);margin-bottom:.9em;display:flex;align-items:center;gap:10px}
.eyebrow::before{content:"";width:22px;height:2px;background:var(--cor)}
.topo{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--fundo) 94%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--linha)}
.topo-in{display:flex;align-items:center;gap:28px;min-height:76px}
.marca .logo{height:calc(var(--logo-h) * .9);width:auto}
.logo-txt{font:700 1.3rem var(--ft);color:var(--cor-esc)}
.menu{margin:0 auto}
.menu ul{display:flex;gap:4px}
.menu a{display:block;padding:8px 12px;text-decoration:none;font-size:.93rem;font-weight:500;border-radius:999px;color:var(--tinta)}
.menu a:hover{background:var(--claro)}
.menu a.ativo{background:var(--tinta);color:#fff}
.topo-fone{display:grid;text-decoration:none;font:700 1.08rem var(--ft);color:var(--cor-esc);text-align:right;white-space:nowrap}
.topo-fone small{font:500 .7rem var(--fx);text-transform:uppercase;letter-spacing:.1em;color:var(--suave)}
.hero{padding:64px 0 72px;background:linear-gradient(180deg,var(--fundo) 0%,var(--claro) 100%);border-bottom:1px solid var(--linha)}
.hero-in{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.hero h1{font-size:clamp(2.2rem,4.6vw,3.8rem);margin-bottom:.4em}
.hero-sub{font-size:1.12rem;color:var(--suave);max-width:52ch}
.hero-acoes{display:flex;gap:24px;align-items:center;flex-wrap:wrap;margin:26px 0 34px}
.ficha{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--tinta);margin:0}
.ficha div{padding:12px 12px 12px 0;border-bottom:1px solid var(--linha)}
.ficha div:nth-child(odd){border-right:1px solid var(--linha)}
.ficha div:nth-child(even){padding-left:14px}
.ficha dt{font-size:.72rem;text-transform:uppercase;color:var(--suave)}
.ficha dd{margin:2px 0 0;font-weight:600}
.hero-fig{position:relative}
.hero-fig img{width:100%;aspect-ratio:4/4.3;object-fit:cover;border-radius:var(--raio)}
.hero-fig::before{content:"";position:absolute;inset:-14px 14px 14px -14px;border:1.5px solid var(--cor);border-radius:var(--raio);z-index:-1}
.hero-fig-mos{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.hero-fig-mos img{aspect-ratio:1!important}
.hero-fig figcaption{position:absolute;left:14px;bottom:14px;background:var(--tinta);color:#fff;padding:6px 10px;font-size:.72rem;border-radius:3px}
.sec{padding:88px 0}
.sec-topo{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:36px;flex-wrap:wrap}
.sec-topo h2{margin:0;max-width:24ch}
.spec-linhas{border-top:2px solid var(--tinta)}
.spec-linha{display:grid;grid-template-columns:60px 1fr 1.6fr 200px;gap:28px;padding:26px 0;border-bottom:1px solid var(--linha);align-items:start}
.spec-n{color:var(--cor);font-size:.95rem;padding-top:4px}
.spec-linha h3{font-size:1.3rem;margin:0}
.spec-linha p{color:var(--suave);margin:0 0 .6em}
.spec-linha figure img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--raio)}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.tags li{font:500 .8rem var(--mono);padding:4px 10px;background:var(--claro);border:1px solid var(--linha);border-radius:3px}
.tags-g li{font-size:.92rem;padding:8px 14px;background:#fff}
.etapas-sec{padding:88px 0;background:var(--escuro);color:#fff;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:32px 32px}
.etapas-sec .eyebrow{color:var(--acento)}
.etapas-sec .eyebrow::before{background:var(--acento)}
.etapas{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:18px;margin-top:34px}
.etapas li{border:1px solid rgba(255,255,255,.18);padding:22px;border-radius:var(--raio);position:relative;background:rgba(255,255,255,.03)}
.et-n{position:absolute;top:16px;right:18px;font:500 2.6rem/1 var(--mono);color:var(--acento);opacity:.55}
.et-ic{display:inline-grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1.5px solid var(--acento);color:var(--acento);margin-bottom:16px}
.etapas h3{font-size:1.1rem}
.etapas p{font-size:.92rem;color:#c3c8cd;margin:0}
.intro{padding:88px 0;background:var(--claro)}
.intro-in{display:grid;grid-template-columns:1fr 1.3fr;gap:56px}
.intro-txt{font-size:1.06rem;color:var(--suave)}
.inds-b{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--linha);border-left:1px solid var(--linha)}
.inds-b li{padding:24px;border-right:1px solid var(--linha);border-bottom:1px solid var(--linha);transition:background .2s}
.inds-b li:hover{background:var(--claro)}
.inds-b h3{font-size:1.12rem;margin:0;display:flex;gap:10px;align-items:center}
.inds-b h3::before{content:"";width:8px;height:8px;background:var(--cor);transform:rotate(45deg);flex:none}
.inds-b p{color:var(--suave);font-size:.94rem;margin:.6em 0 0}
.sec-qual{background:linear-gradient(135deg,var(--cor-esc),color-mix(in srgb,var(--cor-esc) 70%,var(--escuro)));color:#fff}
.sec-qual .eyebrow{color:#fff}.sec-qual .eyebrow::before{background:#fff}
.sec-qual .link-seta{color:#fff}
.qual-in{display:grid;grid-template-columns:1fr 1.1fr;gap:56px;align-items:center}
.qual-fig img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:var(--raio)}
.certs{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 22px}
.cert{display:inline-flex;gap:8px;align-items:center;padding:8px 12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.35);font:500 .82rem var(--mono);border-radius:3px}
main .sec:not(.sec-qual) .cert{background:var(--claro);border-color:var(--linha);color:var(--tinta)}
.galeria{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.galeria a{display:block;overflow:hidden;border-radius:var(--raio);position:relative}
.galeria a:nth-child(5n+1){grid-column:span 2;grid-row:span 2}
.galeria img{width:100%;height:100%;aspect-ratio:1;object-fit:cover;transition:transform .4s}
.galeria a:hover img{transform:scale(1.04)}
.cta-faixa{padding:72px 0;background:var(--fundo);border-top:1px solid var(--linha)}
.cta-in{display:grid;grid-template-columns:1.4fr 1fr;gap:40px;align-items:center;padding:44px;border:2px dashed color-mix(in srgb,var(--cor) 55%,transparent);border-radius:calc(var(--raio) * 2);background:var(--claro)}
.cta-in h2{margin:0 0 .3em}
.cta-in p{margin:0;color:var(--suave)}
.cta-acoes{display:grid;gap:14px;justify-items:start}
.btn-claro{}
.cta-fone{display:inline-flex;gap:8px;align-items:center;font:700 1.2rem var(--ft);text-decoration:none;color:var(--cor-esc)}
.cab{padding:72px 0 56px;background:var(--claro);border-bottom:1px solid var(--linha);background-image:linear-gradient(var(--linha) 1px,transparent 1px),linear-gradient(90deg,var(--linha) 1px,transparent 1px);background-size:40px 40px;background-position:-1px -1px}
.cab-in{display:grid;grid-template-columns:1.3fr 1fr;gap:48px;align-items:center}
.cab-in>div:only-child{grid-column:1/-1}
.cab h1{font-size:clamp(2rem,4.2vw,3.3rem);max-width:20ch}
.cab-sub{font-size:1.08rem;color:var(--suave);max-width:60ch;margin:0}
.cab-fig img{border-radius:var(--raio);aspect-ratio:16/10;object-fit:cover;width:100%}
.texto-largo{max-width:74ch;font-size:1.05rem;color:var(--suave);margin-bottom:44px}
.sec-mat{background:var(--claro)}
.equip{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:36px}
.equip-grupo{border:1px solid var(--linha);border-radius:var(--raio);overflow:hidden}
.equip h3{font-size:1.05rem;margin:0;padding:14px 18px;background:var(--tinta);color:#fff;font-family:var(--mono);font-weight:500;letter-spacing:.02em}
.equip table{width:100%;border-collapse:collapse;font-size:.93rem}
.equip th,.equip td{text-align:left;padding:11px 18px;border-top:1px solid var(--linha);vertical-align:top}
.equip tr:nth-child(even){background:var(--claro)}
.equip th{font-weight:600;width:48%}
.equip td{color:var(--suave);font-family:var(--mono);font-size:.84rem}
.qual-pg{display:grid;grid-template-columns:1.4fr 1fr;gap:56px}
.qual-lado{padding:28px;background:var(--claro);border-radius:var(--raio);align-self:start}
.qual-lado img{border-radius:var(--raio);margin-top:20px}
.sobre-in{display:grid;grid-template-columns:1.3fr 1fr;gap:56px;align-items:start}
.sobre-fig img{border-radius:var(--raio);width:100%}
.sobre-fig figcaption{font:500 .78rem var(--mono);color:var(--suave);margin-top:8px}
.linha{margin-top:30px;border-left:2px solid var(--cor);padding-left:0}
.linha li{display:grid;grid-template-columns:120px 1fr;gap:24px;padding:16px 0 16px 26px;position:relative;border-bottom:1px dashed var(--linha)}
.linha li::before{content:"";position:absolute;left:-7px;top:24px;width:12px;height:12px;background:var(--cor);transform:rotate(45deg)}
.ano{font:500 1.15rem var(--mono);color:var(--cor-esc)}
.linha p{margin:0}
.sec-linha{background:var(--claro)}
.valores{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2px;background:var(--linha);margin-top:24px;border:1px solid var(--linha)}
.valores li{background:#fff;padding:26px}
.valores p{color:var(--suave);margin:0}
.carta{max-width:72ch;font-size:1.06rem;padding:40px;border-left:4px solid var(--cor);background:var(--claro)}
.carta-ass{font-weight:600}
.contato-in{display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:start}
.contato-lado{padding:28px;background:var(--claro);border-radius:var(--raio)}
.contato-lado h2{font-size:1.4rem}
.rod-dados li{display:flex;gap:10px;align-items:flex-start;margin:0 0 12px}
.rod-dados .ic{margin-top:.2em;color:var(--cor)}
.rod-dados a{text-decoration:none}
.contato-lado .mapa{margin-top:18px}
.rodape{background:var(--cor-esc);color:#eef1f3;padding:64px 0 0;font-size:.95rem}
.rod-grade{display:grid;grid-template-columns:1.5fr 1fr 1.2fr;gap:48px}
.rod-logo{height:calc(var(--logo-h) * .9);width:auto;background:#fff;padding:8px 10px;border-radius:4px;margin-bottom:16px}
.rodape h3{font:500 .78rem var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#fff;opacity:.8;margin-bottom:16px}
.rodape ul a{text-decoration:none}
.rodape li{margin-bottom:8px}
.rodape .rod-dados .ic{color:#fff;opacity:.8}
.rod-certs{font:500 .8rem var(--mono)}
.rod-logo.logo-txt{display:inline-block;color:var(--cor-esc);font-size:1.1rem}
.rod-base{margin-top:48px;border-top:1px solid rgba(255,255,255,.18);padding:18px 0;font-size:.82rem;opacity:.85}
.rod-base .in{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
@media (max-width:1100px){.topo-fone{display:none}.menu a{padding:8px 9px;font-size:.9rem}}
@media (max-width:900px){
  .menu-btn{display:block;margin-left:auto}
  .menu{position:fixed;inset:76px 0 auto;background:var(--fundo);border-bottom:1px solid var(--linha);display:none;margin:0;padding:8px 16px 18px}
  .menu-aberto .menu{display:block}
  .menu ul{flex-direction:column}
  .menu a{border-radius:0;padding:13px 4px;border-bottom:1px solid var(--linha)}
  .menu a.ativo{background:none;color:var(--cor-esc);font-weight:700}
  .hero-in,.intro-in,.qual-in,.qual-pg,.sobre-in,.contato-in,.rod-grade,.cab-in,.cta-in{grid-template-columns:1fr;gap:32px}
  .hero-fig{order:-1}.hero-fig::before{display:none}
  .hero-fig img{aspect-ratio:16/11}
  .spec-linha{grid-template-columns:44px 1fr;gap:10px 16px}
  .spec-linha>div,.spec-linha>figure{grid-column:2}
  .spec-linha>span:last-child{display:none}
  .sec,.intro,.etapas-sec{padding:64px 0}
  .galeria{grid-template-columns:repeat(2,1fr)}
  .inds-b{grid-template-columns:1fr 1fr}
  .cta-in{padding:28px}
  .linha li{grid-template-columns:1fr;gap:4px}
}
@media (max-width:620px){.inds-b{grid-template-columns:1fr}}
@media (max-width:520px){.ficha{grid-template-columns:1fr}.ficha div:nth-child(odd){border-right:0}.ficha div:nth-child(even){padding-left:0}.equip{grid-template-columns:1fr}}
`;

const PEQ_A = `
.serv{grid-template-columns:minmax(0,380px) 1fr}
.serv:nth-child(even){grid-template-columns:1fr minmax(0,380px)}
.qual-in{grid-template-columns:minmax(0,420px) 1fr}
.sobre-in{grid-template-columns:1.6fr minmax(0,400px)}
@media (max-width:900px){.serv,.serv:nth-child(even),.qual-in,.sobre-in{grid-template-columns:1fr}.serv figure{max-width:420px}}
`;
const PEQ_B = `
.galeria a:nth-child(5n+1){grid-column:auto;grid-row:auto}
.qual-in{grid-template-columns:minmax(0,420px) 1fr}
.sobre-in{grid-template-columns:1.6fr minmax(0,400px)}
@media (max-width:900px){.qual-in,.sobre-in{grid-template-columns:1fr}}
`;
