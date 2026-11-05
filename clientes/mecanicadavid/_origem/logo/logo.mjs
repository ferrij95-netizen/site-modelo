import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
import fs from 'node:fs';
const f = n => n.toFixed(2);
function hull(c1, r1, c2, r2) {
  const dx = c2[0]-c1[0], dy = c2[1]-c1[1], L = Math.hypot(dx, dy), ph = Math.atan2(dy, dx), a = Math.acos((r1-r2)/L);
  const P = (c, r, t) => [c[0]+r*Math.cos(t), c[1]+r*Math.sin(t)];
  const p1a = P(c1, r1, ph+a), p2a = P(c2, r2, ph+a), p1b = P(c1, r1, ph-a), p2b = P(c2, r2, ph-a);
  return `M${f(p1a[0])} ${f(p1a[1])}L${f(p2a[0])} ${f(p2a[1])}A${r2} ${r2} 0 1 0 ${f(p2b[0])} ${f(p2b[1])}L${f(p1b[0])} ${f(p1b[1])}A${r1} ${r1} 0 0 0 ${f(p1a[0])} ${f(p1a[1])}Z`;
}
function gear(cx, cy, r, holes, cor, furo, aro) {
  const dentes = Math.round(2*Math.PI*r/2.6);
  let h = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${cor}" stroke-width="2.4" stroke-dasharray="${f(Math.PI*2*r/dentes/2)} ${f(Math.PI*2*r/dentes/2)}"/>`;
  h += `<circle cx="${cx}" cy="${cy}" r="${r-1}" fill="${cor}"/><circle cx="${cx}" cy="${cy}" r="${r-2.6}" fill="none" stroke="${aro}" stroke-width=".9"/>`;
  const hr = r*0.2, hd = r*0.55;
  for (let i = 0; i < holes; i++) { const t = i*2*Math.PI/holes - Math.PI/2; h += `<circle cx="${f(cx+hd*Math.cos(t))}" cy="${f(cy+hd*Math.sin(t))}" r="${f(hr)}" fill="${furo}"/>`; }
  return h + `<circle cx="${cx}" cy="${cy}" r="${f(r*0.16)}" fill="${furo}"/>`;
}
function emblema(c) {
  return `<path d="M0 0H26C54 0 68 24 68 50C68 76 54 100 26 100H0Z" fill="${c.d}"/>
<path d="${hull([20,21],10.5,[30,72],21)}" fill="${c.belt}"/>
${gear(20,21,7.2,4,c.gear,c.furo,c.aro)}${gear(30,72,16.5,7,c.gear,c.furo,c.aro)}`;
}
function logo(c, comNome = true) {
  if (!comNome) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 76 108" width="760" height="1080">${emblema(c)}</svg>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 222 104" width="1110" height="520">
${emblema(c)}
<text x="75" y="23" font-family="Arimo" font-weight="700" font-size="21" fill="${c.txt}" textLength="141" lengthAdjust="spacingAndGlyphs">MECÂNICA</text>
<text x="73" y="81" font-family="Arimo" font-weight="700" font-size="74" fill="${c.avid}" textLength="146" lengthAdjust="spacingAndGlyphs">AVID</text>
<text x="76" y="100" font-family="Arimo" font-weight="700" font-size="18" fill="${c.txt}" textLength="139" lengthAdjust="spacingAndGlyphs">AUTO PEÇAS</text>
</svg>`;
}
const claro = { d: '#006b34', belt: '#0d3b22', gear: '#c5cec8', furo: '#0d3b22', aro: '#006b34', txt: '#1f2a24', avid: '#006b34' };
const escuro = { d: '#ffffff', belt: '#006b34', gear: '#b8c2bc', furo: '#0d3b22', aro: '#006b34', txt: '#ffffff', avid: '#ffffff' };
const b = await chromium.launch(); const p = await b.newPage();
const out = process.argv[2];
for (const [n, svg] of [['logo', logo(claro)], ['logo-claro', logo(escuro)], ['emblema', logo(claro, false)], ['emblema-claro', logo(escuro, false)]]) {
  fs.writeFileSync(`${out}/${n}.svg`, svg);
  await p.setContent(`<link href="https://fonts.googleapis.com/css2?family=Arimo:wght@700&display=block" rel="stylesheet"><style>body{margin:0;background:transparent}</style><div id="x" style="display:inline-block;font-family:Arimo">${svg}</div>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.locator('#x svg').screenshot({ path: `${out}/${n}.png`, omitBackground: true });
}
await b.close();
