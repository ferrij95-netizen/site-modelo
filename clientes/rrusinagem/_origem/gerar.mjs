// R&R Usinagem Industrial (Gravataí/RS, desde 2004): sistemas de aperto, usinagem de precisão e caldeiraria sob medida. Gera public/{a,b}/ e a página de escolha.
// node clientes/rrusinagem/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rrusinagem https://rrusinagemindustrial.ind.br/)
// Textos do site atual. Só as fotos de peças e de caldeiraria da própria empresa (/fotos/); os banners de banco de imagem do site foram descartados.
// Logo: PNG 180 px do site vetorizado (_origem/vetorizar-logo.py). O site não mostra e-mail: contato por telefone e WhatsApp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'R&R Usinagem Industrial', legal: 'R&R Usinagem Industrial', url: 'https://rrusinagem.overtus.com.br/', antigo: 'https://rrusinagemindustrial.ind.br/',
  fone: '(51) 99309-4849', foneHref: 'tel:+5551993094849', fone2: '(51) 99602-6465', fone2Href: 'tel:+5551996026465',
  wa: 'https://api.whatsapp.com/send?phone=5551993094849', wa2: 'https://api.whatsapp.com/send?phone=5551996026465',
  end: 'Travessa Rolante, 210, Recanto da Corcunda', cidade: 'Gravataí/RS',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const card = p => `<li class="sobe">${img(p[0], p[1])}<b>${p[1]}</b></li>`;

