# Site modelo de imobiliária (Quadra Imóveis)

Vitrine da Overtus para imobiliárias, em imobiliaria.overtus.com.br. Marca, imóveis, preços e contatos são fictícios; fotos do Unsplash (licença livre), já em webp.

- `/` página de escolha (kit componentes/apresentacao), `/a/` "Vitrine" (clara, Archivo largo, laranja só em botões) e `/b/` "Bairro" (verde-escuro e lima, Manrope).
- Páginas por versão: início, imóveis (busca com filtros por finalidade, tipo, bairro, preço, dormitórios e vagas, ordenação, link com filtros na URL), um imóvel por página (galeria com lightbox, ficha, valores, simulador SAC/Price na venda e custo mensal no aluguel, agendar visita), anunciar, sobre, contato e favoritos (guardados no aparelho).
- Formulários montam a mensagem e abrem o WhatsApp (sem número fixo enquanto for demonstração; trocar `MARCA.whats` em dados.mjs).
- Para adaptar a um cliente: trocar `MARCA`, `IMOVEIS` e `BAIRROS_FOTO` em `dados.mjs`, as fotos em `public/assets/img` (cada foto tem a versão `-p` 720x540 para os cards) e rodar `node clientes/imobiliaria/_origem/gerar.mjs`.
- Prints da escolha (`public/assets/apresentacao`), `og-*.jpg` e `../capa.jpg` são refeitos à mão quando o visual mudar.
