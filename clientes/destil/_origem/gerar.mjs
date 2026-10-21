// Gera clientes/destil/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/destil/_origem/gerar.mjs
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
  console.log(`destil: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#FF7117', fundo: '#1c1c1c', claro: '#f2f1ef',
  fonteTitulo: "'Archivo',system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,700;112,800;125,800;125,900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 6, texto: 'Fiel ao site de hoje: barra laranja, logo com e-mail e telefones no topo, menu grafite com "Outros serviços", a colagem dos setores sobre a faixa laranja e a faixa diagonal dos slides, agora com os textos fora das imagens e funcionando no celular.', pontos: ['Colagem de setores do site atual na abertura', 'Balanceamento, metalização e fresamento lado a lado', 'Fotos reais do galpão, da ponte rolante e das peças'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 6, texto: 'Mais moderna e técnica: abre com o rotor laranja na balanceadora e mostra o serviço em cinco etapas com fotos, da chegada da peça ao certificado.', pontos: ['Processo em etapas, com o certificado no fim', 'Peças que passam pela balanceadora, em faixa de fotos', 'Antes e depois da metalização'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('destil: escolha em public/index.html');
