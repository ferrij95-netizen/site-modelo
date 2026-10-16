import sys, numpy as np, potrace
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
S=8
im=Image.open(src).convert('RGBA'); W,H=im.size
big=im.resize((W*S,H*S),Image.LANCZOS)
a=np.asarray(big).astype(float); r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
lum=0.299*r+0.587*g+0.114*b; sat=np.max(a[...,:3],axis=2)-np.min(a[...,:3],axis=2)
def path(mask):
    m=Image.fromarray((mask*255).astype('uint8')).filter(ImageFilter.GaussianBlur(3))
    mask=np.asarray(m)>127
    bm=potrace.Bitmap(~mask); pl=bm.trace(turdsize=20, alphamax=1.0, opticurve=True, opttolerance=0.3)
    d=[]
    for c in pl:
        s=c.start_point; d.append(f"M{s.x/S:.2f} {s.y/S:.2f}")
        for seg in c.segments:
            if seg.is_corner: d.append(f"L{seg.c.x/S:.2f} {seg.c.y/S:.2f}L{seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
            else: d.append(f"C{seg.c1.x/S:.2f} {seg.c1.y/S:.2f} {seg.c2.x/S:.2f} {seg.c2.y/S:.2f} {seg.end_point.x/S:.2f} {seg.end_point.y/S:.2f}")
        d.append('Z')
    return ''.join(d)
tab=al>128
black=(lum<120)&tab
gray=(lum>=90)&(lum<215)&(sat<45)&tab
white=(lum>=215)&(sat<40)&tab
mode=sys.argv[3] if len(sys.argv)>3 else 'cor'
parts=[]
if mode=='cor':
    parts.append(f'<path fill="#FFED29" d="{path(tab)}"/>')
    parts.append(f'<path fill="#8a8a8a" d="{path(gray|white)}"/>')
    parts.append(f'<path fill="#fff" d="{path(white)}"/>')
    parts.append(f'<path fill="#111" fill-rule="evenodd" d="{path(black)}"/>')
else: # sem a aba amarela (para fundo escuro): tinta preta vira branca
    parts.append(f'<path fill="#9a9a9a" d="{path(gray|white)}"/>')
    parts.append(f'<path fill="#fff" d="{path(white)}"/>')
    parts.append(f'<path fill="#fff" fill-rule="evenodd" d="{path(black)}"/>')
open(out,'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{"".join(parts)}</svg>')
print(out)
