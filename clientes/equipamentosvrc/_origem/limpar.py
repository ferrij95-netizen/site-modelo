# Limpa produtos-bruto.json (extraído do site atual) e grava produtos.json, que o gerar.mjs usa.
# Rodar: python3 clientes/equipamentosvrc/_origem/limpar.py
import json, re, os
aqui = os.path.dirname(os.path.abspath(__file__))
bruto = json.load(open(os.path.join(aqui, 'produtos-bruto.json')))

# Nome, linha e frase curta (a frase curta é nossa, resumida do texto do site atual).
info = {
 'forno-lotus-ceram': ('Forno Lótus Ceram', 'ceramica', 'Forno de cerâmica com bomba de vácuo Hypervac, tela touch de 7" e 100 receitas.'),
 'forno-lotus-ceram-white': ('Forno Lótus Ceram White', 'ceramica', 'O Lótus Ceram na versão branca, com o mesmo software e a bomba Hypervac.'),
 'forno-lotus': ('Forno Automático Lótus', 'fundicao', 'Forno de anéis touch screen, até 16 anéis de 100 g, garantia de 18 meses.'),
 'forno-timer-one': ('Forno Timer One Plus', 'fundicao', 'Desidratação, eliminação de cera e sinterização de anéis com controle de patamar.'),
 'forno-eletrico-millenium-inox': ('Forno Elétrico Millenium Inox', 'fundicao', 'Fundição de baixa e alta fusão, revestido em aço escovado inoxidável.'),
 'forno-eletrico-millenium': ('Forno Elétrico Millenium', 'fundicao', 'Fundição metaloplástica e metalocerâmica com chave mínimo, médio e máximo.'),
 'forno-a-gas': ('Forno a Gás', 'fundicao', 'Sinterização de anéis para PPR com gás GLP, revestimento refratário antiácido.'),
 'cadinhos': ('Cadinhos Refratários', 'fundicao', 'Cadinhos para cromo e ouro em material sílico-aluminoso.'),
 'prensa-facil': ('Prensa Fácil', 'injecao', 'Porcelana injetada, facetas e coroas puras usando o forno que o laboratório já tem.'),
 'prensa-facil-analogica': ('Prensa Fácil Analógica', 'injecao', 'A forma mais econômica de começar a prensar pastilhas de cerâmica.'),
 'embolo-de-zirconia': ('Êmbolo de Zircônia', 'injecao', 'Êmbolo em cerâmica técnica do Grupo Cumbica para injeções mais produtivas.'),
 'fotopolimerizador-f-cube': ('Fotopolimerizador F-Cube', 'resina', 'Super LED UV de 390 a 470 nm, prato giratório e pós-cura de impressão 3D.'),
 'fotopolimerizadora-mini': ('Fotopolimerizadora Mini', 'resina', 'Lâmpadas UV para pequenos trabalhos de resina fotoativada.'),
 'panela-polimerizadora-digital': ('Panela Polimerizadora Digital', 'resina', 'Pressão e temperatura programadas para resina acrílica sem bolhas.'),
 'panela-polimerizadora-analogica': ('Panela Polimerizadora Analógica', 'resina', 'Pressão e temperatura para polimerizar resina, nos tamanhos 2 e 4.'),
 'panela-ortodontica': ('Panela Ortodôntica', 'resina', 'Resinas autopolimerizáveis para coroas e facetas, sem bolhas.'),
 'espatulador-a-vacuo': ('Espatulador a Vácuo Mix Vaccum', 'gesso', 'Gesso e revestimento sem bolhas, com bomba interna e duas cubas de alumínio.'),
 'recortador-de-gesso': ('Recortador de Gesso', 'gesso', 'Irrigação automática, mesa com angulação precisa e troca rápida de disco.'),
 'vibrador-8-aneis': ('Vibrador 4 e 8 Anéis', 'gesso', 'Elimina bolhas e compacta a massa do gesso e do revestimento.'),
 'politriz-de-alta-rotacao': ('Politriz de Alta Rotação', 'acabamento', 'Polimento de peças metálicas a 20.000 RPM, com baixo ruído.'),
 'eletrolitico': ('Eletrolítico', 'acabamento', 'Limpeza e acabamento de armações metálicas.'),
 'exaustor-com-aspiracao-e-iluminacao': ('Exaustor com Aspiração e Iluminação', 'acabamento', 'Aspiração silenciosa de pós finos com iluminação na bancada.'),
 'kit-de-afericao': ('Kit de Aferição', 'ceramica', 'Mostra a temperatura real de queima de qualquer forno do mercado.'),
 'e-fix-pasta': ('e.Fix Pasta', 'ceramica', 'Pasta refratária para isolar e fixar os elementos durante a queima.'),
}
siglas = {'VRC','LED','UV','PPR','NX','3D','RGB','LCD','GLP','ETA','PSI','RPM','LPM','HZ','A','L','C','X','V','W','KG','CM','MM','II','IV','PVC','ABS','NBR','INMETRO'}
def caixa(l):
    letras = [c for c in l if c.isalpha()]
    if len(letras) < 2 or sum(c.isupper() for c in letras) / len(letras) < .85: return l
    out = []
    for i, w in enumerate(l.split(' ')):
        base = re.sub(r'[^\wÀ-ú]', '', w)
        if base.upper() in siglas or re.search(r'\d', w): out.append(w if not re.search(r'\d', w) else w.replace('X', 'x').replace('KG', 'kg').replace('CM', 'cm').replace('MM', 'mm'))
        else: out.append(w.lower())
    s = ' '.join(out)
    return s[0].upper() + s[1:]
