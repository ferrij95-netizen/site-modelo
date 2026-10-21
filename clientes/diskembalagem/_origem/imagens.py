# Monta as folhas de fotos (sprites) do catálogo por categoria, a partir das fotos originais já baixadas em .webp.
# Uso: python3 -I imagens.py <pasta-das-fotos>  (nomes = hash da foto no site atual, ver dados.json)
# Uma folha tem até 48 fotos (8 x 6) de 240 px: assim o catálogo de 672 itens vira ~17 arquivos.
import json, os, sys, math
from PIL import Image
aqui = os.path.dirname(os.path.abspath(__file__))
fotos = sys.argv[1]
d = json.load(open(f'{aqui}/dados.json'))
pub = f'{aqui}/../public/assets/cat'
os.makedirs(pub, exist_ok=True)
COLS, ROWS, CEL, PAD = 8, 6, 240, 14
apelido = {'copa-e-cozinha': 'copa', 'descarta-veis': 'descartaveis', 'embalagens': 'embalagens', 'embalagens-p-alimentaa-a-o': 'alimentacao',
           'equipamentos': 'equipamentos', 'materiais-de-higiene': 'higiene', 'material-de-limpeza': 'limpeza', 'material-para-escrita-rio': 'escritorio'}
por_cat = {}
for p in d['prods']:
    if p.get('h'): por_cat.setdefault(p['cats'][0][0], []).append(p)
for cat, lst in por_cat.items():
    n_folhas = math.ceil(len(lst) / (COLS * ROWS))
    for f in range(n_folhas):
        parte = lst[f * COLS * ROWS:(f + 1) * COLS * ROWS]
        folha = Image.new('RGB', (COLS * CEL, ROWS * CEL), 'white')
        nome = f'{apelido[cat]}-{f + 1}'
        for i, p in enumerate(parte):
            im = Image.open(f'{fotos}/{p["h"]}.webp').convert('RGB')
            im.thumbnail((CEL - 2 * PAD, CEL - 2 * PAD), Image.LANCZOS)
            x, y = (i % COLS) * CEL, (i // COLS) * CEL
            folha.paste(im, (x + (CEL - im.width) // 2, y + (CEL - im.height) // 2))
            p['sp'] = [nome, i % COLS, i // COLS]
        folha.save(f'{pub}/{nome}.webp', 'webp', quality=72, method=6)
json.dump(d, open(f'{aqui}/dados.json', 'w'), ensure_ascii=False, indent=1)
print(sum(math.ceil(len(l) / 48) for l in por_cat.values()), 'folhas')
