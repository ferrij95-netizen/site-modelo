// Monttar Agro (Monttar Agro Indústria Agrícola, Carazinho/RS): implementos agrícolas. Rolos faca, plainas, raspadeiras, roçadeiras, lascadores e guinchos.
// node clientes/monttar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs monttar https://monttaragro.com.br/)
// Fotos de produto, capa com o rolo faca no campo, fotos da equipe e logo vêm do site atual. Os textos "lorem ipsum" do site antigo
// foram trocados por descrições da função de cada implemento; banners com texto embutido e fotos de banco foram descartados.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const PR = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Monttar Agro', legal: 'Monttar Agro Indústria Agrícola Ltda.', url: 'https://monttar.overtus.com.br/', antigo: 'https://monttaragro.com.br/',
  cel: '(54) 99147-5004', celHref: 'tel:+5554991475004',
  wa: 'https://api.whatsapp.com/send?phone=5554991475004', email: 'comercial@monttaragro.com.br',
  end: 'Rua Castelar Martinês, 200, Distrito Industrial', cidade: 'Carazinho/RS', cep: '99500-000',
  insta: 'https://www.instagram.com/monttaragrobr/',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const LINHAS = [
  { slug: 'preparo-do-solo', n: 'Preparo do solo', t: 'Rolos faca, arado subsolador e enleirador para manejar a palhada e deixar o solo pronto para o plantio.', capa: ['sabre-7-e-sabre-9', 'arado-subsolador'] },
  { slug: 'nivelamento', n: 'Nivelamento e terraplanagem', t: 'Raspadeira, plainas, plataforma e raspo para nivelar terrenos, recuperar estradas e mover terra na propriedade.', capa: ['raspadeira-scraper', 'plaina-attac-5'] },
  { slug: 'rocadeiras', n: 'Roçadeiras', t: 'Roçadeiras reforçadas para pomares, capoeiras, pastagens e beiras de estrada.', capa: ['najja-1-5-artic', 'rocadeira-agricola'] },
  { slug: 'lenha-e-carga', n: 'Lenha e carga', t: 'Lascadores de lenha e guinchos acoplados ao trator para o trabalho do dia a dia.', capa: ['lascador-hidraulico', 'guincho-terceiro-ponto'] },
];
const doCat = c => PR.filter(p => p.cat === c);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Quem somos' },
  { slug: 'preparo-do-solo', n: 'Preparo do solo' },
  { slug: 'nivelamento', n: 'Nivelamento' },
  { slug: 'rocadeiras', n: 'Roçadeiras' },
  { slug: 'lenha-e-carga', n: 'Lenha e carga' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Implementos', b: 'Força no campo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:ital,wdth,wght@0,100..125,600..800;1,100..125,600..800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Monttar Agro | Implementos agrícolas em Carazinho/RS' : `${titulo} | Monttar Agro`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1255b6' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.webp" alt="Monttar Agro, força no campo" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Força, eficiência e resultado na sua lavoura</span><span class="tb-dir"><a href="${E.wa}" ${ext}>${icWa()}${E.cel}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Monttar Agro, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
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
    <div class="rod-marca"><span class="marca">${marca(true)}</span>
      <p>Desenvolvimento e comercialização de implementos agrícolas robustos, de alta durabilidade e desempenho. Fábrica no Distrito Industrial de Carazinho/RS.</p></div>
    <div><h3>Implementos</h3><ul>${LINHAS.map(l => `<li><a href="${link(v, l.slug)}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
    <div><h3>Monttar</h3><ul>
      <li><a href="${link(v, 'empresa')}">Quem somos</a></li>
      <li><a href="${E.insta}" ${ext}>Instagram @monttaragrobr</a></li>
      <li><a href="${link(v, 'contato')}">Fale conosco</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Carazinho/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da Monttar Agro">${icWa()}</a>
</body>
</html>`;
}

const fotoProd = p => p.semFoto
  ? `<a class="f sem-foto" href="${E.wa}&text=${encodeURIComponent(`Olá! Quero fotos e orçamento do ${p.nome}.`)}" ${ext} aria-label="Pedir fotos do ${esc(p.nome)}"><img src="/assets/favicon.png" alt="" width="128" height="128" loading="lazy"></a>`
  : `<a class="f" href="/assets/img/${p.slug}.webp" data-foto="${esc(p.nome)}">${img(p.slug, p.nome)}</a>`;
const catalogo = lista => `<ul class="catal">${lista.map(p => `<li class="sobe" id="${p.slug}">${fotoProd(p)}<div><h3>${p.nome}</h3><p>${p.texto}</p><a class="mais" href="${E.wa}&text=${encodeURIComponent(`Olá! Quero um orçamento do ${p.nome}.`)}" ${ext}>Solicitar orçamento ${ic('seta')}</a></div></li>`).join('')}</ul>`;
const linhas4 = v => `<ul class="linhas4">${LINHAS.map(l => `<li class="sobe"><a href="${link(v, l.slug)}"><span class="l-img">${l.capa.map(c => img(c, PR.find(p => p.slug === c).nome)).join('')}</span><span class="l-txt"><b>${l.n}</b><span>${l.t}</span><i>${doCat(l.slug).length} implementos ${ic('seta')}</i></span></a></li>`).join('')}</ul>`;
const quem = () => `<p>A Monttar Agro Indústria Agrícola é especializada no desenvolvimento e na comercialização de implementos agrícolas, com soluções eficientes e inovadoras para o agronegócio.</p>
  <p>Com atuação voltada para a produtividade no campo, entrega equipamentos robustos, de alta durabilidade e desempenho, pensados para as reais necessidades do produtor. O compromisso vai além da venda: parcerias sólidas, baseadas em confiança, qualidade e suporte técnico especializado.</p>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Condições direto de fábrica.</h2>
  <p>Fale com a equipe da Monttar e encontre o implemento certo para a sua operação.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Falar no WhatsApp</a><a class="btn btn-linha" href="mailto:${E.email}">E-mail</a></div>
</div></section>`;
const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Quem somos', 'Monttar Agro Indústria Agrícola: implementos agrícolas robustos, desenvolvidos e fabricados em Carazinho/RS.') + topo(v, 'empresa') +
  cabPag('Quem somos', 'Força no campo.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Monttar Agro')}<h2>Implementos para quem produz</h2>${quem()}
  <p>Ao longo da trajetória, a Monttar consolidou presença no mercado com atendimento próximo e personalizado, entendendo cada cliente e oferecendo soluções sob medida.</p></div>
  <figure class="sobe">${img('equipe-fabrica', 'Equipe da Monttar Agro em frente à fábrica em Carazinho')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <ul class="cards3">
    <li class="sobe"><h3>Missão</h3><p>Desenvolver soluções que alavanquem a produção, a fim de auxiliar na segurança alimentar por meio dos nossos produtos.</p></li>
    <li class="sobe"><h3>Visão</h3><p>Servir ao agronegócio mundial com tecnologias, produtos e informações, contribuindo na nobre missão de alimentar o mundo.</p></li>
    <li class="sobe"><h3>Valores</h3><p>Foco em soluções para os clientes, ética nas relações, crescimento gradual e longevidade, evolução contínua.</p></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Mecanização')}<h2>Acreditamos no agro brasileiro</h2>
  <p>A tecnologia e a mecanização são fundamentais para impulsionar resultados no campo. É isso que guia cada implemento que sai da fábrica de Carazinho.</p>
  ${checks(['Equipamentos robustos e de alta durabilidade', 'Atendimento próximo e personalizado', 'Suporte técnico especializado', 'Condições direto de fábrica'])}</div>
  <figure class="sobe">${img('equipe-feira', 'Equipe Monttar Agro em evento do agronegócio')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function linhaPag(v, l) {
  const lista = doCat(l.slug);
  return head(v, l.slug, l.n, `${l.n} Monttar Agro: ${lista.map(p => p.nome).join(', ')}.`.slice(0, 158)) + topo(v, l.slug) +
  cabPag(l.n, l.t) + `
<section class="sec"><div class="in">
  ${catalogo(lista)}
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Castelar Martinês, 200, Carazinho - RS');
  return head(v, 'contato', 'Contato', 'Monttar Agro: WhatsApp (54) 99147-5004, comercial@monttaragro.com.br. Rua Castelar Martinês, 200, Distrito Industrial, Carazinho/RS.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Orçamentos, condições de fábrica e informações sobre os implementos.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${icWa()}<span>WhatsApp comercial<br><a href="${E.wa}" ${ext}>${E.cel}</a></span></li>
    <li>${ic('mail')}<span>E-mail<br><a href="mailto:${E.email}">${E.email}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li></ul>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} E-mail</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da Monttar Agro em Carazinho/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  const dest = ['raspadeira-scraper', 'plaina-attac-5', 'najja-1-5-artic', 'sabre-3-e-sabre-4', 'plataforma-basculante', 'lascador-hidraulico'].map(s => PR.find(p => p.slug === s));
  return head(v, 'index', '', 'Monttar Agro, Carazinho/RS: rolos faca, raspadeiras, plainas, roçadeiras, lascadores de lenha e guinchos. Condições direto de fábrica.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Implementos agrícolas · Carazinho/RS')}
      <h1>Força <em>no campo.</em></h1>
      <p class="ha-sub">Rolos faca, raspadeiras, plainas, roçadeiras, lascadores e guinchos robustos, feitos para a rotina do produtor rural.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'nivelamento')}">Ver implementos</a></p>
    </div>
    <div class="ha-prod">${imgTopo('raspadeira-scraper', 'Raspadeira agrícola Scraper Monttar')}<span class="ha-tag"><b>${PR.length} implementos</b>em 4 linhas</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Direto de fábrica</span><span>${ic('check')}Equipamentos robustos</span><span>${ic('check')}Suporte técnico</span><span>${ic('check')}Atendimento próximo</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas')}<h2>O implemento certo para cada operação</h2></div>
  ${linhas4(v)}
</div></section>
<section class="hero-campo">${img('rolo-faca-campo', 'Rolo faca Monttar trabalhando na lavoura')}</section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Destaques')}<h2>Implementos Monttar</h2></div>
  ${catalogo(dest)}
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}<h2>Parceria que vai além da venda</h2>${quem()}
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Monttar ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('equipe-fabrica', 'Equipe da Monttar Agro na fábrica')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Monttar Agro: implementos agrícolas robustos fabricados em Carazinho/RS. Rolos faca Sabre, plainas Attac, raspadeira Scraper e roçadeiras.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('rolo-faca-campo', 'Rolo faca Sabre 9.0 da Monttar na lavoura')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Monttar Agro · Carazinho/RS')}
    <h1>Força, eficiência <em>e resultado.</em></h1>
    <p class="hb-sub">Implementos agrícolas desenvolvidos para as reais necessidades do produtor, com condições direto de fábrica.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'preparo-do-solo')}">Rolos faca</a></p>
    <div class="hb-selo"><div><b>${PR.length}</b><span>implementos</span></div><div><b>4</b><span>linhas</span></div><div><b>RS</b><span>fábrica em Carazinho</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas de implementos')}<h2>Preparo, nivelamento, roçagem e carga</h2></div>
  ${linhas4(v)}
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Do plantio à manutenção')}<h2>Um implemento para cada etapa</h2></div>
  <ul class="operacoes">
    <li class="sobe"><b>Manejar a palhada</b><span>Rolos faca Sabre 3.0, 4.0, 7.0 e 9.0 para plantas de cobertura.</span></li>
    <li class="sobe"><b>Nivelar e drenar</b><span>Raspadeira Scraper e plainas Attac para terrenos, taipas, valetas e estradas.</span></li>
    <li class="sobe"><b>Roçar</b><span>Najja 1.5 Artic articulada e roçadeira agrícola para pomares e pastagens.</span></li>
    <li class="sobe"><b>Mover e rachar</b><span>Guinchos, plataforma e lascadores de lenha acoplados ao trator.</span></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Missão')}<h2>Ajudar a alimentar o mundo</h2>
  <p>Desenvolver soluções que alavanquem a produção, a fim de auxiliar na segurança alimentar por meio dos nossos produtos.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Quem somos ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('equipe-fabrica', 'Equipe da Monttar Agro em Carazinho')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => {
  const o = { index: inicio(), empresa: empresa(v), contato: contato(v) };
  for (const l of LINHAS) o[l.slug] = linhaPag(v, l);
  return o;
};

copiarSiteJs(pub, '5554991475004');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Monttar Agro', artigo: 'da', url: E.url, lang: 'pt', cor: '#1255b6', fundo: '#141516', claro: '#f1f3f5',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: `Clara, abre com a raspadeira Scraper e organiza os ${PR.length} implementos em 4 linhas.`, pontos: ['Catálogo com orçamento por implemento', 'Uma página por linha', 'Sem textos de exemplo'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Preta e azul, abre com o rolo faca trabalhando na lavoura.', pontos: ['Foto de campo em tela cheia', 'Um implemento por etapa', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
