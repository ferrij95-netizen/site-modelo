// Eurocar Soluções Automotivas (Balneário Camboriú/SC). Gera public/{a,b}/ e a página de escolha.
// node clientes/eurocarbalneario/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs eurocarbalneario http://www.eurocarbalneario.com.br/)
// Textos tirados do site atual (eurocarbalneario.com.br, home + frases do carrossel). Fotos: as do site atual (banco de imagens). Ver LEIA-ME.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Eurocar Soluções Automotivas', curto: 'Eurocar', url: 'https://eurocarbalneario.overtus.com.br/', antigo: 'http://www.eurocarbalneario.com.br/',
  fone: '(47) 3081-5060', fone2: '(47) 3367-8160',
  rua: 'Av. das Arapongas, nº 7', bairro: 'Ariribá', cidade: 'Balneário Camboriú/SC',
  insta: 'https://www.instagram.com/eurocarbalneario', face: 'https://www.facebook.com/eurocarbalneario',
};
const historia = 'Há mais de 15 anos oferecendo soluções para veículos nacionais e importados com qualidade e tecnologia de ponta. São anos de história em Balneário Camboriú, trazendo aos nossos clientes o melhor para seus carros, com toda a experiência profissional, qualidade e tecnologia.';
const qualidade = 'A Eurocar oferece manutenção completa de todos os sistemas do veículo como: motor, elétrica, injeção eletrônica, câmbio manual/automático, suspensão, freios, geometria, balanceamento e ainda, manutenção e higienização do ar condicionado. Com certificação internacional, mantemos uma equipe qualificada aliada a modernos equipamentos.';
// os 12 serviços do site atual, na mesma ordem
const servicos = [
  { ic: 'oleo', t: 'Troca de óleo' }, { ic: 'gota', t: 'Pintura' }, { ic: 'engrenagem', t: 'Câmbio automático' }, { ic: 'medidor', t: 'Motor' },
  { ic: 'chama', t: 'Elétrica' }, { ic: 'disco', t: 'Freios' }, { ic: 'floco', t: 'Ar condicionado' }, { ic: 'chave', t: 'Suspensão' },
  { ic: 'engrenagem', t: 'Câmbio' }, { ic: 'painel', t: 'Injeção eletrônica' }, { ic: 'volante', t: 'Direção hidráulica' }, { ic: 'carro', t: 'Acessórios' },
];
// frases do carrossel do site atual
const destaques = [
  { f: 'cambio', k: 'Manutenção de', t: 'Câmbio automático', d: 'Manutenção de câmbio automático, além do câmbio manual, para marcas nacionais e importadas.' },
  { f: 'pintura', k: 'Funilaria', t: 'Lataria, pintura e polimento', d: 'Centro automotivo com pintura e estética: lataria, pintura e polimento no mesmo endereço.' },
  { f: 'painel', k: 'Ar condicionado', t: 'Eficiência do seu ar', d: 'Garanta a saúde dos seus passageiros e a eficiência do seu ar, com manutenção e higienização do ar condicionado.' },
  { f: 'oleo', k: 'Lubrificação', t: 'Troca de óleo e filtro', d: 'Troca de óleo e filtro para veículos nacionais e importados.' },
];
const grupos = [
  { t: 'Mecânica', itens: ['Motor', 'Câmbio manual', 'Câmbio automático', 'Injeção eletrônica', 'Freios', 'Suspensão', 'Direção hidráulica', 'Geometria e balanceamento'] },
  { t: 'Elétrica e conforto', itens: ['Elétrica', 'Ar condicionado: manutenção e higienização', 'Acessórios'] },
  { t: 'Pintura e estética', itens: ['Lataria', 'Pintura', 'Polimento'] },
  { t: 'Troca de óleo', itens: ['Óleo', 'Filtro'] },
];
const fotos = {
  farol: 'Farol de carro branco', mecanico: 'Mecânico trabalhando no motor', mecanico2: 'Mecânico com chave no motor de um carro',
  cambio: 'Alavanca de câmbio automático', pintura: 'Pistola de pintura sobre lataria branca', painel: 'Painel e saídas de ar de um carro', oleo: 'Óleo sendo colocado no motor',
};
const tam = { farol: [1600, 736], mecanico: [1600, 736], mecanico2: [1600, 678], cambio: [1600, 736], pintura: [1600, 736], painel: [1600, 736], oleo: [1600, 736] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-eurocar', nome: 'A Eurocar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Doze estrelas', b: 'É na Eurocar' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@600;700;800&family=Gantari:wght@400;500;600;700&family=Sarpanch:wght@600;700;800&family=Radio+Canada:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#ffffff', b: '#efefec' };
const tel = telHref(E.fone), tel2 = telHref(E.fone2);
const mapsLink = 'https://www.google.com/maps/place/Eurocar+Solu%C3%A7%C3%B5es+Automotivas/@-26.9732425,-48.6388092,16z';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.curto} | Oficina mecânica, pintura e estética em Balneário Camboriú` : `${titulo} | ${E.curto}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = `Ligar ${E.fone}`, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
// estrela de 5 pontas e o círculo de 12 estrelas do logo
const estrela = (cls = 'est') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.8 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-5.9 3.4 1.4-6.6-5-4.5 6.7-.7z"/></svg>`;
const anel = (cls = 'anel') => `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6 - Math.PI / 2; const x = 100 + 82 * Math.cos(a), y = 100 + 82 * Math.sin(a); return `<path fill="currentColor" transform="translate(${(x - 9).toFixed(1)} ${(y - 9).toFixed(1)}) scale(.75)" d="M12 2.5l2.8 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-5.9 3.4 1.4-6.6-5-4.5 6.7-.7z"/>`; }).join('')}</svg>`;
// facetas amarelas e azuis do rodapé do site atual
const facetas = (cls = 'facetas') => `<svg class="${cls}" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path fill="#f1ce00" d="M0 120 120 40 260 120z"/><path fill="#d9a700" d="M120 40 260 120 330 70z"/><path fill="#00376a" d="M430 120 520 20 600 120z"/><path fill="#f1ce00" d="M560 120 700 30 860 120z"/><path fill="#e8b800" d="M700 30 860 120 900 60z"/><path fill="#f6dc3a" d="M900 60 1040 10 1200 120 860 120z"/><path fill="#d9a700" d="M1040 10 1200 50 1200 120z"/></svg>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${tel}">${E.fone}</a><a href="${tel2}">${E.fone2}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, bairro ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><a href="${E.insta}" ${ext}>@eurocarbalneario</a><a href="${E.face}" ${ext}>facebook.com/eurocarbalneario</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Eurocar em Balneário Camboriú" loading="lazy" src="https://maps.google.com/maps?q=-26.9732425,-48.6388092&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Eurocar, página inicial"><img src="/assets/logo.webp" alt="Eurocar Soluções Automotivas" width="534" height="304"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  ${v === 'b' ? facetas('facetas rod-facetas') : ''}
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Eurocar Soluções Automotivas" width="534" height="304" loading="lazy"><p>Centro automotivo, pintura e estética em Balneário Camboriú. Transparência, atenção e seriedade.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${tel}">${E.fone}</a><br><a href="${tel2}">${E.fone2}</a></span></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
      <li>${ic('insta')}<a href="${E.insta}" ${ext}>@eurocarbalneario</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Eurocar Soluções Automotivas. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Eurocar">${ic('tel')}</a>
</body>
</html>
`;
}

