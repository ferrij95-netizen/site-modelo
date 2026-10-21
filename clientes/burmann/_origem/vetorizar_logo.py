import sys, numpy as np, potrace
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
S=6
im=Image.open(src).convert('RGB'); W,H=im.size
big=np.asarray(im.resize((W*S,H*S),Image.LANCZOS)).astype(int)
r,g,b=big[...,0],big[...,1],big[...,2]
lum=(r+g+b)/3
yellow=(r>180)&(g>120)&(b<110)
white=(lum>170)&~yellow&(abs(r-b)<40)
swoosh=(lum>36)&~yellow&~white          # ellipse fill + rim
rim=(lum>64)&~yellow&~white
def path(mask):
    bm=potrace.Bitmap(~mask)
    p=bm.trace(turdsize=8,alphamax=1.0,opticurve=True,opttolerance=0.2)
    d=[]
    for c in p:
        s=c.start_point; d.append(f"M{s.x/S:.2f},{s.y/S:.2f}")
        for seg in c.segments:
            if seg.is_corner: d.append(f"L{seg.c.x/S:.2f},{seg.c.y/S:.2f}L{seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}")
            else: d.append(f"C{seg.c1.x/S:.2f},{seg.c1.y/S:.2f} {seg.c2.x/S:.2f},{seg.c2.y/S:.2f} {seg.end_point.x/S:.2f},{seg.end_point.y/S:.2f}")
        d.append('Z')
    return ''.join(d)
P={k:path(m) for k,m in dict(swoosh=swoosh,rim=rim,white=white,yellow=yellow).items()}
def svg(cols):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="Burmann Alimentos">' + ''.join(f'<path fill="{cols[k]}" fill-rule="evenodd" d="{P[k]}"/>' for k in ['swoosh','rim','white','yellow'] if cols.get(k)) + '</svg>'
open(out+'/logo.svg','w').write(svg(dict(swoosh='#2E2E2E',rim='#535353',white='#FFFFFF',yellow='#FFC600')))
open(out+'/logo-claro.svg','w').write(svg(dict(swoosh='#EDEDEA',rim='#D2D2CE',white='#191919',yellow='#E2A800')))
open(out+'/logo-limpo.svg','w').write(svg(dict(white='#FFFFFF',yellow='#FFC600')))
