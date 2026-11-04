# W.A.S. Aquecimentos: como este site é feito

- Cliente: W.A.S. Aquecimentos, Sorocaba/SP (aquecimento solar, aquecedores de piscina e chuveiro, residencial e industrial). Da lista solar/estética (prospeccao/nichos/solar-estetica/LISTA.md).
- Site atual: https://wasaquecimentos.com.br/ (uma página só, WordPress 2021, só português).
- Marca: brasão (logo original em PNG de 10.000 px, reduzido para `assets/brasao.webp`), preto do topo e bronze #c67f2a dos quadros. Títulos em Roboto (a fonte do nome no topo do site atual), texto em Inter.
- Fotos: todas do site atual (12 fotos de obras, 4 logos de clientes parceiros, mapa da região de Sorocaba). Nenhuma foto de banco.
- Textos: do site atual. Escritos por nós: os 3 itens de cada solução, os 4 passos de "como funciona" (versão B) e os textos curtos de Conforto / Sustentabilidade / Qualidade.
- Versões: A "Brasão" (fiel: topo preto com brasão e telefones, faixa do slogan, carrossel, quadros bronze, galeria + parceiros, contato + mapa, rodapé preto com o mapa da região) e B "Calor do Sol" (abertura com a piscina, números, soluções em mosaico, passo a passo do aquecimento solar, galeria em mosaico). 5 páginas cada: Início, Quem somos, Soluções, Galeria, Contato.
- Formulários abrem o WhatsApp (15) 99674-9726 com a mensagem pronta.
- Gerar: `node clientes/wasaquecimentos/_origem/gerar.mjs`; prints: `node componentes/gerador/prints.mjs wasaquecimentos https://wasaquecimentos.com.br/`.
- Não publicado (limite de 20.000 arquivos da Cloudflare). Para publicar falta a rota em wrangler.jsonc.
- A confirmar com o cliente: links do Facebook e Instagram (o site atual mostra os ícones sem link), se pode usar os logos dos clientes parceiros, ano de fundação.
