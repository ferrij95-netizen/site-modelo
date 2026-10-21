// Conteúdo da Führ Contabilidade, tirado do site atual (fuhrcontabilidade.com.br, páginas Empresa, Serviços, Depoimentos,
// Parceiros, Links e iArtigos). Os links de utilitários e os artigos vêm de dados-site-atual.json (copiados do site em 21/10/2026).
import fs from 'node:fs';
import path from 'node:path';

const dados = JSON.parse(fs.readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'dados-site-atual.json'), 'utf8'));

export const empresa = {
  nome: 'Führ Contabilidade',
  completo: 'Führ Contabilidade e Assessoria',
  crc: 'CRC RS-004775/O',
  url: 'https://fuhrcontabilidade.overtus.com.br/',
  antigo: 'https://www.fuhrcontabilidade.com.br/',
  fundacao: 2009,
  endereco: ['Rua Júlio de Castilhos, 745, sala 404', 'Centro, Lajeado (RS)'],
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+J%C3%BAlio+de+Castilhos+745+Lajeado+RS',
  mapaEmbed: 'https://www.google.com/maps?q=Rua+J%C3%BAlio+de+Castilhos,+745,+Centro,+Lajeado+-+RS&output=embed',
  fones: [
    { t: '(51) 3710-1862', h: '+555137101862' },
    { t: '(51) 3011-1862', h: '+555130111862' },
    { t: '(51) 3011-1863', h: '+555130111863' },
  ],
  celular: '(51) 99587-0431',
  wa: '5551995870431',
  email: 'contato@fuhrcontabilidade.com.br',
  // Área restrita iDocumentos: mesmo formulário do site atual (envia direto para o sistema da Ideal, em outra aba).
  idoc: { action: 'https://sistemaidocumentos.com.br/areadocliente/home/logar/', codigo: 'lacontabilidade' },
};

export const textos = {
  bemVindo: 'Acesse o nosso website, através dele você conhecerá a Führ Contabilidade e Assessoria. Utilizamos a tecnologia como uma prestação de serviço inovador de contabilidade ao nosso cliente. Navegue pelo nosso site e saiba o que podemos lhe oferecer!',
  frase: { t: 'Você nunca sabe que resultados virão da sua ação, mas se não fizer nada, não existirão resultados.', autor: 'Mahatma Gandhi' },
  contatoFrase: 'Nossa satisfação se deve ao crescimento de sua empresa',
  historia: [
    'A Führ Contabilidade e Assessoria, com sede na Rua Júlio de Castilhos, 745, sala 404, Centro, em Lajeado/RS, foi fundada em 2009. Inicialmente contava com 3 colaboradores e cerca de 30 clientes.',
    'Sempre em busca de conhecimento e atendimento diferenciado, oferecendo serviços de excelente qualidade, conseguimos crescer no mercado e hoje contamos com 10 colaboradores e mais de 100 clientes.',
    'Asseguramos a excelência dos nossos serviços, mantendo uma equipe em permanente atualização com relação à legislação, oferecendo soluções inteligentes com competência, confiabilidade e rapidez.',
  ],
  missao: 'Fornecer serviços contábeis, gerenciais e de consultoria, com qualidade, segurança e agilidade, através de profissionais capacitados em constante atualização, buscando a satisfação dos nossos clientes.',
  visao: 'Ser reconhecido pela excelência em serviços contábeis, contribuindo para o sucesso dos clientes e dos colaboradores.',
  valores: ['Excelência e transparência', 'Responsabilidade e ética profissional', 'Profissionalismo, zelo e dedicação', 'Valorização do capital humano e intelectual'],
};

export const numeros = [
  { n: '2009', t: 'fundada em Lajeado' },
  { n: '10', t: 'colaboradores' },
  { n: '100+', t: 'empresas atendidas' },
];
export const inicio = { colab: 3, clientes: 30 };

export const segmentos = ['Indústria', 'Comércio', 'Importação', 'Exportação', 'Construção civil', 'Transportes', 'Prestadores de serviços', 'Entidades', 'Associações'];

