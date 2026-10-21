# Gera _origem/mapa.json (contorno dos estados em SVG) a partir de img/brazil-states.geojson
# (codeforgermany/click_that_hood, domínio público). Uso: python3 clientes/3americas/_origem/mapa.py
import json, math, os
d = os.path.dirname(os.path.abspath(__file__))
g = json.load(open(os.path.join(d, 'img/brazil-states.geojson')))
LON0, LAT0, LAT_REF, ESC = -74.2, 5.6, -15, 22  # canto noroeste do Brasil, latitude de referência e escala (px por grau)
k = math.cos(math.radians(LAT_REF))
def P(lon, lat): return ((lon - LON0) * k * ESC, (LAT0 - lat) * ESC)

def simplifica(pts, tol):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; n = math.hypot(dx, dy) or 1e-9
    i, dm = 0, 0
    for j in range(1, len(pts) - 1):
        x, y = pts[j]; dd = abs(dy * x - dx * y + x2 * y1 - y2 * x1) / n
        if dd > dm: i, dm = j, dd
    if dm > tol: return simplifica(pts[:i + 1], tol)[:-1] + simplifica(pts[i:], tol)
    return [pts[0], pts[-1]]

estados = {}
for f in g['features']:
    geo = f['geometry']; polys = geo['coordinates'] if geo['type'] == 'MultiPolygon' else [geo['coordinates']]
    dd = []
    for poly in polys:
        for anel in poly[:1]:
            q = [P(*c[:2]) for c in anel]; m = len(q) // 2
            pts = simplifica(q[:m + 1], 0.8)[:-1] + simplifica(q[m:], 0.8)
            if len(pts) < 4: continue
            dd.append('M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + 'Z')
    estados[f['properties']['sigla']] = ''.join(dd)
W, H = P(-34.6, -34)
json.dump({'largura': round(W), 'altura': round(H), 'proj': [LON0, LAT0, LAT_REF, ESC], 'estados': estados}, open(os.path.join(d, 'mapa.json'), 'w'))
print('ok', round(W), round(H), sum(len(v) for v in estados.values()))
