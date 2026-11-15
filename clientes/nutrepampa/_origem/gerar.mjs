// Nutrepampa (Independência/RS, desde 2007): nutrição animal para bovinos de corte e leite, aves, ovinos, suínos, equinos e coelhos. Marcas Pampa Beef, Nutreplex e Provemix. Gera public/{a,b}/ e a página de escolha.
// node clientes/nutrepampa/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs nutrepampa https://nutrepampa.com.br/)
// 117 produtos do site atual (WordPress), cases de sucesso com dados de campo, fotos da fábrica tiradas do vídeo institucional. Logo vetorizado (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const { linhas, produtos, imgs } = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const ordemG = ['corte', 'leite', 'ovinos', 'aves', 'suinos', 'equinos', 'coelhos'];
const lIdx = id => linhas.findIndex(l => l.id === id);
produtos.sort((a, b) => ordemG.indexOf(linhas[lIdx(a.l)].g) - ordemG.indexOf(linhas[lIdx(b.l)].g) || lIdx(a.l) - lIdx(b.l));

const E = {
  nome: 'Nutrepampa', legal: 'Jost, Ferreira & Cia Ltda. (Nutrepampa) · CNPJ 09.287.803/0001-43', url: 'https://nutrepampa.overtus.com.br/', antigo: 'https://nutrepampa.com.br/',
  fone: '(55) 3539-1161', foneHref: 'tel:+555535391161', wa: '(55) 99616-7812', waNum: '5555996167812', recepcao: '(55) 99166-8742', recepcaoHref: 'tel:+5555991668742',
  email: 'contato@nutrepampa.com.br',
  end: 'Rua Arno Spengler, 91, Bairro Industrial, margens da RS-342', cidade: 'Independência/RS · CEP 98915-000',
  insta: 'https://www.instagram.com/nutrepampa/', face: 'https://www.facebook.com/Nutrepampa/', yt: 'https://www.youtube.com/@nutrepampa5222', li: 'https://www.linkedin.com/company/nutrepampa-nutri%C3%A7%C3%A3o-animal/',
};
const waLink = `https://wa.me/${E.waNum}`;
const ANOS = 2026 - 2007;

const grupos = [
  { id: 'corte', n: 'Gado de corte', t: 'Minerais, proteicos, terminadores, núcleos e rações da cria à terminação.' },
  { id: 'leite', n: 'Gado de leite', t: 'Rações, concentrados e minerais Nutreplex para vacas, novilhas e bezerras.' },
  { id: 'ovinos', n: 'Ovinos', t: 'Do cordeiro creep à dieta total.' },
  { id: 'aves', n: 'Aves', t: 'Corte, postura e codorna.' },
  { id: 'suinos', n: 'Suínos', t: 'Inicial, crescimento, terminação e concentrado.' },
  { id: 'equinos', n: 'Equinos', t: 'Ração Rodeio.' },
  { id: 'coelhos', n: 'Coelhos', t: 'Ração peletizada.' },
];
const lin = id => linhas.find(l => l.id === id);
const doGrupo = g => produtos.filter(p => lin(p.l).g === g);
const daLinha = l => produtos.filter(p => p.l === l);

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const imgP = (p, alt) => { const [w, h] = imgs[p.img]; return img(`p-${p.img}`, alt || `Embalagem ${p.n} Nutrepampa`, w, h); };
const fotoLinha = l => imgP(daLinha(l)[0], `Embalagens da linha ${lin(l).n}`);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Nutrepampa' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'resultados', n: 'Resultados no campo' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Equilíbrio em nutrição', b: 'Resultado no campo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,600;0,700;0,800;1,700&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Nutrepampa | Nutrição animal para corte, leite e mais, desde 2007' : `${titulo} | Nutrepampa`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#dd7400' });

