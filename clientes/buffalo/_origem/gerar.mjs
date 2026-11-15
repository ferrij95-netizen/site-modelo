// Buffalo Motores & Acoplados (São José dos Pinhais/PR): motores a combustão e acoplados, geradores, motobombas, agrícola, construção civil, jardim, pulverização, hidrolavadoras e náutica. Gera public/{a,b}/ e a página de escolha.
// node clientes/buffalo/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs buffalo https://www.buffalo.com.br/)
// 566 produtos em 61 categorias, puxados da API do site atual (api.buffalo.com.br). Foto do primeiro modelo de cada categoria.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const { linhas, cats } = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const TOTAL = cats.reduce((s, c) => s + c.m.length, 0);

const E = {
  nome: 'Buffalo Motores & Acoplados', legal: 'Buffalo Motores & Acoplados Ltda. · CNPJ 07.040.941/0001-06', url: 'https://buffalo.overtus.com.br/', antigo: 'https://www.buffalo.com.br/',
  fone: '(41) 3091-5600', foneHref: 'tel:+554130915600', email: 'buffalo@buffalo.com.br',
  end: 'Rua Maria Fontes Machado, 420, Costeira', cidade: 'São José dos Pinhais/PR · CEP 83015-482',
  assist: 'https://www.buffalo.com.br/assistencia', rep: 'https://www.buffalo.com.br/representantes', posvenda: 'https://www.buffalo.com.br/assistencia',
};
const desc = {
  motores: 'Gasolina e diesel, de 2,5 a 35 cv: verticais, PRO, termossifão, radiador e marítimos.',
  geradores: 'Gasolina, diesel e inverter, do portátil ao Big PRO com cabine silenciada.',
  motobombas: 'Centrífugas e autoescorvantes a gasolina e diesel, e bombas elétricas.',
  agricola: 'Motocultivadores, microtratores, perfuradores de solo e carretas.',
  construcao: 'Compactadores, vibradores de concreto, rompedores, acabamento de piso e dumpers.',
  floresta: 'Roçadeiras, motosserras, sopradores, podadores e cortadores de grama.',
  pulverizacao: 'Pulverizadores costais, manuais, estacionários a gasolina e atomizadores.',
  hidrolavadoras: 'Hidrolavadoras elétricas e a gasolina para uso profissional.',
  nautica: 'Motores de popa, rabetas e caixas reversoras para barcos.',
};
const lin = id => linhas.find(l => l.id === id);
const daLinha = id => cats.filter(c => c.l === id);
const nLinha = id => daLinha(id).reduce((s, c) => s + c.m.length, 0);

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const imgC = c => img(`p-${c.img}`, `${c.m[0][1]} Buffalo`, c.w, c.h);
const pr = id => cats.find(c => c.m.some(m => m[0] === id));
const imgId = (id, alt) => { const c = cats.find(x => x.img === id); return c ? imgC(c) : img(`p-${id}`, alt, 520, 520); };

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Buffalo' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'assistencia', n: 'Assistência e representantes' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Força amarela', b: 'Motor de trabalho' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Barlow:wght@400;500;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Buffalo Motores & Acoplados | Motores, geradores, motobombas e máquinas' : `${titulo} | Buffalo Motores`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#f5b400' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 150) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.webp" alt="Buffalo Motores & Acoplados" width="${w}" height="${Math.round(w * 268 / 856)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">850 postos de assistência técnica no Brasil</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Buffalo, página inicial">${logo(v === 'b', 150)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'assistencia')}">${ic('pin')}Onde comprar</a>
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
    <div class="rod-marca">${logo(true, 190)}
      <p>Motores a combustão e produtos acoplados para o campo, a obra, a geração de energia, o jardim e o barco. Venda em todo o Brasil.</p></div>
    <div><h3>Produtos</h3><ul>${linhas.map(l => `<li><a href="${link(v, 'produtos')}?l=${l.id}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">A Buffalo</a></li>
      <li><a href="${link(v, 'assistencia')}">Assistência técnica</a></li>
      <li><a href="${link(v, 'assistencia')}#representantes">Representantes</a></li>
      <li><a href="${link(v, 'contato')}">Fale conosco</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Buffalo · Buffalo Rental</span></div>
</footer>
<script src="/assets/buffalo.js" defer></script>
</body>
</html>`;
}

const numeros = () => `<ul class="numeros">
  <li><b>${TOTAL}</b><span>produtos no catálogo</span></li>
  <li><b>9</b><span>linhas, do motor ao barco</span></li>
  <li><b>850</b><span>postos de assistência técnica</span></li>
  <li><b>100%</b><span>dos equipamentos testados</span></li>
  <li><b>27</b><span>estados com representante</span></li>
</ul>`;

const gradeLinhas = v => `<ul class="linhas-g">${linhas.map(l => `<li class="sobe"><a href="${link(v, 'produtos')}?l=${l.id}"><span class="lg-img">${img(`l-${l.id}`, `Linha ${l.n} Buffalo`, 900, 701)}</span><span class="lg-txt"><b>${l.n}</b><span>${desc[l.id]}</span><i>${nLinha(l.id)} produtos ${ic('seta')}</i></span></a></li>`).join('')}</ul>`;

const destaques = [60503, 70500, 70535, 60729, 70564, 60445].map(pr).filter(Boolean);
const vitrine = v => `<ul class="vitrine">${destaques.map(c => `<li class="sobe"><a href="${link(v, 'produtos')}?c=${c.s}"><span class="vt-img">${imgC(c)}</span><span class="vt-l">${lin(c.l).n}</span><b>${esc(c.c)}</b><span>${c.m.length} modelo${c.m.length > 1 ? 's' : ''}</span></a></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Quer revender ou precisa de assistência?</h2>
  <p>Representantes em todos os estados e 850 postos de serviço com peças de reposição. Encontre o mais perto de você.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'assistencia')}">Encontrar assistência</a><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></div>
