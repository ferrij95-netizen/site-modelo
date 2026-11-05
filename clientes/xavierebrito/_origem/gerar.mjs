// Imobiliária Xavier & Brito (Av. Itaquera, Jardim Maringá, Zona Leste de São Paulo; CRECI 17.967-J). Gera public/{a,b}/ e a página de escolha.
// node clientes/xavierebrito/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs xavierebrito http://xavierebrito.com.br/)
// Imóveis: imoveis.json, tirado em 05/11/2026 do __NEXT_DATA__ das páginas de cada imóvel do site atual (plataforma Arbo/Superlógica):
// os 8 destaques da home, a 1ª página de venda e de aluguel e imóveis "relacionados"; até 5 fotos originais de cada (ver LEIA-ME).
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Xavier & Brito Imóveis', url: 'https://xavierebrito.overtus.com.br/', antigo: 'http://xavierebrito.com.br/',
  wa: '5511930705400', waTxt: '(11) 93070-5400', fone: '(11) 2783-2000', email: 'vendas@xavierebrito.com.br', creci: '17.967-J', cnpj: '04.258.981/0001-22',
  end: 'Av. Itaquera, 2200', esquina: 'esquina com a Rua Damasqueiro', bairro: 'Jardim Maringá, São Paulo - SP', mapa: 'Avenida Itaquera 2200 Jardim Maringá São Paulo SP',
  insta: 'https://www.instagram.com/xavierebritoimobiliaria/', face: 'https://www.facebook.com/XavierEBritoImoveis',
  seguros: 'https://app.thehouse.com.br/#/store/fbab37d2-5536-4e91-9d44-5c9692ff56d5/v2', credito: 'https://xavierbrito.seucorretor.digital/#/home',
  cadastro: 'https://www.xavierebrito.com.br/cadastre-seu-imovel',
  curto: 'Compra, venda, locação e administração de imóveis na Zona Leste de São Paulo, com crédito imobiliário e seguros no mesmo atendimento.',
};
// texto institucional do site atual
const sobre = 'A Imobiliária Xavier e Brito oferece soluções completas para compra, venda, locação, administração de imóveis, crédito imobiliário e seguros. Trabalhamos com transparência, atendimento personalizado e acompanhamento em todas as etapas, garantindo segurança, agilidade e confiança para que você realize seus objetivos com tranquilidade.';
const horario = [['Segunda a sexta', '9h às 18h'], ['Sábado', '9h às 13h']];
// frentes de trabalho citadas no site atual (banners "Corretora de seguros" e "Crédito imobiliário")
const frentes = [
  { ic: 'casa', t: 'Imóveis', s: 'Compra, venda, locação e administração', p: 'Apartamentos, studios, flats, salões comerciais e terrenos, com acompanhamento em todas as etapas.' },
  { ic: 'chave', t: 'Crédito imobiliário', s: 'Financiamento residencial e aquisição de imóveis', p: 'Simulação e acompanhamento do financiamento com credibilidade e agilidade, sem sair da imobiliária.', href: 'credito' },
  { ic: 'escudo', t: 'Corretora de seguros', s: 'Seguros, proteção e tranquilidade', p: 'Seguros para quem compra, aluga ou é dono de imóvel, contratados com a mesma equipe.', href: 'seguros' },
];

