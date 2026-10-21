// Gera clientes/forcap/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/forcap/_origem/gerar.mjs
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
  console.log(`forcap: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, artigo: 'da', url: E.url, lang: 'pt', cor: '#F26F2C', fundo: '#061143', claro: '#EAF0FA',
  fonteTitulo: "'Barlow Semi Condensed',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,600;0,700;1,700;1,800&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 14, texto: 'Fiel ao site de hoje: faixa azul-marinho, telefone e horário no topo, barra de menu azul e a vitrine "Nossos veículos" com as oito linhas, agora com fotos grandes e ficha de cada modelo.', pontos: ['Vitrine das 8 linhas como no site atual', 'Cada modelo com lugares, motor e ficha em PDF', '"Pedir proposta" já abre o WhatsApp com o modelo'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 14, texto: 'Pensada para quem compra frota: abre perguntando quantos lugares a operação precisa, mostra a capacidade de cada linha numa régua e compara as versões lado a lado.', pontos: ['Escolha pelo número de passageiros', 'Régua de capacidade das oito linhas', 'Pós-venda em 4 passos: peças, oficina e entrega'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('forcap: escolha em public/index.html');
