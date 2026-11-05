// Auto Veloce Premium Service (Av. Brasil, 2791, Uberlândia/MG). Gera public/{a,b}/ e a página de escolha.
// node clientes/autoveloce/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs autoveloce http://www.autoveloce.com.br/)
// Textos tirados do site atual (autoveloce.com.br, sistema Garaje). Fotos: banners, institucional e equipe do próprio site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Auto Veloce Premium Service', curto: 'Auto Veloce', url: 'https://autoveloce.overtus.com.br/', antigo: 'http://www.autoveloce.com.br/',
  fone: '(34) 3227-7777', cel: '(34) 99867-7778', waNum: '5534998677778',
  rua: 'Av. Brasil, 2791', cidade: 'Uberlândia/MG',
  face: 'https://www.facebook.com/autoveloce.premiumservice/', insta: 'https://www.instagram.com/autoveloceoficial/',
};
const sobre = 'Oficina mecânica especializada em injeção eletrônica, suspensão, troca de óleo, amortecedores, câmbio e motor de autos nacionais e importados.';
const especialidades = [
  { ic: 'painel', t: 'Injeção eletrônica' },
  { ic: 'carro', t: 'Suspensão' },
  { ic: 'disco', t: 'Amortecedores' },
  { ic: 'oleo', t: 'Troca de óleo' },
  { ic: 'engrenagem', t: 'Câmbio' },
  { ic: 'chave', t: 'Motor' },
];
const servicos = [
  { t: 'Alinhamento e balanceamento', d: 'Alinhamento 3D com altíssima precisão e balanceamento especializado.', foto: 'alinhamento' },
  { t: 'Troca de óleo e filtros', d: 'Óleo, filtro de óleo e filtros de ar do motor, do ar-condicionado e de combustível.', foto: 'oficina' },
];
const realizado = { t: 'Troca de amortecedor do Nissan March', d: 'Manutenção e troca de amortecedor e bucha da bandeja do Nissan March.' };
const equipe = [
  { nome: 'Mariella', foto: 'mariella', papel: 'Gerente', d: 'Experiência em gestão de empresas. Atua no segmento há mais de 5 anos.' },
  { nome: 'Joaquim', foto: 'joaquim', papel: 'Gerente', d: 'Especialista em carros. Atua há mais de 15 anos no ramo de mecânica.' },
];
const dicas = [
  { t: 'Pneus novos: atrás ou na frente?', d: 'Seja o seu carro de tração dianteira, traseira ou 4x4, recomendamos montar os pneus novos ou menos gastos no eixo traseiro. Eles dão mais segurança em situações imprevistas e difíceis, como uma frenagem de emergência ou uma curva fechada, sobretudo com o piso molhado.' },
  { t: 'Os pneus têm data de validade', d: 'E ela é de cinco anos a partir da data de fabricação. A data vem num número na lateral do pneu, perto da palavra DOT: os dois primeiros algarismos indicam a semana e os últimos, o ano. Por exemplo, 4219 indica um pneu fabricado na 42ª semana de 2019.' },
  { t: 'Bolhas no pneu: o que fazer?', d: 'Se o pneu apresentar bolhas e você não conseguir trazer o carro até a Auto Veloce, é importante saber como proceder. Fale com a gente antes de seguir viagem.' },
  { t: 'Mantenha o vidro sempre limpo', d: 'Faça chuva ou faça sol, uma palheta saudável faz toda a diferença para a sua segurança. Não deixe as palhetas ressecarem: traga o carro na Auto Veloce e verificamos a saúde delas.' },
];
const promo = { t: 'Desconto para associados Algar', d: 'Descontos em todos os serviços para associados Algar. É só apresentar o crachá.' };
const fotos = {
  fachada: 'A fachada da Auto Veloce na Av. Brasil, 2791', 'fachada-noite': 'A oficina à noite, com as portas de vidro abertas', salao: 'O salão de atendimento, com os carros nos elevadores',
  'noite-elevadores': 'Os elevadores vistos da rua, à noite', oficina: 'Carros em atendimento na oficina', caminhao: 'Um caminhão antigo em frente à oficina',
  alinhamento: 'Um SUV no alinhamento 3D', mariella: 'Mariella, gerente da Auto Veloce', joaquim: 'Joaquim, gerente da Auto Veloce',
  'salao-v': 'O salão de atendimento', 'fachada-av': 'O letreiro "AV" na fachada',
};
const tam = { fachada: [1000, 465], 'fachada-noite': [1000, 465], salao: [1000, 465], 'noite-elevadores': [526, 394], oficina: [600, 600], caminhao: [800, 450], alinhamento: [800, 565], mariella: [600, 600], joaquim: [600, 600], 'salao-v': [372, 465], 'fachada-av': [395, 465] };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-empresa', nome: 'A empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'dicas', nome: 'Você sabia?' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Vitrine', b: 'Alinhamento' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,600;0,800;1,700;1,800;1,900&family=Sarabun:wght@400;500;600;700&family=Goldman:wght@400;700&family=Kumbh+Sans:wght@400;500;600;700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam[n][0]}" height="${tam[n][1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#ff752c', b: '#121a2b' };
const tel = telHref(E.fone);
const wa = waHref(E.waNum, 'Olá! Vim pelo site da Auto Veloce.');
const mapsQ = encodeURIComponent('Av. Brasil, 2791, Uberlândia MG');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica em Uberlândia` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Chamar no WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa}" ${ext}>${icWa()}${txt}</a>`;
const btnTel = (txt = E.fone, cls = 'btn btn-linha') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><a href="${E.insta}" ${ext}>@autoveloceoficial</a><a href="${E.face}" ${ext}>Facebook da Auto Veloce</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Auto Veloce na Av. Brasil, 2791" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-wa="Olá! Vim pelo site da Auto Veloce." data-numero="${E.waNum}">
  <div class="form-duas"><label>Seu nome*<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Veículo<input name="veiculo" placeholder="Marca, modelo e ano"></label><label>Assunto*<select name="assunto" required><option value="">Selecione</option>${['Orçamento', 'Alinhamento e balanceamento', 'Troca de óleo e filtros', 'Suspensão e amortecedores', 'Injeção eletrônica', 'Câmbio ou motor', 'Outro assunto'].map(o => `<option>${o}</option>`).join('')}</select></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Auto Veloce, pronta para enviar.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<div class="faixa-topo"><div class="in faixa-in"><a href="${tel}">${ic('tel')}${E.fone}</a><span>${ic('pin')}${E.rua} · ${E.cidade}</span><a class="faixa-wa" href="${wa}" ${ext}>${icWa()}${E.cel}</a></div></div>
