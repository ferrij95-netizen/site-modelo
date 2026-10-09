"""Junta as buscas do Maps, tira redes nacionais, lojas de material e quem aparece no topo da busca genérica,
abre cada site e dá a nota de 10 pontos. Saída: saida/todos.json e saida/candidatos.json."""
import json, glob, re
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
from checa_site import parse_card, checa, NAO_SITE

# grandes grupos nacionais / listados (já têm marketing próprio)
REDES = re.compile(r'\bmrv\b|cyrela|\btenda\b|direcional|\beven\b|tecnisa|gafisa|\brossi\b|\bpdg\b|eztec|trisul|plano ?& ?plano|\bcury\b|vivaz|'
                   r'living|pacaembu|kallas|moura dubeux|patrimar|mitre|helbor|lavvi|you,? ?inc|vitacon|\briva\b|emccamp|rodobens|melnick|'
                   r'tegra|\bbrz\b|\bvinx\b|\bhm engenharia|construtora tenda|odebrecht|andrade gutierrez|camargo corr|queiroz galv|\boas\b|'
                   r'mendes j[uú]nior|\bmetrocasa|magik|setin|\bstan\b|\bgamaro|\bjhsf\b|\btoledo ferrari|\bcanopus|\bcrm\b', re.I)
CONSTR = re.compile(r'construtora|incorporadora|constru[çc][ãa]o|constru[çc][õo]es|construtor|engenharia|empreendimentos|edifica|obras', re.I)
# lojas e fornecedores, órgãos, reformas avulsas, imobiliárias
FORA = re.compile(r'materia(is|l) de constru|home ?center|dep[oó]sito|\bloja\b|leroy|telha|madeireira|loca[çc][ãa]o de|aluguel de|concreto|'
                  r'pr[eé].?moldad|ferragens|ferro e a[çc]o|areia|tintas|vidra[çc]aria|esquadria|marmoraria|gesso|drywall|'
                  r'imobili[aá]ria|corretor|sindicato|sinduscon|secretaria|prefeitura|faculdade|escola|curso|caixa econ|cart[oó]rio|'
                  r'condom[ií]nio|residencial (?!constr)|edif[ií]cio (?!constr)|stand de vendas|plant[aã]o de vendas|piscina|energia solar|'
                  r'solar|el[eé]tric|hidr[aá]ulic|desentup|dedetiz|limpeza|terraplanagem|pavimenta|demoli|po[çc]o artesiano', re.I)

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
        lugares[k]['bairros'].add(c['bairro']); lugares[k]['buscas'] += 1; continue
    p.update(bairros={c['bairro']}, chave=k, buscas=1)
    lugares[k] = p
L = list(lugares.values())
print('cartões', len(cards), 'lugares', len(L), 'no topo genérico', len(topo))
dom = lambda u: urlparse(u).netloc.lower().removeprefix('www.')
for p in L:
    p['tipo_site'] = 'sem site' if not p['site'] else ('rede social/portal' if any(s in p['site'] for s in NAO_SITE) else 'site próprio')
cont = Counter(dom(p['site']) for p in L if p['tipo_site'] == 'site próprio')
for p in L:
    nome_cat = (p['categoria'] or '') + ' ' + (p['nome'] or '')
    p['no_topo'] = p['chave'] in topo
    p['rede'] = bool(REDES.search(p['nome'] or '') or (p['tipo_site'] == 'site próprio' and REDES.search(dom(p['site']))))
    p['constr'] = bool(CONSTR.search(nome_cat)) and not FORA.search(nome_cat)
    p['unidades_maps'] = cont[dom(p['site'])] if p['tipo_site'] == 'site próprio' else 1
    p['bairros'] = sorted(b for b in p['bairros'] if b)
base = [p for p in L if p['constr'] and not p['rede'] and not p['no_topo'] and p['avaliacoes'] < 1500 and (p['nota'] or 5) >= 3.5]
filtro = [p for p in base if p['tipo_site'] == 'site próprio']
print('construtoras', sum(p['constr'] for p in L), 'redes', sum(p['rede'] for p in L), 'topo', sum(p['no_topo'] for p in L),
      'base', len(base), 'sites para checar', len(filtro))
doms = {}
for p in filtro:
    doms.setdefault(dom(p['site']), p['site'])
print('domínios', len(doms))
res = {}
with ThreadPoolExecutor(32) as ex:
    for d, r in zip(doms, ex.map(checa, doms.values())):
        res[d] = r
for p in filtro:
    p.update(res.get(dom(p['site']), {}))
json.dump(L, open('saida/todos.json', 'w'), ensure_ascii=False, indent=1)
# site ruim: uma linha por domínio (a ficha com mais avaliações), 2+ problemas ou fora do ar
porDom = {}
for p in filtro:
    d = dom(p['site'])
    if d not in porDom or p['avaliacoes'] > porDom[d]['avaliacoes']:
        porDom[d] = p
ruins = [p for p in porDom.values() if p.get('pontos', 0) >= 2 or not p.get('site_ok')]
# sem site (ou só rede social): precisa de algum movimento no Google
sem = [p for p in base if p['tipo_site'] != 'site próprio' and p['avaliacoes'] >= 5]
cand = sorted(ruins, key=lambda p: (-p.get('pontos', 0), -p['avaliacoes']))[:2200] + sorted(sem, key=lambda p: -p['avaliacoes'])[:1800]
for i, p in enumerate(cand):
    p['id'] = i
json.dump(cand, open('saida/candidatos.json', 'w'), ensure_ascii=False, indent=1)
print('candidatos', len(cand), 'site ruim', len(ruins), 'sem site', len(sem), Counter(p.get('pontos', -1) for p in cand))
