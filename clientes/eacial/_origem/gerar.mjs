// EACIAL – Equipamentos e Acessórios Industriais e Agrícolas (Piracicaba/SP): engrenagens, coroas, pinhões, eixos e usinagem de precisão desde 1958.
// node clientes/eacial/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs eacial http://www.eacial.com.br/)
// Textos, fotos e contatos do site atual (página única com janelas, 2025). Fotos de produto recortadas das imagens compostas do site.
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');

const E = {
  nome: 'EACIAL', url: 'https://eacial.overtus.com.br/', antigo: 'http://www.eacial.com.br/',
  fone: '(19) 3124-3355', wa: '551931243367', waTxt: '(19) 3124-3367', email: 'comercial@eacial.com.br',
  end: 'Rua Antonio Borja Medina, 808', bairro: 'Distrito Industrial', cidade: 'Piracicaba – SP', cep: '13422-010',
  mapaLink: 'https://maps.app.goo.gl/FXpyYeNPN4ApPxh39',
  mapa: 'https://www.google.com/maps?q=Rua+Antonio+Borja+Medina,+808,+Piracicaba+-+SP&output=embed',
  certificados: 'http://www.eacial.com.br/certificados/eacial-certificados.pdf',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;0,700;0,800;1,800&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const PROD = [
  { id: 'engrenagens', nome: 'Engrenagens', foto: 'p-engrenagens.webp', sub: 'Cilíndricas retas e helicoidais',
    txt: 'Engrenagens cilíndricas de dentes retos e helicoidais para redutores, transmissões e máquinas em geral, produzidas a partir do desenho ou da amostra do cliente.' },
  { id: 'coroas', nome: 'Coroas e roscas sem fim', foto: 'p-sem-fim.webp', sub: 'Em bronze e aço',
    txt: 'Conjuntos de coroa e rosca sem fim para redução de velocidade e transferência de torque, com coroas em bronze e outros materiais conforme a aplicação.' },
  { id: 'pinhoes', nome: 'Pinhões', foto: 'p-pinhoes.webp', sub: 'Pinhões e eixos-pinhão',
    txt: 'Pinhões de dentes retos e helicoidais, inclusive eixos-pinhão usinados em peça única, para trabalhar em par com engrenagens e coroas.' },
  { id: 'acoplamentos', nome: 'Acoplamentos', foto: 'p-acoplamentos.webp', sub: 'Transmissão entre eixos',
    txt: 'Acoplamentos para ligação entre eixos de motores, redutores e equipamentos, fabricados sob medida para o torque e o encaixe de cada conjunto.' },
  { id: 'eixos', nome: 'Eixos', foto: 'p-eixos.webp', sub: 'Lisos, estriados e com dentado',
    txt: 'Eixos de transmissão, eixos estriados e eixos com dentado usinado, com acabamento e tolerâncias definidos em projeto.' },
  { id: 'conjuntos', nome: 'Conjuntos', foto: 'p-conjuntos.webp', sub: 'Montados e prontos para operar',
    txt: 'Conjuntos mecânicos para transferência de torque, movimentação e sistemas motrizes, com engrenagens, eixos e acoplamentos fabricados e montados pela EACIAL.' },
];
const TIPOS = ['Engrenagens cilíndricas retas', 'Engrenagens helicoidais', 'Coroas e roscas sem fim', 'Cremalheiras', 'Engrenagens cônicas retas', 'Eixos estriados', 'Pinhões e eixos-pinhão', 'Acoplamentos'];
const MATERIAIS = ['Aço', 'Bronze', 'Ferro fundido', 'Nylon', 'Celeron'];
const SETORES = [
  { t: 'Agrícola', d: 'Engrenagens e peças de transmissão para máquinas e implementos agrícolas.' },
  { t: 'Aeroespacial', d: 'Componentes aeronáuticos usinados, com gestão da qualidade AS9100.' },
  { t: 'Eólico', d: 'Peças e conjuntos de transmissão para o setor de energia eólica.' },
  { t: 'Industrial', d: 'Redutores de velocidade, sistemas de transmissão e equipamentos em geral.' },
];
const C = {
  hist: 'Há mais de 65 anos desenvolvendo produtos e prestando serviço de usinagem com alto padrão de qualidade, a EACIAL consolida-se como uma das principais empresas de produção de engrenagens e peças para os setores agrícola, aeroespacial, eólico e industrial.',
  desde: 'Desde 1958, a EACIAL é especializada em usinagem de alta precisão. Ao longo dos anos, consolidamos nossa expertise na fabricação de engrenagens e componentes para transmissão, atendendo com excelência os setores agrícola, aeroespacial, eólico e industrial, incluindo redutores de velocidade, sistemas de transmissão e equipamentos em geral.',
  prod: 'Produção de engrenagens cilíndricas retas e helicoidais, coroas e roscas sem fim, cremalheiras e engrenagens cônicas retas destinadas a máquinas e equipamentos em geral, com fabricação através de desenhos ou amostras.',
  serv: 'Tecnologia, equipe técnica qualificada e a política da qualidade associada ao trabalho contínuo nos processos de desenvolvimento e fabricação são diferenciais que se refletem em peças de qualidade para os setores agrícola, eólico, aeroespacial e todas as indústrias que necessitam de peças e sistemas que utilizem engrenagens e sistemas motrizes.',
  serv2: 'Desenvolvimento técnico e acompanhamento por profissionais qualificados para a produção de sistemas com conjuntos mecânicos para transferência de torque, movimentação e sistemas motrizes com engrenagens, cremalheiras, sem-fins, eixos estriados, coroas e acoplamentos.',
  serv3: 'Produção em materiais diversificados, como bronze, ferro fundido, nylon, celeron, entre outros.',
  politica: 'Atender, tecnicamente e nos prazos estipulados, as necessidades e expectativas dos clientes, na fabricação e montagem de componentes de transmissão mecânica, na prestação de serviços de usinagem e na fabricação de componentes aeronáuticos usinados, aperfeiçoando os processos industriais, respeitando o meio ambiente e reduzindo o impacto ambiental. Atendendo a legislação ambiental e a segurança na execução do trabalho. Através do desenvolvimento contínuo do Sistema de Gestão Integrado, buscando a melhoria contínua de sua eficácia.',
  cert: 'A EACIAL possui seu Sistema de Gestão da Qualidade certificado com base nos requisitos das normas AS9100 e ISO 9001, pelo organismo de certificação TÜV NORD Brasil.',
  local: 'Atuando há mais de 65 anos no mercado, a EACIAL está localizada em uma das principais regiões industriais de Piracicaba/SP.',
};
const ETAPAS = [
  { t: 'Desenho ou amostra', d: 'Fabricação a partir do desenho técnico ou de uma amostra da peça.' },
  { t: 'Desenvolvimento técnico', d: 'Acompanhamento de profissionais qualificados do projeto à produção.' },
  { t: 'Usinagem e dentado', d: 'Usinagem de alta precisão em aço, bronze, ferro fundido, nylon ou celeron.' },
  { t: 'Medição e controle', d: 'Inspeção dimensional dentro do sistema de gestão AS9100 e ISO 9001.' },
  { t: 'Montagem de conjuntos', d: 'Componentes montados em conjuntos de transmissão quando o projeto pede.' },
];

const NAV = [
  { slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'Empresa' }, { slug: 'produtos', nome: 'Produtos' }, { slug: 'servicos', nome: 'Serviços' },
  { slug: 'qualidade', nome: 'Qualidade' }, { slug: 'vagas', nome: 'Vagas' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'EACIAL, Piracicaba/SP desde 1958: engrenagens, coroas e roscas sem fim, pinhões, acoplamentos, eixos e conjuntos. Usinagem de precisão com certificação AS9100 e ISO 9001.',
  empresa: 'Desde 1958 em Piracicaba/SP, a EACIAL fabrica engrenagens e componentes de transmissão para os setores agrícola, aeroespacial, eólico e industrial.',
  produtos: 'Engrenagens cilíndricas retas e helicoidais, coroas e roscas sem fim, cremalheiras, engrenagens cônicas, pinhões, acoplamentos, eixos e conjuntos.',
  servicos: 'Usinagem de alta precisão e desenvolvimento de conjuntos mecânicos para transferência de torque, movimentação e sistemas motrizes.',
  qualidade: 'Política da Qualidade da EACIAL e Sistema de Gestão certificado AS9100 e ISO 9001 pela TÜV NORD Brasil.',
  vagas: 'Trabalhe na EACIAL: envie seu currículo para a usinagem de engrenagens em Piracicaba/SP.',
  contato: 'Fale com a EACIAL: (19) 3124-3355, WhatsApp (19) 3124-3367, comercial@eacial.com.br. Rua Antonio Borja Medina, 808, Distrito Industrial, Piracicaba – SP.',
};
const titulos = { index: 'EACIAL · Engrenagens e usinagem de precisão desde 1958', empresa: 'Empresa · EACIAL', produtos: 'Produtos · EACIAL', servicos: 'Serviços · EACIAL', qualidade: 'Qualidade · EACIAL', vagas: 'Vagas · EACIAL', contato: 'Contato · EACIAL' };

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = (b = false) => `<img class="logo" src="${IMG}${b ? 'logo-branco' : 'logo'}.svg" alt="EACIAL" width="64" height="57">`;

function topo(v, ativo) {
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>${ic('pin')} ${E.end} · ${E.bairro} · ${E.cidade}</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo()}<span class="marca-txt">Equipamentos e Acessórios<br>Industriais e Agrícolas</span></a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), ativo)}</ul></nav>
    <a class="btn topo-cta" href="${link(v, 'contato')}#form">Orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Desenho ou amostra</p><h2>Envie a peça que você precisa e receba o orçamento</h2><p>Fabricamos engrenagens, coroas, pinhões, eixos e conjuntos a partir do desenho técnico ou da amostra.</p></div>
  <div class="cta-bts"><a class="btn" href="${waHref(E.wa, 'Olá, gostaria de um orçamento com a EACIAL.')}" target="_blank" rel="noopener">${icWa()} WhatsApp</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">${ic('mail')} Pedir orçamento</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca">${logo(true)}<p>EACIAL – Equipamentos e Acessórios Industriais e Agrícolas Ltda. Engrenagens e usinagem de precisão desde 1958.</p><p class="selo-txt">${ic('escudo')} AS9100 · ISO 9001 · TÜV NORD</p></div>
  <div><h3>Produtos</h3><ul>${PROD.map(p => `<li><a href="${link(v, 'produtos')}#${p.id}">${p.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Empresa</h3><ul><li><a href="${link(v, 'empresa')}">História</a></li><li><a href="${link(v, 'servicos')}">Serviços</a></li><li><a href="${link(v, 'qualidade')}">Qualidade</a></li><li><a href="${link(v, 'vagas')}">Vagas</a></li><li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  <div><h3>Contato</h3><p>${E.end}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</p><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${waHref(E.wa)}" target="_blank" rel="noopener">WhatsApp ${E.waTxt}</a><br><a href="mailto:${E.email}">${E.email}</a></p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} EACIAL. Todos os direitos reservados.</span><span>Prévia de site por Overtus</span></div></footer>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#005bc4' }) + topo(v, slug) + corpo + rodape(v);
const cabecalhoPg = (v, nome, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / ${esc(nome)}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const prodCards = v => `<ul class="prods">${PROD.map((p, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, 'produtos')}#${p.id}"><span class="prod-foto">${fig(p.foto, p.nome)}</span><div><p class="prod-sub">${p.sub}</p><h3>${p.nome}</h3><span class="link-seta">Ver produto ${ic('seta')}</span></div></a></li>`).join('')}</ul>`;
const setores = `<ul class="setores">${SETORES.map((s, i) => `<li class="sobe" style="--i:${i}"><span class="set-n">0${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}</ul>`;
const etapas = `<ol class="etapas">${ETAPAS.map((p, i) => `<li class="sobe" style="--i:${i}"><span class="et-n">${i + 1}</span><h3>${p.t}</h3><p>${p.d}</p></li>`).join('')}</ol>`;
const materiais = `<ul class="mats">${MATERIAIS.map(m => `<li>${m}</li>`).join('')}</ul>`;
const tipos = `<ul class="tipos">${TIPOS.map(t => `<li>${ic('engrenagem')} ${t}</li>`).join('')}</ul>`;
const certBox = v => `<div class="cert sobe">${fig('selo-qualidade.webp', 'Selo do Sistema de Gestão da Qualidade EACIAL ISO 9001 e AS9100', 'cert-selo')}<div><p class="sobre">Sistema de Gestão da Qualidade</p><h3>Certificado AS9100 e ISO 9001</h3><p>${C.cert}</p><a class="link-seta" href="${link(v, 'qualidade')}">Política da Qualidade ${ic('seta')}</a></div></div>`;
const formulario = `<form class="form" id="form" data-wa="${E.wa}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>E-mail*<input name="email" type="email" required autocomplete="email"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Produto<select name="produto">${PROD.map(p => `<option>${p.nome}</option>`).join('')}<option>Cremalheiras ou engrenagens cônicas</option><option>Serviço de usinagem</option><option>Outro assunto</option></select></label><label>Quantidade<input name="quantidade" placeholder="Ex.: 20 peças"></label></div>
  <label>Mensagem*<textarea name="mensagem" rows="5" required placeholder="Descreva a peça, o material e a aplicação. Se tiver desenho técnico, informe na mensagem."></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da EACIAL. Desenhos técnicos podem ser enviados para ${E.email}.</p>
</form>`;
const contInfo = `<aside class="cont-info sobe"><ul>
    <li>${ic('tel')}<div><b>Telefone</b><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
    <li>${icWa()}<div><b>WhatsApp</b><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('pin')}<div><b>Endereço</b><span>${E.end}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</span></div></li>
  </ul></aside>`;

// ---------- páginas internas ----------
const paginaEmpresa = v => cabecalhoPg(v, 'Empresa', 'Fabricação de soluções de movimento desde 1958', 'História e informações da EACIAL, em Piracicaba/SP.', 'desenho-engrenagens.webp') + `
<section class="sec emp"><div class="in emp-in">
  <div class="sobe emp-txt"><p class="emp-lead">${C.hist}</p><p>${C.desde}</p><p>${C.local}</p></div>
  <figure class="sobe emp-foto">${fig('fachada.webp', 'Sede da EACIAL no Distrito Industrial de Piracicaba')}<figcaption><b>1958</b>início da EACIAL em Piracicaba – SP</figcaption></figure>
</div></section>
<section class="sec numeros-sec"><div class="in"><ul class="numeros">
  <li><b>1958</b><span>ano de fundação</span></li><li><b>65+</b><span>anos de usinagem de precisão</span></li><li><b>4</b><span>setores: agrícola, aeroespacial, eólico e industrial</span></li><li><b>AS9100</b><span>e ISO 9001 pela TÜV NORD Brasil</span></li>
</ul></div></section>
<section class="sec set-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Setores atendidos</p><h2>A engrenagem que move seu negócio, nós fabricamos</h2></div>${setores}</div></section>
<section class="sec local"><div class="in local-in">
  <div class="sobe"><p class="sobre">Endereço</p><h2>Distrito Industrial de Piracicaba</h2><p>${E.end}<br>${E.bairro} · ${E.cidade}<br>CEP ${E.cep}</p><a class="link-seta" href="${E.mapaLink}" target="_blank" rel="noopener">Abrir no Google Maps ${ic('seta')}</a></div>
  <div class="mapa sobe"><iframe src="${E.mapa}" title="Mapa da EACIAL em Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
</div></section>`;

const paginaProdutos = v => cabecalhoPg(v, 'Produtos', 'Produtos', C.prod, 'pecas-variadas.webp') + `
<section class="sec tipos-sec"><div class="in tipos-in">
  <div class="sobe"><p class="sobre">O que fabricamos</p><h2>Do desenho ou da amostra à peça pronta</h2><p>Cada peça é produzida conforme o desenho técnico ou a amostra enviada pelo cliente, para máquinas e equipamentos em geral.</p></div>
  <div class="sobe">${tipos}<p class="mats-tit">Materiais</p>${materiais}</div>
</div></section>
${PROD.map((p, i) => `<section class="sec pd${i % 2 ? ' pd-alt' : ''}" id="${p.id}"><div class="in pd-in">
  <figure class="sobe"><a href="${IMG}${p.foto}" data-foto>${fig(p.foto, p.nome)}</a></figure>
  <div class="sobe"><p class="sobre">${p.sub}</p><h2>${p.nome}</h2><p>${p.txt}</p><ul class="checks">${['Fabricação por desenho ou amostra', 'Materiais conforme a aplicação', 'Controle de qualidade AS9100 e ISO 9001'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul><a class="btn" href="${link(v, 'contato')}#form">Pedir orçamento ${ic('seta')}</a></div>
</div></section>`).join('')}`;

const paginaServicos = v => cabecalhoPg(v, 'Serviços', 'Nossos serviços', 'Usinagem de alta precisão e desenvolvimento de conjuntos de transmissão.', 'usinagem-engrenagens.webp') + `
<section class="sec serv"><div class="in serv-in">
  <div class="sobe"><p class="serv-lead">${C.serv}</p><p>${C.serv2}</p><p>${C.serv3}</p><a class="btn" href="${link(v, 'contato')}#form">Enviar desenho ou amostra ${ic('seta')}</a></div>
  <figure class="sobe serv-foto"><a href="${IMG}projeto-pecas.webp" data-foto>${fig('projeto-pecas.webp', 'Projeto e peças usinadas pela EACIAL')}</a></figure>
</div></section>
<section class="sec etapas-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Como trabalhamos</p><h2>Da peça desenhada ao conjunto montado</h2></div>${etapas}</div></section>
<section class="sec mats-sec"><div class="in mats-in"><div class="sobe"><p class="sobre">Materiais</p><h2>Produção em materiais diversificados</h2></div>${materiais}</div></section>`;

const paginaQualidade = v => cabecalhoPg(v, 'Qualidade', 'Política da Qualidade', 'Sistema de Gestão da Qualidade certificado AS9100 e ISO 9001.', 'qualidade-laboratorio.webp') + `
<section class="sec qual"><div class="in qual-in">
  <blockquote class="sobe politica"><p>“${C.politica}”</p></blockquote>
  <figure class="sobe qual-foto"><a href="${IMG}qualidade-medicao.webp" data-foto>${fig('qualidade-medicao.webp', 'Sala de medição da EACIAL')}</a></figure>
</div></section>
<section class="sec cert-sec"><div class="in">${certBox(v)}<p class="centro"><a class="btn btn-linha" href="${E.certificados}" target="_blank" rel="noopener">${ic('livro')} Ver certificados</a></p></div></section>`;

const paginaVagas = v => cabecalhoPg(v, 'Vagas', 'Trabalhe conosco', 'Faça parte de uma equipe técnica qualificada em usinagem de precisão.', null) + `
<section class="sec vagas"><div class="in vagas-in">
  <figure class="sobe vagas-foto">${fig('trabalhe-conosco.webp', 'Profissional de usinagem')}</figure>
  <div class="sobe"><p class="sobre">Banco de talentos</p><h2>Envie seu currículo</h2><p>A EACIAL mantém um banco de currículos para as áreas de usinagem, produção, qualidade e administração. Envie seu currículo com a área de interesse no assunto do e-mail.</p>
    <ul class="checks">${['Usinagem e operação de máquinas', 'Inspeção e controle da qualidade', 'Produção, montagem e logística', 'Administrativo e comercial'].map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>
    <a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Currículo - Trabalhe conosco')}">${ic('mail')} Enviar currículo</a></div>
</div></section>`;

const paginaContato = v => cabecalhoPg(v, 'Contato', 'Fale com a EACIAL', 'Por e-mail, telefone, WhatsApp ou pelo formulário.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Peça seu orçamento</h2>${formulario}</div>
  ${contInfo}
</div></section>
<section class="mapa-sec"><iframe src="${E.mapa}" title="Mapa da EACIAL em Piracicaba" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></section>`;

const internas = v => ({ empresa: pagina(v, 'empresa', paginaEmpresa(v)), produtos: pagina(v, 'produtos', paginaProdutos(v)), servicos: pagina(v, 'servicos', paginaServicos(v)), qualidade: pagina(v, 'qualidade', paginaQualidade(v)), vagas: pagina(v, 'vagas', paginaVagas(v)), contato: pagina(v, 'contato', paginaContato(v)) });

// ---------- A "Precisão": clara, peças em recorte na abertura ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Piracicaba – SP · desde 1958</p>
    <h1>Engrenagens e usinagem de alta precisão</h1>
    <p class="lead">Engrenagens, coroas e roscas sem fim, pinhões, acoplamentos, eixos e conjuntos para os setores agrícola, aeroespacial, eólico e industrial.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver produtos ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'contato')}#form">Pedir orçamento</a></div>
    <p class="hero-selo">${ic('escudo')} Certificada AS9100 e ISO 9001 · TÜV NORD Brasil</p>
  </div>
  <figure class="hero-foto">${fig('linha-engrenagens.webp', 'Coroa em bronze, engrenagens, pinhões e eixo fabricados pela EACIAL')}</figure>
</div></section>
<section class="setores-faixa"><div class="in">${setores}</div></section>

<section class="sec prods-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">O que fabricamos</p><h2>Componentes de transmissão para o seu negócio</h2><p>${C.prod}</p></div>
  ${prodCards(v)}
</div></section>

<section class="sec emp-home"><div class="in emp-home-in">
  <figure class="sobe">${fig('fachada.webp', 'Sede da EACIAL em Piracicaba')}</figure>
  <div class="sobe"><p class="sobre">Fabricação de soluções de movimento</p><h2>Mais de 65 anos de usinagem</h2><p>${C.desde}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a EACIAL ${ic('seta')}</a></div>
</div></section>

<section class="sec etapas-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Serviços</p><h2>Do desenho ou da amostra ao conjunto montado</h2></div>
  ${etapas}
</div></section>

<section class="sec cert-sec"><div class="in">${certBox(v)}</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Oficina": usinagem em tela cheia, azul-marinho e vermelho ----------
function versaoB() {
  const v = 'b';
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}usinagem-engrenagens.webp)"></div><div class="in hero-in">
  <p class="sobre">EACIAL · Piracicaba – SP · desde 1958</p>
  <h1>Não importa o setor: a engrenagem que move seu negócio, nós fabricamos</h1>
  <p class="lead">Usinagem de alta precisão para os setores agrícola, aeroespacial, eólico e industrial, com fabricação a partir de desenhos ou amostras.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'contato')}#form">Pedir orçamento ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></div>
