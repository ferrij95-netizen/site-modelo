# Effisa: prévia do site novo

Site atual: https://effisa.com.br/ (WordPress, PT/EN/ES; o rodapé das fichas das máquinas tem links de spam injetados, sinal de site invadido).
Duas versões com as mesmas 7 páginas (Início, Empresa, Máquinas, Linhas completas, Aplicações, Peças e serviços, Contato), em português, inglês e espanhol (botões PT/EN/ES no topo, a escolha fica salva):
- **A "Evolução eficiente":** clara, vermelho do logo, máquinas recortadas em fundo branco como no catálogo. Abre com a extrusora Omega Special Edition e mostra a linha de produção em 8 estações.
- **B "Linha de automação":** grafite e vermelho, abre com a foto de uma linha Effisa montada no cliente, processos em abas.

Gerar: `node clientes/effisa/_origem/gerar.mjs` (prints: `node componentes/gerador/prints.mjs effisa https://effisa.com.br/`).

## De onde veio cada coisa
- **Logo:** vetorizado do logotipo-fotter.png do site atual (`vetorizar-logo.py`): círculo #ff0000, botão branco, "EFFISA / Evolução Eficiente".
- **Fontes:** Fira Sans (a do site atual) no texto; Fira Sans Condensed nos títulos, próxima do "EFFISA" do logo.
- **Máquinas:** as 50 máquinas e 12 linhas do site, com nome, código FF, foto e primeira frase da ficha técnica (fotos convertidas para webp).
- **Fotos grandes:** recortes dos banners do site (extrusora e laminadora Special Edition, linha de automação montada, perfis acabados).
- **Aplicações:** as 8 do menu, com os textos do site; as fotos são as mesmas do site atual (parecem de banco de imagem).
- **Empresa:** textos da página Empresa, missão, visão, política da qualidade (do banner 2026), 27 países, "12+1 anos" (banner de 2026), clientes da home, contatos por departamento.

## Escrito por nós
- Títulos das seções, os textos curtos de cada processo e a ordem "do alimentador à embaladora".
- Traduções para inglês e espanhol. Os nomes das máquinas e as frases das fichas ficam em português (como no site atual).

## Para confirmar com o cliente
1. Não achamos WhatsApp oficial: o formulário abre o e-mail para effisa@effisa.com.br; os celulares dos departamentos estão como telefone.
2. Se aceitam Cartão BNDES (o selo aparece em "formas de pagamento").
3. "13 anos" vem do banner "12+1 anos"; "27 países" e "25 anos de experiência" vêm da página Empresa.
4. Limpar o site atual: as fichas das máquinas têm links de spam ("Casino script", "Smm panel") no rodapé.
