# Lê o PF baixado e guarda só os profissionais dos consultórios coletados.
import json, os
import pandas as pd, pyreaddbc
from dbfread import DBF
pyreaddbc.dbc2dbf('pf.dbc', 'pf.dbf')
df = pd.DataFrame(iter(DBF('pf.dbf', encoding='iso-8859-1')))
print('colunas', list(df.columns)); print(df.head(2).to_dict('records'))
cods = {str(e['codigo_cnes']).zfill(7) for e in json.load(open('saida/cnes-consultorios.json'))}
df['CNES'] = df['CNES'].astype(str).str.zfill(7)
sub = df[df['CNES'].isin(cods)]
sub.to_json('saida/pf-consultorios.json', orient='records', force_ascii=False)
print('linhas', len(sub))
