// Pérgula Administração de Imóveis (Goiânia/GO, desde 1987). Gera public/{a,b}/ e a página de escolha.
// node clientes/pergula/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs pergula https://pergulaimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de detalhesImoveis.php?c=1..330 do site atual: só 10 códigos estão ativos,
// os mesmos 10 da home (todos para alugar). Até 5 fotos de cada. Logo: logo.png do site, fundo removido.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Pérgula Imóveis', url: 'https://pergula.overtus.com.br/', antigo: 'https://pergulaimoveis.com.br/',
  wa: '5562982317799', cel: '(62) 98231-7799', fone: '(62) 3281-4869', fone2: '(62) 3281-0602', email: 'pergulaimoveis@gmail.com',
  end: 'Rua 146, nº 167', bairro: 'Setor Marista, Goiânia - GO', cep: '74170-090', creci: 'CJ-4945',
  mapa: 'Rua 146, 167, Setor Marista, Goiânia, GO',
  slogan: 'Quem só aluga, aluga melhor.',
  curto: 'Administradora de imóveis em Goiânia desde 1987: apartamentos, salas, lojas e casas para alugar no Setor Marista, Bueno, Oeste e região.',
};
// Texto da página "Empresa" do site atual
const historia = [
  'Foi em fevereiro de 1987, nesta Capital, que a Pérgula Administração de Imóveis foi fundada, portanto, coloca-se entre as mais antigas imobiliárias do Estado de Goiás.',
  'A sua tradição de mais de três décadas comprova a solidez da empresa e o referendo que lhe presta a sociedade, face à sua conduta ilibada e ao trabalho sério e competente que desenvolve no mercado imobiliário goianiense, destacando-se pela forma positiva com que se atira à administração de imóveis de aluguel.',
  'Com a Pérgula você fica livre de preocupações com a locação de seu imóvel, portanto, eleja-a como sua administradora de imóveis com a certeza de estar em boas mãos, mesmo porque, "quem só aluga, aluga melhor".',
];

// ---------- imóveis ----------
const BAIRRO = { 'JARDIM ATLANTICO': 'Jardim Atlântico', 'SETOR MARISTA': 'Setor Marista', 'SETOR CENTRAL': 'Setor Central', 'SETOR OESTE': 'Setor Oeste', 'NOVA SUICA': 'Nova Suíça', 'SETOR BUENO': 'Setor Bueno' };
// títulos curtos tirados da descrição de cada anúncio (o site atual não tem título)
const TITULO = {
  179: 'Apto. 703 no Residencial Park View', 267: 'Apartamento de 175 m² com sacada', 120: 'Apartamento 204 com 3 quartos',
  221: 'Sala 1406 no Ed. Governador Magalhães Pinto', 219: 'Sala 1405 no Ed. Governador Magalhães Pinto', 216: 'Loja em frente ao Matsuri',
  35: 'Sala 04 sobre a Biscoitos Pereira, Av. T-63', 252: 'Sobrado com 4 suítes e quintal', 270: 'Apartamento 603 com 3 suítes', 119: 'Sala 01 sobre a Biscoitos Pereira, Av. T-63',
};
const GRUPO = t => t === 'Sobrado' ? 'casas' : /Sala|Loja/.test(t) ? 'comerciais' : 'apartamentos';
const frase = s => s.toLowerCase().replace(/\s+([,.])/g, '$1').replace(/(^|[.!?]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase())
  .replace(/m²|m2\b/gi, 'm²');
const n = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.')) || 0;
const reais = v => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  let desc = x.obs.replace(/\s+/g, ' ').trim();
  if (desc === desc.toUpperCase()) desc = frase(desc);
  desc = desc.replace('Playgroud', 'Playground').replace('Espaço Gourmed', 'Espaço Gourmet');
  return {
    cod: String(x.c), slug: `imovel/c${x.c}`, tipo: x.tipo, grupo: GRUPO(x.tipo), titulo: TITULO[x.c],
    bairro: BAIRRO[x.bairro] || x.bairro, cidade: 'Goiânia',
    aluguel: n(x.aluguel), cond: n(x.cond), iptu: n(x.iptu),
    quartos: +x.quartos || 0, suites: +x.suites || 0, banh: +x.banheiros || 0, gar: +x.garagens || 0, salas: +x.salas || 0,
    area: n(x.area), desc, fotos: x.fotos,
  };
});
const bairros = [...new Set(imoveis.map(i => i.bairro))];
const qtd = g => imoveis.filter(i => i.grupo === g).length;

