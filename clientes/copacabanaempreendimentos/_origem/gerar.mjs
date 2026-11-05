// Condomínio Residencial Copacabana / Copacabana Empreendimentos (GO-040, Aparecida de Goiânia). Gera public/{a,b}/ e a página de escolha.
// node clientes/copacabanaempreendimentos/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs copacabanaempreendimentos http://www.copacabanaempreendimentos.com.br/)
// Conteúdo e fotos do site atual em 05/11/2026: home (incl. textos das janelas "+ Detalhes"), /quem-somos, /casas-prontas, /galeria
// e a biblioteca de mídia do WordPress (wp-json/wp/v2/media). Fotos convertidas para webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const TAM = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const E = {
  nome: 'Condomínio Copacabana', url: 'https://copacabanaempreendimentos.overtus.com.br/', antigo: 'http://www.copacabanaempreendimentos.com.br/',
  wa: '556232141942', fone: '(62) 3214-1942', email: 'copacabanaempreendimentos@uol.com.br',
  horario: 'Segunda a sexta, 8h às 17h',
  plantao: ['Av. República do Líbano, 2341', 'Center Shopping Tamandaré, sala 01', 'Setor Oeste, Goiânia - GO'],
  local: 'Às margens da Rodovia GO-040, a 10 minutos do Setor Garavelo, Aparecida de Goiânia, Goiás.',
  video: 'jkzWJWIR9Js',
  curto: 'Condomínio Residencial Copacabana: lotes a partir de 520 m² e casas prontas às margens da GO-040, com lago, canais, reserva natural e financiamento direto pela incorporadora.',
};
const redes = [
  ['insta', 'Instagram', 'https://www.instagram.com/condominiocopacabana/'],
  ['face', 'Facebook', 'https://www.facebook.com/condominioresidencialcopacabana/'],
  ['yt', 'YouTube', 'https://www.youtube.com/channel/UCVDIdHlDiAL3D1Ew-tvquLg'],
];
const msgVisita = 'Olá! Vi o site do Condomínio Copacabana e quero agendar uma visita.';

