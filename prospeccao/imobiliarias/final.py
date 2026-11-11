"""Escolhe as 100 imobiliárias (movimento recente + site com problemas) e monta a planilha e o JSON do canvas."""
import json, re, math, sys
from collections import Counter, defaultdict
R = json.load(open('saida/resultado.json'))
UN = {'minuto': 0, 'hora': 0, 'dia': 1, 'semana': 7, 'mês': 30, 'mes': 30, 'meses': 30, 'ano': 365}
def dias(s):
    m = re.search(r'(um|uma|\d+)\s+(minuto|hora|dia|semana|m[eê]s|meses|ano)', s.lower())
    if not m: return None
    return (1 if m.group(1) in ('um', 'uma') else int(m.group(1))) * UN[m.group(2)]
def campo(ficha, rx):
    m = re.search(rx, ficha or '')
    return m.group(0).strip() if m else ''
CAT_OK = re.compile(r'imobili|im[oó]ve|corretor', re.I)
NOME_OK = re.compile(r'im[oó]veis|imobili|corretor', re.I)
FORA = re.compile(r'\bvans?\b|sem motorista|advoca|advogad|direito|consultoria|regulariza|despachante|engenharia|arquitet|leil', re.I)
def e_imob(r):
    if FORA.search((r.get('nome') or '') + ' ' + (r.get('categoria') or '') + ' ' + r['site']): return False
    return bool(CAT_OK.search(r.get('categoria') or '')) or bool(NOME_OK.search(r.get('nome') or ''))
R = [r for r in R if e_imob(r)]
out = []
for r in R:
    d = r.get('detalhe', {})
    ds = [x for x in (dias(s) for s in d.get('datas') or []) if x is not None]
    r['ult_dias'] = min(ds) if ds else None
    r['ult_txt'] = next((s for s in d.get('datas') or [] if dias(s) == r['ult_dias']), '')
    cert = 'ERR_CERT' in (d.get('erro_site') or '')
    P = [p for p in r.get('problemas', []) if not (p.startswith('lento (99s') or p == 'certificado/HTTPS com erro')]
    if cert: P.insert(0, 'navegador mostra aviso de "site não seguro" (certificado inválido)')
    elif r.get('erro') and not r.get('site_ok'): P.insert(0, 'site fora do ar ou não abre')
    if d.get('erros_js'): P.append(f'{len(d["erros_js"])} erro(s) de programação ao abrir a página')
    if (d.get('n_falhas') or 0) >= 3: P.append(f'{d["n_falhas"]} arquivos ou imagens que não carregam')
    if d.get('larg') and d.get('tela') and d['larg'] > d['tela'] + 20 and 'não adaptado para celular' not in P: P.append('página mais larga que a tela do celular')
    if (d.get('carga_s') or 0) > 8: P.append(f'demora {d["carga_s"]:.0f}s para abrir no celular')
    if (d.get('status_cel') or 0) >= 500: P.append(f'erro {d["status_cel"]} do servidor')
    r['P'] = P
    r.setdefault('nota_g', r.get('nota'))
    r['nota'] = min(10, len(P))
    r['abre'] = bool(r.get('site_ok')) or cert
    r['endereco'] = campo(d.get('ficha'), r'[^\n]*\d{5}-\d{3}[^\n]*')
    out.append(r)
def score(r):
    rec = 3 if r['ult_dias'] <= 30 else 2 if r['ult_dias'] <= 90 else 1
    return r['nota'] * 2 + rec + math.log10(1 + r['avaliacoes'])
ok = [r for r in out if r['ult_dias'] is not None and r['ult_dias'] <= 180 and r['abre'] and r['nota'] >= 4]
ok.sort(key=score, reverse=True)
print('elegíveis', len(ok), Counter(r['nota'] for r in ok))
por = Counter(); top, res = [], []
for r in ok:
    if len(top) < 100 and por[r['cidade']] < 10:
        top.append(r); por[r['cidade']] += 1
    else:
        res.append(r)
# reservas: elegíveis que sobraram + ativas com nota 3 ou site fora do ar
extra = [r for r in out if r not in ok and r['ult_dias'] is not None and r['ult_dias'] <= 180 and (r['nota'] >= 3)]
extra.sort(key=score, reverse=True)
res = (res + extra)[:100]
print('top', len(top), por, 'reservas', len(res))
json.dump({'top': top, 'res': res}, open(sys.argv[1], 'w'), ensure_ascii=False)
