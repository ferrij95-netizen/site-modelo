// Telha Certa (Carazinho/RS, filiais em Cunha Porã/SC e Ijuí/RS): telhas metálicas sob medida, termoacústicas, painéis e acessórios. Gera public/{a,b}/ e a página de escolha.
// node clientes/telhacerta/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs telhacerta https://www.telhacerta.com.br/)
// Textos e 15 produtos do site atual (produtos.json). Fotos de produto do site; fábrica e bobinas de quadros do vídeo institucional; casa com telha colonial do banner do site.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));
const P = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Telha Certa', legal: 'Telha Certa', url: 'https://telhacerta.overtus.com.br/', antigo: 'https://www.telhacerta.com.br/',
  fone: '(54) 3330-2850', foneHref: 'tel:+555433302850', email: 'telhacerta@telhacerta.com.br',
  end: 'BR 285, Km 336', cidade: 'Carazinho/RS · CEP 99500-000',
};
const unidades = [
  { n: 'Matriz · Carazinho/RS', f: ['(54) 3330-2850', '(54) 3330-1910'], e: 'telhacerta@telhacerta.com.br', end: 'BR 285, Km 336, Carazinho/RS · CEP 99500-000' },
  { n: 'Filial · Cunha Porã/SC', f: ['(49) 3060-0960'], e: 'telhacerta.sc@telhacerta.com.br', end: 'BR 282, Km 600, Cunha Porã/SC · CEP 89890-000' },
  { n: 'Filial · Ijuí/RS', f: ['(55) 3024-8012'], e: 'telhacerta.ijui@telhacerta.com.br', end: 'Rua Remiro Muraro, 396, Ijuí/RS · CEP 98700-000' },
];
const tel = f => `tel:+55${f.replace(/\D/g, '')}`;
const grupos = [
  { g: 'aco', n: 'Telhas de aço', t: 'Trapezoidais, ondulada, colonial, pré-pintada e multidobras, no comprimento exato da obra.' },
  { g: 'termo', n: 'Termoacústicas e painéis', t: 'Isolamento térmico e acústico com EPS, forro, filme, anticondensante e painel macho-fêmea.' },
  { g: 'comp', n: 'Complementos', t: 'Telha translúcida para iluminação natural, cumeeiras sob medida e chapas lisas.' },
];
const corHex = { 'Branco RAL 9003': '#f4f4f2', 'Azul RAL 5010': '#0e4c96', 'Laranja RAL 2008': '#f3752c', 'Vermelho RAL 3000': '#a72920', 'Bege CSN 047': '#d9c8a0', 'Amarelo CSN 025': '#e7c02a', 'Verde CSN 087': '#2c7a3f', 'Verde RAL 6002': '#2d5a27', 'Cinza RAL 7040': '#9da3a6', 'CSN 027 - Cerâmico': '#9b4a2a', 'CSN 110 - Preto': '#1e1e1e' };

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt, cls = '') => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}"${cls ? ` class="${cls}"` : ''}>${img(n, alt)}</a>`;
const pr = s => P.find(p => p.s === s);

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'Empresa' },
  { slug: 'produtos', n: 'Produtos' },
  { slug: 'orcamento', n: 'Orçamento' },
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Cobertura azul', b: 'Fábrica e obra' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Source+Sans+3:wght@400;600;700&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Telha Certa | Telhas metálicas sob medida em Carazinho/RS' : `${titulo} | Telha Certa`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#1f4fa3' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (h = 52) => `<img class="logo" src="/assets/logo.webp" alt="Telha Certa" width="${Math.round(h * 840 / 440)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">A cobertura para todas as obras</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Telha Certa, página inicial">${logo()}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'orcamento')}">Solicitar orçamento</a>
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
    <div class="rod-marca">${logo(70)}
      <p>Telhas metálicas sob medida desde 2000. Atendimento no Rio Grande do Sul, Santa Catarina e parte do Paraná, com representantes e revendas parceiras.</p></div>
    <div><h3>Produtos</h3><ul>${grupos.map(g => `<li><a href="${link(v, 'produtos')}#${g.g}">${g.n}</a></li>`).join('')}<li><a href="${link(v, 'produtos')}#telha-pre-pintada">Cores da pré-pintada</a></li></ul></div>
    <div><h3>Unidades</h3><ul class="rod-dados">${unidades.map(u => `<li>${ic('pin')}<span>${u.n}<br><a href="${tel(u.f[0])}">${u.f[0]}</a></span></li>`).join('')}</ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">Sobre a Telha Certa</a></li>
      <li><a href="${link(v, 'orcamento')}">Solicitar orçamento</a></li>
      <li><a href="${link(v, 'contato')}">Unidades e contato</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Aço com certificado das usinas ArcelorMittal e CSN</span></div>
