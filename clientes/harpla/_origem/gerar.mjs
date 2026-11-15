// Plásticos Harpla (Gravataí/RS, desde 1982): Filtro Permanente para Café Moka, Porta-Filtro Moka, Tábua Bate Pronto Moka e Mata-Moscas Harpla.
// node clientes/harpla/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs harpla https://harpla.com.br/)
// Textos, tabelas logísticas e fotos do site atual. Fotos de banco de imagem do blog (xícara, brownie, legumes) descartadas.
// Títulos em Londrina Solid, o mais próximo da letra à mão do site atual (love-story); texto em Lato, como hoje. Logo: PNG original do site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Harpla', legal: 'Plásticos Harpla Ltda.', url: 'https://harpla.overtus.com.br/', antigo: 'https://harpla.com.br/', loja: 'https://harpla.com.br/loja',
  fone: '(51) 3489-1438', foneHref: 'tel:+555134891438', email: 'comercial@harpla.com.br',
  wa: 'https://api.whatsapp.com/send?phone=555134891438',
  end: 'Avenida Plínio Gilberto Kroeff, 850', cidade: 'Distrito Industrial, Gravataí/RS', cep: '94045-390',
  insta: 'https://www.instagram.com/plasticosharpla', face: 'https://www.facebook.com/plasticosharpla',
};
const ext = 'target="_blank" rel="noopener"';

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const sobre = t => `<p class="sobrelinha">${t}</p>`;

