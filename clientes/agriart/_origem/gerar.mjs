// AgriArt Peças Agrícolas (Ribeirão Preto/SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/agriart/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs agriart https://www.agriart.com.br/)
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const catalogo = JSON.parse(fs.readFileSync(path.join(aqui, 'catalogo.json'), 'utf8'));
const E = {
  nome: 'AgriArt Peças Agrícolas', url: 'https://agriart.overtus.com.br/', antigo: 'https://www.agriart.com.br/',
  wa: '5516988048601', fones: ['(16) 3878-1002', '(16) 3878-1003'], email: 'vendas.agriart@outlook.com',
  rua: 'Rua Manoel Fernandes, 545', bairro: 'Jardim Zara', cep: '14092-320', cidade: 'Ribeirão Preto - SP',
  facebook: 'https://www.facebook.com/agriartpecasagricolas/',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+Manoel+Fernandes,+545,+Ribeir%C3%A3o+Preto+SP',
  sobre: 'A AgriArt abriu suas portas em 2015 e, desde então, oferece excelentes produtos e serviços. O nosso diferencial é a capacidade de personalizar as ofertas às necessidades dos clientes.',
  sobre2: 'Não importa o quão único ou desafiador seja seu pedido: você pode sempre contar conosco para encontrar a solução certa.',
  missao: 'Nosso negócio é baseado em três princípios fundamentais: qualidade, preço e serviço. Temos orgulho do nosso comprometimento com eles.',
  visao: 'Manter o preço justo sem nunca perder a qualidade dos nossos produtos.',
};
const equipe = [
  ['Cleber', 'Vendas', '(16) 98804-8601', 'agriart.adm@outlook.com'], ['Gisele', 'Vendas', '(16) 98242-0981', 'vendas.agriart@outlook.com'],
  ['Yuri', 'Vendas', '(16) 98242-0963', 'assistente2.agriart@outlook.com'], ['Gabriella', 'Vendas', '(16) 99640-1858', 'assistente5.agriart@outlook.com'],
  ['Jaqueline', 'Financeiro', '(16) 98876-1302', 'financeiro1.agriart@outlook.com'], ['Evelise', 'Expedição', '(16) 98242-0974', 'estoqueagriart@gmail.com'],
  ['Franciely', 'Follow-up', '(16) 98242-0994', 'followupagriart@outlook.com'],
];
const ordem = ['transbordos', 'implementos', 'plantadeiras-2', 'pulverizadores-1', 'tratores', 'carretas', 'irrigacao'];
const cats = ordem.map(k => ({ chave: k, slug: k.replace(/-\d$/, ''), ...catalogo[k] }));
const capa = { transbordos: 'transbordo-verde', implementos: null, plantadeiras: null, pulverizadores: null, tratores: 'colhedora-vermelha', carretas: 'transbordo-amarelo', irrigacao: null };
const icones = { transbordos: 'caminhao', implementos: 'engrenagem', plantadeiras: 'trator', pulverizadores: 'gota', tratores: 'trator', carretas: 'caminhao', irrigacao: 'gota' };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'Sobre nós' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Canavial', b: 'Balcão de Peças' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600;800&family=Inter:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const peca = (n, alt) => `<img src="/assets/pecas/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const wa = (m = 'Olá! Vim pelo site da AgriArt e preciso de uma peça.') => waHref(E.wa, m);
const pedir = (p, c) => wa(`Olá! Vim pelo site da AgriArt. Quero cotar a peça: ${p} (${c}).`);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1e8a3f' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lCat = (v, c) => `/${v}/produtos/${c.slug}/`;
const capaCat = c => capa[c.slug] ? img(capa[c.slug], c.nome) : peca(c.itens[0].img, c.nome);
const total = cats.reduce((s, c) => s + c.itens.length, 0);

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="AgriArt Peças Agrícolas" width="432" height="156"></a>
    <ul class="topo-maq" aria-hidden="true">${['transbordo-verde', 'colhedora-laranja', 'transbordo-amarelo', 'colhedora-vermelha'].map(f => `<li>${img(f, '')}</li>`).join('')}</ul>
    ${btnMenu}
  </div>
  <nav id="menu" class="menu in" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
