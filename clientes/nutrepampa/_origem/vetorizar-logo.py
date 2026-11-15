# Vetoriza o logo Nutrepampa (Logo-Nutrepampa-scaled.png do site atual, 2560x1388, reduzido 1/2): folhas laranja, "nutrepampa" e "equilíbrio em nutrição" em azul-marinho.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image, ImageFilter
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
im=im.resize((im.width//2,im.height//2),Image.LANCZOS)
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
lar=(al>120)&(r>170)&(g>70)&(g<190)&(b<110)
azul=(al>120)&(b>r+20)&(r<170)&(g<170)
k=0.25
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=20,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.1f} {s.y*k:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.1f} {seg.c.y*k:.1f}L{seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
      else: d.append(f"C{seg.c1.x*k:.1f} {seg.c1.y*k:.1f} {seg.c2.x*k:.1f} {seg.c2.y*k:.1f} {seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
    d.append('Z')
  return ''.join(d)
from scipy import ndimage
def limpa(m):
  lb,n=ndimage.label(m);sz=ndimage.sum(m,lb,range(1,n+1));return np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=40])
lar,azul=limpa(lar),limpa(azul)
vis=lar|azul
ys=np.where(vis.sum(axis=1)>0)[0]; xs=np.where(vis.sum(axis=0)>0)[0]
vb=f'{xs.min()*k-1:.0f} {ys.min()*k-1:.0f} {(xs.max()-xs.min())*k+2:.0f} {(ys.max()-ys.min())*k+2:.0f}'
pl,pa=cam(lar),cam(azul)
svg=lambda ca:f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#dd7400" fill-rule="evenodd" d="{pl}"/><path fill="{ca}" fill-rule="evenodd" d="{pa}"/></svg>'
open(f'{out}/logo.svg','w').write(svg('#303a5f'))
open(f'{out}/logo-branco.svg','w').write(svg('#ffffff'))
fol=lar.copy(); 
print(vb)
