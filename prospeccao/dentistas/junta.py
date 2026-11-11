"""Junta candidatos + detalhes (avaliações recentes e erros no celular) em saida/resultado.json."""
import json, glob
cand = {c['id']: c for c in json.load(open('saida/candidatos.json'))}
for f in glob.glob('saida/detalhe-*.json'):
    for d in json.load(open(f)):
        cand[d['id']]['detalhe'] = d
json.dump(list(cand.values()), open('saida/resultado.json', 'w'), indent=1)  # ascii: textos cortados podem ter meio emoji
print('com detalhe', sum('detalhe' in c for c in cand.values()), 'de', len(cand))
