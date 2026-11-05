// Mit Car Centro Automotivo (Av. Duque de Caxias, 3995, Londrina/PR). Gera public/{a,b}/ e a página de escolha.
// node clientes/mitcarlondrina/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs mitcarlondrina http://www.mitcarlondrina.com.br/)
// Textos tirados do site atual (mitcarlondrina.com.br: home, empresa, produto/2, produto/4, produto/5, produto/6 e os 5 informativos).
// Fotos: as do próprio site (faixa empresa.jpg cortada em 4 e miniaturas dos informativos). São fotos de banco de imagem, não da oficina.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Mit Car Centro Automotivo', curto: 'Mit Car', url: 'https://mitcarlondrina.overtus.com.br/', antigo: 'http://www.mitcarlondrina.com.br/',
  fone: '(43) 3324-9836', email: 'financeiro@mitcarlondrina.com.br',
  rua: 'Av. Duque de Caxias, 3995', cidade: 'Londrina/PR', cep: '86026-070',
};
const sobre = [
  'Com grande experiência no mercado automotivo, a Mit Car Oficina Multimarcas oferece para Londrina e região uma equipe treinada, que trabalha para atender suas necessidades em mecânica e assistência de automóveis.',
  'Eficiência, mão de obra especializada e produtos das melhores marcas fazem hoje da Mit Car uma referência no mercado automotivo.',
  'Oferecemos revisão de motor, troca de óleo, limpeza de ar-condicionado e revisão em geral, com garantia dos nossos serviços.',
  'A Mit Car está localizada no centro da cidade, com novas e modernas instalações. Visite-nos e faça um orçamento sem compromisso.',
];
const atuacao = 'Manutenção preventiva e corretiva de veículos, com ou sem reparações mecânicas, reparações em sistemas de injeção eletrônica, serviços de vidraçaria em automóveis e serviços de capoteiro. Comércio de peças automotivas associado à prestação de serviço.';
const servicos = [
  ['Alinhamento de direção', 'Computadorizado e a laser, e alinhamento de farol'],
  ['Balanceamento de rodas'], ['Montagem de pneus'], ['Sistema de freios'], ['Limpeza de freio'], ['Sistema de suspensão'], ['Embreagem'],
  ['Câmbio manual e automático'], ['Troca de correia'], ['Troca de escapamento'], ['Troca de óleo'],
  ['Troca de filtros', 'Ar, óleo, combustível e ar-condicionado'], ['Troca de fluido do radiador'], ['Troca de velas'], ['Instalação de protetor de cárter'],
];
const produtos = ['Pneus multimarcas', 'Amortecedores', 'Kits para amortecedores', 'Molas', 'Bandejas', 'Pivôs para suspensão', 'Kits para suspensão: coxins, buchas e bieletas', 'Barras de direção', 'Terminais de direção', 'Caixa de direção', 'Discos de freio', 'Pastilhas de freio', 'Kits para freio', 'Fluido para freio', 'Baterias', 'Escapamentos', 'Protetor de cárter', 'Rodas, válvulas e parafusos', 'Câmaras de ar', 'Lâmpadas de farol', 'Extintor de incêndio'];
const viagem = ['Fluido de freio', 'Fluido da direção hidráulica', 'Fluido do limpador de para-brisa', 'Fluido do diferencial', 'Fluido da transmissão', 'Pressão dos pneus', 'Líquido de arrefecimento', 'Filtro de ar', 'Desgaste dos pneus', 'Extintor de incêndio', 'Sistema de escapamento', 'Palhetas do limpador de para-brisa', 'Correias', 'Todas as lâmpadas, inclusive setas', 'Bateria (cabos e suporte)'];
const viagemTxt = 'Antes de pegar a estrada, é importante que o veículo passe por uma revisão preventiva. São itens que vão muito além de calibrar os pneus e verificar o nível do óleo, para a sua segurança.';
const viagemDet = [
  ['Combustíveis e lubrificantes', 'Abasteça em postos conhecidos e não deixe o combustível muito tempo parado no tanque antes de pegar a estrada.'],
  ['Filtros de ar, óleo e combustível', 'Faça a troca conforme indicado no manual do proprietário. Trocar o óleo sem trocar o filtro, por exemplo, diminui a vida útil do lubrificante.'],
  ['Limpador de para-brisa', 'Cheque se as lâminas e as borrachas estão em bom estado e se os encaixes das hastes estão seguros. Lave a borracha das palhetas apenas com água.'],
  ['Freios', 'O nível do fluido de freio e possíveis vazamentos devem sempre ser checados. Se houver ruídos, trepidações, perda de eficiência ou pedal duro, peça uma avaliação mais minuciosa.'],
  ['Velas e cabos', 'Alguns fabricantes indicam examinar as velas a cada 10 mil km e trocar os cabos a cada 50 mil km. Qualquer falha nesse sistema pode desgastar antes do tempo outros componentes.'],
  ['Suspensão', 'O amortecimento e a estabilidade do veículo são tão importantes quanto os freios. Além dos amortecedores, molas, buchas, bandejas, pivôs e terminais também merecem inspeção.'],
  ['Correia dentada', 'Segundo os fabricantes, a troca preventiva deve ser feita, em média, a cada 50 mil km. Uma verificação a cada 15 mil km pode apontar trincas e desgastes. O rompimento dessa peça pode danificar gravemente o motor.'],
  ['Radiador', 'Respeite a data limite de troca do líquido de arrefecimento e peça para conferir a válvula termostática, o radiador, a bomba d\'água, a ventoinha e os marcadores de temperatura do painel.'],
  ['Sistema elétrico, faróis e lâmpadas', 'Faça um check-up na bateria, no motor de partida, no alternador e em todas as lâmpadas e fusíveis. Você pode pegar serra com neblina ou estrada em dia de chuva. E não deixe o rádio ligado muito tempo com o motor desligado.'],
  ['Pneus', 'Mantenha os pneus calibrados, incluindo o estepe. Faça rodízio periódico para equilibrar os desgastes irregulares.'],
];
const dicas = [
  { slug: 'oleo', f: 'dica-oleo', t: 'Cuidados com o óleo', p: ['Verifique o nível do óleo semanalmente.', 'Com o motor frio, de preferência pela manhã antes da primeira partida e com o veículo em piso nivelado, retire a vareta do óleo, limpe com um pano ou papel, insira e retire de novo.', 'O nível deve estar entre as marcas "Min" e "Max" gravadas na vareta. Se precisar, complete com o óleo da mesma marca ou o recomendado pelo fabricante.', 'A maioria dos fabricantes considera normal um consumo de até 1 litro de óleo a cada 1.000 quilômetros rodados.'] },
  { slug: 'arrefecimento', f: 'dica-arrefecimento', t: 'Líquido de arrefecimento', p: ['Verifique o nível da água. Com o motor frio e o veículo nivelado, a água deve estar entre as marcas "Min" e "Máx" do reservatório.', 'Se for preciso completar a água com muita frequência, leve o veículo para um diagnóstico.', 'Não confie essas tarefas só ao frentista do posto. Muitos motores têm problemas sérios por excesso de óleo ou proporções erradas de aditivo de radiador, colocados sem critério nos postos.'] },
  { slug: 'correia', f: 'dica-correia', t: 'Correia dentada', p: ['Usada em muitos motores, a correia sincronizadora (ou dentada) fica protegida por uma capa e não dá para examiná-la fora da oficina.', 'Ela mantém o sincronismo entre a árvore de manivelas e o eixo comando de válvulas. Se quebrar, causa sérios danos às válvulas e até aos pistões.', 'A troca ocorre, em média, a cada 50.000 km, dependendo do modelo. Consulte o manual do proprietário ou a concessionária sobre o intervalo e siga à risca.'] },
  { slug: 'velas', f: 'dica-velas', t: 'Velas, bateria e pneus', p: ['Velas de ignição: troque conforme a recomendação do fabricante, em geral a cada 20.000 a 30.000 km. Em carros turbo de fábrica com aumento de pressão (com chip), verifique a cada 10.000 km. Velas gastas causam falhas no motor, mais consumo e mais poluentes.', 'Bateria: as seladas não precisam de água, mas não estão livres de manutenção. Veja se os cabos estão limpos e bem presos aos polos, e teste todo ano o sistema de carga e partida: bateria, alternador e motor de partida.', 'Pneus e rodas: calibre pelo menos a cada 15 dias ou antes de viajar, com os pneus frios. Use as medidas do manual. O limite legal dos sulcos é 1,6 mm (marca TWI). Faça rodízio, alinhamento e balanceamento a cada 10.000 km, e não esqueça de calibrar o estepe.'] },
  { slug: 'cambio', f: 'dica-cambio', t: 'Câmbio automático', p: ['A manutenção do câmbio automático pede troca de óleo e filtro nos intervalos do fabricante. Procure um serviço especializado.', 'P (Park): trava o câmbio e impede o carro de se mover. R (Reverse): marcha à ré. N (Neutral): ponto morto. D (Drive): as marchas trocam sozinhas conforme a rotação e a velocidade.', 'Os números 3, 2 e 1 fazem as trocas só até a marcha indicada. Servem em descidas, para poupar os freios, ou em subidas, quando se está rebocando um trailer.'] },
];
const fotos = {
  elevador: ['Carro no elevador para revisão', 532, 282], oleo: ['Troca de óleo', 442, 282], motor: ['Mecânico no motor', 456, 282], embaixo: ['Inspeção por baixo do veículo', 492, 282],
};
const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'a-mitcar', nome: 'A Mit Car' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'revisao', nome: 'Revisão de viagem' }, { slug: 'dicas', nome: 'Dicas' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Ficha de revisão', b: 'Linha cromada' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Anton&family=Wix+Madefor+Text:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Mohave:wght@500;600;700&family=Ubuntu+Sans:wght@400;500;600;700&display=swap',
};
const img = (n, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(fotos[n][0])}" width="${fotos[n][1]}" height="${fotos[n][2]}" loading="lazy" decoding="async"${extra}>`;
const foto = (n, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(fotos[n][0])}"${cls ? ` class="${cls}"` : ''}>${img(n)}</a>`;
const ext = 'target="_blank" rel="noopener"';
const cor = { a: '#d7141d', b: '#141518' };
const tel = telHref(E.fone);
const mapsQ = encodeURIComponent('Av. Duque de Caxias, 3995, Londrina PR, 86026-070');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Mecânica multimarcas em Londrina` : `${titulo} | Mit Car Londrina`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const btnTel = (txt = E.fone, cls = 'btn') => `<a class="${cls}" href="${tel}">${ic('tel')}${txt}</a>`;
const btnMapa = (cls = 'btn btn-linha') => `<a class="${cls}" href="${mapsLink}" ${ext}>${ic('pin')}Como chegar</a>`;
const horario = ['Segunda a sexta', '8h às 12h e 13h30 às 18h'];
const pagamento = 'Dinheiro e cartões Visa, Visa Electron, Mastercard e Redeshop';

const contatoLista = () => `<ul class="contato-lista">
  <li>${ic('tel')}<div><strong>Telefone</strong><a href="${tel}">${E.fone}</a></div></li>
  <li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li>
  <li>${ic('relogio')}<div><strong>Horário</strong><span>${horario[0]}, ${horario[1]}</span></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}, ${E.cidade}</span><span>CEP ${E.cep}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Mit Car na Av. Duque de Caxias, 3995" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=16&output=embed"></iframe>`;
const form = () => `<form class="form" data-email="${E.email}" data-assunto="Orçamento pelo site">
  <div class="form-duas"><label>Seu nome*<input name="nome" required autocomplete="name"></label><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Veículo (marca e modelo)<input name="veiculo"></label><label>Assunto<select name="assunto"><option>Orçamento</option><option>Revisão de viagem</option><option>Alinhamento e balanceamento</option><option>Freios e suspensão</option><option>Câmbio</option><option>Outro</option></select></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${ic('mail')}Enviar pedido</button>
  <p class="form-nota">Abre o seu e-mail com o pedido pronto para a Mit Car. Se preferir, ligue: <a href="${tel}">${E.fone}</a>.</p>
