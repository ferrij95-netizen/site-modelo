"""Etapa 2: capital social/porte pelo CNPJ e nova tentativa nos sites que não abriram."""
import json, time, requests
from concurrent.futures import ThreadPoolExecutor
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'}
ent = json.load(open('etapa2-in.json'))
out = {'cnpj': {}, 'sites': {}}
def pega(j):
    return dict(razao=j.get('razao_social', ''), capital=j.get('capital_social'), porte=j.get('porte') or j.get('descricao_porte', ''),
                abertura=j.get('data_inicio_atividade', ''), cnae=j.get('cnae_fiscal_descricao', ''), situacao=j.get('descricao_situacao_cadastral', ''),
                tel=j.get('ddd_telefone_1', ''), uf=j.get('uf', ''), municipio=j.get('municipio', ''))
stats = {}
for i, c in enumerate(ent['cnpjs']):
    for url in (f'https://brasilapi.com.br/api/cnpj/v1/{c}', f'https://minhareceita.org/{c}', f'https://open.cnpja.com/office/{c}'):
        try:
            x = requests.get(url, headers=UA, timeout=25)
            k = url.split('/')[2] + ':' + str(x.status_code); stats[k] = stats.get(k, 0) + 1
            if x.status_code == 200:
                j = x.json()
                if 'cnpja' in url:
                    j = dict(razao_social=j.get('company', {}).get('name', ''), capital_social=j.get('company', {}).get('equity'),
                             porte=(j.get('company', {}).get('size') or {}).get('text', ''), data_inicio_atividade=j.get('founded', ''),
                             cnae_fiscal_descricao=(j.get('mainActivity') or {}).get('text', ''), descricao_situacao_cadastral=(j.get('status') or {}).get('text', ''))
                out['cnpj'][c] = pega(j); break
            if x.status_code == 429: time.sleep(10)
        except Exception as e:
            k = url.split('/')[2] + ':' + type(e).__name__; stats[k] = stats.get(k, 0) + 1
    time.sleep(0.6)
    if i % 50 == 0: print(i, stats, flush=True)
print('cnpj', len(out['cnpj']), stats)
def tenta(u):
    for v in (u, u.replace('https://', 'http://')):
        try:
            x = requests.get(v, headers=UA, timeout=40, allow_redirects=True)
            return dict(status=x.status_code, final=x.url, ok=x.status_code < 400 and len(x.text) > 300)
        except Exception as e:
            err = type(e).__name__
    return dict(status=0, erro=err, ok=False)
with ThreadPoolExecutor(12) as ex:
    for u, r in zip(ent['sites'], ex.map(tenta, ent['sites'])): out['sites'][u] = r
print('sites ok', sum(r['ok'] for r in out['sites'].values()), 'de', len(out['sites']))
json.dump(out, open('saida/etapa2.json', 'w'), ensure_ascii=False, indent=1)
