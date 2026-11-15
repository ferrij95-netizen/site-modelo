// Gemata do Brasil (São Leopoldo/RS): máquinas para acabamento de couros, vidros (Rollmac), laminados sintéticos e têxtil, com tecnologia da matriz italiana Gemata (Trissino/VI). Gera public/{a,b}/ e a página de escolha.
// node clientes/gematadobrasil/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs gematadobrasil https://www.gematadobrasil.com.br/)
// Textos do site atual + catálogos e company profile da matriz (gemata.it). Fotos: site atual (Wix) e catálogos PDF da matriz.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const ext = 'target="_blank" rel="noopener"';
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Gemata do Brasil', legal: 'Gemata do Brasil', url: 'https://gematadobrasil.overtus.com.br/', antigo: 'https://www.gematadobrasil.com.br/',
  fone: '(51) 3589-5177', foneHref: 'tel:+555135895177', email: 'info@gematadobrasil.com.br',
  end: 'Av. São Borja, 3075, Rio Branco', cidade: 'São Leopoldo/RS · CEP 93032-525',
  insta: 'https://www.instagram.com/gematadobrasil/', face: 'https://www.facebook.com/GemataDoBrasil/',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;

const setores = [
  { id: 'couros', n: 'Couros', m: 'Gemata', t: 'Máquinas a rolo, linhas de spray e automação para o acabamento em curtumes.', f: 'l-couros', alt: 'Couro com acabamento vermelho' },
  { id: 'vidros', n: 'Vidros', m: 'Rollmac', t: 'Pintura de vidros planos a rolo, pela divisão Rollmac.', f: 'l-vidros', alt: 'Vidro plano passando pelo rolo de pintura' },
  { id: 'sinteticos', n: 'Sintéticos', m: 'Gemata', t: 'Aplicação a rolo para laminados sintéticos e materiais revestidos.', f: 'l-sinteticos', alt: 'Laminado sintético entrando na máquina' },
  { id: 'textil', n: 'Têxtil', m: 'Gemata', t: 'Acabamento de tecidos técnicos com controle de deposição.', f: 'l-textil', alt: 'Rolo de máquina de acabamento têxtil' },
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'maquinas', n: 'Máquinas' },
  { slug: 'servicos', n: 'Assistência' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Rolo vermelho', b: 'Tecnologia italiana' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Gemata do Brasil | Máquinas para acabamento de couros, vidros, sintéticos e têxtil' : `${titulo} | Gemata do Brasil`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#e30613' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, w = 170) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Gemata do Brasil" width="${w}" height="${Math.round(w * 202 / 775)}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Tecnologia italiana fabricada no Brasil desde 2004</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Gemata do Brasil, página inicial">${logo(v === 'b', 170)}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Fale com um técnico</a>
    <button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">
`;
}
function rodape(v) {
  return `</main>
<footer class="rodape">
  <div class="in rod-grade">
    <div class="rod-marca">${logo(true, 200)}
      <p>Máquinas para acabamento de couros, vidros, laminados sintéticos e têxteis. Unidade brasileira do grupo italiano Gemata.</p>
      <p class="rod-redes"><a href="${E.insta}" ${ext} aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" ${ext} aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Máquinas</h3><ul>${setores.map(s => `<li><a href="${link(v, 'maquinas')}#${s.id}">${s.n}</a></li>`).join('')}</ul></div>
    <div><h3>Atendimento</h3><ul class="rod-dados">
      <li>${ic('tel')}<a href="${E.foneHref}">${E.fone}</a></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">A Gemata do Brasil</a></li>
      <li><a href="${link(v, 'servicos')}">Assistência e peças</a></li>
      <li><a href="${link(v, 'contato')}">Contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Grupo Gemata World · Gemata · Rollmac</span></div>
</footer>
</body>
</html>`;
}

const gradeSetores = v => `<ul class="setores">${setores.map(s => `<li class="sobe"><a href="${link(v, 'maquinas')}#${s.id}"><span class="st-img">${img(s.f, s.alt)}</span><span class="st-txt"><small>${s.m}</small><b>${s.n}</b><span>${s.t}</span></span></a></li>`).join('')}</ul>`;

const economia = () => `<ul class="economia">
  <li><b>60%</b><span>menos produto químico</span></li>
  <li><b>75%</b><span>menos água</span></li>
  <li><b>80%</b><span>menos energia elétrica</span></li>
  <li><b>95%</b><span>menos ar comprimido</span></li>
  <li><b>100%</b><span>do custo de descarte de lodo</span></li>
</ul><p class="nota">Economia de até, no acabamento a rolo em comparação com processos por spray, onde a aplicação permite. Dados do grupo Gemata.</p>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Vamos olhar o seu processo de acabamento?</h2>
  <p>Conte o material, a largura de trabalho e o volume. Um técnico da Gemata do Brasil responde com a configuração certa.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir uma proposta</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const maquinas = [
  { id: 'couros', marca: 'Gemata · Couros', n: 'LaGemata', sub: 'A nova geração da máquina de aplicação a rolo.', fotos: [['lagemata', 'Máquina a rolo LaGemata'], ['lagemata-hmi', 'Nova IHM da LaGemata'], ['lagemata-mec', 'Conjunto de rolos da LaGemata'], ['lagemata-g', 'LaGemata vista lateral']],
    txt: 'O rolo é a tecnologia que fez da Gemata referência mundial. A LaGemata foi redesenhada para deixar cada ajuste mais simples, cada troca mais rápida e cada resultado mais repetível: do abastecimento do couro à troca de artigo, do setup à manutenção.',
    itens: ['Sistema de entrada do couro redesenhado, mais suave e controlado', 'Nova IHM com tela maior e navegação mais clara', 'Arquitetura compacta, com acesso mais fácil para manutenção', 'Para diferentes tipos de couro e materiais sintéticos'] },
  { id: 'soffio', marca: 'Gemata · Couros', n: 'Soffio', sub: 'Linha de acabamento por spray com estabilidade e dados de processo.', fotos: [['soffio', 'Linha de acabamento por spray Soffio'], ['soffio-cabine', 'Cabine de spray Soffio em inox'], ['soffio-pistolas', 'Pistolas de pintura dentro da cabine'], ['todesco', 'Pistola de pintura Todesco']],
    txt: 'Cada componente da Soffio existe para reduzir o consumo de químicos, baixar emissões e manter a qualidade do acabamento constante. O projeto modular encaixa em linhas já existentes.',
    dl: [['1.800 a 3.800 mm', 'larguras de trabalho'], ['Vapor, gás ou IR', 'túneis de secagem'], ['Inox AISI 304', 'estrutura da cabine'], ['Cortina d’água', 'estática, sem recirculação']] },
  { id: 'veloce', marca: 'Gemata · Couros', n: 'Veloce', sub: 'Troca rápida de receita de acabamento nas máquinas a rolo.', fotos: [['veloce', 'Sistema de troca rápida Veloce'], ['veloce-det', 'Detalhe do sistema Veloce'], ['rolo-mao', 'Ajuste no rolo gravado']],
    txt: 'Solução patenteada que tira as operações manuais da troca de receita, incluindo a limpeza do rolo gravado. Recupera o produto, lava rolo, bandejas e lâmina com água em alta pressão, seca e carrega o novo produto.',
    dl: [['20 → 4 min', 'tempo de troca'], ['-80%', 'de parada a cada troca'], ['0', 'operações manuais'], ['Retrofit', 'em máquinas existentes']],
    nota: 'Opcional para GREENSTAR, GREENSTARs e MEGASTAR, em todas as larguras, com qualquer rolo gravado.' },
  { id: 'automacao', marca: 'Gemata · Couros', n: 'Automação', sub: 'Do couro que entra ao couro empilhado.', fotos: [['estoque', 'Estoque de rolos e peças'], ['embalagem', 'Máquinas embaladas para envio'], ['medicao', 'Controle de qualidade na fábrica']],
    txt: 'O acabamento não depende de uma máquina só, e sim da continuidade entre as etapas. Transportadores, máquinas de classificação, empilhadeiras e sistemas de manuseio completam o processo, com menos trabalho manual e mais rastreabilidade.',
    itens: ['Transportadores e sistemas de manuseio', 'Classificação e empilhamento', 'Linhas completas e plantas sob medida com o grupo Gemata World'] },
  { id: 'vidros', marca: 'Rollmac · Vidros', n: 'Vidros', sub: 'Pintura de vidros planos a rolo.', fotos: [['l-vidros', 'Vidro plano na máquina de pintura'], ['vidros-amostras', 'Amostras de vidro pintado'], ['rolo-vermelho', 'Rolo de aplicação']],
    txt: 'No Brasil, a Gemata lidera a pintura de vidros planos com a marca Rollmac: aplicação a rolo com espessura controlada, para vidros decorativos e técnicos.',
    itens: ['Aplicação uniforme em vidro plano', 'Cores e acabamentos para vidro decorativo', 'Projeto e assistência pela equipe de São Leopoldo'] },
  { id: 'sinteticos', marca: 'Gemata · Sintéticos', n: 'Laminados sintéticos', sub: 'O rolo Gemata aplicado a materiais revestidos.', fotos: [['l-sinteticos', 'Laminado sintético entrando na máquina'], ['rolo-vermelho', 'Rolo de aplicação em laminado']],
    txt: 'A mesma precisão de deposição do couro, configurada para laminados sintéticos: menos desperdício de produto, acabamento uniforme e troca de artigo rápida.',
    itens: ['Configuração conforme o material e a largura', 'Controle de deposição e repetibilidade', 'Integração com secagem e manuseio'] },
  { id: 'textil', marca: 'Gemata · Têxtil', n: 'Têxtil', sub: 'Acabamento para tecidos técnicos.', fotos: [['l-textil', 'Máquina de acabamento têxtil'], ['tecnico', 'Técnico ajustando a máquina']],
    txt: 'Para o setor têxtil, a Gemata leva a aplicação a rolo para tecidos técnicos, com o controle de processo das máquinas de couro.',
    itens: ['Aplicação a rolo em tecido', 'Ajuste fino de rolo e lâmina', 'Projeto conforme o processo do cliente'] },
];

const blocoMaq = m => `<article class="maq" id="${m.id}">
  <div class="maq-foto sobe">${foto(m.fotos[0][0], m.fotos[0][1])}${m.fotos.length > 1 ? `<div class="maq-mini">${m.fotos.slice(1).map(f => foto(f[0], f[1])).join('')}</div>` : ''}</div>
  <div class="sobe"><p class="maq-marca">${m.marca}</p><h2>${m.n}</h2><p class="maq-sub">${m.sub}</p><p>${m.txt}</p>
  ${m.dl ? `<dl>${m.dl.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
  ${m.itens ? `<ul class="checks">${m.itens.map(i => `<li>${ic('check')}${i}</li>`).join('')}</ul>` : ''}
  ${m.nota ? `<p class="nota">${m.nota}</p>` : ''}
  <p class="acoes"><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Proposta ' + m.n)}">${ic('mail')} Pedir proposta</a></p></div>
</article>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Gemata do Brasil: fundada em 2004 em São Leopoldo/RS para levar a tecnologia italiana da Gemata aos clientes do Brasil e da América do Sul.') + topo(v, 'empresa') +
  cabPag('A Gemata do Brasil', 'Tecnologia italiana fabricada no Brasil para couros, vidros, sintéticos e têxteis.', ['medicao', 'Controle dimensional na fábrica Gemata']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 2004')}<h2>A matriz é italiana. A fábrica e o atendimento estão aqui.</h2>
  <p>A Gemata do Brasil foi fundada em junho de 2004 para fornecer tecnologia italiana aos clientes brasileiros e sul-americanos. A matriz fica no Vêneto, na Itália, há mais de 40 anos, e é considerada líder mundial em máquinas para acabamento de couros.</p>
  <p>Em São Leopoldo, a Gemata do Brasil fabrica máquinas para couros, vidros, laminados sintéticos e têxtil. No Brasil, lidera o mercado de acabamento de couros com a marca Gemata e de pintura de vidros planos com a marca Rollmac.</p></div>
  <figure class="sobe">${img('tecnico', 'Técnico Gemata montando máquina')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Linha do tempo')}<h2>De oficina mecânica a grupo industrial</h2></div>
  <ol class="tempo">
    <li class="sobe"><b>1979</b><span>Nasce a Gemata em Trissino (VI), no polo curtidor de Vicenza.</span></li>
    <li class="sobe"><b>1999</b><span>Certificação de qualidade ISO 9002.</span></li>
    <li class="sobe"><b>2001</b><span>Certificação ambiental ISO 14001.</span></li>
    <li class="sobe"><b>2003</b><span>Certificação ISO 9001:2000.</span></li>
    <li class="sobe"><b>2004</b><span>Fundação da Gemata do Brasil, em São Leopoldo/RS.</span></li>
  </ol>
</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Como trabalhamos')}<h2>Projeto italiano, assistência perto</h2></div>
  <ul class="pilares">
    <li class="sobe">${ic('engrenagem')}<h3>Pesquisa e desenvolvimento</h3><p>As máquinas são projetadas na matriz por projetistas eletrônicos e mecânicos especializados.</p></li>
    <li class="sobe">${ic('fabrica')}<h3>Fabricação no Brasil</h3><p>Produção em São Leopoldo para atender Brasil e América do Sul.</p></li>
    <li class="sobe">${ic('chave')}<h3>Pós-venda</h3><p>Técnicos treinados, prontos para intervir em pouco tempo.</p></li>
    <li class="sobe">${ic('gota')}<h3>Menos recurso por peça</h3><p>Menos químico, água, energia e lodo, com mais controle do processo.</p></li>
  </ul>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Eficiência')}<h2 class="sobe">O rolo gasta menos</h2>${economia()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Na fábrica')}<h2>Precisão em cada peça</h2></div>
  <div class="galeria">${[['rolo-mao', 'Ajuste no rolo gravado'], ['embalagem', 'Máquina embalada para envio'], ['assistencia', 'Técnico Gemata'], ['lagemata-alta', 'LaGemata']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function maquinasPag(v) {
  return head(v, 'maquinas', 'Máquinas', 'Máquinas Gemata do Brasil: LaGemata (aplicação a rolo), Soffio (spray), Veloce (troca rápida de receita), automação, Rollmac para vidros, sintéticos e têxtil.') + topo(v, 'maquinas') +
  cabPag('Máquinas', 'Aplicação a rolo, spray, troca rápida e automação para acabamento de couros, vidros, sintéticos e têxteis.') + `
<section class="sec"><div class="in">
  <nav class="indice" aria-label="Máquinas">${maquinas.map(m => `<a href="#${m.id}">${m.n}</a>`).join('')}</nav>
  ${maquinas.map(blocoMaq).join('')}
</div></section>` + chamada(v) + rodape(v);
}

function servicos(v) {
  return head(v, 'servicos', 'Assistência', 'Assistência técnica Gemata do Brasil: técnicos especializados e treinados, peças, retrofit e acompanhamento do processo de acabamento.') + topo(v, 'servicos') +
  cabPag('Assistência técnica', 'O pós-venda é a marca da Gemata do Brasil.', ['van', 'Veículo de assistência técnica Gemata']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Pós-venda')}<h2>Técnicos treinados, prontos para intervir em pouco tempo</h2>
  <p>A assistência é feita pelos técnicos especializados da Gemata do Brasil, sempre disponíveis. Eles conhecem a máquina de dentro, porque são os mesmos que montam e entregam.</p>
  <ul class="checks"><li>${ic('check')}Instalação, partida e treinamento da equipe</li><li>${ic('check')}Manutenção preventiva e corretiva</li><li>${ic('check')}Peças de reposição e rolos gravados</li><li>${ic('check')}Retrofit, como o Veloce em máquinas existentes</li><li>${ic('check')}Ajuste de processo para reduzir consumo de químicos</li></ul>
  <p class="acoes"><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Assistência técnica')}">${ic('mail')} Chamar a assistência</a><a class="btn btn-linha" href="${E.foneHref}">${ic('tel')} ${E.fone}</a></p></div>
  <figure class="sobe">${img('assistencia', 'Técnico da Gemata em atendimento')}</figure>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('lagemata-hmi', 'Painel de controle da LaGemata')}</figure>
  <div class="sobe">${sobre('Processo')}<h2>Dados de processo para repetir o resultado</h2>
  <p>As máquinas novas trazem IHM com receitas salvas, e as linhas Soffio entregam dados de processo verificáveis. Com isso, o técnico ajusta à distância o que antes dependia de tentativa e erro.</p></div>
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Av. São Borja, 3075, Rio Branco, São Leopoldo - RS');
  return head(v, 'contato', 'Contato', 'Gemata do Brasil: (51) 3589-5177, info@gematadobrasil.com.br. Av. São Borja, 3075, Rio Branco, São Leopoldo/RS.') + topo(v, 'contato') +
  cabPag('Contato', 'Proposta, assistência ou visita à fábrica em São Leopoldo.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span>Telefone <a href="${E.foneHref}">${E.fone}</a></span></li>
    <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    <li>${ic('insta')}<a href="${E.insta}" ${ext}>@gematadobrasil</a></li></ul>
    <iframe class="mapa" title="Mapa da Gemata do Brasil em São Leopoldo/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <div class="form-duas"><label>Telefone<input name="fone" type="tel" autocomplete="tel"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
    <div class="form-duas"><label>Setor<select name="setor"><option>Couros</option><option>Vidros</option><option>Sintéticos</option><option>Têxtil</option><option>Outro</option></select></label><label>Assunto<select name="assunto"><option>Proposta de máquina</option><option>Assistência técnica</option><option>Peças</option><option>Outro</option></select></label></div>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Gemata do Brasil: máquinas para acabamento de couros, vidros, sintéticos e têxtil. Tecnologia italiana fabricada em São Leopoldo/RS desde 2004.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Acabamento industrial · São Leopoldo/RS')}
      <h1>O melhor em máquinas para <em>acabamento.</em></h1>
      <p class="ha-sub">Couros, vidros, laminados sintéticos e têxteis. Projeto da matriz italiana, fabricação e assistência no Brasil desde 2004.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'maquinas')}">Ver as máquinas</a><a class="btn btn-linha" href="${link(v, 'contato')}">Pedir proposta</a></p>
    </div>
    <div class="ha-prod">${imgTopo('lagemata', 'Máquina a rolo LaGemata')}<span class="ha-tag"><b>LaGemata</b>A nova geração da aplicação a rolo</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Tecnologia italiana desde 1979</span><span>${ic('check')}Fábrica em São Leopoldo desde 2004</span><span>${ic('check')}Líder em acabamento de couros no Brasil</span><span>${ic('check')}Assistência com técnicos próprios</span></div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Linhas de máquinas')}<h2>Quatro materiais, a mesma precisão</h2></div>
  ${gradeSetores(v)}
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('veloce', 'Sistema de troca rápida Veloce')}</figure>
  <div class="sobe">${sobre('Veloce')}<h2>Troca de receita de 20 para 4 minutos</h2>
  <p>A solução patenteada da Gemata limpa o rolo gravado, as bandejas e a lâmina sozinha. O curtume recupera horas de produção a cada troca.</p>
  <a class="link-seta" href="${link(v, 'maquinas')}#veloce">Conheça o Veloce ${ic('seta')}</a></div>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Por que rolo')}<h2 class="sobe">Menos químico, menos água, menos lodo</h2>${economia()}</div></section>
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('A empresa')}<h2>A matriz é italiana. A fábrica e o atendimento estão aqui.</h2>
  <p>A Gemata nasceu em 1979 no polo curtidor de Vicenza e é líder mundial em acabamento de couros. A Gemata do Brasil fabrica em São Leopoldo e atende o Brasil e a América do Sul.</p>
  <div class="marcas"><span>Gemata</span><span>Rollmac</span><span>Gemata World</span></div>
  <p class="acoes"><a class="link-seta" href="${link(v, 'empresa')}">Conheça a Gemata do Brasil ${ic('seta')}</a></p></div>
  <figure class="sobe">${img('tecnico', 'Técnico Gemata montando máquina')}</figure>
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Gemata do Brasil: tecnologia italiana para acabamento de couros, vidros, sintéticos e têxtil, com fábrica e assistência em São Leopoldo/RS.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('rolo-vermelho', 'Rolo de aplicação de uma máquina Gemata')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Gemata do Brasil')}
    <h1>Tecnologia italiana, <em>fabricada no Brasil.</em></h1>
    <p class="hb-sub">Máquinas para acabamento de couros, vidros, laminados sintéticos e têxteis, com técnicos próprios para instalar e manter.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'maquinas')}">Conhecer as máquinas</a><a class="btn btn-linha" href="${link(v, 'servicos')}">Assistência técnica</a></p>
    <div class="hb-selo"><div><b>1979</b><span>Gemata, Itália</span></div><div><b>2004</b><span>Gemata do Brasil</span></div><div><b>4</b><span>setores atendidos</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('O que você acaba?')}<h2>Escolha o material</h2></div>
  ${gradeSetores(v)}
