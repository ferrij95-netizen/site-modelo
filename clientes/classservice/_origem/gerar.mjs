// Gera clientes/classservice/public/{index.html,a/,b/,creditos/}. Rodar depois de mudar qualquer texto:
// node clientes/classservice/_origem/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { gerarVersao, nomesVersao } from './paginas.mjs';
import { empresa as E } from './conteudo.mjs';

const aqui = path.dirname(new URL(import.meta.url).pathname);
const pub = path.join(aqui, '../public');
for (const v of ['a', 'b']) {
  const paginas = gerarVersao(v);
  fs.rmSync(path.join(pub, v), { recursive: true, force: true });
  for (const [slug, html] of Object.entries(paginas)) {
    const dir = path.join(pub, v, slug === 'index' ? '' : slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  console.log(`classservice: versão ${v.toUpperCase()}, ${Object.keys(paginas).length} páginas`);
}

// créditos das fotos de banco livre (Wikimedia Commons, via Openverse)
const cred = JSON.parse(fs.readFileSync(path.join(aqui, 'creditos.json'), 'utf8'));
fs.mkdirSync(path.join(pub, 'creditos'), { recursive: true });
fs.writeFileSync(path.join(pub, 'creditos/index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Créditos das fotos · Class-Service</title><meta name="robots" content="noindex"><link rel="icon" href="/assets/favicon.png"><style>body{font:16px/1.6 Inter,system-ui,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;color:#333}h1{font-family:Tinos,serif;font-weight:400}li{margin:0 0 10px}</style></head><body><h1>Créditos das fotos</h1><p>Fotos do site atual da Class-Service: oficina, equipamento Beissbarth, faixas do destaque e certificados. As demais são de banco livre, com licença Creative Commons:</p><ul>${cred.map(c => `<li><b>${c.arquivo}</b>: “${c.titulo}”, ${c.autor || 'autor não informado'}, ${c.licenca.replace('CC CC0', 'CC0')} · <a href="${c.fonte}">fonte</a></li>`).join('')}</ul><p><a href="/">Voltar</a></p></body></html>`);

// Página de escolha em formato de apresentação (componentes/apresentacao/ na raiz do repositório).
if (!fs.existsSync(path.join(pub, 'assets/apresentacao/b-cel.webp'))) process.exit(0);
const kit = path.join(pub, '../../../componentes/apresentacao');
for (const f of ['apresenta.css', 'apresenta.js']) fs.copyFileSync(path.join(kit, f), path.join(pub, 'assets', f));
const { paginaEscolha } = await import(path.join(kit, 'escolha.mjs'));
fs.writeFileSync(path.join(pub, 'index.html'), paginaEscolha({
  nome: E.nome, url: E.url, lang: 'pt', cor: '#d4001f', fundo: '#1d1e20', claro: '#f2f3f4',
  fonteTitulo: "Tinos,'Times New Roman',serif", fonteTexto: 'Inter,system-ui,sans-serif',
  googleFonts: 'https://fonts.googleapis.com/css2?family=Tinos:wght@400;700&family=Inter:wght@400;500&display=swap',
  favicon: '/assets/favicon.png', ogImagem: `${E.url}assets/og-a.jpg`,
  versoes: [
    { letra: 'a', nome: nomesVersao.a, paginas: 5, texto: 'Fiel ao site de hoje: moldura grafite de metal escovado, o logo no centro com o filete vermelho, o destaque com os botões numerados, as placas Class-Service e Class-WebCar e os três quadros com foto, agora com acabamento novo e funcionando no celular.', pontos: ['Os 7 serviços do site atual, cada um com foto e explicação', 'Os 14 cursos Mercedes-Benz com os certificados', 'Agendamento que chega pronto no WhatsApp'] },
    { letra: 'b', nome: nomesVersao.b, paginas: 5, texto: 'Mais moderna e clara: mostra como funciona a visita, do agendamento à apresentação técnica na entrega, e põe a formação de fábrica numa linha do tempo de 1999 a 2005.', pontos: ['Serviços com foto que troca ao passar o mouse', 'Etapas da visita e o que o laudo da Class-WebCar avalia', 'Nota 4,8 no Google em destaque'] },
  ],
  antigo: { url: E.antigo, img: '/assets/apresentacao/atual-pc.webp', rola: true },
}));
console.log('classservice: escolha em public/index.html');
