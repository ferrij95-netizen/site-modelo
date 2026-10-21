# Bittencourt Sociedade de Advogados: como este site é feito

- Cliente: Bittencourt Sociedade de Advogados, Sociedade Civil registrada na OAB/ES sob o nº 0691890-0499, Rua José Alexandre Buaiz, 190, conj. 1216/1217, Edifício Master Tower, Enseada do Suá, Vitória ES. Escolhido no nicho advocacia/engenharia (21/10/2026, /mnt/project-files/prospeccao/nichos/advocacia-engenharia/LISTA.md), sem pedido do cliente.
- Site atual: bittencourtadvogados.adv.br, ASP de ~2014 sem versão de celular. Só português, então o novo é só `pt`.
- Marca: o brasão só existe dentro de `imagens/topo.jpg` (165 px, sobre fundo escuro). `brasao.webp` foi recortado dele com máscara circular + a balança, ampliado 3x. Cores do site atual: vermelho #AA1639/#920810 (usamos #B3163D e #8E0D2C) e o grafite listrado do topo. Fonte do site atual: PT Sans Narrow. Versão A com títulos em PT Sans Narrow, versão B em Oswald (condensada como o nome no topo); texto em Inter.
- Fotos: equipe (4 retratos de 132 px) e prêmios vêm do site atual. As fotos do slider original tinham 674 px, então as de Vitória (porto, Terceira Ponte, navios) vêm do Wikimedia Commons, com crédito no rodapé (`creditos` em `conteudo.mjs`). Só o Master Tower e o entardecer são do site atual, usados pequenos.
- Textos: todos do site atual em `conteudo.mjs`. Escritos por nós: títulos de abertura, resumos de cada área, a ordem das etapas da arbitragem e a rota de formação do fundador (lugares tirados do currículo).
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Brasão" e `/b/` "Porto". 12 páginas em cada: Início, O Escritório, Equipe, Áreas de Atuação (+5 áreas), Correspondente Jurídico, Premiação, Contato.
- Contato: o formulário abre o e-mail com a mensagem pronta (o original enviava pelo servidor ASP).
- Gerar: `node clientes/bittencourt/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: brasão em arquivo vetorial ou maior; fotos atuais da equipe (as de hoje são pequenas) e do escritório; se a equipe ainda é a mesma; WhatsApp do escritório.
