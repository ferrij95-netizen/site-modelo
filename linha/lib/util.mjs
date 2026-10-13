import fs from 'node:fs';
import path from 'node:path';
import { DADOS } from '../config.mjs';

export const lerJson = (f, padrao = null) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return padrao; } };
export const gravarJson = (f, d) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(d, null, 2)); };
export const existe = f => fs.existsSync(f);

// Nome curto para pasta e subdomínio: "Alfamaq Equipamentos Ltda" -> "alfamaq".
const RUIDO = /\b(ltda|me|epp|eireli|s\/?a|sa|cia|comercio|comercial|industria|ind|e|de|do|da|dos|das|grupo|empresa|distribuidora|equipamentos)\b/g;
export function slugDe(nome, site) {
  if (site) {
    try {
      const host = new URL(site.startsWith('http') ? site : 'http://' + site).hostname.replace(/^www\./, '');
      const base = host.split('.')[0];
      if (base.length >= 3 && !/^\d+$/.test(base)) return base.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
    } catch {}
  }
  const s = nome.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(RUIDO, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return s.split('-').slice(0, 2).join('-').slice(0, 30) || 'cliente';
}

export const pastaDe = slug => path.join(DADOS, 'empresas', slug);
export const arq = (slug, ...p) => path.join(pastaDe(slug), ...p);

// Estado de cada empresa: { etapas: { captura: 'ok' | 'aguardando' | 'descartada' | 'erro: ...' } }
export function estado(slug) { return lerJson(arq(slug, 'estado.json'), { slug, etapas: {} }); }
export function marcar(slug, etapa, valor) {
  const e = estado(slug);
  e.etapas[etapa] = valor;
  e.atualizado = new Date().toISOString();
  gravarJson(arq(slug, 'estado.json'), e);
}

export const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

// Lê a lista de entrada: .json (array) ou .csv (separado por ; ou ,, com cabeçalho).
export function lerLista(f) {
  const txt = fs.readFileSync(f, 'utf8').replace(/^﻿/, '');
  if (f.endsWith('.json')) return JSON.parse(txt);
  const linhas = txt.split(/\r?\n/).filter(l => l.trim());
  const sep = (linhas[0].match(/;/g) || []).length >= (linhas[0].match(/,/g) || []).length ? ';' : ',';
  const campos = l => { const out = []; let cur = '', q = false; for (const ch of l) { if (ch === '"') q = !q; else if (ch === sep && !q) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out.map(s => s.trim()); };
  const cab = campos(linhas[0]).map(c => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase());
  const pega = (r, ...nomes) => { for (const n of nomes) { const i = cab.findIndex(c => c.startsWith(n)); if (i >= 0 && r[i]) return r[i]; } return ''; };
  const iId = cab.indexOf('id');
  return linhas.slice(1).map(campos).map(r => ({
    id: iId >= 0 ? r[iId] : '',
    nome: pega(r, 'empresa', 'nome'), site: pega(r, 'site'), cidade: pega(r, 'cidade'), uf: pega(r, 'uf'),
    segmento: pega(r, 'segmento', 'o que faz', 'categoria'), telefone: pega(r, 'telefone'), whatsapp: pega(r, 'whatsapp'), email: pega(r, 'e-mail', 'email'),
  })).filter(e => e.nome && e.site && /\./.test(e.site));
}
