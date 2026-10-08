# site-modelo

Motor para sites de clientes + um design de exemplo. **Cada cliente tem seu próprio design**: veja [docs/DESIGN.md](docs/DESIGN.md). O design de exemplo segue o estilo do site da Loewe: barra de contato no topo, header na cor da marca, hero com foto full-bleed e um único gradiente, cards numerados, grade de serviços, faixa de contato escura e rodapé em colunas. HTML e CSS puros, multilíngue (pt/en/es), WhatsApp em todo lugar e Open Graph completo em todas as páginas. Publicado no Cloudflare Pages, onde cada push gera um link de preview para o cliente.

## Criar um site novo

1. No GitHub, **Use this template** → `site-<cliente>`.
2. Edite `site.config.json`: nome, tagline, logo (opcional; sem logo usa o nome), domínio, WhatsApp (só dígitos, com 55), telefone, e-mail, endereço, redes, ano de fundação, idiomas, cores da marca e gradiente do hero.
3. Crie o design do cliente em `design/` seguindo [docs/DESIGN.md](docs/DESIGN.md).
4. Troque as fotos em `assets/img/` (hero.jpg com 2400px de largura e < 400 KB, card-1..3.jpg, sobre.jpg) e o `favicon.svg`.
5. Escreva os textos em `content/pt.json` (e traduza `en.json` / `es.json`). Para remover um idioma, tire-o de `langs`.
6. `npm install && npm run og && npm run build`
7. Faça push. O Cloudflare Pages publica o preview.

## Clientes neste repositório

Cada cliente pode morar em `clientes/<cliente>/` (mesma estrutura da raiz: `site.config.json`, `content/`, `design/`, `assets/` e opcionalmente `public/`, copiada como está). `npm run build` monta a raiz e todos os clientes; o worker (`src/worker.js`) serve `clientes/<cliente>` em `<cliente>.overtus.com.br`. Para publicar um cliente novo, adicione a rota dele em `wrangler.jsonc`. Enquanto o cliente não tem `design/` (fase de direções visuais), só a pasta `public/` é publicada.

## Como funciona

| Onde | O quê |
|---|---|
| `design/layout.html` | Esqueleto de toda página. O bloco SEO entra em `{{seo}}`. |
| `design/partials/` | Header (menu + seletor de idioma), footer e botão flutuante de WhatsApp. Um arquivo só para o site todo. |
| `design/pages/<pagina>.html` | Conteúdo de cada página, com `{{p.chave}}` vindo de `content/<idioma>.json → pages.<pagina>`. Listas usam `{{#each p.cards}}...{{/each}}` (dentro: `{{it.title}}`, `{{num}}` = 01, 02...) e condicionais `{{#if chave}}...{{else}}...{{/if}}`. |
| `content/<idioma>.json` | Todos os textos. Chave faltando faz o build falhar, então nenhuma página sai sem tradução. |
| `scripts/build.mjs` | Gera `dist/<idioma>/<pagina>.html`, `sitemap.xml`, `robots.txt` e a raiz que redireciona pelo idioma do navegador. |
| `scripts/og-images.mjs` | Gera `assets/img/og/<idioma>-<pagina>.jpg` 1200x630 (< 300 KB) com a foto do hero, o gradiente e o título. |
| `scripts/check.mjs` | Reprova o build se alguma página estiver sem title, description, canonical, hreflang, og:*, twitter:card, ou se a imagem OG não existir ou passar de 300 KB. |

Para adicionar uma página: crie `design/pages/nova.html`, inclua `"nova"` em `pages` no `site.config.json` e adicione `nav.nova` e `pages.nova` (com `title` e `description`) em cada `content/<idioma>.json`.

## Cloudflare

Funciona tanto como **Workers** (tela padrão de "Create" no painel) quanto como **Pages**.

- Workers: build command `npm run build`; deploy command padrão (`npx wrangler deploy`). O `wrangler.jsonc` já aponta a saída para `dist`.
- Pages: build command `npm run build`, output directory `dist`.

### Detalhes

- Build command: `npm run build`
- Output directory: `dist`
- Branch de produção: `main`. Cada outra branch vira um preview em `https://<branch>.<projeto>.pages.dev` (ex.: `https://modelo-base.site-modelo.pages.dev`), e cada PR recebe o link num comentário do Cloudflare.
- Sem domínio personalizado até o cliente aprovar.
- As imagens OG ficam versionadas no repositório (rode `npm run og` antes do commit quando mudar títulos ou a foto), assim o build no Cloudflare não depende do `sharp`.

## Testar localmente

`npm run dev` e abra http://localhost:3000/pt/
