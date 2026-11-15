// Takei Estofados (Prado Ferreira/PR): indústria de sofás retráteis, reclináveis, de canto, 3 e 2 lugares e poltronas. Gera public/{a,b}/ e a página de escolha.
// node clientes/takei/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs takei https://www.takei.com.br/)
// Fotos, medidas, descrições e textos do catálogo digital 2025 da Takei (o site atual está em manutenção). Logo vetorizado do catálogo (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const produtos = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));
const P = Object.fromEntries(produtos.map(p => [p.s, p]));

const E = {
  nome: 'Takei Estofados', legal: 'Takei Indústria Moveleira Ltda.', url: 'https://takei.overtus.com.br/', antigo: 'https://www.takei.com.br/',
  fone: '(43) 3244-1500', foneHref: 'tel:+554332441500', email: 'contato@takei.com.br',
  end: 'Rodovia João Lunardelli, PR-170, Km 34,5', cidade: 'Prado Ferreira · Paraná', cep: 'CEP 86618-000',
  insta: 'https://www.instagram.com/takeiestofados/', face: 'https://www.facebook.com/takeiestofados', yt: 'https://www.youtube.com/@takeiestofados1302',
};

const cats = [
  { id: 'retratil', n: 'Retráteis e reclináveis', curto: 'Retrátil', t: 'Assento que corre para frente e encosto que reclina em até 5 estágios, com Duplo Molejo.' },
  { id: 'canto-retratil', n: 'Canto retrátil', curto: 'Canto retrátil', t: 'O conforto do retrátil no formato de canto, com chaise e versões de 2 ou 3 lugares.' },
  { id: 'sofa-cama', n: 'Sofá-cama retrátil', curto: 'Sofá-cama', t: 'Sem caixa atrás: o encosto reclina em 3 estágios e o último vira cama.' },
  { id: 'canto', n: 'Sofás de canto', curto: 'Canto', t: 'Assento fixo, chaise e medidas para salas grandes e pequenas.' },
  { id: '3-2-lugares', n: '3 e 2 lugares', curto: '3 e 2 lugares', t: 'Assento fixo com espuma D-23 ou D-24,5, em jogos de 3 e 2 lugares.' },
  { id: 'poltrona', n: 'Poltronas', curto: 'Poltronas', t: 'Para completar a sala, fixa ou reclinável.' },
];
const catDe = id => produtos.filter(p => p.cat === id);
const capa = { retratil: 'olivia', 'canto-retratil': 'viviane', 'sofa-cama': 'mirela', canto: 'martina', '3-2-lugares': 'iza', poltrona: 'malu' };
const rotulo = l => l.replace(/(\d)lug\s*\+\s*/g, '$1 lugares + ').replace(/\s+/g, ' ');
const tipo = t => t.toLowerCase().replace('sofá', 'Sofá').replace('poltrona', 'Poltrona');

const img = (n, alt, w, h, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt, w, h) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" fetchpriority="high" decoding="async">`;
const recorte = p => img(`p-${p.s}`, `${tipo(p.tipo)} ${p.n} Takei`, p.cut[0], p.cut[1]);
const amb = (p, extra = '') => img(`amb-${p.s}`, `${tipo(p.tipo)} ${p.n} Takei em ambiente decorado`, p.amb[0], p.amb[1], extra);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Takei' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'qualidade', n: 'Por dentro do sofá' },
  { slug: 'revenda', n: 'Seja revendedor' },
];
export const nomesVersao = { a: 'Conforto em cada momento', b: 'Lugar de gente feliz' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Takei Estofados | Sofás retráteis, reclináveis e de canto' : `${titulo} | Takei Estofados`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: v === 'a' ? '#fe122a' : '#2b2321' });

const btnRev = (v, cls = 'btn', txt = 'Quero revender Takei') => `<a class="${cls}" href="${link(v, 'revenda')}">${txt}</a>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Takei Estofados, página inicial"><img src="/assets/${v === 'b' ? 'logo-branco' : 'logo'}.svg" alt="Takei Estofados" width="180" height="58"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="topo-fone" href="${E.foneHref}">${ic('tel')}<span>${E.fone}</span></a>
    ${btnRev(v, 'btn btn-topo', 'Seja revendedor')}
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
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Takei Estofados" width="190" height="61" loading="lazy">
      <p>Conforto em cada momento. Sofás e poltronas fabricados em Prado Ferreira, no Paraná, desde 1996.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>Produtos</h3><ul>${cats.map(c => `<li><a href="${link(v, 'produtos')}#${c.id}">${c.n}</a></li>`).join('')}</ul></div>
    <div><h3>Fale com a Takei</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep}</span></li>
    </ul></div>
    <div class="rod-selo"><span class="selo-fsc">FSC<sup>®</sup></span><p>Madeira de florestas bem manejadas certificadas FSC® e de outras fontes controladas, desde 2023.</p></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Lugar de gente feliz e produtiva.</span></div>
</footer>
<script src="/assets/takei.js" defer></script>
</body>
</html>`;
}

