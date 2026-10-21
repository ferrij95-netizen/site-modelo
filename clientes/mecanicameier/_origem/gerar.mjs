// Gera clientes/mecanicameier/public/{index.html,a/,b/}. Rodar depois de mudar qualquer texto:
// node clientes/mecanicameier/_origem/gerar.mjs
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
  console.log(`mecanicameier: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}


// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#B3241C', fundo: '#161616', claro: '#f1efec',
  fonteTitulo: "Urbanist,system-ui,sans-serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@700;800;900&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site de hoje: fundo escuro com o xadrez de carbono, a placa vermelha do logo e o banner com os serviços dos dois lados da foto, agora com as fotos reais da oficina e funcionando no celular.', pontos: ['Banner com as listas de serviço e fotos passando', 'Faixa das 23 marcas, Missão, Visão e o lema', 'Galeria com as 54 fotos da oficina, por tipo de carro'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna e clara: foto grande da oficina, a história do Adelino na ferramentaria ("precisão na casa dos mícrons") e o câmbio automático em primeiro plano.', pontos: ['Nota 4,6 do Google logo na abertura', 'Especialidades em abas e o atendimento em 4 etapas', 'Agendamento pelo site, direto no WhatsApp'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: false },
}));
console.log('mecanicameier: escolha em public/index.html');
