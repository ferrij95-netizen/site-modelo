// JP Embalagens (Pellizzari Embalagens, Caxias do Sul/RS, desde 1987): caixas de papelão ondulado sob medida.
// node clientes/jpembalagens/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs jpembalagens https://www.jpembalagens.com.br/)
// Textos, logo, renders das caixas e fotos aéreas da fábrica vêm do site atual. O fundo do slide antigo era banco de imagem: descartado.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'JP Embalagens', legal: 'Pellizzari Embalagens Ltda.', url: 'https://jpembalagens.overtus.com.br/', antigo: 'https://www.jpembalagens.com.br/',
  fone: '(54) 3227-1722', foneHref: 'tel:+555432271722', fone2: '(54) 3227-1711', fone2Href: 'tel:+555432271711', cel: '(54) 99998-1711',
  wa: 'https://api.whatsapp.com/send?phone=5554999981711', email: 'vendas@jpembalagens.com.br',
  end: 'Rua Alice Cestari Mantovani, 750, Distrito Industrial', cidade: 'Caxias do Sul/RS',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'produtos', n: 'Caixas' },
  { slug: 'setores', n: 'Setores' },
  { slug: 'empresa', n: 'A JP' },
  { slug: 'contato', n: 'Cotação e contato' },
];
export const nomesVersao = { a: 'Sob medida', b: 'Proteção' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'JP Embalagens | Caixas de papelão sob medida em Caxias do Sul' : `${titulo} | JP Embalagens`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#4d7a13' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.webp" alt="JP Embalagens" width="520" height="81">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Caixas de papelão ondulado sob medida desde 1987</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${E.wa}" ${ext}>${icWa()}${E.cel}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="JP Embalagens, página inicial">${marca(v === 'b')}</a>
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
      <p>Embalagens de papelão ondulado na medida certa para a sua empresa. Fábrica de 7.500 m² no Distrito Industrial de Caxias do Sul/RS.</p></div>
    <div><h3>Caixas</h3><ul>
      <li><a href="${link(v, 'produtos')}#normal">Caixa normal</a></li>
      <li><a href="${link(v, 'produtos')}#envoltorio">Envoltório</a></li>
      <li><a href="${link(v, 'produtos')}#corte-e-vinco">Corte e vinco</a></li>
      <li><a href="${link(v, 'produtos')}#outros">Outros itens</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a> · <a href="${E.fone2Href}">${E.fone2}</a></span></li>
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>A JP</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'setores')}">Setores atendidos</a></li>
      <li><a href="${link(v, 'contato')}">Pedir cotação</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal} · CNPJ 19.181.925/0001-04</span><span>Caxias do Sul/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da JP Embalagens">${icWa()}</a>
</body>
</html>`;
}

const numeros = () => `<ul class="numeros4">
  <li class="sobe"><b>1987</b><span>fundada em Caxias do Sul</span></li>
  <li class="sobe"><b>35+</b><span>anos fazendo embalagens</span></li>
  <li class="sobe"><b>7.500 m²</b><span>de área fabril</span></li>
  <li class="sobe"><b>300 t</b><span>de caixas de papelão por mês</span></li>
