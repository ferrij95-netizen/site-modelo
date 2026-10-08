// Onde fica cada site e para onde vai o build.
// Raiz do repositório = site de exemplo, sai em dist/.
// clientes/<cliente>/ = site de um cliente, sai em dist/_clientes/<cliente>/ e o worker o serve em <cliente>.overtus.com.br.
import path from 'node:path';

export const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const siteDir = arg => (arg ? path.resolve(repo, arg) : repo);
export const distDir = arg => (arg ? path.join(repo, 'dist/_clientes', path.basename(path.resolve(repo, arg))) : path.join(repo, 'dist'));
