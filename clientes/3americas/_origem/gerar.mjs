// Gera clientes/3americas/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/3americas/_origem/gerar.mjs
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
  console.log(`3americas: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
if (fs.existsSync(path.join(pub, 'assets/apresentacao/a-pc.webp'))) {
  fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
    nome: 'Três Américas', artigo: 'da', url: E.url, lang: 'pt', cor: '#c4161c', fundo: '#002a57', claro: '#f1f3f6',
    fonteTitulo: "Saira,system-ui,sans-serif", fonteTexto: "'Open Sans',system-ui,sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,700;0,800;1,800&family=Open+Sans:wght@400;500&display=swap',
    favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
    versoes: [
      { letra: 'a', nome: nomesVersao.a, paginas: 12, texto: 'Fiel ao site atual: topo claro com acesso restrito, menu azul-marinho, a foto da carreta na estrada e o mapa-múndi de fundo, com acabamento novo.', pontos: ['Mesma ordem: serviços, clientes, depoimentos e rodapé azul', 'Mapa do Brasil com a matriz e as filiais', '31 clientes, depoimentos em vídeo e seis filiais com responsáveis'] },
      { letra: 'b', nome: nomesVersao.b, paginas: 12, texto: 'Mais moderna: foto cheia da frota, números grandes, as etapas da operação sobre a estrada e a malha de filiais no mapa.', pontos: ['Frota de tanques em números: 18 bitrens e 30 rodotrens', 'Coleta, armazenagem, transporte, monitoramento e entrega', 'Logos de clientes correndo e depoimentos em vídeo'] },
    ],
    antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
  }));
  console.log('3americas: escolha em public/index.html');
}
