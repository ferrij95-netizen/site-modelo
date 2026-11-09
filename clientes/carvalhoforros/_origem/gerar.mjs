// Carvalho Forros e Divisórias (Jardim Atlântico, Goiânia/GO). Gera public/{a,b}/ e a página de escolha.
// node clientes/carvalhoforros/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs carvalhoforros https://carvalhoforros.com.br/)
// Textos, fotos, avaliações e contatos tirados do site atual (carvalhoforros.com.br e a biblioteca de mídia do WordPress dele).
// Logo: vetorizado do logo.png do site atual (vetorizar-logo.py).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Carvalho Forros e Divisórias', curto: 'Carvalho', url: 'https://carvalhoforros.overtus.com.br/', antigo: 'https://carvalhoforros.com.br/',
  wa: '5562994569077', waTxt: '(62) 99456-9077', fixo: '(62) 3988-6565', waFixo: '556239886565',
  rua: 'Rua das Rocas, Qd. 120 Lt. 02', bairro: 'Jardim Atlântico', cidade: 'Goiânia – GO', cnpj: '18.445.807/0001-01',
  insta: 'https://www.instagram.com/carvalhoforrosedivisorias/', face: 'https://www.facebook.com/CARVALHOFORROSEDIVISORIAS',
  horas: [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 12h']],
};
const msgOrc = 'Olá! Vim pelo site e gostaria de solicitar um orçamento.';
const wa = (m = msgOrc) => waHref(E.wa, m);
const ext = 'target="_blank" rel="noopener"';
const mapsQ = encodeURIComponent('Carvalho Forros e Divisórias, Rua das Rocas, Jardim Atlântico, Goiânia GO');
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQ}`;

const sobre1 = 'Na Carvalho Forros, entregamos mais do que acabamento: entregamos agilidade. Com 13 anos de experiência e estoque próprio, garantimos a pronta entrega de soluções em Teto Vinílico, PVC e Divisórias para ambientes residenciais, comerciais e industriais.';
const sobre2 = 'Nosso compromisso é transformar seu projeto em realidade com excelência técnica e materiais premium que a concorrência não tem à pronta entrega.';

const servicos = [
  { id: 'teto-vinilico', t: 'Teto vinílico', f: 'teto-vinilico', f2: 'teto-vinilico-cozinha', w: 720, h: 1280, selo: 'Topo de linha',
    d: 'Acabamento sofisticado e moderno, ideal para quem busca elegância sem abrir mão da resistência. O teto vinílico é o topo de linha entre os forros em PVC.',
    l: ['Visual premium com aparência elegante', '9 opções de cores e texturas', 'Material resistente e duradouro', 'Fácil de manter e limpar', 'Ideal para ambientes residenciais e corporativos'] },
  { id: 'divisoria-naval', t: 'Divisória naval – Eucatex', f: 'divisoria-naval', f2: 'divisoria-corredor', w: 1200, h: 1600,
    d: 'Versáteis e resistentes, são ideais para escritórios, comércios e ambientes corporativos que exigem praticidade e bom acabamento.',
    l: ['Montagem e desmontagem simples', 'Estrutura leve', 'Reaproveitáveis e duráveis', 'Diversas opções de cores, portas e vidros', 'Permitem passagem de fiação elétrica e de dados'] },
  { id: 'forro-mineral', t: 'Forro mineral', f: 'forro-mineral', f2: 'forro-mineral-2', w: 600, h: 400,
    d: 'Elegante e funcional, oferece excelente desempenho acústico e térmico, ideal para ambientes corporativos e comerciais que exigem conforto e sofisticação.',
    l: ['Ótimo isolamento térmico e acústico', 'Leve e resistente, sem trincas ou fissuras', 'Alta refletância de luz', 'Dispensa pintura e acabamentos adicionais', 'Sistema de montagem fácil, desmontável e reaproveitável', 'Permite fácil acesso à manutenção'] },
  { id: 'forro-pvc', t: 'Forro PVC', f: 'forro-pvc', f2: 'forro-pvc-cozinha', w: 600, h: 400,
    d: 'Solução prática e econômica para ambientes residenciais e comerciais.',
    l: ['Instalação rápida e limpa', 'Dispensa pintura', 'Alta resistência à umidade e fungos', 'Fácil limpeza e longa durabilidade', 'Ótimo custo-benefício'] },
  { id: 'drywall', t: 'Parede de gesso acartonado / Drywall', curto: 'Drywall', f: 'parede-3d', f2: 'salao-sanca', w: 1240, h: 600,
    d: 'Versátil, leve e de montagem rápida, o drywall substitui a alvenaria com excelente acabamento e ótimo desempenho térmico e acústico. Ideal para obras residenciais, corporativas e industriais.',
    l: ['Montagem rápida e limpa', 'Isolamento acústico e térmico', 'Aceita pintura, textura e papel de parede', 'Material leve, sem sobrecarregar lajes e estruturas', 'Pode incluir camadas extras para isolamento térmico e acústico'] },
  { id: 'forro-isopor', t: 'Forro isopor', f: 'forro-isopor', f2: 'gesso-acartonado', w: 600, h: 400,
    d: 'Leve, funcional e de excelente custo-benefício, o forro de isopor é ideal para ambientes corporativos e industriais que precisam de conforto térmico e fácil manutenção.',
    l: ['Montagem rápida e limpa', 'Permite fácil acesso à manutenção', 'Resistente a bactérias, fungos e insetos', 'Material não propaga chamas', 'Leve, sem sobrecarga na estrutura', 'Ótimo isolamento térmico e acústico'] },
];
const tam = { 'teto-vinilico': [720, 1280], 'teto-vinilico-cozinha': [1280, 720], 'divisoria-naval': [1200, 1600], 'divisoria-corredor': [1240, 600], 'forro-mineral': [600, 400], 'forro-mineral-2': [600, 400], 'forro-pvc': [600, 400], 'forro-pvc-cozinha': [600, 400], 'parede-3d': [1240, 600], 'salao-sanca': [600, 400], 'forro-isopor': [600, 400], 'gesso-acartonado': [1240, 600], fachada: [1600, 1200], 'fachada-antiga': [770, 470], 'divisoria-drywall': [1240, 600] };
const motivos = [
  ['Materiais de alta qualidade e com preço de fábrica', 'Estoque próprio e compra direta: você paga menos pelo mesmo padrão.'],
  ['Equipe especializada e atendimento humanizado', 'Quem atende entende de forro e divisória e acompanha a obra.'],
  ['Instalação rápida, limpa e segura', 'Montagem a seco, sem quebra-quebra e com o ambiente entregue limpo.'],
  ['Pagamento facilitado', 'Condições para caber no seu orçamento. Pergunte na hora de fechar.'],
  ['Garantia e suporte pós-venda', 'Depois da instalação, continuamos à disposição.'],
];
const passos = [
  ['Pedido de orçamento', 'Mande pelo WhatsApp o ambiente, a medida aproximada e o material que você quer.'],
  ['Proposta', 'Indicamos a solução certa para o espaço e passamos o valor com material e instalação.'],
  ['Pronta entrega', 'Com estoque próprio, o material sai daqui. Sem esperar fornecedor.'],
  ['Instalação', 'Equipe especializada monta rápido, de forma limpa e segura.'],
  ['Garantia', 'Garantia e suporte pós-venda para o que foi instalado.'],
];
const avaliacoes = [
  ['Kamylla Sthefany', 'uma semana atrás', 'Atendimento nota 10 da Rayanne! Super simpática e eficiente. Agradeço também à equipe que veio arrumar o forro da academia: serviço rápido e muito bem feito. Parabéns a todos pelo ótimo trabalho! Indico de olhos fechados, qualidade e confiança tem que ser na Carvalho Forros.'],
  ['Jamilly Shelry', 'uma semana atrás', 'Parabéns à funcionária Rayanne pelo atendimento de excelência e à equipe de manutenção pelo ótimo trabalho na reforma do forro da academia. É muito bom ver profissionais tão comprometidos com a qualidade e o bem-estar dos alunos!'],
  ['Alessandro Tavares', '6 dias atrás', 'Foram super profissionais, atendimento perfeito e com muita atenção e principalmente, com todos os detalhes... Indico a todos.'],
  ['JR Hospitalar Financeiro', '6 dias atrás', 'Excelente atendimento! A equipe foi muito atenciosa e nos ajudou a encontrar exatamente o que nós precisávamos.'],
  ['jessica sousa', 'um ano atrás', 'Amei a experiência que tive com essa empresa, fui tratada super bem por todos os funcionários, serviço de qualidade, e o preço o melhor da cidade, estou muito satisfeita e gostaria de indicar pra vocês, podem confiar, vocês não vão se arrepender.'],
  ['Thairiely Souza', '11 meses atrás', 'Sou cliente a muito tempo, super satisfeita em todos os serviços. Sempre pontuais e uma equipe maravilhosa!'],
  ['Luana Ferreira de Melo', '11 meses atrás', 'Ótimo atendimento, funcionários super atenciosos e serviço de qualidade. Super indico!'],
];
const obras = {
  forros: { nome: 'Forros', n: 12, leg: ['Forro PVC em cozinha', 'Forro com placas e iluminação embutida', 'Forro em refeitório', 'Forro em área comercial', 'Forro em espaço de convivência', 'Forro em auditório', 'Forro em salão', 'Forro aramado com trilhos de luz', 'Forro aramado em loja', 'Forro PVC com pendentes', 'Forro PVC em sala', 'Forro com luminárias embutidas'] },
  divisorias: { nome: 'Divisórias', n: 12, leg: ['Divisórias em galpão', 'Divisória com visores', 'Divisória cega', 'Divisória com vidro', 'Sala em divisória com vidro', 'Corredor de salas em divisória', 'Divisória em área de produção', 'Divisória com vidro inteiriço', 'Divisória com portas e vidros', 'Recepção em divisória', 'Sala fechada em divisória', 'Corredor com divisória e persianas'] },
  gesso: { nome: 'Drywall e gesso', n: 10, leg: ['Nichos e prateleiras em drywall', 'Nichos em drywall', 'Estrutura de forro em gesso', 'Sanca iluminada em salão de festas', 'Sanca com iluminação', 'Parede de drywall com textura', 'Sanca e fechamento em drywall', 'Ambiente com drywall', 'Painel e parede em drywall', 'Sala de reunião com painel'] },
};
const listaObras = Object.entries(obras).flatMap(([c, o]) => Array.from({ length: o.n }, (_, i) => ({ c, f: `obras/${c}-${String(i + 1).padStart(2, '0')}`, leg: o.leg[i] })));
const clientes = [['sesi', 'SESI'], ['senai', 'SENAI'], ['mrv', 'MRV Engenharia'], ['tramontina', 'Tramontina'], ['pagmenos', 'Pague Menos'], ['friboi', 'Friboi'], ['cicopal', 'Grupo Cicopal'], ['opis', 'Opis'], ['creme-mel', 'Creme Mel'], ['belma', 'Belma']];

const nav = [{ slug: 'index', nome: 'Início' }, { slug: 'servicos', nome: 'Serviços' }, { slug: 'obras', nome: 'Obras' }, { slug: 'empresa', nome: 'A Carvalho' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Pronta entrega', b: 'Mais que acabamento' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Encode+Sans+Semi+Expanded:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap';
const cor = { a: '#5b122d', b: '#5b122d' };

const img = (n, alt, extra = '') => { const [w, h] = tam[n] || [900, 600]; return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`; };
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const btnWa = (txt = 'Solicitar orçamento', m = msgOrc, cls = 'btn btn-wa') => `<a class="${cls}" href="${wa(m)}" ${ext}>${icWa()}${txt}</a>`;
const estrelas = n => `<span class="estrelas" aria-label="${n} estrelas">${'★'.repeat(n)}</span>`;
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? `${E.nome} | Forros, teto vinílico, divisórias e drywall em Goiânia` : `${titulo} | ${E.nome}`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cor[v] });
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const faixas = '<span class="faixas" aria-hidden="true"><i></i><i></i><i></i></span>';

