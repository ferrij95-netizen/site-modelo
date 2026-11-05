// Roberto Vergueiro Imóveis (Santana, São Paulo, desde 1983). Gera public/{a,b}/ e a página de escolha.
// node clientes/rvimoveis/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs rvimoveis https://www.rvimoveis.com.br/)
// Imóveis: imoveis.json, copiados em 05/11/2026 das páginas Locação comercial, Locação residencial e Venda do site atual (Wix):
// os 8 imóveis que o site publica (5 para alugar, 3 à venda), com as fotos de cada um (fotos.json). Logo: arquivo original do site, sem o fundo.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Roberto Vergueiro Imóveis', url: 'https://rvimoveis.overtus.com.br/', antigo: 'https://www.rvimoveis.com.br/',
  email: 'roberto@rvimoveis.com.br', fone: '(11) 2950-1177', creci: 'CRECI J-5278',
  end: 'Rua Salete, 302', bairro: 'Santana, São Paulo - SP', cep: '02016-001', mapa: 'Rua Salete, 302, Santana, São Paulo, SP',
  zap: 'https://www.zapimoveis.com.br/imobiliaria/243425/', face: 'https://www.facebook.com/robertovergueiroimoveis',
  curto: 'Imobiliária em Santana, Zona Norte de São Paulo, desde 1983: administração de locações, aluguel e venda de imóveis.',
};
const frase = 'Administramos e negociamos seus bens imobiliários com competência e seriedade há mais de 30 anos.';
const historia = [
  'Fundada em 1983, a empresa funciona em sede própria no bairro de Santana, onde vem prestando serviços no setor de administração e vendas de imóveis.',
  'Através de um atendimento personalizado e um moderno sistema de gestão, vem atendendo há mais de 30 anos seus clientes com total eficiência e descomplicação.',
  'A satisfação de nossos clientes é nossa prioridade. Buscamos sempre excelência em nossos serviços para que você obtenha o melhor resultado em seus negócios no ramo imobiliário. Trabalhamos com seriedade e responsabilidade.',
];
const roberto = 'Roberto é advogado especialista em Direito Imobiliário, nascido e criado no bairro de Santana. Foi presidente do Rotary Club de São Paulo Norte no ano 1989/90, foi diretor de patrimônio de Sanatorinhos, de Campos do Jordão, e Diretor Superintendente da Distrital de Santana da Associação Comercial de São Paulo, da qual é associado desde 1987.';
const servicos = [
  'Avaliação de imóveis e sugestão de valor de aluguel.',
  'Vistoria de imóvel no início e no final da locação.',
  'Atendimento e cadastro de pretendentes à locação.',
  'Cadastro e consulta de fiador e cônjuge.',
  'Elaboração de contrato de locação.',
  'Emissão de boletos de aluguel e impostos.',
  'Emissão de recibos e comprovantes de pagamentos com cópia para o locador.',
  'Contratação de serviços através de contrato de prestação de serviços.',
];
const beneficios = [
  ['ext', 'Ampla cobertura em anúncios', 'Além do nosso site, anunciamos os imóveis no jornal do bairro correspondente, na internet com campanhas em redes sociais (Facebook e Instagram) e também na OLX.'],
  ['check', 'Filtramos as propostas relevantes', 'Nosso cliente não perde tempo com propostas que não sejam coerentes com os valores acordados.'],
  ['usuarios', 'Cuidamos de toda a documentação', 'Cadastro e pesquisa dos pretendentes a inquilinos e dos fiadores, com análise criteriosa da capacidade de pagar o aluguel e das garantias apresentadas.'],
  ['livro', 'Contratos feitos por advogados', 'Os contratos são redigidos atendendo todas as normas de Direito, buscando minimizar a possibilidade de qualquer entrave sobre os seus termos.'],
  ['escudo', 'Sua garantia na hora de alugar', 'Fiador com imóvel na capital com escritura definitiva, seguro fiança pela Porto Seguro e título de capitalização pela Sul América.'],
  ['estrela', 'Assistência jurídica', 'Em ações de despejo por falta de pagamento e execução de eventuais dívidas, ficando a cargo do proprietário somente as custas judiciais.'],
  ['painel', 'Transparência e clareza', 'Prestação de contas mensal e, ao final de cada ano, o informe dos recebimentos para a declaração do Imposto de Renda.'],
  ['casa', 'Vistoria minuciosa', 'Relatório de vistoria detalhado incluído no contrato, para receber o imóvel nas condições em que foi locado, exceto o desgaste do uso normal.'],
  ['chave', 'Acompanhamos as visitas', 'As visitas aos imóveis disponíveis para locação são acompanhadas por um funcionário da imobiliária.'],
];
const depoimentos = [
  ['Durmo tranquila ao saber que meu imóvel está cuidado pela Roberto Vergueiro Imóveis.', 'Priscila Maranho', 'cliente desde 2014'],
  ['Quando finalmente pude comprar o imóvel dos meus sonhos, pude contar com a experiência e competência da Roberto Vergueiro Imóveis. Fiz um excelente negócio.', 'Sonia Gentil Gomes', 'cliente desde 2008'],
];
// Linha 1-Azul do metrô, do Tucuruvi à Portuguesa-Tietê (Santana é a estação do bairro)
const linha1 = ['Tucuruvi', 'Parada Inglesa', 'Jardim São Paulo', 'Santana', 'Carandiru', 'Portuguesa-Tietê'];

