// Simetriza Balanceamento Industrial (Esteio/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/simetriza/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs simetriza https://simetriza.com.br/)
// Textos das páginas do site atual (WordPress/Elementor); fotos de /wp-json/wp/v2/media. Logo recortado do selo de 10 anos (sem o "10 anos").
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Simetriza Balanceamento Industrial', url: 'https://simetriza.overtus.com.br/', antigo: 'https://simetriza.com.br/',
  wa: '5551997265790', cel: '(51) 99726-5790', fone: '(51) 3078-1010', email: 'contato@simetriza.com.br',
  rua: 'Rua Padre Felipe, 1777', bairro: 'Centro', cidade: 'Esteio - RS', cep: '93265-011',
  insta: 'https://www.instagram.com/simetriza/', face: 'https://www.facebook.com/simetriza', linkedin: 'https://www.linkedin.com/company/simetriza/',
  curto: 'Balanceamento estático e dinâmico de polias, hélices, rotores e turbinas em máquinas Schenck, conforme a norma ISO 1940. Coleta e entrega com frota própria em todo o Sul.',
};
const specs = [['Peso', '1 kg a 3.500 kg', 'diferencial exclusivo'], ['Diâmetro', '100 a 2.600 mm', ''], ['Comprimento', '300 a 10.000 mm', ''], ['Rotação', '50 a 15.000 rpm', '']];
const pecas = ['Polias', 'Eixos', 'Rolos de moagem', 'Rotores em geral', 'Hélices', 'Componentes de bombas', 'Centrífugas', 'Cilindros', 'Exaustores', 'Induzidos de geradores', 'Induzidos', 'Induzidos de ferramentas elétricas', 'Picadores', 'Roscas de compressores', 'Roscas transportadoras'];
const sintomas = ['Rotor com vibração ou excesso de ruído', 'Mancais de peças rotativas aquecendo', 'Virabrequim gerando vibração no motor de competição', 'Cilindros desbalanceados', 'Manutenção de induzido', 'Peças de giro elevado vibrando'];
const numeros = [['1.019+', 'clientes cadastrados'], ['885+', 'clientes recorrentes'], ['101.854+', 'peças balanceadas'], ['ISO 9001', 'e laudo conforme ISO 1940']];
const diferenciais = [
  ['pin', 'Localização estratégica', 'Na entrada principal de Esteio, perto da BR-116, com acesso fácil da Capital, Vale dos Sinos, Vale do Taquari e Serra.'],
  ['usuarios', 'Equipe experiente', 'Tradição desde 2008 e corpo técnico com mais de 20 anos de experiência em balanceamento.'],
  ['medidor', 'Máquinas Schenck', 'Equipamentos alemães de última geração e alta precisão, referência mundial no segmento.'],
  ['escudo', 'ISO 9001 e ISO 1940', 'Empresa certificada ISO 9001 e serviço executado conforme a norma de balanceamento ISO 1940.'],
  ['caminhao', 'Coleta e entrega', 'Frota própria e parceria com transportadoras para buscar e devolver a peça em todo o Sul.'],
  ['relogio', 'Fora do horário', 'Atendimento agendado em fins de semana e fora do horário comercial, para a parada da sua fábrica.'],
];
const etapas = [
  ['Atendimento', 'Ficamos alinhados com o cliente, facilitando o acompanhamento de cada etapa do serviço.'],
  ['Orçamento', 'Com as informações da peça em mãos, enviamos o orçamento e as condições de pagamento.'],
  ['Coleta', 'Com o orçamento aprovado e a NF disponível, enviamos nosso veículo ou a transportadora para a coleta.'],
  ['Na oficina', 'A peça é descarregada seguindo procedimentos de segurança e entra na programação de produção.'],
  ['O balanceamento', 'Na máquina, medimos quanta massa ajustar e onde fixar os pesos nos dois planos. Adicionamos ou retiramos massa e medimos de novo até o balanceamento perfeito.'],
  ['Embalagem', 'Concluído o serviço, a peça é acondicionada para transporte e a entrega é agendada.'],
  ['Entrega', 'A NF de saída é emitida e a rota é definida respeitando o procedimento de recebimento de cada cliente.'],
  ['Pós-venda', 'Se a máquina ainda vibrar, a equipe refaz a análise do equipamento e da montagem e revisa as especificações de balanceamento.'],
];
const faq = [
  ['Qual o prazo de entrega para balanceamento de uma peça?', 'Depende da disponibilidade da oficina, do tamanho e do peso da peça e da logística envolvida. Nosso objetivo é entregar a peça em no máximo 48 horas. Para serviços agendados, a previsão é de até 3 horas de balanceamento.'],
  ['Quanto tempo leva para balancear um rotor?', 'Depende do tamanho da peça: entre 1 e 3 horas.'],
  ['Vocês fornecem relatório depois do balanceamento?', 'Sim. A Simetriza fornece o Laudo de Qualidade de Balanceamento, seguindo a norma ISO 1940.'],
  ['Vocês balanceiam peças de aço inoxidável?', 'Sim. Temos equipamentos e ferramentas especiais para trabalhar com aço inoxidável sem danificar o material.'],
  ['A Simetriza é fornecedora com certificação ISO?', 'Sim. A Simetriza tem certificação ISO 9001 emitida pela BSI (The British Standards Institution). Nossos processos seguem padrões que mantêm o serviço alinhado aos objetivos dos clientes.'],
  ['Vocês atendem somente Porto Alegre?', 'Não. Atendemos a região metropolitana, a Serra e também Santa Catarina e Paraná, com frota própria ou transportadoras parceiras. Solicite atendimento pelo telefone (51) 3078-1010.'],
  ['Dá para agendar serviço no fim de semana?', 'Sim. Muitas indústrias programam as paradas para o fim de semana, por isso atendemos aos fins de semana e fora do horário comercial com o nosso serviço de agendamento.'],
];
const historia = [
  'A Simetriza é uma empresa 100% gaúcha, especializada em balanceamento dinâmico de peças rotativas. Atua desde 2008, inicialmente junto à Rodatech, empresa com histórico de sucesso e qualidade.',
  'Em 2014 a Simetriza se tornou independente, herdando o histórico de excelência em balanceamento dinâmico. Com o mesmo corpo técnico, somado a investimentos em inovação e gestão, traz um plano de crescimento com foco no cliente.',
  'Está sediada em Esteio, no coração da região metropolitana de Porto Alegre, com fácil acesso para quem vem da Capital, da Grande Porto Alegre, do Vale do Taquari, do Vale dos Sinos e da Serra Gaúcha.',
];
const missao = 'Fornecer soluções de manutenção de equipamentos rotativos com elevado nível de precisão e segurança, destacando-se pelo uso de tecnologia de ponta, agilidade e excelência na execução.';
const visao = 'Ser reconhecida, até 2030, como a principal referência da Região Sul em soluções inovadoras de manutenção de equipamentos rotativos.';
const valores = ['Excelência técnica', 'Compromisso com a qualidade', 'Inovação constante', 'Sustentabilidade nas operações', 'Agilidade no atendimento', 'Ética', 'Senso de responsabilidade', 'Confiabilidade', 'Idoneidade', 'Transparência', 'Cooperação'];
const equipe = [['Otávio Toniolo Krey', 'Gerente de Operações', 'Engenheiro formado pela PUC-RS, com mais de 20 anos de experiência em serviços para o setor industrial e logística.'], ['Priscilla de Azevedo', '', 'Mais de 10 anos de experiência no atendimento ao público industrial com prestação de serviços.'], ['Valdinei Ávila', 'Mecânico Balanceador', 'Trabalha desde 2005 com balanceamento industrial, com vivência em peças de grande porte e amplo conhecimento das máquinas Schenck.']];
const fotosPecas = [['polia-canais', 'Polia de canais'], ['helice', 'Hélice'], ['turbina', 'Turbina'], ['rotor-recartilhado', 'Rotor'], ['cilindro', 'Cilindro'], ['rolo', 'Rolo'], ['volante', 'Volante com embreagem'], ['tambor', 'Tambor'], ['polia-raios', 'Polia de raios'], ['rosca', 'Rosca'], ['polia-grande', 'Polia de grande porte'], ['rotor-maquina', 'Rotor na máquina Schenck']];
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'sobre', nome: 'Sobre' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'processos', nome: 'Processo' }, { slug: 'faq', nome: 'Dúvidas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Rotor', b: 'Laudo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Ubuntu+Condensed&family=Ubuntu+Mono:wght@400;700&family=Source+Sans+3:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap';
const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async"${extra}>`;
const wa = (m = 'Olá! Vim pelo site da Simetriza e gostaria de um orçamento de balanceamento.') => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const cores = { a: '#ffffff', b: '#17191c' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? `${E.nome} | Balanceamento estático e dinâmico em Esteio/RS` : `${titulo} | Simetriza`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const specsHtml = () => `<dl class="specs">${specs.map(s => `<div><dt>${s[0]}</dt><dd>${s[1]}${s[2] ? `<small>${s[2]}</small>` : ''}</dd></div>`).join('')}</dl>`;

const formulario = () => `<form class="form" data-wa>
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
  <div class="form-duas"><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label><label>Cidade<input name="cidade" autocomplete="address-level2"></label></div>
  <label>Peça e problema<textarea name="mensagem" rows="4" placeholder="Tipo de peça, peso, diâmetro, rotação de trabalho, se precisa de coleta..."></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">Prefere ligar? ${E.fone}.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.cel}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span></div></li>
  <li>${ic('calendario')}<div><strong>Agendamento</strong><span>Atendemos fins de semana e fora do horário comercial com hora marcada.</span></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Simetriza" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Rua Padre Felipe, 1777, Centro, Esteio RS')}&z=15&output=embed"></iframe>`;
const redes = `<p class="redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a><a href="${E.linkedin}" ${ext} aria-label="LinkedIn">${ic('linkedin')}</a></p>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Simetriza, página inicial">${img(v === 'a' ? 'logo' : 'logo-claro', 'Simetriza Balanceamento Industrial', ' loading="eager" width="605" height="236"')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="btn btn-topo" href="${wa()}" ${ext}>${icWa()}Orçamento</a>
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
    <div class="rod-marca">${img('logo-claro', 'Simetriza Balanceamento Industrial')}<p>Nós fazemos melhor, porque fazemos diferente.</p><div class="rod-selos">${img('iso9001', 'Certificação ISO 9001')}${img('schenck', 'Equipamentos Schenck')}</div></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li>
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.cel}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul>${redes}</div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Simetriza Balanceamento Industrial. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.sobre = head(v, 'sobre', 'Sobre', historia[0]) + topo(v, 'sobre') + cab('Sobre a Simetriza', 'Tradição em balanceamento estático e dinâmico desde 2008.', 'sede-caminhao') + `
<div class="in"><section class="texto-pag"><div>${historia.map((p, i) => `<p${i ? '' : ' class="lead"'}>${p}</p>`).join('')}</div><figure>${img('sede-fachada', 'Sede da Simetriza em Esteio')}<figcaption>Sede da Simetriza em Esteio, perto da BR-116.</figcaption></figure></section>
<section class="numeros">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</section>
<section class="mv"><div class="sobe"><h2>Missão</h2><p>${missao}</p></div><div class="sobe"><h2>Visão</h2><p>${visao}</p></div><div class="sobe valores"><h2>Valores</h2><ul>${valores.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
<section class="tempo"><h2>Linha do tempo</h2><ol>${[['2008', 'Início das operações, junto à Rodatech'], ['2014', 'A Simetriza se torna independente, com o mesmo corpo técnico'], ['ISO 9001', 'Certificação de qualidade emitida pela BSI'], ['2024', 'Dez anos de Simetriza independente']].map(t => `<li class="sobe"><b>${t[0]}</b><p>${t[1]}</p></li>`).join('')}</ol></section>
<section class="equipe"><h2>Equipe</h2><div>${equipe.map(p => `<article class="sobe"><h3>${p[0]}</h3>${p[1] ? `<p class="cargo">${p[1]}</p>` : ''}<p>${p[2]}</p></article>`).join('')}</div></section>
<section class="politica"><h2>Política de qualidade</h2><p>A Simetriza tem o compromisso com a melhoria contínua de seus processos, produtos e serviços, para alcançar:</p>${lista(['A referência no seu segmento, em tecnologia, qualidade e atendimento', 'A satisfação de clientes e sócios, atendendo suas necessidades e expectativas', 'O aprimoramento da integração e da motivação dos colaboradores'])}</section></div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Balanceamento estático e dinâmico de polias, eixos, rotores, hélices, cilindros, exaustores, induzidos e roscas em máquinas Schenck. Peças de 1 kg a 3.500 kg.') + topo(v, 'servicos') + cab('Serviços', 'Balanceamento industrial de peças rotativas.', 'rotor-maquina') + `
<div class="in"><section class="serv-intro"><div><h2>Balanceamento estático e dinâmico</h2><p>Fazemos balanceamento estático e dinâmico com equipamentos de última geração em peças industriais rotativas como polias, hélices, rotores e turbinas. Ferramentas e dispositivos são feitos sob medida para atender a especificação técnica de cada cliente.</p><p>Ao final, a peça sai com o Laudo de Qualidade de Balanceamento, conforme a norma ISO 1940.</p></div><div class="caixa-specs"><h3>Equipamento Schenck</h3>${specsHtml()}</div></section>
<section class="pecas-sec"><h2>Peças que balanceamos</h2><ul class="pecas">${pecas.map(p => `<li>${p}</li>`).join('')}</ul></section>
<section class="fotos-pecas">${fotosPecas.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}<span>${f[1]}</span></a>`).join('')}</section>
<section class="logistica"><figure>${img('sede-patio', 'Pátio de carga e descarga da Simetriza')}</figure><div><h2>Suas peças em nossas mãos</h2><p>Frota própria para coletar e entregar peças na Capital, Grande Porto Alegre, Vale do Taquari, Vale dos Sinos, Serra Gaúcha, Santa Catarina e Paraná.</p><p>Para o resto do Brasil, a coleta e a entrega são feitas com transportadoras parceiras. Serviços emergenciais podem ser agendados, inclusive no fim de semana.</p><a class="btn" href="${wa('Olá! Preciso agendar uma coleta para balanceamento.')}" ${ext}>${icWa()}Agendar coleta</a></div></section></div>
` + rodape(v);
  pag.processos = head(v, 'processos', 'Processo', 'Como funciona o balanceamento na Simetriza: atendimento, orçamento, coleta, oficina, balanceamento, embalagem, entrega e pós-venda.') + topo(v, 'processos') + cab('Processo', 'Do primeiro contato à peça de volta na sua máquina.', 'painel-schenck') + `
<div class="in"><p class="intro">Você acompanha cada etapa do serviço. São oito passos, sempre com a peça rastreada e a nota fiscal em ordem.</p>
<ol class="etapas">${etapas.map((e, i) => `<li class="sobe"><span class="num">${String(i + 1).padStart(2, '0')}</span><div><h2>${e[0]}</h2><p>${e[1]}</p></div></li>`).join('')}</ol>
<section class="cta-faixa"><h2>Sua empresa precisa deste serviço?</h2><p>Descreva a peça e o problema que a gente responde com prazo e orçamento.</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Falar com a Simetriza</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></section></div>
` + rodape(v);
  pag.faq = head(v, 'faq', 'Dúvidas frequentes', 'Prazo de balanceamento, laudo ISO 1940, aço inoxidável, certificação ISO 9001, região atendida e serviço em fim de semana.') + topo(v, 'faq') + cab('Dúvidas frequentes', 'Prazos, laudo, regiões atendidas e agendamento.', 'volante') + `
<div class="in"><section class="faq">${faq.map((f, i) => `<details${i ? '' : ' open'}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}</section>
<section class="cta-faixa"><h2>Não encontrou a resposta?</h2><p>Pergunte direto para a nossa equipe.</p><p class="bts"><a class="btn" href="${wa('Olá! Tenho uma dúvida sobre balanceamento.')}" ${ext}>${icWa()}Perguntar no WhatsApp</a><a class="btn btn-linha" href="${link(v, 'contato')}">Outros contatos</a></p></section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Simetriza: ${E.rua}, ${E.bairro}, ${E.cidade}. Telefone ${E.fone}, ${E.email}.`) + topo(v, 'contato') + cab('Contato', 'Entre em contato agora.', 'sede-painel') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Peça seu orçamento</h2><p>Estamos à disposição para atender com a agilidade que caracteriza a Simetriza.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, foto) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div></div>${img(foto, '', ' loading="eager"')}</section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in"><div><p class="k">Balanceamento industrial · Esteio/RS</p><h1>Peça girando sem vibração, de 1 kg a 3.500 kg.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p></div><figure class="hero-a-foto">${img('polia-canais', 'Polia na máquina de balanceamento Schenck', ' loading="eager" fetchpriority="high"')}<span class="arco" aria-hidden="true"></span></figure></div></section>
<section class="specs-a"><div class="in">${specsHtml()}</div></section>
<section class="in sintomas-a"><header class="tit"><p class="k">Qual a necessidade do seu equipamento?</p><h2>Se a máquina avisa, a gente resolve</h2></header><ul>${sintomas.map(s => `<li class="sobe">${ic('medidor')}<span>${s}</span></li>`).join('')}</ul></section>
<section class="pecas-a"><div class="in"><header class="tit"><p class="k">Balanceamento estático e dinâmico no RS</p><h2>Polias, hélices, rotores e turbinas</h2></header><div class="trilho">${fotosPecas.slice(0, 8).map(f => `<a href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}<span>${f[1]}</span></a>`).join('')}</div><a class="link-seta" href="${link(v, 'servicos')}">Todas as peças que balanceamos ${ic('seta')}</a></div></section>
<section class="in difs-a"><header class="tit"><p class="k">Nós fazemos melhor, porque fazemos diferente</p><h2>Por que a Simetriza</h2></header><div class="difs">${diferenciais.map(d => `<div class="sobe">${ic(d[0])}<h3>${d[1]}</h3><p>${d[2]}</p></div>`).join('')}</div></section>
<section class="coleta-a"><div class="in coleta-in"><figure>${img('sede-caminhao', 'Caminhão da Simetriza na sede')}</figure><div><p class="k">Busca e entrega</p><h2>Da coleta da peça até a montagem e o funcionamento</h2><p>Frota própria na Capital, Grande Porto Alegre, Vale do Taquari, Vale dos Sinos e Serra Gaúcha. Santa Catarina, Paraná e o resto do Brasil com transportadoras parceiras.</p><a class="link-seta" href="${link(v, 'processos')}">Como funciona ${ic('seta')}</a></div></div></section>
<section class="in numeros-a">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</section>
<section class="cta-a"><div class="in"><div><h2>Parada programada no fim de semana?</h2><p>Agende o balanceamento fora do horário comercial.</p></div><p class="bts"><a class="btn" href="${wa('Olá! Quero agendar um balanceamento.')}" ${ext}>${icWa()}Agendar</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, foto) => `<section class="cab-b">${img(foto, '', ' loading="eager"')}<div class="in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b">${img('turbina', 'Turbina na máquina de balanceamento', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">ISO 1940 · Schenck · desde 2008</p><h1>Balanceamento industrial com laudo.</h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${wa()}" ${ext}>${icWa()}Orçamento pelo WhatsApp</a><a class="link-seta" href="${link(v, 'processos')}">Como funciona ${ic('seta')}</a></p></div></section>
<section class="laudo-b"><div class="in laudo-in"><div><p class="k">Capacidade da máquina</p><h2>Ficha do equipamento Schenck</h2><p>Ferramentas e dispositivos feitos sob medida para a especificação técnica de cada cliente.</p></div>${specsHtml()}</div></section>
<section class="in sint-b"><header class="tit-b"><p class="k">Sintomas</p><h2>Qual a necessidade do seu equipamento?</h2></header><ol>${sintomas.map((s, i) => `<li class="sobe"><span class="num">${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol></section>
<section class="galeria-b"><div class="in"><header class="tit-b"><p class="k">Na máquina</p><h2>Peças que passaram por aqui</h2></header><div class="mosaico">${['polia-raios', 'helice', 'rolo', 'volante', 'tambor'].map((n, i) => { const f = fotosPecas.find(x => x[0] === n); return `<a class="m${i + 1}" href="/assets/img/${n}.webp" data-foto data-legenda="${esc(f[1])}">${img(n, f[1])}<span>${f[1]}</span></a>`; }).join('')}</div></div></section>
<section class="in etapas-b"><header class="tit-b"><p class="k">Processo</p><h2>Oito etapas, uma peça rastreada</h2></header><ol>${etapas.map((e, i) => `<li class="sobe"><span class="num">${String(i + 1).padStart(2, '0')}</span><h3>${e[0]}</h3></li>`).join('')}</ol><a class="link-seta" href="${link(v, 'processos')}">Ver cada etapa ${ic('seta')}</a></section>
<section class="numeros-b"><div class="in">${numeros.map(n => `<div class="sobe"><b>${n[0]}</b><span>${n[1]}</span></div>`).join('')}</div></section>
<section class="in sede-b"><figure>${img('sede-painel', 'Fachada da Simetriza em Esteio')}</figure><div><p class="k">Esteio · BR-116</p><h2>Na entrada de Esteio, perto da BR-116</h2><p>${historia[1]}</p><a class="link-seta" href="${link(v, 'sobre')}">Sobre a Simetriza ${ic('seta')}</a></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Simetriza', artigo: 'da', url: E.url, lang: 'pt', cor: '#d7151d', fundo: '#17191c', claro: '#f4f4f5',
  fonteTitulo: "Ubuntu,system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, com o vermelho e os arcos do logo: a capacidade da máquina logo abaixo da abertura, os sintomas que pedem balanceamento e a coleta com frota própria.', pontos: ['"De 1 kg a 3.500 kg" na abertura', 'Sintomas do equipamento em destaque', 'Galeria com as peças reais da oficina'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura e técnica, como um laudo de balanceamento: ficha do equipamento Schenck, processo em oito etapas e números da empresa.', pontos: ['Ficha técnica da máquina na home', 'Processo completo da coleta ao pós-venda', 'Dúvidas frequentes com prazos e laudo ISO 1940'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
