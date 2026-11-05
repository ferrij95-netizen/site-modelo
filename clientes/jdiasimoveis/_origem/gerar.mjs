// J. Dias Imóveis (Barreiro, Belo Horizonte/MG, PJ-4693). Gera public/{a,b}/ e a página de escolha.
// node clientes/jdiasimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs jdiasimoveis http://www.jdiasimoveis.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 de busca.asp?id_mod=V|L + detalhes.asp do site atual
// (os 16 de aluguel e 24 dos 48 à venda ativos; até 5 fotos de cada). Marca: símbolo do logo.png vetorizado (marca.svg).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'J. Dias Imóveis', url: 'https://jdiasimoveis.overtus.com.br/', antigo: 'http://www.jdiasimoveis.com.br/',
  fone: '(31) 3383-7676', cel: '(31) 98340-1616', wa: '5531983401616', email: 'jdias@jdiasimoveis.com.br',
  end: 'Rua Eduardo Carlos, 75', bairro: 'Milionários, Belo Horizonte - MG', cep: '30620-440', creci: 'PJ-4693', cnpj: '17.993.070/0001-90',
  insta: 'https://www.instagram.com/jdiasimoveis', area: 'https://admsipisistemas.com.br/areacliente/index.asp?id=yLq6bSoLnDLU8juyjKow',
  slogan: 'Todos os dias, certeza de bons negócios.',
  curto: 'Imobiliária no Barreiro, em Belo Horizonte: casas, apartamentos, lotes e pontos comerciais para comprar e alugar no Barreiro e região.',
  mapa: 'Rua Eduardo Carlos, 75, Belo Horizonte, MG, 30620-440',
};
const horario = [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 12h']];
const sobre = [
  'A J. Dias Imóveis é uma empresa de tradição, que preza pela confiabilidade e conforto de seus clientes. E nós, que sabemos o valor que o imóvel tem na vida de cada um, estamos sempre prontos para auxiliar cada cliente de forma objetiva e eficaz nas suas mais diversas necessidades.',
  'Trabalhamos com lealdade, responsabilidade e transparência para cuidar e valorizar seu patrimônio. Imóvel: investimento para toda a vida.',
];
const missao = 'Oferecer às pessoas a possibilidade de transformar seus sonhos em realidade, seja na compra, na venda, na locação ou na administração do seu bem imóvel, com suporte especializado e soluções práticas.';
const visao = 'Ser imobiliária referência da região do Barreiro de Cima, com atendimento exclusivo, eficaz e especializado na compra e venda e na locação de imóveis.';
const valores = ['Respeito ao outro de forma integral', 'Empatia pelas vivências e pela história de cada pessoa', 'Compromisso com o atendimento, as transações e os investimentos dos clientes', 'Responsabilidade e comprometimento com os serviços prestados', 'Ética, transparência e dedicação'];
// serviços do menu do site atual
const servicos = [
  { id: 'anuncie', ic: 'casa', t: 'Anuncie seu imóvel', p: 'Quer vender ou alugar seu imóvel? Mande seus dados e os do imóvel que ajudamos você a fazer negócio. É rápido e fácil.', msg: 'Olá! Quero anunciar meu imóvel com a J. Dias Imóveis.' },
  { id: 'encomende', ic: 'chave', t: 'Encomende seu imóvel', p: 'Ainda não encontrou o imóvel ideal? Conte o que você procura, para comprar ou alugar, e a gente volta com as melhores opções para o seu perfil.', msg: 'Olá! Quero encomendar um imóvel. Procuro:' },
  { id: 'avalie', ic: 'escudo', t: 'Avalie seu imóvel', p: 'Conhecimento técnico e experiência de mercado para uma avaliação profissional do seu bem, seja para alugar ou para vender.', msg: 'Olá! Quero avaliar meu imóvel.' },
  { id: 'financiamento', ic: 'painel', t: 'Financiamento', p: 'Simule o financiamento do seu imóvel com a nossa equipe: a gente orienta a documentação e o caminho com o banco.', msg: 'Olá! Quero simular um financiamento.' },
];
const fichas = [
  ['Ficha de cadastro pessoa física', `${E.antigo}docs/ficha-de-cadastro-pf-335-349.pdf`],
  ['Ficha de cadastro pessoa jurídica (empresa)', `${E.antigo}docs/ficha-de-cadastro-pj-335-350.pdf`],
  ['Ficha de cadastro pessoa jurídica (instituição)', `${E.antigo}docs/ficha-de-cadastro-instituicao-335-363.pdf`],
  ['Termo de consentimento (LGPD)', `${E.antigo}docs/termo.pdf`],
];

// ---------- imóveis ----------
const TIPO = { 'Area Privativa': 'Área privativa', Barracao: 'Barracão', Galpao: 'Galpão', Predio: 'Prédio', 'Sitio/Chacara': 'Sítio/chácara', 'Lote/Terreno': 'Lote', 'Casa Duplex': 'Casa duplex', 'Casa Comercial': 'Casa comercial' };
const GRUPO = t => /Apartamento|Cobertura|Privativa/.test(t) ? 'apartamentos' : /Lote|Sitio/.test(t) ? 'terrenos' : /Loja|Comercial|Galpao|Predio/.test(t) ? 'comerciais' : 'casas';
const BAIRRO = { Milionarios: 'Milionários', 'Flavio Marques Lisboa': 'Flávio Marques Lisboa', 'Novo Santa Cecilia': 'Novo Santa Cecília', 'CDI Jatoba': 'CDI Jatobá', Havai: 'Havaí', 'Condominio Fazenda Solar': 'Condomínio Fazenda Solar', 'Fazenda Castro 2a Secao': 'Fazenda Castro 2ª Seção', 'Santa Efigenia': 'Santa Efigênia' };
const CIDADE = { Ibirite: 'Ibirité', Igarape: 'Igarapé', 'Ribeirao das Ne': 'Ribeirão das Neves' };
const num = s => Number(String(s || '0').replace(/[^\d,]/g, '').replace(',', '.'));
const real = s => num(s) > 0 ? `R$ ${String(s).replace(/R\$\s*/, '')}` : '';
const SIGLAS = /\b(bh|iptu|cdi|ii|iii|mg|br|ibge|wc)\b/gi;
const frase = s => s.toLowerCase().replace(/\s+([,.;:!?])/g, '$1').replace(/([,;])(?=[^\s\d])/g, '$1 ').replace(/!{2,}/g, '!').replace(/\*/g, '').replace(/r\$ ?(\d)/gi, 'R$ $1')
  .replace(/(^|[.!?:]\s+)([a-zà-ú])/g, (m, a, b) => a + b.toUpperCase()).replace(SIGLAS, m => m.toUpperCase()).replace(/(\d)\s?m2\b/g, '$1 m²').replace(/\bqtos?\b/g, 'quartos').replace(/\bj\. ?dias\b/gi, 'J. Dias');
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const barreiro = /\(Barreiro\)/.test(x.bairro);
  const b0 = x.bairro.replace(/\s*\(Barreiro\)/, '');
  const area = x.area.replace(/,$/, '').replace(/^m$/, '');
  return {
    neg: x.neg, cod: x.id, slug: `imovel/${x.id}`, tipo: TIPO[x.tipo] || x.tipo, grupo: GRUPO(x.tipo),
    bairro: BAIRRO[b0] || b0, barreiro, cidade: CIDADE[x.cidade] || x.cidade, preco: `R$ ${x.preco}`, valor: num(x.preco),
    area: num(area) ? area : '', quartos: +x.quartos || 0, suites: +x.suites || 0, banh: +x.banh || 0, vagas: +x.vagas || 0,
    cond: real(x.cond), iptu: real(x.iptu),
    desc: x.desc.split('\n').map(l => frase(l.trim())).filter(Boolean), fotos: x.img,
  };
});
const aluguel = imoveis.filter(i => i.neg === 'aluguel').sort((a, b) => a.valor - b.valor);
const vendas = imoveis.filter(i => i.neg === 'venda').sort((a, b) => a.valor - b.valor);
const contaBairro = {};
for (const i of imoveis) contaBairro[i.bairro] = (contaBairro[i.bairro] || 0) + 1;
const bairros = Object.entries(contaBairro).sort((a, b) => b[1] - a[1]);
const TOTAL_VENDA = 48; // imóveis à venda ativos no site atual em 05/11/2026

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'sobre', nome: 'Quem somos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Barreiro', b: 'Vizinhança' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,500;0,700;1,500&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap',
};
const cores = { a: '#145c20', b: '#063b06' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'J. Dias Imóveis | Imobiliária no Barreiro, Belo Horizonte' : `${titulo} | J. Dias Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marcaSvg = fs.readFileSync(path.join(aqui, 'marca.svg'), 'utf8').replace('<svg ', '<svg class="marca-r" aria-hidden="true" ');
const marca = (v, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="J. Dias Imóveis, página inicial"` : ''}>${marcaSvg}<span class="marca-txt"><b>J.Dias</b><small>Imóveis</small></span></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const semFoto = () => `<div class="sem-foto">${marcaSvg}<span>Fotos sob consulta</span></div>`;
const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${i.area} m²`, i.quartos && plural(i.quartos, 'quarto', 'quartos'), i.suites && plural(i.suites, 'suíte', 'suítes'), i.vagas && plural(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const local = i => `${i.bairro}${i.barreiro ? ' (Barreiro)' : ''}`;
const titulo = i => `${i.tipo} ${i.neg === 'aluguel' ? 'para alugar' : 'à venda'} no ${i.bairro}`;
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo}, ${i.bairro}, ${i.preco}) que vi no site da J. Dias Imóveis.`);
const mes = i => i.neg === 'aluguel' ? '<small>/mês</small>' : '';
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v)}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-fone" href="${telHref(E.fone)}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca">${marca(v, 'div')}<p>${E.slogan}</p><p class="rod-legal">J. Dias Imóveis Ltda · CNPJ ${E.cnpj} · ${E.creci}</p></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('insta')}<a href="${E.insta}" target="_blank" rel="noopener">@jdiasimoveis</a></li></ul></div>
    <div><h3>Loja</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}</span></li>${horario.map(h => `<li>${ic('relogio')}<span>${h[0]}: ${h[1]}</span></li>`).join('')}</ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'servicos')}">Anuncie seu imóvel</a></li><li><a href="${E.area}" target="_blank" rel="noopener">Área do cliente</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} J. Dias Imóveis. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? foto(i.fotos[0], `${i.tipo} no ${i.bairro}`) : semFoto()}<span class="card-tipo">${i.tipo}</span></figure>
  <div class="card-txt"><p class="card-local">${local(i)} · ${i.cidade}</p><h3>${titulo(i)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${i.preco}</b>${mes(i)}<span class="card-cod">cód. ${i.cod}</span></p></div></a></li>`;
const GRUPOS = [['todos', 'Todos'], ['casas', 'Casas'], ['apartamentos', 'Apartamentos'], ['terrenos', 'Lotes e sítios'], ['comerciais', 'Comerciais']];
const filtro = (v, lista, nome) => {
  const g = GRUPOS.filter(x => x[0] === 'todos' || lista.some(i => i.grupo === x[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${g.map((x, n) => `<label><input type="radio" name="f-${nome}" value="${x[0]}"${n ? '' : ' checked'}><span>${x[1]} <small>${x[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === x[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const dados = [['Área', i.area && `${i.area} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${titulo(i)} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo(i)}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : `<div class="galeria galeria-vazia">${semFoto()}</div>`;
  const volta = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, `${i.tipo} no ${i.bairro}, cód. ${i.cod}`, `${titulo(i)}, ${i.cidade}. ${resumo(i).join(', ')}. ${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.neg === 'aluguel' ? 'Aluguel' : 'Venda'} · cód. ${i.cod}</p>
      <h1>${titulo(i)}</h1>
      <p class="ficha-local">${ic('pin')}${local(i)}, ${i.cidade} - MG</p>
      <p class="preco-m"><b>${i.preco}</b>${mes(i)}<a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Tenho interesse</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      <h2>Sobre este imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${i.preco}${mes(i)}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      <p class="pb-nota">Preços e informações podem mudar sem aviso; confirme com a equipe comercial.</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (msg = 'Olá! Vim pelo site da J. Dias Imóveis.', sel = 0) => `<form class="form" data-wa="${esc(msg)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto">${['Quero comprar um imóvel', 'Quero alugar um imóvel', 'Quero anunciar meu imóvel', 'Quero encomendar um imóvel', 'Quero avaliar meu imóvel', 'Financiamento', 'Outro assunto'].map((o, n) => `<option${n === sel ? ' selected' : ''}>${o}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa da loja da J. Dias Imóveis" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Loja</strong><span>${E.end}, ${E.bairro}<br>CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${horario.map(h => `${h[0]}: ${h[1]}`).join('<br>')}</span></div></li>
</ul>`;
const destaque = (lista, n, ids = []) => [...ids.map(c => lista.find(i => i.cod === c)).filter(Boolean), ...lista.filter(i => !ids.includes(i.cod) && i.fotos.length >= 3)].slice(0, n);
const DEST_VENDA = ['94862', '97909', '93962', '96135', '63866', '97845'];
const DEST_ALUGA = ['91446', '96726', '98603', '23124'];

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda no Barreiro e região: casas, apartamentos, lotes, galpão e sítio.`) + topo(v, 'comprar') + cab('À venda', 'Imóveis à venda no Barreiro e região', `Casas, apartamentos, lotes e imóveis comerciais em Belo Horizonte, Ibirité, Sarzedo e Igarapé. Do mais em conta ao mais caro.`) + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="lista-nota">Estes são ${vendas.length} dos ${TOTAL_VENDA} imóveis à venda da J. Dias. Procura algo diferente? <a href="${link(v, 'servicos')}#encomende">Encomende seu imóvel</a>.</p></div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar no Barreiro: casas, apartamentos, barracões, lojas e galpão.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis para alugar`, 'Casas, apartamentos, barracões, lojas e galpão, quase todos no Barreiro. Do aluguel mais em conta ao mais caro.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Anuncie, encomende ou avalie seu imóvel, simule seu financiamento e acesse a área do cliente da J. Dias Imóveis.') + topo(v, 'servicos') + cab('Serviços', 'Para quem quer vender, alugar ou encontrar um imóvel', 'Tudo começa com uma conversa. Escolha o que você precisa e fale com a gente pelo WhatsApp.') + `
<div class="in serv-pag">
  ${servicos.map(s => `<section class="serv" id="${s.id}"><div>${ic(s.ic)}<h2>${s.t}</h2><p>${s.p}</p><a class="btn" href="${waHref(E.wa, s.msg)}" target="_blank" rel="noopener">${icWa()}Falar pelo WhatsApp</a></div></section>`).join('')}
  <section class="serv serv-cliente" id="cliente"><div>${ic('usuarios')}<h2>Área do cliente</h2><p>Boletos e demonstrativos para inquilinos e proprietários, no sistema da imobiliária.</p><a class="btn btn-linha" href="${E.area}" target="_blank" rel="noopener">${ic('ext')}Entrar na área do cliente</a></div>
    <div><h3>Fichas para download</h3><ul class="fichas">${fichas.map(f => `<li><a href="${f[1]}" target="_blank" rel="noopener">${ic('livro')}${f[0]}</a></li>`).join('')}</ul></div></section>
</div>
` + rodape(v);
  pag.sobre = head(v, 'sobre', 'Quem somos', sobre[0]) + topo(v, 'sobre') + cab('Quem somos', 'Uma imobiliária de tradição no Barreiro', E.slogan) + `
<div class="in">
  <section class="inst"><figure class="inst-foto">${foto(['loja.webp', 2000, 650], 'Fachada da loja da J. Dias Imóveis, com o telefone 3383-7676 pintado no muro')}<figcaption>Nossa loja na ${E.end}</figcaption></figure>
  ${sobre.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</section>
  <section class="mvv"><article><p class="k">Missão</p><p>${missao}</p></article><article><p class="k">Visão</p><p>${visao}</p></article><article><p class="k">Valores</p><ul class="lista-check">${valores.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></article></section>
  <section class="loja-sec"><div><p class="k">Venha nos visitar</p><h2>${E.end}</h2><p>${E.bairro} · CEP ${E.cep}</p>${contatoLista()}</div>${mapa()}</section>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a J. Dias Imóveis: ${E.fone}, WhatsApp ${E.cel}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a J. Dias Imóveis', 'Mande sua mensagem pelo formulário, ligue ou passe na loja.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}</div></section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária no Barreiro · Belo Horizonte</p><h1>Todos os dias, <em>certeza de bons negócios.</em></h1><p>Casas, apartamentos, lotes e pontos comerciais no Barreiro e região, com quem conhece cada rua do bairro.</p></div>
  <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>Imóveis à venda</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} para alugar</b>${ic('seta')}</a><a class="busca-op busca-op-3" href="${link(v, 'servicos')}#anuncie"><span>Tenho um imóvel</span><b>Anunciar</b>${ic('seta')}</a></div>
</div>
<figure class="in hero-a-foto">${foto(['loja.webp', 2000, 650], 'Fachada da loja da J. Dias Imóveis no Barreiro', ' loading="eager" fetchpriority="high"')}<figcaption>${ic('pin')}Nossa loja: ${E.end}, ${E.bairro.replace(' - MG', '')}</figcaption></figure>
</section>
<section class="bairros-a"><div class="in"><p class="k">Onde estão os imóveis</p><ul>${bairros.map(b => `<li>${b[0]} <small>${b[1]}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar no Barreiro e região</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${destaque(vendas, 6, DEST_VENDA).map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Disponíveis para locação</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${destaque(aluguel, 4, DEST_ALUGA).map(i => cartao(v, i)).join('')}</ul></section>
<section class="serv-a"><div class="in"><header class="tit"><p class="k">Serviços</p><h2>Para quem tem um imóvel ou procura um</h2></header><ul class="serv-a-lista">${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${ic(s.ic)}<h3>${s.t}</h3><p>${s.p}</p></a></li>`).join('')}</ul></div></section>
<section class="in sobre-a"><div><p class="k">Quem somos</p><h2>Uma imobiliária de tradição, feita para o Barreiro</h2><p>${sobre[1]}</p><p class="nota-visao">${visao}</p><a class="btn btn-linha" href="${link(v, 'sobre')}">Conheça a J. Dias</a></div>${contatoLista()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = imoveis.find(i => i.cod === '94862').fotos[0];
  const largo = i => `<li class="lg"><a href="${link(v, i.slug)}"><figure>${i.fotos[0] ? foto(i.fotos[0], titulo(i)) : semFoto()}</figure><div><p class="lg-local">${local(i)}</p><h3>${i.tipo}${i.quartos ? ` · ${plural(i.quartos, 'quarto', 'quartos')}` : ''}</h3><p class="lg-res">${resumo(i).join(' · ')}</p><p class="lg-preco">${i.preco}${mes(i)}</p></div></a></li>`;
  const porBairro = bairros.slice(0, 8);
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${foto(capa, 'Varanda de casa à venda no bairro Araguaia, Barreiro', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">J. Dias Imóveis · Barreiro · BH</p><h1>Sua melhor opção no Barreiro e região <em>você encontra aqui.</em></h1><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Quero comprar</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Quero alugar</a></p></div></section>
<section class="viz-b"><div class="in"><header class="tit"><p class="k">Bairro a bairro</p><h2>Onde a J. Dias tem imóveis hoje</h2></header><ol class="viz">${porBairro.map(b => `<li><span class="viz-n">${String(b[1]).padStart(2, '0')}</span><span class="viz-b-nome">${b[0]}</span><span class="viz-tipos">${[...new Set(imoveis.filter(i => i.bairro === b[0]).map(i => i.tipo))].slice(0, 3).join(', ')}</span></li>`).join('')}</ol></div></section>
<section class="in lg-b"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Casas e sítio à venda, com fotos e valor</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ul class="lgs">${destaque(vendas, 6, DEST_VENDA).map(largo).join('')}</ul></section>
<section class="aluga-b"><div class="in"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>${aluguel.length} imóveis para alugar</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver todos ${ic('seta')}</a></header><ul class="cards">${destaque(aluguel, 4, DEST_ALUGA).map(i => cartao(v, i)).join('')}</ul></div></section>
<section class="in serv-b"><header class="tit"><p class="k">Serviços</p><h2>Tem um imóvel? Procura um?</h2></header><ol class="passos">${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}"><h3>${s.t}</h3><p>${s.p}</p></a></li>`).join('')}</ol></section>
<section class="loja-b"><div class="in loja-b-in"><figure>${foto(['loja.webp', 2000, 650], 'Fachada da loja da J. Dias Imóveis')}</figure><div><p class="k">A loja</p><h2>${E.end}</h2><p>${E.bairro}</p>${contatoLista()}</div></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'J. Dias Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#145c20', fundo: '#0b2a36', claro: '#eef3ec',
  fonteTitulo: 'Outfit,system-ui,sans-serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no verde e no azul do logo, com a foto da loja e a escolha "comprar, alugar ou anunciar" logo na abertura.', pontos: [`${imoveis.length} imóveis com fotos, valores e ficha`, 'Filtro por casas, apartamentos, lotes e comerciais', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Verde-escura, com letra serifada e os imóveis apresentados bairro a bairro, como quem conhece a região.', pontos: ['Índice de bairros do Barreiro', 'Serviços para proprietários em destaque', 'Loja com mapa e horário'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
