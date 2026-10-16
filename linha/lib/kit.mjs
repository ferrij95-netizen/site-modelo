// Kit de treino do redator (pasta kit/): guia de estilo, exemplos de ouro e checklist anti-genérico.
// Os textos entram no início das instruções do redator e do revisor; como não mudam entre empresas, ficam em cache.
import fs from 'node:fs';
import path from 'node:path';
import { AQUI } from '../config.mjs';

const ler = n => fs.readFileSync(path.join(AQUI, 'kit', n), 'utf8').trim();
export const KIT = { guia: ler('guia.md'), exemplos: ler('exemplos.md'), checklist: ler('checklist.md') };
