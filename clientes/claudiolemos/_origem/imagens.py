# Gera public/assets/img/*.webp e dim.json a partir dos arquivos do site atual (claudiolemos.com/wp-content) e de
# quadros do vídeo de abertura (banner-novo.mp4). Uso: python3 -I imagens.py <pasta com os originais>
import sys, json, os
from PIL import Image
O = sys.argv[1]
aqui = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(aqui, '../public/assets/img')
dim = {}
def salva(im, nome, larg=None, q=78):
    if larg and im.width > larg: im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    im.save(f'{D}/{nome}.webp', quality=q, method=6); dim[nome] = [im.width, im.height]
def abre(f): return Image.open(os.path.join(O, f))
def rgba(f): return abre(f).convert('RGBA')

# Logo: CL rosa + nome em preto. Versão branca troca o preto por branco e mantém o rosa.
lg = rgba('logo-dr-claudio-lemos-cirurgia-plastica.png'); lg = lg.crop(lg.getbbox())
salva(lg, 'logo', q=92)
px = lg.load(); br = lg.copy(); pb = br.load()
for y in range(lg.height):
    for x in range(lg.width):
        r, g, b, a = px[x, y]
        if a and abs(r - g) < 30 and abs(g - b) < 30 and r < 120: pb[x, y] = (255, 255, 255, a)
salva(br, 'logo-branco', q=92)
# Só o monograma CL (favicon e marca d'água)
cl = lg.crop((0, 0, round(lg.width * .27), lg.height)); cl = cl.crop(cl.getbbox())
fav = Image.new('RGBA', (max(cl.size) + 16,) * 2, (255, 255, 255, 0)); fav.alpha_composite(cl, ((fav.width - cl.width) // 2, (fav.height - cl.height) // 2))
fav.resize((96, 96), Image.LANCZOS).save(os.path.join(aqui, '../public/assets/favicon.webp'), quality=90)
salva(cl, 'cl', q=90)

salva(abre('dr-cl.png').convert('RGB'), 'dr', 900)
ass = rgba('dr-claudio-lemos-assinatura.png'); salva(ass.crop(ass.getbbox()), 'assinatura', q=90)
# Selos (louros) num sprite vertical: 5 x 418x198
sel = Image.new('RGBA', (418, 198 * 5))
for i in range(5): sel.alpha_composite(rgba(f'{i+1}.webp'), (0, 198 * i))
salva(sel, 'selos', q=88)
# Ícones das cirurgias: só o desenho (sem o nome escrito embaixo), num sprite de 12 x 200x160
ic = ['face-lifting', 'blefaroplastia', 'otoplastia', 'braquioplastia', 'mastopexia', 'protese-de-mama', 'mamoplastia-redutora', 'pos-bariatrica', 'abdominoplastia', 'protese-de-gluteo', 'lipoaspiracao', 'cirurgia-intima']
sp = Image.new('RGBA', (200, 160 * len(ic)))
for i, n in enumerate(ic):
    im = rgba(f'icone-{n}.png').crop((0, 0, 390, 190)); im = im.crop(im.getbbox()); im.thumbnail((190, 150), Image.LANCZOS)
    sp.alpha_composite(im, ((200 - im.width) // 2, 160 * i + (160 - im.height) // 2))
salva(sp, 'icones', q=90)
# Modelos do mapa de procedimentos (fundo transparente)
for f, n in [('mulher.png', 'mapa-mulher'), ('homem-home-1.png', 'mapa-homem'), ('Imagem-Cirurgia-Idosos.png', 'mapa-idosa'), ('crianca.png', 'mapa-criancas'), ('mulher-agende-sua-consulta.png', 'agende')]:
    im = rgba(f); salva(im.crop(im.getbbox()), n, 720, q=82)
# Depoimentos: 3 retratos num sprite horizontal
dep = Image.new('RGB', (240 * 3, 240))
for i, f in enumerate(['carol-nakamura.jpg', 'Suzana-alves.jpg', 'rayane-moraes.jpg']): dep.paste(abre(f).convert('RGB').resize((240, 240), Image.LANCZOS), (240 * i, 0))
salva(dep, 'depoimentos', q=80)
for f, n in [('hospital-copa-star-1.jpg', 'h-copa-star'), ('hospital-copa-dor.jpg', 'h-copa-dor'), ('casa-de-saude-sao-jose.jpg', 'h-sao-jose'), ('fachada-perinatall.jpg', 'h-perinatal'), ('clinica-sao-vicente.jpg', 'h-sao-vicente'), ('hospital-badim.png', 'h-badim'), ('real-medical-center.jpg', 'real-medical-center')]:
    salva(abre(f).convert('RGB'), n, q=78)
salva(abre('claudio-lemos-video.jpg').convert('RGB'), 'video-jn', q=78)
salva(abre('fundo-foto-home-dr-claudio-final-scaled.jpg').convert('RGB'), 'consultorio-fundo', 1600, q=72)
# Quadros do vídeo de abertura sem a legenda queimada (corta a faixa de baixo)
for t, n, box in [('1.5', 'recepcao', (0, 0, 1920, 900)), ('19', 'consulta-desenho', (0, 0, 1920, 900)), ('22', 'consulta-tela', (0, 0, 1920, 900)), ('31', 'fotografia', (0, 0, 1920, 900)), ('55', 'parede-logo', (0, 0, 1920, 900)), ('52', 'diplomas', (0, 0, 1920, 900)), ('13.5', 'recebe', (0, 0, 1920, 900))]:
    salva(abre(f'v{t}.jpg').convert('RGB').crop(box), n, 1400, q=74)
json.dump(dim, open(os.path.join(aqui, 'dim.json'), 'w'), indent=0)
print(len(dim), 'imagens')
