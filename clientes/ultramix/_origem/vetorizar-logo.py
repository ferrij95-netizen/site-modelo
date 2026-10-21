import potrace, numpy as np, sys
from PIL import Image
def trace(path, scale, out, crop=None):
    im=Image.open(path).convert('RGBA')
    if crop: im=im.crop(crop)
    W,H=im.size
    im=im.resize((W*scale,H*scale),Image.LANCZOS)
    a=np.array(im).astype(float)
    alpha=a[...,3]/255; r,g,b=a[...,0],a[...,1],a[...,2]
    cols={'#023F87':(2,63,135),'#F48120':(244,129,32)}
    paths=[]
    for hexc,(R,G,B) in cols.items():
        # pixel belongs to color if alpha high and nearer this color than other
        d=np.sqrt((r-R)**2+(g-G)**2+(b-B)**2)
        other=[c for c in cols.values() if c!=(R,G,B)][0]
        d2=np.sqrt((r-other[0])**2+(g-other[1])**2+(b-other[2])**2)
        mask=(alpha>0.5)&(d<d2)&(d<140)
        bm=potrace.Bitmap(~mask)
        pl=bm.trace(turdsize=8,alphamax=1.0,opticurve=True,opttolerance=0.2)
        dstr=[]
        for c in pl:
            s=c.start_point; dstr.append(f'M{s.x/scale:.2f},{s.y/scale:.2f}')
            for seg in c.segments:
                if seg.is_corner: dstr.append(f'L{seg.c.x/scale:.2f},{seg.c.y/scale:.2f}L{seg.end_point.x/scale:.2f},{seg.end_point.y/scale:.2f}')
                else: dstr.append(f'C{seg.c1.x/scale:.2f},{seg.c1.y/scale:.2f} {seg.c2.x/scale:.2f},{seg.c2.y/scale:.2f} {seg.end_point.x/scale:.2f},{seg.end_point.y/scale:.2f}')
            dstr.append('Z')
        paths.append(f'<path fill="{hexc}" fill-rule="evenodd" d="{"".join(dstr)}"/>')
    open(out,'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">{"".join(paths)}</svg>')
trace('img/1149c3f4202f5e60a1c44e88d66d8332.png',8,'logo/logo.svg')
trace('img/a5f4.png',4,'logo/simbolo.svg')
