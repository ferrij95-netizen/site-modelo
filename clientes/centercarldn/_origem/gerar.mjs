// Center Car (Rua da Lua, 60, Londrina/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/centercarldn/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs centercarldn http://www.centercarldn.com/)
// Textos tirados do site atual (centercarldn.com, modelo de 2016 da Studio Leap). As fotos do site atual são as do modelo (banco de imagens).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Center Car', url: 'https://centercarldn.overtus.com.br/', antigo: 'http://www.centercarldn.com/',
  fone: '(43) 3025-2818', cel: '(43) 9838-5402', email: 'ola@centercarldn.com', face: 'https://www.facebook.com/centercarldn',
  rua: 'Rua da Lua, 60', cidade: 'Londrina/PR', cep: '86070-250',
  horario: 'Segunda a sábado, das 8h às 18h',
};
const pilares = [
  { t: 'Confiança', d: 'Se você quer a qualidade que se espera de uma excelente mecânica, mas com uma atmosfera mais pessoal e amigável, chegou ao lugar certo.' },
  { t: 'Especialização', d: 'Investimos em ferramentas especializadas e em softwares de diagnóstico feitos para o sistema eletrônico do seu veículo.' },
  { t: 'Garantia', d: 'A oficina atende uma variedade de serviços especializados. Todo trabalho é feito com cuidado, para a sua garantia.' },
];
const servicos = [
  { ic: 'engrenagem', t: 'Transmissão', d: 'Câmbios automatizados, a especialidade da casa.' },
  { ic: 'medidor', t: 'Motor', d: 'Diagnóstico no motor com software específico para o seu veículo.' },
  { ic: 'oleo', t: 'Lubrificantes e filtros', d: 'Troca do lubrificante conforme a quilometragem correta.' },
  { ic: 'disco', t: 'Correias', d: 'Correias e mangueiras.' },
  { ic: 'escudo', t: 'Freio', d: '' },
  { ic: 'volante', t: 'Direção e suspensão', d: '' },
  { ic: 'carro', t: 'Rodas', d: '' },
  { ic: 'floco', t: 'Refrigeração', d: '' },
];
const marcas = ['Audi', 'BMW', 'Chevrolet', 'Citroën', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Peugeot', 'Renault', 'Toyota', 'Volkswagen', 'Outra'];
const horarios = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const fotos = {
  motor: 'Mecânico trabalhando no motor', pneus: 'Pneus e elevador na oficina', vareta: 'Conferindo o nível do óleo pela vareta',
  alternador: 'Alternador e correia do motor', scanner: 'Diagnóstico eletrônico com scanner', oleo: 'Troca de lubrificante',
};
const tam = { motor: [1600, 500], pneus: [1600, 500], vareta: [1600, 500], alternador: [1600, 1000], scanner: [390, 260], oleo: [390, 260] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'agendamento', nome: 'Agendar visita' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Agenda aberta', b: 'Painel' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@500;600;700&family=Golos+Text:wght@400;500;600&family=Antonio:wght@500;700&family=Rubik:wght@400;500;600&family=Sometype+Mono:wght@500&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#E51529', b: '#25282A' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Rua da Lua, 60, Londrina PR, 86070-250');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica e câmbio automatizado em Londrina` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnAgenda = (v, txt = 'Agendar visita', cls = 'btn') => `<a class="${cls}" href="${link(v, 'agendamento')}">${ic('calendario')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

const formAgenda = (compacto = false) => `<form class="form agenda" data-email="${E.email}" data-assunto="Agendamento pelo site">
  <div class="form-duas"><label>Seu nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Marca do veículo*<select name="marca" required><option value="">Selecione</option>${marcas.map(m => `<option>${m}</option>`).join('')}</select></label><label>Ano do veículo<input name="ano" inputmode="numeric" maxlength="4"></label></div>
  ${compacto ? '' : `<label>Km do veículo<input name="km" inputmode="numeric"></label>`}
  <div class="form-duas"><label>Data da visita*<input name="data" type="date" required></label><label>Horário*<select name="horario" required><option value="">Selecione</option>${horarios.map(h => `<option>${h}</option>`).join('')}</select></label></div>
  <label>Serviço*<select name="servico" required><option value="">Selecione</option>${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro / não sei</option></select></label>
  ${compacto ? '' : `<label>Conte o que está acontecendo<textarea name="obs" rows="4"></textarea></label>`}
  <button class="btn" type="submit">${ic('calendario')}Agendar visita</button>
  <p class="form-nota">Abre o seu e-mail com o pedido pronto para a Center Car. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Comercial</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('tel')}<div><strong>Celular</strong><a href="${telHref(E.cel)}">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.cidade}</span><span>CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Center Car na Rua da Lua, 60, Londrina" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Center Car, página inicial"><img src="/assets/${logo}.webp" alt="Center Car" width="792" height="152"></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Center Car" width="792" height="152" loading="lazy"><p>Oficina mecânica especializada em câmbios automatizados, em Londrina.</p><a class="rod-face" href="${E.face}" ${ext} aria-label="Facebook da Center Car">${ic('face')}</a></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg. a sáb., 8h–18h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Center Car. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Center Car">${ic('tel')}</a>
</body>
</html>
`;
}

const servLista = (cls = '') => `<ul class="serv-lista ${cls}">${servicos.map((s, i) => `<li class="sobe">${ic(s.ic)}<span class="sn">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.t}</h3>${s.d ? `<p>${s.d}</p>` : ''}</div></li>`).join('')}</ul>`;
const socorro = (v) => `<section class="socorro"><div class="in socorro-in"><div><p class="k">Assistência local</p><h2>Seu carro quebrou e você ficou na mão?</h2><p>Não se preocupe: a Center Car pode ajudar com manutenção no local ou remoção do veículo.</p></div><p class="bts">${btnTel(`Ligar ${E.fone}`)}<a class="btn btn-linha" href="${telHref(E.cel)}">${ic('tel')}${E.cel}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.servicos = head(v, 'servicos', 'Serviços', 'Câmbio automatizado, diagnóstico no motor, lubrificantes e filtros, correias e mangueiras, freio, direção e suspensão, rodas e refrigeração. Center Car, Londrina.') + topo(v, 'servicos') + cab('Serviços', 'Uma gama completa de serviços mecânicos', 'alternador') + `
<div class="in">
<p class="intro">Todos os serviços são feitos por mecânicos altamente qualificados. A especialidade da casa é o câmbio automatizado.</p>
${servLista('serv-pag')}
<section class="duas-fotos"><figure class="sobe">${img('scanner')}<figcaption>Diagnóstico no motor</figcaption></figure><figure class="sobe">${img('oleo')}<figcaption>Lubrificação e filtros</figcaption></figure><div class="duas-txt"><p class="k">Faça seu carro durar mais tempo</p><h2>Troque o lubrificante na quilometragem certa</h2><p>Agende a troca de óleo e escolha o dia e o horário que forem melhores para você.</p>${btnAgenda(v, 'Agendar troca de óleo')}</div></section>
</div>
` + socorro(v) + rodape(v);
  pag.agendamento = head(v, 'agendamento', 'Agendar visita', 'Agende sua visita à Center Car: escolha a data, o horário e o serviço. Rua da Lua, 60, Londrina. Telefone (43) 3025-2818.') + topo(v, 'agendamento') + cab('Agendar visita', 'Escolha o dia e o horário. A gente espera você.', 'vareta') + `
