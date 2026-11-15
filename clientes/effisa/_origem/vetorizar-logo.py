# Vetoriza o logotipo-fotter.png (550x150, versão branca) do site atual da Effisa: círculo vermelho, botão branco e "EFFISA / Evolução Eficiente".
# python3 vetorizar-logo.py <logotipo-fotter.png> <pasta-saida>
from PIL import Image
import numpy as np, potrace, sys
im=Image.open(sys.argv[1]).convert('RGBA'); out=sys.argv[2]
S=6
big=np.array(im.resize((im.width*S,im.height*S),Image.LANCZOS)).astype(int)
r,g,b,a=big[...,0],big[...,1],big[...,2],big[...,3]
H,W=a.shape
yy,xx=np.mgrid[0:H,0:W]
vis=a>110
verm=vis&(r-g>90)
branco=vis&~verm
ys,xs=np.where(verm); cx1=xs.max()+2*S
icone=branco&(xx<=cx1)
nome=branco&(xx>cx1)
def path(m):
  pl=potrace.Bitmap(~m).trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.2)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
    for seg in c.segments:
      if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
      else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
    d.append('Z')
  return ''.join(d)
P=dict(v=path(verm),i=path(icone),n=path(nome))
ys,xs=np.where(vis); x0,x1,y0,y1=xs.min()/S-1,xs.max()/S+1,ys.min()/S-1,ys.max()/S+1
vb=f'{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}'
def svg(cN): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><path fill="#ff0000" fill-rule="evenodd" d="{P["v"]}"/><path fill="#fff" fill-rule="evenodd" d="{P["i"]}"/><path fill="{cN}" fill-rule="evenodd" d="{P["n"]}"/></svg>'
open(f'{out}/logo.svg','w').write(svg('#4b4b4d'))
open(f'{out}/logo-branco.svg','w').write(svg('#ffffff'))
ys2,xs2=np.where(verm); bx0,bx1,by0,by1=xs2.min()/S-1,xs2.max()/S+1,ys2.min()/S-1,ys2.max()/S+1
open(f'{out}/marca.svg','w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx0:.1f} {by0:.1f} {bx1-bx0:.1f} {by1-by0:.1f}"><path fill="#ff0000" fill-rule="evenodd" d="{P["v"]}"/><path fill="#fff" fill-rule="evenodd" d="{P["i"]}"/></svg>')
print(vb)
