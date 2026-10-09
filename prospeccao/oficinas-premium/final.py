"""Junta candidatas + detalhes, descobre a marca de cada oficina (nome, site, ficha e avaliações do Google),
dá a nota de site ruim, junta sinais para vender o sistema e escolhe até 200 por marca, sem repetir oficina.
Uso: python final.py saida/selecao.json"""
import json, re, math, sys, glob
from collections import Counter, defaultdict
from checa_site import MARCAS_RX

MARCAS = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Land Rover/Jaguar', 'Volvo']
META = 200
cand = {c['id']: c for c in json.load(open('saida/candidatos.json'))}
for f in glob.glob('saida/detalhe-*.json'):
    for d in json.load(open(f)):
        if d['id'] in cand: cand[d['id']]['detalhe'] = d
R = [c for c in cand.values() if 'detalhe' in c and not c['detalhe'].get('erro_maps')]
# categorias do Google que não são oficina, e oficinas de diesel/caminhão
CAT_FORA = re.compile(r'revendedora|usados|celular|estacionamento|escrit[oó]rio|lava|acess[oó]rios|inspe[cç][aã]o|seguro|loja de pneu|guincho', re.I)
R = [c for c in R if not CAT_FORA.search(c['categoria'] or '') and not re.search(r'diesel|caminh|truck|pesad', (c['nome'] or '') + ' ' + (c['categoria'] or ''), re.I)]
print('candidatas', len(cand), 'com ficha', len(R))

UN = {'minuto': 0, 'hora': 0, 'dia': 1, 'semana': 7, 'mês': 30, 'mes': 30, 'meses': 30, 'ano': 365, 'anos': 365}
def dias(s):
    m = re.search(r'(um|uma|\d+)\s+(minuto|hora|dia|semana|m[eê]s|meses|anos?)', s.lower())
    if not m: return None
    return (1 if m.group(1) in ('um', 'uma') else int(m.group(1))) * UN[m.group(2)]
DOR = {'orçamento': r'or[cç]amento', 'demora/prazo': r'demor|prazo|atras|esperei|semanas? para|dias para|n[aã]o entreg',
       'retorno/contato': r'n[aã]o (me )?(retorn|respond|atend)|sem retorno|dif[ií]cil (falar|contato)|ningu[eé]m atend|whats',
       'transparência/preço': r'cobr|caro|pre[cç]o|nota fiscal|explic|transpar|confian'}
PREMIUM = re.compile(r'importad|alem[aã]|premium|europe|luxo', re.I)

def marca_score(r):
    d = r['detalhe']; s = defaultdict(float); ev = defaultdict(list)
    nome = (r['nome'] or '').lower()
    ficha = (d.get('ficha') or '')[:1200].lower()
    revs = [x.lower() for x in d.get('reviews') or []]
    for m, rx in MARCAS_RX.items():
        if re.search(rx, nome): s[m] += 100; ev[m].append('nome')
        n = (r.get('marcas_site') or {}).get(m, 0)
        if n: s[m] += 4 + min(n, 15); ev[m].append(f'site ({n}x)')
        if re.search(rx, ficha): s[m] += 10; ev[m].append('ficha do Google')
        k = sum(1 for t in revs if re.search(rx, t))
        if k: s[m] += 6 * k; ev[m].append(f'{k} avaliação(ões)')
    for m, pos in r['buscas'].items():
        if m in MARCAS and s[m] > 0:
            s[m] += 3 if pos <= 5 else 1 if pos <= 20 else 0
    return s, ev