<div class="in"><section class="agenda-pag">
  <div class="agenda-txt"><p>Para a sua comodidade, a Center Car trabalha com agendamento. Preencha os campos e compareça no dia e horário escolhidos.</p>
  <ol class="passos">${['Escolha a data e o horário', 'Diga a marca, o ano e a quilometragem', 'Marque o serviço que precisa', 'Compareça no dia agendado'].map((p, i) => `<li><span>${i + 1}</span>${p}</li>`).join('')}</ol>
  <p class="agenda-tel">Prefere falar com alguém? ${btnTel(E.fone, 'link-seta')}</p></div>
  ${formAgenda()}
</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Center Car: ${E.rua}, Londrina/PR, CEP ${E.cep}. Comercial ${E.fone}, celular ${E.cel}. ${E.horario}.`) + topo(v, 'contato') + cab('Contato', 'Olá, ligue para nós', 'pneus') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p></div><div>${mapaFrame}</div></section></div>
` + socorro(v) + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><figure class="tit-a-foto">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', 'Oficina mecânica especializada em câmbios automatizados em Londrina. Diagnóstico no motor, troca de óleo e filtros, correias, freios e suspensão. Agende sua visita.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Oficina mecânica em Londrina</p><h1>Especialistas em câmbio automatizado</h1><p>Mecânicos qualificados, ferramentas especializadas e software de diagnóstico para o seu veículo, com um atendimento pessoal e amigável.</p>
  <ul class="hero-a-dados"><li>${ic('pin')}${E.rua}</li><li>${ic('relogio')}Seg. a sáb., 8h–18h</li><li>${ic('tel')}<a href="${tel}">${E.fone}</a></li></ul></div>
  <div class="hero-a-form"><p class="hero-a-form-t">${ic('calendario')}Agende sua visita</p>${formAgenda(true)}</div>
