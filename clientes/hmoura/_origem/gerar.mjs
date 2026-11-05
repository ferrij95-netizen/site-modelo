// H Moura Empreendimentos Imobiliários (Ilha do Governador, Rio de Janeiro/RJ). Gera public/{a,b}/ e a página de escolha.
// node clientes/hmoura/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs hmoura http://www.hmouraimobiliaria.com.br/)
// Textos tirados do site atual (frameset /novo/: index, admcond, locvend, seguros, proposta). O site não publica imóveis: a busca "Alugar/Comprar"
// abre uma lista vazia ("Não há Imóvel") e os anúncios ficam no perfil da OLX. Fotos: as do próprio site (fotos de banco de imagens).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'H Moura Empreendimentos Imobiliários', url: 'https://hmoura.overtus.com.br/', antigo: 'http://www.hmouraimobiliaria.com.br/',
  wa: '5521975277148', wa1: '(21) 97527-7148', wa2: '(21) 99944-4709', wa2n: '5521999444709', cel: '(21) 96761-9604',
  fixos: ['(21) 2467-6003', '(21) 3366-2209', '(21) 3403-0000'],
  email: 'hmoura@hmouraimobiliaria.com.br', email2: 'hmouraimob@gmail.com', creci: 'CRECI/RJ 5.763',
  end: 'Estrada do Galeão, 826, sala 225', predio: 'Ilha Golden Shopping', bairro: 'Jardim Carioca, Ilha do Governador, Rio de Janeiro - RJ', cep: 'CEP 21931-522',
  olx: 'https://www.olx.com.br/perfil/h-moura-empreendimentos-imobiliarios-ltda-9f483307',
  login: 'http://www.hmouraimobiliaria.com.br/novo/filtra.php',
  curto: 'Administração de condomínio, venda, locação e seguros na Ilha do Governador, Rio de Janeiro.',
};
const quem1 = 'Somos uma empresa de prestação de serviços imobiliários (administração de condomínios, locações, seguros e vendas). Com experiência no mercado, estamos aptos a oferecer o que melhor existe neste segmento, buscando sempre altos padrões de qualidade, visando à segurança nos negócios realizados e a satisfação total de nossos clientes.';
const quem2 = 'O maior diferencial da H Moura Imobiliária não está apenas na multiplicidade de serviços que é capaz de oferecer, mas também no atendimento personalizado que dispensa aos seus clientes. Este atendimento é possível graças à estrutura profissional criada pela empresa. Encantamos nossos clientes com soluções imobiliárias, obedecendo a critérios de qualidade e confiança nos negócios, buscando o comprometimento e a satisfação dos nossos colaboradores.';
const servicos = [
  { slug: 'condominios', t: 'Administração de condomínios', c: 'Otimizamos a gestão condominial com recursos operacionais associados à tecnologia para uma administração prática e eficaz.', foto: 'condominio', i: 'casa' },
  { slug: 'imoveis', t: 'Locação e venda de imóveis', c: 'Temos uma equipe especializada para assessorar e dar a segurança que você precisa para fazer o melhor negócio.', foto: 'chaves', i: 'chave' },
  { slug: 'seguros', t: 'Seguros', c: 'Proteja seu imóvel com as melhores opções e com os melhores preços do mercado.', foto: 'contrato', i: 'escudo' },
];
const cond = [
  'Envio mensal dos balancetes (sintético e analítico).',
  'Assessoramento às assembleias gerais ordinárias e extraordinárias.',
  'Regularização dos empregados, livros e afins junto ao Ministério do Trabalho.',
  'Página na internet para consulta aos balancetes e emissão de segundas vias das cotas condominiais e do aluguel.',
  'Elaboração de pareceres jurídicos sobre questões imobiliárias em geral, com propositura de ações, inclusive no âmbito trabalhista e criminal.',
  'Indicação e intermediação junto à seguradora na renovação do seguro do condomínio e dos funcionários.',
];
const locvend = 'A H Moura tem uma grande experiência no mercado imobiliário, com profissionais credenciados e capacitados para oferecer o melhor negócio para você. Na administração de imóveis, prestamos total assistência, selecionando de forma criteriosa os candidatos à locação. Na área de vendas, acompanhamos todas as etapas, desde a avaliação até o Registro de Imóveis.';
const locacao = ['Avaliação criteriosa do imóvel sem custo.', 'Envio mensal de extrato de conta corrente.', 'Informe anual para o Imposto de Renda.', 'Elaboração de laudo de vistoria dos imóveis.', 'Anúncios em mídias especializadas.', 'Fotos dos imóveis no anúncio.', 'Depósito do aluguel em conta corrente.'];
const venda = ['Avaliação de preço do imóvel sem custo.', 'Anúncios em mídias especializadas.', 'Divulgação na nossa página.', 'Elaboração de contrato.', 'Regularização documental.', 'Aprovação de crédito imobiliário.', 'Registro Geral de Imóveis.'];
const seg1 = 'O imóvel é, sem dúvida, um dos bens mais preciosos que podemos ter. Seu valor material é importante, e o que gira em torno dele é mais importante ainda.';
const seg2 = 'Uma coisa é certa: você precisa de proteção, seja para o seu patrimônio, para você ou para cuidar da sua família. Por isso oferecemos a melhor opção com o menor preço.';
const seguros = ['Seguros residenciais', 'Seguro para auto', 'Seguros condominiais', 'Seguros pessoais', 'Planos de previdência privada'];

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Quem somos' }, { slug: 'condominios', nome: 'Condomínios' }, { slug: 'imoveis', nome: 'Locação e venda' }, { slug: 'seguros', nome: 'Seguros' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Telhado', b: 'Galeão' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap',
};
const alt = {
  condominio: 'Fachada de prédio residencial com palmeiras e calçada de pedra portuguesa', chaves: 'Mão entregando as chaves de um imóvel', contrato: 'Assinatura de contrato sobre a mesa',
  predios: 'Fachadas de prédios espelhados vistas de baixo, em preto e branco',
};
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'H Moura Imobiliária | Condomínios, locação, venda e seguros na Ilha do Governador' : `${titulo} | H Moura Imobiliária`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: v === 'a' ? '#faf7f1' : '#1f2021' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formContato = () => `<form class="form" data-wa="Olá! Vim pelo site da H Moura.">
  <div class="form-duas"><label>Seu nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Administração de condomínio</option><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero anunciar meu imóvel</option><option>Seguros</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Abre o WhatsApp da H Moura (${E.wa1}) com a mensagem pronta.</p>
</form>`;
const formProposta = () => `<form class="form" data-wa="Olá! Gostaria de uma proposta para administração de condomínio.">
  <div class="form-duas"><label>Nome do condomínio<input name="condominio" required></label><label>Quantidade de unidades<input name="unidades" inputmode="numeric"></label></div>
  <div class="form-duas"><label>Número de empregados<input name="empregados" inputmode="numeric"></label><label>Endereço (rua, avenida)<input name="endereco"></label></div>
  <div class="form-duas"><label>Bairro<input name="bairro"></label><label>Cidade<input name="cidade" value="Rio de Janeiro"></label></div>
  <div class="form-duas"><label>Nome do solicitante<input name="solicitante" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Informações ou comentários<textarea name="comentarios" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Solicitar proposta</button>
  <p class="form-nota">Abre o WhatsApp da H Moura com os dados do condomínio.</p>
</form>`;
const areaCliente = () => `<form class="cliente" method="post" action="${E.login}" target="_blank">
  <p class="cliente-tit">${ic('usuarios')}Área do cliente</p>
  <label>Login<input name="login" autocomplete="username"></label>
  <label>Senha<input name="senha" type="password" autocomplete="current-password"></label>
  <button class="btn" type="submit">Entrar</button>
  <p class="form-nota">Balancetes e segunda via de cotas e aluguel.</p>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa: ${E.end}, ${E.predio}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Estrada do Galeão 826 Jardim Carioca Ilha do Governador Rio de Janeiro')}&z=16&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa, 'Olá! Vim pelo site da H Moura.')}" target="_blank" rel="noopener">${E.wa1}</a><a href="${waHref(E.wa2n, 'Olá! Vim pelo site da H Moura.')}" target="_blank" rel="noopener">${E.wa2}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong>${E.fixos.map(f => `<a href="${telHref(f)}">${f}</a>`).join('')}<a href="${telHref(E.cel)}">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a><a href="mailto:${E.email2}">${E.email2}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}, ${E.predio}<br>${E.bairro}<br>${E.cep}</span></div></li>
</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="H Moura Imobiliária, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="H Moura Empreendimentos Imobiliários, ${E.creci}" width="1047" height="783"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${waHref(E.wa, 'Olá! Vim pelo site da H Moura.')}" target="_blank" rel="noopener">${icWa()}<span>WhatsApp</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="H Moura Empreendimentos Imobiliários" width="1047" height="783" loading="lazy"><p>Administração de condomínio, venda, locação e seguros.<br>${E.creci}</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}<li><a href="${E.olx}" target="_blank" rel="noopener">Anúncios na OLX</a></li></ul></div>
    <div><h3>Fale com a H Moura</h3><ul class="rod-dados">
      <li>${icWa()}<span><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.wa1}</a> · <a href="${waHref(E.wa2n)}" target="_blank" rel="noopener">${E.wa2}</a></span></li>
      <li>${ic('tel')}<a href="${telHref(E.fixos[0])}">${E.fixos[0]}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}, ${E.predio}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} H Moura Empreendimentos Imobiliários. ${E.creci}.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, 'Olá! Vim pelo site da H Moura.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const imoveisBox = (v, cls = '') => `<section class="busca ${cls}"><div class="in busca-in"><div><p class="k">Encontre seu imóvel</p><h2>Procurando casa ou apartamento na Ilha?</h2><p>Os anúncios da H Moura estão na OLX. Diga o que procura e um corretor responde pelo WhatsApp.</p></div><p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Quero alugar um imóvel.')}" target="_blank" rel="noopener">${icWa()}Quero alugar</a><a class="btn" href="${waHref(E.wa, 'Olá! Quero comprar um imóvel.')}" target="_blank" rel="noopener">${icWa()}Quero comprar</a><a class="btn btn-linha" href="${E.olx}" target="_blank" rel="noopener">Ver anúncios na OLX ${ic('ext')}</a></p></div></section>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Seu condomínio precisa de uma administradora?</h2><p>Mande os dados do prédio e a H Moura prepara uma proposta.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'condominios')}#proposta">Solicitar proposta</a><a class="btn btn-linha" href="${telHref(E.fixos[0])}">${ic('tel')}${E.fixos[0]}</a></p></div></section>`;