// ---------- textos do site atual ----------
const T = {
  emp1: 'O Condomínio Residencial Copacabana combina com você e sua família: lotes a partir de 520 m² sem entrada, sem correção monetária, parcelas mensais prefixadas e financiamento direto pela incorporadora em até 240 meses para pagar.',
  emp2: 'No Condomínio Residencial Copacabana você pode aproveitar áreas de lazer com 150.000 m², incluindo reserva natural, pista iluminada para caminhada, lago para pesca esportiva, canais de água, quadra poliesportiva, quadra de areia, quadras de tênis, parquinho infantil e salão de festas.',
  lotes: 'Espaço do jeito que você quiser. Terrenos mais à frente, mais ao fundo, mais altos, mais baixos. Topografia única, com relevo variado, áreas planas e diversas características exclusivas da região.',
  lazer: 'Pode aproveitar: áreas de lazer com 150.000 m². Mais água, mais verde. Fauna e flora preservadas. Pista iluminada para caminhada, lago para pescaria e lazer, canais de água percorrendo o condomínio, cascatas, quadra de areia, quadra poliesportiva, duas quadras de tênis (saibro), parquinho infantil e salão de festas.',
  casas: 'Casas prontas ou a construir a partir de 260 m² de área construída, com um projeto moderno, exclusivo, idealizado por você e executado pelos nossos arquitetos e engenheiros. Tudo construído sob o mais alto padrão de qualidade, cercado de toda segurança, lazer e natureza.',
  casasFin: 'Tudo financiado em até 366 meses. Utilize o seu FGTS ou carta de crédito de consórcio. Consulte condições.',
  pronto: 'Compre o seu lote, fácil de comprar, construa sua casa, financiamento próprio, até 240 meses para pagar. Sem entrada e parcelas mensais prefixadas.',
  hist1: 'A idealização da Copacabana Empreendimentos e Investimentos Imobiliários Ltda. nasceu há 40 anos, quando foi aprovado o projeto inicial para implantação de um loteamento de chácaras, razão pela qual existe hoje um lago com 45.000 m² de superfície e dois quilômetros de canais navegáveis para prática de esportes de pedalinho, caiaque e pescaria.',
  hist2: 'Nestes 40 anos conseguimos manter preservada uma mata de 150.000 m² com animais silvestres, diversas nascentes de água e, sobretudo, a exuberância da natureza do local. A constituição jurídica da Copacabana Empreendimentos decorreu da necessidade de criar musculatura, a fim de constituir o Condomínio Residencial Copacabana, que hoje já é um sucesso.',
  hist3: 'A empresa conta com uma notável equipe de profissionais devidamente habilitados em suas áreas de formação: administradores, advogados, arquitetos, corretores de imóveis e engenheiros, responsáveis pelo planejamento, execução e desenvolvimento de obras e vendas.',
};
const mudeJa = ['Já habitado.', 'Pode mudar já!', 'Casas prontas ou a construir do jeito que você quer.', 'Fácil, fácil de comprar. Entrada a ser negociada com o empreendedor.', 'Financiamento bancário em até 360 meses.'];
const infra = ['Infraestrutura pronta', 'Água', 'Energia', 'Asfalto com meio-fio', 'Muro com cerca elétrica', 'Portaria', 'Sistemas de segurança'];
const lazer = [
  ['lago', 'Lago para pescaria e lazer', 'lago', 'Lago com praticantes de stand up paddle e mata ao fundo'],
  ['canais', 'Canais de água navegáveis', 'ponte', 'Ponte de madeira sobre um dos canais do condomínio'],
  ['pista', 'Pista iluminada para caminhada', 'trilha', 'Moradora correndo na trilha dentro da mata'],
  ['tenis', 'Duas quadras de tênis (saibro)', 'tenis', 'Jogador sacando na quadra de saibro'],
  ['areia', 'Quadra de areia', 'areia', 'Partida de vôlei na quadra de areia'],
  ['parque', 'Parquinho infantil', 'parquinho', 'Crianças brincando no parquinho'],
  ['cascata', 'Cascatas e nascentes', 'cascata', 'Cascata entre as pedras do condomínio'],
  ['ruas', 'Ruas asfaltadas para pedalar', 'bike', 'Casal pedalando numa rua asfaltada do condomínio'],
];
const numeros = [['520 m²', 'lotes a partir de'], ['150.000 m²', 'de lazer e reserva natural'], ['45.000 m²', 'de lago'], ['2 km', 'de canais navegáveis'], ['240 meses', 'financiamento direto']];
const galeria = [
  ['aereo-1', 'Vista aérea: canal, pista e casas do condomínio'], ['lago', 'O lago de 45.000 m²'], ['portaria', 'Portaria do Condomínio Residencial Copacabana'],
  ['casa-lago', 'Casa com gramado à beira do canal'], ['aereo-2', 'Vista aérea do lago e da mata preservada'], ['casa-flores', 'Moradores cuidando do jardim de casa'],
  ['ponte', 'Ponte sobre o canal'], ['canal', 'Canal ao entardecer'], ['trilha', 'Trilha na mata'], ['bike', 'Passeio de bicicleta'],
  ['tenis', 'Quadra de tênis de saibro'], ['areia', 'Quadra de areia'], ['parquinho', 'Parquinho infantil'], ['cascata', 'Cascata'],
  ['aereo-3', 'Vista aérea das quadras e canais'], ['aereo-4', 'Vista aérea com a rodovia e as casas'],
  ['casa-3d-1', 'Perspectiva de casa (projeto)'], ['casa-3d-2', 'Perspectiva de casa à noite (projeto)'], ['quarto-3d', 'Perspectiva de quarto (projeto)'], ['cozinha-3d', 'Perspectiva de cozinha (projeto)'],
];

