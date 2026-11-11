// Para cada candidata (fatia SHARD de N): abre a ficha no Maps e lê as avaliações mais recentes
// (sinal de movimento), depois abre o site no tamanho de celular e anota erros de verdade.
const { chromium } = require('playwright');
const fs = require('fs');
const SHARD = Number(process.env.SHARD), N = Number(process.env.N);
const todos = JSON.parse(fs.readFileSync('saida/candidatos.json', 'utf8'));
const meus = todos.filter((_, i) => i % N === SHARD);
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ locale: 'pt-BR', viewport: { width: 1300, height: 1000 }, userAgent: UA });
  const cel = await b.newContext({ locale: 'pt-BR', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
  const out = [];
  for (const c of meus) {
    const r = { id: c.id };
    // 1) avaliações recentes no Maps
    let pg = await ctx.newPage();
    try {
      await pg.goto(c.maps, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await pg.waitForTimeout(3500);
      for (const t of ['Aceitar tudo', 'Accept all']) { const bt = pg.getByRole('button', { name: t }); if (await bt.count()) { await bt.first().click().catch(() => {}); await pg.waitForTimeout(2500); } }
      const aba = pg.getByRole('tab', { name: /Avaliações|Reviews/ });
      if (await aba.count()) {
        await aba.first().click(); await pg.waitForTimeout(2500);
        const ord = pg.locator('button[aria-label*="Ordenar"], button[aria-label*="Sort"]');
        if (await ord.count()) {
          await ord.first().click(); await pg.waitForTimeout(1200);
          const mr = pg.getByRole('menuitemradio', { name: /Mais recentes|Newest/ });
          if (await mr.count()) { await mr.first().click(); await pg.waitForTimeout(2500); }
        }
      }
      r.datas = await pg.evaluate(() => [...document.querySelectorAll('span.rsqaWe')].slice(0, 5).map(x => x.innerText));
      if (!r.datas.length) {
        const t = await pg.evaluate(() => document.body.innerText);
        r.datas = (t.match(/(?:há|editad[oa] há)\s+(?:um|uma|\d+)\s+(?:minutos?|horas?|dias?|semanas?|m[eê]s|meses|anos?)/gi) || []).slice(0, 5);
      }
      r.ficha = (await pg.evaluate(() => document.body.innerText)).slice(0, 1500);
    } catch (e) { r.erro_maps = e.message.slice(0, 100); }
    await pg.close();
    // 2) site no celular: erros de JavaScript, recursos quebrados, página mais larga que a tela
    if (c.site && c.tipo_site === 'site próprio') {
      pg = await cel.newPage();
      const erros = [], falhas = new Set();
      pg.on('pageerror', e => erros.push(String(e.message).slice(0, 120)));
      pg.on('console', m => { if (m.type() === 'error') erros.push(m.text().slice(0, 120)); });
      pg.on('response', x => { if (x.status() >= 400) falhas.add(x.status() + ' ' + x.url().slice(0, 100)); });
      pg.on('requestfailed', x => falhas.add('falhou ' + x.url().slice(0, 100)));
      try {
        const t0 = Date.now();
        const resp = await pg.goto(c.site, { waitUntil: 'load', timeout: 40000 });
        r.carga_s = Math.round((Date.now() - t0) / 100) / 10;
        r.status_cel = resp ? resp.status() : 0;
        await pg.waitForTimeout(2500);
        const m = await pg.evaluate(() => ({ larg: document.documentElement.scrollWidth, tela: window.innerWidth,
          fonte: parseFloat(getComputedStyle(document.body).fontSize) || 0, alt: document.documentElement.scrollHeight }));
        Object.assign(r, m);
      } catch (e) { r.erro_site = e.message.slice(0, 100); }
      r.erros_js = [...new Set(erros)].slice(0, 6);
      r.falhas = [...falhas].slice(0, 8);
      r.n_falhas = falhas.size;
      await pg.close();
    }
    out.push(r);
    console.log(c.id, c.nome, r.datas && r.datas[0], (r.erros_js || []).length, r.n_falhas);
  }
  fs.writeFileSync(`saida/detalhe-${SHARD}.json`, JSON.stringify(out, null, 1));
  await b.close();
})();
