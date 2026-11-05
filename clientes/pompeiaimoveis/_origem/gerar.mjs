// Imobiliária Pompéia (Vila Pompéia, Campinas/SP, empresa familiar desde 1987, CRECI 8256). Gera public/{a,b}/ e a página de escolha.
// node clientes/pompeiaimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs pompeiaimoveis http://www.pompeiaimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 da API do WordPress do site atual (/wp-json/wp/v2/estate, os 14 publicados) e da página de cada imóvel.
// O site atual não tem WhatsApp: formulários abrem o e-mail (data-email) e os botões ligam.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Imobiliária Pompéia', url: 'https://pompeiaimoveis.overtus.com.br/', antigo: 'http://www.pompeiaimoveis.com.br/',
  fones: ['(19) 3227-1099', '(19) 3269-3430'], email: 'perguntas@pompeiaimoveis.com.br',
  end: 'Av. Mirandópolis, 119', bairro: 'Vila Pompéia, Campinas - SP', cep: '13050-470',
  mapa: 'Av. Mirandópolis 119 Vila Pompéia Campinas SP',
  horario: [['Segunda a quinta', '8h às 12h e 14h às 17h'], ['Sexta-feira', '8h às 13h'], ['Sábado e domingo', 'fechado']],
  curto: 'Imobiliária familiar na Vila Pompéia, em Campinas, desde 1987: venda, locação, administração e departamento jurídico.',
};
// Textos do site atual (Sobre nós)
const sobre = 'A Imobiliária Pompéia é uma empresa familiar, fundada em 1987 e localizada na tradicional região da Vila Pompéia em Campinas-SP. A empresa atende toda Região Metropolitana oferecendo a melhor opção de imóvel residencial, comercial ou industrial para cada cliente, atendendo sempre suas necessidades específicas quanto a orçamento, localização, espaço e comodidade.';
const sobre2 = 'A Imobiliária Pompéia presta serviços de venda, locação, administração e departamento jurídico e conta com equipe de profissionais treinados que prestam um serviço de excelência com um atendimento de primeira.';
const missao = 'Oferecer o imóvel ideal para a demanda de cada cliente, intermediando na compra, venda e aluguel para que haja satisfação de ambos os lados.';
const visao = 'Ser reconhecida por todo o estado de São Paulo pela sua transparência e excelência no seu serviço imobiliário.';
const servicos = [['chave', 'Locação'], ['casa', 'Venda'], ['pacote', 'Administração'], ['livro', 'Departamento jurídico']];
// Página "Documentos" do site atual
const docs = {
  residencial: { titulo: 'Locação residencial', grupos: [
    ['Locatário', ['RG e CPF', 'RG e CPF do cônjuge', 'Carteira de trabalho', 'Certidão de casamento ou nascimento', '2 últimos comprovantes de renda', 'Comprovante de endereço']],
    ['Fiador', ['RG e CPF', 'RG e CPF do cônjuge', 'Certidão de casamento', '2 últimos comprovantes de renda', 'Carteira de trabalho', 'Comprovante de endereço', 'Escritura do imóvel de Campinas ou região (quitada e registrada)', 'Certidão negativa de ônus atualizada (original)', 'IPTU do imóvel (atual)']],
  ], nota: 'Autônomo ou profissional liberal: apresentar a última declaração do Imposto de Renda e o comprovante de recolhimento.' },
  comercial: { titulo: 'Locação comercial', grupos: [
    ['Locatário (pessoa jurídica)', ['Contrato social (estatuto)', 'Última alteração contratual', 'Inscrição estadual', 'Cartão CNPJ', 'Referências bancárias', 'Referências comerciais', 'Cópia da última declaração de IRPJ']],
    ['Fiador', ['RG e CPF', 'RG e CPF do cônjuge', 'Certidão de nascimento ou casamento', 'Comprovação de renda', 'IPTU do imóvel (atual)', 'Escritura do imóvel (registrada)', 'Certidão negativa de ônus atualizada (original)']],
  ], nota: 'Os fiadores não podem pertencer ao quadro de sócios da empresa locatária.' },
};

