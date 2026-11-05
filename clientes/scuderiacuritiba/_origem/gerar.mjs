// Scuderia Reparação Automotiva (Curitiba/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/scuderiacuritiba/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs scuderiacuritiba https://scuderiacuritiba.com.br/)
// Textos, serviços, catálogo (loja WooCommerce do site, sem os preços), antes e depois, fotos de arquivo e contatos tirados do site atual (© 2019).
// Logo: escudo do favicon do site + nome "SCUDERIA" em versal clássica (Cinzel), como no logo original.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Scuderia Reparação Automotiva', url: 'https://scuderiacuritiba.overtus.com.br/', antigo: 'https://scuderiacuritiba.com.br/',
  fone: '(41) 3277-5664', wa: '554132775664', cels: ['(41) 9979-0796', '(41) 9570-0103'],
  email: 'contato@scuderiacuritiba.com.br',
  rua: 'Rua Carlos de Laet, 3327', bairro: 'Boqueirão · Curitiba - PR', cep: '81650-040',
  mapa: 'Rua Carlos de Laet, 3327, Curitiba - PR, 81650-040',
  curto: 'Centro automotivo em Curitiba especializado em funilaria, pintura, martelinho de ouro, estética automotiva e revisão mecânica de veículos multimarcas. Mais de 30 anos de reparação automotiva.',
};
const servicos = [
  { id: 'funilaria', t: 'Reparação de lataria', k: 'Funilaria e pintura', f: 'funilaria',
    lista: 'Desmontagem mecânica e elétrica, funilaria, preparação, pintura e espelhamento, para pequenos, médios e grandes danos.',
    d: ['Atenção especial em um processo completo de reparação. Através de uma linha de produção padronizada e do profundo conhecimento da nossa equipe, devolvemos ao seu carro as características originais de lataria e pintura.', 'Com cabine e pistolas de última geração, a Scuderia busca em seu veículo a pintura original de fábrica, com perfeição de textura e brilho.'] },
  { id: 'martelinho', t: 'Martelinho de ouro', k: 'Sem pintura', f: 'martelinho',
    d: ['Serviço de reparo rápido sem necessidade de pintura, através de um processo rápido e eficaz em nosso departamento próprio de martelinho.', 'A equipe da Scuderia é especializada também para estes casos, onde são utilizadas ferramentas e técnicas diferenciadas.'] },
  { id: 'restauracao', t: 'Restauração e customização', k: 'Antigos e colecionáveis', f: 'restauracao',
    d: ['Pacotes completos para restauração de carros antigos e colecionáveis.', 'Os veículos restaurados e customizados na Scuderia têm atenção completa, desde a renovação de partes mecânica e elétrica até o detalhamento de lataria e interior.'] },
  { id: 'reparo-rapido', t: 'Pintura e reparação rápida', k: 'Em poucas horas', f: 'reparo-rapido',
    d: ['O reparo perfeito em poucas horas. Preparamos e pintamos pequenos riscos e marcas na pintura com o que há de mais moderno em reparo rápido.', 'Solução para quem busca rapidez e boa relação custo-benefício, sem deixar de lado o padrão aplicado em qualquer processo realizado por nossa equipe.'] },
  { id: 'mecanica', t: 'Revisão mecânica e elétrica', k: 'Para clientes Scuderia', f: 'mecanica',
    lista: 'Mecânica, elétrica automotiva, geometria e alinhamento, balanceamento, cambagem, troca de pneus, troca e revisão de pastilhas, troca de óleo, lubrificantes e filtros.',
    d: ['Como benefício aos clientes da Scuderia, também temos equipe capacitada para revisões mecânica e elétrica. Mantenha seu carro em dia com a nossa equipe.'] },
  { id: 'estetica', t: 'Estética automotiva', k: 'Detalhamento', f: 'estetica',
    lista: 'Lavagem, enceramento, polimento, espelhamento, higienização ecológica interna e do motor, purificação de ar, revitalização de interiores e de couro, cristalização e vitrificação (motor, externa e interna).',
    d: ['Consulte nossos pacotes de estética automotiva, que combinam detalhamento de lataria, higienização interna, externa e de conjunto motriz.', 'Para um resultado de qualidade superior, usamos somente as melhores matérias-primas do mercado.'] },
];
// Catálogo da loja do site atual (categorias e itens), sem os valores de 2020.
const catalogo = [
  { t: 'Funilaria e pintura', f: 'parachoque', g: [
    ['Funilaria e pintura', ['Retoque em meia peça', 'Pintura de peça', 'Pintura de para-choque']],
    ['Funilaria artesanal', ['Martelinho de ouro (um ponto)', 'Martelinho de ouro (dano médio)', 'Chuva de granizo']],
    ['Reparação de rodas', ['Pintura de roda', 'Conserto e pintura de roda', 'Conserto e pintura de roda diamantada']],
    ['Restauração de antigos e colecionáveis', ['Pintura geral', 'Funilaria e pintura geral']],
  ] },
  { t: 'Customização', f: 'farois-fume', g: [
    ['Externa', ['Pintura geral ou troca de cor', 'Pintura de aerofólio', 'Faróis fumê', 'Lanternas fumê', 'Teto black piano', 'Espelho retrovisor e capa', 'Maçanetas', 'Pinças de freio']],
    ['Interna', ['Bancos (dianteiros, traseiros e 7 lugares)', 'Console central', 'Forro da porta', 'Painel de instrumentos e acessórios']],
  ] },
  { t: 'Estética e proteção', f: 'polimento', g: [
    ['Correção de pintura', ['Pintura de micropontos', 'Correção de repintura', 'Espelhamento (polimento detalhado)', 'Polimento técnico', 'Lustro (polimento comercial)']],
    ['Estética externa', ['Revitalização de farol e lanterna', 'Revitalização com projetor ou LED', 'Polimento de farol e lanterna', 'Polimento das rodas', 'Descontaminação dos vidros (chuva ácida)', 'Descontaminação da pintura', 'Lavação técnica']],
    ['Estética interna', ['Limpeza interna', 'Higienização interna detalhada', 'Higienização dos bancos de couro', 'Higienização do motor', 'Higienização do chassi', 'Polimento dos acabamentos internos']],
    ['Proteção', ['Cera cristalizadora', 'Selante de pintura', 'Cristalização da pintura, vidros, faróis e rodas', 'Hidratação de bancos e acabamentos em couro', 'Selante para plásticos e borrachas']],
    ['Proteção cerâmica (vitrificação)', ['Pintura (1 camada, 1 ano de garantia)', 'Para-brisa, vigia e vidros', 'Faróis e lanternas', 'Rodas e pinças', 'Plásticos e borrachas', 'Bancos de couro e acabamentos']],
  ] },
  { t: 'Mecânica e montagem', f: 'motor', g: [
    ['Revisão mecânica', ['Troca de óleo com filtro', 'Troca do filtro de ar', 'Troca das pastilhas de freio', 'Troca do líquido de arrefecimento', 'Diagnóstico com scanner', 'Geometria e alinhamento', 'Carga de gás', 'Recarga de bateria']],
    ['Manutenção de montagem', ['Vistoria de manutenção geral', 'Troca de para-brisa e vigia', 'Troca de farol, lanterna e lâmpadas', 'Regulagem dos faróis', 'Troca de retrovisor ou da lente', 'Instalação de sensor de ré (com ou sem câmera)']],
  ] },
];
const casos = [
  { id: 'ecosport', t: 'Ford EcoSport', antes: ['ecosport-antes-1', 'ecosport-antes-2'], depois: ['ecosport-depois-1', 'ecosport-depois-2'] },
  { id: 'veracruz', t: 'Hyundai Vera Cruz', antes: ['veracruz-antes-1', 'veracruz-antes-2'], depois: ['veracruz-depois-1', 'veracruz-depois-2'] },
  { id: 'jetta', t: 'VW Jetta', antes: ['jetta-antes-1', 'jetta-antes-2'], depois: ['jetta-depois-1', 'jetta-depois-2'] },
];
const seguradoras = ['Allianz', 'Banco do Brasil', 'Liberty', 'Mapfre', 'Tokio Marine', 'Zurich'];
const diferenciais = [
  ['Alta tecnologia', 'Cabine e pistolas de pintura de última geração.'],
  ['Qualidade', 'Busca da pintura original de fábrica, com textura e brilho.'],
  ['Estrutura', 'Linha de produção padronizada e departamento próprio de martelinho.'],
  ['Sustentabilidade', 'Higienização ecológica, interna e do motor.'],
];
const itensOrc = [
  'CNH digitalizada, para anexar no cadastro',
  'Documento do veículo digitalizado',
  'Cinco fotos do veículo mostrando os danos',
  'Se for segurado ou terceiro, o número do sinistro na seguradora',
];
const arquivo = ['historico-01', 'historico-03', 'historico-04', 'historico-06', 'historico-07', 'historico-08', 'historico-09', 'historico-10', 'historico-11', 'historico-12', 'historico-13', 'historico-14'];
const alt = {
  funilaria: 'Pintor aplicando tinta em uma peça na cabine', martelinho: 'Ferramenta de martelinho de ouro na lataria', restauracao: 'BMW laranja depois de pintura geral',
  'reparo-rapido': 'Retoque de pintura em parte de uma peça', mecanica: 'Pinça de freio amarela e disco', estetica: 'Polimento detalhado da pintura',
  parachoque: 'Pintura de para-choque com pistola', 'farois-fume': 'Faróis com pintura fumê', polimento: 'Correção de repintura com lixamento e polimento',
  motor: 'Higienização do motor', 'oficina-placa': 'Carro preto na oficina, com a placa da Scuderia ao fundo', 'interior-placa': 'Interior de couro com o tapete da Scuderia',
  volante: 'Volante e painel depois da vitrificação dos plásticos', rodas: 'Roda diamantada', bancos: 'Pintura de banco de couro', couro: 'Bancos de couro higienizados',
  'farol-polimento': 'Polimento de farol', pincas: 'Pinças de freio pintadas', chassi: 'Higienização do chassi', vitrificacao: 'Vitrificação da pintura', teto: 'Teto pintado em black piano',
  'santafe-depois': 'Hyundai Santa Fé preta depois do reparo na traseira',
};
for (const c of casos) { c.antes.forEach((n, i) => alt[n] = `${c.t} ao chegar na Scuderia, foto ${i + 1}`); c.depois.forEach((n, i) => alt[n] = `${c.t} depois do reparo, foto ${i + 1}`); }
for (const n of arquivo) alt[n] = 'Foto de arquivo da Scuderia';
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'scuderia', nome: 'A Scuderia' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'antes-e-depois', nome: 'Antes e depois' }, { slug: 'orcamento', nome: 'Orçamento' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Arquivo', b: 'Cabine' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#2c3a52', b: '#171c24' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Scuderia Reparação Automotiva | Funilaria, pintura e estética em Curitiba' : `${titulo} | Scuderia Reparação Automotiva`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const wa = (msg = 'Olá! Vim pelo site da Scuderia.') => waHref(E.wa, msg);
const n2 = i => String(i + 1).padStart(2, '0');
const marca = (v, claro = false) => `<a class="marca${claro ? ' marca-clara' : ''}" href="${link(v, 'index')}" aria-label="Scuderia Reparação Automotiva, página inicial"><img src="/assets/escudo.webp" alt="" width="151" height="151"><span><b>Scuderia</b><small>Reparação Automotiva</small></span></a>`;

const formulario = (tipo = 'Particular') => `<form class="form" data-wa="Olá! Quero um orçamento na Scuderia.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (marca, modelo e ano)<input name="carro" placeholder="Ex.: Jetta 2014"></label><label>Orçamento<select name="tipo"><option${tipo === 'Particular' ? ' selected' : ''}>Particular</option><option${tipo === 'Seguradora' ? ' selected' : ''}>Seguradora</option><option>Corretor de seguros</option></select></label></div>
  <label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label>
  <label>O que aconteceu com o carro?<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp com a mensagem pronta para ${E.fone}. As fotos do dano podem ser mandadas na própria conversa.</p>
</form>`;
const mapaFrame = () => `<iframe class="mapa" title="Mapa da Scuderia Reparação Automotiva" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>Telefone e WhatsApp</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('tel')}<div><strong>Celulares</strong><span>${E.cels.join(' · ')}</span></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}<br>${E.bairro} · CEP ${E.cep}</span></div></li>
</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" target="_blank" rel="noopener">${icWa()}${v === 'a' ? E.fone : 'Orçamento'}</a>
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
    <div class="rod-marca">${marca(v, true)}<p>Funilaria, pintura, martelinho de ouro, estética e revisão mecânica de veículos multimarcas. Para seguradoras e serviços particulares.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" target="_blank" rel="noopener">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Scuderia Reparação Automotiva. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const par = (c, i = 0) => `<div class="par"><figure>${img(c.antes[i])}<figcaption>Entrou</figcaption></figure><figure>${img(c.depois[i])}<figcaption>Saiu</figcaption></figure></div>`;
const casoHtml = c => `<article class="caso sobe" id="${c.id}"><h2>${c.t}</h2><div class="caso-grade">
  <div class="caso-col"><p class="caso-k">Como entrou</p><div class="caso-fotos">${c.antes.map(n => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt[n])}">${img(n)}</a>`).join('')}</div></div>
  <div class="caso-col"><p class="caso-k caso-k-ok">Como saiu</p><div class="caso-fotos">${c.depois.map(n => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt[n])}">${img(n)}</a>`).join('')}</div></div>
</div></article>`;
const catalogoHtml = () => `<div class="catalogo">${catalogo.map((c, i) => `<section class="cat sobe" id="cat-${i + 1}"><header class="cat-cab"><figure>${img(c.f)}</figure><div><span class="cat-n">${n2(i)}</span><h3>${c.t}</h3></div></header><div class="cat-grupos">${c.g.map(([t, l]) => `<div class="cat-g"><h4>${t}</h4><ul>${l.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></section>`).join('')}</div>`;
const arquivoGrade = (lista = arquivo) => `<div class="arquivo">${lista.map(n => `<a href="/assets/img/${n}.webp" data-foto="Arquivo da Scuderia">${img(n)}</a>`).join('')}</div>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Orçamento em menos de 15 minutos.</h2><p>Faça uma visita, com café fresquinho e sem compromisso. Ou mande as fotos do dano pelo WhatsApp.</p></div><p class="bts"><a class="btn btn-claro" href="${wa('Olá! Quero um orçamento na Scuderia.')}" target="_blank" rel="noopener">${icWa()}Mandar fotos pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'contato')}">${ic('pin')}Como chegar</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.scuderia = head(v, 'scuderia', 'A Scuderia', 'Mais de 30 anos de reparação automotiva em Curitiba: funilaria, pintura, estética e mecânica para veículos multimarcas, seguradoras e particulares.') + topo(v, 'scuderia') + cab('A Scuderia', 'Mais de 30 anos de reparação automotiva', 'oficina-placa') + `
<div class="in"><section class="texto-pag"><div><p class="lead">Um centro automotivo especializado na manutenção e correção estética de veículos multimarcas.</p><p>Oferecemos serviços de lataria, pintura, polimento, espelhamento, revisão, troca de óleo e filtros, elétrica e tapeçaria, entre outros. Tudo para deixar o seu veículo em perfeito estado de conservação, atendendo todas as suas necessidades.</p><p>São mais de três décadas atendendo particulares, frotas e seguradoras conveniadas, sempre na Rua Carlos de Laet, em Curitiba.</p><p class="bts"><a class="btn" href="${link(v, 'servicos')}">Ver os serviços</a><a class="btn btn-linha" href="${link(v, 'antes-e-depois')}">Antes e depois</a></p></div>
<ul class="difs">${diferenciais.map(([t, d], i) => `<li class="sobe"><span>${n2(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ul></section>
<section class="arq-sec"><header class="tit"><p class="k">Do arquivo</p><h2>Como tudo começou</h2><p>Fotos guardadas pela Scuderia ao longo dos anos: a equipe, a fachada e os carros que passaram pela oficina.</p></header>${arquivoGrade()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Reparação de lataria, martelinho de ouro, restauração, reparo rápido, revisão mecânica e elétrica e estética automotiva em Curitiba.') + topo(v, 'servicos') + cab('Serviços', 'Da lataria ao detalhamento', 'interior-placa') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">${n2(i)} · ${s.k}</span><h2>${s.t}</h2>${s.d.map(p => `<p>${p}</p>`).join('')}${s.lista ? `<p class="serv-lista"><b>Inclui:</b> ${s.lista}</p>` : ''}<a class="link-seta" href="${wa(`Olá! Quero um orçamento de ${s.t.toLowerCase()} na Scuderia.`)}" target="_blank" rel="noopener">Pedir orçamento ${ic('seta')}</a></div></article>`).join('')}</section>
<section class="cat-sec" id="catalogo"><header class="tit"><p class="k">Catálogo</p><h2>Tudo o que fazemos, item por item</h2><p>Os valores dependem do carro e do dano. Pergunte pelo item que você precisa.</p></header>${catalogoHtml()}</section></div>
` + cta(v) + rodape(v);
  pag['antes-e-depois'] = head(v, 'antes-e-depois', 'Antes e depois', 'Veja como os carros chegaram e como saíram da Scuderia: Ford EcoSport, Hyundai Vera Cruz, VW Jetta e Hyundai Santa Fé.') + topo(v, 'antes-e-depois') + cab('Antes e depois', 'Como o carro entrou e como saiu', 'jetta-depois-1') + `
<div class="in"><section class="casos-pag"><p class="lead">O resultado dos nossos serviços, levando cada veículo de volta a um estado o mais próximo possível do original. Venha fazer uma visita e saber por que somos referência na reparação de veículos no Paraná.</p>${casos.map(casoHtml).join('')}
<article class="caso sobe" id="santafe"><h2>Hyundai Santa Fé</h2><div class="caso-uma"><a href="/assets/img/santafe-depois.webp" data-foto="${esc(alt['santafe-depois'])}">${img('santafe-depois')}</a><p class="caso-k caso-k-ok">Como saiu</p></div></article></section></div>
` + cta(v) + rodape(v);
  pag.orcamento = head(v, 'orcamento', 'Orçamento', 'Orçamento particular ou pela seguradora na Scuderia, em Curitiba. Veja os documentos necessários e as seguradoras conveniadas.') + topo(v, 'orcamento') + cab('Orçamento', 'Particular ou pela seguradora', 'reparo-rapido') + `
<div class="in"><section class="orc-pag"><div class="orc-txt"><h2>O que separar</h2><ol class="itens">${itensOrc.map((t, i) => `<li><span>${n2(i)}</span>${t}</li>`).join('')}</ol>
<h2>Seguradoras conveniadas</h2><ul class="segs">${seguradoras.map(s => `<li>${s}</li>`).join('')}<li>e outras seguradoras</li></ul>
<div class="corretor"><h3>É corretor de seguros?</h3><p>A Scuderia tem um cadastro exclusivo para corretores, com atendimento do departamento comercial e um ranking de indicações que valoriza a parceria.</p><a class="link-seta" href="${wa('Olá! Sou corretor de seguros e quero me cadastrar na Scuderia.')}" target="_blank" rel="noopener">Quero me cadastrar ${ic('seta')}</a></div></div>
<div class="contato-form"><h2>Pedir orçamento</h2>${formulario()}</div></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Scuderia Reparação Automotiva: ${E.fone}, ${E.email}. ${E.rua}, Curitiba - PR.`) + topo(v, 'contato') + cab('Contato', 'Rua Carlos de Laet, 3327', 'oficina-placa') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Como podemos ajudar?</h2><p>Mande sua dúvida, elogio ou sugestão. Se preferir, use os dados ao lado.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame()}</div></section></div>
` + rodape(v);
}

// A · Arquivo: clara, papel quente com o azul aço do escudo; abre com o antes e depois e conta a história com as fotos de arquivo.
function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, alt[foto], ' loading="eager"')}</figure></div></section>`;
  const eco = casos[0];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Curitiba · mais de 30 anos</p><h1>Lataria e pintura de volta ao original.</h1><p>Funilaria, pintura, martelinho de ouro e estética automotiva para veículos multimarcas. Atendemos seguradoras e particulares.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero um orçamento na Scuderia.')}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'antes-e-depois')}">Ver antes e depois</a></p></div>
<div class="hero-a-par"><figure>${img(eco.antes[0], alt[eco.antes[0]], ' loading="eager" fetchpriority="high"')}<figcaption>Entrou</figcaption></figure><figure>${img(eco.depois[0], alt[eco.depois[0]], ' loading="eager"')}<figcaption>Saiu</figcaption></figure><p class="hero-a-leg">Ford EcoSport reparado na Scuderia</p></div></div></section>
<section class="faixa-a"><div class="in"><p><b>Orçamento em menos de 15 minutos</b>, com café fresquinho e sem compromisso.</p><p class="faixa-segs">Seguradoras conveniadas: ${seguradoras.join(' · ')}</p></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>O que fazemos pelo seu carro</h2></header><ol class="servs-a-lista">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><span class="n">${n2(i)}</span><b>${s.t}</b><span class="d">${s.d[0]}</span></a></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'servicos')}#catalogo">Ver o catálogo completo ${ic('seta')}</a></section>
<section class="hist-a"><div class="in hist-a-in"><div><p class="k">Do arquivo</p><h2>Mais de três décadas consertando carros em Curitiba</h2><p>Um centro automotivo especializado na manutenção e correção estética de veículos multimarcas, com linha de produção padronizada, cabine e pistolas de última geração e departamento próprio de martelinho.</p><a class="link-seta" href="${link(v, 'scuderia')}">Conheça a Scuderia ${ic('seta')}</a></div>${arquivoGrade(['historico-01', 'historico-04', 'historico-12', 'historico-08'])}</div></section>
<section class="in casos-a"><header class="tit"><p class="k">Antes e depois</p><h2>Como entrou, como saiu</h2></header><div class="casos-a-grade">${casos.slice(1).map(c => `<div class="sobe"><h3>${c.t}</h3>${par(c)}</div>`).join('')}</div><a class="link-seta" href="${link(v, 'antes-e-depois')}">Todos os casos ${ic('seta')}</a></section>
<section class="in local-a"><div><p class="k">Onde estamos</p><h2>Rua Carlos de Laet, 3327</h2>${contatoLista()}</div>${mapaFrame()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

// B · Cabine: escura em grafite e aço, como a cabine de pintura; foto em tela cheia, serviços como ordem de serviço e catálogo na home.
function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, alt[foto], ' loading="eager"')}<div class="in cab-b-in"><p class="k">Scuderia / ${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('volante', alt.volante, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Reparação automotiva · Curitiba</p><h1>Funilaria, pintura e estética automotiva.</h1><p>Lataria, pintura, polimento, espelhamento, revisão, elétrica e tapeçaria para veículos multimarcas. Seguradoras e particulares.</p><p class="bts"><a class="btn" href="${wa('Olá! Quero um orçamento na Scuderia.')}" target="_blank" rel="noopener">${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div>
<dl class="hero-b-dados in"><div><dt>Experiência</dt><dd>+30 anos</dd></div><div><dt>Orçamento</dt><dd>em menos de 15 min</dd></div><div><dt>Atendimento</dt><dd>Seguradoras e particulares</dd></div><div><dt>Telefone</dt><dd><a href="${telHref(E.fone)}">${E.fone}</a></dd></div></dl></section>
<section class="in servs-b"><div class="servs-b-cab"><p class="k">Ordem de serviço</p><h2>Seis frentes, uma oficina</h2></div><div class="servs-b-lista">${servicos.map((s, i) => `<a class="sv sobe" href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><span class="n">OS-${n2(i)}</span><b>${s.t}</b><span class="d">${s.k}</span></a>`).join('')}</div></section>
<section class="ad-b"><div class="in"><div class="ad-b-cab"><p class="k">Antes e depois</p><h2>Como entrou, como saiu</h2><a class="link-seta" href="${link(v, 'antes-e-depois')}">Ver os quatro carros ${ic('seta')}</a></div><div class="ad-b-grade">${casos.map(c => `<figure class="sobe"><div class="ad-b-par">${img(c.antes[0])}${img(c.depois[0])}</div><figcaption>${c.t}</figcaption></figure>`).join('')}</div></div></section>
<section class="in cat-b"><header class="tit"><p class="k">Catálogo</p><h2>Item por item</h2></header>${catalogoHtml()}</section>
<section class="difs-b"><div class="in"><ul class="difs">${diferenciais.map(([t, d], i) => `<li class="sobe"><span>${n2(i)}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ul></div></section>
<section class="in local-b"><div><p class="k">Endereço</p><h2>${E.rua}</h2>${contatoLista()}</div>${mapaFrame()}</section>
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
  nome: 'Scuderia Reparação Automotiva', artigo: 'da', url: E.url, lang: 'pt', cor: '#8fa3bf', fundo: '#171c24', claro: '#f4f1ea',
  fonteTitulo: '"Cinzel",Georgia,serif', fonteTexto: '"Nunito Sans",system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, em papel quente e o azul aço do escudo. Abre com um antes e depois real e conta os 30 anos com as fotos de arquivo da oficina.', pontos: ['Antes e depois do EcoSport na abertura', 'História com fotos de arquivo', 'Catálogo completo de serviços'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em grafite e aço como a cabine de pintura. Serviços numerados como ordem de serviço e o catálogo item por item já na página inicial.', pontos: ['Foto em tela cheia', 'Serviços OS-01 a OS-06', 'Antes e depois em pares'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
