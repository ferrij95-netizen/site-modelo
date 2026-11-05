// RVM Auto Center (RVM Motors Ltda., Vila Mariana, São Paulo). Gera public/{a,b}/ e a página de escolha.
// node clientes/rvmautocenter/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rvmautocenter https://rvmautocenter.com.br/)
// Textos tirados do site atual (rvmautocenter.com.br, WordPress/Divi, página única). Fotos reais: as 4 da oficina enviadas em 29/07/2024.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'RVM Auto Center', razao: 'RVM Motors Ltda.', curto: 'RVM', url: 'https://rvmautocenter.overtus.com.br/', antigo: 'https://rvmautocenter.com.br/',
  fone: '(11) 91180-8181', wa: '5511911808181', email: 'contato@rvmautocenter.com.br',
  rua: 'Rua Doutor Amâncio de Carvalho, 19', bairro: 'Vila Mariana', cidade: 'São Paulo/SP', cep: '04012-080',
};
const servicos = [
  { ic: 'oleo', id: 'oleo', t: 'Troca de óleo', d: 'Troca de óleo para manter o motor eficiente e durável, com produtos de qualidade para um funcionamento suave.' },
  { ic: 'chama', id: 'escapamento', t: 'Troca de escapamento', d: 'Troca e ajustes de escapamento para o carro rodar como deve e durar mais.' },
  { ic: 'volante', id: 'alinhamento', t: 'Alinhamento 3D e balanceamento', d: 'Alinhamento 3D e balanceamento para segurança e conforto na direção, com as rodas ajustadas e sem vibrações.' },
  { ic: 'disco', id: 'borracharia', t: 'Borracharia', d: 'Conserto de pneus para garantir a segurança e o desempenho do seu veículo.' },
  { ic: 'chave', id: 'mecanica', t: 'Mecânica em geral', d: 'Serviços de mecânica geral com equipe experiente, pronta para atender o que o seu carro precisar.' },
];
const fotos = {
  elevador: 'O elevador e a rampa de alinhamento 3D da oficina',
  oleos: 'As prateleiras de óleos lubrificantes da loja',
  ferramentas: 'Prensa hidráulica e o carrinho de ferramentas específicas',
  bancada: 'Bancada de trabalho, peças e a máquina de desmontar pneus',
};
const tam = [960, 540];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'a-oficina', nome: 'A oficina' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Aço escovado', b: 'Barra vermelha' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,700;1,800;1,900&family=Outfit:wght@400;500;600&family=Tomorrow:ital,wght@0,500;0,600;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[0]}" height="${tam[1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}-g.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#eef0f2', b: '#16171a' };
const tel = telHref(E.fone);
const wa = waHref(E.wa, 'Olá! Vim pelo site da RVM Auto Center e gostaria de agendar uma visita.');
const mapsQ = encodeURIComponent('Rua Doutor Amâncio de Carvalho, 19, Vila Mariana, São Paulo SP, 04012-080');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Mecânica, troca de óleo e alinhamento 3D na Vila Mariana` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Agende uma visita', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${E.fone}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const barra = '<span class="barra" aria-hidden="true"></span>';

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp e telefone</strong><a href="${wa}" ${ext}>${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da RVM Auto Center na Rua Doutor Amâncio de Carvalho, 19" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-wa="Olá! Vim pelo site da RVM Auto Center." data-numero="${E.wa}">
  <label>Seu nome*<input name="nome" required autocomplete="name"></label>
  <label>Carro (modelo e ano)<input name="carro"></label>
  <label>Serviço<select name="servico"><option value="">Escolha um serviço</option>${servicos.map(s => `<option>${s.t}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="msg" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="RVM Auto Center, página inicial"><img src="/assets/${logo}.webp" alt="RVM Auto Center" width="640" height="284"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    ${btnWa('Agendar', 'btn btn-topo')}
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="RVM Auto Center" width="640" height="284" loading="lazy"><p>Troca de óleo, troca de escapamento, alinhamento 3D e balanceamento, borracharia e mecânica em geral na Vila Mariana.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.nome} (${E.razao}). Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Falar com a RVM no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const listaServ = (v, cls = '') => `<ol class="servs ${cls}">${servicos.map((s, i) => `<li class="serv sobe" id="${s.id}"><span class="serv-n">/${String(i + 1).padStart(2, '0')}</span>${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol>`;
const garantia = 'Na RVM Auto Center, seu carro recebe o cuidado que merece. Nossa equipe de profissionais qualificados usa técnicas e equipamentos modernos para garantir a qualidade em todos os serviços. Seu veículo em perfeitas condições, com a garantia de 100% de satisfação.';
const experiencia = 'Com 20 anos de experiência no mercado automotivo, a RVM Auto Center é a sua escolha para manutenção e estilização de veículos. A dedicação à qualidade e o atendimento personalizado garantem que seu carro estará sempre em boas mãos.';

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Troca de óleo, troca de escapamento, alinhamento 3D e balanceamento, borracharia e mecânica em geral na Vila Mariana, São Paulo.') + topo(v, 'servicos') + cab('Serviços', 'Tudo o que o seu carro precisa, num endereço só', 'elevador') + `
<div class="in">
<p class="intro">Oferecemos uma ampla gama de serviços para que o seu veículo esteja sempre em perfeitas condições. Escolha o serviço e agende pelo WhatsApp.</p>
${listaServ(v, 'servs-pag')}
<section class="faixa-fotos">${foto('oleos')}${foto('bancada')}</section>
<p class="cta-linha">${btnWa()}${btnTel()}</p>
</div>
` + rodape(v);
  pag['a-oficina'] = head(v, 'a-oficina', 'A oficina', 'RVM Auto Center (RVM Motors Ltda.): 20 anos de experiência no mercado automotivo, garantia de satisfação e oficina equipada na Vila Mariana, São Paulo.') + topo(v, 'a-oficina') + cab('A oficina', 'Seu carro em boas mãos há mais de 20 anos', 'ferramentas') + `
<div class="in">
<section class="sobre-pag"><div><p class="k">${E.razao}</p><h2>20 anos de experiência</h2><p>${experiencia}</p></div><div><p class="k">Garantia</p><h2>Satisfação 100%</h2><p>${garantia}</p></div></section>
<section class="galeria">${Object.keys(fotos).map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="tripe"><div><b>Proteção</b><span>Manutenção em dia protege você e quem vai com você.</span></div><div><b>Conservação</b><span>Seu veículo como novo, como saiu de fábrica.</span></div><div><b>Dirigibilidade</b><span>Rodas alinhadas e balanceadas, direção sem vibração.</span></div></section>
<p class="cta-linha">${btnWa('Venha nos visitar')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `RVM Auto Center: ${E.rua}, ${E.bairro}, São Paulo. WhatsApp ${E.fone}. E-mail ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Agende uma visita', 'bancada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}${form()}</div><div>${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${barra}${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Troca de óleo, troca de escapamento, alinhamento 3D e balanceamento, borracharia e mecânica em geral na Vila Mariana, São Paulo. 20 anos de experiência.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">${barra}Vila Mariana · São Paulo</p><h1>Seu carro em <span>boas mãos.</span></h1><p>Troca de óleo, escapamento, alinhamento 3D e balanceamento, borracharia e mecânica em geral. Venha nos visitar e experimente o atendimento da RVM.</p>
  <p class="bts">${btnWa()}${btnTel()}</p></div>
  <figure class="hero-a-foto">${foto('elevador')}</figure>
</div>
<div class="in lista-a"><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.t}</a></li>`).join('')}</ul></div></section>
<section class="servs-a"><div class="in"><header class="tit"><p class="k">${barra}Serviços</p><h2>Cinco serviços, uma equipe só</h2></header>${listaServ(v)}<a class="link-seta" href="${link(v, 'servicos')}">Ver todos os serviços ${ic('seta')}</a></div></section>
<section class="in exp-a"><div class="exp-num"><b>20</b><span>anos de experiência no mercado automotivo</span></div><div><p class="k">${barra}${E.razao}</p><h2>Dirija como se fosse novo</h2><p>${experiencia}</p><a class="link-seta" href="${link(v, 'a-oficina')}">Conheça a oficina ${ic('seta')}</a></div></section>
<section class="fotos-a"><div class="in fotos-a-in">${foto('oleos', 'fa1')}${foto('ferramentas', 'fa2')}${foto('bancada', 'fa3')}</div></section>
<section class="in garantia-a"><div><p class="k">${barra}Garantia</p><h2>Satisfação 100%</h2></div><p>${garantia}</p></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Agende uma visita</h2><p>${E.rua}, ${E.bairro}, ${E.cidade}.</p></div><p class="bts">${btnWa('Chamar no WhatsApp')}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina na Vila Mariana, São Paulo: alinhamento 3D e balanceamento, troca de óleo e escapamento, borracharia e mecânica em geral. Agende pelo WhatsApp.') + topo(v, 'index') + `
<section class="hero-b">${img('elevador', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">RVM Auto Center · Vila Mariana</p><h1>Fazemos seu carro <em>rodar como novo.</em></h1><p>Alinhamento 3D, balanceamento, troca de óleo e escapamento, borracharia e mecânica em geral. Mais de 20 anos no mercado automotivo.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="nums-b"><div class="in nums-b-in"><div><b>20+</b><span>anos de experiência</span></div><div><b>3D</b><span>alinhamento e balanceamento</span></div><div><b>100%</b><span>garantia de satisfação</span></div><div><b>5</b><span>serviços num endereço só</span></div></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que fazemos</h2></header>${listaServ(v, 'servs-lista')}</section>
<section class="oficina-b"><div class="in oficina-b-in"><div class="oficina-b-fotos">${foto('oleos', 'o1')}${foto('ferramentas', 'o2')}${foto('bancada', 'o3')}</div><div><p class="k">A oficina</p><h2>Equipamento certo para cada serviço</h2><p>${garantia}</p><a class="link-seta" href="${link(v, 'a-oficina')}">Conheça a oficina ${ic('seta')}</a></div></div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Seu carro em boas mãos</h2><p>${E.rua}, ${E.bairro}. WhatsApp ${E.fone}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d3202a', fundo: '#16171a', claro: '#eef0f2',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: "'Outfit',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, em cinza-aço como as letras do logo, com o traço vermelho do "V" marcando cada seção. Títulos em itálico largo, no mesmo desenho do logo, e as fotos reais da oficina.', pontos: ['"Seu carro em boas mãos."', 'Os 5 serviços numerados', 'Agendamento pelo WhatsApp em todas as páginas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Escura, em grafite com uma barra vermelha inclinada. Abre na foto do elevador com "Fazemos seu carro rodar como novo" e mostra os números da oficina em destaque.', pontos: ['Foto do elevador em tela cheia', '20+ anos, alinhamento 3D e 100% de garantia', 'Formulário que abre o WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