// ---------- imóveis ----------
const FOTOS = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(i => ({ ...i, slug: `imovel/${i.id}`, fotos: FOTOS[i.id] || [] }));
const aluguel = imoveis.filter(i => i.neg === 'aluguel');
const vendas = imoveis.filter(i => i.neg === 'venda');
const perto = imoveis.filter(i => /metrô/.test(i.metro) && /\d/.test(i.metro));

const nav = [{ slug: 'alugar', nome: 'Alugar' }, { slug: 'comprar', nome: 'Comprar' }, { slug: 'administracao', nome: 'Administração' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Linha Azul', b: 'Escritório' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Commissioner:wght@400;500;600&display=swap',
};
const cores = { a: '#1d4f91', b: '#141414' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Roberto Vergueiro Imóveis | Imobiliária em Santana, Zona Norte de SP' : `${titulo} | Roberto Vergueiro Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const marca = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Roberto Vergueiro Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="1417" height="337" alt="Roberto Vergueiro Imóveis Ltda."></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const semFoto = () => `<div class="sem-foto"><img src="/assets/escudo.webp" width="213" height="279" alt=""><span>Fotos sob consulta</span></div>`;
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const area = i => `${i.areaMais ? '+ de ' : ''}${i.area} m²`;
const resumo = i => [area(i), i.quartos && quando(i.quartos, 'dorm.', 'dorms.'), i.banh && quando(i.banh, 'banheiro', 'banheiros'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const preco = i => i.preco ? `<b>${i.preco}</b>${i.neg === 'aluguel' ? '<small>/mês</small>' : ''}` : '<b class="consulta">Valor sob consulta</b>';
const mailImovel = i => `mailto:${E.email}?subject=${encodeURIComponent(`Interesse: ${i.titulo}${i.cod ? ` (cód. ${i.cod})` : ''}`)}&body=${encodeURIComponent(`Olá! Vi no site o imóvel "${i.titulo}" (${i.local}) e gostaria de agendar uma visita.\n\nNome:\nTelefone:`)}`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${marca(v, v === 'b')}
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
    <div class="rod-marca">${marca(v, true, 'div')}<p>Administração, aluguel e venda de imóveis em Santana desde 1983. ${E.creci}.</p></div>
    <div><h3>Escritório</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}<br>${E.bairro}<br>CEP ${E.cep}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'alugar')}">Para alugar (${aluguel.length})</a></li><li><a href="${link(v, 'comprar')}">À venda (${vendas.length})</a></li><li><a href="${link(v, 'administracao')}">Administração de imóveis</a></li><li><a href="${E.zap}" target="_blank" rel="noopener">Nossos anúncios no ZAP Imóveis</a></li><li><a href="${E.face}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Roberto Vergueiro Imóveis Ltda. ${E.creci}.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${i.fotos[0] ? foto(i.fotos[0], i.titulo) : semFoto()}<span class="card-tipo">${i.tipo}</span>${i.metro ? `<span class="card-metro">${i.metro}</span>` : ''}</figure>
  <div class="card-txt"><p class="card-local">${i.local}${i.cod ? ` · ${i.cod}` : ''}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ')}</p>
  <p class="card-preco">${preco(i)}</p></div></a></li>`;
const filtro = (v, lista, nome) => {
  const grupos = [['todos', 'Todos'], ['residenciais', 'Residenciais'], ['comerciais', 'Comerciais'], ['terrenos', 'Terrenos']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  ${grupos.length > 2 ? `<fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>` : ''}
  <ul class="cards">${lista.map(i => cartao(v, i)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const neg = i.neg === 'aluguel' ? 'para alugar' : 'à venda';
  const dados = [['Área', area(i)], ['Frente', i.frente], ['Dormitórios', i.quartos], ['Banheiros', i.banh], ['Lavabo', i.lavabo], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = i.fotos.length ? `<div class="galeria n${Math.min(i.fotos.length, 3)}">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.titulo} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${i.titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>` : '';
  const voltar = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  return head(v, i.slug, i.titulo, `${i.tipo} ${neg} em ${i.local}: ${resumo(i).join(', ')}. ${i.preco ? `${i.neg === 'aluguel' ? 'Aluguel' : 'Valor'} ${i.preco}.` : ''}`) + topo(v, voltar) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, voltar)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${i.tipo} ${neg}${i.cod ? ` · cód. ${i.cod}` : ''}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.local}${i.metro ? ` <span class="metro-tag">${i.metro}</span>` : ''}</p>
      ${i.selo ? `<p class="selo">${ic('check')}${i.selo}</p>` : ''}
      <dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>
      <h2>Sobre o imóvel</h2>${i.desc.map(p => `<p>${esc(p)}</p>`).join('')}
    </div>
    <aside class="preco-box">
      <p class="pb-rot">${i.neg === 'aluguel' ? 'Aluguel' : 'Valor de venda'}</p>
      <p class="pb-valor">${preco(i)}</p>
      ${i.cond || i.iptu ? `<dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${i.cond}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${i.iptu}</dd></div>` : ''}</dl>` : ''}
      <a class="btn" href="${telHref(E.fone)}">${ic('tel')}Agendar visita: ${E.fone}</a>
      <a class="btn btn-linha" href="${mailImovel(i)}">${ic('mail')}Pedir informações por e-mail</a>
      <p class="pb-nota">${i.neg === 'aluguel' ? 'As visitas são acompanhadas por um funcionário da imobiliária.' : 'Valores informados pela imobiliária; confirme no atendimento.'}</p>
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Contato pelo site') => `<form class="form" data-email="${E.email}" data-assunto="${esc(assunto)}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero alugar um imóvel</option><option>Quero comprar um imóvel</option><option>Quero que administrem meu imóvel</option><option>Quero vender meu imóvel</option><option>Já sou cliente</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O formulário abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
</form>`;
const mapa = () => `<iframe class="mapa" title="Mapa: ${E.end}, Santana" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;
const contatoLista = () => `<ul class="contato-lista"><li>${ic('pin')}<div><strong>Sede própria</strong><span>${E.end}, ${E.bairro}<br>CEP ${E.cep}</span></div></li><li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li></ul>`;
const benLista = () => `<ol class="bens">${beneficios.map((x, n) => `<li class="sobe">${ic(x[0])}<span class="n">${String(n + 1).padStart(2, '0')}</span><h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ol>`;
const depos = () => `<div class="depos">${depoimentos.map(d => `<blockquote class="sobe"><p>${d[0]}</p><footer><b>${d[1]}</b><span>${d[2]}</span></footer></blockquote>`).join('')}</div>`;
const fotoRoberto = FOTOS.roberto[0];

function comum(v, pag, cab) {
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `Imóveis para alugar em Santana e região: ${aluguel.length} salas, conjuntos comerciais e apartamentos.`) + topo(v, 'alugar') + cab('Locação', 'Imóveis para alugar', 'Salas e conjuntos comerciais perto do metrô Santana e apartamentos residenciais. Ligue para agendar a visita.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a')}<p class="zap">Também anunciamos no portal ZAP Imóveis. <a class="link-seta" href="${E.zap}" target="_blank" rel="noopener">Ver anúncios no ZAP ${ic('seta')}</a></p></div>
` + rodape(v);
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `Imóveis à venda em Santana e no Mandaqui: terreno, apartamentos perto do metrô.`) + topo(v, 'comprar') + cab('Venda', 'Imóveis à venda', 'Na hora de vender ou de comprar, procure quem entende do assunto.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v')}<p class="zap">Veja também nossos anúncios no portal ZAP Imóveis. <a class="link-seta" href="${E.zap}" target="_blank" rel="noopener">Abrir no ZAP ${ic('seta')}</a></p></div>
` + rodape(v);
  pag.administracao = head(v, 'administracao', 'Administração de imóveis', 'Benefícios de ter seu imóvel administrado pela Roberto Vergueiro Imóveis: anúncios, análise de inquilinos, contratos por advogados, assistência jurídica e prestação de contas.') + topo(v, 'administracao') + cab('Para proprietários', 'Benefícios de ter seu imóvel administrado por nós', 'Do anúncio à vistoria de saída, com contratos redigidos por advogados e prestação de contas todo mês.') + `
