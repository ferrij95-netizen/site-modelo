"""Dados abertos do CNPJ (Receita Federal, compartilhamento público SERPRO). Uso:
  python receita.py estab I  -> saida/rf-estab-I.csv (construtoras das cidades da busca, todas as situações)
  python receita.py emp I    -> saida/rf-emp-I.csv   (razão social, capital social e porte dessas empresas)"""
import csv, io, json, os, re, subprocess, sys, unicodedata, zipfile
BASE = 'https://arquivos.receitafederal.gov.br/public.php/webdav/'
AUTH = 'YggdBLfdninEJX9:'
CNAES = {'4120400', '4110700', '4399101', '7112000', '4211101', '4299599', '4212000', '4222701'}
SEC = ('4120400', '4110700')
norm = lambda s: re.sub(r'\s+', ' ', unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().upper()).strip()

def mes():
    x = subprocess.run(['curl', '-sS', '-X', 'PROPFIND', '-H', 'Depth: 1', '-u', AUTH, BASE], capture_output=True, text=True).stdout
    meses = sorted(set(re.findall(r'/public.php/webdav/(\d{4}-\d{2})/', x)), reverse=True)
    for m in meses:
        y = subprocess.run(['curl', '-sS', '-X', 'PROPFIND', '-H', 'Depth: 1', '-u', AUTH, BASE + m + '/'], capture_output=True, text=True).stdout
        if 'Estabelecimentos9.zip' in y and 'Empresas9.zip' in y:
            return m
    raise SystemExit('sem mês completo')

def baixa(m, nome):
    subprocess.run(['curl', '-sS', '--retry', '5', '-u', AUTH, '-o', nome, BASE + m + '/' + nome], check=True)
    return nome

def linhas(arq):
    z = zipfile.ZipFile(arq)
    with z.open(z.namelist()[0]) as f:
        yield from csv.reader(io.TextIOWrapper(f, encoding='latin-1', newline=''), delimiter=';')

etapa, i = sys.argv[1], sys.argv[2]
os.makedirs('saida', exist_ok=True)
m = mes(); print('mês', m)
if etapa == 'estab':
    alvo = set()
    for k in json.load(open('cidades.json')):
        *c, uf = k.split(); alvo.add((norm(' '.join(c)), uf))
    mun = {r[0]: norm(r[1]) for r in linhas(baixa(m, 'Municipios.zip'))}
    n = 0
    with open(f'saida/rf-estab-{i}.csv', 'w', newline='') as out:
        w = csv.writer(out)
        for r in linhas(baixa(m, f'Estabelecimentos{i}.zip')):
            if len(r) < 30: continue
            if r[11] not in CNAES and not any(s in r[12] for s in SEC): continue
            cid = mun.get(r[20], '')
            if (cid, r[19]) not in alvo: continue
            w.writerow([r[0] + r[1] + r[2], r[0], r[3], r[4], r[5], r[6], r[10], r[11], r[12], r[17], r[19], cid,
                        ' '.join(x for x in r[13:16] if x), r[18], r[21] + r[22], r[23] + r[24], r[27], r[28], r[29]])
            n += 1
    os.remove(f'Estabelecimentos{i}.zip'); print('estabelecimentos', n)
else:
    bas = set()
    for f in os.listdir('saida'):
        if f.startswith('rf-estab-'):
            bas |= {r[1] for r in csv.reader(open('saida/' + f))}
    print('básicos', len(bas))
    n = 0
    with open(f'saida/rf-emp-{i}.csv', 'w', newline='') as out:
        w = csv.writer(out)
        for r in linhas(baixa(m, f'Empresas{i}.zip')):
            if r and r[0] in bas:
                w.writerow(r[:7]); n += 1
    os.remove(f'Empresas{i}.zip'); print('empresas', n)