function topo(v, slug) {
  const barra = `<div class="topo-barra"><div class="in"><span>${ic('pin')}${E.bairro}, Goiânia</span><span class="tb-dir"><span>${ic('relogio')}Seg a sex 8h às 18h · Sáb 8h às 12h</span><a href="${telHref(E.fixo)}">${ic('tel')}${E.fixo}</a></span></div></div>`;
  return `<header class="topo">${v === 'a' ? barra : ''}
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Carvalho Forros e Divisórias, página inicial"><img src="/assets/${v === 'b' && slug === 'index' ? 'logo-branco' : 'logo'}.svg" alt="Carvalho Forros e Divisórias" width="302" height="75"></a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, slug)}</ul></nav>
    ${btnWa('Orçamento', msgOrc, 'btn btn-wa btn-topo')}
    ${btnMenu}
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-cta">
    <p class="rod-frase">Entregamos mais do que acabamento: <strong>entregamos agilidade.</strong></p>
    ${btnWa('Solicitar orçamento agora')}
  </div>
  <div class="in rod-grade">
    <div class="rod-marca"><img src="/assets/logo-branco.svg" alt="Carvalho Forros e Divisórias" width="302" height="75" loading="lazy"><p>${E.nome}<br>CNPJ ${E.cnpj}</p>
      <p class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Páginas</h3><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Serviços</h3><ul>${servicos.map(s => `<li><a href="${link(v, 'servicos')}#${s.id}">${s.curto || s.t}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${icWa()}<a href="${wa()}" ${ext}>${E.waTxt}</a></li>
      <li>${ic('tel')}<a href="${waHref(E.waFixo, msgOrc)}" ${ext}>${E.fixo}</a></li>
      <li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li>
      <li>${ic('relogio')}<span>Seg a sex: 8h às 18h<br>Sábado: 8h às 12h</span></li>
    </ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.nome}. Todos os direitos reservados.</span></div>
