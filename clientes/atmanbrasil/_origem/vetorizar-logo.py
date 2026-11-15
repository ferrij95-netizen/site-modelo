# Vetoriza o logo da Atman Brasil (logo-atman.png do site atual, 1033x423): "atman" e "BRASIL" azul-marinho com o acento amarelo e verde.
# python3 vetorizar-logo.py <logo.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
im=im.crop(im.getbbox()); S=2
im=im.resize((im.width*S,im.height*S),Image.LANCZOS)
a=np.array(im).astype(int); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
forma=al>110
amarelo=forma&(r>180)&(g>150)&(b<100)
verde=forma&(g>r+30)&(g>b)&~amarelo
azul=forma&~amarelo&~verde
def caminho(m):
  pl=potrace.Bitmap(~m).trace(turdsize=10,alphamax=1.0,opticurve=True,opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x/S:.1f} {s.y/S:.1f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x/S:.1f} {seg.c.y/S:.1f}L{seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
      else: d.append(f"C{seg.c1.x/S:.1f} {seg.c1.y/S:.1f} {seg.c2.x/S:.1f} {seg.c2.y/S:.1f} {seg.end_point.x/S:.1f} {seg.end_point.y/S:.1f}")
    d.append('Z')
  return ''.join(d)
H,W=forma.shape; vb=f'0 0 {W/S:.0f} {H/S:.0f}'
pa,py,pv=caminho(azul),caminho(amarelo),caminho(verde) if verde.any() else ''
def svg(nome,cores):
  partes=[(cores[0],pa),(cores[1],py)]+([(cores[2],pv)] if pv else [])
  open(f'{out}/{nome}.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'+''.join(f'<path fill="{c}" fill-rule="evenodd" d="{p}"/>' for c,p in partes)+'</svg>')
svg('logo',('#012168','#fcca06','#1aa64a'))
svg('logo-branco',('#ffffff','#fcca06','#3ccf6e'))
print(vb,verde.sum(),amarelo.sum())