const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 120) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Nutrepampa, equilíbrio em nutrição" width="${w}" height="${Math.round(w * 175 / 322)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Equilíbrio em nutrição · desde 2007</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="${waLink}" ${ext}>${icWa()}${E.wa}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Nutrepampa, página inicial">${logo(v === 'b', 104)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waLink}" ${ext}>${icWa()}Fale com um consultor</a>
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
    <div class="rod-marca">${logo(true, 170)}
      <p>Nutrição animal de Independência/RS para o Sul e o Norte do Brasil. Fábricas em Independência e Teutônia/RS.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a><a href="${E.li}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>Produtos</h3><ul>${grupos.map(g => `<li><a href="${link(v, 'produtos')}?g=${g.id}">${g.n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${waLink}" ${ext}>Comercial ${E.wa}</a></li>
      <li>${ic('tel')}<a href="${E.recepcaoHref}">Recepção ${E.recepcao}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'empresa')}#qualidade">Setor de qualidade</a></li>
      <li><a href="${link(v, 'resultados')}">Cases de sucesso</a></li>
      <li><a href="${link(v, 'contato')}#representante">Seja um representante</a></li>
      <li><a href="${E.antigo}codigo-de-etica/" ${ext}>Código de ética</a></li>
      <li><a href="${E.antigo}politica-de-privacidade/" ${ext}>Política de privacidade</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Nutrepampa · Pampa Beef · Nutreplex · Provemix</span></div>
</footer>
<a class="wa-flutua" href="${waLink}" ${ext} aria-label="WhatsApp Nutrepampa">${icWa()}</a>
<script src="/assets/nutrepampa.js" defer></script>
</body>
</html>`;
}

// ---------- dados ----------
const numeros = () => `<ul class="numeros">
  <li><b>2007</b><span>início em Alegria/RS</span></li>
  <li><b>+1 mil</b><span>propriedades de corte e leite atendidas</span></li>
  <li><b>+450 t</b><span>de ração por dia nas fábricas</span></li>
  <li><b>+50 mil</b><span>animais tratados diariamente</span></li>
  <li><b>${produtos.length}</b><span>produtos em 19 linhas</span></li>
</ul>`;

const cases = [
  { linha: 'Linha Grano Entero', quem: 'Fazenda da Rosa · Guilherme Neves da Rosa', prod: 'Concentrado Grano Entero', lote: '28 novilhos', ini: '279 kg', fim: '452 kg', per: '90 dias', gmd: '1,92 kg', foto: 'c-01', extra: '17/09 a 17/12/2024' },
  { linha: 'Linha Grano Entero', quem: 'Fazenda Cavalhada · Mostardas/RS', prod: 'Concentrado Grano Entero', lote: '22 novilhos', ini: '319 kg', fim: '486 kg', per: '95 dias', gmd: '1,79 kg', foto: 'c-02', extra: '26/07 a 29/10/2024' },
  { linha: 'Linha Confina', quem: 'Carlos Gregory · Novo Hamburgo/RS', prod: 'Núcleo Confina Beef Rúmen', lote: '36 novilhos', ini: '402 kg', fim: '460 kg', per: '34 dias', gmd: '1,70 kg', foto: 'c-03', extra: '24/04 a 28/05/2025' },
  { linha: 'Linha Terminador', quem: 'Rubem Barcellos · Glorinha/RS', prod: 'Terminador Velox', lote: '15 novilhos', ini: '521 kg', fim: '578 kg', per: '38 dias', gmd: '1,5 kg', foto: 'c-04', extra: 'Brachiaria Mavuno, consumo de 3,3 kg/dia (0,6% PV). Custo de R$ 7,45/dia, lucro de R$ 370,60 por animal no período.' },
  { linha: 'Linha Terminador', quem: 'Sandro Cardozo', prod: 'Terminador Energia', lote: '30 novilhos', ini: '350 kg', fim: '380 kg', per: '28 dias', gmd: '1,07 kg', foto: 'c-05', extra: 'Pastejo de braquiária MG5, consumo de 800 g/dia.' },
  { linha: 'Linha Terminador', quem: 'Ronaldo Schuster · Encruzilhada do Sul/RS', prod: 'Terminador Inverno', lote: 'Recria de fêmeas', ini: '246 kg', fim: '263 kg', per: '20 dias', gmd: '850 g', foto: 'c-07', extra: 'Azevém, consumo médio de 250 g/cabeça/dia.' },
  { linha: 'Linha Terminador', quem: 'Ronaldo Schuster · Encruzilhada do Sul/RS', prod: 'Terminador Primavera', lote: 'Recria de fêmeas', ini: '243 kg', fim: '258 kg', per: '35 dias', gmd: '450 g', foto: 'c-08', extra: 'Pastoreio rotativo sobre capim-annoni, 250 g/cabeça/dia.' },
];
const casePrenhez = { quem: 'Marcelo e Luiza Limberger · Pântano Grande/RS', prod: 'Nutrepasto Fértil', t: 'Vacas com cria ao pé em campo nativo com base de capim-annoni.' };

const marcas = () => `<ul class="marcas">
  <li><span class="mc-logo mc-np">${logo(true, 120)}</span><p>Rações, concentrados e núcleos para corte, leite e outras criações.</p></li>
  <li><span class="mc-logo">${img('m-pampabeef', 'Pampa Beef', 259, 78)}</span><p>Soluções minerais, proteicas e terminadores para bovinos de corte.</p></li>
  <li><span class="mc-logo">${img('m-nutreplex', 'Nutreplex', 268, 62)}</span><p>Minerais e aditivos para bovinos leiteiros, como o Nutreplex Guardião.</p></li>
  <li><span class="mc-logo">${img('m-provemix', 'Provemix', 259, 77)}</span><p>Núcleos e minerais. Parte do grupo desde 2019.</p></li>