const aperto = [['cabecote-crowfoot', 'Cabeçote Crowfoot'], ['cabecote-tubenut', 'Cabeçote Tubenut (open end)'], ['soquete-engrenado', 'Soquete engrenado'], ['pinhao-conico', 'Engrenagem cônica helicoidal (pinhão)'], ['engrenagem-tubenut', 'Engrenagem de posicionamento'], ['engrenagens-secundarias', 'Engrenagens secundárias'], ['soquete-troca-rapida', 'Soquete troca rápida'], ['soquetes-especiais', 'Soquetes especiais'], ['soquete-longo', 'Ponteira alongada'], ['soquete-sextavado', 'Soquete especial'], ['soquetes-nylon', 'Proteções deslizantes'], ['pinhoes', 'Pinhões']];
const usinagem = [['flange-usinada', 'Flange usinada'], ['placa-usinada', 'Placa de dispositivo'], ['dispositivo-flange', 'Dispositivo com flange'], ['eixo-usinado', 'Eixo usinado'], ['eixos-escalonados', 'Eixos escalonados'], ['buchas', 'Buchas'], ['carretel-usinado', 'Peça torneada'], ['flange-furada', 'Flange furada']];
const caldeiraria = [['protecao-cabine', 'Proteção de cabine para máquina florestal'], ['cabine-florestal', 'Elevação e proteção de cabine'], ['guarda-corpo', 'Guarda-corpo industrial'], ['protecao-maquina', 'Proteção de máquina'], ['dispositivo-caldeiraria', 'Dispositivo em caldeiraria'], ['dispositivo-anel', 'Dispositivo de montagem']];
const setores = ['Alimentício', 'Automotivo', 'Implementos rodoviários', 'Máquinas agrícolas', 'Construção pesada', 'Náutico e naval'];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Quem somos' },
  { slug: 'sistemas-de-aperto', n: 'Sistemas de aperto' },
  { slug: 'usinagem', n: 'Usinagem' },
  { slug: 'caldeiraria', n: 'Caldeiraria' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Peça por peça', b: 'Azul industrial' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800&family=Nunito+Sans:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'R&R Usinagem Industrial | Sistemas de aperto, usinagem e caldeiraria' : `${titulo} | R&R Usinagem Industrial`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#072697' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const marca = (h = 52) => `<img class="logo" src="/assets/logo.svg" alt="" width="${h}" height="${h}"><span class="marca-txt">R&amp;R<small>Usinagem Industrial</small></span>`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Usinagem e caldeiraria desde 2004</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="R&amp;R Usinagem Industrial, página inicial">${marca()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${E.wa}" ${ext}>Falar com especialista</a>
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
    <div class="rod-marca"><span class="marca">${marca(60)}</span>
      <p>Soluções de usinagem e caldeiraria com foco em inovação e precisão, para pequenas e grandes empresas.</p></div>
    <div><h3>Serviços</h3><ul>
      <li><a href="${link(v, 'sistemas-de-aperto')}">Sistemas de aperto</a></li>
      <li><a href="${link(v, 'usinagem')}">Usinagem</a></li>
      <li><a href="${link(v, 'caldeiraria')}">Caldeiraria</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.fone}</a></li>
      <li>${icWa()}<a href="${E.wa2}" ${ext}>${E.fone2}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Quem somos</a></li>
      <li><a href="${link(v, 'empresa')}#setores">Setores atendidos</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Gravataí/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da R&amp;R">${icWa()}</a>
</body>
</html>`;
}

const servicos = v => `<ul class="cards3">
  <li class="sobe"><h3>Sistemas de aperto</h3><p>Cabeçotes Crowfoot e Tubenut, soquetes engrenados, pinhões e soquetes especiais para apertadeiras de linhas de montagem.</p><p><a class="link-seta" href="${link(v, 'sistemas-de-aperto')}">Detalhes ${ic('seta')}</a></p></li>
  <li class="sobe"><h3>Usinagem</h3><p>Usinagem industrial, de precisão e especial, para peças com tolerâncias rigorosas e alto grau de complexidade.</p><p><a class="link-seta" href="${link(v, 'usinagem')}">Detalhes ${ic('seta')}</a></p></li>
  <li class="sobe"><h3>Caldeiraria</h3><p>Dispositivos, poka-yokes, estruturas metálicas, proteções de máquinas e cabines florestais sob medida.</p><p><a class="link-seta" href="${link(v, 'caldeiraria')}">Detalhes ${ic('seta')}</a></p></li>
</ul>`;
const diferenciais = () => `<ul class="cards3">
  <li class="sobe"><h3>Tecnologia e equipe especializada</h3><p>Equipamentos de última geração e equipe técnica para usinagem e caldeiraria com máxima precisão e eficiência.</p></li>
  <li class="sobe"><h3>Soluções personalizadas</h3><p>Atendimento consultivo com elaboração de desenhos, sugestões de especificação e orientação sobre materiais.</p></li>
  <li class="sobe"><h3>Qualidade com agilidade</h3><p>Cada peça entregue com excelência, nas especificações mais exigentes, sem perder o prazo.</p></li>
</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Pronto para tirar o projeto do papel?</h2>
  <p>Fale com um especialista da R&amp;R. Mande o desenho ou explique a necessidade e receba a solução técnica.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Chamar no WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Quem somos', 'R&R Usinagem Industrial: desde 2004 em Gravataí/RS, projetos e protótipos sob medida para os setores alimentício, automotivo, implementos rodoviários, náutico e naval.') + topo(v, 'empresa') +
  cabPag('Quem somos', 'Desde 2004, inovação e precisão para pequenas e grandes empresas.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 2004')}<h2>Soluções ágeis para linhas de produção</h2>
  <p>A R&amp;R Usinagem Industrial desenvolve soluções ágeis e eficientes para os processos produtivos de empresas de diversos setores. Cria projetos e protótipos sob medida para clientes que buscam mais estabilidade, produtividade e qualidade nas suas linhas.</p>
  <p>O compromisso é entregar produtos e serviços com alto padrão de qualidade e rapidez, construindo parcerias sólidas e duradouras, com bom relacionamento comercial e confiança mútua.</p></div>
  <figure class="sobe">${img('flange-usinada', 'Flange usinada pela R&R')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Diferenciais')}<h2>Por que a R&amp;R</h2></div>
  ${diferenciais()}
</div></section>
<section class="sec" id="setores"><div class="in duas">
  <div class="sobe">${sobre('Setores')}<h2>Onde nossas peças trabalham</h2>
  ${checks(setores)}</div>
  <div class="sobe"><ul class="cards3" style="grid-template-columns:1fr">
    <li><h3>Visão</h3><p>Buscar a excelência no atendimento, executando com perfeição e agilidade os projetos, com equipe especializada, prazos respeitados e qualidade.</p></li>
    <li><h3>Missão</h3><p>Ser referência e a melhor opção para clientes, colaboradores, comunidade e fornecedores, pela qualidade dos produtos, serviços e relacionamento.</p></li>
  </ul></div>
</div></section>` + chamada(v) + rodape(v);
}

function aptoPag(v) {
  return head(v, 'sistemas-de-aperto', 'Sistemas de aperto', 'Sistemas de aperto R&R: cabeçotes Crowfoot e Tubenut, soquetes engrenados, pinhões, engrenagens de posicionamento, soquetes especiais e troca rápida.') + topo(v, 'sistemas-de-aperto') +
  cabPag('Sistemas de aperto', 'Para montadoras de automóveis, equipamentos agrícolas, máquinas pesadas e transportes.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Materiais certificados')}<h2>Dimensionado peça por peça</h2>
  <p>Todos os produtos usam materiais certificados e passam por dimensionamento e especificação do material, do tratamento térmico, do tratamento de superfície e do melhor processo de usinagem, em padrões mundiais de qualidade.</p>
  ${checks(['Cabeçote de aperto múltiplo', 'Cabeçotes Tubenut (open end) e Crowfoot', 'Soquete engrenado e engrenagens de posicionamento', 'Engrenagem cônica helicoidal (pinhão)', 'Proteções deslizantes para apertadeira e soquete', 'Soquete especial, porta-bit e troca rápida', 'Dispositivos de aperto especiais'])}</div>
  <figure class="sobe">${img('kit-soquetes', 'Soquetes e ponteiras R&R')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Feitas na R&amp;R</h2></div>
  <ul class="ped ped4">${aperto.map(card).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function usinagemPag(v) {
  return head(v, 'usinagem', 'Usinagem', 'Usinagem R&R: usinagem industrial, de precisão e especial, com máquinas de última geração em Gravataí/RS.') + topo(v, 'usinagem') +
  cabPag('Usinagem', 'Alto nível técnico, agilidade e qualidade.') + `
<section class="sec"><div class="in">
  <ul class="cards3">
    <li class="sobe"><h3>Usinagem industrial</h3><p>Soluções completas para diversos setores, com capacidade para demandas de alto grau de complexidade.</p></li>
    <li class="sobe"><h3>Usinagem de precisão</h3><p>Trabalhos de extrema precisão e detalhamento, com peças e componentes em tolerâncias rigorosas.</p></li>
    <li class="sobe"><h3>Usinagem especial</h3><p>Soluções personalizadas para projetos que pedem abordagens diferentes.</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Torneadas, fresadas e furadas</h2></div>
  <ul class="ped ped4">${usinagem.map(card).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function caldeirariaPag(v) {
  return head(v, 'caldeiraria', 'Caldeiraria', 'Caldeiraria R&R: dispositivos para processos produtivos, poka-yokes, estruturas metálicas, guarda-corpos, proteções de máquinas e cabines florestais.') + topo(v, 'caldeiraria') +
  cabPag('Caldeiraria', 'Corte, dobra, calandragem e solda a serviço de projetos complexos.', ['protecao-cabine', 'Proteção de cabine de máquina florestal']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Sob medida')}<h2>Dispositivos, estruturas e proteções</h2>
  ${checks(['<b>Dispositivos para processos produtivos</b>: menos tempo de produção e menos avarias', '<b>Poka-yokes</b> que previnem erros e garantem a conformidade', '<b>Estruturas metálicas</b> de pequeno e médio porte', '<b>Elevação e proteção de cabines</b> para máquinas florestais', '<b>Guarda-corpos e proteções</b> para máquinas e equipamentos, conforme as normas de segurança'])}</div>
  <figure class="sobe">${img('guarda-corpo', 'Guarda-corpo industrial feito pela R&R')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Projetos')}<h2>Caldeiraria R&amp;R</h2></div>
  <div class="galeria">${caldeiraria.map(f => foto(f[0], f[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Travessa Rolante, 210, Gravataí - RS');
  return head(v, 'contato', 'Contato', 'R&R Usinagem Industrial: (51) 99309-4849 e (51) 99602-6465. Travessa Rolante, 210, Recanto da Corcunda, Gravataí/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Fale com um de nossos especialistas.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${icWa()}<a href="${E.wa}" ${ext}>${E.fone}</a></li>
    <li>${icWa()}<a href="${E.wa2}" ${ext}>${E.fone2}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} Ligar</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da R&R em Gravataí/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'R&R Usinagem Industrial: sistemas de aperto, usinagem de precisão e caldeiraria sob medida em Gravataí/RS, desde 2004.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Gravataí/RS · desde 2004')}
      <h1>Inovação e precisão <em>em cada aperto.</em></h1>
      <p class="ha-sub">Sistemas de aperto, usinagem e caldeiraria sob medida para pequenas e grandes empresas, com atendimento consultivo do desenho à entrega.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com especialista</a><a class="btn btn-linha" href="${link(v, 'sistemas-de-aperto')}">Ver peças</a></p>
    </div>
    <div class="ha-prod">${imgTopo('cabecote-crowfoot', 'Cabeçote Crowfoot usinado pela R&R')}<span class="ha-tag"><b>Desde 2004</b>projetos sob medida</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Materiais certificados</span><span>${ic('check')}Projeto e protótipo</span><span>${ic('check')}Usinagem de precisão</span><span>${ic('check')}Caldeiraria sob medida</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Serviços')}<h2>Três frentes, uma oficina</h2></div>
  ${servicos(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Sistemas de aperto R&amp;R</h2></div>
  <ul class="ped ped4">${aperto.slice(0, 8).map(card).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Diferenciais')}<h2>Transformamos desafios em resultados</h2></div>
  ${diferenciais()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'R&R Usinagem Industrial: usinagem, caldeiraria e sistemas de aperto especiais para indústrias automotiva, agrícola, alimentícia, náutica e naval.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('protecao-cabine', 'Proteção de cabine florestal feita pela R&R')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('R&R Usinagem Industrial · desde 2004')}
    <h1>Do desenho <em>à peça pronta.</em></h1>
    <p class="hb-sub">Usinagem, caldeiraria e sistemas de aperto especiais com equipe técnica e atendimento consultivo.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Falar com especialista</a><a class="btn btn-linha" href="${link(v, 'caldeiraria')}">Caldeiraria</a></p>
    <div class="hb-selo"><div><b>2004</b><span>fundação</span></div><div><b>3</b><span>frentes de serviço</span></div><div><b>6</b><span>setores atendidos</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Serviços')}<h2>Aperto, usinagem e caldeiraria</h2></div>
  ${servicos(v)}
</div></section>
<section class="lado">
  <figure style="background:#fff">${img('flange-usinada', 'Flange usinada')}</figure>
  <div class="sobe">${sobre('Usinagem')}<h2>Tolerâncias rigorosas, prazos curtos</h2>
  <p>Usinagem industrial, de precisão e especial, com máquinas de última geração e foco constante em agilidade.</p>
  <p><a class="link-seta" href="${link(v, 'usinagem')}">Ver usinagem ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Feitas em Gravataí</h2></div>
  <ul class="ped ped4">${[...aperto.slice(0, 4), ...usinagem.slice(2, 6)].map(card).join('')}</ul>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), 'sistemas-de-aperto': aptoPag(v), usinagem: usinagemPag(v), caldeiraria: caldeirariaPag(v), contato: contato(v) });

copiarSiteJs(pub, '5551993094849');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'R&R Usinagem', artigo: 'da', url: E.url, lang: 'pt', cor: '#072697', fundo: '#0b1a4f', claro: '#f3f4f8',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: "'Nunito Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, abre com o cabeçote Crowfoot e mostra as peças de sistemas de aperto.', pontos: ['Vitrine de peças na home', 'Uma página por serviço', 'Contato direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Azul escuro, abre com a proteção de cabine florestal e destaca a caldeiraria.', pontos: ['Caldeiraria em tela cheia', 'Usinagem em destaque', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