const nav = [{ slug: 'imoveis', nome: 'Imóveis para alugar' }, { slug: 'proprietarios', nome: 'Proprietários' }, { slug: 'empresa', nome: 'A Pérgula' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pérgula', b: 'Só aluguel' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Signika:wght@400;500;600;700&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,700;1,400&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rethink+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap',
};
const cores = { a: '#0093dd', b: '#c52620' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Pérgula Imóveis | Aluguel e administração de imóveis em Goiânia' : `${titulo} | Pérgula Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Pérgula Administração de Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="867" height="320" alt="Pérgula Administração de Imóveis, CJ-4945"></${tag}>`;
const foto = (f, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${f[0]}" width="${f[1]}" height="${f[2]}" alt="${esc(alt)}"${extra}>`;
const quando = (q, s, p) => `${q} ${q === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.suites && quando(i.suites, 'suíte', 'suítes'), i.gar && quando(i.gar, 'vaga', 'vagas')].filter(Boolean);
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.bairro}) para alugar, que vi no site da Pérgula.`);
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ripas = '<span class="ripas" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Pérgula.')}" target="_blank" rel="noopener">${icWa()}<span>${E.cel}</span></a>
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>${E.slogan} Administração de imóveis de aluguel em Goiânia desde fevereiro de 1987.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('relogio')}<span>Atendimento por telefone e WhatsApp</span></li></ul></div>
    <div><h3>Fale com a gente</h3><ul class="rod-dados"><li>${ic('tel')}<span><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="${telHref(E.fone2)}">${E.fone2}</a></span></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'imoveis')}">Para alugar (${imoveis.length})</a></li><li><a href="${link(v, 'proprietarios')}">Quero alugar meu imóvel</a></li><li><a href="${link(v, 'empresa')}">A Pérgula</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Pérgula Administração de Imóveis · ${E.creci}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} para alugar no ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · cód. ${i.cod}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ')}</p>
  <p class="card-preco"><b>${reais(i.aluguel)}</b><small>/mês</small>${i.cond ? `<span>+ cond. ${reais(i.cond)}</span>` : ''}</p></div></a></li>`;
const filtro = (v, lista) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['comerciais', 'Salas e lojas'], ['casas', 'Casa']].filter(g => g[0] === 'todos' || qtd(g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, k) => `<label><input type="radio" name="f" value="${g[0]}"${k ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : qtd(g[0])}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const titulo = `${i.tipo} para alugar no ${i.bairro}`;
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Salas', i.salas], ['Banheiros', i.banh], ['Vagas', i.gar]].filter(d => d[1]);
  return head(v, i.slug, `${i.titulo}, ${i.bairro}`, `${titulo}: ${resumo(i).join(', ')}. Aluguel ${reais(i.aluguel)}.`) + topo(v, 'imoveis') + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, 'imoveis')}">${ic('seta', 'ic vira')}Todos os imóveis para alugar</a></p>
  <div class="galeria n${i.fotos.length}">${i.fotos.map((f, k) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${k + 1})`)}" class="g${k}">${foto(f, `${titulo}, foto ${k + 1}`, k ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo} · cód. ${i.cod}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.bairro}, Goiânia - GO</p>
      <p class="preco-m"><b>${reais(i.aluguel)}</b><small>/mês</small></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Descrição</h2><p>${esc(i.desc)}</p>
    </div>
    <aside class="preco-box">
      <p class="pb-rot">Aluguel</p>
      <p class="pb-valor">${reais(i.aluguel)}<small>/mês</small></p>
      <dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${reais(i.cond)}</dd></div>` : '<div><dt>Condomínio</dt><dd>sem condomínio</dd></div>'}${i.iptu ? `<div><dt>IPTU</dt><dd>${reais(i.iptu)}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Valores informados pela administradora; confirme na visita.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Pérgula.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero que a Pérgula administre meu imóvel</option><option>Já sou inquilino</option><option>Já sou proprietário</option><option>Outro assunto</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa do escritório da Pérgula" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatos = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa, 'Olá! Vim pelo site da Pérgula.')}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone)}">${E.fone}</a> · <a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Escritório</strong><span>${E.end}, ${E.bairro}, CEP ${E.cep}</span></div></li>
</ul>`;

function comum(v, pag, cab) {
  pag.imoveis = head(v, 'imoveis', 'Imóveis para alugar', `${imoveis.length} imóveis para alugar em Goiânia com a Pérgula: apartamentos, salas, loja e sobrado.`) + topo(v, 'imoveis') + cab('Para alugar', `${imoveis.length} imóveis disponíveis em Goiânia`, `Apartamentos, salas, loja e sobrado em ${bairros.length} bairros. Escolha um e agende a visita pelo WhatsApp.`) + `
<div class="in lista-pag">${filtro(v, imoveis)}</div>
` + rodape(v);
  pag.proprietarios = head(v, 'proprietarios', 'Proprietários', 'Deixe a locação do seu imóvel com a Pérgula, administradora de imóveis de aluguel em Goiânia desde 1987.') + topo(v, 'proprietarios') + cab('Proprietários', 'Fique livre das preocupações com a locação do seu imóvel', 'A Pérgula trabalha só com aluguel, e é nisso que se especializou desde 1987.') + `
<div class="in"><section class="prop-pag">
  <div class="prop-txt"><p class="lead">${historia[2]}</p><p>${historia[1]}</p>${ripas}<ul class="numeros"><li><b>1987</b><span>fundada em fevereiro, em Goiânia</span></li><li><b>${E.creci}</b><span>registro no CRECI-GO</span></li><li><b>${imoveis.length}</b><span>imóveis para alugar hoje</span></li></ul></div>
  <div class="prop-form"><h2>Quero alugar meu imóvel com a Pérgula</h2><p>Conte o tipo de imóvel e o bairro. A equipe retorna pelo WhatsApp ou telefone.</p>${formulario('Olá! Tenho um imóvel e quero que a Pérgula administre a locação.')}</div>
</section></div>
` + rodape(v);
  pag.empresa = head(v, 'empresa', 'A Pérgula', historia[0]) + topo(v, 'empresa') + cab('A Pérgula', 'Entre as mais antigas imobiliárias de Goiás', 'Fundada em fevereiro de 1987, em Goiânia. Especializada em administração de imóveis de aluguel.') + `
<div class="in"><section class="inst">${historia.map((p, k) => `<p${k ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
<section class="inst-escr"><div><p class="k">Escritório</p><h2>${E.end}, Setor Marista</h2>${contatos()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Pérgula: ${E.fone}, ${E.fone2}, WhatsApp ${E.cel}, ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Pérgula', 'Escreva pelo formulário, chame no WhatsApp ou ligue.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatos()}${mapa()}</div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

const porCod = c => imoveis.find(i => i.cod === String(c));

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a">${ripas}<div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Administração de imóveis · Goiânia · desde 1987</p><h1>Quem só aluga, <em>aluga melhor.</em></h1><p>A Pérgula trabalha só com locação. Apartamentos, salas, lojas e casas para alugar no Setor Marista, no Bueno, no Oeste e em outros bairros de Goiânia.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Ver os ${imoveis.length} imóveis para alugar</a><a class="btn btn-linha" href="${link(v, 'proprietarios')}">Tenho um imóvel para alugar</a></p></div>
  <figure class="hero-a-foto">${ripas}${foto(porCod(270).fotos[0], 'Sala ampla e iluminada de apartamento para alugar no Setor Bueno', ' loading="eager" fetchpriority="high"')}<figcaption>Apartamento 603 · Setor Bueno</figcaption></figure>
</div></section>
<section class="tipos-a"><div class="in"><ul>
  <li><a href="${link(v, 'imoveis')}">${ic('casa')}<b>${qtd('apartamentos')}</b><span>apartamentos</span></a></li>
  <li><a href="${link(v, 'imoveis')}">${ic('painel')}<b>${qtd('comerciais')}</b><span>salas e loja</span></a></li>
  <li><a href="${link(v, 'imoveis')}">${ic('chave')}<b>${qtd('casas')}</b><span>sobrado</span></a></li>
  <li><a href="${link(v, 'imoveis')}">${ic('pin')}<b>${bairros.length}</b><span>bairros de Goiânia</span></a></li>
</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar agora</p><h2>Imóveis em destaque</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${[179, 252, 216, 267, 120, 219].map(c => cartao(v, porCod(c))).join('')}</ul></section>
<section class="prop-a"><div class="in prop-a-in">
  <div class="prop-a-txt">${ripas}<p class="k">Para proprietários</p><h2>Deixe a locação do seu imóvel com quem só faz isso</h2><p>${historia[2]}</p><a class="btn" href="${link(v, 'proprietarios')}">Quero alugar meu imóvel</a></div>
  <figure>${foto(porCod(270).fotos[2], 'Varanda de apartamento para alugar no Setor Bueno')}</figure>
</div></section>
<section class="in hist-a"><div><p class="k">Desde fevereiro de 1987</p><h2>Entre as mais antigas imobiliárias de Goiás</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Pérgula ${ic('seta')}</a></div>
<div class="escr-a"><p class="k">Escritório</p>${contatos()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const etiqueta = i => `<li><a href="${link(v, i.slug)}">
    <figure>${foto(i.fotos[0], `${i.tipo} para alugar no ${i.bairro}`)}</figure>
    <span class="et-preco">${reais(i.aluguel)}<small>/mês</small></span>
    <span class="et-txt"><b>${esc(i.titulo)}</b><small>${[i.tipo, i.bairro, ...resumo(i).slice(0, 2)].join(' · ')}</small></span>
    <span class="et-cond">${i.cond ? `cond. ${reais(i.cond)}` : 'sem condomínio'}</span>${ic('seta')}</a></li>`;
  const mosaico = [porCod(270).fotos[1], porCod(120).fotos[0], porCod(252).fotos[1]];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Pérgula · Goiânia · desde 1987</p><h1>Quem só aluga,<br><span>aluga melhor.</span></h1><p>Administradora de imóveis de aluguel no Setor Marista. ${imoveis.length} imóveis para alugar agora, de sala comercial a sobrado com quatro suítes.</p>
    <p class="bts"><a class="btn" href="${link(v, 'imoveis')}">Imóveis para alugar</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Vim pelo site da Pérgula.')}" target="_blank" rel="noopener">${icWa()}${E.cel}</a></p></div>
  <div class="hero-b-fotos">${mosaico.map((f, k) => `<figure class="m${k}">${foto(f, 'Imóvel para alugar com a Pérgula em Goiânia', k ? ' loading="lazy" decoding="async"' : ' loading="eager" fetchpriority="high"')}</figure>`).join('')}</div>
</div></section>
<section class="faixa-b"><div class="in"><span>1987</span><span>${E.creci}</span><span>${E.fone}</span><span>${E.cel}</span></div></section>
<section class="in lista-b"><header class="tit tit-linha"><div><p class="k">Aluguel em Goiânia</p><h2>O preço na frente, a visita pelo WhatsApp</h2></div><a class="link-seta" href="${link(v, 'imoveis')}">Com fotos e filtro ${ic('seta')}</a></header>
<ol class="etiquetas">${[...imoveis].sort((x, y) => y.aluguel - x.aluguel).map(etiqueta).join('')}</ol></section>
<section class="so-b"><div class="in so-b-in"><p class="so-b-big">Só<br>aluguel.</p><div><p class="k">Por que a Pérgula</p><h2>Uma administradora que faz uma coisa só, há quase quatro décadas</h2><p>${historia[1]}</p><p class="bts"><a class="btn" href="${link(v, 'proprietarios')}">Quero alugar meu imóvel</a><a class="btn btn-linha" href="${link(v, 'empresa')}">A história da Pérgula</a></p></div></div></section>
<section class="in escr-b"><div><p class="k">Escritório</p><h2>Rua 146, Setor Marista</h2>${contatos()}</div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Pérgula Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#c52620', fundo: '#14324a', claro: '#eef6fb',
  fonteTitulo: 'Signika,system-ui,sans-serif', fonteTexto: '"Be Vietnam Pro",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 4 + imoveis.length, texto: 'Clara, no azul e vermelho do logo, com as ripas da pérgula do símbolo sobre as fotos e o lema da empresa na abertura.', pontos: [`Os ${imoveis.length} imóveis do site com fotos, valores e ficha`, 'Filtro por apartamentos, salas e casa', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 4 + imoveis.length, texto: 'Em vermelho, com o lema "Quem só aluga, aluga melhor." grande e os imóveis listados como etiquetas de preço.', pontos: ['Preço, condomínio e bairro lado a lado', 'Página para quem quer alugar o próprio imóvel', 'Escritório no Setor Marista com mapa'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
