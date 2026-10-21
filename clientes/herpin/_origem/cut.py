import sys
from rembg import remove, new_session
from PIL import Image
s=new_session('isnet-general-use')
L='211 212 233 302 399 403 366 306 453 357 351 376 339 293 266 206 337 424 280 372 445 309 236 289 248 218'.split()
for n in L:
  im=Image.open(f'img/gal0000{n}.jpg').convert('RGB')
  out=remove(im,session=s)
  bb=out.getbbox(); out=out.crop(bb)
  out.save(f'cut/{n}.png')
  print(n,out.size,flush=True)
