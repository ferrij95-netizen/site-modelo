// Grupo Luxtel (Mauá/SP): reservatórios e equipamentos em PRFV para construção civil e saneamento, perfis pultrudados, guarda-corpos e grades de piso. Gera public/{a,b}/ e a página de escolha.
// node clientes/luxtel/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs luxtel https://www.luxtel.com.br/)
// Textos e fotos do site atual (Wix). Logo vetorizado por _origem/vetorizar-logo.py.
import fs from 'node:fs';
import path from 'node:path';
import { esc, ic, cabeca, link, escreverVersao, copiarSiteJs, escolha } from '../../../componentes/gerador/kit.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const F = JSON.parse(fs.readFileSync(path.join(aqui, 'fotos.json'), 'utf8'));

const E = {
  nome: 'Grupo Luxtel', legal: 'Grupo Luxtel', url: 'https://luxtel.overtus.com.br/', antigo: 'https://www.luxtel.com.br/',
  fone: '(11) 4544-1144', foneHref: 'tel:+551145441144', fone2: '(11) 4543-6290', fone2Href: 'tel:+551145436290', email: 'comercial@luxtel.com.br', email2: 'luxtel@luxtel.com.br',
  end: 'Av. Guaraciaba, 607, Sertãozinho', cidade: 'Mauá/SP · CEP 09370-840',
};

const img = (n, alt, extra = '') => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" loading="lazy" decoding="async"${extra}>`;
const imgTopo = (n, alt) => `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" width="${F[n][0]}" height="${F[n][1]}" fetchpriority="high" decoding="async">`;
const foto = (n, alt) => `<a href="/assets/img/${n}.webp" data-foto="${esc(alt)}">${img(n, alt)}</a>`;
const checks = l => `<ul class="checks">${l.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`;
const acess = ['Sapatas de ancoragem', 'Escada marinheiro', 'Guarda-corpo superior', 'Escala volumétrica', 'Escotilha de acesso lateral', 'Olhais de içamento', 'Pinturas especiais e anti-UV', 'Tubos e flanges instalados', 'Respiro'];

const linhas = [
  { slug: 'construcao', n: 'Construção civil', t: 'Reservatórios cilíndricos e verticais, cisternas enterradas e anéis de vedação para água, efluentes e químicos.', f: 'vert-0' },
  { slug: 'saneamento', n: 'Saneamento', t: 'Equipamentos sob medida para ETEs e ETAs e biomídia MBBR, com credenciamento Sabesp e Sanepar.', f: 'ete-5' },
  { slug: 'perfis', n: 'Perfis pultrudados', t: 'Perfis, guarda-corpos e grades de piso em PRFV, que não oxidam e dispensam pintura.', f: 'perfil-3' },
];