</ul>`;
const CAIXAS = [
  { id: 'normal', n: 'Caixa normal', f: 'caixa-normal', curto: 'A mais usada no mercado, para produtos de altura elevada.', t: 'As embalagens mais utilizadas no mercado e ideais para produtos com dimensões de alturas elevadas. Estas caixas fornecem segurança e facilidade ao serem manuseadas.' },
  { id: 'envoltorio', n: 'Envoltório', f: 'envoltorio', curto: 'Para peças baixas e móveis delicados, com fluxo ágil na embalagem.', t: 'São fundamentais para materiais com dimensões de alturas reduzidas, que requerem cuidados especiais e fluxo ágil na embalagem. Adaptam-se e são muito usadas para proteger móveis delicados, que não podem sofrer danos na pintura ou na estrutura durante o transporte.' },
  { id: 'corte-e-vinco', n: 'Corte e vinco', f: 'corte-e-vinco', curto: 'Formatos especiais e caixas complexas, feitas sob medida.', t: 'A JP produz todo tipo de caixa para que o cliente sempre esteja satisfeito. A versatilidade é comprovada nas caixas mais complexas, que precisam de formatos especiais.' },
  { id: 'outros', n: 'Outros itens', f: 'outros', curto: 'Chapas e peças que completam a composição da embalagem.', t: 'Alguns produtos têm itens diferenciados que são fundamentais para a sua composição. A JP produz as peças complementares junto com a caixa.' },
];
const linha = v => `<ul class="linhas4 caixas">${CAIXAS.map(c => `
  <li class="sobe"><a href="${link(v, 'produtos')}#${c.id}"><span class="l-img cx-img">${img(c.f, `Caixa de papelão ${c.n.toLowerCase()} JP Embalagens`)}</span><span class="l-txt"><b>${c.n}</b><span>${c.curto}</span><i>Ver detalhes ${ic('seta')}</i></span></a></li>`).join('')}
</ul>`;
const SETORES = [
  ['Moveleiro', 'Envoltórios e caixas que protegem pintura e estrutura dos móveis no transporte.'],
  ['Vinícolas', 'Caixas resistentes para garrafas, do engarrafamento à entrega.'],
  ['Metal-mecânico', 'Embalagens para peças pesadas e componentes, independentemente do tamanho ou peso.'],
  ['Produtos manufaturados', 'Caixas na medida de cada produto, para estocar e transportar com segurança.'],
  ['Envio pelos Correios', 'Caixas de papelão para quem vende e entrega pelo correio.'],
  ['Pequenas indústrias e comércios', 'Atendimento a diferentes necessidades, também em lotes menores.'],
];
const setores = () => `<ul class="passos setores-jp">${SETORES.map(s => `<li class="sobe"><b>${s[0]}</b><span>${s[1]}</span></li>`).join('')}</ul>`;
const diferenciais = () => checks([
  'Papelão ondulado na medida certa para a necessidade da sua empresa',
  'Máquinas de última geração para caixas resistentes',
  'Embalagens conforme as normas fitossanitárias de exportação',
  'Matéria-prima selecionada, com cuidado ambiental e baixo custo',
  'Ambiente familiar e cuidado especial na montagem de cada caixa',
]);

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Peça a cotação da sua caixa.</h2>
  <p>Mande as medidas internas, o tipo de caixa e a quantidade. A equipe de vendas responde com a melhor solução.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Pedir cotação</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;
const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function produtos(v) {
  return head(v, 'produtos', 'Caixas de papelão', 'Caixas de papelão ondulado JP Embalagens: caixa normal, envoltório, corte e vinco e itens complementares, sob medida.') + topo(v, 'produtos') +
  cabPag('Caixas de papelão ondulado', 'Embalagens ideais para os mais diversos setores da indústria.') +
  CAIXAS.map((c, i) => `
<section class="sec${i % 2 ? ' sec-cinza' : ''}" id="${c.id}"><div class="in duas cx-linha${i % 2 ? ' inv' : ''}">
  <div class="sobe">${sobre(`Tipo ${String(i + 1).padStart(2, '0')}`)}<h2>${c.n}</h2><p>${c.t}</p>
  <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Cotar ${c.n.toLowerCase()}</a></p></div>
  <figure class="sobe cx-fig">${img(c.f, `Caixa de papelão ${c.n.toLowerCase()}`)}</figure>
