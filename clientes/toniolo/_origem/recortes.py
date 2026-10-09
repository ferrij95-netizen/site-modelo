# Recorta as fotos reais das artes do blog do site atual (tira logo, faixas e títulos). Uso: python3 recortes.py ../fotos
from PIL import Image
c={'descaracterizacao':('BGTJUL-2.png',(130,100,600,380)),'empilhamento':('BGTMAI-1.png',(0,112,700,372)),'dragagem':('BGTMAR-1.png',(170,118,690,420)),'anfibia-margem':('BLOG-GRUPO-TONIOLO-ABR-1.png',(0,190,760,398)),'lanca-longa':('BLOG-GRUPO-TONIOLO-AGO-2-25-08-2025-09_02_45_483.png',(0,112,600,385)),'anfibia-reservatorio':('BLOG-GRUPO-TONIOLO-OUT25-1.png',(0,150,630,420)),'sabre':('BLOG-GRUPO-TONIOLO-OUT25-2.png',(0,160,620,410)),'macrofitas':('blog01-arte.png',(0,118,690,390)),'desassoreamento':('blog01-desassoreamento-capa.png',(272,190,834,428)),'desaguamento':('blog03-capa.png',(290,190,834,462))}
import sys,os; os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),"img"))
s=Image.new('RGB',(1400,1500),'white')
for i,(k,(f,b)) in enumerate(c.items()):
  im=Image.open(f).convert('RGB').crop(b)
  if len(sys.argv)>1: im.save(sys.argv[1]+'/'+k+'.png')
  t=im.copy();t.thumbnail((680,290));s.paste(t,((i%2)*700,(i//2)*300))
s.save('/tmp/claude-0/c5.jpg',quality=80)
# Fotos das páginas de solução do site atual, tiradas dos prints (foto à esquerda, de 0 a 640 px, abaixo da faixa do título).
from PIL import ImageStat
mp={'estabilidade-e-descaracterizacao-de-barragens':'sol-estabilidade','desaguamento-de-rejeitos':'sol-desaguamento','dragagem-por-succao-e-recalque':'sol-succao','dragagem-de-precisao':'sol-precisao','secagem-e-empilhamento-a-seco':'sol-empilhamento','limpeza-mecanizada-de-transportadores-de-correia':'sol-sabre','remocao-de-macrofitas':'sol-macrofitas','remocao-mecanizada':'sol-remocao','manejo-e-remanejo-de-rejeitos':'sol-manejo'}
for k,n in mp.items():
  im=Image.open(f'print-{k}.jpg').convert('RGB'); W,H=im.size; bot=H
  if n=='sol-manejo': im.crop((0,306,640,H)).save((sys.argv[1] if len(sys.argv)>1 else '../fotos')+f'/{n}.png'); continue
  for y in range(420,H):
    st=ImageStat.Stat(im.crop((0,y,640,y+1)))
    if sum(st.mean)/3<50 and max(st.stddev)<22: bot=y;break
  im.crop((0,306,640,bot)).save((sys.argv[1] if len(sys.argv)>1 else '../fotos')+f'/{n}.png')