// "O que fazemos": as quatro áreas e os itens exatamente como no site atual. Os resumos curtos são nossos.
export const servicos = [
  { id: 'contabil', nome: 'Gestão de assessoria contábil e fiscal', curto: 'Contábil e fiscal', resumo: 'A rotina contábil e fiscal da empresa em dia, com as demonstrações e a análise que ajudam a decidir.',
    itens: ['Execução das rotinas fiscais e contábeis', 'Elaboração das demonstrações contábeis', 'Análise de balanço', 'Consultoria em procedimentos fiscais e contábeis', 'Elaboração de orçamento empresarial'] },
  { id: 'tributario', nome: 'Planejamento e consultoria tributária e financeira', curto: 'Tributário e financeiro', resumo: 'O regime certo e a menor carga tributária dentro da lei, com apoio nas decisões financeiras.',
    itens: ['Análise de viabilidade do regime de tributação', 'Análise de redução da carga tributária', 'Análise de redução de passivos tributários', 'Assistência para tomada de decisões na área financeira'] },
  { id: 'societario', nome: 'Gestão societária', curto: 'Societário', resumo: 'Da abertura ao encerramento: contratos, alterações e regularização nos órgãos.',
    itens: ['Abertura e encerramento de empresas', 'Elaboração de contratos societários e alterações', 'Transformação do tipo jurídico', 'Regularização de empresas nos órgãos competentes'] },
  { id: 'rh', nome: 'Gestão de recursos humanos', curto: 'Trabalhista', resumo: 'Folha, encargos e rotinas trabalhistas, com orientação para evitar passivos.',
    itens: ['Gerenciamento e execução das rotinas trabalhistas e previdenciárias', 'Consultoria trabalhista', 'Orientação para redução de passivos trabalhistas'] },
];

// Depoimentos do site atual (o 5º repete o 1º lá; aqui aparece uma vez). O de Sulati estava sem aspas de fechamento.
export const depoimentos = [
  { t: 'Trabalhar com a Führ Contabilidade é seguro, confiável e tranquilo. Uma equipe atenciosa, dinâmica, ágil e que faz acontecer. Nos transmite segurança naquilo que faz.', quem: 'Biscobom Alimentos', logo: 'biscobom' },
  { t: 'O trabalho da Führ Contabilidade é extremamente profissional. Lançamentos realizados com ética e agilidade, sempre priorizando leis e prazos. Junto a todo esse trabalho, presta a assessoria sempre considerando a evolução da empresa.', quem: 'STW Soluções em Automação', logo: 'stw-automacao' },
  { t: 'Temos uma duradoura parceria com a Führ Contabilidade. Sempre fomos e somos atendidos de forma ágil, profissional e 100% confiável por sua equipe, tendo um ótimo relacionamento com todos os seus profissionais.', quem: 'Hidraucâmbio Peças e Serviços Automotivos Ltda', logo: 'hidraucambio' },
  { t: 'Sou Marines, trabalho na Hidraucâmbio Iveco em Lajeado. Temos esta parceria com o escritório Führ Contabilidade desde setembro/19 e estamos muito satisfeitos com o atendimento de toda a equipe e a preocupação que eles têm em encontrar a melhor solução.', quem: 'Sulati Transporte e Representações Ltda' },
];

// Página "Parceiros": logos e links do site atual (dois logos do site original não abrem e ficaram de fora).
export const clientes = [
  { logo: 'biscobom', nome: 'Biscobom Alimentos', url: 'http://www.biscobom.ind.br' },
  { logo: 'stw-automacao', nome: 'STW Soluções em Automação', url: 'https://www.stwautomacao.com.br' },
  { logo: 'hidraucambio', nome: 'Hidraucâmbio', url: 'http://www.hidraucambiolajeado.com.br/' },
  { logo: 'eldorado-caminhoes', nome: 'Eldorado Caminhões (DAF)', url: 'http://www.daf-eldorado.com.br/' },
  { logo: 'embala-brasil', nome: 'Embala Brasil', url: 'http://www.embalabrasilrs.com.br' },
  { logo: 'conexo-seguros', nome: 'Conexo Seguros', url: 'http://www.conexoseguros.com.br' },
  { logo: 'mafra-utilidades', nome: 'Mafra Utilidades', url: 'https://www.mafrautilidades.com.br/' },
  { logo: 'supermercado-rg', nome: 'Supermercado RG' },
  { logo: 'ativario', nome: 'Ativa Rio Soluções' },
];

