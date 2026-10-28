// Falha o build se algum cliente de clientes/ não tiver o endereço <cliente>.overtus.com.br em wrangler.jsonc.
// Sem essa linha o site é publicado, mas o endereço não abre (o domínio só existe se estiver nas rotas).
// Vale custom domain ("<cliente>.overtus.com.br") ou rota de zona ("<cliente>.overtus.com.br/*").
import fs from 'node:fs';
import path from 'node:path';
import { repo, clientesPublicados } from './paths.mjs';

// A Cloudflare aceita no máximo 100 custom domains por zona; com 101 o deploy falha e nenhum endereço novo publica.
const LIMITE_CUSTOM_DOMAINS = 89;

const wrangler = fs.readFileSync(path.join(repo, 'wrangler.jsonc'), 'utf8');
const rotas = new Set([...wrangler.matchAll(/"pattern"\s*:\s*"([^"]+)"/g)].map(m => m[1].replace(/\/\*$/, '')));
const customDomains = [...wrangler.matchAll(/"custom_domain"\s*:\s*true/g)].length;
const clientes = clientesPublicados();
const faltando = clientes.filter(c => !rotas.has(`${c}.overtus.com.br`));

if (faltando.length) {
  console.error(`check-rotas: sem endereço em wrangler.jsonc: ${faltando.join(', ')}`);
  console.error('Acrescente no fim de "routes": { "pattern": "<cliente>.overtus.com.br/*", "zone_name": "overtus.com.br" }');
  process.exit(1);
}
if (customDomains > LIMITE_CUSTOM_DOMAINS) {
  console.error(`check-rotas: ${customDomains} custom domains em wrangler.jsonc (máximo ${LIMITE_CUSTOM_DOMAINS}; a zona aceita 100).`);
  console.error('Cliente novo entra como rota de zona: { "pattern": "<cliente>.overtus.com.br/*", "zone_name": "overtus.com.br" }');
  process.exit(1);
}
console.log(`check-rotas: ${clientes.length} clientes, todos com endereço em wrangler.jsonc (${customDomains} custom domains)`);
