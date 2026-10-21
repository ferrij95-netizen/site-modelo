# Alta Pressão: como este site é feito

- Cliente: Alta Pressão Bombas e Cilindros Hidráulicos Ltda, Uberlândia (MG). Escolhido no lote 4 de sites ruins (21/10/2026, /mnt/project-files/piloto-10d/LISTA.md), sem pedido do cliente.
- Site atual: http://www.altapressao.com.br/ (Joomla, tema theme3326 de 2017; só http). Só português, então o novo é só `pt`.
- Marca: o logo do site tem só 150 px (`logo-original.jpg`); `public/assets/logo.svg` é a vetorização dele (potrace por cor: preto, vermelho, azul), sem o ®. `logo-branco.svg` troca o preto por branco. Azul do site #0093DD/#007CC2, vermelho #D7262B e azul #1E88CF das linhas do logo, azul-claro da fachada. Títulos em Montserrat (geométrica pesada como "ALTA PRESSÃO"), texto em Inter.
- Fotos: todas do site atual (home e galeria "Quem Somos", 1024 px). Selos ISO 9001 Vanzolini e IQNet do cabeçalho do site.
- Textos: do site atual em `conteudo.mjs` (`textos`). Escritos por nós: descrições curtas e itens de cada serviço, as seis etapas do serviço e as legendas das fotos.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Fachada" (mesma ordem do site atual: faixa azul, cabeçalho com funcionamento, telefone e certificações, menu azul, boas-vindas com a fachada, "Como podemos ajudá-lo(a)?", rodapé azul; as linhas do logo separam as seções; etapas em setas) e `/b/` "Bancada" (abre na foto da bancada de teste, painel escuro de destaques, serviços em abas, etapas sobre a curva de pressão do logo, estrutura em três grupos). 6 páginas em cada: Home, Quem somos, Serviços, Estrutura, Política de qualidade, Contato.
- Formulário: abre o e-mail com a mensagem pronta para altapressao@. Não há WhatsApp (no site atual ele está comentado como "XXXXX-XXXX").
- Gerar: `node clientes/altapressao/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: número de WhatsApp; se a certificação segue válida (selos "2023" no site); o que é o processo das fotos com esferas aquecidas (legendado só como "recuperação de peças"); as etapas do serviço (escritas por nós, padrão de oficina hidráulica).
