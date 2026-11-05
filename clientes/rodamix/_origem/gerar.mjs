// Rodamix High Performance (Guanabara, Campinas). Gera public/{a,b}/ e a página de escolha.
// node clientes/rodamix/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rodamix http://www.rodamix.com.br/)
// Textos tirados do site atual (rodamix.com.br: Quem somos, Nossos serviços, Contato, catálogo de pneus).
// Única foto real: a fachada com o táxi amarelo (Quem somos). As outras são fotos ilustrativas CC BY 2.0 (créditos no rodapé).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Rodamix High Performance', curto: 'Rodamix', url: 'https://rodamix.overtus.com.br/', antigo: 'http://www.rodamix.com.br/',
  fone: '(19) 3241-4619', email: 'rodamix@rodamix.com.br',
  rua: 'R. Cônego Nery, 123', bairro: 'Guanabara', cidade: 'Campinas/SP', cep: '13073-180',
};
const lema = 'Specialized in Big Toys!';
const servicos = [
  { ic: 'disco', g: 'Rodas', t: 'Personalização de rodas', d: 'Mais de 300 opções de cores. Pintura eletrostática em cabine própria.' },
  { ic: 'chave', g: 'Rodas', t: 'Pintura e consertos de rodas', d: 'Reparação com torno copiador e solda em alumínio. Um segundo torno atende aros maiores.' },
  { ic: 'medidor', g: 'Rodas', t: 'Balanceamento de rodas', d: 'Rodas e pneus equilibrados para rodar sem vibração.' },
  { ic: 'volante', g: 'Direção', t: 'Alinhamento técnico de direção', d: 'Alinhador computadorizado de última geração, com tecnologia bluetooth.' },
  { ic: 'engrenagem', g: 'Direção', t: 'Serviços de suspensão', d: 'Manutenção e acerto da suspensão do carro.' },
  { ic: 'escudo', g: 'Direção', t: 'Serviços de freio', d: 'Revisão e troca de componentes do sistema de freio.' },
  { ic: 'chama', g: 'Escapamento e som', t: 'Escapamentos originais e especiais', d: 'Do escapamento original de fábrica ao esportivo.' },
  { ic: 'painel', g: 'Escapamento e som', t: 'Som automotivo', d: 'Projetos high-end e multimídia, com profissionais formados nos principais fabricantes.' },
  { ic: 'oleo', g: 'Óleo e filtros', t: 'Troca de óleo e filtros', d: 'Centro de excelência em troca de óleo e filtros, autorizada Mobil. Troca de óleo personalizada.' },
  { ic: 'carro', g: 'Personalização', t: 'Personalização de veículos', d: 'Rodas, som, escapamento e acessórios para deixar o carro do seu jeito.' },
];
const produtos = [
  { t: 'Pneus', d: 'Para carros, SUVs, picapes e motos.' },
  { t: 'Rodas', d: 'Rodas originais e esportivas, com pintura e personalização na própria loja.' },
  { t: 'Som automotivo', d: 'Linha original e high-end, além de multimídia.' },
  { t: 'Filtros de ar esportivos', d: '' },
  { t: 'Escapamentos esportivos', d: '' },
  { t: 'Módulos eletrônicos de potência', d: '' },
];
const pneus = [
  { m: 'Pirelli', l: ['P Zero', 'P Zero Rosso', 'P Zero Nero GT', 'P Zero Corsa', 'P Zero Trofeo R', 'Cinturato P1', 'Cinturato P4', 'Cinturato P7', 'Scorpion ATR', 'Scorpion MTR', 'Scorpion STR', 'Scorpion Zero', 'Scorpion Verde All Season'] },
  { m: 'Yokohama', l: ['Advan Sport', 'Advan Neova AD08', 'Geolandar A/T-S', 'Geolandar M/T', 'Geolandar H/T-S', 'Geolandar SUV G055', 'BluEarth AE-01', 'S.drive', 'C.drive2'] },
];
const historia = [
  { a: '1999', t: 'Começo', d: 'A Rodamix inicia as atividades no segmento de rodas, pneus, som e serviços automotivos.' },
  { a: '2003', t: 'Casa nova', d: 'Novas instalações, amplas e de fácil acesso, numa grande avenida do mercado automotivo. Chegam o torno copiador, a cabine de pintura, a solda em alumínio e uma linha de som original e high-end.' },
  { a: '2012', t: '2.000 m² no Guanabara', d: 'A Rodamix amplia as instalações para 2.000 m² numa área nobre do bairro Guanabara.' },
  { a: 'Hoje', t: 'Mais equipamento', d: 'Alinhador computadorizado com bluetooth, pintura eletrostática para rodas, um segundo torno copiador para aros maiores, troca de óleo personalizada e pneus para motos.' },
];
const publico = ['Carros originais', 'High performance', 'Antigos', 'Hot rods'];
const conforto = ['Ampla área de estacionamento', 'Sala de espera climatizada', 'Cyber café', 'Equipe treinada e atualizada'];
const fotos = {
  loja: 'A fachada da Rodamix, com um táxi antigo amarelo estacionado em frente', placa: 'O painel da fachada: pneus, rodas, alinhamento, escapamentos, som, alarmes, suspensão e freios', taxi: 'Táxi antigo amarelo diante da loja',
  roda: 'Roda esportiva de liga leve (foto ilustrativa)', cores: 'Roda pintada em várias cores (foto ilustrativa)', escap: 'Ponteiras de escapamento esportivo (foto ilustrativa)',
  hotrod: 'Hot rod preto com rodas grandes (foto ilustrativa)', aro: 'Roda esportiva com pneu (foto ilustrativa)', pneus: 'Pneus empilhados (foto ilustrativa)',
};
const tam = { loja: [600, 600], placa: [370, 330], taxi: [600, 270], roda: [1024, 768], cores: [1024, 768], escap: [1024, 768], hotrod: [1024, 683], aro: [1024, 587], pneus: [1023, 681] };
const creditos = [
  ['roda', 'Alloy wheel', 'JohnSeb', 'https://www.flickr.com/photos/69875617@N00/3445356918'],
  ['cores', 'Smiths Performance Alloy Wheels', 'lydia_shiningbrightly', 'https://www.flickr.com/photos/31917220@N07/7836791490'],
  ['escap', 'Sport Exhaust', 'IainCameron', 'https://www.flickr.com/photos/67872859@N00/26226701681'],
  ['hotrod', 'Hot Rod', 'dave_7', 'https://www.flickr.com/photos/21612624@N00/6290560360'],
  ['aro', 'Work Meister S1 2-Piece', 'Dannylo Photography', 'https://www.flickr.com/photos/24436948@N04/14627183228'],
  ['pneus', 'Wheel and Tire Shop', 'Offutt Air Force Base', 'https://www.flickr.com/photos/61438875@N03/5613271505'],
];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-rodamix', nome: 'A Rodamix' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Tabuleiro', b: 'Big Toys' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira+Condensed:ital,wght@0,700;0,800;1,800&family=Manrope:wght@400;500;600;700&family=Teko:wght@500;600;700&family=Barlow:wght@400;500;600&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#ffe600', b: '#141414' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Rua Cônego Nery, 123, Guanabara, Campinas SP, 13073-180');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Rodas, pneus e som em Campinas` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const xadrez = '<div class="xadrez" aria-hidden="true"></div>';

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Veículo (modelo e ano)<input name="veiculo" placeholder="Ex.: Golf GTI 2014"></label></div>
  <label>Assunto<select name="assunto"><option>Orçamento</option><option>Dúvida</option><option>Sugestão</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Serviço ou produto que procura, medida da roda ou do pneu, cor desejada..."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta para a Rodamix. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Rodamix na R. Cônego Nery, 123" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Rodamix High Performance, página inicial"><img src="/assets/logo.webp" alt="Rodamix High Performance" width="900" height="186"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  ${xadrez}
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo.webp" alt="Rodamix High Performance" width="900" height="186" loading="lazy"><p>Rodas, pneus, alinhamento, escapamentos e som em Campinas desde 1999. ${lema}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-cred"><div class="in">Fotos ilustrativas (CC BY 2.0): ${creditos.map(c => `<a href="${c[3]}" ${ext}>${esc(c[1])}</a>, ${esc(c[2])}`).join(' · ')}.</div></div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Rodamix High Performance. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Rodamix">${ic('tel')}</a>
</body>
</html>
`;
}

const grupos = [...new Set(servicos.map(s => s.g))];
const listaServicos = (cls = '') => `<div class="servs ${cls}">${grupos.map(g => `<section class="serv-g sobe"><h3>${g}</h3><ul>${servicos.filter(s => s.g === g).map(s => `<li>${ic(s.ic)}<div><strong>${s.t}</strong><span>${s.d}</span></div></li>`).join('')}</ul></section>`).join('')}</div>`;
const linhaTempo = (cls = '') => `<ol class="tempo ${cls}">${historia.map(h => `<li class="sobe"><b>${h.a}</b><div><h3>${h.t}</h3><p>${h.d}</p></div></li>`).join('')}</ol>`;
const listaPneus = () => `<div class="pneus-marcas">${pneus.map(p => `<div class="sobe"><h3>${p.m}</h3><ul>${p.l.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>`;
const gradeProdutos = (cls = '') => `<div class="prods ${cls}">${produtos.map((p, i) => `<article class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${p.t}</h3>${p.d ? `<p>${p.d}</p>` : ''}</article>`).join('')}</div>`;
const listaPublico = () => `<ul class="publico">${publico.map(p => `<li>${p}</li>`).join('')}</ul>`;

function comum(v, pag, cab) {
  pag['a-rodamix'] = head(v, 'a-rodamix', 'A Rodamix', 'Desde 1999 em Campinas. Em 2003 vieram o torno copiador, a cabine de pintura e a solda em alumínio; em 2012, 2.000 m² no bairro Guanabara.') + topo(v, 'a-rodamix') + cab('A Rodamix', 'Desde 1999 atrás de novas tendências', 'hotrod') + `
<div class="in">
<p class="intro">Com uma busca constante por aprimoramento e novas tendências de mercado, a Rodamix vem fazendo parcerias de sucesso com fornecedores e clientes. Atende os mais diversos mercados, com profissionais bem treinados e atualizados, preços justos e uma busca incessante por inovação.</p>
${linhaTempo('tempo-pag')}
<section class="mercados"><div><p class="k">Para quem</p><h2>Do original ao hot rod</h2></div>${listaPublico()}</section>
<section class="loja-pag"><div class="loja-pag-fotos">${foto('placa')}${foto('taxi')}</div><div><p class="k">Nosso principal patrimônio são vocês</p><h2>Enquanto o carro fica pronto</h2><ul class="lista-check">${conforto.map(c => `<li>${ic('check')}<span>${c}</span></li>`).join('')}</ul><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Personalização de rodas com mais de 300 cores, pintura e conserto de rodas, alinhamento, balanceamento, freios, suspensão, escapamentos, som e troca de óleo autorizada Mobil.') + topo(v, 'servicos') + cab('Serviços', 'Da roda ao som, tudo na mesma casa', 'aro') + `
<div class="in">
<p class="intro">Torno copiador, cabine de pintura, solda em alumínio, pintura eletrostática e alinhador computadorizado. Os serviços da Rodamix, por área:</p>
${listaServicos('servs-pag')}
<section class="cores-pag"><figure>${foto('cores')}</figure><div><p class="k">Personalização de rodas</p><h2>Mais de 300 opções de cores</h2><p>A roda pode sair da cor que você quiser. A pintura eletrostática é feita na cabine da própria loja, e o conserto usa torno copiador e solda em alumínio.</p><p class="bts">${btnTel('Pedir orçamento')}</p></div></section>
</div>
` + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos', 'Pneus Pirelli e Yokohama, rodas, som automotivo, filtros de ar esportivos, escapamentos esportivos e módulos eletrônicos de potência.') + topo(v, 'produtos') + cab('Produtos', 'Pneus, rodas e acessórios de performance', 'pneus') + `
<div class="in">
<p class="intro">Além dos serviços, a Rodamix vende pneus, rodas e acessórios. Consulte medidas, modelos e disponibilidade por telefone ou e-mail.</p>
${gradeProdutos('prods-pag')}
<section class="pneus-pag"><header class="tit"><p class="k">Pneus</p><h2>Linhas do catálogo da Rodamix</h2><p>Algumas das linhas Pirelli e Yokohama que aparecem no catálogo da loja.</p></header>${listaPneus()}</section>
<p class="cta-linha">${btnTel('Consultar disponibilidade')}<a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Pedir por e-mail</a></p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Rodamix High Performance: ${E.rua}, ${E.bairro}, Campinas. Telefone ${E.fone}, e-mail ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Vamos conversar?', 'taxi') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p>${mapaFrame}</div><div><h2 class="form-tit">Peça um orçamento</h2>${formulario()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div>${xadrez}</section>`;
  pag.index = head(v, 'index', '', 'Personalização de rodas com mais de 300 cores, pneus, alinhamento, escapamentos e som em Campinas desde 1999. R. Cônego Nery, 123, Guanabara.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Rodas · pneus · som · Campinas desde 1999</p><h1>Mais de <span class="marca-tx">300 cores</span> para a sua roda</h1><p>Pintura eletrostática, torno copiador e solda em alumínio para consertar ou personalizar. E pneus, alinhamento, escapamentos e som no mesmo endereço, no Guanabara.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
  <figure class="hero-a-foto">${foto('cores')}<figcaption>${lema}</figcaption></figure>
</div>${xadrez}</section>
<section class="faixa-a"><div class="in"><ul>
  <li><b>1999</b><span>começo das atividades</span></li>
  <li><b>2.000 m²</b><span>no bairro Guanabara</span></li>
  <li><b>300+</b><span>cores para rodas</span></li>
  <li><b>2</b><span>tornos copiadores</span></li>
</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Tudo o que a roda, o pneu e o carro pedem</h2></header>${listaServicos()}<a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></section>
<section class="mosaico-a"><div class="in mosaico-a-in">${foto('roda', 'm1')}${foto('escap', 'm2')}${foto('aro', 'm3')}<div class="m4"><p class="k">Para quem</p><h2>Originais, high performance, antigos e hot rods</h2><p>A Rodamix atende dos carros de fábrica aos projetos mais ousados.</p></div></div></section>
<section class="in prods-a"><div><p class="k">Produtos</p><h2>Pneus Pirelli e Yokohama, rodas e acessórios</h2><p>Também filtros de ar e escapamentos esportivos, módulos eletrônicos de potência e som original, high-end e multimídia.</p><a class="link-seta" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a></div>${gradeProdutos()}</section>
<section class="loja-a"><div class="in loja-a-in"><figure>${foto('loja')}</figure><div><p class="k">A loja</p><h2>Estacionamento, sala climatizada e cyber café</h2><p>Desde 2012 em 2.000 m² no bairro Guanabara, com ampla área de estacionamento e uma sala de espera confortável enquanto a equipe cuida do seu carro.</p><a class="link-seta" href="${link(v, 'a-rodamix')}">Conheça a história ${ic('seta')}</a></div></div></section>
<section class="in cta-a"><div><h2>Quer orçamento para a sua roda?</h2><p>${E.rua}, ${E.bairro}, Campinas. Ligue ou mande um e-mail.</p></div><p class="bts">${btnTel()}<a class="btn btn-linha" href="mailto:${E.email}">${ic('mail')}${E.email}</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Rodas, pneus, alinhamento, escapamentos e som para carros originais, high performance, antigos e hot rods. Campinas, desde 1999.') + topo(v, 'index') + `
<section class="hero-b">${img('hotrod', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Campinas · desde 1999</p><h1>${lema.replace('!', '')}<em>!</em></h1><p>Rodas, pneus, alinhamento, escapamentos e som para originais, high performance, antigos e hot rods.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="boxes-b"><div class="in"><header class="tit-b"><p class="k">Serviços</p><h2>Box por box</h2></header><ol class="boxes">${servicos.map((s, i) => `<li class="sobe"><span class="box-n">${String(i + 1).padStart(2, '0')}</span>${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol></div></section>
<section class="cores-b"><div class="in cores-b-in"><div><p class="k">Rodas</p><h2><b>300</b> cores e um torno copiador</h2><p>Personalização com pintura eletrostática, conserto com solda em alumínio e um segundo torno para aros maiores.</p><a class="link-seta" href="${link(v, 'servicos')}">Ver detalhes ${ic('seta')}</a></div><div class="cores-b-fotos">${foto('cores', 'c1')}${foto('roda', 'c2')}</div></div></section>
<section class="in tempo-b"><header class="tit-b"><p class="k">Linha do tempo</p><h2>De 1999 até hoje</h2></header>${linhaTempo()}</section>
<section class="pneus-b"><div class="in pneus-b-in"><figure>${foto('pneus')}</figure><div><p class="k">Pneus</p><h2>Pirelli e Yokohama, para carro e moto</h2>${listaPneus()}<a class="link-seta" href="${link(v, 'produtos')}">Todos os produtos ${ic('seta')}</a></div></div></section>
<section class="cta-b"><div class="in cta-b-in">${foto('loja', 'cta-foto')}<div><h2>R. Cônego Nery, 123</h2><p>Guanabara, Campinas. Estacionamento amplo, sala climatizada e cyber café.</p><p class="bts">${btnTel()}${btnMapa()}</p></div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#ffe600', fundo: '#141414', claro: '#f3f2ee',
  fonteTitulo: "'Saira Condensed',Arial Narrow,sans-serif", fonteTexto: "'Manrope',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no amarelo e preto do logo, com a faixa quadriculada da bandeira de chegada separando as seções. Abre com as mais de 300 cores para rodas e mostra os serviços por área.', pontos: ['"Mais de 300 cores para a sua roda"', 'Números da loja em destaque: 1999, 2.000 m², 2 tornos', 'Telefone e e-mail sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, cor de asfalto com amarelo, em letras altas de corrida. Abre com o lema do site atual, "Specialized in Big Toys!", e apresenta os serviços como boxes numerados.', pontos: ['O lema da casa em destaque', 'Serviços em 10 boxes numerados', 'Linha do tempo de 1999 até hoje'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
