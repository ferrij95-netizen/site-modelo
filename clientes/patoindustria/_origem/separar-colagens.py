import sys,glob,os
from PIL import Image
import numpy as np
def white(a): return (a.min(axis=2)>235)
def cuts(mask,axis,minrun=4):
  # lines fully white along axis
  full=mask.all(axis=axis)
  segs=[];start=None
  for i,v in enumerate(full):
    if not v and start is None: start=i
    if v and start is not None: segs.append((start,i));start=None
  if start is not None: segs.append((start,len(full)))
  return [s for s in segs if s[1]-s[0]>40]
def split(a,x0,y0,depth=0):
  m=white(a)
  for axis in (0,1):
    s=cuts(m,axis)
    if len(s)>1 or (len(s)==1 and (s[0][1]-s[0][0])<(m.shape[1-axis]-6)):
      out=[]
      for (p,q) in s:
        sub=a[:,p:q] if axis==0 else a[p:q,:]
        out+=split(sub,x0+(p if axis==0 else 0),y0+(p if axis==1 else 0),depth+1) if depth<4 else [(x0,y0,sub)]
      return out
  return [(x0,y0,a)]
os.makedirs('img/pecas',exist_ok=True)
for f in sorted(glob.glob('img/orig/produtos-*'))+sorted(glob.glob('img/orig/obras-0*')):
  a=np.array(Image.open(f).convert('RGB'))
  ps=[p for p in split(a,0,0) if p[2].shape[0]>60 and p[2].shape[1]>60]
  ps.sort(key=lambda p:-p[2].shape[0]*p[2].shape[1])
  n=os.path.basename(f)[:-4]
  print(n,[(p[0],p[1],p[2].shape[1],p[2].shape[0]) for p in ps])
  for i,p in enumerate(ps): Image.fromarray(p[2]).save(f'img/pecas/{n}-{i+1}.jpg',quality=95)
