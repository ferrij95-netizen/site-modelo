// Monta as páginas das versões A ("Balcão": azul do losango do logo, facetas brancas, catálogo por categoria com foto) e
// B ("Pedido": vermelho do logo, títulos condensados como um talão de pedido, catálogo em tabela com a lista sempre ao lado).
// As duas usam a mesma lista de pedido (assets/lista.js). Estilos em public/assets/{base,a,b}.css.
import { empresa as E, textos as T, segmentos, categorias, produtos, marcas, fabrica, receitas, creditos } from './conteudo.mjs';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const foto = (src, alt, w = 1600, h = 1067, extra = '') => `<img src="/assets/img/${src}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const porCat = id => produtos.filter(p => p.cat === id);
const prod = id => produtos.find(p => p.id === id);

export const nomesVersao = { a: 'Balcão', b: 'Pedido' };

const nav = [
  { slug: 'index', nome: 'Início', caminho: '' },
  { slug: 'produtos', nome: 'Produtos', caminho: 'produtos/' },
  { slug: 'atendemos', nome: 'Para seu negócio', caminho: 'atendemos/' },
  { slug: 'fabrica', nome: 'Fábrica', caminho: 'fabrica/' },
  { slug: 'receitas', nome: 'Receitas', caminho: 'receitas/' },
  { slug: 'contato', nome: 'Contato', caminho: 'contato/' },
];

const I = {
  tel: '<path d="M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 10-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  seta: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  zap: '<path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
  caminhao: '<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  loja: '<path d="M4 9l1.5-5h13L20 9M4 9h16v11H4zM9 20v-6h6v6"/>',
  busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
};
const ic = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

// Facetas: as linhas brancas que cortam o losango azul do logo, para fundos azuis (A) e vermelhos (B).
const facetas = (cls = 'facetas') => `<svg class="${cls}" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#fff" stroke-linecap="round"><path d="M250-20L330 540" stroke-width="16"/><path d="M-20 170L640 330" stroke-width="12"/><path d="M640 40L120 540" stroke-width="14"/><path d="M90-20L470 260" stroke-width="9"/></g></svg>`;

// ---------- moldura ----------
function head(v, caminho, titulo, descricao) {
  const url = `${E.url}${v}/${caminho}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${E.nomeLongo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${E.url}assets/og-${v}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,500;0,600;0,700;1,600;1,700;1,800&family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/assets/base.css">
<link rel="stylesheet" href="/assets/${v}.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WholesaleStore', name: E.nomeLongo, foundingDate: String(E.desde), telephone: E.telefones[0].href, email: E.email, address: { '@type': 'PostalAddress', streetAddress: E.endereco, addressLocality: 'Curitiba', addressRegion: 'PR', postalCode: E.cep, addressCountry: 'BR' }, areaServed: 'Curitiba e Região Metropolitana' })}</script>
</head>`;
}

function topo(v, ativo) {
  const links = nav.map(n => `<li><a href="/${v}/${n.caminho}"${n.slug === ativo ? ' aria-current="page"' : ''}>${n.nome}</a></li>`).join('');
  const botaoLista = `<a class="btn-lista" href="/${v}/pedido/"${ativo === 'pedido' ? ' aria-current="page"' : ''}>${ic('lista')}<span>Lista de pedido</span><b class="conta" data-conta hidden>0</b></a>`;
  if (v === 'a') return `<body class="va">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="faixa"><div class="in faixa-in"><span>${ic('caminhao')} ${E.entrega}</span><span class="faixa-tel"><a href="tel:${E.telefones[0].href}">${E.telefones[0].rotulo}</a><a href="tel:${E.telefones[1].href}">${E.telefones[1].rotulo}</a><a href="tel:${E.celular.href}">${E.celular.rotulo}</a></span></div></div>
<header class="topo"><div class="in topo-in">
  <a class="marca" href="/a/" aria-label="LacFrios, início"><img src="/assets/logo.svg" alt="LacFrios" width="140" height="84"></a>
  <nav id="menu" class="menu" aria-label="Principal"><ul>${links}</ul></nav>
  ${botaoLista}
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div></header>
<main id="conteudo">`;
  return `<body class="vb">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo"><div class="in topo-in">
  <a class="marca" href="/b/" aria-label="LacFrios, início"><img src="/assets/logo.svg" alt="LacFrios" width="120" height="72"></a>
  <div class="topo-id"><b>${E.slogan}</b><span>Atacado e varejo desde ${E.desde} · ${E.bairro}, ${E.cidade}</span></div>
  <a class="topo-tel" href="tel:${E.telefones[0].href}">${ic('tel')}<span><small>Pedidos</small>${E.telefones[0].rotulo}</span></a>
  ${botaoLista}
  <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
</div>
<nav id="menu" class="menu" aria-label="Principal"><div class="in"><ul>${links}</ul><span class="menu-entrega">${ic('caminhao')} ${E.entrega}</span></div></nav>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  const links = nav.map(n => `<li><a href="/${v}/${n.caminho}">${n.nome}</a></li>`).join('');
  return `</main>
<footer class="rodape"><div class="in rodape-grid">
  <div class="rodape-marca"><img src="/assets/${v === 'a' ? 'logo-branco' : 'logo'}.svg" alt="LacFrios" width="150" height="90"><p>${T.historia}</p></div>
  <div><h2>Navegue</h2><ul>${links}<li><a href="/${v}/cadastro/">Cadastro de cliente</a></li><li><a href="/${v}/pedido/">Lista de pedido</a></li></ul></div>
  <div><h2>Fale com a gente</h2><ul class="rodape-contato">
    ${E.telefones.map(t => `<li><a href="tel:${t.href}">${ic('tel')} ${t.rotulo}</a></li>`).join('')}
    <li><a href="tel:${E.celular.href}">${ic('tel')} ${E.celular.rotulo} (celular)</a></li>
    <li><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a></li>
    <li>${ic('pin')} ${E.endereco}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}</li>
  </ul></div>
