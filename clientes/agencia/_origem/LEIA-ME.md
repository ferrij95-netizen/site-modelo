# Overtus: site da própria agência

- Preview em agencia.overtus.com.br (o domínio principal overtus.com.br não é tocado). `/` é a página de escolha, `/a/` a versão A "Editorial" (areia e marinho) e `/b/` a versão B "Marinho" (visual do Overtus Hub). 10 páginas em cada: início, serviços, uma página por grupo (sites, marketing, sistemas, comercial), projetos, como trabalhamos, sobre e contato.
- Identidade: a do Overtus Hub (hub/entrar/). Marinho #182644, areia #f7f3f0, creme #fef9e1, laranja #ed9454. Títulos em Fraunces (a fonte do "O." do ícone do Hub), texto em General Sans; fontes servidas do próprio site.
- Textos em `conteudo.mjs`, páginas em `gerar.mjs`. Depois de mudar qualquer texto: `node clientes/agencia/_origem/gerar.mjs`.
- Sem preços (precificação não aprovada) e sem clientes ou depoimentos. Portfólio = estudos de redesenho identificados por segmento, com a legenda obrigatória; imagens são os capa.jpg / versao-*.jpg dos outros clientes, convertidos para public/assets/img/.
- Contato: só a agenda cal.com/overtus (janela por cima da página e agenda embutida em /contato/). Falta WhatsApp e e-mail da Overtus.
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos quando o visual mudar.
