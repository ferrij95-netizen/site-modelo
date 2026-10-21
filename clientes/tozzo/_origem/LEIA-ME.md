# Grupo Tozzo: como este site é feito

- Cliente: Grupo Tozzo (Tozzo Alimentos Ltda., CNPJ 01.314.317/0001-65), Chapecó SC: atacado e distribuidor, cerealista (Feijão Tozzo), Tozzo Bebidas (Heineken), Transtozzo e Fazenda Tozzo. Escolhido no nicho de distribuidoras (21/10/2026, /mnt/project-files/prospeccao/nichos/distribuidoras/LISTA.md), sem pedido do cliente.
- Site atual: grupotozzo.com.br (portal da Ofen, ~2010). Só português.
- Marca: logos SVG do site atual sem a borda branca (`logo` é o "Atacado Distribuidor"; `logo-cerealista`, `-bebidas`, `-transportes`, `-fazenda`), versões `-branco` com o "Tozzo" branco e as faixas lima. Verde #00A859 e lima #BFD73E do logo, verde-escuro #0B3D24 do fundo do site atual. Títulos em Archivo (A em itálico largo como o "Tozzo" do logo, B reta), texto em Inter.
- Fotos: todas dos sites do grupo (galerias do grupotozzo, frota da transtozzo, fazenda). Logos das marcas da página Parceiros e da página Marcas da Tozzo Bebidas (`b-*`). Pacotes de feijão de tozzocereais.com.br/Produtos.
- Textos: dos sites do grupo em `conteudo.mjs`. Escritos por nós: títulos de seção, a divisão das marcas em categorias e o texto das chamadas.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Atacado" e `/b/` "Mix", 10 páginas cada: Início, O Grupo, Empresas + 5 páginas de empresa, Catálogo de marcas, Contato.
- Cotação: botão "Cotar" em cada marca e pacote guarda a lista no navegador (localStorage); a página Contato mostra a lista com quantidade e monta um e-mail para contato@grupotozzo.com.br. Sem WhatsApp porque o site atual não informa nenhum.
- Gerar: `node clientes/tozzo/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: se a lista de parceiros (da época Brasil Kirin) ainda vale; o número de WhatsApp comercial; o CEP (o rodapé atual diz 89801-970 e o contato 89810-460, usamos o do contato).
