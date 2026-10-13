// O que muda entre as versões A e B: topo, chamada (primeira dobra) e o arquivo de estilo.
import { esc, ico, botoes, seletorLingua, logoTag, rodapePadrao, renderSecoes, documento, UI, foneHref } from './comum.mjs';

export const VERSOES = {
  a: { nome: 'Fiel', descricao: 'A estrutura, a ordem das seções e o peso de cor do site atual, refeitos com acabamento moderno e versão de celular.' },
  b: { nome: 'Moderna', descricao: 'A mesma marca e o mesmo conteúdo com fotos grandes, mais contraste e um visual mais atual.' },
};

function menu(ctx, pagina) {
  return ctx.site.paginas.map(p => `<a href="${ctx.link(p.slug)}"${p.slug === pagina.slug ? ' aria-current="page"' : ''}>${esc(p.menu)}</a>`).join('');
}

const TOPO = {
  a(ctx, pagina) {
    const d = ctx.dados, u = UI[ctx.lingua];
    const fone = d.contato.telefones[0];
    return `<div class="faixa"><div class="in">
  ${fone ? `<a href="tel:${foneHref(fone)}">${ico('fone')}${esc(fone)}</a>` : ''}
  ${d.contato.emails[0] ? `<a class="so-pc" href="mailto:${esc(d.contato.emails[0])}">${ico('email')}${esc(d.contato.emails[0])}</a>` : ''}
  <span class="dir">${seletorLingua(ctx, pagina.slug)}</span>
</div></div>
<header class="topo${d.marca.logo_fundo === 'escuro' ? ' topo-escuro' : ''}"><div class="in">
  <a class="marca" href="${ctx.link('inicio')}" aria-label="${esc(d.empresa.nome)}, ${u.inicio}">${logoTag(ctx)}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>${u.menu}</em></button>
  <nav id="nav">${menu(ctx, pagina)}</nav>
</div></header>`;
  },
  b(ctx, pagina) {
    const d = ctx.dados, u = UI[ctx.lingua];
    return `<header class="topo"><div class="in">
  <a class="marca" href="${ctx.link('inicio')}" aria-label="${esc(d.empresa.nome)}, ${u.inicio}"><span class="logo-caixa">${logoTag(ctx)}</span></a>
  <button class="menu-btn" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span><em>${u.menu}</em></button>
  <nav id="nav">${menu(ctx, pagina)}${seletorLingua(ctx, pagina.slug)}<a class="botao pequeno" href="${ctx.link(ctx.slugContato)}">${esc(u.fale)}</a></nav>
</div></header>`;
  },
};

const CHAMADA = {
  a(ctx, pagina, home) {
    const c = pagina.chamada, url = ctx.img(c.imagem);
    if (home) return `<section class="chamada ch-home${url ? '' : ' sem-foto'}"><div class="in">
  <div class="ch-texto"><span class="sobretitulo">${esc(ctx.dados.empresa.nome)}</span><h1>${esc(c.titulo)}</h1><p>${esc(c.subtitulo)}</p><div class="cta-botoes">${botoes(ctx)}</div></div>
  ${url ? `<figure class="ch-foto"><img src="${esc(url)}" alt="${esc(c.titulo)}" fetchpriority="high"></figure>` : ''}
</div></section>`;
    return `<section class="chamada ch-interna"><div class="in"><nav class="trilha"><a href="${ctx.link('inicio')}">${UI[ctx.lingua].inicio}</a> / <span>${esc(pagina.menu)}</span></nav><h1>${esc(c.titulo)}</h1>${c.subtitulo ? `<p>${esc(c.subtitulo)}</p>` : ''}</div>${url ? `<img class="ch-fundo" src="${esc(url)}" alt="">` : ''}</section>`;
  },
  b(ctx, pagina, home) {
    const c = pagina.chamada, url = ctx.img(c.imagem);
    return `<section class="chamada ${home ? 'ch-home' : 'ch-interna'}${url ? '' : ' sem-foto'}">
  ${url ? `<img class="ch-fundo" src="${esc(url)}" alt="" fetchpriority="high">` : ''}
  <div class="in"><div class="ch-texto">${home ? `<span class="sobretitulo">${esc(ctx.site.slogan)}</span>` : `<span class="sobretitulo">${esc(pagina.menu)}</span>`}<h1>${esc(c.titulo)}</h1>${c.subtitulo ? `<p>${esc(c.subtitulo)}</p>` : ''}${home ? `<div class="cta-botoes">${botoes(ctx)}</div>` : ''}</div></div>
</section>`;
  },
};

export function pagina(ctx, p) {
  const home = p.slug === 'inicio';
  const corpo = CHAMADA[ctx.v](ctx, p, home) + '\n' + renderSecoes(p.secoes, { ...ctx, uso: {} });
  return documento({ ctx: { ...ctx, topo: pg => TOPO[ctx.v](ctx, pg), rodape: () => rodapePadrao(ctx) }, pagina: p, corpo });
}
