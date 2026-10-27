# Overtus: site da própria agência

- Preview em agencia.overtus.com.br (o domínio principal overtus.com.br não é tocado). `/` é a página de escolha, `/a/` a versão A "Editorial" (areia e marinho) e `/b/` a versão B "Marinho" (visual do Overtus Hub). 18 páginas em cada: início, serviços, uma página por grupo (sites, marketing, sistemas, comercial), setores, uma página por setor (7), projetos, como trabalhamos, quem somos e contato.
- Identidade: a do Overtus Hub (hub/entrar/). Marinho #182644, areia #f7f3f0, creme #fef9e1, laranja #ed9454. Títulos em Fraunces (a fonte do "O." do ícone do Hub), texto em General Sans; fontes servidas do próprio site.
- Textos em `conteudo.mjs`, páginas em `gerar.mjs`. Depois de mudar qualquer texto: `node clientes/agencia/_origem/gerar.mjs`.
- Sem preços (precificação não aprovada) e sem clientes ou depoimentos. Portfólio = estudos de redesenho identificados pelo ramo e pelo setor, com a legenda obrigatória e link para a prévia; imagens são os capa.jpg dos outros clientes convertidos em webp para public/assets/img/p-<cliente>.webp. Páginas, idiomas e versões de cada projeto são contados da pasta do cliente pelo gerar.mjs.
- Setores em `setores` (conteudo.mjs). Os sites de construtoras e indústrias (clientes/construtoras/_origem) têm uma faixa no topo e links no rodapé que voltam para este site; o endereço vem de `site.dominio`.
- Contato: agenda cal.com/overtus (janela por cima da página e agenda embutida em /contato/) e e-mail joaovitor@overtus.com.br. Falta WhatsApp e CNPJ.
- `public/assets/versao-*.jpg`, `og-*.jpg` e `../capa.jpg` são prints das páginas, refeitos quando o visual mudar.