</ul>`;

const cardCase = c => `<li class="case sobe"><a class="case-foto" href="/assets/img/${c.foto}.webp" data-foto="${esc(c.quem)}">${img(c.foto, `Lote do case ${c.quem}`, +c.foto.slice(2) <= 4 ? 800 : 600, 800)}</a>
  <div class="case-txt"><p class="case-linha">${c.linha}</p><h3>${c.prod}</h3><p class="case-quem">${c.quem}</p>
  <div class="case-gmd"><b>${c.gmd}</b><span>ganho médio<br>diário</span></div>
  <ul class="case-dados"><li><span>Lote</span><b>${c.lote}</b></li><li><span>Peso</span><b>${c.ini} → ${c.fim}</b></li><li><span>Período</span><b>${c.per}</b></li></ul>
  ${c.extra ? `<p class="case-extra">${c.extra}</p>` : ''}</div></li>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Quer o mesmo resultado no seu rebanho?</h2>
  <p>Fale com um consultor da Nutrepampa. A equipe técnica indica a linha certa para o seu sistema: campo nativo, pastagem de inverno ou verão, silagem ou grão inteiro.</p></div>
  <div class="ch-acoes"><a class="btn" href="${waLink}" ${ext}>${icWa()}WhatsApp comercial</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver produtos</a></div>
</div></section>`;

const form = (assunto, rep) => `<form class="form" data-wa="${E.waNum}" data-assunto="${assunto}">
  <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone / WhatsApp *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Cidade / estado *<input name="cidade" required autocomplete="address-level2"></label></div>
  ${rep ? `<label>Região que você atende<input name="regiao" placeholder="Ex.: Fronteira Oeste, Serra, Vale do Taquari"></label>` : `<label>Interesse<select name="interesse"><option>Gado de corte</option><option>Gado de leite</option><option>Ovinos</option><option>Aves</option><option>Suínos</option><option>Equinos</option><option>Coelhos</option><option>Outros</option></select></label>`}
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="${rep ? 'Conte sua experiência com venda de nutrição animal' : 'Quantos animais, qual sistema (pasto, confinamento, leite)...'}"></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp comercial da Nutrepampa com a mensagem pronta.${rep ? ' O currículo pode ser enviado na conversa.' : ''}</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const gradeGrupos = v => `<ul class="grupos">${grupos.map(g => { const ps = doGrupo(g.id); const capa = { corte: 'terminador', leite: 'nutreplex' }[g.id]; return `<li class="sobe gr-${g.id}"><a href="${link(v, 'produtos')}?g=${g.id}"><span class="gr-img">${capa ? fotoLinha(capa) : imgP(ps[0])}</span><span class="gr-txt"><b>${g.n}</b><span>${g.t}</span><i>${ps.length} produto${ps.length > 1 ? 's' : ''} ${ic('seta')}</i></span></a></li>`; }).join('')}</ul>`;

