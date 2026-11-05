// VIP Auto Repair (funilaria e pintura, Rua Acuruí 560, Vila Formosa / Tatuapé, Zona Leste de SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/vipautorepair/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs vipautorepair https://vipautorepair.com.br/)
// Textos, serviços, seguradoras, números, depoimentos, contatos e fotos tirados do site atual (vipautorepair.com.br). Logo redesenhado em vetor a partir de images/logotipo.png (270x47).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'VIP Auto Repair', url: 'https://vipautorepair.overtus.com.br/', antigo: 'https://vipautorepair.com.br/',
  fone: '(11) 2671-3303', wa: '551126713303', email: 'vip.autorepair@hotmail.com',
  rua: 'Rua Acuruí, 560', bairro: 'Tatuapé · São Paulo - SP',
  mapa: 'Rua Acuruí, 560, São Paulo - SP',
  insta: 'https://www.instagram.com/vip.autorepair/', face: 'https://www.facebook.com/autorepair.vip',
  curto: 'Funilaria e pintura na Vila Formosa, Zona Leste de São Paulo, desde 2002: martelinho de ouro, vitrificação, cristalização, espelhamento, polimento, higienização e franquias de seguro com até 50% de desconto.',
};
const sobre = [
  'A Vip Auto Repair atua desde 2002 no ramo de funilaria e pintura na Vila Formosa, Zona Leste de São Paulo. Oferece serviços automotivos com resultados e acabamentos originais de montadora.',
  'A oficina tem 1.000 m² de espaço com toda a infraestrutura para atender carros nacionais e importados, desde um arranhão até colisões mais complexas.',
  'Não temos nossos clientes só como clientes, mas como amigos, pelo legado de conquistas ao longo desses anos ao entregar serviços de alta qualidade com profissionais de muitos anos de experiência.',
  'Entregamos o seu veículo com as mesmas características originais de fábrica, para manter a valorização do carro. Se preferir, mande a foto do sinistro no WhatsApp e receba uma estimativa de orçamento.',
];
const servicos = [
  { id: 'funilaria', t: 'Funilaria e pintura', c: 'Lanternagem e pintura com acabamento original de montadora.', f: 'serv-funilaria', d: [
    'Executamos serviços de funilaria e pintura com equipamentos de ponta e profissionais constantemente treinados, com muitos anos de experiência.',
    'Do arranhão à colisão mais complexa, em veículos nacionais e importados. Não usamos peças recondicionadas ou remanufaturadas: só peças genuínas.'], passos: null },
  { id: 'martelinho', t: 'Martelinho de ouro', c: 'Até 60% mais barato que a funilaria convencional, sem tinta.', f: 'serv-martelinho', d: [
    'Em serviços de martelinho de ouro não se usa pintura. É uma técnica com ferramentas e profissionais especialistas, recomendada quando o amassado não comprometeu a pintura do carro.',
    'O profissional não substitui nenhuma peça, preservando a originalidade do carro. Dependendo do amassado, a economia chega a 60% em comparação à funilaria convencional.'],
    lista: { t: 'O que dá para consertar com martelinho', i: ['Amassados que não danificaram a pintura', 'Recuperação de para-choques', 'Recuperação de partes plásticas do veículo', 'Outros pontos, após análise de um profissional da VIP'] } },
  { id: 'vitrificacao', t: 'Vitrificação de pintura', c: 'Camada protetora que dura em média de 3 a 5 anos.', f: 'serv-vitrificacao', d: [
    'A vitrificação cria uma camada super protetora na pintura e dura em média de 3 a 5 anos, conforme o produto que o cliente escolher.',
    'Depois de vitrificada, a pintura fica até seis vezes mais protegida contra o sol, riscos, chuva, fezes de pássaros e outras intempéries, principalmente em carros guardados em garagem descoberta.'],
    lista: { t: 'As etapas do serviço', i: ['Lavagem do veículo', 'Descontaminação', 'Inspeção', 'Mascaramento', 'Corte', 'Lustração', 'Preparo', 'Proteção'], num: true } },
  { id: 'cristalizacao', t: 'Cristalização de pintura', c: 'Resina que realça o brilho e protege a pintura original.', f: 'serv-cristalizacao', d: [
    'É aplicada uma resina especial sobre a pintura para servir de proteção química, diminuindo a chance de manchas, riscos e perda de brilho com o tempo. Usamos produtos importados de alta tecnologia.',
    'A cristalização não corrige a pintura: ela protege e realça. A diferença para o espelhamento é que na cristalização se aplica resina, e no espelhamento, uma camada de verniz.'] },
  { id: 'espelhamento', t: 'Espelhamento de pintura', c: 'Camada extra de verniz para um brilho espelhado.', f: 'serv-espelhamento', d: [
    'Lembra o enceramento, mas aplica uma camada extra de verniz sobre a pintura. O verniz resiste bem mais do que a cera e garante proteção e conservação.',
    'Antes do novo verniz, a pintura passa por nivelamento, limpeza e descontaminação. O resultado é uma pintura mais brilhante, uniforme e lisa, até em carro que acabou de sair da concessionária.'] },
  { id: 'polimento', t: 'Polimento de pintura', c: 'Remove manchas, riscos e queima do sol.', f: 'serv-polimento', d: [
    'O polimento corrige e remove imperfeições da pintura, como a perda do brilho original de fábrica, manchas, arranhões, queima do sol e riscos.',
    'É feito em etapas e com cuidado, para que os abrasivos sejam usados da forma certa. É um serviço muito procurado por quem vai vender o carro.'],
    lista: { t: 'Como é feito', i: ['Politriz rotativa e polidores abrasivos', 'Acabamento na pintura', 'Remoção das manchas', 'Eliminação dos riscos', 'Realce do brilho', 'Reparo de pequenos danos'] } },
  { id: 'higienizacao', t: 'Higienização interna', c: 'Elimina ácaros, bactérias, fungos e odores.', f: 'serv-higienizacao', d: [
    'O interior do carro acumula sujeira invisível: bactérias, fungos, vírus, restos de comida, poeira e poluição. O mofo e os odores também vêm daí.',
    'Usamos produtos importados que garantem uma limpeza segura, eficiente e duradoura. Você sente o cheirinho de carro novo assim que entra.'],
    lista: { t: 'As etapas do serviço', i: ['Pré-lavagem', 'Lavagem com detergente', 'Enxágue', 'Sanitização', 'Higienização'], num: true } },
];
const extras = 'Recuperação de para-choque, farol, sanitização com ozônio, película solar e sensores de estacionamento';
const beneficios = [
  ['escudo', 'Franquias com até 50% de desconto', 'Em parceria com as seguradoras, e ainda parcelamos em 3x sem juros.'],
  ['carro', 'Serviço de leva e traz', 'Buscamos o seu carro e levamos de volta depois do serviço.'],
  ['check', 'Garantia por escrito', 'Prazo e garantia por escrito em todos os serviços.'],
  ['usuarios', 'Sem terceirização', 'Todos os serviços são feitos por profissionais próprios.'],
  ['gota', 'Entregue limpo e lavado', 'O carro volta para você limpo e lavado.'],
  ['chave', 'Só peças genuínas', 'Nada de peças recondicionadas ou remanufaturadas.'],
];
const seguradoras = ['Porto Seguro', 'Azul Seguros', 'Tokio Marine', 'SulAmérica', 'Sompo', 'Bradesco Seguros', 'HDI', 'Yasuda', 'Allianz', 'Mapfre', 'Itaú Seguros', 'Marítima', 'Sura'];
const numeros = [['1789', 'serviços de funilaria e pintura'], ['847', 'serviços de martelinho de ouro'], ['1340', 'serviços de estética externa'], ['642', 'higienizações internas']];
const depo = [
  ['Consertaram meu carro com desconto de 50% na minha franquia. O serviço ficou perfeito e ainda parcelaram. Eu recomendo.', 'Fernando', 'Vila Formosa'],
  ['O serviço de martelinho no meu carro ficou incrível, eu nem acreditava que era possível recuperar.', 'Patricia', 'Tatuapé'],
  ['Meu carro ficou super limpo e perfumado, assim que entrei nele percebi logo a diferença. Eu recomendo este serviço a todos.', 'Mariana', 'Anália Franco'],
  ['Ficou muito bom a cristalização no meu carro, parabéns a toda equipe da VIP. Eu recomendo esta oficina.', 'Toninho', 'Vila Alpina'],
];
const regioes = ['Vila Formosa', 'Tatuapé', 'Anália Franco', 'Mooca', 'Vila Prudente', 'Vila Alpina', 'Penha de França', 'Cambuci', 'Aclimação', 'Brás', 'Centro'];
const galeria = {
  funilaria: { t: 'Funilaria e pintura', f: ['1c', '1d', '1e', '10', '8', '9', '2a', '3a', '4a', '5a', '6a', '7a', '1a'] },
  martelinho: { t: 'Martelinho de ouro', f: ['10', '8', '9', '1a', '2a', '3a', '4a', '5a', '6a', '7a'] },
  vitrificacao: { t: 'Vitrificação', f: ['3a', '4', '5', '6', '1a', '2a', '7'] },
  cristalizacao: { t: 'Cristalização', f: ['2a', '3', '4', '5', '1a'] },
  polimento: { t: 'Polimento e espelhamento', f: ['5', '6', '1a', '2a', '3a'], mais: [['espelhamento', '1']] },
  higienizacao: { t: 'Higienização interna', f: ['3a', '8', '2a', '5', '6', '7', '1a'] },
};
const alt = {
  fachada: 'Fachada da VIP Auto Repair, número 560, com o letreiro e carros na oficina',
  'serv-funilaria': 'BMW preta recuperada na oficina, com a placa da VIP', 'serv-martelinho': 'Hyundai Creta branco depois do martelinho de ouro',
  'serv-vitrificacao': 'Fusca vermelho vitrificado na oficina da VIP', 'serv-cristalizacao': 'Porsche Taycan branco depois da cristalização',
  'serv-espelhamento': 'Lanterna e lataria com brilho espelhado', 'serv-polimento': 'Mercedes preto polido no salão da oficina', 'serv-higienizacao': 'Bancos de couro verdes depois da higienização',
  'g-loja-2a': 'Porsche Taycan branco e Mercedes preto na oficina', 'g-loja-3a': 'Peugeot 207 preto recuperado, com a placa da VIP',
};
for (const [c, g] of Object.entries(galeria)) g.f.forEach((n, i) => { alt[`g-${c}-${n}`] ||= `${g.t}: serviço entregue pela VIP (foto ${i + 1})`; });
alt['g-espelhamento-1'] = 'Espelhamento de pintura: lanterna e lataria com brilho';
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A VIP' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'seguradoras', nome: 'Franquias e seguradoras' }, { slug: 'portfolio', nome: 'Portfólio' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa', b: 'Verniz' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,100..125,500..900;1,100..125,700..900&family=Figtree:wght@400;500;600;700&family=Big+Shoulders+Display:wght@600;700;800;900&family=Albert+Sans:wght@400;500;600;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#fb6800', b: '#141517' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'VIP Auto Repair | Funilaria e pintura na Vila Formosa, Zona Leste de SP' : `${titulo} | VIP Auto Repair`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const wa = (msg = 'Olá! Vim pelo site da VIP Auto Repair.') => waHref(E.wa, msg);
const n2 = i => String(i + 1).padStart(2, '0');