// ---------- blocos ----------
const numeros = () => `<ul class="numeros">
  <li><b>1996</b><span>ano de fundação, em Prado Ferreira/PR</span></li>
  <li><b>29</b><span>anos de história em 2025</span></li>
  <li><b>${produtos.length}</b><span>modelos no catálogo 2025</span></li>
  <li><b>FSC<sup>®</sup></b><span>selo de manejo florestal desde 2023</span></li>
</ul>`;

const medidas = p => `<dl class="medidas">${p.dims.map(([l, r, val]) => `<div><dt><b>${l}</b>${esc(rotulo(r))}</dt><dd>${esc(val)}</dd></div>`).join('')}</dl>`;

// Foto de produto com botão "abrir" quando o catálogo traz a posição aberta
const fotoProd = p => p.aberto
  ? `<div class="pf" data-pf><div class="pf-imgs">${recorte(p)}${img(`p-${p.s}-aberto`, `${p.n} aberto, com assento retrátil e encosto reclinado`, p.aberto[0], p.aberto[1], ' class="pf-aberto"')}</div>
    <div class="pf-troca" role="group" aria-label="Posição do ${esc(p.n)}"><button type="button" aria-pressed="true" data-pos="fechado">Fechado</button><button type="button" aria-pressed="false" data-pos="aberto">Aberto</button></div></div>`
  : `<div class="pf"><div class="pf-imgs">${recorte(p)}</div></div>`;

const cartao = (v, p) => `<a class="cartao sobe" href="${link(v, 'produtos')}#${p.s}"><span class="ct-foto">${recorte(p)}</span><span class="ct-tipo">${esc(tipo(p.tipo))}</span><span class="ct-nome">${esc(p.n)}</span></a>`;

const linhasCat = v => `<ul class="cats">${cats.map(c => { const p = P[capa[c.id]]; return `<li class="sobe"><a href="${link(v, 'produtos')}#${c.id}"><span class="cat-foto">${recorte(p)}</span><span class="cat-nome">${c.n}</span><span class="cat-qtd">${catDe(c.id).length} ${catDe(c.id).length > 1 ? 'modelos' : 'modelo'}</span></a></li>`; }).join('')}</ul>`;

const camadas = [
  { n: 'Estrutura', t: 'Eucalipto e pinus de reflorestamento, tratados contra mofo e cupim, secos e plainados nas 4 faces. MDF e compensado de 8 mm fixados com grampos galvanizados.' },
  { n: 'Espumas', t: 'Poliuretano com densidades reais, sem carga: D-14 nos acabamentos, D-19 nos braços, D-20 soft nos encostos, D-23 e D-24,5 nos assentos.' },
  { n: 'Molejo', t: 'Cintas elásticas de 40 mm nos encostos e 50 mm nos assentos. Nos modelos Duplo Molejo, molas bonnel e molas ensacadas juntas.' },
  { n: 'Junção', t: 'Assento e encosto acoplados com parafusos galvanizados auto-atarraxantes: mais resistência e montagem simples.' },
  { n: 'Costura', t: 'Linha de nylon 40 em costura dupla pespontada, a mesma usada em estofados de couro.' },
  { n: 'Embalagem', t: 'Plástico, papelão e malha, cantos protegidos e etiqueta externa com produto e revestimento. O sofá é desmontável para lugares de difícil acesso.' },
];

const porDentro = (v, completo) => `<div class="pd-grade">
  <figure class="pd-foto sobe">${img('interna-sofa', 'Corte de um sofá Takei mostrando estrutura de madeira, espumas e revestimento', 1094, 921)}
    ${completo ? '' : '<figcaption>Corte de um estofado Takei: madeira, espumas, fibra e revestimento.</figcaption>'}</figure>
  <ol class="camadas">${(completo ? camadas : camadas.slice(0, 4)).map((c, i) => `<li class="sobe"><span class="cm-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${c.n}</h3><p>${c.t}</p></div></li>`).join('')}</ol>
