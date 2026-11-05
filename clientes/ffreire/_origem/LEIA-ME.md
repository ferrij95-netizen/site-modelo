# F. Freire Corretor de Imóveis: novo site (prévia Overtus)

Site atual: https://www.ffreiire.com.br/ (plataforma OKE). Escritório no Ed. Consei, EQ 31/33, sala 610, Guará, Brasília - DF.

Duas versões, 5 páginas (Início, Comprar, Alugar, Anuncie seu imóvel, Contato) + 1 página por imóvel:
- **A "Telhado"**: clara, no verde (#055421) e no dourado (#c0a425) do logo, títulos em Red Hat Display. A faixa dourada inclinada lembra a água do telhado do logo. Abre com "Quero comprar / Quero alugar" e os imóveis em cartões.
- **B "Classificados"**: papel creme, manchete em serifa (Newsreader) e anúncios em colunas, com o preço marcado em dourado. Os aluguéis aparecem como índice.

## Imóveis
- **40 dos 60** anunciados no site atual (snapshot de 05/11/2026): os 12 de aluguel e 28 dos 48 de venda (primeiro os destaques da home, depois a lista de venda). Até 5 fotos de cada, em webp. Dados em `_origem/imoveis.json`, das páginas `?l=imoveis&toDo=view&item=<id>`.
- Para lançar de verdade, os imóveis precisam vir direto da plataforma OKE, senão ficam desatualizados.
- Títulos que estavam em CAIXA ALTA foram passados para letra normal (as palavras são as mesmas). Algumas grafias ganharam acento (guara → Guará, aguas claras → Águas Claras, chacara → Chácara).
- **Cód. 1668777360** (Olympique): o anúncio é "Venda/Aluguel". A página só mostra o aluguel (R$ 4.600,00); o valor de venda R$ 870.000,00 veio do cartão da home. A descrição do anúncio diz "valor do aluguel ... R$ 4.100,00", diferente do preço. Conferir.
- Endereço de cada imóvel: o texto que o site atual usa no mapa (quadra/conjunto). Muitos aparecem só como "Brasília", como no site atual.
- Algumas descrições citam outros corretores e telefones (Francisco Freire 61 98335-0247, Marilza Freire 61 98217-8550). Mantidos como estão.

## Para confirmar
- **WhatsApp**: usei (61) 99923-9993, o celular do site. O site atual não diz que é WhatsApp.
- **Quem somos**: a página do site atual está vazia, então não há história, CRECI nem tempo de mercado. Falta o CRECI do corretor (obrigatório em anúncio de imóvel).
- **Logo**: é o original (344 px) ampliado 2× e sem o telefone que vinha dentro dele; fica um pouco suave. Pedir o arquivo em vetor. Favicon: recorte do telhado do logo.
- **Textos nossos**: as manchetes ("Casas, apartamentos, lotes e salas no Guará e em todo o DF." e "Compra, venda e aluguel de imóveis, direto do escritório no Guará."), os 3 passos da página Anuncie e o texto do rodapé.
- **Fotos**: todas são dos anúncios (fotos de celular). A foto do escritório é a do anúncio da sala no Ed. Consei, o mesmo prédio do escritório. Não há foto da equipe nem da fachada da sala 610.
- **Formulários**: abrem o WhatsApp. O site atual mandava por e-mail.
- **Área do cliente**: o link continua indo para a área do cliente da OKE.
- **Fora**: a busca por bairro/preço do site atual (aqui o filtro é por tipo de imóvel) e a seção "Lançamentos", que está vazia.
