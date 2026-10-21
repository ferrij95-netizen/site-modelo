// Gera clientes/unitec/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/unitec/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [rota, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, rota);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`unitec: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas (pt, en, es)`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#3b8fd4', fundo: '#062f55', claro: '#f2f6f9',
  fonteTitulo: "'Barlow',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow:wght@500;600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 80, texto: 'Clara, com os produtos em destaque num mosaico com o desenho do símbolo da Unitec.', pontos: ['Catálogo com 69 produtos e 70 acessórios, filtro e busca por código', 'Destaques dos banners atuais e cores dos gases', 'Português, inglês e espanhol'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 80, texto: 'Azul, organizada pelo caminho do gás no hospital, do cilindro ao paciente.', pontos: ['Busca de produto logo na abertura', 'Produtos por ambiente: leito, UTI, centro cirúrgico, emergência', 'Certificações e feiras em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('unitec: escolha em public/index.html');
