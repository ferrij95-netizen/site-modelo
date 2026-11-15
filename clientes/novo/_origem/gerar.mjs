// NOVO Industries do Brasil (Eldorado do Sul/RS, desde 1998): lâminas de PVC para persianas verticais (89 mm) e horizontais (50 e 25 mm), bandôs e trilhos.
// node clientes/novo/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs novo https://www.novo.ind.br/)
// Textos, fotos da fábrica, mostruários, ambientes da galeria e a cartela de cores do site atual.
// Cartela: uma imagem (sprite) por coleção em _origem/colecoes.json + public/assets/img/cores-*.webp, para não estourar o limite de arquivos.
// Fotos de "profissional" do banner (banco de imagem) descartadas.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const C = JSON.parse(fs.readFileSync(path.join(aqui, 'colecoes.json'), 'utf8'));

const E = {
  nome: 'NOVO Industries', legal: 'NOVO Industries do Brasil', url: 'https://novo.overtus.com.br/', antigo: 'https://www.novo.ind.br/',
  fone: '(51) 3481-3011', foneHref: 'tel:+555134813011', email: 'contato@novo.ind.br',
  wa: 'https://api.whatsapp.com/send?phone=555134813011',
  end: 'BR-116, km 286, nº 5000', cidade: 'Eldorado do Sul/RS', cep: '92990-000',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const ambientes = [['vert-poltrona', 'Persiana vertical em sala com poltrona vermelha', 'alta'], ['hor-branca-vaso', 'Persiana horizontal branca'], ['hor-azul-sala', 'Persiana horizontal azul em sala de estar'], ['vert-mesa-frutas', 'Persiana vertical em sala de jantar', 'alta'], ['hor-cozinha', 'Persiana horizontal na cozinha'], ['vert-sisal', 'Persiana vertical texturizada'], ['vert-banheira', 'Persiana vertical no banheiro', 'alta'], ['hor-bege-abajur', 'Persiana horizontal bege'], ['vert-quarto', 'Persiana vertical no quarto'], ['laser-poltrona', 'Persiana em ambiente com poltrona', 'alta'], ['hor-balcao', 'Persiana horizontal com balcão'], ['vert-sala', 'Persiana vertical em sala de estar'], ['vert-abajur', 'Persiana vertical com abajur', 'alta'], ['hor-flores', 'Persiana horizontal com flores'], ['vert-plantas', 'Persiana vertical com plantas'], ['vert-espelho', 'Persiana vertical com espelho'], ['hor-azul', 'Persiana horizontal azul']];
const fabrica = [['fabrica-1', 'Sede da NOVO em Eldorado do Sul'], ['fabrica-5', 'Composto de PVC entrando na extrusão'], ['fabrica-4', 'Controle dimensional das lâminas com paquímetro'], ['fabrica-2', 'Estoque de lâminas embaladas'], ['fabrica-3', 'Expedição com empilhadeira'], ['fabrica-6', 'Separação de pedidos']];
const vantagens = [
  ['gota', 'Limpeza', 'Limpa com pano úmido e sabão neutro, sem medo de entortar. Ideal para ambientes que pedem limpeza constante.'],
  ['chama', 'Segurança', 'O PVC rígido é antichama: não propaga fogo e se extingue assim que a chama externa é retirada.'],
  ['escudo', 'Antialérgico', 'Não junta poeira como o tecido. Indicado para hospitais, clínicas, consultórios e dormitórios.'],
  ['relogio', 'Durabilidade', 'Durável, inerte, 100% reciclável e com ótima relação custo-benefício, no lugar do tecido ou do alumínio.'],
  ['casa', 'Praticidade', 'Reduz calor e ruído, garante privacidade, protege móveis e pisos e controla a luz, em qualquer estilo.'],
  ['engrenagem', 'Resistência', 'Resiste a impacto e abrasão, não amassa, não enferruja, não corrói e não se deteriora com o tempo.'],
];
const totalCores = Object.values(C).reduce((s, c) => s + c.linhas.reduce((t, l) => t + l.cores.length, 0), 0);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A NOVO' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'colecoes', n: 'Coleções' },
  { slug: 'vantagens', n: 'Vantagens' },
  { slug: 'galeria', n: 'Galeria' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Cartela', b: 'Luz e ambiente' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Lato:wght@400;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'NOVO Industries | Lâminas de PVC para persianas' : `${titulo} | NOVO Industries`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#002649' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.webp" alt="NOVO Industries" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Especialista em lâminas de PVC para persianas</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="NOVO Industries, página inicial">${marca(v === 'b')}</a>
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
      <p>Lâminas de PVC para persianas verticais e horizontais, bandôs e trilhos, feitos em Eldorado do Sul para montadores de todo o Brasil.</p></div>
    <div><h3>Produtos</h3><ul>
      <li><a href="${link(v, 'produtos')}">Lâminas verticais 89 mm</a></li>
      <li><a href="${link(v, 'produtos')}">Lâminas horizontais 50 e 25 mm</a></li>
      <li><a href="${link(v, 'produtos')}">Bandôs e trilhos</a></li>
      <li><a href="${link(v, 'colecoes')}">Coleções e cores</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
    <div><h3>NOVO</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'vantagens')}">Vantagens do PVC</a></li>
      <li><a href="${link(v, 'galeria')}">Galeria</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Eldorado do Sul/RS · Brasil</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da NOVO">${icWa()}</a>
