// Ciatec Cursos, Centro Histórico de Porto Alegre/RS: cursos profissionalizantes práticos desde 2009. Gera public/{a,b}/ e a página de escolha.
// node clientes/ciatec/_origem/gerar.mjs   (prints: node componentes/gerador/prints.mjs ciatec https://cursosciatec.com.br/home/)
// Textos, cargas horárias e conteúdos dos cursos tirados das páginas do site atual (WordPress); fotos do próprio site, em webp; logo SVG original.
import { esc, ic, icWa, cabeca, link, escreverVersao, copiarSiteJs, escolha, telHref, waHref } from '../../../componentes/gerador/kit.mjs';
import path from 'node:path';
import fs from 'node:fs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
const E = {
  nome: 'Ciatec Cursos', url: 'https://ciatec.overtus.com.br/', antigo: 'https://cursosciatec.com.br/home/',
  fone: '(51) 3224-4044', whats: '(51) 99166-8717', wa: '5551991668717', email: 'cursos@cursosciatec.com.br',
  rua: 'Praça Quinze de Novembro, 16, sala 401', bairro: 'Centro Histórico', cidade: 'Porto Alegre - RS', cep: '90010-140',
  insta: 'https://www.instagram.com/cursosciatec/', face: 'https://www.facebook.com/CursosCiatec/', yt: 'https://www.youtube.com/channel/UCrWdZ7F5QGkaRTURdRkdhVA', li: 'https://br.linkedin.com/company/ciateccursos',
};
const FONTES = 'https://fonts.googleapis.com/css2?family=Saira:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
const LOGO = (c = '') => `<img class="logo" src="/assets/img/logo${c}.svg" alt="Ciatec" width="1214" height="286">`;
const img = (n, alt, extra = '') => { const d = n.startsWith('v-') ? [720, 900] : [1200, 900]; return `<img src="/assets/img/${n}.webp" alt="${esc(alt)}" loading="lazy" decoding="async" width="${d[0]}" height="${d[1]}"${extra}>`; };
const lista = arr => `<ul class="lista-check">${arr.map(x => `<li>${ic('check')}<span>${x}</span></li>`).join('')}</ul>`;
const WAMSG = 'Olá! Vi o site da Ciatec e gostaria de informações sobre os cursos.';
const waCurso = n => waHref(E.wa, `Olá! Gostaria de informações e valores do curso ${n}.`);