const nav = [{ slug: 'condominio', nome: 'O condomínio' }, { slug: 'lotes-e-casas', nome: 'Lotes e casas' }, { slug: 'galeria', nome: 'Galeria' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Beira do Lago', b: 'Reserva' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Questrial&display=swap',
};
const cores = { a: '#167450', b: '#0f3a2a' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Condomínio Residencial Copacabana | Lotes de 520 m² e casas às margens da GO-040' : `${titulo} | Condomínio Copacabana`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });

const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n}.webp" width="${TAM[n][0]}" height="${TAM[n][1]}" alt="${esc(alt)}"${extra}>`;
const marca = (v, claro, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Condomínio Copacabana, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="1035" height="534" alt="Condomínio Copacabana"></${tag}>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const onda = cls => `<svg class="onda ${cls}" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 22c180 0 300 30 480 30S780 8 960 8s300 26 480 26v26H0z"/></svg>`;
const mapaSrc = q => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn topo-cta" href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${icWa()}<span>Agendar visita</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-topo">
    <div class="rod-marca">${marca(v, true, 'div')}<p>${T.pronto}</p>
      <ul class="redes">${redes.map(r => `<li><a href="${r[2]}" target="_blank" rel="noopener" aria-label="${r[1]}">${ic(r[0])}</a></li>`).join('')}</ul></div>
    <div><h3>Páginas</h3><ul><li><a href="${link(v, 'index')}">Início</a></li>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Plantão de vendas</h3><p>${E.plantao.join('<br>')}</p><p>${E.horario}</p></div>
    <div><h3>Fale com a gente</h3><ul>
      <li><a href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${icWa()} ${E.fone}</a></li>
      <li><a href="mailto:${E.email}">${ic('mail')} E-mail</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Copacabana Empreendimentos e Investimentos Imobiliários Ltda.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener" aria-label="Agendar visita pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const formVisita = () => `<form class="form" data-wa="${esc(msgVisita)}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Celular*<input name="celular" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label>
  <label>Interesse<select name="interesse"><option>Lote</option><option>Casa pronta</option><option>Casa a construir</option><option>Ainda não sei</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Melhor dia e horário para a visita, dúvidas sobre condições..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp do plantão de vendas, ${E.fone}, com a mensagem pronta.</p>
</form>`;

// ---------- páginas comuns (mesmo conteúdo, desenho de cada versão no CSS) ----------
function comum(v, pag, cab) {
  pag.condominio = head(v, 'condominio', 'O condomínio', 'Lazer em 150.000 m²: lago, canais navegáveis, reserva natural, pista iluminada, quadras de tênis e de areia. Infraestrutura pronta e portaria.') + topo(v, 'condominio') +
    cab('O condomínio', 'Mais água, mais verde.', 'Fauna e flora preservadas. ' + E.local, 'aereo-2', 'Vista aérea do lago e da mata preservada do condomínio') + `
<section class="in cond-intro"><div class="cond-txt"><p class="lead">${T.emp2}</p><p>Infraestrutura pronta, portaria e sistemas de segurança.</p></div>
  <figure class="cond-fig">${foto('portaria', 'Portaria do Condomínio Residencial Copacabana')}<figcaption>Portaria do condomínio</figcaption></figure></section>
<section class="lazer-sec"><div class="in"><header class="tit"><p class="k">Áreas de lazer</p><h2>150.000 m² para aproveitar</h2></header>
  <ul class="lazer">${lazer.map((l, i) => `<li class="sobe"><a href="/assets/img/${l[2]}.webp" data-foto>${foto(l[2], l[3])}</a><span class="lz-n">${String(i + 1).padStart(2, '0')}</span><h3>${l[1]}</h3></li>`).join('')}</ul>
  <p class="lazer-mais">E ainda: quadra poliesportiva e salão de festas.</p></div></section>
<section class="in infra-sec"><div><p class="k">Infraestrutura</p><h2>Pronta para construir e morar</h2><ul class="lista-check">${infra.map(i => `<li>${ic('check')}${i}</li>`).join('')}</ul></div>
  <figure>${foto('aereo-4', 'Vista aérea com ruas asfaltadas, casas e a rodovia ao fundo')}</figure></section>
<section class="in local-sec"><div><p class="k">Localização</p><h2>Às margens da GO-040</h2><p>A 10 minutos do Setor Garavelo, em Aparecida de Goiânia.</p><a class="btn" href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a></div>
  <iframe class="mapa" title="Mapa: Rodovia GO-040, Aparecida de Goiânia" loading="lazy" src="${mapaSrc('Condomínio Residencial Copacabana, GO-040, Aparecida de Goiânia')}"></iframe></section>
` + rodape(v);

  pag['lotes-e-casas'] = head(v, 'lotes-e-casas', 'Lotes e casas', 'Lotes a partir de 520 m² com financiamento direto em até 240 meses, e casas prontas ou a construir a partir de 260 m².') + topo(v, 'lotes-e-casas') +
    cab('Lotes e casas', 'Pronto para morar', T.pronto, 'casa-lago', 'Casa com gramado à beira do canal') + `
<section class="in lc-dupla">
  <article class="lc sobe"><figure>${foto('aereo-1', 'Vista aérea dos lotes, do canal e da pista de caminhada')}</figure><div><p class="k">Lotes de 520 m²</p><h2>Espaço do jeito que você quiser</h2><p>${T.lotes.replace('Espaço do jeito que você quiser. ', '')}</p><p>${T.emp1}</p></div></article>
  <article class="lc sobe"><figure>${foto('casa-flores', 'Moradores cuidando do jardim em frente de casa')}</figure><div><p class="k">Casas prontas</p><h2>Conforto e tranquilidade</h2><p>${T.casas}</p><p>${T.casasFin}</p></div></article>
</section>
<section class="mude"><div class="in mude-in"><div><p class="k">Mude já</p><h2>O condomínio já é habitado</h2><ul class="mude-lista">${mudeJa.map(m => `<li>${ic('check')}${m}</li>`).join('')}</ul>
  <a class="btn" href="${waHref(E.wa, 'Olá! Quero saber as condições para lotes e casas no Condomínio Copacabana.')}" target="_blank" rel="noopener">${icWa()}Consultar condições</a></div>
  <figure>${foto('familia', 'Mãe e filha fazendo selfie no condomínio')}</figure></div></section>
<section class="in proj"><header class="tit"><p class="k">Casas a construir</p><h2>Projeto idealizado por você</h2><p>Executado pelos arquitetos e engenheiros da Copacabana. Perspectivas de projeto:</p></header>
  <ul class="proj-grade">${[['casa-3d-1', 'Perspectiva de fachada'], ['casa-3d-2', 'Perspectiva de fachada à noite'], ['cozinha-3d', 'Perspectiva de cozinha'], ['quarto-3d', 'Perspectiva de quarto']].map(p => `<li><a href="/assets/img/${p[0]}.webp" data-foto>${foto(p[0], p[1] + ' (projeto)')}</a><span>${p[1]}</span></li>`).join('')}</ul></section>
` + rodape(v);

  pag.galeria = head(v, 'galeria', 'Galeria', 'Fotos do Condomínio Residencial Copacabana: lago, canais, mata, quadras, parquinho, casas e vistas aéreas.') + topo(v, 'galeria') +
    cab('Galeria', 'Conheça por dentro', 'Fotos do lago, dos canais, das áreas de lazer e das casas. Toque numa foto para ampliar.', 'aereo-3', 'Vista aérea das quadras e dos canais') + `
<section class="in gal-sec"><ul class="gal">${galeria.map(g => `<li><a href="/assets/img/${g[0]}.webp" data-foto>${foto(g[0], g[1])}</a></li>`).join('')}</ul></section>
<section class="in video-sec"><header class="tit"><p class="k">Vídeo</p><h2>Um passeio pelo condomínio</h2></header>
  <div class="video"><iframe title="Vídeo do Condomínio Residencial Copacabana" loading="lazy" src="https://www.youtube-nocookie.com/embed/${E.video}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></section>
` + rodape(v);

  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'A Copacabana Empreendimentos nasceu há 40 anos com um loteamento de chácaras. Daí vêm o lago de 45.000 m², os canais navegáveis e a mata preservada.') + topo(v, 'quem-somos') +
    cab('Quem somos', 'Há 40 anos cuidando deste lugar', 'Copacabana Empreendimentos e Investimentos Imobiliários Ltda.', 'canal', 'Canal do condomínio ao entardecer') + `
<section class="in qs"><div class="qs-txt"><p class="lead">${T.hist1}</p><p>${T.hist2}</p><p>${T.hist3}</p></div>
  <ol class="linha-tempo"><li><b>Projeto inicial</b><span>Loteamento de chácaras aprovado há 40 anos</span></li><li><b>Lago e canais</b><span>45.000 m² de lago e 2 km de canais navegáveis</span></li><li><b>Mata preservada</b><span>150.000 m² com animais silvestres e nascentes</span></li><li><b>Condomínio Residencial Copacabana</b><span>Hoje já habitado</span></li></ol></section>
<section class="in qs-fotos"><figure>${foto('ponte', 'Ponte sobre o canal')}</figure><figure>${foto('cascata', 'Cascata entre as pedras')}</figure><figure>${foto('trilha', 'Trilha na mata preservada')}</figure></section>
<section class="in qs-equipe"><p class="k">Equipe</p><ul>${['Administradores', 'Advogados', 'Arquitetos', 'Corretores de imóveis', 'Engenheiros'].map(x => `<li>${x}</li>`).join('')}</ul></section>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Agende sua visita ao Condomínio Copacabana. WhatsApp ${E.fone}, ${E.email}. Plantão de vendas no Setor Oeste, Goiânia.`) + topo(v, 'contato') +
    cab('Contato', 'Conheça sua nova forma de viver', 'Preencha para agendar uma visita. A mensagem sai pronta no WhatsApp do plantão de vendas.', 'portaria', 'Portaria do condomínio') + `
<section class="in ct"><div class="ct-form">${formVisita()}</div>
  <aside class="ct-info">
    <div><h3>${icWa()} WhatsApp</h3><p><a href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${E.fone}</a></p></div>
    <div><h3>${ic('mail')} E-mail</h3><p><a href="mailto:${E.email}">${E.email}</a></p></div>
    <div><h3>${ic('relogio')} Atendimento</h3><p>${E.horario}</p></div>
    <div><h3>${ic('pin')} Plantão de vendas</h3><p>${E.plantao.join('<br>')}</p></div>
  </aside></section>
<section class="in ct-mapas"><div><h3>Plantão de vendas</h3><iframe class="mapa" title="Mapa: Av. República do Líbano, 2341, Setor Oeste, Goiânia" loading="lazy" src="${mapaSrc('Av. República do Líbano, 2341, Setor Oeste, Goiânia - GO')}"></iframe></div>
  <div><h3>Condomínio (GO-040)</h3><iframe class="mapa" title="Mapa: Condomínio Residencial Copacabana, GO-040" loading="lazy" src="${mapaSrc('Condomínio Residencial Copacabana, GO-040, Aparecida de Goiânia')}"></iframe></div></section>
` + rodape(v);
}

