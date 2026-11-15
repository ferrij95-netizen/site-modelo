// Agrozacca Alimentos (Jacinto Machado/SC, desde 1999): rações, concentrados e suplementos da marca Suprema. Gera public/{a,b}/ e a página de escolha.
// node clientes/agrozacca/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs agrozacca https://www.agrozacca.com.br/)
// 57 produtos com fotos das embalagens, ingredientes, níveis de garantia, modo de usar e pesos do site atual. Logo vetorizado (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Agrozacca Alimentos', legal: 'Agrozacca Alimentos Ltda.', url: 'https://agrozacca.overtus.com.br/', antigo: 'https://www.agrozacca.com.br/',
  fone: '(48) 3535-1360', foneHref: 'tel:+554835351360', wa: '(48) 99161-3718', waNum: '5548991613718', email: 'vendas@agrozacca.com.br',
  end: 'Rodovia SC-108, km 437, Último Rio', cidade: 'Jacinto Machado/SC · CEP 88950-000',
  insta: 'https://www.instagram.com/agrozacca.suprema/', face: 'https://www.facebook.com/agrozacca/', yt: 'https://www.youtube.com/channel/UCj-9bocYzrd9phmO4wg1eqA', video: 'https://youtu.be/cTCNz4muwPM',
  catalogoPet: 'https://www.agrozacca.com.br/Catalago_Agrozacca_Suprema.pdf',
};
const waLink = `https://wa.me/${E.waNum}`;
const ANOS = 2026 - 1999;

const especies = [
  { id: 'bovinos', cat: 'Bovinos', n: 'Bovinos', t: 'Leite e corte: rações, concentrados, sal proteinado e alto grão.' },
  { id: 'aves', cat: 'Aves', n: 'Aves', t: 'Linha Crescer para postura, corte, codornas e avestruz.' },
  { id: 'equinos', cat: 'Equinos', n: 'Equinos', t: 'Best Horse e a premium Excellence para cavalos de esporte.' },
  { id: 'suinos', cat: 'Suínos', n: 'Suínos', t: 'Do crescimento à terminação, rações e concentrados.' },
  { id: 'ovinos', cat: 'Ovinos', n: 'Ovinos', t: 'Rações para ovinos e caprinos.' },
  { id: 'coelhos', cat: 'Coelhos', n: 'Coelhos', t: 'Ração completa para coelhos.' },
  { id: 'peixes', cat: 'Peixes', n: 'Peixes', t: 'Rações extrusadas para crescimento e engorda.' },
  { id: 'pet', cat: 'Linha Pet', n: 'Linha Pet', t: 'Molecão para cães e SoftCat para gatos.' },
  { id: 'ingredientes', cat: 'Ingredientes', n: 'Ingredientes', t: 'Ingredientes especiais, como amido de arroz Kampo.' },
];
const espDe = p => especies.find(e => e.cat === p.cat)?.id || 'ingredientes';
const deEsp = id => produtos.filter(p => espDe(p) === id);
const P = s => produtos.find(p => p.s === s) || produtos[0];
const fotoEsp = id => deEsp(id)[0];

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const imgP = (p, topo) => (topo ? imgTopo : img)(`p-${p.s}`, `Embalagem ${p.n} Suprema Agrozacca`, p.w, p.h);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Agrozacca' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'revenda', n: 'Seja revendedor' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Nutrição Suprema', b: 'Do Sul para o campo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,600;0,700;0,800;1,800&family=Nunito+Sans:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Agrozacca Suprema | Rações e suplementos para nutrição animal' : `${titulo} | Agrozacca Suprema`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#da251c' });

