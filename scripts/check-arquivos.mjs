// Falha o build se dist/ passar do limite de arquivos por versão do Worker (20.000 no plano Free da Cloudflare).
// Acima disso o deploy é recusado e nenhum site novo vai ao ar; avisa antes de chegar lá.
import fs from 'node:fs';
import path from 'node:path';
import { repo } from './paths.mjs';

const LIMITE = 20000;
const AVISO = 18500;

let total = 0;
const contar = dir => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) contar(path.join(dir, e.name));
    else total++;
  }
};
contar(path.join(repo, 'dist'));

if (total >= LIMITE) {
  console.error(`check-arquivos: ${total} arquivos em dist/, acima do limite de ${LIMITE} da Cloudflare (plano Free).`);
  console.error('Saídas: plano Workers Paid (100.000 arquivos) ou tirar imagens/arquivos de dist/ (ex.: R2).');
  process.exit(1);
}
console.log(`check-arquivos: ${total} arquivos em dist/ (limite ${LIMITE})${total >= AVISO ? ' ATENÇÃO: perto do limite' : ''}`);
