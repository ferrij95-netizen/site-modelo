// Oficina Sapão (Sapão Serviços Automotivos), funilaria e pintura em Santo André/SP. Gera public/{a,b}/ e a página de escolha.
// node clientes/oficinasapao/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs oficinasapao https://www.oficinasapao.com.br/)
// Textos e fotos tirados do site atual (oficinasapao.com.br: index, oficinasapao, instalacoes, oficinaverde, servicos, contato).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Oficina Sapão', curto: 'Sapão', url: 'https://oficinasapao.overtus.com.br/', antigo: 'https://www.oficinasapao.com.br/',
  fone1: '(11) 4997-5488', fone2: '(11) 4996-3405', wa: '(11) 98682-5891', waNum: '5511986825891', email: 'contato@oficinasapao.com.br',
  rua: 'Rua Antonina, 339', bairro: 'Santa Terezinha', cidade: 'Santo André/SP', cep: '09210-330',
  manha: '8h30 às 11h50', tarde: '13h15 às 17h45',
  insta: 'https://www.instagram.com/oficinasapao/', face: 'https://www.facebook.com/oficinasapao', yt: 'https://www.youtube.com/channel/UCrfzHZEHneoExyOhs76oTVA',
};
const servicos = [
  { t: 'Funilaria e pintura', d: 'Especialistas em nacionais e importados', f: 'pintor' },
  { t: 'Polimento técnico', d: 'Mais brilho e proteção para seu carro', f: 'mercedes-a' },
  { t: 'Vitrificação Sonax', d: 'Única oficina de SP com selo SONAX SERVICE', f: 'audi-azul' },
  { t: 'Martelinho de ouro', d: 'Perfeição nos reparos artesanais de detalhes', f: 'lixa' },
  { t: 'Personalização de rodas', d: 'Pintura e customização detalhadas', f: 'mustang50' },
  { t: 'Restauração de antigos', d: 'Recuperação da originalidade de colecionáveis', f: 'patio2' },
  { t: 'Mecânica em sinistros', d: 'Seu carro totalmente reparado e perfeito', f: 'diagnostico' },
  { t: 'Reparação de blindados', d: 'Segurança e confiança, aqui também', f: 'patio4' },
  { t: 'Higienização de ar', d: 'A higienização do ar-condicionado é essencial', f: 'audi' },
];
const seguradoras = ['Allianz', 'Aliro', 'Alfa Seguradora', 'American Life', 'Assurant', 'Banco do Brasil Seguros', 'Bidu', 'Bradesco Seguros', 'Caixa Seguradora', 'Cardif', 'Chubb', 'Essor', 'HDI', 'Itaú Seguros', 'Ituran', 'Liberty', 'Mapfre', 'Mitsui', 'Porto Seguro', 'Sompo', 'Sura', 'Tokio Marine', 'Zurich'];
const depoimentos = [
  ['Melhor oficina! Recomendo a todos! São especialistas em funilaria. O carro fica perfeito, nem parece que fez nada.', 'Márcio Campos'],
  ['Além de atenderem a gente muito bem, fazem o serviço rápido e fica lindo. Quem olha não fala que foi batido. Recomendo de olhos fechados!', 'Maria Ap. Oliveira'],
  ['Preço competitivo, cumpriram o tempo para a manutenção do meu carro, a qualidade do trabalho foi ótima e o atendimento excelente.', 'Ursula Santos'],
  ['Todas as vezes que tive dúvidas eles prontamente me atenderam, sempre com muito bom humor e cortesia. Recomendo para todos que moram no ABC.', 'Paulo Oliveira'],
];
const verde = [
  { t: 'Coleta seletiva', d: 'Correta destinação de resíduos dispensados. Coleta seletiva especial em parceria com empresas especializadas.', f: 'reciclagem' },
  { t: 'Estrutura ecológica', d: 'Energia solar em toda a oficina, telhas translúcidas, lâmpadas LED e equipamentos de ponta, com menor emissão de poluentes.', f: 'solar' },
  { t: 'Insumos especiais', d: 'Tintas que não agridem o ambiente, cabine de pintura climatizada e sistema de lixamento a seco Mirka.', f: 'mirka' },
  { t: 'Água da chuva', d: 'Coleta e aproveitamento de água das chuvas, práticas ecológicas e consultoria ambiental periódica.', f: 'cisterna' },
];
const estrutura = [['1.250 m²', 'divididos em dois pátios'], ['2', 'cabines de pintura'], ['1', 'laboratório de tintas com banco de cores próprio'], ['1975', 'ano de fundação']];
const fotos = {
  fachada: 'A fachada de azulejos azuis da Sapão, na Rua Antonina, 339', 'fachada-mustang': 'Carros na entrada da oficina', 'fachada-rua': 'A fachada da Sapão vista da rua',
  patio: 'Um dos pátios da oficina', patio2: 'Carros em reparo no pátio', patio3: 'Pátio com carros em funilaria', patio4: 'Carros prontos para entrega, com a placa Sapão',
  cabine: 'Uma das duas cabines de pintura', pintor: 'Pintor na cabine, de macacão e máscara', pistola: 'Pistola de pintura em ação', lixa: 'Lixamento de para-choque', colorimetro: 'Leitura de cor com espectrofotômetro', diagnostico: 'Diagnóstico eletrônico no motor', 'cor-tablet': 'Consulta de cor no tablet',
  recepcao: 'Recepção da Sapão, com parede de placas antigas', recepcao2: 'Balcão de atendimento', entrada: 'Entrada para a recepção', escritorio: 'Escritório climatizado',
  reciclagem: 'Coletores de coleta seletiva', residuos: 'Tambores de resíduos para descarte certificado', mirka: 'Sistema de lixamento a seco Mirka', cisterna: 'Cisterna de captação de água da chuva', solar: 'Inversor da energia solar da oficina', secador: 'Secador de ar comprimido',
  bmw: 'BMW Série 2 depois do reparo', mustang: 'Mustang vermelho pronto, com placa Sapão', mustang50: 'Mustang 5.0 com a pintura recuperada', gti: 'Golf GTI com a placa Sapão', 'mercedes-a': 'Mercedes Classe A pronta para entrega', audi: 'Audi A3 com a placa Sapão', 'audi-azul': 'Audi A3 azul depois do polimento', bmw320: 'BMW 320i no pátio', 'mercedes-c': 'Mercedes Classe C pronta', lancer: 'Lancer na saída da oficina', voyage: 'Voyage vermelho reparado', acesso: 'Portão de acesso aos pátios',
};
const grandes = new Set(['recepcao', 'recepcao2', 'entrada']);
const tam = n => grandes.has(n) ? [1400, 1050] : [509, 382];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-oficina', nome: 'A oficina' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'livre-escolha', nome: 'Livre escolha' }, { slug: 'oficina-verde', nome: 'Oficina Verde' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Azulejo', b: 'Desde 1975' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Michroma&family=Manrope:wght@400;500;600;700&family=Anybody:ital,wdth,wght@0,50..150,500..900;1,50..150,700..900&family=Karla:wght@400;500;700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="${tam(n)[0]}" height="${tam(n)[1]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#13225a', b: '#0b1330' };
const tel1 = telHref(E.fone1), tel2 = telHref(E.fone2);
const wa = (msg = 'Olá! Vim pelo site e quero fazer um orçamento.') => waHref(E.waNum, msg);
const mapsQ = encodeURIComponent('Rua Antonina, 339, Santa Terezinha, Santo André SP, 09210-330');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Funilaria e pintura em Santo André desde 1975` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnWa = (txt = 'Orçamento pelo WhatsApp', cls = 'btn') => `<a class="${cls}" href="${wa()}" ${ext}>${icWa()}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const btnTel = (cls = 'btn btn-linha') => `<a class="${cls}" href="${tel1}">${ic('tel')}${E.fone1}</a>`;

