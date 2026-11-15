// Metalúrgica Wagner (Westfália/RS, desde 1980): equipamentos agrícolas, implementos rodoviários, misturadores e máquinas para reciclagem de plásticos.
// node clientes/metalwagner/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs metalwagner https://metalwagner.com.br/)
// Textos e as 41 imagens de produto do site atual (renderizações da própria Wagner, recortadas em quadrado). Banners de banco de imagem descartados.
// Logo: o original vertical do site recomposto na horizontal (ícone MW + texto), sem redesenhar.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const PR = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Metalúrgica Wagner', legal: 'Metalúrgica Wagner Ltda.', url: 'https://metalwagner.overtus.com.br/', antigo: 'https://metalwagner.com.br/',
  fone: '(51) 3762-6148', foneHref: 'tel:+555137626148', cel: '(51) 99995-6520',
  wa: 'https://api.whatsapp.com/send?phone=5551999956520', email: 'metalwagner@metalwagner.com.br',
  end: 'Rua Henrique Uebel, 1040, Centro', cidade: 'Westfália/RS', cep: '95893-000',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const nomeLimpo = n => n.replace(/\s+/g, ' ').trim();

const LINHAS = [
  { slug: 'agricola', n: 'Agrícola', t: 'Destinado a propriedades rurais e outros segmentos, com projetos sob medida para a necessidade de cada cliente: compactos, eficientes, de baixo custo e fácil operação.', capa: ['silo-galvanizado', 'moinho-de-martelos'] },
  { slug: 'misturadores', n: 'Misturadores', t: 'Projetados para homogeneizar componentes com características físicas variáveis, garantindo uniformidade e qualidade no produto final.', capa: ['misturadores-verticais', 'misturadores-horizontais'] },
  { slug: 'reciclagem', n: 'Reciclagem', t: 'Linha robusta para reciclagem de plásticos, com baixo custo operacional e de manutenção, para um dos setores que mais crescem.', capa: ['lavadora', 'aglutinador'] },
  { slug: 'implementos-rodoviarios', n: 'Implementos rodoviários', t: 'Destinados ao transporte de água e outras substâncias líquidas.', capa: ['tanque-pipa-rodoviario', 'distribuidor-de-adubo-liquido'] },
];
const doCat = c => PR.filter(p => p.cat === c);
const desc = p => p.texto.join(' ').replace(/\s+/g, ' ').replace(/([^.])$/, '$1.');

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Sobre nós' },
  ...LINHAS.map(l => ({ slug: l.slug, n: l.n === 'Implementos rodoviários' ? 'Rodoviários' : l.n })),
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Catálogo', b: 'Desde 1980' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,600..800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Metalúrgica Wagner | Equipamentos agrícolas, misturadores e reciclagem' : `${titulo} | Metalúrgica Wagner`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#25517f' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.webp" alt="Metalúrgica Wagner" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Forjando qualidade com tradição, desde 1980</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Metalúrgica Wagner, página inicial">${marca(v === 'b')}</a>
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
      <p>Especialistas na fabricação de equipamentos para os setores agrícola, rodoviário e de reciclagem, atendendo todo o Brasil.</p></div>
    <div><h3>Produtos</h3><ul>${LINHAS.map(l => `<li><a href="${link(v, l.slug)}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li>
    </ul></div>
    <div><h3>Atendimento</h3><ul>
      <li>Seg. a sex.: 7h às 12h e 13h às 16h45</li>
      <li>Sábados: 8h às 12h</li>
      <li><a href="${link(v, 'empresa')}">Sobre nós</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Westfália/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da Metalúrgica Wagner">${icWa()}</a>
</body>
</html>`;
}

const linhas4 = v => `<ul class="linhas4">${LINHAS.map(l => `<li class="sobe"><a href="${link(v, l.slug)}"><span class="l-img">${l.capa.map(c => img(c, nomeLimpo(PR.find(p => p.slug === c).nome))).join('')}</span><span class="l-txt"><b>${l.n}</b><span>${l.t}</span><i>${doCat(l.slug).length} ${doCat(l.slug).length > 1 ? 'equipamentos' : 'equipamento'} ${ic('seta')}</i></span></a></li>`).join('')}</ul>`;
const catalogo = lista => `<ul class="catal">${lista.map(p => { const n = nomeLimpo(p.nome); return `<li class="sobe" id="${p.slug}"><a class="f" href="/assets/img/${p.slug}.webp" data-foto="${esc(n)}">${img(p.slug, n)}</a><div><h3>${n}</h3><p>${desc(p)}</p><a class="mais" href="${E.wa}&text=${encodeURIComponent(`Olá! Quero um orçamento de ${n}.`)}" ${ext}>Solicitar orçamento ${ic('seta')}</a></div></li>`; }).join('')}</ul>`;
const historia = () => `<p>Fundada em 1980 em Westfália (RS), a Metalúrgica Wagner começou fabricando produtos para a agricultura: enxadas, foices, arados, misturadores e pequenos silos para ração.</p>
  <p>Em meados de 1988 ampliou a linha agrícola e passou a desenvolver máquinas para as indústrias de transformação, de calçados e de reciclagem de plásticos. Hoje atende todo o Brasil, diretamente ou por representantes comerciais.</p>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Ficou interessado em nossas soluções?</h2>
  <p>Fale com a equipe da Wagner: projetos sob medida para a necessidade de cada cliente.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Solicitar orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Sobre nós', 'Metalúrgica Wagner: fundada em 1980 em Westfália/RS, fabrica equipamentos agrícolas, misturadores, implementos rodoviários e máquinas para reciclagem.') + topo(v, 'empresa') +
  cabPag('Sobre nós', 'Há mais de 40 anos oferecendo produtos de qualidade e serviços de excelência.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1980')}<h2>Da enxada à linha de reciclagem</h2>${historia()}
  <p>A Wagner acompanha os avanços tecnológicos e as necessidades do mercado, com atenção ao meio ambiente, qualidade nos produtos e atendimento personalizado.</p></div>
  <figure class="sobe">${img('silo-galvanizado', 'Silo galvanizado Wagner')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <ul class="cards3">
    <li class="sobe"><h3>Missão</h3><p>Fornecer soluções eficientes, melhorando o processo dos clientes com a melhor tecnologia e uma relação sustentável com colaboradores, fornecedores, meio ambiente e comunidade.</p></li>
    <li class="sobe"><h3>Visão</h3><p>Ser referência nos mercados em que atua pela qualidade dos produtos, dos serviços e do relacionamento.</p></li>
    <li class="sobe"><h3>Valores</h3><p>Ética, comprometimento, trabalho em equipe e transparência.</p></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Onde estamos')}<h2>Nossa fábrica em Westfália</h2>
  <p>A Metalúrgica Wagner fica no centro de Westfália, no Rio Grande do Sul, na Rua Henrique Uebel, 1040. Com uma rede de representantes, atende empresas em todo o território nacional.</p>
  ${checks(['Projetos sob medida', 'Aço carbono, galvanizado a fogo e inox', 'Atendimento direto ou por representantes'])}</div>
  <figure class="sobe">${img('mapa-brasil', 'Mapa do Brasil com a localização da Wagner', ' class="mapa-br"')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function linhaPag(v, l) {
  const lista = doCat(l.slug);
  return head(v, l.slug, l.n, `${l.n} Metalúrgica Wagner: ${lista.map(p => nomeLimpo(p.nome)).join(', ')}.`.slice(0, 158)) + topo(v, l.slug) +
  cabPag(l.n, l.t) + `
<section class="sec"><div class="in">
  ${catalogo(lista)}
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Henrique Uebel, 1040, Westfália - RS');
  return head(v, 'contato', 'Contato', 'Metalúrgica Wagner: (51) 3762-6148, WhatsApp (51) 99995-6520, metalwagner@metalwagner.com.br. Rua Henrique Uebel, 1040, Westfália/RS.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Tire dúvidas, peça um orçamento ou envie sugestões.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}, ${E.cep}</span></li></ul>
    <p class="horario">Segunda a sexta: 7h às 12h e 13h às 16h45<br>Sábados: 8h às 12h</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} Ligar</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da Metalúrgica Wagner em Westfália/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  const dest = ['misturadores-secadores-verticais', 'moinho-de-martelos', 'aglutinador', 'lavadora', 'silo-galvanizado', 'esteira-de-classificacao'].map(s => PR.find(p => p.slug === s));
  return head(v, 'index', '', 'Metalúrgica Wagner, Westfália/RS: silos, moinhos, roscas, misturadores, lavadoras, aglutinadores e tanques pipa. Há mais de 40 anos.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Westfália/RS · desde 1980')}
      <h1>Forjando qualidade <em>com tradição.</em></h1>
      <p class="ha-sub">Equipamentos agrícolas, misturadores, implementos rodoviários e máquinas para reciclagem de plásticos, fabricados sob medida para todo o Brasil.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicite um orçamento</a><a class="btn btn-linha" href="${link(v, 'reciclagem')}">Ver máquinas</a></p>
    </div>
    <div class="ha-prod">${imgTopo('misturadores-secadores-horizontais', 'Misturador secador horizontal Wagner')}<span class="ha-tag"><b>${PR.length} equipamentos</b>em 4 linhas de produto</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Mais de 40 anos</span><span>${ic('check')}Projetos sob medida</span><span>${ic('check')}Aço carbono e inox</span><span>${ic('check')}Atendimento em todo o Brasil</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Nossas soluções')}<h2>Quatro linhas de produto</h2></div>
  ${linhas4(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Destaques')}<h2>Máquinas Wagner</h2></div>
  ${catalogo(dest)}
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Abrangência')}<h2>Estrutura completa para atender todo o Brasil</h2>
  <p>Com tecnologia e uma rede de representantes, a Wagner leva seus equipamentos a empresas em todo o território nacional, direto da fábrica em Westfália.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('mapa-brasil', 'Mapa do Brasil com Westfália/RS', ' class="mapa-br"')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Metalúrgica Wagner: desde 1980 fabricando máquinas para reciclagem de plásticos, misturadores, silos e implementos em Westfália/RS.') + topo(v, 'index') + `
<section class="herob2">
  <div class="in hb2-grade">
    <div>
      ${sobre('Metalúrgica Wagner · Westfália/RS')}
      <h1>Máquinas que <em>trabalham por décadas.</em></h1>
      <p class="hb-sub">Da linha de reciclagem de plástico ao silo de ração: equipamentos robustos, de baixo custo de manutenção, projetados para cada cliente.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicite um orçamento</a><a class="btn btn-linha" href="${link(v, 'empresa')}">Sobre nós</a></p>
      <div class="hb-selo"><div><b>1980</b><span>fundação</span></div><div><b>${PR.length}</b><span>equipamentos</span></div><div><b>BR</b><span>atendimento nacional</span></div></div>
    </div>
    <div class="hb2-maq">${imgTopo('misturadores-verticais', 'Misturador vertical Wagner')}${img('lavadora', 'Lavadora de plástico Wagner')}${img('moinho-de-martelos', 'Moinho de martelos Wagner')}</div>
  </div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas de produto')}<h2>Agrícola, misturadores, reciclagem e rodoviários</h2></div>
  ${linhas4(v)}
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Reciclagem de plásticos')}<h2>Linha completa, do fardo ao grão</h2></div>
  <ul class="operacoes">
    <li class="sobe"><b>Abrir e classificar</b><span>Abridor de fardo, esteiras de alimentação e de classificação, removedor de rótulos.</span></li>
    <li class="sobe"><b>Lavar</b><span>Lavadoras, lavadora e enxaguadora oitavada, lavagem a quente para PET e PEAD.</span></li>
    <li class="sobe"><b>Secar e aglutinar</b><span>Secadoras de rotor e redonda, aglutinador de 30 a 150 CV, silo ciclone.</span></li>
    <li class="sobe"><b>Transportar</b><span>Roscas, turbinas de ar e de transporte, válvulas direcionais e porta bag.</span></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1980')}<h2>Mais de 40 anos em Westfália</h2>${historia()}
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Wagner ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('tanque-pipa-rodoviario', 'Tanque pipa rodoviário Wagner')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => {
  const o = { index: inicio(), empresa: empresa(v), contato: contato(v) };
  for (const l of LINHAS) o[l.slug] = linhaPag(v, l);
  return o;
};

copiarSiteJs(pub, '5551999956520');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Metalúrgica Wagner', artigo: 'da', url: E.url, lang: 'pt', cor: '#25517f', fundo: '#14304f', claro: '#f1f3f5',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 7, texto: `Clara, abre com o misturador secador e organiza os ${PR.length} equipamentos em 4 linhas.`, pontos: ['Catálogo com orçamento por máquina', 'Uma página por linha', 'Abrangência nacional'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 7, texto: 'Azul-escuro, abre com três máquinas e explica a linha de reciclagem etapa por etapa.', pontos: ['Reciclagem do fardo ao grão', 'História desde 1980', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
