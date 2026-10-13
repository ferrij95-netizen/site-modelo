# Pedidos de site pelo hub

No hub (hub.overtus.com.br) o João pede um site de dois jeitos:

- botão **Fazer site** no alto da ficha da empresa (aba Empresas e CRM);
- aba **Fazer site** no menu: cola o endereço do site atual. A empresa não precisa estar no canvas: se estiver em alguma lista, o pedido vai para a ficha dela (achada pelo domínio); se não, ela é criada em "Minhas empresas".

O pedido fica na própria empresa, no D1 `prospeccao` (tabela `empresas`, coluna `doc` em JSON), e coloca a empresa na fila de desenvolvimento, a mesma da aba Aprovar (`triagem = "fazer"`, `status = "produzir"`):

```json
"pedidoSite": {
  "estado": "fila | producao | pronto | cancelado",
  "em": "2026-10-13T18:00:00Z",
  "origem": "hub",
  "obs": "pedido especial do João (opcional)",
  "quem": "claude | linha",
  "inicio": "quando começou",
  "prontoEm": "quando ficou pronto",
  "sub": "subdomínio do cliente (abre /ver/<sub>/ no hub)",
  "versoes": [{ "nome": "Versão A", "url": "https://cliente.overtus.com.br" }, { "nome": "Versão B", "url": "..." }]
}
```

A aba Fazer site mostra três colunas (Na fila, Em produção, Prontos) e se atualiza sozinha. Rotas em `src/prospeccao.js` (`/api/empresas/_pedidos`).

## Quem faz o site muda o estado

Pedidos na fila:

```sql
SELECT id, lista, json_extract(doc,'$.nome') AS nome, json_extract(doc,'$.site') AS site, json_extract(doc,'$.pedidoSite.obs') AS obs
FROM empresas WHERE apagado = 0 AND json_extract(doc,'$.pedidoSite.estado') = 'fila' ORDER BY json_extract(doc,'$.pedidoSite.em');
```

Ao começar (thread do Claude ou linha de produção):

```sql
UPDATE empresas SET doc = json_patch(doc, '{"pedidoSite":{"estado":"producao","quem":"claude","inicio":"<ISO>"}}'),
  versao = versao + 1, atualizado = <ms agora> WHERE id = '<id>';
```

Ao terminar (o João passa a ver os links e a empresa vai para "Ligar"):

```sql
UPDATE empresas SET doc = json_set(json_patch(doc, '{"pedidoSite":{"estado":"pronto","prontoEm":"<ISO>","sub":"<sub>","versoes":[{"nome":"Versão A","url":"https://<sub>.overtus.com.br"},{"nome":"Versão B","url":"https://<sub>.overtus.com.br/b/"}]}}'), '$.status', 'ligar'),
  versao = versao + 1, atualizado = <ms agora> WHERE id = '<id>';
```

`atualizado` precisa subir para o canvas aberto perceber a mudança.