// ---------- imóveis ----------
const brl = n => n == null ? '' : 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: Number(n) % 1 ? 2 : 0, maximumFractionDigits: 2 });
const BAIRRO = { 1: '' };
const imoveis = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8')).map(x => {
  const bairro = x.bairro in BAIRRO ? BAIRRO[x.bairro] : x.bairro;
  const grupo = /Loja|Sala|Galp/.test(x.tipo) ? 'comerciais' : /Terreno|Casa/.test(x.tipo) ? 'casas' : 'apartamentos';
  return { ...x, bairro: bairro || 'São Paulo', bairroOk: !!bairro, grupo, slug: `imovel/${x.cod.toLowerCase()}` };
});
const vendas = imoveis.filter(i => i.neg !== 'aluguel');
const aluguel = imoveis.filter(i => i.neg !== 'venda');
const bairros = [...new Set(imoveis.filter(i => i.bairroOk).map(i => i.bairro))].sort((a, b) => imoveis.filter(i => i.bairro === b).length - imoveis.filter(i => i.bairro === a).length);
const preco = (i, neg) => neg === 'aluguel' || (!neg && i.neg === 'aluguel') ? `${brl(i.aluguel)}<small>/mês</small>` : brl(i.venda);
const quando = (n, s, p) => `${n} ${n === 1 ? s : p}`;
const resumo = i => [i.area && `${String(i.area).replace('.', ',')} m²`, i.quartos && quando(i.quartos, 'quarto', 'quartos'), i.vagas && quando(i.vagas, 'vaga', 'vagas')].filter(Boolean);
const negTxt = i => i.neg === 'ambos' ? 'à venda ou para alugar' : i.neg === 'aluguel' ? 'para alugar' : 'à venda';
const waImovel = i => waHref(E.wa, `Olá! Tenho interesse no imóvel cód. ${i.cod} (${i.tipo} ${negTxt(i)}, ${i.bairro}) que vi no site da Xavier & Brito.`);
// descrição: linhas curtas seguidas viram lista, o resto parágrafo
function texto(d) {
  const blocos = d.split(/\n\n/).map(s => s.trim()).filter(Boolean);
  let h = '', lista = [];
  const fecha = () => { if (lista.length > 1) h += `<ul class="desc-lista">${lista.map(l => `<li>${esc(l)}</li>`).join('')}</ul>`; else if (lista.length) h += `<p>${esc(lista[0])}</p>`; lista = []; };
  for (const b of blocos) {
    if (b.length < 70 && !/[.!?]$/.test(b) && !/:$/.test(b)) lista.push(b.replace(/^[-•*]\s*/, ''));
    else { fecha(); h += `<p>${esc(b).replace(/\n/g, '<br>')}</p>`; }
  }
  fecha();
  return h;
}

const nav = [{ slug: 'comprar', nome: 'Comprar' }, { slug: 'alugar', nome: 'Alugar' }, { slug: 'servicos', nome: 'Crédito e seguros' }, { slug: 'imobiliaria', nome: 'A imobiliária' }, { slug: 'contato', nome: 'Contato' }];
export const nomesVersao = { a: 'Avenida Itaquera', b: 'Plantão' };
const FONTES = {
  a: 'https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@100..150,500..900&family=Public+Sans:wght@400;500;600;700&display=swap',
  b: 'https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;600;700&family=Archivo:wght@400;500;600;800&display=swap',
};
const cores = { a: '#d9141b', b: '#141414' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Xavier & Brito Imóveis | Comprar e alugar na Zona Leste de São Paulo' : `${titulo} | Xavier & Brito Imóveis`, descricao, fontes: FONTES[v], css: ['base.css', `${v}.css`], cor: cores[v] });
const logo = (v, claro = false, tag = 'a') => `<${tag} class="marca"${tag === 'a' ? ` href="${link(v, 'index')}" aria-label="Xavier & Brito Imóveis, página inicial"` : ''}><img src="/assets/${claro ? 'logo-claro' : 'logo'}.webp" width="${claro ? 1008 : 900}" height="${claro ? 532 : 424}" alt="Xavier & Brito Imóveis"></${tag}>`;
const foto = (n, alt, extra = ' loading="lazy" decoding="async"') => `<img src="/assets/img/${n[0]}" width="${n[1]}" height="${n[2]}" alt="${esc(alt)}"${extra}>`;
const btnMenu = `<button class="menu-btn" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
const mapa = () => `<iframe class="mapa" title="Mapa: ${E.end}" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(E.mapa)}&z=16&output=embed"></iframe>`;

function topo(v, s) {
  return `<header class="topo">
  <div class="in topo-linha">
    ${logo(v, v === 'b')}
    <nav id="menu" class="menu" aria-label="Principal"><ul>${menuItens(v, nav, s)}</ul></nav>
    <a class="topo-wa" href="${waHref(E.wa, 'Olá! Vim pelo site da Xavier & Brito.')}" target="_blank" rel="noopener">${icWa()}<span>${E.waTxt}</span></a>
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
    <div class="rod-marca">${logo(v, true, 'div')}<p>CRECI ${E.creci}</p></div>
    <div><h3>Atendimento</h3><ul class="rod-dados"><li>${ic('pin')}<span>${E.end}, ${E.esquina}<br>${E.bairro}</span></li><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li></ul></div>
    <div><h3>Horário</h3><ul class="rod-dados">${horario.map(h => `<li>${ic('relogio')}<span>${h[0]}: ${h[1]}</span></li>`).join('')}</ul><p class="rod-redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
    <div><h3>Imóveis</h3><ul><li><a href="${link(v, 'comprar')}">À venda</a></li><li><a href="${link(v, 'alugar')}">Para alugar</a></li><li><a href="${link(v, 'servicos')}">Crédito imobiliário e seguros</a></li><li><a href="${link(v, 'contato')}#anuncie">Anuncie seu imóvel</a></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Imobiliária Xavier e Brito · CNPJ ${E.cnpj}</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
</body>
</html>
`;
}

