// TKS Metalúrgica (São Leopoldo/RS, desde 1989): usinagem sob encomenda, torneamento, fresamento, furação, rosqueamento, laminação de rosca e retífica. ISO 9001 desde 2011.
// node clientes/tks/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs tks https://tksmetalurgica.com.br/)
// Textos e fotos do site atual (peças usinadas de 2025 em 1000 px, história da empresa). Banners de banco de imagem (faíscas, CNC genérico) descartados.
// Fontes: Open Sans no texto, como hoje; Barlow Semi Condensed itálico pesado nos títulos, ecoando a sigla do logo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'TKS Metalúrgica', legal: 'TKS Metalúrgica Ltda.', url: 'https://tks.overtus.com.br/', antigo: 'https://tksmetalurgica.com.br/',
  fone: '(51) 3590-4257', foneHref: 'tel:+555135904257', cel: '(51) 98544-4483',
  wa: 'https://wa.me/5551985444483', email: 'tksltda@terra.com.br', email2: 'financeiro.tks@gmail.com',
  end: 'Rua Manoel dos Passos Figueroa, 833', cidade: 'Vicentina, São Leopoldo/RS',
  insta: 'https://www.instagram.com/tks.ltda', face: 'https://www.facebook.com/tksmetalurgicaLtda',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const pecas = [['blocos-usinados', 'Blocos usinados'], ['engrenagens', 'Engrenagens usinadas'], ['buchas-bronze', 'Buchas de bronze'], ['eixos', 'Eixos torneados', 'alta'], ['blocos-furados', 'Blocos fresados e furados'], ['engrenagens-caixa', 'Lote de engrenagens', 'alta'], ['pinos', 'Pinos torneados em lote', 'alta'], ['pecas-1', 'Peças torneadas e porcas'], ['pecas-2', 'Hastes com furação'], ['pecas-3', 'Peças em aço inox'], ['pecas-4', 'Componentes fresados'], ['pecas-5', 'Flanges usinadas'], ['pecas-6', 'Terminais e hastes'], ['pecas-7', 'Peças em lote'], ['pecas-8', 'Peças de alumínio']];
const vitrine = [['blocos-usinados', 'Blocos usinados'], ['engrenagens', 'Engrenagens'], ['buchas-bronze', 'Buchas de bronze'], ['pecas-5', 'Flanges'], ['pecas-1', 'Torneados e porcas'], ['pecas-4', 'Componentes fresados'], ['pecas-6', 'Terminais e hastes'], ['pecas-3', 'Peças em inox']];
const segmentos = ['Automotivo', 'Moto peças', 'Agrícola', 'Pneumática', 'Elétrico', 'Moveleiro', 'Náutico', 'Calçadista', 'Transporte', 'Peças especiais'];
const materiais = ['Tarugos', 'Forjados', 'Alumínio', 'Ferro', 'Cobre', 'Bronze', 'Plásticos', 'Teflon'];
const maquinas = [['Tornos CNC', 'Romi 240 e Romi 130 D'], ['Tornos automáticos', 'Centauros A25, A42 e A60'], ['Tornos automáticos', 'Traub TB 60 e TA 25'], ['Centro de usinagem', 'com quarto eixo'], ['Fresas', 'e fresa ferramenteira'], ['Retíficas cilíndricas', 'Centerless'], ['Laminadoras', 'de rosca'], ['Furadeiras', 'de bancada'], ['Tornos mecânicos', '']];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Quem somos' },
  { slug: 'servicos', n: 'Serviços' },
  { slug: 'pecas', n: 'Peças' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Tolerância centesimal', b: 'Desde 1989' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Open+Sans:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'TKS Metalúrgica | Usinagem de peças em São Leopoldo/RS' : `${titulo} | TKS Metalúrgica`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#183173' });
const marca = (branco) => `<img class="logo" src="/assets/logo${branco ? '-branco' : ''}.webp" alt="TKS Metalúrgica Ltda" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Usinagem desde 1989 · ISO 9001</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="TKS Metalúrgica, página inicial">${marca(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${E.wa}" ${ext}>Solicite um orçamento</a>
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
      <p>Usinagem de peças sob encomenda para a indústria, com tolerância centesimal e equipe técnica do início ao fim.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Serviços</h3><ul>
      <li><a href="${link(v, 'servicos')}">Torneamento CNC e automático</a></li>
      <li><a href="${link(v, 'servicos')}">Fresamento e furação</a></li>
      <li><a href="${link(v, 'servicos')}">Laminação de rosca</a></li>
      <li><a href="${link(v, 'servicos')}">Retífica centerless</a></li></ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Atendimento</h3><ul>
      <li>Seg. a qui.: 7h30 às 12h e 13h às 17h</li>
      <li>Sex.: 7h30 às 12h e 13h às 16h</li>
      <li><a href="mailto:${E.email2}">${E.email2}</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>São Leopoldo/RS</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da TKS">${icWa()}</a>
</body>
</html>`;
}

