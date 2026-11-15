// PACAR Ferramentas Pneumáticas (São Leopoldo/RS, desde 1985): grampeadores, pinadores e pregadores pneumáticos de fabricação própria e linha importada. Gera public/{a,b}/ e a página de escolha.
// node clientes/pacar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs pacar https://www.pacar.com.br/)
// Textos do site atual. Fotos de produto do catálogo do site (fundo branco, aparadas e quadradas). Vistas explodidas em CAD: quadros dos vídeos de manutenção do canal da Pacar no YouTube.
// Logo vetorizado do logo do rodapé (_origem/vetorizar-logo.py). Lista de produtos em _origem/produtos.json.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const P = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'PACAR', legal: 'PACAR Ferramentas Pneumáticas', url: 'https://pacar.overtus.com.br/', antigo: 'https://www.pacar.com.br/',
  fone: '(51) 3079-4500', foneHref: 'tel:+555130794500', wa: 'https://api.whatsapp.com/send?phone=555130794500', email: 'vendas@pacar.com.br',
  end: 'Av. John Kennedy, 440, Morro do Espelho', cidade: 'São Leopoldo/RS · CEP 93030-004',
  insta: 'https://www.instagram.com/pacar.ferramentas/', face: 'https://www.facebook.com/pacarferramentaspneumaticas', yt: 'https://www.youtube.com/@pacarferramentaspneu',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const nomeBonito = s => s.split(' ').map(w => /^[A-ZÇÃÁÉÍÓÚÂÊÔ]{3,}$/.test(w) && !['PI'].includes(w) ? w[0] + w.slice(1).toLowerCase() : w.replace(/^C\/$/, 'c/')).join(' ').replace(/ C\/ /g, ' c/ ').replace(/ (DE|DA|DO|PARA) /g, (m, w) => ' ' + w.toLowerCase() + ' ');

const grupos = [
  { id: 'grampeadores', n: 'Grampeadores', k: 'Grampeadores', t: 'O carro-chefe da Pacar: grampeadores pneumáticos para estofados, móveis, embalagens e construção.' },
  { id: 'pinadores', n: 'Pinadores', k: 'Pinadores', t: 'Pinos de 0,64 mm a 50 mm para acabamento de móveis e marcenaria.' },
  { id: 'pregadores', n: 'Pregadores', k: 'Pregadores', t: 'Pregadores de rolo e de pente para pallets, caixarias e construção.' },
  { id: 'manuais', n: 'Grampeadores manuais', k: 'Grampeadores Manual', t: 'A linha 106 para trabalhos leves e de precisão.' },
  { id: 'lixadeiras', n: 'Lixadeiras', k: 'Lixadeiras', t: 'Orbitais, triangulares e de fita para lixamento de madeira, metal e pintura.' },
  { id: 'parafusadeiras', n: 'Parafusadeiras', k: 'Parafusadeiras', t: 'Parafusadeiras retas e pistola para linhas de montagem.' },
  { id: 'impacto', n: 'Chaves de impacto', k: 'Chaves de impacto', t: 'De 1/2" a 1" para manutenção automotiva e industrial.' },
  { id: 'furadeiras', n: 'Furadeiras', k: 'Furadeiras', t: 'Furadeiras pneumáticas retas e pistola, com reversão.' },
  { id: 'rebitadores', n: 'Rebitadores e retíficas', k: ['Rebitadores', 'Retificas'], t: 'Rebitadores hidropneumáticos e retíficas retas.' },
  { id: 'ar', n: 'Tratamento de ar', k: 'Acessorios Pneumaticos', t: 'Lubrefil, filtros reguladores e lubrificadores com manômetro.' },
];
const itens = g => [].concat(g.k).flatMap(k => P[k] || []);

