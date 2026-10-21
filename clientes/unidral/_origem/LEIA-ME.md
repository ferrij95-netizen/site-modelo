# Unidral: como este site é feito

- Cliente: Unidral Cilindros Hidráulicos, Rua Cravinhos, 499, Parque São Jorge, Piracicaba/SP. Escolhido no piloto 2 de sites ruins (21/10/2026), sem pedido do cliente.
- Site atual: unidral.com.br (WordPress The7, imprime erros do PHP no topo, título com "Cinlindros"). Só português, sem troca de idioma, então o novo é só `pt`.
- Marca: logo vetorizado (potrace) a partir de `Logo-360x85-Positivo.png` do site atual: `public/assets/logo.svg` (grafite #1D1D1B + dourado #C69B12) e `logo-branco.svg`. Títulos em Saira larga (desenho mais próximo do logo entre as Google Fonts testadas), texto em Inter.
- Fotos: as 80 da biblioteca do WordPress (`/wp-json/wp/v2/media`), sem as repetidas = 70, separadas à mão em cilindros, bombas e peças/oficina (`fotos.json`, `public/assets/img/g/`). Logos CAT, Komatsu, Liebherr e Volvo vêm do bloco "Maquinários atendidos" do site atual.
- Textos: Início, Serviços, Portfólio e Contato do site atual em `conteudo.mjs`. Escritos por nós: frase curta de cada serviço, as 5 etapas (retirada, avaliação, recuperação, montagem, entrega) e as 4 partes do cilindro no desenho da versão B.
- Estrutura: `/` escolha (componentes/apresentacao), `/a/` "Oficina" (fiel: faixa dourada, logo no centro, menu preto, fotos passando, etapas em setas), `/b/` "Pressão" (clara e técnica, "Máquina parada é sinônimo de prejuízo", desenho do cilindro, etapas em linha). 4 páginas em cada: Início, Serviços, Portfólio, Contato.
- Formulário: monta a mensagem e abre o WhatsApp (19 9.7402.8830) ou o e-mail comercial@.
- Gerar: `node clientes/unidral/_origem/gerar.mjs`. Prints em `public/assets/apresentacao/`, `og-*.jpg`, `versao-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
- A confirmar com o cliente: as etapas do serviço e a garantia; qual dos dois WhatsApp é o comercial; legenda das fotos (só por categoria).