const operacoes = () => `<ul class="operacoes">
  <li class="sobe"><b>Torneamento</b><span>Tornos CNC Romi e automáticos Centauros e Traub, de peças pequenas a lotes grandes.</span></li>
  <li class="sobe"><b>Fresamento e furação</b><span>Centro de usinagem com quarto eixo, fresas e furadeiras.</span></li>
  <li class="sobe"><b>Rosqueamento e laminação</b><span>Roscas usinadas e laminadas em laminadoras próprias.</span></li>
  <li class="sobe"><b>Retífica</b><span>Retíficas cilíndricas centerless para acabamento fino.</span></li>
</ul>`;
const diferenciais = () => `<ul class="cards3">
  <li class="sobe"><h3>Experiência</h3><p>Mais de 30 anos de mercado, atendendo diversos segmentos.</p></li>
  <li class="sobe"><h3>Qualidade</h3><p>Instrumentação completa e equipe técnica acompanhando cada peça do início ao fim. ISO 9001 desde 2011.</p></li>
  <li class="sobe"><h3>Diversidade</h3><p>Peças de vários tamanhos e materiais para clientes dos mais variados segmentos.</p></li>
</ul>`;
const qualidade = () => `<div class="in duas">
  <div class="sobe">${sobre('Política da qualidade')}<h2>Medido, conferido, entregue</h2>
  <p>Temos toda a instrumentação para usinagem de precisão: projetor de perfil, paquímetros, micrômetros, padrões de roscas, calibres e rugosímetro, entre outros. Uma equipe com formação técnica acompanha cada peça do início ao fim do processo.</p>
  ${checks(['Melhorar continuamente processos, serviços e o Sistema de Gestão da Qualidade', 'Oferecer serviços de usinagem que sejam bons negócios para o cliente', 'Cumprir os requisitos aplicáveis com crescimento sustentável', 'Treinar os colaboradores para a qualidade e o crescimento profissional'])}
  <div class="iso"><b>ISO 9001</b><span>Empresa certificada desde 2011, com licença de operação em dia.</span></div></div>
  <figure class="sobe">${img('blocos-furados', 'Blocos fresados e furados pela TKS')}</figure>
</div>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tem um desenho para usinar?</h2>
  <p>Mande o desenho ou a amostra pelo WhatsApp ou e-mail. A TKS avalia material, processo e prazo e devolve o orçamento.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Solicitar orçamento</a><a class="btn btn-linha" href="mailto:${E.email}">${E.email}</a></div>
</div></section>`;

const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;
const vitrineHtml = () => `<ul class="ped ped4">${vitrine.map(p => `<li class="sobe">${img(p[0], p[1])}<b>${p[1]}</b></li>`).join('')}</ul>`;