<div class="in"><section class="adm-sec">${benLista()}</section>
<section class="serv"><div><p class="k">No dia a dia da locação</p><h2>Alguns dos serviços que prestamos</h2></div><ul class="lista-check">${servicos.map(s => `<li>${ic('check')}<span>${s}</span></li>`).join('')}</ul></section>
<section class="anuncie"><div><p class="k">Anuncie</p><h2>Quer alugar ou vender seu imóvel?</h2><p>Conte onde ele fica. A imobiliária faz a avaliação e sugere o valor do aluguel.</p></div>${formulario('Quero anunciar meu imóvel')}</section></div>
` + rodape(v);
  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', historia[0]) + topo(v, 'quem-somos') + cab('Quem somos', 'Desde 1983 no coração da Zona Norte', 'Sede própria em Santana, administração e venda de imóveis.') + `
<div class="in"><section class="inst"><div>${historia.map((p, n) => `<p${n ? '' : ' class="lead"'}>${p}</p>`).join('')}</div>
<figure class="roberto">${foto(fotoRoberto, 'Roberto Vergueiro')}<figcaption><b>Roberto Vergueiro</b><span>Advogado especialista em Direito Imobiliário</span></figcaption></figure></section>
<section class="bio"><p class="k">O fundador</p><p>${roberto}</p></section>
<section><header class="tit"><p class="k">Clientes</p><h2>A opinião de nossos clientes é importante para nós</h2></header>${depos()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Roberto Vergueiro Imóveis: ${E.fone}, ${E.email}, ${E.end}, Santana.`) + topo(v, 'contato') + cab('Contato', 'Fale conosco', 'Escreva pelo formulário, ligue ou venha até a nossa sede em Santana.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div><div>${contatoLista()}${mapa()}</div></section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const estacoes = `<ol class="linha1" aria-label="Linha 1-Azul do metrô, estações da Zona Norte">${linha1.map(e => `<li${e === 'Santana' ? ' class="aqui"' : ''}><span>${e}</span>${e === 'Santana' ? `<small>${E.end} · a imobiliária fica no bairro</small>` : ''}</li>`).join('')}</ol>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária em Santana · ${E.creci}</p><h1>Desde 1983 no coração da Zona Norte.</h1><p>${frase}</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'administracao')}"><span>Tenho um imóvel</span><b>Administração</b>${ic('seta')}</a></div></div>
  <div class="hero-a-linha"><p class="k">Linha 1-Azul</p>${estacoes}</div>
