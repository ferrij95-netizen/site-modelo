// Onde fica cada site e para onde vai o build.
// Raiz do repositório = site de exemplo, sai em dist/.
// clientes/<cliente>/ = site de um cliente, sai em dist/_clientes/<cliente>/ e o worker o serve em <cliente>.overtus.com.br.
import fs from 'node:fs';
import path from 'node:path';

export const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const siteDir = arg => (arg ? path.resolve(repo, arg) : repo);
export const distDir = arg => (arg ? path.join(repo, 'dist/_clientes', path.basename(path.resolve(repo, arg))) : path.join(repo, 'dist'));

// Clientes com site.config.json, menos os de clientes/fora-do-ar.json (guardados no repositório, fora da publicação).
export const clientesPublicados = () => {
  const dir = path.join(repo, 'clientes');
  if (!fs.existsSync(dir)) return [];
  const lista = path.join(dir, 'fora-do-ar.json');
  const fora = new Set(fs.existsSync(lista) ? JSON.parse(fs.readFileSync(lista, 'utf8')).clientes : []);
  return fs.readdirSync(dir).filter(c => !fora.has(c) && fs.existsSync(path.join(dir, c, 'site.config.json')));
};
