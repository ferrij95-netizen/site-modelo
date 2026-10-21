# Vergalhão: como este site é feito

- Cliente: Vergalhão Comércio e Representações (Sinop e Alta Floresta, MT), agropecuária e construção civil. Escolhida no lote 3 de sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: www.vergalhao.com (PHP antigo da Tecle, largura fixa 1100 px, sem HTTPS, Google Maps v2 quebrado). Só português.
- Marca: `public/assets/logo.png` é o `img/logoTopo.png` do site atual (468 px); `logo-branco.png` é o mesmo com o texto em branco para o rodapé; `img/simbolo.png` e `favicon.png` são o V recortado. Cores: azul do rodapé #0f5099, amarelo da faixa #ffdd1f, ouro do botão Agropecuária. Logo em grotesca larga: títulos em Archivo (com largura variável, estreita nos telefones como no site atual), texto em Inter.
- Catálogo: `catalogo.json` com tudo do site atual (departamentos, linhas, produtos, código, descrição e foto), fotos em `public/assets/img/p/<id>.webp` (até 720 px). "Boias" está vazio lá e ficou de fora. Logos das representadas recortados de `img/btn*Color.png`.
- Fotos: painel, banners Royal Horse e materiais hidráulicos são do site atual. Fotos de banco (Wikimedia, créditos no rodapé): gado nelore (Carlos Ebert, CC BY), armador (Tomas Castelazo, CC BY-SA) e vergalhões (W.carter, CC BY-SA).
- Escritos por nós: textos curtos dos departamentos e das representadas, linha do tempo (a partir do texto "A empresa"), valores (ética, qualidade, atendimento vêm do texto deles).
- Estrutura: `/` escolha (apresentação), `/a/` "Divisa" (fiel: faixa amarela, telefone grande, abertura dividida Agropecuária | Construção civil com botões inclinados, logos que ganham cor, rodapé azul), `/b/` "Prateleira" (busca no topo, corredores com todas as linhas, destaques, representadas em colunas). 6 páginas em cada: Início, A empresa, Agropecuária, Construção civil, Representações, Fale conosco.
- Produto: clicar abre janela com foto, código, descrição e "Pedir orçamento" (WhatsApp com nome e código). Busca por nome com `?q=`; se não achar, sugere o outro departamento.
- Formulário de contato abre o WhatsApp com a mensagem pronta (o site atual não mostra e-mail).
- Gerar: `node clientes/vergalhao/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar: WhatsApp (99985-9200), CEP da matriz, e-mail.
