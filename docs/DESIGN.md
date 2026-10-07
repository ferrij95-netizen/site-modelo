# Como nasce o design de cada cliente

O repositório tem duas partes:

| Parte | Pasta | Muda por cliente? |
|---|---|---|
| **Motor** | `scripts/`, `site.config.json`, `content/` | Só os dados (nome, contatos, textos). O código é o mesmo. |
| **Design** | `design/` | **Sempre.** Cada cliente tem layout, tipografia, cores, seções e animações próprias. |

O `design/` que vem no modelo é só um exemplo (estilo industrial, inspirado no site da Loewe). Ele deve ser **substituído**, não ajustado.

## Processo

1. **Briefing de estilo.** Reunir: logo, cores existentes, fotos reais, 2 ou 3 sites que o cliente admira, setor, público e a sensação desejada (ex.: "sólido e técnico", "acolhedor", "premium").
2. **Direções.** Criar 2 ou 3 direções visuais bem diferentes entre si, cada uma com a home renderizada (hero + 2 seções) e publicada como preview. Variar de verdade:
   - tipografia (serifada, geométrica, condensada, manuscrita...)
   - estrutura do hero (foto cheia, foto dividida, vídeo, só tipografia, colagem)
   - ritmo das seções (cards, listas editoriais, linha do tempo, galeria, números grandes)
   - forma (cantos retos ou arredondados, linhas, sombras, texturas)
   - movimento (nenhum, sutil, marcante)
3. **Escolha.** O cliente escolhe uma direção (pode misturar pontos).
4. **Construção.** Escrever o `design/` do cliente do zero para aquela direção.
5. **Preview.** `npm run og && npm run build`, push, link do Cloudflare Pages para o cliente.

## O que todo design precisa ter (o build reprova se faltar)

- `design/layout.html` com `{{seo}}`, `{{content}}` e `{{whatsapp}}`.
- `design/partials/whatsapp.html` (o botão pode ter a cara que quiser).
- Uma página em `design/pages/` para cada item de `pages` no `site.config.json`.
- Seletor de idioma usando `{{langLinks}}` em algum partial (se o site tiver mais de um idioma).

Fora isso o design é livre: qualquer HTML, CSS e JS, quantos partials quiser (`design/partials/x.html` vira `{{x}}`), e assets próprios em `design/assets/`.

## Evitar o "cara de modelo"

- Não reaproveitar o CSS de outro cliente como ponto de partida.
- Não usar a mesma fonte em dois clientes seguidos.
- Fotos reais do cliente sempre que existirem; banco de imagens só como último recurso.
- Ordem e tipo das seções da home definidos pelo negócio do cliente, não por esta lista.
