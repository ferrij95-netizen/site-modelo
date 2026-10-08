// Monta o site da raiz e todos os clientes em clientes/<cliente>/, e roda o check em cada um.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { repo } from './paths.mjs';

const run = (script, arg) => execFileSync(process.execPath, [path.join(repo, 'scripts', script), ...(arg ? [arg] : [])], { stdio: 'inherit' });
const clientes = fs.existsSync(path.join(repo, 'clientes'))
  ? fs.readdirSync(path.join(repo, 'clientes')).filter(c => fs.existsSync(path.join(repo, 'clientes', c, 'site.config.json')))
  : [];

// Cliente ainda sem design/ (fase de direções visuais): publica só a pasta public/.
const temDesign = c => fs.existsSync(path.join(repo, 'clientes', c, 'design/layout.html'));

run('build.mjs');
for (const c of clientes) {
  if (temDesign(c)) run('build.mjs', `clientes/${c}`);
  else {
    fs.cpSync(path.join(repo, 'clientes', c, 'public'), path.join(repo, 'dist/_clientes', c), { recursive: true });
    console.log(`build: clientes/${c} sem design/, publicada só a pasta public/`);
  }
}
run('hub.mjs');
run('check.mjs');
for (const c of clientes) if (temDesign(c)) run('check.mjs', `clientes/${c}`);