</header>
<main id="conteudo">
`;
  return `<div class="pre-topo"><div class="in"><span>${ic('pin')}${E.cidade}</span><a href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a><a href="${wa()}" target="_blank" rel="noopener">${icWa()}WhatsApp vendas</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="AgriArt Peças Agrícolas" width="432" height="156"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}Cotar peça</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo.webp" alt="AgriArt Peças Agrícolas" width="432" height="156" loading="lazy"><p>Peças de reposição para transbordos, implementos, plantadeiras, pulverizadores, tratores, carretas e irrigação. Desde 2015 em Ribeirão Preto.</p></div>
    <div><h3>Produtos</h3><ul>${cats.map(c => `<li><a href="${lCat(v, c)}">${c.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')} (comercial)</span></li>
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">(16) 98804-8601 (vendas)</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade} · ${E.cep}</span></li>
      <li>${ic('face')}<a href="${E.facebook}" target="_blank" rel="noopener">facebook.com/agriartpecasagricolas</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const equipeLista = cls => `<ul class="${cls}">${equipe.map(([n, f, t, m]) => `<li><strong>${n}</strong><span class="eq-f">${f}</span><a href="${waHref('55' + t.replace(/\D/g, ''), 'Olá! Vim pelo site da AgriArt.')}" target="_blank" rel="noopener">${icWa()}${t}</a><a href="mailto:${m}">${ic('mail')}${m}</a></li>`).join('')}</ul>`;
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da AgriArt e quero uma cotação.">
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-duas"><label>Telefone *<input name="telefone" required inputmode="tel" autocomplete="tel"></label><label>Cidade<input name="cidade" autocomplete="address-level2"></label></div>
  <label>Linha da peça<select name="linha">${cats.map(c => `<option>${c.nome}</option>`).join('')}<option>Outra</option></select></label>
  <label>Qual peça você procura? *<textarea name="peca" rows="3" required placeholder="Nome da peça, código, marca e modelo da máquina"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da AgriArt em Ribeirão Preto" loading="lazy" src="https://maps.google.com/maps?q=Rua%20Manoel%20Fernandes%2C%20545%2C%20Ribeir%C3%A3o%20Preto&z=15&output=embed"></iframe>`;
const busca = `<label class="busca">${ic('engrenagem')}<span class="sr">Buscar peça</span><input type="search" placeholder="Buscar peça pelo nome (ex.: cubo, bico, válvula)" data-busca></label>`;
const buscaJs = `<script>document.querySelectorAll('[data-busca]').forEach(i=>i.addEventListener('input',()=>{const q=i.value.normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase();let n=0;document.querySelectorAll('[data-nome]').forEach(e=>{const ok=e.dataset.nome.includes(q);e.hidden=!ok;if(ok)n++});const c=document.querySelector('[data-conta]');if(c)c.textContent=n+' peças'}))</script>`;
const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// ---------- Versão A: Canavial (fiel: logo com a cana, faixa das máquinas, menu verde, fundo verde) ----------
function A() {
  const v = 'a';
  const pag = {};
  const faixa = (t, sub = '') => `<section class="faixa-a"><div class="in"><h1>${t}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
  pag.index = head(v, 'index', 'Peças agrícolas em Ribeirão Preto', E.sobre) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <figure class="hero-a-foto">${img('transbordo-laranja', 'Transbordo de cana', ' loading="eager" fetchpriority="high"')}</figure>
  <div class="hero-a-txt"><p class="k">Ribeirão Preto · desde 2015</p><h1>Peças de reposição para quem trabalha no campo</h1><p>Transbordos, implementos, plantadeiras, pulverizadores, tratores, carretas e irrigação. Qualidade, preço justo e atendimento que encontra a peça certa.</p><div class="bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos</a><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Cotar pelo WhatsApp</a></div></div>
</div></section>
<section class="painel in">
  <header class="tit-a"><h2>Nossas linhas de peças</h2><p>${total} peças no catálogo, separadas por linha.</p></header>
  <ul class="cats-a">${cats.map(c => `<li><a href="${lCat(v, c)}"><span class="cats-a-foto">${capaCat(c)}</span><strong>${c.nome}</strong><span>${c.itens.length} peças ${ic('seta')}</span></a></li>`).join('')}</ul>
</section>
<section class="painel in sobre-a">
  <div><h2>Agriart Peças Agrícolas</h2><p>${E.sobre}</p><p>${E.sobre2}</p><a class="link-seta" href="${link(v, 'sobre')}">Sobre nós ${ic('seta')}</a></div>
  <ul class="pilares-a"><li><b>Qualidade</b>Peças conferidas para durar na safra.</li><li><b>Preço</b>Preço justo, sem perder a qualidade.</li><li><b>Serviço</b>Ofertas sob medida para cada pedido.</li></ul>
</section>
<section class="painel in destaque-a">
  <header class="tit-a"><h2>Peças para transbordos</h2><p>A linha com mais itens no catálogo.</p></header>
  <ul class="pecas-a">${cats[0].itens.slice(0, 8).map(p => `<li><a href="${pedir(p.nome, cats[0].nome)}" target="_blank" rel="noopener">${peca(p.img, p.nome)}<span>${esc(p.nome)}</span></a></li>`).join('')}</ul>
  <p class="centro"><a class="btn" href="${lCat(v, cats[0])}">Todas as peças para transbordos</a></p>
</section>
<section class="cta-a in"><div><h2>Não achou a peça?</h2><p>Mande o nome, a foto ou o código pelo WhatsApp. A gente procura para você.</p></div><a class="btn btn-claro" href="${wa()}" target="_blank" rel="noopener">${icWa()}Falar com vendas</a></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre nós', E.sobre) + topo(v, 'sobre') + faixa('Sobre nós') + `
<section class="painel in sobre-a">
  <div><h2>Agriart Peças Agrícolas</h2><p>${E.sobre}</p><p>${E.sobre2}</p></div>
  <figure class="sobre-a-foto"><img src="/assets/img/canavial.webp" alt="Canavial" loading="lazy"></figure>
</section>
<section class="painel in mv-a"><div><span class="mv-ic">${ic('escudo')}</span><h2>Missão</h2><p>${E.missao}</p></div><div><span class="mv-ic">${ic('estrela')}</span><h2>Visão</h2><p>${E.visao}</p></div></section>
` + rodape(v);

  pag.produtos = head(v, 'produtos', 'Produtos', `Catálogo de peças agrícolas: ${cats.map(c => c.nome).join(', ')}.`) + topo(v, 'produtos') + faixa('Produtos', 'Escolha a linha de peças.') + `
<section class="painel in"><ul class="cats-a">${cats.map(c => `<li><a href="${lCat(v, c)}"><span class="cats-a-foto">${capaCat(c)}</span><strong>${c.nome}</strong><span>${c.itens.length} peças ${ic('seta')}</span></a></li>`).join('')}</ul></section>
` + rodape(v);

  for (const c of cats) {
    pag[`produtos/${c.slug}`] = head(v, `produtos/${c.slug}`, `Peças para ${c.nome.toLowerCase()}`, `Peças de reposição para ${c.nome.toLowerCase()}: ${c.itens.slice(0, 8).map(p => p.nome).join(', ')} e mais.`) + topo(v, 'produtos') + faixa(`Peças de reposição para ${c.nome.toLowerCase()}`, `${c.itens.length} peças. Clique em uma peça para cotar pelo WhatsApp.`) + `
<nav class="sub-cats in" aria-label="Linhas">${cats.map(o => `<a href="${lCat(v, o)}"${o === c ? ' class="ativo" aria-current="page"' : ''}>${o.nome}</a>`).join('')}</nav>
<section class="painel in"><ul class="pecas-a">${c.itens.map(p => `<li><a href="${pedir(p.nome, c.nome)}" target="_blank" rel="noopener">${peca(p.img, p.nome)}<span>${esc(p.nome)}</span></a></li>`).join('')}</ul></section>
` + rodape(v);
  }

  pag.contato = head(v, 'contato', 'Contato', `Fale com a AgriArt: ${E.fones.join(', ')}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + faixa('Contato') + `
<section class="painel in contato-a">
  <div><h2>Fale conosco</h2>${formulario()}</div>
  <div><h2>Comercial</h2><p class="fones-a">${E.fones.map(f => `<a href="${telHref(f)}">${ic('tel')}${f}</a>`).join('')}</p><h3>Endereço</h3><p>${E.rua}<br>${E.bairro} · ${E.cep}<br>${E.cidade}</p>${mapaFrame}</div>
</section>
<section class="painel in"><h2>Nossa equipe</h2>${equipeLista('equipe-a')}</section>
` + rodape(v);
  return pag;
}

// ---------- Versão B: Balcão de Peças (moderna: catálogo com busca, verde escuro e verde-cana) ----------
function B() {
  const v = 'b';
  const pag = {};
  const sub = (k, h, p) => `<section class="sub-b"><div class="in"><p class="k">${k}</p><h1>${h}</h1>${p ? `<p>${p}</p>` : ''}</div><img class="sub-b-cana" src="/assets/img/cana.webp" alt="" aria-hidden="true"></section>`;
  const cartao = (p, c) => `<li data-nome="${esc(semAcento(p.nome))}"><figure>${peca(p.img, p.nome)}</figure><strong>${esc(p.nome)}</strong><a href="${pedir(p.nome, c.nome)}" target="_blank" rel="noopener">${icWa()}Cotar</a></li>`;
  const passos = `<section class="passos-b"><div class="in">
  <header class="tit-b"><p class="k">Como comprar</p><h2>Da peça parada à máquina rodando</h2></header>
  <ol>${[['engrenagem', 'Encontre a peça', 'Procure no catálogo pela linha ou pelo nome.'], ['wa', 'Mande no WhatsApp', 'Envie o nome, foto ou código. Se não estiver no site, a gente procura.'], ['check', 'Receba a cotação', 'Preço justo e prazo combinados com a equipe de vendas.'], ['caminhao', 'Expedição', 'A peça sai de Ribeirão Preto até você.']].map(([i, t, d], n) => `<li class="sobe"><span class="pb-n">${n + 1}</span>${i === 'wa' ? icWa('pb-ic') : ic(i, 'pb-ic')}<strong>${t}</strong><p>${d}</p></li>`).join('')}</ol>
</div></section>`;

  pag.index = head(v, 'index', 'Peças agrícolas em Ribeirão Preto', E.sobre) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Peças agrícolas · Ribeirão Preto</p><h1>A peça certa para a sua máquina voltar ao campo.</h1><p>${total} peças de reposição para transbordos, implementos, plantadeiras, pulverizadores, tratores, carretas e irrigação.</p>
    <form class="hero-busca" action="${link(v, 'produtos')}">${busca.replace(' data-busca', ' name="q"')}<button class="btn" type="submit">Buscar</button></form>
    <p class="hero-b-atalhos">${cats.slice(0, 5).map(c => `<a href="${lCat(v, c)}">${c.nome}</a>`).join('')}</p>
  </div>
  <div class="hero-b-maq">${img('transbordo-verde', 'Transbordo de cana', ' loading="eager"')}${img('colhedora-vermelha', 'Colhedora de cana')}</div>
</div></section>
<section class="linhas-b in">
  <header class="tit-b linha"><div><p class="k">Linhas</p><h2>Escolha pela máquina</h2></div><a class="link-seta" href="${link(v, 'produtos')}">Catálogo completo ${ic('seta')}</a></header>
  <ol class="linhas-b-lista">${cats.map((c, i) => `<li class="sobe"><a href="${lCat(v, c)}"><span class="lb-n">${String(i + 1).padStart(2, '0')}</span><span class="lb-nome">${c.nome}</span><span class="lb-q">${c.itens.length} peças</span><span class="lb-fotos">${c.itens.slice(0, 3).map(p => peca(p.img, '')).join('')}</span>${ic('seta')}</a></li>`).join('')}</ol>
</section>
${passos}
<section class="sobre-b in"><figure>${img('transbordo-amarelo', 'Transbordo')}</figure><div><p class="k">Desde 2015</p><h2>Qualidade, preço e serviço</h2><p>${E.sobre}</p><p>${E.visao}</p><a class="link-seta" href="${link(v, 'sobre')}">Conheça a AgriArt ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><h2>Não achou? A gente procura para você.</h2><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Falar com vendas</a></div></section>
` + rodape(v);

  pag.sobre = head(v, 'sobre', 'Sobre nós', E.sobre) + topo(v, 'sobre') + sub('Sobre nós', 'Peças agrícolas com preço justo, desde 2015', E.sobre) + `
<section class="sobre-b in"><figure>${img('transbordo-laranja', 'Transbordo de cana')}</figure><div><p>${E.sobre2}</p><dl class="mv-b"><div><dt>${ic('escudo')}Missão</dt><dd>${E.missao}</dd></div><div><dt>${ic('estrela')}Visão</dt><dd>${E.visao}</dd></div></dl></div></section>
${passos}
` + rodape(v);

  pag.produtos = head(v, 'produtos', 'Catálogo de peças', `Catálogo de peças agrícolas: ${cats.map(c => c.nome).join(', ')}.`) + topo(v, 'produtos') + sub('Catálogo', 'Todas as peças', `${total} peças em ${cats.length} linhas. Busque pelo nome ou escolha a linha.`) + `
<section class="cat-b in">
  <div class="cat-b-barra">${busca}<span class="cat-b-conta" data-conta>${total} peças</span></div>
  ${cats.map(c => `<div class="cat-b-grupo"><h2 id="${c.slug}"><a href="${lCat(v, c)}">${c.nome}</a></h2><ul class="pecas-b">${c.itens.map(p => cartao(p, c)).join('')}</ul></div>`).join('')}
</section>
${buscaJs}<script>const q=new URLSearchParams(location.search).get('q');if(q){const i=document.querySelector('[data-busca]');i.value=q;i.dispatchEvent(new Event('input'))}</script>
` + rodape(v);

  for (const c of cats) {
    pag[`produtos/${c.slug}`] = head(v, `produtos/${c.slug}`, `Peças para ${c.nome.toLowerCase()}`, `Peças de reposição para ${c.nome.toLowerCase()}: ${c.itens.slice(0, 8).map(p => p.nome).join(', ')} e mais.`) + topo(v, 'produtos') + sub('Catálogo', `Peças para ${c.nome.toLowerCase()}`, `${c.itens.length} peças. Toque em Cotar para pedir preço pelo WhatsApp.`) + `
<section class="cat-b in">
  <nav class="abas-b" aria-label="Linhas">${cats.map(o => `<a href="${lCat(v, o)}"${o === c ? ' class="ativo" aria-current="page"' : ''}>${o.nome}</a>`).join('')}</nav>
  <div class="cat-b-barra">${busca}<span class="cat-b-conta" data-conta>${c.itens.length} peças</span></div>
  <ul class="pecas-b">${c.itens.map(p => cartao(p, c)).join('')}</ul>
</section>
${buscaJs}
` + rodape(v);
  }

  pag.contato = head(v, 'contato', 'Contato', `Fale com a AgriArt: ${E.fones.join(', ')}. ${E.rua}, ${E.cidade}.`) + topo(v, 'contato') + sub('Contato', 'Fale direto com quem resolve') + `
<section class="contato-b in">
  <div class="contato-b-form"><h2>Pedir cotação</h2>${formulario()}</div>
  <div><h2>Comercial</h2><p class="fones-b">${E.fones.map(f => `<a href="${telHref(f)}">${ic('tel')}${f}</a>`).join('')}</p><p>${E.rua}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</p>${mapaFrame}</div>
</section>
<section class="in equipe-sec"><h2>Equipe</h2>${equipeLista('equipe-b')}</section>
` + rodape(v);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'AgriArt', artigo: 'da', url: E.url, lang: 'pt', cor: '#6ab04c', corTextoBotao: '#0d2a14', fundo: '#0f3b1f', claro: '#f1f7ec',
  fonteTitulo: "'Roboto Slab',Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + cats.length, texto: 'Fiel ao site atual: o logo com a cana, a faixa com as máquinas no topo, o menu verde e as peças com foto, agora organizadas por linha e fáceis de ver no celular.', pontos: [`${total} peças com foto, separadas em ${cats.length} linhas`, 'Cada peça vira um pedido de cotação no WhatsApp', 'Equipe de vendas com contato direto'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + cats.length, texto: 'Mais moderna: um balcão de peças com busca pelo nome, catálogo completo numa página só e o passo a passo de como comprar.', pontos: ['Busca de peças na abertura', 'Catálogo com filtro instantâneo', 'Botão Cotar em cada peça'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
