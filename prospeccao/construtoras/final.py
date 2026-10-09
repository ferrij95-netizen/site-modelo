"""Cruza as construtoras do Maps com o CNPJ (dados abertos da Receita), dá a pontuação de bom pagador e escolhe 500 + reservas.
Uso: python final.py saida selecao.json"""
import csv, gzip, json, math, re, sys, unicodedata
from collections import Counter, defaultdict
from datetime import date
D = sys.argv[1]
HOJE = date(2026, 10, 9)
R = json.load(open(f'{D}/resultado.json'))
norm = lambda s: re.sub(r'[^A-Z0-9 ]', ' ', unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode().upper())
STOP = set('CONSTRUTORA INCORPORADORA INCORPORACOES INCORPORACAO CONSTRUCOES CONSTRUCAO CONSTRUTOR ENGENHARIA EMPREENDIMENTOS '
           'IMOBILIARIOS IMOBILIARIA EDIFICACOES OBRAS LTDA ME EPP EIRELI SA S A E DE DO DA DOS DAS EM CIA COMPANHIA GRUPO '
           'SERVICOS PROJETOS CIVIL ARQUITETURA PARTICIPACOES COMERCIO REFORMAS CONSTRUTIVA SPE'.split())
tok = lambda s: {t for t in norm(s).split() if t not in STOP and len(t) >= 3}
# ---- Receita
dig = lambda s: re.sub(r'\D', '', s or '')
def tel10(t):
    t = dig(t)
    if t.startswith('55') and len(t) >= 12: t = t[2:]
    if len(t) == 11: t = t[:2] + t[3:]   # tira o 9 do celular (Receita guarda 8 dígitos)
    return t[-10:] if len(t) >= 10 else ''
EMP = {}
for r in csv.reader(gzip.open(f'{D}/rf-emp.csv.gz', 'rt')):
    EMP[r[0]] = dict(razao=r[1], natureza=r[2], capital=float(r[4].replace(',', '.') or 0), porte=r[5])
EST, filiais = [], Counter()
for r in csv.reader(gzip.open(f'{D}/rf-estab.csv.gz', 'rt')):
    e = dict(cnpj=r[0], basico=r[1], matriz=r[2] == '1', fantasia=r[3], situacao=r[4], inicio=r[6], cnae=r[7], bairro=r[9],
             uf=r[10], cidade=r[11], end=r[12], cep=r[13], tels=[t for t in (r[14], r[15]) if len(t) >= 10], email=r[16].lower(),
             especial=r[17].strip())
    e.update(EMP.get(e['basico'], {}))
    EST.append(e)
    if e['situacao'] == '02': filiais[e['basico']] += 1
porTel, porCid, porCnpj = defaultdict(list), defaultdict(list), {}
for e in EST:
    porCnpj[e['cnpj']] = e
    for t in e['tels']:
        if tel10(t): porTel[tel10(t)].append(e)
    e['tok'] = tok(e.get('razao', '')) | tok(e['fantasia'])
    porCid[e['cidade']].append(e)
print('estabelecimentos', len(EST), 'empresas', len(EMP))
def ativo_melhor(c):
    return sorted(c, key=lambda e: (e['situacao'] != '02', not e['matriz'], e['inicio'] or '9'))[0]
def acha(r):
    if r.get('cnpj') and r['cnpj'] in porCnpj: return porCnpj[r['cnpj']], 'CNPJ no site'
    cid = norm(r['cidade'].rsplit(' ', 1)[0]).strip()
    for t in (r.get('telefone'), r.get('tel_site'), r.get('whatsapp')):
        t = tel10(t)
        if not t: continue
        c = porTel.get(t)
        if c: return ativo_melhor(c), 'telefone'
    T = tok(r['nome'])
    if not T: return None, ''
    c = [e for e in porCid.get(cid, []) if T <= e['tok']]
    if c and len({e['basico'] for e in c}) <= 2: return ativo_melhor(c), 'nome'
    return None, ''
UN = {'minuto': 0, 'hora': 0, 'dia': 1, 'semana': 7, 'mês': 30, 'mes': 30, 'meses': 30, 'ano': 365}
def dias(s):
    m = re.search(r'(um|uma|\d+)\s+(minuto|hora|dia|semana|m[eê]s|meses|ano)', (s or '').lower())
    return None if not m else (1 if m.group(1) in ('um', 'uma') else int(m.group(1))) * UN[m.group(2)]