const tabCab = ['Descrição', 'Embalagem', 'Quantidade', 'Cód. de barras', 'NCM', 'Medidas A x L x C (m)', 'Cubagem (m³)', 'Peso (kg)'];
const P = [
  {
    slug: 'filtro-permanente', nome: 'Filtro Permanente para Café', marca: 'Moka', capa: 'filtro-102',
    curto: 'O companheiro de todos os seus cafés. Tamanhos 102 e 103.',
    lead: 'Experimente passar um café com o filtro Moka: o aroma toma conta da casa e o sabor é inigualável.',
    texto: ['Fabricado com matérias-primas selecionadas e revisado um por um pela nossa equipe, o filtro Moka foi pensado para manter a tradição e o sabor do café passado no coador de pano, o mesmo sabor da infância.', 'O grande diferencial é a fabricação em feltro sintético de polipropileno (TNT), um dos poucos materiais plásticos que, pelas normas internacionais de saúde, pode entrar em contato com alimentos, pois é totalmente atóxico. Nenhum filtro sai da fábrica sem verificação individual da equipe de qualidade.', 'Validade indeterminada: dura até mostrar sinais de desgaste.'],
    vant: ['Qualidade', 'Economia', 'Meio ambiente', 'Versatilidade', 'Saúde'],
    fotos: [['filtro-102', 'Filtro Permanente Moka 102, embalagem unitária'], ['filtro-permanente', 'Filtro Permanente Moka'], ['filtro-103', 'Filtro Moka 103'], ['filtro-pack', 'Pack com 10 filtros'], ['filtro-display', 'Display com 20 filtros'], ['caixa-master', 'Caixa master']],
    tab: [
      ['Filtro Moka 102', 'Unitário', '1 unidade', '7.896.325.620.015', '6307.90.10', '0,01 x 0,14 x 0,215', '0,000301', '0,016'],
      ['Filtro Moka 102', 'Pack', '10 unidades', '7.896.325.622.101', '6307.90.10', '0,1 x 0,14 x 0,215', '0,00301', '0,168'],
      ['Filtro Moka 102', 'Caixa master pack', '600 unidades', '', '6307.90.10', '0,75 x 0,52 x 0,48', '0,1872', '11,85'],
      ['Filtro Moka 102', 'Display', '20 unidades', '7.896.325.630.206', '6307.90.10', '0,19 x 0,15 x 0,22', '0,00627', '0,404'],
      ['Filtro Moka 102', 'Caixa master display', '120 unidades', '7.896.325.621.203', '6307.90.10', '0,23 x 0,3 x 0,57', '0,03933', '2,83'],
      ['Filtro Moka 103', 'Unitário', '1 unidade', '7.896.325.630.014', '6307.90.10', '0,01 x 0,14 x 0,215', '0,000301', '0,018'],
      ['Filtro Moka 103', 'Pack', '10 unidades', '7.896.325.632.100', '6307.90.10', '0,1 x 0,14 x 0,215', '0,00301', '0,18'],
      ['Filtro Moka 103', 'Caixa master pack', '600 unidades', '', '6307.90.10', '0,75 x 0,52 x 0,48', '0,1872', '12,8'],
      ['Filtro Moka 103', 'Display', '20 unidades', '7.896.325.630.205', '6307.90.10', '0,19 x 0,15 x 0,22', '0,00627', '0,444'],
      ['Filtro Moka 103', 'Caixa master display', '120 unidades', '7.896.325.631.202', '6307.90.10', '0,23 x 0,3 x 0,57', '0,03933', '3,038'],
    ],
  },
  {
    slug: 'porta-filtro', nome: 'Porta-Filtro', marca: 'Moka', capa: 'porta-filtro',
    curto: 'Com tubo de encaixe que se acopla à garrafa térmica.',
    lead: 'O Porta-Filtro Moka não é um simples porta-filtro: o tubo de encaixe se acopla perfeitamente à garrafa térmica.',
    texto: ['Encaixado direto na garrafa, ele dispensa passar o café em outro recipiente para depois transferir. Assim a bebida não esfria, não oxida e não se contamina.', 'É nossa patente industrial (registro no INPI DI66024498) e o primeiro porta-filtro com tubo de encaixe exclusivo. Combina praticidade, inovação e higiene, e é perfeitamente compatível com o Filtro Moka.', 'Modelos 103 e 102 (lançamento).'],
    vant: ['Praticidade', 'Inovação', 'Saúde e higiene'],
    fotos: [['porta-filtro-cafe', 'Porta-Filtro Moka com Filtro Moka e café passado'], ['porta-filtro', 'Porta-Filtro Moka 103'], ['porta-filtro-interno', 'Interior do Porta-Filtro Moka'], ['porta-filtro-103', 'Porta-Filtro Moka 103 com embalagem'], ['porta-filtro-102', 'Porta-Filtro Moka 102'], ['porta-filtro-detalhe', 'Detalhe do Porta-Filtro Moka']],
    tab: [
      ['Porta-Filtro Moka 102', 'Unitário', '1 unidade', '7896325600062', '3924.10.00', '0,13 x 0,145 x 0,12', '0,002262', '0,062'],
      ['Porta-Filtro Moka 102', 'Caixa master', '45 unidades', '', '3924.10.00', '0,335 x 0,33 x 0,56', '0,061908', '3,268'],
      ['Porta-Filtro Moka 103', 'Unitário', '1 unidade', '7.896.325.600.055', '3924.10.00', '0,16 x 0,165 x 0,135', '0,003564', '0,082'],
      ['Porta-Filtro Moka 103', 'Caixa master', '30 unidades', '', '3924.10.00', '0,335 x 0,33 x 0,56', '0,061908', '2,93'],
    ],
  },
  {
    slug: 'tabua-bate-pronto', nome: 'Tábua Bate Pronto', marca: 'Moka', capa: 'tabua',
    curto: 'Corta e amacia: cozinha com praticidade, estilo e higiene.',
    lead: 'A Tábua Bate Pronto Moka foi pensada para duas tarefas do dia a dia de quem cozinha.',
    texto: ['Os vértices pontiagudos amaciam o bife enquanto você bate, sem precisar virar a carne. E ela serve para cortar carnes, legumes, peixes, verduras e tudo o que se corta numa tábua comum.', 'Feita com 100% de polipropileno e bordas que retêm líquidos, é mais higiênica e muito mais fácil de lavar.'],
    vant: ['Praticidade', 'Higiene', '100% polipropileno'],
    fotos: [['tabua', 'Tábua Bate Pronto Moka, frente e verso']],
    tab: [
      ['Tábua Bate Pronto', 'Unitário', '1 unidade', '7.896.325.660.011', '3924.10.00', '0,6 x 0,203 x 0,295', '0,035931', '0,236'],
      ['Tábua Bate Pronto', 'Pacote master', '50 unidades', '', '3924.10.00', '0,3 x 0,203 x 0,295', '0,0179655', '11,128'],
    ],
  },
  {
    slug: 'mata-moscas', nome: 'Mata-Moscas', marca: 'Harpla', capa: 'mata-moscas-cores',
    curto: 'Design clássico, cabo 100% reciclado e nenhuma gota de veneno.',
    lead: 'Design clássico, produzido em polietileno de baixa densidade: a pá tem chicote rápido, leve e muito durável.',
    texto: ['Anéis de reforço no encaixe do cabo evitam a ruptura. O cabo é de polipropileno 100% reciclado, com a rigidez certa para uma batida eficiente.', 'É ecológico: diferente dos inseticidas, não agride a saúde nem o meio ambiente. Para matar um mosquito com spray, milhares de gotículas vão para o ar e podem chegar aos alimentos, à família, às plantas e aos animais.', 'O mata-moscas é fabricado pela Harpla desde antes da fundação da empresa e segue na linha até hoje.'],
    vant: ['Meio ambiente', 'Cabo reciclado', 'Durabilidade'],
    fotos: [['mata-moscas', 'Mata-Moscas Harpla nas cores amarela e vermelha', 'cheia'], ['mata-moscas-cores', 'Mata-Moscas Harpla'], ['mata-moscas-dupla', 'Pá do Mata-Moscas Harpla']],
    tab: [
      ['Mata-Moscas Harpla', 'Unitário', '1 unidade', '7.896.325.680.019', '3924.90.00', '0,015 x 0,1 x 0,48', '0,00072', '0,034'],
      ['Mata-Moscas Harpla', 'Pacote', '12 unidades', '7.896.325.680.125', '3924.90.00', '0,05 x 0,12 x 0,48', '0,00288', '0,408'],
      ['Mata-Moscas Harpla', 'Caixa master', '120 unidades', '7.896.325.690.018', '3924.90.00', '0,23 x 0,215 x 0,51', '0,0252195', '4,36'],
    ],
  },
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Harpla' },
  { slug: 'produtos', n: 'Produtos', sub: P.map(p => p.slug) },
  { slug: 'marca-propria', n: 'Marca própria' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Dia a dia', b: 'Café Moka' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@400;900&family=Lato:ital,wght@0,400;0,700;1,400&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Harpla | Filtro Moka, Porta-Filtro Moka e Mata-Moscas Harpla' : `${titulo} | Harpla`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#d7141c' });
const marca = () => `<img class="logo" src="/assets/logo.webp" alt="Harpla" width="${F.logo[0]}" height="${F.logo[1]}">`;

function topo(v, slug) {
  return `<header class="topo${v === 'b' ? ' topo-b' : ''}">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Trabalhando para a praticidade do seu lar desde 1982</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Harpla, página inicial">${marca()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug || (n.sub || []).includes(slug) ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${E.loja}" ${ext}>Loja virtual</a>
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
    <div class="rod-marca"><span class="marca">${marca()}</span>
      <p>Empresa familiar do ramo plástico, há mais de 40 anos no Distrito Industrial de Gravataí, com produtos de qualidade e alta durabilidade.</p>
      <p class="rod-social"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Produtos</h3><ul>${P.map(p => `<li><a href="${link(v, p.slug)}">${p.nome} ${p.marca}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${icWa()}<a href="${E.wa}" ${ext}>WhatsApp</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}<br>CEP ${E.cep}</span></li>
    </ul></div>
    <div><h3>Harpla</h3><ul>
      <li><a href="${link(v, 'empresa')}">Nossa história</a></li>
      <li><a href="${link(v, 'empresa')}#sustentabilidade">Sustentabilidade</a></li>
      <li><a href="${link(v, 'marca-propria')}">Marca própria</a></li>
      <li><a href="${E.loja}" ${ext}>Loja virtual</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Aceitamos PIX e PagSeguro na loja virtual</span></div>
</footer>
<a class="wa-flutua" href="${E.wa}" ${ext} aria-label="WhatsApp da Harpla">${icWa()}</a>
</body>
</html>`;
}

const grade = (v, lista = P) => `<ul class="prodg">${lista.map(p => `<li class="sobe"><a href="${link(v, p.slug)}">${img(p.capa, `${p.nome} ${p.marca}`)}<div><b>${p.nome} ${p.marca}</b><span>${p.curto}</span></div></a></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Quer revender os produtos Harpla e Moka?</h2>
  <p>Atendemos lojistas, supermercados e distribuidores. Fale com o comercial e receba condições, embalagens e prazos.</p></div>
  <div class="ch-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Falar com o comercial</a><a class="btn btn-linha" href="${E.loja}" ${ext}>Comprar na loja</a></div>
</div></section>`;

const cabPag = (titulo, sub) => `<section class="cab-pag"><div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const tempo = () => `<ul class="linha-tempo">
  <li class="sobe"><b>1970</b><p>De volta do Uruguai e da Argentina, José Djalmo Hartmann vê sacos de adubo descartados nas fazendas e cria uma fábrica de mangueiras de polietileno para irrigação.</p></li>
  <li class="sobe"><b>1982</b><p>Depois de mangueiras de PVC 100% recicladas, mata-moscas, agulhas de tricô, sandálias e brinquedos, nasce a Plásticos Harpla Ltda., com Hilma Hartmann.</p></li>
  <li class="sobe"><b>Anos 90</b><p>Já em Gravataí, a Harpla é a primeira fabricante de Filtro Permanente para Café em TNT. Depois vêm a Tábua Bate Pronto e o Porta-Filtro Moka.</p></li>
  <li class="sobe"><b>2010</b><p>Hilton Hartmann assume a empresa com Rose. Os netos Karina, Kelly e Klaus entram na gestão, com os mesmos valores.</p></li>
</ul>`;
const pilares = () => `<ul class="pilares4">
  <li class="sobe">${ic('estrela')}<b>Produtos de qualidade</b></li>
  <li class="sobe">${ic('gota')}<b>Responsabilidade ambiental</b></li>
  <li class="sobe">${ic('usuarios')}<b>Empresa familiar</b></li>
  <li class="sobe">${ic('engrenagem')}<b>Empresa inovadora</b></li>
</ul>`;

function empresa(v) {
  return head(v, 'empresa', 'A Harpla', 'Plásticos Harpla: empresa familiar fundada por José Djalmo Hartmann, há mais de 40 anos em Gravataí/RS. Primeira fabricante de filtro permanente para café em TNT.') + topo(v, 'empresa') +
  cabPag('Há mais de 40 anos no mercado', 'Trabalhando para a praticidade do seu lar.') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('O fundador')}<h2>José Djalmo Hartmann</h2>
  <p>Um empresário visionário que viajou ao Uruguai e à Argentina em busca de conhecimento. No Uruguai teve o primeiro contato com a injeção de plásticos; na Argentina, com a extrusão de PVC a partir de aparas reaproveitadas, um processo que já mostrava uma visão sustentável de negócio.</p>
  <p>Esses conhecimentos são usados até hoje nos processos de fabricação da Harpla.</p></div>
  <figure class="sobe" style="text-align:center">${img('fundadores', 'José Djalmo e Hilma Hartmann', ' class="retrato"')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Nossa história')}<h2>Da mangueira de irrigação ao filtro de café</h2></div>
  ${tempo()}
</div></section>
${img('fabrica-antiga', 'Foto antiga da fábrica Harpla', ' class="foto-larga"')}
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Missão e valores')}<h2>O que guia a Harpla</h2></div>
  ${pilares()}
</div></section>
<section class="lado" id="sustentabilidade">
  <figure>${img('energia-solar', 'Usina solar na sede da Harpla em Gravataí')}</figure>
  <div class="sobe">${sobre('Sustentabilidade')}<h2>A Harpla se preocupa com o meio ambiente</h2>
  <p>Em toda a jornada, a preocupação foi garantir a qualidade dos produtos reutilizando materiais plásticos e evitando o acúmulo de lixo na natureza.</p>
  <p>Começou com o cabo do mata-moscas, que passou a ser feito das aparas (sobras) da produção, material que normalmente é vendido como sucata ou descartado. O objetivo sempre foi reciclar, reaproveitar e cuidar da natureza e da sua família.</p></div>
</section>` + chamada(v) + rodape(v);
}

function produtos(v) {
  return head(v, 'produtos', 'Produtos', 'Produtos Harpla e Moka: Filtro Permanente para Café, Porta-Filtro com tubo de encaixe, Tábua Bate Pronto e Mata-Moscas Harpla.') + topo(v, 'produtos') +
  cabPag('Produtos', 'Utilidade e praticidade no seu dia a dia.') + `
<section class="sec"><div class="in">
  ${grade(v)}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <div class="sobe">${sobre('Para o varejo')}<h2>Embalagens pensadas para a gôndola</h2>
  <p>Os produtos Moka saem em embalagem unitária, pack com 10, display com 20 e caixas master. Cada página de produto traz a tabela logística com código de barras, NCM, medidas, cubagem e peso.</p>
  <p class="loja-nota"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Pedir tabela de preços</a></p></div>
  <figure class="sobe">${img('filtro-display', 'Display com 20 Filtros Moka')}</figure>
</div></section>` + chamada(v) + rodape(v);
}

function produtoPag(v, p) {
  const outros = P.filter(x => x !== p);
  return head(v, p.slug, `${p.nome} ${p.marca}`, `${p.nome} ${p.marca}: ${p.lead}`.slice(0, 160)) + topo(v, p.slug) + `
<section class="sec"><div class="in duas" style="align-items:start">
  <div class="pf-fotos sobe">${p.fotos.map(f => foto(f[0], f[1], f[2] || '')).join('')}</div>
  <div class="sobe">${sobre(`Marca ${p.marca}`)}<h1 style="font-size:clamp(40px,4.6vw,64px);line-height:1">${p.nome} ${p.marca}</h1>
  <p style="font-size:1.15rem">${p.lead}</p>
  ${p.texto.map(t => `<p>${t}</p>`).join('')}
  <ul class="vant">${p.vant.map(x => `<li>${x}</li>`).join('')}</ul>
  <p class="loja-nota"><a class="btn" href="${E.loja}" ${ext}>Comprar na loja virtual</a><a class="btn btn-linha" href="${E.wa}" ${ext}>Revender</a></p></div>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Para lojistas')}<h2>Dados logísticos</h2></div>
  <div class="tabela-wrap sobe"><table class="tab"><thead><tr>${tabCab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${p.tab.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th>${c}</th>` : `<td>${c || '–'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Veja também')}<h2>Outros produtos</h2></div>
  <ul class="prodg" style="grid-template-columns:repeat(3,minmax(0,1fr))">${outros.map(o => `<li class="sobe"><a href="${link(v, o.slug)}">${img(o.capa, `${o.nome} ${o.marca}`)}<div><b>${o.nome} ${o.marca}</b><span>${o.curto}</span></div></a></li>`).join('')}</ul>
</div></section>` + chamada(v) + rodape(v);
}

function marcaPropria(v) {
  return head(v, 'marca-propria', 'Marca própria', 'Filtros e porta-filtros com a sua marca: a Harpla fabrica Filtro Permanente e Porta-Filtro personalizados.') + topo(v, 'marca-propria') +
  cabPag('Filtros e porta-filtros com a sua marca', 'Já pensou ter a sua marca estampada nos nossos filtros e porta-filtros?') + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Marca própria')}<h2>Agora você pode</h2>
  <p>Produtos com a sua marca são uma ótima estratégia para fidelizar clientes e ficar na lembrança de quem toma café todos os dias.</p>
  ${checks(['Filtro Permanente para Café em TNT atóxico, nos tamanhos 102 e 103', 'Porta-Filtro com tubo de encaixe na garrafa térmica', 'Fabricação própria em Gravataí/RS, com verificação peça por peça', 'Embalagem unitária, pack, display e caixa master'])}
  <p class="loja-nota"><a class="btn" href="${E.wa}" ${ext}>${icWa()} Fale conosco</a><a class="btn btn-linha" href="mailto:${E.email}">${E.email}</a></p></div>
  <div class="pf-fotos sobe">${foto('porta-filtros-dupla', 'Porta-Filtros Moka 102 e 103', 'cheia')}${foto('filtro', 'Filtro Permanente')}${foto('porta-filtro-marrom', 'Porta-Filtro')}${foto('filtro-embalagem', 'Embalagem do filtro')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Avenida Plínio Gilberto Kroeff, 850, Gravataí - RS');
  return head(v, 'contato', 'Contato', 'Harpla: (51) 3489-1438, comercial@harpla.com.br. Avenida Plínio Gilberto Kroeff, 850, Distrito Industrial, Gravataí/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Fale com a gente pelo meio que preferir.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
    <li>${icWa()}<a href="${E.wa}" ${ext}>WhatsApp ${E.fone}</a></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}<br>CEP ${E.cep}</span></li></ul>
    <p class="ha-acoes"><a class="btn" href="${E.wa}" ${ext}>${icWa()} WhatsApp</a><a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')} E-mail</a></p></div>
  <div class="sobe"><iframe class="mapa" title="Mapa da Harpla em Gravataí/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Plásticos Harpla, Gravataí/RS: Filtro Permanente para Café Moka, Porta-Filtro Moka, Tábua Bate Pronto e Mata-Moscas Harpla. Mais de 40 anos de história.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Plásticos Harpla · Gravataí/RS')}
      <h1>Utilidade e praticidade <em>no seu dia a dia.</em></h1>
      <p class="ha-sub">Há mais de 40 anos fabricamos produtos de plástico de qualidade e alta durabilidade: o Filtro Permanente para Café Moka, o Porta-Filtro com tubo de encaixe, a Tábua Bate Pronto e o clássico Mata-Moscas Harpla.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'produtos')}">Conheça os produtos</a><a class="btn btn-linha" href="${E.loja}" ${ext}>Loja virtual</a></p>
    </div>
    <div class="ha-prod">${imgTopo('porta-filtro-cafe', 'Porta-Filtro Moka com Filtro Moka e café passado')}<span class="ha-tag"><b>Patente Moka</b>tubo de encaixe na garrafa térmica</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Mais de 40 anos</span><span>${ic('check')}Fabricação própria em Gravataí</span><span>${ic('check')}TNT atóxico</span><span>${ic('check')}Cabo 100% reciclado</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Feitos para a sua cozinha</h2></div>
  ${grade(v)}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('porta-filtros-dupla', 'Porta-Filtros Moka 102 e 103 com embalagem')}</figure>
  <div class="sobe">${sobre('Desde os anos 90')}<h2>A primeira fabricante de filtro permanente em TNT</h2>
  <p>O Filtro Moka mantém o sabor do café passado no coador de pano, sem papel e sem desperdício. Com o Porta-Filtro Moka, o café cai direto na garrafa térmica, sem esfriar e sem oxidar.</p>
  <p><a class="link-seta" href="${link(v, 'filtro-permanente')}">Conheça o Filtro Moka ${ic('seta')}</a></p></div>
</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1982')}<h2>Uma empresa de família</h2>
  <p>Fundada por José Djalmo e Hilma Hartmann, hoje dirigida pelo filho Hilton e por Rose, com os netos Karina, Kelly e Klaus. Os valores seguem os mesmos: qualidade, sustentabilidade e foco em clientes e colaboradores.</p>
  <p><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('energia-solar', 'Usina solar na sede da Harpla')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Harpla e Moka: o café passado com o sabor do coador de pano. Filtro Permanente, Porta-Filtro com tubo de encaixe, Tábua Bate Pronto e Mata-Moscas. Gravataí/RS.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('porta-filtro-cafe', 'Café passado no Porta-Filtro Moka')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Moka · uma marca Harpla')}
    <h1>O sabor do café <em>de coador de pano.</em></h1>
    <p class="hb-sub">Filtro permanente em TNT atóxico e porta-filtro que encaixa na garrafa térmica. Feitos em Gravataí há mais de 40 anos.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'filtro-permanente')}">Filtro Moka</a><a class="btn btn-linha" href="${link(v, 'porta-filtro')}">Porta-Filtro Moka</a></p>
    <div class="hb-selo"><div><b>1982</b><span>fundação</span></div><div><b>102 e 103</b><span>tamanhos</span></div><div><b>INPI</b><span>tubo de encaixe patenteado</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha completa')}<h2>Harpla e Moka</h2></div>
  ${grade(v)}
