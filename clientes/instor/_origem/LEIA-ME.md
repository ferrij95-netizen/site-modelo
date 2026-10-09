# Instor Projetos e Robótica: como este site é feito

- Cliente: Instor Projetos e Robótica (instor.com.br), robótica móvel, matriz em Viamão/RS e filial em Duque de Caxias/RJ. Textos, robôs, fichas técnicas, história, clientes e imprensa tirados do site atual em 2026-10-09.
- Site estático em `public/`: `/` é a página de escolha (com o print do site atual para comparar), `/a/` é a versão A "Engenharia" (clara) e `/b/` a versão B "Operação" (escura). 17 páginas em cada: início, empresa, soluções, robôs, uma página por robô (9), serviços, clientes, imprensa e contato.
- As páginas são geradas: textos em `conteudo.mjs`, peças comuns e logo em vetor em `comum.mjs`, estrutura de cada versão em `versao-a.mjs` e `versao-b.mjs`. Depois de mudar qualquer texto: `node clientes/instor/_origem/gerar.mjs`.
- Imagens: o servidor não abre instor.com.br, então as imagens foram baixadas pelo proxy de imagens do GitHub (lista em `imagens.md`, originais em `img/`). `imagens.mjs` converte para `public/assets/img/*.webp`. A maioria das fotos do site atual tem só 500 px de largura; trocar por fotos maiores quando a Instor mandar.
- Logo: emblema redesenhado em vetor a partir do `logo-instor.png` (cinza #606060, verde #80b838). Títulos em Ubuntu, a mesma família do logo; texto em Source Sans 3.
- Conteúdo proposto (confirmar com a Instor): o número "10+ robôs próprios", os textos dos serviços de caldeiras e tanques, "Hospital Sírio-Libanês" (no site atual aparece só o logo "HSL") e o WhatsApp de vendas (o site atual usa 555197522728, que parece faltar um dígito).
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos à mão quando o visual mudar.