</footer>
<a class="wa-flutua" href="${wa()}" ${ext} aria-label="Falar no WhatsApp">${icWa()}</a>
<script src="/assets/carvalho.js" defer></script>
</body>
</html>`;
}

// ---------- blocos comuns ----------
const listaCheck = l => `<ul class="lista-check">${l.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const formulario = () => `<form class="form" data-wa="Olá! Vim pelo site e gostaria de um orçamento.">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone / WhatsApp<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <div class="form-duas"><label>Serviço<select name="servico">${servicos.map(s => `<option>${s.t}</option>`).join('')}<option>Mais de um / não sei ainda</option></select></label><label>Metragem aproximada<input name="metragem" placeholder="Ex.: 40 m²"></label></div>
  <div class="form-duas"><label>Tipo de ambiente<select name="ambiente"><option>Residencial</option><option>Comercial / escritório</option><option>Industrial</option></select></label><label>Bairro / cidade<input name="local" placeholder="Ex.: Setor Bueno, Goiânia"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4" placeholder="Conte um pouco do ambiente e do prazo"></textarea></label>
  <button class="btn btn-wa" type="submit">${icWa()}Enviar pelo WhatsApp</button>
  <p class="form-nota">O botão abre o WhatsApp da Carvalho com a mensagem pronta. Se preferir, ligue: <a href="${telHref(E.fixo)}">${E.fixo}</a>.</p>
</form>`;
const contatoLista = () => `<ul class="contato-lista">
  <li>${icWa()}<div><strong>WhatsApp</strong><a href="${wa()}" ${ext}>${E.waTxt}</a><a href="${waHref(E.waFixo, msgOrc)}" ${ext}>${E.fixo}</a></div></li>
  <li>${ic('pin')}<div><strong>Endereço</strong><span>${E.rua}</span><span>${E.bairro}, ${E.cidade}</span><a href="${mapsLink}" ${ext}>Abrir no Google Maps</a></div></li>
  <li>${ic('relogio')}<div><strong>Atendimento</strong>${E.horas.map(([d, h]) => `<span>${d}: ${h}</span>`).join('')}</div></li>
  <li>${ic('insta')}<div><strong>Redes</strong><a href="${E.insta}" ${ext}>@carvalhoforrosedivisorias</a><a href="${E.face}" ${ext}>Facebook</a></div></li>
</ul>`;
const mapaFrame = `<iframe class="mapa" title="Mapa da Carvalho Forros no Jardim Atlântico, Goiânia" loading="lazy" src="https://maps.google.com/maps?q=${mapsQ}&z=15&output=embed"></iframe>`;
const logosClientes = () => `<ul class="logos">${clientes.map(([f, n]) => `<li><img src="/assets/clientes/${f}.webp" alt="${esc(n)}" width="240" height="240" loading="lazy"></li>`).join('')}</ul>`;
const filtroObras = () => `<div class="filtro" role="group" aria-label="Filtrar obras"><button class="ativo" data-filtro="todas">Todas</button>${Object.entries(obras).map(([c, o]) => `<button data-filtro="${c}">${o.nome}</button>`).join('')}</div>
<div class="galeria">${listaObras.map(o => `<a href="/assets/img/${o.f}.webp" data-foto="${esc(o.leg)}" data-cat="${o.c}">${img(o.f, o.leg)}</a>`).join('')}</div>`;
const servicoDetalhe = (s, i, v) => `<section class="sv-det${i % 2 ? ' inv' : ''}" id="${s.id}">
  <div class="in sv-det-in">
    <div class="sv-det-fotos">${foto(s.f, s.t, 'f1')}${foto(s.f2, `${s.t}: outra obra`, 'f2')}</div>
    <div class="sv-det-txt sobe">
      <p class="sobrelinha">${String(i + 1).padStart(2, '0')} · ${s.selo || 'Serviço'}</p>
      <h2>${s.t}</h2>
      <p class="lead">${s.d}</p>
      ${listaCheck(s.l)}
      ${btnWa(`Orçamento de ${(s.curto || s.t).replace(/^./, c => c.toLowerCase())}`, `Olá! Vim pelo site e gostaria de um orçamento de ${s.t}.`)}
    </div>
  </div>
</section>`;
const descServ = 'Teto vinílico, divisória naval Eucatex, forro mineral, forro PVC, drywall e forro isopor com instalação própria em Goiânia.';

// ================= VERSÃO A: Pronta entrega =================
function paginasA() {
  const v = 'a';
  const P = {};
  P.index = head(v, 'index', '', `Forros e divisórias em Goiânia com estoque próprio e pronta entrega. ${descServ}`) + topo(v, 'index') + `
<section class="hero">
  <div class="in hero-in">
    <div class="hero-txt">
      <p class="sobrelinha">${faixas}Forros e divisórias em Goiânia</p>
      <h1>Soluções completas em forros e divisórias.</h1>
      <p class="lead">Especialistas em teto vinílico, PVC, divisórias e drywall com o melhor custo-benefício da região.</p>
      <div class="hero-acoes">${btnWa('Solicitar orçamento agora')}<a class="btn btn-linha" href="${link(v, 'servicos')}">Ver serviços</a></div>
      <ul class="hero-fatos"><li><strong>13 anos</strong><span>de experiência</span></li><li><strong>Estoque próprio</strong><span>pronta entrega</span></li><li><strong>Garantia</strong><span>e suporte pós-venda</span></li></ul>
    </div>
    <div class="hero-fotos">
      <figure class="hf1">${img('teto-vinilico', 'Teto vinílico amadeirado instalado em sala com TV', ' loading="eager" fetchpriority="high"').replace(' loading="lazy"', '')}</figure>
      <figure class="hf2">${img('teto-vinilico-cozinha', 'Teto vinílico amadeirado em cozinha')}</figure>
      <figure class="hf3">${img('divisoria-naval', 'Divisória naval Eucatex amadeirada')}</figure>
      <p class="hero-selo"><strong>Teto vinílico</strong>9 opções de cores e texturas</p>
    </div>
  </div>
</section>

<section class="sec servicos-a" id="servicos">
  <div class="in">
    <div class="titulo-sec"><p class="sobrelinha">${faixas}Nossos serviços</p><h2>Seis soluções, uma equipe só</h2><p>Do forro à parede, a Carvalho fornece o material do próprio estoque e faz a instalação.</p></div>
    <div class="abas" data-abas>
      <div class="abas-lista" role="tablist" aria-label="Serviços">${servicos.map((s, i) => `<button role="tab" id="aba-${s.id}" aria-controls="pn-${s.id}" aria-selected="${i === 0}"${i ? ' tabindex="-1"' : ''}><span class="n">${String(i + 1).padStart(2, '0')}</span>${s.curto || s.t}${ic('seta')}</button>`).join('')}</div>
      ${servicos.map((s, i) => `<div class="aba-painel" role="tabpanel" id="pn-${s.id}" aria-labelledby="aba-${s.id}"${i ? ' data-oculto' : ''}>
        <figure class="aba-foto">${img(s.f, s.t)}</figure>
        <div class="aba-txt"><h3>${s.t}</h3><p>${s.d}</p>${listaCheck(s.l)}<a class="link-seta" href="${link(v, 'servicos')}#${s.id}">Detalhes e fotos ${ic('seta')}</a></div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec motivos-a">
  <div class="in">
    <div class="titulo-sec claro"><p class="sobrelinha">${faixas}Por que a Carvalho</p><h2>Motivos para escolher a Carvalho</h2></div>
    <ol class="motivos-lista">${motivos.map(([t, d], i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec passos-a">
  <div class="in">
    <div class="titulo-sec"><p class="sobrelinha">${faixas}Como funciona</p><h2>Do orçamento ao forro instalado</h2></div>
    <ol class="trilho">${passos.map(([t, d], i) => `<li class="sobe"><span class="bola">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec avaliacoes-a">
  <div class="in av-in">
    <div class="av-resumo">
      <p class="sobrelinha">${faixas}Avaliações no Google</p>
      <h2>Avaliações reais de quem confia na Carvalho</h2>
      <p class="nota">5,0 ${estrelas(5)}</p>
      <p>Comentários publicados por clientes no perfil da Carvalho Forros no Google.</p>
    </div>
    <div class="av-colunas">${avaliacoes.slice(0, 6).map(([n, q, t]) => `<blockquote class="sobe"><p>${t}</p><footer>${estrelas(5)}<cite>${n}</cite><span>${q}</span></footer></blockquote>`).join('')}</div>
  </div>
</section>

<section class="sec sobre-a">
  <div class="in sobre-in">
    <figure class="sobre-foto">${foto('fachada', 'Fachada da loja da Carvalho Forros no Jardim Atlântico')}</figure>
    <div class="sobre-txt">
      <p class="sobrelinha">${faixas}Sobre nós</p>
      <h2>Entregamos mais do que acabamento: entregamos agilidade</h2>
      <p>${sobre1}</p><p>${sobre2}</p>
      <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Carvalho ${ic('seta')}</a>
    </div>
  </div>
</section>

<section class="sec obras-a">
  <div class="in">
    <div class="titulo-sec lado"><div><p class="sobrelinha">${faixas}Obras realizadas</p><h2>Forros, divisórias e drywall entregues</h2></div><a class="btn btn-linha" href="${link(v, 'obras')}">Ver todas as obras</a></div>
    <div class="mosaico">${['forros-02', 'divisorias-05', 'gesso-04', 'divisorias-01', 'forros-08', 'gesso-01'].map(n => { const o = listaObras.find(x => x.f === `obras/${n}`); return foto(o.f, o.leg); }).join('')}</div>
  </div>
</section>

<section class="sec clientes-a">
  <div class="in"><p class="logos-tit">Empresas que já contaram com a Carvalho</p>${logosClientes()}</div>
</section>
` + rodape(v);

  P.servicos = head(v, 'servicos', 'Serviços', `Serviços da Carvalho Forros em Goiânia: ${descServ}`) + topo(v, 'servicos') + `
<section class="cab-pg"><div class="in"><p class="sobrelinha">${faixas}Serviços</p><h1>Forros, divisórias e drywall com instalação própria</h1><p class="lead">Seis soluções para ambientes residenciais, comerciais e industriais, com material do nosso estoque e pronta entrega.</p>
<nav class="ancora" aria-label="Serviços">${servicos.map(s => `<a href="#${s.id}">${s.curto || s.t}</a>`).join('')}</nav></div></section>
${servicos.map((s, i) => servicoDetalhe(s, i, v)).join('\n')}
` + rodape(v);

  P.obras = head(v, 'obras', 'Obras realizadas', 'Fotos de obras da Carvalho Forros: forros PVC e modulares, divisórias com vidro e drywall em Goiânia.') + topo(v, 'obras') + `
<section class="cab-pg"><div class="in"><p class="sobrelinha">${faixas}Obras</p><h1>Obras realizadas</h1><p class="lead">Escritórios, galpões, lojas, salões e residências. Toque em uma foto para ampliar.</p></div></section>
<section class="sec obras-pg"><div class="in">${filtroObras()}</div></section>
<section class="sec faixa-cta"><div class="in"><h2>Quer um resultado assim no seu espaço?</h2>${btnWa('Pedir orçamento')}</div></section>
` + rodape(v);

  P.empresa = head(v, 'empresa', 'A Carvalho', 'Há 13 anos em Goiânia, a Carvalho Forros e Divisórias tem estoque próprio e equipe de instalação.') + topo(v, 'empresa') + `
<section class="cab-pg"><div class="in"><p class="sobrelinha">${faixas}A Carvalho</p><h1>Entregamos mais do que acabamento: entregamos agilidade</h1></div></section>
<section class="sec sobre-a"><div class="in sobre-in">
  <figure class="sobre-foto">${foto('fachada', 'Fachada da loja da Carvalho Forros no Jardim Atlântico')}</figure>
  <div class="sobre-txt"><p>${sobre1}</p><p>${sobre2}</p>
  <ul class="numeros"><li><strong>13</strong><span>anos de experiência</span></li><li><strong>6</strong><span>soluções em forros e paredes</span></li><li><strong>5,0</strong><span>nota no Google</span></li></ul></div>
</div></section>
<section class="sec motivos-a"><div class="in"><div class="titulo-sec claro"><p class="sobrelinha">${faixas}Por que a Carvalho</p><h2>Motivos para escolher a Carvalho</h2></div>
<ol class="motivos-lista">${motivos.map(([t, d], i) => `<li class="sobe"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol></div></section>
<section class="sec loja-a"><div class="in loja-in">
  <div><p class="sobrelinha">${faixas}Nossa loja</p><h2>Rua das Rocas, Jardim Atlântico</h2><p>Venha conhecer os materiais de perto: ${E.rua}, ${E.bairro}, ${E.cidade}. Atendimento de segunda a sexta das 8h às 18h e aos sábados das 8h às 12h.</p><a class="link-seta" href="${mapsLink}" ${ext}>Como chegar ${ic('seta')}</a></div>
  ${foto('fachada-antiga', 'Fachada da loja da Carvalho Forros')}
</div></section>
<section class="sec avaliacoes-a"><div class="in av-in">
  <div class="av-resumo"><p class="sobrelinha">${faixas}Avaliações no Google</p><h2>O que dizem os clientes</h2><p class="nota">5,0 ${estrelas(5)}</p></div>
  <div class="av-colunas">${avaliacoes.map(([n, q, t]) => `<blockquote class="sobe"><p>${t}</p><footer>${estrelas(5)}<cite>${n}</cite><span>${q}</span></footer></blockquote>`).join('')}</div>
</div></section>
<section class="sec clientes-a"><div class="in"><p class="logos-tit">Empresas que já contaram com a Carvalho</p>${logosClientes()}</div></section>
` + rodape(v);

  P.contato = head(v, 'contato', 'Contato e orçamento', `Peça seu orçamento de forro ou divisória: WhatsApp ${E.waTxt}. ${E.rua}, ${E.bairro}, Goiânia.`) + topo(v, 'contato') + `
<section class="cab-pg"><div class="in"><p class="sobrelinha">${faixas}Contato</p><h1>Solicite agora seu orçamento</h1><p class="lead">Preencha e envie pelo WhatsApp. Respondemos em horário comercial.</p></div></section>
<section class="sec contato-pg"><div class="in contato-in">
  <div class="contato-form">${formulario()}</div>
  <aside class="contato-lado">${contatoLista()}</aside>
</div></section>
<section class="sec mapa-sec"><div class="in">${mapaFrame}</div></section>
` + rodape(v);
  return P;
}

// ================= VERSÃO B: Mais que acabamento =================
function paginasB() {
  const v = 'b';
  const P = {};
  const motivosBarras = () => `<ol class="barras">${motivos.map(([t, d], i) => `<li class="sobe b${i}"><div class="barra"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3></div><p>${d}</p></li>`).join('')}</ol>`;
  P.index = head(v, 'index', '', `Forros e divisórias em Goiânia com estoque próprio e pronta entrega. ${descServ}`) + topo(v, 'index') + `
<section class="hero-b">
  <div class="hero-b-fundo">${img('teto-vinilico-cozinha', 'Teto vinílico amadeirado em cozinha', ' loading="eager" fetchpriority="high"').replace(' loading="lazy"', '')}</div>
  <div class="in hero-b-in">
    <div class="hero-b-txt">
      <p class="sobrelinha">${faixas}13 anos em Goiânia · estoque próprio</p>
      <h1>Soluções completas em forros e divisórias.</h1>
      <p class="lead">Especialistas em teto vinílico, PVC, divisórias e drywall com o melhor custo-benefício da região.</p>
    </div>
    <div class="caixa-orc">
      <h2>Solicite agora seu orçamento</h2>
      <p>Garantia e suporte pós-venda</p>
      ${btnWa('Solicitar orçamento agora')}
      <a class="caixa-tel" href="${telHref(E.fixo)}">${ic('tel')}ou ligue ${E.fixo}</a>
    </div>
  </div>
</section>

<section class="sec servicos-b">
  <div class="in">
    <div class="titulo-sec lado"><div><p class="sobrelinha">${faixas}Nossos serviços</p><h2>O acabamento certo para cada ambiente</h2></div><a class="link-seta" href="${link(v, 'servicos')}">Todos os detalhes ${ic('seta')}</a></div>
    <div class="painel-serv">${servicos.map((s, i) => `<a class="ps ps${i}" href="${link(v, 'servicos')}#${s.id}">
      ${img(s.f, s.t)}
      <span class="ps-txt"><span class="n">${String(i + 1).padStart(2, '0')}</span><strong>${s.t}</strong><span class="ps-d">${s.l.slice(0, 3).join(' · ')}</span></span>
    </a>`).join('')}</div>
  </div>
</section>

<section class="sec motivos-b">
  <div class="in motivos-b-in">
    <div class="motivos-b-cab"><p class="sobrelinha">${faixas}Por que a Carvalho</p><h2>Motivos para escolher a Carvalho</h2><p>As mesmas faixas do nosso logo, uma para cada compromisso.</p></div>
    ${motivosBarras()}
  </div>
</section>

<section class="sec avaliacoes-b">
  <div class="in">
    <div class="titulo-sec centro"><p class="sobrelinha">${faixas}Avaliações no Google · 5,0 ${estrelas(5)}</p><h2>Avaliações reais de quem confia na Carvalho</h2></div>
    <div class="depo" data-carrossel="8000">
      ${avaliacoes.map(([n, q, t]) => `<figure class="slide"><blockquote>“${t}”</blockquote><figcaption><strong>${n}</strong> · ${q}</figcaption></figure>`).join('')}
      <button class="car-ant" data-ant aria-label="Anterior">${ic('seta')}</button><button class="car-prox" data-prox aria-label="Próxima">${ic('seta')}</button>
      <div class="pontos"></div>
    </div>
  </div>
</section>

<section class="sec passos-b">
  <div class="in passos-b-in">
    <div><p class="sobrelinha">${faixas}Como funciona</p><h2>Agilidade do primeiro contato à garantia</h2><p>Com estoque próprio, a sua obra não fica parada esperando material.</p>${btnWa('Começar pelo orçamento')}</div>
    <ol class="degraus">${passos.map(([t, d], i) => `<li class="sobe"><span class="n">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="sobre-b">
  <figure>${foto('fachada', 'Fachada da loja da Carvalho Forros no Jardim Atlântico')}</figure>
  <div class="sobre-b-txt">
    <p class="sobrelinha">${faixas}Sobre nós</p>
    <h2>Na Carvalho Forros, entregamos mais do que acabamento: entregamos agilidade.</h2>
    <p>Com 13 anos de experiência e estoque próprio, garantimos a pronta entrega de soluções em teto vinílico, PVC e divisórias para ambientes residenciais, comerciais e industriais.</p>
    <p>${sobre2}</p>
    <a class="btn btn-claro" href="${link(v, 'empresa')}">Conheça a empresa ${ic('seta')}</a>
  </div>
</section>

<section class="sec obras-b">
  <div class="in">
    <div class="titulo-sec lado"><div><p class="sobrelinha">${faixas}Obras</p><h2>Algumas obras entregues</h2></div><a class="link-seta" href="${link(v, 'obras')}">Ver galeria completa ${ic('seta')}</a></div>
    <div class="fita">${['divisorias-01', 'forros-08', 'gesso-04', 'divisorias-04', 'forros-05', 'gesso-01'].map(n => { const o = listaObras.find(x => x.f === `obras/${n}`); return foto(o.f, o.leg); }).join('')}</div>
    <p class="logos-tit">Empresas que já contaram com a Carvalho</p>${logosClientes()}
  </div>
</section>
` + rodape(v);

  const cab = (tag, h1, lead = '', foto = 'divisoria-corredor') => `<section class="cab-b"><div class="cab-b-fundo">${img(foto, '')}</div><div class="in"><p class="sobrelinha">${faixas}${tag}</p><h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div></section>`;
  P.servicos = head(v, 'servicos', 'Serviços', `Serviços da Carvalho Forros em Goiânia: ${descServ}`) + topo(v, 'servicos') +
    cab('Serviços', 'Forros, divisórias e drywall', 'Material do nosso estoque, instalação pela nossa equipe.', 'forro-mineral') + `
<nav class="ancora-b" aria-label="Serviços"><div class="in">${servicos.map(s => `<a href="#${s.id}">${s.curto || s.t}</a>`).join('')}</div></nav>
${servicos.map((s, i) => servicoDetalhe(s, i, v)).join('\n')}
` + rodape(v);

  P.obras = head(v, 'obras', 'Obras realizadas', 'Fotos de obras da Carvalho Forros: forros PVC e modulares, divisórias com vidro e drywall em Goiânia.') + topo(v, 'obras') +
    cab('Obras', 'Obras realizadas', 'Escritórios, galpões, lojas, salões e residências.', 'divisoria-drywall') + `
<section class="sec obras-pg"><div class="in">${filtroObras()}</div></section>
` + rodape(v);

  P.empresa = head(v, 'empresa', 'A Carvalho', 'Há 13 anos em Goiânia, a Carvalho Forros e Divisórias tem estoque próprio e equipe de instalação.') + topo(v, 'empresa') +
    cab('A Carvalho', 'Mais do que acabamento: agilidade', '', 'gesso-acartonado') + `
<section class="sobre-b">
  <figure>${foto('fachada', 'Fachada da loja da Carvalho Forros no Jardim Atlântico')}</figure>
  <div class="sobre-b-txt"><p>${sobre1}</p><p>${sobre2}</p>
  <ul class="numeros"><li><strong>13</strong><span>anos</span></li><li><strong>6</strong><span>soluções</span></li><li><strong>5,0</strong><span>no Google</span></li></ul></div>
</section>
<section class="sec motivos-b"><div class="in motivos-b-in">
  <div class="motivos-b-cab"><p class="sobrelinha">${faixas}Por que a Carvalho</p><h2>Motivos para escolher a Carvalho</h2></div>${motivosBarras()}
</div></section>
<section class="sec avaliacoes-b2"><div class="in">
  <div class="titulo-sec centro"><p class="sobrelinha">${faixas}Avaliações no Google · 5,0 ${estrelas(5)}</p><h2>O que dizem os clientes</h2></div>
  <div class="av-grade">${avaliacoes.map(([n, q, t]) => `<blockquote class="sobe"><p>${t}</p><footer><strong>${n}</strong> · ${q}</footer></blockquote>`).join('')}</div>
</div></section>
<section class="sec obras-b"><div class="in loja-b">${foto('fachada-antiga', 'Fachada da loja da Carvalho Forros')}<div><p class="sobrelinha">${faixas}Visite a loja</p><h2>${E.rua}</h2><p>${E.bairro}, ${E.cidade}. Segunda a sexta das 8h às 18h, sábado das 8h às 12h.</p><a class="link-seta" href="${mapsLink}" ${ext}>Como chegar ${ic('seta')}</a></div></div>
<div class="in"><p class="logos-tit">Empresas que já contaram com a Carvalho</p>${logosClientes()}</div></section>
` + rodape(v);

  P.contato = head(v, 'contato', 'Contato e orçamento', `Peça seu orçamento de forro ou divisória: WhatsApp ${E.waTxt}. ${E.rua}, ${E.bairro}, Goiânia.`) + topo(v, 'contato') + `
<section class="sec contato-b"><div class="in contato-b-in">
  <div class="contato-b-lado"><p class="sobrelinha">${faixas}Contato</p><h1>Solicite agora seu orçamento</h1><p>Garantia e suporte pós-venda em todas as instalações.</p>${contatoLista()}</div>
  <div class="contato-b-form"><h2>Mande os dados da sua obra</h2>${formulario()}</div>
</div></section>
<section class="mapa-b">${mapaFrame}</section>
` + rodape(v);
  return P;
}

// ---------- gravação ----------
fs.mkdirSync(path.join(pub, 'assets'), { recursive: true });
copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
fs.copyFileSync(path.join(aqui, 'carvalho.js'), path.join(pub, 'assets/carvalho.js'));
escreverVersao(pub, 'a', paginasA());
escreverVersao(pub, 'b', paginasB());
await escolha(pub, {
  nome: 'Carvalho Forros', artigo: 'da', url: E.url, lang: 'pt', cor: '#d48342', fundo: '#3f0b1f', claro: '#f7f1ee',
  fonteTitulo: "'Encode Sans Semi Expanded',system-ui,sans-serif", fonteTexto: "'Manrope',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com o vinho do logo nos detalhes e nas faixas de destaque. Os seis serviços ficam num seletor: um clique mostra foto, descrição e vantagens de cada um.', pontos: ['Fotos reais de teto vinílico e divisória naval na abertura', 'Passo a passo do orçamento à garantia', 'Galeria com 34 obras, filtrada por tipo'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais vinho, como o site atual, com a caixa "Solicite agora seu orçamento" na abertura. Os motivos para escolher a Carvalho viram as faixas do logo.', pontos: ['Painel de fotos dos seis serviços', 'Avaliações do Google em destaque', 'Botão de WhatsApp sempre à mão'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
