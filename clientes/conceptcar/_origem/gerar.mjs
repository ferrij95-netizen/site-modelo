// Concept Car (Medianeira, Porto Alegre/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/conceptcar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs conceptcar http://conceptcar.srv.br/)
// Textos, fotos e logo tirados do site atual (conceptcar.srv.br). Logo redesenhado em vetor a partir do JPG do topo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Concept Car', curto: 'Concept Car', url: 'https://conceptcar.overtus.com.br/', antigo: 'http://conceptcar.srv.br/',
  fone: '(51) 4061-6060', wa: '(51) 98594-2559', waNum: '5551985942559',
  rua: 'Av. Dr. Carlos Barbosa, 1066', bairro: 'Medianeira', cidade: 'Porto Alegre/RS', cep: '90880-001',
  slogan: 'Um novo conceito em reparação automotiva',
  areas: 'Mecânica, elétrica e injeção eletrônica',
  horario: 'Segunda a sexta, das 8h às 12h e das 13h30 às 18h',
  origem: 'No início de 2010, após anos dedicados à reparação automotiva, percebemos a carência do mercado em possuir uma oficina que trabalhasse de forma honesta, com custo compatível, mas que acima de tudo realizasse o reparo com qualidade e seriedade.',
  inauguracao: 'Daí surge a Concept Car, inaugurada em 1º de setembro de 2010, que traz na sua bagagem uma vasta experiência por parte de seus sócios, Roger Ferrari e Fernando Rexhausen.',
  convite: 'Problemas com seu veículo? Estamos aguardando sua visita para resolvê-los!',
};
const socios = [
  { nome: 'Roger Ferrari', area: 'Elétrica, eletrônica e injeção', txt: [
    'Atua na área de reparação automotiva há mais de 15 anos, tendo ministrado cursos de reciclagem técnica junto às maiores seguradoras do país e desenvolvido material didático para treinamento de funcionários.',
    'Possui certificações internacionais em eletroeletrônica automotiva e inúmeros cursos na área de injeção eletrônica e eletrônica embarcada de automóveis.',
    'Gerenciou durante 8 anos a equipe de técnicos da Urgecar, empresa de assistência veicular para seguradoras em Porto Alegre, capacitando esses técnicos para o atendimento emergencial no local, em todos os automóveis do mercado.'] },
  { nome: 'Fernando Rexhausen', area: 'Mecânica: motor, freios, suspensão e câmbio', txt: [
    'Desde criança já sabia o que queria. Filho de um dos pioneiros em manutenção de caixas de câmbio Volkswagen de Porto Alegre, conviveu com o cotidiano da reparação por toda a infância e herdou de seu Waldir Rexhausen o caráter metódico, a organização e o compromisso de sempre fazer o melhor.',
    'Atuou também na Urgecar, onde era responsável pela manutenção de toda a frota da empresa.',
    'Tem ampla experiência na mecânica aplicada: reparação em motores, sistemas de frenagem, suspensão e caixas de câmbio, com um rol de certificados em reparação.'] },
];
const areas = [
  { ic: 'engrenagem', t: 'Mecânica', d: 'Reparação em motores, sistemas de frenagem, suspensão e caixas de câmbio.', itens: ['Motor', 'Freios', 'Suspensão', 'Câmbio'] },
  { ic: 'painel', t: 'Elétrica', d: 'Eletroeletrônica automotiva, com técnicos certificados na área.', itens: ['Parte elétrica', 'Eletroeletrônica', 'Eletrônica embarcada'] },
  { ic: 'medidor', t: 'Injeção eletrônica', d: 'Diagnóstico e reparo do sistema de injeção, com equipamento de análise.', itens: ['Diagnóstico com scanner', 'Injeção eletrônica', 'Nacionais e importados'] },
];
const diferenciais = [
  ['Orçamento gratuito', 'Você sabe o que vai ser feito e quanto custa antes de aprovar.'],
  ['Nacionais e importados', 'Atendimento para os automóveis do mercado.'],
  ['Técnicos qualificados', 'Sócios certificados, com anos de reparação automotiva.'],
  ['Atendimento personalizado', 'Conversa clara sobre o que o carro tem e o que precisa.'],
];
const fotos = {
  elevadores: 'Os elevadores da oficina', salao: 'Carros no salão da oficina', diagnostico: 'Diagnóstico eletrônico no motor',
  portao: 'Vista da oficina para o portão', entrada: 'A entrada, na Av. Dr. Carlos Barbosa', capos: 'Carros em reparo', recepcao: 'A recepção',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'oficina', nome: 'A oficina' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Faixa vermelha', b: 'Desde 2010' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:ital,wght@0,700;0,800;1,800&family=Albert+Sans:wght@400;500;600;700&family=Libre+Bodoni:ital,wght@0,500;0,600;1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap';
const img = (n, extra = '', g = false) => `<img src="/assets/img/${n}${g ? '-g' : ''}.webp" alt="${esc(fotos[n])}" width="${g ? 1400 : 600}" height="${g ? 1050 : 450}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '', g = false) => `<a href="/assets/img/${n}-g.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n, '', g)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#c5433f', b: '#17181a' };
const tel = telHref(E.fone);
const wa = waHref(E.waNum, 'Olá! Vim pelo site da Concept Car.');
const mapsQ = encodeURIComponent('Av. Dr. Carlos Barbosa, 1066, Medianeira, Porto Alegre RS, 90880-001');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Mecânica, elétrica e injeção eletrônica em Porto Alegre` : `${titulo} | ${E.curto}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site da Concept Car.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <label>Veículo (modelo e ano)<input name="veiculo" required placeholder="Ex.: Corolla 2.0 2019"></label>
  <label>Assunto<select name="area"><option>Mecânica</option><option>Elétrica</option><option>Injeção eletrônica</option><option>Orçamento</option><option>Outro</option></select></label>
  <label>O que o carro está apresentando?<textarea name="mensagem" rows="4" placeholder="Barulho, luz no painel, falha, revisão..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">O botão abre o WhatsApp com a mensagem pronta para a Concept Car. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.wa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, bairro ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Concept Car na Av. Dr. Carlos Barbosa, 1066" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Concept Car, página inicial"><img src="/assets/${logo}.webp" alt="Concept Car" width="800" height="171"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>WhatsApp</span></a>
    ${btnMenu}
  </div>${v === 'a' ? '<div class="faixa" aria-hidden="true"></div>' : ''}
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">${v === 'a' ? '<div class="faixa" aria-hidden="true"></div>' : ''}
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Concept Car" width="800" height="171" loading="lazy"><p>${E.slogan}. ${E.areas} no bairro Medianeira, em Porto Alegre, desde 2010.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.wa}</a></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–12h e 13h30–18h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Concept Car. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Conversar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const blocoSocios = () => `<div class="socios">${socios.map(s => `<article class="socio sobe"><p class="k">${s.area}</p><h3>${s.nome}</h3>${s.txt.map(t => `<p>${t}</p>`).join('')}</article>`).join('')}</div>`;

function comum(v, pag, cab) {
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', `${E.origem} ${E.inauguracao}`) + topo(v, 'quem-somos') + cab('Quem somos', 'Uma oficina honesta, com custo justo e reparo bem feito', 'portao') + `
<div class="in">
<section class="historia"><p class="lead">${E.origem}</p><p>${E.inauguracao}</p><p class="data-inaug"><b>1º de setembro de 2010</b><span>inauguração da Concept Car, na Av. Dr. Carlos Barbosa</span></p></section>
<section class="sec"><header class="tit"><p class="k">Os sócios</p><h2>A experiência por trás da oficina</h2></header>${blocoSocios()}</section>
<section class="galeria g3">${['entrada', 'recepcao', 'salao'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Mecânica (motor, freios, suspensão e câmbio), elétrica e injeção eletrônica para nacionais e importados, no bairro Medianeira, em Porto Alegre.') + topo(v, 'servicos') + cab('Serviços', 'Mecânica, elétrica e injeção eletrônica', 'diagnostico') + `
<div class="in">
<section class="areas-pag">${areas.map((a, i) => `<article class="area-pag sobe" id="s${i + 1}"><div class="area-ic">${ic(a.ic)}</div><div><h2>${a.t}</h2><p>${a.d}</p><ul class="chips">${a.itens.map(x => `<li>${x}</li>`).join('')}</ul></div>${foto(['salao', 'capos', 'diagnostico'][i])}</article>`).join('')}</section>
<section class="sec"><header class="tit"><p class="k">Na Concept Car</p><h2>Como você é atendido</h2></header><ul class="difs">${diferenciais.map(d => `<li class="sobe">${ic('check')}<div><h3>${d[0]}</h3><p>${d[1]}</p></div></li>`).join('')}</ul></section>
<p class="cta-linha"><a class="btn" href="${wa}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p>
</div>
` + rodape(v);
  pag.oficina = head(v, 'oficina', 'A oficina', `Fotos da oficina da Concept Car na ${E.rua}, ${E.bairro}, Porto Alegre.`) + topo(v, 'oficina') + cab('A oficina', 'Av. Dr. Carlos Barbosa, 1066', 'elevadores') + `
<div class="in">
<p class="intro">Um galpão amplo no bairro Medianeira, com elevadores, área de diagnóstico e recepção. Clique nas fotos para ver maior.</p>
<section class="galeria g-of">${Object.keys(fotos).map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="visita"><div><h2>${E.convite}</h2><p>${E.horario}.</p></div><p class="bts"><a class="btn" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a><a class="btn btn-linha" href="${wa}" ${ext}>${icWa()}WhatsApp</a></p></section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Concept Car: ${E.rua}, ${E.bairro}, Porto Alegre. WhatsApp ${E.wa}, telefone ${E.fone}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Concept Car', 'entrada') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Conte o que o carro precisa</h2><p>Mande o modelo e o que ele está apresentando. A gente responde pelo WhatsApp.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', `${E.slogan}: ${E.areas.toLowerCase()} em Porto Alegre. ${E.rua}, ${E.bairro}.`) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Mecânica · Elétrica · Injeção eletrônica</p><h1>Um novo conceito em <em>reparação automotiva</em></h1><p>Oficina no bairro Medianeira, em Porto Alegre, aberta em 2010 por dois profissionais da reparação: Roger Ferrari, na elétrica e injeção, e Fernando Rexhausen, na mecânica.</p>
  <p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p></div>
  <figure class="hero-a-foto">${foto('elevadores', '', true)}</figure>
</div>
<div class="info-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>Medianeira, Porto Alegre</span></li>
  <li>${ic('relogio')}<span><b>Seg. a sex.</b>8h–12h e 13h30–18h</span></li>
  <li>${icWa()}<span><b>WhatsApp</b><a href="${wa}" ${ext}>${E.wa}</a></span></li>
</ul></div></div></section>
<section class="in areas-a"><header class="tit"><p class="k">Serviços</p><h2>Três frentes, uma oficina</h2></header><div class="areas-a-grade">${areas.map((a, i) => `<a class="area-a sobe" href="${link(v, 'servicos')}#s${i + 1}"><span class="n">0${i + 1}</span>${ic(a.ic)}<h3>${a.t}</h3><p>${a.d}</p><span class="link-seta">Ver mais ${ic('seta')}</span></a>`).join('')}</div></section>
<section class="origem-a"><div class="in origem-a-in"><div class="origem-a-foto">${foto('diagnostico')}</div><div><p class="k">Desde 1º de setembro de 2010</p><h2>Honestidade, custo compatível e reparo com qualidade</h2><p>${E.origem}</p><a class="link-seta" href="${link(v, 'quem-somos')}">Conheça a Concept Car ${ic('seta')}</a></div></div></section>
<section class="in socios-a-sec"><header class="tit"><p class="k">Os sócios</p><h2>A experiência por trás da oficina</h2></header><div class="socios-a">${socios.map(s => `<article class="sobe"><h3>${s.nome}</h3><p class="area">${s.area}</p><p>${s.txt[0]}</p></article>`).join('')}</div></section>
<section class="difs-a"><div class="in"><ul class="difs">${diferenciais.map(d => `<li class="sobe">${ic('check')}<div><h3>${d[0]}</h3><p>${d[1]}</p></div></li>`).join('')}</ul></div></section>
<section class="in galeria-a"><header class="tit"><p class="k">A oficina</p><h2>Venha conhecer</h2></header><div class="mosaico">${['salao', 'entrada', 'capos', 'portao'].map(f => foto(f)).join('')}</div><a class="link-seta" href="${link(v, 'oficina')}">Ver todas as fotos ${ic('seta')}</a></section>
<section class="in cta-a"><div><h2>${E.convite}</h2><p>${E.rua}, bairro Medianeira, Porto Alegre.</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}WhatsApp</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"', true)}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', `${E.slogan}: ${E.areas.toLowerCase()} em Porto Alegre. ${E.rua}, ${E.bairro}.`) + topo(v, 'index') + `
<section class="hero-b">${img('salao', ' loading="eager" fetchpriority="high"', true)}<div class="in hero-b-in">
  <p class="k">Medianeira · Porto Alegre · desde 2010</p><h1>Reparo bem feito,<br><em>com custo justo.</em></h1><p>${E.areas} para nacionais e importados. Orçamento gratuito e técnicos qualificados.</p>
  <p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}${E.wa}</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="citacao-b"><div class="in"><p class="k">Por que a Concept Car existe</p><blockquote>“…uma oficina que trabalhasse de forma honesta, com custo compatível, mas que acima de tudo realizasse o reparo com qualidade e seriedade.”</blockquote><p class="assin">Roger Ferrari e Fernando Rexhausen, sócios</p></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que fazemos</h2></header><ol>${areas.map((a, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#s${i + 1}"><b>0${i + 1}</b><span><strong>${a.t}</strong><small>${a.d}</small></span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="socios-b"><div class="in socios-b-in">${socios.map((s, i) => `<article class="sobe"><p class="k">${s.area}</p><h3>${s.nome}</h3><p>${s.txt[i === 0 ? 1 : 0]}</p></article>`).join('')}<a class="link-seta" href="${link(v, 'quem-somos')}">A história completa ${ic('seta')}</a></div></section>
<section class="in fotos-b"><div class="fotos-b-grade">${foto('diagnostico', 'f1')}${foto('elevadores', 'f2')}${foto('capos', 'f3')}</div><div class="fotos-b-txt"><p class="k">A oficina</p><h2>Av. Dr. Carlos Barbosa, 1066</h2><p>Galpão com elevadores e diagnóstico eletrônico, no bairro Medianeira.</p><ul class="lista-check">${diferenciais.map(d => `<li>${ic('check')}<span>${d[0]}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'oficina')}">Ver a oficina ${ic('seta')}</a></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>${E.convite}</h2><p>${E.horario}.</p></div><p class="bts"><a class="btn" href="${wa}" ${ext}>${icWa()}WhatsApp</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waNum);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss.replace(/\/\*v:([ab])\*\/[^\n]*\n/g, (l, x) => x === v ? l : ''));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#c5433f', fundo: '#17181a', claro: '#f1f0ed',
  fonteTitulo: "'Libre Bodoni',Georgia,serif", fonteTexto: "'Work Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com a faixa vermelha sobre o cinza das paredes da oficina e o logo em vermelho. Abre com o slogan do site atual e os dados de endereço, horário e WhatsApp à vista.', pontos: ['Mecânica, elétrica e injeção em três frentes', 'Os dois sócios e a história desde 2010', 'Pedido de orçamento direto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura e elegante, com títulos em serifa que acompanham o logo manuscrito. Abre na foto da oficina e destaca a frase que deu origem à Concept Car.', pontos: ['"Reparo bem feito, com custo justo."', 'Serviços numerados e sócios em destaque', 'WhatsApp sempre à vista'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
