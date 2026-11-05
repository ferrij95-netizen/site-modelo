// Alzicar Serviços Automotivos (Navegantes, Porto Alegre/RS). Gera public/{a,b}/ e a página de escolha.
// node clientes/alzicar/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs alzicar http://alzicar.com/)
// Textos, fotos e logo tirados do site atual (alzicar.com). O telefone está na placa da fachada e no carro de leva e traz (fotos do site).
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Alzicar Serviços Automotivos', curto: 'Alzicar', url: 'https://alzicar.overtus.com.br/', antigo: 'http://alzicar.com/',
  fone: '(51) 3362-4002', email: 'alzicar@alzicar.com', socios: 'Vanessa Quadros e Átila Quadros',
  rua: 'Av. Brasil, 122', bairro: 'Navegantes', cidade: 'Porto Alegre/RS', cep: '90230-060',
  historia: 'A Alzicar, fundada pelos sócios Vanessa Quadros e Átila Quadros, nasceu com objetivos e conquistas sólidas, repassados de família e com uma longa tradição em serviços automotivos.',
  missao: 'Executar seus serviços dentro dos mais elevados padrões de qualidade, visando à satisfação total de seus clientes.',
  equipe: 'A equipe é um dos principais requisitos para a execução da nossa missão. Por isso a empresa busca profissionais com formação técnica e investe constantemente em cursos de especialização.',
  oficina: 'Transparência, agilidade, pontualidade e principalmente qualidade. Aqui o diferencial é ser atendido pelos proprietários, que fazem o diagnóstico do veículo. A equipe realiza o orçamento, a execução dos serviços, os testes finais e a entrega técnica.',
  capacidade: 'A Alzicar tem capacidade para atender mais de 200 veículos por mês. Para isso, dispõe de uma sala de espera climatizada e toda a estrutura para melhor atender. Para facilitar, trabalha com diversas formas de pagamento parcelado.',
  estoque: 'Com um amplo estoque de peças, a empresa garante a qualidade dos seus produtos, usando peças genuínas de primeira linha, e traz para o cliente a conveniência de encontrar tudo em um só lugar. Assim o seu carro fica pronto rapidinho e com a qualidade desejada.',
  equipamentos: 'Para deixar o seu veículo em perfeitas condições, a oficina tem aparelhos de injeção eletrônica de última geração, analisador de gases, aparelho para limpeza de bicos e outros equipamentos eletroeletrônicos, além das ferramentas especiais de trabalho.',
  levaetraz: 'Tranquilidade, conforto e economia para você.',
};
const endereco = `${E.rua}, ${E.bairro}, ${E.cidade}`;
const mapsQ = encodeURIComponent('Av. Brasil, 122, Navegantes, Porto Alegre RS, 90230-060');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const servicos = [
  { ic: 'oleo', t: 'Revisão periódica', d: 'Manutenção e prevenção: troca de óleos, filtros, velas e aditivos.' },
  { ic: 'painel', t: 'Manutenções elétricas', d: 'Diagnóstico e reparo da parte elétrica do veículo.' },
  { ic: 'pacote', t: 'Sistema de embreagem', d: 'Revisão, regulagem e troca dos componentes da embreagem.' },
  { ic: 'disco', t: 'Sistema de freios', d: 'Pastilhas, discos, lonas e fluido, com o sistema inteiro verificado.' },
  { ic: 'volante', t: 'Suspensão e direção', d: 'Amortecedores, molas, buchas, terminais e caixa de direção.' },
  { ic: 'gota', t: 'Sistema de arrefecimento', d: 'Radiador, bomba d\'água, mangueiras e válvula termostática.' },
  { ic: 'engrenagem', t: 'Câmbio e diferencial', d: 'Manutenção e reparos em caixa de câmbio e diferencial.' },
  { ic: 'chama', t: 'Análise de gases', d: 'Medição da emissão do motor com analisador de gases.' },
  { ic: 'medidor', t: 'Injeção eletrônica', d: 'Análise de injeção com diagnóstico informatizado e limpeza de bicos.' },
];
const parceria = ['Chapeação', 'Pintura', 'Geometria e balanceamento', 'Pneus e acessórios'];
const parceiros = ['Geomaster', 'Sulwagen', 'A Silenciosa', 'Auto Elétricas', 'Cairú Pneus'];
const valores = ['Rapidez', 'Transparência', 'Honestidade', 'Qualidade', 'Comprometimento'];
const passos = [
  ['Diagnóstico', 'Feito pelos proprietários, que recebem o carro e descobrem a causa do problema.'],
  ['Orçamento', 'Você sabe o que vai ser feito e quanto custa antes do serviço começar.'],
  ['Execução', 'A equipe técnica faz o serviço com peças de primeira linha do próprio estoque.'],
  ['Testes finais', 'O carro é testado depois do serviço, antes de ser liberado.'],
  ['Entrega técnica', 'Na entrega, explicamos o que foi feito no seu carro.'],
];
const fatos = [
  { ic: 'usuarios', t: 'Atendido pelos donos', d: 'Os proprietários fazem o diagnóstico do seu carro.' },
  { ic: 'medidor', t: 'Diagnóstico informatizado', d: 'Injeção eletrônica de última geração e analisador de gases.' },
  { ic: 'pacote', t: 'Estoque de peças', d: 'Peças genuínas de primeira linha, tudo em um só lugar.' },
  { ic: 'check', t: 'Pagamento parcelado', d: 'Diversas formas de pagamento para facilitar.' },
];
const dicas = [
  { t: 'Palhetas', ic: 'chuveiro', l: ['Ao lavar o carro, limpe a borracha com pano umedecido e água, nunca com querosene ou produtos químicos.', 'Palhetas duplas reduzem à metade a vida útil do sistema do limpador de para-brisa.'] },
  { t: 'Filtros', ic: 'floco', l: ['Troque o filtro de óleo a cada troca de óleo.', 'Substitua o filtro de ar a cada 20.000 km rodados.'] },
  { t: 'Radiador', ic: 'gota', l: ['Verifique o nível de água do radiador uma vez por semana.', 'Só adicione água com o motor ligado.', 'Não inspecione nem adicione água com o motor quente: pode causar queimaduras.'] },
  { t: 'Cabos', ic: 'painel', l: ['Lave o motor somente com água, sem material abrasivo.'] },
  { t: 'Troca de óleo', ic: 'oleo', l: ['Evite trocar o óleo por sistema Jet-Oil.', 'Não ultrapasse o período de troca.'] },
  { t: 'Combustível', ic: 'chama', l: ['Tanque vazio ou na reserva, nem pensar. Todo o sistema de injeção trabalha pressurizado, e esse mau hábito acaba comprometendo a bomba de combustível e os demais componentes.'] },
];
const fotos = {
  frente: 'Frente da loja, na Av. Brasil',
  oficina: 'A oficina',
  estoque: 'Estoque de peças',
  atendimento: 'Atendimento',
  salaespera: 'Sala de espera climatizada',
  escritorio: 'Escritório',
  levaetraz: 'Carro do leva e traz',
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'empresa', nome: 'A Alzicar' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'estrutura', nome: 'Oficina e estoque' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Navegantes', b: 'De pai para filho' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700&family=Public+Sans:wght@400;500;600;700&family=Kanit:ital,wght@0,500;0,600;1,600;1,700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap';
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n])}" width="640" height="480" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#25215a', b: '#15133a' };
const tel = telHref(E.fone);
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Oficina mecânica no Navegantes, Porto Alegre` : `${titulo} | ${E.curto}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;