</div></section>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const cardCat = c => `<li class="pr" data-l="${c.l}" data-c="${c.s}" data-busca="${esc((c.c + ' ' + lin(c.l).n + ' ' + c.m.map(m => m[1] + ' ' + m[0]).join(' ')).toLowerCase())}" id="${c.s}">
  <a class="pr-foto" href="/assets/img/p-${c.img}.webp" data-foto="${esc(c.m[0][1])}">${imgC(c)}</a>
  <div class="pr-txt"><p class="pr-cat">${lin(c.l).n}</p><h3>${esc(c.c)}</h3><p class="pr-n">${c.m.length} modelo${c.m.length > 1 ? 's' : ''}</p>
  <details${c.m.length <= 4 ? ' open' : ''}><summary>Ver modelos e códigos</summary><ul class="pr-mod">${c.m.map(m => `<li><span>${esc(m[1])}</span><b>${m[0]}</b></li>`).join('')}</ul></details>
  <a class="pr-wa" href="mailto:${E.email}?subject=${encodeURIComponent('Cotação ' + c.c)}">${ic('mail')} Pedir cotação</a></div></li>`;

function empresa(v) {
  return head(v, 'empresa', 'A Buffalo', 'Buffalo Motores & Acoplados: motores a combustão e produtos acoplados em todo o Brasil, com 850 postos de assistência técnica e produtos 100% testados.') + topo(v, 'empresa') +
  cabPag('A Buffalo', 'Motores e acoplados para a agricultura familiar e para grandes projetos de irrigação, aviário e ordenha.', imgTopo('galpao', 'Sede da Buffalo em São José dos Pinhais/PR', 1186, 622)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}<h2>Conhecimento real das necessidades do mercado</h2>
  <p>A Buffalo vende motores a combustão interna e produtos acoplados em todo o território nacional. Atende desde a agricultura familiar até projetos maiores de irrigação, aviário e ordenha, além de jardinagem, geração de energia local, construção civil e lazer.</p>
  <p>Todos os itens das linhas têm garantia. Cada equipamento sai 100% testado, com peças de reposição e a rede de pós-venda à disposição.</p></div>
  <figure class="sobe">${img('interior', 'Estoque da Buffalo', 1186, 666)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Como a Buffalo trabalha')}<h2>O atendimento não termina na venda</h2></div>
  <ul class="pilares">
    <li class="sobe">${ic('usuarios')}<h3>Equipe técnica</h3><p>Formação técnica e experiência prática, lado a lado com o cliente para chegar na solução certa.</p></li>
    <li class="sobe">${ic('chave')}<h3>Assistência em todo o Brasil</h3><p>850 postos de serviço. O suporte técnico visita os postos e treina os profissionais.</p></li>
    <li class="sobe">${ic('check')}<h3>Gestão da qualidade</h3><p>Investimento em linhas de teste, capacitação dos assistentes e peças de reposição.</p></li>
    <li class="sobe">${ic('caminhao')}<h3>Estrutura que cresce com planejamento</h3><p>Expansão sem prejudicar a qualidade dos produtos e do pós-venda.</p></li>
  </ul>
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('Compromisso Buffalo')}<h2>Fornecedores com tecnologia de ponta e controle rigoroso</h2>
  <p>A Buffalo investe em processos, novos produtos e linhas de teste, em parceria com fornecedores que têm produção integrada, equipe treinada e controle de qualidade rigoroso.</p></div>
  <ul class="checks sobe"><li>${ic('check')}O sucesso do negócio depende de clientes satisfeitos</li><li>${ic('check')}Qualidade e excelência em tudo o que faz</li><li>${ic('check')}Peças de reposição para toda a linha</li><li>${ic('check')}Presença em eventos, feiras e exposições</li></ul>
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Catálogo Buffalo: ${TOTAL} produtos em motores, geradores, motobombas, agrícola, construção civil, floresta e jardim, pulverização, hidrolavadoras e náutica.`) + topo(v, 'produtos') +
  cabPag('Produtos', `${TOTAL} produtos em ${cats.length} categorias. Escolha a linha ou busque pelo modelo ou código.`) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Linhas"><button type="button" data-l="" aria-pressed="true">Todas <span>${TOTAL}</span></button>${linhas.map(l => `<button type="button" data-l="${l.id}" aria-pressed="false">${l.n} <span>${nLinha(l.id)}</span></button>`).join('')}</div>
    <div class="f-campos"><label>Buscar modelo ou código<input type="search" data-busca placeholder="BFG 5.5, inverter, 60503, roçadeira..."></label><p class="f-total" aria-live="polite"><b data-total>${cats.length}</b> categorias</p></div>
  </div>
  <ul class="catalogo">${cats.map(cardCat).join('')}</ul>
  <p class="cat-vazio" hidden>Nenhum produto com esse filtro. Fale com a Buffalo: ${E.fone}.</p>
</div></section>` + chamada(v) + rodape(v);
}

