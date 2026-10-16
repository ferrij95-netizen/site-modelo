"""Baixa as fotos do site atual da AB e grava versões webp em public/assets/img.
Originais ficam fora do repositório (/mnt/project-files/abplast/originais).
Uso: python3 -I imagens.py   (precisa de dados.json, feito por extrair.py)"""
import json, os, re, subprocess, sys
from PIL import Image, ImageOps

AQUI = os.path.dirname(os.path.abspath(__file__))
ORIG = os.environ.get('AB_ORIGINAIS', '/mnt/project-files/abplast/originais')
DEST = os.path.join(AQUI, '..', 'public', 'assets', 'img')
U = 'https://abplast.com.br/wp-content/uploads/'
os.makedirs(ORIG, exist_ok=True); os.makedirs(DEST, exist_ok=True)

# fotos de páginas (nome no site novo -> arquivo no site atual)
FIXAS = {
  'hero-prainha': '2026/05/5778-AB-Banner-Site-Lancamento-Prainha_5778-AB-Assinatura-de-Email-Lancamento-Prainha-Desktop-scaled.avif',
  'hero-prainha-m': '2026/05/5778-AB-Banner-Site-Lancamento-Prainha_5778-AB-Assinatura-de-Email-Lancamento-Prainha-Mobile.avif',
  'hero-itapema': '2025/05/46940-banner-colecao-itapema-topo-1920px.avif',
  'hero-pumps': '2026/02/AF-5669-website-valvulas-AB.webp',
  'hero-sustentabilidade': '2025/09/5402-ab-desktop-sustentabilidade-1.webp',
  'hero-exclusivas': '2025/04/46940-exclusivas-banner-home-topo-1920px.jpg',
  'hero-linha': '2025/03/Rectangle-1832532.jpg',
  'hero-sobre': '2025/03/46940-banner-sobre-nos-2-1920px.jpg',
  'hero-portfolio': '2025/04/46940-banner-home-topo-1920px-18.jpg',
  'hero-carreiras': '2025/04/46940-banner-carreiras-topo-1920px.jpg',
  'hero-contato': '2025/03/Banner-Contato1.jpg',
  'hero-pet': '2025/03/46940-banner-mercado-pet-topo-1920px.jpg',
  'hero-farma': '2025/03/46940-banner-mercado-farma-topo-1920px-1.jpg',
  'pet-spray': '2025/03/46940-banner-mercado-pet-2-spray-1920px-1.jpg',
  'farma-2': '2025/03/46940-banner-mercado-farma-2-1920px.jpg',
  'fale': '2025/03/46940-banner-fale-com-a-gente-4-1920px-1.jpg',
  'm-cosmeticos': '2025/03/Cosmeticos.jpg', 'm-petcare': '2025/03/Petcare.jpg', 'm-farma': '2025/03/Farma.jpg',
  's-cabelos': '2025/03/Cabelos.jpg', 's-corporais': '2025/03/Corporais.jpg', 's-faciais': '2025/03/Faciais.jpg',
  's-desodorante': '2025/03/Perfumaria-desodorante.jpg', 's-solar': '2025/03/Solar.jpg', 's-dermo': '2025/03/Dermocosmeticos.jpg',
  'farma-asepsia': '2025/03/Mais-seguranca-e-asspsia.jpg',
  'fabrica-uv': '2025/03/Rectangle-183251-1.jpg', 'fabrica-linha': '2025/03/Nossa-essencia-acompanha-cada-embalagem.jpg',
  'fabrica-78': '2025/05/ABPlast-78.jpg', 'inovacao': '2025/05/Inovacao.jpg',
  'proc-producao': '2025/04/Processos-de-producao.jpg', 'proc-materia': '2025/04/Materia-prima.jpg', 'proc-decoracao': '2025/04/Decoracao.jpg',
  'q-isbm': '2025/03/ISBM-PET.png', 'q-sopro': '2025/03/Vector.png', 'q-injecao': '2025/03/Decoracao11.png', 'q-decoracao': '2025/03/Decoracao.png',
  'ex-australian': '2025/04/freepik__centralize-the-product-maintaining-the-white-backg__14373-1.png',
  'ex-neutrogena': '2025/05/freepik__adjust__70019.jpeg.webp',
  'sus-carbono': '2025/03/carbono-neutro1.jpg', 'sus-compostagem': '2025/03/Programa-de-compostagem.jpg',
  'sus-chuva': '2025/03/Reutilizacao-da-agua-da-chuva.jpg', 'sus-energia': '2025/03/Energia-renovavel.jpg',
  'sus-lixozero': '2025/03/Lixo-zero.jpg', 'sus-pev': '2025/03/Ponto-de-coleta-voluntario.jpg', 'sus-coleta': '2025/03/Coleta-seletiva-de-lixo.jpg',
  'sus-iafa': '2025/03/Instituto-a-fonte-da-alegria.jpg', 'sus-grafico': '2025/05/4694-ab-grafico-sustentabilidade.png',
  'selo-carbono': '2025/09/Selo-empresa-carbono-neutro-2024-AB-Plast.webp', 'selo-ods': '2025/06/Selo-Juntos-pelos-ODS-2025-1.png.webp',
  'ods-3': '2025/06/SDG-3-1.jpg.webp', 'ods-4': '2025/06/SDG-4-1.jpg.webp', 'ods-9': '2025/06/SDG-9-1.jpg.webp', 'ods-11': '2025/06/SDG-11-1-2.jpg.webp', 'ods-12': '2025/06/SDG-12-1.jpg.webp',
  'iso-9001': '2025/06/iso-9001-1.png.webp', 'iso-22716': '2025/06/iso-22716-1.png.webp',
  'pump-capa': '2026/02/ab-plast-valvulas-imagem.webp',
  'pump-dosadora': '2026/02/ab-plast-valvula-bomba-dosadora-2ml-crop.webp',
  'pump-spray': '2026/02/ab-plast-valvula-bomba-spray-20-410-013ml-crop.webp',
  'pump-trigger': '2026/02/ab-plast-valvula-mini-trigger-025ml-crop.webp',
  'pump-finemist': '2026/02/ab-plast-valvula-bomba-spray-fine-mist-ouro-02ml-crop.webp',
  'pump-tratamento': '2026/02/ab-plast-valvula-bomba-dosadora-tratamento-013ml-crop.webp',
  'car-educacao': '2025/03/Incentivamos-a-educacao.jpg', 'car-corpo': '2025/03/Saude-do-corpo.jpg',
  'car-1': '2025/04/image-1-2.jpg', 'car-2': '2025/04/image-2.jpg', 'car-3': '2025/04/image-3.jpg', 'car-4': '2025/04/image-4.jpg',
  'car-linkedin': '2025/04/46940-banner-carreiras-linkedin-960px-meia-pagina.jpg',
  'p-vitaminas': '2025/04/vitaminas.jpg', 'p-neutrogena': '2025/04/neutrogena-1.jpg', 'p-cuidese': '2025/04/boticario-cuide-se.jpg', 'p-boti': '2025/04/boti.jpg',
}
for i in [3,5,6,7,8,9,10,11,13,14,15,16,19,21,22,23,24,33]:
    FIXAS[f'ex-{i}'] = f'2025/05/exclusivos-{i}.jpg'
