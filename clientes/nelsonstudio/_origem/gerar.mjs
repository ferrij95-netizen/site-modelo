// Nelson Studio, espaço de beleza (Caxias do Sul/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/nelsonstudio/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs nelsonstudio https://nelsonstudio.com.br/)
// Textos, equipe e fotos tirados do site atual (páginas e /wp-json/wp/v2/media). Logo: SVG do site, em linha.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const LOGO = fs.readFileSync(path.join(aqui, 'logo.svg'), 'utf8').replace('<svg ', '<svg class="logo-svg" role="img" aria-label="Nelson Studio" ');
const equipe = JSON.parse(fs.readFileSync(path.join(aqui, 'equipe.json'), 'utf8'));
const slug = n => n.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
const E = {
  nome: 'Nelson Studio', url: 'https://nelsonstudio.overtus.com.br/', antigo: 'https://nelsonstudio.com.br/',
  wa: '555499288670', cel: '(54) 9928-8670', fone: '(54) 3223-3088',
  rua: 'Rua Alfredo Chaves, 341', bairro: 'Centro', cidade: 'Caxias do Sul - RS',
  nelson: 'Cabeleireiro há mais de 45 anos e integrante de uma família dedicada à arte da beleza desde 1935, Nelson Camassola construiu uma trajetória marcada por formação internacional e constante aperfeiçoamento.',
  nelson2: 'Com estudos nas academias Vidal Sassoon (Inglaterra), Jacques Dessange (Paris) e Toni & Guy (EUA), lidera o Nelson Studio, hoje um dos espaços de beleza mais completos da Serra Gaúcha, com uma equipe ampla de profissionais especializados.',
};
const mapsQ = encodeURIComponent('Nelson Studio, Rua Alfredo Chaves, 341, Centro, Caxias do Sul RS');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const numeros = [['45', 'anos de tradição'], ['+30', 'profissionais especializados'], ['500 m²', 'de espaço'], ['5,0', '+437 avaliações no Google']];
const servicos = [
  { t: 'Cabelo', foto: 'cabelo-1', d: 'Corte, coloração e colorimetria, mechas, escova e tratamentos, com a técnica de formação internacional da casa.', itens: ['Corte feminino e masculino', 'Coloração e colorimetria', 'Mechas e iluminados', 'Tratamentos capilares', 'Escova e penteados'], eq: 0 },
  { t: 'Barbearia', foto: 'barbearia', d: 'Barbearia moderna em ambiente próprio, para adultos e crianças.', itens: ['Corte masculino', 'Barba', 'Corte kids'], eq: 1 },
  { t: 'Maquiagem', foto: 'sala-noivas-2', d: 'Maquiagem social e de noiva, de longa duração, e micropigmentação.', itens: ['Maquiagem social', 'Maquiagem de noiva', 'Micropigmentação'], eq: 2 },
  { t: 'Sobrancelhas', foto: 'espaco-07', d: 'Design de sobrancelha com visagismo, para valorizar cada traço do rosto.', itens: ['Design de sobrancelha', 'Visagismo'], eq: 2 },
  { t: 'Unhas & Pés', foto: 'espaco-05', d: 'Manicure, pedicure, nail design e podologia, com acabamento impecável.', itens: ['Manicure', 'Pedicure', 'Nail design', 'Podologia'], eq: 3 },
  { t: 'Estética & Bem-Estar', foto: 'espaco-06', d: 'Depilação e massoterapia, com cuidado, higiene e conforto.', itens: ['Depilação', 'Massoterapia'], eq: 3 },
];
const noivas = [['Teste de noiva', 'Ensaio completo para definir o look ideal: penteado, maquiagem e todos os detalhes alinhados antes do grande dia.'], ['Penteado de noiva', 'Criação personalizada com técnicas internacionais e os melhores produtos do mercado.'], ['Maquiagem', 'Maquiagem de longa duração que realça a sua beleza natural, preparada para durar o dia todo.'], ['Tratamento capilar', 'Preparação e nutrição dos fios para cabelos perfeitos, com brilho e leveza.'], ['Manicure & pedicure', 'Acabamento impecável, do detalhe que você sente ao que todo mundo vai notar.'], ['Pacote completo', 'Consultoria personalizada com todos os serviços integrados, planejados para o seu dia.']];
const salaNoiva = ['Sala privativa com acesso exclusivo para a noiva e acompanhantes', 'Ambiente decorado com requinte, inspirado na estética francesa', 'Equipe dedicada exclusivamente ao atendimento de noivas', 'Estacionamento privativo coberto com acesso interno', 'Três opções de sala à sua escolha'];
const espaco = [['salao', 'Salão de cabelo'], ['recepcao', 'Recepção'], ['hall-atendimento', 'Hall de entrada'], ['lavatorios', 'Lavatórios'], ['cabelo-1', 'Área de cabelo'], ['barbearia', 'Barbearia'], ['hall-saladenoivas', 'Hall da sala de noivas'], ['sala-noivas-1', 'Sala de noivas'], ['sala-noivas-3', 'Sala de noivas'], ['sala-noivas-4', 'Sala de noivas'], ['espaco-01', 'Corredor de atendimento'], ['espaco-03', 'Escada para o mezanino']];
const depo = ['Foi o dia mais lindo da minha vida e me sentir tão bem cuidada fez toda a diferença. A equipe do Nelson Studio cuida de cada detalhe com uma atenção que eu nunca tinha visto.', 'Ana Paula R. · noiva 2025 · Caxias do Sul'];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'espaco', nome: 'O espaço' }, { slug: 'equipe', nome: 'Equipe' }, { slug: 'noivas', nome: 'Dia da noiva' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Âmbar', b: 'Ateliê' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Jost:wght@300;400;500;600&family=Abhaya+Libre:wght@500;700;800&family=Manrope:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá, vim pelo site e gostaria de agendar um horário.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#16110d', b: '#f6f1ec' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Espaço de beleza premium em Caxias do Sul` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const estrelas = () => `<span class="estrelas" aria-hidden="true">${ic('estrela').repeat(5)}</span>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Dia da noiva</option></select></label><label>Profissional (se tiver preferência)<input name="profissional"></label></div>
  <label>Data e horário que prefere<input name="quando" placeholder="Ex.: sábado de manhã"></label>
  <button class="btn" type="submit">${icWa()}Agendar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Ver no Google Maps</a></div></li>
  <li>${ic('caminhao')}<div><strong>Estacionamento</strong><span>Privativo e coberto, com acesso interno</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa do Nelson Studio" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo${v === 'a' && s === 'index' ? ' topo-sobre' : ''}">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial">${LOGO}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, v === 'a' ? nav : nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>Agendar</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-cta"><h2>Te convidamos a viver essa experiência</h2><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a></div>
  <div class="in rod-grade">
    <div class="rod-marca">${LOGO}<p>Espaço de beleza premium na Serra Gaúcha. Tradição da família Camassola desde 1935.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.cel}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Nelson Studio. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Agendar pelo WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const pessoa = (p, i) => `<li class="pessoa sobe"><figure>${img(i === 0 && slug(p[0]) === 'nelson-camassola' ? 'nelson-camassola' : `equipe/${slug(p[0])}`, p[0])}</figure><h3>${p[0]}</h3><p class="papel">${p[1].toLowerCase()}</p><p>${p[2]}</p></li>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Cabelo, barbearia, maquiagem, sobrancelhas, unhas e pés, estética e bem-estar no Nelson Studio, em Caxias do Sul.') + topo(v, 'servicos') + cab('Serviços', 'Cuidados selecionados, executados com excelência.', 'salao') + `
