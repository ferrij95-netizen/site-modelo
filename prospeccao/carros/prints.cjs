// Tira print da primeira tela (computador e celular) de cada site em sites.txt.
const { chromium } = require('playwright');
const fs = require('fs');
const linhas = fs.readFileSync('sites.txt', 'utf8').trim().split('\n').map(l => l.split(' '));
fs.mkdirSync('saida/prints', { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--ignore-certificate-errors'] });
  const fila = [...linhas];
  async function trabalha() {
    while (fila.length) {
      const [id, url] = fila.shift();
      for (const [w, h, t, mob] of [[1366, 854, 'pc', false], [390, 780, 'cel', true]]) {
        const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, deviceScaleFactor: 1, locale: 'pt-BR', ignoreHTTPSErrors: true });
        const pg = await ctx.newPage();
        try {
          await pg.goto(url, { waitUntil: 'load', timeout: 40000 }).catch(() => {});
          await pg.waitForTimeout(3500);
          await pg.screenshot({ path: `saida/prints/${id}-${t}.jpg`, type: 'jpeg', quality: 70, timeout: 20000 });
        } catch (e) { console.log('falhou', id, t, e.message.slice(0, 80)); }
        await ctx.close();
      }
      console.log('ok', id);
    }
  }
  await Promise.all(Array.from({ length: 6 }, trabalha));
  await b.close();
})();
