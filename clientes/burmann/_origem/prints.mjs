// Prints da apresentação, og-*.jpg e ../capa.jpg. Precisa de um servidor local em public/:
//   (cd clientes/burmann/public && python3 -m http.server 8765) e depois node clientes/burmann/_origem/prints.mjs
// Chromium do ambiente em /opt/pw-browsers/chromium; playwright e sharp instalados fora do repositório.
import { chromium } from 'playwright';
import sharp from 'sharp';
const pub = '/home/user/site-modelo/clientes/burmann/public/assets';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
async function shot(url, w, scale, full=true, h=900) {
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(async () => { document.querySelectorAll('[data-rev]').forEach(e=>e.classList.add('vis')); document.querySelectorAll('img').forEach(i=>i.loading='eager'); for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));} window.scrollTo(0,0); await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,5000)}))); document.querySelectorAll('.a-topo,.b-topo').forEach(e=>e.style.position='relative'); });
  await p.waitForTimeout(800);
  const buf = await p.screenshot({ fullPage: full });
  await p.close(); return buf;
}
for (const v of ['a','b']) {
  await sharp(await shot(`http://localhost:8765/${v}/`, 1440, 1)).resize(1000).webp({quality:70}).toFile(`${pub}/apresentacao/${v}-pc.webp`);
  await sharp(await shot(`http://localhost:8765/${v}/`, 390, 2)).resize(600).webp({quality:70}).toFile(`${pub}/apresentacao/${v}-cel.webp`);
  await sharp(await shot(`http://localhost:8765/${v}/`, 1200, 1, false, 630)).jpeg({quality:80}).toFile(`${pub}/og-${v}.jpg`);
}
await sharp(await shot('http://www.burmannalimentos.com.br/index.php', 1366, 1)).resize(1000).webp({quality:70}).toFile(`${pub}/apresentacao/atual-pc.webp`);
await sharp(await shot('http://localhost:8765/a/', 1440, 1, false, 900)).resize(1200).jpeg({quality:78}).toFile('/home/user/site-modelo/clientes/burmann/capa.jpg');
await b.close();
