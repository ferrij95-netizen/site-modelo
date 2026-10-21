# Marmoraria São Paulo: como este site é feito

- Cliente: Marmoraria São Paulo, desde 1952, R. Nova dos Portugueses 978, Chora Menino, São Paulo SP. Fone (11) 2309-5322, WhatsApp (11) 98205-5775, marmosp@hotmail.com, Instagram @marmoraria_saopaulo. Escolhida na prospecção de esquadrias, vidros e marmorarias (21/10/2026), sem pedido do cliente.
- Site atual: marmosp.com.br (Wix, uma página só: foto da fachada, "Quem somos nós", "Entre em contato" e mapa). Só português, então o novo é só `pt`.
- Fontes de conteúdo: texto "Quem somos nós" do site atual (copiado palavra por palavra); fotos das 6 últimas publicações do Instagram (embed público do perfil, 1080 px); foto da fachada do Wix. Legenda confirmada só a da ilha em Ônix Cristallo.
- Marca: duas identidades reais. A placa da fachada (vermelho #C8201A, "MARMORARIA" em caixa alta larga e "São Paulo" em letra cursiva, "Desde 1952") foi vetorizada com potracer a partir da foto: `public/assets/logo-*.svg`. A foto de perfil do Instagram usa outra marca, preta e dourada: selo quadrado de pedra, filete e "MSP / MARMORARIA SÃO PAULO". Essa foi redesenhada em HTML (`.msp` em b.css + `img/selo-msp.webp`, tirado da foto do ônix) porque a foto de perfil tem só 100 px.
- Fontes: A em Montserrat (mais parecida com "MARMORARIA" da placa) + Inter. B em Marcellus (parecida com o "MSP" do Instagram) + Inter.
- Estrutura: `/` escolha (apresentação de componentes/apresentacao), `/a/` "Fachada" (fiel: foto da fachada, Quem somos nós, contato com mapa; o muro de granitos da loja vira fundo), `/b/` "Ateliê" (preto e dourado, faixa de amostras, biblioteca de pedras). 6 páginas em cada: Início, Sobre, Ambientes, Pedras, Obras, Contato.
- Amostras de pedra (`img/pedra-*.webp`) são recortes das fotos reais das obras e do muro.
- Escrito por nós, a confirmar com o cliente: textos dos ambientes e das etapas (visita e medição, escolha na loja, corte, instalação com equipe própria), lista de serviços, nomes das famílias de pedra, a visita à Marmomac 2025 em Verona (a foto do Instagram diz "Marmomac 2025"), legendas das obras sem texto no Instagram, e se a marca atual é a placa ou o MSP.
- Formulário: monta a mensagem e abre o WhatsApp (98205-5775) ou o e-mail.
- Gerar: `node clientes/marmosp/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
