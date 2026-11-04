// Casa Forte Empilhadeiras (Recife/PE). Gera public/{a,b}/ e a página de escolha.
// node clientes/casaforte/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs casaforte http://casaforteempilhadeiras.com.br/)
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Casa Forte Empilhadeiras', url: 'https://casaforte.overtus.com.br/', antigo: 'http://casaforteempilhadeiras.com.br/',
  wa: '558195698381', fone1: '(81) 9 9569-8381', fone2: '(81) 9 8272-5749', email: 'contato@casaforteempilhadeiras.com.br', pessoa: 'Carlos Augusto Fernandes',
  rua: 'Estrada das Ubaias, 758', bairro: 'Casa Forte', cidade: 'Recife - PE', cep: '52061-080',
  sobre: 'A Casa Forte Empilhadeiras tem como objetivo o aluguel de máquinas empilhadeiras para operação em empresas de diversos ramos de atividade, dispensando o cliente da imobilização de recursos na aquisição e manutenção de equipamentos que não sejam diretamente o foco dos negócios.',
};
const missao = ['Locar máquinas empilhadeiras sempre em perfeito estado para todo o Nordeste.', 'Atender com celeridade as demandas dos clientes.', 'Capacitar os operadores, mantendo-os sempre em concordância com as mais rígidas normas de procedimento e segurança.', 'Reduzir o impacto socioambiental reciclando os resíduos de maneira adequada.', 'Promover um bom relacionamento com as comunidades onde houver operação.'];
const diferenciais = [
  { ic: 'empilhadeira', selo: 'selo-1', t: 'Equipamentos Hyster', d: 'Máquinas Hyster sempre novas e em perfeito estado de funcionamento.' },
  { ic: 'chave', selo: 'selo-2', t: 'Manutenção preventiva ágil', d: 'Manutenção preventiva em horários pré-agendados, sem interrupção das operações.' },
  { ic: 'escudo', selo: 'selo-3', t: 'Máquinas reserva', d: 'Máquinas reserva para eventuais substituições, com reposição imediata.' },
  { ic: 'usuarios', selo: 'selo-4', t: 'Treinamento dos operadores', d: 'Treinamento e reciclagem dos operadores, atendendo aos mais exigentes padrões de qualidade, especificações, certificações e prazos de entrega.' },
];
const ficha = [['Equipamento', 'Empilhadeira Hyster H-50 FT'], ['Combustível', 'Combustão a GLP'], ['Capacidade', '2.500 kg'], ['Torre', '3 estágios'], ['Transmissão', 'Hyster Duramatch (maior produtividade)'], ['Ano de fabricação', 'Entre 2015 e 2018']];
const comoFunciona = [['Visita sem compromisso', 'Vamos até a sua empresa entender a operação: tipo de carga, altura de armazenagem, turnos e número de máquinas.'], ['Proposta de locação', 'Você recebe a proposta com as máquinas, o plano de manutenção e o prazo.'], ['Entrega e treinamento', 'As empilhadeiras chegam prontas para operar, e os seus operadores recebem treinamento e reciclagem.'], ['Manutenção e reposição', 'Preventiva em horário agendado e máquina reserva se alguma precisar parar. Atendimento 24 horas.']];
const setores = ['Indústrias', 'Centros de distribuição', 'Atacado e varejo', 'Supermercados', 'Construção e materiais', 'Portos e armazéns'];
const nav = [{ slug: 'index', nome: 'Home' }, { slug: 'empresa', nome: 'A empresa' }, { slug: 'equipamentos', nome: 'Os produtos' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Amarelo Hyster', b: 'Pátio' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Questrial&family=Archivo:wght@400;500;600;700;800&family=Archivo+Narrow:wght@600;700&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá, Casa Forte Empilhadeiras! Vim pelo site e gostaria de um orçamento de locação de empilhadeira.') => waHref(E.wa, m);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Aluguel de empilhadeiras Hyster em Recife` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#fff212' });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const ext = 'target="_blank" rel="noopener"';
const fichaDl = () => `<dl class="ficha">${ficha.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>`;
const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Quantas máquinas<select name="maquinas"><option>1 empilhadeira</option><option>2 a 3 empilhadeiras</option><option>4 ou mais</option><option>Ainda não sei</option></select></label></div>
  <label>O que você precisa<select name="interesse"><option>Locação de empilhadeira</option><option>Visita técnica sem compromisso</option><option>Máquina reserva ou substituição</option><option>Treinamento de operadores</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="3" placeholder="Tipo de carga, peso, altura de armazenagem, turnos"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.fone1}</a></div></li>
  <li>${ic('tel')}<div><strong>Telefones</strong><a href="${telHref(E.fone1)}">${E.fone1}</a><a href="${telHref(E.fone2)}">${E.fone2}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('usuarios')}<div><strong>Contato</strong><span>${E.pessoa}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}, ${E.cidade}</span><span>CEP ${E.cep}</span></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong><span>24 horas para clientes com máquina locada</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Casa Forte Empilhadeiras" loading="lazy" src="https://maps.google.com/maps?q=Estrada%20das%20Ubaias%2C%20758%2C%20Casa%20Forte%2C%20Recife%20PE&z=15&output=embed"></iframe>`;

function topo(v, slug) {
  if (v === 'a') return `<header class="topo">
  <div class="topo-barra"><div class="in">Entre em contato conosco. Ligue <a href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo.webp" alt="Casa Forte Empilhadeiras" width="933" height="255"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Orçamento</a>
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.nome}, página inicial"><img src="/assets/logo-claro.webp" alt="Casa Forte Empilhadeiras" width="933" height="255"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav.filter(n => n.slug !== 'index'), slug)}</ul></nav>
    <a class="btn-topo" href="${telHref(E.fone1)}">${ic('tel')}<span>${E.fone1}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Casa Forte Empilhadeiras" width="933" height="255" loading="lazy"><p>Excelência em aluguel de empilhadeiras Hyster para empresas de todo o Nordeste.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.fone1}</a></li>
      <li>${ic('tel')}<a href="${telHref(E.fone2)}">${E.fone2}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Casa Forte Empilhadeiras. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A empresa', E.sobre) + topo(v, 'empresa') + cab('A empresa', 'Locação de empilhadeiras para quem não pode parar', 'galpao-carga') + `
<div class="in"><section class="texto-pag"><div><p class="lead">${E.sobre}</p><p>Com a locação, a sua empresa usa máquinas Hyster novas, com manutenção em dia e operadores treinados, sem comprar equipamento, sem estoque de peças e sem equipe de manutenção própria.</p><h2>Missão</h2><ul class="lista-check">${missao.map(m => `<li>${ic('check')}<span>${m}</span></li>`).join('')}</ul></div><figure>${img('operador-hyster', 'Operador em uma empilhadeira Hyster')}</figure></section>
<section class="vantagens"><h2>Por que alugar em vez de comprar</h2><ul>${[['pacote', 'Sem imobilizar capital', 'O dinheiro fica no seu negócio, não parado em máquina.'], ['chave', 'Manutenção inclusa', 'Preventiva agendada fora do horário de pico.'], ['escudo', 'Sem máquina parada', 'Reposição imediata com máquina reserva.'], ['usuarios', 'Operador capacitado', 'Treinamento e reciclagem dentro das normas de segurança.']].map(x => `<li class="sobe">${ic(x[0])}<h3>${x[1]}</h3><p>${x[2]}</p></li>`).join('')}</ul></section></div>
` + rodape(v);
  pag.equipamentos = head(v, 'equipamentos', 'Empilhadeira Hyster H-50 FT', 'Empilhadeira Hyster H-50 FT a GLP, 2.500 kg, torre de 3 estágios, transmissão Duramatch, para locação em Recife e no Nordeste.') + topo(v, 'equipamentos') + cab('Os produtos', 'Empilhadeira Hyster H-50 FT', 'armazem') + `
<div class="in"><section class="produto"><figure class="produto-foto">${img('empilhadeira-hyster', 'Empilhadeira Hyster H-50 FT a GLP')}</figure><div><p class="k">Locação</p><h2>Hyster H-50 FT a GLP</h2><p>A empilhadeira contrabalançada a combustão (GLP) para o dia a dia de armazéns, docas e linhas de produção. Robusta, com torre de 3 estágios e a transmissão Duramatch, que controla a velocidade em rampas e nas trocas de direção para mais produtividade e menos desgaste.</p>${fichaDl()}<p class="bts"><a class="btn" href="${wa('Olá! Quero um orçamento de locação da empilhadeira Hyster H-50 FT.')}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'contato')}">Agendar visita</a></p></div></section>
<section class="outras"><h2>Precisa de outra capacidade ou de uma retrátil?</h2><p>Conte como é a sua operação: peso das cargas, altura das prateleiras, largura dos corredores e se o uso é interno ou externo. A Casa Forte indica o equipamento certo.</p><figure>${img('empilhadeira-retratil', 'Empilhadeira retrátil Hyster em corredor de porta-paletes')}</figure></section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Manutenção preventiva, máquinas reserva, treinamento de operadores e atendimento 24 horas na locação de empilhadeiras.') + topo(v, 'servicos') + cab('Serviços', 'Tudo o que vem com a locação', 'paletes') + `
<div class="in"><section class="servs">${diferenciais.map(d => `<article class="serv sobe"><div class="serv-ic">${v === 'a' ? img(d.selo, d.t) : ic(d.ic)}</div><div><h2>${d.t}</h2><p>${d.d}</p></div></article>`).join('')}<article class="serv sobe"><div class="serv-ic">${ic('relogio')}</div><div><h2>Atendimento 24 horas</h2><p>Ligou, a gente atende. Suporte a qualquer hora para os clientes com máquina locada.</p></div></article><article class="serv sobe"><div class="serv-ic">${ic('pin')}</div><div><h2>Todo o Nordeste</h2><p>Base em Recife e locação para empresas em todo o Nordeste.</p></div></article></section>
<section class="passos-sec"><h2>Como funciona a locação</h2><ol>${comoFunciona.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Casa Forte Empilhadeiras: ${E.rua}, ${E.bairro}, ${E.cidade}. WhatsApp ${E.fone1}.`) + topo(v, 'contato') + cab('Contato', 'Solicite uma visita sem compromisso', 'operador-hyster') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="tit-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  const banners = [['banner-1', 'Locação de empilhadeiras. Ligue (81) 99569-8381'], ['banner-2', 'Atendimento 24 horas. Ligue (81) 99569-8381'], ['banner-3', 'Reposição imediata dos equipamentos. Ligue (81) 99569-8381'], ['banner-4', 'Solicite uma visita sem compromisso. Ligue (81) 99569-8381']];
  pag.index = head(v, 'index', '', E.sobre) + topo(v, 'index') + `
<section class="carrossel-a" data-carrossel aria-label="Destaques">${banners.map((b, i) => `<div class="slide${i ? '' : ' ativo'}">${img(b[0], b[1], i ? '' : ' loading="eager" fetchpriority="high"')}</div>`).join('')}<button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próximo">${ic('seta')}</button><div class="pontos"></div></section>
<section class="in marca-a"><img src="/assets/logo.webp" alt="" width="933" height="255" loading="lazy"><h1>Excelência em aluguel de empilhadeiras</h1><p>${E.sobre}</p></section>
<section class="faixa-amarela"><div class="in"><ul class="selos-a">${diferenciais.map(d => `<li class="sobe">${img(d.selo, d.t)}<p>${d.d}</p></li>`).join('')}</ul></div></section>
<section class="in produto-a"><figure>${img('empilhadeira-hyster', 'Empilhadeira Hyster H-50 FT')}</figure><div><p class="k">Os produtos</p><h2>Hyster H-50 FT a GLP</h2>${fichaDl()}<a class="btn" href="${link(v, 'equipamentos')}">Ver detalhes</a></div></section>
<section class="faixa-cinza"><div class="in"><h2>Atendemos empresas de todo o Nordeste</h2><ul class="setores">${setores.map(s => `<li>${ic('fabrica')}${s}</li>`).join('')}</ul></div></section>
<section class="in visita-a"><h2>Solicite uma visita sem compromisso.<br>Entre em contato conosco.</h2><p>${E.rua} · ${E.bairro} · ${E.cidade} · CEP ${E.cep}</p><p class="fones"><a href="${telHref(E.fone1)}">${ic('tel')}${E.fone1}</a><a href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p><a class="btn btn-wa" href="${wa()}" ${ext}>${icWa()}Clique aqui e fale conosco pelo WhatsApp</a></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div><div class="listras" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', E.sobre) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in"><div class="hero-b-txt"><p class="k">Locação de empilhadeiras · Recife e Nordeste</p><h1>Empilhadeira Hyster na sua operação, <span>sem comprar máquina.</span></h1><p>Máquinas novas, manutenção preventiva em horário agendado, máquina reserva e operador treinado. Atendimento 24 horas.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'contato')}">Agendar visita sem compromisso</a></p></div><figure class="hero-b-maq">${img('empilhadeira-hyster', 'Empilhadeira Hyster H-50 FT', ' loading="eager" fetchpriority="high"')}<figcaption><b>2.500 kg</b>Hyster H-50 FT · GLP</figcaption></figure></div><div class="listras" aria-hidden="true"></div></section>
<section class="in dif-b"><header class="tit-b"><p class="k">O que vem com a locação</p><h2>Você opera. A manutenção é com a gente.</h2></header><ul>${diferenciais.map((d, i) => `<li class="sobe"><span class="n">0${i + 1}</span>${ic(d.ic)}<h3>${d.t}</h3><p>${d.d}</p></li>`).join('')}</ul></section>
<section class="foto-b"><div class="in foto-b-in"><figure>${img('operador-hyster', 'Operador em empilhadeira Hyster')}</figure><div><p class="k">A empresa</p><h2>Sem imobilizar capital em máquina</h2><p>${E.sobre}</p><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Casa Forte ${ic('seta')}</a></div></div></section>
<section class="in ficha-b"><div><p class="k">Os produtos</p><h2>Ficha técnica</h2><p>A empilhadeira contrabalançada a GLP para armazéns, docas e linhas de produção.</p><a class="btn" href="${link(v, 'equipamentos')}">Ver o equipamento</a></div>${fichaDl()}</section>
<section class="passos-b"><div class="in"><header class="tit-b"><p class="k">Como funciona</p><h2>Da visita à máquina rodando</h2></header><ol>${comoFunciona.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></div></section>
<section class="in cta-b"><div><h2>Solicite uma visita sem compromisso</h2><p>${E.rua}, ${E.bairro}, ${E.cidade} · atendemos todo o Nordeste</p></div><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}${E.fone1}</a><a class="btn btn-linha" href="${telHref(E.fone2)}">${ic('tel')}${E.fone2}</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#fff212', fundo: '#1b1b1b', claro: '#f4f4ef',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Archivo,system-ui,sans-serif', googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site atual: barra preta com os telefones, os banners amarelos com a Hyster, o logo em destaque e a faixa amarela com os quatro selos, agora com página para o equipamento, os serviços e a empresa.', pontos: ['Ficha técnica da Hyster H-50 FT', 'Missão e vantagens de alugar', 'Orçamento direto pelo WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna: fundo grafite com faixas zebradas de pátio, a empilhadeira em destaque na abertura e a locação explicada passo a passo.', pontos: ['"Você opera, a manutenção é com a gente"', 'Como funciona: visita, proposta, entrega, manutenção', 'Telefone sempre visível no topo'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