for i in [2,3,5,11,12,20]:
    FIXAS[f'exf-{i}'] = f'2025/05/exclusivos-e-farma-{i}.jpg'
for i in [1,2,3,4,5,30,50,201]:
    FIXAS[f'farma-{i}'] = f'2025/05/farma-{i}.jpg'
MARCAS = ['ache','ajinomoto','amend','avon','bioderma','bioextratus','brainfarma','clamed','coty','cottonbaby','daudt','dermage','fgm','flora','grupo-boticario']

def baixar(url, nome):
    ext = os.path.splitext(url.split('?')[0])[1].lower() or '.jpg'
    f = os.path.join(ORIG, nome + ext)
    if not os.path.exists(f) or os.path.getsize(f) < 200:
        for u in ([url.replace('.jpg', '-scaled.jpg'), url] if url.endswith('.jpg') and 'scaled' not in url else [url]):
            r = subprocess.run(['curl', '-sS', '-f', '-L', '-m', '90', '-o', f, u])
            if r.returncode == 0: break
        else:
            print('falhou', url, file=sys.stderr); return None
    return f

def webp(f, nome, larg, q=80, quadro=None):
    out = os.path.join(DEST, nome + '.webp')
    if os.path.exists(out) and os.path.getmtime(out) > os.path.getmtime(f): return
    try:
        im = Image.open(f); im = ImageOps.exif_transpose(im)
    except Exception as e:
        print('imagem ruim', f, e, file=sys.stderr); os.remove(f); return
    im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
    if nome.startswith('f-'):  # embalagem solta: corta a sobra branca/transparente em volta
        from PIL import ImageChops
        base = im.convert('RGBA')
        bg = Image.new('RGBA', base.size, (255, 255, 255, 255))
        comp = Image.alpha_composite(bg, base).convert('RGB')
        diff = ImageChops.difference(comp, Image.new('RGB', comp.size, (255, 255, 255))).convert('L').point(lambda v: 255 if v > 12 else 0)
        bb = diff.getbbox()
        if bb:
            pad = 6
            bb = (max(bb[0]-pad, 0), max(bb[1]-pad, 0), min(bb[2]+pad, im.width), min(bb[3]+pad, im.height))
            im = comp.crop(bb)
    if im.width > larg: im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    im.save(out, 'WEBP', quality=q, method=5)

def slug(s):
    import unicodedata
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

if __name__ == '__main__':
    d = json.load(open(os.path.join(AQUI, 'dados.json')))
    jobs = []
    for k, v in FIXAS.items(): jobs.append((U + v, k, 1920 if k.startswith(('hero', 'fale', 'pet-spray', 'farma-2')) else 1200))
    for m in MARCAS: jobs.append((U + f'2025/04/{m}.png', 'marca-' + m, 400))
    for c in d['colecoes']:
        cs = slug(c['nome'])
        if c['fundos']: jobs.append((c['fundos'][-1] if 'mobo' not in c['fundos'][-1] else c['fundos'][0], f'col-{cs}', 1920))
        for i, g in enumerate(c['galeria'][:14]): jobs.append((g, f'g-{cs}-{i+1}', 1400))
        for p in c['produtos']: jobs.append((p['foto'], 'f-' + slug(os.path.splitext(p['foto'].split('/')[-1])[0]), 600))
        for gr in c['cores']:
            for tp in gr['tipos']:
                for cor in tp['cores']: jobs.append((cor['img'], 'cor-' + slug(cor['nome']), 160))
    feitos = set()
    for url, nome, larg in jobs:
        if nome in feitos: continue
        feitos.add(nome)
        f = baixar(url, nome)
        if f: webp(f, nome, larg)
    print(len(feitos), 'imagens')
