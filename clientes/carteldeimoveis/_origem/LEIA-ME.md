# Cartel de Imóveis: novo site (prévia Overtus)

Imobiliária na Lapa, São Paulo (CRECI 10.253), Rua Brg. Gavião Peixoto, 868. Site atual: http://www.carteldeimoveis.com.br/ (modelo pronto de 2018-2020 da Bazevani, banner em vídeo, listas em carrossel).

Duas versões, 6 páginas cada (Início, Comprar, Alugar, Anuncie seu imóvel, Empresa, Contato) + 1 página por imóvel:
- **A "Faixa"**: clara, vermelho e preto do logo, títulos em Archivo Narrow itálico (parecido com o "CARTEL" inclinado), texto em Public Sans. As duas linhas pretas do logo marcam as seções; botões "Quero comprar / alugar / anunciar" na abertura.
- **B "Ficha"**: preto e branco com vermelho, League Gothic + Work Sans. Imóveis listados por número de referência, como ficha de corretor; um imóvel em destaque com a ficha aberta na abertura.

## Imóveis
- **37 de 384** anúncios do site atual (248 à venda e 171 para locação, alguns nos dois). Entraram os da home que têm fotos e os mais recentes com 3 fotos ou mais; 50 dos anúncios recentes não têm nenhuma foto no site atual.
- Dados tirados das páginas /Imovel/<ref>/ em 05/11/2026: tipo, bairro, valores, IPTU, condomínio, áreas, dormitórios, vagas, descrição e compartimentos. Até 5 fotos de cada (800x600, com a marca d'água da Cartel que já vem nas fotos). Arquivo: `imoveis.json`.
- Para o site de verdade, os imóveis devem vir direto do sistema da Cartel para não ficarem desatualizados.

## Conferir com o cliente
- **Bairro x descrição**: ref. 1779 está cadastrado em Sumarezinho, mas a descrição diz "Apartamento em Vila Madalena"; ref. 1787 está em Vila Adalgisa e a descrição fala em Rio Pequeno; ref. 1801 é "Casa" e a descrição começa com "Imóvel comercial". Mantive como está no site.
- **Áreas**: alguns têm área total menor que a útil (ex.: 1562, 1756, 1795, 1840, 1855). Copiado como está.
- **Descrições**: linhas em maiúsculas viraram minúsculas normais; palavras não mudaram. Tirei o aviso "valor e disponibilidade sujeito à alteração" de dentro das descrições (está no rodapé).
- **WhatsApp**: (11) 94017-6465, o do botão flutuante do site atual. Formulários de contato e "Anuncie" agora abrem o WhatsApp (o site atual tem formulário próprio, com RG/CPF).
- **"20 anos"** vem do texto "Solidez" sem data; não usei número de anos fora desse texto.
- **Logo**: o original tem só 550 px (usado ampliado 2x) e o favicon é a cunha vermelha + "C" recortados dele. Pedir o logo em vetor.
- **Fotos**: o banner do site atual é um vídeo de avenida (provavelmente banco de imagem), não usei. A abertura usa fotos dos próprios imóveis (ref. 1837 e 1487). Não há fotos do escritório nem da equipe.
- **Nossas frases**: as manchetes das duas versões e os 3 passos da página "Anuncie".
- Fora do novo site: busca por condomínio e por referência, área do usuário, política de cookies.