</div></section>
<figure class="faixa-a">${img('motor', ' fetchpriority="high"')}</figure>
<section class="in pilares-a"><header class="tit"><p class="k">Por que a Center Car</p><h2>Uma das principais oficinas especializadas em câmbio automatizado de Londrina</h2></header>
<div class="pilares-grade">${pilares.map((p, i) => `<article class="sobe"><span class="n">0${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></section>
<section class="servs-a"><div class="in servs-a-in"><div class="servs-a-cab"><p class="k">Serviços</p><h2>Do câmbio às correias</h2><p>Nós oferecemos uma gama completa de serviços mecânicos de qualidade.</p><a class="link-seta" href="${link(v, 'servicos')}">Ver todos os serviços ${ic('seta')}</a></div>${servLista()}</div></section>
<section class="in oleo-a"><figure>${img('vareta')}</figure><div><p class="k">Faça seu carro durar mais tempo</p><h2>Troque o lubrificante conforme a quilometragem correta</h2><p>Escolha a data e o horário da troca de óleo e evite esperar.</p>${btnAgenda(v, 'Agendar troca de óleo')}</div></section>
` + socorro(v) + `
<section class="in cta-a"><div><h2>Venha conhecer a Center Car</h2><p>${E.rua}, ${E.cidade}. ${E.horario}.</p></div><p class="bts">${btnAgenda(v)}${btnMapa()}</p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', 'Faça seu carro durar mais tempo. Center Car, oficina especializada em câmbios automatizados em Londrina: diagnóstico, troca de óleo, correias, freio e suspensão.') + topo(v, 'index') + `
<section class="hero-b">${img('vareta', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Câmbio automatizado · Londrina</p><h1>Faça seu carro durar mais tempo</h1><p>Troque o lubrificante na quilometragem correta e deixe o câmbio com quem é especialista.</p>
  <p class="bts">${btnAgenda(v)}${btnTel(E.fone, 'btn btn-linha')}</p>
</div></section>
<section class="barra-b"><div class="in barra-b-in"><span>${ic('pin')}${E.rua}, Londrina</span><span>${ic('relogio')}Seg. a sáb., 8h às 18h</span><span>${ic('calendario')}Atendimento com hora marcada</span></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que a oficina faz</h2></header>${servLista('serv-tab')}<a class="link-seta" href="${link(v, 'servicos')}">Detalhes dos serviços ${ic('seta')}</a></section>
<section class="pilares-b"><div class="in pilares-b-in"><h2>Confiança, especialização e garantia</h2><div class="pilares-b-lista">${pilares.map(p => `<article class="sobe"><h3>${p.t}</h3><p>${p.d}</p></article>`).join('')}</div></div></section>
<section class="in agenda-b"><div><p class="k">Como agendar</p><h2>Hora marcada, sem fila</h2><ol class="passos">${['Escolha a data e o horário', 'Diga a marca, o ano e a quilometragem', 'Marque o serviço que precisa', 'Compareça no dia agendado'].map((p, i) => `<li><span>${i + 1}</span>${p}</li>`).join('')}</ol>${btnAgenda(v, 'Abrir agendamento')}</div><figure>${img('alternador')}</figure></section>
` + socorro(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#E51529', fundo: '#25282A', claro: '#f4f6f7',
  fonteTitulo: "'Bai Jamjuree',system-ui,sans-serif", fonteTexto: "'Golos Text',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4, texto: 'Clara, em branco e no vermelho da marca. Abre com "Especialistas em câmbio automatizado" e o agendamento já na primeira tela, como o site atual propõe.', pontos: ['Agendamento logo no topo', 'Confiança, especialização e garantia', 'Assistência local em destaque'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4, texto: 'Cinza-aço com grafite e vermelho, letras altas e condensadas. Abre com "Faça seu carro durar mais tempo" e mostra os serviços como uma tabela numerada.', pontos: ['Serviços numerados de 01 a 08', 'Passo a passo do agendamento', 'Horário e endereço numa barra fixa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