</footer>
</body>
</html>`;
}

const numeros = () => `<ul class="economia">
  <li><b>2000</b><span>fundação em Carazinho/RS</span></li>
  <li><b>3.500 m²</b><span>de área de produção</span></li>
  <li><b>3</b><span>unidades: Carazinho, Cunha Porã e Ijuí</span></li>
  <li><b>15</b><span>produtos para cobertura e fechamento</span></li>
  <li><b>11</b><span>cores de telha pré-pintada</span></li>
</ul>`;

const gradeGrupos = v => `<ul class="grupos">${grupos.map(g => { const ps = P.filter(p => p.g === g.g); return `<li class="sobe"><a href="${link(v, 'produtos')}#${g.g}"><span class="gr-img">${ps.slice(0, 3).map(p => img(p.imgs[0], p.n)).join('')}</span><span class="gr-txt"><b>${g.n}</b><span>${g.t}</span><i>${ps.map(p => p.n.replace('Telha ', '')).join(' · ')}</i></span></a></li>`; }).join('')}</ul>`;

const card = (v, p) => `<li class="sobe"><a class="cat-foto" href="${link(v, 'produtos')}#${p.s}">${img(p.imgs[0], p.n)}</a><div class="cat-txt"><h3>${p.n}</h3><p>${esc(p.desc[0].split('. ')[0])}.</p><a class="mais" href="${link(v, 'produtos')}#${p.s}">Ver detalhes ${ic('seta')}</a></div></li>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Telha no comprimento exato da sua obra</h2>
  <p>Mande o modelo, a medida e a cidade. A equipe comercial responde com preço e prazo de entrega.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'orcamento')}">Solicitar orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const materia = () => `<p>As telhas são fabricadas a partir de bobinas de aço com 1,20 m de largura, nas espessuras de 0,43 mm ou 0,50 mm. São transformadas em processo contínuo no comprimento exato da obra (até a medida transportável), no perfil ondulado ou trapezoidal, reduzindo recobrimento e recortes.</p>
  <ul class="checks"><li>${ic('check')}Aço galvalume ou pré-pintado</li><li>${ic('check')}Material nacional com certificado de qualidade das usinas</li><li>${ic('check')}Baixo peso, durabilidade e alta resistência mecânica</li></ul>`;

function empresa(v) {
  return head(v, 'empresa', 'Empresa', 'Telha Certa: fundada em 2000 em Carazinho/RS, uma das maiores fabricantes de telhas metálicas do norte do estado, com 3.500 m² de produção.') + topo(v, 'empresa') +
  cabPag('Sobre a Telha Certa', 'Proteger vidas e patrimônios.', ['fabrica', 'Fábrica da Telha Certa em Carazinho/RS']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 2000')}<h2>Uma das maiores fabricantes de telhas metálicas do norte do RS</h2>
  <p>A Telha Certa foi fundada em abril de 2000 em Carazinho, no entroncamento das BRs 285 e 386. Em 2008 inaugurou a sede própria, num terreno de 8.500 m², produzindo por dia o equivalente a três campos de futebol em metros de telha. Hoje a área de produção soma 3.500 m².</p>
  <p>O acesso facilitado para veículos grandes agiliza o recebimento da matéria-prima, a fabricação e o transporte. As telhas são feitas sob medida, com material nacional certificado pelas usinas e atendimento personalizado.</p>
  <p>Atua no Rio Grande do Sul, em Santa Catarina e em parte do Paraná, com representantes e revendas parceiras.</p></div>
  <figure class="sobe">${img('bobinas', 'Bobinas de aço na linha de produção')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Estrutura para atender obra pequena e obra grande</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Valores')}<h2>A cobertura para todas as obras</h2></div>
  <ul class="pilares">
    <li class="sobe">${ic('usuarios')}<h3>Feita de gente</h3><p>Valorização das pessoas que dedicam os seus dias ao crescimento da empresa.</p></li>
    <li class="sobe">${ic('estrela')}<h3>A gente trabalha para o cliente</h3><p>Atendimento único e personalizado, com telha sob medida para cada obra.</p></li>
    <li class="sobe">${ic('check')}<h3>Senso de time e paixão por resultados</h3><p>Espírito jovem, perfil inovador e empreendedor desde o início.</p></li>
    <li class="sobe">${ic('escudo')}<h3>Ética é inegociável</h3><p>A base das relações com clientes, colegas e comunidade.</p></li>
  </ul>
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('fabrica-frente', 'Sede da Telha Certa')}</figure>
  <div class="sobe">${sobre('Reconhecimento')}<h2>Destaque Gaúcho 2014</h2>
  <p>A Telha Certa recebeu o prêmio Destaque Gaúcho 2014 de Mérito Empresarial do Rio Grande do Sul no ramo de telhas, a primeira empresa do segmento premiada no estado.</p>
  ${materia()}</div>
</div></section>` + chamada(v) + rodape(v);
}