<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Auto Veloce Premium Service, página inicial"><img src="/assets/${logo}.webp" alt="Auto Veloce Premium Service" width="900" height="178"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa}" ${ext}>${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Auto Veloce Premium Service" width="900" height="177" loading="lazy"><p>${sobre}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa}" ${ext}>${E.cel}</a></li>
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}</span></li>
      <li class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram da Auto Veloce">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook da Auto Veloce">${ic('face')}</a></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Auto Veloce Premium Service. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa}" ${ext} aria-label="Conversar com a Auto Veloce no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const listaEsp = (cls = '') => `<ul class="esp ${cls}">${especialidades.map((s, i) => `<li class="sobe">${ic(s.ic)}<span class="n">${String(i + 1).padStart(2, '0')}</span><b>${s.t}</b></li>`).join('')}</ul>`;
const blocoServ = () => `<div class="serv-duo">${servicos.map(s => `<article class="sv sobe"><figure>${foto(s.foto)}</figure><div><h3>${s.t}</h3><p>${s.d}</p></div></article>`).join('')}</div>`;
const blocoEquipe = () => `<div class="equipe">${equipe.map(p => `<article class="pessoa sobe"><figure>${img(p.foto)}</figure><div><p class="k">${p.papel}</p><h3>${p.nome}</h3><p>${p.d}</p></div></article>`).join('')}</div>`;
const blocoDicas = () => `<ol class="dicas-lista">${dicas.map((d, i) => `<li class="dica sobe"><span class="n">${i + 1}</span><div><h2>${d.t}</h2><p>${d.d}</p></div></li>`).join('')}</ol>`;
const blocoPromo = () => `<aside class="promo sobe"><p class="k">Promoção</p><h3>${promo.t}</h3><p>${promo.d}</p>${btnWa('Perguntar pelo WhatsApp', 'btn btn-pq')}</aside>`;

