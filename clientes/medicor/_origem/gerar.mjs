// Gera clientes/medicor/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/medicor/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E, catalogo } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [caminho, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, caminho);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`medicor: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: 'Medicor', url: E.url, lang: 'pt', cor: '#65D8B1', fundo: '#054948', claro: '#f4f4ea',
  fonteTitulo: "Archivo,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5 + catalogo.length, texto: 'Fiel ao site de hoje: moldura verde-oliva, as fotos dos banners com o degradê verde-água, a faixa "Tecnologia e qualidade" com o selo RMDESC e o menu de produtos ao lado, agora com acabamento novo e funcionando no celular.', pontos: ['Os 31 produtos com ficha completa, códigos e registro ANVISA', 'Selo "Tô nessa" e a bandeira Conhecimento + Amor', 'Cotação montada no site e enviada pelo WhatsApp comercial', 'Português e inglês, como o site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5 + catalogo.length, texto: 'Mais clara e técnica, no azul-petróleo do logo: o comprador do hospital acha o produto pela área de uso, vê a ficha técnica e baixa a documentação para o cadastro de fornecedor.', pontos: ['Produtos por área: hemodiálise, infusão, enteral, EPI', 'Busca por nome, código ou registro ANVISA', '34 documentos para baixar: alvarás, INMETRO, registros', 'Como comprar em quatro passos'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('medicor: escolha em public/index.html');