const ficha = (v, p) => {
  const fotos = p.imgs.filter(i => !i.startsWith('perfil-'));
  const perfil = p.imgs.find(i => i.startsWith('perfil-'));
  return `<article class="ficha" id="${p.s}">
  <div class="ficha-fotos sobe">${fotos.map(f => foto(f, p.n)).join('')}${perfil ? foto(perfil, `Perfil ${p.n} com medidas`, 'perfil') : ''}</div>
  <div class="sobe"><p class="maq-marca">${grupos.find(g => g.g === p.g).n}</p><h2>${p.n}</h2>${p.desc.map(d => `<p>${esc(d)}</p>`).join('')}
  ${p.vant.length ? `<h3>Vantagens</h3><ul class="checks">${p.vant.map(x => `<li>${ic('check')}${esc(x)}</li>`).join('')}</ul>` : ''}
  ${p.cores.length ? `<h3>Cores</h3><ul class="cores">${p.cores.map(c => `<li><i style="background:${corHex[c] || '#ccc'}"></i>${esc(c)}</li>`).join('')}</ul><p class="nota">As cores na tela são aproximadas. Peça o catálogo de cores à equipe comercial.</p>` : ''}
  ${p.nota.map(n => `<p class="nota">${esc(n)}</p>`).join('')}
  <p class="acoes"><a class="btn" href="${link(v, 'orcamento')}?produto=${encodeURIComponent(p.n)}">Solicitar orçamento</a></p></div>
</article>`;
};

function produtosPag(v) {
  return head(v, 'produtos', 'Produtos', 'Produtos Telha Certa: telhas trapezoidais TP-25, TP-35 e TP-40, ondulada TC-17, colonial, pré-pintada, multidobras, termoacústica, forro, filme, anticondensante, painel, translúcida, cumeeiras e chapas lisas.') + topo(v, 'produtos') +
  cabPag('Produtos', '15 soluções em aço para cobertura, fechamento e fachada, fabricadas sob medida.') + `
<section class="sec"><div class="in">
  ${grupos.map(g => `<div id="${g.g}"><div class="sec-cab grupo-cab sobe">${sobre(g.n)}<h2>${g.t}</h2></div><ul class="cat">${P.filter(p => p.g === g.g).map(p => card(v, p)).join('')}</ul></div>`).join('')}
</div></section>
<section class="sec sec-cinza"><div class="in duas"><div class="sobe">${sobre('Matéria-prima')}<h2>Bobina de aço, processo contínuo, medida exata</h2>${materia()}</div><figure class="sobe">${img('bobinas', 'Bobinas de aço na fábrica')}</figure></div></section>
<section class="sec"><div class="in">
  ${P.map(p => ficha(v, p)).join('')}
</div></section>` + chamada(v) + rodape(v);
}