const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(i => ({ ...i, slug: `imovel/${i.cod}` }));
const vendas = imoveis.filter(i => i.neg === 'venda');
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const COMERCIAL = ['Salão comercial', 'Salões comerciais', 'Salão + 2 casas', 'Barracão', 'Sobreloja', 'Imóvel comercial', 'Sala comercial'];
const grupo = i => (COMERCIAL.includes(i.tipo) ? 'comercial' : i.tipo === 'Terreno' ? 'terreno' : 'casa');
const comerciais = imoveis.filter(i => grupo(i) === 'comercial');
const negTxt = i => (i.neg === 'venda' ? 'à venda' : 'para alugar');
const local = i => `${i.bairro}${i.cidade !== 'Campinas' ? `, ${i.cidade}` : ''}`;
const sufixo = i => (i.neg === 'aluguel' ? '/mês' : '');
const area = i => i.area || i.terreno || '';
const assunto = i => `Imóvel cód. ${i.cod}: ${i.tipo} ${negTxt(i)} em ${local(i)}`;

const nav = [{ slug: 'imoveis', nome: 'Imóveis' }, { slug: 'documentos', nome: 'Documentos' }, { slug: 'empresa', nome: 'A Pompéia' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Placa', b: 'Telhado' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Mohave:wght@500;600;700&family=Golos+Text:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;0,500;0,600;1,500&family=Sarabun:wght@400;500;600&display=swap',
};
const cores = { a: '#c4161c', b: '#1b1918' };
const head = (v, s, t, d) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Imobiliária Pompéia | Imóveis em Campinas desde 1987' : `${t} | Imobiliária Pompéia`, descricao: d, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const fotoIm = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/imoveis/${n}.webp" width="1400" height="1050" alt="${esc(alt)}"${extra}>`;
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Imobiliária Pompéia, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="560" height="${claro ? 480 : 469}" alt="Imobiliária Pompéia"></${tag}>`;
const semFoto = () => `<div class="sem-foto"><img src="/assets/img/telhado.webp" width="600" height="185" alt=""><span>Fotos sob consulta</span></div>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ligar = (cls = 'btn') => `<a class="${cls}" href="${telHref(E.fones[0])}">${ic('tel')}${E.fones[0]}</a>`;
const placa = (neg = 'aluguel') => `<div class="placa" aria-hidden="true"><span class="placa-imob">Imob. Pompéia</span><span class="placa-neg">${neg === 'venda' ? 'Vende' : 'Aluga'}</span><span class="placa-tel">${E.fones[0].replace('(19) ', '')}</span></div>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-tel" href="${telHref(E.fones[0])}">${ic('tel')}<span>${E.fones[0]}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Empresa familiar na Vila Pompéia desde 1987.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li></ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">${E.fones.map(f => `<li>${ic('tel')}<a href="${telHref(f)}">${f}</a></li>`).join('')}<li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('relogio')}<span>Seg a qui 8h–12h e 14h–17h<br>Sex 8h–13h</span></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'imoveis')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'documentos')}">Documentos para locação</a></li><li><a href="${link(v, 'contato')}">Anunciar meu imóvel</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Imobiliária Pompéia · CRECI 8256</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const dadosCurtos = i => [i.quartos && `${i.quartos} dorm.`, i.banheiros && `${i.banheiros} banh.`, area(i), i.vagas && `${i.vagas} vaga${i.vagas > 1 ? 's' : ''}`].filter(Boolean);
const cartao = (v, i) => `<li class="card" data-g="${i.neg} ${grupo(i)}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? fotoIm(i.fotos[0], `${i.tipo} em ${local(i)}`) : semFoto()}<span class="card-neg card-${i.neg}">${i.neg === 'venda' ? 'Vende' : 'Aluga'}</span></figure>
  <div class="card-txt"><p class="card-local">${local(i)}</p><h3>${i.tipo}</h3>${dadosCurtos(i).length ? `<p class="card-dados">${dadosCurtos(i).join(' · ')}</p>` : ''}
  <p class="card-preco"><b>${i.preco}</b><small>${sufixo(i)}</small></p></div></a></li>`;
const filtro = v => `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${[['todos', 'Todos', imoveis.length], ['aluguel', 'Alugar', aluguel.length], ['venda', 'Comprar', vendas.length], ['comercial', 'Comerciais', comerciais.length]].map((g, n) => `<label><input type="radio" name="f" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[2]}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${imoveis.map(i => cartao(v, i)).join('')}</ul></div>`;

// descrição: linhas curtas seguidas viram lista
function textoDesc(linhas) {
  const out = []; let lista = [];
  const fecha = () => { if (lista.length) { out.push(lista.length > 1 ? `<ul class="desc-lista">${lista.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : `<p>${esc(lista[0])}</p>`); lista = []; } };
  for (const l of linhas) {
    if (l.length < 70 && !/[.!]$/.test(l) && !/:$/.test(l)) lista.push(l);
    else if (/:$/.test(l)) { fecha(); out.push(`<h3>${esc(l.replace(/:$/, ''))}</h3>`); }
    else { fecha(); out.push(`<p>${esc(l)}</p>`); }
  }
  fecha();
  return out.join('');
}

function ficha(v, i) {
  const t = `${i.tipo} ${negTxt(i)} em ${local(i)}`;
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/imoveis/${f}.webp" data-foto="${esc(`${t} (foto ${n + 1})`)}">${fotoIm(f, `${t}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto()}</div>`;
  const dados = [['Tipo', i.tipo], ['Bairro', i.bairro], ['Cidade', i.cidade], ['Endereço', i.end], ['Dormitórios', i.quartos], ['Banheiros', i.banheiros], ['Área construída', i.area], ['Terreno', i.terreno], ['Vagas', i.vagas], ['Condomínio', i.cond], ['IPTU', i.iptu]].filter(d => d[1]);
  return head(v, i.slug, `${i.tipo} em ${local(i)}`, `${t}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}${sufixo(i)}. Cód. ${i.cod}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis</a></p>
  <div class="ficha-grade">
    ${fotos}
    <div class="ficha-txt">
      <p class="k">${i.neg === 'venda' ? 'À venda' : 'Para alugar'} · cód. ${i.cod}</p>
      <h1>${i.tipo}</h1>
      <p class="ficha-local">${ic('pin')}${local(i)}</p>
      <p class="ficha-preco"><b>${i.preco}</b><small>${sufixo(i)}</small></p>
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${esc(d[1])}</dd></div>`).join('')}</dl>
      <p class="bts">${ligar('btn')}<a class="btn btn-linha" href="mailto:${E.email}?subject=${encodeURIComponent(assunto(i))}">${ic('mail')}Pedir visita por e-mail</a></p>
    </div>
  </div>
  <section class="ficha-desc">${i.desc.length ? textoDesc(i.desc) : '<p>Peça mais informações e fotos pelo telefone ou pelo e-mail.</p>'}</section>
</div>
` + rodape(v);
}

const formulario = (assuntoTxt = 'Contato pelo site') => `<form class="form" data-email="${E.email}" data-assunto="${esc(assuntoTxt)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero alugar ou vender meu imóvel</option><option>Administração do meu imóvel</option><option>Departamento jurídico</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Imobiliária Pompéia" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}<br>${E.bairro}, CEP ${E.cep}</span></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><span>${E.fones.map(f => `<a href="${telHref(f)}">${f}</a>`).join(' · ')}</span></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${E.horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></div></li>
</ul>`;
const docsHtml = () => `<div class="docs">${Object.values(docs).map(d => `<article class="doc"><h2>${d.titulo}</h2>${d.grupos.map(g => `<h3>${g[0]}</h3><ul class="checks">${g[1].map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`).join('')}<p class="doc-nota">${d.nota}</p></article>`).join('')}</div><p class="docs-orig">${ic('escudo')}Os documentos devem ser apresentados em originais.</p>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis', `Imóveis para alugar e à venda em Campinas e região com a Imobiliária Pompéia: ${aluguel.length} para alugar e ${vendas.length} à venda.`) + topo(v, 'imoveis') + cab('Imóveis', 'Imóveis em Campinas e região', `${aluguel.length} para alugar e ${vendas.length} à venda, a maioria salões e barracões comerciais. Toque no imóvel para ver fotos e detalhes.`) + `
<div class="in lista-pag">${filtro(v)}
<aside class="pedido"><div><p class="k">Não achou o que procura?</p><h2>Conte o que você precisa</h2><p>A Pompéia atende toda a Região Metropolitana de Campinas, com imóveis residenciais, comerciais e industriais.</p></div><p class="bts">${ligar()}<a class="btn btn-linha" href="${link(v, 'contato')}">Mandar mensagem</a></p></aside></div>
` + rodape(v);
  pag.documentos = head(v, 'documentos', 'Documentos para locação', 'Lista de documentos para alugar um imóvel residencial ou comercial com a Imobiliária Pompéia.') + topo(v, 'documentos') + cab('Documentos', 'O que levar para alugar', 'A lista de documentos do locatário e do fiador, para locação residencial e comercial.') + `
<div class="in docs-pag">${docsHtml()}</div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Pompéia', sobre) + topo(v, 'empresa') + cab('A Pompéia', 'Empresa familiar na Vila Pompéia desde 1987', 'Venda, locação, administração e departamento jurídico, para toda a Região Metropolitana de Campinas.') + `
<div class="in"><section class="inst"><div><p class="lead">${sobre}</p><p>${sobre2}</p></div>
<div class="mv"><div><p class="k">Missão</p><p>${missao}</p></div><div><p class="k">Visão</p><p>${visao}</p></div></div></section>
<ul class="servs">${servicos.map(s => `<li>${ic(s[0])}<span>${s[1]}</span></li>`).join('')}</ul>
<section class="visita"><div>${contatos()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Imobiliária Pompéia: ${E.fones.join(' / ')}, ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Pompéia', 'Ligue, mande uma mensagem ou venha ao escritório na Av. Mirandópolis.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Deixe seu recado</h2>${formulario()}</div><div>${contatos()}</div></section>
<section class="mapa-sec">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const capa = imoveis.find(i => i.cod === 8429);

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Vila Pompéia · Campinas · desde 1987</p><h1>O imóvel certo para <em>morar ou para o seu negócio</em>, em Campinas e região.</h1><p>${E.curto}</p>
    <div class="escolha-a"><a href="${link(v, 'imoveis')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a href="${link(v, 'imoveis')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a><a href="${link(v, 'contato')}"><span>Tenho um imóvel</span><b>Anunciar</b>${ic('seta')}</a></div></div>
  <figure class="hero-a-foto">${fotoIm(capa.fotos[0], 'Salão comercial com a placa de aluga da Imobiliária Pompéia', ' loading="eager" fetchpriority="high"')}${placa()}</figure>
</div></section>
<section class="faixa-a"><div class="in"><ul><li><b>1987</b>empresa familiar</li><li><b>CRECI 8256</b>registro da imobiliária</li><li><b>${comerciais.length} comerciais</b>salões, barracão e sobreloja</li></ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Imóveis</p><h2>Com a placa na porta</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${imoveis.slice(0, 6).map(i => cartao(v, i)).join('')}</ul></section>
<section class="neg-a"><div class="in neg-a-in"><div><p class="k">Para o seu negócio</p><h2>Salões, barracão e sobreloja nas avenidas de Campinas</h2><p>Boa parte da carteira é comercial: pontos em avenidas movimentadas como a Sílvio Rizzardo, no Campos Elíseos, e perto da Av. das Amoreiras, no Jardim do Lago.</p><a class="btn" href="${link(v, 'imoveis')}">Ver os comerciais</a></div>
<ul class="mini">${comerciais.slice(0, 4).map(i => `<li><a href="${link(v, i.slug)}">${i.fotos[0] ? fotoIm(i.fotos[0], `${i.tipo} em ${local(i)}`) : ''}<span><b>${i.tipo}</b>${local(i)} · ${i.preco}${sufixo(i)}</span></a></li>`).join('')}</ul></div></section>
<section class="in docs-a"><div><p class="k">Vai alugar?</p><h2>Separe os documentos antes da visita</h2><p>Locatário e fiador, residencial e comercial: a lista completa está no site.</p><a class="link-seta" href="${link(v, 'documentos')}">Ver a lista de documentos ${ic('seta')}</a></div><ul class="servs">${servicos.map(s => `<li>${ic(s[0])}<span>${s[1]}</span></li>`).join('')}</ul></section>
<section class="in visita"><div><header class="tit"><p class="k">Visite a Pompéia</p><h2>Av. Mirandópolis, 119</h2></header>${contatos()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const bairros = [...new Set(imoveis.map(local))];
  const porBairro = bairros.map(b => [b, imoveis.filter(i => local(i) === b)]).sort((x, y) => y[1].length - x[1].length);
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${i.fotos[0] ? fotoIm(i.fotos[0], '') : ''}</span><span class="ln-end"><b>${i.tipo}</b><small>${dadosCurtos(i).join(' · ') || 'cód. ' + i.cod}</small></span><span class="ln-neg ln-${i.neg}">${i.neg === 'venda' ? 'Venda' : 'Aluguel'}</span><span class="ln-preco">${i.preco}<small>${sufixo(i)}</small></span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Imobiliária Pompéia · Campinas</p><h1>Desde 1987 <span>na Vila Pompéia.</span></h1><p>Empresa familiar de venda, locação, administração e departamento jurídico, para toda a Região Metropolitana de Campinas.</p><p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver imóveis</a>${ligar('btn btn-linha')}</p></div>
<figure class="hero-b-foto">${fotoIm(imoveis.find(i => i.cod === 8413).fotos[0], 'Barracão comercial no Jardim Campos Elíseos', ' loading="eager" fetchpriority="high"')}</figure></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1987</b><span>fundação</span></li><li><b>8256</b><span>CRECI</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${vendas.length}</b><span>à venda</span></li></ul></div></section>
<section class="in idx-b"><header class="tit"><p class="k">Imóveis</p><h2>Por bairro</h2></header>${porBairro.map(([b, l]) => `<div class="bairro"><h3>${b} <small>${l.length}</small></h3><ol class="linhas">${l.map(linha).join('')}</ol></div>`).join('')}</section>
<section class="mv-b"><div class="in mv-b-in"><blockquote><p>“${missao}”</p><cite>Missão da Imobiliária Pompéia</cite></blockquote><div><p>${sobre2}</p><a class="link-seta" href="${link(v, 'empresa')}">Conhecer a Pompéia ${ic('seta')}</a></div></div></section>
<section class="in docs-b"><header class="tit"><p class="k">Documentos</p><h2>Para alugar com a Pompéia</h2></header>${docsHtml()}</section>
<section class="visita-b"><div class="in visita">${contatos()}${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Imobiliária Pompéia', artigo: 'da', url: E.url, lang: 'pt', cor: '#c4161c', fundo: '#1b1918', claro: '#faf6ee',
  fonteTitulo: 'Mohave,Impact,sans-serif', fonteTexto: '"Golos Text",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no vermelho do logo e no amarelo das placas "Aluga" que a Pompéia já coloca nos imóveis, com a escolha "alugar, comprar ou anunciar" logo na abertura.', pontos: ['Os 14 imóveis do site, com fotos e valores', 'Destaque para salões e barracões comerciais', 'Lista de documentos para locação'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Escura, com a foto recortada no telhado do logo e os imóveis organizados por bairro.', pontos: ['"Desde 1987 na Vila Pompéia" em destaque', 'Missão da empresa e documentos na página inicial', 'Funciona bem no celular'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