</div></section>
<section class="in metro-a"><header class="tit tit-linha"><div><p class="k">A pé até o metrô</p><h2>Perto da estação Santana</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Todos os imóveis ${ic('seta')}</a></header><ul class="cards">${perto.map(i => cartao(v, i)).join('')}</ul></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Mais imóveis</p><h2>Para alugar e à venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Imóveis à venda ${ic('seta')}</a></header><ul class="cards">${aluguel.filter(i => !perto.includes(i)).map(i => cartao(v, i)).join('')}${vendas.filter(i => !perto.includes(i)).map(i => cartao(v, i)).join('')}</ul></section>
<section class="adm-a"><div class="in adm-a-in"><div><p class="k">Para proprietários</p><h2>Na hora de alugar, procure quem entende do assunto</h2><p>Contratos redigidos por advogados, inquilinos e fiadores analisados com critério, assistência jurídica em despejo e cobrança, prestação de contas todo mês.</p><a class="btn" href="${link(v, 'administracao')}">Ver todos os benefícios</a></div><ul class="lista-check">${beneficios.slice(2, 7).map(x => `<li>${ic('check')}<span><b>${x[1]}.</b> ${x[2]}</span></li>`).join('')}</ul></div></section>
<section class="in depo-a"><header class="tit"><p class="k">Clientes</p><h2>Há clientes com a gente desde 2008</h2></header>${depos()}</section>
<section class="in visita-a"><div><p class="k">Sede própria</p><h2>${E.end}, Santana</h2><p>CEP ${E.cep} · <a href="${telHref(E.fone)}">${E.fone}</a> · <a href="mailto:${E.email}">${E.email}</a></p><a class="btn btn-linha" href="${link(v, 'contato')}">Fale conosco</a></div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const linha = i => `<li><a href="${link(v, i.slug)}"><span class="ln-foto">${i.fotos[0] ? foto(i.fotos[0], '') : ''}</span><span class="ln-end"><small>${i.neg === 'aluguel' ? 'Aluga-se' : 'Vende-se'} · ${i.tipo}</small><b>${esc(i.titulo)}</b><small>${i.local}${i.metro ? ` · ${i.metro}` : ''}</small></span><span class="ln-res">${resumo(i).slice(0, 2).join(' · ')}</span><span class="ln-preco">${i.preco || 'Sob consulta'}</span>${ic('seta')}</a></li>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Santana · São Paulo · desde 1983</p><h1>Administramos e negociamos seus bens imobiliários <em>com competência e seriedade.</em></h1><p>Imobiliária em sede própria no bairro de Santana, fundada por um advogado especialista em Direito Imobiliário.</p>
    <p class="bts"><a class="btn" href="${link(v, 'administracao')}">Administração de imóveis</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis disponíveis</a></p></div>
  <figure class="hero-b-retrato">${foto(fotoRoberto, 'Roberto Vergueiro', ' loading="eager"')}<figcaption><b>Roberto Vergueiro</b><span>Advogado, Direito Imobiliário. Nascido e criado em Santana.</span></figcaption></figure>
</div><img class="hero-b-escudo" src="/assets/escudo-claro.webp" width="213" height="279" alt=""></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>1983</b><span>fundação</span></li><li><b>+30</b><span>anos administrando</span></li><li><b>J-5278</b><span>CRECI</span></li><li><b>${imoveis.length}</b><span>imóveis anunciados</span></li></ul></div></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="k">Imóveis</p><h2>Disponíveis agora</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos e valores ${ic('seta')}</a></header><ol class="linhas">${imoveis.map(linha).join('')}</ol></section>
<section class="adm-b"><div class="in"><header class="tit"><p class="k">Administração</p><h2>Benefícios de ter seu imóvel administrado pela Roberto Vergueiro</h2></header>${benLista()}<p class="bts"><a class="btn" href="${link(v, 'administracao')}">Quero que administrem meu imóvel</a></p></div></section>
<section class="in depo-b"><header class="tit"><p class="k">Clientes</p><h2>O que dizem de nós</h2></header>${depos()}</section>
<section class="in visita-b"><div>${contatoLista()}<a class="btn" href="${link(v, 'contato')}">Fale conosco</a></div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Roberto Vergueiro Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#1d4f91', fundo: '#141414', claro: '#f4f1ea',
  fonteTitulo: '"Grenze Gotisch",Georgia,serif', fonteTexto: '"Source Sans 3",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, com títulos na letra gótica do logo e a Linha 1-Azul do metrô: os imóveis perto da estação Santana aparecem primeiro.', pontos: [`Os ${imoveis.length} imóveis do site com fotos, valores e ficha`, 'Distância até o metrô em cada imóvel', 'Página de administração com os 9 benefícios'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, em preto e marfim como o brasão, com o fundador advogado na abertura e os imóveis em lista de anúncios.', pontos: ['Roberto Vergueiro e a assessoria jurídica em destaque', 'Benefícios numerados para o proprietário', 'Depoimentos de clientes antigos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
