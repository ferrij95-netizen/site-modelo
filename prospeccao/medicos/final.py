# Cruza candidatos com o Maps, dá a nota final de "fora do digital" e gera a planilha com os 500.
import json, glob, re, unicodedata, sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter
def norm(s): return unicodedata.normalize('NFKD', s or '').encode('ascii', 'ignore').decode().lower()
PARTICULAS = {'de', 'da', 'do', 'dos', 'das', 'e', 'dr', 'dra'}
def toks(s): return {t for t in re.findall(r'[a-z]+', norm(s)) if len(t) > 2 and t not in PARTICULAS}
cand = {c['cnes']: c for c in json.load(open('saida/candidatos.json'))}
maps = {m['cnes']: m for f in glob.glob('saida/maps-*.json') for m in json.load(open(f))}
def bate(nome, med):
    return len(toks(nome) & toks(med)) >= 2
def avals(nota):
    m = re.search(r'\(([\d.]+)\)', nota or '')
    return int(m.group(1).replace('.', '')) if m else 0
linhas = []
for cod, c in cand.items():
    m = maps.get(cod, {})
    nota, motivos = c['nota_previa'], list(c['motivos'])
    achou = m.get('nome') if m.get('nome') and m['nome'] != 'Resultados' and bate(m['nome'], c['medico']) else None
    if not achou:
        for it in m.get('lista') or []:
            if bate(it['nome'], c['medico']): achou = it['nome']; break
    site, n_av = None, 0
    if achou:
        if achou == m.get('nome'): site, n_av = m.get('site'), avals(m.get('nota'))
        else: n_av = avals(next(it['texto'] for it in m['lista'] if it['nome'] == achou))
        if site and not re.search(r'doctoralia|instagram|facebook|wa\.me|whatsapp|linktr', site): nota -= 5; motivos.append('tem site próprio')
        elif site: nota += 0; motivos.append('só tem perfil em rede/Doctoralia')
        else: nota += 2; motivos.append('no Google, mas sem site')
        if n_av == 0: nota += 1; motivos.append('nenhuma avaliação no Google')
        elif n_av < 5: nota += 1; motivos.append(f'só {n_av} avaliação no Google' if n_av == 1 else f'só {n_av} avaliações no Google')
        elif n_av >= 30: nota -= 2; motivos.append(f'{n_av} avaliações no Google')
        google = f"Achado como \"{achou}\"" + (f" · site: {site}" if site else ' · sem site') + (f" · {n_av} avaliação" if n_av == 1 else f" · {n_av} avaliações")
    else:
        nota += 3; motivos.append('não aparece no Google com o próprio nome')
        google = 'Não encontrado no Google Maps'
    linhas.append({**c, 'nota': nota, 'motivos': motivos, 'google': google, 'tem_site': bool(site and nota < 5)})
# um registro por médico e por telefone
vistos, final = set(), []
for l in sorted(linhas, key=lambda x: (-x['nota'], x['cidade'] != 'Porto Alegre')):
    chave = (norm(l['medico']), re.sub(r'\D', '', l['telefone']))
    if chave[0] in vistos or chave[1] in vistos: continue
    vistos.update(chave); final.append(l)
final = [l for l in final if not l['tem_site']]
top, reservas = final[:500], final[500:800]
print('total', len(final), 'nota corte', top[-1]['nota'])
import collections; print(collections.Counter(l['cidade'] for l in top)); print(collections.Counter(l['nota'] for l in top))
print(collections.Counter('Não encontrado' in l['google'] for l in top))
COLS = [('Prioridade', 10), ('Nota analógico', 9), ('Médico(a)', 30), ('Especialidade', 22), ('CRM', 13), ('Cidade', 15), ('Bairro', 16),
        ('Endereço', 32), ('CEP', 10), ('Telefone', 15), ('Tipo de telefone', 10), ('E-mail', 30), ('Google', 40), ('Por que parece analógico', 60),
        ('Outros médicos no consultório', 28), ('Fonte', 22), ('Status', 12), ('Observações', 30)]
def aba(ws, dados):
    ws.append([c for c, _ in COLS])
    for i, l in enumerate(dados, 1):
        pr = 'A' if l['nota'] >= 11 else 'B' if l['nota'] >= 10 else 'C'
        ws.append([pr, l['nota'], l['medico'], l['especialidade'], l['crm'], l['cidade'], l['bairro'], l['endereco'], l['cep'], l['telefone'],
                   l['tipo_telefone'], l['email'], l['google'], '; '.join(l['motivos']), ', '.join(l['outros_medicos']),
                   f"CNES {l['cnes']} (cadastro público)", 'novo', ''])
    for j, (_, w) in enumerate(COLS, 1): ws.column_dimensions[get_column_letter(j)].width = w
    for c in ws[1]: c.font = Font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor='1F3A5F'); c.alignment = Alignment(wrap_text=True, vertical='center')
    ws.freeze_panes = 'D2'; ws.auto_filter.ref = ws.dimensions
wb = Workbook(); ws = wb.active; ws.title = '500 médicos'; aba(ws, top)
aba(wb.create_sheet('Reservas'), reservas)
info = wb.create_sheet('Como usar')
for t in ['Médicos de consultório particular no RS com sinais de atendimento analógico (secretária, telefone fixo, pouco ou nada no Google).',
          'Fonte: CNES do Ministério da Saúde (consultórios isolados, ago/2026) cruzado com o arquivo de profissionais do DATASUS (nome, especialidade, CRM). Presença digital conferida no Google Maps em 08/10/2026.',
          'Nota analógico: soma de sinais (telefone fixo +3, e-mail antigo +2, sem e-mail +1, pessoa física +1, sozinho +1, CRM antigo +1, não está no Google +3, no Google sem site +2, poucas avaliações +1). Prioridade A ≥ 11, B = 10, C abaixo (reservas).',
          'Quem tem site próprio foi tirado da lista. Um registro por médico e por telefone.',
          'LGPD: contato B2B com dado profissional público (legítimo interesse). Se perguntarem, diga que o contato veio do cadastro público do CNES. Quem pedir para sair: marcar Status = "não contatar" e não ligar mais. Não usar para disparo em massa.',
          'Status sugeridos: novo, ligar, conversa, visita, proposta, fechado, perdido, não contatar.']:
    info.append([t])
info.column_dimensions['A'].width = 150
wb.save(sys.argv[1])
