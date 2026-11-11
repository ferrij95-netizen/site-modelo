#!/bin/bash
# Testa quais fontes públicas respondem a partir do GitHub Actions (CNPJ, Reclame Aqui).
set +e
t() { echo; echo "=== $1"; shift; timeout 60 "$@" 2>&1 | head -c 2500; echo; }
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
t "receita antiga" curl -sSL -A "$UA" https://arquivos.receitafederal.gov.br/dados/cnpj/dados_abertos_cnpj/
t "receita share" curl -sSL -A "$UA" -X PROPFIND -H "Depth: 1" -u "YggdBLfdninEJX9:" https://arquivos.receitafederal.gov.br/public.php/webdav/
t "receita share html" curl -sSL -A "$UA" https://arquivos.receitafederal.gov.br/index.php/s/YggdBLfdninEJX9
t "casadosdados" curl -sS -A "$UA" -H 'Content-Type: application/json' -X POST https://api.casadosdados.com.br/v2/public/cnpj/search -d '{"query":{"termo":[],"atividade_principal":["4120400"],"uf":["RS"],"municipio":["PORTO ALEGRE"],"situacao_cadastral":"ATIVA"},"range_query":{},"extras":{},"page":1}'
t "casadosdados v5" curl -sS -A "$UA" -H 'Content-Type: application/json' -X POST https://api.casadosdados.com.br/v5/cnpj/pesquisa -d '{"codigo_atividade_principal":["4120400"],"uf":["rs"],"situacao_cadastral":["ATIVA"],"limite":5,"pagina":1}'
t "reclameaqui busca" curl -sS -A "$UA" -H 'Origin: https://www.reclameaqui.com.br' https://iosearch.reclameaqui.com.br/raichu-io-site-search-v1/companies/search/cyrela
t "reclameaqui pagina" curl -sS -o /dev/null -w '%{http_code}\n' -A "$UA" https://www.reclameaqui.com.br/empresa/cyrela/
t "minhareceita" curl -sS https://minhareceita.org/33000167000101
t "brasilapi" curl -sS https://brasilapi.com.br/api/cnpj/v1/33000167000101
t "cnpj.ws" curl -sS https://publica.cnpj.ws/cnpj/33000167000101
t "opencnpj" curl -sS https://api.opencnpj.org/33000167000101
t "cnpja open" curl -sS https://open.cnpja.com/office/33000167000101
t "casadosdados html" curl -sS -o /dev/null -w '%{http_code}\n' -A "$UA" https://casadosdados.com.br/solucao/cnpj/pesquisa-avancada
t "jusbrasil RJ" curl -sS -o /dev/null -w '%{http_code}\n' -A "$UA" "https://www.jusbrasil.com.br/busca?q=recupera%C3%A7%C3%A3o+judicial+construtora"
