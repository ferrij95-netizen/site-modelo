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
| 4 | Redação dos textos (com o kit de treino) + autocrítica + tradução en/es se o site atual tem idiomas | `etapas/agentes.mjs`, `kit/` | Sonnet + Haiku |
| 5 | Montagem das duas versões a partir dos modelos | `etapas/montagem.mjs`, `modelos/` | nenhuma |
| 6 | Revisão pelo print (antigo x novo), uma volta de ajustes | `etapas/agentes.mjs` | Sonnet |
| 7 | Script de ligação a partir de `script-ligacao.md` | `etapas/agentes.mjs` | Haiku |
| 8 | Publicação: ligacao.json, rota no wrangler.jsonc, ficha do canvas | `etapas/publicar.mjs` | nenhuma |

As instruções de cada agente estão em `lib/prompts.mjs`; modelos, preços e limites em `config.mjs`.
Cada empresa tem uma pasta em `dados/empresas/<cliente>/` com o estado de cada etapa: a linha para e retoma de onde parou.

## Kit de treino (para o gerador não sair genérico)

Não há fine-tuning: o "treino" é o que vai na instrução do redator, em `kit/`:
- `kit/guia.md`: as regras do projeto e as recusas do João (Engefrio "cara de IA", Haiku "muito genérico", Tri City C "a melhor de todas"), mais a lista de palavras proibidas.
- `kit/exemplos.md`: reescritas genérico -> aprovado e trechos de sites aprovados (Dispra, Frigoestrela, Tri City) no mesmo JSON que a IA devolve.
- `kit/checklist.md`: o que o revisor confere.
- `lib/genericos.mjs`: detector sem IA (clichês, números que não estão na ficha, títulos vazios, seções vizinhas iguais, cards que começam igual, chamada sem produto nem cidade, páginas do menu faltando). Dá nota de 0 a 100.
- Autocrítica (etapa `critica`): depois da redação, o detector aponta os problemas e a IA devolve só as trocas (caminho + texto novo). Fica a versão com nota maior, em `ia/redacao.revisada.json`.
- A chamada ganhou `sobretitulo` (ex.: "Desde 1999 · Jataí, GO"), que os modelos A e B mostram acima do título.

Para mudar o estilo, edite os arquivos de `kit/` (texto simples). Correção nova do João vira uma linha no guia ou uma reescrita nos exemplos.

### Comparar antes e depois

`node comparar.mjs` pega as empresas de `<dados>/empresas/` (faz a captura e a ficha se faltar), escreve os textos com o prompt antigo e com o kit, monta os dois sites em `<dados>/comparar/<empresa>/` e gera `<dados>/comparar/index.html` com os prints lado a lado e a nota do detector. Não mexe em `clientes/`.
Com a DeepSeek: `set DEEPSEEK_API_KEY=...` no PC, ou, na nuvem do Claude, a chave como segredo de rede do ambiente para `api.deepseek.com` e `LINHA_IA=deepseek`.

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

## Aprovar antes de gastar: a aba "Aprovar" do hub

Antes de montar um site, o João aprova a empresa no hub (página inicial > Aprovar): uma ficha por vez, com o print do site atual (ou a ficha do Google para quem não tem site).
Aprovar (seta para a direita, ou arrastar) manda a empresa para a fila de desenvolvimento (triagem "fazer", status "produzir"); rejeitar descarta; talvez volta depois.
Tudo fica no banco do hub (D1 `prospeccao`). A linha conversa com ele pelo wrangler: uma vez `npx wrangler login` (conta Cloudflare da Overtus); dentro de `linha/`:

1. `node hub.mjs lista --lista agro --limite 36`: baixa para `<dados>/lista.json` empresas da lista ainda sem triagem, com site e telefone (as de pior site primeiro).
2. `node prints.mjs <dados>/lista.json`: abre cada site num navegador de verdade e grava em `<dados>/prints/` dois prints pequenos (`<id>.d.jpg` computador, `<id>.m.jpg` celular) e `prints.json` com o que não abriu e os alertas (sem HTTPS, não cabe no celular, rodapé antigo).
3. No hub: Aprovar > Importar prints > escolher todos os arquivos dessa pasta. As fichas com print passam a aparecer primeiro.
4. O João desliza as fichas. Depois: `node hub.mjs fila` baixa as aprovadas para `<dados>/fila.json`, e `node rodar.mjs entrada <dados>/fila.json` seguido de `node rodar.mjs` monta os sites (o `id` do canvas acompanha cada empresa).
5. Quando as empresas estiverem prontas: `node hub.mjs devolver` escreve `<dados>/devolver.sql` (confira) e `node hub.mjs devolver --aplicar` grava no canvas: status "ligar", proposta A/B, script de ligação e alertas.

Empresas aprovadas que não têm site (ficha do Google) saem em `fila-sem-site.json`; a linha ainda não monta site a partir só do Google.

## Cuidados

- Nada é enviado para as empresas. A linha só prepara; quem liga é o João.
- Listas de prospecção ficam em `dados/`, fora do repositório (que é público).
- O site novo usa só o que a captura achou no site atual. Se faltar foto ou logo, a montagem usa o que tem; a revisão aponta.