// [nome, carga horária, descrição, conteúdos]
const AREAS = [
  { slug: 'manutencao', nome: 'Manutenção de celulares e informática', curto: 'Manutenção', foto: 'bancadas', vfoto: 'v-smart-1', texto: 'Conserto na prática, em bancadas individuais, estudando casos reais de manutenção. A Ciatec nasceu dentro de uma assistência técnica de notebooks.', cursos: [
    ['Manutenção de Smartphone e Celular', '20h', 'Conserto de celulares na prática, em bancadas e ferramentas individuais, com aparelhos atuais de todas as marcas.', ['Manutenção de hardware e software', 'Casos reais de manutenção', 'Contatos de fornecedores de peças e ferramentas', 'Material completo fornecido pela Ciatec']],
    ['Especialização iPhones', '20h', 'Formação para técnicos que desejam se especializar no diagnóstico, reparo e manutenção de iPhones.', ['Recebimento do aparelho e check-list', 'Modelos, diferenças e arquitetura dos iPhones', 'Apps de diagnóstico', 'Desmontagem e montagem seguras']],
    ['Recondicionamento de telas e troca de vidro', '10h', 'Troca de vidro frontal de celulares de todas as marcas e modelos.', ['Remoção de vidro com separadora e fio', 'Remoção e aplicação de cola OCA', 'Aplicação de filme polarizador', 'Laminação']],
    ['Manutenção de Tablet', '20h', 'Manutenção de hardware e software em tablets de todas as marcas e modelos.', []],
    ['Manutenção de Notebook', '20h', 'Conserto de notebooks na prática, em bancadas individuais, com casos reais.', ['Diagnóstico de defeitos', 'Troca de tela, cabos flat e teclado', 'Conserto de fonte interna e externa e bateria', 'Recuperação de dobradiças']],
    ['Manutenção de Computadores', '30h', 'Conserto, manutenção, configuração e montagem de computadores PC, de hardware a software.', ['Montagem de computador desktop', 'Bancada técnica e ferramentas', 'Descargas eletrostáticas', 'Defeitos de hardware e software']],
    ['Redes de Computadores', '', 'Configurar e montar uma rede, fazer a manutenção, confeccionar e identificar cabos e conectores.', ['Redes LAN e WAN', 'Topologia física e lógica', 'Instalação física e componentes', 'Introdução ao TCP/IP']],
    ['Solda BGA', '10h', 'Substituição e retrabalho (reflow) de chips com encapsulamento BGA. Pré-requisito: curso avançado ou experiência.', ['Ferramentas e instrumentos', 'Tipos de encapsulamento', 'Defeitos mais comuns', 'Retrabalho de BGA']],
    ['Manutenção de Impressoras e Recarga', '', 'Manutenção preventiva e corretiva de impressoras jato de tinta, multifuncionais e laser.', ['Estrutura de laboratório de assistência técnica', 'Impressoras laser e laser color', 'Troca e conserto de peças']],
  ] },
  { slug: 'eletrica', nome: 'Elétrica, instalação e eletrônica', curto: 'Elétrica', foto: 'eletrica', vfoto: 'v-eletrica', texto: 'Painéis, bancadas e equipamentos reais para aprender instalação elétrica, ar condicionado, refrigeração, segurança eletrônica, solda e normas regulamentadoras.', cursos: [
    ['Eletricista Residencial, Predial e Industrial', '20h a 50h por módulo', 'Do básico ao avançado em três módulos: residencial, predial e industrial com inversor de frequência.', ['Identificação de defeitos', 'Tomadas, interruptores e disjuntores', 'Emendas de cabos e sensores de presença', 'Inversor de frequência no módulo industrial']],
    ['Instalação de Ar Condicionado', '20h', 'Instalação completa de split e inverter, com aulas práticas e Manutenção Nível I.', ['Tubulações, isolamento e dreno', 'Recarga de gás R22 e R410a', 'Flange, alargamento e brasagem', 'Teste de eficiência do equipamento']],
    ['Manutenção de Ar Condicionado', '20h', 'Reparos em todas as peças das unidades evaporadora e condensadora, split e inverter.', ['Análise de defeitos de todos os componentes', 'Diagnóstico de vazamento', 'Entupimento de linhas', 'Testes elétricos']],
    ['Refrigeração Residencial', '20h', 'Manutenção de geladeiras, freezers e frigobares de qualquer marca ou modelo.', ['Montagem e desmontagem', 'Compressor, condensador e evaporador', 'Termostato, relé e capacitor', 'Manifold e bomba de vácuo']],
    ['Automação Residencial', '30h', 'Instalação de dispositivos de automação de diversas marcas para casas inteligentes. Pré-requisito: elétrica residencial.', ['Funcionamento dos dispositivos', 'Módulos de controle de iluminação', 'Controle pelo celular', 'Tomadas para automação']],
    ['Sistemas Fotovoltaicos', '18h', 'Projeto e dimensionamento de sistemas de energia solar, simulações em software e entrada na concessionária.', ['Geometria solar e irradiância', 'Horas de Sol a Pico', 'Cálculo da energia produzida', 'Pré-requisito: elétrica residencial']],
    ['CFTV com Acesso Remoto', '20h', 'Instalação de câmeras de segurança, DVR e configuração de acesso remoto.', ['Tipos de câmeras e lentes', 'DVR, NVR e placas de captura', 'Fontes e alimentação', 'Uso do multímetro']],
    ['Alarmes e Cercas Elétricas', '20h', 'Instalação e programação de centrais de alarme e cercas elétricas, com orçamento e projeto.', ['Instalação de sensores', 'Zonas de disparo, pânico e sirenes', 'Hastes de cercas elétricas', 'Normas de segurança']],
    ['Programação em CLP', '30h', 'Programação de CLPs de todas as marcas e modelos para automatizar máquinas e processos.', ['Entradas e saídas', 'Sensores analógicos e digitais', 'Software de programação e IHMs', 'Instalação em painéis']],
    ['Eletrônica de Bancada', '20h', 'Componentes, análise de circuitos e manutenção de placas, de forma simples e objetiva.', ['Grandezas elétricas', 'Solda SMD e estação de retrabalho', 'Multímetro e osciloscópio', 'Manutenção de placas']],
    ['Eletrônica Digital e Analógica', '44h', 'Reparo de placas de diferentes equipamentos, análise de motherboards e rastreamento de defeitos.', ['Circuito série e paralelo', 'Análise de curto-circuito', 'Tecnologias THT e SMT', 'Dispositivos SMD e BGA']],
    ['Solda Eletrodo Revestido', '40h', 'Teoria e prática para começar como soldador em empresa ou como autônomo em serralheria.', ['Eletrodo revestido e MIG arame tubular', 'Preparação de peças', 'Interpretação de desenho e metrologia', 'Cálculo de dilatação térmica']],
    ['NR-10 Trabalhos em Eletricidade', '', 'Curso oficial da NR-10, presencial ou on-line, com primeiros socorros e combate a incêndio. Certificado com validade nacional.', ['Riscos em eletricidade', 'Primeiros socorros', 'Combate a incêndio']],
    ['NR-35 Trabalhos em Altura', '8h', 'Curso oficial da NR-35, presencial ou on-line, com validade nacional.', ['Medidas de proteção e controle', 'Análise de risco', 'EPI e EPC', 'Noções de resgate e primeiros socorros']],
  ] },
  { slug: 'programacao', nome: 'Programação e dados', curto: 'Programação', foto: 'sala', vfoto: 'v-programacao', texto: 'Da lógica de programação à ciência de dados, com metodologia prática para projetos do mundo real.', cursos: [
    ['Lógica de Programação', '', 'A base para entrar no mundo da programação: entender como se constroem as sequências lógicas de um sistema.', ['Aulas práticas', 'Projetos do mundo real', 'Base para qualquer linguagem']],
    ['Banco de Dados MySQL', '20h', 'Modelar, implementar e administrar bancos de dados com a linguagem SQL.', ['Criar bancos bem estruturados', 'Relacionamento entre tabelas', 'Diagramar tabelas']],
    ['Analista de Dados', '20h', 'SQL avançado, extração e transformação de dados e dashboards numa ferramenta de visualização.', ['ETL de diversas fontes', 'Visualização de dados', 'Criação de dashboards']],
    ['Python com Manipulação de Dados', '36h', 'Primeira parte da Formação Data Science: sintaxe, estruturas de dados, arquivos e orientação a objetos.', ['Numpy, Pandas e Matplotlib', 'Orientação a objetos', 'Projeto final: estudo de caso']],
    ['Machine Learning com Python', '32h', 'Segunda parte da Formação Data Science: algoritmos de autoaprendizagem para sistemas inteligentes.', ['Redes neurais e deep learning', 'Processamento de imagens e linguagem natural', 'Sistemas de recomendação']],
    ['Programação em Arduino', '80h', 'A plataforma Arduino e sua programação em C, com controle remoto de elementos eletroeletrônicos.', ['Sistemas embarcados', 'Microcontroladores', 'Comunicação web e aplicativos']],
    ['Desenvolvimento de Aplicativos Android', '60h', 'Criar aplicativos do início ao fim, até a publicação na Google Play, com Java e Kotlin.', ['Widgets e layouts', 'Banco de dados SQLite', 'Projeto: aplicativo de chat']],
    ['HTML5 + CSS3 + JavaScript', '', 'Criar páginas web, estilizar com CSS e dar vida com JavaScript.', ['Como a web funciona', 'HTML e CSS', 'JavaScript']],
    ['Programador Java', '100h', 'Todos os passos para criar páginas e aplicações web com Java, em turma reduzida.', ['Fundamentos Java SE', 'Ambiente de desenvolvimento', 'Aplicações web']],
  ] },
  { slug: 'informatica', nome: 'Informática e profissionalizantes', curto: 'Informática', foto: 'turma-2', vfoto: 'v-lab', texto: 'Presencial ou on-line, com horário de estudo escolhido pelo aluno: do primeiro contato com o computador às ferramentas do mercado de trabalho.', cursos: [
    ['Informática Profissional', '', 'Do básico ao avançado das ferramentas mais usadas no mercado de trabalho.', ['Windows 10 ou 11', 'Excel, Word, PowerPoint e Outlook', 'Multimídia e redes sociais']],
    ['Pacote Office', '', 'Os principais programas do Office para quem quer aprender, atualizar ou se aperfeiçoar.', ['Excel', 'Word', 'PowerPoint']],
    ['Excel', '', 'Do básico ao avançado, para auxiliares administrativos, RH, financeiro e qualquer profissão.', ['Demonstração do professor', 'Exercícios durante todo o curso', 'Certificado com validade nacional']],
    ['Office Melhor Idade', '', 'Para pessoas maduras que querem aprender ou se atualizar no computador, com atividades interativas.', ['Windows e internet', 'Excel, Word e PowerPoint']],
    ['Auxiliar Administrativo', '', 'Tarefas do departamento administrativo de qualquer empresa.', ['Marketing e secretariado', 'Departamento pessoal', 'Fluxo de caixa e contabilidade', 'Logística']],
    ['Gestão em Vendas', '', 'Metas, estratégias e processos centrados no esforço de vendas.', ['Marketing e telemarketing', 'Matemática financeira na HP 12C e no Excel', 'Redes sociais']],
    ['Design Gráfico', '', 'Logotipos, banners, cartazes e animações com as ferramentas do mercado.', ['Illustrator', 'Photoshop', 'CorelDraw']],
    ['Web Designer', '', 'Criar e desenvolver sites e páginas de todos os tipos.', ['Dreamweaver', 'Illustrator', 'Estrutura de sites']],
    ['Empregabilidade', '', 'Para quem procura o primeiro emprego: currículo, marketing pessoal e entrevista.', ['Como montar o currículo', 'Leitura dinâmica']],
  ] },
];
const TOTAL = AREAS.reduce((s, a) => s + a.cursos.length, 0);
const PILARES = [['Honestidade', 'Zelar pela honestidade no tratamento das necessidades dos clientes e de todas as partes interessadas.'], ['Comprometimento', 'Promover ensino de qualidade e prestar suporte ao aluno após o curso.'], ['Qualidade', 'Preparar o aluno para atuar no mercado de trabalho, promovendo benefício social.'], ['Alegria no fazer', 'Manter um ambiente proativo, criativo e de companheirismo.']];
const DIFER = [['Bancadas individuais', 'Cada aluno com sua bancada e suas ferramentas.'], ['Turmas reduzidas', 'Atenção do professor para cada aluno.'], ['Professores técnicos', 'Graduados e com experiência em manutenção de equipamentos.'], ['Certificado nacional', 'Cursos livres regulamentados pela Lei 9.394/96.']];
const FOTOS = [['turma-1', 'Turma formada com certificados'], ['v-smart-2', 'Aula de manutenção de celulares'], ['ar', 'Curso de ar condicionado'], ['v-refrigeracao', 'Curso de refrigeração'], ['solda', 'Curso de solda'], ['turma-3', 'Turma do curso de ar condicionado'], ['v-smart-3', 'Bancada de eletrônica'], ['eletrica', 'Painel do curso de eletricista'], ['v-certificado', 'Aluno com certificado'], ['geladeira', 'Prática em geladeira'], ['v-smart-4', 'Prática de manutenção'], ['turma-2', 'Turma com certificados']];

