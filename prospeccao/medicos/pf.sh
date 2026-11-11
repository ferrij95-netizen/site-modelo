#!/bin/bash
# Tenta baixar o arquivo PF (profissionais) do CNES/RS por FTP do DATASUS, com variações de modo.
set -x
mkdir -p saida
D=ftp://ftp.datasus.gov.br/dissemin/publicos/CNES/200508_/Dados/PF/
for opt in "" "--disable-epsv" "--ftp-pasv --disable-epsv --ftp-skip-pasv-ip" "-4 --ftp-method nocwd"; do
  if curl -sS --max-time 120 $opt -l "$D" > lista.txt 2> erro.txt; then echo "ok com [$opt]"; OPT="$opt"; break; fi
  cat erro.txt
done
grep -i '^PFRS' lista.txt | sort | tail -3
ARQ=$(grep -iE '^PFRS[0-9]{4}\.dbc' lista.txt | sort | tail -1)
[ -n "$ARQ" ] && curl -sS --max-time 900 $OPT -o pf.dbc "$D$ARQ" && ls -la pf.dbc && echo "$ARQ" > saida/pf-arquivo.txt
# alternativas por HTTP
for u in https://ftp.datasus.gov.br/ http://ftp.datasus.gov.br/ https://datasus.saude.gov.br/transferencia-de-arquivos/ https://cnes.datasus.gov.br/; do curl -sS -o /dev/null -w "$u %{http_code}\n" --max-time 30 "$u"; done