const cartao = (v, i, neg) => `<li class="card" data-g="${i.grupo}"><a href="${link(v, i.slug)}">
  <figure>${foto(i.fotos[0], `${i.tipo} em ${i.bairro}`)}<span class="card-tipo">${i.tipo}</span>${i.neg === 'ambos' ? '<span class="card-dois">Venda ou aluguel</span>' : ''}</figure>
  <div class="card-txt"><p class="card-local">${i.bairro} · cód. ${i.cod}</p><h3>${esc(i.titulo)}</h3><p class="card-res">${resumo(i).join(' · ') || '&nbsp;'}</p>
  <p class="card-preco"><b>${preco(i, neg)}</b></p></div></a></li>`;
const filtro = (v, lista, nome, neg) => {
  const grupos = [['todos', 'Todos'], ['apartamentos', 'Apartamentos'], ['comerciais', 'Comerciais'], ['casas', 'Casas e terrenos']].filter(g => g[0] === 'todos' || lista.some(i => i.grupo === g[0]));
  return `<div class="filtro-lista">
  <fieldset class="filtro"><legend>Mostrar</legend>${grupos.map((g, n) => `<label><input type="radio" name="f-${nome}" value="${g[0]}"${n ? '' : ' checked'}><span>${g[1]} <small>${g[0] === 'todos' ? lista.length : lista.filter(i => i.grupo === g[0]).length}</small></span></label>`).join('')}</fieldset>
  <ul class="cards">${lista.map(i => cartao(v, i, neg)).join('')}</ul></div>`;
};

