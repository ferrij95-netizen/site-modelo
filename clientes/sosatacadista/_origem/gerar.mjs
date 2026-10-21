// Gera clientes/sosatacadista/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/sosatacadista/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao, catalogoJson } from './paginas.mjs';
import { empresa as E, produtos, departamentos } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
fs.writeFileSync(path.join(pub, 'assets/catalogo.json'), catalogoJson());
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`sosatacadista: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'do', url: E.url, lang: 'pt', cor: '#F25C05', fundo: '#0E4A22', claro: '#FFFDF2',
  fonteTitulo: 'Montserrat,system-ui,sans-serif', fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 20, texto: 'A loja de hoje, arrumada: logo, busca e telefones no topo, o menu com os botões inclinados, o encarte da semana em destaque e os departamentos ao lado, como no site atual, agora abrindo bem no celular.', pontos: [`${produtos.length} produtos com foto, divididos nos ${departamentos.length} departamentos, com busca`, 'Ofertas do encarte com preço em texto e botão “Adicionar”', 'Lista de pedido que vai pronta para o WhatsApp de vendas'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 13, texto: 'Pensada como ferramenta de venda: o cliente diz se é pizzaria, padaria, pastelaria, lanchonete, mercado ou hotel e já cai na lista de produtos certa, com quantidade e envio do pedido na mesma tela.', pontos: ['Pedido rápido em tabela, com busca e resumo ao lado', 'Seis listas prontas por tipo de negócio', 'Semana de atendimento e entrega explicada num quadro'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('sosatacadista: escolha em public/index.html');
