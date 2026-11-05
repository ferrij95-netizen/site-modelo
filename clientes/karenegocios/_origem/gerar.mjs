// Kare Negócios Imobiliários (administradora de condomínios, Rio de Janeiro/RJ). Gera public/{a,b}/ e a página de escolha.
// node clientes/karenegocios/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs karenegocios http://karenegociosimobiliarios.com.br/)
// Textos tirados do site atual (WordPress): Home, Sobre a empresa, Serviços, Contato e Área dos condôminos. Fotos são as do próprio site (wp-json/wp/v2/media).
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Kare Negócios Imobiliários', url: 'https://karenegocios.overtus.com.br/', antigo: 'http://karenegociosimobiliarios.com.br/',
  cel: '(21) 99145-9022', fone: '(21) 2137-3445', wa: '5521991459022', email: 'comercial@karenegociosimobiliarios.com.br',
  end: 'Estrada do Monteiro, 509, loja A', bairro: 'Campo Grande, Rio de Janeiro - RJ', horario: 'Segunda a sexta, das 9h às 17h',
  insta: 'https://instagram.com/kare.administradora', instaNome: '@kare.administradora',
  curto: 'Administração de condomínios no Rio de Janeiro: gestão, síndico profissional, terceirização de portaria e limpeza, implantação de novos condomínios e cobrança de inadimplentes.',
};
const quem = 'A Kare Negócios Imobiliários traz propostas inovadoras na gestão imobiliária, associando para isso sistemas modernos e uma equipe técnica atenciosa e altamente preparada, trabalhando sempre com transparência, pessoalidade e eficácia nas soluções dos problemas do seu condomínio.';
const missao = 'Trazer propostas inovadoras para a gestão imobiliária, associando sistemas modernos e uma equipe técnica atenciosa e altamente preparada, trabalhando sempre com transparência, pessoalidade e eficácia nas soluções dos problemas do seu condomínio.';
const visao = 'Ser reconhecida por realizar um serviço de excelência, proporcionando soluções objetivas e eficazes aos nossos clientes e colaboradores.';
const valores = [['Transparência', 'escudo'], ['Pessoalidade', 'usuarios'], ['Eficácia', 'check']];
const servicos = [
  { id: 'administracao', c: 'Redução dos custos e da inadimplência, com atendimento personalizado.', t: 'Administração de condomínios', d: 'Trabalhamos com transparência, modernidade e eficácia na redução dos custos e da inadimplência condominial, contando com uma equipe altamente especializada e treinada para atender de forma personalizada o seu condomínio.', i: 'casa' },
  { id: 'terceirizacao', c: 'Portaria, limpeza, zeladoria e manutenção com equipes treinadas.', t: 'Terceirização de mão de obra', d: 'Temos equipes treinadas para atuar na portaria, limpeza, zeladoria e manutenção do seu condomínio, combinadas com inovações no controle de acesso de pedestres e veículos, para aumentar o conforto e a segurança do condomínio e dos condôminos.', i: 'usuarios' },
  { id: 'sindico', c: 'Gestão profissional das rotinas administrativas e operacionais.', t: 'Síndico profissional', d: 'Gestão profissional em todas as rotinas administrativas e operacionais do seu condomínio.', i: 'escudo' },
  { id: 'implantacao', c: 'Implantação de novos condomínios e treinamento de síndicos e conselheiros.', t: 'Implantação de novos condomínios', d: 'Uma equipe dedicada exclusivamente à implantação de novos condomínios e ao treinamento de novos síndicos e conselheiros.', i: 'chave' },
  { id: 'assessoria', c: 'Orientação ao síndico e aos conselheiros sempre que solicitado.', t: 'Assessoria e consultoria condominial', d: 'Atendemos o síndico e os conselheiros sempre que solicitado, com orientações e ações para eliminar dúvidas e implementar processos.', i: 'livro' },
  { id: 'cobranca', c: 'Recuperação de crédito condominial junto aos inadimplentes.', t: 'Cobrança ativa de condomínios', d: 'Eficácia na cobrança junto aos inadimplentes, com uma equipe especializada na recuperação de crédito condominial, que melhora de forma considerável a vida financeira do seu condomínio.', i: 'calendario' },
];
const app = [
  'Ver os boletos em aberto da sua unidade',
  'Fazer reservas das áreas comuns',
  'Tirar a segunda via atualizada dos boletos',
  'Copiar a linha digitável para pagar no aplicativo do seu banco',
  'Atualizar o seu cadastro',
  'Ler os comunicados da administradora e do síndico',
  'Consultar atas de reunião, convenção e prestações de contas',
];
const alt = {
  'hero-sindico': 'Gestor de condomínios de braços cruzados diante de prédios residenciais', skyline: 'Prédios residenciais ao entardecer', reuniao: 'Reunião de equipe em volta de uma mesa', 'mesa-relatorios': 'Mesa com notebooks e relatórios financeiros',
  'equipe-maos': 'Equipe unindo as mãos', maos: 'Mãos unidas sobre a mesa', administracao: 'Equipe trabalhando com notebooks em uma mesa', terceirizacao: 'Recepcionista, auxiliar de limpeza e técnico de manutenção',
  sindico: 'Síndico profissional trabalhando no escritório', implantacao: 'Mão segurando o desenho de prédios', assessoria: 'Consultor apresentando gráficos em uma prancheta', cobranca: 'Planilha de cobrança e calculadora', 'equipe-uniformes': 'Equipe de profissionais uniformizados', 'sindico-mesa': 'Síndico revisando documentos', contrato: 'Assinatura de contrato com calculadora',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'condominos', nome: 'Área dos condôminos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Quadro de avisos', b: 'Cobertura' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Lato:wght@400;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap';
const img = (n, a = alt[n] || '', extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(a)}" loading="lazy" decoding="async"${extra}>`;
const cores = { a: '#1f2a3f', b: '#1f2a3f' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Kare | Administração de condomínios no Rio de Janeiro' : `${titulo} | Kare Negócios Imobiliários`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Pedido de proposta pelo site">
  <div class="form-duas"><label>Seu nome<input name="nome" required autocomplete="name"></label><label>Seu e-mail<input name="email" type="email" required autocomplete="email"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" autocomplete="tel"></label><label>Você é<select name="perfil"><option>Síndico</option><option>Conselheiro</option><option>Condômino</option><option>Construtora ou incorporadora</option><option>Outro</option></select></label></div>
  <div class="form-duas"><label>Nome do condomínio<input name="condominio"></label><label>Assunto<select name="assunto">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Outro assunto</option></select></label></div>
  <label>Sua mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar</button>
  <p class="form-nota">Abre seu programa de e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa: ${E.end}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Estrada do Monteiro 509 Campo Grande Rio de Janeiro RJ')}&z=15&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa, 'Olá! Vim pelo site da Kare.')}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.end}<br>${E.bairro}</span></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>${E.horario}</span></div></li>
  <li>${ic('insta')}<div><strong>Instagram</strong><a href="${E.insta}" target="_blank" rel="noopener">${E.instaNome}</a></div></li>
</ul>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Kare Negócios Imobiliários, página inicial"><img src="/assets/${v === 'b' ? 'logo-claro' : 'logo'}.webp" alt="Kare Negócios Imobiliários" width="600" height="221"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), s)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Pedir proposta</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Kare Negócios Imobiliários" width="600" height="221" loading="lazy"><p>Administração de condomínios com transparência, pessoalidade e eficácia.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale com a Kare</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Kare Negócios Imobiliários. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const valoresLista = () => `<ul class="valores">${valores.map(x => `<li>${ic(x[1])}<b>${x[0]}</b></li>`).join('')}</ul>`;
const servCards = v => `<ul class="servs">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><figure>${img(s.id)}</figure><div><span class="servs-n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.c}</p></div></a></li>`).join('')}</ul>`;
const appLista = () => `<ul class="app-lista lista-check">${app.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const cta = v => `<section class="cta"><div class="in cta-in"><div><h2>Seu condomínio merece uma gestão próxima.</h2><p>Solicite uma proposta. A Kare entra em contato o mais breve possível.</p></div><p class="bts"><a class="btn btn-claro" href="${link(v, 'contato')}">Solicitar proposta</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Gostaria de uma proposta para o meu condomínio.')}" target="_blank" rel="noopener">${icWa()}WhatsApp</a></p></div></section>`;

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A empresa', quem) + topo(v, 'empresa') + cab('A empresa', 'Gestão imobiliária com sistemas modernos e gente atenciosa', 'reuniao') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${quem}</p><div class="mv"><article><p class="k">Missão</p><p>${missao}</p></article><article><p class="k">Visão</p><p>${visao}</p></article></div>${valoresLista()}</div><figure>${img('equipe-maos')}</figure></section></div>
` + cta(v) + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Administração de condomínios, terceirização de mão de obra, síndico profissional, implantação de novos condomínios, assessoria e cobrança ativa.') + topo(v, 'servicos') + cab('Serviços', 'Tudo o que o seu condomínio precisa, num só lugar', 'mesa-relatorios') + `
<div class="in"><section class="serv-pag">${servicos.map((s, i) => `<article class="serv-bloco sobe" id="${s.id}"><figure>${img(s.id)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p><a class="link-seta" href="${link(v, 'contato')}">Pedir proposta ${ic('seta')}</a></div></article>`).join('')}</section></div>
` + cta(v) + rodape(v);
  pag.condominos = head(v, 'condominos', 'Área dos condôminos', 'Boletos, segunda via, reservas de áreas comuns, comunicados e documentos do seu condomínio no aplicativo da Área do Condômino.') + topo(v, 'condominos') + cab('Área dos condôminos', 'Seu condomínio na palma da mão', 'skyline') + `
<div class="in"><section class="cond-pag"><div><p class="lead">Com a Área do Condômino Mobile você consegue:</p>${appLista()}</div><aside class="cond-acesso"><h2>Como acessar</h2><p>O acesso é feito pelo aplicativo da Área do Condômino. Para receber seu login ou tirar dúvidas, fale com a Kare:</p>${contatos()}</aside></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Peça uma proposta para o seu condomínio. ${E.cel}, ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Gostaria de solicitar uma proposta?', 'contrato') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Fale com a Kare</h2><p>Garanta o seu condomínio com o melhor serviço em administração de condomínios. Envie sua mensagem e entraremos em contato o mais breve possível.</p>${formulario()}</div><div>${contatos()}${mapa()}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('hero-sindico', alt['hero-sindico'], ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><p class="k">Administradora de condomínios · Rio de Janeiro</p><h1>Condomínio em ordem, <em>síndico tranquilo.</em></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicitar proposta</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div></section>
<section class="in quem-a"><div><p class="k">Quem somos</p><h2>Transparência, pessoalidade e eficácia.</h2><p>${quem}</p>${valoresLista()}<a class="link-seta" href="${link(v, 'empresa')}">Conheça a Kare ${ic('seta')}</a></div><figure>${img('equipe-maos')}</figure></section>
<section class="servs-a"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Da portaria à prestação de contas</h2></header>${servCards(v)}</div></section>
<section class="in avisos-a"><div class="avisos-txt"><p class="k">Área dos condôminos</p><h2>Boleto, reserva e comunicado sem sair de casa.</h2><p>Os condôminos atendidos pela Kare acompanham tudo pelo aplicativo da Área do Condômino.</p><a class="link-seta" href="${link(v, 'condominos')}">Saiba como acessar ${ic('seta')}</a></div><div class="quadro"><p class="quadro-tit">${ic('livro')}Quadro de avisos</p>${appLista()}</div></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('skyline', alt.skyline, ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Kare · administração de condomínios</p><h1>Gestão de condomínio <span>com nome, rosto e telefone.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicitar proposta</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Vim pelo site da Kare.')}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></p></div></section>
<section class="valores-b"><div class="in">${valoresLista()}</div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Seis frentes, uma administradora</h2></header><ol class="linhas-b">${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#${s.id}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${s.t}</span><span class="d">${s.c}</span>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="quem-b"><div class="in quem-b-in"><figure>${img('equipe-maos')}</figure><div><p class="k">Quem somos</p><blockquote>“${visao}”</blockquote><p>${quem}</p><a class="link-seta" href="${link(v, 'empresa')}">Missão e visão ${ic('seta')}</a></div></div></section>
<section class="in app-b"><div><p class="k">Área dos condôminos</p><h2>O condomínio no celular de cada morador</h2>${appLista()}</div><aside><img src="/assets/img/marca-k.webp" alt="" width="300" height="386" loading="lazy"><p>Para receber seu acesso, fale com a Kare pelo ${E.fone}.</p><a class="btn" href="${link(v, 'condominos')}">Área dos condôminos</a></aside></section>
` + cta(v) + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Kare Negócios Imobiliários', artigo: 'da', url: E.url, lang: 'pt', cor: '#c9963f', fundo: '#1f2a3f', claro: '#f6f2ea',
  fonteTitulo: 'Montserrat,system-ui,sans-serif', fonteTexto: 'Lato,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, em marfim, azul-marinho e dourado do logo, com o aplicativo do condômino em forma de quadro de avisos.', pontos: ['"Condomínio em ordem, síndico tranquilo"', 'Seis serviços com foto e descrição', 'Pedido de proposta com nome do condomínio'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura, no azul-marinho do logo com detalhes dourados, serviços em lista numerada e a visão da empresa em destaque.', pontos: ['"Gestão de condomínio com nome, rosto e telefone"', 'Transparência, pessoalidade e eficácia', 'WhatsApp e telefone sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
