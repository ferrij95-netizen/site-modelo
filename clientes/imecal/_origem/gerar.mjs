// Imecal Metalúrgica (Indústria Metalúrgica Canoas Ltda., Canoas/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/imecal/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs imecal https://imecal.com.br/)
// Textos das páginas do site atual. Logo "imecal" vetorizado do PNG de 160 px do site (logo-path.txt); "METALÚRGICA" em texto.
// A empresa não divulga WhatsApp: o formulário abre o e-mail comercial (form data-email no site.js).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const LOGO_D = fs.readFileSync(path.join(aqui, 'logo-path.txt'), 'utf8').trim();
const logo = (cls = 'logo') => `<span class="${cls}"><svg viewBox="0 0 196.8 48" role="img" aria-label="imecal"><path fill="currentColor" fill-rule="evenodd" d="${LOGO_D}"/></svg><small>Metalúrgica</small></span>`;
const E = {
  nome: 'Imecal Metalúrgica', razao: 'Indústria Metalúrgica Canoas Ltda.', url: 'https://imecal.com.br/'.replace('imecal.com.br', 'imecal.overtus.com.br'), antigo: 'https://imecal.com.br/',
  fone1: '(51) 3475-6092', fone2: '(51) 3475-7898', sac: '(51) 3475-7893',
  emails: [['Comercial', 'comercial@imecal.com.br'], ['Compras', 'compras@imecal.com.br'], ['Qualidade', 'sqg@imecal.com.br'], ['Produção', 'gproducao@imecal.com.br']],
  rua: 'Rua Ivanir José Pagliarini, 117 (antiga Rua B)', bairro: 'Distrito Industrial Jorge Lanner, Niterói', cidade: 'Canoas - RS', cep: '92180-510',
  curto: 'Fabricação, usinagem e recuperação de peças de precisão para manutenção e fabricação industrial. Área fabril própria de 1.500 m² em Canoas, certificada ISO 9001:2015.',
};
const email = E.emails[0][1];
const historia = [
  'Inserida no polo metalmecânico de Canoas, na região metropolitana de Porto Alegre, a Imecal é especializada em fabricação, usinagem e recuperação de peças de precisão para manutenção e fabricação industrial, com área fabril própria de 1.500 m².',
  'Focada em relações duradouras com clientes e fornecedores, a Imecal tem hoje uma posição destacada no seu segmento. Em parceria e confiança, mantém clientes na carteira desde a fundação, em 1996.',
  'Para cumprir a missão de contribuir para o excelente desempenho dos equipamentos dos clientes, a Imecal conta com uma equipe de profissionais competentes e um Controle de Qualidade equipado com instrumentos de primeira linha.',
  'A empresa vem investindo na infraestrutura e nos profissionais, para se manter atualizada e buscar a satisfação dos clientes pela melhoria contínua.',
];
const missao = 'Contribuir para o excelente desempenho dos equipamentos de nossos clientes através da industrialização, usinagem e recuperação de peças.';
const servicos = [
  { id: 'fabricacao', ic: 'fabrica', foto: 'torno-cnc', t: 'Fabricação de peças', d: 'Peças de precisão fabricadas a partir do desenho do cliente, para máquinas novas e para reposição.' },
  { id: 'usinagem', ic: 'engrenagem', foto: 'polia-usinada', t: 'Usinagem de precisão', d: 'Torneamento e fresamento CNC de peças de até 5 m de comprimento e 1,20 m de diâmetro, em diversos tipos de material.' },
  { id: 'recuperacao', ic: 'chave', foto: 'pecas-mesa', t: 'Recuperação de peças', d: 'Recuperação de componentes desgastados para a manutenção industrial, devolvendo a peça às medidas de projeto.' },
  { id: 'medicao', ic: 'medidor', foto: 'projetor-perfil', t: 'Controle dimensional', d: 'Toda peça passa pelo Controle de Qualidade, com máquina de medição tridimensional por coordenadas e projetor de perfil.' },
];
const maquinas = [
  ['Centros de usinagem verticais', 'Discovery 760, D 800 e D 1250'],
  ['Tornos CNC', 'Romi Multiplic 30D, Romi Multiplic 35D, Romi G280, Romi GL280 e Romi Centur 35 E'],
  ['Tornos universais', 'Romi MKD II, Tormax 30B e Tormax 20'],
  ['Fresadoras', 'Ferramenteiras e universal'],
  ['Retíficas', 'Plana e universal Zocca'],
  ['Afiadora de ferramentas', ''],
  ['Medição', 'Máquina tridimensional e projetor de perfil'],
];
const numeros = [['1996', 'ano de fundação'], ['1.500 m²', 'de área fabril própria'], ['5 m × 1,20 m', 'maior peça usinada (comprimento × diâmetro)'], ['ISO 9001', 'desde 2006, hoje pela 9001:2015']];
const clientes = [['bomag', 'BOMAG Fayat Group'], ['braskem', 'Braskem'], ['cmpc', 'CMPC'], ['rexnord', 'Rexnord'], ['bucher', 'Bucher Hydraulics'], ['caf', 'CAF'], ['santher', 'Santher'], ['bettanin', 'Bettanin'], ['oderich', 'Oderich']];
const instrumentos = [['tridimensional', 'Tridimensional Mitutoyo Crysta Plus M574'], ['projetor-perfil', 'Projetor de perfil PH-A14 Metalplan'], ['pecas-medicao', 'Peças no controle de qualidade'], ['medicao-manual', 'Instrumentos convencionais de primeira linha']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos e serviços' }, { slug: 'qualidade', nome: 'Qualidade e medição' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Precisão', b: 'Coordenadas' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Karla:wght@400;500;700&family=Chakra+Petch:wght@500;600;700&family=Noto+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const mail = (assunto = 'Pedido de orçamento pelo site') => `mailto:${email}?subject=${encodeURIComponent(assunto)}`;
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#ffffff', b: '#121417' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Usinagem e recuperação de peças em Canoas` : `${titulo} | Imecal`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const tabelaMaq = () => `<div class="tabela-rola"><table class="maq"><thead><tr><th>Equipamento</th><th>Modelos</th></tr></thead><tbody>${maquinas.map(m => `<tr><td>${m[0]}</td><td>${m[1] || '-'}</td></tr>`).join('')}</tbody></table></div>`;
const clientesHtml = () => `<ul class="clientes">${clientes.map(c => `<li>${img('clientes/' + c[0], c[1])}</li>`).join('')}</ul>`;

const formulario = () => `<form class="form" data-email="${email}" data-assunto="Pedido de orçamento pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}</select></label></div>
  <label>Peça, material e quantidade<textarea name="mensagem" rows="4" placeholder="Descreva a peça, o material, as medidas principais e a quantidade. Se tiver desenho, anexe no e-mail."></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu e-mail com a mensagem pronta para ${email}. Prefere ligar? ${E.fone1}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('usuarios')}<div><strong>SAC</strong><a href="${telHref(E.sac)}">${E.sac}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mails</strong>${E.emails.map(e => `<a href="mailto:${e[1]}">${e[0]}: ${e[1]}</a>`).join('')}</div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}, CEP ${E.cep}</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Imecal" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Ivanir José Pagliarini, 117, Niterói, Canoas RS, 92180-510')}&z=15&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  ${v === 'a' ? `<div class="topo-barra"><div class="in"><span>${E.razao}</span><a href="${telHref(E.sac)}">${ic('tel')}SAC ${E.sac}</a><a href="mailto:${email}">${ic('mail')}${email}</a></div></div>` : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Imecal Metalúrgica, página inicial">${logo()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Orçamento</a>
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
    <div class="rod-marca">${logo()}<p>${E.razao}<br>Desde 1996 no polo metalmecânico de Canoas.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${telHref(E.fone1)}">${E.fone1}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></span></li>
      <li>${ic('usuarios')}<a href="${telHref(E.sac)}">SAC ${E.sac}</a></li>
      <li>${ic('mail')}<a href="mailto:${email}">${email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} ${E.razao} Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'Empresa', historia[0]) + topo(v, 'empresa') + cab('Empresa', 'Indústria Metalúrgica Canoas, desde 1996.', 'sala-medicao') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}<p>A Imecal é certificada pela norma ISO 9001:2015, concedida pelo organismo certificador Bureau Veritas.</p></div><figure>${img('polia-vertical', 'Polia usinada pela Imecal')}<figcaption>Polia usinada e conferida no Controle de Qualidade.</figcaption></figure></section>
<section class="numeros">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</section>
<section class="missao"><h2>Missão</h2><p>${missao}</p></section>
<section class="clientes-sec"><h2>Principais clientes</h2><p>Para a Imecal todos os clientes são fundamentais. Alguns deles:</p>${clientesHtml()}</section></div>
` + rodape(v);
  pag.produtos = head(v, 'produtos', 'Produtos e serviços', 'Usinagem de peças de até 5 m de comprimento e 1,20 m de diâmetro. Centros de usinagem Discovery, tornos CNC Romi, retíficas Zocca e medição tridimensional.') + topo(v, 'produtos') + cab('Produtos e serviços', 'Peças de até 5 m de comprimento e 1,20 m de diâmetro.', 'polia-usinada') + `
<div class="in"><section class="servs">${servicos.map(s => `<article class="serv sobe" id="${s.id}"><figure>${img(s.foto, s.t)}</figure><div>${ic(s.ic)}<h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="parque"><div><h2>Parque de máquinas</h2><p>Capacidade de usinar peças de 5 m de comprimento até 1,20 m de diâmetro, com tecnologia para diversos tipos de material.</p>${tabelaMaq()}</div><figure>${img('pecas-variadas', 'Peças usinadas pela Imecal')}</figure></section>
<section class="cta-faixa"><h2>Tem um desenho para orçar?</h2><p>Mande o desenho, o material e a quantidade para o comercial.</p><p class="bts"><a class="btn" href="${mail()}">${ic('mail')}${email}</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></section></div>
` + rodape(v);
  pag.qualidade = head(v, 'qualidade', 'Qualidade e medição', 'ISO 9001 desde 2006, hoje 9001:2015 pela Bureau Veritas. Todas as peças passam pelo Controle de Qualidade com tridimensional Mitutoyo e projetor de perfil.') + topo(v, 'qualidade') + cab('Qualidade e medição', 'Toda peça passa pelo Controle de Qualidade.', 'tridimensional') + `
<div class="in"><section class="iso"><div><h2>Certificação ISO 9001</h2><p class="lead">Buscando a satisfação dos clientes pela melhoria contínua dos processos, a Imecal obteve a certificação ISO 9001 em 2006. Hoje é certificada pela norma 9001:2015, concedida pela Bureau Veritas.</p><p>A Imecal vem investindo na modernização da gestão para se tornar mais ágil, competitiva e moderna, mantendo o padrão de atendimento, com investimentos em infraestrutura, qualificação da equipe e tecnologia.</p></div><figure class="selo">${img('bureau-veritas', 'Bureau Veritas, organismo certificador')}</figure></section>
<section class="medicao"><h2>Controle de medições</h2><p>Para atender os requisitos e a expectativa dos clientes, todos os produtos fabricados na Imecal passam por análise no Controle de Qualidade.</p><div class="instr">${instrumentos.map(i => `<a class="sobe" href="/assets/img/${i[0]}.webp" data-foto data-legenda="${esc(i[1])}">${img(i[0], i[1])}<span>${i[1]}</span></a>`).join('')}</div></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Imecal: ${E.rua}, ${E.cidade}. Telefones ${E.fone1} e ${E.fone2}, SAC ${E.sac}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Imecal.', 'pecas-mesa') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Solicite um orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a">${img('faixa-vermelha', '', ' loading="eager"')}<div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(foto, '', ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a">${img('faixa-vermelha', '', ' loading="eager" fetchpriority="high"')}<div class="in hero-a-in"><div><p class="k">Desde 1996 · Canoas/RS</p><h1>Peças de precisão, fabricadas e recuperadas com medição tridimensional.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos e serviços</a></p></div><figure>${img('sala-medicao', 'Sala de medição da Imecal com tridimensional e peças')}</figure></div></section>
<section class="in numeros-a">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</section>
<section class="in servs-a"><header class="tit"><p class="k">O que fazemos</p><h2>Do desenho à peça medida</h2></header><div class="cards">${servicos.map(s => `<a class="card sobe" href="${link(v, 'produtos')}#${s.id}"><figure>${img(s.foto, s.t)}</figure><div>${ic(s.ic)}<h3>${s.t}</h3><p>${s.d}</p></div></a>`).join('')}</div></section>
<section class="qual-a"><div class="in qual-in"><figure>${img('tridimensional', 'Máquina de medição tridimensional por coordenadas')}</figure><div><p class="k">Qualidade</p><h2>ISO 9001 desde 2006 e medição em cada peça</h2><p>Todas as peças fabricadas passam pelo Controle de Qualidade, equipado com a máquina de medição tridimensional por coordenadas, projetor de perfil e instrumentos convencionais de primeira linha. Certificação ISO 9001:2015 pela Bureau Veritas.</p><a class="link-seta" href="${link(v, 'qualidade')}">Qualidade e medição ${ic('seta')}</a></div></div></section>
<section class="in maq-a"><header class="tit"><p class="k">Parque de máquinas</p><h2>Romi, Discovery e Zocca em 1.500 m²</h2></header>${tabelaMaq()}</section>
<section class="in clientes-a"><header class="tit"><p class="k">Principais clientes</p><h2>Empresas que confiam na Imecal</h2></header>${clientesHtml()}</section>
<section class="cta-a"><div class="in"><div><h2>Tem um desenho para orçar?</h2><p>Comercial: ${email}</p></div><p class="bts"><a class="btn" href="${mail()}">${ic('mail')}Enviar desenho</a><a class="btn btn-linha" href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div><p class="k">X 5000 · Ø 1200 · ISO 9001:2015</p><h1>Usinagem e recuperação de peças com tolerância conferida.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="link-seta" href="${link(v, 'qualidade')}">Como medimos ${ic('seta')}</a></p></div><figure class="hero-b-foto">${img('polia-usinada', 'Polia usinada sobre a mesa da tridimensional', ' loading="eager" fetchpriority="high"')}<figcaption><span>// controle dimensional</span> tridimensional por coordenadas</figcaption></figure></div></section>
<section class="numeros-b"><div class="in">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">// serviços</p><h2>Quatro etapas, uma bancada</h2></header><ol>${servicos.map((s, i) => `<li class="sobe"><span class="num">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ol></section>
<section class="foto-b"><div class="in foto-b-in"><div class="foto-b-grade">${['torno-cnc', 'projetor-perfil', 'pecas-medicao', 'ferramentas'].map(n => `<a href="/assets/img/${n}.webp" data-foto>${img(n, 'Imecal')}</a>`).join('')}</div><div><p class="k">// parque de máquinas</p><h2>Do torno CNC ao projetor de perfil</h2>${tabelaMaq()}<a class="link-seta" href="${link(v, 'produtos')}">Produtos e serviços ${ic('seta')}</a></div></div></section>
<section class="in clientes-b"><header class="tit-b"><p class="k">// clientes</p><h2>Quem confia na Imecal</h2></header>${clientesHtml()}</section>
<section class="in historia-b"><figure>${img('sala-medicao', 'Controle de Qualidade da Imecal')}</figure><div><p class="k">// desde 1996</p><h2>Indústria Metalúrgica Canoas</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">A empresa ${ic('seta')}</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Imecal', artigo: 'da', url: E.url, lang: 'pt', cor: '#a51d2a', fundo: '#121417', claro: '#f4f4f5',
  fonteTitulo: 'Lexend,system-ui,sans-serif', fonteTexto: 'Karla,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vermelho dos banners atuais: sala de medição na abertura, serviços do desenho à peça medida e os clientes em destaque.', pontos: ['Números da fábrica: 1996, 1.500 m², 5 m × 1,20 m', 'Parque de máquinas Romi, Discovery e Zocca', 'Orçamento direto para o e-mail comercial'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Escura e técnica, como um relatório de medição: dados em fonte mono, serviços numerados e o parque de máquinas ao lado das fotos.', pontos: ['"Tolerância conferida" na abertura', 'Controle dimensional com tridimensional e projetor', 'Clientes como BOMAG, Braskem e CAF'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
