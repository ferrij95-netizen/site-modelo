# Fernando & Fernandes Imobiliária: novo site (prévia Overtus)

Administradora de condomínios (mais de 1.200 condomínios), com locação e compra e venda, no Rio de Janeiro desde 1996.
Matriz em Vila Isabel e filiais no Centro, Recreio e Jacarepaguá. Site atual: http://www.fernandoefernandes.com.br/

Duas versões, 7 páginas cada (Início, Condomínios, Alugar, Comprar, A F&F, Área do cliente, Contato) + 1 página por imóvel:
- **A "Quadra"**: clara, marinho #263657 e dourado do logo, Sora + Source Sans 3. Abre com a frase do site ("A gestão que traz tranquilidade...") e o prédio do logo grande.
- **B "Balancete"**: topo e abertura em marinho, IBM Plex Sans + Plex Mono. Abre com um "extrato" do que o síndico recebe (fatos da página Condomínio) e os 11 serviços numerados como num balancete.

## Imóveis
- 37 imóveis (16 para alugar, 21 à venda) = todos os que apareceram em destaque em index.php, aluguel.php e cev.php em 05/11/2026. O site não mostra uma lista completa (a busca só funciona pelo formulário dele), então o total real do catálogo é desconhecido.
- Dados de cada imóvel vêm da página public.php?inform=N: endereço, bairro, tipo, valor, condomínio, IPTU, itens do imóvel e do prédio, descrição. Até 5 fotos de cada (faixas pretas cortadas), em webp. Dados em `imoveis.json`.
- Nos anúncios de venda tirei a frase final "PARA VISITA LIGAR: 3529-1033 / celular + nome do corretor" (Jessé, Fagundes, Cláudio, Augusto). O site novo mostra só "Vendas: (21) 3529-1033". Confirmar se pode publicar os celulares dos corretores.
- Nos de aluguel tirei as linhas de valores repetidas, o aviso de variação de valores (resumido na caixa de preço) e o contato. Os textos de venda estavam em CAIXA ALTA e foram passados para frase normal, sem mudar as palavras.

## Confirmar com o cliente
- **WhatsApp**: usei 21 97949-0441, do botão flutuante do site atual. Mas os anúncios de aluguel dizem "Não temos atendimento via WhatsApp. O número celular é usado somente para ligações" (para 97949-0544). Confirmar se o 0441 atende WhatsApp.
- **Recreio e Jacarepaguá** têm o mesmo telefone no site (2497-9150).
- **"CJ 4772"** aparece nos anúncios de venda (parece CRECI jurídico); não usei.
- **Logo**: o original só existe com 141 px. Redesenhei o prédio em vetor (`marca.svg`) e o nome em Poppins. Pedir o arquivo vetorial.
- **"30 anos no mercado"** (home do site) e "desde 1996" (sobre): usei 1996.
- **Formulários**: abrem WhatsApp; o site atual envia por e-mail com destinos (Contato, Ouvidoria Matriz, Ouvidoria Recreio, Proposta, Locação, SAC, Trabalhe conosco) - mantive esses assuntos no seletor.
- **Depoimentos**: os 4 do site (Ana Mello, Mauricio Reis, Roberto Castro, Vania Araújo), transcritos das imagens.
- **Documentos**: os 24 PDFs apontam para os arquivos do site atual. Havia duas procurações repetidas (diversas.pdf e cota_condominial.pdf); usei procuracao_acao.pdf e procuracao_cota.pdf.
- Não usei os banners com pessoas (banco de imagens) nem o link do Reclame Aqui. Não há fotos da equipe nem das lojas: seria bom pedir.
