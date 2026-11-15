// Atman Brasil (Arapongas/PR): fibra de poliéster siliconizada e mantas Thermobond para enchimento. Gera public/{a,b}/ e a página de escolha.
// node clientes/atmanbrasil/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs atmanbrasil https://atmanbrasil.com.br/)
// Textos, especificações, fotos da fábrica e dos produtos do site atual (atmanbrasil.com.br, mídia do wp-json). Logo vetorizado (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const E = {
  nome: 'Atman Brasil', legal: 'Atman Brasil', url: 'https://atmanbrasil.overtus.com.br/', antigo: 'https://atmanbrasil.com.br/',
  fone: '(43) 98854-5446', waNum: '5543988545446', email: 'atendimento@atmanbrasil.com.br',
  end: 'Av. Maracanã, 4870, Jardim Bandeirantes', cidade: 'Arapongas · PR', cep: 'CEP 86703-000',
  hora: 'Segunda a sexta, 8h–11h30 e 13h–17h30',
  insta: 'https://www.instagram.com/atmanbrasil/', face: 'https://www.facebook.com/Atman-Brasil-323015201499547/', yt: 'https://www.youtube.com/channel/UCQ77O29_Q4Wz4XSyKv2ocQQ', linkedin: 'https://www.linkedin.com/in/atmanbrasil/',
  mapa: 'https://www.google.com.br/maps/place/ATMAN+BRASIL/@-23.4057815,-51.4567678,15z/data=!4m2!3m1!1s0x0:0x69fb23f070d5194c',
};
const wa = (msg = 'Olá, vim pelo site da Atman Brasil e quero um orçamento.') => `https://wa.me/${E.waNum}?text=${encodeURIComponent(msg)}`;