</div></section>
<section class="numeros-sec"><div class="in"><ul class="numeros">
  <li><b>1958</b><span>ano de fundação em Piracicaba</span></li><li><b>65+</b><span>anos de usinagem de precisão</span></li><li><b>6</b><span>linhas de produtos de transmissão</span></li><li><b>AS9100</b><span>e ISO 9001 pela TÜV NORD Brasil</span></li>
</ul></div></section>

<section class="sec catalogo"><div class="in catalogo-in">
  <div class="sobe cat-tit"><p class="sobre">O que fabricamos</p><h2>Para o seu negócio</h2><p>${C.prod}</p>${fig('linha-produtos.webp', 'Engrenagem helicoidal, eixo, pinhão, rosca sem fim e coroa em bronze', 'cat-foto')}</div>
  <ol class="cat-lista">${PROD.map((p, i) => `<li class="sobe"><a href="${link(v, 'produtos')}#${p.id}"><span class="cat-n">0${i + 1}</span>${fig(p.foto, p.nome)}<span class="cat-txt"><b>${p.nome}</b><small>${p.sub}</small></span>${ic('seta')}</a></li>`).join('')}</ol>
</div></section>

<section class="sec set-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Setores atendidos</p><h2>Agrícola, aeroespacial, eólico e industrial</h2></div>
  ${setores}