const formulario = () => `<form class="form" data-email="${E.email}" data-assunto="Agendamento de revisão pelo site">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Veículo (modelo e ano)<input name="veiculo" placeholder="Ex.: Gol 1.6 2015"></label></div>
  <label>Serviço<select name="servico"><option>Revisão periódica</option>${servicos.slice(1).map(s => `<option>${s.t}</option>`).join('')}<option>Outro / dúvida</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="O que o carro está apresentando, ou a sua dúvida, crítica ou sugestão"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar por e-mail</button>
  <p class="form-nota">O botão abre o seu programa de e-mail com a mensagem pronta para a Alzicar. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, bairro ${E.bairro}</span><span>${E.cidade}, CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Alzicar na Av. Brasil, 122" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const listaDicas = (cls = '') => `<div class="dicas ${cls}">${dicas.map(d => `<article class="dica sobe">${ic(d.ic)}<h3>${d.t}</h3><ul>${d.l.map(x => `<li>${x}</li>`).join('')}</ul></article>`).join('')}</div>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  const barra = v === 'a' ? `<div class="topo-barra"><div class="in"><span>${ic('pin')}${E.rua} · ${E.bairro} · Porto Alegre</span><span class="tb-dir"><a href="mailto:${E.email}">${ic('mail')}${E.email}</a><a href="${tel}">${ic('tel')}${E.fone}</a></span></div></div>` : '';
  return `<header class="topo">${barra}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="${E.curto}, página inicial"><img src="/assets/${logo}.webp" alt="Alzicar" width="800" height="282"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, v === 'b' ? nav.filter(n => n.slug !== 'index') : nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${v === 'a' ? link(v, 'contato') : tel}">${v === 'a' ? `${ic('calendario')}Agendar revisão` : `${ic('tel')}<span>${E.fone}</span>`}</a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Alzicar" width="800" height="282" loading="lazy"><p>Serviços automotivos para nacionais e importados, no bairro Navegantes, em Porto Alegre.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}, ${E.bairro}<br>${E.cidade}, CEP ${E.cep}</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Alzicar Serviços Automotivos. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="fone-flutua" href="${tel}" aria-label="Ligar para a Alzicar">${ic('tel')}</a>
</body>
</html>
`;
}

