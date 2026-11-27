// Prepara o domínio próprio de um cliente na Cloudflare: cria a zona (se ainda não existe), liga HTTPS sempre
// e mostra os 2 nameservers que o Joao coloca no registro.br. Uso:
//   CLOUDFLARE_API_TOKEN=... node scripts/dominio-proprio.mjs rremotorsport.com.br
// Na nuvem do projeto o token pode vir como segredo de rede (o proxy injeta o valor; aí qualquer valor serve na variável).
// Depois: linha em src/dominios.js e os 2 custom domains no wrangler.jsonc (passo a passo em docs/dominio-proprio.md).
const dominio = (process.argv[2] || '').toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(dominio)) {
  console.error('Uso: node scripts/dominio-proprio.mjs <dominio.com.br>');
  process.exit(1);
}
const token = process.env.CLOUDFLARE_API_TOKEN || 'injetado-pelo-proxy';
const API = 'https://api.cloudflare.com/client/v4';

async function cf(metodo, caminho, corpo) {
  const res = await fetch(API + caminho, {
    method: metodo,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!json.success) throw new Error(`${metodo} ${caminho}: ${res.status} ${JSON.stringify(json.errors || json)}`);
  return json.result;
}

const contas = await cf('GET', '/accounts');
const conta = process.env.CLOUDFLARE_ACCOUNT_ID ? contas.find(c => c.id === process.env.CLOUDFLARE_ACCOUNT_ID) : contas[0];
if (!conta) throw new Error('Nenhuma conta Cloudflare visível para este token');

let [zona] = await cf('GET', `/zones?name=${dominio}`);
if (zona) console.log(`Zona ${dominio} já existe (${zona.status}).`);
else {
  zona = await cf('POST', '/zones', { name: dominio, account: { id: conta.id }, type: 'full' });
  console.log(`Zona ${dominio} criada na conta ${conta.name}.`);
}
await cf('PATCH', `/zones/${zona.id}/settings/always_use_https`, { value: 'on' }).catch(e => console.warn('Aviso:', e.message));

console.log(`\nStatus: ${zona.status} (fica "active" depois que os nameservers forem trocados no registro.br)`);
console.log('Nameservers para colocar no registro.br:');
for (const ns of zona.name_servers || []) console.log('  ' + ns);
console.log(`\nAcrescentar em wrangler.jsonc ("routes"), quando a zona estiver active:`);
console.log(`    { "pattern": "${dominio}", "custom_domain": true },`);
console.log(`    { "pattern": "www.${dominio}", "custom_domain": true },`);