const linhasCorte = v => `<ul class="linhas">${linhas.filter(l => l.g === 'corte' || l.g === 'leite').map(l => `<li class="sobe"><a href="${link(v, 'produtos')}?l=${l.id}"><span class="ln-img">${fotoLinha(l.id)}</span><span class="ln-g">${l.g === 'corte' ? 'Corte' : 'Leite'}</span><b>${l.n}</b><span>${l.t}</span></a></li>`).join('')}</ul>`;

// ---------- catálogo ----------
const cardProd = p => { const l = lin(p.l); return `<li class="pr" data-g="${l.g}" data-l="${l.id}" data-busca="${esc((p.n + ' ' + l.n + ' ' + p.ind).toLowerCase())}">
  <a class="pr-foto" href="/assets/img/p-${p.img}.webp" data-foto="${esc(p.n)}">${imgP(p)}</a>
  <div class="pr-txt"><p class="pr-cat">${esc(l.n)}</p><h3>${esc(p.n)}</h3>
  ${p.ind ? `<p class="pr-uso">${esc(p.ind)}</p>` : ''}
  ${p.uso ? `<details><summary>Modo de usar</summary><p>${esc(p.uso)}</p></details>` : ''}
  <a class="pr-wa" href="${waLink}?text=${encodeURIComponent(`Olá! Quero falar com um consultor sobre ${p.n}.`)}" ${ext}>${icWa()} Falar com consultor</a></div></li>`; };