<div class="in"><section class="servs">${servicos.map((s, i) => `<article class="serv sobe" id="${slug(s.t)}"><figure>${img(s.foto, s.t)}</figure><div><p class="num">0${i + 1}</p><h2>${s.t}</h2><p>${s.d}</p><ul class="itens">${s.itens.map(x => `<li>${x}</li>`).join('')}</ul><p class="bts"><a class="btn" href="${wa(`Olá, vim pelo site e gostaria de agendar ${s.t.toLowerCase()}.`)}" ${ext}>${icWa()}Agendar</a><a class="link-seta" href="${link(v, 'equipe')}#${slug(equipe[s.eq].t)}">Ver os profissionais ${ic('seta')}</a></p></div></article>`).join('')}</section></div>
` + rodape(v);
  pag.espaco = head(v, 'espaco', 'O espaço', 'São 500 m² com recepção, salão de cabelo, lavatórios, barbearia e salas exclusivas para noivas, no Centro de Caxias do Sul.') + topo(v, 'espaco') + cab('O espaço', '500 m² pensados para você se sentir em casa.', 'recepcao') + `
<div class="in"><p class="intro">Recepção, salão de cabelo, lavatórios, barbearia em ambiente próprio e três salas exclusivas para noivas, com estacionamento privativo coberto e acesso interno.</p><section class="galeria">${espaco.map(f => `<figure class="sobe"><a href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}</a><figcaption>${f[1]}</figcaption></figure>`).join('')}</section></div>
` + rodape(v);
  pag.equipe = head(v, 'equipe', 'Equipe', 'Conheça a equipe do Nelson Studio: cabelo e colorimetria, barbearia, maquiagem e sobrancelhas, unhas, pés e estética.') + topo(v, 'equipe') + cab('Equipe', 'Conheça quem cuida de você.', 'hall-atendimento') + `