</div></section>

<section class="sec qual-home"><div class="in qual-home-in">
  <div class="sobe"><p class="sobre">Política da Qualidade</p><h2>Atender, tecnicamente e nos prazos estipulados</h2><p>${C.cert}</p><div class="hero-bts"><a class="btn" href="${link(v, 'qualidade')}">Política da Qualidade ${ic('seta')}</a><a class="btn btn-linha" href="${link(v, 'vagas')}">Trabalhe conosco</a></div></div>
  <figure class="sobe">${fig('qualidade-laboratorio.webp', 'Laboratório de medição da EACIAL')}</figure>
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
await escolha(pub, {
  nome: 'EACIAL', artigo: 'da', url: E.url, lang: 'pt', cor: '#005bc4', fundo: '#0b2147', claro: '#f1f5fb',
  fonteTitulo: "'Exo 2',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Precisão', paginas: 7, texto: 'Clara, com as peças da EACIAL em recorte na abertura, os quatro setores atendidos, os seis produtos e o selo AS9100 e ISO 9001 em destaque.', pontos: ['Uma página para cada assunto do menu antigo', 'Logo redesenhado em vetor', 'Formulário que abre o WhatsApp'] },
    { letra: 'b', nome: 'Oficina', paginas: 7, texto: 'A usinagem em tela cheia com o lema do banner atual, os produtos em lista de catálogo e a Política da Qualidade na página inicial.', pontos: ['Mesmos textos do site atual', 'Sem janelas que escondem o conteúdo', 'Endereço com mapa no contato'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
