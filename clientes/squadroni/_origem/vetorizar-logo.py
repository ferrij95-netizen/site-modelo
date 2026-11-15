# Vetoriza o logo da Squadroni a partir do catálogo PDF 2022 (página 2 renderizada a 600 dpi e recortada): faixa vermelha + "RODÍZIOS Squadroni" em preto.
# python3 vetorizar-logo.py <logo-hi.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGB'); out=sys.argv[2]
S=1
a=np.array(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
verm=(r>150)&(g<110)&(b<110)
preto=(r+g+b<300)&~verm
def caminho(m,k=0.5):
  pl=potrace.Bitmap(~m).trace(turdsize=20,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x*k:.1f} {s.y*k:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x*k:.1f} {seg.c.y*k:.1f}L{seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
      else: d.append(f"C{seg.c1.x*k:.1f} {seg.c1.y*k:.1f} {seg.c2.x*k:.1f} {seg.c2.y*k:.1f} {seg.end_point.x*k:.1f} {seg.end_point.y*k:.1f}")
    d.append('Z')
  return ''.join(d)
H,W=verm.shape; vb=f'0 0 {W*0.5:.0f} {H*0.5:.0f}'
pv,pp=caminho(verm),caminho(preto)
def svg(nome,cv,cp,vbx=vb,so_marca=False):
  partes=[(cv,pv)]+([] if so_marca else [(cp,pp)])
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vbx}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in partes)+'</svg>')
svg('logo','#e31e24','#111111'); svg('logo-branco','#e31e24','#ffffff')
xs=np.where(verm.any(axis=0))[0]; ys=np.where(verm.any(axis=1))[0]
svg('marca','#e31e24','',f'{xs.min()*0.5-2:.0f} {ys.min()*0.5-2:.0f} {(xs.max()-xs.min())*0.5+4:.0f} {(ys.max()-ys.min())*0.5+4:.0f}',True)
print(vb)
