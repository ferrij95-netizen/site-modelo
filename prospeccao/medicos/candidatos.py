# Junta consultórios (CNES) com médicos (PF), dá uma nota prévia de "analógico" e gera saida/candidatos.json.
import json, re, collections
CBO = {'225103':'Infectologista','225105':'Acupunturista','225109':'Nefrologista','225110':'Alergista e imunologista','225112':'Neurologista','225115':'Angiologista','225118':'Nutrólogo','225120':'Cardiologista','225121':'Oncologista clínico','225122':'Cancerologista pediátrico','225124':'Pediatra','225125':'Clínico geral','225127':'Pneumologista','225130':'Medicina de família','225133':'Psiquiatra','225135':'Dermatologista','225136':'Reumatologista','225139':'Sanitarista','225140':'Medicina do trabalho','225142':'Saúde da família','225145':'Medicina de tráfego','225148':'Anatomopatologista','225150':'Medicina intensiva','225151':'Anestesiologista','225155':'Endocrinologista','225160':'Fisiatra','225165':'Gastroenterologista','225170':'Generalista','225175':'Geneticista','225180':'Geriatra','225185':'Hematologista','225195':'Homeopata','225203':'Cirurgião vascular','225210':'Cirurgião cardiovascular','225215':'Cirurgião de cabeça e pescoço','225220':'Cirurgião do aparelho digestivo','225225':'Cirurgião geral','225230':'Cirurgião pediátrico','225235':'Cirurgião plástico','225240':'Cirurgião torácico','225250':'Ginecologista e obstetra','225255':'Mastologista','225260':'Neurocirurgião','225265':'Oftalmologista','225270':'Ortopedista e traumatologista','225275':'Otorrinolaringologista','225280':'Proctologista','225285':'Urologista','225290':'Cancerologista cirúrgico','225295':'Cirurgião da mão','225305':'Citopatologista','225310':'Endoscopista','225315':'Medicina nuclear','225320':'Radiologista','225325':'Patologista','225330':'Radioterapeuta','225335':'Patologista clínico','225340':'Hemoterapeuta','225345':'Medicina hiperbárica','225350':'Neurofisiologista'}
ISP_VELHO = re.compile(r'terra\.com|brturbo|via-rs|bol\.com|uol\.com|ig\.com|ibest|yahoo|cpovo|viavale|pop\.com|zipmail|superig|portoweb|nutricom|certelnet|redesul')
LIVRE = re.compile(r'gmail|hotmail|outlook|live\.com|icloud')
est = {str(e['codigo_cnes']).zfill(7): e for e in json.load(open('saida/cnes-consultorios.json'))}
pf = json.load(open('saida/pf-consultorios.json'))
por = collections.defaultdict(list)
for p in pf:
    if p['CBO'].startswith('225'): por[p['CNES']].append(p)
def tel(t):
    d = re.sub(r'\D', '', t or '')
    ddd = ''
    if len(d) >= 10: ddd, d = d[:-9 if len(d) in (11, 13) and d[-9] == '9' else -8][-2:], d[-9 if len(d) in (11, 13) and d[-9] == '9' else -8:]
    tipo = 'fixo' if len(d) == 8 and d[0] in '2345' else 'celular' if len(d) == 9 and d[0] == '9' else ('celular' if len(d) == 8 and d[0] in '6789' else '')
    return d, tipo, ddd
DDD = {'Porto Alegre':'51','Canoas':'51','Novo Hamburgo':'51','São Leopoldo':'51','Gravataí':'51','Viamão':'51','Cachoeirinha':'51','Esteio':'51','Sapucaia do Sul':'51','Santa Cruz do Sul':'51','Lajeado':'51','Caxias do Sul':'54','Bento Gonçalves':'54','Passo Fundo':'54','Pelotas':'53','Santa Maria':'55'}
SEM_CONSULTA = {'225320','225151','225325','225148','225305','225315','225330','225335','225150','225340','225139'}
out = []
for cod, meds in por.items():
    e = est.get(cod)
    if not e: continue
    nomes = {m['NOMEPROF'] for m in meds}
    if len(nomes) > 2: continue  # consultório com muitos médicos = clínica, fica para a outra frente
    meds = [x for x in meds if x['CBO'] not in SEM_CONSULTA] or None
    if not meds: continue
    m = sorted(meds, key=lambda x: -int(x['HORA_AMB'] or 0))[0]
    d, tipo, ddd = tel(e['numero_telefone_estabelecimento'])
    if not d: continue
    email = (e['endereco_email_estabelecimento'] or '').strip().lower()
    dom = email.split('@')[-1] if '@' in email else ''
    nota, motivos = 0, []
    if tipo == 'fixo': nota += 3; motivos.append('só telefone fixo (secretária)')
    if not email: nota += 1; motivos.append('sem e-mail no cadastro')
    elif ISP_VELHO.search(dom): nota += 2; motivos.append(f'e-mail antigo ({dom})')
    elif LIVRE.search(dom): nota += 1; motivos.append('e-mail gratuito, sem domínio próprio')
    else: nota -= 2; motivos.append(f'tem domínio próprio ({dom})')
    if e['descricao_natureza_juridica_estabelecimento'] == '4000': nota += 1; motivos.append('atende como pessoa física')
    if len(nomes) == 1: nota += 1; motivos.append('médico sozinho no consultório')
    crm = int(m['REGISTRO']) if m['CONSELHO'] == '71' and m['REGISTRO'].isdigit() else None
    if crm and crm < 20000: nota += 1; motivos.append('CRM antigo (formado há muitos anos)')
    out.append({'cnes': cod, 'medico': m['NOMEPROF'].title(), 'nome': e['nome_fantasia'], 'especialidade': CBO.get(m['CBO'], f"Médico (CBO {m['CBO']})"),
        'crm': f'CRM-RS {crm}' if crm else '', 'outros_medicos': sorted(n.title() for n in nomes - {m['NOMEPROF']}),
        'cidade': e['cidade'], 'endereco': f"{e['endereco_estabelecimento']} {e['numero_estabelecimento'] or ''}".strip().title(), 'bairro': (e['bairro_estabelecimento'] or '').title(),
        'cep': e['codigo_cep_estabelecimento'], 'telefone': f"({ddd or DDD[e['cidade']]}) {d[:-4]}-{d[-4:]}", 'tipo_telefone': tipo or 'outro', 'email': email,
        'atualizado_cnes': e['data_atualizacao'], 'nota_previa': nota, 'motivos': motivos})
out.sort(key=lambda x: -x['nota_previa'])
print(len(out), collections.Counter(x['nota_previa'] for x in out), collections.Counter(x['cidade'] for x in out[:2400]))
json.dump(out, open('saida/candidatos-todos.json', 'w'), ensure_ascii=False)
json.dump(out[:2400], open('saida/candidatos.json', 'w'), ensure_ascii=False)
