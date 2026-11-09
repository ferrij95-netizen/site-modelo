# Trefix: prévia do site novo

Site atual: https://www.trefix.com.br/ (5 páginas: Home, Empresa, Produtos, Localização, Fale Conosco).
Duas versões com as mesmas 5 páginas:
- **A "Bitola certa":** clara como o site atual; a caixa laranja "Especializada em Arames e Barras Trefiladas" sobre a foto da bobinadeira e as três caixas da home (Produtos, Pregos e Parafusos, Fale Conosco) mantidas.
- **B "Linha de trefilação":** grafite e laranja, foto em tela cheia, as quatro linhas de produto em lista grande e o processo com uma linha que afina como o arame.

Gerar: `node clientes/trefix/_origem/gerar.mjs` (prints: `node componentes/gerador/prints.mjs trefix https://www.trefix.com.br/`).

## De onde veio cada coisa
- **Logo:** vetorizado do logo.png do site atual (`vetorizar-logo.py`): T grafite #4d4d4d, órbita e "TREFIX" laranja #f86300 com o degradê do original.
- **Fontes:** títulos em Archivo larga (a mais parecida com o "TREFIX" do logo); texto em Source Sans 3, a fonte do site atual.
- **Textos:** os quatro parágrafos da página Empresa/Produtos (bitolas, rolos, barras, decapagem, fosfatização, aços SAE, segmentos), endereço, telefone, e-mail, Cartão BNDES, TX Pregos e a SIPAT 2016.
- **Fotos:** as 12 fotos do site atual (banner, fábrica, 9 fotos de produtos, foto do vídeo), convertidas para webp. São pequenas (600 px); fotos maiores melhorariam bastante.

## Escrito por nós (não veio do site)
- Descrição curta da decapagem (remove a carepa) e da fosfatização (ajuda a trefilar e protege a superfície).
- As 5 etapas "do fio-máquina ao arame", as frases sob cada segmento e os títulos das seções.
- O teor de carbono nominal dos aços (regra da norma SAE 10XX: os dois últimos dígitos).
- Esquemas desenhados do arame na decapagem e na fosfatização (desenho, não foto).

## Para confirmar com o cliente
1. Não há WhatsApp no site atual: os botões levam ao formulário (abre o e-mail para trefix@trefix.com.br) e ao telefone (47) 3632-1019.
2. Se a Trefix ainda aceita o Cartão BNDES.
3. Fotos novas de decapagem e fosfatização (hoje não há nenhuma).
