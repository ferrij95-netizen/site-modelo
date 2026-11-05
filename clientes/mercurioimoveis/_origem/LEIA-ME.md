# Mercúrio Imóveis: novo site (prévia Overtus)

Duas versões, 6 páginas cada (Início, Imóveis para alugar, Proprietários, Sobre nós, Leis, Contato) + uma página por imóvel:
- **A "Labatut"**: marfim, verde e amarelo do logo. Títulos em Source Serif 4, rótulos e números em Cinzel (parecido com o "MERCÚRIO" do logo), texto em Mulish. A foto de abertura fica dentro de um arco amarelo com ameias, que lembra o portal do brasão.
- **B "Bairro"**: verde-escuro e amarelo, Familjen Grotesk + Figtree. "A imobiliária do Ipiranga" na abertura, fachadas reais, imóveis como placas de "Aluga".

Gerar: `node clientes/mercurioimoveis/_origem/gerar.mjs`.

## De onde veio o conteúdo
- Site atual (mercurioimoveis.com.br, que redireciona para mercurioimoveis.net, WordPress, © 2019).
- Textos de Sobre nós: as 4 abas da página Sobre (Quem somos, Apoio jurídico, Credibilidade, Sempre evoluindo).
- **Imóveis: os 3 publicados hoje (3 de 3, 100%)**: 2 em /imovel/ (salão Rua Bom Pastor cód. 2914 e sala Rua Lord Cockrane cód. 2770) e 1 em /rental/ (apto perto do metrô Sacomã, de outro plugin, sem código e sem endereço exato).
- Fotos: todas da própria imobiliária (enviadas no WordPress). Cortei a parte de baixo para tirar a marca d'água "Mercúrio Imóveis + data" que o celular coloca. 4 a 5 fotos por imóvel.
- Logo: arquivo do site (JPEG com fundo cinza), fundo removido; versão clara com o texto em branco. Favicon: o brasão (louros + portal).

## Para confirmar com o cliente
- **Dois e-mails no site atual:** mercurioimobiliaria@gmail.com (rodapé) e mercurioimoveis@gmail.com (faixa "Ligamos para você"). Usei o do rodapé.
- **Números da home:** o site mostra 1000 alugados, 500 vendidos, **20 anos** e 2000 clientes, mas o texto diz "mais de 30 anos". Usei "30+" e mantive os outros três; confirmar se são reais.
- **Apartamento Sacomã:** está no sitemap (/rental/apto-proximo-metro-sacoma/) mas não aparece na lista de imóveis do site atual. Pode já estar alugado.
- **Condomínio do apto:** o site diz "na faixa de 1000 reais"; mostrei "cerca de R$ 1.000".
- **"Venda":** o site fala de venda de imóveis de terceiros, mas não há nenhum imóvel à venda publicado; a versão nova só lista locação.
- **Corretor:** os imóveis estão publicados por "Gustavo Denani"; não usei o nome.
- **Leis:** o site atual copia o texto inteiro da Lei do Inquilinato (e a página do condomínio está fora do ar, com verificação anti-robô). A nova página só resume e linka para o texto oficial no Planalto (Lei 8.245/1991 e Código Civil, arts. 1.331 a 1.358).
- **Formulários:** abrem o WhatsApp (11) 94770-4936, o número do botão "Nos chame no WhatsApp" do site atual. O site antigo pedia login/cadastro para falar com corretor; isso saiu.
- Não há foto da sede (Rua Labatut, 495). Uma foto da fachada ajudaria muito.
