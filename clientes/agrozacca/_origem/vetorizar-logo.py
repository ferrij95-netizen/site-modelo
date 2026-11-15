# Vetoriza o logo Suprema/agrozacca (img/logo.png do site atual, 152x85, ampliado 6x): selo vermelho, coroa dourada, letras brancas e "agrozacca" com contorno.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image, ImageFilter
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
K=6
im=im.resize((im.width*K,im.height*K),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.0))
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
vis=al>110
verm=vis&(r>150)&(g<110)&(b<110)
ouro=vis&(r>180)&(g>120)&(b<120)&~verm
branco=vis&(r>200)&(g>200)&(b>200)
cinza=vis&~verm&~ouro&~branco
yb=np.where(verm.any(axis=1))[0].max()+2
baixo=np.zeros_like(vis);baixo[yb:,:]=True
branco_cima=branco&~baixo;branco_baixo=(branco|cinza)&baixo;cinza=cinza&~baixo
k=1/K
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=25,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.2f} {s.y*k:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.2f} {seg.c.y*k:.2f}L{seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
      else: d.append(f"C{seg.c1.x*k:.2f} {seg.c1.y*k:.2f} {seg.c2.x*k:.2f} {seg.c2.y*k:.2f} {seg.end_point.x*k:.2f} {seg.end_point.y*k:.2f}")
    d.append('Z')
  return ''.join(d)
ys=np.where(vis.any(axis=1))[0]; xs=np.where(vis.any(axis=0))[0]
vb=f'{xs.min()*k-1:.0f} {ys.min()*k-1:.0f} {(xs.max()-xs.min())*k+2:.0f} {(ys.max()-ys.min())*k+2:.0f}'
pb=cam(branco_baixo)
P=[('#da251c',cam(verm)),('#f2b90f',cam(ouro)),('#ffffff',cam(branco_cima)),('#8a8d93',cam(cinza)),('#5b5e64',pb)]
open(f'{out}/logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in P)+'</svg>')
P[4]=('#ffffff',pb)
open(f'{out}/logo-branco.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in P)+'</svg>')
print(vb)