</div>
<div class="in rodape-fim"><span>© LacFrios Distribuidora · desde ${E.desde}</span><span>${creditos}</span><span>Prévia criada pela <a href="https://agencia.overtus.com.br/">Overtus</a></span></div>
</footer>
<div class="aviso-lista" data-toast role="status" aria-live="polite" hidden></div>
<script src="/assets/lista.js" defer></script>
<script src="/assets/site.js" defer></script>
</body>
</html>`;
}

const pagina = (v, slug, titulo, desc, corpo) => {
  const n = nav.find(x => x.slug === slug);
  const caminho = n ? n.caminho : `${slug}/`;
  return `${head(v, caminho, titulo, desc)}\n${topo(v, slug)}\n${corpo}\n${rodape(v)}`;
};

// ---------- peças da lista de pedido ----------
const btnAdd = (p, txt = 'Adicionar', cls = 'add') => `<button class="${cls}" type="button" data-add="${p.id}" data-nome="${esc(p.nome)}">${ic('mais')}<span>${txt}</span></button>`;
const linhaLivre = (p, cls = 'livre') => `<form class="${cls}" data-livre="${p.id}" data-nome="${esc(p.nome)}"><label><span class="sr">${esc(p.nome)}: qual item?</span><input name="item" placeholder="Qual item de ${esc(p.nome.toLowerCase())}? (marca, tipo, tamanho)" autocomplete="off"></label><button type="submit">${ic('mais')}<span>Adicionar</span></button></form>`;
const usarLista = s => `<button class="btn btn-contorno" type="button" data-sugestao="${s.sugestao.join(',')}" data-nomes="${esc(s.sugestao.map(id => prod(id).nome).join(','))}">${ic('lista')} Começar a lista de ${s.nome.toLowerCase()}</button>`;

const marcasHtml = () => `<ul class="marcas">${marcas.map(m => `<li><img src="/assets/marcas/${m.id}.png" alt="${m.nome}" width="${m.w}" height="${m.h}" loading="lazy"></li>`).join('')}</ul>`;

const formPedido = v => `
<div class="pedido-grid">
  <section class="pedido-lista" aria-labelledby="t-lista">
    <h2 id="t-lista">Itens da lista</h2>
    <div data-lista class="lista"><p class="lista-vazia">Sua lista está vazia. Escolha os itens em <a href="/${v}/produtos/">Produtos</a> ou comece por uma lista pronta em <a href="/${v}/atendemos/">Para seu negócio</a>.</p></div>
    <form class="livre livre-solto" data-livre="outro" data-nome="Outro item"><label><span class="sr">Outro item</span><input name="item" placeholder="Não achou? Escreva o item aqui" autocomplete="off"></label><button type="submit">${ic('mais')}<span>Adicionar</span></button></form>
  </section>
  <form class="pedido-dados form" data-enviar>
    <h2>Dados para entrega</h2>
    <label>Estabelecimento<input name="estabelecimento" required autocomplete="organization"></label>
    <div class="form-2"><label>Seu nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
    <div class="form-2"><label>Tipo de negócio<select name="segmento"><option value="">Escolha</option>${segmentos.map(s => `<option>${s.nome}</option>`).join('')}<option>Consumidor</option><option>Outro</option></select></label><label>Bairro e cidade<input name="bairro" required></label></div>
    <label>Observações<textarea name="obs" rows="3" placeholder="Dia e horário de entrega, forma de pagamento..."></textarea></label>
    <div class="pedido-botoes"><button class="btn btn-zap" type="submit" data-canal="whatsapp">${ic('zap')} Enviar pelo WhatsApp</button><button class="btn btn-contorno" type="submit" data-canal="email">${ic('mail')} Enviar por e-mail</button></div>
    <p class="pequeno">A LacFrios confirma preços, disponibilidade e o dia da entrega pelo telefone ou WhatsApp.</p>
  </form>