const nav = [
  { slug: 'quem-somos', nome: 'Quem somos' },
  ...AREAS.map(a => ({ slug: a.slug, nome: a.curto })),
  { slug: 'fotos', nome: 'Fotos' },
  { slug: 'contato', nome: 'Contato' },
];
const cores = { a: '#D7282F', b: '#1D1D1F' };
const head = (v, s, titulo, descricao) => cabeca({ E, v, slug: s, titulo: s === 'index' ? 'Ciatec | Cursos profissionalizantes práticos em Porto Alegre' : `${titulo} | Ciatec Cursos`, descricao, fontes: FONTES, css: ['base.css', `${v}.css`], cor: cores[v] });
function topo(v, s) {
  return `<header class="topo">
  <div class="faixa-topo"><div class="in"><span>${ic('pin')}${E.rua}, ${E.bairro}, a 2 quadras do Mercado Público</span><span>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a><i>·</i>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></span></div></div>
  <div class="in topo-linha">
    <a class="marca" href="${link(v, 'index')}" aria-label="Ciatec, página inicial">${LOGO(v === 'b' ? '-branco' : '')}</a>
    <nav id="menu" class="menu" aria-label="Principal"><ul>${nav.map(n => `<li><a href="${link(v, n.slug)}"${s === n.slug ? ' class="ativo" aria-current="page"' : ''}>${n.nome}</a></li>`).join('')}</ul></nav>
    <a class="btn btn-topo" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}Matricule-se</a>
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
    <div class="rod-marca">${LOGO('-branco')}<p>Cursos profissionalizantes práticos no Centro Histórico de Porto Alegre, desde 2009.</p><p class="redes"><a href="${E.insta}" target="_blank" rel="noopener" aria-label="Instagram">${ic('insta')}</a><a href="${E.face}" target="_blank" rel="noopener" aria-label="Facebook">${ic('face')}</a><a href="${E.yt}" target="_blank" rel="noopener" aria-label="YouTube">${ic('yt')}</a></p></div>
    <div><h3>Cursos</h3><ul>${AREAS.map(a => `<li><a href="${link(v, a.slug)}">${a.nome}</a></li>`).join('')}</ul></div>
    <div><h3>A escola</h3><ul>${[{ slug: 'index', nome: 'Início' }, { slug: 'quem-somos', nome: 'Quem somos' }, { slug: 'fotos', nome: 'Fotos das turmas' }, { slug: 'contato', nome: 'Contato' }].map(n => `<li><a href="${link(v, n.slug)}">${n.nome}</a></li>`).join('')}</ul></div>
    <div><h3>Fale conosco</h3><ul class="rod-dados"><li>${ic('tel')}<a href="${telHref(E.fone)}">${E.fone}</a></li><li>${icWa()}<a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></li><li>${ic('mail')}<a href="mailto:${E.email}">${E.email}</a></li><li>${ic('pin')}<span>${E.rua}<br>${E.bairro}, ${E.cidade}</span></li></ul></div>
  </div>
  <div class="rod-base"><div class="in"><span>© ${new Date().getFullYear()} Ciatec Treinamentos e Consultoria</span><span>Prévia feita pela Overtus</span></div></div>
</footer>
<a class="wa-flutua" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icWa()}</a>
</body>
</html>
`;
}
const todosCursos = AREAS.flatMap(a => a.cursos.map(c => c[0]));
const form = () => `<form class="form" data-wa="Olá! Quero informações sobre os cursos da Ciatec." novalidate>
  <label>Nome *<input name="nome" required autocomplete="name"></label>
  <div class="form-2"><label>Telefone *<input name="telefone" type="tel" required autocomplete="tel"></label><label>E-mail<input name="email" type="email" autocomplete="email"></label></div>
  <label>Curso de interesse<select name="curso">${todosCursos.map(c => `<option>${c}</option>`).join('')}</select></label>
  <label>Mensagem<textarea name="mensagem" rows="3"></textarea></label>
  <button class="btn" type="submit">${icWa()}Enviar pelo WhatsApp</button>
</form>`;
const curso = c => `<article class="curso sobe"><header>${c[1] ? `<span class="ch">${c[1]}</span>` : ''}<h3>${c[0]}</h3></header><p>${c[2]}</p>${c[3].length ? `<ul>${c[3].map(t => `<li>${t}</li>`).join('')}</ul>` : ''}<a class="link-seta" href="${waCurso(c[0])}" target="_blank" rel="noopener">${icWa()}Informações e valores</a></article>`;
const galeria = (itens, cls = 'galeria') => `<div class="${cls}">${itens.map(f => `<a class="sobe" href="/assets/img/${f[0]}.webp" data-foto data-legenda="${esc(f[1])}">${img(f[0], f[1])}</a>`).join('')}</div>`;
const cta = v => `<section class="cta-seg sobe"><div><h2>Escolha seu curso e comece a trabalhar</h2><p>Fale com a Ciatec e receba as datas das próximas turmas e os valores.</p></div><p class="bts"><a class="btn" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}${E.whats}</a><a class="btn btn-linha" href="${link(v, 'contato')}">Outros contatos</a></p></section>`;