function assistencia(v) {
  return head(v, 'assistencia', 'Assistência e representantes', 'Assistência técnica Buffalo: 850 postos de serviço no Brasil, peças de reposição e representantes em todos os estados.') + topo(v, 'assistencia') +
  cabPag('Assistência e representantes', 'Onde consertar, onde comprar e quem atende a sua região.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Assistência técnica')}<h2>850 postos de serviço em todo o Brasil</h2>
  <p>Os postos são treinados pela equipe de suporte da Buffalo e têm acesso a toda a linha de peças de reposição. Pesquise por estado, cidade e tipo de produto: gasolina 2T e 4T, diesel, geradores, bombas elétricas, construção civil, rompedores, lavadoras e pulverização.</p>
  <p class="acoes"><a class="btn" href="${E.assist}" ${ext}>${ic('pin')} Buscar assistência mais próxima</a></p>
  <ul class="checks"><li>${ic('check')}Portal de pós-venda e perguntas frequentes</li><li>${ic('check')}Manual de instruções, catálogo de peças e ficha técnica de cada produto</li><li>${ic('check')}Vídeos de entrega técnica</li></ul></div>
  <figure class="sobe">${img('l-motores', 'Motor Buffalo em bancada', 900, 701)}</figure>
</div></section>
<section class="sec sec-cinza" id="representantes"><div class="in duas">
  <figure class="sobe">${img('l-geradores', 'Geradores Buffalo', 900, 701)}</figure>
  <div class="sobe">${sobre('Representantes')}<h2>Um representante perto de você</h2>
  <p>A Buffalo tem representantes comerciais nos estados do Norte ao Sul. Eles indicam onde comprar e atendem lojas que querem revender a linha.</p>
  <p class="acoes"><a class="btn" href="${E.rep}" ${ext}>${ic('usuarios')} Ver representantes por estado</a><a class="btn btn-linha" href="${link(v, 'contato')}">Quero revender</a></p></div>