// ---------- páginas ----------
function empresa(v) {
  return head(v, 'empresa', 'A Nutrepampa', 'Nutrepampa: nutrição animal desde 2007. Começou em Alegria/RS, cresceu em Independência/RS e Porto Velho/RO, Provemix desde 2019 e fábrica em Teutônia/RS desde 2021.') + topo(v, 'empresa') +
  cabPag('Dedicação e excelência na nutrição animal', 'Desde 6 de dezembro de 2007, uma empresa gaúcha que cresce junto com quem produz carne e leite.', imgTopo('v-fabrica', 'Vista aérea da fábrica Nutrepampa', 1600, 708)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}
    <h2>De Alegria para o Sul e o Norte do Brasil</h2>
    <p>A Nutrepampa nasceu em Alegria/RS e cresceu em Independência/RS e em Porto Velho/RO. Fornece soluções de nutrição animal de alta qualidade, com laços sólidos com clientes, parceiros e comunidade, baseados em ética, respeito e compromisso.</p>
    <p>Em mais de ${ANOS - 4} anos de atuação, as soluções inovadoras em produtos e em sistemas destacaram a empresa no mercado, sempre com foco no resultado do cliente.</p>
  </div>
  <figure class="sobe">${img('v-sacaria', 'Sacaria Nutrepampa na esteira da fábrica', 1600, 866)}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha do tempo')}<h2>Como a Nutrepampa cresceu</h2></div>
  <ol class="tempo">
    <li class="sobe"><b>2007</b><p>Início das atividades em Alegria/RS, em 6 de dezembro.</p></li>
    <li class="sobe"><b>Expansão</b><p>Crescimento em Independência/RS, onde fica a sede, e em Porto Velho/RO.</p></li>
    <li class="sobe"><b>2019</b><p>A Provemix Núcleos e Minerais amplia o portfólio.</p></li>
    <li class="sobe"><b>2021</b><p>Compra da fábrica em Teutônia/RS.</p></li>
    <li class="sobe"><b>2022</b><p>Empresa cerealista em Independência/RS.</p></li>
  </ol>
</div></section>
<section class="sec"><div class="in">${numeros()}</div></section>
<section class="sec sec-escura"><div class="in duas">
  <div class="sobe">${sobre('Visão e missão')}<h2>Ser líder em nutrição animal, pela qualidade, ética e inovação</h2></div>
  <ul class="valores sobe">
    <li><b>Compromisso</b>Dedicação total ao sucesso de clientes e parceiros.</li>
    <li><b>Ética</b>Integridade e transparência em todas as relações.</li>
    <li><b>Inovação</b>Soluções criativas para o mercado em evolução.</li>
    <li><b>Qualidade</b>Excelência nos produtos, com saúde e bem-estar animal.</li>
    <li><b>Relações sólidas</b>Parcerias de confiança e respeito.</li>
    <li><b>Sustentabilidade</b>Práticas que beneficiam a comunidade e o ambiente.</li>
  </ul>
</div></section>
<section class="sec" id="qualidade"><div class="in duas">
  <figure class="sobe">${img('v-controle', 'Sala de controle da fábrica Nutrepampa', 1600, 866)}</figure>
  <div class="sobe">${sobre('Setor de qualidade')}<h2>Garantindo a excelência em cada grão</h2>
  <p>A qualidade começa na seleção dos ingredientes, de fontes confiáveis. Cada fórmula é desenvolvida pela equipe de nutricionistas e ajustada à necessidade de cada animal.</p>
  <ul class="checks"><li>${ic('check')}Indicadores de qualidade da seleção do ingrediente à embalagem</li><li>${ic('check')}Testes de nutrição, palatabilidade e segurança</li><li>${ic('check')}Acompanhamento do desempenho das fórmulas no campo</li></ul></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Marcas')}<h2>Quatro marcas, um mesmo padrão</h2></div>
  ${marcas()}
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Leite')}<h2>Presente nas fazendas com ordenha robotizada</h2><p>A Ração Proveleite Robô foi feita para ser muito palatável, aumentar as visitas ao robô e levar aditivos promotores de saúde.</p></div>
  <div class="galeria">${img('v-robo', 'Robô de ordenha em fazenda atendida pela Nutrepampa', 1600, 866)}${img('v-ordenha', 'Ordenha robotizada', 1600, 866)}${img('v-galpao', 'Ração Nutrepampa no free stall', 1600, 866)}</div>
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Nutrepampa: ${produtos.length} produtos para gado de corte e leite, ovinos, aves, suínos, equinos e coelhos. Pampa Beef, Nutreplex, Terminador, Grano Entero, Proveleite.`) + topo(v, 'produtos') +
  cabPag('Produtos', `${produtos.length} soluções em ${linhas.length} linhas, com indicação e modo de usar. Escolha a criação ou a linha.`) + `
<section class="sec cat-sec"><div class="in">
  <div class="filtros" data-filtros>
    <div class="f-linhas" role="group" aria-label="Criação"><button type="button" data-g="" aria-pressed="true">Todos <span>${produtos.length}</span></button>${grupos.map(g => `<button type="button" data-g="${g.id}" aria-pressed="false">${g.n} <span>${doGrupo(g.id).length}</span></button>`).join('')}</div>
    <div class="f-campos"><label>Linha<select data-linha><option value="">Todas as linhas</option>${linhas.map(l => `<option value="${l.id}" data-g="${l.g}">${l.n} (${daLinha(l.id).length})</option>`).join('')}</select></label><label>Buscar<input type="search" data-busca placeholder="terminador, bezerra, robô, Nutreplex..."></label><p class="f-total" aria-live="polite"><b data-total>${produtos.length}</b> produtos</p></div>
  </div>
  <ul class="catalogo">${produtos.map(cardProd).join('')}</ul>
  <p class="cat-vazio" hidden>Nenhum produto com esse filtro. Fale com um consultor: ${E.wa}.</p>
</div></section>` + chamada(v) + rodape(v);
}

function resultados(v) {
  return head(v, 'resultados', 'Resultados no campo', 'Cases de sucesso Nutrepampa: ganho médio diário de até 1,92 kg com Grano Entero, Núcleo Confina, Terminador e Nutrepasto em fazendas do RS.') + topo(v, 'resultados') +
  cabPag('Resultados no campo', 'Lotes reais de clientes, com peso de entrada, peso de saída e ganho médio diário.', imgTopo('h-hereford', 'Gado de corte em pastagem', 1080, 760)) + `
<section class="sec"><div class="in">
  <ul class="cases">${cases.map(cardCase).join('')}
  <li class="prenhez sobe"><div><p class="case-linha">Linha Nutrepasto</p><h3>${casePrenhez.prod}</h3><p>${casePrenhez.quem}. ${casePrenhez.t}</p></div><div class="pz-num"><b>65%</b><span>de prenhez na 1ª IATF</span></div></li></ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('No campo')}<h2>Fotos dos lotes</h2></div>
  <div class="galeria g4">${['c-09', 'c-10', 'c-11', 'c-12'].map(c => `<a href="/assets/img/${c}.webp" data-foto="Lote acompanhado pela Nutrepampa">${img(c, 'Novilhos em lote acompanhado pela Nutrepampa', 600, 800)}</a>`).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Arno Spengler, 91, Independência - RS');
  return head(v, 'contato', 'Contato', 'Nutrepampa: (55) 3539-1161, WhatsApp comercial (55) 99616-7812, contato@nutrepampa.com.br. Rua Arno Spengler, 91, Independência/RS. Seja um representante.') + topo(v, 'contato') +
  cabPag('Contato', 'Central de atendimento, consultores e representantes.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Telefone <a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${icWa()}<span>Comercial <a href="${waLink}" ${ext}>${E.wa}</a></span></li>
    <li>${ic('tel')}<span>Recepção <a href="${E.recepcaoHref}">${E.recepcao}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <p class="rod-social ct-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a><a href="${E.li}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p>
    <iframe class="mapa" title="Mapa da Nutrepampa em Independência/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
  <div class="sobe caixa-form"><h2 class="h-form">Solicite atendimento</h2>${form('Solicitação de atendimento pelo site', false)}</div>
</div></section>
<section class="sec sec-cinza" id="representante"><div class="in duas contato-grade">
  <div class="sobe">${sobre('Seja um representante')}<h2>Venda Nutrepampa na sua região</h2>
  <p>A Nutrepampa procura representantes para levar Pampa Beef, Nutreplex, Terminador e as rações da marca a mais produtores. Mande seus dados e a região que você atende.</p>
  <figure>${img('v-galpao', 'Ração Nutrepampa entregue na fazenda', 1600, 866)}</figure></div>
  <div class="sobe caixa-form">${form('Quero ser representante Nutrepampa', true)}</div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Nutrepampa, Independência/RS: nutrição animal desde 2007 para gado de corte e leite, ovinos, aves, suínos, equinos e coelhos. Pampa Beef, Nutreplex e Provemix.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Independência/RS · desde 2007</p>
      <h1>Equilíbrio em nutrição para <em>corte e leite.</em></h1>
      <p class="ha-sub">${produtos.length} produtos em ${linhas.length} linhas, de minerais Pampa Beef e Nutreplex a terminadores, núcleos e rações. Com assistência técnica que acompanha o lote até a balança.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Ver os produtos</a><a class="btn btn-linha" href="${link(v, 'resultados')}">Resultados no campo</a></p>
    </div>
    <figure class="ha-foto">${imgTopo('v-fabrica', 'Fábrica Nutrepampa vista de cima', 1600, 708)}<figcaption><b>+450 t</b> de ração por dia</figcaption></figure>
  </div>
  <div class="in">${numeros()}</div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Soluções')}<h2>Alimentando o bem-estar e o desempenho animal</h2></div>
  ${gradeGrupos(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Bovinos')}<h2>Uma linha para cada fase e cada sistema</h2><p>Cria, recria e terminação no campo nativo, na pastagem ou no confinamento. Bezerras, novilhas e vacas em lactação.</p></div>
  ${linhasCorte(v)}
</div></section>
<section class="faixa-foto"><div class="ff-img">${img('h-corte', 'Novilhos Hereford no campo', 1000, 666)}</div><div class="in ff-txt sobe">
  ${sobre('Resultados no campo')}<h2>1,92 kg de ganho por dia com Grano Entero</h2>
  <p>28 novilhos da Fazenda da Rosa foram de 279 kg para 452 kg em 90 dias. Veja os outros lotes acompanhados.</p>
  <a class="link-seta" href="${link(v, 'resultados')}">Ver os cases ${ic('seta')}</a></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Marcas')}<h2>Nutrepampa, Pampa Beef, Nutreplex e Provemix</h2></div>
  ${marcas()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  const top = cases.slice(0, 3);
  return head(v, 'index', '', 'Nutrepampa: nutrição animal que aparece na balança. Cases com ganho médio diário de até 1,92 kg. Corte, leite, ovinos, aves, suínos e equinos. Independência/RS.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-hereford', 'Gado de corte em pastagem no Rio Grande do Sul', 1080, 760)}</div>
  <div class="in hb-grade">
    <div class="hb-txt">
      <p class="sobrelinha">Nutrição animal · ${ANOS} anos no campo gaúcho</p>
      <h1>O resultado aparece <em>na balança.</em></h1>
      <p class="hb-sub">Minerais, proteicos, terminadores, núcleos e rações para quem produz carne e leite, com consultor técnico acompanhando o lote.</p>
      <p class="ha-acoes"><a class="btn" href="${waLink}" ${ext}>${icWa()} Fale com um consultor</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></p>
    </div>
    <ul class="hb-gmd">${top.map(c => `<li><b>${c.gmd}</b><span>GMD · ${c.prod}</span></li>`).join('')}</ul>
  </div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Cases de sucesso')}<h2>Lotes reais, números reais</h2></div>
  <ul class="cases">${cases.slice(0, 3).map(cardCase).join('')}</ul>
  <p class="mais sobe"><a class="link-seta" href="${link(v, 'resultados')}">Ver todos os resultados ${ic('seta')}</a></p>
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>O que você cria?</h2></div>
  ${gradeGrupos(v)}
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('v-fabrica', 'Fábrica Nutrepampa em Independência/RS', 1600, 708)}</figure>
  <div class="sobe">${sobre('Desde 2007')}<h2>Duas fábricas no RS e um padrão de qualidade</h2>
  <p>Independência e Teutônia produzem mais de 450 toneladas de ração por dia. Da seleção do ingrediente à embalagem, cada etapa tem indicador de qualidade.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Nutrepampa ${ic('seta')}</a></div>
</div></section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), resultados: resultados(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'nutrepampa.js'), path.join(pub, 'assets/nutrepampa.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Nutrepampa', artigo: 'da', url: E.url, lang: 'pt', cor: '#dd7400', fundo: '#303a5f', claro: '#f5f3ef',
  fonteTitulo: "'Montserrat',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com a fábrica e organiza os 117 produtos por criação e por linha.', pontos: ['Catálogo com filtro por criação, linha e busca', 'Linhas de corte e leite com foto da sacaria', 'Marcas Pampa Beef, Nutreplex e Provemix'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul-marinho da marca, abre com o ganho de peso dos lotes de clientes.', pontos: ['Cases com GMD, peso e período', 'Botão de consultor no topo', 'Página para representantes'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