</div>${completo ? '' : `<p class="pd-mais"><a class="link-seta" href="${link(v, 'qualidade')}">Ver todos os detalhes de fabricação ${ic('seta')}</a></p>`}`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Tenha Takei na sua loja</h2>
  <p>Catálogo com ${produtos.length} modelos, medidas e revestimentos. O time de relacionamento da Takei atende lojistas de todo o Brasil e ajuda você a vender.</p></div>
  <div class="ch-acoes">${btnRev(v)}<a class="btn btn-linha" href="${E.foneHref}">${ic('tel')}${E.fone}</a></div>
</div></section>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Contato pelo site da Takei">
  <div class="form-duas"><label>Assunto<select name="assunto"><option>Quero revender Takei</option><option>Já sou lojista Takei</option><option>Catálogo e preços</option><option>Assistência e garantia</option><option>Trabalhe conosco</option><option>Outros</option></select></label><label>Nome *<input name="nome" required autocomplete="name"></label></div>
  <div class="form-duas"><label>Loja / empresa<input name="empresa" autocomplete="organization"></label><label>Cidade / UF *<input name="cidade" required autocomplete="address-level2"></label></div>
  <div class="form-duas"><label>E-mail *<input name="email" type="email" required autocomplete="email"></label><label>Telefone / WhatsApp *<input name="fone" type="tel" required autocomplete="tel"></label></div>
  <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
  <button class="btn" type="submit">Enviar ${ic('seta')}</button>
  <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;

const cabPag = (titulo, sub, foto) => `<section class="cab-pag${foto ? ' com-foto' : ''}">${foto ? `<div class="cp-foto">${foto}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const tecnologias = () => `<ul class="tecs">
  <li class="sobe"><span class="tc-ic">${ic('coracao')}</span><h3>Sistema massageador</h3><p>O verdadeiro significado de conforto e relaxamento: ajuda no alívio da tensão e das dores musculares, na circulação e no cansaço do dia.</p></li>
  <li class="sobe"><span class="tc-ic"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v14M8 7l4-4 4 4M7 11v3h10v-3M12 17v4"/><circle cx="12" cy="21" r="0"/></svg></span><h3>Entradas USB</h3><p>Carregue celular, tablet e fone sem levantar do sofá e sem extensões espalhadas pela sala.</p></li>
  <li class="sobe"><span class="tc-ic">${ic('estrela')}</span><h3>Duplo Molejo</h3><p>Molas bonnel e molas ensacadas trabalhando juntas no assento dos retráteis.</p></li>
</ul><p class="tecs-nota">*Consulte os modelos disponíveis com cada tecnologia.</p>`;

// ---------- páginas internas ----------
function empresa(v) {
  return head(v, 'empresa', 'A Takei', 'Takei Estofados: fundada em 1996 em Prado Ferreira/PR, 29 anos fabricando sofás retráteis, reclináveis e de canto. Missão, visão, valores e diretrizes.') + topo(v, 'empresa') +
  cabPag('Lugar de gente feliz e produtiva', 'Desde 1996 fabricando sofás em Prado Ferreira, no norte do Paraná.', imgTopo('h-fabrica-aerea', 'Vista aérea da fábrica da Takei Estofados em Prado Ferreira/PR', 1800, 1013)) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Nossa história')}
    <h2>29 anos de crescimento e inovação</h2>
    <p>Fundada em 1996, a Takei tem trilhado uma jornada de crescimento e inovação que em 2025 celebra 29 anos de história.</p>
    <p>Com um olhar constante para o futuro, investimos em tecnologia, treinamento e melhoria contínua, para estar alinhados às exigências do mercado e atender às necessidades e expectativas de clientes e parceiros.</p>
  </div>
  <figure class="sobe foto-moldura">${img('h-fabrica-interna', 'Linha de produção de estofados dentro da fábrica da Takei', 1241, 878)}</figure>
</div></section>
<section class="sec sec-suave"><div class="in">${numeros()}</div></section>
<section class="sec"><div class="in mvv">
  <div class="sobe"><h3>Missão</h3><p>Elaborar produtos e prestar serviços com excelência, que encantem e surpreendam clientes, colaboradores e fornecedores, valorizando a relação de parceria e a responsabilidade social e ambiental.</p></div>
  <div class="sobe"><h3>Visão</h3><p>Nos manter uma empresa inovadora, reconhecida pelos produtos e serviços que oferecemos.</p></div>
  <div class="sobe"><h3>Valores</h3><p>Seriedade, respeito, profissionalismo, honestidade, valorização das relações, responsabilidade e time de trabalho.</p></div>
</div></section>
<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Nossas diretrizes')}<h2>Dez regras que guiam a fábrica</h2></div>
  <ol class="diretrizes">${['Cliente em 1º lugar', 'Qualidade sempre', 'RH do Bem', 'Time de trabalho', 'Produzir (+) com (−) = Produtividade', 'Segurança', 'Inovação', 'Lugar de gente feliz e produtiva', '5S', 'Autorresponsabilidade'].map((d, i) => `<li class="sobe"><span>${String(i + 1).padStart(2, '0')}</span>${d}</li>`).join('')}</ol>
</div></section>
<section class="sec"><div class="in duas fsc">
  <div class="sobe"><span class="selo-fsc grande">FSC<sup>®</sup></span></div>
  <div class="sobe">${sobre('Sustentabilidade')}<h2>Selo FSC® desde 2023</h2>
  <p>Temos orgulho de carregar o selo FSC® pelo Brasil. Ele garante que nossos produtos são feitos com material de florestas bem manejadas certificadas FSC® e de outras fontes controladas.</p>
  <p>O FSC® é o principal sistema de certificação florestal do mundo, presente em mais de 122 países: identifica matéria-prima de área manejada de forma ecologicamente correta, com condições justas de trabalho e economicamente viável.</p></div>
</div></section>` + chamada(v) + rodape(v);
}

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', `Catálogo Takei 2025: ${produtos.length} modelos de sofás retráteis e reclináveis, sofá-cama, sofás de canto, 3 e 2 lugares e poltronas, com medidas.`) + topo(v, 'produtos') +
  cabPag('Produtos', `${produtos.length} modelos do catálogo 2025, com medidas e detalhes de fabricação.`) + `
<nav class="sub-nav" aria-label="Linhas"><div class="in"><ul>${cats.map(c => `<li><a href="#${c.id}">${c.curto}<span class="sn-q">${catDe(c.id).length}</span></a></li>`).join('')}</ul></div></nav>
${cats.map((c, i) => `<section class="linha sec${i % 2 ? ' sec-suave' : ''}" id="${c.id}"><div class="in">
  <header class="linha-cab sobe"><h2>${c.n}</h2><p>${c.t}</p></header>
  ${catDe(c.id).map(p => `<article class="prod sobe" id="${p.s}">
    ${fotoProd(p)}
    <div class="prod-txt"><p class="prod-tipo">${esc(tipo(p.tipo))}</p><h3>${esc(p.n)}</h3><p>${esc(p.desc)}</p>
      ${medidas(p)}
      <p class="prod-acoes"><a class="link-seta" href="/assets/img/amb-${p.s}.webp" data-foto="${esc(`${p.n} · ${tipo(p.tipo)}`)}">Ver no ambiente ${ic('seta')}</a><a class="link-seta" href="${link(v, 'revenda')}">Pedir preço para loja ${ic('seta')}</a></p></div>
  </article>`).join('')}
