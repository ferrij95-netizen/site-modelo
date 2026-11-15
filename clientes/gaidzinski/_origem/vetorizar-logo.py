# Vetoriza o logo da Gaidzinski Máquinas (logo_gaidzinski.jpg do site atual, ampliado 3x): losangos laranja + "GAIDZINSKI MÁQUINAS" azul-marinho.
# python3 vetorizar-logo.py <logo3.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGB'); out=sys.argv[2]
a=np.array(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
lar=(r>200)&(g>120)&(g<215)&(b<140)
azul=(b>r+30)&(r<140)
k=1/3
def caminho(m):
  pl=potrace.Bitmap(~m).trace(turdsize=30,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.1f} {s.y*k:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.1f} {seg.c.y*k:.1f}L{seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
      else: d.append(f"C{seg.c1.x*k:.1f} {seg.c1.y*k:.1f} {seg.c2.x*k:.1f} {seg.c2.y*k:.1f} {seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
    d.append('Z')
  return ''.join(d)
m=lar|azul; ys=np.where(m.any(axis=1))[0]; xs=np.where(m.any(axis=0))[0]
vb=f'{xs.min()*k-3:.0f} {ys.min()*k-3:.0f} {(xs.max()-xs.min())*k+6:.0f} {(ys.max()-ys.min())*k+6:.0f}'
pl,pa=caminho(lar),caminho(azul)
def svg(nome,cl,ca,vbx=vb,so=False):
  partes=[(cl,pl)]+([] if so else [(ca,pa)])
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vbx}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in partes)+'</svg>')
svg('logo','#ffb434','#001d49'); svg('logo-branco','#ffb434','#ffffff')
xl=np.where(lar.any(axis=0))[0]; yl=np.where(lar.any(axis=1))[0]
svg('marca','#ffb434','',f'{xl.min()*k-2:.0f} {yl.min()*k-2:.0f} {(xl.max()-xl.min())*k+4:.0f} {(yl.max()-yl.min())*k+4:.0f}',True)
print(vb)
