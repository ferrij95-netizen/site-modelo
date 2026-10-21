# Catei: como este site é feito

- Cliente: Catei S/A (Catei Armazém & Frigorífico), Curitiba PR. Escolhido na prospecção do nicho de alimentos (21/10/2026, /mnt/project-files/prospeccao/nichos/alimentos/LISTA.md), sem pedido do cliente.
- Site atual: catei.net.br (WordPress de 2018 com GeneratePress e Elementor, só http, só português). Páginas: Início, História, Quem Somos, Contato. A REST API está desligada; textos tirados do HTML.
- Marca: logo `LOGO-CATEI-NOVA-sem-SA.png` (486 px) com o branco de fora removido. Vermelho #D2281A e amarelo do logo, azul #1F6690 do galpão (pintura real da fachada), preto e dourado do selo de 56 anos. Títulos em Russo One (a mais próxima das letras angulosas do logo), texto em Inter.
- Fotos: todas reais, do site atual (galpão azul, doca com carreta Frimesa, câmara com paletes, antecâmara, foto antiga em preto e branco "Catei S.A. Frigorífico", carreta Perdigão na sede antiga). Nenhuma foto de banco.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Fachada" (branco com faixa azul na base como o galpão, serviços como portas de doca numeradas, mapa em azul) e `/b/` "Cadeia do frio" (preto e dourado do selo, régua de temperatura com foto fixa que troca, antes e hoje com linha para arrastar, vantagens em ficha). 5 páginas em cada: Início, História, Quem Somos, Serviços, Contato.
- Formulário: na prévia não envia (mostra aviso).
- Gerar: `node clientes/catei/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão com Playwright quando o visual mudar.
- A confirmar: ano de fundação (site diz "mais de 60 anos" a partir do selo de 56 anos de 2018), a segunda unidade citada no site atual, datas das fotos antigas, WhatsApp.