// ---------- versão A: Beira do Lago ----------
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s, f, alt) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div><figure>${foto(f, alt, ' loading="eager" fetchpriority="high"')}<span class="sol" aria-hidden="true"></span></figure></div>${onda('onda-cab')}</section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Condomínio Residencial Copacabana · GO-040</p><h1>Conheça sua nova forma de viver</h1><p>${T.emp1}</p>
    <p class="bts"><a class="btn" href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a><a class="btn btn-linha" href="${link(v, 'lotes-e-casas')}">Lotes e casas</a></p></div>
  <figure class="hero-a-fig"><span class="sol" aria-hidden="true"></span>${foto('lago', 'Lago do condomínio com praticantes de stand up paddle e mata ao fundo', ' loading="eager" fetchpriority="high"')}</figure>
</div>${onda('onda-hero')}</section>
<section class="num-a"><div class="in"><ul>${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="in pilares"><header class="tit"><p class="k">O empreendimento</p><h2>Lote, casa, lazer e mudança já</h2></header>
  <ul class="pil">${[
    ['Lotes de 520 m²', T.lotes, 'aereo-1', 'Vista aérea dos lotes', 'lotes-e-casas'],
    ['Casas prontas', 'Casas prontas ou a construir a partir de 260 m² de área construída, com projeto moderno e exclusivo.', 'casa-lago', 'Casa à beira do canal', 'lotes-e-casas'],
    ['Áreas de lazer', 'Mais água, mais verde. Lago, canais, cascatas, pista iluminada, quadras e parquinho.', 'tenis', 'Quadra de tênis de saibro', 'condominio'],
    ['Mude já', 'Já habitado. Casas prontas ou a construir do jeito que você quer.', 'casa-flores', 'Moradores no jardim de casa', 'lotes-e-casas'],
  ].map(p => `<li class="sobe"><a href="${link(v, p[4])}"><figure>${foto(p[2], p[3])}</figure><h3>${p[0]}</h3><p>${p[1]}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a></li>`).join('')}</ul></section>
<section class="lago-a">${foto('aereo-2', 'Vista aérea do lago e da mata preservada')}<div class="in"><div class="lago-a-box"><p class="k">Há 40 anos</p><h2>Um lago de 45.000 m² e dois quilômetros de canais</h2><p>Para pedalinho, caiaque e pescaria. E uma mata de 150.000 m² preservada, com animais silvestres e nascentes.</p><a class="btn" href="${link(v, 'quem-somos')}">Nossa história</a></div></div></section>
<section class="in infra-a"><div><p class="k">Infraestrutura pronta</p><h2>Tudo pronto para construir</h2><ul class="lista-check">${infra.slice(1).map(i => `<li>${ic('check')}${i}</li>`).join('')}</ul></div>
  <ul class="mosaico">${['areia', 'trilha', 'parquinho', 'ponte'].map(n => `<li><a href="/assets/img/${n}.webp" data-foto>${foto(n, galeria.find(g => g[0] === n)[1])}</a></li>`).join('')}</ul></section>
<section class="visita-a"><div class="in visita-a-in"><div><p class="k">Agende sua visita</p><h2>Venha conhecer o condomínio</h2><p>${E.local}</p><p><b>Plantão de vendas:</b> ${E.plantao.join(', ')}. ${E.horario}.</p></div>${formVisita()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// ---------- versão B: Reserva ----------
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s, f, alt) => `<section class="cab-b">${foto(f, alt, ' loading="eager" fetchpriority="high"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto('aereo-2', 'Vista aérea do lago e da mata do Condomínio Copacabana', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Condomínio Residencial Copacabana</p><h1>Mais água, <em>mais verde.</em></h1><p>Lotes a partir de 520 m² e casas prontas ao lado de um lago de 45.000 m² e de 150.000 m² de mata preservada. ${E.local}</p>
  <p class="bts"><a class="btn" href="${waHref(E.wa, msgVisita)}" target="_blank" rel="noopener">${icWa()}Agendar visita</a><a class="btn btn-linha" href="${link(v, 'condominio')}">Conhecer o condomínio</a></p></div></section>
<section class="faixa-b"><div class="in"><ul>${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="in duo-b"><figure>${foto('casa-lago', 'Casa com gramado à beira do canal')}</figure><div><p class="k">O empreendimento</p><h2>Combina com você e sua família</h2><p>${T.emp1}</p><ul class="mude-lista">${mudeJa.slice(0, 3).map(m => `<li>${ic('check')}${m}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'lotes-e-casas')}">Lotes e casas ${ic('seta')}</a></div></section>
<section class="idx-b"><div class="in"><header class="tit"><p class="k">Áreas de lazer</p><h2>O que tem dentro do condomínio</h2></header>
  <ol class="idx">${lazer.map((l, i) => `<li class="sobe"><span class="idx-n">${String(i + 1).padStart(2, '0')}</span><h3>${l[1]}</h3><a href="/assets/img/${l[2]}.webp" data-foto>${foto(l[2], l[3])}</a></li>`).join('')}</ol></div></section>