const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.wa}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${tel1}">${E.fone1}</a><a href="${tel2}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário de atendimento</strong><span>${E.manha} e ${E.tarde}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Oficina Sapão na Rua Antonina, 339, Santo André" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const redes = () => `<p class="redes"><a href="${E.insta}" ${ext} aria-label="Instagram da Sapão">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook da Sapão">${ic('face')}</a><a href="${E.yt}" ${ext} aria-label="Canal da Sapão no YouTube">${ic('yt')}</a></p>`;
const form = () => `<form class="form" data-wa="Olá! Vim pelo site da Sapão e quero um orçamento." data-numero="${E.waNum}" novalidate>
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="telefone" required type="tel" autocomplete="tel"></label></div>
  <div class="form-duas"><label>Carro (modelo e ano)<input name="carro"></label><label>Seguradora<input name="seguradora" placeholder="Se for sinistro"></label></div>
  <label>Serviço<select name="servico"><option>Funilaria e pintura</option>${servicos.slice(1).map(s => `<option>${s.t}</option>`).join('')}<option>Outro</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Sapão, ${E.wa}.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo-escuro' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Oficina Sapão, página inicial"><img src="/assets/${logo}.webp" alt="Sapão Serviços Automotivos" width="746" height="369"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}<span>${E.wa}</span></a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="faixa" aria-hidden="true"></div>
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Sapão Serviços Automotivos" width="746" height="369" loading="lazy"><p>Funilaria, pintura e estética automotiva em Santo André desde 1975. Atendemos todas as seguradoras.</p>${redes()}</div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Visite a oficina</h3><ul class="rod-dados">
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('tel')}<span><a href="${tel1}">${E.fone1}</a> · <a href="${tel2}">${E.fone2}</a></span></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.wa}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('relogio')}<span>${E.manha}<br>${E.tarde}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Sapão Serviços Automotivos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar com a Sapão no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