</div></section>`).join('')}` + chamada(v) + rodape(v);
}

function qualidade(v) {
  return head(v, 'qualidade', 'Por dentro do sofá', 'Como a Takei fabrica seus sofás: madeira de reflorestamento tratada, espumas com densidade real, Duplo Molejo, costura dupla em nylon 40 e embalagem protegida.') + topo(v, 'qualidade') +
  cabPag('Por dentro do sofá', 'A qualidade, o conforto e a durabilidade dos estofados Takei começam aqui.') + `
<section class="sec"><div class="in">${porDentro(v, true)}</div></section>
<section class="sec sec-suave"><div class="in">
  <div class="sec-cab sobe">${sobre('Densidades reais')}<h2>Cada espuma no seu lugar</h2><p>Espumas de poliuretano sem carga e sem suporte, escolhidas pela parte do sofá onde trabalham.</p></div>
  <ul class="espumas">${[['D-14', 'Acabamentos', 14], ['D-19', 'Braços', 19], ['D-20 soft', 'Encostos', 20], ['D-23', 'Assentos fixos e retráteis', 23], ['D-24,5', 'Assentos fixos', 24.5]].map(([d, o, n]) => `<li class="sobe" style="--d:${n}"><b>${d}</b><span>${o}</span><i aria-hidden="true"></i></li>`).join('')}</ul>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Tecnologias')}<h2>Para melhorar o seu conforto</h2></div>
  ${tecnologias()}
</div></section>
<section class="faixa-foto"><div class="ff-img">${img('h-fabrica-interna', 'Montagem de estofados na fábrica da Takei', 1241, 878)}</div><div class="in ff-txt sobe">
  ${sobre('Garantia')}<h2>Conservação e composição na etiqueta</h2>
  <p>Todo o sistema de conservação está no certificado de garantia do produto, e a composição do revestimento vai na etiqueta de cada estofado Takei.</p>
  <a class="link-seta" href="${link(v, 'revenda')}">Falar com a Takei ${ic('seta')}</a></div></section>` + chamada(v) + rodape(v);
}

