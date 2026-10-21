import re, json, urllib.request, html, concurrent.futures as cf, sys
B='https://www.diskembalagem.com.br'
def get(u):
    r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read()
    try: return r.decode('utf-8')
    except: return r.decode('latin-1')
def fix(s):
    s=html.unescape(s)
    return s
home=get(B+'/')
cats=[]
for m in re.finditer(r'href="'+B+r'/produtos/([^"/]+)/([^"]+)">([^<]+)<',home):
    cats.append((m.group(1),m.group(2),m.group(3).strip()))
catnames={m.group(1):m.group(2).strip() for m in re.finditer(r'href="'+B+r'/produtos/([^"/]+)">([^<]+)<',home)}
prods={}
def sub(c):
    h=get(f'{B}/produtos/{c[0]}/{c[1]}')
    h=h.split('lista-produtos',1)[1] if 'lista-produtos' in h else ''
    return c,[(m.group(1),fix(m.group(2)).strip()) for m in re.finditer(r'href="'+B+r'/detalhe-pro/([^"]+)" class="produto">\s*<span>([^<]*)</span>',h)]
with cf.ThreadPoolExecutor(8) as ex:
    for c,lst in ex.map(sub,cats):
        for slug,nome in lst:
            prods.setdefault(slug,{'slug':slug,'nome':nome,'cats':[]})['cats'].append([c[0],c[1]])
def det(slug):
    raw=urllib.request.urlopen(urllib.request.Request(f'{B}/detalhe-pro/{slug}',headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read()
    seg=raw.split(b'lista-produtos',1)[1].split(b'tambe-pre',1)[0]
    try: t=seg.decode('utf-8')
    except: t=seg.decode('latin-1')
    img=re.search(r'class="img-pro" src="([^"]+)"',t)
    d=re.search(r'<span class="descri-pro">(.*?)</span>',t,re.S)
    desc=fix(re.sub(r'<br\s*/?>','\n',d.group(1))) if d else ''
    desc=re.sub(r'<[^>]+>','',desc)
    desc='\n'.join(x.strip() for x in desc.split('\n') if x.strip())
    return slug,(img.group(1) if img else None),desc
with cf.ThreadPoolExecutor(8) as ex:
    for slug,img,desc in ex.map(det,list(prods)):
        prods[slug]['img']=img; prods[slug]['desc']=desc
json.dump({'catnames':catnames,'subs':cats,'prods':list(prods.values())},open(sys.argv[1],'w'),ensure_ascii=False,indent=1)
print(len(cats),len(prods))