const formulario = () => `<form class="form" data-wa="Olá! Quero falar com a VIP Auto Repair.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Honda Civic 2019"></label><label>Assunto<select name="assunto"><option>Orçamento</option><option>Franquia de seguro</option><option>Agendamento</option>${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Elogios</option><option>Reclamações</option><option>Outro assunto</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" required placeholder="Conte o que aconteceu com o carro. Se puder, mande as fotos do dano na conversa."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da VIP (${E.fone}) com a mensagem pronta. Lá você também pode mandar as fotos do dano.</p>
</form>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa da VIP Auto Repair" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${wa()}" target="_blank" rel="noopener">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro}</span></div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><span><a href="${E.insta}" target="_blank" rel="noopener">Instagram</a> · <a href="${E.face}" target="_blank" rel="noopener">Facebook</a></span></div></li>
</ul>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-faixa"><div class="in"><span>Funilaria e pintura na Vila Formosa · desde 2002</span><span><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.fone}</a></span></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="VIP Auto Repair, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="VIP Auto Repair" width="1110" height="192"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa('Olá! Quero um orçamento na VIP Auto Repair.')}" target="_blank" rel="noopener">${icWa()}Orçamento</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="VIP Auto Repair" width="1110" height="192" loading="lazy"><p>Funilaria, pintura e estética automotiva na Zona Leste de São Paulo desde 2002. Nacionais e importados.</p><p class="rod-pag">Parcelamos nos cartões de crédito.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
      <li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">@vip.autorepair</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} VIP Auto Repair Serviços Automotivos.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const fotoGal = (c, n) => `<a href="/assets/img/g-${c}-${n}.webp" data-foto="${esc(alt[`g-${c}-${n}`])}">${img(`g-${c}-${n}`)}</a>`;
const depoHtml = ([t, n, b]) => `<blockquote class="depo sobe"><p>“${t}”</p><footer><b>${n}</b>, ${b}</footer></blockquote>`;
const benefHtml = () => `<ul class="benef">${beneficios.map(([i, t, d]) => `<li class="sobe">${ic(i)}<div><b>${t}</b><span>${d}</span></div></li>`).join('')}</ul>`;
const segLista = () => `<ul class="seg-lista">${seguradoras.map(s => `<li>${s}</li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Bateu? Fique tranquilo.</h2><p>Mande a foto do dano no WhatsApp e receba uma estimativa de orçamento.</p></div><p class="bts"><a class="btn btn-claro" href="${wa('Olá! Quero mandar a foto do dano para um orçamento.')}" target="_blank" rel="noopener">${icWa()}Mandar foto no WhatsApp</a><a class="btn btn-linha" href="${link(v, 'contato')}">Como chegar</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A VIP', sobre[0]) + topo(v, 'empresa') + cab('A VIP', 'Cuidamos do seu carro como se fosse nosso', 'fachada') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></p></div><figure>${img('fachada')}<figcaption>A entrada da VIP, no número 560 da Rua Acuruí.</figcaption></figure></section>
<section class="mvv"><div class="sobe"><p class="k">Missão</p><p>Restabelecer e devolver às pessoas o sentimento de felicidade e gratidão pelas conquistas que foram aparentemente violadas. Gerar e preservar a confiança e a satisfação daqueles que nos elegem para recuperar seus bens danificados.</p></div><div class="sobe"><p class="k">Visão</p><p>Servir nossos clientes pelo caminho da sinceridade e da honestidade, atuando de forma sincera, amável, inovadora e justa perante a tudo e a todos.</p></div><div class="sobe"><p class="k">Compromisso</p><p>Uma equipe de profissionais qualificados que entrega serviços originais de fábrica com garantia, preço justo, agilidade e cumprimento de prazos.</p></div></section>
<section class="sec-benef"><header class="tit"><p class="k">Benefícios</p><h2>O que vem junto com o serviço</h2></header>${benefHtml()}</section>
<section class="sust"><div class="sust-txt"><p class="k">Sustentabilidade</p><h2>A natureza agradece</h2><p>As peças removidas dos carros sinistrados vão para empresas de reciclagem credenciadas pela prefeitura. As embalagens vazias são descartadas do jeito certo, e a lavagem das pistolas de pintura reaproveita água, inclusive da chuva.</p><p>Metais, vidros, papéis, borrachas e plásticos ficam separados em baias de sucata até a coleta seletiva.</p></div><ul class="sust-lista">${['Coleta seletiva das peças removidas', 'Reaproveitamento de água na lavagem das pistolas', 'Baias separadoras de sucata', 'Descarte correto de latas de tinta e embalagens'].map(t => `<li>${ic('check')}${t}</li>`).join('')}</ul></section></div>
` + cta(v) + rodape(v);

  pag.servicos = head(v, 'servicos', 'Serviços', 'Funilaria e pintura, martelinho de ouro, vitrificação, cristalização, espelhamento, polimento e higienização interna na Vila Formosa, Zona Leste de SP.') + topo(v, 'servicos') + cab('Serviços', 'Da funilaria à estética, tudo feito aqui dentro', 'g-loja-2a') + `
<div class="in"><nav class="serv-indice" aria-label="Serviços">${servicos.map((s, i) => `<a href="#${s.id}"><span>${n2(i)}</span>${s.t}</a>`).join('')}</nav>
<section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">${n2(i)}</span><h2>${s.t}</h2>${s.d.map(p => `<p>${p}</p>`).join('')}${s.lista ? `<h3>${s.lista.t}</h3><${s.lista.num ? 'ol class="etapas"' : 'ul class="lista-check"'}>${s.lista.i.map(t => `<li>${t}</li>`).join('')}</${s.lista.num ? 'ol' : 'ul'}>` : ''}<a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.t.toLowerCase()} na VIP.`)}" target="_blank" rel="noopener">Pedir orçamento de ${s.t.toLowerCase()} ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="aviso"><p>${ic('check')}<span>Também fazemos: ${extras.toLowerCase()}.</span></p><p>${ic('check')}<span>Utilizamos somente peças genuínas, nunca recondicionadas ou remanufaturadas.</span></p></section></div>
` + cta(v) + rodape(v);

  pag.seguradoras = head(v, 'seguradoras', 'Franquias e seguradoras', 'Funilaria credenciada e referenciada das principais seguradoras na Zona Leste de SP, com até 50% de desconto na franquia e parcelamento em 3x sem juros.') + topo(v, 'seguradoras') + cab('Franquias e seguradoras', 'Até 50% de desconto na sua franquia', 'g-funilaria-8') + `
