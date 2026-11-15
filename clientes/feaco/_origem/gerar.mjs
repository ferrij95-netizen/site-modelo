// FEAÇO (Rio das Pedras/SP): caldeiraria pesada sob encomenda, tanques de transformadores e reatores, mineração, tratamento de efluentes, caldeiras e usinas. Gera public/{a,b}/ e a página de escolha.
// node clientes/feaco/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs feaco https://feaco.com.br/wordpress/)
// Textos do site atual. Fotos do portfólio do WordPress (/wp-json/wp/v2/media), com a marca d'água do canto inferior cortada. Logo: PNG 1919 px do site (raster, com textura).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'FEAÇO', legal: 'FEAÇO Ltda.', url: 'https://feaco.overtus.com.br/', antigo: 'https://feaco.com.br/wordpress/',
  fone: '(19) 3437-4800', foneHref: 'tel:+551934374800', email: 'contato@feaco.com.br',
  end: 'Rodovia do Açúcar (SP-308), km 143, Distrito Industrial', cidade: 'Rio das Pedras/SP · CEP 13390-000',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;

const segmentos = [
  { id: 'transformadores', n: 'Tanques de transformadores', t: 'Tanques para trafos de energia de grande porte, do corte à pintura, prontos para o transporte.', f: [['trafo-fabrica', 'Tanque de transformador na fábrica'], ['trafo-2', 'Tanque de transformador em montagem'], ['trafo-patio', 'Tanque de transformador no pátio'], ['trafo-transporte', 'Tanque de transformador sobre carreta'], ['trafo-7', 'Tanque de transformador concluído'], ['trafo-montagem', 'Montagem de tanque de transformador']] },
  { id: 'reatores', n: 'Tanques e armaduras de reatores', t: 'Tanques de reatores e armaduras estruturais para o setor de energia.', f: [['tanque-reator', 'Tanque de reator'], ['armadura-reator', 'Armadura de reator'], ['armadura-reator-2', 'Componentes de armadura de reator']] },
  { id: 'mineracao', n: 'Mineração', t: 'Baterias de hidrociclones e estruturas para beneficiamento mineral.', f: [['bateria-mineracao', 'Bateria de mineração sendo içada'], ['hidrociclones', 'Bateria de hidrociclones'], ['mineracao-ciclone', 'Equipamento de mineração'], ['mineracao-estrutura', 'Estrutura para mineração']] },
  { id: 'efluentes', n: 'Tratamento de efluentes', t: 'Tanques e vasos para estações de tratamento de água e efluentes.', f: [['tanque-efluente', 'Tanque para tratamento de efluentes'], ['vaso-efluente', 'Vaso de pressão para tratamento de efluentes'], ['tanque-transporte', 'Tanque saindo da fábrica']] },
  { id: 'caldeiras', n: 'Caldeiras, aquecedores e usinas', t: 'Corpos cilíndricos, aquecedores, acessórios e equipamentos para usinas de açúcar e álcool.', f: [['cilindros', 'Corpos cilíndricos em caldeiraria']] },
];
const clientes = ['Siemens', 'Hitachi', 'ABB', 'Alstom', 'FLSmidth', 'Yete'];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'portfolio', n: 'Portfólio' },
  { slug: 'qualidade', n: 'Qualidade' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Sob encomenda', b: 'Caldeiraria pesada' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'FEAÇO | Equipamentos de aço construídos por encomenda' : `${titulo} | FEAÇO`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#0b6fb8' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 58) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.webp" alt="FEAÇO" width="${Math.round(h * 720 / 469)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Equipamentos de aço construídos por encomenda</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="FEAÇO, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Solicitar cotação</a>
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
    <div class="rod-marca">${logo(true, 70)}
      <p>Caldeiraria pesada sob encomenda para energia, mineração, saneamento e usinas. ISO 9001.</p></div>
    <div><h3>Portfólio</h3><ul>${segmentos.map(s => `<li><a href="${link(v, 'portfolio')}#${s.id}">${s.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Sobre a FEAÇO</a></li>
      <li><a href="${link(v, 'qualidade')}">ISO 9001 e prêmios</a></li>
      <li><a href="${link(v, 'qualidade')}#etica">Ética e conduta</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Rio das Pedras/SP</span></div>
</footer>
</body>
</html>`;
}

const listaClientes = () => `<ul class="clientes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>`;
const cardsSeg = v => `<ul class="setores">${segmentos.slice(0, 4).map(s => `<li class="sobe"><a href="${link(v, 'portfolio')}#${s.id}"><span class="st-img">${img(s.f[0][0], s.f[0][1])}</span><span class="st-txt"><b>${s.n}</b><span>${s.t}</span></span></a></li>`).join('')}</ul>`;
const numeros = () => `<ul class="economia">
  <li><b>ISO 9001</b><span>sistema de gestão certificado</span></li>
  <li><b>3×</b><span>Destaque Industrial CIESP</span></li>
  <li><b>5</b><span>segmentos atendidos</span></li>
  <li><b>SP-308</b><span>acesso direto pela Rodovia do Açúcar</span></li>
</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem um equipamento para fabricar?</h2>
  <p>Envie o desenho ou a especificação. A FEAÇO avalia o projeto e retorna com a proposta de fabricação.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'FEAÇO: referência na fabricação de equipamentos de aço sob encomenda para energia, mineração, efluentes e usinas, em Rio das Pedras/SP.') + topo(v, 'empresa') +
  cabPag('Empresa', 'Referência em equipamentos construídos por encomenda.', ['faixa-3', 'Tanque de transformador em fabricação']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Quem somos')}<h2>Equipe capacitada para padrões rígidos</h2>
  <p>O setor de energia passa por uma fase de ampliação e atualização da produção no mundo todo. Atenta à qualidade e à eficiência, a FEAÇO busca, treina e aprimora seus profissionais para atender aos rígidos padrões de qualidade exigidos pelo mercado.</p>
  <p>Graças à credibilidade construída com clientes e fornecedores, é referência na comercialização de equipamentos construídos por encomenda. O objetivo é a satisfação do cliente.</p></div>
  <figure class="sobe">${img('solda', 'Soldador da FEAÇO')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('trafo-montagem', 'Montagem na fábrica')}</figure>
  <div class="sobe">${sobre('Política integrada')}<h2>Qualidade, ambiente e segurança</h2>
  ${checks(['Assegurar a qualidade dos produtos e aperfeiçoar os processos industriais', 'Respeitar o meio ambiente e reduzir o impacto das atividades, produtos e serviços', 'Atender à legislação ambiental', 'Segurança na execução do trabalho', 'Sistema de Gestão Integrado em melhoria contínua'])}</div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Quem confia na FEAÇO</h2></div>
  ${listaClientes()}
</div></section>` + chamada(v) + rodape(v);
}

function portfolio(v) {
  return head(v, 'portfolio', 'Portfólio', 'Portfólio FEAÇO: tanques de transformadores e reatores, armaduras, baterias de hidrociclones para mineração, tanques de tratamento de efluentes, caldeiras e aquecedores.') + topo(v, 'portfolio') +
  cabPag('Portfólio', 'Equipamentos sob encomenda para energia, mineração, saneamento e usinas.') + `
<section class="sec"><div class="in">
  <ul class="cats">${segmentos.map(s => `<li><a href="#${s.id}">${s.n}</a></li>`).join('')}</ul>
  ${segmentos.map(s => `<div id="${s.id}" style="margin-bottom:64px"><div class="sec-cab sobe">${sobre(s.n)}<h2>${s.t}</h2></div><div class="galeria">${s.f.map(f => foto(f[0], f[1])).join('')}</div></div>`).join('')}
</div></section>` + chamada(v) + rodape(v);
}

function qualidade(v) {
  return head(v, 'qualidade', 'Qualidade', 'FEAÇO: Sistema de Gestão da Qualidade certificado ISO 9001, Destaque Industrial CIESP 2018, 2022 e 2023 e Código de Ética e Conduta Profissional.') + topo(v, 'qualidade') +
  cabPag('Qualidade', 'Certificação, prêmios e ética.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Certificação')}<h2>ISO 9001</h2>
  <p>O Sistema de Gestão da Qualidade da FEAÇO é certificado pela norma ISO 9001, o que valida o compromisso com todas as partes interessadas nos processos.</p>
  <p>Excelência na qualidade e comprometimento com a segurança fazem da FEAÇO uma das empresas mais respeitadas do mercado de equipamentos de aço por encomenda.</p></div>
  <figure class="sobe" style="max-width:420px">${foto('iso-9001', 'Certificado ISO 9001 da FEAÇO')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Prêmios')}<h2>Destaque Industrial CIESP</h2><p>Categoria médias empresas, concedido pelo Centro das Indústrias do Estado de São Paulo, diretoria regional de Piracicaba.</p></div>
  <ul class="premios">${[['premio-2018', '2018'], ['premio-2022', '2022'], ['premio-2023', '2023']].map(p => `<li class="sobe">${img(p[0], `Prêmio Destaque Industrial CIESP ${p[1]}`)}<b>CIESP ${p[1]}</b><span>Destaque Industrial</span></li>`).join('')}</ul>
</div></section>
<section class="sec" id="etica"><div class="in duas">
  <div class="sobe">${sobre('Ética')}<h2>Código de Ética e Conduta Profissional</h2>
  <p>O sucesso de uma empresa não depende só da qualidade dos produtos. A FEAÇO consolidou missão, visão, valores e princípios éticos em um código que orienta a relação com clientes, colaboradores e fornecedores.</p>
  <p><a class="link-seta" href="https://feaco.com.br/wordpress/wp-content/uploads/MQ-04-Manual-de-Etica-e-Conduta-Profissional.pdf" target="_blank" rel="noopener">Baixar o código (PDF) ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('solda-2', 'Solda na FEAÇO')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Feaço, Rodovia do Açúcar km 143, Rio das Pedras - SP');
  return head(v, 'contato', 'Contato', 'FEAÇO: (19) 3437-4800, contato@feaco.com.br. Rodovia do Açúcar (SP-308), km 143, Distrito Industrial, Rio das Pedras/SP.') + topo(v, 'contato') +
  cabPag('Contato', 'Cotações, compras, financeiro e recursos humanos.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${ic('mail')}<span>Comercial <a href="mailto:${E.email}">${E.email}</a></span></li>
    <li>${ic('mail')}<span>Compras <a href="mailto:compras@feaco.com.br">compras@feaco.com.br</a></span></li>
    <li>${ic('mail')}<span>Financeiro <a href="mailto:financeiro@feaco.com.br">financeiro@feaco.com.br</a></span></li>
    <li>${ic('mail')}<span>RH <a href="mailto:rh@feaco.com.br">rh@feaco.com.br</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da FEAÇO em Rio das Pedras/SP" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=14&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Cotação pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa *<input name="empresa" required autocomplete="organization"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <label>Segmento<select name="segmento">${segmentos.map(s => `<option>${s.n}</option>`).join('')}<option>Outro</option></select></label>
    <label>Descreva o equipamento *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta. Anexe o desenho no e-mail.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'FEAÇO: tecnologia e qualidade em equipamentos de aço construídos por encomenda. Tanques de transformadores, reatores, mineração e efluentes. Rio das Pedras/SP.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Caldeiraria sob encomenda · Rio das Pedras/SP')}
      <h1>Equipamentos de aço <em>do seu desenho.</em></h1>
      <p class="ha-sub">Soluções personalizadas para necessidades únicas: tanques de transformadores e reatores, mineração, tratamento de efluentes, caldeiras e usinas.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${link(v, 'portfolio')}">Ver portfólio</a></p>
    </div>
    <div class="ha-prod">${imgTopo('trafo-patio', 'Tanque de transformador fabricado pela FEAÇO')}<span class="ha-tag"><b>ISO 9001</b>e 3 prêmios CIESP</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Fabricação sob encomenda</span><span>${ic('check')}ISO 9001</span><span>${ic('check')}Destaque Industrial CIESP</span><span>${ic('check')}Fornecedor de multinacionais</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Portfólio')}<h2>Onde o aço da FEAÇO trabalha</h2></div>
  ${cardsSeg(v)}
</div></section>
<section class="lado">
  <figure>${img('solda-3', 'Soldagem na FEAÇO')}</figure>
  <div class="sobe">${sobre('Empresa')}<h2>Equipe treinada para o setor de energia</h2>
  <p>O setor de energia vive uma fase de ampliação no mundo todo. A FEAÇO busca, treina e aprimora seus profissionais para atender aos padrões de qualidade mais rígidos.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a FEAÇO ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em resumo')}<h2 class="sobe">Qualidade reconhecida</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Quem confia na FEAÇO</h2></div>
  ${listaClientes()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'FEAÇO: caldeiraria pesada sob encomenda para energia, mineração e saneamento. ISO 9001 e Destaque Industrial CIESP. Rio das Pedras/SP.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('trafo-fabrica', 'Tanque de transformador na fábrica da FEAÇO')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('FEAÇO · Rio das Pedras/SP')}
    <h1>Caldeiraria pesada <em>sob encomenda.</em></h1>
    <p class="hb-sub">Tanques de transformadores e reatores, baterias de mineração e tanques de efluentes, do desenho ao transporte.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${link(v, 'portfolio')}">Portfólio</a></p>
    <div class="hb-selo"><div><b>ISO 9001</b><span>certificada</span></div><div><b>CIESP</b><span>2018, 2022 e 2023</span></div><div><b>5</b><span>segmentos</span></div></div>
  </div></div>
</section>
<img class="faixa-img" src="/assets/img/faixa-1.webp" alt="Tanque de transformador com flanges" width="${F['faixa-1'][0]}" height="${F['faixa-1'][1]}" loading="lazy">
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Segmentos')}<h2>Energia, mineração e saneamento</h2></div>
  ${cardsSeg(v)}
</div></section>
<section class="lado">
  <figure>${img('bateria-mineracao', 'Bateria de mineração sendo içada')}</figure>
  <div class="sobe">${sobre('Do pátio ao cliente')}<h2>Peças grandes, prazos firmes</h2>
  <p>Equipamentos de grande porte fabricados, pintados e embarcados direto da fábrica na Rodovia do Açúcar.</p>
  <p><a class="link-seta" href="${link(v, 'portfolio')}">Ver portfólio ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Qualidade')}<h2 class="sobe">Reconhecida pelo CIESP</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Caldeiraria FEAÇO</h2></div>
  <div class="galeria">${[['trafo-2', 'Tanque de transformador'], ['hidrociclones', 'Hidrociclones'], ['tanque-efluente', 'Tanque de efluentes'], ['cilindros', 'Corpos cilíndricos']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), portfolio: portfolio(v), qualidade: qualidade(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'FEAÇO', artigo: 'da', url: E.url, lang: 'pt', cor: '#0b6fb8', fundo: '#24323a', claro: '#f1f4f6',
  fonteTitulo: "'Barlow Condensed',system-ui,sans-serif", fonteTexto: "'Barlow',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com um tanque de transformador pronto e leva aos segmentos atendidos.', pontos: ['Segmentos com fotos reais', 'ISO 9001 e prêmios CIESP', 'Clientes multinacionais'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite, abre com a fábrica e mostra o porte das peças, do pátio ao transporte.', pontos: ['Fábrica em tela cheia', 'Faixa de fábrica entre seções', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