</div>
<dialog class="dialogo" data-dialogo><form method="dialog"><h2>Pedido pronto</h2><p data-dialogo-txt></p><pre data-dialogo-msg></pre><div class="pedido-botoes"><button class="btn" value="ok">Entendi</button><button class="btn btn-contorno" type="button" data-copiar>Copiar texto</button></div></form></dialog>`;

const formSimples = (tipo) => tipo === 'cadastro' ? `
<form class="form" data-form>
  <div class="form-2"><label>Razão social<input name="razao" required autocomplete="organization"></label><label>CNPJ ou CPF<input name="doc" required inputmode="numeric"></label></div>
  <div class="form-2"><label>Nome fantasia<input name="fantasia"></label><label>Tipo de negócio<select name="segmento" required><option value="">Escolha</option>${segmentos.map(s => `<option>${s.nome}</option>`).join('')}<option>Outro</option></select></label></div>
  <label>Endereço de entrega<input name="endereco" required autocomplete="street-address"></label>
  <div class="form-2"><label>Bairro<input name="bairro" required></label><label>Cidade<input name="cidade" required value="Curitiba"></label></div>
  <div class="form-2"><label>Responsável pelas compras<input name="nome" required autocomplete="name"></label><label>Telefone ou WhatsApp<input name="tel" type="tel" required autocomplete="tel"></label></div>
  <label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>O que costuma comprar<textarea name="obs" rows="3" placeholder="Ex.: mussarela em peça toda semana, embutidos, molhos"></textarea></label>
  <button class="btn" type="submit">${ic('doc')} Enviar cadastro</button>
  <p class="form-ok" hidden>Prévia: no site publicado o cadastro chega à LacFrios por e-mail. Nada foi enviado.</p>
</form>` : `
<form class="form" data-form>
  <div class="form-2"><label>Nome<input name="nome" required autocomplete="name"></label><label>E-mail<input name="email" type="email" required autocomplete="email"></label></div>
  <div class="form-2"><label>Telefone<input name="tel" type="tel" autocomplete="tel"></label><label>Assunto<input name="assunto" required></label></div>
  <label>Mensagem<textarea name="msg" rows="5" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
  <p class="form-ok" hidden>Prévia: no site publicado a mensagem chega em ${E.email}. Nada foi enviado.</p>
</form>`;

const contatoInfo = () => `<ul class="contato-lista">
  ${E.telefones.map(t => `<li>${ic('tel')}<div><small>Telefone</small><a href="tel:${t.href}">${t.rotulo}</a></div></li>`).join('')}
  <li>${ic('tel')}<div><small>Celular</small><a href="tel:${E.celular.href}">${E.celular.rotulo}</a></div></li>
  <li>${ic('mail')}<div><small>E-mail</small><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><small>Loja</small>${E.endereco}, ${E.bairro}<br>${E.cidade} · CEP ${E.cep}<br><a href="${E.mapaLink}" target="_blank" rel="noopener">Abrir no mapa</a></div></li>
  <li>${ic('pessoa')}<div><small>Atendimento</small>${E.contatos}</div></li>
</ul>`;

const mapa = () => `<div class="mapa"><iframe src="${E.mapa}" title="Mapa: LacFrios, ${E.endereco}, ${E.bairro}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;

const receitaCompleta = r => `<article class="receita" id="${r.id}">
  <figure class="receita-foto"><img src="/assets/img/${r.img}.webp" alt="${esc(r.nome)}" width="${r.w}" height="${r.h}" loading="lazy"></figure>
  <div class="receita-txt">
    <h2>${r.nome}</h2><p class="receita-chamada">${r.chamada}</p>
    <div class="receita-cols"><div><h3>Ingredientes</h3><ul>${r.ingredientes.map(i => `<li>${i}</li>`).join('')}</ul></div>
    <div><h3>Modo de preparo</h3><ol>${r.preparo.map(i => `<li>${i}</li>`).join('')}</ol></div></div>
    <div class="receita-usa"><span>Na LacFrios:</span>${r.usa.map(id => btnAdd(prod(id), prod(id).nome, 'add add-chip')).join('')}</div>
  </div>
</article>`;