const aplicacoes = [
  { id: 'estofados', n: 'Estofados', p: 'fibra', t: 'Enchimento de encostos, braços e almofadas soltas de sofás e poltronas. Fibra oca e conjugada que volta ao volume.' },
  { id: 'almofadas', n: 'Almofadas', p: 'fibra', t: 'Almofadas decorativas cheias, macias e sem embolar, com rendimento alto por quilo.' },
  { id: 'travesseiros', n: 'Travesseiros', p: 'fibra', t: 'Fibra siliconizada para travesseiros com toque de pluma e boa recuperação.' },
  { id: 'pelucias', n: 'Pelúcias', p: 'fibra', t: 'Bichos de pelúcia, artesanato e decoração: fibra limpa, branca e leve.' },
  { id: 'colchoes', n: 'Colchões', p: 'manta', t: 'Mantas para pillow top, tampos e laterais de colchões, de 60 a 500 g/m².' },
  { id: 'edredons', n: 'Edredons', p: 'manta', t: 'Mantas para edredons, cobre-leitos e matelassês, em largura de até 3 metros.' },
  { id: 'vestuario', n: 'Vestuário', p: 'manta', t: 'Forro térmico para jaquetas, coletes e bordados, sem resina.' },
  { id: 'industriais', n: 'Aplicações industriais', p: 'ambos', t: 'Filtros, acústica, embalagens e outras aplicações técnicas da fibra e da manta.' },
];
const IA = { estofados: 'sofa', almofadas: 'quadrado', travesseiros: 'travesseiro', pelucias: 'urso', colchoes: 'cama', edredons: 'onda', vestuario: 'jaqueta', industriais: 'engrenagem' };
const icA = n => {
  const P = {
    sofa: '<path d="M4 11V8a2 2 0 012-2h12a2 2 0 012 2v3"/><path d="M2 13a2 2 0 014 0v2h12v-2a2 2 0 014 0v5H2z"/><path d="M5 18v2M19 18v2"/>',
    quadrado: '<path d="M5 5c3 1 11 1 14 0-1 3-1 11 0 14-3-1-11-1-14 0 1-3 1-11 0-14z"/>',
    travesseiro: '<path d="M3 8c0-2 2-3 4-2 3 1 7 1 10 0 2-1 4 0 4 2v8c0 2-2 3-4 2-3-1-7-1-10 0-2 1-4 0-4-2z"/>',
    urso: '<circle cx="12" cy="13" r="6"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><circle cx="10" cy="12" r=".6"/><circle cx="14" cy="12" r=".6"/><path d="M10.5 15.5c1 .8 2 .8 3 0"/>',
    cama: '<path d="M3 18V7M21 18v-5a3 3 0 00-3-3H10v4"/><path d="M3 13h18M3 18h18"/><circle cx="7" cy="10.5" r="1.5"/>',
    onda: '<path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 18c3-2 6 2 9 0s6-2 9 0"/>',
    jaqueta: '<path d="M9 3l3 3 3-3 5 3-2 5-2-1v11H8V10l-2 1-2-5z"/><path d="M12 6v15"/>',
    engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  };
  return `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
};

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const F = n => img(`f-${n}`, { fachada: 'Fachada e caminhão da Atman Brasil em Arapongas', estoque: 'Estoque de fibra de poliéster ensacada na Atman', producao: 'Rolos de manta prontos na fábrica da Atman', 'manta-linha': 'Linha de produção de mantas Thermobond', operadoras: 'Operadoras enrolando manta de poliéster na Atman', enrolamento: 'Enroladeira de manta na fábrica da Atman' }[n], 905, 601);

const nav = [
  { slug: 'index', n: 'Início' }, { slug: 'empresa', n: 'Empresa' }, { slug: 'produtos', n: 'Produtos' }, { slug: 'aplicacoes', n: 'Aplicações' }, { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Conforto que rende', b: 'Fábrica de fibra' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Figtree:wght@400;500;600&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Atman Brasil | Fibra siliconizada e manta de poliéster para enchimento' : `${titulo} | Atman Brasil`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#012168' });
const btnOrc = (cls = 'btn', txt = 'Pedir orçamento') => `<a class="${cls}" href="${wa()}" ${ext}>${icWa()}${txt}</a>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Atman Brasil, página inicial"><img src="/assets/${v === 'b' ? 'logo-branco' : 'logo'}.svg" alt="Atman Brasil" width="150" height="46"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    ${btnOrc('btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Atman Brasil" width="170" height="52" loading="lazy">
      <p>Fibra de poliéster siliconizada e mantas Thermobond para quem fabrica estofados, colchões, travesseiros e edredons. Arapongas/PR, desde 2006.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a><a href="${E.linkedin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p></div>
    <div><h3>Produtos</h3><ul><li><a href="${link(v, 'produtos')}#fibra">Fibra siliconizada</a></li><li><a href="${link(v, 'produtos')}#manta">Manta Thermobond</a></li><li><a href="${link(v, 'aplicacoes')}">Aplicações</a></li></ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep}</span></li>
      <li>${ic('relogio')}<span>${E.hora}</span></li>
    </ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Rendimento e qualidade que os seus produtos merecem.</span></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="WhatsApp da Atman Brasil">${icWa()}</a>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>2006</b><span>fundada em Arapongas, polo moveleiro do Paraná</span></li>
  <li><b>20</b><span>anos de história em 2026</span></li>
  <li><b>3 m</b><span>de largura máxima da manta</span></li>
  <li><b>100%</b><span>poliéster e reciclável</span></li>
</ul>`;

const pilares = () => `<ul class="pilares">
  <li class="sobe"><span>01</span><h3>Qualidade</h3><p>Fibras importadas de fabricantes de renome internacional, com acabamento uniforme.</p></li>
  <li class="sobe"><span>02</span><h3>Conforto</h3><p>Fibra oca e siliconizada que volta ao volume e deixa o produto final macio.</p></li>
  <li class="sobe"><span>03</span><h3>Rendimento</h3><p>Sua fábrica produzindo mais e gastando menos fibra por peça.</p></li>
