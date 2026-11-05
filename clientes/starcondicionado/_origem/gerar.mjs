// STAR Ar Condicionado Automotivo (Vila Leopoldina, São Paulo). Gera public/{a,b}/ e a página de escolha.
// node clientes/starcondicionado/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs starcondicionado http://www.starcondicionado.com.br/)
// Textos tirados do site atual (starcondicionado.com.br, © 2014, Guaraná Digital). Imagens: as do site atual (banner e chamadas), em webp.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'STAR Ar Condicionado Automotivo', curto: 'STAR', url: 'https://starcondicionado.overtus.com.br/', antigo: 'http://www.starcondicionado.com.br/',
  fone: '(11) 3831-1001', fone2: '(11) 2307-2894', email: 'star.arcondicionado@hotmail.com',
  rua: 'Rua Guaipá, 1458', ref: 'em frente ao Bradesco', bairro: 'Vila Leopoldina', cidade: 'São Paulo/SP', cep: '05089-000',
};
const tel = telHref(E.fone), tel2 = telHref(E.fone2);
const servicos = [
  { id: 'manutencao', ic: 'chave', t: 'Manutenção', sub: 'Não está gelando? Parou de funcionar?', d: 'Traga até nossa oficina e iremos fazer uma avaliação sem compromisso para que você fique sabendo a causa do problema. Nossa equipe possui mão de obra especializada e opera equipamentos novos, da mais nova tecnologia, para detecção de problemas e a correta solução.', itens: ['Revisão preventiva e corretiva', 'Recarga de gás', 'Instalação ou troca de componentes'] },
  { id: 'conforto', ic: 'floco', t: 'Conforto', sub: 'Ar fraco ou com cheiro desagradável?', d: 'Você e sua família merecem se deslocar com conforto e segurança dentro do seu carro. Não deixe para amanhã a revisão do sistema de ar condicionado do seu veículo. Traga até nossa loja e fazemos uma avaliação para que você possa seguir com a comodidade que o ar condicionado pode proporcionar.', itens: ['Manutenção do sistema', 'Higienização', 'Reparos em compressores'] },
  { id: 'higiene', ic: 'escudo', t: 'Higiene', sub: 'Cheiro de mofo é sinal de alerta', d: 'A correta manutenção do ar condicionado do carro é fundamental para a saúde dos ocupantes do veículo. O sistema pode acumular fungos e bactérias nocivas que se espalham pelo ar toda vez que ligamos o aparelho. Se o ar condicionado do seu carro está exalando um cheiro forte, está na hora de fazer a higienização do sistema.', itens: ['Higienização do sistema', 'Troca de filtro do ar', 'Aplicação de produto antifungo e antibactericida'] },
];
const lista4 = ['Manutenção', 'Instalação de ar condicionado', 'Carga de gás', 'Higienização do sistema'];
const motivos = [
  { t: 'Resfrie o ambiente', d: 'Ter o ar condicionado do carro funcionando em perfeitas condições não é luxo hoje em dia, e sim necessidade.' },
  { t: 'Cuide da sua saúde', d: 'O ar condicionado pode abrigar diversos agentes causadores de alergias ou doenças. Poupe a saúde de sua família fazendo a higienização do sistema.' },
  { t: 'Bem-estar da sua família', d: 'A saúde e o bem-estar podem acompanhar você e sua família no carro. Faça a manutenção e evite odores indesejados.' },
];
const publico = ['Concessionárias', 'Frotistas', 'Consumidores finais'];
const depo = { t: 'O ar condicionado do meu carro estava soltando um cheiro insuportável. A STAR da rua Guaipá resolveu o problema em algumas horas. Fiquei satisfeita.', a: 'Ellen Rosa', c: 'proprietária de um Honda Fit' };
const fotos = {
  saidas: 'Saídas de ar no painel de um carro', recarga: 'Máquina de recarga de gás ligada a um carro', transito: 'Trânsito parado em São Paulo, com o termômetro de rua marcando 38 °C',
  painel: 'Ar frio saindo das saídas do painel', familia: 'Crianças no banco de trás do carro', acaro: 'Ilustração de um ácaro sobre o painel do carro',
};
const tam = { saidas: [654, 356], recarga: [654, 356], transito: [654, 356], painel: [395, 196], familia: [300, 116], acaro: [300, 116] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'higienizacao', nome: 'Higienização' }, { slug: 'a-star', nome: 'A STAR' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ar fresco', b: '38 °C' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@600;700;800&family=Rubik:wght@400;500;600&family=Bai+Jamjuree:wght@500;600;700&family=Golos+Text:wght@400;500;700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#00509a', b: '#15181c' };
const mapsQ = encodeURIComponent('Rua Guaipá, 1458, Vila Leopoldina, São Paulo SP, 05089-000');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Vila Leopoldina, São Paulo` : `${titulo} | STAR Ar Condicionado Automotivo`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const btnOrc = (v, cls = 'btn btn-linha') => `<a class="${cls}" href="${link(v, 'contato')}#mensagem">${ic('mail')}Enviar mensagem</a>`;
const horario = `<span>Segunda a sexta, das 8h às 18h</span><span>Sábados, das 8h às 14h</span>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${tel}">${E.fone}</a><a href="${tel2}">${E.fone2}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong>${horario}</div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua} (${E.ref})</span><span>${E.bairro}, ${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da STAR na Rua Guaipá, 1458" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" id="mensagem" data-email="${E.email}" data-assunto="Contato pelo site da STAR" novalidate>
  <label>Nome*<input name="nome" required autocomplete="name"></label>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Carro (modelo e ano)<input name="carro"></label>
  <label>Mensagem*<textarea name="mensagem" required placeholder="Ex.: o ar não está gelando, está com cheiro de mofo…"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta. Se preferir, ligue: ${E.fone}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="STAR Ar Condicionado Automotivo, página inicial"><img src="/assets/${logo}.webp" alt="STAR Ar Condicionado Automotivo" width="615" height="307"></a>
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
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="STAR Ar Condicionado Automotivo" width="615" height="307" loading="lazy"><p>Se o ar condicionado do seu veículo não gela, entre em contato e venha fazer uma avaliação do problema sem compromisso.</p></div>
    <div><h3>Serviços</h3><ul>${lista4.map(s => `<li><a href="${link(v, 'servicos')}">${s}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${tel}">${E.fone}</a><br><a href="${tel2}">${E.fone2}</a></span></li>
      <li>${ic('pin')}<span>${E.rua} (${E.ref})<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–18h<br>Sáb., 8h–14h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} STAR Ar Condicionado Automotivo. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a STAR">${ic('tel')}</a>
</body>
</html>
`;
}

const servBloco = (s, i) => `<article class="serv sobe" id="${s.id}"><div class="serv-cab"><span class="n">0${i + 1}</span>${ic(s.ic)}</div><h3>${s.t}</h3><p class="sub">${s.sub}</p><p>${s.d}</p><ul class="lista-check">${s.itens.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul></article>`;
const depoBloco = () => `<figure class="depo"><blockquote>“${depo.t}”</blockquote><figcaption><b>${depo.a}</b>, ${depo.c}</figcaption></figure>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção, recarga de gás, instalação e troca de componentes, reparos em compressores e higienização do ar condicionado automotivo. Avaliação sem compromisso na Vila Leopoldina, SP.') + topo(v, 'servicos') + cab('Serviços', 'Conheça o que podemos fazer pelo ar condicionado do seu veículo', 'recarga') + `
<div class="in">
<p class="intro">A STAR está preparada para corrigir qualquer problema do ar condicionado do seu veículo. Antes de qualquer serviço, fazemos uma avaliação sem compromisso para você saber a causa do problema.</p>
<section class="servs servs-pag">${servicos.map(servBloco).join('')}</section>
<p class="cta-linha">${btnTel('Ligar para agendar a avaliação')}${btnOrc(v)}</p>
</div>
` + rodape(v);
  pag.higienizacao = head(v, 'higienizacao', 'Higienização', 'Ar condicionado com cheiro de mofo? Higienização do sistema, troca do filtro e aplicação de produto antifungo e antibactericida. STAR, Vila Leopoldina, São Paulo.') + topo(v, 'higienizacao') + cab('Higienização', 'Cheiro de mofo no ar do carro? Está na hora de higienizar', 'painel') + `
<div class="in">
<section class="hig-pag">
  <div class="hig-txt"><p class="intro">${servicos[2].d}</p>
    <h2>O que fazemos na higienização</h2><ol class="passos">${servicos[2].itens.map((x, i) => `<li class="sobe"><span class="n">${i + 1}</span><b>${x}</b></li>`).join('')}</ol>
  </div>
  <aside class="hig-lado">${depoBloco()}</aside>
</section>
<section class="motivos-pag">${motivos.slice(1).map((m, i) => `<article class="sobe"><figure>${img(i ? 'familia' : 'acaro')}</figure><h3>${m.t}</h3><p>${m.d}</p></article>`).join('')}</section>
<p class="cta-linha">${btnTel('Agendar a higienização')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag['a-star'] = head(v, 'a-star', 'A STAR', 'A STAR atende concessionárias, frotistas e consumidores finais com profissionalismo, atenção e honestidade. Oficina de ar condicionado automotivo na Rua Guaipá, Vila Leopoldina.') + topo(v, 'a-star') + cab('A STAR', 'Ar condicionado automotivo com profissionalismo, atenção e honestidade', 'saidas') + `
<div class="in">
<section class="sobre-pag">
  <div><p class="intro">A STAR está preparada para corrigir qualquer problema do ar condicionado do seu veículo. Prestamos serviços para concessionárias, frotistas e consumidores finais com profissionalismo, atenção e honestidade.</p>
  <p>Nossa equipe possui mão de obra especializada e opera equipamentos novos, da mais nova tecnologia, para detecção de problemas e a correta solução. Ficamos na Rua Guaipá, na Vila Leopoldina, zona oeste de São Paulo.</p></div>
  <div class="publico"><p class="k">Quem atendemos</p><ul>${publico.map(p => `<li>${p}</li>`).join('')}</ul></div>
</section>
<section class="motivos-sobre">${motivos.map((m, i) => `<article class="sobe"><span class="n">0${i + 1}</span><h2>${m.t}</h2><p>${m.d}</p></article>`).join('')}</section>
<section class="depo-sobre">${depoBloco()}</section>
<p class="cta-linha">${btnTel()}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `STAR Ar Condicionado Automotivo: ${E.rua} (${E.ref}), Vila Leopoldina, São Paulo. Telefones ${E.fone} e ${E.fone2}. Segunda a sexta, 8h às 18h; sábados, 8h às 14h.`) + topo(v, 'contato') + cab('Contato', 'Envie uma mensagem, ligue ou venha até nossa loja', 'transito') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div><h2 class="form-tit">Envie uma mensagem</h2>${form()}</div></section>
<section class="mapa-pag">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div><div class="aletas" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina de ar condicionado automotivo na Vila Leopoldina, São Paulo: manutenção, carga de gás, instalação e higienização. Avaliação sem compromisso. Rua Guaipá, 1458.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Ar condicionado automotivo · Vila Leopoldina</p><h1>Até quando você vai continuar <em>passando calor?</em></h1><p>O ar condicionado do seu carro não funciona bem? A STAR corrige qualquer problema do sistema, com avaliação sem compromisso antes do serviço.</p>
  <p class="bts">${btnTel()}${btnOrc(v)}</p></div>
  <figure class="hero-a-foto">${img('saidas', ' loading="eager" fetchpriority="high"')}</figure>
</div><div class="aletas" aria-hidden="true"></div></section>
<section class="faixa-a"><div class="in"><ul>
  ${lista4.map(s => `<li>${ic('floco')}<span>${s}</span></li>`).join('')}
</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Manutenção, conforto e higiene</h2><p>Revisão preventiva e corretiva, recarga de gás, reparos em compressores e higienização do sistema.</p></header><div class="servs">${servicos.map(servBloco).join('')}</div><a class="link-seta" href="${link(v, 'servicos')}">Ver os serviços em detalhe ${ic('seta')}</a></section>
<section class="recarga-a"><div class="in recarga-a-in"><figure>${img('recarga')}</figure><div><p class="k">Equipamento</p><h2>Equipamentos novos para achar a causa certa</h2><p>Nossa equipe tem mão de obra especializada e opera equipamentos da mais nova tecnologia para detectar o problema e aplicar a correta solução. Você fica sabendo o que o carro tem antes de decidir.</p><ul class="publico-linha">${publico.map(p => `<li>${p}</li>`).join('')}</ul></div></div></section>
<section class="in motivos-a">${motivos.map((m, i) => `<article class="sobe"><span class="n">0${i + 1}</span><h3>${m.t}</h3><p>${m.d}</p></article>`).join('')}</section>
<section class="in depo-a">${depoBloco()}<a class="link-seta" href="${link(v, 'higienizacao')}">Sobre a higienização ${ic('seta')}</a></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>O ar do seu carro não gela?</h2><p>Venha fazer uma avaliação sem compromisso. ${E.rua}, ${E.ref}, ${E.bairro}.</p></div><p class="bts">${btnTel()}${btnMapa('btn btn-claro')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Ar condicionado do carro não gela? Manutenção, recarga de gás, reparos em compressores e higienização na Vila Leopoldina, São Paulo. Avaliação sem compromisso.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="leitor" aria-hidden="true"><span>Lá fora</span><b>38<i>°C</i></b></p><h1>Até quando você vai continuar passando calor?</h1><p>Manutenção, recarga de gás e higienização do ar condicionado automotivo, na Rua Guaipá, Vila Leopoldina.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
  <figure class="hero-b-foto">${img('transito', ' loading="eager" fetchpriority="high"')}<figcaption>${fotos.transito}</figcaption></figure>
</div></section>
<section class="painel-b"><div class="in"><ol class="leituras">${lista4.map((s, i) => `<li class="sobe"><span class="n">0${i + 1}</span><b>${s}</b></li>`).join('')}</ol></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Avaliação sem compromisso, depois a solução</h2></header><div class="servs servs-lista">${servicos.map(servBloco).join('')}</div></section>
<section class="frio-b"><div class="in frio-b-in"><figure>${img('saidas')}</figure><div><p class="k">Quem atendemos</p><h2>Concessionárias, frotistas e consumidores finais</h2><p>Com profissionalismo, atenção e honestidade. Equipe especializada e equipamentos novos, da mais nova tecnologia, para achar a causa e aplicar a correta solução.</p><a class="link-seta" href="${link(v, 'a-star')}">Conheça a STAR ${ic('seta')}</a></div></div></section>
<section class="in hig-b"><div><p class="k">Higienização</p><h2>Cheiro de mofo é sinal de alerta</h2><p>O sistema pode acumular fungos e bactérias que se espalham pelo ar toda vez que você liga o aparelho. Higienização do sistema, troca do filtro e produto antifungo e antibactericida.</p><a class="link-seta" href="${link(v, 'higienizacao')}">Como fazemos ${ic('seta')}</a></div>${depoBloco()}</section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Traga o carro para uma avaliação</h2><p>Segunda a sexta, das 8h às 18h. Sábados, das 8h às 14h.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#00509a', fundo: '#15181c', claro: '#eef3f8',
  fonteTitulo: "'Encode Sans Condensed',Arial Narrow,sans-serif", fonteTexto: "'Rubik',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, no azul do logo da STAR, com títulos condensados como os do site atual e linhas que lembram as aletas de uma saída de ar. Abre com a pergunta do site atual: "Até quando você vai continuar passando calor?"', pontos: ['Os 4 serviços logo abaixo do topo', 'Avaliação sem compromisso em destaque', 'Telefone sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, em grafite e azul, com um mostrador de 38 °C como o termômetro de rua da foto do trânsito. Os serviços aparecem como leituras de painel.', pontos: ['Mostrador de temperatura no topo', 'Higienização e depoimento lado a lado', 'Horário e endereço no fechamento'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