</div></section>
<section class="lado">
  <figure>${img('soffio-cabine', 'Cabine de spray Soffio em inox')}</figure>
  <div class="sobe">${sobre('Soffio')}<h2>Spray com estabilidade e dados de processo</h2>
  <p>Cabine em inox AISI 304, larguras de 1.800 a 3.800 mm e secagem a vapor, gás ou infravermelho. Menos químico, menos emissão, acabamento constante.</p>
  <p><a class="link-seta" href="${link(v, 'maquinas')}#soffio">Ver a Soffio ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Eficiência')}<h2 class="sobe">O rolo Gemata gasta menos</h2>${economia()}</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('assistencia', 'Técnico da Gemata em atendimento')}</figure>
  <div class="sobe">${sobre('Pós-venda')}<h2>Quem monta é quem atende</h2>
  <p>A Gemata do Brasil é conhecida pela excelência no pós-venda. Técnicos especializados e treinados, sempre disponíveis e prontos para intervir em pouco tempo.</p>
  <a class="link-seta" href="${link(v, 'servicos')}">Assistência e peças ${ic('seta')}</a></div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), maquinas: maquinasPag(v), servicos: servicos(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Gemata do Brasil', artigo: 'da', url: E.url, lang: 'pt', cor: '#e30613', fundo: '#1f2124', claro: '#f3f3f2',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, com a LaGemata no topo, faixa vermelha e as quatro linhas com foto.', pontos: ['Sete máquinas e linhas com fotos e dados', 'Economia do rolo em números', 'Assistência em página própria'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Grafite, abre com o rolo vermelho em tela cheia e destaca a Soffio e o pós-venda.', pontos: ['Foto de fábrica em tela cheia', 'Soffio e pós-venda na home', 'Mesmo catálogo de máquinas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