</ul>`;

const fibra = (titulo = 'h2') => `<div class="pd sobe" id="fibra">
  <div class="pd-fotos">${img('p-fibra-saco', 'Saco de fibra de poliéster siliconizada Atman', 332, 516)}${img('p-fibra-saco2', 'Fibra siliconizada Atman em embalagem de 5 kg', 309, 460)}</div>
  <div class="pd-txt">${sobre('Pronta para uso')}<${titulo}>Fibra de poliéster siliconizada</${titulo}>
    <p>Trabalhamos só com fibras de alta qualidade, conforto e rendimento, importadas de fabricantes de renome internacional: ótimo acabamento e grande economia na utilização.</p>
    <dl class="ficha"><div><dt>Composição</dt><dd>100% poliéster, siliconizada, oca, conjugada e reciclável</dd></div><div><dt>Tamanhos</dt><dd>7d × 32 mm e 7d × 64 mm</dd></div><div><dt>Embalagens</dt><dd>12 kg e 5 kg</dd></div><div><dt>Para</dt><dd>Estofados, almofadas, travesseiros, pelúcias, decoração, artesanato, filtros e aplicações industriais</dd></div></dl>
    ${btnOrc('btn', 'Orçar fibra')}</div></div>`;

const manta = (titulo = 'h2') => `<div class="pd pd-inv sobe" id="manta">
  <div class="pd-fotos">${img('p-manta-rolo', 'Rolo de manta de poliéster Thermobond Atman', 264, 654)}${img('p-manta-compactada', 'Mantas Atman compactadas para transporte', 478, 329)}</div>
  <div class="pd-txt">${sobre('Tecnologia Thermobond')}<${titulo}>Mantas de poliéster</${titulo}>
    <p>Feitas da mistura de fibras de poliéster com a tecnologia Thermobond, sem nenhum tipo de resina: mais resistência, menos deformação no uso e mais durabilidade. Não usa água nem produtos químicos e é 100% reciclável.</p>
    <dl class="ficha"><div><dt>Gramaturas</dt><dd>60 g/m² a 500 g/m²</dd></div><div><dt>Largura</dt><dd>Até 3 metros</dd></div><div><dt>Embalagem</dt><dd>Compactada em rolo</dd></div><div><dt>Para</dt><dd>Colchões, edredons, estofados, matelassês, vestuário, bordados, artesanato, filtros e aplicações industriais</dd></div></dl>
    ${btnOrc('btn', 'Orçar manta')}</div></div>`;

const gradeAplic = v => `<ul class="aplic">${aplicacoes.map(a => `<li class="sobe"><a href="${link(v, 'aplicacoes')}#${a.id}"><span class="ap-ic">${icA(IA[a.id])}</span><b>${a.n}</b><small>${a.p === 'fibra' ? 'Fibra siliconizada' : a.p === 'manta' ? 'Manta Thermobond' : 'Fibra e manta'}</small></a></li>`).join('')}</ul>`;

const fabrica = () => `<div class="galeria">${['producao', 'operadoras', 'estoque', 'enrolamento', 'fachada'].map((n, i) => `<a class="gal-${i + 1}" href="/assets/img/f-${n}.webp" data-foto="${esc({ fachada: 'Fachada da Atman Brasil', estoque: 'Estoque de fibra ensacada', producao: 'Rolos de manta prontos', operadoras: 'Enrolamento de manta', enrolamento: 'Linha de manta Thermobond' }[n])}">${F(n)}</a>`).join('')}</div>`;

const chamada = () => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Quanto de fibra ou manta você usa por mês?</h2>
  <p>Mande o produto que você fabrica e o volume. A Atman responde com preço, prazo e a fibra ou gramatura certa para a sua peça.</p></div>
  <div class="ch-acoes">${btnOrc('btn', 'Orçamento no WhatsApp')}<a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')}E-mail</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-wa="Orçamento pelo site">
  <div class="form-duas"><label>Nome *<input name="Nome" required autocomplete="name"></label><label>Empresa *<input name="Empresa" required autocomplete="organization"></label></div>
  <div class="form-duas"><label>Cidade / UF *<input name="Cidade" required autocomplete="address-level2"></label><label>Telefone<input name="Telefone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Produto<select name="Produto"><option>Fibra siliconizada</option><option>Manta Thermobond</option><option>Fibra e manta</option></select></label><label>Volume por mês<input name="Volume" placeholder="ex.: 500 kg, 20 rolos"></label></div>
  <label>O que você fabrica *<textarea name="Mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da Atman com a mensagem pronta.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

// ---------- páginas ----------
function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Atman Brasil: fundada em 2006 em Arapongas/PR para atender o polo moveleiro, hoje uma das maiores indústrias de fibra de poliéster e derivados do Sul do país.') + topo(v, 'empresa') +
  cabPag('Uma história de sucesso', 'Fundada em 2006 para atender o polo moveleiro de Arapongas.', imgTopo('f-producao', 'Rolos de manta prontos na fábrica da Atman', 905, 601)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('A empresa')}<h2>Uma das maiores indústrias de fibra de poliéster do Sul</h2>
    <p>Fundada em 2006 com o intuito de atender o polo moveleiro regional, a Atman Brasil em pouco tempo se tornou uma das maiores indústrias de fibras de poliéster e derivados do sul do país.</p>
    <p>Acompanhamos a evolução dos tempos com investimento em tecnologia, matérias-primas de alta qualidade e técnicas modernas de gestão. Assim garantimos a qualidade dos produtos e a pontualidade nas entregas.</p>
    <p>O resultado é um portfólio competitivo, que traz bons resultados para o seu negócio e boas compras para os seus clientes.</p></div>
  <figure class="sobe">${F('fachada')}</figure>
</div></section>
<section class="sec sec-suave"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in mvv">
  <div class="sobe"><h3>Missão</h3><p>Acreditamos que a chave para o seu bem-estar está na excelência do nosso trabalho, e a nossa missão é garantir isso.</p></div>
  <div class="sobe"><h3>Visão</h3><p>Ser referência em qualidade e excelência no nosso segmento, prezando sempre pelo melhor atendimento.</p></div>
  <div class="sobe"><h3>Valores</h3><p>Respeito às pessoas, comprometimento e crescimento contínuo são os pilares do nosso trabalho.</p></div>
</div></section>
<section class="sec sec-azul"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Da fibra ao rolo, em Arapongas</h2><p>Linha Thermobond, enrolamento e estoque para entregar no prazo.</p></div>
  ${fabrica()}
</div></section>` + chamada() + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', 'Fibra de poliéster siliconizada 7d × 32 mm e 7d × 64 mm (12 kg e 5 kg) e mantas Thermobond de 60 a 500 g/m² com até 3 m de largura. Atman Brasil, Arapongas/PR.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Duas linhas, prontas para a sua produção: fibra siliconizada e manta Thermobond.') + `
<section class="sec"><div class="in">${fibra()}</div></section>
<section class="sec sec-suave"><div class="in">${manta()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Onde usar')}<h2>Oito aplicações, duas matérias-primas</h2></div>
  ${gradeAplic(v)}
</div></section>` + chamada() + rodape(v);
}

function aplicacoesPag(v) {
  const foto = { estofados: ['h-marca', 'Almofadas e cama com enchimento Atman', 820, 312], travesseiros: ['l-travesseiros', 'Travesseiros com fibra siliconizada', 548, 657], edredons: ['l-edredom', 'Edredom com manta de poliéster', 548, 657], pelucias: ['h-pelucia', 'Criança dormindo com urso de pelúcia', 1920, 1200], colchoes: ['h-sono', 'Pessoa dormindo em travesseiro macio', 1920, 1200] };
  return head(v, 'aplicacoes', 'Aplicações', 'Fibra e manta Atman para estofados, almofadas, travesseiros, pelúcias, colchões, edredons, vestuário e aplicações industriais.') + topo(v, 'aplicacoes') +
  cabPag('Aplicações', 'Para indústrias e distribuidores do varejo: a fibra e a manta certas para cada produto.') + `
<section class="sec"><div class="in"><ul class="apl-lista">${aplicacoes.map((a, i) => `<li class="apl sobe" id="${a.id}">
  <div class="apl-vis">${foto[a.id] ? img(...foto[a.id]) : `<span class="apl-ic">${icA(IA[a.id])}</span>`}</div>
  <div><span class="apl-num">${String(i + 1).padStart(2, '0')}</span><h2>${a.n}</h2><p>${a.t}</p>
  <p class="apl-prod">${a.p === 'fibra' ? `<a href="${link(v, 'produtos')}#fibra">Fibra siliconizada ${ic('seta')}</a>` : a.p === 'manta' ? `<a href="${link(v, 'produtos')}#manta">Manta Thermobond ${ic('seta')}</a>` : `<a href="${link(v, 'produtos')}">Fibra e manta ${ic('seta')}</a>`}</p></div></li>`).join('')}</ul></div></section>` + chamada() + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Atman Brasil, Av. Maracanã, 4870, Arapongas - PR');
  return head(v, 'contato', 'Contato', 'Fale com a Atman Brasil: WhatsApp (43) 98854-5446, atendimento@atmanbrasil.com.br, Av. Maracanã, 4870, Arapongas/PR.') + topo(v, 'contato') +
  cabPag('Contato e orçamento', 'Dúvidas ou pedido? Fique à vontade, estamos à disposição em horário comercial.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${icWa()}<a href="${wa()}" ${ext}>WhatsApp ${E.fone}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep} · <a href="${E.mapa}" ${ext}>ver no Google Maps</a></span></li>
    <li>${ic('relogio')}<span>${E.hora}</span></li></ul>
    <iframe class="mapa" title="Mapa da Atman Brasil em Arapongas/PR" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe>
    <p class="trab"><a class="link-seta" href="mailto:${E.email}?subject=${encodeURIComponent('Trabalhe conosco')}">Trabalhe conosco: envie seu currículo ${ic('seta')}</a></p></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Atman Brasil, Arapongas/PR: fibra de poliéster siliconizada e mantas Thermobond para estofados, colchões, travesseiros, edredons e pelúcias. Rendimento e qualidade desde 2006.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      <p class="sobrelinha">Fibras e mantas para enchimento · Arapongas/PR</p>
      <h1>O macio do seu produto <em>começa aqui.</em></h1>
      <p class="ha-sub">Fibra de poliéster siliconizada e mantas Thermobond para quem fabrica estofados, colchões, travesseiros, edredons e pelúcias. Rendimento e qualidade que os seus produtos merecem.</p>
      <p class="ha-acoes">${btnOrc()}<a class="btn btn-linha" href="${link(v, 'produtos')}">Ver produtos</a></p>
    </div>
    <div class="ha-fotos">
      <figure class="haf-1">${imgTopo('l-travesseiros', 'Travesseiros brancos com fibra siliconizada', 548, 657)}</figure>
      <figure class="haf-2">${img('f-producao', 'Rolos de manta na fábrica da Atman', 905, 601)}</figure>
      <figure class="haf-3">${img('p-fibra-saco', 'Fibra siliconizada Atman', 332, 516)}</figure>
    </div>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Os produtos da sua empresa com a qualidade Atman')}<h2>Duas matérias-primas, oito aplicações</h2></div>
  ${gradeAplic(v)}
</div></section>

<section class="sec sec-suave"><div class="in">${fibra()}</div></section>
<section class="sec"><div class="in">${manta()}</div></section>

<section class="faixa-foto"><div class="ff-img">${img('h-edredom', 'Edredom branco enrolado sobre a cama', 1920, 1032)}</div><div class="in ff-txt sobe">
  ${sobre('Sempre comprometidos')}<h2>Na busca pela excelência</h2>
  <p>Matéria-prima de qualidade para indústrias e distribuidores do varejo, com profissionais experientes e a melhor tecnologia do mercado.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Atman ${ic('seta')}</a></div></section>

<section class="sec"><div class="in">${pilares()}</div></section>
` + chamada() + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Atman Brasil: indústria de fibra de poliéster siliconizada e mantas Thermobond em Arapongas/PR. Para fábricas de estofados, colchões, travesseiros e edredons.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('f-operadoras', 'Operadoras enrolando manta de poliéster na fábrica da Atman', 905, 601)}</div>
  <div class="in hb-txt">
    <p class="sobrelinha">Indústria de fibra de poliéster · desde 2006</p>
    <h1>Fibra e manta que <em>rendem mais</em> na sua produção.</h1>
    <p class="hb-sub">Fibra siliconizada importada e mantas Thermobond sem resina, feitas em Arapongas, no polo moveleiro do Paraná.</p>
    <p class="ha-acoes">${btnOrc()}<a class="btn btn-linha" href="${link(v, 'produtos')}">Especificações</a></p>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha de produtos')}<h2>Especificações para o seu comprador</h2></div>
  <div class="comp">
    <article class="sobe">${img('p-fibra-saco2', 'Fibra siliconizada Atman', 309, 460)}<div><h3>Fibra siliconizada</h3><dl class="ficha"><div><dt>Fio</dt><dd>7d × 32 mm · 7d × 64 mm</dd></div><div><dt>Tipo</dt><dd>Oca, conjugada, 100% poliéster</dd></div><div><dt>Embalagem</dt><dd>12 kg · 5 kg</dd></div></dl><a class="link-seta" href="${link(v, 'produtos')}#fibra">Detalhes ${ic('seta')}</a></div></article>
    <article class="sobe">${img('p-manta-rolo2', 'Manta Thermobond Atman em rolo', 245, 566)}<div><h3>Manta Thermobond</h3><dl class="ficha"><div><dt>Gramatura</dt><dd>60 a 500 g/m²</dd></div><div><dt>Largura</dt><dd>até 3 m</dd></div><div><dt>Embalagem</dt><dd>Rolo compactado</dd></div></dl><a class="link-seta" href="${link(v, 'produtos')}#manta">Detalhes ${ic('seta')}</a></div></article>
  </div>
</div></section>

<section class="sec sec-azul"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Tecnologia Thermobond: sem resina, sem água, sem química</h2><p>Por isso a manta deforma menos, dura mais e é 100% reciclável.</p></div>
  ${fabrica()}
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Para quem produz')}<h2>Aplicações</h2></div>
  ${gradeAplic(v)}
</div></section>
<section class="sec sec-suave"><div class="in">${pilares()}</div></section>
` + chamada() + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), aplicacoes: aplicacoesPag(v), contato: contato(v) });

copiarSiteJs(pub, E.waNum);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Atman Brasil', artigo: 'da', url: E.url, lang: 'pt', cor: '#012168', fundo: '#012168', claro: '#f4f6fb',
  fonteTitulo: "'Lexend',system-ui,sans-serif", fonteTexto: "'Figtree',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara e macia, com o azul do logo e o amarelo do acento. Abre com travesseiros, rolos de manta e o saco de fibra.', pontos: ['Fibra e manta com a ficha técnica do site', 'Oito aplicações, do estofado ao vestuário', 'Orçamento direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais industrial: abre com a linha de manta e fala direto com o comprador da fábrica.', pontos: ['Comparativo de especificações', 'Galeria da fábrica em Arapongas', 'Mesmas 5 páginas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
