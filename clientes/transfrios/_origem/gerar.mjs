// Transfrios Transporte e Logística (São José dos Pinhais/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/transfrios/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs transfrios https://www.transfrios.com.br/)
// O site atual mostra "Há um erro crítico" do WordPress. Textos tirados da API (wp-json/wp/v2/pages), da página Localização e dos textos escritos nos banners; fotos recortadas dos banners (sem o texto).
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Transfrios', url: 'https://transfrios.overtus.com.br/', antigo: 'https://www.transfrios.com.br/',
  fone: '(41) 2169-8300', email: 'contato@transfrios.com.br',
  curto: 'Transporte e logística de produtos perecíveis desde 1988: cargas fechadas e fracionadas, resfriadas, congeladas e secas, e armazenagem frigorificada em São José dos Pinhais.',
};
const quem = [
  'Fundada em 29 de março de 1988, a Transfrios Transporte Ltda. é uma empresa especializada e focada na prestação de serviços de logística e transporte de produtos perecíveis.',
  'Sua matriz está localizada em São José dos Pinhais (PR), em posição estratégica: às margens da Rodovia Régis Bittencourt e a 15 minutos de Curitiba.',
  'O armazém conta com antecâmara climatizada de 600 m², em até 5 °C, e 12 docas para separação e movimentação de produtos, um grande diferencial no mercado. Outras 5 câmaras frigoríficas somam 2.100 posições pallet, preparadas para as linhas alimentícia seca (temperatura ambiente), refrigerada (até 0 °C) e congelada (até -25 °C), além de um amplo pátio para movimentação dos veículos.',
];
const numeros = [['1988', 'no mercado desde'], ['2.100', 'posições pallet'], ['600 m²', 'de antecâmara a até 5 °C'], ['12', 'docas']];
const servicos = [
  { id: 'cargas-fechadas', t: 'Cargas fechadas', d: 'Do ponto "A" ao ponto "B", tudo dentro dos nossos padrões de segurança, qualidade e comodidade.', f: 'estrada', i: 'caminhao' },
  { id: 'cargas-fracionadas', t: 'Cargas fracionadas', d: 'O transporte de carga fracionada é uma das especialidades da empresa. Pontualidade e qualidade térmica das entregas são os nossos pontos fortes.', f: 'caixas', i: 'pacote' },
  { id: 'armazenagem', t: 'Armazenagem', d: 'Com uma estrutura de ponta, contamos com 2.100 posições pallet e processos de logística alinhados com as melhores práticas do mercado brasileiro.', f: 'camara-pallets', i: 'floco' },
];
const temperaturas = [['Congelada', 'até -25 °C', 'floco'], ['Refrigerada', 'até 0 °C', 'gota'], ['Seca', 'temperatura ambiente', 'sol']];
const regioes = ['Rio Grande do Sul', 'Santa Catarina', 'Paraná', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais'];
const unidades = [
  { t: 'Matriz', c: 'São José dos Pinhais - PR', d: 'Às margens da Rodovia Régis Bittencourt, a 3 km do Aeroporto Internacional Afonso Pena e a 15 minutos de Curitiba, numa área de 15.000 m².', end: 'Rua Silvio Pinto Ribeiro, 3100, Quississana', cep: '83085-400', tel: ['(41) 2169-8300'], q: 'Rua Silvio Pinto Ribeiro 3100 São José dos Pinhais PR' },
  { t: 'Filial 1', c: 'Itapecerica da Serra - SP', d: 'Às margens da Rodovia Régis Bittencourt, a 3 km do Rodoanel Mário Covas, numa área de 1.000 m².', end: 'Estrada Francisco Hengles, 591, Potuverá', cep: '06885-160', tel: ['(11) 4147-1987', '(11) 4147-3266'], q: 'Estrada Francisco Hengles 591 Itapecerica da Serra SP' },
  { t: 'Filial 2', c: 'Tijucas - SC', d: 'Às margens da BR-376, em frente à Cerâmica Porto Belo, numa área de 1.000 m².', end: 'Rua Cel. Conceição, 1832, Praça', cep: '88200-000', tel: [], q: 'Rua Coronel Conceição 1832 Tijucas SC' },
];
const alt = { matriz: 'Vista aérea da matriz da Transfrios em São José dos Pinhais', caminhao: 'Caminhão frigorífico da Transfrios', estrada: 'Caminhão da Transfrios na estrada ao pôr do sol', armazem: 'Armazém com pallets e paleteira', antecamara: 'Antecâmara climatizada de 600 m² com docas', 'camara-pallets': 'Câmara frigorífica com porta-pallets', caixas: 'Caixas de carga fracionada' };
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'estrutura', nome: 'Estrutura e unidades' }, { slug: 'contato', nome: 'Orçamento' }];
export const nomesVersao = { a: 'Cadeia Fria', b: 'Rodovia' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Mulish:wght@400;600;700&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#0050a0', b: '#0b1e33' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Transfrios | Transporte e logística de perecíveis' : `${titulo} | Transfrios`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <div class="form-duas"><label>Sua mercadoria é<select name="mercadoria"><option>Resfriada</option><option>Congelada</option><option>Seca</option></select></label><label>Serviço de maior interesse<select name="servico"><option>Transporte</option><option>Entregas</option><option>Armazenagem</option></select></label></div>
  <label>Volume da primeira operação<input name="volume" placeholder="kg, pallets ou m³"></label>
  <label>Origem, destino e mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar pedido de orçamento</button>
  <p class="form-nota">Abre seu programa de e-mail com o pedido pronto para ${E.email}.</p>
</form>`;
const mapaFrame = q => `<iframe class="mapa" title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Transfrios, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Transfrios Transporte e Logística" width="248" height="143"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Transfrios Transporte e Logística" width="248" height="143" loading="lazy"><p>Transporte e logística de perecíveis desde 1988. Faça sol ou faça chuva, seu produto sempre entre 18 °C e -25 °C.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Matriz</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${unidades[0].end}<br>${unidades[0].c}, ${unidades[0].cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Transfrios Transporte Ltda. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const numerosLista = () => `<ul class="numeros">${numeros.map(n => `<li><b>${n[0]}</b><span>${n[1]}</span></li>`).join('')}</ul>`;
const tempLista = () => `<ul class="temps">${temperaturas.map(t => `<li>${ic(t[2])}<b>${t[0]}</b><span>${t[1]}</span></li>`).join('')}</ul>`;
const servCards = v => `<ul class="servs">${servicos.map(s => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.f)}</figure><div><span class="servs-ic">${ic(s.i)}</span><h3>${s.t}</h3><p>${s.d}</p></div></a></li>`).join('')}</ul>`;
const regioesLista = () => `<ul class="regioes">${regioes.map(r => `<li>${ic('pin')}${r}</li>`).join('')}</ul>`;
const unidadesLista = (mapa = false) => `<div class="unidades">${unidades.map(u => `<article class="sobe"><p class="k">${u.t}</p><h3>${u.c}</h3><p>${u.d}</p><p class="u-end">${ic('pin')}<span>${u.end}<br>CEP ${u.cep}</span></p>${u.tel.length ? `<p class="u-end">${ic('tel')}<span>${u.tel.map(t => `<a href="${telHref(t)}">${t}</a>`).join(' · ')}</span></p>` : ''}${mapa ? mapaFrame(u.q) : ''}</article>`).join('')}</div>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Tem carga resfriada, congelada ou seca?</h2><p>Peça um orçamento de transporte ou armazenagem.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', quem[0]) + topo(v, 'empresa') + cab('Empresa', 'Logística de perecíveis desde 1988', 'caminhao') + `
<div class="in"><section class="texto-pag"><div>${quem.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('matriz')}<figcaption>Matriz em São José dos Pinhais: 15.000 m² às margens da Régis Bittencourt.</figcaption></figure></section>
<section class="num-sec">${numerosLista()}</section>
<section class="reg-sec"><header class="tit"><p class="k">Principais regiões atendidas</p><h2>Do Rio Grande do Sul a Minas Gerais</h2></header>${regioesLista()}</section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Cargas fechadas, cargas fracionadas e armazenagem de produtos resfriados, congelados e secos.') + topo(v, 'servicos') + cab('Serviços', 'Cargas fechadas, fracionadas e armazenagem', 'estrada') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.f)}</figure><div><span class="n">0${i + 1}</span><h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="temp-sec"><header class="tit"><p class="k">Faça sol ou faça chuva</p><h2>Seu produto sempre entre 18 °C e -25 °C</h2></header>${tempLista()}</section></div>
` + cta(v) + rodape(v);
  pag.estrutura = head(v, 'estrutura', 'Estrutura e unidades', 'Armazém frigorificado com antecâmara de 600 m², 12 docas e 2.100 posições pallet. Matriz em São José dos Pinhais e filiais em Itapecerica da Serra e Tijucas.') + topo(v, 'estrutura') + cab('Estrutura e unidades', 'Armazém frigorificado e três unidades na Régis e na BR-376', 'antecamara') + `
