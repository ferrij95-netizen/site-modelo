// Gera clientes/reisereis/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/reisereis/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const pub = path.join(path.dirname(new URL(import.meta.url).pathname), '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`reisereis: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#A8946F', fundo: '#3B393B', claro: '#F1EEEA',
  fonteTitulo: "Cinzel,Georgia,serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`, corTextoBotao: '#1F1E1F',
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 16, texto: 'Fiel ao site de hoje: a faixa grafite com o logo, o prédio da Savassi na abertura, o informativo e os ladrilhos 01 a 06 em grafite e areia, agora nítidos e com as fotos coloridas do escritório.', pontos: ['Títulos na mesma letra do “Reis & Reis” do logo', 'Cada área de atuação com página própria', 'Artigos da equipe com página e assinatura'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 16, texto: 'Mais sóbria, como um parecer: as seis áreas num índice numerado, as três frentes do escritório (negocial, pareceres e contencioso) e o currículo do titular em linha do tempo.', pontos: ['Títulos em Anton, a fonte do site atual', 'Índice das áreas com cada item numerado', 'Equipe completa já na página inicial'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('reisereis: escolha em public/index.html');