fix = [(r'\bToutch\b','Touch'),(r'Touch Screw','Touch Screen'),(r'Temperatrura','Temperatura'),(r'\bante corrosão','anticorrosão'),(r'seguimentos','segmentos'),
       (r'Designer sofisticado','Design sofisticado'),(r'Disponivel','Disponível'),(r'FUSIVEIS','FUSÍVEIS'),(r'ALUMINIO','ALUMÍNIO'),(r'NIVEL','NÍVEL'),(r'Eletrico','Elétrico'),(r'ASPIRAÇAO','ASPIRAÇÃO'),
       (r'baixissimo','baixíssimo'),(r'feldspaticas','feldspáticas'),(r'  +',' ')]
def lim(s):
    for a, b in fix: s = re.sub(a, b, s)
    return s.strip()
def nomes(s):
    for w in ['Lótus','Hypervac','Ceram','Carbon','Millenium','Timer One','Prensa Fácil','Mix Vaccum','F-Cube']:
        s = re.sub(r'\b' + re.escape(w) + r'\b', w, s, flags=re.I)
    return s.replace('ruido', 'ruído')
def blocos(linhas):
    # junta linhas quebradas no meio da frase; marca listas
    out = []
    for l in linhas:
        l = lim(l)
        if not l or l.lower().startswith('clique aqui'): continue
        bullet = bool(re.match(r'^[•\-–·]\s*', l))
        l = re.sub(r'^[•\-–·]\s*', '', l)
        if out and not bullet and out[-1]['t'] == 'p' and not re.search(r'[.!?:;)]$', out[-1]['x']):
            out[-1]['x'] += ' ' + l; continue
        out.append({'t': 'li' if bullet else 'p', 'x': l})
    return out
res = []
for o in bruto:
    nome, linha, curta = info[o['slug']]
    desc = blocos(o['desc'])
    tabs = []
    for t in o['tabs']:
        itens = []
        for l in t['linhas']:
            l = re.sub(r'^[•\-–·]\s*', '', lim(l))
            if not l: continue
            sub = len(l) < 45 and ':' not in l and not re.search(r'\d', l) and l == l.upper() and len(l.split()) <= 5 and re.search(r'LÓTUS|CONJUNTO|BOMBA', l)
            m = re.match(r'^([^:]{2,40}):\s*(.+)$', l)
            if sub: itens.append({'sub': nomes(caixa(l))}); continue
            if m and t['titulo'] in ('Características', 'Especificações técnicas', 'Cromo', 'Ouro'):
                itens.append({'k': nomes(caixa(m.group(1).strip())), 'v': nomes(caixa(m.group(2).strip())).replace(' X ', ' x ')})
            else: itens.append({'x': nomes(caixa(l))})
        tabs.append({'titulo': lim(t['titulo']), 'itens': itens})
    res.append({'slug': o['slug'], 'nome': nome, 'linha': linha, 'curta': curta, 'desc': desc, 'fotos': o['fotos'], 'tabs': tabs, 'videos': o['videos']})
json.dump(res, open(os.path.join(aqui, 'produtos.json'), 'w'), ensure_ascii=False, indent=1)
print(len(res), 'produtos')