function paginas(v, cab, home) {
  const pag = {};
  pag.index = head(v, 'index', '', `Ciatec, cursos profissionalizantes práticos em Porto Alegre: manutenção de celulares e notebooks, eletricista, ar condicionado, refrigeração, programação, informática e mais ${TOTAL} cursos. Bancadas individuais e turmas reduzidas.`) + topo(v, 'index') + home() + rodape(v);

  pag['quem-somos'] = head(v, 'quem-somos', 'Quem somos', 'A Ciatec foi fundada em 2009 dentro da A Cia do Notebook para formar técnicos. Metodologia ativa, bancadas individuais e turmas reduzidas.') + topo(v, 'quem-somos') + cab('Quem somos', 'Transformar a vida das pessoas através da qualificação profissional', 'turma-1') + `
<div class="in">
<section class="texto-pag"><div class="sobe"><p class="lead">A Ciatec Treinamentos e Consultoria foi fundada em 2009 dentro da A Cia do Notebook, assistência técnica referência em manutenção de hardware e software.</p><p>Surgiu de uma necessidade do mercado: formar técnicos em manutenção de hardware, diante da escassez de mão de obra na área. Nosso objetivo é formar alunos capacitados para atuar na profissão assim que terminam o curso.</p></div><figure class="sobe">${img('bancadas', 'Bancadas individuais da Ciatec')}</figure></section>
<section class="metodo sobe"><div><p class="k">Metodologia</p><h2>Metodologia ativa: aprender fazendo</h2></div><div><p>O ser humano absorve mais conhecimento realizando práticas e vivendo experiências. Por isso os cursos Ciatec trazem práticas de bancada técnica e casos reais, com turmas reduzidas e ferramentas individuais.</p><p>Os professores são técnicos graduados e com experiência em manutenção de equipamentos, que ensinam técnicas já testadas e usadas diariamente em laboratório.</p></div></section>
<section class="pilares-sec"><header class="tit"><p class="k">Nossos pilares</p><h2>O que guia a Ciatec</h2></header><div class="pilares">${PILARES.map((p, i) => `<article class="sobe"><span>0${i + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('')}</div></section>
<section class="regul sobe"><p class="k">Regulamentação</p><p>A Ciatec oferece cursos livres e profissionalizantes, regulamentados pela Lei de Diretrizes e Bases da Educação (Lei 9.394/96), com validade em todo o território nacional. Eles se enquadram na categoria de Formação Inicial e Continuada ou Qualificação Profissional.</p></section>
${cta(v)}
</div>
` + rodape(v);

  for (const a of AREAS) {
    pag[a.slug] = head(v, a.slug, a.nome, `Cursos de ${a.nome.toLowerCase()} na Ciatec, em Porto Alegre: ${a.cursos.map(c => c[0]).slice(0, 5).join(', ')} e outros.`) + topo(v, a.slug) + cab(`${a.cursos.length} cursos`, a.nome, a.foto) + `
<div class="in">
<p class="lead intro sobe">${a.texto}</p>
<section class="cursos">${a.cursos.map(curso).join('')}</section>
${cta(v)}
</div>
` + rodape(v);
  }

  pag.fotos = head(v, 'fotos', 'Fotos das turmas', 'Fotos das turmas e aulas práticas da Ciatec em Porto Alegre: celulares, ar condicionado, refrigeração, elétrica e solda.') + topo(v, 'fotos') + cab('Fotos das turmas', 'Aula prática é aqui', '') + `
<div class="in">
<p class="lead intro sobe">Turmas formadas, bancadas e práticas em equipamentos reais.</p>
${galeria(FOTOS, 'galeria g-fotos')}
${cta(v)}
</div>
` + rodape(v);

  pag.contato = head(v, 'contato', 'Contato', `Ciatec: ${E.rua}, ${E.bairro}, ${E.cidade}, a 2 quadras do Mercado Público. ${E.fone}, WhatsApp ${E.whats}.`) + topo(v, 'contato') + cab('Contato', 'Receba informações e valores dos cursos', '') + `
<div class="in"><section class="contato-pag">
  <div class="sobe"><ul class="contato-dados"><li>${icWa()}<div><span>WhatsApp</span><a href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${E.whats}</a></div></li><li>${ic('tel')}<div><span>Telefone</span><a href="${telHref(E.fone)}">${E.fone}</a></div></li><li>${ic('mail')}<div><span>E-mail</span><a href="mailto:${E.email}">${E.email}</a></div></li><li>${ic('pin')}<div><span>Endereço</span>${E.rua}<br>${E.bairro}, ${E.cidade}, CEP ${E.cep}<br>A 2 quadras da estação Mercado Público</div></li></ul>
  <iframe class="mapa" title="Mapa da Ciatec" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent('Praça Quinze de Novembro, 16, Centro Histórico, Porto Alegre RS')}&z=16&output=embed"></iframe></div>
  <div class="form-caixa sobe"><h2>Peça informações</h2><p>Preencha e envie: a mensagem abre pronta no WhatsApp da Ciatec.</p>${form()}</div>