// =====================================================================
// VERSÃO A: "Balcão"
// =====================================================================
const A = {};
A.index = () => pagina('a', 'index', 'LacFrios · Frios, laticínios e conservas em Curitiba', 'Distribuidor de frios, laticínios e conservas desde 1999 no Portão, Curitiba. Atendemos hotéis, pizzarias, panificadoras, lanchonetes, restaurantes e supermercados.', `
<section class="a-hero">
  <div class="in a-hero-grid">
    <div class="a-hero-txt">
      <p class="eyebrow">Atacado e varejo · desde ${E.desde} no ${E.bairro}</p>
      <h1>Frios, laticínios e conservas para o seu negócio em Curitiba</h1>
      <p class="lead">${E.entrega}. Monte a lista de pedido aqui no site e mande pelo WhatsApp: a LacFrios confirma e entrega.</p>
      <div class="acoes"><a class="btn" href="/a/produtos/">${ic('lista')} Montar meu pedido</a><a class="btn btn-contorno" href="tel:${E.telefones[0].href}">${ic('tel')} ${E.telefones[0].rotulo}</a></div>
    </div>
    <div class="a-hero-arte">
      <div class="a-losango">${facetas()}<figure class="a-hero-foto">${foto('frios-prato', 'Frios fatiados', 1800, 1434, ' fetchpriority="high" loading="eager"')}</figure></div>
      <figure class="a-hero-mussa"><img src="/assets/prod/mussarela.webp" alt="Mussarela em peça" width="385" height="257"></figure>
      <p class="a-hero-selo"><b>${new Date().getFullYear() - E.desde}</b><span>anos no<br>${E.bairro}</span></p>
    </div>
  </div>
</section>

<section class="a-seg" aria-label="Quem atendemos">
  <div class="in"><p>Atendemos</p><ul>${segmentos.map(s => `<li><a href="/a/atendemos/#${s.id}">${s.nome}</a></li>`).join('')}</ul></div>
</section>

<section class="a-cat">
  <div class="in a-cat-grid">
    <div class="a-cat-intro">
      <p class="eyebrow">Nossos produtos</p>
      <h2>Tudo do balcão de frios num só fornecedor</h2>
      <p>${T.principais}</p>
      <p class="pequeno">Marcas na loja:</p>
      ${marcasHtml()}
      <a class="btn" href="/a/produtos/">Ver catálogo e montar lista ${ic('seta')}</a>
    </div>
    <ol class="a-cat-lista">
      ${categorias.map((c, i) => {
        const itens = porCat(c.id).filter(p => !p.livre);
        return `<li><a href="/a/produtos/#${c.id}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="a-cat-nome">${c.nome}</span><span class="a-cat-itens">${itens.length ? itens.map(p => p.nome).join(' · ') : c.texto}</span>${ic('seta')}</a></li>`;
      }).join('')}
    </ol>
  </div>
</section>

<section class="a-queijos">
  <div class="in a-queijos-grid">
    <figure class="a-queijos-foto">${foto('queijos-prateleira', 'Queijos em maturação na prateleira', 1024, 683)}</figure>
    <div class="a-queijos-txt">
      <p class="eyebrow">Laticínio</p>
      <h2>Doze queijos, do dia a dia aos especiais</h2>
      <p>${T.linhaQueijos}</p>
      <ul class="a-chips">${porCat('queijos').map(p => `<li>${btnAdd(p, p.nome, 'add add-chip')}</li>`).join('')}</ul>
      <p class="pequeno">Toque no queijo para colocar na lista de pedido.</p>
    </div>
  </div>
</section>

<section class="a-como">
  <div class="in">
    <p class="eyebrow eyebrow-claro">Como pedir</p>
    <h2>Da lista à porta do seu negócio</h2>
    <ol class="a-passos">
      <li><span class="a-passo-n">1</span><h3>Monte a lista</h3><p>Escolha os queijos, frios e itens de mercearia no catálogo, ou comece por uma lista pronta para o seu tipo de negócio.</p></li>
      <li><span class="a-passo-n">2</span><h3>Envie pelo WhatsApp</h3><p>A lista vai pronta, com quantidade e unidade. A LacFrios confirma preço e disponibilidade.</p></li>
      <li class="a-passo-kombi"><span class="a-passo-n">3</span><h3>Receba</h3><p>${E.entrega}. Quem preferir retira na loja da ${E.endereco}.</p><img src="/assets/img/kombi.png" alt="Kombi de entrega da LacFrios" width="328" height="204" loading="lazy"></li>
    </ol>
  </div>
</section>

<section class="a-negocios">
  <div class="in">
    <div class="a-titulo-linha"><div><p class="eyebrow">Para seu negócio</p><h2>Uma lista pronta para cada cozinha</h2></div><a class="link" href="/a/atendemos/">Ver todos ${ic('seta')}</a></div>
    <div class="a-mosaico">
      ${segmentos.map((s, i) => `<a class="a-mos a-mos-${i}" href="/a/atendemos/#${s.id}">${foto(s.foto, s.nome)}<span>${s.nome}</span></a>`).join('')}
    </div>
  </div>
</section>

<section class="a-fab">
  <div class="in a-fab-grid">
    <div><p class="eyebrow">Fábrica</p><h2>Mussarela da massa à peça</h2><p>Fotos da produção que estão no site da LacFrios: massa filada, embalagem a vácuo e a câmara fria com as peças prontas.</p><a class="link" href="/a/fabrica/">Ver a fábrica ${ic('seta')}</a></div>
    <div class="a-fab-fotos">${fabrica.slice(0, 4).map(f => `<figure>${foto(f.img, f.legenda, f.w, f.h)}</figure>`).join('')}</div>
  </div>
</section>

<section class="a-rec">
  <div class="in">
    <div class="a-titulo-linha"><div><p class="eyebrow">Receitas</p><h2>Para servir com os nossos queijos</h2></div><a class="link" href="/a/receitas/">Todas as receitas ${ic('seta')}</a></div>
    <div class="a-rec-grid">${receitas.map(r => `<a class="a-rec-item" href="/a/receitas/#${r.id}"><img src="/assets/img/${r.img}.webp" alt="${esc(r.nome)}" width="${r.w}" height="${r.h}" loading="lazy"><span><b>${r.nome}</b>${r.chamada}</span></a>`).join('')}</div>
  </div>
</section>