<div class="in"><section class="seg-pag"><div class="seg-txt"><p class="lead">Somos oficina credenciada e referenciada das principais seguradoras. Através dessas parcerias, oferecemos descontos que podem chegar a 50% da franquia, com parcelamento em 3x sem juros.</p><p>A franquia é a parte do conserto que fica por conta do dono do carro quando o sinistro não dá perda total. Por isso faz diferença escolher uma oficina que ajude a pagar menos por ela.</p><p>Ao trazer o seu carro, estudamos o caso de forma personalizada e informamos o desconto real que daremos na sua franquia. Você conta com a garantia por escrito do nosso serviço e também com a da sua seguradora.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero saber o desconto na franquia do meu seguro.')}" target="_blank" rel="noopener">${icWa()}Consultar desconto na franquia</a></p></div>
<aside class="seg-lado"><div class="seg-num"><b>50%</b><span>de desconto na franquia, no máximo</span></div><div class="seg-num"><b>3x</b><span>sem juros no parcelamento</span></div><h2>Seguradoras atendidas</h2>${segLista()}</aside></section>
<section class="seg-passos"><header class="tit"><p class="k">Passo a passo</p><h2>Do sinistro ao carro pronto</h2></header><ol class="passos">${[
    ['Mande as fotos', 'Envie as fotos do dano pelo WhatsApp e receba uma estimativa de orçamento.'],
    ['Traga o carro (ou nós buscamos)', 'Você traz até a Rua Acuruí, ou usa o leva e traz da VIP.'],
    ['Desconto na franquia', 'Informamos o desconto real na sua franquia e as condições de parcelamento.'],
    ['Carro de volta', 'Entregamos com acabamento original de fábrica, limpo, lavado e com garantia por escrito.'],
  ].map(([t, d], i) => `<li class="sobe"><span>${n2(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol></section></div>
` + cta(v) + rodape(v);

  pag.portfolio = head(v, 'portfolio', 'Portfólio', 'Fotos de serviços de funilaria, martelinho de ouro, vitrificação, cristalização, polimento e higienização entregues pela VIP Auto Repair.') + topo(v, 'portfolio') + cab('Portfólio', 'Carros que passaram pela VIP', 'g-vitrificacao-3a') + `
<div class="in"><p class="lead port-lead">Alguns serviços entregues para clientes da Vila Formosa, Tatuapé, Mooca, Vila Prudente, Anália Franco e outras regiões. Clique nas fotos para ampliar.</p>
<nav class="port-indice" aria-label="Categorias">${Object.entries(galeria).map(([c, g]) => `<a href="#${c}">${g.t}</a>`).join('')}</nav>
${Object.entries(galeria).map(([c, g]) => `<section class="port-sec" id="${c}"><h2>${g.t}</h2><div class="galeria">${g.f.map(n => fotoGal(c, n)).join('')}${(g.mais || []).map(([cc, n]) => fotoGal(cc, n)).join('')}</div></section>`).join('')}</div>
` + cta(v) + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `VIP Auto Repair: WhatsApp ${E.fone}, ${E.email}. ${E.rua}, Zona Leste de São Paulo.`) + topo(v, 'contato') + cab('Contato', 'Rua Acuruí, 560, na Zona Leste', 'fachada') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça um orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame()}<p class="pag-nota">Atendemos ${regioes.slice(0, -1).join(', ')} e ${regioes.at(-1)}.</p></div></section></div>
` + rodape(v);
}

// A · Faixa: clara, cinza-azulado do letreiro antigo, a faixa listrada creme do logo como fio condutor e o laranja do VIP só nas ações.
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div><div class="faixa" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Vila Formosa · Zona Leste de SP · desde 2002</p><h1>Funilaria e pintura com acabamento de fábrica.</h1><p>Uma oficina de 1.000 m² com profissionais próprios e acabamento original de montadora, do arranhão à colisão, em carros nacionais e importados.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero um orçamento na VIP Auto Repair.')}" target="_blank" rel="noopener">${icWa()}Orçamento pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
<figure class="hero-a-foto">${img('fachada', alt.fachada, ' loading="eager" fetchpriority="high"')}<figcaption>Rua Acuruí, 560 · 1.000 m² de oficina</figcaption></figure></div>
<div class="faixa faixa-hero"><div class="in"><ul>${beneficios.slice(0, 4).map(([i, t]) => `<li>${ic(i)}${t}</li>`).join('')}</ul></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Tudo o que a lataria e a pintura precisam</h2></header><ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><span class="n">${n2(i)}</span><b>${s.t}</b><span class="d">${s.c}</span>${ic('seta')}</a></li>`).join('')}</ol><p class="servs-a-extra">${extras}.</p></section>
<section class="franq-a"><div class="in franq-a-in"><div class="franq-a-num"><b>50<small>%</small></b><span>de desconto na franquia do seguro, em até 3x sem juros</span></div><div><p class="k">Funilaria de seguradora</p><h2>Credenciada e referenciada das principais seguradoras</h2>${segLista()}<a class="link-seta" href="${link(v, 'seguradoras')}">Como funciona o desconto ${ic('seta')}</a></div></div></section>
<section class="in numeros-a"><header class="tit"><p class="k">Desde 2002</p><h2>Números do expediente</h2></header><dl>${numeros.map(([n, t]) => `<div class="sobe"><dt>${t}</dt><dd>${Number(n).toLocaleString('pt-BR')}</dd></div>`).join('')}</dl></section>
<section class="in port-a"><div class="port-a-cab"><header class="tit"><p class="k">Portfólio</p><h2>Saiu daqui assim</h2></header><a class="link-seta" href="${link(v, 'portfolio')}">Ver o portfólio ${ic('seta')}</a></div><div class="mosaico">${[['funilaria', '1e'], ['cristalizacao', '3'], ['martelinho', '8'], ['higienizacao', '2a'], ['polimento', '6']].map(([c, n]) => fotoGal(c, n)).join('')}</div></section>
<section class="in benef-a"><header class="tit"><p class="k">Por que a VIP</p><h2>Atendimento VIP, preço justo</h2></header>${benefHtml()}</section>
<section class="depos-a"><div class="in"><header class="tit"><p class="k">Clientes</p><h2>Quem passou por aqui</h2></header><div class="depos">${depo.slice(0, 3).map(depoHtml).join('')}</div></div></section>
<section class="in local-a"><div><p class="k">Onde estamos</p><h2>Rua Acuruí, 560</h2>${contatoLista()}<p class="pag-nota">Atendemos toda a Zona Leste: ${regioes.slice(0, 7).join(', ')} e região.</p></div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// B · Verniz: escura como um salão de pintura, tipografia condensada em caixa alta, fotos com brilho e o laranja do VIP só nas ações.
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><figure>${img(foto, '', ' loading="eager"')}</figure><div class="in cab-b-in"><p class="k">VIP / ${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><p class="k">Funilaria e pintura · Vila Formosa · Zona Leste de SP</p><h1>Do arranhão<br>à colisão.</h1><div class="hero-b-pe"><p>Desde 2002 devolvendo carros nacionais e importados com acabamento original de fábrica. Mande a foto do dano e receba uma estimativa pelo WhatsApp.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero mandar a foto do dano para um orçamento.')}" target="_blank" rel="noopener">${icWa()}Mandar foto do dano</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div></div>
<div class="tira-b">${[['funilaria', '1e'], ['cristalizacao', '2a'], ['polimento', '5'], ['vitrificacao', '6']].map(([c, n], i) => `<figure>${img(`g-${c}-${n}`, alt[`g-${c}-${n}`], i ? '' : ' loading="eager" fetchpriority="high"')}</figure>`).join('')}</div></section>
<section class="in servs-b"><div class="servs-b-cab"><p class="k">Serviços</p><h2>Sete serviços, uma oficina</h2><p>Tudo feito por profissionais próprios, sem terceirização, em 1.000 m² de oficina.</p></div><ol class="servs-b-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${n2(i)}</span><b>${s.t}</b><span class="d">${s.c}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="antes-b"><div class="in antes-b-in"><figure>${img('g-martelinho-8', 'Porta amassada antes e depois do martelinho de ouro')}</figure><div><p class="k">Martelinho de ouro</p><h2>Sem tinta. Até 60% mais barato.</h2><p>${servicos[1].d[0]}</p><a class="link-seta" href="${link(v, 'servicos')}#martelinho">Quando dá para usar ${ic('seta')}</a></div></div></section>
<section class="in franq-b"><div class="franq-b-num"><p class="k">Franquia do seguro</p><p class="big">até <b>50%</b> de desconto</p><p>e parcelamento em 3x sem juros, com garantia por escrito da VIP e da sua seguradora.</p><a class="btn" href="${wa('Olá! Quero saber o desconto na franquia do meu seguro.')}" target="_blank" rel="noopener">${icWa()}Consultar minha franquia</a></div><div><h2>Credenciada e referenciada</h2>${segLista()}</div></section>
<section class="in passos-b"><header class="tit"><p class="k">Como funciona</p><h2>Bateu o carro? Quatro passos.</h2></header><ol class="passos">${[
    ['Foto no WhatsApp', 'Mande as fotos do dano e receba uma estimativa.'],
    ['Leva e traz', 'Você traz até a Rua Acuruí ou nós buscamos o carro.'],
    ['Serviço em casa', 'Funileiros e pintores próprios, só peças genuínas.'],
    ['Pronto e lavado', 'Volta limpo, lavado e com garantia por escrito.'],
  ].map(([t, d], i) => `<li class="sobe"><span>${n2(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol></section>
<section class="numeros-b"><div class="in"><dl>${numeros.map(([n, t]) => `<div class="sobe"><dd>${Number(n).toLocaleString('pt-BR')}</dd><dt>${t}</dt></div>`).join('')}</dl><p class="numeros-b-nota">Estatísticas de expediente da VIP desde 2002.</p></div></section>
<section class="in depos-b"><header class="tit"><p class="k">Clientes</p><h2>O que dizem da VIP</h2></header><div class="depos">${depo.map(depoHtml).join('')}</div></section>
<section class="in local-b"><div class="local-b-txt"><p class="k">Endereço</p><h2>Rua Acuruí, 560</h2>${contatoLista()}</div><figure>${img('fachada')}</figure></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comumCss + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'VIP Auto Repair', artigo: 'da', url: E.url, lang: 'pt', cor: '#fb6800', fundo: '#141517', claro: '#eef1f4',
  fonteTitulo: '"Archivo",system-ui,sans-serif', fonteTexto: '"Figtree",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no cinza-azulado do letreiro antigo, com a faixa listrada creme do logo atravessando o site e o laranja do VIP nos botões.', pontos: ['Fachada real da oficina na abertura', '7 serviços e franquia com até 50% de desconto', 'Portfólio com fotos de carros entregues'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura como um salão de pintura, com títulos condensados em caixa alta e fotos de carros com brilho de verniz.', pontos: ['"Do arranhão à colisão"', 'Martelinho de ouro com antes e depois', 'Passo a passo do sinistro em 4 etapas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
