# Prepara as imagens do site a partir dos arquivos baixados de sartorialimentos.com.br/wp-content/uploads (listagem aberta).
# Uso: python3 -I assets.py <pasta com os originais> <public/assets>
import sys, os
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
def p(n): return os.path.join(src, n)
def salva(im, nome, larg=1600, q=78):
    im = im.copy()
    if im.width > larg: im = im.resize((larg, round(im.height * larg / im.width)), Image.LANCZOS)
    im.save(os.path.join(dst, nome + '.webp'), 'WEBP', quality=q, method=6)
    return im.size
fotos = {
  'fachada': '2018-04_Frente-33boa.jpg', 'fachada-banner': '2018-02_institucional.jpg', 'equipe': '2018-02_institucional2.jpg',
  'equipe-frota': '2018-03_fundo-frigo.jpg', 'frota': '2018-09_frota-quem-somos.jpg', 'camara': '2018-04_camera-fria-sartori.jpg', 'boitata-pecas': '2017-12_banner-boitata.jpg',
  'brasa': '2017-12_banner-2.jpg', 'espeto': '2017-12_banner-3.jpg', 'chamada-boitata': '2018-02_boitata-chamada.jpg',
  'campo': '2017-12_banner-5.jpg', 'rebanho': '2017-12_MG_2720.jpg', 'angus': '2018-04_2-Aberdeen-Angus-calves-in-field.jpg',
  'gado': '2018-02_gado-bonsmara-1.jpg', 'familia': '2018-04_familia-costela2.jpg', 'churrasco': '2017-12_DBe245kXUAAf7Qc.jpg',
  'costelao': '2018-02_banner-costelao2.jpg', 'tbone': '2018-02_TBONE.jpg', 'fogo': '2017-12_54d40c4a1b6bc_-_fire-steak-full.jpg',
  'ribeye': '2017-12_20130523-smoked-ribeye-19-large.jpg', 'pecas-cru': '2017-12_shutterstock_712462810.jpg', 'tabua': '2017-12_IMG_0741.jpg',
  'sustent': '2018-02_agricultura-e-sustentabilidade.jpg', 'qualidade': '2018-04_farmaceutico-ocupacional-ictq.jpg', 'linha-prod': '2018-02_exportação-carne-bovina.jpg',
  'boi-cor': '2018-02_img-343344-em-busca-do-boi-perfeito.jpg', 'primerib': '2018-04_PrimeRib.jpg', 'picanhaa': '2018-08_picanhaa.jpg',
  'banner-boitata3': '2017-12_banner-boitata3.jpg', 'heifer': '2018-04_2_heifer_head.jpg',
  # posts
  'p-modos': '2017-12_54d40c4a1b6bc_-_fire-steak-full.jpg', 'p-tempo': '2018-02_1497911046.jpg', 'p-pontos': '2017-12_alimentos-proteina-3.jpg',
  'p-descongelar': '2018-01_contra-file.jpg', 'p-temperos': '2018-01_acem.jpg', 'p-picanha': '2018-01_picanha.jpg', 'p-picadinho': '2018-02_83157_original.jpg',
  'p-fraldinha': '2018-02_13842_original.jpg', 'p-panela': '2018-02_90041_original.jpg', 'p-costela': '2018-01_costela-boi.jpg',
  'p-vazio': '2018-02_bife-do-vazio.jpg', 'p-alcatra': '2017-12_receitas-com-alcatra.jpg',
  # cortes (fotos da linha tradicional)
  'c-acem': '2018-01_acem.jpg', 'c-alcatra': '2018-01_alcatra.jpg', 'c-bife-vazio': '2018-01_bife-vazio.jpg', 'c-contrafile': '2018-01_contrafile2.jpg',
  'c-file-mignon': '2018-01_file-mignon.jpg', 'c-maminha': '2018-01_maminha.jpg',
  'c-paleta': '2018-01_paleta.jpg', 'c-patinho': '2018-01_patinho.jpg', 'c-picanha': '2018-01_picanha.jpg', 'c-matambre': '2018-02_matambre.jpeg',
  'c-tatu': '2018-02_tatu.jpg', 'c-costela-tiras': '2018-01_costela-tiras.jpg', 'c-costela-dianteiro': '2018-01_costela-ripa.jpg', 'c-entrecote': '2018-02_entrecot e33.jpg'.replace(' ', ''),
  'c-peito': '2017-12_peito.jpg', 'c-costela-traseiro': '2017-12_vazio-tinto.png', 'c-vazio': '2018-02_contrafile.jpg', 'c-capa-file': '2018-01_mignon.jpg',
}
for nome, f in fotos.items():
    if not os.path.exists(p(f)): print('falta', f); continue
    im = Image.open(p(f)).convert('RGB')
    print(nome, salva(im, 'img/' + nome, 1200 if nome.startswith(('c-', 'p-')) else 1800))
# rótulos (PNG com transparência), recortados no conteúdo
import glob
for f in sorted(glob.glob(p('*.png'))):
    b = os.path.basename(f)[8:-4]
    im = Image.open(f).convert('RGBA'); bb = im.getbbox()
    if bb: im = im.crop(bb)
    salva(im, 'rot/' + b.lower().replace('ó', 'o').replace('á', 'a').replace('ú', 'u'), 640, 86)
# logo: original (texto branco) e versão com texto escuro para fundo claro
lg = Image.open(p('2017-12_sartori-logo-desde.png')).convert('RGBA')
salva(lg, 'logo-branco', 670, 92)
px = lg.load()
esc = lg.copy(); pe = esc.load()
for y in range(lg.height):
    for x in range(lg.width):
        r, g, b, a = px[x, y]
        if a and r > 200 and g > 200 and b > 200: pe[x, y] = (35, 31, 32, a)
salva(esc, 'logo-escuro', 670, 92)
fav = Image.open(p('2017-12_cropped-sartori-logo.png')).convert('RGBA').resize((192, 192), Image.LANCZOS)
fav.save(os.path.join(dst, 'favicon.png'))
