"""Gera a planilha e os documentos do canvas a partir da seleção (final.py)."""
import json, sys, os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
S = json.load(open(sys.argv[1])); xlsx = sys.argv[2]; docsdir = sys.argv[3]
TEXTO = json.load(open(os.path.join(os.path.dirname(__file__), "como.json")))
TITULOS = [k + 1 for k, t in enumerate(TEXTO) if t and len(t) < 60 and not t.startswith(("•", "Como esta"))]
COLS = [('#', 5), ('Dentista / consultório', 34), ('Cidade', 18), ('Bairro', 22), ('Situação', 14), ('Site', 34), ('Nota de site ruim (0-10)', 12),
        ('Problemas encontrados no site', 70), ('Última avaliação no Google', 16), ('Avaliações', 10), ('Nota Google', 9),
        ('Telefone', 17), ('WhatsApp', 15), ('E-mail', 28), ('Endereço', 45), ('Google Maps', 30)]
def wa(r):
    w = r.get('whatsapp') or ''
    return ('+' + w) if w else ''
def linha(i, r):
    return [i, r['nome'], r['cidade'], ', '.join(r['bairros']), 'Sem site' if r['sem_site'] else 'Site ruim', r['site'], r['nota'], '; '.join(r['P']), r['ult_txt'],
            r['avaliacoes'], r['nota'] and r.get('nota_google'), r.get('telefone') or r.get('tel_site', ''), wa(r), r.get('email', ''),
            r.get('endereco', ''), r['maps']]
wb = Workbook()
for nome, lst in (('100 dentistas', S['top']), ('Reservas', S['res'])):
    ws = wb.active if nome.startswith('100') else wb.create_sheet(nome)
    ws.title = nome
    ws.append([c for c, _ in COLS])
    for i, r in enumerate(lst, 1):
        l = linha(i, r); l[10] = r.get('nota_g')
        ws.append(l)
        if r['site']: ws.cell(i + 1, 6).hyperlink = r['site']
        ws.cell(i + 1, 16).hyperlink = r['maps']; ws.cell(i + 1, 16).value = 'abrir no Maps'
    for j, (_, w) in enumerate(COLS, 1):
        ws.column_dimensions[get_column_letter(j)].width = w
        c = ws.cell(1, j); c.font = Font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='182644')
        c.alignment = Alignment(wrap_text=True, vertical='center')
    for row in ws.iter_rows(min_row=2):
        for c in row: c.alignment = Alignment(wrap_text=True, vertical='top')
    ws.freeze_panes = 'C2'; ws.auto_filter.ref = ws.dimensions
ws = wb.create_sheet('Como foi feito')
for t in TEXTO:
    ws.append([t])
ws.column_dimensions['A'].width = 140
for c in ws['A']: c.alignment = Alignment(wrap_text=True)
ws['A1'].font = Font(bold=True, size=14)
for k in TITULOS: ws.cell(k, 1).font = Font(bold=True)
wb.save(xlsx)
# documentos do canvas (lista imobiliarias)
os.makedirs(docsdir, exist_ok=True)
docs = []
for i, r in enumerate(S['top'], 1):
    docs.append({'id': f'dent-{i:03d}', 'data': {
        'lista': 'dentistas', 'nome': r['nome'], 'site': r['site'], 'cidade': r['cidade'], 'segmento': r.get('categoria') or 'Dentista',
        'notas': ('Sem site: ' if r['sem_site'] else 'Problemas no site: ') + '; '.join(r['P']), 'status': 'novo', 'rank': i, 'triagem': '',
        'contato': {'telefone': r.get('telefone') or r.get('tel_site', ''), 'email': r.get('email', ''), 'whatsapp': wa(r)},
        'extra': {'notaGoogle': r.get('nota_g'), 'avaliacoes': r['avaliacoes'], 'notaSite': r['nota'], 'maps': r['maps'],
                  'endereco': r.get('endereco', ''), 'bairro': ', '.join(r['bairros']), 'ultimaAvaliacao': r['ult_txt'], 'problemas': r['P'], 'situacao': 'sem site' if r['sem_site'] else 'site ruim'},
        'criadoEm': 1791520000000 - i}})
for k in range(0, len(docs), 50):
    json.dump([{'op': 'set', 'collection': 'empresas', 'doc_id': d['id'], 'data': d['data']} for d in docs[k:k + 50]],
              open(f'{docsdir}/lote-{k // 50}.json', 'w'), ensure_ascii=False)
print('ok', len(docs))