PORTE = {'01': 'Microempresa', '03': 'Pequeno porte (EPP)', '05': 'Médio/grande (demais)', '00': 'Não informado'}
out = []
for r in R:
    d = r.get('detalhe', {})
    ds = [x for x in (dias(s) for s in d.get('datas') or []) if x is not None]
    r['ult_dias'] = min(ds) if ds else None
    r['ult_txt'] = next((s for s in d.get('datas') or [] if dias(s) == r['ult_dias']), '')
    r['fotos'] = max(d.get('fotos') or 0, 0); r['fotos_dono'] = d.get('fotos_dono') or 0
    # site
    if r['tipo_site'] == 'site próprio':
        cert = 'ERR_CERT' in (d.get('erro_site') or '')
        P = [p for p in r.get('problemas', []) if not (p.startswith('lento (99s') or p == 'certificado/HTTPS com erro')]
        if cert: P.insert(0, 'navegador mostra aviso de "site não seguro" (certificado inválido)')
        elif not r.get('site_ok'): P.insert(0, 'site fora do ar ou não abre')
        if d.get('erros_js'): P.append(f'{len(d["erros_js"])} erro(s) de programação ao abrir a página')
        if (d.get('n_falhas') or 0) >= 3: P.append(f'{d["n_falhas"]} arquivos ou imagens que não carregam')
        if d.get('larg') and d.get('tela') and d['larg'] > d['tela'] + 20 and 'não adaptado para celular' not in P: P.append('página mais larga que a tela do celular')
        if (d.get('carga_s') or 0) > 8: P.append(f'demora {d["carga_s"]:.0f}s para abrir no celular')
        r['P'] = P; r['nota_site'] = 10 if not r.get('site_ok') and not cert else min(10, len(P))
        r['situacao_site'] = 'site fora do ar' if not r.get('site_ok') and not cert else 'site ruim'
    else:
        r['P'] = ['não tem site' if r['tipo_site'] == 'sem site' else 'só rede social/link no Google, sem site próprio']
        r['nota_site'] = 10; r['situacao_site'] = 'sem site' if r['tipo_site'] == 'sem site' else 'só rede social'
    # CNPJ
    e, como = acha(r)
    r['rf'] = e; r['rf_como'] = como
    # pontuação de bom pagador (0-100) e motivo de exclusão
    S, X = [], []
    pts = 0
    if e:
        anos = (HOJE - date.fromisoformat(f'{e["inicio"][:4]}-{e["inicio"][4:6]}-{e["inicio"][6:8]}')).days / 365.25 if e['inicio'] else 0
        e['anos'] = round(anos, 1)
        if e['situacao'] != '02': X.append('CNPJ não está ativo na Receita')
        if e['especial']: X.append(f'situação especial na Receita: {e["especial"]}')
        if anos < 3: X.append(f'CNPJ com menos de 3 anos ({anos:.1f})')
        cap = e.get('capital', 0)
        if cap and cap < 20000: X.append(f'capital social muito baixo (R$ {cap:,.0f})')
        p = 25 if anos >= 20 else 21 if anos >= 12 else 16 if anos >= 8 else 10 if anos >= 5 else 4
        pts += p; S.append(f'{anos:.0f} anos de CNPJ (+{p})')
        p = 25 if cap >= 5e6 else 21 if cap >= 1e6 else 15 if cap >= 3e5 else 9 if cap >= 1e5 else 3
        pts += p; S.append(f'capital social R$ {cap:,.0f} (+{p})'.replace(',', '.'))
        p = {'05': 8, '03': 5}.get(e.get('porte'), 0)
        if p: pts += p; S.append(f'porte {PORTE[e["porte"]]} (+{p})')
        f = filiais[e['basico']]
        if f >= 2: pts += 4; S.append(f'{f} estabelecimentos ativos (+4)')
    else:
        S.append('CNPJ não localizado com segurança (0)')
    av = r['avaliacoes'] or 0
    p = min(14, round(4 * math.log10(1 + av)))
    pts += p; S.append(f'{av} avaliações no Google (+{p})')
    if r['ult_dias'] is not None:
        p = 8 if r['ult_dias'] <= 60 else 5 if r['ult_dias'] <= 180 else 2 if r['ult_dias'] <= 365 else 0
        pts += p; S.append(f'última avaliação {r["ult_txt"]} (+{p})')
    ng = r.get('nota') or 0
    if ng >= 4.6 and av >= 10: pts += 4; S.append(f'nota {ng} no Google (+4)')
    elif ng < 4.0: pts -= 6; S.append(f'nota {ng} no Google (-6)')
    p = 8 if r['fotos'] >= 30 else 5 if r['fotos'] >= 10 else 2 if r['fotos'] >= 3 else 0
    if r['fotos_dono'] >= 5: p = min(10, p + 2)
    pts += p; S.append(f'{r["fotos"]}+ fotos na ficha do Google, {r["fotos_dono"]} do proprietário (+{p})')
    ob = r.get('obras_site') or []
    if ob: pts += 4; S.append('obras no site: ' + '; '.join(ob) + ' (+4)')
    r['score'] = max(0, min(100, pts)); r['S'] = S; r['X'] = X
    out.append(r)
ok = [r for r in out if not r['X'] and r['ult_dias'] is not None and r['ult_dias'] <= 365 and r['fotos'] >= 3
      and (r['situacao_site'] != 'site ruim' or r['nota_site'] >= 4) and (r.get('nota') or 5) >= 3.8]
print('total', len(out), 'com CNPJ', sum(bool(r['rf']) for r in out), Counter(r['rf_como'] for r in out),
      'excluídos', sum(bool(r['X']) for r in out), 'elegíveis', len(ok))
# CNPJ achado vem antes (a pontuação já favorece); uma linha por CNPJ básico
ok.sort(key=lambda r: -r['score'])
vistos, top, res, por = set(), [], [], Counter()
for r in ok:
    b = r['rf']['basico'] if r['rf'] else r['nome'].lower()
    if b in vistos: continue
    vistos.add(b)
    if len(top) < 500 and por[r['cidade']] < 15: top.append(r); por[r['cidade']] += 1
    else: res.append(r)
res = res[:400]
print('top', len(top), 'reservas', len(res), 'cidades', len(por), 'score min top', top[-1]['score'] if top else None,
      Counter(r['situacao_site'] for r in top), 'com CNPJ', sum(bool(r['rf']) for r in top))
for r in top + res:
    for k in ('texto',): r.pop(k, None)
    if r['rf']: r['rf'].pop('tok', None)
json.dump({'top': top, 'res': res, 'excl': Counter(x.split(':')[0].split('(')[0].strip() for r in out for x in r['X'])},
          open(sys.argv[2], 'w'), ensure_ascii=False)