<section class="a-contato">
  <div class="in a-contato-grid">
    <div><h2>Venha conhecer nossa loja</h2><p>${E.endereco}, ${E.bairro} · ${E.cidade}</p>
      <div class="a-tels">${E.telefones.map(t => `<a href="tel:${t.href}">${t.rotulo}</a>`).join('')}<a href="tel:${E.celular.href}">${E.celular.rotulo}</a></div>
      <div class="acoes"><a class="btn btn-branco" href="/a/cadastro/">${ic('doc')} Cadastrar meu negócio</a><a class="btn btn-contorno-claro" href="/a/contato/">${ic('pin')} Como chegar</a></div>
    </div>
    ${mapa()}
  </div>
</section>`);

A.produtos = () => pagina('a', 'produtos', 'Produtos · LacFrios', 'Queijos, manteigas, requeijão, embutidos, congelados, enlatados, molhos, doces e secos. Monte sua lista de pedido.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Produtos</p>
  <h1>Produtos</h1>
  <p class="lead">${T.principais} Toque em <b>Adicionar</b> e a lista de pedido vai se formando; no fim, mande pelo WhatsApp.</p>
  <nav class="a-ancoras" aria-label="Categorias">${categorias.map(c => `<a href="#${c.id}">${c.nome}</a>`).join('')}</nav>
</div></section>
${categorias.map((c, i) => {
  const itens = porCat(c.id);
  const nomeados = itens.filter(p => !p.livre), livres = itens.filter(p => p.livre);
  return `<section class="a-prod ${i % 2 ? 'a-prod-inv' : ''}" id="${c.id}"><div class="in a-prod-grid">
    <figure class="a-prod-foto">${foto(c.foto, c.nome)}</figure>
    <div class="a-prod-txt"><p class="num">${String(i + 1).padStart(2, '0')}</p><h2>${c.nome}</h2><p>${c.texto}</p>
      ${nomeados.length ? `<ul class="a-itens">${nomeados.map(p => `<li>${p.img ? `<img src="/assets/prod/${p.img}.webp" alt="" width="94" height="50" loading="lazy">` : '<span class="a-item-sem"></span>'}<span>${p.nome}</span>${btnAdd(p)}</li>`).join('')}</ul>` : ''}
      ${livres.map(p => linhaLivre(p)).join('')}
    </div>
  </div></section>`;
}).join('')}
<section class="a-marcas-faixa"><div class="in"><h2>Marcas que você encontra na LacFrios</h2>${marcasHtml()}<p class="pequeno">Logos reproduzidos da página de produtos do site atual. Linha completa e preços: fale com a loja.</p></div></section>
<a class="a-flutua" href="/a/pedido/">${ic('lista')} Ver lista <b data-conta hidden>0</b></a>`);

A.atendemos = () => pagina('a', 'atendemos', 'Para seu negócio · LacFrios', 'Hotéis, pizzarias, panificadoras, lanchonetes, restaurantes, cachorro-quente e supermercados: listas prontas para começar o pedido.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Para seu negócio</p>
  <h1>Para seu negócio</h1>
  <p class="lead">A LacFrios atende hotéis, pizzarias, panificadoras, lanchonetes, restaurantes, cachorro-quente e supermercados. Escolha o seu e comece com uma lista pronta; depois é só ajustar as quantidades.</p>
</div></section>
<div class="a-segs">
${segmentos.map((s, i) => `<section class="a-segi ${i % 2 ? 'a-segi-inv' : ''}" id="${s.id}"><div class="in a-segi-grid">
  <figure>${foto(s.foto, s.nome)}</figure>
  <div><h2>${s.nome}</h2><p>${s.texto}</p>
    <p class="pequeno">Lista sugerida:</p><ul class="a-sug">${s.sugestao.map(id => `<li>${prod(id).nome}</li>`).join('')}</ul>
    ${usarLista(s)}
  </div>
</div></section>`).join('')}
</div>`);

A.fabrica = () => pagina('a', 'fabrica', 'Fábrica · LacFrios', 'Fotos da produção de mussarela: massa filada, embalagem a vácuo e câmara fria.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Fábrica</p>
  <h1>Fábrica</h1>
  <p class="lead">As fotos da página Fábrica do site da LacFrios: a mussarela da massa filada até a peça embalada e guardada na câmara fria.</p>
</div></section>
<section class="fab-galeria"><div class="in fab-grid">
  ${fabrica.map((f, i) => `<figure class="fab-${i}">${foto(f.img, f.legenda, f.w, f.h)}<figcaption><b>${String(i + 1).padStart(2, '0')}</b> ${f.legenda}</figcaption></figure>`).join('')}
</div></section>
<section class="a-contato a-contato-curto"><div class="in"><h2>Quer mussarela em peça para o seu negócio?</h2><div class="acoes">${btnAdd(prod('mussarela'), 'Colocar mussarela na lista', 'btn btn-branco')}<a class="btn btn-contorno-claro" href="/a/pedido/">Ver lista de pedido</a></div></div></section>`);