<section class="in hist-b"><blockquote><p>“Nestes 40 anos conseguimos manter preservada uma mata de 150.000 m² com animais silvestres, diversas nascentes de água e, sobretudo, a exuberância da natureza do local.”</p><cite>Copacabana Empreendimentos</cite></blockquote>
  <figure>${foto('cascata', 'Cascata entre as pedras')}</figure></section>
<section class="in tira-b"><ul>${['aereo-1', 'ponte', 'bike', 'canal'].map(n => `<li><a href="/assets/img/${n}.webp" data-foto>${foto(n, galeria.find(g => g[0] === n)[1])}</a></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'galeria')}">Ver a galeria ${ic('seta')}</a></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">Agende sua visita</p><h2>Conheça sua nova forma de viver</h2><p><b>Plantão de vendas</b><br>${E.plantao.join('<br>')}</p><p>${E.horario}</p></div>${formVisita()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Condomínio Copacabana', artigo: 'do', url: E.url, lang: 'pt', cor: '#167450', fundo: '#0f3a2a', claro: '#fbf8ef',
  fonteTitulo: '"League Spartan",system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no verde e no amarelo do sol da marca, com as ondas do logo dividindo as seções e o lago logo na abertura.', pontos: ['Lotes, casas, lazer e "mude já" em quatro cartões', 'Números do condomínio: 520 m², 150.000 m², 45.000 m² de lago', 'Agendamento de visita pelo WhatsApp na home'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em verde-mata, com a vista aérea em tela cheia e "Mais água, mais verde." na abertura.', pontos: ['Áreas de lazer numeradas como um índice', 'A história de 40 anos do lago e da mata', 'Galeria com 20 fotos e o vídeo do condomínio'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