function empresa(v) {
  return head(v, 'empresa', 'Quem somos', 'A TKS Metalúrgica nasceu em 1989 em São Leopoldo/RS com um torno A25. Hoje usina peças para a indústria com tornos CNC, automáticos e ISO 9001.') + topo(v, 'empresa') +
  cabPag('Nossa história', 'De um torno automático A25 a um parque fabril completo de usinagem.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1989')}<h2>Três jovens sócios e um torno A25</h2>
  <p>A TKS Metalúrgica surgiu em 1989 da união de três jovens sócios. O parque fabril era um torno automático A25 e um torno mecânico de pequeno porte que tremia durante a usinagem. Com força de vontade e otimismo, a TKS venceu vários desafios, fez crescer a equipe e o maquinário.</p>
  <p>Hoje a equipe TKS não é só formada pelos funcionários, mas também pelos clientes e fornecedores, cujo espírito de parceria faz a força no mercado.</p></div>
  <figure class="sobe">${img('engrenagens-caixa', 'Lote de engrenagens usinadas pela TKS')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha do tempo')}<h2>Como a TKS cresceu</h2></div>
  <ul class="historia">
    <li class="sobe"><figure>${img('primeira-sede', 'Primeira sede da TKS em 1989')}<figcaption><b>1989</b>Primeira sede da empresa.</figcaption></figure></li>
    <li class="sobe"><figure>${img('obra-inicio', 'Início da construção do prédio')}<figcaption><b>Nova sede</b>Início da construção do prédio.</figcaption></figure></li>
    <li class="sobe"><figure>${img('obra-anos-90', 'Prédio finalizado nos anos 90')}<figcaption><b>Anos 90</b>Obra finalizada; a empresa se muda para o endereço atual.</figcaption></figure></li>
    <li class="sobe"><figure>${img('parque-antigo', 'Parque fabril depois da mudança')}<figcaption><b>Parque fabril</b>Início do parque fabril na nova sede.</figcaption></figure></li>
    <li class="sobe"><figure>${img('parque-2000', 'Parque fabril nos anos 2000')}<figcaption><b>Anos 2000</b>Parte do parque fabril.</figcaption></figure></li>
    <li class="sobe"><figure>${img('sede-atual', 'Sede atual')}<figcaption><b>Hoje</b>Sede atual, na Vicentina, em São Leopoldo.</figcaption></figure></li>
  </ul>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Significado do logotipo')}<h2>O paquímetro, o raio e a nova marca</h2>
  <p>No início, a TKS fazia usinagem e também serviços de elétrica, como rebobinagem de motores e instalações industriais. A sigla vem da inicial do sobrenome dos sócios; o paquímetro simbolizava a usinagem e o raio, a elétrica.</p>
  <p>Com o tempo e a mudança no quadro societário, a empresa encerrou a elétrica e passou a se dedicar só à usinagem. Em 2023 nasceu o novo logotipo.</p></div>
  <div class="logos2 sobe"><figure>${img('logo-antigo', 'Logotipo antigo da TKS')}<figcaption>Logotipo original</figcaption></figure><figure>${img('logo-novo', 'Logotipo novo da TKS, 2023')}<figcaption>2023, novo logotipo</figcaption></figure></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <ul class="cards3">
    <li class="sobe"><h3>Missão</h3><p>Oferecer serviços de qualidade em usinagem e fabricação de peças usinadas, promovendo o desenvolvimento sustentável do negócio.</p></li>
    <li class="sobe"><h3>Visão</h3><p>Fortalecer o relacionamento com os clientes, buscando o crescimento contínuo no mercado de prestação de serviços de usinagem.</p></li>
    <li class="sobe"><h3>Valores</h3><p>Comprometimento ético e transparência; disponibilidade para atender o cliente nos imprevistos; melhoria contínua.</p></li>
  </ul>
</div></section>
<section class="sec">${qualidade()}</section>` + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Serviços', 'Usinagem geral na TKS: torneamento CNC e automático, fresamento, furação, rosqueamento, laminação de rosca e retífica centerless, com tolerância centesimal.') + topo(v, 'servicos') +
  cabPag('Serviços de usinagem', 'Garantia de tolerância centesimal e, em alguns casos, milesimal.') + `
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Operações')}<h2>Usinagem geral, do tarugo à peça pronta</h2></div>
  ${operacoes()}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre('Materiais')}<h2>Peças de vários tamanhos e materiais</h2>
  <p>Usinamos a partir de tarugos e forjados, em alumínio, ferro, cobre, bronze, plásticos, teflon e outros materiais, conforme a necessidade do cliente.</p>
  <ul class="materiais">${materiais.map(m => `<li>${m}</li>`).join('')}</ul></div>
  <figure class="sobe">${img('buchas-bronze', 'Buchas de bronze usinadas pela TKS')}</figure>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Parque fabril')}<h2>Nosso maquinário</h2></div>
  <ul class="maq-lista sobe">${maquinas.map(m => `<li>${m[0]}<span>${m[1]}</span></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Segmentos')}<h2>Para quem usinamos</h2></div>
  <ul class="materiais sobe">${segmentos.map(m => `<li>${m}</li>`).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function pecasPag(v) {
  return head(v, 'pecas', 'Peças', 'Algumas peças usinadas pela TKS Metalúrgica: engrenagens, blocos, eixos, buchas de bronze, pinos, flanges e terminais.') + topo(v, 'pecas') +
  cabPag('Algumas peças que usinamos', 'Engrenagens, blocos, eixos, buchas, pinos, flanges e terminais, em lotes pequenos e grandes.') + `
<section class="sec"><div class="in">
  <div class="galeria-pecas">${pecas.map(p => foto(p[0], p[1], p[2] || '')).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Rua Manoel dos Passos Figueroa, 833, São Leopoldo - RS');
  return head(v, 'contato', 'Contato', 'TKS Metalúrgica: (51) 3590-4257, WhatsApp (51) 98544-4483, tksltda@terra.com.br. Rua Manoel dos Passos Figueroa, 833, Vicentina, São Leopoldo/RS.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Orçamentos pelo WhatsApp, e-mail ou telefone.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${icWa()}<a href="${E.wa}" ${ext}>${E.cel}</a></li>
    <li>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.email2}">${E.email2}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <p class="horario">Segunda a quinta: 7h30 às 12h e 13h às 17h<br>Sexta: 7h30 às 12h e 13h às 16h</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} Ligar</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da TKS em São Leopoldo/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'TKS Metalúrgica, São Leopoldo/RS: usinagem de peças sob encomenda desde 1989. Torneamento CNC, fresamento, laminação de rosca e retífica. ISO 9001.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('São Leopoldo/RS · desde 1989')}
      <h1>Usinagem com tolerância <em>centesimal.</em></h1>
      <p class="ha-sub">Peças usinadas sob encomenda para os segmentos automotivo, agrícola, pneumático, elétrico, moveleiro, náutico, calçadista e de transporte.</p>
      <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicite um orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Nossos serviços</a></p>
    </div>
    <div class="ha-prod">${imgTopo('engrenagens', 'Engrenagens usinadas pela TKS')}<span class="ha-tag"><b>ISO 9001</b>certificada desde 2011</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Mais de 30 anos</span><span>${ic('check')}Tornos CNC e automáticos</span><span>${ic('check')}Laminação de rosca</span><span>${ic('check')}Retífica centerless</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Serviços')}<h2>Usinagem geral, em lote ou sob medida</h2></div>
  ${operacoes()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Algumas peças que usinamos</h2></div>
  ${vitrineHtml()}
  <p style="margin-top:24px"><a class="link-seta" href="${link(v, 'pecas')}">Ver todas as peças ${ic('seta')}</a></p>
</div></section>
<section class="sec">${qualidade()}</section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Diferenciais')}<h2>Por que a TKS</h2></div>
  ${diferenciais()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'TKS Metalúrgica: desde 1989 usinando peças para a indústria em São Leopoldo/RS. Tornos CNC Romi, automáticos Traub e Centauros, ISO 9001.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('blocos-usinados', 'Blocos usinados pela TKS')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('TKS Metalúrgica · São Leopoldo/RS')}
    <h1>Peças usinadas <em>desde 1989.</em></h1>
    <p class="hb-sub">Torneamento, fresamento, furação, rosqueamento, laminação de rosca e retífica, do tarugo à peça pronta.</p>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>Solicite um orçamento</a><a class="btn btn-linha" href="${link(v, 'pecas')}">Ver peças</a></p>
    <div class="hb-selo"><div><b>1989</b><span>fundação</span></div><div><b>ISO 9001</b><span>desde 2011</span></div><div><b>0,01 mm</b><span>tolerância garantida</span></div></div>
  </div></div>
</section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Operações')}<h2>Usinagem geral</h2></div>
  ${operacoes()}
</div></section>
<section class="lado">
  <figure>${img('pinos', 'Lote de pinos torneados pela TKS')}</figure>
  <div class="sobe">${sobre('Nossa história')}<h2>De um torno A25 a um parque fabril</h2>
  <p>A TKS nasceu em 1989 da união de três jovens sócios, com um torno automático A25 e um torno mecânico pequeno. Cresceu em equipe, maquinário e clientes, sempre na mesma cidade.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a história ${ic('seta')}</a></p></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Peças')}<h2>Feitas na TKS</h2></div>
  ${vitrineHtml()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Diferenciais')}<h2>Experiência, qualidade e diversidade</h2></div>
  ${diferenciais()}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), servicos: servicos(v), pecas: pecasPag(v), contato: contato(v) });

copiarSiteJs(pub, '5551985444483');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'TKS Metalúrgica', artigo: 'da', url: E.url, lang: 'pt', cor: '#183173', fundo: '#0d0d0d', claro: '#f2f3f6',
  fonteTitulo: "'Barlow Semi Condensed',system-ui,sans-serif", fonteTexto: "'Open Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com as engrenagens usinadas e põe a qualidade ISO 9001 em destaque.', pontos: ['Peças reais na home', 'Política da qualidade', 'Orçamento pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Preta e azul, abre com os blocos usinados em tela cheia e conta a história desde 1989.', pontos: ['Foto de peça em tela cheia', 'História da empresa', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