const historia = [
  'Fundada em 1975, a Sapão Serviços Automotivos começou conquistando a confiança de todos e despertando bastante curiosidade sobre o seu nome.',
  'A inspiração veio de um Jeep adaptado como hot rod nos anos 60. Customizado, ele ganhou rodas largas, suspensão rebaixada e motor preparado, e ficou parecidíssimo com um grande sapo. Amigos e vizinhos apelidaram o carro de Sapão. O apelido caiu no gosto da família e batizou a oficina.',
  'Com os anos, a Sapão virou referência e sinônimo de qualidade em reparação automotiva no ABC. Hoje se destaca também na customização de veículos e na reparação de automóveis antigos e importados.',
];
const livreTxt = [
  'Escolher a oficina que vai reparar um carro vítima de sinistro é importante: é ela quem faz a restauração correta, com o que há de mais moderno, e evita a desvalorização do veículo. Uma escolha errada pode trazer serviço mal feito e demora na entrega.',
  'Quem contrata um seguro espera que a seguradora resolva tudo. Nem sempre acontece, e muitos consumidores, por não conhecerem seus direitos, ficam em desvantagem. Um exemplo é o direito do segurado, ou de um terceiro, à livre escolha da oficina, assegurado pelo Código de Defesa do Consumidor.',
];
const depos = (cls = '') => `<div class="depos ${cls}">${depoimentos.map(d => `<figure class="depo sobe"><blockquote>${d[0]}</blockquote><figcaption>${d[1]}</figcaption></figure>`).join('')}</div>`;
const listaSeg = () => `<ul class="seg-lista">${seguradoras.map(s => `<li>${s}</li>`).join('')}</ul><p class="seg-nota">Sua seguradora não está na lista? Não tem problema: atendemos a sua também.</p>`;

