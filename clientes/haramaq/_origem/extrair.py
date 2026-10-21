# Lê o site atual (www.haramaq.com.br) e grava dados.json: as 10 máquinas (textos, especificações, opcionais, fotos, folders),
# os vídeos do YouTube e os 4 artigos mais recentes do blog. Uso: python3 extrair.py <pasta-de-cache>
import json, re, subprocess, sys, os, urllib.request
BASE = 'https://www.haramaq.com.br/'
cache = sys.argv[1] if len(sys.argv) > 1 else '/tmp/haramaq-cache'
os.makedirs(cache, exist_ok=True)
aqui = os.path.dirname(os.path.abspath(__file__))

def baixa(p):
    f = os.path.join(cache, (p.replace('/', '__') or 'home') + '.html')
    if not os.path.exists(f):
        req = urllib.request.Request(BASE + p, headers={'User-Agent': 'Mozilla/5.0'})
        open(f, 'wb').write(urllib.request.urlopen(req, timeout=60).read())
    return f

def texto(f):
    t = subprocess.run([sys.executable, os.path.join(aqui, 'texto.py'), f], capture_output=True, text=True).stdout
    i = t.rfind('\n Home\n'); j = t.find('#2 Indústria de Máquinas Agrícolas')
    return t[i:j]

SLUGS = ['prohmix-1-6', 'prohmix-1-9', 'prohmix-3-5-6-0-9-0', 'prohmix-13-0-18-0-27-0', 'prohmix-rodoviario',
         'supermix-2-0-4-2-7-0', 'stir-2000-3000', 'tipper-10-14-0', 'hme-560', 'daily-1200']
lista = texto(baixa('produtos')).split('#1 Produtos')[1]
LINHA = {m.group(2).strip().upper(): m.group(1).strip() for m in re.finditer(r'#2 (.+)\n#3 (.+)', lista)}
produtos = []
for s in SLUGS:
    f = baixa(s); h = open(f, encoding='utf-8', errors='ignore').read()
    t = texto(f); t = t[:t.find('#2 MENU')]
    L = [l.strip() for l in t.split('\n') if l.strip()]
    nome = [l for l in L if l.startswith('#1 ')][0][3:]
    i = next(k for k, l in enumerate(L) if l.startswith('#3 '))
    foto = re.search(r'\[img (\S+) ', L[i-2] if '[img' in L[i-2] else L[i-1]).group(1)
    intro, sec, blocos, cur, img = [], None, {'spec': [], 'opc': []}, None, None
    for l in L[i+1:]:
        if l.startswith('#2 Especifica'): sec = 'spec'; continue
        if l.startswith('#2 Equipamentos opcionais'): sec = 'opc'; continue
        if l.startswith('#2'): continue
        if l.startswith('[img'): img = re.search(r'\[img (\S+) ', l).group(1); continue
        if sec is None:
            if 'orçamento' in l or 'Folder' in l: continue
            intro.append(l); continue
        if l.startswith('#3 '):
            cur = {'t': l[3:].strip().rstrip(':').rstrip('.'), 'img': img, 'txt': []}; blocos[sec].append(cur); img = None; continue
        if cur: cur['txt'].append(l)
    pdfs = sorted(set(re.findall(r'href="(https://www.haramaq.com.br/pdf/[^"]+)"', h)) - {BASE + 'pdf/catalogo.pdf'})
    produtos.append(dict(slug=s, nome=nome, linha=LINHA[nome.upper()], foto=foto, intro=intro, spec=blocos['spec'], opc=blocos['opc'],
                         folder=next((p for p in pdfs if 'es' not in p.split('/')[-1].replace('.pdf', '').split('-')[-1:] and 'espanhol' not in p), None),
                         folderEs=next((p for p in pdfs if p.endswith('-es.pdf') or 'espanhol' in p), None)))

hv = open(baixa('videos'), encoding='utf-8', errors='ignore').read()
videos = [{'id': m.group(1), 't': re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', m.group(2))).strip()}
          for m in re.finditer(r'data-video="https://www.youtube.com/watch\?v=([\w-]{11})".*?<h2[^>]*>(.*?)</h2>', hv, re.S)]

blog = []
for s in ['transporte-de-forragens-eficiencia-e-organizacao-na-pecuaria', 'misturador-de-racao-vertical-eficiencia-e-manejo-do-rebanho',
          'picador-de-feno-eficiencia-e-precisao-na-alimentacao-rural', 'desensiladeira-valor-como-escolher-o-modelo-ideal-para-voce']:
    t = texto(baixa('blog/' + s))
    corpo = t.split('Por: Haramaq - ')[1].split('\nTags:')[0]
    data, *resto = corpo.split('\n')
    img = re.findall(r'\[img (\S+) alt=', t.split('Por: Haramaq - ')[0])[-1]
    tit = [l for l in t.split('\n') if l.startswith('#1 ')][0][3:].strip().rstrip('<')
    blocos = [{'h': l[3:].strip()} if l.startswith('#2 ') else {'p': l.strip()} for l in resto if l.strip()]
    blog.append({'slug': s, 't': tit, 'data': data.strip(), 'img': img, 'corpo': blocos})

json.dump({'produtos': produtos, 'videos': videos, 'blog': blog}, open(os.path.join(aqui, 'dados.json'), 'w'), ensure_ascii=False, indent=1)
print(len(produtos), 'produtos,', len(videos), 'vídeos,', len(blog), 'artigos')