</form>`;

function topo(v, slug) {
  const logo = v === 'a' ? 'logo' : 'logo-claro';
  return `<header class="topo">
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Mit Car Centro Automotivo, página inicial"><img src="/assets/${logo}.webp" alt="Mit Car Centro Automotivo" width="932" height="372"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    <a class="btn btn-topo" href="${tel}">${ic('tel')}<span>${E.fone}</span></a>
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
    <div class="rod-marca"><img src="/assets/logo-claro.webp" alt="Mit Car Centro Automotivo" width="932" height="372" loading="lazy"><p>Oficina multimarcas no centro de Londrina. Mecânica e assistência de automóveis, com garantia dos serviços.</p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${tel}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.cidade}, CEP ${E.cep}</span></li>
      <li>${ic('relogio')}<span>Seg. a sex., 8h–12h e 13h30–18h</span></li>
    </ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Mit Car Centro Automotivo. Todos os direitos reservados.</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua tel-flutua" href="${tel}" aria-label="Ligar para a Mit Car">${ic('tel')}</a>
</body>
</html>
`;
}

const listaServ = (cls = '') => `<ol class="lista-serv ${cls}">${servicos.map((s, i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><div><h3>${s[0]}</h3>${s[1] ? `<p>${s[1]}</p>` : ''}</div></li>`).join('')}</ol>`;
const listaViagem = (cls = '') => `<ol class="lista-viagem ${cls}">${viagem.map((x, i) => `<li><span class="n">${i + 1}</span><span class="t">${x}</span></li>`).join('')}</ol>`;
const faixaFotos = () => `<div class="faixa-fotos">${Object.keys(fotos).map(f => `<figure>${foto(f)}</figure>`).join('')}</div>`;
const selos = () => `<ul class="selos"><li>${ic('escudo')}<span><b>Centro automotivo autorizado Mobil</b>Troca de óleo com produtos da marca</span></li><li>${ic('check')}<span><b>Empresa certificada ASE</b>Mão de obra especializada</span></li><li>${ic('relogio')}<span><b>${horario[0]}</b>${horario[1]}</span></li></ul>`;

function comum(v, pag, cab) {
  pag['a-mitcar'] = head(v, 'a-mitcar', 'A Mit Car', 'Oficina multimarcas no centro de Londrina, com equipe treinada, novas instalações e garantia dos serviços. Centro automotivo autorizado Mobil.') + topo(v, 'a-mitcar') + cab('A Mit Car', 'Oficina multimarcas no centro de Londrina') + `
<div class="in">
<section class="sobre-pag"><div class="sobre-txt">${sobre.map(p => `<p>${p}</p>`).join('')}</div><aside class="sobre-lado"><p class="k">O que fazemos</p><p>${atuacao}</p></aside></section>
${faixaFotos()}
<section class="selos-pag">${selos()}</section>
<section class="pagto"><h2>Formas de pagamento</h2><p>${pagamento}.</p></section>
<p class="cta-linha">${btnTel('Ligar para a Mit Car')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Serviços', 'Alinhamento computadorizado e a laser, balanceamento, freios, suspensão, embreagem, câmbio manual e automático, troca de óleo, filtros, correia e escapamento. Peças para venda.') + topo(v, 'servicos') + cab('Serviços', 'Do alinhamento ao câmbio, com garantia') + `
<div class="in">
<p class="intro">${atuacao}</p>
${listaServ('lista-serv-pag')}
<section class="produtos"><header class="tit"><p class="k">Peças e produtos</p><h2>Produtos de alta qualidade, com um bom atendimento</h2><p>Oferecer produtos de alta qualidade aliados a um excelente atendimento é um dos nossos principais objetivos. Trabalhamos com:</p></header><ul class="prod-lista">${produtos.map(p => `<li>${p}</li>`).join('')}</ul></section>
<p class="cta-linha">${btnTel('Pedir orçamento')}<a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Escrever para a Mit Car</a></p>
</div>
` + rodape(v);
  pag.revisao = head(v, 'revisao', 'Revisão de viagem', 'Antes de pegar a estrada: os 15 itens da revisão preventiva da Mit Car, de fluido de freio a bateria, e o que conferir em freios, suspensão, correia e radiador.') + topo(v, 'revisao') + cab('Revisão de viagem', 'Antes de pegar a estrada, 15 itens') + `
<div class="in">
<p class="intro">${viagemTxt}</p>
${listaViagem('lista-viagem-pag')}
<section class="viagem-det"><header class="tit"><p class="k">Viagens e dia a dia</p><h2>O que vale conferir</h2></header><div class="det-grade">${viagemDet.map(d => `<article class="sobe"><h3>${d[0]}</h3><p>${d[1]}</p></article>`).join('')}</div></section>
<p class="cta-linha">${btnTel('Agendar a revisão')}${btnMapa()}</p>
</div>
` + rodape(v);
  pag.dicas = head(v, 'dicas', 'Dicas', 'Dicas de manutenção da Mit Car: nível do óleo, líquido de arrefecimento, correia dentada, velas, bateria, pneus e câmbio automático.') + topo(v, 'dicas') + cab('Dicas', 'Manutenção que você mesmo confere') + `
<div class="in">
<nav class="dicas-indice" aria-label="Dicas">${dicas.map((d, i) => `<a href="#${d.slug}"><span class="n">${i + 1}</span>${d.t}</a>`).join('')}</nav>
<div class="dicas-pag">${dicas.map((d, i) => `<article class="dica sobe" id="${d.slug}"><img src="/assets/img/${d.f}.webp" alt="" width="580" height="240" loading="lazy" decoding="async"><div><p class="k">Dica ${i + 1}</p><h2>${d.t}</h2>${d.p.map(p => `<p>${p}</p>`).join('')}</div></article>`).join('')}</div>
</div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Mit Car Centro Automotivo: ${E.rua}, Londrina/PR. Telefone ${E.fone}. Segunda a sexta, 8h às 12h e 13h30 às 18h.`) + topo(v, 'contato') + cab('Contato', 'Visite-nos e faça um orçamento sem compromisso') + `
<div class="in"><section class="contato-pag"><div>${contatoLista()}<p class="bts">${btnTel('Ligar agora')}${btnMapa()}</p><p class="pagto-mini"><b>Pagamento:</b> ${pagamento}.</p></div><div class="contato-form"><h2>Peça um orçamento</h2>${form()}</div></section>
${mapaFrame}</div>
` + rodape(v);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t) => `<section class="tit-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div><div class="risco" aria-hidden="true"></div></section>`;
  pag.index = head(v, 'index', '', 'Oficina multimarcas no centro de Londrina: mecânica, alinhamento, freios, suspensão, câmbio e troca de óleo. Av. Duque de Caxias, 3995. (43) 3324-9836.') + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Oficina multimarcas · Londrina e região</p><h1>Mecânica e assistência de automóveis no centro de Londrina</h1><p>Equipe treinada, mão de obra especializada e produtos das melhores marcas. Revisão de motor, troca de óleo, limpeza de ar-condicionado e revisão em geral, com garantia dos serviços.</p>
  <p class="bts">${btnTel()}${btnMapa()}</p>
  <ul class="hero-a-dados"><li>${ic('pin')}<span>${E.rua}</span></li><li>${ic('relogio')}<span>Seg. a sex., 8h–12h e 13h30–18h</span></li></ul></div>
  <aside class="ficha-a" aria-label="Revisão de viagem"><div class="ficha-cab"><span>Revisão de viagem</span><b>15 itens</b></div>${listaViagem()}<a class="link-seta" href="${link(v, 'revisao')}">O que conferir antes da estrada ${ic('seta')}</a></aside>
</div></section>
<section class="fotos-a"><div class="in">${faixaFotos()}</div></section>
<section class="in servs-a"><header class="tit"><p class="k">Serviços</p><h2>Do alinhamento ao câmbio automático</h2><p>Manutenção preventiva e corretiva, com ou sem reparações mecânicas, injeção eletrônica, vidraçaria e capotaria.</p></header>${listaServ()}<a class="link-seta" href="${link(v, 'servicos')}">Serviços e peças ${ic('seta')}</a></section>
<section class="selos-a"><div class="in">${selos()}</div></section>
<section class="in dicas-a"><header class="tit"><p class="k">Dicas</p><h2>Manutenção que você mesmo confere</h2></header><ol class="dicas-a-lista">${dicas.map((d, i) => `<li><a href="${link(v, 'dicas')}#${d.slug}"><span class="n">${i + 1}</span><b>${d.t}</b>${ic('seta')}</a></li>`).join('')}</ol></section>
<section class="cta-a"><div class="in cta-a-in"><div><h2>Visite-nos e faça um orçamento sem compromisso</h2><p>${E.rua}, ${E.cidade}. ${pagamento}.</p></div><p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'contato')}">${ic('mail')}Pedir por e-mail</a></p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const linha = `<svg class="linha-carro" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="cromo" x1="0" x2="1"><stop offset="0" stop-color="#5d6268"/><stop offset=".5" stop-color="#eef1f4"/><stop offset="1" stop-color="#6c7177"/></linearGradient></defs><path d="M0 120 C 180 110 300 98 380 80 C 470 34 640 20 760 40 C 860 58 930 86 1000 104 C 1080 116 1150 132 1200 158" fill="none" stroke="url(#cromo)" stroke-width="5"/></svg>`;
  const cab = (k, t) => `<section class="cab-b"><div class="in"><p class="k">${k}</p><h1>${t}</h1></div>${linha}</section>`;
  pag.index = head(v, 'index', '', 'Mit Car Centro Automotivo, oficina multimarcas no centro de Londrina. Alinhamento, freios, suspensão, câmbio, troca de óleo e revisão de viagem. (43) 3324-9836.') + topo(v, 'index') + `
<section class="hero-b"><div class="in hero-b-in">
  <p class="k">Centro automotivo · Av. Duque de Caxias, 3995 · Londrina</p>
  <h1>Seu carro revisado por quem é <em>referência</em> em Londrina</h1>
  <p class="hero-b-p">Eficiência, mão de obra especializada e produtos das melhores marcas. Novas e modernas instalações no centro da cidade.</p>
  <p class="bts">${btnTel()}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></p>
</div>${linha}</section>
<section class="painel-b"><div class="in"><ul>
  <li><b>15</b><span>serviços na oficina</span></li>
  <li><b>21</b><span>linhas de peças</span></li>
  <li><b>15</b><span>itens na revisão de viagem</span></li>
</ul></div></section>
<section class="in servs-b"><header class="tit"><p class="k">Serviços</p><h2>O que a oficina faz</h2></header>${listaServ('lista-serv-b')}</section>
<section class="viagem-b"><div class="in viagem-b-in"><div><p class="k">Viagens e dia a dia</p><h2>Antes de pegar a estrada</h2><p>${viagemTxt}</p><a class="link-seta" href="${link(v, 'revisao')}">O que conferir ${ic('seta')}</a></div>${listaViagem('lista-viagem-b')}</div></section>
<section class="in fotos-b">${faixaFotos()}</section>
<section class="selos-b"><div class="in">${selos()}</div></section>
<section class="in dicas-b"><header class="tit"><p class="k">Dicas</p><h2>Manutenção que você mesmo confere</h2></header><div class="dicas-b-grade">${dicas.map((d, i) => `<details class="sobe"${i === 0 ? ' open' : ''}><summary><span class="n">0${i + 1}</span>${d.t}</summary><p>${d.p[0]}</p><a class="link-seta" href="${link(v, 'dicas')}#${d.slug}">Ler a dica ${ic('seta')}</a></details>`).join('')}</div></section>
<section class="cta-b"><div class="in cta-b-in"><div><h2>Visite-nos e faça um orçamento sem compromisso</h2><p>${horario[0]}, ${horario[1]}.</p></div><p class="bts">${btnTel()}${btnMapa()}</p></div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, '');
const comumCss = fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8') + '\n' + comumCss);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: E.curto, artigo: 'da', url: E.url, lang: 'pt', cor: '#d7141d', fundo: '#141518', claro: '#f3f4f5',
  fonteTitulo: "'Anton',Impact,sans-serif", fonteTexto: "'Wix Madefor Text',system-ui,sans-serif", googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, no vermelho do logo com o azul do site atual. Abre com a ficha de revisão de viagem da própria Mit Car, os 15 itens numerados, ao lado do convite para a oficina.', pontos: ['Revisão de viagem logo na entrada', '15 serviços numerados, sem enfeite', 'Telefone, endereço e horário sempre à vista'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Escura como o topo do site atual, com a linha cromada do carro do logo cortando as seções. Números grandes, serviços em lista e dicas que abrem na própria página.', pontos: ['Linha cromada do logo como fio condutor', 'Painel com números da oficina', 'Dicas que abrem com um toque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