const depoimentos = [
  ['Das voltas que a vida dá. Do plantio à colheita. A PACAR se faz presente.', 'Naid', 'Waltrick Móveis'],
  ['A Pacar marcou nossa vida trazendo sempre inovações para atender ainda melhor nós clientes.', 'Fabiane', '149 Cadeiras'],
  ['Pacar facilitou nossa produção.', 'Daniele Rejane', 'Comfort Tapizados, Paraguai'],
  ['Quando perdemos nossa fábrica com a enchente de maio/24 os grampeadores da Pacar foram as únicas coisas que resgatamos p/ recomeçar! E continua conosco nessa nova fase da fábrica.', 'Cleber', 'Monte Bello Estofados'],
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Pacar' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'assistencia', n: 'Assistência técnica' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Vitrine', b: 'Vista explodida' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'PACAR | Grampeadores e ferramentas pneumáticas' : `${titulo} | PACAR Ferramentas Pneumáticas`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#d90a0a' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 40) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="PACAR Ferramentas Pneumáticas" width="${Math.round(h * 556 / 126)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Fabricante de grampeadores pneumáticos desde 1985</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="PACAR, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${E.wa}" target="_blank" rel="noopener">Pedir orçamento</a>
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
    <div class="rod-marca">${logo(true, 44)}
      <p>A maior fabricante de grampeadores e pinadores pneumáticos da região. São Leopoldo/RS, desde 1985.</p>
      <p class="rod-redes"><a href="${E.insta}" aria-label="Instagram da Pacar">${ic('insta')}</a><a href="${E.face}" aria-label="Facebook da Pacar">${ic('face')}</a></p></div>
    <div><h3>Produtos</h3><ul>${grupos.slice(0, 6).map(g => `<li><a href="${link(v, 'produtos')}#${g.id}">${g.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Onde encontrar</h3><ul>
      <li><a href="${link(v, 'contato')}#rede">Representantes</a></li>
      <li><a href="${link(v, 'contato')}#rede">Distribuidores</a></li>
      <li><a href="${link(v, 'assistencia')}">Assistência técnica</a></li>
      <li><a href="${link(v, 'empresa')}">Sobre a Pacar</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>São Leopoldo/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" target="_blank" rel="noopener" aria-label="WhatsApp da Pacar">${icWa()}</a>
</body>
</html>`;
}

const card = p => `<li class="sobe">${img(p[0], nomeBonito(p[1]))}<b>${nomeBonito(p[1])}</b></li>`;
const destaques = ['grampeador-80-16-brasileirinho', 'grampeador-80-w-ls', 'pinador-pf-50', 'pregador-pi-70-ro', 'grampeador-manual-106-mini', 'lixadeira-orbital-pi-ep-4151-5p', 'parafusadeira-pi-ep-6205', 'chave-de-impacto-1-2-pi-rp-7426'];
const todos = Object.values(P).flat();
const vitrine = () => `<ul class="ped ped4">${destaques.map(s => card(todos.find(p => p[0] === s))).join('')}</ul>`;

const numeros = () => `<ul class="economia">
  <li><b>1985</b><span>fundação em São Leopoldo</span></li>
  <li><b>40 anos</b><span>de grampeadores Pacar</span></li>
  <li><b>120+</b><span>ferramentas e acessórios no catálogo</span></li>
  <li><b>Brasil todo</b><span>rede de distribuidores e assistência</span></li>
</ul>`;

const listaDepo = () => `<ul class="depo">${depoimentos.map(d => `<li class="sobe"><q>${d[0]}</q><span><b>${d[1]}</b>${d[2]}</span></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Qual grampo a sua produção usa?</h2>
  <p>Fale com a Pacar e receba a indicação da ferramenta certa, do distribuidor mais perto e da assistência técnica da sua região.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" target="_blank" rel="noopener">Chamar no WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'A Pacar', 'PACAR: fundada em 2 de maio de 1985 em São Leopoldo/RS, referência em grampeadores industriais no Brasil e na América Latina.') + topo(v, 'empresa') +
  cabPag('A Pacar', 'Excelência, qualidade e liderança desde 1985.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 2 de maio de 1985')}<h2>Referência em grampeadores industriais</h2>
  <p>Desde a fundação, a PACAR assumiu o compromisso de atender com precisão às amplas e exigentes necessidades da indústria. Com qualidade, inovação e confiabilidade, tornou-se referência em grampeadores industriais no Brasil e na América Latina.</p>
  <p>Alta tecnologia, autonomia no desenvolvimento de projetos, design funcional e uma equipe capacitada fizeram da PACAR a maior fabricante de grampeadores e pinadores pneumáticos da região. Além da fabricação própria, a Pacar oferece uma linha de ferramentas importadas de alta performance.</p></div>
  <figure class="sobe cad">${img('cad-grampeador', 'Projeto em CAD de grampeador Pacar')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Pacar em números')}<h2 class="sobe">40 anos na bancada da indústria</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Propósito')}<h2>Missão, visão e valores</h2></div>
  <ul class="cards3">
    <li class="sobe"><h3>Missão</h3><p>Desenvolver e oferecer soluções em grampeadores, pinadores e ferramentas pneumáticas com foco em qualidade, desempenho e inovação, contribuindo para o crescimento da indústria brasileira.</p></li>
    <li class="sobe"><h3>Visão</h3><p>Ser reconhecida como a marca líder e referência em soluções pneumáticas na América Latina, com responsabilidade, inovação e excelência técnica.</p></li>
    <li class="sobe"><h3>Valores</h3><p>Integridade e respeito. Compromisso com a excelência. Fé, ética e responsabilidade. Valorização das pessoas. Inovação com propósito. Tradição familiar e confiança.</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Depoimentos')}<h2>Quem trabalha com Pacar</h2></div>
  ${listaDepo()}
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', 'Produtos PACAR: grampeadores, pinadores, pregadores, grampeadores manuais, lixadeiras, parafusadeiras, chaves de impacto, furadeiras, rebitadores e tratamento de ar.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Fabricação própria e linha importada de alta performance.') + `
<section class="sec"><div class="in">
  <ul class="cats">${grupos.map(g => `<li><a href="#${g.id}">${g.n}</a></li>`).join('')}</ul>
  ${grupos.map(g => `<div id="${g.id}" style="margin-bottom:64px"><div class="sec-cab sobe">${sobre(g.n)}<h2>${g.t}</h2></div><ul class="ped ped4">${itens(g).map(card).join('')}</ul></div>`).join('')}
  <p class="sobe">Catálogo completo, grampos, pinos e peças de reposição: <a class="link-seta" href="${E.wa}" target="_blank" rel="noopener">fale com a Pacar ${ic('seta')}</a></p>
