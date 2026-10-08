#!/usr/bin/env python3
# Gera as duas versões do site da Oficina De Filippo em public/classica/ e public/pista/.
# Uso: python3 clientes/defilippo/fonte/gerar.py
import os
from comum import PUB, PAGINAS, pagina
import classica, pista

def escrever(v, mod):
    d = os.path.join(PUB, v)
    os.makedirs(d, exist_ok=True)
    for p in PAGINAS:
        with open(os.path.join(d, 'index.html' if p == 'index' else f'{p}.html'), 'w') as f:
            f.write(pagina(v, p, mod.corpo(p), mod.cabecalho, mod.rodape))
    with open(os.path.join(d, 'estilo.css'), 'w') as f:
        f.write(mod.CSS)

if __name__ == '__main__':
    escrever('classica', classica)
    escrever('pista', pista)
    print('ok')