<div class="in"><p class="intro">Mais de 30 profissionais especializados, unidos pela mesma paixão: excelência e atenção a cada detalhe.</p><nav class="filtro" aria-label="Especialidades">${equipe.map(g => `<a href="#${slug(g.t)}">${g.t}</a>`).join('')}</nav>
${equipe.map((g, gi) => `<section class="grupo" id="${slug(g.t)}"><h2><span>0${gi + 1}</span>${g.t}</h2><ul class="pessoas">${g.p.map(pessoa).join('')}</ul></section>`).join('')}</div>
` + rodape(v);
  pag.noivas = head(v, 'noivas', 'Dia da noiva', 'Espaço exclusivo para noivas no Nelson Studio: teste de noiva, penteado, maquiagem, tratamento capilar, manicure e pacote completo.') + topo(v, 'noivas') + cab('Espaço exclusivo para noivas', 'O dia mais especial da sua vida merece o melhor.', 'noiva-sala') + `
<div class="in"><section class="noiva-intro"><div><p class="lead">Você planejou cada detalhe: o vestido, as flores, a música. O grande dia merece que a sua beleza seja inesquecível também.</p><p>No Nelson Studio, a noiva tem um espaço só seu. Um ambiente reservado, profissionais que conhecem cada detalhe do seu look e uma equipe que cuida para que nada saia do planejado. Do teste de noiva até o dia do casamento, estamos com você.</p><a class="btn" href="${wa('Olá! Vim pelo site e quero saber sobre o dia da noiva.')}" ${ext}>${icWa()}Agende o seu momento</a></div><figure>${img('noiva-espaco', 'Noiva na sala exclusiva do Nelson Studio')}</figure></section>
<section class="noiva-servs"><h2>Tudo o que você precisa em um só lugar</h2><ol>${noivas.map((n, i) => `<li class="sobe"><b>0${i + 1}</b><h3>${n[0]}</h3><p>${n[1]}</p></li>`).join('')}</ol></section>
<section class="sala"><div class="sala-fotos">${['sala-noivas-1', 'sala-noivas-3', 'sala-noivas-4'].map(f => `<a href="/assets/img/${f}.webp" data-foto data-legenda="Sala de noivas">${img(f, 'Sala de noivas')}</a>`).join('')}</div><div><h2>Uma sala só sua</h2><p>Ambiente exclusivo, reservado e sofisticado, para você viver esse momento com calma e elegância.</p><ul class="lista-check">${salaNoiva.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul></div></section>
<blockquote class="depo-noiva">${estrelas()}<p>${depo[0]}</p><cite>${depo[1]}</cite></blockquote></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Nelson Studio: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.cel}, telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Agende o seu horário.', 'hall-2') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agendar pelo WhatsApp</h2><p>Preencha e a mensagem já vai pronta para a recepção.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Espaço de beleza premium na Serra Gaúcha: cabelo, barbearia, maquiagem, sobrancelhas, unhas e dia da noiva, com Nelson Camassola e mais de 30 profissionais.') + topo(v, 'index') + `
<section class="hero-a">${img('salao', 'Salão do Nelson Studio', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Caxias do Sul · desde 1935 na família</p><h1>Espaço de beleza<br><em>premium</em> na Serra Gaúcha</h1><p>Cuidados selecionados, executados com excelência.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar pelo WhatsApp</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div></section>
<section class="numeros-a"><div class="in"><ul>${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Seis cuidados, uma casa só</h2></header><ul>${servicos.map(s => `<li class="sobe"><a href="${link(v, 'servicos')}#${slug(s.t)}">${img(s.foto, s.t)}<span>${s.t}</span></a></li>`).join('')}</ul></section>
<section class="nelson-a"><div class="in nelson-a-in"><figure>${img('nelson-camassola', 'Nelson Camassola')}</figure><div><p class="k">Seu anfitrião</p><h2>Nelson Camassola</h2><p>${E.nelson}</p><p>${E.nelson2}</p><ul class="escolas"><li>Vidal Sassoon<span>Inglaterra</span></li><li>Jacques Dessange<span>Paris</span></li><li>Toni &amp; Guy<span>EUA</span></li></ul></div></div></section>
<section class="in espaco-a"><header class="tit"><p class="k">O espaço</p><h2>500 m² de conforto, do hall à sala de noivas</h2></header><div class="mosaico">${['recepcao', 'lavatorios', 'sala-noivas-1', 'barbearia', 'hall-saladenoivas'].map((f, i) => `<a class="m${i + 1}" href="/assets/img/${f}.webp" data-foto>${img(f, espaco.find(x => x[0] === f)[1])}</a>`).join('')}</div><a class="link-seta" href="${link(v, 'espaco')}">Conhecer o espaço ${ic('seta')}</a></section>
<section class="noiva-a">${img('noiva-sala', 'Sala exclusiva para noivas')}<div class="in"><div class="noiva-a-txt"><p class="k">Dia da noiva</p><h2>O dia mais especial da sua vida merece o melhor.</h2><p>Sala privativa, equipe dedicada e teste de noiva para chegar ao grande dia com tudo alinhado.</p><a class="btn" href="${link(v, 'noivas')}">Conhecer o dia da noiva</a></div></div></section>
<section class="in equipe-a"><header class="tit"><p class="k">Equipe</p><h2>Mais de 30 profissionais especializados</h2></header><ul>${equipe.flatMap(g => g.p).slice(1, 9).map(p => `<li class="sobe">${img(`equipe/${slug(p[0])}`, p[0])}<span>${p[0]}<small>${p[1].toLowerCase()}</small></span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'equipe')}">Ver a equipe completa ${ic('seta')}</a></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Espaço de beleza premium na Serra Gaúcha: cabelo, barbearia, maquiagem, sobrancelhas, unhas e dia da noiva, com Nelson Camassola e mais de 30 profissionais.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Espaço de beleza · Caxias do Sul</p><h1>A arte da beleza, de família, desde 1935.</h1><p>Cabelo, barbearia, maquiagem, sobrancelhas, unhas e estética em 500 m² no Centro de Caxias do Sul.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Agendar horário</a><a class="link-seta" href="${link(v, 'equipe')}">Conhecer a equipe ${ic('seta')}</a></p><p class="nota-b">${estrelas()}<b>5,0</b> no Google · +437 avaliações</p></div><div class="hero-b-fotos"><figure class="f1">${img('recepcao', 'Recepção do Nelson Studio', ' loading="eager" fetchpriority="high"')}</figure><figure class="f2">${img('nelson-camassola', 'Nelson Camassola', ' loading="eager"')}</figure></div></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>Cuidados selecionados</h2></header><ol>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${slug(s.t)}"><b>0${i + 1}</b><h3>${s.t}</h3><p>${s.d}</p></a></li>`).join('')}</ol></section>
<section class="nelson-b"><div class="in nelson-b-in"><div><p class="k">Seu anfitrião</p><h2>Tradição e excelência que vêm de família.</h2><p>${E.nelson}</p><p>${E.nelson2}</p><p class="assin">Nelson Camassola</p></div><ul class="numeros-b">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul></div></section>
<section class="in espaco-b"><header class="tit-b"><p class="k">O espaço</p><h2>Do hall à sala de noivas</h2></header><div class="faixa">${['hall-atendimento', 'lavatorios', 'cabelo-1', 'sala-noivas-3', 'barbearia'].map(f => `<a href="/assets/img/${f}.webp" data-foto data-legenda="${esc(espaco.find(x => x[0] === f)[1])}">${img(f, espaco.find(x => x[0] === f)[1])}<span>${espaco.find(x => x[0] === f)[1]}</span></a>`).join('')}</div><a class="link-seta" href="${link(v, 'espaco')}">Ver todas as fotos ${ic('seta')}</a></section>
<section class="noiva-b"><div class="in noiva-b-in"><figure>${img('noiva-espaco', 'Noiva na sala exclusiva')}</figure><div><p class="k">Dia da noiva</p><h2>Uma sala só sua no grande dia</h2><p>Do teste de noiva até o dia do casamento: penteado, maquiagem, tratamento capilar e manicure, em uma sala privativa com acesso exclusivo para você e as acompanhantes.</p><blockquote>“${depo[0]}”<cite>${depo[1]}</cite></blockquote><a class="btn" href="${link(v, 'noivas')}">Conhecer o dia da noiva</a></div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#f26a21', fundo: '#16110d', claro: '#f6f1ec',
  fonteTitulo: "'Gilda Display',Georgia,serif", fonteTexto: 'Jost,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Escura e quente como o próprio salão: as fotos do espaço em destaque, o laranja da marca nos detalhes e o Nelson como anfitrião.', pontos: ['Os 45 anos, os 500 m² e a nota 5,0 logo na abertura', 'Equipe completa, com foto de todos os 30 profissionais', 'Página do dia da noiva com a sala exclusiva'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Clara e editorial, em tom creme: tipografia serifada, a história da família desde 1935 e o espaço apresentado como um ateliê.', pontos: ['"A arte da beleza, de família, desde 1935"', 'Serviços numerados com os profissionais de cada área', 'Depoimento de noiva e agendamento pelo WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