</div></section>` + chamada(v) + rodape(v);
}

function assistencia(v) {
  return head(v, 'assistencia', 'Assistência técnica', 'Assistência técnica PACAR: rede em todo o Brasil, kits de peças de reposição e vídeos de manutenção com vistas explodidas dos grampeadores e pregadores.') + topo(v, 'assistencia') +
  cabPag('Assistência técnica', 'Ferramenta parada é produção parada.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Rede nacional')}<h2>Assistência e peças perto da sua fábrica</h2>
  <p>A Pacar conta com uma ampla rede de assistência técnica e distribuidores em todo o território nacional, com peças nacionais, peças importadas e kits de reposição para cada modelo.</p>
  ${checks(['Kits de peças de reposição por modelo', 'Peças nacionais e importadas', 'Óleo pneumático e acessórios', 'Cursos de manutenção', 'Vídeos de desmontagem no canal da Pacar'])}
  <p><a class="btn" href="${E.wa}" target="_blank" rel="noopener">Encontrar assistência</a></p></div>
  <figure class="sobe cad">${img('cad-kit', 'Vista explodida de componentes do grampeador')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Manutenção em vídeo')}<h2>Cada peça, no lugar certo</h2><p>Os vídeos de manutenção da Pacar mostram em vista explodida a ordem de montagem de cabeçotes, gatilhos e magazines.</p></div>
  <div class="galeria">${[['cad-explodido', 'Vista explodida do cabeçote'], ['cad-pregador', 'Pregador de rolo em CAD'], ['cad-pinador', 'Pinador em CAD'], ['cad-cabecote', 'Cabeçote e válvulas']].map(f => foto(f[0], f[1])).join('')}</div>
  <p class="sobe" style="margin-top:24px"><a class="link-seta" href="${E.yt}" target="_blank" rel="noopener">Ver o canal da Pacar no YouTube ${ic('seta')}</a></p>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Av. John Kennedy, 440, São Leopoldo - RS');
  return head(v, 'contato', 'Contato', 'PACAR: (51) 3079-4500, vendas@pacar.com.br. Av. John Kennedy, 440, Morro do Espelho, São Leopoldo/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Vendas, representantes, distribuidores e assistência técnica.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <p id="rede">Para saber o representante, o distribuidor ou a assistência técnica da sua região, chame a Pacar no <a href="${E.wa}" target="_blank" rel="noopener">WhatsApp</a>.</p>
    <iframe class="mapa" title="Mapa da Pacar em São Leopoldo/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <label>Assunto<select name="assunto"><option>Orçamento</option><option>Onde comprar</option><option>Assistência técnica</option><option>Quero ser distribuidor</option></select></label>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'PACAR: fabricante de grampeadores, pinadores e pregadores pneumáticos desde 1985, em São Leopoldo/RS. Rede de distribuidores e assistência em todo o Brasil.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Ferramentas pneumáticas · São Leopoldo/RS')}
      <h1>Grampeia o dia inteiro. <em>Por anos.</em></h1>
      <p class="ha-sub">A maior fabricante de grampeadores e pinadores pneumáticos da região. Para estofados, móveis, embalagens e construção.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Ver produtos</a><a class="btn btn-linha" href="${E.wa}" target="_blank" rel="noopener">Pedir orçamento</a></p>
    </div>
    <div class="ha-prod">${imgTopo('grampeador-80-w-ls', 'Grampeador pneumático Pacar 80/W-LS')}<span class="ha-tag"><b>Desde 1985</b>fabricação própria</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Fabricação própria</span><span>${ic('check')}Linha importada</span><span>${ic('check')}Assistência em todo o Brasil</span><span>${ic('check')}Kits de reposição</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Destaques')}<h2>As ferramentas que mais trabalham</h2></div>
  ${vitrine()}
  <p class="sobe" style="margin-top:28px"><a class="link-seta" href="${link(v, 'produtos')}">Todas as categorias ${ic('seta')}</a></p>
</div></section>
<section class="lado">
  <figure class="cad">${img('cad-pregador', 'Pregador Pacar em vista CAD')}</figure>
  <div class="sobe">${sobre('Assistência técnica')}<h2>Peça de reposição para cada modelo</h2>
  <p>Kits de reposição, peças nacionais e importadas e uma rede de assistência em todo o Brasil. Os vídeos de manutenção mostram cada peça em vista explodida.</p>
  <p><a class="link-seta" href="${link(v, 'assistencia')}">Ver assistência ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Pacar em números')}<h2 class="sobe">40 anos na bancada da indústria</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Depoimentos')}<h2>Quem trabalha com Pacar</h2></div>
  ${listaDepo()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'PACAR: grampeadores pneumáticos projetados e fabricados em São Leopoldo/RS desde 1985. Peças de reposição e assistência técnica em todo o Brasil.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('cad-explodido', 'Vista explodida de grampeador Pacar')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('PACAR · desde 1985')}
    <h1>Projetado peça <em>por peça.</em></h1>
    <p class="hb-sub">Grampeadores, pinadores e pregadores pneumáticos com projeto próprio, peças de reposição e assistência em todo o Brasil.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" target="_blank" rel="noopener">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></p>
    <div class="hb-selo"><div><b>1985</b><span>fundação</span></div><div><b>120+</b><span>itens no catálogo</span></div><div><b>RS</b><span>São Leopoldo</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas')}<h2>Do grampo ao ar comprimido</h2></div>
  <ul class="ped ped4">${grupos.slice(0, 8).map(g => { const p = itens(g)[0]; return `<li class="sobe"><a href="${link(v, 'produtos')}#${g.id}" style="color:inherit;text-decoration:none">${img(p[0], g.n)}<b>${g.n}</b></a></li>`; }).join('')}</ul>
</div></section>
<section class="lado">
  <figure class="cad">${img('cad-grampeador', 'Grampeador Pacar em CAD')}</figure>
  <div class="sobe">${sobre('Engenharia')}<h2>Autonomia no desenvolvimento</h2>
  <p>Alta tecnologia, projetos próprios e design funcional: é assim que a Pacar se tornou a maior fabricante de grampeadores e pinadores pneumáticos da região.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a Pacar ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">40 anos de Pacar</h2>${numeros()}</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Depoimentos')}<h2>Da fábrica de estofados à marcenaria</h2></div>
  ${listaDepo()}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), assistencia: assistencia(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'PACAR', artigo: 'da', url: E.url, lang: 'pt', cor: '#d90a0a', fundo: '#17181a', claro: '#f4f4f5',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com o grampeador 80/W-LS e uma vitrine dos campeões de venda.', pontos: ['Vitrine de produtos na home', 'Catálogo por categoria', 'Depoimentos de clientes'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite, abre com a vista explodida do grampeador e destaca a engenharia e a assistência.', pontos: ['Vista explodida em tela cheia', 'Linhas de produto na home', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