function comum(v, pag, cab) {
  pag.empresa = head(v, 'empresa', 'A Alzicar', E.historia) + topo(v, 'empresa') + cab('A Alzicar', 'De pai para filho', 'frente') + `
<div class="in">
<section class="texto-pag"><div><p class="lead">${E.historia}</p><h2>Missão</h2><blockquote class="missao">${E.missao}</blockquote><h2>Equipe</h2><p>${E.equipe} Para a Alzicar, funcionários valorizados resultam em:</p><ul class="valores">${valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
<aside class="socios"><p class="k">Fundadores</p><p class="socios-nomes">Vanessa Quadros<br>Átila Quadros</p><p>Na Alzicar, quem recebe o seu carro e faz o diagnóstico são os próprios donos.</p><a class="link-seta" href="${link(v, 'contato')}">Fale com a gente ${ic('seta')}</a></aside></section>
<section class="galeria g3">${['frente', 'salaespera', 'atendimento'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Revisão periódica, elétrica, embreagem, freios, suspensão e direção, arrefecimento, câmbio e diferencial, análise de gases e injeção eletrônica no Navegantes, Porto Alegre.') + topo(v, 'servicos') + cab('Serviços', 'Mecânica completa para nacionais e importados', 'oficina') + `
<div class="in">
<p class="intro">${E.equipamentos}</p>
<section class="servs">${servicos.map((s, i) => `<article class="serv sobe" id="s${i + 1}"><div class="serv-ic">${ic(s.ic)}</div><div><h2>${s.t}</h2><p>${s.d}</p></div></article>`).join('')}</section>
<section class="parceria"><div><p class="k">Com parceiros</p><h2>E ainda: ${parceria.join(', ').replace(/, ([^,]*)$/, ' e $1').toLowerCase()}</h2><p>Serviços feitos em parceria com:</p></div><ul class="chips">${parceiros.map(p => `<li>${p}</li>`).join('')}</ul></section>
<section class="passos-sec"><h2>Como o seu carro é atendido</h2><ol class="passos">${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<p class="cta-linha"><a class="btn" href="${link(v, 'contato')}">${ic('calendario')}Agendar revisão</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p>
</div>
` + rodape(v);
  pag.estrutura = head(v, 'estrutura', 'Oficina e estoque', E.capacidade) + topo(v, 'estrutura') + cab('Oficina e estoque', 'Estrutura para mais de 200 carros por mês', 'estoque') + `
<div class="in">
<section class="blocos">
  <article class="bloco sobe">${foto('oficina')}<div><h2>A oficina</h2><p>${E.oficina}</p><p>${E.capacidade}</p></div></article>
  <article class="bloco sobe">${foto('estoque')}<div><h2>Estoque de peças</h2><p>${E.estoque}</p></div></article>
  <article class="bloco sobe">${foto('salaespera')}<div><h2>Sala de espera</h2><p>Enquanto o serviço é feito, você espera numa sala climatizada.</p></div></article>
  <article class="bloco sobe">${foto('levaetraz')}<div><h2>Leva e traz</h2><p>${E.levaetraz} Pergunte sobre o leva e traz quando agendar o serviço.</p><a class="link-seta" href="${tel}">Ligar ${E.fone} ${ic('seta')}</a></div></article>
</section>
<section class="galeria g4">${['atendimento', 'escritorio', 'frente', 'oficina'].map(f => `<figure class="sobe">${foto(f)}<figcaption>${fotos[f]}</figcaption></figure>`).join('')}</section>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas para o seu carro', 'Dicas da Alzicar sobre palhetas, filtros, radiador, cabos, troca de óleo e combustível.') + topo(v, 'dicas') + cab('Dicas', 'Dicas para o seu carro', 'oficina') + `
<div class="in"><p class="intro">Cuidados simples que fazem o carro durar mais e evitam surpresas na estrada.</p>${listaDicas()}
<p class="cta-linha"><a class="btn" href="${link(v, 'contato')}">${ic('calendario')}Agendar revisão</a></p></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato e agendamento', `Alzicar: ${endereco}. Telefone ${E.fone}. Agende a revisão do seu carro.`) + topo(v, 'contato') + cab('Contato', 'Agende a revisão do seu carro', 'frente') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Agendamento on-line</h2><p>Deixe seus dados e conte o que o carro precisa. Também vale para dúvidas, críticas e sugestões: sua opinião é muito importante para nós.</p>${formulario()}</div><div>${contatoLista()}${mapaFrame}</div></section></div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, f) => `<section class="tit-a"><div class="in tit-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div><figure>${img(f, ' loading="eager"')}</figure></div></section>`;
  pag.index = head(v, 'index', '', `${E.historia} ${E.rua}, ${E.bairro}, Porto Alegre.`) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Serviços automotivos · Nacionais e importados</p><h1>Oficina de família no <em>Navegantes</em></h1><p>Revisão, freios, suspensão, embreagem, elétrica e injeção eletrônica com diagnóstico informatizado. Na Alzicar, o seu carro é atendido pelos proprietários.</p>
  <p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('calendario')}Agendar revisão</a><a class="btn btn-linha" href="${tel}">${ic('tel')}${E.fone}</a></p></div>
  <figure class="hero-a-foto">${foto('frente')}<figcaption>${ic('pin')}${E.rua} · ${E.bairro}</figcaption></figure>
</div></section>
<section class="fatos-a"><div class="in"><ul>${fatos.map(f => `<li class="sobe">${ic(f.ic)}<div><h3>${f.t}</h3><p>${f.d}</p></div></li>`).join('')}</ul></div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Mecânica completa, em um só lugar</h2></header><ul>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#s${i + 1}">${ic(s.ic)}<span><strong>${s.t}</strong>${s.d}</span></a></li>`).join('')}</ul><p class="nota-parc">E ainda chapeação, pintura, geometria e balanceamento, pneus e acessórios com parceiros. <a class="link-seta" href="${link(v, 'servicos')}">Ver serviços ${ic('seta')}</a></p></section>
<section class="familia-a"><div class="in familia-a-in"><div><p class="k">De pai para filho</p><h2>Uma longa tradição em serviços automotivos</h2><p>${E.historia}</p><ul class="valores">${valores.map(x => `<li>${x}</li>`).join('')}</ul><a class="btn btn-claro" href="${link(v, 'empresa')}">Conheça a Alzicar</a></div><div class="familia-fotos">${foto('atendimento')}${foto('salaespera')}</div></div></section>
<section class="in passos-a"><header class="tit"><p class="k">Como trabalhamos</p><h2>Do diagnóstico à entrega técnica</h2></header><ol class="passos">${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></section>
<section class="in estru-a"><div class="estru-fotos">${foto('oficina')}${foto('estoque')}</div><div><p class="k">Oficina e estoque</p><h2>Peças genuínas e estrutura para mais de 200 carros por mês</h2><p>${E.estoque}</p><a class="link-seta" href="${link(v, 'estrutura')}">Ver a oficina ${ic('seta')}</a></div></section>
<section class="dicas-a"><div class="in"><header class="tit"><p class="k">Dicas para o seu carro</p><h2>Pequenos cuidados que evitam grandes consertos</h2></header>${listaDicas('tres')}<a class="link-seta" href="${link(v, 'dicas')}">Todas as dicas ${ic('seta')}</a></div></section>
<section class="in cta-a"><div><h2>Venha conhecer a Alzicar</h2><p>${E.rua}, bairro ${E.bairro}, Porto Alegre. CEP ${E.cep}.</p></div><p class="bts"><a class="btn" href="${link(v, 'contato')}">${ic('calendario')}Agendar revisão</a><a class="btn btn-linha" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a></p></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, f) => `<section class="cab-b">${img(f, ' loading="eager"')}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  pag.index = head(v, 'index', '', `${E.historia} ${E.rua}, ${E.bairro}, Porto Alegre.`) + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <div class="hero-b-txt"><p class="k">Av. Brasil, 122 · Navegantes · Porto Alegre</p><h1>De pai para filho.<br><em>Do diagnóstico à entrega.</em></h1><p>Mecânica para nacionais e importados com injeção eletrônica de última geração, analisador de gases e estoque próprio de peças. Quem atende você são os donos.</p>
  <p class="bts"><a class="btn" href="${tel}">${ic('tel')}Ligar ${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Agendar on-line</a></p></div>
  <div class="hero-b-fotos">${foto('oficina', 'f1')}${foto('frente', 'f2')}${foto('estoque', 'f3')}</div>
</div></section>
<section class="missao-b"><div class="in"><p class="k">Nossa missão</p><blockquote>${E.missao}</blockquote><ul class="valores">${valores.map(x => `<li>${x}</li>`).join('')}</ul></div></section>
<section class="in servs-b"><header class="tit-b"><p class="k">Serviços</p><h2>O que fazemos na oficina</h2></header><ol>${servicos.map((s, i) => `<li class="sobe"><a href="${link(v, 'servicos')}#s${i + 1}"><b>${String(i + 1).padStart(2, '0')}</b><span><strong>${s.t}</strong><small>${s.d}</small></span>${ic('seta')}</a></li>`).join('')}</ol>
<div class="parc-b"><p>Com parceiros: ${parceria.join(' · ')}</p><ul class="chips">${parceiros.map(p => `<li>${p}</li>`).join('')}</ul></div></section>
<section class="linha-b"><div class="in"><header class="tit-b"><p class="k">Como trabalhamos</p><h2>Transparência, agilidade, pontualidade e qualidade</h2></header><ol class="passos">${passos.map((p, i) => `<li class="sobe"><b>${i + 1}</b><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></div></section>
<section class="in estru-b"><div><p class="k">Estrutura</p><h2>Mais de 200 carros por mês</h2><p>${E.capacidade}</p><ul class="lista-check">${fatos.map(f => `<li>${ic('check')}<span><b>${f.t}.</b> ${f.d}</span></li>`).join('')}</ul><a class="link-seta" href="${link(v, 'estrutura')}">Oficina e estoque ${ic('seta')}</a></div><div class="estru-b-fotos">${foto('salaespera')}${foto('atendimento')}${foto('levaetraz')}</div></section>
<section class="in dicas-b"><header class="tit-b"><p class="k">Dicas</p><h2>Para o seu carro durar mais</h2></header>${listaDicas('tres')}<a class="link-seta" href="${link(v, 'dicas')}">Ver todas as dicas ${ic('seta')}</a></section>
<section class="cta-b"><div class="in cta-b-in"><img src="/assets/logo-claro.webp" alt="" width="800" height="282" loading="lazy"><div><h2>Agende a revisão do seu carro</h2><p>${E.rua}, ${E.bairro} · Porto Alegre/RS</p></div><p class="bts"><a class="btn" href="${tel}">${ic('tel')}${E.fone}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Agendar on-line</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#4a44b0', fundo: '#15133a', claro: '#eef0f4',
  fonteTitulo: "'Chakra Petch',system-ui,sans-serif", fonteTexto: "'Public Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no azul-índigo da placa da fachada, com títulos inclinados como o logo: a frente da loja na abertura, os 9 serviços e os passos do diagnóstico à entrega técnica.', pontos: ['Agendamento de revisão on-line em todas as páginas', 'Página de oficina e estoque com as fotos do site atual', 'Dicas para o seu carro reaproveitadas do site'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura e mais forte, com o "de pai para filho" na abertura, a missão em destaque e os serviços numerados. O telefone fica sempre à vista no topo.', pontos: ['"De pai para filho. Do diagnóstico à entrega."', 'Missão e valores da equipe em destaque', 'Parceiros de chapeação, pintura, geometria e pneus'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
