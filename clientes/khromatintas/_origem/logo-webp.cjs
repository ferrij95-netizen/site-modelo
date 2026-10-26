// Exporta logo.svg / logo-branco.svg para webp transparente (4x) e o favicon.
const { chromium } = require('playwright');
const sharp = require(require('path').join(__dirname, '../../../node_modules/sharp'));
const fs = require('fs'), path = require('path');
const dir = __dirname, out = path.join(dir, '../public/assets');
(async () => {
  const b = await chromium.launch();
  for (const n of ['logo', 'logo-branco']) {
    const p = await b.newPage({ viewport: { width: 694, height: 173 } });
    const html = path.join(require('os').tmpdir(), 'logo-' + n + '.html');
    fs.writeFileSync(html, `<style>html,body{margin:0;background:transparent}img{width:694px;height:173px;display:block}</style><img src="file://${path.join(dir, n + '.svg')}">`);
    await p.goto('file://' + html); await p.waitForTimeout(200);
    const buf = await p.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: 694, height: 173 } });
    await sharp(buf).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(out, n + '.webp'));
    await p.close();
  }
  await sharp(path.join(dir, 'favicon-original.png')).resize(64, 64).webp({ quality: 90 }).toFile(path.join(out, 'favicon.webp'));
  await b.close();
})();
