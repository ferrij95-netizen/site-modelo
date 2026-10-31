# API do hub para agentes

Qualquer agente (Claude, ChatGPT, Gemini, um script) pode ler e mudar os dados do hub (hub.overtus.com.br) por esta API, sem a tela de login. Código em `src/api.js`.

- Endereço: `https://hub.overtus.com.br/api/`
- Especificação completa (OpenAPI 3, sem dados, pública): `https://hub.overtus.com.br/api/openapi.json`
- Chave: header `Authorization: Bearer <chave>` (ou `X-API-Key: <chave>`)

## A chave

Fica só no Cloudflare, como segredo `HUB_API_KEY` do worker `site-modelo` (Workers & Pages > site-modelo > Settings > Variables and Secrets > Add > tipo Secret). Nunca no repositório, que é público.

Pode ter várias chaves separadas por vírgula, uma por agente: para cortar um agente, tire a chave dele do segredo. Cada chave precisa ter pelo menos 20 caracteres. Sem o segredo criado, toda chamada com chave dá 401.

O e-mail (`/api/email/`) não está liberado com chave: mandar e-mail não tem volta, então continua só com o login do João.

## Ações (use estas para gravar)

Gravam do mesmo jeito que os botões do hub (histórico na ficha, datas, contagem de ligações), então o canvas mostra igual.

| Ação | Corpo | O que faz |
|---|---|---|
| `POST /api/acoes/criar` | `{nome, site, lista?, cidade?, segmento?, contato?, extra?, notas?}` | Cria a empresa se não existir outra com o mesmo domínio ou telefone (em qualquer lista). Já existe: 409 com `duplicata:{id, lista, nome}` |
| `POST /api/acoes/importar` | `{lista, empresas:[...], reserva?}` | Lote de até 500 (ex.: Prospector). Responde `criadas`, `duplicadas` (já no banco ou repetidas no lote) e `invalidas` |
| `POST /api/acoes/triagem` | `{id, triagem, motivo?}` | `fazer`, `talvez`, `descartar` ou `""` para limpar. `fazer` numa empresa nova põe em `produzir` |
| `POST /api/acoes/contato` | `{id, resultado, nota?, canal?, proxAcao?, proxData?, status?}` | Registra o contato e o próximo passo. `resultado`: `conversou`, `naoatendeu`, `retornar`, `mensagem`, `follow`, `proposta`, `fechou`, `perdido`, `numeroerrado`. Sem `status`, a etapa muda como no hub; sem `proxData`, usa o prazo padrão (conversou +3 dias, naoatendeu +1, retornar +2, mensagem +3) |
| `POST /api/acoes/etapa` | `{id, status, motivo?}` | Muda a etapa de venda |

Duplicata = mesmo domínio do site (links de Instagram, Facebook, WhatsApp e Google não contam) ou mesmos 10 últimos dígitos do telefone.

## Rotas de leitura e gerais

| Rota | O que faz |
|---|---|
| `GET /api/eu` | Confere se a chave funciona |
| `GET /api/listas` | Listas do canvas e quantas empresas cada uma tem |
| `GET /api/busca?q=&lista=&status=&limite=` | Procura empresas em todas as listas (nome, site, cidade, segmento) |
| `GET /api/empresas?lista=x&desde=ms` | Todas as empresas de uma lista, registro completo |
| `GET /api/empresas/<id>` | Uma empresa |
| `POST /api/empresas/<id>` | `{"op":"update","data":{...}}` muda só os campos enviados; `set` cria ou substitui; `delete` marca como apagada |
| `GET /api/empresas/_pedidos` | Pedidos de site (aba Fazer site) |
| `POST /api/empresas/_pedidos` | `{id}` ou `{url, nome?}` pede um site; `{id, cancelar:true}` tira da fila |
| `POST /api/empresas/_lote` | Importa várias empresas `{"<id>": {...}}`; só cria as que não existem |
| `GET /api/lembretes` | Quem precisa de retorno hoje ou está esperando resposta |
| `GET /api/posvenda` | Clientes fechados e tarefas de pós-venda |
| `GET /api/resultados` | Números da prospecção |
| `GET /api/sites?setor=&q=` | Sites de clientes publicados em `<slug>.overtus.com.br` |

Status de venda: `novo`, `produzir` (fazer preview), `ligar`, `enviado` (link enviado), `proposta`, `conversa`, `fechado`, `perdido`. Triagem: `fazer`, `talvez`, `descartar`. Campos da empresa: ver `components.schemas.Empresa` no openapi.json.

## Regras para o agente

1. Para criar, importar, triar, registrar contato ou mudar etapa use as rotas `/api/acoes/`.
2. Para outros campos use `op: "update"` e mande só os campos que mudam, mais `"atualizadoEm": <Date.now()>`.
3. `op: "set"` troca o registro inteiro: só para criar empresa nova (id novo, com `lista`).
4. Sempre mande `lista` junto ao criar; empresa sem lista vai para "minhas".
5. Apagar só marca como apagada e dá para recuperar, mas não apague sem o João pedir.
6. Não ligue, não mande mensagem nem e-mail para clientes em nome da Overtus sem o João aprovar.

## Exemplos

```bash
curl -X POST -H "Authorization: Bearer $HUB_API_KEY" -H "Content-Type: application/json" \
  -d '{"id":"agro-012","resultado":"conversou","nota":"Gostou da versão A","proxAcao":"Mandar proposta","proxData":"2026-11-04"}' \
  "https://hub.overtus.com.br/api/acoes/contato"

curl -H "Authorization: Bearer $HUB_API_KEY" "https://hub.overtus.com.br/api/busca?q=agrogen"

curl -X POST -H "Authorization: Bearer $HUB_API_KEY" -H "Content-Type: application/json" \
  -d '{"op":"update","data":{"status":"ligar","proxData":"2026-11-03","proxAcao":"Ligar para o dono","atualizadoEm":1793500000000}}' \
  "https://hub.overtus.com.br/api/empresas/agro-012"

curl -X POST -H "Authorization: Bearer $HUB_API_KEY" -H "Content-Type: application/json" \
  -d '{"url":"empresa.com.br","obs":"pedido do agente"}' "https://hub.overtus.com.br/api/empresas/_pedidos"
```