out = []
for r in R:
    d = r['detalhe']
    r['nota_google'] = r.get('nota')
    s, ev = marca_score(r)
    r['score_marca'] = dict(s); r['evid'] = {m: ', '.join(v) for m, v in ev.items()}
    # oficinas de importados sem marca citada: usam as buscas como pista fraca (só completam marcas que faltarem)
    r['premium_txt'] = bool(PREMIUM.search((r['nome'] or '') + ' ' + (d.get('ficha') or '')[:600] + ' ' + (r.get('titulo') or '')))
    ds = [x for x in (dias(t) for t in d.get('datas') or []) if x is not None]
    r['ult_dias'] = min(ds) if ds else None
    r['ult_txt'] = next((t for t in d.get('datas') or [] if dias(t) == r['ult_dias']), '')
    r['recentes_90d'] = sum(1 for x in ds if x <= 90)
    # site
    P = []
    if r['tipo_site'] == 'sem site':
        r['situacao'] = 'sem site'; r['nota'] = 10
    elif r['tipo_site'] == 'rede social/portal':
        alvo = 'Instagram' if 'instagram' in r['site'] else 'Facebook' if 'facebook' in r['site'] else 'WhatsApp' if ('wa.me' in r['site'] or 'whatsapp' in r['site']) else 'página gratuita/link'
        r['situacao'] = f'sem site (só {alvo})'; r['nota'] = 9
    else:
        cert = 'ERR_CERT' in (d.get('erro_site') or '')
        P = [p for p in r.get('problemas', []) if not (p.startswith('lento (99s') or p == 'certificado/HTTPS com erro')]
        if cert: P.insert(0, 'navegador mostra aviso de "site não seguro" (certificado inválido)')
        elif (r.get('erro') and not r.get('site_ok')) or (d.get('erro_site') and not d.get('status_cel')): P.insert(0, 'site fora do ar ou não abre')
        if d.get('erros_js'): P.append(f'{len(d["erros_js"])} erro(s) de programação ao abrir a página')
        if (d.get('n_falhas') or 0) >= 3: P.append(f'{d["n_falhas"]} arquivos ou imagens que não carregam')
        if d.get('larg') and d.get('tela') and d['larg'] > d['tela'] + 20 and 'não adaptado para celular' not in P: P.append('página mais larga que a tela do celular')
        if (d.get('carga_s') or 0) > 8: P.append(f'demora {d["carga_s"]:.0f}s para abrir no celular')
        if (d.get('status_cel') or 0) >= 500: P.append(f'erro {d["status_cel"]} do servidor')
        fora = P and P[0] in ('site fora do ar ou não abre',)
        r['situacao'] = 'site fora do ar' if fora else 'site desatualizado/com erros'
        r['nota'] = 9 if fora else min(8, len(P))
    r['P'] = P
    # sinais para o sistema
    S = []
    if r['tipo_site'] != 'site próprio': S.append('atende só por telefone/WhatsApp/redes, sem site')
    if not r.get('agenda_online') and not d.get('agendar_maps'): S.append('sem agendamento on-line (nem no Google)')
    if r['tipo_site'] == 'site próprio' and not r.get('orcamento_form'): S.append('site sem pedido de orçamento')
    revs = d.get('reviews') or []
    trechos = []
    for nome, rx in DOR.items():
        k = [t for t in revs if re.search(rx, t, re.I)]
        if k:
            S.append(f'{len(k)} avaliação(ões) recente(s) falam de {nome}')
            trechos.append(k[0][:220].replace('\n', ' '))
    if r['recentes_90d'] >= 5: S.append(f'movimento alto: {r["recentes_90d"]} avaliações nos últimos 3 meses')
    r['S'] = S; r['trechos'] = trechos[:2]
    r['endereco'] = next((l for l in (d.get('ficha') or '').split('\n') if re.search(r'\d{5}-\d{3}', l)), '')
    out.append(r)

ativo = lambda r: r['ult_dias'] is not None and r['ult_dias'] <= 365
ok = [r for r in out if ativo(r) and (r['telefone'] or r.get('tel_site'))]
ok = [r for r in ok if r['nota'] >= 3]
print('elegíveis (ativas, com telefone, site ruim/sem site)', len(ok))

def q(r):
    rec = 2 if r['ult_dias'] <= 60 else 1 if r['ult_dias'] <= 180 else 0
    return r['nota'] * 0.6 + rec + 1.5 * math.log10(1 + r['avaliacoes']) + (r['nota_google'] or 4)

escolha = {m: [] for m in MARCAS}; usado = set()
# 1) evidência forte (nome, site, ficha ou avaliações), marca principal primeiro, depois a segunda
for rodada in range(2):
    fila = []
    for r in ok:
        if id(r) in usado: continue
        ms = sorted(((v, m) for m, v in r['score_marca'].items() if v >= 6), reverse=True)
        if len(ms) > rodada:
            v, m = ms[rodada]; fila.append((m, math.log10(v) * 3 + q(r), r))
    fila.sort(key=lambda x: -x[1])
    for m, _, r in fila:
        if id(r) in usado or len(escolha[m]) >= META: continue
        escolha[m].append(r); usado.add(id(r)); r['marca'] = m; r['evidencia'] = r['evid'].get(m, '')
# 2) oficinas de importados sem marca escrita, que apareceram no topo da busca da marca que faltar
for m in MARCAS:
    if len(escolha[m]) >= META: continue
    fila = [r for r in ok if id(r) not in usado and r['premium_txt'] and r['buscas'].get(m, 99) <= 10]
    fila.sort(key=lambda r: (r['buscas'][m], -q(r)))
    for r in fila[:META - len(escolha[m])]:
        escolha[m].append(r); usado.add(id(r)); r['marca'] = m; r['evidencia'] = f'oficina de importados; {r["buscas"][m]}º na busca "oficina {m}"'
for m in MARCAS:
    escolha[m].sort(key=lambda r: -(q(r) + (3 if 'nome' in r['evidencia'] else 0)))
    print(m, len(escolha[m]), Counter(r['situacao'].split(' (')[0] for r in escolha[m]))
res = [r for r in ok if id(r) not in usado and (max(r['score_marca'].values() or [0]) >= 6 or r['premium_txt'])]
for r in res:
    r['marca'] = max(r['score_marca'], key=r['score_marca'].get) if r['score_marca'] else 'importados'
    r['evidencia'] = r['evid'].get(r['marca'], 'oficina de importados')
res.sort(key=lambda r: -q(r))
print('reservas', len(res))
keep = ['nome', 'cidade', 'bairros', 'site', 'situacao', 'nota', 'P', 'S', 'trechos', 'ult_txt', 'ult_dias', 'avaliacoes', 'nota_google',
        'telefone', 'tel_site', 'whatsapp', 'email', 'endereco', 'maps', 'marca', 'evidencia', 'categoria', 'score_marca']
enx = lambda r: {k: r.get(k) for k in keep}
json.dump({'marcas': {m: [enx(r) for r in v] for m, v in escolha.items()}, 'res': [enx(r) for r in res[:400]]},
          open(sys.argv[1], 'w'), ensure_ascii=False)
