# Oeste Engenharia: como este site é feito

- Cliente: OESTE – Organização, Estradas, Topografia e Engenharia Ltda, Salvador BA, desde 1979. Escolhido na prospecção de nichos (advocacia/engenharia, 21/10/2026, /mnt/project-files/prospeccao/nichos/advocacia-engenharia/LISTA.md), sem pedido do cliente.
- Site atual: oeste-eng.com.br (Joomla, template "oeste" de 2015). Só português, então o novo é só `pt`. A página Notícias do site atual está vazia e ficou de fora.
- Marca: o logo só existe em PNG de 207 px (`templates/oeste/images/logo.png`). `logo.svg`/`logo-branco.svg` foram refeitos dele: as letras "OESTE", a mira e o texto "ORGANIZAÇÃO, ESTRADAS, TOPOGRAFIA E ENGENHARIA / Desde 1979" vetorizados com potracer; a esfera é um círculo com degradê e brilho imitando o original. `esfera.svg` é só a esfera. Azul #314975 da faixa do site atual, vermelho #C33A3B da esfera.
- Fontes: a do logo é Gill Sans; versão A usa Cabin (desenhada a partir da Gill Sans) nos títulos, versão B usa Carrois Gothic, a fonte do menu do site atual. Texto em Inter.
- Fotos: todas do site atual (pastas images/engAgrim, engCivil, Arquitetura, meioAmbiente, gercSup, avaliacao), reduzidas para 1600 px. `topografo.jpg` é o slide 4 do site atual sem a legenda gravada (só 967 px de largura).
- Textos: empresa, áreas, serviços, realizações e clientes copiados em `conteudo.mjs`. Escritos por nós: resumos de cada área, os três pilares, as seis etapas ("Do primeiro marco à entrega da obra" / "Poligonal"), a divisão público/privado dos clientes e a coordenada da Pituba nos rótulos da B. "Há mais de 35 anos" do texto original vira "mais de 45 anos" (calculado a partir de 1979).
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Marco" e `/b/` "Levantamento". 12 páginas em cada: Início, Empresa, Áreas de atuação (+6 áreas), Realizações, Clientes, Contato.
- Formulário: mesmos campos do "Fale Conosco" atual; abre o e-mail pronto para oeste@oeste-eng.com.br (não há WhatsApp confirmado).
- Gerar: `node clientes/oesteengenharia/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: se o celular (71) 9 9966-2572 tem WhatsApp; se existe o logo em vetor; fotos novas e maiores de equipe em campo; realizações mais recentes (a lista do site parece parada desde ~2015).