function orcamento(v) {
  return head(v, 'orcamento', 'Orçamento', 'Solicite orçamento de telhas metálicas sob medida à Telha Certa: modelo, medidas, quantidade e cidade da obra.') + topo(v, 'orcamento') +
  cabPag('Solicitar orçamento', 'Quanto mais detalhes da obra, mais rápido sai o preço.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe">${sobre('Como funciona')}<h2>Do pedido à entrega</h2>
  <ul class="checks"><li>${ic('check')}Informe o modelo, o comprimento das peças e a quantidade, ou a área do telhado</li><li>${ic('check')}A equipe comercial confere e manda o orçamento</li><li>${ic('check')}As telhas são produzidas no comprimento exato da obra</li><li>${ic('check')}Entrega a partir de Carazinho, Cunha Porã ou Ijuí</li></ul>
  <figure>${img('casa-colonial', 'Casa coberta com Telha Colonial')}</figure></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Orçamento pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label></div>
    <div class="form-duas"><label>E-mail<input name="email" type="email" autocomplete="email"></label><label>Cidade/UF da obra *<input name="cidade" required autocomplete="address-level2"></label></div>
    <div class="form-duas"><label>Produto *<select name="produto" data-produto>${P.map(p => `<option>${p.n}</option>`).join('')}</select></label><label>Acabamento<select name="acabamento"><option>Galvalume natural</option><option>Pré-pintada</option><option>Não sei</option></select></label></div>
    <label>Medidas e quantidade *<textarea name="medidas" rows="4" required placeholder="Ex.: 20 peças de 6,40 m, ou telhado de 10 x 12 m com duas águas"></textarea></label>
    <label>Observações<textarea name="mensagem" rows="3"></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar pedido de orçamento</button>
    <p class="form-nota">Abre o seu e-mail com o pedido pronto para ${E.email}.</p>
  </form></div>
</div></section>
<script>(()=>{const p=new URLSearchParams(location.search).get('produto');const s=document.querySelector('[data-produto]');if(p&&s)[...s.options].forEach(o=>{if(o.text===p)o.selected=true})})()</script>` + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Telha Certa, BR 285, Km 336, Carazinho - RS');
  return head(v, 'contato', 'Contato', 'Unidades Telha Certa: matriz em Carazinho/RS (54) 3330-2850, filiais em Cunha Porã/SC (49) 3060-0960 e Ijuí/RS (55) 3024-8012.') + topo(v, 'contato') +
  cabPag('Unidades e contato', 'Matriz em Carazinho e filiais em Cunha Porã e Ijuí.') + `
<section class="sec"><div class="in">
  <ul class="unidades">${unidades.map(u => `<li class="sobe"><h3>${u.n}</h3>${u.f.map(f => `<p>${ic('tel')} <a href="${tel(f)}">${f}</a></p>`).join('')}<p>${ic('mail')} <a href="mailto:${u.e}">${u.e}</a></p><p>${ic('pin')} ${u.end}</p></li>`).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in duas contato-grade">
  <div class="sobe"><h2>Matriz em Carazinho</h2><p>Na BR 285, com acesso fácil para caminhões.</p>
    <iframe class="mapa" title="Mapa da Telha Certa em Carazinho/RS" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=13&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label></div>
    <label>E-mail<input name="email" type="email" autocomplete="email"></label>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Telha Certa: telhas metálicas sob medida em Carazinho/RS. Trapezoidais, onduladas, colonial, termoacústicas, painéis e acessórios para RS, SC e PR.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Telhas metálicas sob medida')}
      <h1>A cobertura para <em>todas as obras.</em></h1>
      <p class="ha-sub">Telhas de aço galvalume e pré-pintado no comprimento exato da sua obra, de casa a galpão. Fábrica em Carazinho e filiais em Cunha Porã e Ijuí.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'orcamento')}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Ver produtos</a></p>
    </div>
    <div class="ha-prod">${imgTopo('casa-colonial', 'Casa coberta com Telha Colonial Telha Certa')}<span class="ha-tag"><b>Telha Colonial</b>Estilo clássico com a resistência do aço</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Sob medida, até o comprimento transportável</span><span>${ic('check')}Aço certificado pelas usinas</span><span>${ic('check')}11 cores pré-pintadas</span><span>${ic('check')}RS, SC e parte do PR</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Produtos')}<h2>Para cobrir, fechar e isolar</h2></div>
  ${gradeGrupos(v)}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Mais pedidos')}<h2>Os modelos que mais saem da fábrica</h2></div>
  <ul class="cat">${['telha-trapezoidal-tp-40', 'telha-termoacustica', 'telha-colonial', 'telha-ondulada-tc-17', 'telha-pre-pintada', 'painel'].map(s => card(v, pr(s))).join('')}</ul>
</div></section>
<section class="sec"><div class="in duas">
  <figure class="sobe">${img('fabrica', 'Fábrica da Telha Certa vista do alto')}</figure>
  <div class="sobe">${sobre('A empresa')}<h2>Desde 2000 em Carazinho</h2>
  <p>Uma das maiores fabricantes de telhas metálicas do norte do RS. Sede própria de 8.500 m², 3.500 m² de produção e o prêmio Destaque Gaúcho 2014 no ramo de telhas.</p>
  <a class="link-seta" href="${link(v, 'empresa')}">Conheça a Telha Certa ${ic('seta')}</a></div>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Telha Certa em números')}<h2 class="sobe">Fábrica, filiais e representantes</h2>${numeros()}</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Telha Certa: fábrica de telhas metálicas em Carazinho/RS desde 2000. Telhas sob medida, termoacústicas e painéis com entrega no RS, SC e PR.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('fabrica', 'Fábrica da Telha Certa em Carazinho/RS')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Telha Certa · Carazinho/RS')}
    <h1>Telha de aço <em>na medida da obra.</em></h1>
    <p class="hb-sub">Da bobina à telha no comprimento exato, sem sobra e sem recorte. Trapezoidais, onduladas, colonial, termoacústicas e painéis.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'orcamento')}">Solicitar orçamento</a><a class="btn btn-linha" href="${link(v, 'produtos')}">Produtos</a></p>
    <div class="hb-selo"><div><b>2000</b><span>fundação</span></div><div><b>3</b><span>unidades</span></div><div><b>15</b><span>produtos</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Escolha pela obra')}<h2>O que você vai cobrir?</h2></div>
  ${gradeGrupos(v)}
