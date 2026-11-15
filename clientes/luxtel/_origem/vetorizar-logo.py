# Vetoriza o logo Luxtel (PNG 886x463 do site atual, Wix): "LUXTEL" vinho #760c16, X, arco e "Acima de Tudo" cinza #768491. Ampliado 3x antes do potrace.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>  -> logo.svg (cores), logo-branco.svg
from PIL import Image
import numpy as np, potrace, sys
from scipy import ndimage
im=Image.open(sys.argv[1]).convert('RGB'); out=sys.argv[2]
im=im.resize((im.width*3,im.height*3),Image.LANCZOS)
a=np.array(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
vinho=(r>70)&(r<200)&(g<80)&(b<90)&(r-g>50)
cinza=(abs(r-g)<40)&(b>r+5)&(r<200)&(r>60)
def limpa(m):
  lb,n=ndimage.label(m);sz=ndimage.sum(m,lb,range(1,n+1));return np.isin(lb,[i+1 for i,v in enumerate(sz) if v>=200])
vinho,cinza=limpa(vinho),limpa(cinza)
k=1/3
def cam(m):
  pl=potrace.Bitmap(~m).trace(turdsize=40,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.1f} {s.y*k:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.1f} {seg.c.y*k:.1f}L{seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
      else: d.append(f"C{seg.c1.x*k:.1f} {seg.c1.y*k:.1f} {seg.c2.x*k:.1f} {seg.c2.y*k:.1f} {seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
    d.append('Z')
  return ''.join(d)
vis=vinho|cinza
ys=np.where(vis.sum(axis=1)>0)[0]; xs=np.where(vis.sum(axis=0)>0)[0]
vb=f'{xs.min()*k-2:.0f} {ys.min()*k-2:.0f} {(xs.max()-xs.min())*k+4:.0f} {(ys.max()-ys.min())*k+4:.0f}'
pv,pc=cam(vinho),cam(cinza)
open(f'{out}/logo.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#760c16" fill-rule="evenodd" d="{pv}"/><path fill="#768491" fill-rule="evenodd" d="{pc}"/></svg>')
open(f'{out}/logo-branco.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#fff" fill-rule="evenodd" d="{pv}"/><path fill="#c9d1d8" fill-rule="evenodd" d="{pc}"/></svg>')
print(vb)