const doze = (cls = '') => `<ol class="doze ${cls}">${servicos.map((s, i) => `<li class="sobe">${ic(s.ic)}<span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3></li>`).join('')}</ol>`;
const gruposHtml = () => `<div class="grupos">${grupos.map(g => `<section class="grupo sobe"><h2>${g.t}</h2><ul class="lista-check">${g.itens.map(x => `<li>${x}</li>`).join('')}</ul></section>`).join('')}</div>`;

function comum(v, pag, cab) {
  pag['a-eurocar'] = head(v, 'a-eurocar', 'A Eurocar', 'Há mais de 15 anos em Balneário Camboriú: soluções para veículos nacionais e importados, com equipe qualificada e equipamentos modernos.') + topo(v, 'a-eurocar') + cab('A Eurocar', 'Anos de história em Balneário Camboriú', 'mecanico2') + `
<div class="in">
<section class="sobre-pag"><div class="sobre-txt"><p class="k">Missão e história</p><p>${historia}</p><p class="k">Qualidade e tecnologia</p><p>${qualidade}</p></div>
<aside class="selo sobe">${anel()}<b>15+</b><span>anos em Balneário Camboriú</span></aside></section>
<section class="tres"><article class="sobe"><h3>Transparência</h3><p>O jeito da Eurocar receber cada cliente que chega à oficina.</p></article><article class="sobe"><h3>Atenção</h3><p>Nacionais e importados, do óleo ao câmbio automático.</p></article><article class="sobe"><h3>Seriedade</h3><p>Equipe qualificada aliada a modernos equipamentos.</p></article></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Motor, elétrica, injeção eletrônica, câmbio manual e automático, suspensão, freios, geometria, balanceamento, ar condicionado, pintura e troca de óleo em Balneário Camboriú.') + topo(v, 'servicos') + cab('Serviços', 'Manutenção completa de todos os sistemas do veículo', 'cambio') + `
<div class="in">
<p class="intro">Do óleo ao câmbio automático, da elétrica à pintura: a Eurocar cuida do carro inteiro, nacional ou importado.</p>
${gruposHtml()}
<section class="faixa-ligue"><div><p class="k">Orçamento</p><h2>Fale com a oficina</h2><p>Ligue e diga o modelo do carro e o que ele está apresentando.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Eurocar: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefones ${E.fone} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Faça uma visita', 'farol') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel()}${btnMapa()}</p></div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${anel('anel tit-anel')}</div></section>`;
  pag.index = head(v, 'index', '', 'A oficina completa para o seu veículo em Balneário Camboriú: mecânica, câmbio automático, elétrica, ar condicionado, pintura e troca de óleo. Nacionais e importados.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Centro automotivo · Pintura e estética · Balneário Camboriú</p><h1>A oficina completa para o seu veículo.</h1><p>Soluções para veículos nacionais e importados, com qualidade e tecnologia de ponta, há mais de 15 anos.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p></div>
  <figure class="hero-a-foto">${img('farol', ' loading="eager" fetchpriority="high"')}${anel('anel hero-anel')}</figure>
</div></section>
<section class="faixa-a"><div class="in"><ul>${servicos.map(s => `<li>${estrela()}${s.t}</li>`).join('')}</ul></div></section>
<section class="in doze-a"><header class="tit"><p class="k">Doze serviços</p><h2>Uma estrela para cada serviço</h2><p>${qualidade.split('. ')[0]}.</p></header>${doze()}<a class="link-seta" href="${link(v, 'servicos')}">Ver todos os serviços ${ic('seta')}</a></section>
<section class="hist-a"><figure>${img('mecanico2')}</figure><div class="hist-a-txt"><p class="k">Missão e história</p><h2>Anos de história em Balneário Camboriú</h2><p>${historia}</p><a class="link-seta" href="${link(v, 'a-eurocar')}">Conheça a Eurocar ${ic('seta')}</a></div></section>
<section class="in dest-a">${destaques.map(d => `<article class="sobe">${img(d.f)}<div><p class="k">${d.k}</p><h3>${d.t}</h3><p>${d.d}</p><p class="ena">É na Eurocar.</p></div></article>`).join('')}</section>
<section class="cta-a"><div class="in cta-a-in">${anel('anel cta-anel')}<div><h2>Seja bem-vindo à Eurocar!</h2><p>Transparência, atenção e seriedade. ${E.rua}, ${E.bairro}, ${E.cidade}.</p></div><p class="bts">${btnTel('Ligar agora', 'btn btn-ama')}${btnMapa('btn btn-linha-c')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="cab-b-foto">${img(f, ' loading="eager"')}</div><div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div>${facetas('facetas cab-facetas')}</section>`;
  pag.index = head(v, 'index', '', 'Eurocar, Balneário Camboriú: câmbio automático, lataria, pintura e polimento, ar condicionado, troca de óleo e manutenção completa de nacionais e importados.') + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-foto">${img('mecanico', ' loading="eager" fetchpriority="high"')}</div><div class="in hero-b-in"><div class="hero-b-caixa">
  <p class="k">Eurocar · Balneário Camboriú</p><h1>A oficina completa para o seu veículo.</h1><p>Marcas nacionais e importadas. Mecânica, elétrica, ar condicionado, pintura e estética num só endereço.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></div>${facetas('facetas hero-facetas')}</section>
<section class="ena-b">${destaques.map((d, i) => `<article class="ena-linha${i % 2 ? ' inv' : ''}"><div class="ena-foto">${img(d.f)}</div><div class="ena-txt sobe"><p class="k">${d.k}</p><h2>${d.t}</h2><p class="ena">é na Eurocar.</p><p>${d.d}</p></div></article>`).join('')}</section>
<section class="servs-b"><div class="in"><header class="tit"><p class="k">Manutenção completa</p><h2>Todos os sistemas do veículo</h2></header>${doze('doze-b')}<a class="link-seta" href="${link(v, 'servicos')}">Detalhes dos serviços ${ic('seta')}</a></div></section>
<section class="in duas-b"><div><p class="k">Qualidade e tecnologia</p><h2>Equipe qualificada, equipamentos modernos</h2><p>${qualidade.split('. ')[1]}</p><a class="link-seta" href="${link(v, 'a-eurocar')}">A Eurocar ${ic('seta')}</a></div><ul class="trio-b"><li><b>15+</b><span>anos em Balneário Camboriú</span></li><li><b>12</b><span>serviços na mesma oficina</span></li></ul></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Transparência, atenção e seriedade.</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}. ${E.fone} · ${E.fone2}</p></div><p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#f1ce00', fundo: '#00376a', claro: '#ffffff',
  fonteTitulo: "'Smooch Sans',system-ui,sans-serif", fonteTexto: "'Gantari',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, em branco e no azul do logo, com o círculo de doze estrelas como marca. Doze estrelas, doze serviços: cada um numerado na página inicial.', pontos: ['"A oficina completa para o seu veículo" na abertura', 'Os 12 serviços numa faixa azul', 'Telefone e endereço sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Cinza claro e amarelo, com as facetas amarelas do rodapé atual. As frases do carrossel antigo viram faixas: câmbio automático, pintura, ar e óleo, "é na Eurocar".', pontos: ['Foto da oficina na abertura', 'Quatro faixas "é na Eurocar"', 'Serviços numerados de 01 a 12'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