</div></section>
<section class="lado">
  <figure>${img('bobinas', 'Bobinas de aço na linha de produção')}</figure>
  <div class="sobe">${sobre('Matéria-prima')}<h2>Bobina de 1,20 m, espessura 0,43 ou 0,50 mm</h2>
  <p>O aço chega com certificado das usinas e é perfilado em processo contínuo. A telha sai no comprimento pedido, com menos recobrimento e menos recorte na obra.</p>
  <p><a class="link-seta" href="${link(v, 'produtos')}">Ver todos os produtos ${ic('seta')}</a></p></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Isolamento')}<h2>Conforto térmico e acústico</h2></div>
  <ul class="cat">${['telha-termoacustica', 'telha-forro', 'telha-anticondensante'].map(s => card(v, pr(s))).join('')}</ul>
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Unidades')}<h2>Perto da sua obra</h2></div>
  <ul class="unidades">${unidades.map(u => `<li class="sobe"><h3>${u.n}</h3><p>${ic('tel')} <a href="${tel(u.f[0])}">${u.f[0]}</a></p><p>${ic('mail')} <a href="mailto:${u.e}">${u.e}</a></p></li>`).join('')}</ul>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), produtos: produtosPag(v), orcamento: orcamento(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Telha Certa', artigo: 'da', url: E.url, lang: 'pt', cor: '#1f4fa3', fundo: '#0f2c63', claro: '#f2f4f8',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: "'Source Sans 3',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Clara, abre com uma casa coberta com a Telha Colonial e mostra os modelos mais pedidos.', pontos: ['15 produtos com fotos, vantagens e perfil', 'Cores da pré-pintada', 'Página de orçamento com medidas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Azul escuro, abre com a fábrica vista do alto e fala da bobina à telha.', pontos: ['Fábrica em tela cheia', 'Isolamento termoacústico em destaque', 'As 3 unidades na home'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