function comum(v, pag, cab) {
  pag['a-oficina'] = head(v, 'a-oficina', 'A oficina', 'A história da Sapão, fundada em 1975 em Santo André, e as instalações: 1.250 m² em dois pátios, duas cabines de pintura e laboratório de tintas próprio.') + topo(v, 'a-oficina') + cab('A oficina', 'Um Jeep apelidado de Sapão deu nome a uma oficina com mais de 50 anos', 'fachada-rua') + `
<div class="in">
<section class="hist-pag"><div class="hist-txt">${historia.map(p => `<p>${p}</p>`).join('')}</div><figure class="sobe">${foto('fachada')}<figcaption>${fotos.fachada}</figcaption></figure></section>
<section class="estr-pag"><header class="tit"><p class="k">Instalações</p><h2>Venha conhecer a oficina</h2><p>Mais de 1.250 m² divididos em dois pátios, duas cabines de pintura, um laboratório de tintas com banco de cores próprio e um escritório com climatização especial.</p></header>
<ul class="numeros">${estrutura.map(e => `<li class="sobe"><b>${e[0]}</b><span>${e[1]}</span></li>`).join('')}</ul>
<div class="galeria g-oficina">${['recepcao', 'cabine', 'patio', 'patio3', 'entrada', 'colorimetro', 'acesso', 'escritorio'].map(f => `<figure class="sobe f-${f}">${foto(f)}</figure>`).join('')}</div></section>
<section class="depo-pag"><header class="tit"><p class="k">Depoimentos</p><h2>O que dizem os clientes</h2></header>${depos()}</section>
<p class="cta-linha">${btnWa()}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Funilaria e pintura, polimento técnico, vitrificação Sonax, martelinho de ouro, rodas, restauração de antigos, mecânica em sinistros, blindados e higienização de ar.') + topo(v, 'servicos') + cab('Serviços', 'A Oficina Sapão tem o melhor para o seu carro', 'pistola') + `
<div class="in">
<p class="intro">Atendemos todas as seguradoras e ajudamos na tratativa do sinistro. Venha fazer seu orçamento com a gente.</p>
<section class="serv-pag">${servicos.map((s, i) => `<article class="servp sobe"><figure>${img(s.f)}</figure><div><span class="n">${String(i + 1).padStart(2, '0')}</span><h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="faixa-seg"><div><p class="k">Seguradoras</p><h2>Trabalhamos com todas as seguradoras do mercado</h2></div>${listaSeg()}</section>
<p class="cta-linha">${btnWa()}${btnTel()}</p>
</div>
` + rodape(v);
  pag['livre-escolha'] = head(v, 'livre-escolha', 'Livre escolha', 'Você tem o direito de escolher a oficina que vai reparar o seu carro. A Sapão atende todas as seguradoras, credenciadas ou não, com desconto e parcelamento na franquia.') + topo(v, 'livre-escolha') + cab('Livre escolha', 'Aqui quem credencia a oficina é você', 'patio4') + `
<div class="in">
<section class="livre-pag"><div class="livre-txt">${livreTxt.map(p => `<p>${p}</p>`).join('')}<p class="destaque">Por isso, marque uma vistoria com a gente: atendemos todas as seguradoras, credenciadas ou não, e oferecemos descontos e parcelamento na franquia.</p><p class="bts">${btnWa('Marcar vistoria')}${btnTel()}</p></div>
<ol class="passos">
  <li class="sobe"><b>1</b><div><h3>Avise a seguradora</h3><p>Abra o sinistro normalmente e diga que escolheu a Oficina Sapão.</p></div></li>
  <li class="sobe"><b>2</b><div><h3>Marque a vistoria</h3><p>Fale com a gente pelo WhatsApp ou telefone e traga o carro.</p></div></li>
  <li class="sobe"><b>3</b><div><h3>Cuidamos do resto</h3><p>Ajudamos na tratativa do sinistro e devolvemos o carro reparado.</p></div></li>
</ol></section>
<section class="faixa-seg"><div><p class="k">Seguradoras atendidas</p><h2>Credenciadas ou não</h2></div>${listaSeg()}</section>
<p class="saiba">Para ler mais: <a href="https://www.linkedin.com/pulse/direito-%C3%A0-livre-escolha-oficina-sap%C3%A3o-gixcf" ${ext}>Lei garante: consumidor pode escolher oficina não credenciada sem prejuízo ${ic('ext')}</a></p>
</div>
` + rodape(v);
  pag['oficina-verde'] = head(v, 'oficina-verde', 'Oficina Verde', 'Coleta seletiva, energia solar, tintas que não agridem o ambiente, lixamento a seco Mirka, água da chuva e certificado CADRI da Cetesb.') + topo(v, 'oficina-verde') + cab('Oficina Verde', 'Uma oficina de funilaria em harmonia com o meio ambiente', 'cisterna') + `
<div class="in">
<p class="intro">Transformar uma oficina em uma empresa sustentável não é tarefa fácil. A Sapão resolveu encarar o desafio e, para alinhar todos os processos, vem modificando e aperfeiçoando cada detalhe, de forma contínua.</p>
<section class="verde-pag">${verde.map(x => `<article class="sobe"><figure>${foto(x.f)}</figure><h2>${x.t}</h2><p>${x.d}</p></article>`).join('')}</section>
<section class="cert"><article class="sobe"><p class="k">Cetesb</p><h2>Certificado CADRI</h2><p>A Sapão Serviços Automotivos recebeu o certificado CADRI pelo encaminhamento de resíduos de interesse ambiental a locais de reprocessamento, armazenamento, tratamento ou disposição final licenciados ou autorizados pela Cetesb.</p></article>
<article class="sobe"><p class="k">Consultoria ambiental</p><h2>RMN Consultoria Ambiental</h2><p>Levamos a sério os cuidados com o meio ambiente. Por isso contamos com a parceria da RMN, de Rosa Maria Nakabayashi, em consultorias, auditorias, treinamentos e palestras de gestão ambiental e gerenciamento de resíduos.</p></article>
<figure class="sobe">${foto('residuos')}</figure></section>
<p class="intro">Mais do que pensar em sustentabilidade, é preciso mudar os procedimentos e os produtos usados, para desenvolver o presente e garantir um futuro melhor para as próximas gerações.</p>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Oficina Sapão: ${E.rua}, ${E.bairro}, Santo André. WhatsApp ${E.wa}, telefones ${E.fone1} e ${E.fone2}.`) + topo(v, 'contato') + cab('Contato', 'Venha visitar nossas instalações', 'recepcao2') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}${redes()}</div><div>${form()}</div></section>
<section class="mapa-pag">${mapaFrame}</section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure class="f-${f}">${img(f, ' loading="eager"')}</figure></div><div class="faixa" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Funilaria e pintura em Santo André desde 1975. Atendemos todas as seguradoras, com livre escolha da oficina. Rua Antonina, 339, Santa Terezinha.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Funilaria e pintura · Santo André · desde 1975</p><h1>Quem olha não fala que foi batido</h1><p>Mais de 50 anos de experiência em funilaria e pintura, referência em todo o ABC Paulista. Atendemos todas as seguradoras, e a escolha da oficina é sua.</p>
  <p class="bts">${btnWa()}${btnMapa()}</p></div>
  <div class="hero-a-fotos">${foto('recepcao', 'h1')}${foto('fachada', 'h2')}${foto('mustang', 'h3')}</div>
</div>
<div class="faixa" aria-hidden="true"></div>
<div class="info-a"><div class="in"><ul>
  <li>${ic('pin')}<span><b>${E.rua}</b>${E.bairro}, Santo André</span></li>
  <li>${ic('relogio')}<span><b>Atendimento</b>${E.manha} · ${E.tarde}</span></li>
  <li>${icWa()}<span><b>WhatsApp</b><a href="${wa()}" ${ext}>${E.wa}</a></span></li>
</ul></div></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>De que o seu carro precisa?</h2><p>Funilaria, pintura, polimento, vitrificação, martelinho de ouro e mais. Especialistas em nacionais e importados.</p></header>
<ol class="lista-serv">${servicos.map((s, i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></li>`).join('')}</ol>
<a class="link-seta" href="${link(v, 'servicos')}">Ver os serviços ${ic('seta')}</a></section>
<section class="livre-a"><div class="in livre-a-in"><div><p class="k">Livre escolha</p><h2>Você tem esse direito</h2><p>Escolha a oficina de sua preferência e conte com o seu seguro sem preocupação. Atendemos todas as seguradoras, credenciadas ou não, com desconto e parcelamento na franquia.</p><a class="btn btn-claro" href="${link(v, 'livre-escolha')}">Entenda a livre escolha ${ic('seta')}</a></div><ul class="seg-mini">${seguradoras.slice(0, 12).map(s => `<li>${s}</li>`).join('')}<li>e outras</li></ul></div></section>
<section class="in oficina-a"><div class="oficina-a-fotos">${foto('cabine', 'o1')}${foto('patio', 'o2')}${foto('colorimetro', 'o3')}</div><div><p class="k">Estrutura</p><h2>1.250 m² dedicados à reparação automotiva</h2><p>Dois pátios, duas cabines de pintura e um laboratório de tintas com banco de cores próprio.</p><a class="link-seta" href="${link(v, 'a-oficina')}">Conheça as instalações ${ic('seta')}</a></div></section>
<section class="prontos-a"><div class="in"><header class="tit"><p class="k">Projetos em destaque</p><h2>Prontos para entrega</h2></header></div><div class="tira">${['bmw', 'gti', 'mercedes-a', 'mustang50', 'audi', 'mercedes-c', 'voyage', 'lancer'].map(f => foto(f)).join('')}</div></section>
<section class="in verde-a"><figure>${foto('cisterna')}</figure><div><p class="k">Oficina Verde</p><h2>Um novo conceito</h2><p>Da execução dos serviços aos produtos e à estrutura, tudo em harmonia com o meio ambiente: energia solar, coleta seletiva, água da chuva e certificado CADRI da Cetesb.</p><a class="link-seta" href="${link(v, 'oficina-verde')}">Entenda melhor ${ic('seta')}</a></div></section>
<section class="in depo-a"><header class="tit"><p class="k">Depoimentos</p><h2>Sinônimo de confiança e qualidade</h2></header>${depos('duas')}</section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Venha fazer seu orçamento</h2><p>${E.rua}, ${E.bairro}, Santo André. ${E.fone1} · ${E.fone2}</p></div><p class="bts">${btnWa('Chamar no WhatsApp')}${btnMapa('btn btn-linha')}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b"><div class="in cab-b-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina Sapão, funilaria e pintura em Santo André desde 1975. Dois pátios, duas cabines de pintura e laboratório de tintas próprio. Todas as seguradoras.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Sapão Serviços Automotivos · Santo André</p><h1><span>Desde</span> 1975</h1><p class="lead">Funilaria e pintura com mais de 50 anos de oficina. O nome veio de um Jeep hot rod dos anos 60, tão rebaixado e largo que os vizinhos o chamavam de Sapão.</p>
  <p class="bts">${btnWa()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div>
  <div class="hero-b-mosaico">${['patio3', 'pintor', 'gti', 'recepcao2', 'patio2'].map((f, i) => foto(f, `m${i + 1}`)).join('')}</div>
</div></section>
<section class="num-b"><div class="in"><ul class="numeros">${estrutura.map(e => `<li class="sobe"><b>${e[0]}</b><span>${e[1]}</span></li>`).join('')}</ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>Nacionais e importados, do martelinho ao blindado</h2></header>
<div class="cards-b">${servicos.slice(0, 6).map((s, i) => `<article class="card-b sobe"><figure>${img(s.f)}</figure><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p></article>`).join('')}</div>
<p class="mais-b">Também: ${servicos.slice(6).map(s => s.t.toLowerCase()).join(', ')}. <a class="link-seta" href="${link(v, 'servicos')}">Todos os serviços ${ic('seta')}</a></p></section>
<section class="livre-b"><div class="in livre-b-in"><h2>Aqui quem credencia a oficina é você.</h2><div><p>O Código de Defesa do Consumidor garante a livre escolha da oficina. Atendemos todas as seguradoras, credenciadas ou não, e oferecemos desconto e parcelamento na franquia.</p><p class="bts">${btnWa('Marcar vistoria')}<a class="btn btn-linha" href="${link(v, 'livre-escolha')}">Como funciona</a></p></div></div></section>
<section class="in hist-b"><figure>${foto('fachada-mustang')}</figure><div><p class="k">A história</p><h2>Um apelido que virou nome de oficina</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'a-oficina')}">Conheça a Sapão ${ic('seta')}</a></div></section>
<section class="verde-b"><div class="in verde-b-in"><div><p class="k">Oficina Verde</p><h2>Funilaria que cuida do ar e da água</h2><ul class="lista-check">${verde.map(x => `<li>${ic('check')}<span><b>${x.t}.</b> ${x.d}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'oficina-verde')}">Certificado CADRI e mais ${ic('seta')}</a></div><div class="verde-b-fotos">${foto('mirka', 'v1')}${foto('reciclagem', 'v2')}</div></div></section>
<section class="in depo-b"><header class="tit"><p class="k">Clientes</p><h2>"Melhor que carro zero"</h2></header>${depos()}</section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Traga o seu carro para a Sapão</h2><p>${E.rua}, ${E.bairro}, Santo André · ${E.manha} e ${E.tarde}</p></div><p class="bts">${btnWa('Chamar no WhatsApp')}${btnMapa()}</p></div></section>
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
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#1f4fb4', fundo: '#0b1330', claro: '#f3f5fa',
  fonteTitulo: "'Michroma',system-ui,sans-serif", fonteTexto: "'Manrope',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no azul-marinho do logo e com a faixa de azulejo azul, branco e vermelho da fachada. Abre com a frase dos clientes, "Quem olha não fala que foi batido", e fotos reais da recepção e da oficina.', pontos: ['Os 9 serviços numerados logo no início', 'Livre escolha e seguradoras em destaque', 'Carros prontos em uma faixa de fotos'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura, em marinho profundo com dourado do selo de 50 anos. Abre com "Desde 1975", a história do Jeep apelidado de Sapão e um mosaico de fotos dos pátios e da cabine.', pontos: ['A história do nome em primeiro plano', 'Números da estrutura em destaque', 'Oficina Verde com fotos reais'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
