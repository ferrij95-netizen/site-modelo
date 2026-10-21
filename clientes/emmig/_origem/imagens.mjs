// Converte as fotos originais do site atual em webp para public/assets/img/.
// Uso: node clientes/emmig/_origem/imagens.mjs <pasta-com-os-originais>
// Os originais (AAAA_MM_nome.jpg, baixados de emmig.com.br/portal/wp-content/uploads) não ficam no repositório.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { obras, soltas } from './conteudo.mjs';

const origem = process.argv[2];
if (!origem) { console.error('informe a pasta dos originais'); process.exit(1); }
const destino = path.join(path.dirname(new URL(import.meta.url).pathname), '../public/assets/img');
fs.mkdirSync(destino, { recursive: true });

const tarefas = [];
for (const o of obras) o.fotos.forEach((f, i) => tarefas.push([f, `${o.slug}-${i + 1}`, 1400]));
for (const [nome, f] of Object.entries(soltas)) tarefas.push([f, nome, nome.startsWith('capa') ? 1920 : 1400]);

for (const [f, nome, larg] of tarefas) {
  const src = path.join(origem, f);
  if (!fs.existsSync(src)) { console.warn('faltou', f); continue; }
  await sharp(src).rotate().resize({ width: larg, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(destino, `${nome}.webp`));
}

// Logo: só existe em 309x108 (PNG com fundo transparente, texto branco). Ampliado 3x para telas retina.
const logo = path.join(origem, '2016_06_logo-cabecalho.png');
await sharp(logo).resize({ width: 927, kernel: 'lanczos3' }).png().toFile(path.join(destino, '../logo.png'));
// Favicon: só o símbolo (a peça de aço à esquerda do logo).
await sharp(logo).extract({ left: 0, top: 0, width: 118, height: 108 }).resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(destino, '../favicon.png'));
console.log(`emmig: ${tarefas.length} fotos`);
