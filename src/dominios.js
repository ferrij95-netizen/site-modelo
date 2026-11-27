// Domínios próprios de clientes que compraram o site: o endereço do cliente serve a mesma pasta de
// clientes/<cliente> que <cliente>.overtus.com.br. O endereço sem www redireciona para o www.
// Para ligar um domínio novo, siga docs/dominio-proprio.md (zona na Cloudflare + linha aqui + custom domains no wrangler.jsonc).
export const DOMINIOS = {
  'rremotorsport.com.br': 'rremotorsport',
};