function revenda(v) {
  const q = encodeURIComponent('Takei Estofados, Rodovia João Lunardelli PR-170, Prado Ferreira - PR');
  return head(v, 'revenda', 'Seja revendedor', 'Revenda Takei Estofados: fale com o time de relacionamento. (43) 3244-1500, contato@takei.com.br, PR-170 Km 34,5, Prado Ferreira/PR.') + topo(v, 'revenda') +
  cabPag('Seja revendedor Takei', 'Lojista, conte onde fica a sua loja: o time de relacionamento da Takei está à disposição para te ajudar a vender.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe caixa-form">${formulario()}</div>
  <div class="sobe">
    <ul class="vantagens">
      <li>${ic('pacote')}<div><h3>Sofá desmontável e bem embalado</h3><p>Plástico, papelão, malha e cantos protegidos. Chega inteiro e entra em apartamento.</p></div></li>
      <li>${ic('livro')}<div><h3>Catálogo com medidas</h3><p>${produtos.length} modelos com todas as medidas e fotos em ambiente para mostrar ao cliente.</p></div></li>
      <li>${ic('usuarios')}<div><h3>Time de relacionamento</h3><p>Atendimento direto da fábrica para tirar dúvidas e ajudar na venda.</p></div></li>
    </ul>
    <ul class="rod-dados ct-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade} · ${E.cep}</span></li></ul>
    <iframe class="mapa" title="Mapa da Takei Estofados em Prado Ferreira/PR" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=13&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

// ---------- inícios ----------
function inicioA() {
  const v = 'a', o = P.olivia;
  return head(v, 'index', '', 'Takei Estofados, Prado Ferreira/PR: fábrica de sofás retráteis e reclináveis, sofá-cama, sofás de canto, 3 e 2 lugares e poltronas desde 1996. Seja revendedor.') + topo(v, 'index') + `
<section class="heroa">
  <div class="ha-foto">${imgTopo('h-capa', 'Sofá de canto retrátil Olívia, da Takei, em sala de estar', 2000, 1333)}</div>
  <div class="in ha-txt">
    <p class="sobrelinha">Fábrica de estofados · desde 1996</p>
    <h1>Conforto em cada momento.</h1>
    <p class="ha-sub">Sofás retráteis, reclináveis, de canto e poltronas feitos em Prado Ferreira, no Paraná, com madeira certificada FSC® e espumas de densidade real.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Ver os ${produtos.length} modelos</a>${btnRev(v, 'btn btn-linha', 'Seja revendedor')}</p>
  </div>
</section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas')}<h2>Um sofá para cada sala</h2></div>
  ${linhasCat(v)}
</div></section>

<section class="sec sec-suave destaque"><div class="in duas">
  <div class="sobe">${fotoProd(o)}</div>
  <div class="sobe">${sobre('Destaque do catálogo')}<h2>Olívia, retrátil e reclinável</h2>
    <p>${esc(o.desc)}</p>
    ${medidas(o)}
    <a class="link-seta" href="${link(v, 'produtos')}#retratil">Todos os retráteis ${ic('seta')}</a></div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Por dentro do sofá')}<h2>O que não aparece, a gente capricha</h2><p>Abra um Takei e você encontra madeira tratada, espuma com a densidade certa em cada parte e costura dupla.</p></div>
  ${porDentro(v, false)}
</div></section>

<section class="sec sec-suave"><div class="in">${numeros()}</div></section>

<section class="faixa-foto"><div class="ff-img">${img('h-fabrica-aerea', 'Fábrica da Takei Estofados vista do alto, em Prado Ferreira/PR', 1800, 1013)}</div><div class="in ff-txt sobe">
  ${sobre('Prado Ferreira · PR')}<h2>Lugar de gente feliz e produtiva</h2>
  <p>Da madeira de reflorestamento à embalagem, cada sofá é feito na nossa fábrica às margens da PR-170, no norte do Paraná.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Takei ${ic('seta')}</a></div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Mais vistos')}<h2>Modelos do catálogo 2025</h2></div>
  <div class="vitrine">${['viviane', 'mirela', 'martina', 'iris', 'eduarda', 'malu', 'barbara', 'camila'].map(s => cartao(v, P[s])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Takei Estofados: sofás retráteis, reclináveis, de canto e poltronas fabricados no Paraná desde 1996. Catálogo com medidas e programa para lojistas.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('h-banner', 'Sofá de canto retrátil Takei em sala de estar', 2000, 866)}</div>
  <div class="in hb-txt">
    <p class="sobrelinha">Takei Estofados · Paraná</p>
    <h1>Sofás feitos para <em>ficar.</em></h1>
    <p class="hb-sub">Retráteis com Duplo Molejo, cantos, sofá-cama e poltronas. ${produtos.length} modelos para a sua loja, direto da fábrica.</p>
    <p class="ha-acoes">${btnRev(v)}<a class="btn btn-linha" href="${link(v, 'produtos')}">Ver catálogo</a></p>
  </div>
</section>
<section class="faixa-num"><div class="in">${numeros()}</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Escolha a linha')}<h2>Do retrátil à poltrona</h2></div>
  <div class="abas" data-abas>
    <div class="abas-lista" role="tablist">${cats.map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-aba="${c.id}">${c.curto}</button>`).join('')}</div>
    ${cats.map((c, i) => { const p = P[capa[c.id]]; return `<div class="aba-painel" role="tabpanel" data-painel="${c.id}"${i ? ' hidden' : ''}>
      <figure class="ap-foto">${amb(p)}</figure>
      <div class="ap-txt"><h3>${c.n}</h3><p>${c.t}</p><ul class="ap-mod">${catDe(c.id).map(m => `<li><a href="${link(v, 'produtos')}#${m.s}">${esc(m.n)}</a></li>`).join('')}</ul>
      <a class="link-seta" href="${link(v, 'produtos')}#${c.id}">Ver medidas ${ic('seta')}</a></div></div>`; }).join('')}
  </div>
</div></section>

<section class="sec sec-escura"><div class="in">
  <div class="sec-cab sobe">${sobre('Por dentro do sofá')}<h2>Conforto que dura começa na estrutura</h2></div>
  ${porDentro(v, false)}
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Tecnologias')}<h2>Massageador, USB e Duplo Molejo</h2></div>
  ${tecnologias()}
</div></section>

<section class="sec sec-suave"><div class="in duas fabrica-b">
  <figure class="sobe">${img('h-fabrica-interna', 'Equipe montando estofados na fábrica da Takei', 1241, 878)}</figure>
  <div class="sobe">${sobre('Nossas diretrizes')}<h2>Lugar de gente feliz e produtiva</h2>
  <p>Cliente em 1º lugar, qualidade sempre, RH do Bem, time de trabalho, segurança, inovação, 5S e autorresponsabilidade: as diretrizes que guiam a Takei desde 1996.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Takei ${ic('seta')}</a></div>
</div></section>

<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Catálogo 2025')}<h2>Alguns modelos</h2></div>
  <div class="vitrine">${['olivia', 'gabrieli', 'amanda', 'melissa', 'gabriela', 'iza-poltrona', 'sakura', 'emily'].map(s => cartao(v, P[s])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), qualidade: qualidade(v), revenda: revenda(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'takei.js'), path.join(pub, 'assets/takei.js'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Takei Estofados', artigo: 'da', url: E.url, lang: 'pt', cor: '#fe122a', fundo: '#2b2321', claro: '#f6f1ea',
  fonteTitulo: "'Poppins',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, nos tons areia do catálogo com o vermelho da marca. Abre com a sala da capa do catálogo 2025.', pontos: [`Catálogo com os ${produtos.length} modelos, medidas e fotos em ambiente`, 'Botão fechado/aberto nos retráteis', '"Por dentro do sofá" com o corte do estofado'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais elegante: marrom escuro e vermelho, linhas em abas com a foto de ambiente de cada uma.', pontos: ['Linhas em abas, do retrátil à poltrona', 'Massageador, USB e Duplo Molejo em destaque', 'Mesmas 5 páginas, foco no lojista'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