</section></div>
` + rodape(v);
  return pag;
}

// ---------- A "Bancada": branco, vermelho do logo e fotos de aula prática ----------
function A() {
  const v = 'a';
  const cab = (k, t, foto) => `<section class="cab-a"><div class="in cab-a-in"><div><p class="k">${k}</p><h1>${t}</h1></div>${foto ? `<figure>${img(foto, '', ' loading="eager"')}</figure>` : ''}</div></section>`;
  return paginas(v, cab, () => `
<section class="hero-a"><div class="in hero-a-in">
  <div><p class="k">Cursos profissionalizantes · Porto Alegre</p><h1>Aprenda uma nova profissão com a mão na massa.</h1><p>${TOTAL} cursos práticos com bancadas individuais, turmas reduzidas e professores técnicos. Desde 2009 no Centro Histórico, a 2 quadras do Mercado Público.</p><p class="bts"><a class="btn" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}Receba informações</a><a class="btn btn-linha" href="#areas">Ver os cursos</a></p></div>
  <div class="hero-a-fotos">${img('v-smart-1', 'Aluno na bancada de manutenção de celulares', ' loading="eager" fetchpriority="high"')}${img('v-ar', 'Prática de ar condicionado', ' loading="eager"')}</div>
</div></section>
<section class="difer-a"><div class="in difer">${DIFER.map(d => `<div class="sobe"><b>${d[0]}</b><span>${d[1]}</span></div>`).join('')}</div></section>
<section class="in areas-a" id="areas"><header class="tit"><p class="k">Áreas</p><h2>Escolha sua área</h2></header><div class="areas">${AREAS.map(a => `<a class="area sobe" href="${link(v, a.slug)}">${img(a.foto, a.nome)}<div><span>${a.cursos.length} cursos</span><h3>${a.nome}</h3><p>${a.cursos.slice(0, 4).map(c => c[0]).join(' · ')}</p></div></a>`).join('')}</div></section>
<section class="destaque-a"><div class="in destaque-a-in"><div class="sobe"><p class="k">Mais procurados</p><h2>Cursos que viram profissão</h2></div><div class="mini">${[AREAS[0].cursos[0], AREAS[1].cursos[0], AREAS[1].cursos[1], AREAS[1].cursos[3], AREAS[0].cursos[4], AREAS[2].cursos[0]].map(c => `<a class="sobe" href="${waCurso(c[0])}" target="_blank" rel="noopener"><b>${c[0]}</b>${c[1] ? `<span>${c[1]}</span>` : ''}</a>`).join('')}</div></div></section>
<section class="in historia-a"><figure class="sobe">${img('turma-2', 'Turma formada da Ciatec')}</figure><div class="sobe"><p class="k">Desde 2009</p><h2>Nascemos dentro de uma assistência técnica</h2><p>A Ciatec foi fundada dentro da A Cia do Notebook para formar técnicos de manutenção. Até hoje ensinamos técnicas testadas e usadas diariamente em laboratório.</p><a class="link-seta" href="${link(v, 'quem-somos')}">Quem somos ${ic('seta')}</a></div></section>
<section class="fotos-a"><div class="in"><header class="tit"><p class="k">Fotos das turmas</p><h2>Aula prática é aqui</h2></header>${galeria(FOTOS.slice(0, 6), 'galeria g6')}<a class="link-seta" href="${link(v, 'fotos')}">Ver mais fotos ${ic('seta')}</a></div></section>
<div class="in">${cta(v)}</div>
`);
}

// ---------- B "Circuito": grafite escuro, vermelho do botão liga do logo, cara de laboratório ----------
function B() {
  const v = 'b';
  const cab = (k, t, foto) => `<section class="cab-b">${foto ? img(foto, '', ' loading="eager"') : ''}<div class="in cab-b-in"><p class="k">${k}</p><h1>${t}</h1></div></section>`;
  return paginas(v, cab, () => `
