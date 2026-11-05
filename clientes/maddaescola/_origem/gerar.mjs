// Gera clientes/maddaescola/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/maddaescola/_origem/gerar.mjs
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
  console.log(`maddaescola: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#8FB52E', fundo: '#4E3B66', claro: '#F6EEFB',
  fonteTitulo: 'Fredoka,system-ui,sans-serif', fonteTexto: "'Nunito Sans',system-ui,sans-serif",
  googleFonts: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fica perto do site atual: fundo lilás, cabeçalho branco com a borda recortada, o logo redondo grande e o menu colorido. "Matrículas abertas" continua sendo a primeira coisa que a família vê, agora legível e com o telefone ao lado.', pontos: ['O lema "ensinar, cuidar e estimular" em três passos ligados por uma trilha', 'Mosaico com as fotos reais dos espaços', 'Pontos "Navegue pelo site" na lateral, como no site atual'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais clara e arejada: abre com "A segunda casa da sua criança" e uma colagem de fotos em círculos com os aros verde, laranja e lilás do logo. Os espaços aparecem numa foto que troca enquanto a família rola a página.', pontos: ['Faixa com os fatos principais: turmas, horário, proposta e bairro', 'Seis espaços da escola, um de cada vez', 'Rodapé roxo e mapa em todas as páginas'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('maddaescola: escolha em public/index.html');