// Atalhos do site atual (faixa azul de ícones). iArtigos e Utilitários viraram páginas do site; os outros seguem no portal da Ideal.
export const atalhos = [
  { id: 'artigos', nome: 'iArtigos', t: 'Artigos da equipe sobre a rotina das empresas', pag: 'artigos/' },
  { id: 'utilitarios', nome: 'Utilitários contábeis', t: 'Receita, CRC, Sefaz, Simples, FGTS e mais', pag: 'utilitarios/' },
  { id: 'tabelas', nome: 'Tabelas práticas', t: 'INSS, IR, salário mínimo e outras tabelas', url: 'http://idealsoftwares.com.br/tabelas/' },
  { id: 'manual', nome: 'Manual empresarial', t: 'Guia de obrigações e rotinas da empresa', url: 'http://idealsoftwares.com.br/links/manual_empresarial/' },
  { id: 'indices', nome: 'Índices econômicos', t: 'Selic, IGP-M, IPCA, dólar e outros', url: 'http://www.idealsoftwares.com.br/indices/indices.html' },
];

// Agenda tributária (Ideal Softwares, agenda 610 do escritório). Dias marcados copiados do site atual para outubro de 2026.
export const agenda = {
  link: 'http://idealsoftwares.com.br/agendas/index-.php?ag=610',
  estadual: 'http://idealsoftwares.com.br/agendas/index-.php',
  dias: { '2026-10': [5, 6, 7, 9, 10, 15, 20, 23, 30] },
};

// Últimas notícias (Ideal News, como na home atual), em 20/10/2026.
export const noticias = {
  todas: 'http://www.idealsoftwares.com.br/idealnews/lista_de_noticias.php',
  itens: [
    { d: '20/10/2026', t: 'Reforma Tributária/PI: empresas têm até 30 de outubro para optar pelo Simples Híbrido', u: 'http://www.idealsoftwares.com.br/idealnews/noticia.php?id=34598' },
    { d: '20/10/2026', t: 'IPVA/BA: donos de veículos com placas de finais 7 e 8 devem quitar o IPVA até o fim de outubro', u: 'http://www.idealsoftwares.com.br/idealnews/noticia.php?id=34597' },
    { d: '20/10/2026', t: 'Receita Federal antecipou pagamento da restituição para 80% dos contribuintes', u: 'http://www.idealsoftwares.com.br/idealnews/noticia.php?id=34596' },
    { d: '20/10/2026', t: 'Receita Federal bate recordes na restituição do IRPF e reforça a orientação e o respeito aos direitos', u: 'http://www.idealsoftwares.com.br/idealnews/noticia.php?id=34595' },
    { d: '20/10/2026', t: 'Parada programada de sistemas', u: 'http://www.idealsoftwares.com.br/idealnews/noticia.php?id=34594' },
  ],
};

export const utilitarios = dados.utilitarios;

// Artigos: lista do iArtigos; os seis com texto completo ganham página própria aqui.
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const artigos = dados.artigos.map(a => {
  const m = a.titulo.match(/^(\d\d\/\d\d\/\d{4}) [\d:]+ (.*)$/);
  const titulo = m ? m[2] : a.titulo;
  const linhas = dados.textos[a.id];
  return { id: a.id, data: m ? m[1] : a.data, titulo, url: a.url, slug: slug(titulo), corpo: linhas ? linhas.slice(1).filter((l, i) => !(i === 0 && l === titulo)) : null };
});
export const temas = { 70: 'Gestão de pessoas', 69: 'Reforma tributária', 68: 'Reforma tributária', 67: 'Reforma tributária', 66: 'Reforma tributária', 59: 'Gestão' };
