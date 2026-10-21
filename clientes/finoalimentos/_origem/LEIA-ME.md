# Fino Alimentos: como este site é feito

- Cliente: Fino Alimentos, fecularia em Concórdia do Oeste, Toledo (PR). Amidos nativos e modificados fisicamente de mandioca, fécula e polvilho azedo industrial. Escolhida na lista do nicho de alimentos (21/10/2026, /mnt/project-files/prospeccao/nichos/alimentos/LISTA.md), sem pedido do cliente.
- Site atual: finoalimentos.com.br (6 páginas de ~2017, largura mínima de 960 px, sem versão de celular; CSS em http:// que só carrega por causa do upgrade-insecure-requests, por isso a captura da prospecção saiu sem estilo). Notícias vazia. Só português.
- Marca: logo do site (`logo-finoalimentos-new.png`, 126 x 70 px) vetorizado com potracer em `public/assets/logo.svg` e `logo-branco.svg`. Vermelho #DE242A e verdes #0D562E / #0F6938 do CSS atual. O saco (fecula.png) usa outro desenho do logo; foi mantido só na foto.
- Fontes: o logo é um slab pesado, então títulos em Roboto Slab 800 (A) e Zilla Slab 700 (B); texto em Inter (A) e IBM Plex Sans (B).
- Conteúdo: todos os textos das páginas Empresa, Qualidade, Meio Ambiente, Missão e das 9 páginas de produto, copiados em `conteudo.mjs` (só erros de digitação corrigidos). Fotos de produto (400 x 300) e a vista aérea (500 x 281) são as do site; aparecem pequenas.
- Fotos de banco (CC): pé de mandioca, raízes colhidas, fécula na tigela. Créditos em `../creditos-fotos.json` e no rodapé.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Lavoura" (desenho do site atual completo: saco sobre a lavoura, números em vermelho, "Quem somos?" com círculos vermelhos, mosaico das 9 aplicações, etapas do campo à entrega, embalagens) e `/b/` "Sacaria" (cores do saco: topo vermelho, papel creme, rodapé verde; rótulo na abertura, foto fixa que troca nas 6 etapas, índice das linhas, ficha técnica por produto). 15 páginas em cada.
- Formulário: na prévia não envia (mostra aviso). Departamentos Comercial, Compras e Qualidade como no site atual.
- Gerar: `node clientes/finoalimentos/_origem/gerar.mjs`. Prints de `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos com Playwright quando o visual mudar.
- A confirmar com o cliente: razão social (no saco aparece "Comercial Agrícola Toledo Ltda."), WhatsApp comercial, se ainda vendem todas as 9 linhas, fichas técnicas reais dos amidos, fotos novas da fábrica (a aérea do site é pequena).