<section class="hero-b">${img('bancadas', 'Bancadas da Ciatec', ' loading="eager" fetchpriority="high"')}<div class="in hero-b-in"><p class="k">Ciatec · Porto Alegre · desde 2009</p><h1>Liga a sua <em>nova profissão</em>.</h1><p>Celulares, notebooks, elétrica, ar condicionado, refrigeração, programação e informática: ${TOTAL} cursos práticos com bancadas individuais.</p><p class="bts"><a class="btn" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}${E.whats}</a><a class="btn btn-linha" href="#cursos">Ver os cursos</a></p></div></section>
<section class="in areas-b" id="cursos">${AREAS.map((a, i) => `<article class="area-b sobe"><span class="n">0${i + 1}</span><div><h2>${a.nome}</h2><p>${a.texto}</p><ul>${a.cursos.map(c => `<li>${c[0]}</li>`).join('')}</ul><a class="link-seta" href="${link(v, a.slug)}">Ver os ${a.cursos.length} cursos ${ic('seta')}</a></div>${img(a.vfoto, a.nome)}</article>`).join('')}</section>
<section class="metodo-b"><div class="in metodo-b-in"><div class="sobe"><p class="k">Metodologia ativa</p><h2>Teoria vivida na bancada</h2><p>Práticas de bancada técnica e casos reais, com turmas reduzidas e professores técnicos com experiência em manutenção.</p></div><div class="difer">${DIFER.map(d => `<div class="sobe"><b>${d[0]}</b><span>${d[1]}</span></div>`).join('')}</div></div></section>
<section class="fotos-b"><div class="in">${galeria(FOTOS.slice(0, 8), 'galeria g8')}</div></section>
<section class="visita-b"><div class="in visita-b-in"><div><p class="k">${E.bairro}</p><h2>${E.rua}</h2><p>A 2 quadras da estação Mercado Público, ${E.cidade}.</p></div><p class="bts"><a class="btn" href="${waHref(E.wa, WAMSG)}" target="_blank" rel="noopener">${icWa()}Receba informações</a><a class="btn btn-linha" href="${link(v, 'contato')}">Contato</a></p></div></section>
`);
}

copiarSiteJs(pub, E.wa);
for (const v of ['a', 'b']) fs.writeFileSync(path.join(pub, `assets/${v}.css`), fs.readFileSync(path.join(aqui, 'css/comum.css'), 'utf8') + fs.readFileSync(path.join(aqui, `css/${v}.css`), 'utf8'));
escreverVersao(pub, 'a', A());
escreverVersao(pub, 'b', B());
await escolha(pub, {
  nome: 'Ciatec', artigo: 'da', url: E.url, lang: 'pt', cor: '#E0303A', fundo: '#1D1D1F', claro: '#FDECEC',
  fonteTitulo: "'Saira',system-ui,sans-serif", fonteTexto: "'IBM Plex Sans',system-ui,sans-serif", googleFonts: FONTES,
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: 'Bancada', paginas: 8, texto: 'Branco e o vermelho do logo, com fotos de aula prática: as quatro áreas de cursos, os mais procurados, a história desde 2009 e as turmas.', pontos: [`${TOTAL} cursos organizados em 4 áreas`, 'Cada curso com carga horária e conteúdo', 'Pedido de valores pelo WhatsApp em cada curso'] },
    { letra: 'b', nome: 'Circuito', paginas: 8, texto: 'Grafite escuro e o vermelho do botão "liga" do logo: as bancadas na abertura, as áreas com a lista completa de cursos e a metodologia ativa.', pontos: ['Visual de laboratório', 'Todos os cursos na página inicial', 'Fotos reais das turmas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
});