function paginas(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Quem somos', quem1) + topo(v, 'empresa') + cab('Quem somos', 'Atendimento personalizado, do condomínio ao seguro', 'condominio') + `
<div class="in"><section class="texto-pag sobe"><div><p class="lead">${quem1}</p><p>${quem2}</p><ul class="selos"><li><b>${E.creci}</b><span>Imobiliária registrada</span></li><li><b>4 frentes</b><span>Condomínios, locação, venda e seguros</span></li><li><b>${E.predio}</b><span>Estrada do Galeão, Ilha do Governador</span></li></ul></div><aside class="ficha"><h2>Onde estamos</h2>${contatos()}</aside></section></div>
` + cta(v) + rodape(v);
  pag.condominios = head(v, 'condominios', 'Administração de condomínios', 'Balancetes mensais, assembleias, regularização de empregados, segunda via de cotas, pareceres jurídicos e seguro do condomínio.') + topo(v, 'condominios') + cab('Administração de condomínios', 'Gestão condominial prática, com tecnologia e prestação de contas todo mês', 'condominio') + `
<div class="in"><section class="serv-pag"><div class="sobe"><p class="lead">${servicos[0].c}</p><h2>O que a H Moura faz pelo seu condomínio</h2><ol class="itens">${cond.map((x, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><p>${x}</p></li>`).join('')}</ol></div>
<aside class="proposta sobe" id="proposta"><h2>Proposta para administração de condomínio</h2><p>Preencha os dados abaixo e a H Moura entra em contato.</p>${formProposta()}</aside></section></div>
` + rodape(v);
  pag.imoveis = head(v, 'imoveis', 'Locação e venda de imóveis', locvend) + topo(v, 'imoveis') + cab('Locação e venda', 'Do anúncio ao registro do imóvel, com quem conhece a Ilha', 'chaves') + `
<div class="in"><section class="lv-pag"><p class="lead sobe">${locvend}</p><div class="lv-duas"><article class="lv sobe"><p class="k">Para o proprietário que aluga</p><h2>Locação</h2>${lista(locacao)}</article><article class="lv sobe"><p class="k">Para quem quer vender</p><h2>Venda</h2>${lista(venda)}</article></div></section></div>
` + imoveisBox(v, 'busca-pag') + rodape(v);
  pag.seguros = head(v, 'seguros', 'Seguros', 'Seguros residenciais, para auto, condominiais, pessoais e planos de previdência privada.') + topo(v, 'seguros') + cab('Seguros', 'Proteção para o imóvel, o carro e a família', 'contrato') + `
<div class="in"><section class="seg-pag"><div class="sobe"><p class="lead">${seg1}</p><p>${seg2}</p><a class="btn" href="${waHref(E.wa, 'Olá! Quero uma cotação de seguro.')}" target="_blank" rel="noopener">${icWa()}Pedir cotação</a></div><div class="seg-lista sobe"><p class="k">Oferecemos</p><ul>${seguros.map(s => `<li>${ic('escudo')}<span>${s}</span></li>`).join('')}</ul></div></section></div>
` + cta(v) + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `${E.end}, ${E.predio}, ${E.bairro}. WhatsApp ${E.wa1}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a H Moura', 'predios') + `
<div class="in"><section class="contato-pag"><div class="contato-form sobe"><h2>Mande sua mensagem</h2><p>Escolha o assunto e envie. A resposta vem pelo WhatsApp.</p>${formContato()}</div><div class="sobe">${contatos()}${mapa()}</div></section>
<section class="cliente-pag sobe"><div><h2>Já é cliente?</h2><p>Condôminos, síndicos e proprietários acessam balancetes e segundas vias pela área do cliente.</p></div>${areaCliente()}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="casa-moldura">${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Ilha do Governador · Rio de Janeiro</p><h1>Administração de condomínio, venda, locação <em>e seguros.</em></h1><p class="lead">${quem1.split('. ')[0]}.</p><p class="bts"><a class="btn" href="${link(v, 'condominios')}#proposta">Proposta para condomínio</a><a class="btn btn-linha" href="${link(v, 'imoveis')}">Alugar ou vender</a></p></div><figure class="casa-moldura casa-grande">${img('condominio', alt.condominio, ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="servs-a"><div class="in"><header class="tit"><p class="k">Nossos serviços</p><h2>Três frentes, uma só equipe</h2></header><ul class="servs">${servicos.map(s => `<li class="sobe"><a href="${link(v, s.slug)}"><figure class="casa-moldura">${img(s.foto)}</figure><h3>${s.t}</h3><p>${s.c}</p><span class="link-seta">Saiba mais ${ic('seta')}</span></a></li>`).join('')}</ul></div></section>
<section class="in cond-a"><div class="sobe"><p class="k">Para síndicos</p><h2>Balancete todo mês, assembleia assessorada, segunda via pela internet.</h2>${lista(cond.slice(0, 4))}<a class="link-seta" href="${link(v, 'condominios')}">Tudo o que fazemos pelo condomínio ${ic('seta')}</a></div>${areaCliente()}</section>
` + imoveisBox(v) + `
<section class="in quem-a"><img class="quem-casa" src="/assets/img/casa.webp" alt="" width="677" height="571" loading="lazy"><div class="sobe"><p class="k">Quem somos</p><h2>Atendimento personalizado é o nosso diferencial.</h2><p>${quem2}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a H Moura ${ic('seta')}</a></div></section>
` + cta(v) + rodape(v);
  paginas(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('predios', alt.predios, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">H Moura · ${E.creci}</p><h1>Condomínio, imóvel e seguro <em>resolvidos no mesmo endereço.</em></h1><p>${E.end}, ${E.predio}. Ilha do Governador, Rio de Janeiro.</p><p class="bts"><a class="btn" href="${link(v, 'condominios')}#proposta">Proposta para condomínio</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Vim pelo site da H Moura.')}" target="_blank" rel="noopener">${icWa()}${E.wa1}</a></p></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>O que a H Moura faz</h2></header><ol class="linhas-b">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, s.slug)}"><span class="n">${String(i + 1).padStart(2, '0')}</span><figure>${img(s.foto)}</figure><span class="t">${s.t}</span><span class="d">${s.c}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="cond-b"><div class="in cond-b-in"><div class="sobe"><p class="k">Administração de condomínios</p><h2>Seis compromissos com o síndico</h2><ol class="itens">${cond.map((x, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><p>${x}</p></li>`).join('')}</ol></div><div class="sobe">${areaCliente()}<a class="btn btn-claro" href="${link(v, 'condominios')}#proposta">Pedir proposta</a></div></div></section>
` + imoveisBox(v) + `
<section class="in quem-b"><div class="sobe"><p class="k">Quem somos</p><blockquote>“O maior diferencial da H Moura não está apenas na multiplicidade de serviços, mas no atendimento personalizado.”</blockquote><p>${quem1}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a></div><aside class="sobe"><img src="/assets/img/casa-claro.webp" alt="" width="677" height="571" loading="lazy"><p>${E.predio}<br>Estrada do Galeão, 826, sala 225</p></aside></section>
` + cta(v) + rodape(v);
  paginas(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'H Moura Imobiliária', artigo: 'da', url: E.url, lang: 'pt', cor: '#c9892a', fundo: '#2b2a28', claro: '#faf7f1',
  fonteTitulo: "'DM Serif Display',Georgia,serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, em creme, preto e o dourado do "H", com as fotos dentro do contorno de casa do logo.', pontos: ['Os três serviços com foto e "saiba mais"', 'Área do cliente na página inicial', 'Proposta para condomínio com os mesmos campos do site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em grafite e âmbar, com os prédios em preto e branco na abertura e os serviços em lista numerada.', pontos: ['"Condomínio, imóvel e seguro resolvidos no mesmo endereço"', 'Os seis compromissos com o síndico', 'WhatsApp e telefone sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
