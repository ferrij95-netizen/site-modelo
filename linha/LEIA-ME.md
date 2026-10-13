# Linha de produção de sites

Entra uma lista de empresas; sai, para cada empresa que tem site feio ou velho:

- o site novo em duas versões (A "Fiel" e B "Moderna"), várias páginas, em `clientes/<cliente>/public/`, no ar em `<cliente>.overtus.com.br` depois do deploy;
- `clientes/<cliente>/ligacao.json`: telefone, WhatsApp, e-mail, problemas do site atual e o script de ligação adaptado. O hub mostra tudo em **hub.overtus.com.br/ligar/**;
- `dados/canvas/<cliente>.json`: o mesmo conteúdo no formato do canvas de prospecção.

Arquitetura e custo: `/mnt/project-files/linha-producao/ARQUITETURA.md`.

## Etapas

| # | Etapa | Arquivo | IA |
|---|---|---|---|
| 1 | Captura (navegador: prints, textos, logo, fotos, cores, fontes, idiomas, contatos) | `etapas/captura.mjs` | nenhuma |
| 2 | Triagem pelo print (só segue nota ≥ 6) | `etapas/agentes.mjs` | Haiku |
| 3 | Ficha da empresa (só fatos do site) | `etapas/agentes.mjs` | Haiku |
| 4 | Redação dos textos + tradução en/es se o site atual tem idiomas | `etapas/agentes.mjs` | Sonnet + Haiku |
| 5 | Montagem das duas versões a partir dos modelos | `etapas/montagem.mjs`, `modelos/` | nenhuma |
| 6 | Revisão pelo print (antigo x novo), uma volta de ajustes | `etapas/agentes.mjs` | Sonnet |
| 7 | Script de ligação a partir de `script-ligacao.md` | `etapas/agentes.mjs` | Haiku |
| 8 | Publicação: ligacao.json, rota no wrangler.jsonc, ficha do canvas | `etapas/publicar.mjs` | nenhuma |

As instruções de cada agente estão em `lib/prompts.mjs`; modelos, preços e limites em `config.mjs`.
Cada empresa tem uma pasta em `dados/empresas/<cliente>/` com o estado de cada etapa: a linha para e retoma de onde parou.

## Como rodar (no PC, em `D:\overtus-coleta\linha`)

A nuvem do Claude não abre os sites dos clientes, então a linha roda no PC (ou num servidor).

1. Uma vez: `npm install` dentro de `linha/` e `npx playwright install chromium` (ou `set CHROME=` com o caminho do Chrome).
2. Chave da API: criar em console.anthropic.com, pôr crédito, e deixar na variável `ANTHROPIC_API_KEY` (nunca no repositório).
3. Dados fora do repositório: `set LINHA_DADOS=D:\overtus-coleta\linha-dados`.
4. Entrada: `node rodar.mjs entrada lista.csv --lista agro` (CSV salvo do Excel, com colunas Empresa, Site, Cidade, UF, Segmento, Telefone, WhatsApp, E-mail).
5. Rodar: `node rodar.mjs --limite 10`. Para metade do preço: `set LINHA_MODO=lote`, rodar à noite e rodar de novo de manhã para colher.
6. Ver: `node rodar.mjs situacao` e `node rodar.mjs custo`.
7. Commit de `clientes/` e `wrangler.jsonc` num branch, PR, merge: os previews e a página "Para ligar" vão ao ar.

### Com a chave da DeepSeek

`set DEEPSEEK_API_KEY=...` (sem a da Anthropic) faz as etapas de texto (ficha, redação, tradução, script) irem para a DeepSeek (`deepseek-chat`, ou `DEEPSEEK_MODELO`).
A DeepSeek não lê imagens, então a triagem e a revisão, que olham prints, ficam como pedido em `dados/empresas/<cliente>/ia/triagem.pedido.json` e `revisao.pedido.json`:
a sessão do Claude no PC abre os prints indicados, grava `triagem.resposta.json` / `revisao.resposta.json` com `{"json": ...}` no formato do esquema do pedido e roda `node rodar.mjs` de novo.
Sem Batch API nesse modo. O custo da DeepSeek entra em `node rodar.mjs custo`.

Sem chave (`LINHA_MODO=manual`), cada etapa de IA só grava o pedido em `dados/empresas/<cliente>/ia/<etapa>.pedido.json`; quem responde grava `<etapa>.resposta.json` com `{"json": ...}`. Foi assim que a linha foi testada na nuvem.

## Cuidados

- Nada é enviado para as empresas. A linha só prepara; quem liga é o João.
- Listas de prospecção ficam em `dados/`, fora do repositório (que é público).
- O site novo usa só o que a captura achou no site atual. Se faltar foto ou logo, a montagem usa o que tem; a revisão aponta.
