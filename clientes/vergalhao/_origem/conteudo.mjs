// Textos e dados da Vergalhão, tirados do site atual (www.vergalhao.com) em 21/10/2026.
// O catálogo (catalogo.json) é o mesmo do site atual: departamentos, linhas, produtos, códigos, descrições e fotos.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);
export const catalogo = JSON.parse(fs.readFileSync(path.join(aqui, 'catalogo.json'), 'utf8'));

export const empresa = {
  nome: 'Vergalhão',
  razao: 'Vergalhão Comércio e Representações',
  url: 'https://vergalhao.overtus.com.br/',
  antigo: 'http://www.vergalhao.com/',
  fundacao: '14 de novembro de 1994',
  // "TEL.: (66) 3515-9200 / 9985-9200" no rodapé do site atual; o celular ganhou o 9 na frente (a confirmar).
  whats: '5566999859200',
  whatsTexto: '(66) 99985-9200',
};

export const unidades = [
  {
    nome: 'Matriz', cidade: 'Sinop', uf: 'MT',
    fone: '(66) 3515-9200', foneHref: '+556635159200',
    endereco: ['Rua João Pedro Moreira de Carvalho, 525', 'Distrito Industrial · Sinop - MT', 'CEP 78557-195'],
    mapa: 'R. João Pedro Moreira de Carvalho, 525 - Distrito Industrial, Sinop - MT',
    nota: 'Sede própria: terreno de 3.000 m² e 2.100 m² de área construída.',
  },
  {
    nome: 'Filial', cidade: 'Alta Floresta', uf: 'MT',
    fone: '(66) 3521-7074', foneHref: '+556635217074',
    endereco: ['Av. Ludovico da Riva Neto, 1700-B', 'Alta Floresta - MT', 'CEP 78580-000'],
    mapa: 'Av. Ludovico da Riva Neto, 1700, Alta Floresta - MT',
    nota: 'Atendimento ao produtor e à obra no extremo norte do estado.',
  },
];

// Texto da página "A empresa" do site atual, sem mudar o sentido.
export const historia = [
  'Empresa criada em 14 de novembro de 1994, dando continuidade ao trabalho iniciado em São Paulo (SP) por Gilberto Porcel, na distribuição de aços para construção civil e arames da marca Gerdau.',
  'Em sua trajetória diversificou produtos, vindo a comercializar e representar uma ampla linha voltada ao segmento agropecuário e da construção civil.',
  'Hoje, na cidade de Sinop, conta com sede própria num terreno de 3.000 m² e 2.100 m² de área construída, além de filial em Alta Floresta.',
  'Sempre primando pela excelência no atendimento e oferecendo produtos de marcas consagradas, a Vergalhão construiu sua marca baseada na ética e na qualidade, tornando-se uma das mais respeitadas empresas do segmento na região norte de Mato Grosso.',
];

export const linhaDoTempo = [
  { ano: 'Antes de 1994', titulo: 'São Paulo', texto: 'Gilberto Porcel distribui aços para construção civil e arames Gerdau em São Paulo.' },
  { ano: '1994', titulo: 'Nasce a Vergalhão', texto: 'Em 14 de novembro, o trabalho continua em Mato Grosso com a Vergalhão.' },
  { ano: 'Depois', titulo: 'Agro e obra', texto: 'A loja passa a vender e representar uma linha completa para o campo e para a construção civil.' },
  { ano: 'Hoje', titulo: 'Sinop e Alta Floresta', texto: 'Sede própria em Sinop, com 2.100 m² construídos, e filial em Alta Floresta.' },
];

// Departamentos do site atual. "Boias" está vazio lá, então fica de fora.
const semVazios = l => l.filter(s => s.produtos.length);
export const departamentos = [
  {
    slug: 'agropecuaria', nome: 'Agropecuária', chave: 'Agropecuaria', cor: 'agro',
    linhas: semVazios(catalogo.Agropecuaria),
    resumo: 'Arame e cerca elétrica, ferramentas, sementes, inseminação, balanças TRU-TEST, pulverizadores e ração para pets.',
    foto: 'pasto.webp',
  },
  {
    slug: 'construcao-civil', nome: 'Construção civil', chave: 'Construcaocivil', cor: 'obra',
    linhas: semVazios(catalogo.Construcaocivil),
    resumo: 'Ferro CA-50 e CA-60, pregos, telas, linha de água, fixadores, EPI e ferramentas para a obra.',
    foto: 'armador.webp',
  },
];
export const totalProdutos = departamentos.reduce((n, d) => n + d.linhas.reduce((m, l) => m + l.produtos.length, 0), 0);

// Representadas: mesma ordem e linhas do site atual. Descrições curtas escritas por nós a partir do que cada marca vende.
export const representadas = [
  {
    slug: 'abs-pecplan', nome: 'ABS Pecplan', logo: 'marca-abs.png', chave: 'ABSPecplan',
    texto: 'Genética bovina: sêmen de touros de corte e de leite, sêmen sexado e botijões para armazenar.',
    foto: 'p/' + catalogo.ABSPecplan.find(l => l.nome === 'Corte Zebu').filhos.find(f => f.nome === 'Nelore').img.src + '.webp',
  },
  {
    slug: 'germisul', nome: 'Germisul', logo: 'marca-germisul.png', chave: 'Germisul',
    texto: 'Sementes de pastagens: braquiárias, panicuns e cultivares BRS para formar e reformar o pasto.',
  },
  {
    slug: 'socil', nome: 'Socil', logo: 'marca-socil.png', chave: 'Socil',
    texto: 'Nutrição animal: rações e sais minerais para bovinos, linha Royal Horse para equinos, aves, peixes e pets.',
  },
  {
    slug: 'beckhauser', nome: 'Beckhauser', logo: 'marca-beckhauser.png', chave: 'Beckhauser',
    texto: 'Manejo racional e produtivo: troncos de contenção automatizados, hidráulicos e Total Flex, e boxes para frigoríficos.',
  },
];

// Créditos das fotos de banco (Wikimedia Commons), exigidos pela licença.
export const creditos = [
  { foto: 'Gado nelore no pasto', autor: 'Carlos Ebert', licenca: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Nelore_cattle_-_12704276665.jpg' },
  { foto: 'Armador na obra', autor: 'Tomas Castelazo', licenca: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Rebar_worker.jpg' },
  { foto: 'Vergalhões', autor: 'W.carter', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:A_bunch_of_rebar_up_close.jpg' },
];