A.receitas = () => pagina('a', 'receitas', 'Receitas · LacFrios', 'Bruschettas e estufadinhos de queijo: receitas do site da LacFrios.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Receitas</p>
  <h1>Receitas</h1>
  <p class="lead">As receitas que a LacFrios publica para aproveitar os queijos da loja.</p>
</div></section>
<div class="in receitas">${receitas.map(receitaCompleta).join('')}</div>`);

A.cadastro = () => pagina('a', 'cadastro', 'Cadastro de cliente · LacFrios', 'Cadastre seu estabelecimento para comprar na LacFrios com entrega em Curitiba e Região Metropolitana.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Cadastro</p>
  <h1>Cadastro de cliente</h1>
  <p class="lead">Cadastre seu estabelecimento uma vez e peça sempre que precisar. ${E.entrega}.</p>
</div></section>
<section class="a-form"><div class="in a-form-grid">
  ${formSimples('cadastro')}
  <aside class="a-form-lado"><img src="/assets/img/kombi.png" alt="Kombi de entrega da LacFrios" width="328" height="204"><h2>Entrega com a Kombi da LacFrios</h2><p>${E.entrega}. Dúvidas no cadastro: <a href="tel:${E.telefones[0].href}">${E.telefones[0].rotulo}</a>.</p></aside>
</div></section>`);

A.contato = () => pagina('a', 'contato', 'Contato e localização · LacFrios', `${E.endereco}, ${E.bairro}, ${E.cidade}. Telefones ${E.telefones.map(t => t.rotulo).join(' e ')}.`, `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Contato</p>
  <h1>Contato e localização</h1>
  <p class="lead">Ligue, mande e-mail ou venha conhecer a loja no ${E.bairro}.</p>
</div></section>
<section class="a-form"><div class="in a-contato-pg">
  <div>${contatoInfo()}${mapa()}</div>
  <div><h2>Mande uma mensagem</h2>${formSimples('contato')}</div>
</div></section>`);

A.pedido = () => pagina('a', 'pedido', 'Lista de pedido · LacFrios', 'Revise sua lista de pedido e envie para a LacFrios pelo WhatsApp ou por e-mail.', `
<section class="a-pg-topo"><div class="in">
  <p class="trilha"><a href="/a/">Início</a> / Lista de pedido</p>
  <h1>Lista de pedido</h1>
  <p class="lead">Ajuste quantidade e unidade, preencha os dados de entrega e envie. A lista fica guardada neste aparelho até você enviar.</p>
</div></section>
<section class="a-form"><div class="in">${formPedido('a')}</div></section>`);

// =====================================================================
// VERSÃO B: "Pedido"
// =====================================================================
const B = {};
const painelLista = () => `<aside class="b-painel" aria-label="Sua lista de pedido">
  <div class="b-painel-topo"><h2>${ic('lista')} Sua lista</h2><b data-conta hidden>0</b></div>
  <div data-lista data-compacta class="lista lista-compacta"><p class="lista-vazia">Toque em + para colocar itens aqui.</p></div>
  <a class="btn btn-bloco" href="/b/pedido/">${ic('zap')} Revisar e enviar</a>
  <p class="pequeno">${ic('caminhao')} ${E.entrega}</p>
</aside>`;

const tabelaCat = (c, i) => {
  const itens = porCat(c.id);
  return `<section class="b-cat" id="${c.id}" data-cat>
  <header class="b-cat-topo"><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${c.nome}</h2><span class="b-cat-n">${itens.filter(p => !p.livre).length || ''}</span></header>
  <table class="b-tab"><thead><tr><th scope="col">Item</th><th scope="col">Linha</th><th scope="col"><span class="sr">Adicionar</span></th></tr></thead><tbody>
  ${itens.filter(p => !p.livre).map(p => `<tr data-busca="${esc((p.nome + ' ' + c.nome).toLowerCase())}"><th scope="row">${p.img ? `<img src="/assets/prod/${p.img}.webp" alt="" width="56" height="30" loading="lazy">` : '<span class="b-sem-foto"></span>'}${p.nome}</th><td>${c.nome}</td><td>${btnAdd(p, '', 'add add-ic')}</td></tr>`).join('')}
  ${itens.filter(p => p.livre).map(p => `<tr class="b-tab-livre" data-busca="${esc(c.nome.toLowerCase())}"><td colspan="3">${linhaLivre(p)}</td></tr>`).join('')}
  </tbody></table>
</section>`;
};

