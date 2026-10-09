"""Junta as buscas do Maps, fica só com oficinas independentes de carro (sem concessionárias, redes, motos e caminhões),
abre cada site próprio e dá a nota de 10 pontos. Saída: saida/todos.json e saida/candidatos.json (vão para o detalhe)."""
import json, glob, re
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse
from checa_site import parse_card, checa, NAO_SITE, MARCAS_RX

BUSCA_MARCA = {'BMW': 'BMW', 'Mercedes': 'Mercedes-Benz', 'Audi': 'Audi', 'Porsche': 'Porsche', 'Land Rover': 'Land Rover/Jaguar',
               'Jaguar': 'Land Rover/Jaguar', 'Volvo': 'Volvo'}
OFICINA = re.compile(r'oficina|mec[aâ]nic|auto ?center|autocenter|centro automotivo|reparo|manuten|servi[cç]o automotivo|'
                     r'el[eé]trica automotiva|inje[cç][aã]o|c[aâ]mbio|funilaria|lanternagem|suspens|freio|motor|diagn[oó]stic|'
                     r'car ?service|garage|garagem|auto ?repair|import|especializad|performance|tuning|remap', re.I)
FORA = re.compile(r'concession|autorizad|revenda|seminovos|ve[ií]culos usados|loja de carros|locadora|aluguel de carro|'
                  r'auto ?escola|\bmotos?\b|motocicl|motorrad|caminh|[oô]nibus|pesados|truck|trator|agr[ií]col|n[aá]utic|barco|'
                  r'guincho|reboque|vistoria|despachante|corretora de seguro|desmanche|ferro ?velho|sucata|blindad|chaveiro|posto de', re.I)
# fora, a não ser que a categoria do Google seja de oficina
FORA_SALVO = re.compile(r'lava ?r[aá]pido|lava ?jato|est[eé]tica|pel[ií]cula|insulfilm|som automotivo|pneus?\b|borracharia|'
                        r'auto ?pe[cç]as|loja de pe[cç]as|distribuidora|atacad|capotaria|tape[cç]aria|vidra[cç]aria', re.I)
CAT_OFICINA = re.compile(r'oficina|mec[aâ]nic|centro automotivo|servi[cç]o automotivo|reparo', re.I)
REDES = re.compile(r'bosch car service|pit ?stop|\bmidas\b|speedy|jet oil|rede [aâ]ncora|grid auto|car ?system|doutor ?ie|'
                   r'dpaschoal|pneustore|carglass|autoglass|porto seguro|tokio marine|'
                   r'autokraft|eurobike|bavarian|sinal star|stuttgart|itavema|cotrasa|mercedes-benz [a-z]+ (?:ltda|s\.?a)|'
                   r'(?:audi|porsche|volvo|bmw|land rover|jaguar) (?:center|centre)\b', re.I)
SITE_OFICIAL = re.compile(r'(^|\.)(bmw|mercedes-benz|mercedes|audi|porsche|landrover|land-rover|jaguar|volvocars|volvo)\.(com|com\.br)$|'
                          r'concessionaria|mercedes-benz-|porsche-|audicenter|volvocars|landrover|jaguar-', re.I)

cards = []
for f in glob.glob('saida/maps-*.json'):
    cards += json.load(open(f))
lugares = {}
for c in cards:
    k = c['maps'].split('?')[0]
    if k not in lugares:
        p = parse_card(c)
        p.update(chave=k, bairros=set(), buscas=defaultdict(lambda: 99))
        lugares[k] = p
    p = lugares[k]
    if c['bairro']: p['bairros'].add(c['bairro'])
    m = BUSCA_MARCA.get(c['marca_busca'], 'importados')
    p['buscas'][m] = min(p['buscas'][m], c['pos'])
L = list(lugares.values())
print('cartões', len(cards), 'lugares', len(L))
dom = lambda u: urlparse(u).netloc.lower().removeprefix('www.')
for p in L:
    txt = (p['nome'] or '') + ' | ' + (p['categoria'] or '')
    p['marcas_nome'] = [m for m, rx in MARCAS_RX.items() if re.search(rx, (p['nome'] or '').lower())]
    p['oficina'] = bool(OFICINA.search(txt)) or bool(p['marcas_nome'])
    p['fora'] = bool(FORA.search(txt)) or (bool(FORA_SALVO.search(txt)) and not CAT_OFICINA.search(p['categoria'] or ''))
    p['rede'] = bool(REDES.search(p['nome'] or '') or (p['site'] and (REDES.search(dom(p['site'])) or SITE_OFICIAL.search(dom(p['site'])))))
    p['tipo_site'] = 'sem site' if not p['site'] else ('rede social/portal' if any(s in p['site'] for s in NAO_SITE) else 'site próprio')
    p['bairros'] = sorted(p['bairros'])
    p['buscas'] = dict(p['buscas'])
cont = Counter(dom(p['site']) for p in L if p['tipo_site'] == 'site próprio')
for p in L:
    p['unidades_maps'] = cont[dom(p['site'])] if p['tipo_site'] == 'site próprio' else 1
base = [p for p in L if p['oficina'] and not p['fora'] and not p['rede'] and p['unidades_maps'] <= 3
        and (p['nota'] or 0) >= 3.8 and p['avaliacoes'] >= 3]
print('oficina', sum(p['oficina'] for p in L), 'fora', sum(p['fora'] for p in L), 'redes/oficiais', sum(p['rede'] for p in L), 'base', len(base))
doms = {}
for p in base:
    if p['tipo_site'] == 'site próprio':
        doms.setdefault(dom(p['site']), p['site'])
print('domínios a checar', len(doms))
res = {}
with ThreadPoolExecutor(32) as ex:
    for d, r in zip(doms, ex.map(checa, doms.values())):
        res[d] = r
for p in base:
    if p['tipo_site'] == 'site próprio':
        p.update(res.get(dom(p['site']), {}))
json.dump(base, open('saida/todos.json', 'w'), ensure_ascii=False)
# candidatas: sem site, só rede social, site fora do ar ou com 2+ problemas
def ruim(p):
    if p['tipo_site'] != 'site próprio': return True
    return not p.get('site_ok') or p.get('pontos', 0) >= 2
def prioridade(p):
    # quem tem a marca no nome, no site ou aparece no topo das buscas da marca vem primeiro
    ev = 3 * bool(p['marcas_nome']) + bool(p.get('marcas_site')) + sum(1 for m, pos in p['buscas'].items() if m != 'importados' and pos <= 10)
    return (-ev, -p['avaliacoes'])
cand = sorted([p for p in base if ruim(p)], key=prioridade)[:7000]
for i, p in enumerate(cand):
    p['id'] = i
json.dump(cand, open('saida/candidatos.json', 'w'), ensure_ascii=False)
print('candidatas', len(cand), Counter(p['tipo_site'] for p in cand))
