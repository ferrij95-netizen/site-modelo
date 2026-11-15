// Metalúrgica FIMAC (Gravataí/RS, desde 1967): usinagem de peças, dentados, eixos estriados, peças forjadas e fundidas e conjuntos montados para montadoras agrícolas, rodoviárias e automotivas. Gera public/{a,b}/ e a página de escolha.
// node clientes/fimac/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs fimac https://www.fimac.ind.br/)
// Textos do site atual e da "Relação de máquinas" (PDF abr/2024). Fotos reais do WordPress (FOTO-xx, produtos, Romi); as fotos de banco do tema foram descartadas. Logo SVG original do site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'FIMAC', legal: 'Metalúrgica FIMAC Ltda.', url: 'https://fimac.overtus.com.br/', antigo: 'https://www.fimac.ind.br/',
  fone: '(51) 3489-9100', foneHref: 'tel:+555134899100', email: 'contato@fimac.ind.br',
  end: 'Rua Paul Zivi, 400, Distrito Industrial', cidade: 'Gravataí/RS · CEP 94045-430',
  insta: 'https://www.instagram.com/metalurgicafimac', linkedin: 'https://www.linkedin.com/company/metalurgicafimac',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;

const produtos = [
  { id: 'usinadas', n: 'Peças usinadas', f: 'usinada', t: 'Há mais de 55 anos para o mercado nacional e internacional: pinos, luvas estriadas, buchas retificadas, mancais, pontas de eixos estriados, eixos e semieixos, sempre respeitando resistência mecânica e tolerâncias.' },
  { id: 'dentados', n: 'Dentados', f: 'dentado', t: 'Geradoras retas e cônicas, laminadora de dentes e laminadora de estrias Roto Flo para as propriedades mecânicas exigidas em cada peça.' },
  { id: 'forjadas', n: 'Peças forjadas e fundidas', f: 'forjada', t: 'Com parceiros de forjamento e fundição, peças com acabamento que garante precisão dimensional. Usinagem de peças de até 500 mm de diâmetro.' },
  { id: 'eixos', n: 'Eixos', f: 'eixo-estriado', t: 'Eixos estriados para transmitir torque com encaixe preciso em engrenagens e acoplamentos, de peças com até 6 metros de comprimento a eixos com mais de 90 mm de diâmetro.' },
  { id: 'conjuntos', n: 'Conjuntos montados e soldados', f: 'diferencial', t: 'Conjuntos entregues montados e soldados, com estações MIG/MAG e aquecimento indutivo para montagem por dilatação térmica.' },
];
const clientes = ['AGCO', 'CNH Industrial', 'Dana', 'Stara', 'HIAB', 'Jan', 'Parker', 'Ciber'];
const maquinas = [
  ['Centros de usinagem', ['Horizontal Heller MCi 28.1', 'Vertical Veker com 2.600 mm de curso X e 4º eixo', 'Romi Discovery 1250, 760 (2) e 560', 'Romi Polaris V400 e Romi D800']],
  ['Tornos CNC', ['Romi E280 com ferramenta acionada (2)', 'Mazak Quick Turn Smart QSM 150 (2) e 350', 'Index 400 MC (2)', 'Romi G280 (4), GL350M, GL350, Galaxy 20 e 30, Cosmos 20 U e 30, Multiplic 35D', 'Mazak QT 200 SG e QT 300 SG']],
  ['Máquinas especiais', ['Mazak Integrex i200 de 5 eixos', 'Corte a fio Agie Charmilles', 'Gravadora a laser 20 W', 'Serra CNC P100 e corte plasma HF Extreme 200', 'Laminadora de estriados Roto Flo 3251S']],
  ['Engrenagens e dentados', ['Coniflex para engrenagem cônica reta (5)', 'Geradora cônica Gleason Revacycle', 'Geradoras tipo Renânia até módulo 6 (7) e módulo 12 (2)', 'Dentadora Fellows até 500 × módulo 8', 'Shaving universal de 1.000 mm e conformadora Gröb ZRM6-k', 'Retíficas de estrias e de rosca de 1.000 mm']],
  ['Medição', ['Tridimensional Zeiss Contura G2', 'Tridimensional Mitutoyo BRT-M507', 'Medição de engrenagens MAAG Zurich', 'Projetor de perfil, rugosímetro Mahr', 'Laboratório metalográfico']],
  ['Retificadoras e brochadeiras', ['Center-less até 150 mm (3)', 'Planas (2), internas (3) e universais de 1 m (3)', 'Cilíndrica até Ø400 × 2.800 mm entre pontos', 'Brochadeira horizontal de 20 t e vertical Hoffmann']],
  ['Convencionais e montagem', ['Tornos de até 3 m e Ø600 mm (5)', 'Fresadoras (4) e fresadora de rasgo de chaveta', 'Prensas de desempeno de eixos até 5 m (2)', 'Solda MIG/MAG (3) e aquecimento indutivo (2)']],
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'parque-fabril', n: 'Parque fabril' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Precisão de montadora', b: 'Chão de usinagem' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira+Semi+Condensed:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'FIMAC | Usinagem de peças, dentados e eixos estriados' : `${titulo} | Metalúrgica FIMAC`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#c8161e' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 44) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Metalúrgica FIMAC" width="${Math.round(h * 5986 / 1529)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Usinagem para montadoras desde 1967</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="FIMAC, página inicial">${logo(v === 'b')}</a>
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
    <div class="rod-marca">${logo(true, 46)}
      <p>Componentes usinados de alta complexidade para montadoras agrícolas, rodoviárias, de construção e automotivas. ISO 9001:2015.</p>
      <p class="rod-redes"><a href="${E.insta}" aria-label="Instagram da FIMAC">${ic('insta')}</a><a href="${E.linkedin}" aria-label="LinkedIn da FIMAC">${ic('linkedin')}</a></p></div>
    <div><h3>Produtos</h3><ul>${produtos.map(p => `<li><a href="${link(v, 'produtos')}#${p.id}">${p.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>A FIMAC</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'parque-fabril')}">Parque fabril</a></li>
      <li><a href="${link(v, 'empresa')}#qualidade">Qualidade e ISO 9001</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Gravataí/RS</span></div>
</footer>
</body>
</html>`;
}

const listaClientes = () => `<ul class="clientes">${clientes.map(c => `<li>${c}</li>`).join('')}</ul>`;
const cardsProd = v => `<ul class="setores">${produtos.slice(0, 4).map(p => `<li class="sobe"><a href="${link(v, 'produtos')}#${p.id}"><span class="st-img">${img(p.f, p.n)}</span><span class="st-txt"><b>${p.n}</b><span>${p.t.split(':')[0].split('.')[0]}.</span></span></a></li>`).join('')}</ul>`;
const numeros = () => `<ul class="economia">
  <li><b>1967</b><span>início em Porto Alegre</span></li>
  <li><b>13 mil m²</b><span>de área construída em Gravataí</span></li>
  <li><b>6 m</b><span>de comprimento em eixos estriados</span></li>
  <li><b>Ø500 mm</b><span>em peças forjadas e fundidas</span></li>
  <li><b>ISO 9001</b><span>versão 2015</span></li>
</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem um desenho para cotar?</h2>
  <p>Envie o desenho da peça. A engenharia da FIMAC avalia o processo e retorna com a proposta.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Metalúrgica FIMAC: desde 1967, empresa familiar em Gravataí/RS com 13.000 m², ISO 9001:2015, fornecedora de componentes usinados para montadoras.') + topo(v, 'empresa') +
  cabPag('Empresa', 'Tradição familiar e compromisso com a excelência ao longo de décadas.', ['pecas-estoque', 'Peças usinadas na FIMAC']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Nossa história')}<h2>De Porto Alegre, 1967, a Gravataí</h2>
  <p>A Metalúrgica FIMAC começou em março de 1967 em Porto Alegre, chefiada pelo Sr. Roberto Delfini até 1986, quando foi assumida por sete sócios, entre eles o Sr. Chiao I-Min e o Sr. Tzu Chan Chiao. Em 1993 tornou-se totalmente familiar, com o Sr. Tzu Chan Chiao, a Sra. Yao Ahua e o filho Tong Jiao.</p>
  <p>Em 1998 mudou-se para a sede própria no Distrito Industrial de Gravataí. Hoje são mais de 13.000 m² construídos, com espaço para expansão, e sob a liderança de Carolina Chiao, da segunda geração, uma governança sustentável e processos cada vez mais enxutos.</p></div>
  <figure class="sobe">${img('engrenagem-mao', 'Engrenagem usinada pela FIMAC')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Usinagem de alta complexidade</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Norteadores')}<h2>Ambidestria: o melhor do que sabemos, de olho no novo</h2></div>
  <ul class="cards3">
    <li class="sobe"><h3>Negócio</h3><p>Produção e fornecimento de peças usinadas, forjadas e fundidas para montadoras do ramo agrícola, rodoviário e automotivo.</p></li>
    <li class="sobe"><h3>Visão</h3><p>Ser a grande fornecedora dos componentes mecânicos que movimentam o maquinário mundial.</p></li>
    <li class="sobe"><h3>Missão</h3><p>Fornecer produtos de alto valor integrado com excelência e inteligência nos processos.</p></li>
  </ul>
  ${checks(['Compromisso com a excelência', 'Transparência com todos os públicos', 'Respeito, ética e honestidade', 'Sustentabilidade ambiental, social e financeira', 'Pessoas protagonistas, arrojadas, engajadas e valorizadas'])}
</div></section>
<section class="sec sec-cinza" id="qualidade"><div class="in duas">
  <figure class="sobe">${img('tridimensional', 'Medição tridimensional')}</figure>
  <div class="sobe">${sobre('Qualidade')}<h2>ISO 9001:2015 e laboratório próprio</h2>
  <p>Time técnico qualificado, equipamentos de medição de ponta e laboratório para inspeção de propriedades químicas e mecânicas das peças. Entrega pontual e correta para a satisfação total dos parceiros.</p>
  ${checks(['Tridimensionais Zeiss e Mitutoyo', 'Medição de engrenagens MAAG', 'Laboratório metalográfico', 'Licença de operação ambiental', 'Código de conduta e ética, compliance e LGPD'])}</div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Nossos principais clientes</h2></div>
  ${listaClientes()}
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', 'Produtos FIMAC: peças usinadas, dentados, peças forjadas e fundidas, eixos estriados de até 6 m e conjuntos montados e soldados.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Os componentes mecânicos que movimentam máquinas agrícolas, de carga, rodoviárias e automotivas.') + `
<section class="sec"><div class="in">
  ${produtos.map((p, i) => `<article class="maq" id="${p.id}"><div class="maq-foto sobe prod-foto">${foto(p.f, p.n)}</div><div class="sobe"><p class="maq-marca">${String(i + 1).padStart(2, '0')}</p><h2>${p.n}</h2><p>${p.t}</p></div></article>`).join('')}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Na produção')}<h2>Peças FIMAC</h2></div>
  <div class="galeria">${[['engrenagens', 'Engrenagens'], ['conjunto', 'Conjunto usinado'], ['pecas-caixa', 'Peças em caixa'], ['blanks', 'Blanks para usinagem']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function parque(v) {
  return head(v, 'parque-fabril', 'Parque fabril', 'Parque fabril FIMAC: centros de usinagem Heller e Romi, tornos Mazak, Index e Romi, Integrex 5 eixos, geradoras Gleason e Renânia, Zeiss Contura e retificadoras.') + topo(v, 'parque-fabril') +
  cabPag('Parque fabril', 'Equipamentos atualizados com novas aquisições, sempre de olho nas áreas carentes de máquinas diferenciadas.', ['cnc-peca', 'Peça em centro de usinagem CNC']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Estrutura')}<h2>13.000 m² de usinagem em Gravataí</h2>
  <p>Torneamento, fresamento, dentados, retificação, brochamento, medição e montagem no mesmo endereço, com usinagem completa e rastreabilidade.</p></div>
  <div class="galeria" style="grid-template-columns:1fr 1fr">${foto('romi-discovery', 'Centro de usinagem Romi Discovery')}${foto('romi-galaxy', 'Torno CNC Romi Galaxy')}</div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Relação de máquinas')}<h2>O que tem no chão de fábrica</h2></div>
  <ul class="maquinas">${maquinas.map(m => `<li class="sobe"><h3>${m[0]}</h3><ul>${m[1].map(x => `<li>${x}</li>`).join('')}</ul></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <div class="galeria">${[['medicao', 'Medição'], ['retifica', 'Retificação'], ['inspecao', 'Inspeção dimensional'], ['tridimensional', 'Tridimensional']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Paul Zivi, 400, Gravataí - RS');
  return head(v, 'contato', 'Contato', 'Metalúrgica FIMAC: (51) 3489-9100, contato@fimac.ind.br. Rua Paul Zivi, 400, Distrito Industrial, Gravataí/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Cotações, fornecedores e trabalhe conosco.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa da FIMAC em Gravataí/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa *<input name="empresa" required autocomplete="organization"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <label>Assunto<select name="assunto"><option>Cotação de peças</option><option>Fornecedor</option><option>Trabalhe conosco</option><option>Outro</option></select></label>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta. Anexe o desenho no e-mail.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Metalúrgica FIMAC: peças usinadas, dentados e eixos estriados para montadoras agrícolas, rodoviárias e automotivas. Gravataí/RS, desde 1967. ISO 9001.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Usinagem · Gravataí/RS · desde 1967')}
      <h1>Componentes que <em>movimentam máquinas.</em></h1>
      <p class="ha-sub">Peças usinadas, dentados, eixos estriados e conjuntos montados para montadoras agrícolas, rodoviárias, de construção e automotivas.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver produtos</a></p>
    </div>
    <div class="ha-prod">${imgTopo('engrenagem-mao', 'Engrenagem usinada pela FIMAC')}<span class="ha-tag"><b>ISO 9001:2015</b>13.000 m² em Gravataí</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1967</span><span>${ic('check')}ISO 9001:2015</span><span>${ic('check')}Dentados e estrias</span><span>${ic('check')}Eixos de até 6 m</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Do blank ao conjunto montado</h2></div>
  ${cardsProd(v)}
</div></section>
<section class="lado">
  <figure>${img('tridimensional', 'Medição tridimensional na FIMAC')}</figure>
  <div class="sobe">${sobre('Qualidade')}<h2>Medido em tridimensional, rastreado até a entrega</h2>
  <p>Zeiss Contura, Mitutoyo, medição de engrenagens MAAG e laboratório metalográfico. Não entregamos só peças: usamos o know-how para desenvolver soluções completas.</p>
  <p><a class="link-seta" href="${link(v, 'parque-fabril')}">Ver o parque fabril ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('FIMAC em números')}<h2 class="sobe">Quase 60 anos de usinagem</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Clientes')}<h2>Nossos principais clientes</h2></div>
  ${listaClientes()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'FIMAC: usinagem CNC, geradoras de engrenagens, laminadora Roto Flo e retificação em 13.000 m² em Gravataí/RS. Fornecedora de AGCO, CNH, Dana e Stara.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('cnc-peca', 'Peça em centro de usinagem CNC na FIMAC')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Metalúrgica FIMAC · desde 1967')}
    <h1>Usinagem com <em>inteligência.</em></h1>
    <p class="hb-sub">Torneamento, fresamento, dentados, estrias e retificação para as montadoras que movem o campo e as estradas.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Solicitar cotação</a><a class="btn btn-linha" href="${link(v, 'parque-fabril')}">Parque fabril</a></p>
    <div class="hb-selo"><div><b>1967</b><span>fundação</span></div><div><b>13 mil m²</b><span>construídos</span></div><div><b>ISO 9001</b><span>2015</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Usinadas, dentados, forjadas e eixos</h2></div>
  ${cardsProd(v)}
</div></section>
<section class="lado">
  <figure>${img('retifica', 'Retificação de peça na FIMAC')}</figure>
  <div class="sobe">${sobre('Parque fabril')}<h2>Romi, Mazak, Heller, Gleason, Zeiss</h2>
  <p>Centros de usinagem, Integrex de 5 eixos, geradoras de engrenagens, laminadora de estrias Roto Flo, retificadoras e brochadeiras no mesmo endereço.</p>
  <p><a class="link-seta" href="${link(v, 'parque-fabril')}">Ver a relação de máquinas ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Precisão em escala de montadora</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Chão de usinagem FIMAC</h2></div>
  <div class="galeria">${[['inspecao', 'Inspeção'], ['engrenagens', 'Engrenagens'], ['blanks', 'Blanks'], ['conjunto', 'Conjunto']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), 'parque-fabril': parque(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'FIMAC', artigo: 'da', url: E.url, lang: 'pt', cor: '#c8161e', fundo: '#2e3337', claro: '#f3f3f4',
  fonteTitulo: "'Saira Semi Condensed',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com a engrenagem usinada e leva aos cinco tipos de produto.', pontos: ['Produtos com fotos reais', 'História de 1967 a hoje', 'Clientes montadoras'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite, abre com a usinagem CNC e destaca a relação de máquinas.', pontos: ['Usinagem em tela cheia', 'Parque fabril em destaque', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