</body>
</html>`;
}

const larguras = () => `<ul class="larguras">
  <li class="sobe"><b>89 mm</b><span>Lâminas verticais</span><p>Lisas e texturizadas, em dezenas de linhas e cores.</p></li>
  <li class="sobe"><b>50 mm</b><span>Lâminas horizontais</span><p>Lisas (Curve, Rustic) e texturizadas (Arizona, Madeira, Vintage...).</p></li>
  <li class="sobe"><b>25 mm</b><span>Lâminas horizontais</span><p>Linhas Contract e Rustic, para janelas menores.</p></li>
  <li class="sobe"><b>Bandô</b><span>e trilho inferior</span><p>Bandô para acabamento superior e trilho duplo para a base da persiana.</p></li>
</ul>`;
const vant = () => `<ul class="vant6">${vantagens.map(x => `<li class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul>`;
const historia = () => `<p>A empresa nasceu em 1980 em Houston, Texas (EUA). Em 1996 foi adquirida pelo grupo canadense Royal Group Technologies, líder mundial em extrusão de PVC para construção civil e decoração, que abriu uma subsidiária no Brasil para fabricar e distribuir aos montadores brasileiros de persianas.</p>
  <p>Assim nasceu, em 1998, a NOVO Industries do Brasil, em Eldorado do Sul (RS). Em 2006 o grupo Royal foi vendido e as unidades fora da América do Norte foram postas à venda: os administradores brasileiros adquiriram o controle e a NOVO passou a ser uma empresa 100% brasileira.</p>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>É montador de persianas?</h2>
  <p>Peça o mostruário, consulte cores e prazos com a equipe comercial da NOVO.</p></div>
  <div class="ch-acoes"><a class="btn" href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function cartela(key) {
  const c = C[key]; const T = 96;
  return `<div class="cartela sobe" id="${key}"><h2>Lâminas ${c.titulo}</h2>${c.linhas.map(l => `<div class="linha-cor"><h3>${l.linha}</h3><ul class="chips">${l.cores.map(([nome, i]) => `<li><i style="background-image:url(/assets/img/cores-${key}.webp);background-size:${c.cols * 100}% auto;background-position:${(i % c.cols) / (c.cols - 1) * 100}% ${c.rows > 1 ? Math.floor(i / c.cols) / (c.rows - 1) * 100 : 0}%"></i>${nome}</li>`).join('')}</ul></div>`).join('')}</div>`;
}

function empresa(v) {
  return head(v, 'empresa', 'A NOVO', 'NOVO Industries do Brasil: fundada em 1998 em Eldorado do Sul/RS, hoje 100% brasileira, fabrica lâminas de PVC para persianas.') + topo(v, 'empresa') +
  cabPag('Sobre a NOVO', 'De Houston, Texas, a Eldorado do Sul: lâminas de PVC para persianas desde 1998.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Nossa história')}<h2>Origem americana, empresa 100% brasileira</h2>${historia()}</div>
  <figure class="sobe">${img('fabrica-1', 'Sede da NOVO Industries em Eldorado do Sul')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Fábrica')}<h2>Da extrusão à expedição</h2></div>
  <div class="fab6 sobe">${fabrica.map(f => img(f[0], f[1])).join('')}</div>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Para montadores')}<h2>Fornecedor de quem fabrica persianas</h2>
  ${checks(['Mais de 100 opções de lâminas em PVC, horizontais e verticais', 'Larguras de 89 mm (verticais) e 50 e 25 mm (horizontais)', 'Bandô de acabamento e trilho duplo inferior', 'Mostruários para o montador apresentar as cores ao cliente final'])}</div>
  <figure class="sobe">${img('fabrica-4', 'Controle de medida das lâminas')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function produtos(v) {
  return head(v, 'produtos', 'Produtos', 'Lâminas de PVC NOVO: verticais 89 mm, horizontais 50 e 25 mm, bandôs e trilhos inferiores, além de mostruários de cores.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Lâminas em PVC para persianas, bandôs e trilhos.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Larguras')}<h2>Lâminas para persianas verticais e horizontais</h2>
  <p>As lâminas NOVO saem em 89 mm para as persianas verticais e em 50 e 25 mm para as horizontais. Além das lâminas, a NOVO fabrica o bandô para o acabamento superior e o trilho duplo para a base inferior da persiana.</p></div>
  ${larguras()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Mostruários e acessórios')}<h2>Para o montador mostrar ao cliente</h2></div>
  <ul class="mostru">
    <li class="sobe">${img('produto-1', 'Mostruário de lâminas verticais NOVO')}<b>Mostruário de verticais</b></li>
    <li class="sobe">${img('produto-2', 'Mostruário de lâminas horizontais 50 mm')}<b>Mostruário horizontais 50 mm</b></li>
    <li class="sobe">${img('produto-3', 'Mostruário de lâminas horizontais 25 mm')}<b>Mostruário horizontais 25 mm</b></li>
    <li class="sobe">${img('bando', 'Bandô e trilho inferior')}<b>Bandô e trilho inferior</b></li>
  </ul>
  <p style="margin-top:28px"><a class="link-seta" href="${link(v, 'colecoes')}">Ver todas as cores ${ic('seta')}</a></p>
</div></section>` + chamada(v) + rodape(v);
}

function colecoes(v) {
  return head(v, 'colecoes', 'Coleções', `Cartela de cores NOVO: ${totalCores} cores de lâminas de PVC verticais e horizontais, lisas e texturizadas.`) + topo(v, 'colecoes') +
  cabPag('Coleções', `Mais de 100 opções de lâminas em PVC. Aqui estão ${totalCores} cores das linhas atuais.`) + `
<section class="sec"><div class="in">
  <ul class="cats sobe">${Object.entries(C).map(([k, c]) => `<li><a href="#${k}">${c.titulo}</a></li>`).join('')}</ul>
  ${Object.keys(C).map(cartela).join('')}
  <p class="nota">As cores na tela são uma referência. Peça o mostruário para conferir tons e texturas.</p>
</div></section>` + chamada(v) + rodape(v);
}

function vantagensPag(v) {
  return head(v, 'vantagens', 'Vantagens do PVC', 'Vantagens das lâminas de PVC para persianas: limpeza fácil, antichama, antialérgico, durável, prático e resistente.') + topo(v, 'vantagens') +
  cabPag('Vantagens do PVC', 'Prático e versátil, o PVC é ideal para persianas em qualquer ambiente.') + `
<section class="sec"><div class="in">${vant()}</div></section>
<section class="lado">
  <figure>${img('vert-banheira', 'Persiana vertical de PVC em banheiro')}</figure>
  <div class="sobe">${sobre('Onde usar')}<h2>Da sala ao hospital</h2>
  <p>As persianas em PVC substituíram as cortinas de tecido em espaços que pedem limpeza fácil: hospitais, clínicas, consultórios, dormitórios, cozinhas e banheiros.</p>
  <p><a class="link-seta" href="${link(v, 'galeria')}">Ver ambientes ${ic('seta')}</a></p></div>
</section>` + chamada(v) + rodape(v);
}

function galeria(v) {
  return head(v, 'galeria', 'Galeria', 'Galeria de ambientes com persianas verticais e horizontais feitas com lâminas de PVC NOVO.') + topo(v, 'galeria') +
  cabPag('Galeria', 'Persianas verticais e horizontais com lâminas NOVO.') + `
<section class="sec"><div class="in">
  <div class="amb">${ambientes.map(a => foto(a[0], a[1], a[2] || '')).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('NOVO Industries, BR-116 km 286, Eldorado do Sul - RS');
  return head(v, 'contato', 'Contato', 'NOVO Industries: (51) 3481-3011, contato@novo.ind.br. BR-116, km 286, nº 5000, Eldorado do Sul/RS, CEP 92990-000.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Atendimento a montadores de persianas de todo o Brasil.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">+55 ${E.fone}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · Brasil<br>CEP ${E.cep}</span></li></ul>
    <p class="ha-acoes"><a class="btn" href="mailto:${E.email}">${ic('mail')} Enviar e-mail</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} Ligar</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da NOVO em Eldorado do Sul/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=13&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'NOVO Industries, Eldorado do Sul/RS: mais de 100 opções de lâminas de PVC para persianas verticais e horizontais, bandôs e trilhos.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('NOVO Industries · Eldorado do Sul/RS')}
      <h1>Lâminas de PVC <em>para persianas.</em></h1>
      <p class="ha-sub">Mais de 100 opções de lâminas horizontais e verticais, nas mais diversas cores e texturas, para montadores de persianas de todo o Brasil.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'colecoes')}">Conheça as coleções</a><a class="btn btn-linha" href="${link(v, 'vantagens')}">Vantagens do PVC</a></p>
    </div>
    <div class="ha-prod">${imgTopo('hor-azul-sala', 'Persiana horizontal azul com lâminas NOVO')}<span class="ha-tag"><b>Desde 1998</b>em Eldorado do Sul</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Verticais 89 mm</span><span>${ic('check')}Horizontais 50 e 25 mm</span><span>${ic('check')}Bandôs e trilhos</span><span>${ic('check')}100% reciclável</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Tudo o que o montador precisa</h2></div>
  ${larguras()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Coleções')}<h2>Lisas, texturizadas, madeiradas</h2></div>
  ${cartela('horizontais-50-texturizadas')}
  <p><a class="link-seta" href="${link(v, 'colecoes')}">Ver as ${totalCores} cores ${ic('seta')}</a></p>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Sobre a NOVO')}<h2>Origem americana, empresa 100% brasileira</h2>${historia()}
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a fábrica ${ic('seta')}</a></p></div>
  <div class="fab6 sobe" style="grid-template-columns:1fr 1fr">${fabrica.slice(0, 4).map(f => img(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Lâminas de PVC NOVO para persianas: luz, privacidade e limpeza fácil. Verticais 89 mm, horizontais 50 e 25 mm. Eldorado do Sul/RS.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('vert-sala', 'Persianas verticais com lâminas NOVO em sala de estar')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('NOVO Industries do Brasil')}
    <h1>A luz certa <em>em cada ambiente.</em></h1>
    <p class="hb-sub">Lâminas de PVC para persianas verticais e horizontais: fáceis de limpar, antichama e duráveis.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'colecoes')}">Ver cores</a><a class="btn btn-linha" href="${link(v, 'galeria')}">Galeria</a></p>
    <div class="hb-selo"><div><b>100+</b><span>opções de lâminas</span></div><div><b>89 · 50 · 25</b><span>larguras em mm</span></div><div><b>1998</b><span>no Brasil</span></div></div>
  </div></div>
</section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Vantagens do PVC')}<h2>Por que lâmina de PVC</h2></div>
  <ul class="operacoes">${vantagens.slice(0, 4).map(x => `<li class="sobe"><b>${x[1]}</b><span>${x[2]}</span></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Galeria')}<h2>Ambientes com NOVO</h2></div>
  <div class="amb">${ambientes.slice(0, 6).map(a => foto(a[0], a[1])).join('')}</div>
</div></section>
<section class="lado">
  <figure>${img('fabrica-5', 'Composto de PVC na fábrica NOVO')}</figure>
  <div class="sobe">${sobre('Fábrica')}<h2>Extrusão própria em Eldorado do Sul</h2>${historia()}
  <p><a class="link-seta" href="${link(v, 'empresa')}">Sobre a NOVO ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Larguras e acessórios</h2></div>
  ${larguras()}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtos(v), colecoes: colecoes(v), vantagens: vantagensPag(v), galeria: galeria(v), contato: contato(v) });

copiarSiteJs(pub, '555134813011');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'NOVO Industries', artigo: 'da', url: E.url, lang: 'pt', cor: '#002649', fundo: '#001d38', claro: '#f4f2ee',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: "'Lato',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: 'Clara, abre com uma persiana NOVO e traz a cartela de cores já na home.', pontos: [`Cartela com ${totalCores} cores`, 'Larguras e acessórios', 'Fábrica e história'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Azul-marinho, abre com um ambiente em tela cheia e vende as vantagens do PVC.', pontos: ['Ambiente em tela cheia', 'Galeria na home', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
