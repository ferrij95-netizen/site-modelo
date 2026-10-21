import sys,re,html
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(s): super().__init__(); s.skip=0; s.out=[]
    def handle_starttag(s,t,a):
        if t in('script','style','noscript','svg'): s.skip+=1
        if t in('p','h1','h2','h3','h4','li','div','br','tr'): s.out.append('\n')
        if t in('h1','h2','h3','h4'): s.out.append('#'+t[1]+' ')
        if t=='img':
            d=dict(a); s.out.append(f" [img {d.get('src') or d.get('data-src')} alt={d.get('alt')}] ")
    def handle_endtag(s,t):
        if t in('script','style','noscript','svg'): s.skip-=1
    def handle_data(s,d):
        if not s.skip: s.out.append(d)
p=P(); p.feed(open(sys.argv[1],encoding='utf-8',errors='ignore').read())
t=''.join(p.out); t=re.sub(r'[ \t]+',' ',t); t=re.sub(r'\n\s*\n+','\n',t)
print(t)