function comum(v, pag, cab) {
  pag['a-empresa'] = head(v, 'a-empresa', 'A empresa', `${sobre} Av. Brasil, 2791, Uberlândia.`) + topo(v, 'a-empresa') + cab('A empresa', 'Auto Veloce Premium Service', 'fachada-noite') + `
<div class="in">
<section class="emp-intro"><p class="lead">${sobre}</p>${listaEsp('esp-pag')}</section>
<section class="galeria g-emp">${['salao', 'noite-elevadores', 'caminhao'].map(f => `<figure class="sobe f-${f}">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
<section class="equipe-pag"><header class="tit"><p class="k">Equipe</p><h2>Quem atende você</h2></header>${blocoEquipe()}</section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Alinhamento 3D, balanceamento, troca de óleo e filtros, injeção eletrônica, suspensão, amortecedores, câmbio e motor. Nacionais e importados, em Uberlândia.') + topo(v, 'servicos') + cab('Serviços', 'Nacionais e importados, do alinhamento ao motor', 'alinhamento') + `
<div class="in">
<section class="serv-pag">${blocoServ()}</section>
<section class="esp-sec"><header class="tit"><p class="k">Especialidades</p><h2>O que a oficina resolve</h2></header>${listaEsp()}</section>
<section class="realizado sobe"><div><p class="k">Serviço realizado</p><h2>${realizado.t}</h2><p>${realizado.d}</p></div>${blocoPromo()}</section>
<p class="cta-linha">${btnWa('Pedir orçamento')}${btnTel()}</p>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Você sabia?', 'Pneus novos atrás ou na frente, validade dos pneus, bolhas no pneu e palhetas do para-brisa. Dicas da Auto Veloce, em Uberlândia.') + topo(v, 'dicas') + cab('Você sabia?', 'Dicas para rodar com mais segurança', 'salao') + `
<div class="in"><section class="dicas-pag">${blocoDicas()}<aside class="dicas-lado"><p>Ficou com alguma dúvida sobre o seu carro?</p>${btnWa('Perguntar no WhatsApp')}</aside></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Auto Veloce Premium Service: ${E.rua}, ${E.cidade}. Telefone ${E.fone}, WhatsApp ${E.cel}.`) + topo(v, 'contato') + cab('Fale conosco', 'Precisa de ajuda? Fale com a gente', 'fachada') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}</div><div>${form()}</div></section><section class="mapa-sec">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><figure class="tit-a-foto f-${f}">${img(f, ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', `${sobre} Av. Brasil, 2791, Uberlândia. WhatsApp ${E.cel}.`) + topo(v, 'index') + `
<section class="hero-a">
  <div class="in hero-a-txt"><p class="k">Oficina mecânica · Uberlândia</p><h1>Nacionais e importados, <span>com a oficina à vista.</span></h1></div>
  <figure class="hero-a-foto">${img('fachada', ' loading="eager" fetchpriority="high"')}</figure>
  <div class="in hero-a-base"><p>${sobre}</p><p class="bts">${btnWa()}${btnTel()}</p></div>
</section>
<section class="in esp-a"><header class="tit"><p class="k">Especialidades</p><h2>Do óleo ao câmbio, no mesmo endereço</h2></header>${listaEsp()}</section>
<section class="faixa-v"><div class="in faixa-v-in"><div><p class="k">Alinhamento 3D</p><h2>Alinhamento com altíssima precisão e balanceamento especializado</h2><a class="link-seta" href="${link(v, 'servicos')}">Ver serviços ${ic('seta')}</a></div><figure>${foto('alinhamento')}</figure></div></section>
<section class="in salao-a"><figure class="s1">${foto('salao')}</figure><figure class="s2">${foto('noite-elevadores')}</figure><div class="s3"><p class="k">A oficina</p><h2>Salão claro, elevadores à vista</h2><p>Portas de vidro para a Av. Brasil: dá para ver o seu carro sendo atendido.</p><a class="link-seta" href="${link(v, 'a-empresa')}">Conheça a empresa ${ic('seta')}</a></div></section>
<section class="in duo-a"><div class="equipe-a"><header class="tit"><p class="k">Equipe</p><h2>Gerência presente</h2></header>${blocoEquipe()}</div>${blocoPromo()}</section>
<section class="in dica-a"><p class="k">Você sabia?</p><h2>${dicas[0].t}</h2><p>${dicas[0].d}</p><a class="link-seta" href="${link(v, 'dicas')}">Mais dicas ${ic('seta')}</a></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Traga seu carro na Auto Veloce</h2><p>${E.rua}, ${E.cidade}. Telefone ${E.fone}.</p></div><p class="bts">${btnWa()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b f-${f}">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', `Alinhamento 3D, troca de óleo, injeção eletrônica, suspensão, câmbio e motor. ${E.rua}, Uberlândia. WhatsApp ${E.cel}.`) + topo(v, 'index') + `
<section class="hero-b">${img('fachada-noite', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in">
  <p class="k">Premium Service · Av. Brasil, 2791 · Uberlândia</p><h1>Injeção, suspensão, câmbio e motor.</h1><p>Oficina mecânica para autos nacionais e importados, com alinhamento 3D e troca de óleo no mesmo lugar.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div></section>
<section class="esp-b"><div class="in"><header class="tit-b"><p class="k">Especialidades</p><h2>Seis frentes, uma oficina</h2></header>${listaEsp('esp-linhas')}</div></section>
<section class="in serv-b"><header class="tit-b"><p class="k">Serviços</p><h2>Os mais pedidos</h2></header>${blocoServ()}</section>
<section class="exp-b"><div class="in exp-b-in"><div class="num"><b>15+</b><span>anos do Joaquim no ramo de mecânica</span></div><div class="num"><b>3D</b><span>alinhamento de altíssima precisão</span></div><div class="num"><b>6</b><span>especialidades, de nacionais a importados</span></div></div></section>
<section class="in equipe-b"><header class="tit-b"><p class="k">Equipe</p><h2>Quem atende você</h2></header>${blocoEquipe()}</section>
<section class="in duo-b"><div class="realizado-b sobe"><p class="k">Serviço realizado</p><h2>${realizado.t}</h2><p>${realizado.d}</p></div>${blocoPromo()}</section>
<section class="cta-b"><div class="in cta-b-in"><figure>${img('fachada-av')}</figure><div><h2>Passe na Av. Brasil, 2791</h2><p>Telefone ${E.fone} · WhatsApp ${E.cel}</p><p class="bts">${btnWa()}${btnMapa()}</p></div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.waNum);
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#ff752c', fundo: '#121a2b', claro: '#f3f4f6',
  fonteTitulo: "'Exo',system-ui,sans-serif", fonteTexto: "'Sarabun',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em branco e grafite com o laranja do logo. Títulos em itálico pesado, como o letreiro, e a fachada de vidro da Av. Brasil abrindo o site de ponta a ponta.', pontos: ['Fachada real em destaque', 'As seis especialidades numeradas', 'WhatsApp e telefone sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Alterna o azul-marinho do letreiro com o branco do salão, com títulos de traço técnico. Abre na oficina iluminada à noite e lista as especialidades como uma ficha de serviço.', pontos: ['A oficina à noite na abertura', 'Especialidades em linhas, sem cartões', 'Equipe e números em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
