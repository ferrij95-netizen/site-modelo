import numpy as np, cv2, potrace
from PIL import Image
im=np.array(Image.open('logo4.png').convert('RGBA')).astype(int)
r,g,b,a=[im[...,i] for i in range(4)]
yellow=(r>170)&(g>170)&(b<120)&(a>128)
red=(r>150)&(r-(g+b)/2>45)&(a>128)&~((r>170)&(g>170)&(b<120))
white=(r>195)&(g>185)&(b>180)
alim=np.zeros_like(white); alim[320:380,520:910]=white[320:380,520:910]
alim=cv2.GaussianBlur(alim.astype(np.float32),(0,0),1.3)>.45
# outline color: pixels adjacent to yellow, dark
yd=cv2.dilate(yellow.astype(np.uint8),np.ones((7,7),np.uint8)).astype(bool)&~yellow
ring=im[yd&(r+g+b<400)][:,:3]; print('outline',np.median(ring,axis=0))
print('yellow',np.median(im[yellow][:,:3],axis=0),'red',np.median(im[red][:,:3],axis=0))
R=(red|cv2.dilate(yellow.astype(np.uint8),np.ones((9,9),np.uint8)).astype(bool)&cv2.dilate(red.astype(np.uint8),np.ones((61,61),np.uint8)).astype(bool)|alim).astype(np.uint8)
R=cv2.morphologyEx(R,cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
# fill small holes
n,lab,st,_=cv2.connectedComponentsWithStats((1-R).astype(np.uint8),4)
for i in range(1,n):
  if st[i,4]<4000: R[lab==i]=1
R=cv2.morphologyEx(R,cv2.MORPH_OPEN,np.ones((5,5),np.uint8))
R=(cv2.GaussianBlur(R.astype(np.float32),(0,0),9)>.5).astype(np.uint8)
yellow=cv2.GaussianBlur(yellow.astype(np.float32),(0,0),2.2)>.5
def path(mask,ts=1.0):
  bm=potrace.Bitmap(~mask.astype(bool)); pl=bm.trace(turdsize=20,alphamax=ts,opttolerance=0.3)
  d=[]
  for c in pl:
    s=c.start_point; d.append(f'M{s.x:.1f} {s.y:.1f}')
    for seg in c.segments:
      if seg.is_corner: d.append(f'L{seg.c.x:.1f} {seg.c.y:.1f}L{seg.end_point.x:.1f} {seg.end_point.y:.1f}')
      else: d.append(f'C{seg.c1.x:.1f} {seg.c1.y:.1f} {seg.c2.x:.1f} {seg.c2.y:.1f} {seg.end_point.x:.1f} {seg.end_point.y:.1f}')
    d.append('Z')
  return ''.join(d)
Image.fromarray(((1-R)*255).astype(np.uint8)).save('Rmask.png')
H,W=R.shape
P={'red':path(R),'yel':path(yellow,0.6),'alim':path(alim,1.0)}
import json;json.dump(P,open('paths.json','w'))
print(W,H,{k:len(v) for k,v in P.items()})