const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 120) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Suprema Agrozacca" width="${w}" height="${Math.round(w * 86 / 152)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Nutrição animal desde 1999 · SC, RS e PR</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${waLink}" ${ext}>${icWa()}${E.wa}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Agrozacca, página inicial">${logo(v === 'b', 112)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waLink}" ${ext}>${icWa()}Comprar</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${logo(true, 150)}
      <p>Fabricante de rações, concentrados e suplementos da marca Suprema. Jacinto Machado, extremo sul de Santa Catarina, desde 1999.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>Produtos</h3><ul>${especies.map(e => `<li><a href="${link(v, 'produtos')}?esp=${e.id}">${e.n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>Televendas <a href="${E.foneHref}">${E.fone}</a></span></li>
      <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'revenda')}">Seja revendedor</a></li>
      <li><a href="${link(v, 'revenda')}#representante">Encontre um representante</a></li>
      <li><a href="${E.catalogoPet}" ${ext}>Catálogo pet (PDF)</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Suprema · nutrição animal</span></div>
</footer>
<a class="wa-flutua" href="${waLink}" ${ext} aria-label="WhatsApp Agrozacca">${icWa()}</a>
<script src="/assets/agrozacca.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1999</b><span>início da fábrica em Jacinto Machado/SC</span></li>
  <li><b>${ANOS} anos</b><span>de marca Suprema no campo</span></li>
  <li><b>${produtos.length}</b><span>rações, concentrados e suplementos</span></li>
  <li><b>9</b><span>linhas: bovinos, aves, equinos, suínos, pet e mais</span></li>
  <li><b>SC · RS · PR</b><span>com entrega própria e assistência técnica</span></li>
</ul>`;

const gradeEsp = v => `<ul class="especies">${especies.map(e => { const p = fotoEsp(e.id); return `<li class="sobe"><a href="${link(v, 'produtos')}?esp=${e.id}"><span class="es-img">${imgP(p)}</span><b>${e.n}</b><span>${e.t}</span><i>${deEsp(e.id).length} produto${deEsp(e.id).length > 1 ? 's' : ''} ${ic('seta')}</i></a></li>`; }).join('')}</ul>`;

const diferenciais = () => `<ul class="difs">
  <li class="sobe">${ic('estrela')}<h3>Marca consolidada</h3><p>Mais de 25 anos desenvolvendo produtos de nutrição animal no Sul.</p></li>
  <li class="sobe">${ic('escudo')}<h3>Controle de qualidade</h3><p>Rigoroso em todas as etapas, do grão à embalagem.</p></li>
  <li class="sobe">${ic('caminhao')}<h3>Entregas pontuais</h3><p>Fabricação e logística próprias para o revendedor não ficar sem produto.</p></li>
  <li class="sobe">${ic('usuarios')}<h3>Assistência técnica</h3><p>Técnicos agrícolas e médicos veterinários na equipe.</p></li>
</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Quer vender Suprema na sua loja?</h2>
  <p>Agropecuárias e casas de ração de SC, RS e PR: fale com o televendas ou peça o representante da sua região.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'revenda')}">Seja revendedor</a><a class="btn btn-linha" href="${waLink}" ${ext}>${icWa()}WhatsApp</a></div>
</div></section>`;

const formRevenda = () => `<form class="form" data-wa="${E.waNum}" data-assunto="Quero ser revendedor Suprema">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Loja / empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone / WhatsApp *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Cidade *<input name="cidade" required autocomplete="address-level2"></label><label>Estado *<select name="estado"><option>SC</option><option>RS</option><option>PR</option><option>Outro</option></select></label></div>
  <label>Você é<select name="perfil"><option>Agropecuária / casa de ração</option><option>Produtor rural</option><option>Criador de cavalos</option><option>Pet shop</option><option>Outro</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Quais linhas interessam: bovinos, aves, equinos, pet..."></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da Agrozacca com a mensagem pronta.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- catálogo ----------
const peso = p => p.peso.split(/Produto isento|Produto com registro|Registro/i)[0].replace(/Cód\.?:?\s*\d+/g, '').replace(/\s+-\s*/g, ' ').trim();
const cardProd = p => `<li class="pr" data-esp="${espDe(p)}" data-busca="${esc((p.n + ' ' + p.cod + ' ' + p.linha).toLowerCase())}">
  <a class="pr-foto" href="/assets/img/p-${p.s}.webp" data-foto="${esc(p.n)}">${imgP(p)}</a>
  <div class="pr-txt"><p class="pr-cat">${esc(p.linha)}</p><h3>${esc(p.n)}</h3>
  <p class="pr-meta"><span>Cód. ${p.cod}</span>${peso(p) ? `<span>${esc(peso(p))}</span>` : ''}</p>
  ${p.uso ? `<p class="pr-uso"><b>Modo de usar:</b> ${esc(p.uso)}</p>` : ''}
  ${p.niv.length || p.ingr ? `<details><summary>Níveis de garantia e ingredientes</summary>${p.uso && p.uso.length > 150 ? `<p class="pr-ingr"><b>Modo de usar completo:</b> ${esc(p.uso)}</p>` : ''}${p.niv.length ? `<ul class="pr-niv">${p.niv.map(l => { const m = l.match(/^(.*?\))\s*(.*)$/); return m ? `<li><span>${esc(m[1])}</span><b>${esc(m[2])}</b></li>` : `<li>${esc(l)}</li>`; }).join('')}</ul>` : ''}${p.ingr ? `<p class="pr-ingr"><b>Ingredientes:</b> ${esc(p.ingr)}</p>` : ''}</details>` : ''}
  <a class="pr-wa" href="${waLink}?text=${encodeURIComponent(`Olá! Quero saber preço e disponibilidade de ${p.n} (cód. ${p.cod}).`)}" ${ext}>${icWa()} Pedir pelo WhatsApp</a></div></li>`;

// ---------- páginas ----------
function empresa(v) {
  return head(v, 'empresa', 'A Agrozacca', 'Agrozacca Alimentos: fábrica de rações, concentrados e suplementos em Jacinto Machado/SC desde março de 1999. Marca Suprema em SC, RS e PR.') + topo(v, 'empresa') +
  cabPag('Temos orgulho da nossa história', 'Desde 1999 fornecendo nutrição animal de alta qualidade a partir do extremo sul de Santa Catarina.', imgTopo('h-racao', 'Ração Suprema nas mãos', 1600, 371)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}
    <h2>Fábrica própria em Jacinto Machado/SC</h2>
    <p>A Agrozacca Alimentos é uma empresa de nutrição animal que começou em março de 1999 em Jacinto Machado, extremo sul de Santa Catarina. Fabrica rações, concentrados e suplementos e atua principalmente em Santa Catarina, Rio Grande do Sul e Paraná.</p>
    <p>É responsável pela fabricação e pela logística dos seus produtos e oferece assistência técnica ao consumidor. Entregas sempre pontuais são o diferencial, e o controle de qualidade é rigoroso em todas as etapas.</p>
    <a class="link-seta" href="${E.video}" ${ext}>Ver o vídeo da fábrica ${ic('seta')}</a>
  </div>
  <figure class="sobe selo">${img('selo-25', 'Selo 25 anos Suprema Agrozacca', 478, 452)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-coelho', 'Coelho comendo ração Suprema', 1030, 720)}</figure>
  <div class="sobe">${sobre('Equipe')}<h2>Do ajudante ao veterinário</h2>
  <p>A equipe é treinada no manuseio de todos os produtos e segue o controle de qualidade em cada etapa. São ajudantes, líderes, técnicos agrícolas, médicos veterinários, supervisores e diretores.</p>
  <p><b>Missão:</b> produzir nutrição animal de forma segura, seguindo princípios éticos e garantindo a qualidade dos produtos para os clientes.</p></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Diferenciais')}<h2>Por que revender Suprema</h2></div>
  ${diferenciais()}
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Rações Suprema Agrozacca: ${produtos.length} produtos para bovinos, aves, equinos, suínos, ovinos, coelhos, peixes e pets, com níveis de garantia e modo de usar.`) + topo(v, 'produtos') +
  cabPag('Produtos', `${produtos.length} rações, concentrados e suplementos com níveis de garantia, modo de usar e embalagens.`) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Espécies"><button type="button" data-esp="" aria-pressed="true">Todos <span>${produtos.length}</span></button>${especies.map(e => `<button type="button" data-esp="${e.id}" aria-pressed="false">${e.n} <span>${deEsp(e.id).length}</span></button>`).join('')}</div>
    <div class="f-campos"><label>Buscar<input type="search" data-busca placeholder="leite, postura, Excellence, Molecão, código..."></label><p class="f-total" aria-live="polite"><b data-total>${produtos.length}</b> produtos · <a href="${E.catalogoPet}" ${ext}>catálogo pet (PDF)</a></p></div>
  </div>
  <ul class="catalogo">${produtos.map(cardProd).join('')}</ul>
  <p class="cat-vazio" hidden>Nenhum produto com esse filtro. Fale com o televendas: ${E.fone}.</p>
</div></section>` + chamada(v) + rodape(v);
}

function revenda(v) {
  return head(v, 'revenda', 'Seja revendedor', 'Seja revendedor das rações Suprema Agrozacca em SC, RS e PR. Televendas (48) 3535-1360, WhatsApp (48) 99161-3718.') + topo(v, 'revenda') +
  cabPag('Seja revendedor Suprema', 'Agropecuárias, casas de ração e pet shops: produto de qualidade, preço competitivo e entrega pontual.', imgTopo('h-frangos', 'Linha Crescer para aves Suprema', 1600, 650)) + `
<section class="sec"><div class="in">${diferenciais()}</div></section>
<section class="sec sec-cinza" id="representante"><div class="in duas contato-grade">
  <div class="sobe">${sobre('Onde encontrar')}<h2>Fale com o representante da sua região</h2>
  <p>Mande seus dados e a sua cidade. A Agrozacca indica o representante mais próximo ou atende direto pelo televendas.</p>
  <ul class="rod-dados ct-dados"><li>${ic('tel')}<span>Televendas <a href="${E.foneHref}">${E.fone}</a></span></li><li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
  <div class="sobe caixa-form">${formRevenda()}</div>
</div></section>` + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Agrozacca Alimentos, Rodovia SC-108, km 437, Jacinto Machado - SC');
  return head(v, 'contato', 'Contato', 'Agrozacca Alimentos: (48) 3535-1360, WhatsApp (48) 99161-3718, vendas@agrozacca.com.br. Rodovia SC-108, km 437, Último Rio, Jacinto Machado/SC.') + topo(v, 'contato') +
  cabPag('Contato', 'Televendas, WhatsApp e endereço da fábrica.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Televendas <a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${icWa()}<a href="${waLink}" ${ext}>WhatsApp ${E.wa}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <p class="rod-social ct-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p>
    <a class="btn" href="${waLink}" ${ext}>${icWa()} Chamar no WhatsApp</a></div>
  <iframe class="mapa sobe" title="Mapa da Agrozacca em Jacinto Machado/SC" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=12&output=embed"></iframe>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  const dest = ['Bovinos', 'Equinos', 'Aves'].map(c => produtos.find(p => p.cat === c));
  return head(v, 'index', '', 'Agrozacca Alimentos, Jacinto Machado/SC: rações, concentrados e suplementos Suprema para bovinos, aves, equinos, suínos, ovinos, coelhos, peixes e pets. Desde 1999.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Jacinto Machado/SC · desde 1999</p>
      <h1>Nutrição <em>Suprema</em> para cada animal da propriedade.</h1>
      <p class="ha-sub">Rações, concentrados e suplementos para bovinos de leite e corte, aves, cavalos, suínos, ovinos, coelhos, peixes e pets, com entrega própria em SC, RS e PR.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Ver os produtos</a><a class="btn btn-linha" href="${link(v, 'revenda')}">Seja revendedor</a></p>
    </div>
    <div class="ha-sacos">${dest.map((p, i) => `<figure class="saco s${i}">${imgP(p, i === 0)}</figure>`).join('')}</div>
  </div>
  <div class="in">${numeros()}</div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Escolha a espécie')}<h2>Uma linha para cada criação</h2></div>
  ${gradeEsp(v)}
</div></section>
<section class="faixa-foto"><div class="ff-img">${img('h-aves', 'Galinhas criadas com ração Suprema', 1600, 500)}</div><div class="in ff-txt sobe">
  ${sobre('Linha Crescer')}<h2>Postura, corte, codornas e avestruz</h2>
  <p>Rações e concentrados com níveis de garantia na embalagem e modo de usar em cada produto.</p>
  <a class="link-seta" href="${link(v, 'produtos')}?esp=aves">Ver a linha de aves ${ic('seta')}</a></div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-equinos', 'Ração premium Excellence para equinos', 1080, 820)}</figure>
  <div class="sobe">${sobre('Equinos')}<h2>Excellence: nutrição completa para cavalos</h2>
  <p>Com lisina, biotina, minerais orgânicos, vitamina E e probiótico, ao lado da linha Best Horse para manutenção, verão e cavalos especiais.</p>
  <a class="link-seta" href="${link(v, 'produtos')}?esp=equinos">Ver rações para equinos ${ic('seta')}</a></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Para o revendedor')}<h2>Marca, qualidade, preço e entrega</h2></div>
  ${diferenciais()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Suprema Agrozacca: rações e suplementos fabricados em Jacinto Machado/SC para produtores e agropecuárias de SC, RS e PR. Bovinos, aves, equinos, suínos e pet.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-racao', 'Ração Suprema', 1600, 371)}</div>
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">${ANOS} anos · Suprema Agrozacca</p>
      <h1>Do Sul catarinense <em>para o seu cocho.</em></h1>
      <p class="hb-sub">Fabricação e entrega próprias, técnicos agrícolas e veterinários na equipe e ${produtos.length} produtos para quem cria e para quem revende.</p>
      <p class="ha-acoes"><a class="btn" href="${waLink}" ${ext}>${icWa()} Pedir pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></p>
    </div>
    <figure class="hb-selo">${img('selo-25', 'Selo 25 anos Suprema Agrozacca', 478, 452)}</figure>
  </div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>O que você cria?</h2></div>
  ${gradeEsp(v)}
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('Bovinos de leite e corte')}<h2>15 produtos para o rebanho</h2>
  <p>Rações de leite 20% do Vale, bovino 15%, alto grão, sal proteinado, rações para bezerros e concentrados.</p>
  <a class="link-seta" href="${link(v, 'produtos')}?esp=bovinos">Ver linha bovinos ${ic('seta')}</a></div>
  <ul class="sacos-linha sobe">${deEsp('bovinos').slice(0, 4).map(p => `<li>${imgP(p)}</li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('h-coelho', 'Coelho com ração Suprema', 1030, 720)}</figure>
  <div class="sobe">${sobre('Desde 1999')}<h2>Fábrica, logística e assistência técnica próprias</h2>
  <p>A Agrozacca fabrica, entrega e acompanha o produto no campo. Por isso a entrega pontual é o diferencial que o revendedor mais cita.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Agrozacca ${ic('seta')}</a></div>
</div></section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), revenda: revenda(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'agrozacca.js'), path.join(pub, 'assets/agrozacca.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Agrozacca', artigo: 'da', url: E.url, lang: 'pt', cor: '#da251c', fundo: '#7a1410', claro: '#fbf6ef',
  fonteTitulo: "'Rubik',system-ui,sans-serif", fonteTexto: "'Nunito Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara e quente, abre com as embalagens Suprema e leva direto à espécie que o produtor cria.', pontos: [`${produtos.length} produtos com níveis de garantia e modo de usar`, 'Botão de pedido pelo WhatsApp em cada produto', 'Página para virar revendedor'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Vermelho escuro da marca, abre com o selo de 25 anos e fala com o revendedor.', pontos: ['Espécies em destaque', 'Linha bovinos em vitrine', 'Fábrica, logística e assistência próprias'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
