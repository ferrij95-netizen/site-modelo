# Domínio próprio de cliente (site vendido)

Quando um cliente compra o site, ele sai de `<cliente>.overtus.com.br` e vai para o domínio dele (ex.: `rremotorsport.com.br`).
O registro.br fica com o cliente/Joao; a Cloudflare da Overtus cuida do DNS. O Joao só troca os 2 nameservers no registro.br.

## Uma vez só: chave de API da Cloudflare

Cloudflare > ícone do perfil > **Minha conta / My Profile** > **API Tokens** > **Create Token** > **Create Custom Token**:

- Permissões: `Zone · Zone · Edit`, `Zone · DNS · Edit`, `Zone · Zone Settings · Edit`, `Account · Workers Scripts · Edit`
- Zone Resources: `Include · All zones from an account · <conta da Overtus>`
- Account Resources: `Include · <conta da Overtus>`

Salvar o token no ambiente de nuvem do projeto como segredo de rede para `api.cloudflare.com`
(ou variável `CLOUDFLARE_API_TOKEN`). Nunca colar o token no chat nem no repositório.

## A cada domínio

1. `node scripts/dominio-proprio.mjs <dominio>`: cria a zona, liga HTTPS sempre e mostra os 2 nameservers.
2. O Joao troca os nameservers no registro.br (Domínio > DNS > Alterar servidores DNS > colar os 2 da Cloudflare).
   Se o registro.br perguntar de DNSSEC, deixar sem DNSSEC.
3. Linha `'<dominio>': '<cliente>'` em `src/dominios.js` (o worker passa a servir `clientes/<cliente>` nesse endereço; www redireciona para sem www).
4. Quando a zona estiver `active` (minutos a algumas horas após a troca), acrescentar em `wrangler.jsonc`:
   `{ "pattern": "<dominio>", "custom_domain": true }` e `{ "pattern": "www.<dominio>", "custom_domain": true }`.
   Não acrescentar antes: custom domain numa zona que não está na conta quebra o deploy de todos os sites.
5. No site do cliente: tirar a faixa de prévia, trocar og:url/og:image para o domínio novo e pôr no rodapé
   "Desenvolvido por Overtus" com link para https://www.overtus.com.br.
6. PR mergeado na main e conferir `https://<dominio>` no ar. O endereço `<cliente>.overtus.com.br` continua funcionando.

Domínios ligados: rremotorsport.com.br (RRE Motorsport, 2026-11).
