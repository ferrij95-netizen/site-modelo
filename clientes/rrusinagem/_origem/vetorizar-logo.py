# Vetoriza o logo R&R (PNG 180x180 do site atual): círculo laranja, hexágono azul, "R&R" e "USINAGEM INDUSTRIAL" brancos. Ampliado 6x antes do potrace.
# python3 vetorizar-logo.py <logo.png> <pasta-saida> -> logo.svg
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
bg=Image.new('RGBA',im.size,(255,255,255,0)); bg.alpha_composite(im); im=bg
im=im.resize((im.width*6,im.height*6),Image.BICUBIC)
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
lar=(al>128)&(r>200)&(g>100)&(g<200)&(b<90)
azul=(al>128)&(b>100)&(r<90)
branco=(al>128)&(r>200)&(g>200)&(b>200)
k=1/6
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=20,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[];f=lambda p:f"{p.x*k:.2f} {p.y*k:.2f}"
  for c in pl:
    d.append("M"+f(c.start_point))
    for s in c.segments: d.append(f"L{f(s.c)}L{f(s.end_point)}" if s.is_corner else f"C{f(s.c1)} {f(s.c2)} {f(s.end_point)}")
    d.append('Z')
  return ''.join(d)
def cor(m): return '#%02x%02x%02x'%tuple(int(x) for x in np.median(a[m][:,:3],axis=0))
print(cor(lar),cor(azul))
open(f'{out}/logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><circle cx="90" cy="90" r="89.5" fill="{cor(lar)}"/><path fill="{cor(azul)}" d="{cam(azul|branco)}"/><path fill="#fff" d="{cam(branco)}"/></svg>')
