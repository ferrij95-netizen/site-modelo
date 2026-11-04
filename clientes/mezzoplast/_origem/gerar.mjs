// Mezzoplast (Alvorada/RS): cabides plásticos, manutenção de equipamentos de construção civil e componentes para torres de resfriamento. Gera public/{a,b}/ e a página de escolha.
// node clientes/mezzoplast/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mezzoplast https://mezzoplast.com.br/)
// Textos e fotos do site atual (WordPress). Sem WhatsApp no site atual: o formulário abre o e-mail (form data-email no site.js).
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mezzoplast', razao: 'Mezzoplast Ind. e Com. de Manufaturados Plásticos Ltda', url: 'https://mezzoplast.overtus.com.br/', antigo: 'https://mezzoplast.com.br/',
  fone1: '(51) 3483-1024', fone2: '(51) 3044-3333', email: 'mezzoplast@mezzoplast.com.br',
  rua: 'Rua Caetano Dihl, 496', bairro: 'Vila Americana', cidade: 'Alvorada - RS',
  curto: 'Indústria de manufaturados plásticos em Alvorada/RS desde 1982: cabides para vestuário, componentes para torres de resfriamento e manutenção de equipamentos metálicos de obra.',
};
const sobre = [
  'A Mezzoplast Ind. e Com. de Manufaturados Plásticos Ltda foi fundada em 1982, voltada para o setor de materiais plásticos. Começou fabricando e vendendo cabides para vestuário e peças técnicas para sistemas de resfriamento e filtragem.',
  'Instalada inicialmente em Porto Alegre, desenvolveu vários modelos de cabides plásticos para os mais diversos segmentos da indústria do vestuário, o que lhe rendeu numerosos clientes.',
  'Para lançar novos produtos e ampliar a capacidade produtiva, em 1986 a Mezzoplast adquiriu nova sede em Alvorada (RS), onde está até hoje.',
  'A partir de 2005 passou a prestar serviços de manutenção e recuperação de embalagens plásticas para o setor automotivo e de formas plásticas (cubetas), escoramento e vigamento metálico, formas, andaimes e acessórios metálicos para a construção civil.',
];
const numeros = [['1982', 'fundação'], ['3.300 m²', 'de parque fabril, 1.700 m² construídos'], ['3 turnos', 'de trabalho por dia'], ['30 t', 'de plástico processadas por mês, em média']];
const frentes = [
  { id: 'cabides', cor: 'azul', icone: 'cabide', t: 'Indústria de vestuário', d: 'Diversos modelos de cabides plásticos, apropriados para os mais diversos segmentos da indústria de roupas.', foto: 'cabides-arara' },
  { id: 'construcao', cor: 'laranja', icone: 'obra', t: 'Construção civil', d: 'Manutenção e reforma dos equipamentos metálicos usados no canteiro de obras: escoras, formas para concretagem e outros.', foto: 'escoramento' },
  { id: 'resfriamento', cor: 'verde', icone: 'torre', t: 'Resfriamento e filtragem', d: 'Enchimentos de contato, eliminadores de gotas e outros acessórios para sistemas de resfriamento e filtragem.', foto: 'torres' },
];
const anatomicos = [['10', '42,5', '24', 'e', '40 mm'], ['11', '40,5', '22,5', 'e', '47 mm'], ['16', '49', '26', 'o', '4,75 cm'], ['17', '46', '25', 'o', '3,8 cm'], ['18', '45,7', '24', 'e', '45 mm'], ['19', '48,2', '24', 'e', '45 mm'], ['20', '50,8', '24', 'e', '45 mm'], ['35', '44', '25', 'o', '4,75 cm'], ['39', '38,5', '25', 'o', '3,8 cm'], ['41', '41', '24,5', 'o', '6,25 cm'], ['43', '43', '24', 'o', '5,25 cm'], ['46', '46', '24,5', 'o', '5,25 cm'], ['67', '43', '25,5', 'o', '5,25 cm'], ['68', '43', '24,5', 'o', '6 cm'], ['69', '48', '25', 'o', '6 cm']];
const outros = [['08', '45', '22', 'e', '10 mm'], ['21', '39,5', '20', 'e', '7 mm'], ['31', '33,2', '16', 'e', '6 mm'], ['50', '42', '20', 'e', '8 mm'], ['58', '42,5', '25', 'e', '8 mm'], ['59', '35', '13', 'e', '8 mm'], ['60', '43,5', '21,5', 'e', '8 mm'], ['61', '38', '16', 'e', '8 mm'], ['88', '41', '19,5', 'e', '8 mm']];
const comFoto = new Set(['10', '11', '16', '17', '18', '19', '20', '35', '39', '41', '43', '46', '67', '68', '69', '08', '21', '31', '50', '60', '88']);
const comPersp = new Set(['10', '11', '16', '17', '18', '19', '35', '39', '41', '43', '46', '67', '68', '69', '08', '60']);
const vantagens = [
  ['Economia', 'Recuperamos equipamentos danificados que já não tinham condições de uso, renovando a vida útil e evitando a compra de peças novas. Em geral, a manutenção custa cerca de 20% do valor das peças novas de fábrica.'],
  ['Agilidade', 'O maquinário permite devolver os equipamentos às obras sem atrasar o cronograma e reduz, ou elimina, a compra ou locação de equipamentos não previstos.'],
  ['Qualidade', 'Equipamentos que chegam limpos e em perfeito estado ao canteiro tendem a ser mais bem cuidados pela equipe e voltam no mesmo estado.'],
  ['Padrão garantido', 'Limpeza e consertos feitos com maquinário especializado mantêm o mesmo padrão o dia todo, ao contrário da limpeza manual. As flautas deslizam livres dentro das escoras e as roscas e copos ficam limpos e lubrificados.'],
];
const grupos = [
  { t: 'Escoras metálicas', d: 'Percebendo a quantidade de escoras sucateadas pelo mau uso nos canteiros, a Mezzoplast desenvolveu maquinário para desamassar e desempenar esse equipamento, renovando sua vida útil.', pares: ['escora-1', 'escora-2', 'escora-3'] },
  { t: 'Abraçadeiras', d: 'Limpeza e recuperação de abraçadeiras diversas.', pares: ['abracadeira-1', 'abracadeira-2'] },
  { t: 'Barras de ancoragem, vigas e alinhadores', d: 'Barras desempenadas e vigas limpas, prontas para voltar à obra.', pares: ['barra-1', 'viga-1', 'viga-2'] },
  { t: 'Andaimes e acessórios', d: 'Quadros e peças de andaime recuperados.', pares: ['andaime-1', 'andaime-2'] },
  { t: 'Formas para concretagem (alumínio e aço)', d: 'Limpeza, conserto, solda, inserção de partes faltantes e fabricação de formas novas sob demanda.', pares: ['forma-1', 'forma-2', 'forma-3'] },
];
const ppTxt = 'Fabricado em PP (polipropileno) de alta qualidade, com excelente resistência mecânica e química e longa vida útil. Suporta águas a até 90 °C. Pode ser fornecido com tratamento químico autoextinguível.';
const resf = [
  { id: 'ga', foto: 'enchimento-ga', tipo: 'Enchimento de contato', t: 'GA · Grade Aletada', d: 'Enchimento tipo grade com aberturas largas e aletadas. Excelente desempenho térmico, acabamento, robustez e durabilidade. Indicado para águas industriais.', dados: [['Placa padrão', '200 × 300 mm'], ['Contracorrente (counterflow)', 'blocos 200 × 300 mm × sob encomenda'], ['Corrente cruzada (crossflow)', 'blocos 300 × 300 mm × sob encomenda'], ['Área de contato', '84,20 m²/m³']], nota: 'O GA é o único enchimento tipo grade do mercado com essa área de contato por m³. Os outros do mesmo tipo não passam de 60 m²/m³: são 50,7% a mais de superfície no mesmo volume, mais troca térmica e mais economia de energia.' },
  { id: 'gc', foto: 'enchimento-gc', tipo: 'Enchimento de contato', t: 'GC · Grade Cruzada', d: 'Enchimento tipo grade trapezoidal com ondas cruzadas em ângulo. Diminui a perda de carga do ar, aumenta a área de contato e redistribui a água entre as camadas. Indicado para águas industriais tratadas, com baixo ou alto teor de sólidos.', dados: [['Placa padrão', '300 × 400 mm'], ['Contracorrente (counterflow)', 'blocos 300 mm × sob encomenda'], ['Corrente cruzada (crossflow)', 'blocos 200 mm × sob encomenda'], ['Área de contato', '55,87 m²/m³']], nota: '' },
  { id: 'egt450', foto: 'eliminador-egt450', tipo: 'Eliminador de gotas', t: 'EGT-450 · triplo estágio', d: 'Eliminador (retentor) de gotas trapezoidal com três estágios: excelente taxa de retenção, baixa perda de carga, robustez e durabilidade. Para torres de tiragem induzida ou forçada.', dados: [['Placa padrão', '145 × 450 mm'], ['Montagem', 'painéis de 150 mm × sob encomenda'], ['Perda por arraste', '≈ 0,01% da vazão de água*']], nota: '' },
  { id: 'egt400', foto: 'eliminador-egt400', tipo: 'Eliminador de gotas', t: 'EGT-400 · duplo estágio', d: 'Eliminador de gotas trapezoidal com dois estágios de retenção e baixíssima perda de carga. Para torres de tiragem induzida ou forçada.', dados: [['Placa padrão', '145 × 400 mm'], ['Montagem', 'painéis de 150 mm × sob encomenda'], ['Perda por arraste', '≈ 0,01% da vazão de água*']], nota: '' },
];
const aplicacoes = ['Torres de resfriamento de água (sistemas evaporativos)', 'Lavadores de gases', 'ETEs (estações de tratamento de esgoto)', 'ETAs (estações de tratamento de água)', 'Percoladores', 'Depuradores', 'Caixas separadoras de óleo e hidrocarbonetos', 'Caixas de decantação', 'Filtros biológicos', 'Cabines de pintura'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'cabides', nome: 'Cabides' }, { slug: 'construcao', nome: 'Construção civil' }, { slug: 'resfriamento', nome: 'Resfriamento' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Três Frentes', b: 'Catálogo Técnico' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Lato:wght@400;700;900&family=Chivo:wght@600;700;800&family=Chivo+Mono:wght@400;500&display=swap';
const cores = { a: '#172740', b: '#10192b' };
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const mail = (assunto = 'Pedido de orçamento pelo site') => `mailto:${E.email}?subject=${encodeURIComponent(assunto)}`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Cabides, construção civil e resfriamento em Alvorada/RS` : `${titulo} | Mezzoplast`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const ICS = {
  cabide: '<svg class="ic-g" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 12a4 4 0 118 0c0 3-4 4-4 7v2"/><path d="M24 21L5 33c-1.6 1-1 3 1 3h36c2 0 2.6-2 1-3z"/></svg>',
  obra: '<svg class="ic-g" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 42V14M40 42V14M8 18h32M8 30h32M8 18l32 12M40 18L8 30"/><path d="M4 42h40"/></svg>',
  torre: '<svg class="ic-g" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 42l4-26h16l4 26z"/><path d="M14 30h20M15 23h18"/><path d="M18 10c0-3 3-4 6-4s6 1 6 4"/><path d="M20 6V3M28 6V3"/></svg>',
};
const LOGO_A = `<img class="logo" src="/assets/img/logo-azul.webp" alt="Mezzoplast" width="776" height="88">`;
const LOGO_B = `<img class="logo" src="/assets/img/logo-branco.webp" alt="Mezzoplast" width="776" height="88">`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Pedido de orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Assunto<select name="assunto">${frentes.map(f => `<option>${f.t}</option>`).join('')}<option>Outro assunto</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Modelo de cabide e quantidade, equipamentos para recuperar, ou medidas da torre."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${E.email}. Prefere ligar? ${E.fone1}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Mezzoplast" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Caetano Dihl, 496, Alvorada RS')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mezzoplast, página inicial">${v === 'a' ? LOGO_A : LOGO_B}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Solicite um orçamento</a>
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
    <div class="rod-marca">${LOGO_B}<p>Manufaturados plásticos e serviços desde 1982. Atendemos todo o Brasil e alguns países da América do Sul.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mezzoplast. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cabideCard = (c, grupo) => {
  const n = c[0], f = comFoto.has(n);
  return `<article class="cabide sobe" id="modelo-${n}">${f ? `<a class="cabide-foto" href="/assets/img/cabide-${n}${comPersp.has(n) ? '-p' : ''}.webp" data-foto data-legenda="Modelo ${n}">${img(`cabide-${n}`, `Cabide modelo ${n}`)}</a>` : `<div class="cabide-foto sem">${ICS.cabide}<span>Foto sob consulta</span></div>`}
  <div class="cabide-txt"><h3>Modelo ${n}</h3><dl><div><dt>Comprimento</dt><dd>${c[1]} cm</dd></div><div><dt>Altura</dt><dd>${c[2]} cm</dd></div><div><dt>${c[3] === 'o' ? 'Largura do ombro' : 'Espessura'}</dt><dd>${c[4]}</dd></div></dl><a class="link-seta" href="${mail(`Orçamento: cabide ${grupo} modelo ${n}`)}">Pedir orçamento ${ic('seta')}</a></div></article>`;
};
const par = p => `<figure class="par sobe"><div><span class="tag antes">Antes</span>${img(`${p}-antes`, 'Equipamento antes da recuperação')}</div><div><span class="tag depois">Depois</span>${img(`${p}-depois`, 'Equipamento depois da recuperação')}</div></figure>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', sobre[0]) + topo(v, 'empresa') + cab('Empresa', 'Desde 1982 produzindo em plástico, hoje em Alvorada/RS.', 'cabides-arara') + `
<div class="in">
<section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p>Hoje a indústria conta com 31 colaboradores, trabalha em três turnos diários e processa em média 30 toneladas de material plástico por mês. Atendemos todo o Brasil e alguns países da América do Sul.</p></div>
<div class="numeros">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="frentes-pag">${frentes.map(f => `<a class="frente f-${f.cor} sobe" href="${link(v, f.id)}">${ICS[f.icone]}<h2>${f.t}</h2><p>${f.d}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</section>
</div>
` + rodape(v);

  pag.cabides = head(v, 'cabides', 'Cabides para vestuário', 'Cabides plásticos anatômicos e outros modelos para a indústria do vestuário, com medidas e personalização com logotipo.') + topo(v, 'cabides') + cab('Indústria de vestuário', 'Modelos de cabides plásticos para cada tipo de roupa.', 'cabides-arara') + `
<div class="in">
<section class="intro-pag"><p class="lead">A Mezzoplast desenvolveu ao longo do tempo diversos modelos de cabides plásticos, apropriados para os mais diversos segmentos da indústria do vestuário.</p><nav class="filtros" aria-label="Grupos"><a href="#anatomicos">Cabides anatômicos (${anatomicos.length})</a><a href="#outros">Outros modelos (${outros.length})</a><a href="#personalizacao">Personalização</a></nav></section>
<section id="anatomicos" class="grupo-cab"><h2>Cabides anatômicos</h2><div class="cabides">${anatomicos.map(c => cabideCard(c, 'anatômico')).join('')}</div></section>
<section id="outros" class="grupo-cab"><h2>Outros modelos</h2><div class="cabides">${outros.map(c => cabideCard(c, '')).join('')}</div></section>
<section id="personalizacao" class="perso"><figure>${img('cabide-personalizado', 'Cabide personalizado com o logotipo do cliente')}</figure><div><p class="k">Personalização</p><h2>Cabides com a sua marca</h2><p>A personalização dos cabides é uma ajuda comprovada nas vendas: tem ótimo efeito visual e agrega valor à peça. Depois de levar o cabide para casa, o cliente final leva junto a lembrança constante da marca.</p><p>A Mezzoplast personaliza os seus cabides com o seu logotipo.</p><a class="btn" href="${mail('Orçamento: cabides personalizados')}">${ic('mail')}Pedir orçamento</a></div></section>
</div>
` + rodape(v);

  pag.construcao = head(v, 'construcao', 'Construção civil', 'Conserto, manutenção e limpeza de escoramento metálico, formas, andaimes e acessórios de obra, com maquinário próprio. Custo de cerca de 20% do valor de peças novas.') + topo(v, 'construcao') + cab('Construção civil', 'Conserto, manutenção e limpeza de escoramento metálico, formas, andaimes e acessórios.', 'escoramento') + `
<div class="in">
<section class="intro-pag destaque-20"><div><p class="lead">O serviço de manutenção feito pela Mezzoplast gera economia real: equipamentos que iriam para a sucata voltam para a obra.</p></div><div class="vinte"><b>~20%</b><span>é o custo aproximado da manutenção, em relação ao valor das peças novas de fábrica</span></div></section>
<section class="vantagens"><h2>Vantagens do sistema mecanizado da Mezzoplast</h2><div class="vant-grade">${vantagens.map((x, i) => `<div class="sobe"><span class="num">0${i + 1}</span><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}</div></section>
${grupos.map(g => `<section class="grupo-obra"><header><h2>${g.t}</h2><p>${g.d}</p></header><div class="pares">${g.pares.map(par).join('')}</div></section>`).join('\n')}
<section class="cta-faixa"><h2>Tem equipamento parado no canteiro?</h2><p>Conte o que precisa recuperar e a quantidade.</p><p class="bts"><a class="btn" href="${mail('Orçamento: manutenção de equipamentos de obra')}">${ic('mail')}Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></section>
</div>
` + rodape(v);

  pag.resfriamento = head(v, 'resfriamento', 'Resfriamento e filtragem', 'Enchimentos de contato GA e GC e eliminadores de gotas EGT-450 e EGT-400 em polipropileno para torres de resfriamento, lavadores de gases, ETEs e ETAs.') + topo(v, 'resfriamento') + cab('Resfriamento e filtragem', 'Enchimentos de contato e eliminadores de gotas em polipropileno.', 'torres') + `
<div class="in">
<section class="intro-pag"><p class="lead">Para atender as mais diversas necessidades do mercado, a Mezzoplast tem dois modelos de enchimento de contato e dois modelos de eliminador de gotas.</p><nav class="filtros" aria-label="Modelos">${resf.map(r => `<a href="#${r.id}">${r.t.split(' · ')[0]}</a>`).join('')}</nav></section>
${resf.map(r => `<section class="produto-r sobe" id="${r.id}"><figure>${img(r.foto, r.t)}</figure><div><p class="k">${r.tipo}</p><h2>${r.t}</h2><p>${r.d}</p><p class="material"><b>Material.</b> ${ppTxt}</p><p class="material"><b>Manutenção.</b> ${r.id.startsWith('egt') ? 'As placas se encaixam por pinos na própria placa: montagem e manuseio fáceis. Permite limpeza periódica por hidrojateamento.' : 'A resistência mecânica permite limpeza periódica por hidrojateamento, o que aumenta bastante a vida útil.'}</p><dl class="dados">${r.dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>${r.nota ? `<p class="nota">${r.nota}</p>` : ''}</div></section>`).join('\n')}
<p class="rodape-nota">* Considerando velocidade média do ar de 3 m/s e distribuição por gravidade.</p>
<section class="sobre-ench"><div><h2>Como funciona o enchimento de contato</h2><p>O enchimento preenche o interior das torres de resfriamento e de outros equipamentos que recebem a água quente dos circuitos de fábricas, prédios e centros comerciais. A água aquecida cai sobre o enchimento, que "quebra" as gotas; o ar forçado pelo ventilador retira o calor, e a água cai resfriada logo abaixo, de volta ao circuito.</p><p>O enchimento de grade injetada em polipropileno é uma solução brasileira que vem ganhando espaço em outros países.</p></div><div><h2>Principais aplicações</h2>${lista(aplicacoes)}</div></section>
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Mezzoplast: ${E.rua}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Quer conhecer mais sobre o nosso trabalho? Fale com a gente.', 'cabide-ganchos') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Solicite um orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('cabides-arara', 'Cabides Mezzoplast pendurados na arara', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Desde 1982 · Alvorada/RS</p><h1><span>Quem disse que</span> só as roupas devem ter estilo?</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicite um orçamento</a><a class="btn btn-linha" href="${link(v, 'cabides')}">Ver cabides</a></p></div></section>
<section class="in frentes-a">${frentes.map(f => `<a class="frente f-${f.cor} sobe" href="${link(v, f.id)}">${ICS[f.icone]}<h2>${f.t}</h2><p>${f.d}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a>`).join('')}</section>
<section class="in desde-a"><div><h2>Desde 1982 produzindo</h2><span class="traco" aria-hidden="true"></span></div><div><p class="lead">${sobre[0]}</p><p>${sobre[2]}</p><div class="numeros">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div><a class="link-seta" href="${link(v, 'empresa')}">Nossa história ${ic('seta')}</a></div></section>
<section class="vitrine-a"><div class="in"><header class="tit"><p class="k">Indústria de vestuário</p><h2>${anatomicos.length + outros.length} modelos de cabides</h2></header><div class="trilho">${['16', '43', '69', '10', '60', '08'].map(n => `<a href="${link(v, 'cabides')}#modelo-${n}">${img(`cabide-${n}`, `Cabide modelo ${n}`)}<span>Modelo ${n}</span></a>`).join('')}</div><a class="link-seta" href="${link(v, 'cabides')}">Todos os modelos e medidas ${ic('seta')}</a></div></section>
<section class="in obra-a"><div><p class="k">Construção civil</p><h2>Escoras que iam para a sucata voltam para a obra</h2><p>${grupos[0].d}</p><p>Em geral, a manutenção custa cerca de <b>20% do valor das peças novas</b>.</p><a class="link-seta" href="${link(v, 'construcao')}">Ver antes e depois ${ic('seta')}</a></div>${par('escora-1')}</section>
<section class="resf-a"><div class="in resf-in"><div><p class="k">Resfriamento e filtragem</p><h2>Enchimento GA: 84,20 m² de contato por m³</h2><p>${resf[0].nota}</p><a class="link-seta" href="${link(v, 'resfriamento')}">Enchimentos e eliminadores ${ic('seta')}</a></div><figure>${img('enchimento-ga', 'Enchimento de contato GA')}</figure></div></section>
<section class="cta-a"><div class="in"><div><h2>Fale com a gente!</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}</p></div><p class="bts"><a class="btn" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Enviar mensagem</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">Mezzoplast · desde 1982</p><h1>Cabides, recuperação de equipamentos de obra e componentes para torres de resfriamento.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicite um orçamento</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></div>
<div class="hero-b-grade">${frentes.map(f => `<a class="hb f-${f.cor}" href="${link(v, f.id)}">${img(f.foto, f.t, ' loading="eager"')}<span>${f.t}${ic('seta')}</span></a>`).join('')}</div></div></section>
<section class="num-b"><div class="in">${numeros.map(n => `<div><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in tabela-b"><header class="tit-b"><p class="k">Indústria de vestuário</p><h2>Cabides anatômicos: medidas</h2></header><div class="tabela-rola"><table><thead><tr><th>Modelo</th><th>Comprimento</th><th>Altura</th><th>Espessura / ombro</th></tr></thead><tbody>${anatomicos.slice(0, 8).map(c => `<tr><td><a href="${link(v, 'cabides')}#modelo-${c[0]}">${c[0]}</a></td><td>${c[1]} cm</td><td>${c[2]} cm</td><td>${c[4]}</td></tr>`).join('')}</tbody></table></div><a class="link-seta" href="${link(v, 'cabides')}">Ver os ${anatomicos.length + outros.length} modelos com fotos ${ic('seta')}</a></section>
<section class="resf-b"><div class="in"><header class="tit-b"><p class="k">Resfriamento e filtragem</p><h2>Enchimentos e eliminadores de gotas</h2></header><div class="resf-grade">${resf.map(r => `<a class="sobe" href="${link(v, 'resfriamento')}#${r.id}"><figure>${img(r.foto, r.t)}</figure><p class="k">${r.tipo}</p><h3>${r.t}</h3><p>${r.dados[r.dados.length - 1][0]}: <b>${r.dados[r.dados.length - 1][1].replace('*', '')}</b></p></a>`).join('')}</div></div></section>
<section class="in obra-b"><header class="tit-b"><p class="k">Construção civil</p><h2>Antes e depois da manutenção</h2></header><div class="pares">${['escora-1', 'forma-1', 'viga-1'].map(par).join('')}</div><a class="link-seta" href="${link(v, 'construcao')}">Todos os serviços para obras ${ic('seta')}</a></section>
<section class="cta-b"><div class="in"><h2>Quer conhecer mais sobre o nosso trabalho? Tirar dúvidas?</h2><p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('mail')}Fale com a gente</a><a class="btn btn-linha" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Mezzoplast', artigo: 'da', url: E.url, lang: 'pt', cor: '#172740', fundo: '#10192b', claro: '#f4f5f8',
  fonteTitulo: 'Outfit,system-ui,sans-serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o azul-marinho e o amarelo da marca e as três cores das frentes de trabalho: cabides, construção civil e resfriamento.', pontos: ['"Quem disse que só as roupas devem ter estilo?"', '24 modelos de cabide com medidas', 'Antes e depois das escoras recuperadas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em formato de catálogo técnico: tabela de medidas dos cabides, dados dos enchimentos e eliminadores e antes e depois na página inicial.', pontos: ['Tabela de medidas dos cabides', 'Fichas dos enchimentos GA e GC e eliminadores EGT', 'Uma página para cada frente'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