</div></section>` + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Maria Fontes Machado, 420, São José dos Pinhais - PR');
  return head(v, 'contato', 'Contato', 'Buffalo Motores & Acoplados: (41) 3091-5600, buffalo@buffalo.com.br. Rua Maria Fontes Machado, 420, Costeira, São José dos Pinhais/PR.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Dúvidas, sugestões, comercial ou pós-venda.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Telefone <a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da Buffalo em São José dos Pinhais/PR" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <div class="form-duas"><label>Telefone<input name="fone" type="tel" autocomplete="tel"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
    <div class="form-duas"><label>Cidade / estado<input name="cidade" autocomplete="address-level2"></label><label>Assunto *<select name="assunto"><option>Comercial</option><option>Pós-vendas</option><option>Administrativo</option><option>Quero revender</option></select></label></div>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta para buffalo@buffalo.com.br.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', `Buffalo Motores & Acoplados: ${TOTAL} produtos entre motores, geradores, motobombas, máquinas agrícolas, construção civil, jardim, pulverização e náutica. 850 postos de assistência.`) + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Motores & acoplados · todo o Brasil</p>
      <h1>Motor para <em>cada trabalho.</em></h1>
      <p class="ha-sub">${TOTAL} produtos em 9 linhas: motores a gasolina e diesel, geradores, motobombas, motocultivadores, compactadores, roçadeiras e motores de popa. Todos testados, com peças e assistência perto de você.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Ver o catálogo</a><a class="btn btn-linha" href="${link(v, 'assistencia')}">Onde comprar</a></p>
    </div>
    <div class="ha-prod"><img src="/assets/img/h-motor.webp" alt="${esc(pr(70500).m.find(m => m[0] === 70500)[1])}" width="299" height="300" fetchpriority="high"><span class="ha-tag"><b>${esc(pr(70500).m.find(m => m[0] === 70500)[1])}</b>linha ${pr(70500).c}</span></div>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas')}<h2>Nove linhas, uma marca amarela</h2></div>
  ${gradeLinhas(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Mais procurados')}<h2>Do motor estacionário ao compactador</h2></div>
  ${vitrine(v)}
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('galpao', 'Sede da Buffalo em São José dos Pinhais/PR', 1186, 622)}</figure>
  <div class="sobe">${sobre('A Buffalo')}<h2>Equipamento testado, peça na prateleira e assistência por perto</h2>
  <p>Da agricultura familiar a projetos de irrigação, aviário e ordenha. A Buffalo acompanha o cliente depois da venda, com suporte técnico na sede e no campo.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Buffalo ${ic('seta')}</a></div>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', `Buffalo: motores, geradores, motobombas e máquinas para quem trabalha. ${TOTAL} produtos, representantes em todo o Brasil e 850 postos de assistência.`) + topo(v, 'index') + `
<section class="herob">
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">Buffalo Motores & Acoplados</p>
      <h1>Força para o campo, <em>a obra e o barco.</em></h1>
      <p class="hb-sub">Motores e acoplados com garantia, 100% testados, peças de reposição e 850 postos de assistência técnica.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Catálogo completo</a><a class="btn btn-linha" href="${link(v, 'assistencia')}">Assistência técnica</a></p>
    </div>
    <ul class="hb-mosaico">${[70535, 60729, 70564, 60445].map(id => `<li>${imgId(id, 'Produto Buffalo')}</li>`).join('')}</ul>
  </div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Escolha a linha')}<h2>O que você precisa mover?</h2></div>
  ${gradeLinhas(v)}
</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('Pós-venda')}<h2>850 postos de serviço do Acre ao Rio Grande do Sul</h2>
  <p>O atendimento não termina com a venda. A equipe de suporte treina os assistentes, vai a feiras e visita os postos.</p>
  <a class="link-seta" href="${link(v, 'assistencia')}">Achar assistência ${ic('seta')}</a></div>
  ${numeros()}
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Destaques')}<h2>Mais procurados</h2></div>
  ${vitrine(v)}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), assistencia: assistencia(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'buffalo.js'), path.join(pub, 'assets/buffalo.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Buffalo', artigo: 'da', url: E.url, lang: 'pt', cor: '#f5b400', fundo: '#1d1d1b', claro: '#f6f4ef',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: "'Barlow',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o amarelo Buffalo, o motor diesel no topo e as 9 linhas com foto.', pontos: [`Catálogo com ${TOTAL} modelos e códigos, com busca`, 'Linhas e mais procurados na home', 'Assistência e representantes em uma página'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Preta e amarela, abre com um mosaico de produtos e fala de pós-venda.', pontos: ['Mosaico de produtos no topo', '850 postos de assistência em destaque', 'Mesmo catálogo completo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