</div></section>
<section class="lado">
  <figure>${img('mata-moscas', 'Mata-Moscas Harpla amarelo e vermelho')}</figure>
  <div class="sobe">${sobre('Mata-Moscas Harpla')}<h2>Sem veneno no ar</h2>
  <p>A pá leve e durável tem anéis de reforço no encaixe, e o cabo é feito das sobras da própria produção: polipropileno 100% reciclado.</p>
  <p><a class="link-seta" href="${link(v, 'mata-moscas')}">Ver o Mata-Moscas ${ic('seta')}</a></p></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Nossa história')}<h2>Três gerações de Hartmann</h2></div>
  ${tempo()}
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => {
  const o = { index: inicio(), empresa: empresa(v), produtos: produtos(v), 'marca-propria': marcaPropria(v), contato: contato(v) };
  for (const p of P) o[p.slug] = produtoPag(v, p);
  return o;
};

copiarSiteJs(pub, '555134891438');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Harpla', artigo: 'da', url: E.url, lang: 'pt', cor: '#d7141c', fundo: '#2b1712', claro: '#faf5ee',
  fonteTitulo: "'Londrina Solid',system-ui,sans-serif", fonteTexto: "'Lato',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 9, texto: 'Clara e acolhedora, abre com o Porta-Filtro Moka e mostra a linha completa.', pontos: ['Página por produto', 'Tabela logística para lojistas', 'História da família Hartmann'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 9, texto: 'Tons de café, abre com o café passado no Porta-Filtro e destaca a marca Moka.', pontos: ['Moka em destaque', 'Mata-Moscas em tela cheia', 'Mesmas páginas internas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