B.index = () => pagina('b', 'index', 'LacFrios · Distribuidor de frios, laticínios e conservas', 'Desde 1999 no Portão, Curitiba. Monte sua lista de pedido de queijos, frios e mercearia e envie pelo WhatsApp. Entregas em Curitiba e Região Metropolitana.', `
<section class="b-hero">
  <figure class="b-hero-foto">${foto('frios-prato', 'Frios fatiados', 1800, 1434, ' fetchpriority="high" loading="eager"')}</figure>
  <div class="b-hero-bloco">
    ${facetas('facetas facetas-b')}
    <p class="b-etiqueta">Desde ${E.desde} · ${E.bairro}, Curitiba</p>
    <h1>Frios, laticínios e conservas no atacado e no varejo</h1>
    <p>Para hotéis, pizzarias, panificadoras, lanchonetes, restaurantes, cachorro-quente e supermercados.</p>
    <form class="b-busca" action="/b/produtos/" role="search"><label><span class="sr">Buscar produto</span>${ic('busca')}<input name="q" placeholder="O que você precisa? Ex.: mussarela" autocomplete="off"></label><button class="btn btn-amarelo" type="submit">Buscar</button></form>
  </div>
</section>

<section class="b-faixa"><div class="in b-faixa-in">
  <span>${ic('caminhao')} ${E.entrega}</span><span>${ic('loja')} Loja: ${E.endereco}, ${E.bairro}</span><span>${ic('tel')} ${E.telefones.map(t => t.rotulo).join(' · ')}</span>
</div></section>

<section class="b-rapido"><div class="in">
  <div class="b-sec-topo"><div><p class="b-etiqueta b-etiqueta-esc">Pedido rápido</p><h2>Queijos e laticínios</h2></div><a class="link" href="/b/produtos/">Catálogo completo ${ic('seta')}</a></div>
  <div class="b-rapido-grid">
    <div class="b-rapido-cats">
      ${categorias.slice(0, 2).map((c, i) => tabelaCat(c, i)).join('')}
      <p class="b-mais">Também na loja: ${categorias.slice(2).map(c => `<a href="/b/produtos/#${c.id}">${c.nome}</a>`).join(', ')}.</p>
    </div>
    ${painelLista()}
  </div>
</div></section>

<section class="b-segs"><div class="in">
  <div class="b-sec-topo"><div><p class="b-etiqueta b-etiqueta-esc">Listas prontas</p><h2>Qual é o seu negócio?</h2></div><a class="link" href="/b/atendemos/">Ver todos ${ic('seta')}</a></div>
  <ul class="b-segs-lista">
    ${segmentos.map(s => `<li><a href="/b/atendemos/#${s.id}">${foto(s.foto, s.nome)}<span><b>${s.nome}</b><small>${s.sugestao.length} itens sugeridos</small></span></a></li>`).join('')}
  </ul>
</div></section>

<section class="b-entrega"><div class="in b-entrega-grid">
  <div class="b-entrega-kombi"><img src="/assets/img/kombi.png" alt="Kombi de entrega da LacFrios" width="328" height="204" loading="lazy"></div>
  <div>
    <h2>Pediu, a Kombi leva</h2>
    <ol class="b-passos"><li><b>Lista</b><span>Escolha os itens e as quantidades no site.</span></li><li><b>WhatsApp</b><span>A lista chega pronta para a LacFrios confirmar preço e dia.</span></li><li><b>Entrega</b><span>Em toda Curitiba e Região Metropolitana, ou retire na loja.</span></li></ol>
    <div class="acoes"><a class="btn" href="/b/cadastro/">${ic('doc')} Cadastrar meu negócio</a><a class="btn btn-contorno" href="/b/pedido/">${ic('lista')} Ver minha lista</a></div>
  </div>
</div></section>

<section class="b-marcas"><div class="in b-marcas-in"><h2>Marcas na loja</h2>${marcasHtml()}</div></section>

<section class="b-duo"><div class="in b-duo-grid">
  <a class="b-duo-item" href="/b/fabrica/">${foto('fab-filadeira', 'Massa filada saindo da máquina', 350, 233)}<span><small>Fábrica</small><b>Mussarela da massa à peça</b></span></a>
  <a class="b-duo-item" href="/b/receitas/">${foto('rec-bruschetta', 'Bruschettas', 352, 223)}<span><small>Receitas</small><b>Bruschettas e estufadinhos de queijo</b></span></a>
  <div class="b-duo-hist"><p class="b-etiqueta b-etiqueta-esc">Desde ${E.desde}</p><p>${T.historia} Atendemos ${segmentos.map(s => s.nome.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p><a class="link" href="/b/contato/">Endereço e telefones ${ic('seta')}</a></div>
</div></section>`);

B.produtos = () => pagina('b', 'produtos', 'Produtos · LacFrios', 'Catálogo da LacFrios: queijos, manteigas, requeijão, embutidos, congelados, enlatados, molhos, doces e secos. Monte a lista e envie.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Produtos</p>
  <h1>Catálogo</h1>
  <p class="lead">${T.principais}</p>
</div></section>
<section class="b-catalogo"><div class="in b-rapido-grid">
  <div>
    <div class="b-filtro">
      <label class="b-filtro-busca"><span class="sr">Buscar no catálogo</span>${ic('busca')}<input type="search" data-busca-input placeholder="Buscar: mussarela, requeijão, molhos..." autocomplete="off"></label>
      <nav class="b-filtro-cats" aria-label="Categorias">${categorias.map(c => `<a href="#${c.id}">${c.nome}</a>`).join('')}</nav>
    </div>
    <p class="b-sem" data-busca-vazio hidden>Nada com esse nome no catálogo. Escreva o item em "Outro item" na <a href="/b/pedido/">lista de pedido</a> que a LacFrios responde.</p>
    ${categorias.map((c, i) => tabelaCat(c, i)).join('')}
    <div class="b-marcas-linha"><h2>Marcas</h2>${marcasHtml()}</div>
  </div>
  ${painelLista()}
</div></section>`);

B.atendemos = () => pagina('b', 'atendemos', 'Para seu negócio · LacFrios', 'Listas prontas para hotéis, pizzarias, panificadoras, lanchonetes, restaurantes, cachorro-quente e supermercados.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Para seu negócio</p>
  <h1>Listas prontas por negócio</h1>
  <p class="lead">Escolha o seu tipo de negócio e coloque a lista sugerida no pedido com um toque. Depois ajuste as quantidades.</p>
  <nav class="b-filtro-cats" aria-label="Negócios">${segmentos.map(s => `<a href="#${s.id}">${s.nome}</a>`).join('')}</nav>
</div></section>
<div class="in b-segp">
${segmentos.map((s, i) => `<section class="b-segp-item" id="${s.id}">
  <figure>${foto(s.foto, s.nome)}</figure>
  <div class="b-segp-txt"><span class="num">${String(i + 1).padStart(2, '0')}</span><h2>${s.nome}</h2><p>${s.texto}</p></div>
  <div class="b-segp-lista"><h3>Lista sugerida</h3><ol>${s.sugestao.map(id => `<li>${prod(id).nome}</li>`).join('')}</ol>${usarLista(s)}</div>
</section>`).join('')}
</div>`);

