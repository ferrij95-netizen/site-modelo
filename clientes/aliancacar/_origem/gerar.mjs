// Aliança Car (funilaria, pintura e estética automotiva, Vila Formosa e Vila Carrão, Zona Leste de SP). Gera public/{a,b}/ e a página de escolha.
// node clientes/aliancacar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs aliancacar https://funilariaaliancacar.com.br/)
// Textos, serviços, números, endereços, seguradoras, vídeos e fotos tirados do site atual (funilariaaliancacar.com.br).
// Selo redesenhado em vetor (selo.svg) a partir de assets/images/logotipo.png (140x133); o nome foi reescrito em Marcellus SC.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Aliança Car', url: 'https://aliancacar.overtus.com.br/', antigo: 'https://funilariaaliancacar.com.br/',
  wa: '5511943552825', cel: '(11) 94355-2825', fone: '(11) 2676-3141', email: 'contato@funilariaaliancacar.com.br',
  insta: 'https://www.instagram.com/alianca.car/', yt: 'https://www.youtube.com/results?search_query=funilaria+aliancacar',
  curto: 'Funilaria, pintura e estética automotiva na Vila Formosa e na Vila Carrão, Zona Leste de São Paulo: martelinho de ouro, vitrificação, cristalização, polimento e higienização interna. Nacionais e importados.',
};
const unidades = [
  { id: 'formosa', nome: 'Vila Formosa', rua: 'Rua Dr. Eduardo Cotching, 1037', bairro: 'Vila Formosa · CEP 03356-000', mapa: 'Rua Dr. Eduardo Cotching, 1037, Vila Formosa, São Paulo - SP' },
  { id: 'carrao', nome: 'Vila Carrão', rua: 'Rua Antonio de Barros, 2720', bairro: 'Vila Carrão · CEP 03401-001', mapa: 'Rua Antonio de Barros, 2720, Vila Carrão, São Paulo - SP' },
];
const sobre = [
  'A Aliança Car é uma empresa do ramo automotivo que oferece há mais de 15 anos serviços de funilaria, pintura e estética automotiva na Zona Leste de São Paulo, para carros nacionais e importados.',
  'Atendemos proprietários de veículos da Vila Formosa, Vila Carrão, Tatuapé, Mooca, Vila Prudente, Penha de França, Cambuci, Brás e de toda a região.',
  'Somos especialistas na arte do martelinho de ouro e trabalhamos com profissionais qualificados e treinados, que executam também a estética automotiva: vitrificação, cristalização, polimentos e higienização interna.',
  'Usamos produtos importados de alta qualidade, com preço justo e sem onerar o cliente. Temos cabine própria de pintura.',
];
const servicos = [
  { id: 'funilaria', t: 'Funilaria e pintura', c: 'Cabine própria de pintura, para nacionais e importados.', f: 'ad-12', d: [
    'Temos cabine própria para os serviços de funilaria e pintura, com equipamentos e ferramentas de alta tecnologia e profissionais treinados, com certificados e muitos anos de experiência no segmento automotivo.',
    'Na funilaria não há necessidade de substituir as peças do veículo, o que preserva a originalidade do carro. A peça só é trocada por uma nova quando foi destruída na colisão e não há como reparar.'],
    lista: { t: 'O que entra na funilaria', i: ['Colisões simples ou complexas', 'Amassados que danificaram a pintura', 'Arranhões e micropintura', 'Recuperação de para-choques e plásticos', 'Recuperação de faróis', 'Pintura de para-choques'] } },
  { id: 'martelinho', t: 'Martelinho de ouro', c: 'Até 60% de economia em relação à funilaria convencional.', f: 'ad-9', d: [
    'A técnica conserta amassados na lataria sem usar tinta, quando a pintura não foi comprometida. Nenhuma peça é substituída, e o carro mantém a originalidade.',
    'Dependendo do caso, o martelinho sai até 60% mais barato que a funilaria convencional. Só o profissional consegue dizer se o reparo pode ser feito assim: traga o carro para um orçamento.',
    'O martelinho nasceu nas montadoras, há mais de 50 anos, para corrigir amassados durante a fabricação sem repintar a peça.'],
    lista: { t: 'Onde o martelinho resolve', i: ['Amassados que não danificaram a pintura', 'Recuperação de para-choques', 'Recuperação de partes plásticas', 'Outros pontos, após avaliação'] } },
  { id: 'vitrificacao', t: 'Vitrificação de pintura', c: 'Proteção de 3 ou 5 anos, à escolha do cliente.', f: 'ad-7', d: [
    'A vitrificação cria uma camada super protetora na pintura, que pode durar 3 ou 5 anos, conforme a opção do cliente. Segundo o Cesar, proprietário da Aliança Car, é a melhor forma de fazer a pintura durar muito mais.',
    'Depois de vitrificada, a pintura fica até seis vezes mais protegida contra sol, riscos, chuva e fezes de pássaros, principalmente em carros que não ficam na garagem. O brilho realçado também valoriza o carro na hora da venda.'],
    lista: { t: 'As etapas do serviço', i: ['Lavagem do veículo', 'Descontaminação', 'Inspeção', 'Mascaramento', 'Corte', 'Lustração', 'Preparo', 'Proteção'], num: true } },
  { id: 'cristalizacao', t: 'Cristalização de pintura', c: 'Resina que protege e realça o brilho de fábrica.', f: 'ad-3', d: [
    'A cristalização não serve para corrigir a pintura: o objetivo é dar mais vida e proteção a ela, deixando o carro mais brilhante. É uma técnica preventiva.',
    'Aplicamos uma resina especial sobre a pintura, que funciona como proteção química e diminui a chance de manchas e riscos. É um processo mais complexo que o polimento e pede um profissional.'] },
  { id: 'polimento', t: 'Polimento de pintura', c: 'Para queima de sol, aparência fosca e riscos superficiais.', f: 'ad-5', d: [
    'O polimento revitaliza a pintura quando ela apresenta manchas, queima do sol, embaçamento ou riscos superficiais. Pode ser feito pelo menos uma vez por ano.',
    'Com politriz e pasta abrasiva aplicadas de maneira uniforme, a lataria fica com brilho por igual. Carro com boa aparência costuma ser vendido mais rápido.'] },
  { id: 'higienizacao', t: 'Higienização interna', c: 'Elimina fungos, bactérias e odores.', f: 'ad-13', d: [
    'A higienização interna elimina bactérias, fungos e o mau cheiro, que fazem mal à saúde. O carro fica com ótima aparência e cheirinho de carro novo. Usamos produtos importados de fornecedores consagrados.',
    'O ideal é higienizar a cada 6 meses e trocar o filtro do ar-condicionado no mesmo intervalo. Dica: evitar comer, beber e fumar dentro do carro deixa as limpezas menos frequentes.'],
    lista: { t: 'Vantagens', i: ['Protege a saúde dos ocupantes', 'Preserva a qualidade dos bancos', 'Limpa cantos e lugares inacessíveis', 'Mantém o veículo valorizado', 'Conforto e bem-estar'] } },
];
const vantagens = [
  ['usuarios', 'Profissionais com muitos anos de experiência'],
  ['gota', 'Seu carro volta limpo e lavado'],
  ['check', 'Orçamentos gratuitos'],
  ['escudo', 'Garantia por escrito em todos os serviços'],
  ['chave', 'Serviços não terceirizados'],
  ['carro', 'Serviço de leva e traz'],
];
const tres = [
  ['Profissionais experientes', 'Profissionais cordiais, com muitos anos de experiência e certificados de aperfeiçoamento no segmento automotivo.'],
  ['Garantia nos serviços', 'Todo carro sai da oficina limpo e lavado, com garantia por escrito para a sua segurança e satisfação.'],
  ['Produtos importados', 'Produtos importados de alta qualidade, de fornecedores consagrados no segmento automotivo, que oferecem durabilidade e segurança.'],
];
const numeros = [['5980', 'funilaria e pintura'], ['1020', 'martelinho de ouro'], ['1240', 'estética externa em geral'], ['475', 'higienizações internas']];
const seguradoras = ['Porto Seguro', 'Itaú Seguros', 'Azul Seguros', 'Marítima', 'HDI', 'SulAmérica', 'Sura', 'Yasuda', 'Sompo'];
const valores = ['Excelência em serviços', 'Cumprimento de prazo', 'Espírito de equipe', 'Respeito à pessoa do cliente', 'Preço justo'];
const sust = [
  ['Preservação do meio ambiente', 'Descarte correto das embalagens vazias, reutilização, armazenamento e reciclagem de tintas, fluidos, pneus, lixas e peças danificadas.'],
  ['Lavagem das pistolas de pintura', 'O sistema de lavagem das pistolas reaproveita água de outros setores e da chuva, economizando água tratada.'],
  ['Baias separadoras de sucata', 'Latas, peças, plásticos, metais, vidro e borracha retirados dos carros vão para o lugar certo, o que facilita a coleta seletiva.'],
  ['Coleta seletiva', 'As peças removidas dos veículos sinistrados seguem para empresas de reciclagem credenciadas, que dão o destino correto ao material.'],
];
const regioes = ['Vila Formosa', 'Vila Carrão', 'Tatuapé', 'Mooca', 'Vila Prudente', 'Penha de França', 'Cambuci', 'Aclimação', 'Brás', 'Centro'];
const videos = [['TF-j8ueFbHM', 'Porsche Cayenne'], ['R4TvdRxmApY', 'Land Rover Discovery 2022'], ['JvybzTNb01U', 'Mercedes GLA 200'], ['Y9rnv3HyIDc', 'Nissan Versa 2021']];
const fotos = {
  'ad-3': 'Antes e depois: capô preto de um Chevrolet, com a pintura recuperada', 'ad-5': 'Antes e depois: para-lama de carro escuro', 'ad-6': 'Antes e depois: lateral traseira prata',
  'ad-7': 'Antes e depois: reflexo das luzes na pintura preta', 'ad-9': 'Antes e depois: martelinho de ouro na lateral de um carro vermelho', 'ad-12': 'Antes e depois: lateral de carro preto',
  'ad-1': 'Frente de um Honda prata entregue pela Aliança Car', 'ad-2': 'Porta de SUV branco entregue pela Aliança Car', 'ad-4': 'Frente de um Renault branco entregue pela Aliança Car',
  'ad-10': 'Frente de um Honda HR-V prata depois do serviço', 'ad-11': 'Traseira de um Honda HR-V cinza depois do serviço', 'ad-13': 'Traseira de um Volkswagen Jetta branco na oficina',
  'ad-14': 'Para-choque prata depois do reparo', 'ad-15': 'Chevrolet Cruze branco depois do serviço',
  oficina: 'Salão da Aliança Car com uma Land Rover Discovery, um Audi Q5 e funileiros trabalhando', 'oficina-2': 'Outra vista da oficina, com BMW branca, Mercedes preta e a faixa da funilaria', 'oficina-3': 'Carros no salão da Aliança Car',
};
const antesDepois = ['ad-9', 'ad-3', 'ad-7', 'ad-5', 'ad-12', 'ad-6'];
const entregues = ['ad-1', 'ad-2', 'ad-4', 'ad-10', 'ad-11', 'ad-13', 'ad-14', 'ad-15'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'portfolio', nome: 'Antes e depois' }, { slug: 'contato', nome: 'Endereços e orçamento' }];
export const nomesVersao = { a: 'Selo', b: 'Faixa preta' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Marcellus+SC&family=Libre+Franklin:wght@400;500;600;700&family=Gabarito:wght@600;700;800;900&family=Rethink+Sans:wght@400;500;600;700&display=swap';
const img = (n, a = fotos[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#ff6600', b: '#111111' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Aliança Car | Funilaria, pintura e martelinho de ouro na Zona Leste de SP' : `${titulo} | Aliança Car`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const wa = (msg = 'Olá! Vim pelo site da Aliança Car e gostaria de fazer um orçamento.') => waHref(E.wa, msg);
const n2 = i => String(i + 1).padStart(2, '0');
const mil = n => Number(n).toLocaleString('pt-BR');
const estrelas = `<span class="estrelas" aria-hidden="true">${ic('estrela')}${ic('estrela')}${ic('estrela')}</span>`;

const formulario = () => `<form class="form" data-wa="Olá! Quero um orçamento na Aliança Car.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro" placeholder="Ex.: Jeep Compass 2020"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Franquia de seguro</option><option>Outro assunto</option></select></label></div>
  <label>Unidade<select name="unidade">${unidades.map(u => `<option>${u.nome} (${u.rua})</option>`).join('')}<option>Tanto faz</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required placeholder="Conte o que aconteceu com o carro. Na conversa você pode mandar as fotos."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da Aliança Car, ${E.cel}, com a mensagem pronta.</p>
</form>`;
const mapa = u => `<iframe class="mapa" title="Mapa da unidade ${u.nome}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(u.mapa)}&z=16&output=embed"></iframe>`;
const unidadeCard = (u, i) => `<article class="unidade sobe"><p class="k">Unidade ${i + 1}</p><h3>${u.nome}</h3><p>${u.rua}<br>${u.bairro}<br>São Paulo - SP</p><a class="link-seta" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(u.mapa)}" target="_blank" rel="noopener">Abrir no mapa ${ic('seta')}</a></article>`;
const fones = () => `<ul class="fones"><li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></div></li><li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">@alianca.car</a></div></li></ul>`;
const fotoGal = n => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}">${img(n)}</a>`;
const videoCard = ([id, t]) => `<a class="video sobe" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><figure>${img(`video-${id}`, `Vídeo do serviço no ${t}`)}<span class="play">${ic('yt')}</span></figure><span>${t}</span></a>`;
const segLista = () => `<ul class="seg-lista">${seguradoras.map(s => `<li>${s}</li>`).join('')}</ul>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-fino"><div class="in"><span>Vila Formosa · Vila Carrão · Zona Leste de SP</span><span><a href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a><a href="${wa()}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></span></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Aliança Car, página inicial"><img src="/assets/selo.webp" alt="" width="480" height="443"><span>Aliança Car<small>Funilaria · Pintura · Estética</small></span></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}Orçamento grátis</a>
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
    <div class="rod-marca"><img src="/assets/selo.webp" alt="Aliança Car" width="480" height="443" loading="lazy"><p>Funilaria, pintura e estética automotiva na Zona Leste de São Paulo há mais de 15 anos. Nacionais e importados.</p><p class="rod-pag">Aceitamos cartões de crédito e débito.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Duas unidades</h3><ul class="rod-dados">${unidades.map(u => `<li>${ic('pin')}<span><b>${u.nome}</b><br>${u.rua}</span></li>`).join('')}
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Funilaria e Pintura Aliança Car.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Orçamento sem compromisso</h2><p>Mande as fotos do carro pelo WhatsApp ou passe numa das duas unidades. Todos os orçamentos são gratuitos.</p></div><p class="bts"><a class="btn btn-cta" href="${wa()}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'contato')}">Ver endereços</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A empresa', sobre[0]) + topo(v, 'empresa') + cab('A empresa', 'Cuidamos do seu veículo como se fosse nosso', 'oficina-2') + `
<div class="in"><section class="texto-pag"><div>${sobre.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a></p></div><figure>${img('oficina')}<figcaption>O salão da oficina, com cabine própria de pintura.</figcaption></figure></section>
<section class="mvv"><div class="sobe"><p class="k">Missão</p><p>Superar as expectativas dos clientes e atendê-los com transparência e cordialidade, mostrando sempre nosso comprometimento com o melhor atendimento, responsabilidade e preço justo.</p></div><div class="sobe"><p class="k">Visão</p><p>Ser referência em serviços do segmento automotivo, buscando a qualidade e a satisfação com atualização constante, para que cada reparo fique idêntico ao original de fábrica.</p></div><div class="sobe"><p class="k">Valores</p><ul class="lista-check">${valores.map(t => `<li>${t}</li>`).join('')}</ul></div></section>
<section class="sec-vant"><header class="tit"><p class="k">Benefícios</p><h2>O que vem junto com o serviço</h2></header><ul class="vant">${vantagens.map(([i, t]) => `<li class="sobe">${ic(i)}<span>${t}</span></li>`).join('')}</ul></section>
<section class="sust"><header class="tit"><p class="k">Sustentabilidade</p><h2>Uma oficina que cuida do ambiente</h2><p>Nossa rotina diária para deixar o trabalho mais saudável e reduzir o impacto na natureza.</p></header><ol class="sust-lista">${sust.map(([t, d], i) => `<li class="sobe"><span>${n2(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol></section></div>
` + cta(v) + rodape(v);

  pag.servicos = head(v, 'servicos', 'Serviços', 'Funilaria e pintura, martelinho de ouro, vitrificação, cristalização, polimento e higienização interna na Vila Formosa e Vila Carrão, Zona Leste de SP.') + topo(v, 'servicos') + cab('Serviços', 'Funilaria, pintura e estética, tudo sem terceirizar', 'oficina') + `
<div class="in"><nav class="serv-indice" aria-label="Serviços">${servicos.map((s, i) => `<a href="#${s.id}"><span>${n2(i)}</span>${s.t}</a>`).join('')}</nav>
<section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}<figcaption>${esc(fotos[s.f])}</figcaption></figure><div><span class="n">${n2(i)}</span><h2>${s.t}</h2>${s.d.map(p => `<p>${p}</p>`).join('')}${s.lista ? `<h3>${s.lista.t}</h3><${s.lista.num ? 'ol class="etapas"' : 'ul class="lista-check"'}>${s.lista.i.map(t => `<li>${t}</li>`).join('')}</${s.lista.num ? 'ol' : 'ul'}>` : ''}<a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.t.toLowerCase()} na Aliança Car.`)}" target="_blank" rel="noopener">Orçamento de ${s.t.toLowerCase()} ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="seg-faixa"><div><p class="k">Franquias de seguros</p><h2>Atendemos carros segurados</h2><p>Trabalhamos com franquias das seguradoras abaixo. Fale com a gente para saber como funciona no seu caso.</p></div>${segLista()}</section></div>
` + cta(v) + rodape(v);

  pag.portfolio = head(v, 'portfolio', 'Antes e depois', 'Fotos de antes e depois e vídeos de serviços de funilaria, pintura, martelinho de ouro e estética automotiva feitos pela Aliança Car.') + topo(v, 'portfolio') + cab('Antes e depois', 'Carros que passaram pela Aliança Car', 'ad-9') + `
<div class="in"><p class="lead port-lead">Serviços entregues para clientes da Vila Formosa, Tatuapé, Mooca, Vila Prudente, Cambuci, Brás, Penha e outras regiões. Clique nas fotos para ampliar.</p>
<section class="port-sec"><h2>Antes e depois</h2><div class="galeria galeria-larga">${antesDepois.map(fotoGal).join('')}</div></section>
<section class="port-sec"><h2>Carros entregues</h2><div class="galeria">${entregues.map(fotoGal).join('')}</div></section>
<section class="port-sec"><h2>Vídeos dos serviços</h2><p class="pag-nota">No canal da Aliança Car no YouTube.</p><div class="videos">${videos.map(videoCard).join('')}</div></section></div>
` + cta(v) + rodape(v);

  pag.contato = head(v, 'contato', 'Endereços e orçamento', `Aliança Car: WhatsApp ${E.cel}, telefone ${E.fone}. Unidades na Vila Formosa e na Vila Carrão, Zona Leste de São Paulo.`) + topo(v, 'contato') + cab('Endereços e orçamento', 'Duas unidades na Zona Leste', 'ad-15') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2><p>Funilaria e pintura, martelinho de ouro, vitrificação, cristalização, polimento ou higienização interna. Temos prazer em atendê-lo.</p>${formulario()}</div><div>${fones()}<p class="pag-nota">Aceitamos cartões de crédito e débito.</p></div></section>
<section class="unidades-mapas">${unidades.map((u, i) => `<div>${unidadeCard(u, i)}${mapa(u)}</div>`).join('')}</section>
<p class="pag-nota regioes">Atendemos ${regioes.slice(0, -1).join(', ')} e ${regioes.at(-1)}.</p></div>
` + rodape(v);
}

// A · Selo: papel claro e tinta preta, títulos em capitais com serifa como o nome no selo, o laranja só no disco do selo e nos botões, três estrelas como marcador.
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${estrelas}${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">${estrelas}Zona Leste de São Paulo · há mais de 15 anos</p><h1>Funilaria, pintura e estética automotiva</h1><p>Cabine própria de pintura, especialistas em martelinho de ouro e profissionais treinados para carros nacionais e importados. Duas unidades: Vila Formosa e Vila Carrão.</p><p class="bts"><a class="btn" href="${wa()}" target="_blank" rel="noopener">${icWa()}Orçamento grátis</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
<figure class="hero-a-foto">${img('oficina', fotos.oficina, ' loading="eager" fetchpriority="high"')}<div class="selo-giro" aria-hidden="true"><img src="/assets/selo.webp" alt="" width="480" height="443"></div><figcaption>O salão da oficina</figcaption></figure></div></section>
<section class="fita-a" aria-label="Diferenciais"><div class="in"><ul>${vantagens.map(([i, t]) => `<li>${ic(i)}${t}</li>`).join('')}</ul></div></section>
<section class="in servs-a"><header class="tit tit-lado"><div><p class="k">Serviços</p><h2>Seis serviços, uma só equipe</h2></div><p>Nada é terceirizado: funileiros, pintores e a estética automotiva trabalham dentro da Aliança Car.</p></header><ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${n2(i)}</span><b>${s.t}</b><span class="d">${s.c}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="ad-a"><div class="in ad-a-in"><figure>${img('ad-9')}</figure><div><p class="k">${estrelas}Martelinho de ouro</p><h2>Sem tinta e até 60% mais barato</h2><p>${servicos[1].d[0]}</p><a class="link-seta" href="${link(v, 'portfolio')}">Ver antes e depois ${ic('seta')}</a></div></div></section>
<section class="in tres-a"><header class="tit"><p class="k">Por que a Aliança Car</p><h2>Três compromissos</h2></header><ol>${tres.map(([t, d], i) => `<li class="sobe"><span class="estrela-n">${ic('estrela')}<b>${i + 1}</b></span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></section>
<section class="numeros-a"><div class="in"><header class="tit"><p class="k">Estatísticas de expediente desde 2007</p><h2>Serviços entregues</h2></header><dl>${numeros.map(([n, t]) => `<div class="sobe"><dd>${mil(n)}</dd><dt>${t}</dt></div>`).join('')}</dl></div></section>
<section class="in port-a"><div class="port-a-cab"><header class="tit"><p class="k">Antes e depois</p><h2>Saiu daqui assim</h2></header><a class="link-seta" href="${link(v, 'portfolio')}">Ver todas as fotos e vídeos ${ic('seta')}</a></div><div class="mosaico">${['ad-3', 'ad-10', 'ad-7', 'ad-15', 'ad-12'].map(fotoGal).join('')}</div></section>
<section class="in unidades-a"><header class="tit"><p class="k">Endereços</p><h2>Duas unidades na Zona Leste</h2></header><div class="unidades">${unidades.map(unidadeCard).join('')}<div class="unidade unidade-fone">${fones()}</div></div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// B · Faixa preta: branco com grandes blocos laranja, a faixa preta inclinada do selo atravessando as seções e títulos grotescos pesados em caixa baixa.
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div><div class="faixa-b" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Funilaria · pintura · estética automotiva</p><h1>Cuidamos do seu carro como se fosse nosso.</h1><p>Há mais de 15 anos na Zona Leste de São Paulo, com cabine própria de pintura e duas unidades: Vila Formosa e Vila Carrão.</p><p class="bts"><a class="btn btn-preto" href="${wa('Olá! Quero mandar fotos do meu carro para um orçamento.')}" target="_blank" rel="noopener">${icWa()}Mandar fotos do carro</a><a class="btn btn-linha" href="${link(v, 'portfolio')}">Antes e depois</a></p></div>
<figure class="hero-b-foto">${img('oficina', fotos.oficina, ' loading="eager" fetchpriority="high"')}</figure></div>
<div class="faixa-b faixa-b-hero"><div class="in"><span>Orçamentos gratuitos</span><span>Garantia por escrito</span><span>Leva e traz</span><span>Entregue limpo e lavado</span></div></div></section>
<section class="in ad-b"><header class="tit"><p class="k">Antes e depois</p><h2>O que entra amassado sai assim.</h2></header><div class="ad-b-grade">${antesDepois.slice(0, 4).map(n => `<figure class="sobe">${img(n)}<figcaption>${esc(fotos[n].replace('Antes e depois: ', ''))}</figcaption></figure>`).join('')}</div><a class="link-seta" href="${link(v, 'portfolio')}">Mais fotos e vídeos ${ic('seta')}</a></section>
<section class="servs-b"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Seis serviços, nada terceirizado.</h2></header><ol class="servs-b-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${n2(i)}</span><b>${s.t}</b><span class="d">${s.c}</span><span class="seta">${ic('seta')}</span></a></li>`).join('')}</ol></div></section>
<section class="in mart-b"><div class="mart-b-num"><b>60%</b><span>de economia, no máximo, com o martelinho de ouro em relação à funilaria convencional</span></div><div><h2>Martelinho de ouro: a especialidade da casa</h2><p>${servicos[1].d[0]}</p><p>${servicos[1].d[2]}</p><a class="link-seta" href="${link(v, 'servicos')}#martelinho">Quando dá para usar ${ic('seta')}</a></div></section>
<section class="numeros-b"><div class="in"><p class="k">Estatísticas de expediente desde 2007</p><dl>${numeros.map(([n, t]) => `<div class="sobe"><dd>${mil(n)}</dd><dt>${t}</dt></div>`).join('')}</dl></div></section>
<section class="in videos-b"><header class="tit"><p class="k">No YouTube</p><h2>Veja o serviço sendo entregue</h2></header><div class="videos">${videos.map(videoCard).join('')}</div></section>
<section class="in tres-b">${tres.map(([t, d], i) => `<div class="sobe"><span>${n2(i)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</section>
<section class="in unidades-b"><header class="tit"><p class="k">Endereços</p><h2>Escolha a unidade mais perto</h2></header><div class="unidades">${unidades.map(unidadeCard).join('')}</div>${fones()}</section>
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
  nome: 'Aliança Car', artigo: 'da', url: E.url, lang: 'pt', cor: '#ff6600', fundo: '#111111', claro: '#f3eee5',
  fonteTitulo: '"Marcellus SC",Georgia,serif', fonteTexto: '"Libre Franklin",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em papel creme e tinta preta, com títulos em capitais com serifa como o nome no selo e as três estrelas do logo marcando as seções.', pontos: ['Salão real da oficina na abertura', 'Seis serviços e os números desde 2007', 'As duas unidades lado a lado'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Laranja e branco em blocos grandes, com a faixa preta inclinada do selo atravessando o site e títulos grotescos pesados.', pontos: ['"Cuidamos do seu carro como se fosse nosso"', 'Antes e depois logo no começo', 'Vídeos do canal da Aliança Car'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
