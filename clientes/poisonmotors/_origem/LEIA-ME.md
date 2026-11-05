# Poison Motors: prévia do site novo

Site atual: http://www.poisonmotors.com.br/. É uma página antiga montada em tabela, com largura fixa, sem versão para celular e sem HTTPS. O banner do topo é Flash e já não abre. O servidor está instável: várias páginas e todas as fotos dos serviços deram erro 503 durante a coleta.
Gerar: `node clientes/poisonmotors/_origem/gerar.mjs` (prints: `node componentes/gerador/prints.mjs poisonmotors http://www.poisonmotors.com.br/`).

- **A "Bloco e pistão":** clara, cinza-concreto, preto e o vermelho do logo. Títulos em Audiowide (letra arredondada próxima à do "Poison"), texto em Geist. Os 12 serviços aparecem como índice numerado.
- **B "Mapa de injeção":** escura, grafite e vermelho, com uma grade decorativa que lembra o mapa de uma injeção programável. Títulos em Audiowide, texto em Ubuntu Sans, rótulos em Martian Mono. Os serviços aparecem como painel P-01 a P-12, e as listas abrem e fecham.
- **Páginas (em cada versão):** Início, Serviços, Preparação, Diagnóstico e Contato.

## De onde vem o conteúdo
- **Textos:** vêm do site atual: "Mecânica avançada", os quatro destaques da página inicial, "Trabalhos de primeira linha com garantia. Facilitamos o pagamento.", "Nacionais e importados", os nomes dos 12 serviços e as listas de cada um (preparação, retífica, câmbio, suspensão, freio, direção, injeção eletrônica, injeção direta e elétrica).
- **Correções:** corrigimos a grafia ("Recondionamento", "Dimencionamento", "PLASTGAGE" virou Plastigage, "PHILPS/OSRAN" virou Philips/Osram etc.).
- **Contato:** endereço, telefone e WhatsApp também vêm do site atual. O WhatsApp é o mesmo número fixo, porque o site atual liga esse número ao WhatsApp. As coordenadas do mapa são as do link "traçar a rota" do site atual.

## A confirmar com o cliente
1. **Fotos:** não conseguimos baixar nenhuma foto dos serviços, porque o servidor respondeu 503. As fotos do site atual parecem ser ilustrativas. A única imagem própria é o banner do topo, com o Chevelle preto e vermelho e o logo da Poison. Ele tem só 769x159 px e foi ampliado, então fica pouco nítido. Não sabemos se o carro é da oficina ou só uma arte.
2. **Fotos ilustrativas:** usamos duas fotos com licença aberta, com crédito no rodapé:
   - "the lift", de frankieleon (CC BY 2.0);
   - "Engine diagnostic connector", de endolith (CC BY 2.0).
   Pedir fotos reais da oficina, da equipe e dos carros preparados.
3. **Logo:** o original só existe dentro do banner, com uns 190 px de largura. Redesenhamos o "Poison" em Audiowide, com um pistão e uma biela no lugar do "i" e "MOTORS" embaixo. A letra é parecida com a do original, não é a mesma. Pedir o arquivo original.
4. **Serviços sem lista:**
   - **Análise de emissões:** a página dá "página não encontrada".
   - **Carburação e ar-condicionado:** as páginas não abriram (503).
   - **O que mostramos:** esses três aparecem só com o nome e "Consulte pelo WhatsApp". Na página inicial, o ar-condicionado é descrito como "convencional, digital e dual-zone", o que vem da lista da página de Elétrica.
5. **"HIS":** está entre as injeções na página inicial, mas não nas listas de preparação e elétrica. Mantivemos como está no site.
6. **WhatsApp:** confirmar se (11) 5573-4757, que é número fixo, atende mesmo no WhatsApp.
7. **Horário e e-mail:** o site atual não mostra nenhum dos dois, então o site novo também não.
8. **Textos nossos:** são redação nossa, a partir do site:
   - os títulos "Doze frentes, uma oficina", "Mais potência, com o freio e o câmbio acompanhando", "Equipamento para achar o defeito, não para adivinhar", "Ganho de potência com o carro inteiro junto" e "O painel da oficina";
   - a divisão da preparação em "Motor e alimentação" e "Transmissão e freio".
9. **Grade da versão B:** é só decoração. Não mostra nenhum valor de mapa nem de potência.
10. **Domínio:** poisonmotors.overtus.com.br ainda não tem rota no wrangler. Adicionar antes de publicar.
