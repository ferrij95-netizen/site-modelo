# Loewe Equipamentos Industriais

Site feito pelo Joao no Claude Design ("Redesign moderno Loewe.zip", enviado em 2026-10-09) e publicado sem redesenho em https://loewe.overtus.com.br.

O export roda no runtime do Claude Design (`support.js` + arquivos `*.dc.html`, React no navegador). `converter.mjs` fez a conversão uma única vez:

- páginas com nomes limpos (`index`, `quem-somos`, `servicos`, `produtos`, `trabalhe-conosco`, `contato`, `politica-de-privacidade`, `catalogo`) e links trocados para esses caminhos;
- React e ReactDOM 18.3.1 servidos de `public/assets/vendor/` (via `window.__resources`, que o `support.js` consulta antes do unpkg) e fonte Inter em `public/assets/fonts/`: o site não depende de CDN;
- `<head>` estático em cada página com title, description, canonical, hreflang, Open Graph e Twitter (imagens em `public/assets/og/`);
- a foto da empresa na home, que estava vazia no export, recebeu `assets/ferramental.webp` (foto que estava no `.image-slots.state.json` do export).

Daqui para frente, edite direto em `public/` (os componentes `NavServicos`, `NavProdutos`, `MenuMobile`, `ModalProposta` ficam na raiz porque o runtime os busca por nome).

Fotos de produtos, selos e logos de clientes continuam vindo de loewe.ind.br e commons.wikimedia.org, como no export.

Feito à mão depois do `converter.mjs` (ele apaga `public/` ao rodar): `assets/ferramental.webp` extraída do `.image-slots.state.json`, `assets/tc-hero.jpg` reduzida para 2560 px, imagens `assets/og/*.jpg` (1200x630) e `../capa.jpg` (1440x756) tiradas da página renderizada no Chromium.