<div class="in"><section class="estr"><div class="estr-fotos"><figure>${img('antecamara')}<figcaption>Antecâmara climatizada de 600 m², em até 5 °C, com 12 docas</figcaption></figure><figure>${img('camara-pallets')}<figcaption>5 câmaras frigoríficas, 2.100 posições pallet</figcaption></figure><figure>${img('armazem')}<figcaption>Separação e movimentação de produtos</figcaption></figure></div></section>
<section class="un-sec"><header class="tit"><p class="k">Unidades</p><h2>Matriz e filiais</h2></header>${unidadesLista(true)}</section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Orçamento', `Orçamento de transporte e armazenagem de perecíveis. ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Orçamento', 'Conte sua operação e receba um orçamento', 'caminhao') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Pedido de orçamento</h2>${formulario()}</div><div><ul class="contato-lista"><li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('usuarios')}<div><strong>Trabalhe conosco</strong><span>Envie seu currículo em PDF para ${E.email}, com o departamento de interesse.</span></div></li></ul>${unidadesLista()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div><figure class="cab-a-foto">${img(foto, '', ' loading="eager"')}</figure></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div class="hero-a-txt"><p class="k">Transporte &amp; logística · desde 1988</p><h1>Faça sol ou faça chuva, <em>sua carga no frio certo.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Serviços</a></p></div><figure class="hero-a-foto">${img('caminhao', alt.caminhao, ' loading="eager" fetchpriority="high"')}<div class="termo"><b>18 °C</b><span></span><b>-25 °C</b></div></figure></div><div class="in">${tempLista()}</div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Transporte e armazenagem de perecíveis</h2></header>${servCards(v)}</section>
<section class="estr-a"><div class="in estr-a-in"><figure>${img('antecamara')}</figure><div><p class="k">Estrutura</p><h2>Antecâmara de 600 m² e 2.100 posições pallet</h2><p>${quem[2]}</p>${numerosLista()}<a class="link-seta" href="${link(v, 'estrutura')}">Estrutura e unidades ${ic('seta')}</a></div></div></section>
<section class="in reg-a"><div><p class="k">Regiões atendidas</p><h2>Matriz na Régis Bittencourt, filiais em SP e SC</h2>${regioesLista()}</div><figure>${img('matriz')}</figure></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('estrada', alt.estrada, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Transfrios · São José dos Pinhais · PR</p><h1>Do ponto A ao ponto B, <span>de 18 °C a -25 °C.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
<section class="num-b"><div class="in">${numerosLista()}</div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Três jeitos de cuidar da sua carga</h2></header>${servCards(v)}</section>
<section class="temp-b"><div class="in temp-b-in"><div><p class="k">Linhas de temperatura</p><h2>Congelada, refrigerada e seca</h2><p>5 câmaras frigoríficas e antecâmara climatizada a até 5 °C, com 12 docas para separação e movimentação.</p></div>${tempLista()}</div></section>
<section class="in un-b"><header class="tit"><p class="k">Unidades</p><h2>Três unidades nas principais rodovias do Sul</h2></header>${unidadesLista()}</section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Transfrios', artigo: 'da', url: E.url, lang: 'pt', cor: '#0050a0', fundo: '#0b1e33', claro: '#eef5fb',
  fonteTitulo: '"Exo 2",system-ui,sans-serif', fonteTexto: 'Mulish,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara e gelada, no azul do logo do pinguim, com as três linhas de temperatura logo na abertura.', pontos: ['"Faça sol ou faça chuva"', 'Cargas fechadas, fracionadas e armazenagem', 'Pedido de orçamento com tipo de mercadoria e volume'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, com o caminhão na estrada em tela cheia e números da estrutura em destaque.', pontos: ['"Do ponto A ao ponto B"', '2.100 posições pallet, 600 m² de antecâmara', 'Matriz e filiais com endereço e mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
