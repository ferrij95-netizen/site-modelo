// Mepel Máquinas e Equipamentos (Estação/RS, desde 1966): implementos agrícolas e rodoviários, linha pecuária Produfort, plantio e tanques para produtos perigosos.
// node clientes/mepel/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mepel https://mepel.ind.br/)
// 56 produtos com textos, renders e folhetos do site atual (páginas /produto/). Fotos da nova fábrica e dos 60 anos vêm do blog. Logo: SVG original do site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const PR = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Mepel', legal: 'Mepel Máquinas e Equipamentos Ltda.', url: 'https://mepel.overtus.com.br/', antigo: 'https://mepel.ind.br/',
  fone: '(54) 3337-3700', foneHref: 'tel:+555433373700', fone2: '(54) 3334-1099', fone2Href: 'tel:+555433341099',
  email: 'mepel@mepel.ind.br',
  end: 'Rua Fiorelo Piazzetta, 327', cidade: 'Estação/RS', cep: '99930-000',
  insta: 'https://www.instagram.com/mepel.maquinas/', face: 'https://www.facebook.com/mepel.maquinas/',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const LINHAS = [
  { slug: 'linha-agricola', n: 'Linha agrícola', curto: 'Agrícola', t: 'Abastecedores de pulverizador, incorporadores de defensivos, Max Calda, distribuidores de adubo orgânico e calcário, tanques combate incêndio e vagões.', capa: ['abastecedor-de-pulverizador', 'max-calda'] },
  { slug: 'linha-pecuaria-produfort', n: 'Linha pecuária Produfort', curto: 'Pecuária', t: 'Desensiladeiras, vagões desensiladores e misturadores Produmixer, misturador de compost barn e triturador de cama de aviário.', capa: ['vagao-misturador-tratador-produmixer-pro', 'desensiladeira-md-600'] },
  { slug: 'linha-plantio', n: 'Linha plantio', curto: 'Plantio', t: 'Semeadoras múltiplas SMP para grãos graúdos, grãos finos e pastagens, e plantadeira hidráulica PHM.', capa: ['semeadora-multipla-smp-25-11', 'plantadeira-hidraulica-phm'] },
  { slug: 'linha-rodoviaria', n: 'Linha rodoviária', curto: 'Rodoviária', t: 'Tanques montados em caminhão: combate incêndio, abastecedores de pulverizador, distribuidores de adubo orgânico e de vinhoto.', capa: [] },
  { slug: 'tanques-para-produtos-perigosos', n: 'Tanques para produtos perigosos', curto: 'Produtos perigosos', t: 'Tanques rodoviários certificados para transporte de combustível e para saneamento.', capa: [] },
];
const doCat = c => PR.filter(p => p.cat === c);
for (const l of LINHAS) if (!l.capa.length) l.capa = doCat(l.slug).slice(0, 2).map(p => p.slug);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  ...LINHAS.slice(0, 4).map(l => ({ slug: l.slug, n: l.curto })),
  { slug: 'pos-venda', n: 'Pós-venda' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Linhas', b: '60 anos' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Mepel | Implementos agrícolas e rodoviários desde 1966' : `${titulo} | Mepel`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#003365' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.svg" alt="Mepel Máquinas e Equipamentos" width="300" height="61">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Tecnologia a serviço da terra</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mepel, página inicial">${marca(v === 'b')}</a>
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
      <p>Implementos agrícolas e equipamentos rodoviários desde 1966, com mais de 500 revendas em todo o Brasil. Fábrica em Estação/RS.</p></div>
    <div><h3>Produtos</h3><ul>${LINHAS.map(l => `<li><a href="${link(v, l.slug)}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span>Mepel <a href="${E.foneHref}">${E.fone}</a><br>Produfort <a href="${E.fone2Href}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
    <div><h3>Mepel</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'pos-venda')}">Pós-venda e peças</a></li>
      <li><a href="${E.insta}" ${ext}>Instagram</a> · <a href="${E.face}" ${ext}>Facebook</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Estação/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.foneHref}" aria-label="Ligar para a Mepel">${ic('tel')}</a>
</body>
</html>`;
}

const catalogo = lista => `<ul class="catal">${lista.map(p => `<li class="sobe" id="${p.slug}"><a class="f" href="/assets/img/${p.slug}.webp" data-foto="${esc(p.nome)}">${img(p.slug, p.nome)}</a><div><h3>${p.nome}</h3><p>${p.texto[0]}</p>${p.texto[1] ? `<p>${p.texto[1]}</p>` : ''}<a class="mais" href="mailto:${E.email}?subject=${encodeURIComponent(`Orçamento: ${p.nome}`)}">Solicitar orçamento ${ic('seta')}</a>${p.folheto ? `<a class="folheto" href="${p.folheto}" ${ext}>Baixar folheto (PDF)</a>` : ''}</div></li>`).join('')}</ul>`;
const linhas = v => `<ul class="linhas4 linhas5">${LINHAS.map(l => `<li class="sobe"><a href="${link(v, l.slug)}"><span class="l-img">${l.capa.map(c => img(c, PR.find(p => p.slug === c).nome)).join('')}</span><span class="l-txt"><b>${l.n}</b><span>${l.t}</span><i>${doCat(l.slug).length} ${doCat(l.slug).length > 1 ? 'produtos' : 'produto'} ${ic('seta')}</i></span></a></li>`).join('')}</ul>`;
const numeros = () => `<ul class="numeros4">
  <li class="sobe"><b>1966</b><span>fundação em Estação/RS</span></li>
  <li class="sobe"><b>60 anos</b><span>unindo o amor pela terra e a tecnologia</span></li>
  <li class="sobe"><b>500+</b><span>revendas em todo o Brasil</span></li>
  <li class="sobe"><b>${PR.length}</b><span>produtos em 5 linhas</span></li>
</ul>`;
const historia = () => `<p>A Mepel foi fundada em 1966 e sua história foi construída unindo o amor pela terra e a tecnologia. Produz implementos agrícolas e equipamentos rodoviários para os segmentos agrícola, pecuário, florestal, canavieiro, rodoviário e de construção.</p>
  <p>É referência nacional na fabricação de tanques distribuidores e de equipamentos customizados conforme a necessidade do cliente, e atua em todo o território nacional por meio de uma rede com mais de 500 revendas.</p>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Fale com a Mepel.</h2>
  <p>Orçamentos, revenda mais próxima e equipamentos customizados para a sua propriedade.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.foneHref}">${ic('tel')} ${E.fone}</a><a class="btn btn-linha" href="mailto:${E.email}">E-mail</a></div>
</div></section>`;
const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Mepel: fundada em 1966 em Estação/RS, referência nacional em tanques distribuidores, com mais de 500 revendas e nova fábrica.') + topo(v, 'empresa') +
  cabPag('Um pouco da nossa história', 'Tecnologia a serviço da terra, desde 1966.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1966')}<h2>Amor pela terra e tecnologia</h2>${historia()}</div>
  <figure class="sobe">${img('nova-fabrica', 'Nova fábrica da Mepel vista do alto')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Portfólio')}<h2>Mepel e Produfort</h2>
  <p>Na linha agrícola e rodoviária Mepel destacam-se os tanques distribuidores, os equipamentos de combate a incêndio, os abastecedores de pulverizador e os incorporadores de defensivos. Na linha Produfort, marca adquirida pela Mepel, destacam-se as semeadoras múltiplas, no plantio, e as desensiladeiras, na pecuária.</p>
  ${checks(['Longa vida útil, robustos e versáteis', 'Fácil operação', 'Baixo custo de manutenção', 'Baixa incidência de parada'])}</div>
  <figure class="sobe">${img('fabrica-produtos', 'Equipamentos Mepel na nova fábrica')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <ul class="cards3">
    <li class="sobe"><h3>Missão</h3><p>Desenvolver máquinas e equipamentos com excelência, buscando satisfazer o cliente e os colaboradores, priorizando a simplicidade aliada à tecnologia, visando sempre a qualidade e a melhoria contínua.</p></li>
    <li class="sobe"><h3>Nova fábrica</h3><p>Aos 60 anos, a Mepel inaugurou uma nova fábrica que amplia a capacidade produtiva e fortalece o compromisso com a comunidade de Estação.</p></li>
    <li class="sobe"><h3>Feiras</h3><p>Presença nas maiores feiras do agronegócio brasileiro, como o Show Rural Coopavel, onde lançou o ABAPU Max Calda.</p></li>
  </ul>
</div></section>
${img('fabrica-interna', 'Interior da nova fábrica Mepel', ' class="banda"')}` + chamada(v) + rodape(v);
}

function linhaPag(v, l) {
  const lista = doCat(l.slug);
  return head(v, l.slug, l.n, `${l.n} Mepel: ${lista.map(p => p.nome).join(', ')}.`.slice(0, 158)) + topo(v, l.slug) +
  cabPag(l.n, l.t) + `
<section class="sec"><div class="in">
  ${catalogo(lista)}
</div></section>` + chamada(v) + rodape(v);
}

function posVenda(v) {
  return head(v, 'pos-venda', 'Pós-venda', 'Pós-venda Mepel: entrega em frota própria, entrega técnica, assistência técnica ágil e peças de reposição.') + topo(v, 'pos-venda') +
  cabPag('Pós-venda', 'Satisfação antes e depois da compra.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Compromisso Mepel')}<h2>A qualidade vai além do produto</h2>
  <p>A Mepel dedica atenção e agilidade a todas as etapas depois da venda, para assegurar o desempenho e a durabilidade dos seus equipamentos.</p></div>
  <ul class="passos">
    <li class="sobe"><b>Frota própria</b><span>Os equipamentos são entregues em frota própria e chegam em perfeitas condições.</span></li>
    <li class="sobe"><b>Entrega técnica</b><span>Conhecimento detalhado e a melhor performance do equipamento adquirido.</span></li>
    <li class="sobe"><b>Assistência técnica</b><span>Ágil e eficiente, para o equipamento voltar à atividade o mais rápido possível.</span></li>
    <li class="sobe"><b>Peças de reposição</b><span>Informe os dados da plaqueta de identificação. Mepel ${E.fone}, Produfort ${E.fone2}.</span></li>
  </ul>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Fiorelo Piazzetta, 327, Estação - RS');
  return head(v, 'contato', 'Contato', 'Mepel: (54) 3337-3700, Produfort (54) 3334-1099, mepel@mepel.ind.br. Rua Fiorelo Piazzetta, 327, Estação/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Orçamentos, revendas e assistência técnica.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Mepel<br><a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${ic('tel')}<span>Produfort (peças)<br><a href="${E.fone2Href}">${E.fone2}</a></span></li>
    <li>${ic('mail')}<span>E-mail<br><a href="mailto:${E.email}">${E.email}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li></ul>
    <p class="ha-acoes"><a class="btn" href="${E.foneHref}">${ic('tel')} Ligar</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} E-mail</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da Mepel em Estação/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  const dest = ['abapu-max-calda', 'vagao-misturador-tratador-produmixer-pro-duo', 'semeadora-multipla-smp-17-07', 'distribuidor-de-calcario-dicater', 'carreta-tanque-combate-incendio', 'incorporador-de-defensivos-mepel-idm-max'].map(s => PR.find(p => p.slug === s)).filter(Boolean);
  return head(v, 'index', '', 'Mepel, Estação/RS: tanques distribuidores, abastecedores de pulverizador, Max Calda, vagões Produmixer e semeadoras. Desde 1966.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Estação/RS · desde 1966')}
      <h1>Tecnologia <em>a serviço da terra.</em></h1>
      <p class="ha-sub">Implementos agrícolas e equipamentos rodoviários robustos, versáteis e de fácil operação, com mais de 500 revendas no Brasil.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'linha-agricola')}">Ver produtos</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></p>
    </div>
    <div class="ha-prod">${imgTopo('abapu-max-calda', 'ABAPU Max Calda Mepel')}<span class="ha-tag"><b>${PR.length} produtos</b>em 5 linhas</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}60 anos</span><span>${ic('check')}500+ revendas</span><span>${ic('check')}Entrega em frota própria</span><span>${ic('check')}Assistência técnica</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas de produto')}<h2>Do plantio ao trato dos animais</h2></div>
  ${linhas(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Destaques')}<h2>Equipamentos Mepel</h2></div>
  ${catalogo(dest)}
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Nova fábrica')}<h2>60 anos e pronta para crescer</h2>${historia()}
  <p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('nova-fabrica', 'Nova fábrica da Mepel em Estação/RS')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Mepel: 60 anos fabricando implementos agrícolas e rodoviários em Estação/RS. Referência nacional em tanques distribuidores.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('sessenta-anos', 'Colaboradores formam o número 60 em frente à fábrica da Mepel')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Mepel · Estação/RS')}
    <h1>60 anos <em>de tecnologia a serviço da terra.</em></h1>
    <p class="hb-sub">Referência nacional em tanques distribuidores e equipamentos customizados conforme a necessidade de cada cliente.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'linha-agricola')}">Ver produtos</a><a class="btn btn-linha" href="${link(v, 'empresa')}">Nossa história</a></p>
    <div class="hb-selo"><div><b>1966</b><span>fundação</span></div><div><b>500+</b><span>revendas</span></div><div><b>${PR.length}</b><span>produtos</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas de produto')}<h2>Agrícola, pecuária, plantio e rodoviária</h2></div>
  ${linhas(v)}
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Pulverização')}<h2>Calda pronta, pulverizador sempre trabalhando</h2></div>
  <ul class="operacoes">
    <li class="sobe"><b>Transportar água</b><span>Abastecedores de pulverizador ABAPU com bomba lobular de baixa rotação e alta vazão.</span></li>
    <li class="sobe"><b>Preparar a calda</b><span>Incorporadores de defensivos IDM 200, IDM Max e IDM Max D.</span></li>
    <li class="sobe"><b>Guardar calda pronta</b><span>Reservatórios Max Calda, Max Calda ECO e Bio Calda para biológicos.</span></li>
    <li class="sobe"><b>Tudo junto</b><span>ABAPU Max Calda: tanque de água, reservatório de calda e IDM Max no mesmo equipamento.</span></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Pós-venda')}<h2>Satisfação antes e depois da compra</h2>
  <p>Entrega em frota própria, entrega técnica e assistência ágil, para o equipamento voltar a trabalhar o mais rápido possível.</p>
  <p><a class="link-seta" href="${link(v, 'pos-venda')}">Pós-venda e peças ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('fabrica-produtos', 'Equipamentos Mepel prontos na fábrica')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => {
  const o = { index: inicio(), empresa: empresa(v), 'pos-venda': posVenda(v), contato: contato(v) };
  for (const l of LINHAS) o[l.slug] = linhaPag(v, l);
  return o;
};

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Mepel', artigo: 'da', url: E.url, lang: 'pt', cor: '#003365', fundo: '#0b1f36', claro: '#f1f3f5',
  fonteTitulo: "'Red Hat Display',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 9, texto: `Clara, abre com o ABAPU Max Calda e organiza os ${PR.length} produtos em 5 linhas, com folheto de cada um.`, pontos: ['Catálogo completo', 'Folhetos em PDF', 'Pós-venda'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 9, texto: 'Azul-marinho, abre com a foto dos 60 anos em frente à fábrica e explica a linha de pulverização.', pontos: ['Foto dos 60 anos', 'Pulverização etapa por etapa', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
