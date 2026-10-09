"""Junta as buscas do Maps (dentistas), tira redes/franquias e quem aparece no topo da busca genérica,
abre cada site e dá a nota de 10 pontos. Saída: saida/todos.json e saida/candidatos.json."""
import json, glob, re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
from checa_site import parse_card, checa, NAO_SITE

REDES = re.compile(r'odonto ?company|sorridents|oral ?sin|odonto ?excellence|orthodontic|orthoplus|ortho ?pride|oral ?unic|odontoclinic|'
                   r'amor sa[uú]de|dr\.? ?consulta|sorria|dental ?speed|odonto ?premium|ortoplan|implante f[aá]cil|bem ?sorrir|sorrifacil|'
                   r'oral ?center|odonto ?sim|odontosystem|clinica sim|cl[ií]nica do sorriso|sorriso express|odontomais|dentalis|odonto ?prev|'
                   r'amil dental|uniodonto|metlife|porto seguro|sulam[eé]rica|hapvida|odontoclean|smile ?express|sorrizo|espa[cç]o ?sorriso|'
                   r'odonto ?fit|instituto do sorriso|clinica odontol[oó]gica popular|top ?dent|oral ?dents?|ortoclin|implantare|'
                   r'faculdade|universidade|unip|unifor|uninassau|est[aá]cio|senac|hospital|\bupa\b|\bubs\b|posto de sa[uú]de|cl[ií]nica da fam[ií]lia|'
                   r'laborat[oó]rio|pr[oó]tese dent[aá]ria lab|dental (?:cremer|speed|med|br)|surya|dental shop|distribuidora', re.I)
DENT = re.compile(r'dentist|odontol|ortodon|implant|endodon|periodon|cirurgi[aã]o.dentista|harmoniza[cç][aã]o orofacial', re.I)
FORA = re.compile(r'laborat[oó]rio|loja|fornecedor|distribuid|suprimento|equipamento|veterin|escola|faculdade|curso', re.I)

cards = []
for f in glob.glob('saida/maps-*.json'):
    cards += json.load(open(f))
topo = {c['maps'].split('?')[0] for c in cards if c['tipo'] == 'topo'}
lugares = {}
for c in cards:
    k = c['maps'].split('?')[0]
    if c['tipo'] == 'topo':
        continue
    p = parse_card(c)
    if k in lugares:
        lugares[k]['bairros'].add(c['bairro']); continue
    p.update(bairros={c['bairro']}, chave=k)
    lugares[k] = p
L = list(lugares.values())
print('cartões', len(cards), 'lugares (bairros)', len(L), 'no topo genérico', len(topo))
dom = lambda u: urlparse(u).netloc.lower().removeprefix('www.')
cont = Counter(dom(p['site']) for p in L if p['site'])
for p in L:
    p['no_topo'] = p['chave'] in topo
    p['rede'] = bool(REDES.search(p['nome'] or '') or (p['site'] and REDES.search(dom(p['site']))))
    p['dent'] = bool(DENT.search((p['categoria'] or '') + ' ' + (p['nome'] or ''))) and not FORA.search(p['categoria'] or '')
    p['tipo_site'] = 'sem site' if not p['site'] else ('rede social/portal' if any(s in p['site'] for s in NAO_SITE) else 'site próprio')
    p['unidades_maps'] = cont[dom(p['site'])] if p['tipo_site'] == 'site próprio' else 1
    p['bairros'] = sorted(p['bairros'])
filtro = [p for p in L if p['dent'] and not p['rede'] and not p['no_topo'] and p['tipo_site'] == 'site próprio' and p['avaliacoes'] < 800]
print('dent', sum(p['dent'] for p in L), 'redes', sum(p['rede'] for p in L), 'topo', sum(p['no_topo'] for p in L), 'para checar', len(filtro))
doms = {}
for p in filtro:
    doms.setdefault(dom(p['site']), p['site'])
print('domínios', len(doms))
res = {}
with ThreadPoolExecutor(24) as ex:
    for d, r in zip(doms, ex.map(checa, doms.values())):
        res[d] = r
for p in filtro:
    p.update(res.get(dom(p['site']), {}))
json.dump(L, open('saida/todos.json', 'w'), ensure_ascii=False, indent=1)
# uma linha por domínio (a ficha com mais avaliações), só sites que abrem e têm pelo menos 2 problemas
porDom = {}
for p in filtro:
    if not p.get('site_ok') and not p.get('erro'):
        continue
    d = dom(p['site'])
    if d not in porDom or p['avaliacoes'] > porDom[d]['avaliacoes']:
        porDom[d] = p
cand = [p for p in porDom.values() if p.get('pontos', 0) >= 2 or not p.get('site_ok')]
cand.sort(key=lambda p: (-p.get('pontos', 0), -p['avaliacoes']))
cand = cand[:1300]
# sem site próprio (só Instagram/WhatsApp ou nada): também entram, com movimento no Google
sem = [p for p in L if p['dent'] and not p['rede'] and not p['no_topo'] and p['tipo_site'] != 'site próprio' and 10 <= p['avaliacoes'] < 800 and p['telefone']]
sem.sort(key=lambda p: -p['avaliacoes'])
print('sem site', len(sem))
cand += sem[:600]
for i, p in enumerate(cand):
    p['id'] = i
json.dump(cand, open('saida/candidatos.json', 'w'), ensure_ascii=False, indent=1)
print('candidatos', len(cand), Counter(p.get('pontos', -1) for p in cand))