B.fabrica = () => pagina('b', 'fabrica', 'Fábrica · LacFrios', 'Fotos da produção de mussarela: massa filada, embalagem a vácuo e câmara fria.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Fábrica</p>
  <h1>Fábrica</h1>
  <p class="lead">As fotos da página Fábrica do site da LacFrios, na ordem da produção da mussarela.</p>
</div></section>
<section class="fab-galeria fab-galeria-b"><div class="in fab-grid">
  ${fabrica.map((f, i) => `<figure class="fab-${i}">${foto(f.img, f.legenda, f.w, f.h)}<figcaption><b>${String(i + 1).padStart(2, '0')}</b> ${f.legenda}</figcaption></figure>`).join('')}
</div></section>
<section class="b-entrega b-entrega-curta"><div class="in"><h2>Mussarela em peça para o seu negócio</h2><div class="acoes">${btnAdd(prod('mussarela'), 'Colocar mussarela na lista', 'btn')}<a class="btn btn-contorno" href="/b/pedido/">Ver lista de pedido</a></div></div></section>`);

B.receitas = () => pagina('b', 'receitas', 'Receitas · LacFrios', 'Bruschettas e estufadinhos de queijo: receitas do site da LacFrios.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Receitas</p>
  <h1>Receitas</h1>
  <p class="lead">As receitas que a LacFrios publica para aproveitar os queijos da loja.</p>
</div></section>
<div class="in receitas receitas-b">${receitas.map(receitaCompleta).join('')}</div>`);

B.cadastro = () => pagina('b', 'cadastro', 'Cadastro de cliente · LacFrios', 'Cadastre seu estabelecimento para comprar na LacFrios com entrega em Curitiba e Região Metropolitana.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Cadastro</p>
  <h1>Cadastro de cliente</h1>
  <p class="lead">Cadastre seu estabelecimento uma vez e peça sempre que precisar.</p>
</div></section>
<section class="b-form"><div class="in b-form-grid">${formSimples('cadastro')}
  <aside class="b-form-lado"><img src="/assets/img/kombi.png" alt="Kombi de entrega da LacFrios" width="328" height="204"><p><b>${E.entrega}.</b></p><p>Dúvidas: <a href="tel:${E.telefones[0].href}">${E.telefones[0].rotulo}</a> ou <a href="mailto:${E.email}">${E.email}</a>.</p></aside>
</div></section>`);

B.contato = () => pagina('b', 'contato', 'Contato e localização · LacFrios', `${E.endereco}, ${E.bairro}, ${E.cidade}. Telefones ${E.telefones.map(t => t.rotulo).join(' e ')}.`, `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Contato</p>
  <h1>Contato e localização</h1>
  <p class="lead">Ligue, mande e-mail ou venha à loja no ${E.bairro}.</p>
</div></section>
<section class="b-form"><div class="in b-contato-pg">
  <div>${contatoInfo()}</div>
  <div>${mapa()}</div>
  <div class="b-contato-msg"><h2>Mensagem</h2>${formSimples('contato')}</div>
</div></section>`);

B.pedido = () => pagina('b', 'pedido', 'Lista de pedido · LacFrios', 'Revise sua lista de pedido e envie para a LacFrios pelo WhatsApp ou por e-mail.', `
<section class="b-pg-topo"><div class="in">
  <p class="trilha"><a href="/b/">Início</a> / Lista de pedido</p>
  <h1>Lista de pedido</h1>
  <p class="lead">Ajuste quantidade e unidade, preencha os dados e envie. A lista fica guardada neste aparelho até você enviar.</p>
</div></section>
<section class="b-form"><div class="in">${formPedido('b')}</div></section>`);

export function gerarVersao(v) {
  const V = v === 'a' ? A : B;
  return Object.fromEntries(['index', 'produtos', 'atendemos', 'fabrica', 'receitas', 'cadastro', 'contato', 'pedido'].map(s => [s, V[s]()]));
}
