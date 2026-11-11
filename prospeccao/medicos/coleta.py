# Fase 1: consultórios isolados (CNES tipo 22) de cidades do RS + profissionais médicos do arquivo PF do DATASUS.
import ftplib, io, json, os, re, sys, time, requests
os.makedirs('saida', exist_ok=True)
MUNIS = {431490: 'Porto Alegre', 430460: 'Canoas', 431340: 'Novo Hamburgo', 431870: 'São Leopoldo', 430920: 'Gravataí',
         430510: 'Caxias do Sul', 431440: 'Pelotas', 431690: 'Santa Maria', 431410: 'Passo Fundo', 432300: 'Viamão',
         430310: 'Cachoeirinha', 430770: 'Esteio', 432000: 'Sapucaia do Sul', 431680: 'Santa Cruz do Sul',
         431140: 'Lajeado', 430210: 'Bento Gonçalves'}
API = 'https://apidadosabertos.saude.gov.br/cnes/estabelecimentos'
H = {'User-Agent': 'Mozilla/5.0 (pesquisa de mercado)', 'Accept': 'application/json'}

def estabelecimentos():
    todos = []
    for cod, nome in MUNIS.items():
        off, n = 0, 0
        while True:
            for t in range(4):
                try:
                    r = requests.get(API, params={'codigo_tipo_unidade': 22, 'codigo_municipio': cod, 'limit': 20, 'offset': off}, headers=H, timeout=60)
                    r.raise_for_status(); lote = r.json().get('estabelecimentos', []); break
                except Exception as e:
                    print('retry', cod, off, e, flush=True); time.sleep(5 * (t + 1)); lote = None
            if not lote: break
            for e in lote: e['cidade'] = nome
            todos += lote; n += len(lote); off += 20
            if len(lote) < 20: break
            time.sleep(0.3)
        print(nome, n, flush=True)
    json.dump(todos, open('saida/cnes-consultorios.json', 'w'), ensure_ascii=False)
    return todos

def pf():
    ftp = ftplib.FTP('ftp.datasus.gov.br', timeout=120); ftp.login()
    ftp.cwd('/dissemin/publicos/CNES/200508_/Dados/PF/')
    arqs = sorted(f for f in ftp.nlst() if re.match(r'PFRS\d{4}\.dbc', f, re.I))
    alvo = arqs[-1]; print('PF', alvo, flush=True)
    buf = io.BytesIO(); ftp.retrbinary('RETR ' + alvo, buf.write); ftp.quit()
    open('pf.dbc', 'wb').write(buf.getvalue())
    import pyreaddbc
    df = pyreaddbc.read_dbc('pf.dbc', encoding='iso-8859-1')
    print('colunas', list(df.columns), flush=True)
    print(df.head(3).to_dict('records'), flush=True)
    return df, alvo

if __name__ == '__main__':
    est = estabelecimentos()
    try:
        df, alvo = pf()
        cods = {str(e['codigo_cnes']).zfill(7) for e in est}
        df['CNES'] = df['CNES'].astype(str).str.zfill(7)
        sub = df[df['CNES'].isin(cods)]
        sub.to_json('saida/pf-consultorios.json', orient='records', force_ascii=False)
        print('PF linhas nos consultorios', len(sub), 'arquivo', alvo, flush=True)
    except Exception as e:
        import traceback; traceback.print_exc()
