# Gera mapa.json (contornos simplificados dos estados, projeção simples) para o mapa de obras da versão B.
# Fonte: brazil-states.geojson do projeto click_that_hood (Code for America). Uso: python3 mapa.py caminho/brazil-states.geojson
import json, sys, math, os
d = json.load(open(sys.argv[1]))
LON0, LAT0, ESC = -74.5, 5.6, 22  # px por grau
def xy(lon, lat):
    return ((lon - LON0) * ESC * math.cos(math.radians(15)), (LAT0 - lat) * ESC)
def simplifica(pts, tol=2.4):
    out = [pts[0]]
    for p in pts[1:]:
        if math.dist(p, out[-1]) >= tol: out.append(p)
    return out
estados = {}
for f in d['features']:
    sig = f['properties']['sigla']
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    path = ''
    for poly in polys:
        anel = simplifica([xy(*c[:2]) for c in poly[0]])
        if len(anel) < 4 or max(p[0] for p in anel) - min(p[0] for p in anel) < 8: continue
        path += 'M' + 'L'.join(f'{x:.1f},{y:.1f}' for x, y in anel) + 'Z'
    estados[sig] = path
pontos = {
  'Porto Alegre': (-51.23, -30.03), 'Canoas': (-51.18, -29.92), 'Osório': (-50.27, -29.89), 'Pelotas': (-52.34, -31.77),
  'Turuçu': (-52.17, -31.42), 'Rio Grande': (-52.10, -32.03), 'Capão do Leão': (-52.48, -31.76), 'Alegrete': (-55.79, -29.78),
  'Manoel Viana': (-55.48, -29.59), 'Paraíso': (-53.67, -26.62), 'Curitiba': (-49.27, -25.43), 'Paranaguá': (-48.51, -25.52),
  'Cascavel': (-53.46, -24.96), 'Jericoacoara': (-40.48, -2.84),
}
P = {k: [round(v, 1) for v in xy(*c)] for k, c in pontos.items()}
json.dump({'estados': estados, 'pontos': P}, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mapa.json'), 'w'))
xs = [float(n.split(',')[0]) for p in estados.values() for n in p.replace('M', 'L').replace('Z', '').split('L') if n]
ys = [float(n.split(',')[1]) for p in estados.values() for n in p.replace('M', 'L').replace('Z', '').split('L') if n]
print('caixa', min(xs), min(ys), max(xs), max(ys), os.path.getsize('mapa.json'))
