// Textos e dados da Venturi, todos do site atual (venturi.net.br, plataforma Kenlo) em 30/10/2026.
import fs from 'node:fs';
import path from 'node:path';

const aqui = path.dirname(new URL(import.meta.url).pathname);

export const empresa = {
  nome: 'Venturi',
  nomeLongo: 'Venturi Consultoria Imobiliária',
  url: 'https://venturi.overtus.com.br/',
  antigo: 'https://www.venturi.net.br/',
  slogan: 'Blumenau começa pelo seu endereço.',
  sub: 'Imóveis escolhidos para os seus próximos capítulos.',
  especialidade: 'Especialista em imóveis na planta e imóveis de terceiros em Blumenau.',
  vendas: '(47) 99276-2299', whatsVendas: '5547992762299',
  locacao: '(47) 99944-5248', whatsLocacao: '5547999445248',
  fixo: '(47) 3041-2299', fixoHref: '+554730412299',
  email: 'atendimento@venturi.net.br',
  endereco: 'Rua General Osório, 1077', bairro: 'Velha', cidade: 'Blumenau', uf: 'SC', cep: '89041-000',
  creci: '4811J',
  mapa: 'https://www.google.com/maps/search/?api=1&query=Rua+General+Os%C3%B3rio%2C+1077%2C+Velha%2C+Blumenau+SC',
  mapaEmbed: 'https://maps.google.com/maps?q=-26.9102993,-49.1185989&z=16&output=embed',
  areaLocatario: 'https://adm05129502.superlogica.net/clients/areadocliente',
  areaProprietario: 'https://adm05129502.superlogica.net/clients/areadofornecedor',
  aVenda: 715,
  cidades: ['Blumenau', 'Gaspar', 'Indaial'],
  redes: {
    instagram: 'https://www.instagram.com/venturi.imobiliaria/',
    facebook: 'https://www.facebook.com/venturi.imobiliaria',
    linkedin: 'https://www.linkedin.com/company/venturi-blumenau/',
    youtube: 'https://www.youtube.com/channel/UCU6Tb9PlhgA3tTi_pBLps1g',
  },
};

// Os três atalhos da faixa azul da home atual.
export const servicos = [
  { slug: 'encomende', icone: 'busca', titulo: 'Imóvel sob encomenda', texto: 'Descreva o imóvel que você procura e nós avisaremos quando encontrá-lo.', acao: 'Encomende seu imóvel' },
  { slug: 'financiamento', icone: 'cifrao', titulo: 'Financiamento', texto: 'As melhores ofertas de crédito para você financiar seu imóvel.', acao: 'Faça uma simulação' },
  { slug: 'anuncie', icone: 'placa', titulo: 'Cadastre seu imóvel', texto: 'Anuncie conosco! Nós encontraremos o melhor negócio para você.', acao: 'Cadastre seu imóvel' },
];

// Página "Financiamento e bancos" do site atual.
export const bancos = [
  { nome: 'Caixa', url: 'http://www8.caixa.gov.br/siopiinternet/simulaOperacaoInternet.do?method=inicializarCasoUso', cor: '#005CA9' },
  { nome: 'Banco do Brasil', url: 'https://www42.bb.com.br/portalbb/imobiliario/creditoimobiliario/simular,802,2250,2250.bbx', cor: '#F8D117' },
  { nome: 'Itaú', url: 'https://credito-imobiliario.itau.com.br/', cor: '#EC7000' },
];

// Rodapé do site atual: "Descubra outras possibilidades" e "Bairros mais populares" (os primeiros).
export const tipos = ['Apartamento', 'Casa', 'Cobertura', 'Terreno', 'Sala', 'Loja', 'Galpão', 'Prédio', 'Área', 'Chácara'];
export const bairrosPopulares = ['Velha', 'Escola Agrícola', 'Água Verde', 'Vila Nova', 'Itoupava Norte', 'Centro', 'Victor Konder', 'Itoupava Seca', 'Velha Central', 'Itoupava Central', 'Ponta Aguda', 'Fortaleza', 'Passo Manso', 'Garcia', 'Vorstadt', 'Jardim Blumenau'];
export const condominios = ['Paysage Corpal High Park', 'Bella Cittá Condomínio Parque', 'Cosmopolitan', 'Absolut', 'Porto Belo Residencial', 'Villa Toscana Residence Club', 'Edros 355', 'Empire Residence', 'Le Gris', 'Terraço Sky'];

// 18 imóveis reais da busca atual (12 à venda, 6 para alugar), lidos das fichas do site atual.
const brutos = JSON.parse(fs.readFileSync(path.join(aqui, 'imoveis.json'), 'utf8'));
const fimPadrao = /^(A Venturi Imobiliária|Somos a Venturi|WhatsApp:|Fixo:|www\.|Instagram:|Agende sua visita com a equipe)/i;
export const imoveis = brutos.map(d => {
  const c = d.campos;
  const bairro = d.bairro.replace(' (Blumenau)', '');
  const area = c['Área útil'] || c['Área construída'] || c['Área privativa'] || c['Área do terreno'];
  return {
    cod: d.cod,
    slug: d.cod.toLowerCase(),
    negocio: d.negocio,
    tipo: d.tipo,
    bairro,
    cidade: d.cidade,
    rua: d.rua,
    preco: d.preco,
    cond: c['Condomínio'] && c['Condomínio'] !== 'R$ 0,01' ? c['Condomínio'] : '',
    iptu: c['IPTU'] || '',
    pacote: c['Pacote de locação'] || '',
    m2: c['Valor do m²'] || '',
    area,
    terreno: c['Área do terreno'] && c['Área do terreno'] !== area ? c['Área do terreno'] : '',
    quartos: c['Quarto'] || '',
    suites: c['Suíte'] || '',
    banheiros: c['Banheiro'] || '',
    vagas: c['Vaga'] || '',
    pet: c['Aceita pet'] === 'Sim',
    desc: d.desc.filter(l => !fimPadrao.test(l)),
    carac: d.carac.filter(x => !/^(Água|Esgoto|Energia elétrica)$/.test(x)),
    fotos: d.fotos.map(f => f.replace('.webp', '')),
  };
});