const nav = [
  { slug: 'index', n: 'Início' },
  { slug: 'empresa', n: 'A Luxtel' },
  ...linhas.map(l => ({ slug: l.slug, n: l.n })),
  { slug: 'contato', n: 'Contato' },
];
export const nomesVersao = { a: 'Fibra e fábrica', b: 'Acima de tudo' };
const FONTES = 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&display=swap';
const head = (v, slug, titulo, descricao) => cabeca({ E, v, slug, titulo: slug === 'index' ? 'Grupo Luxtel | Reservatórios e soluções em PRFV para construção civil e saneamento' : `${titulo} | Grupo Luxtel`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#760c16' });
const sobre = t => `<p class="sobrelinha">${t}</p>`;
const logo = (branco, h = 50) => `<img class="logo" src="/assets/${branco ? 'logo-branco' : 'logo'}.svg" alt="Grupo Luxtel" width="${Math.round(h * 683 / 359)}" height="${h}">`;

function topo(v, slug) {
  return `<header class="topo">
  <div class="topo-barra"><div class="in"><span class="tb-slogan">Soluções em PRFV desde 1992</span><span class="tb-dir"><a href="${E.foneHref}">${ic('tel')}${E.fone}</a><a href="mailto:${E.email}">${ic('mail')}${E.email}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Grupo Luxtel, página inicial">${logo(v === 'b')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${slug === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.n}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${link(v, 'contato')}">Pedir orçamento</a>
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
    <div class="rod-marca">${logo(true, 70)}
      <p>Reservatórios e equipamentos em poliéster reforçado com fibra de vidro (PRFV) para construção civil e saneamento. Mais de 30 anos de mercado.</p></div>
    <div><h3>Soluções</h3><ul>${linhas.map(l => `<li><a href="${link(v, l.slug)}">${l.n}</a></li>`).join('')}</ul></div>
    <div><h3>Contato</h3><ul class="rod-dados">
      <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a><br><a href="${E.fone2Href}">${E.fone2}</a></span></li>
      <li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li>
      <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li>
    </ul></div>
    <div><h3>Empresa</h3><ul>
      <li><a href="${link(v, 'empresa')}">A Luxtel</a></li>
      <li><a href="${link(v, 'empresa')}#qualidade">Qualidade</a></li>
      <li><a href="${link(v, 'contato')}">Fale conosco</a></li></ul></div>
  </div>
  <div class="in rod-base"><span>© 2026 ${E.legal}</span><span>Credenciada Sabesp e Sanepar · Cartão BNDES</span></div>
</footer>
</body>
</html>`;
}

const numeros = () => `<ul class="economia">
  <li><b>30+</b><span>anos de experiência</span></li>
  <li><b>16 mi</b><span>de litros de armazenamento vendidos por ano</span></li>
  <li><b>4</b><span>unidades fabris</span></li>
  <li><b>2 mi</b><span>de litros de esgoto tratados por dia</span></li>
  <li><b>150 km</b><span>de perfis pultrudados por ano</span></li>
</ul>`;

const diferenciais = [
  ['escudo', 'Credenciada Sabesp e Sanepar', 'Uma das poucas indústrias credenciadas pelas maiores concessionárias.'],
  ['check', 'Laboratório interno', 'Todos os testes de qualidade exigidos, com rastreabilidade de matéria-prima.'],
  ['caminhao', 'Frota própria', 'Caminhões e equipe especializada para descarregar e movimentar na obra.'],
  ['fabrica', 'Processos automatizados', 'Filament winding e pultrusão em PRFV; extrusão e rotomoldagem em termoplásticos.'],
  ['engrenagem', 'Modelação interna', 'Peças especiais sob medida e equipes para serviços externos.'],
  ['livro', 'Engenharia', 'Projetos estruturais, desenhos técnicos e rastreabilidade.'],
];
const gradeDif = () => `<ul class="pilares" style="grid-template-columns:repeat(3,minmax(0,1fr))">${diferenciais.map(d => `<li class="sobe">${ic(d[0])}<h3>${d[1]}</h3><p>${d[2]}</p></li>`).join('')}</ul>`;

const gradeLinhas = v => `<ul class="setores" style="grid-template-columns:repeat(3,minmax(0,1fr))">${linhas.map(l => `<li class="sobe"><a href="${link(v, l.slug)}"><span class="st-img">${img(l.f, l.n)}</span><span class="st-txt"><small>Grupo Luxtel</small><b>${l.n}</b><span>${l.t}</span></span></a></li>`).join('')}</ul>`;

const chamada = v => `<section class="chamada"><div class="in ch-grade">
  <div><h2>Reservatório sob medida para a sua obra</h2>
  <p>Mande o volume, o uso e o espaço disponível. O departamento técnico indica diâmetro, altura e acessórios.</p></div>
  <div class="ch-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${E.foneHref}">${E.fone}</a></div>
</div></section>`;

const cabPag = (titulo, sub, f) => `<section class="cab-pag${f ? ' com-foto' : ''}">${f ? `<div class="cp-foto">${imgTopo(f[0], f[1])}</div>` : ''}<div class="in"><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div></section>`;

const bloco = (id, marca, n, sub, fotos, corpo) => `<article class="maq" id="${id}">
  <div class="maq-foto sobe">${foto(fotos[0][0], fotos[0][1])}${fotos.length > 1 ? `<div class="maq-mini">${fotos.slice(1, 4).map(f => foto(f[0], f[1])).join('')}</div>` : ''}</div>
  <div class="sobe"><p class="maq-marca">${marca}</p><h2>${n}</h2><p class="maq-sub">${sub}</p>${corpo}
  <p class="acoes"><a class="btn" href="mailto:${E.email}?subject=${encodeURIComponent('Orçamento ' + n)}">${ic('mail')} Pedir orçamento</a></p></div>
</article>`;

function empresa(v) {
  return head(v, 'empresa', 'A Luxtel', 'Grupo Luxtel: fundado em 1992, fabrica soluções em PRFV para construção civil e saneamento, com laboratório próprio e credenciamento Sabesp e Sanepar.') + topo(v, 'empresa') +
  cabPag('A Luxtel', 'Mais de 30 anos fabricando em fibra de vidro.', ['vert-4', 'Reservatórios verticais Luxtel instalados']) + `
<section class="sec"><div class="in duas">
  <div class="sobe">${sobre('Desde 1992')}<h2>Tecnologia de ponta e matéria-prima controlada</h2>
  <p>Fundado em 1992, o Grupo Luxtel tem mais de 30 anos de mercado. Nessa trajetória sempre investiu em tecnologia de ponta nos processos e em matéria-prima de qualidade controlada para fabricar uma ampla linha de produtos.</p>
  <p><b>Missão:</b> fabricar soluções personalizadas em poliéster reforçado com fibra de vidro (PRFV), com qualidade, confiabilidade e o compromisso de uma parceria que atenda todas as necessidades do cliente.</p>
  <p><b>Visão:</b> ser referência nacional em equipamentos de PRFV para construção civil e saneamento, superando as expectativas de clientes, colaboradores e fornecedores.</p>
  <ul class="selos"><li>Ética</li><li>Honestidade</li><li>Justiça</li><li>Responsabilidade socioambiental</li></ul></div>
  <figure class="sobe">${img('ete-0', 'Reservatórios horizontais na fábrica da Luxtel')}</figure>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Produção que abastece obras e estações de tratamento</h2>${numeros()}</div></section>
<section class="sec" id="qualidade"><div class="in">
  <div class="sec-cab sobe">${sobre('Qualidade e diferenciais')}<h2>Do laboratório à descarga na obra</h2></div>
  ${gradeDif()}
</div></section>
<section class="sec sec-cinza"><div class="in">
  <div class="sec-cab sobe">${sobre('Nas obras')}<h2>Entregue e instalado</h2></div>
  <div class="galeria">${[['cil-1', 'Reservatório no caminhão da frota Luxtel'], ['cist-1', 'Instalação de cisterna enterrada'], ['vert-1', 'Reservatórios verticais com escada e guarda-corpo'], ['perfil-0', 'Guarda-corpo em PRFV']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>` + chamada(v) + rodape(v);
}

function construcao(v) {
  return head(v, 'construcao', 'Construção civil', 'Reservatórios cilíndricos e verticais em PRFV, cisternas enterradas de 1.000 a 100.000 litros e anéis de vedação Luxtel para construção civil.') + topo(v, 'construcao') +
  cabPag('Construção civil', 'Armazenamento de água, efluentes e produtos químicos em PRFV, em formatos cônicos, cilíndricos, prismáticos, enterrados e horizontais.') + `
<section class="sec"><div class="in">
  <nav class="indice" aria-label="Produtos"><a href="#cilindricos">Reservatórios cilíndricos</a><a href="#verticais">Reservatórios verticais</a><a href="#cisternas">Cisternas</a><a href="#aneis">Anéis de vedação</a></nav>
  ${bloco('cilindricos', 'Filament winding', 'Reservatórios cilíndricos', 'Para água, efluentes e químicos, sob medida para o espaço disponível.', [['cil-2', 'Reservatório cilíndrico vertical'], ['cil-0', 'Reservatórios cilíndricos instalados'], ['cil-3', 'Bateria de reservatórios'], ['cil-1', 'Reservatório no caminhão']],
    `<p>Feitos por enrolamento filamentar (filament winding), processo automatizado com material até duas vezes mais resistente que o PRFV tradicional. A melhor opção para colunas d’água de altura média e alta.</p>
    <p><b>Diâmetros de linha:</b> 1,60 · 2,00 · 2,30 · 2,50 · 2,75 · 3,00 · 3,20 · 3,60 · 3,80 m. Outros diâmetros sob consulta.</p>
    <h3>Acessórios</h3><ul class="checks lista2">${acess.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`)}
  ${bloco('verticais', 'PRFV', 'Reservatórios verticais', 'Grande capacidade ocupando pouca área no solo.', [['vert-0', 'Reservatórios verticais'], ['vert-2', 'Reservatório vertical alto'], ['vert-3', 'Reservatórios verticais em obra'], ['vert-1', 'Reservatórios com escada marinheiro']],
    checks(['<b>Alta resistência química e mecânica</b>: água potável e produtos químicos agressivos', '<b>Mais volume, menos área</b>: a estrutura vertical aproveita o espaço', '<b>Fácil instalação e manutenção</b>: peso reduzido no transporte e na montagem', '<b>Sob medida</b>: vários tamanhos e modelos']))}
  ${bloco('cisternas', 'Enterradas', 'Cisternas', 'De 1.000 a 100.000 litros, com várias profundidades e comprimentos.', [['cist-3', 'Cisterna em PRFV'], ['cist-1', 'Cisterna sendo enterrada'], ['cist-2', 'Cisterna na vala'], ['cist-5', 'Cisterna no caminhão']],
    `<p>Para água potável, água de chuva e reuso, sistemas de retardo e outros usos da construção civil.</p>
    ${checks(['Vai pronta para instalar, sem obra nem tempo de cura', 'Sem lençol freático, dispensa contenção de concreto: basta reaterro compactado', 'Formatos horizontais e verticais'])}
    <p class="nota">Com lençol freático ou trânsito de veículos sobre a cisterna, consulte o departamento técnico.</p>`)}
  ${bloco('aneis', 'Exclusivo Luxtel', 'Anéis de vedação', 'Tubulação no costado do reservatório sem flange rígida.', [['anel-0', 'Anéis de vedação Luxtel'], ['anel-4', 'Anel de vedação com tubo'], ['anel-5', 'Furo com anel instalado'], ['anel-1', 'Instalação do anel de vedação']],
    checks(['Borracha EPDM atóxica, que não degrada com o tempo', 'Vedação absoluta até 1,5 bar (15 m de coluna d’água)', 'Absorve vibrações e evita trincas por fadiga', 'Instalação por fora: furo com serra-copo, encaixe do anel e do tubo', 'Para qualquer tubo, exceto metálico e de cobre']))}
</div></section>` + chamada(v) + rodape(v);
}

function saneamento(v) {
  return head(v, 'saneamento', 'Saneamento', 'Equipamentos em PRFV para ETEs e ETAs (decantadores, filtros, reator UASB, flotadores, calha Parshall) e biomídia MBBR Luxtel. Credenciada Sabesp e Sanepar.') + topo(v, 'saneamento') +
  cabPag('Saneamento', 'Equipamentos sob medida para tratamento de água e de efluentes.', ['san-0', 'Estação de tratamento com equipamentos Luxtel']) + `
<section class="sec"><div class="in">
  ${bloco('ete-eta', 'Credenciada Sabesp e Sanepar', 'Equipamentos para ETEs e ETAs', 'Fabricados conforme as especificações técnicas de cada projeto.', [['ete-5', 'Tanques horizontais em PRFV'], ['ete-1', 'Reservatório vertical para saneamento'], ['ete-4', 'Tanque em instalação'], ['ete-8', 'Equipamento de grande diâmetro no transporte']],
    `<p>Com laboratório próprio para ensaios e rastreabilidade, a Luxtel é uma das poucas indústrias credenciadas a fornecer reservatórios em PRFV para Sabesp e Sanepar, para água potável, efluentes e químicos.</p>
    <ul class="checks lista2">${['Decantadores', 'Filtros anaeróbios e aeróbios', 'Reator UASB', 'Tanque de equalização', 'Tanque de contato', 'Tanque de produto químico', 'Flotadores', 'Gradeamento', 'Calha Parshall'].map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul>`)}
  ${bloco('mbbr', 'Polietileno de alta densidade virgem', 'Biomídia MBBR', 'Meio suporte para as bactérias que tratam a carga orgânica.', [['mbbr-0', 'Biomídia MBBR Luxtel'], ['mbbr-1', 'Biomídia em produção'], ['mbbr-3', 'Biomídia em operação'], ['mbbr-2', 'Carga de biomídia']],
    `<dl><div><dt>670 m²/m³</dt><dd>de área superficial protegida</dd></div><div><dt>15 anos</dt><dd>de garantia</dd></div></dl>
    <p>Moving Bed Bio-Reactor: formato com excelente relação de área de contato por volume ocupado.</p>
    ${checks(['Recheio biológico', 'Filtração e lavagem de gases', 'Colunas de destilação'])}`)}
</div></section>
<section class="sec sec-cinza"><div class="in duas"><div class="sobe">${sobre('Acessórios')}<h2>Pronto para operar</h2><ul class="checks lista2">${acess.map(x => `<li>${ic('check')}${x}</li>`).join('')}</ul></div><figure class="sobe">${img('ete-7', 'Reservatório com guarda-corpo e escada')}</figure></div></section>` + chamada(v) + rodape(v);
}

function perfis(v) {
  return head(v, 'perfis', 'Perfis pultrudados', 'Perfis pultrudados, guarda-corpos e grades de piso em PRFV Luxtel: não oxidam, 70% mais leves que o aço e sem manutenção periódica.') + topo(v, 'perfis') +
  cabPag('Perfis pultrudados', 'A versatilidade do PRFV em escadas, guarda-corpos, pisos e peças especiais.', ['guarda-0', 'Guarda-corpo em PRFV sobre canal']) + `
<section class="sec"><div class="in">
  <ul class="economia" style="grid-template-columns:repeat(4,minmax(0,1fr))"><li><b>0</b><span>oxidação</span></li><li><b>-30%</b><span>de peso que o alumínio</span></li><li><b>-70%</b><span>de peso que o aço</span></li><li><b>150 km</b><span>de perfis por ano</span></li></ul>
  ${bloco('perfis-p', 'Pultrusão', 'Perfis pultrudados', 'Todos os perfis de outros materiais, e novos formatos de forma rápida e econômica.', [['perfil-3', 'Escada com guarda-corpo em PRFV'], ['perfil-2', 'Guarda-corpo em PRFV'], ['perfil-4', 'Guarda-corpo em área externa'], ['perfil-5', 'Estrutura sobre tanque']],
    checks(['<b>Não oxida</b>: resistente a intempéries, efluentes e químicos', '<b>Vida útil superior</b> a aço e concreto', '<b>Leve</b>: transporte e instalação mais baratos', '<b>Sem manutenção periódica</b> em ambientes agressivos', 'Suporte de meio filtrante, esquadria para tampas, defletores e outros projetos']))}
  ${bloco('guarda-corpo', 'PRFV', 'Guarda-corpo em fibra de vidro', 'Segurança, durabilidade e resistência à corrosão.', [['guarda-1', 'Guarda-corpo em estação de tratamento'], ['guarda-2', 'Guarda-corpo em obra'], ['perfil-0', 'Guarda-corpo amarelo'], ['home-1', 'Guarda-corpo instalado']],
    checks(['Resiste a químicos, maresia e clima', 'Leve: montagem mais rápida e barata', 'Não precisa de pintura nem tratamento anticorrosivo', 'Isolante elétrico', 'Para indústrias químicas, ETEs e ETAs e ambientes marítimos']))}
  ${bloco('grades', 'Montadas e injetadas', 'Grades de piso industrial', 'Plataformas, passarelas e áreas técnicas leves e resistentes.', [['perfil-6', 'Grades de piso em PRFV']],
    `<p>Não oxidam, resistem à corrosão química, são isolantes, antiderrapantes e quase não pedem manutenção.</p>
    ${checks(['<b>Injetadas</b>: moldes fechados, malha uniforme e alta precisão, para vãos menores e passarelas modulares', '<b>Montadas</b>: perfis pultrudados em grelha com vigas em seção “I”, para vãos e cargas maiores'])}`)}
</div></section>` + chamada(v) + rodape(v);
}

function contato(v) {
  const q = encodeURIComponent('Av. Guaraciaba, 607, Sertãozinho, Mauá - SP');
  return head(v, 'contato', 'Contato', 'Grupo Luxtel: (11) 4544-1144 e (11) 4543-6290, comercial@luxtel.com.br. Av. Guaraciaba, 607, Sertãozinho, Mauá/SP.') + topo(v, 'contato') +
  cabPag('Fale conosco', 'Orçamento, dúvida técnica ou visita à fábrica.') + `
<section class="sec"><div class="in duas contato-grade">
  <div class="sobe"><ul class="rod-dados ct-dados">
    <li>${ic('tel')}<span><a href="${E.foneHref}">${E.fone}</a> · <a href="${E.fone2Href}">${E.fone2}</a></span></li>
    <li>${ic('mail')}<span><a href="mailto:${E.email}">${E.email}</a><br><a href="mailto:${E.email2}">${E.email2}</a></span></li>
    <li>${ic('pin')}<span>${E.end}<br>${E.cidade}</span></li></ul>
    <iframe class="mapa" title="Mapa do Grupo Luxtel em Mauá/SP" loading="lazy" src="https://maps.google.com/maps?q=${q}&z=15&output=embed"></iframe></div>
  <div class="sobe caixa-form"><form class="form" data-email="${E.email}" data-assunto="Contato pelo site">
    <div class="form-duas"><label>Nome *<input name="nome" required autocomplete="name"></label><label>Empresa<input name="empresa" autocomplete="organization"></label></div>
    <div class="form-duas"><label>Telefone *<input name="fone" type="tel" required autocomplete="tel"></label><label>E-mail *<input name="email" type="email" required autocomplete="email"></label></div>
    <div class="form-duas"><label>Produto<select name="produto"><option>Reservatório cilíndrico</option><option>Reservatório vertical</option><option>Cisterna</option><option>Anéis de vedação</option><option>Equipamento para ETE/ETA</option><option>Biomídia MBBR</option><option>Perfis, guarda-corpo ou grade de piso</option><option>Outro</option></select></label><label>Volume ou medidas<input name="volume" placeholder="Ex.: 20.000 litros"></label></div>
    <label>Mensagem *<textarea name="mensagem" rows="5" required></textarea></label>
    <button class="btn" type="submit">${ic('mail')} Enviar mensagem</button>
    <p class="form-nota">Abre o seu e-mail com a mensagem pronta para ${E.email}.</p>
  </form></div>
</div></section>` + rodape(v);
}

function inicioA() {
  const v = 'a';
  return head(v, 'index', '', 'Grupo Luxtel: reservatórios, cisternas e equipamentos em PRFV para construção civil e saneamento, perfis pultrudados e guarda-corpos. Mauá/SP, desde 1992.') + topo(v, 'index') + `
<section class="heroa">
  <div class="in ha-grade">
    <div class="ha-txt">
      ${sobre('Soluções em PRFV · Mauá/SP')}
      <h1>Reservatórios em fibra <em>feitos para durar.</em></h1>
      <p class="ha-sub">Reservatórios, cisternas e equipamentos para saneamento em poliéster reforçado com fibra de vidro, sob medida, com laboratório próprio e frota para entregar na obra.</p>
      <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'construcao')}">Ver reservatórios</a></p>
    </div>
    <div class="ha-prod">${imgTopo('vert-0', 'Reservatórios verticais Luxtel em condomínio')}<span class="ha-tag"><b>16 milhões de litros</b>de armazenamento vendidos por ano</span></div>
  </div>
</section>
<section class="faixa"><div class="in"><span>${ic('check')}Desde 1992</span><span>${ic('check')}Credenciada Sabesp e Sanepar</span><span>${ic('check')}Laboratório interno</span><span>${ic('check')}Frota própria</span></div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Soluções')}<h2>Da caixa d’água à estação de tratamento</h2></div>
  ${gradeLinhas(v)}
</div></section>
<section class="sec sec-cinza"><div class="in duas">
  <figure class="sobe">${img('cil-2', 'Reservatório cilíndrico Luxtel')}</figure>
  <div class="sobe">${sobre('Filament winding')}<h2>Até duas vezes mais resistente</h2>
  <p>O enrolamento filamentar é o processo mais tecnológico do mercado: automatizado, repetível e com material até duas vezes mais resistente que o PRFV tradicional. E a maior gama de diâmetros, de 1,60 a 3,80 m.</p>
  <a class="link-seta" href="${link(v, 'construcao')}#cilindricos">Reservatórios cilíndricos ${ic('seta')}</a></div>
</div></section>
<section class="sec sec-escura"><div class="in">${sobre('Grupo Luxtel em números')}<h2 class="sobe">30 anos de fibra de vidro</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Qualidade e diferenciais')}<h2>Por que a Luxtel</h2></div>
  ${gradeDif()}
</div></section>
` + chamada(v) + rodape(v);
}

function inicioB() {
  const v = 'b';
  return head(v, 'index', '', 'Grupo Luxtel: mais de 30 anos fabricando reservatórios e equipamentos em fibra de vidro (PRFV) para construção civil e saneamento.') + topo(v, 'index') + `
<section class="herob">
  <div class="hb-foto">${imgTopo('ete-5', 'Reservatórios horizontais em PRFV na fábrica Luxtel')}</div>
  <div class="in"><div class="hb-txt">
    ${sobre('Grupo Luxtel · Acima de tudo')}
    <h1>Fibra de vidro <em>para água, esgoto e química.</em></h1>
    <p class="hb-sub">Reservatórios sob medida, equipamentos para ETEs e ETAs, perfis e guarda-corpos que não oxidam.</p>
    <p class="ha-acoes"><a class="btn" href="${link(v, 'contato')}">Pedir orçamento</a><a class="btn btn-linha" href="${link(v, 'saneamento')}">Saneamento</a></p>
    <div class="hb-selo"><div><b>1992</b><span>fundação</span></div><div><b>4</b><span>unidades fabris</span></div><div><b>2 mi L</b><span>de esgoto tratado por dia</span></div></div>
  </div></div>
</section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Onde a Luxtel está')}<h2>Três frentes em PRFV</h2></div>
  ${gradeLinhas(v)}
</div></section>
<section class="lado">
  <figure>${img('cist-1', 'Instalação de cisterna Luxtel')}</figure>
  <div class="sobe">${sobre('Cisternas')}<h2>Chega pronta e vai direto para a vala</h2>
  <p>De 1.000 a 100.000 litros, sem obra nem tempo de cura. Sem lençol freático, basta reaterro compactado.</p>
  <p><a class="link-seta" href="${link(v, 'construcao')}#cisternas">Ver cisternas ${ic('seta')}</a></p></div>
</section>
<section class="sec sec-escura"><div class="in">${sobre('Em números')}<h2 class="sobe">Produção em escala</h2>${numeros()}</div></section>
<section class="sec"><div class="in">
  <div class="sec-cab sobe">${sobre('Na obra')}<h2>Entregue com frota própria</h2></div>
  <div class="galeria">${[['ete-6', 'Tanque no caminhão'], ['vert-1', 'Reservatórios com escada'], ['perfil-3', 'Escada em PRFV'], ['anel-4', 'Anel de vedação instalado']].map(f => foto(f[0], f[1])).join('')}</div>
</div></section>
` + chamada(v) + rodape(v);
}

const paginas = (v, inicio) => ({ index: inicio(), empresa: empresa(v), construcao: construcao(v), saneamento: saneamento(v), perfis: perfis(v), contato: contato(v) });

copiarSiteJs(pub, '');
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', paginas('a', inicioA));
escreverVersao(pub, 'b', paginas('b', inicioB));
await escolha(pub, {
  nome: 'Grupo Luxtel', artigo: 'do', url: E.url, lang: 'pt', cor: '#760c16', fundo: '#22272d', claro: '#f3f4f6',
  fonteTitulo: "'Fira Sans',system-ui,sans-serif", fonteTexto: "'Fira Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Clara, abre com os reservatórios verticais e explica o filament winding.', pontos: ['Construção civil, saneamento e perfis em páginas próprias', 'Diferenciais e números', 'Fotos reais de obras'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Grafite e vinho, abre com os tanques na fábrica e destaca cisternas e frota.', pontos: ['Fábrica em tela cheia', 'Cisternas em destaque', 'Mesmas páginas de produto'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
