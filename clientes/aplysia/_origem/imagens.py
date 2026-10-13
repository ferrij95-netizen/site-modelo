# Converte as imagens de _origem/img/ (baixadas do site atual da Aplysia) para public/assets/img/*.webp.
# Rodar: python3 clientes/aplysia/_origem/imagens.py
# O logo vem do sprite.png do site atual (é o único arquivo onde ele existe): versão colorida e versão branca.
import os, glob
from PIL import Image, ImageChops

AQUI = os.path.dirname(os.path.abspath(__file__))
ORIG = os.path.join(AQUI, 'img')
DEST = os.path.join(AQUI, '..', 'public', 'assets', 'img')
os.makedirs(os.path.join(DEST, 'clientes'), exist_ok=True)


def salvar(im, nome, largura=None, q=80):
    if largura and im.width > largura:
        im = im.resize((largura, round(im.height * largura / im.width)), Image.LANCZOS)
    im.save(os.path.join(DEST, nome + '.webp'), 'WEBP', quality=q, method=6)


def branco_para_transparente(im):
    """Tira o fundo branco mantendo as bordas suaves (cor para alfa)."""
    im = im.convert('RGBA')
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            alfa = max(255 - r, 255 - g, 255 - b)
            if alfa == 0:
                px[x, y] = (255, 255, 255, 0)
                continue
            f = 255 / alfa
            px[x, y] = (min(255, round(255 - (255 - r) * f)), min(255, round(255 - (255 - g) * f)), min(255, round(255 - (255 - b) * f)), round(a * alfa / 255))
    return im


def aparar(im):
    caixa = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox()
    return im.crop(caixa)


sprite = Image.open(os.path.join(ORIG, 'sprite.png')).convert('RGBA')
# Logo colorido: dentro do cartão branco do topo do site atual (sem a sombra do cartão).
cartao = Image.new('RGBA', (250, 185), (255, 255, 255, 255))
cartao.alpha_composite(sprite.crop((0, 0, 250, 185)))
logo = cartao.crop((18, 14, 222, 166))
logo = aparar(branco_para_transparente(logo))
logo.save(os.path.join(DEST, 'logo-cor.png'))
salvar(logo, 'logo-cor', q=95)
# Emblema sozinho (para o ícone da aba e detalhes).
emblema = aparar(logo.crop((0, 0, logo.width, round(logo.height * 0.62))))
salvar(emblema, 'emblema', q=95)
# Logo branco empilhado (rodapé e fundos escuros).
branco = aparar(sprite.crop((0, 254, 150, 370)))
salvar(branco, 'logo-branco', q=95)
branco.save(os.path.join(DEST, 'logo-branco.png'))

fotos = {
    'lab-1': 1200, 'lab-2': 1200, 'lab-3': 1200, 'ourico': 900,
    'rio-equipe': 2000, 'rio-trabalho': 1600, 'rio-floresta': 2000, 'rio-medicao': 1400, 'rio-educacao': 1400,
    'rio-peixe': 1600, 'rio-fundo': 1600, 'rio-lagostim': 1400, 'rio-subaquatico': 1600, 'rio-amostra': 1400,
    'rio-grupo': 1400, 'rio-curso': 2000, 'rio-estrutura': 1400, 'rio-margem': 1400,
    # Fotos de banco (Unsplash) só nos cartões de segmento, como o site atual faz (lista em banco.md).
    'seg-mineracao': 1400, 'seg-portos': 1400, 'seg-celulose': 1400, 'seg-oleo': 1400, 'seg-outros': 1400,
}
for nome, w in fotos.items():
    salvar(Image.open(os.path.join(ORIG, nome + '.jpg')).convert('RGB'), nome, w, 74)

for f in glob.glob(os.path.join(ORIG, 's-*.jpg')) + glob.glob(os.path.join(ORIG, 'noticia-*')):
    nome = os.path.splitext(os.path.basename(f))[0]
    salvar(Image.open(f).convert('RGB'), nome, 900, 82)

salvar(Image.open(os.path.join(ORIG, 'certificado.png')).convert('RGBA'), 'certificado', q=95)

# Logos de clientes: apara o fundo branco e centraliza num quadro 3:2 igual para todos.
for f in sorted(glob.glob(os.path.join(ORIG, 'clientes', '*'))):
    nome = os.path.splitext(os.path.basename(f))[0]
    im = Image.open(f).convert('RGB')
    fundo = Image.new('RGB', im.size, im.getpixel((2, 2)))
    caixa = ImageChops.difference(im, fundo).point(lambda v: 255 if v > 24 else 0).convert('L').getbbox()
    if caixa:
        im = im.crop(caixa)
    quadro = Image.new('RGB', (360, 200), im.getpixel((0, 0)) if nome in ('reparacao-rio-doce', 'tommasi') else (255, 255, 255))
    im.thumbnail((300, 130), Image.LANCZOS)
    quadro.paste(im, ((360 - im.width) // 2, (200 - im.height) // 2))
    quadro.save(os.path.join(DEST, 'clientes', nome + '.webp'), 'WEBP', quality=88)

print('imagens prontas em', os.path.normpath(DEST))