function ficha(v, i) {
  const volta = i.neg === 'aluguel' ? 'alugar' : 'comprar';
  const titulo = `${i.tipo} ${negTxt(i)} em ${i.bairro}`;
  const dados = [['Área útil', i.area && `${String(i.area).replace('.', ',')} m²`], ['Terreno', i.terreno && `${i.terreno} m²`], ['Quartos', i.quartos], ['Suítes', i.suites], ['Banheiros', i.banh], ['Vagas', i.vagas]].filter(d => d[1]);
  const fotos = `<div class="galeria">${i.fotos.map((f, n) => `<a href="/assets/img/${f[0]}" data-foto="${esc(`${i.tipo} em ${i.bairro} (foto ${n + 1})`)}" class="g${n}">${foto(f, `${titulo}, foto ${n + 1}`, n ? ' loading="lazy" decoding="async"' : ' loading="eager"')}</a>`).join('')}</div>`;
  const valores = [i.venda && ['Venda', brl(i.venda)], i.aluguel && ['Aluguel', `${brl(i.aluguel)}<small>/mês</small>`]].filter(Boolean);
  return head(v, i.slug, `${i.tipo} em ${i.bairro}, cód. ${i.cod}`, `${titulo}. ${resumo(i).join(', ')}. ${valores.map(x => `${x[0]} ${x[1].replace(/<[^>]+>/g, '')}`).join(' · ')}.`) + topo(v, volta) + `
<div class="in ficha">
  <p class="voltar"><a href="${link(v, volta)}">${ic('seta', 'ic vira')}${i.neg === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'}</a></p>
  ${fotos}
  <div class="ficha-grade">
    <div class="ficha-txt">
      <p class="k">${titulo} · cód. ${i.cod}</p>
      <h1>${esc(i.titulo)}</h1>
      <p class="ficha-local">${ic('pin')}${i.rua ? `${esc(i.rua)}, ` : ''}${i.bairro}, São Paulo - SP${i.cond_nome ? ` · ${esc(i.cond_nome)}` : ''}</p>
      <p class="preco-m"><b>${valores.map(x => x[1]).join(' <span>ou</span> ')}</b><a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Quero visitar</a></p>
      ${dados.length ? `<dl class="dados">${dados.map(d => `<div><dt>${d[0]}</dt><dd>${d[1]}</dd></div>`).join('')}</dl>` : ''}
      ${i.desc ? `<h2>Sobre o imóvel</h2><div class="desc">${texto(i.desc)}</div>` : ''}
      ${i.comod.length ? `<h2>Destaques</h2><ul class="lista-check amen">${i.comod.map(a => `<li>${ic('check')}${esc(a)}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="preco-box">
      ${valores.map(x => `<p class="pb-rot">${x[0]}</p><p class="pb-valor">${x[1]}</p>`).join('')}
      <dl>${i.cond ? `<div><dt>Condomínio</dt><dd>${brl(i.cond)}</dd></div>` : ''}${i.iptu ? `<div><dt>IPTU</dt><dd>${brl(i.iptu)}</dd></div>` : ''}</dl>
      <a class="btn btn-wa" href="${waImovel(i)}" target="_blank" rel="noopener">${icWa()}Agendar visita pelo WhatsApp</a>
      <a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')}${E.fone}</a>
      ${i.neg !== 'aluguel' ? `<p class="pb-nota">Precisa financiar? <a href="${link(v, 'servicos')}">A Xavier & Brito cuida do crédito imobiliário</a>.</p>` : '<p class="pb-nota">Valores informados pela imobiliária; confirme na visita.</p>'}
    </aside>
  </div>
</div>
` + rodape(v);
}

const formulario = (assunto = 'Olá! Vim pelo site da Xavier & Brito.') => `<form class="form" data-wa="${esc(assunto)}" data-numero="${E.wa}">
  <div class="form-duas"><label>Nome<input name="nome" required autocomplete="name"></label><label>Telefone<input name="telefone" type="tel" required autocomplete="tel"></label></div>
  <label>Assunto<select name="assunto"><option>Quero comprar um imóvel</option><option>Quero alugar um imóvel</option><option>Quero vender ou alugar meu imóvel</option><option>Crédito imobiliário</option><option>Seguros</option></select></label>
  <label>Mensagem<textarea name="mensagem" rows="4" required></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const frentesLista = v => `<ul class="frentes">${frentes.map((f, n) => `<li class="frente sobe">${ic(f.ic)}<p class="k">0${n + 1}</p><h3>${f.t}</h3><p class="frente-s">${f.s}</p><p>${f.p}</p>${f.href ? `<a class="link-seta" href="${link(v, 'servicos')}#${f.href}">Saiba mais ${ic('seta')}</a>` : `<a class="link-seta" href="${link(v, 'comprar')}">Ver imóveis ${ic('seta')}</a>`}</li>`).join('')}</ul>`;
const atendimento = () => `<div class="atend"><ul class="contato-lista"><li>${ic('pin')}<div><strong>${E.end}</strong><span>${E.esquina}, ${E.bairro}</span></div></li><li>${ic('tel')}<div><strong>Telefone</strong><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${icWa()}<div><strong>WhatsApp</strong><a href="${waHref(E.wa)}" target="_blank" rel="noopener">${E.waTxt}</a></div></li><li>${ic('mail')}<div><strong>E-mail</strong><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('relogio')}<div><strong>Horário</strong>${horario.map(h => `<span>${h[0]}: ${h[1]}</span>`).join('')}</div></li></ul></div>`;
const destaque = (lista, n) => lista.filter(i => i.fotos.length >= 3).slice(0, n);
const doHome = ['AP3765', 'AP3856', 'AP4059', 'ST0020', 'AP3957', 'AP1243', 'AP4028', 'TE0445'];
const homeVenda = doHome.map(c => vendas.find(i => i.cod === c)).filter(Boolean);
const homeAluguel = ['AP4051', 'AP4090', 'FL0001', 'AP3926', 'LO0031', 'AP0774', 'AP4014', 'LO0029'].map(c => aluguel.find(i => i.cod === c)).filter(Boolean);
const porCod = c => imoveis.find(i => i.cod === c);

function comum(v, pag, cab) {
  pag.comprar = head(v, 'comprar', 'Imóveis à venda', `${vendas.length} imóveis à venda na Zona Leste de São Paulo: apartamentos, studio e terreno, com crédito imobiliário na própria imobiliária.`) + topo(v, 'comprar') + cab('À venda', `${vendas.length} imóveis à venda na Zona Leste`, 'Apartamentos novos e usados, studio e terreno. Muitos aceitam financiamento e FGTS: a Xavier & Brito cuida do crédito com você.') + `
<div class="in lista-pag">${filtro(v, vendas, 'v', 'venda')}</div>
` + rodape(v);
  pag.alugar = head(v, 'alugar', 'Imóveis para alugar', `${aluguel.length} imóveis para alugar na Zona Leste de São Paulo: apartamentos, studio mobiliado, flat e salões comerciais.`) + topo(v, 'alugar') + cab('Para alugar', `${aluguel.length} imóveis para alugar`, 'Apartamentos, studio mobiliado, flat e salões comerciais no Tatuapé, Belenzinho, Vila Matilde, Jardim Maringá e região.') + `
<div class="in lista-pag">${filtro(v, aluguel, 'a', 'aluguel')}</div>
` + rodape(v);
  pag.servicos = head(v, 'servicos', 'Crédito imobiliário e seguros', 'Financiamento residencial, aquisição de imóveis e corretora de seguros na Xavier & Brito.') + topo(v, 'servicos') + cab('Crédito e seguros', 'Do financiamento ao seguro, no mesmo balcão', 'Além de comprar, vender, alugar e administrar imóveis, a Xavier & Brito tem crédito imobiliário e corretora de seguros.') + `
<div class="in serv-pag">
  <section id="credito" class="serv sobe"><img src="/assets/img/xb-credito.webp" width="900" height="600" alt="Xavier & Brito Crédito Imobiliário: financiamento residencial, aquisição de imóveis, credibilidade e agilidade" loading="lazy"><div><p class="k">Crédito imobiliário</p><h2>Financiamento residencial e aquisição de imóveis</h2><p>Quem compra com a Xavier & Brito pode resolver o financiamento com a própria imobiliária, com credibilidade e agilidade. Vários imóveis à venda aceitam financiamento e FGTS.</p><p class="bts"><a class="btn" href="${E.credito}" target="_blank" rel="noopener">Simular financiamento ${ic('ext')}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero saber sobre crédito imobiliário.')}" target="_blank" rel="noopener">${icWa()}Falar sobre crédito</a></p></div></section>
  <section id="seguros" class="serv sobe"><img src="/assets/img/xb-seguros.webp" width="900" height="600" alt="Xavier & Brito Corretora de Seguros: seguros, proteção e tranquilidade" loading="lazy"><div><p class="k">Corretora de seguros</p><h2>Seguros, proteção e tranquilidade</h2><p>A Xavier & Brito também é corretora de seguros. Você contrata o seguro com a mesma equipe que cuida do seu imóvel.</p><p class="bts"><a class="btn" href="${E.seguros}" target="_blank" rel="noopener">Ver seguros ${ic('ext')}</a><a class="btn btn-linha" href="${waHref(E.wa, 'Olá! Quero fazer uma cotação de seguro.')}" target="_blank" rel="noopener">${icWa()}Pedir cotação</a></p></div></section>
  <section class="serv-adm sobe"><p class="k">Administração</p><h2>Tem um imóvel para vender ou alugar?</h2><p>A Xavier & Brito anuncia, mostra e administra o seu imóvel. O anúncio é gratuito.</p><p class="bts"><a class="btn" href="${link(v, 'contato')}#anuncie">Anunciar meu imóvel</a></p></section>
</div>
` + rodape(v);
  pag.imobiliaria = head(v, 'imobiliaria', 'A imobiliária', sobre) + topo(v, 'imobiliaria') + cab('A imobiliária', 'Xavier & Brito, na Avenida Itaquera', `CRECI ${E.creci}. Compra, venda, locação, administração, crédito imobiliário e seguros.`) + `
<div class="in"><section class="inst"><p class="lead">${sobre}</p></section>
<section>${frentesLista(v)}</section>
<section class="inst-num"><ul class="numeros"><li><b>${vendas.length}</b><span>imóveis à venda nesta prévia</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${bairros.length}</b><span>bairros da Zona Leste</span></li><li><b>3</b><span>frentes: imóveis, crédito e seguros</span></li></ul></section>
<section class="onde"><div><header class="tit"><p class="k">Onde estamos</p><h2>${E.end}</h2></header>${atendimento()}</div>${mapa()}</section></div>
` + rodape(v);
  pag.contato = head(v, 'contato', 'Contato', `Fale com a Xavier & Brito: ${E.fone}, WhatsApp ${E.waTxt}, ${E.email}. ${E.end}, ${E.bairro}.`) + topo(v, 'contato') + cab('Contato', 'Fale com a Xavier & Brito', 'Escreva pelo formulário, chame no WhatsApp ou passe na loja da Avenida Itaquera.') + `
<div class="in"><section class="contato-pag"><div class="contato-form"><h2>Mensagem</h2>${formulario()}</div>${atendimento()}</section>
<section id="anuncie" class="anuncie"><div><p class="k">Anuncie grátis</p><h2>Quer vender ou alugar seu imóvel?</h2><p>Conte o tipo de imóvel, o bairro e se é para venda ou locação. A equipe retorna para combinar a avaliação e as fotos.</p></div>${formulario('Olá! Quero anunciar meu imóvel com a Xavier & Brito.')}</section>
<section class="mapas">${mapa()}</section></div>
` + rodape(v);
  for (const i of imoveis) pag[i.slug] = ficha(v, i);
}

function A() {
  const v = 'a', pag = {};
  const cab = (k, t, s) => `<section class="cab-a"><div class="in"><p class="k">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const sala = porCod('AP3765').fotos[0], varanda = porCod('AP3856').fotos[4], terraco = porCod('AP3957').fotos[4];
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-a"><div class="in hero-a-in">
  <div class="hero-a-txt"><p class="k">Imobiliária na Zona Leste · CRECI ${E.creci}</p><h1>Para você <em>morar bem.</em></h1><p>Compre ou alugue com agilidade, segurança e sem burocracia. E, se precisar, faça o financiamento e o seguro com a mesma equipe.</p>
    <div class="busca"><a class="busca-op" href="${link(v, 'comprar')}"><span>Quero comprar</span><b>${vendas.length} imóveis</b>${ic('seta')}</a><a class="busca-op" href="${link(v, 'alugar')}"><span>Quero alugar</span><b>${aluguel.length} imóveis</b>${ic('seta')}</a><a class="busca-op busca-anuncie" href="${link(v, 'contato')}#anuncie"><span>Tenho um imóvel</span><b>Anunciar grátis</b>${ic('seta')}</a></div></div>
  <div class="hero-a-fotos"><figure class="hf1">${foto(sala, 'Sala com parede de tijolinho e sacada em apartamento na Vila Esperança', ' loading="eager" fetchpriority="high"')}<figcaption>Vila Esperança · cód. AP3765</figcaption></figure><figure class="hf2">${foto(varanda, 'Sacada com vista da Penha')}</figure><figure class="hf3">${foto(terraco, 'Terraço privativo de duplex na Cidade Patriarca')}</figure></div>
</div></section>
<section class="frentes-a"><div class="in">${frentesLista(v)}</div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">À venda</p><h2>Para comprar na Zona Leste</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Ver os ${vendas.length} ${ic('seta')}</a></header><ul class="cards">${homeVenda.map(i => cartao(v, i, 'venda')).join('')}</ul></section>
<section class="bairros-a"><div class="in"><p class="k">Bairros com imóveis agora</p><ul>${bairros.map(b => `<li>${b} <small>${imoveis.filter(i => i.bairro === b).length}</small></li>`).join('')}</ul></div></section>
<section class="in dest-a"><header class="tit tit-linha"><div><p class="k">Para alugar</p><h2>Prontos para morar ou abrir seu negócio</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Ver os ${aluguel.length} ${ic('seta')}</a></header><ul class="cards">${homeAluguel.map(i => cartao(v, i, 'aluguel')).join('')}</ul></section>
<section class="loja-a"><div class="in loja-a-in"><div><p class="k">A imobiliária</p><h2>Na Avenida Itaquera, esquina com a Rua Damasqueiro</h2><p>${sobre}</p>${atendimento()}<p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Vim pelo site da Xavier & Brito.')}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a></p></div>${mapa()}</div></section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

function B() {
  const v = 'b', pag = {};
  const cab = (k, t, s) => `<section class="cab-b"><div class="in"><p class="placa">${k}</p><h1>${t}</h1><p>${s}</p></div></section>`;
  const capa = porCod('AP3856').fotos[4];
  const porBairro = lista => {
    const conta = b => lista.filter(i => i.bairro === b).length;
    const bs = [...new Set(lista.map(i => i.bairro))].sort((x, y) => (x === 'São Paulo') - (y === 'São Paulo') || conta(y) - conta(x));
    return bs.map(b => `<div class="pb-grupo"><h3>${b}</h3><ol class="linhas">${lista.filter(i => i.bairro === b).map(i => `<li><a href="${link(v, i.slug)}"><span class="ln-cod">${i.cod}</span><span class="ln-end"><b>${i.tipo}</b><small>${resumo(i).join(' · ')}</small></span><span class="ln-preco">${preco(i, lista === aluguel ? 'aluguel' : 'venda')}</span>${ic('seta')}</a></li>`).join('')}</ol></div>`).join('');
  };
  pag.index = head(v, 'index', '', E.curto) + topo(v, 'index') + `
<section class="hero-b"><div class="hero-b-foto">${foto(capa, 'Sacada de apartamento reformado perto do metrô Penha, com vista da Zona Leste', ' loading="eager" fetchpriority="high"')}</div><div class="in hero-b-in"><p class="placa">Imóveis · Zona Leste · São Paulo</p><h1>Comprar, alugar e financiar <span>no mesmo balcão.</span></h1><p>${E.curto}</p><p class="bts"><a class="btn" href="${link(v, 'comprar')}">Imóveis à venda</a><a class="btn btn-linha" href="${link(v, 'alugar')}">Imóveis para alugar</a></p></div></section>
<section class="num-b"><div class="in"><ul class="numeros"><li><b>${vendas.length}</b><span>à venda</span></li><li><b>${aluguel.length}</b><span>para alugar</span></li><li><b>${bairros.length}</b><span>bairros</span></li><li><b>${E.creci}</b><span>CRECI</span></li></ul></div></section>
<section class="in vit-b"><header class="tit tit-linha"><div><p class="placa">Vitrine</p><h2>Destaques à venda</h2></div><a class="link-seta" href="${link(v, 'comprar')}">Todos à venda ${ic('seta')}</a></header><ul class="cards">${homeVenda.slice(0, 4).map(i => cartao(v, i, 'venda')).join('')}</ul></section>
<section class="in idx-b"><header class="tit tit-linha"><div><p class="placa">Para alugar, por bairro</p><h2>Escolha pelo bairro</h2></div><a class="link-seta" href="${link(v, 'alugar')}">Com fotos ${ic('seta')}</a></header><div class="pb-grade">${porBairro(aluguel)}</div></section>
<section class="frentes-b"><div class="in"><header class="tit"><p class="placa">Três frentes</p><h2>Imóvel, crédito e seguro com a mesma equipe</h2></header>${frentesLista(v)}</div></section>
<section class="in loja-b"><div><p class="placa">Plantão de atendimento</p><h2>${E.end}</h2>${atendimento()}<p class="bts"><a class="btn" href="${waHref(E.wa, 'Olá! Vim pelo site da Xavier & Brito.')}" target="_blank" rel="noopener">${icWa()}Chamar no WhatsApp</a></p></div>${mapa()}</section>
` + rodape(v);
  comum(v, pag, cab);
  return pag;
}

copiarSiteJs(pub, E.wa);
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Xavier & Brito Imóveis', artigo: 'da', url: E.url, lang: 'pt', cor: '#d9141b', fundo: '#141414', claro: '#f4f2ef',
  fonteTitulo: 'Anybody,system-ui,sans-serif', fonteTexto: '"Public Sans",system-ui,sans-serif', googleFonts: FONTES.a,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + imoveis.length, texto: 'Clara, no vermelho e preto do logo, com fotos reais dos imóveis na abertura e as três frentes da imobiliária: imóveis, crédito e seguros.', pontos: [`${imoveis.length} imóveis do site com fotos, valores e ficha completa`, 'Filtro por apartamentos, comerciais e terrenos', 'Visita agendada pelo WhatsApp em cada imóvel'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + imoveis.length, texto: 'Escura, com as placas prateadas do logo e os imóveis para alugar organizados por bairro, com código e valor.', pontos: ['Busca por bairro da Zona Leste', 'Crédito imobiliário e seguros em destaque', 'Endereço, horário e mapa da loja'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
