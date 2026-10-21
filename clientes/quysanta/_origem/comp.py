import json
P=json.load(open('paths.json'))
cx,cy,rx,ry=663.5,266.5,580,250
def svg(fundo=True):
  ell=f'''<ellipse cx="{cx}" cy="{cy+8}" rx="{rx}" ry="{ry}" fill="#000" opacity=".22" filter="url(#s)"/>
<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="url(#aro)"/>
<ellipse cx="{cx}" cy="{cy}" rx="{rx-18}" ry="{ry-17}" fill="url(#miolo)"/>''' if fundo else ''
  vb='70 6 1188 528' if fundo else '150 60 1080 360'
  w,h=vb.split()[2:]
  return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}">
<defs>
<linearGradient id="aro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f6f6"/><stop offset=".55" stop-color="#b4b7ba"/><stop offset="1" stop-color="#eeeeee"/></linearGradient>
<radialGradient id="miolo" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#f4f4f4"/><stop offset="1" stop-color="#dcdddd"/></radialGradient>
<linearGradient id="verm" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#ff3a12"/><stop offset=".55" stop-color="#e01e00"/><stop offset="1" stop-color="#b10d00"/></linearGradient>
<filter id="s" x="-.1" y="-.1" width="1.2" height="1.3"><feGaussianBlur stdDeviation="8"/></filter>
</defs>
{ell}
<path d="{P['red']}" fill="url(#verm)"/>
<path d="{P['yel']}" fill="#e7ef3a" stroke="#6e5a14" stroke-width="5" paint-order="stroke" stroke-linejoin="round"/>
<path d="{P['alim']}" fill="#fff"/>
</svg>'''
open('logo.svg','w').write(svg())
open('logo-sem-oval.svg','w').write(svg(False))