</div></section>`).join('') + chamada(v) + rodape(v);
}

function pagSetores(v) {
  return head(v, 'setores', 'Setores atendidos', 'A JP Embalagens produz caixas de papelão para fabricantes de móveis, vinícolas, empresas metal-mecânicas e de produtos manufaturados.') + topo(v, 'setores') +
  cabPag('Setores atendidos', 'Fabricantes de móveis, vinícolas, empresas metal-mecânicas e de produtos manufaturados.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Para quem fazemos')}<h2>A embalagem certa para cada mercadoria</h2>
  <p>Nossos produtos são resistentes e facilitam o transporte e o armazenamento de qualquer mercadoria, independentemente do tamanho ou do peso.</p></div>
  ${setores()}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre('Exportação')}<h2>Pronta para viajar</h2>
  <p>As embalagens JP obedecem às normas fitossanitárias de exportação, que evitam a proliferação de fungos, bactérias e demais pragas.</p>
  <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com vendas</a></p></div>
  <figure class="sobe cx-fig">${img('envoltorio', 'Envoltório de papelão para móveis')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function empresa(v) {
  return head(v, 'empresa', 'A JP Embalagens', 'JP Embalagens: desde 1987 em Caxias do Sul/RS, 7.500 m² de fábrica e capacidade de 300 toneladas de caixas de papelão por mês.') + topo(v, 'empresa') +
  cabPag('Nossa história', 'Há mais de 35 anos desenvolvendo embalagens personalizadas com qualidade.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1987')}<h2>Caxias do Sul, cidade de indústria</h2>
  <p>A JP Embalagens cresceu com a certeza de levar segurança, valor humano e credibilidade aos clientes. Surgimos em 1987 em Caxias do Sul, uma cidade voltada para a indústria e para a busca do melhor.</p>
  <p>Numa área de 7.500 m² e com alta tecnologia, criamos embalagens de papelão ondulado na medida certa para a necessidade da sua empresa, com capacidade de 300 toneladas de caixas por mês.</p></div>
  <figure class="sobe">${img('sede', 'Sede da JP Embalagens em Caxias do Sul')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Compromisso')}<h2>A segurança do seu produto</h2>${diferenciais()}</div>
  <figure class="sobe">${img('aerea', 'Fábrica da JP Embalagens vista do alto')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Quem somos')}<h2>Propósito, visão e valores</h2></div>
  <ul class="passos">
    <li class="sobe"><b>Propósito</b><span>Proteger o que as pessoas fazem de melhor, de forma descomplicada, buscando crescimento e prosperidade para todos, como uma família.</span></li>
    <li class="sobe"><b>Visão</b><span>Ser exemplo de eficiência, atendimento e trabalho em equipe, com crescimento constante de valor de mercado e receita.</span></li>
    <li class="sobe"><b>Valores</b><span>Fazemos o certo. Nos ajudamos como uma família. Encontramos soluções simples. Nós entregamos. Vencemos juntos, crescemos juntos.</span></li>
  </ul>
</div></section>
${img('parque-fabril', 'Parque fabril da JP Embalagens no Distrito Industrial de Caxias do Sul', ' class="banda"')}` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Alice Cestari Mantovani, 750, Caxias do Sul - RS');
  return head(v, 'contato', 'Cotação e contato', 'Peça a cotação de caixas de papelão: (54) 3227-1722, WhatsApp (54) 99998-1711, vendas@jpembalagens.com.br. Caxias do Sul/RS.') + topo(v, 'contato') +
  cabPag('Cotação e contato', 'Tem alguma dúvida ou precisa de uma caixa? Fale com a equipe de vendas.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Telefones<br><a href="${E.foneHref}">${E.fone}</a> · <a href="${E.fone2Href}">${E.fone2}</a></span></li>
    <li>${icWa()}<span>WhatsApp<br><a href="${E.wa}" ${ext}>${E.cel}</a></span></li>
    <li>${ic('mail')}<span>E-mail<br><a href="mailto:${E.email}">${E.email}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <h3 style="margin-top:28px">Para agilizar a cotação, informe</h3>
    ${checks(['Tipo de caixa: normal, envoltório, corte e vinco ou outro', 'Medidas internas (comprimento, largura e altura)', 'O que vai dentro e o peso aproximado', 'Quantidade por pedido'])}
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} E-mail</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da JP Embalagens em Caxias do Sul" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'JP Embalagens, Caxias do Sul/RS: caixas de papelão ondulado sob medida para móveis, vinícolas, metal-mecânica e indústria, desde 1987.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Caixas de papelão · Caxias do Sul')}
      <h1>A caixa certa <em>para o que você faz de melhor.</em></h1>
      <p class="ha-sub">Caixas de papelão ondulado personalizadas para o setor moveleiro, vinícolas, metal-mecânica e envio pelos Correios.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Pedir cotação</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver as caixas</a></p>
    </div>
    <div class="ha-prod">${imgTopo('sede', 'Sede da JP Embalagens em Caxias do Sul')}<span class="ha-tag"><b>300 t por mês</b>de caixas de papelão</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1987</span><span>${ic('check')}Fábrica de 7.500 m²</span><span>${ic('check')}Feita sob medida</span><span>${ic('check')}Normas de exportação</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Caixas JP')}<h2>Quatro jeitos de proteger a sua mercadoria</h2></div>
  ${linha(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Por que JP')}<h2>Transporte seguro, do começo ao fim</h2>
  <p>Alto padrão de qualidade e investimento constante em melhoria, para que a sua empresa receba uma embalagem feita com total empenho.</p>
  ${diferenciais()}</div>
  <figure class="sobe">${img('aerea', 'Fábrica da JP Embalagens vista do alto')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Setores')}<h2>Quem embala com a JP</h2></div>
  ${setores()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'JP Embalagens: mais de 35 anos fabricando caixas de papelão ondulado em Caxias do Sul. Capacidade de 300 toneladas por mês.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('aerea-2', 'Fábrica da JP Embalagens em Caxias do Sul')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('JP Embalagens · Caxias do Sul/RS')}
    <h1>Seu produto chega <em>inteiro.</em></h1>
    <p class="hb-sub">Caixas de papelão ondulado na medida certa, feitas com máquinas de última geração e cuidado de empresa familiar.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Pedir cotação</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Tipos de caixa</a></p>
    <div class="hb-selo"><div><b>1987</b><span>fundação</span></div><div><b>7.500 m²</b><span>de fábrica</span></div><div><b>300 t</b><span>por mês</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha de caixas')}<h2>Normal, envoltório, corte e vinco</h2></div>
  ${linha(v)}
</div></section>
<section class="lado">
  <figure>${img('sede', 'Sede da JP Embalagens')}</figure>
  <div class="sobe">${sobre('Setores')}<h2>Do móvel ao vinho</h2>
  <p>Fabricantes de móveis, vinícolas, empresas metal-mecânicas e de produtos manufaturados confiam à JP a proteção da sua mercadoria.</p>
  <p><a class="link-seta" href="${link(v, 'setores')}">Setores atendidos ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Propósito')}<h2>Proteger o que as pessoas fazem de melhor</h2>
  <p>De forma descomplicada, buscando crescimento e prosperidade para todos, como uma família.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></p></div>
  <figure class="sobe cx-fig">${img('corte-e-vinco', 'Caixa de corte e vinco JP Embalagens')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), produtos: produtos(v), setores: pagSetores(v), empresa: empresa(v), contato: contato(v) });

copiarSiteJs(pub, '5554999981711');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'JP Embalagens', artigo: 'da', url: E.url, lang: 'pt', cor: '#4d7a13', fundo: '#2f3033', claro: '#f4efe6',
  fonteTitulo: "'Rubik',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, tons de kraft e verde, abre com a sede e os quatro tipos de caixa.', pontos: ['Caixas em destaque', 'Setores atendidos', 'Cotação pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite e verde-limão, abre com a fábrica vista do alto.', pontos: ['Foto aérea em tela cheia', 'Números da fábrica', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
