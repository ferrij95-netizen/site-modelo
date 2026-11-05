// Agro Norte Pesquisa e Sementes (Sinop/MT): cultivares de arroz, soja, feijão, milheto e capim coracana desde 1994. Gera public/{a,b}/ e a página de escolha.
// node clientes/agronorte/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs agronorte https://www.agronorte.com.br/)
// Textos, fichas técnicas (produtos.json), unidades, linha do tempo, meio ambiente, vagas e fotos: do site atual.
import { esc, ic, icWa, cabeca, link, menuItens, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const PROD = JSON.parse(fs.readFileSync(path.join(aqui, 'produtos.json'), 'utf8'));

const E = {
  nome: 'Agro Norte', url: 'https://agronorte.overtus.com.br/', antigo: 'https://www.agronorte.com.br/',
  fone: '(66) 3517-1900', wa: '556635171900', email: 'contato@agronorte.com.br', rh: 'curriculos@agronorte.com.br',
  cnpj: '27.119.516/0001-06', insta: 'https://www.instagram.com/agronorte/', face: 'https://www.facebook.com/agronortepesquisaesementes/',
};
const UNID = [
  { nome: 'Escritório · Matriz', cidade: 'Sinop – MT', end: 'Rua Colonizador Ênio Pipino, 5717, Setor Industrial Norte (em frente ao Atacadão)', fones: ['(66) 3517-1900', '(66) 99985-4987'], foto: 'un-matriz.webp' },
  { nome: 'Unidade de Beneficiamento', cidade: 'Sinop – MT', end: 'BR-163, km 852, s/n, Zona Rural · CEP 78.550-001', fones: ['(66) 3517-1900'], foto: 'un-ubssinop.webp' },
  { nome: 'Filial Pato Branco', cidade: 'Pato Branco – PR', end: 'PR-493, km 4, s/n, Passo da Pedra', fones: ['(46) 3122-5200', '(46) 99121-9427'], foto: 'un-patobranco.webp' },
  { nome: 'Filial Unaí', cidade: 'Unaí – MG', end: 'Avenida Moema, 271, Kamayura', fones: ['(34) 99828-0860', '(34) 99825-2941'], foto: 'un-unai.webp' },
];
const FONTES = 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&display=swap';
const IMG = '/assets/img/';

const CULT = [
  { id: 'arroz', nome: 'Arroz', txt: 'Alto potencial produtivo, grão longo fino translúcido e alto rendimento de inteiros.' },
  { id: 'soja-convencional', nome: 'Soja convencional', txt: 'Genética própria campeã de produtividade, inclusive em solos de baixa fertilidade.' },
  { id: 'soja-transgenica', nome: 'Soja transgênica', txt: 'Soja RR com alta produtividade, sanidade e tolerância à chuva na colheita.' },
  { id: 'feijao-carioca', nome: 'Feijão carioca', txt: 'Porte ereto para colheita mecanizada e grão que demora a escurecer na prateleira.' },
  { id: 'feijao-preto', nome: 'Feijão preto', txt: 'Ciclo de 88 dias e grão oblongo de boa qualidade.' },
  { id: 'milheto', nome: 'Milheto', txt: 'Dupla aptidão: grãos, pastagem e cobertura de solo para todo o Brasil.' },
  { id: 'capim-coracana', nome: 'Capim coracana', txt: 'Forragem e grãos, com alta capacidade de perfilhamento.' },
];
const porCult = id => PROD.filter(p => p.cat === id);
const chave = p => {
  const s = p.specs.find(([a]) => /potencial|produtividade/i.test(a)) || p.specs.find(([a]) => /colheita/i.test(a) && /ciclo/i.test(a)) || p.specs.find(([a]) => /ciclo/i.test(a)) || p.specs[0];
  const v = s[1].replace(/\b(\d)(\d{3})\b/g, '$1.$2').replace(' à ', ' a ');
  return { r: s[0].replace(/\s*\(.*?\)\**/, '').replace(/\*+/g, ''), v: v + (/\(kg\/ha\)/i.test(s[0]) && !/kg/i.test(v) ? ' kg/ha' : '') };
};
const resumo = p => p.desc[0] || (p.specs.find(([a]) => /dupla aptid/i.test(a)) ? `Dupla aptidão: ${p.specs.find(([a]) => /dupla aptid/i.test(a))[1].toLowerCase()}.` : CULT.find(c => c.id === p.cat).txt);

const C = {
  sobre: 'A Agro Norte Pesquisa e Sementes é uma empresa mato-grossense com abrangência nacional, fundada em 1994 com a missão de desenvolver e comercializar novas cultivares, tecnologias e sistemas de produção para os agricultores, visando o aumento da rentabilidade e a sustentabilidade das propriedades agrícolas.',
  sobre2: 'O investimento realizado durante seus 32 anos em <b>melhoramento genético</b>, aliado a uma <b>visão de mercado</b>, foi essencial para o desenvolvimento de um acervo genético de diversas culturas campeãs de produtividade: arroz, soja convencional, soja transgênica, feijão, milheto e capim coracana.',
  sobre3: 'Com matriz no Mato Grosso, no Centro-Oeste brasileiro, a Agro Norte tem abrangência nacional no desenvolvimento, produção e comercialização de produtos que se estendem de norte a sul do país.',
  missao: 'Desenvolver e comercializar novas cultivares, novas tecnologias e sistemas de produção para os agricultores, visando o aumento da rentabilidade e a sustentabilidade das propriedades agrícolas.',
  visao: 'Ser referência como uma empresa de geração de inovação em diferentes culturas e reconhecida como um elo importante no desenvolvimento do agronegócio brasileiro, participando ativamente na produção de alimentos mundial.',
  valores: ['Inovação', 'Entusiasmo', 'Respeito', 'Trabalho em equipe', 'Honestidade'],
  linha: [
    ['1994', 'A Agro Norte inicia suas atividades.'], ['2005', 'Ampliação da estrutura de sementes.'], ['2011', 'Lançamento do arroz ANa Cambará.'],
    ['2012', 'Lançamento do feijão ANfc 9.'], ['2013', 'Lançamento do feijão ANfc 5.'], ['2014', 'Lançamento das sojas ANsc 83022 e ANrr 85509.'],
    ['2019', 'Lançamento do arroz ANa 9005 CL e inauguração da filial Pato Branco – PR.'], ['2023', 'Inauguração da filial Unaí – MG e lançamento do feijão ANfc 22.'],
    ['2024', 'Lançamento dos arrozes ANa 9013CL e ANa 10008CL.'], ['2026', 'Lançamento do feijão carioca ANfc 29.'],
  ],
  corredores: [
    'O uso e a ocupação do solo nas propriedades da Agro Norte levaram em consideração os conceitos de corredores biológicos como parte da nossa visão de agricultura sustentável. Desse sistema já fazem parte a rotação de cultura (arroz, soja, milho, milheto, pé-de-galinha, sorgo, feijão, capim sudão e gado de corte), o plantio direto na palha e o manejo integrado de pragas, doenças e ervas daninhas.',
    'A base do nosso uso e ocupação é estudar o mosaico de solos e vegetação das propriedades e separar solos agricultáveis, áreas de preservação permanente (nascentes, margens de rios, reserva legal), áreas de declive acentuado, texturas arenosas e outras.',
    'Os talhões de cultivo <b>não ultrapassam 350 hectares</b> e são separados por <b>corredores de vegetação nativa de 100 a 150 metros de largura</b>, que ligam as diferentes áreas de conservação da propriedade. As áreas em torno de nascentes e matas ciliares são sempre maiores que as exigidas pela legislação, porque o "efeito de borda" protege melhor a biodiversidade e o fluxo de genes animal e vegetal.',
    'Os corredores se fundamentam nas duas teorias que embasam a conservação da biodiversidade, a Biogeografia de Ilhas e as Metapopulações: fragmentos de mata isolados guardam menos espécies e têm fluxo genético limitado, e os corredores permitem que animais e insetos circulem e disseminem sementes da flora nativa entre fragmentos.',
    'Nosso conceito de produção é integrado à conservação dos recursos naturais: produzimos mais e melhor, e a fauna e a flora locais são parte do nosso sistema, com a certeza de que nossos filhos, netos e os filhos deles continuarão a produzir e a conhecer a diversidade natural que encontramos quando chegamos aqui.',
  ],
  beneficios: ['Quebra-vento natural', 'Separam os talhões e evitam a disseminação de pragas e doenças', 'Zona de refúgio para os inimigos naturais das pragas', 'Animais silvestres transitam sem cruzar a lavoura, evitando perdas e acidentes', 'Árvores frutíferas e melíferas da própria região', 'Dispensam o replantio de espécies exóticas para quebra-vento'],
  silvicultura: 'A silvicultura tem papel importante no reflorestamento e atua contra a erosão, a desertificação e o enfraquecimento do solo. A Agro Norte desenvolve agrossilvicultura com o plantio de espécies frutíferas, melíferas e essências florestais em faixas de 25 a 50 metros. A produção de frutas e mel é destinada ao consumo interno e à venda para a comunidade local, e os animais que transitam pelos corredores encontram alimento em diferentes épocas do ano.',
  frutas: 'manga, cajá, laranja, caju, jaca, abacate, jabuticaba, mangostão, rambutão, lichia, banana, mamão, goiaba, pupunha, coco, fruta-pão, tamarindo, abiu, ingá, cupuaçu, pinha, fruta-do-conde, açaí, araçá, bacaba e jambo',
  arvores: 'ipês rosa e amarelo, mogno, seringueira, guanandi, itaúba, chichá, cumaru, peroba mica, fava-d’anta, jatobá, cedro-rosa, teca, cerejeira, mirindiba, aroeira, bacupari, castanheira e pau-de-balsa',
  vagas: [
    { t: 'Analista comercial', req: ['Formação em Administração, Agronegócio, Gestão Comercial ou áreas correlatas', 'Conhecimento sobre mercado agrícola, insumos e sementes (diferencial)', 'Habilidade de negociação e atendimento ao cliente', 'Disponibilidade para viagens'], atr: ['Prospecção, negociação e fechamento de negócios com clientes do setor agropecuário', 'Relacionamento com produtores rurais, cooperativas e revendas', 'Análises de mercado e identificação de oportunidades', 'Propostas comerciais e acompanhamento da carteira de clientes'] },
    { t: 'Analista de TI', req: ['Ensino superior completo ou cursando em TI', 'Experiência na função', 'Disponibilidade de horários e viagens', 'Experiência com sistema Senior (diferencial)'], atr: ['Suporte técnico aos usuários, presencial e remoto', 'Infraestrutura de rede, servidores e sistemas', 'Segurança e integridade dos dados (backup, antivírus, acessos)', 'Manutenção preventiva e corretiva de equipamentos'] },
    { t: 'Assistente administrativo', req: ['Disponibilidade para residir na fazenda', 'Ensino médio completo (desejável superior)', 'Experiência na área administrativa', 'Organização, responsabilidade e atenção aos detalhes'], atr: ['Acompanhar carregamentos', 'Controle de abastecimento', 'Lançamento e emissão de notas fiscais', 'Controle de estoque de insumos, combustível e peças'] },
    { t: 'Analista de sementes', req: ['Experiência ou formação na área de laboratório de sementes', 'Organização e atenção aos procedimentos de qualidade'], atr: ['Análises de qualidade de sementes', 'Coleta, identificação e preparo de amostras', 'Registro de resultados e documentos laboratoriais', 'Cumprimento de normas e procedimentos de qualidade'] },
  ],
  noticias: [
    { d: '19/06/2026', t: 'Lançamento da nova variedade de feijão carioca ANfc 29', r: 'Feijão precoce, com 90 dias de ciclo, para encaixar na rotação de culturas: o maior percentual de peneira 12, escurecimento lento e caldo excepcional.', p: 'anfc-29' },
    { d: '21/07/2024', t: 'Novas variedades de arroz ANa 9013CL e ANa 10008CL chegam ao mercado', r: 'O ANa 9013CL tem porte médio e excelente sanidade; o ANa 10008CL é longo fino, com excelente perfilhamento e maior rendimento de grãos inteiros. Ambos com tecnologia Clearfield.' },
    { d: '31/08/2023', t: 'Agro Norte lança o feijão ANfc 22, de porte ereto e grão de qualidade', r: 'Porte ereto que facilita a colheita, potencial de 4.800 kg/ha, adaptação às regiões Sul, Sudeste e Centro-Oeste e mais tempo de prateleira sem escurecer.', p: 'anfc-22' },
    { d: '2024', t: 'Comunicado à cadeia do feijão', r: 'A cultivar ANfc 22 passou por nove anos de seleção genética (2013 a 2022) e dois anos de desenvolvimento de mercado em vários estados antes da multiplicação de sementes em Minas Gerais.' },
  ],
};

const NAV = [
  { slug: 'index', nome: 'Início' }, { slug: 'institucional', nome: 'Institucional' }, { slug: 'produtos', nome: 'Produtos' },
  { slug: 'imprensa', nome: 'Imprensa' }, { slug: 'meio-ambiente', nome: 'Meio ambiente' }, { slug: 'trabalhe-conosco', nome: 'Trabalhe conosco' }, { slug: 'contato', nome: 'Contato' },
];
const desc = {
  index: 'Agro Norte Pesquisa e Sementes: cultivares próprias de arroz, soja convencional e transgênica, feijão, milheto e capim coracana desde 1994. Matriz em Sinop/MT.',
  institucional: 'Empresa mato-grossense fundada em 1994. Missão, visão, valores, linha do tempo e unidades em Sinop, Pato Branco e Unaí.',
  produtos: 'Cultivares Agro Norte com ficha técnica: arroz, soja convencional, soja transgênica, feijão carioca, feijão preto, milheto e capim coracana.',
  imprensa: 'Notícias, lançamentos, agenda de dias de campo e vídeos da Agro Norte.',
  'meio-ambiente': 'Corredores biológicos e agrossilvicultura nas propriedades da Agro Norte.',
  'trabalhe-conosco': 'Vagas, programa trainee e banco de talentos da Agro Norte, inclusive para pessoas com deficiência.',
  contato: 'Fale com a Agro Norte: (66) 3517-1900, contato@agronorte.com.br. Sinop – MT, Pato Branco – PR e Unaí – MG.',
};
const titulos = { index: 'Agro Norte · Pesquisa e Sementes', institucional: 'Institucional · Agro Norte', produtos: 'Produtos · Agro Norte', imprensa: 'Imprensa · Agro Norte', 'meio-ambiente': 'Meio ambiente · Agro Norte', 'trabalhe-conosco': 'Trabalhe conosco · Agro Norte', contato: 'Contato · Agro Norte' };
for (const p of PROD) { titulos[`produtos/${p.slug}`] = `${p.nome} · ${CULT.find(c => c.id === p.cat).nome} · Agro Norte`; desc[`produtos/${p.slug}`] = `${p.nome}, ${CULT.find(c => c.id === p.cat).nome.toLowerCase()} Agro Norte: ${resumo(p)}`.slice(0, 300); }

const fig = (src, alt, cls = '') => `<img${cls ? ` class="${cls}"` : ''} src="${IMG}${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const logo = `<img class="logo" src="${IMG}logo.webp" alt="Agro Norte Pesquisa e Sementes" width="400" height="127">`;
const msgWa = (extra = '') => `Olá! Vim pelo site da Agro Norte${extra ? ` e quero saber sobre ${extra}` : ''}.`;

function topo(v, ativo) {
  const at = ativo.startsWith('produtos') ? 'produtos' : ativo;
  return `<header class="topo">
  <div class="faixa"><div class="in faixa-in">
    <span>Pesquisa e sementes desde 1994 · Sinop – MT</span>
    <span class="faixa-dir"><a href="mailto:${E.email}">${ic('mail')} ${E.email}</a><a href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></span>
  </div></div>
  <div class="in topo-in">
    <a class="marca" href="${link(v, 'index')}">${logo}</a>
    <nav aria-label="Principal"><ul class="menu">${menuItens(v, NAV.slice(1), at)}</ul></nav>
    <a class="btn topo-cta" href="${waHref(E.wa, msgWa('um orçamento de sementes'))}" target="_blank" rel="noopener">${icWa()} Orçamento</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false">${ic('menu')}</button>
  </div>
</header>
<main id="conteudo">`;
}

function rodape(v) {
  return `</main>
<section class="cta"><div class="in cta-in">
  <div><p class="sobre">Solicite seu orçamento</p><h2>Qual cultivar vai para a sua lavoura nesta safra?</h2><p>A equipe comercial indica a variedade certa para a sua região e o seu sistema de produção.</p></div>
  <div class="cta-bts"><a class="btn" href="${waHref(E.wa, msgWa('um orçamento de sementes'))}" target="_blank" rel="noopener">${icWa()} WhatsApp</a><a class="btn btn-linha" href="${telHref(E.fone)}">${ic('tel')} ${E.fone}</a></div>
</div></section>
<footer class="rodape"><div class="in rodape-in">
  <div class="rodape-marca"><span class="logo-fundo">${logo}</span><p>Desenvolvemos e comercializamos novas cultivares, tecnologias e sistemas de produção para o agricultor brasileiro desde 1994.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a></p></div>
  <div><h3>Culturas</h3><ul>${CULT.map(c => `<li><a href="${link(v, 'produtos')}#${c.id}">${c.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Empresa</h3><ul>${NAV.slice(1).filter(n => n.slug !== 'produtos').map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
  <div><h3>Contato</h3><p><a href="${telHref(E.fone)}">${E.fone}</a><br><a href="mailto:${E.email}">${E.email}</a></p><p>Escritório: Rua Colonizador Ênio Pipino, 5717, Setor Industrial Norte, Sinop – MT</p><p>Beneficiamento: BR-163, km 852, Sinop – MT</p></div>
</div><div class="in rodape-fim"><span>© ${new Date().getFullYear()} Agro Norte Pesquisa e Sementes Ltda · CNPJ ${E.cnpj}</span><span>Prévia de site por Overtus</span></div></footer>
<a class="wa-flutua" href="${waHref(E.wa, msgWa())}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${icWa()}</a>
</body></html>`;
}

const pagina = (v, slug, corpo) => cabeca({ E, v, slug, titulo: titulos[slug], descricao: desc[slug], fontes: FONTES, css: ['base.css', `${v}.css`], cor: '#0a7d10' }) + topo(v, slug) + corpo + rodape(v);
const cabecalhoPg = (v, trilha, titulo, texto, foto) => `<section class="pg-topo">${foto ? `<div class="pg-foto" style="background-image:url(${IMG}${foto})"></div>` : ''}<div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a>${trilha.map(([n, s]) => s ? ` / <a href="${link(v, s)}">${n}</a>` : ` / ${esc(n)}`).join('')}</p>
  <h1>${titulo}</h1>${texto ? `<p class="pg-lead">${texto}</p>` : ''}
</div></section>`;

// ---------- blocos ----------
const cartaoProd = v => p => { const k = chave(p); return `<li class="sobe"><a class="prod" href="${link(v, `produtos/${p.slug}`)}">${p.lancamento ? '<span class="selo-lanc">Lançamento</span>' : ''}<span class="prod-cult">${CULT.find(c => c.id === p.cat).nome}</span><strong class="prod-nome">${p.nome}</strong><span class="prod-k"><b>${esc(k.v)}</b> ${esc(k.r.toLowerCase())}</span><span class="link-seta">Ficha técnica ${ic('seta')}</span></a></li>`; };
const culturas = v => `<ul class="cults">${CULT.map((c, i) => `<li class="sobe" style="--i:${i}"><a href="${link(v, 'produtos')}#${c.id}"><span class="cult-grao">${fig(`cat-${c.id}.webp`, `Grãos de ${c.nome.toLowerCase()}`)}</span><span class="cult-nome">${c.nome}</span><span class="cult-n">${porCult(c.id).length} ${porCult(c.id).length > 1 ? 'cultivares' : 'cultivar'}</span></a></li>`).join('')}</ul>`;
const linhaTempo = `<ol class="linha">${C.linha.map(([a, t], i) => `<li class="sobe" style="--i:${i}"><b>${a}</b><p>${t}</p></li>`).join('')}</ol>`;
const unidades = `<ul class="unids">${UNID.map(u => `<li class="sobe">${fig(u.foto, u.nome)}<div><p class="u-cid">${u.cidade}</p><h3>${u.nome}</h3><p>${u.end}</p>${u.fones.map(f => `<a href="${telHref(f)}">${ic('tel')} ${f}</a>`).join('')}</div></li>`).join('')}</ul>`;
const lancamento = v => { const p = PROD.find(x => x.slug === 'anfc-29'); return `<div class="lanc-in">
  <figure class="lanc-foto sobe">${fig(p.fotos[2], 'Grãos do feijão carioca ANfc 29')}</figure>
  <div class="sobe"><p class="sobre">Lançamento 2026 · Feijão carioca</p>${fig(p.marca, 'ANfc 29', 'lanc-marca')}<p class="lanc-lead">${p.desc[0]}</p><ul class="checks">${p.lista.map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>
  <div class="lanc-dados">${[['Ciclo', '90 a 95 dias'], ['Potencial', '4.800 kg/ha'], ['Porte', 'Ereto']].map(([a, b]) => `<span><b>${b}</b>${a}</span>`).join('')}</div>
  <a class="btn" href="${link(v, 'produtos/anfc-29')}">Ver ficha técnica ${ic('seta')}</a></div>
</div>`; };
const video = `<a class="video" href="https://www.youtube.com/watch?v=ebIukBghq1g" target="_blank" rel="noopener">${fig('video-arroz.webp', 'Vídeo: lançamentos de arroz ANa 9013CL e ANa 10008CL')}<span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span><span class="video-t">Assista: lançamentos de arroz ANa 9013CL e ANa 10008CL</span></a>`;
const formOrc = (produto = '') => `<form class="form" id="form" data-wa="${esc(msgWa(produto || 'sementes'))}">
  <div class="form-duas"><label>Nome*<input name="nome" required autocomplete="name"></label><label>Cidade e estado*<input name="cidade" required placeholder="Ex.: Sinop – MT"></label></div>
  <div class="form-duas"><label>Telefone*<input name="telefone" type="tel" required autocomplete="tel"></label><label>Cultura<select name="cultura"><option value="">Selecione</option>${CULT.map(c => `<option${produto && PROD.find(p => p.nome === produto)?.cat === c.id ? ' selected' : ''}>${c.nome}</option>`).join('')}</select></label></div>
  <div class="form-duas"><label>Cultivar<input name="cultivar" value="${esc(produto)}" placeholder="Ex.: ANfc 29"></label><label>Área (ha)<input name="area" inputmode="numeric"></label></div>
  <label>Mensagem<textarea name="mensagem" rows="4"></textarea></label>
  <button class="btn" type="submit">${icWa()} Enviar pelo WhatsApp</button>
  <p class="form-nota">A mensagem abre no WhatsApp da Agro Norte, ${E.fone}.</p>
</form>`;

// ---------- páginas internas ----------
function paginaInst(v) {
  return cabecalhoPg(v, [['Institucional']], 'Resumo da nossa história', 'Empresa mato-grossense com abrangência nacional, fundada em 1994.', 'aerea-sede.webp') + `
<section class="sec inst"><div class="in inst-in">
  <div class="sobe inst-txt"><p class="inst-lead">${C.sobre}</p><p>${C.sobre2}</p><p>${C.sobre3}</p></div>
  <figure class="sobe inst-foto">${fig('parcelas.webp', 'Parcelas experimentais de melhoramento genético')}<figcaption>Parcelas experimentais de melhoramento genético</figcaption></figure>
</div></section>
<section class="sec mvv"><div class="in mvv-grade">
  <div class="mvv-col sobe"><h2>Missão</h2><p>${C.missao}</p></div>
  <div class="mvv-col sobe"><h2>Visão</h2><p>${C.visao}</p></div>
  <div class="mvv-col sobe"><h2>Valores</h2><ul class="valores">${C.valores.map(x => `<li>${x}</li>`).join('')}</ul></div>
</div></section>
<section class="sec linha-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Linha do tempo</p><h2>História da Agro Norte Pesquisa e Sementes</h2></div>${linhaTempo}</div></section>
<section class="sec unids-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Nossas unidades</p><h2>Do Mato Grosso para o Paraná e Minas Gerais</h2></div>${unidades}</div></section>`;
}

function paginaProdutos(v) {
  return cabecalhoPg(v, [['Produtos']], 'Nossos produtos', `${PROD.length} cultivares de genética própria, com ficha técnica completa. As informações podem variar de acordo com a região de cultivo: consulte sempre um engenheiro agrônomo.`, 'faixa-lavoura.webp') + `
<nav class="cult-nav"><div class="in">${CULT.map(c => `<a href="#${c.id}">${c.nome}</a>`).join('')}</div></nav>
${CULT.map((c, i) => `<section class="sec cult-sec${i % 2 ? ' cult-alt' : ''}" id="${c.id}"><div class="in cult-sec-in">
  <div class="cult-cab sobe">${fig(`cat-${c.id}.webp`, c.nome, 'cult-cab-img')}<div><p class="sobre">${porCult(c.id).length} ${porCult(c.id).length > 1 ? 'cultivares' : 'cultivar'}</p><h2>${c.nome}</h2><p>${c.txt}</p></div></div>
  <ul class="prods">${porCult(c.id).map(cartaoProd(v)).join('')}</ul>
</div></section>`).join('')}`;
}

function paginaProduto(v, p) {
  const c = CULT.find(x => x.id === p.cat);
  const irmaos = porCult(p.cat).filter(x => x !== p);
  return `<section class="pd-topo"><div class="in">
  <p class="trilha"><a href="${link(v, 'index')}">Início</a> / <a href="${link(v, 'produtos')}">Produtos</a> / <a href="${link(v, 'produtos')}#${c.id}">${c.nome}</a> / ${esc(p.nome)}</p>
  <div class="pd-cab"><div><p class="sobre">${c.nome}${p.lancamento ? ' · Lançamento' : ''}</p><h1>${p.nome}</h1>${fig(p.marca, `Marca ${p.nome}`, 'pd-marca')}</div><a class="btn" href="${waHref(E.wa, msgWa(p.nome))}" target="_blank" rel="noopener">${icWa()} Pedir orçamento</a></div>
</div></section>
<section class="sec pd"><div class="in pd-in">
  <div class="pd-txt sobe">${p.desc.map(d => `<p>${d}</p>`).join('') || `<p>${resumo(p)}</p>`}${p.lista.length ? `<ul class="checks">${p.lista.map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul>` : ''}
    <h2 class="pd-sub">Ficha técnica</h2>
    <dl class="ficha">${p.specs.map(([a, b]) => `<div><dt>${esc(a.replace(/\*+$/, ''))}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>
    <p class="nota">As informações podem variar de acordo com a região de cultivo. Consulte sempre um engenheiro agrônomo.</p>
  </div>
  <aside class="pd-lado sobe">
    <div class="pd-fotos">${p.fotos.map((f, i) => `<a href="${IMG}${f}" data-foto${i === 0 ? ' class="pd-f1"' : ''}>${fig(f, `${p.nome} no campo`)}</a>`).join('')}</div>
    ${irmaos.length ? `<nav class="pd-outros" aria-label="Outras cultivares"><h3>Outras cultivares de ${c.nome.toLowerCase()}</h3><ul>${irmaos.map(x => `<li><a href="${link(v, `produtos/${x.slug}`)}">${x.nome} ${ic('seta')}</a></li>`).join('')}</ul></nav>` : ''}
  </aside>
</div></section>`;
}

function paginaImprensa(v) {
  return cabecalhoPg(v, [['Imprensa']], 'Imprensa', 'Lançamentos, comunicados, agenda de dias de campo e vídeos.', 'colheita-arroz.webp') + `
<section class="sec imp"><div class="in imp-in">
  <div><div class="sec-tit sobe"><p class="sobre">Notícias</p><h2>Da Agro Norte</h2></div>
    <ul class="noticias">${C.noticias.map(n => `<li class="sobe"><time>${n.d}</time><h3>${n.t}</h3><p>${n.r}</p>${n.p ? `<a class="link-seta" href="${link(v, `produtos/${n.p}`)}">Ver a cultivar ${ic('seta')}</a>` : ''}</li>`).join('')}</ul></div>
  <aside class="imp-lado">
    <div class="agenda sobe"><p class="sobre">Agenda</p>${fig('dia-de-campo.webp', 'Tour técnico do feijão')}<h3>Tour técnico do feijão na Fazenda São José, Vera – MT</h3><p>A Agro Norte apresentou as novas variedades de feijão carioca ANfc 22 e ANfc 29, campeãs de produtividade que acabaram de chegar ao mercado.</p></div>
    <div class="sobe">${video}</div>
  </aside>
</div></section>`;
}

function paginaAmbiente(v) {
  return cabecalhoPg(v, [['Meio ambiente']], 'Meio ambiente', 'Produzir mais e melhor com a fauna e a flora locais como parte do sistema.', 'aerea-sede.webp') + `
<section class="sec amb"><div class="in amb-in">
  <article class="sobe amb-txt"><p class="sobre">Corredores biológicos</p><h2>Talhões de até 350 ha entre faixas de mata nativa</h2>${C.corredores.map(p => `<p>${p}</p>`).join('')}</article>
  <aside class="amb-lado sobe">
    <div class="amb-num"><span><b>350 ha</b>tamanho máximo do talhão</span><span><b>100 a 150 m</b>largura dos corredores nativos</span><span><b>25 a 50 m</b>faixas de agrossilvicultura</span></div>
    <div class="amb-ben"><h3>Benefícios para o agricultor</h3><ul class="checks">${C.beneficios.map(x => `<li>${ic('check')} ${x}</li>`).join('')}</ul></div>
  </aside>
</div></section>
<section class="sec silvi"><div class="in silvi-in">
  <div class="sobe"><p class="sobre">Silvicultura</p><h2>Frutas, mel e madeira nas faixas de borda</h2><p>${C.silvicultura}</p></div>
  <div class="silvi-listas sobe"><div><h3>Frutíferas</h3><p>${C.frutas}.</p></div><div><h3>Essências florestais e melíferas</h3><p>${C.arvores}.</p></div></div>
</div></section>`;
}

function paginaTrabalhe(v) {
  return cabecalhoPg(v, [['Trabalhe conosco']], 'Trabalhe conosco', 'Vagas abertas, programa trainee e banco de talentos. Todas as vagas também para pessoas com deficiência.', 'parcelas.webp') + `
<section class="sec vagas-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Vagas disponíveis</p><h2>Venha crescer com a genética Agro Norte</h2></div>
  <ul class="vagas">${C.vagas.map(x => `<li class="sobe"><details><summary><h3>${x.t}</h3><span class="vaga-pcd">Também para PCD</span>${ic('seta')}</summary><div class="vaga-corpo"><div><h4>Requisitos</h4><ul>${x.req.map(r => `<li>${r}</li>`).join('')}</ul></div><div><h4>Atribuições</h4><ul>${x.atr.map(r => `<li>${r}</li>`).join('')}</ul></div></div></details></li>`).join('')}</ul>
</div></section>
<section class="sec rh"><div class="in rh-in">
  <div class="sobe"><p class="sobre">Banco de talentos · PCD</p><h2>Diversidade e inclusão</h2><p>Nosso banco de talentos para pessoas com deficiência reflete o compromisso com a diversidade e a inclusão, com oportunidades iguais a todos e um ambiente de trabalho mais acolhedor.</p><p>Também mantemos o <b>programa trainee</b> e vagas de <b>técnico agrícola</b> e estágio.</p></div>
  <div class="rh-envio sobe"><h3>Envie seu currículo</h3><p>Mande o currículo e a ficha de seleção preenchida para o e-mail do RH, informando a vaga de interesse.</p><a class="btn" href="mailto:${E.rh}?subject=${encodeURIComponent('Currículo pelo site')}">${ic('mail')} ${E.rh}</a></div>
</div></section>`;
}

function paginaContato(v) {
  return cabecalhoPg(v, [['Contato']], 'Fale conosco', 'Envie sua mensagem e a Agro Norte retorna em breve.', null) + `
<section class="sec cont-sec"><div class="in cont-in">
  <div class="sobe"><h2>Peça seu orçamento</h2>${formOrc()}</div>
  <aside class="cont-info sobe"><ul>
    <li>${icWa()}<div><b>WhatsApp</b><a href="${waHref(E.wa, msgWa())}" target="_blank" rel="noopener">${E.fone}</a></div></li>
    <li>${ic('tel')}<div><b>Telefone</b><a href="${telHref(E.fone)}">${E.fone}</a></div></li>
    <li>${ic('mail')}<div><b>E-mail</b><a href="mailto:${E.email}">${E.email}</a></div></li>
    <li>${ic('usuarios')}<div><b>Currículos</b><a href="mailto:${E.rh}">${E.rh}</a></div></li>
  </ul></aside>
</div></section>
<section class="sec unids-sec"><div class="in"><div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Endereços e telefones</h2></div>${unidades}</div></section>`;
}

const internas = v => {
  const p = { institucional: pagina(v, 'institucional', paginaInst(v)), produtos: pagina(v, 'produtos', paginaProdutos(v)), imprensa: pagina(v, 'imprensa', paginaImprensa(v)), 'meio-ambiente': pagina(v, 'meio-ambiente', paginaAmbiente(v)), 'trabalhe-conosco': pagina(v, 'trabalhe-conosco', paginaTrabalhe(v)), contato: pagina(v, 'contato', paginaContato(v)) };
  for (const x of PROD) p[`produtos/${x.slug}`] = pagina(v, `produtos/${x.slug}`, paginaProduto(v, x));
  return p;
};

// ---------- A "Genética": clara, mostruário de grãos ----------
function versaoA() {
  const v = 'a';
  const home = `
<section class="hero"><div class="in hero-in">
  <div class="hero-txt">
    <p class="sobre">Agro Norte Pesquisa e Sementes · desde 1994</p>
    <h1>Genética própria campeã de produtividade</h1>
    <p class="lead">Cultivares de arroz, soja, feijão, milheto e capim coracana desenvolvidas em Sinop – MT para lavouras de norte a sul do Brasil.</p>
    <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Ver as cultivares ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, msgWa('um orçamento de sementes'))}" target="_blank" rel="noopener">${icWa()} Solicitar orçamento</a></div>
  </div>
  <figure class="hero-foto">${fig('colheita-soja.webp', 'Colheita de soja Agro Norte')}<figcaption><b>32 anos</b> de melhoramento genético</figcaption></figure>
</div></section>

<section class="sec cults-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Nossos produtos</p><h2>Sete culturas, ${PROD.length} cultivares</h2></div>
  ${culturas(v)}
</div></section>

<section class="sec lanc"><div class="in">${lancamento(v)}</div></section>

<section class="sec destaques"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Fichas técnicas</p><h2>Destaques do catálogo</h2></div>
  <ul class="prods">${['ana-8001', 'ansc-80192', 'anrr79-029', 'anfc-22'].map(s => cartaoProd(v)(PROD.find(p => p.slug === s))).join('')}</ul>
  <p class="centro"><a class="link-seta" href="${link(v, 'produtos')}">Todas as cultivares ${ic('seta')}</a></p>
</div></section>

<section class="sec linha-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Nossa história</p><h2>De Sinop para o Brasil</h2></div>
  ${linhaTempo}
</div></section>

<section class="sec amb-home"><div class="in amb-home-in">
  <figure class="sobe">${fig('aerea-sede.webp', 'Vista aérea com corredores de mata nativa')}</figure>
  <div class="sobe"><p class="sobre">Meio ambiente</p><h2>Corredores biológicos entre as lavouras</h2><p>Talhões de até 350 hectares separados por corredores de vegetação nativa de 100 a 150 metros, ligando nascentes, matas ciliares e reservas.</p><a class="link-seta" href="${link(v, 'meio-ambiente')}">Conheça o projeto ${ic('seta')}</a></div>
</div></section>

<section class="sec unids-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Sinop, Pato Branco e Unaí</h2></div>
  ${unidades}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

// ---------- B "Campo": verde da marca, foto em tela cheia e comparativo ----------
function versaoB() {
  const v = 'b';
  const soja = PROD.filter(p => p.cat.startsWith('soja'));
  const num = s => parseFloat(String(s).replace(/\./g, '').replace(',', '.'));
  const pot = p => num((p.specs.find(([a]) => /potencial/i.test(a)) || [, '0'])[1]);
  const gm = p => (p.specs.find(([a]) => /maturação/i.test(a)) || [, '–'])[1];
  const max = Math.max(...soja.map(pot));
  const home = `
<section class="hero"><div class="hero-foto" style="background-image:url(${IMG}pivo-feijao.webp)"></div><div class="in hero-in">
  <p class="sobre">Pesquisa e sementes · Sinop – MT</p>
  <h1>A semente certa começa na pesquisa</h1>
  <p class="lead">Desde 1994 desenvolvendo cultivares de arroz, soja, feijão, milheto e capim coracana para aumentar a rentabilidade e a sustentabilidade da sua propriedade.</p>
  <div class="hero-bts"><a class="btn" href="${link(v, 'produtos')}">Nossos produtos ${ic('seta')}</a><a class="btn btn-linha" href="${waHref(E.wa, msgWa('um orçamento de sementes'))}" target="_blank" rel="noopener">${icWa()} Orçamento</a></div>
</div></section>
<section class="numeros-sec"><div class="in"><ul class="numeros">
  <li><b>1994</b><span>fundação em Sinop – MT</span></li><li><b>${PROD.length}</b><span>cultivares no catálogo</span></li><li><b>7</b><span>culturas</span></li><li><b>4</b><span>unidades em MT, PR e MG</span></li>
</ul></div></section>

<section class="sec cults-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Escolha a cultura</p><h2>Um mostruário de sementes</h2></div>
  ${culturas(v)}
</div></section>

<section class="sec comp"><div class="in comp-in">
  <div class="sobe"><p class="sobre">Soja Agro Norte</p><h2>Potencial produtivo por cultivar</h2><p>Comparativo das sojas convencionais e transgênicas do catálogo, com o grupo de maturação de cada uma.</p><a class="link-seta" href="${link(v, 'produtos')}#soja-convencional">Fichas técnicas ${ic('seta')}</a></div>
  <ul class="comp-lista sobe">${soja.sort((a, b) => pot(b) - pot(a)).map(p => `<li><a href="${link(v, `produtos/${p.slug}`)}"><span class="comp-nome">${p.nome}<small>${p.cat === 'soja-transgenica' ? 'RR' : 'Convencional'} · GM ${gm(p)}</small></span><span class="comp-barra"><span style="width:${Math.round(pot(p) / max * 100)}%"></span></span><b>${pot(p).toLocaleString('pt-BR')} kg/ha</b></a></li>`).join('')}</ul>
</div></section>

<section class="sec lanc"><div class="in">${lancamento(v)}</div></section>

<section class="sec inst-home"><div class="in inst-home-in">
  <div class="sobe"><p class="sobre">Institucional</p><h2>Melhoramento genético com visão de mercado</h2><p>${C.sobre2}</p><ul class="valores">${C.valores.map(x => `<li>${x}</li>`).join('')}</ul><a class="link-seta" href="${link(v, 'institucional')}">Nossa história ${ic('seta')}</a></div>
  <div class="sobe">${video}</div>
</div></section>

<section class="sec unids-sec"><div class="in">
  <div class="sec-tit sobe"><p class="sobre">Unidades</p><h2>Onde estamos</h2></div>
  ${unidades}
</div></section>`;
  return { index: pagina(v, 'index', home), ...internas(v) };
}

copiarSiteJs(pub, E.wa);
const comum = fs.readFileSync(path.join(aqui, 'comum.css'), 'utf8');
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), comum + '\n' + fs.readFileSync(path.join(aqui, `${v}.css`), 'utf8'));
escreverVersao(pub, 'a', versaoA());
escreverVersao(pub, 'b', versaoB());
const nPag = Object.keys(versaoA()).length;
await escolha(pub, {
  nome: 'Agro Norte', artigo: 'da', url: E.url, lang: 'pt', cor: '#0a7d10', fundo: '#0b3b04', claro: '#f3f6ee',
  fonteTitulo: "'Oswald',system-ui,sans-serif", fonteTexto: "'Inter',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Genética', paginas: nPag, texto: 'Clara, com a colheita de soja na abertura, um mostruário com os grãos das sete culturas e o lançamento ANfc 29 em destaque.', pontos: [`${PROD.length} cultivares com ficha técnica em texto`, 'Linha do tempo de 1994 a 2026', 'Pedido de orçamento pelo WhatsApp'] },
    { letra: 'b', nome: 'Campo', paginas: nPag, texto: 'Pivô de feijão em tela cheia, comparativo do potencial produtivo das sojas e o verde da marca em destaque.', pontos: ['Comparativo de soja em barras', 'Mesmas páginas do site atual', 'Vagas em lista que abre e fecha'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
