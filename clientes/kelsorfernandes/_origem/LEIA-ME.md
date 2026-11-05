# Kelsor Fernandes Imóveis: novo site (prévia Overtus)

Imobiliária da Pituba, Salvador (CRECI-J 790): administração, aluguel e venda. Site atual: http://www.kelsorfernandes.com.br/ (© 2016).

Duas versões, 6 páginas cada (Início, Alugar, Comprar, Proprietários, A imobiliária, Contato) + uma página por imóvel:
- **A "Recepção"**: clara, azul e marinho do logo, Hanken Grotesk. Abre com a foto da recepção do escritório (do site atual) numa moldura azul como a do balcão; faixa marinha com o desenho das janelas da torre do "K".
- **B "Chaves"**: escura (marinho do logo), laranja dos botões do site atual, Playfair Display (fonte dos títulos do site atual) + Public Sans. Os imóveis aparecem como etiquetas de chave, porque quase todo anúncio diz "chaves na administradora". Rodapé com a silhueta de prédios do site atual.

## Imóveis
- **13 de 13**: todos os imóveis ativos da API do próprio site (kfisite.azurewebsites.net/cms/api/Imovel, ATIVO=true; a API lista 563, mas 550 estão inativos). 6 para alugar, 7 à venda. Dados em `imoveis.json`.
- Até 5 fotos de cada (as 5 primeiras do anúncio, que tem de 6 a 36), em webp. A página avisa quantas fotos o anúncio original tem.
- Três imóveis ativos não aparecem na home do site atual (587 Quintas do Imbuí, 476 Casa Lucaia, 504 Loja Barroquinha), mas têm página e estão ativos; entraram.

## Para confirmar
- **Sem WhatsApp**: o site atual não tem. Formulários e "Quero visitar" abrem um e-mail para kfi@kelsorfernandes.com.br; o telefone é (71) 3330-1511.
- **394 (Catavento, Brotas)**: está à venda e o texto diz "Imóvel encontra-se alugado". Mostramos o selo "Imóvel alugado".
- **Textos**: tirei o "(Chaves na administradora)" do fim das descrições e mostro isso como aviso. Corrigi "arnários" e "depedências"; "Edf." virou "Edifício" e "Cond." virou "Condomínio" nos títulos. "OPORTUNIDADE!" saiu do texto da Casa Lucaia.
- **Logo**: o original tem só 140 px; usei ampliado 3×. Pedir o arquivo vetorial. Favicon é o "K" do logo.
- **Boleto online**: o botão leva para a página de boleto do site atual (o sistema consulta pelo CPF/CNPJ).
- **Títulos da home e da versão B ("As chaves estão com a gente")** são nossos. "Bom atendimento... investimento dos seus sonhos" é texto do site atual.
- **Sem foto da equipe** e sem texto de história (o site atual não tem "Quem somos").
- Foto de abertura da B: vista do mar da varanda do Edifício Ocean Barra (fotos do próprio anúncio).
