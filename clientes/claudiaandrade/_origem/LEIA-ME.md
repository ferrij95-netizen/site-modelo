# Claudia Andrade Imóveis: novo site (prévia Overtus)

Corretora autônoma em Salvador (CRECI 17031), site atual na plataforma ImobiBrasil: http://claudiaandradeimoveis.com.br/
(o endereço com www responde 403 a navegadores automáticos; sem www funciona).

Duas versões, 27 páginas cada (Início, Imóveis com filtro, Quem sou, Financiamento, Anuncie seu imóvel, Contato e uma página por imóvel):
- **A "Varanda"**: clara, verde-oliva e amarelo do logo, títulos em Fira Sans Extra Condensed itálico (lembra o nome estreito e inclinado do logo), texto em Source Sans 3. Abre com a casa do Vilas do Joanes numa moldura em arco e atalhos "à venda / para alugar / anunciar".
- **B "Caderno de bairros"**: editorial, Newsreader + Figtree. Abre com a sala do apartamento da Graça e lista os 21 imóveis agrupados por bairro, como um índice.

## Conteúdo
- Imóveis: **todos os 21 publicados** (19 à venda, 2 para alugar), tirados em 05/11/2026 do /llms.txt do site (dados estruturados da própria plataforma). Dados em `imoveis.json`.
- Fotos: **só 5 imóveis têm fotos no site** (cód. 3193996, 3027684, 2885751, 2638945, 2475140); usei até 5 de cada, em webp. Os outros 16 aparecem com um cartão tipográfico (bairro em destaque, "Fotos sob consulta").
- Logo: arquivo original do site (logo_site/202301110711502570.png), fundo branco removido. Favicon: recorte do "CA" do logo.
- Textos de "Quem sou", financiamento (6 simuladores de bancos) e anuncie: do site atual, com a ortografia corrigida ("atividdes").

## Confirmar com a cliente
- **WhatsApp:** o site não mostra WhatsApp. Os formulários abrem o e-mail (claudia_acl@hotmail.com) e os botões ligam para (71) 98188-2021. Se esse celular for WhatsApp, é uma linha no gerar.mjs para trocar.
- **Terreno cód. 863509 (Barris, 1.826 m²):** o site mostra "R$ 1.600", provavelmente valor incompleto. Na prévia aparece "Valor sob consulta".
- **Cidade ausente:** os imóveis da Barra, Rio Vermelho, Alto do Peru e Ilha de São João vêm sem cidade no site; mostro só o bairro.
- **Telefones:** (71) 98188-2021, 99228-7275 e o fixo 3460-1748 (este só aparece no texto "Serviços especiais"). Endereço: Rua Cyridião Durval, Lt 03 Qd 10, Jardim Brasília/Pernambués, CEP 41100-720.
- **Instagram:** @claudiaandradeimoveis_ (do site); o link do Facebook do site não tem endereço, ficou de fora.
- **Frases nossas:** os títulos de abertura ("Casa, apartamento ou terreno em Salvador...", "Um imóvel em Salvador começa por escolher bem o bairro.") e chamadas curtas.
- Divergências do próprio anúncio mantidas como estão (ex.: cód. 2008414 "Por apenas 190.000").
- Deixados de fora: notícias, "Correspondente bancário" (página vazia no site), captcha do contato.
- Para publicar de verdade, os imóveis deveriam vir direto da ImobiBrasil para não ficarem desatualizados.
